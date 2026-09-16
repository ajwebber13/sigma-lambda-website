import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { tierLabels, type Tier, type DuesWindow } from "@/lib/dues";
import { getMerchItem } from "@/lib/merch";
import { getStripe } from "@/lib/stripe";
import { buildMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Payment Received",
  description: "Your Sigma Lambda Chapter payment was received.",
  path: "/portal/success",
  noindex: true,
});

export default async function PortalSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/portal");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session.payment_status === "paid";

  // Older sessions created before "type" existed were always dues.
  const type = session.metadata?.type ?? "dues";

  let heading = "We couldn't confirm that payment.";
  let message =
    "If you completed checkout, give it a moment and refresh. If the problem continues, reach out at info@sigmalambda.org.";

  if (paid && type === "dues") {
    const tier = session.metadata?.tier as Tier | undefined;
    const duesWindow = session.metadata?.window as DuesWindow | undefined;
    const baseAmount = session.metadata?.base_amount;
    const onlineTotal = session.metadata?.online_total;

    if (tier && duesWindow && baseAmount && onlineTotal) {
      const { data: existing } = await supabase
        .from("dues_payments")
        .select("id")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (!existing) {
        await supabase.from("dues_payments").insert({
          user_id: user.id,
          tier,
          window: duesWindow,
          base_amount: baseAmount,
          online_total: onlineTotal,
          method: "stripe",
          stripe_session_id: sessionId,
        });
      }

      heading = "Payment received.";
      message = `Thank you, ${tierLabels[tier]} — your dues payment of $${onlineTotal} has been recorded.`;
    }
  } else if (paid && type === "merch") {
    const itemId = session.metadata?.item;
    const amount = session.metadata?.amount;
    const item = itemId ? getMerchItem(itemId) : undefined;

    if (item && amount) {
      const { data: existing } = await supabase
        .from("merch_orders")
        .select("id")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (!existing) {
        await supabase.from("merch_orders").insert({
          user_id: user.id,
          item: item.id,
          amount,
          stripe_session_id: sessionId,
        });
      }

      heading = "Order received.";
      message = `Thanks! Your order for the ${item.name} ($${amount}) has been recorded.`;
    }
  }

  return (
    <section className="flex min-h-screen items-center bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto w-full max-w-[520px] px-5 sm:px-8">
        <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
          Member portal
        </span>
        <h1 className="text-[32px] leading-[1.12] font-semibold sm:text-[38px]">{heading}</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-text-ondark/68">{message}</p>
        <Link
          href="/portal"
          className="mt-8 inline-block rounded-sm bg-gold px-6.5 py-4 text-[14.5px] font-bold text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-0.5"
        >
          Back to the portal
        </Link>
      </div>
    </section>
  );
}
