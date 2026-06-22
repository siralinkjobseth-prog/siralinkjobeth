const SUPABASE_URL =
  "https://zoafcdkwvmdvvjdpsceq.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_7Rh6xk4-lrsw-2OsrN5_4w_zmO0AGN6";

// IMPORTANT: ensure supabase CDN is loaded in HTML first
export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);