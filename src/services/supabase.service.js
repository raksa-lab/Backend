import { createClient } from "@supabase/supabase-js";

// Client for user authentication (uses anon key)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Admin client for admin operations (uses service role key)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log("✅ Supabase clients connected successfully!");
