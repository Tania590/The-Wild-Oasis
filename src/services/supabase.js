import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://qkxkphcdwyjioknsjqsj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFreGtwaGNkd3lqaW9rbnNqcXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxODUzMjcsImV4cCI6MjAzMTc2MTMyN30.8QiAPCEuqu-vkbRkNHK0mpovKMzOXPykilaUcj7tZ5I";

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
