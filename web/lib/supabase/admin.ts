import { createClient } from "@supabase/supabase-js";

// Client avec service_role : bypass RLS, utilisé uniquement côté serveur (API routes)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
