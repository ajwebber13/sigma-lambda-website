import { NextResponse } from "next/server";
import { getDuesAmount, tierLabels, type Tier } from "@/lib/dues";
import { getMerchItem } from "@/lib/merch";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json();
  const { origin } = new URL(request.url);
  const stripe = getStripe();

  if (body?.type === "merch") {
    const item = getMerchItem(body?.item);
    if (!item) {
      return NextResponse.json({ error: "Invalid item." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(item.price * 100),
            product_data: {
              name: `Sigma Lambda Chapter Merch — ${item.name}`,
            },
          },
        },
      ],
      success_url: `${origin}/portal/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      metadata: {
        type: "merch",
        user_id: user.id,
        item: item.id,
        amount: item.price.toFixed(2),
      },
    });

    return NextResponse.json({ url: session.url });
  }

  // Default / explicit "dues" type.
  const tier = body?.tier as Tier;

  if (tier !== "senior" && tier !== "non-senior") {
    return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
  }

  // Recomputed server-side from today's date — never trust a client-sent amount.
  const { base, onlineTotal, window } = getDuesAmount(tier);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(onlineTotal * 100),
          product_data: {
            name: `Sigma Lambda Chapter Dues — ${tierLabels[tier]} (${window === "prime" ? "prime" : "standard"} rate)`,
          },
        },
      },
    ],
    success_url: `${origin}/portal/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/portal`,
    metadata: {
      type: "dues",
      user_id: user.id,
      tier,
      window,
      base_amount: base.toFixed(2),
      online_total: onlineTotal.toFixed(2),
    },
  });

  return NextResponse.json({ url: session.url });
}
