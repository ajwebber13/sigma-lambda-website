import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Reveal from "@/components/Reveal";
import HistorySubmissionForm from "@/components/HistorySubmissionForm";
import { buildMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "History of Sigma Lambda Brotherhood",
  description:
    "Submit information, stories, and photos to help preserve the historical record of Sigma Lambda Chapter.",
  path: "/about/history-submission",
  noindex: true,
});

export default async function HistorySubmissionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "";

  return (
    <section className="bg-ink pt-[150px] pb-24 text-text-ondark">
      <div className="mx-auto max-w-[720px] px-5 sm:px-8">
        <Reveal>
          <span className="mb-3.5 block text-[13px] font-semibold tracking-[0.03em] text-gold-bright">
            About &middot; Chapter archive
          </span>
          <h1 className="max-w-[560px] text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
            History of Sigma Lambda Brotherhood
          </h1>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-text-ondark/68">
            Help preserve the chapter&apos;s historical record. Share information, context, or news about
            brothers — past or present — along with any photos or documentation you&apos;d like added to the
            archive.
          </p>
        </Reveal>

        <div className="mt-10">
          <HistorySubmissionForm userId={user.id} defaultName={fullName} />
        </div>
      </div>
    </section>
  );
}
