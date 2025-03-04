
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lmnvkkpxcqzogeisbygc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbnZra3B4Y3F6b2dlaXNieWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNjQyNjYsImV4cCI6MjA1NjY0MDI2Nn0.DF_xhfGkGqZhjm5Y31qD3KbOdhgvXmpW85_lr7gHG2Q";

// Since we can't modify types.ts, we'll use the Database type but with type assertion
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// For TypeScript users who need type safety, you can create typed versions of the Supabase client
// Example: export const typedSupabase = supabase as SupabaseClient<Database>;
