import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from './supabaseConfig'

// NOTE: import this module dynamically (await import('./supabase')) from code
// that runs at startup — a static import chain would pull the Supabase client
// (~30KB gzip) back into the critical entry chunk.
export { SUPABASE_URL, SUPABASE_KEY }

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

// Retry a Supabase query once after a short delay on transient failures.
// Handles the cold-start window when the project wakes from auto-pause:
// the first request errors with no code (network-level), then the DB is awake.
// Permanent errors (PGRST/PostgreSQL codes) are returned immediately without retry.
export async function retryOnce(queryFn, delayMs = 1500) {
  const result = await queryFn()
  if (!result.error) return result
  if (result.error.code) return result
  console.warn('[Supabase] Transient error, retrying in 1.5s…', result.error.message)
  await new Promise((r) => setTimeout(r, delayMs))
  return queryFn()
}
