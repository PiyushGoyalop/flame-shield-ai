
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lmnvkkpxcqzogeisbygc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbnZra3B4Y3F6b2dlaXNieWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNjQyNjYsImV4cCI6MjA1NjY0MDI2Nn0.DF_xhfGkGqZhjm5Y31qD3KbOdhgvXmpW85_lr7gHG2Q";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
