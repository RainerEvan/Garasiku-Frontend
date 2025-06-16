// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

//ntar diganti sesuai
const supabaseUrl = 'https://tgqtkcydlhemswzgbsio.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncXRrY3lkbGhlbXN3emdic2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDQ5MzAsImV4cCI6MjA2MDYyMDkzMH0.LwtV3EM-7LRJvagmBN3cuFMCnzDMaDVdrv61L9FI3sQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
