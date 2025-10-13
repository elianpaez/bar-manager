import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://jnefrfprjragmacbawfy.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZWZyZnByanJhZ21hY2Jhd2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzgyOTMsImV4cCI6MjA3NTk1NDI5M30.PY4XyDYaFGsFvnYb8CyerWJ7J59gsX9QzoxKnrEbg2c"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)