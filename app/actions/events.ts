"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// The actual insert/update/delete happens client-side with the admin's own
// session (RLS + is_admin() enforce it) — this action only busts the Events
// page's hourly ISR cache so the change shows up for other visitors right away.
export async function revalidateCalendar() {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return;

  revalidatePath("/events");
  revalidatePath("/portal");
}
