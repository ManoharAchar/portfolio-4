// Connection constants only — no client. Kept separate from supabase.js so
// modules that need the raw URL/key synchronously (session.js's keepalive
// beacon) don't pull @supabase/supabase-js into the entry chunk.
export const SUPABASE_URL = 'https://ldjxodohqlksrecsoecn.supabase.co'
export const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkanhvZG9ocWxrc3JlY3NvZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzQ3NDIsImV4cCI6MjA5NTkxMDc0Mn0.RJRdMcz0rIZs7F6D9uYT9aba30DQ3iMzBPDTK1Aa1jU'
