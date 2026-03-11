export type UserData = {
  user: import("@supabase/supabase-js").User | null;
  session: import("@supabase/supabase-js").Session | null;
};
