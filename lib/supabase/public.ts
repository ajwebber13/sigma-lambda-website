import { createClient } from "@supabase/supabase-js";

// Cookie-free, anon-key-only client for public, read-only queries (e.g. published
// news). It never reads cookies() or headers(), so pages that use it can be
// statically generated and revalidated (ISR). Do not use it for anything
// user-specific or for writes — use lib/supabase/server.ts for that.
export function createPublicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
