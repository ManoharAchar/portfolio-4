import { supabase } from './supabase'

// Remove values outside Q1 - 1.5×IQR … Q3 + 1.5×IQR, then return the mean.
// Falls back to a plain mean when fewer than 4 values exist.
function trimmedMean(values) {
  if (!values.length) return null
  if (values.length < 4) return values.reduce((a, b) => a + b, 0) / values.length
  const sorted = [...values].sort((a, b) => a - b)
  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]
  const iqr = q3 - q1
  const filtered = sorted.filter((v) => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr)
  return filtered.reduce((a, b) => a + b, 0) / filtered.length
}

const GRID_PAGE = 27

/**
 * Total pass count and the timestamp of the most recently issued pass.
 * Used to populate the header subtitle.
 */
export async function fetchPassStats() {
  const { count, data, error } = await supabase
    .from('passes')
    .select('created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) return null
  return { total: count ?? 0, lastCreatedAt: data[0]?.created_at ?? null }
}

/**
 * Format a Supabase timestamptz for display on a pass card.
 */
export function formatPassDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric',
  }).toUpperCase()
}

/**
 * Fetch the 10 most recent passes, each annotated with the archetype from
 * their most recent session (null when no session exists yet).
 */
export async function fetchCarouselPasses() {
  const { data, error } = await supabase
    .from('passes')
    .select('id, animal_name, intent, pass_color, created_at')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('[Guest Archive] Carousel fetch error:', error.message, error)
    return null
  }

  if (!data) return null

  return data.map((pass) => ({
    id:          pass.id,
    animal_name: pass.animal_name,
    intent:      pass.intent,
    pass_color:  pass.pass_color,
    created_at:  pass.created_at,
    archetype:   null,
  }))
}

/**
 * Fetch a paginated page of passes for the expanded grid.
 * For a specific archetype filter, resolves matching pass_ids from sessions first.
 * Returns { data: Pass[], hasMore: boolean }.
 */
export async function fetchGridPasses(archetypeFilter, offset) {
  let passIds = null

  if (archetypeFilter !== 'all') {
    const { data: sessionRows, error: sErr } = await supabase
      .from('sessions')
      .select('pass_id')
      .eq('archetype', archetypeFilter)

    if (sErr || !sessionRows?.length) return { data: [], hasMore: false }
    passIds = [...new Set(sessionRows.map((s) => s.pass_id))]
  }

  let query = supabase
    .from('passes')
    .select('id, animal_name, intent, pass_color, created_at')
    .order('created_at', { ascending: false })
    .range(offset, offset + GRID_PAGE) // fetch GRID_PAGE+1 to detect hasMore

  if (passIds) query = query.in('id', passIds)

  const { data, error } = await query
  if (error) return { data: [], hasMore: false }

  const hasMore = data.length > GRID_PAGE
  return { data: hasMore ? data.slice(0, GRID_PAGE) : data, hasMore }
}

/**
 * Most recent completed session for a given pass.
 * Used as hero fallback after refresh, and for ledger "You" pin when
 * the visitor's row hasn't loaded into the current page yet.
 */
export async function fetchLastSession(passId) {
  const { data, error } = await supabase
    .from('sessions')
    .select('id, archetype, dwell_seconds, scroll_depth, case_studies_opened, created_at, passes(id, animal_name, intent, pass_color)')
    .eq('pass_id', passId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) return null
  return data
}

/**
 * Fetch 10 sessions ordered by recency for the visitor ledger table.
 * Returns { data, hasMore }.
 */
export async function fetchLedgerRows(offset, archetypeFilter = 'all') {
  let query = supabase
    .from('sessions')
    .select('id, archetype, dwell_seconds, scroll_depth, case_studies_opened, created_at, passes(id, animal_name, intent, pass_color)')
    .order('created_at', { ascending: false })
    .range(offset, offset + 10) // fetch 11 to detect hasMore

  if (archetypeFilter !== 'all') {
    query = query.eq('archetype', archetypeFilter)
  }

  const { data, error } = await query

  if (error) return { data: [], hasMore: false }

  const hasMore = data.length > 10
  return { data: hasMore ? data.slice(0, 10) : data, hasMore }
}

/**
 * Fetch all sessions in one query and return derived aggregate data.
 * Returns null on error (callers treat as loading/failed).
 */
export async function fetchAggregateData() {
  const { data, error } = await supabase
    .from('sessions')
    .select('archetype, dwell_seconds, scroll_depth, case_studies_opened')

  if (error) {
    console.error('[Guest Archive] Failed to fetch aggregate data:', error)
    return null
  }

  console.log(`[Guest Archive] Aggregate: ${data.length} session rows fetched`)

  const total = data.length

  // Archetype counts — all four keys always present, default 0
  const counts = { wanderer: 0, scholar: 0, hunter: 0, passerby: 0 }
  data.forEach((row) => {
    if (row.archetype && counts[row.archetype] !== undefined) {
      counts[row.archetype]++
    }
  })

  // Percentages — 0 when total is 0 (avoids NaN/division by zero)
  const pcts = {}
  Object.entries(counts).forEach(([key, n]) => {
    pcts[key] = total > 0 ? Math.round((n / total) * 100) : 0
  })

  // Dominant archetype — key with the highest count
  const dominant = Object.entries(counts).reduce((best, cur) =>
    cur[1] > best[1] ? cur : best
  )[0]

  // Global averages — IQR-trimmed to exclude idle sessions and outliers
  const dwellValues       = data.map((r) => r.dwell_seconds ?? 0)
  const scrollValues      = data.map((r) => r.scroll_depth ?? 0)
  const caseStudyValues   = data.map((r) => r.case_studies_opened ?? 0)

  const rawAvgDwell   = trimmedMean(dwellValues)
  const avgDwellSeconds = rawAvgDwell !== null ? Math.round(rawAvgDwell) : null
  const avgScrollDepth  = trimmedMean(scrollValues)
  const avgCaseStudies  = trimmedMean(caseStudyValues)

  return { total, counts, pcts, dominant, avgDwellSeconds, avgScrollDepth, avgCaseStudies }
}
