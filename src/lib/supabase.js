import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const SUPABASE_URL = "https://hcucxakzgafkegdxijoe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdWN4YWt6Z2Fma2VnZHhpam9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NjU5OTcsImV4cCI6MjA1NjM0MTk5N30.bKC3So2t2EWBvOyIV19vMmWZ59DL4cKkU8J4-9whxIc";

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase; 