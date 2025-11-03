import {createClient} from "@supabase/supabase-js"

const URL = "https://ocpaqrmjjyvrfhoawslk.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcGFxcm1qanl2cmZob2F3c2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDM2MTMsImV4cCI6MjA3NzE3OTYxM30.sJCsZfqz41oXx0dvLwQw_5JfMKqwumMDKyd6LkzwR60"
export const supabase = createClient(URL, API_KEY)
