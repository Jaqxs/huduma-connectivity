
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const SUPABASE_URL = "https://tdyxxhinujkhgdtqwngt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXh4aGludWpraGdkdHF3bmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDE3NzYsImV4cCI6MjA1ODcxNzc3Nn0.yu4gGW607L1EMB4jGVulyZ-hDzEIX3xpibTbESlWXls";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
