import { supabase } from './supabase'

const TOKEN_KEY = 'portfolio_pass_token'

const PASS_COLORS = {
  designer:   '#798c6d',
  'see-work': '#64818c',
  exploring:  '#c4a24d',
  'sent-here':'#c87a5a',
}

// Format a timestamptz string into the same display format as PassCard
function formatStoredDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric',
  }).toUpperCase()
}

/**
 * On every page load: resolve the current visitor.
 * Returns { pass, isNew } where pass is the full Supabase row or null.
 */
export async function resolveVisitor() {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    const { data, error } = await supabase
      .from('passes')
      .select('*')
      .eq('token', token)
      .maybeSingle()

    if (!error && data) {
      console.log('[Guest Archive] Resolved pass (returning visitor):', data)
      return { pass: data, isNew: false }
    }
  }

  console.log('[Guest Archive] No existing pass found — new visitor.')
  return { pass: null, isNew: true }
}

/**
 * Create a new pass row in Supabase and store the token in localStorage.
 * Called when a new visitor clicks ENTER on the welcome screen.
 */
export async function createPass({ intent, name }) {
  const token = crypto.randomUUID()
  const passColor = PASS_COLORS[intent] ?? '#c4a24d'

  const { data, error } = await supabase
    .from('passes')
    .insert({ token, animal_name: name, intent, pass_color: passColor })
    .select()
    .single()

  if (error) {
    console.error('[Guest Archive] Failed to create pass:', error)
    throw error
  }

  localStorage.setItem(TOKEN_KEY, token)
  console.log('[Guest Archive] Created new pass:', data)
  return data
}

/**
 * Convert a Supabase pass row into the guest shape used by the app.
 */
export function passToGuest(pass) {
  return {
    intent: pass.intent,
    name:   pass.animal_name,
    date:   formatStoredDate(pass.created_at),
    passId: pass.id,
  }
}
