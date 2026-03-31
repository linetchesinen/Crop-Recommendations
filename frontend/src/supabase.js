import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cfkxtyccwgcutvosnieb.supabase.co";
const supabaseKey = "sb_publishable_K45kpAKHspCjFYNyg3qmow_nAiUQSZZ";

export const supabase = createClient(supabaseUrl, supabaseKey);