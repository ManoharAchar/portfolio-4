import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://ldjxodohqlksrecsoecn.supabase.co'
export const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkanhvZG9ocWxrc3JlY3NvZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzQ3NDIsImV4cCI6MjA5NTkxMDc0Mn0.RJRdMcz0rIZs7F6D9uYT9aba30DQ3iMzBPDTK1Aa1jU'

const TOKEN_KEY = 'portfolio_pass_token'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  global: {
    headers: {
      get 'x-visitor-token'() {
        return localStorage.getItem(TOKEN_KEY) ?? ''
      },
    },
  },
})
