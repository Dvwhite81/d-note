import { createClient } from '@supabase/supabase-js';

const bucket = 'Blog Bucket';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
