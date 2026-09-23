import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PortalDashboard from "@/components/PortalDashboard";
import { buildMetadata } from "@/lib/seo";
import { getCalendarEvents } from "@/lib/calendarEvents";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  title: "Member Portal",
  description:
    "The Sigma Lambda Chapter member portal — dues payment, event RSVPs and the chapter store.",
  path: "/portal",
  noindex: true,
});

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null;
  const calendarEvents = await getCalendarEvents();

  return <PortalDashboard email={user.email ?? ""} name={fullName} calendarEvents={calendarEvents} />;
}
