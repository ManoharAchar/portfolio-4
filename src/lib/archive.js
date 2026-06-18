import { supabase, retryOnce } from './supabase'

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
  const { data, error } = await retryOnce(() =>
    supabase.rpc('get_pass_stats')
  )

  if (error) return null
  return { total: data?.total ?? 0, lastCreatedAt: data?.lastCreatedAt ?? null }
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
 * Uses a SECURITY DEFINER RPC to read passes data despite RLS on the passes table.
 */
export async function fetchCarouselPasses() {
  const { data, error } = await retryOnce(() =>
    supabase.rpc('get_carousel_passes')
  )

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
 * Fetch a paginated page of passes for the expanded grid, optionally
 * filtered to passes whose most recent session matched an archetype.
 * Uses a SECURITY DEFINER RPC to read passes data despite RLS on the passes table.
 * Returns { data: Pass[], hasMore: boolean }.
 */
export async function fetchGridPasses(archetypeFilter, offset) {
  const { data, error } = await retryOnce(() =>
    supabase.rpc('get_grid_passes', { p_offset: offset, p_archetype: archetypeFilter })
  )

  if (error) return { data: [], hasMore: false }

  const hasMore = data.length > GRID_PAGE
  return { data: hasMore ? data.slice(0, GRID_PAGE) : data, hasMore }
}

/**
 * Most recent completed session for a given pass.
 * Used as hero fallback after refresh, and for ledger "You" pin when
 * the visitor's row hasn't loaded into the current page yet.
 * Uses a SECURITY DEFINER RPC to read passes data despite RLS on the passes table.
 */
export async function fetchLastSession(passId) {
  const { data, error } = await retryOnce(() =>
    supabase.rpc('get_last_session', { p_pass_id: passId })
  )

  if (error || !data || data.length === 0) return null

  const r = data[0]
  return {
    id:                  r.id,
    archetype:           r.archetype,
    dwell_seconds:       r.dwell_seconds,
    scroll_depth:        r.scroll_depth,
    case_studies_opened: r.case_studies_opened,
    created_at:          r.created_at,
    passes: {
      id:          r.pass_id_val,
      animal_name: r.animal_name,
      intent:      r.intent,
      pass_color:  r.pass_color,
    },
  }
}

/**
 * Fetch 10 sessions ordered by recency for the visitor ledger table.
 * Uses a SECURITY DEFINER RPC to read passes data despite RLS on the passes table.
 * Returns { data, hasMore }.
 */
export async function fetchLedgerRows(offset, archetypeFilter = 'all') {
  const { data, error } = await retryOnce(() =>
    supabase.rpc('get_ledger_rows', { p_offset: offset, p_archetype: archetypeFilter })
  )

  if (error) return { data: [], hasMore: false }

  const hasMore = data.length > 10
  const rows = hasMore ? data.slice(0, 10) : data
  return {
    data: rows.map((r) => ({
      id:                  r.id,
      archetype:           r.archetype,
      dwell_seconds:       r.dwell_seconds,
      scroll_depth:        r.scroll_depth,
      case_studies_opened: r.case_studies_opened,
      created_at:          r.created_at,
      passes: {
        id:          r.pass_id_val,
        animal_name: r.animal_name,
        intent:      r.intent,
        pass_color:  r.pass_color,
      },
    })),
    hasMore,
  }
}

/**
 * Aggregate visitor stats. Prefers the server-side `get_archive_aggregate` RPC
 * (see src/lib/supabase-functions.sql) which avoids fetching all rows and scales
 * past the PostgREST max_rows limit. Falls back to a client-side full-table scan
 * when the function hasn't been created yet.
 */
export async function fetchAggregateData() {
  // ── 1. Try server-side RPC ────────────────────────────────────────────────
  const rpc = await retryOnce(() => supabase.rpc('get_archive_aggregate'))

  if (!rpc.error && rpc.data) {
    return rpcToAggregate(rpc.data)
  }

  // PGRST202 = "function not found" → the SQL hasn't been run yet, fall through.
  // Any other code (RLS, bad query) is a real failure worth surfacing.
  if (rpc.error && rpc.error.code !== 'PGRST202') {
    console.error('[Guest Archive] Failed to fetch aggregate data:', rpc.error)
    return null
  }

  // ── 2. Client-side fallback ───────────────────────────────────────────────
  // WARNING: fetches every session row. Silently truncates at the PostgREST
  // max_rows limit (default 1000) once the archive is large enough.
  // Run supabase-functions.sql in the Supabase editor to activate the RPC.
  const { data, error } = await retryOnce(() =>
    supabase
      .from('sessions')
      .select('archetype, dwell_seconds, scroll_depth, case_studies_opened')
  )

  if (error) {
    console.error('[Guest Archive] Failed to fetch aggregate data (fallback):', error)
    return null
  }

  return computeAggregate(data)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function rpcToAggregate(d) {
  if (!d) return null
  const total = Number(d.total ?? 0)
  const counts = {
    wanderer: Number(d.wanderer ?? 0),
    scholar:  Number(d.scholar  ?? 0),
    hunter:   Number(d.hunter   ?? 0),
    passerby: Number(d.passerby ?? 0),
  }
  const pcts = {}
  Object.entries(counts).forEach(([k, n]) => {
    pcts[k] = total > 0 ? Math.round((n / total) * 100) : 0
  })
  const dominant = Object.entries(counts).reduce((best, cur) =>
    cur[1] > best[1] ? cur : best
  )[0]
  return {
    total,
    counts,
    pcts,
    dominant,
    avgDwellSeconds: d.avg_dwell_seconds != null ? Math.round(Number(d.avg_dwell_seconds)) : null,
    avgScrollDepth:  d.avg_scroll_depth  != null ? Number(d.avg_scroll_depth)              : null,
    avgCaseStudies:  d.avg_case_studies  != null ? Number(d.avg_case_studies)              : null,
  }
}

function computeAggregate(data) {
  const total = data.length

  const counts = { wanderer: 0, scholar: 0, hunter: 0, passerby: 0 }
  data.forEach((row) => {
    if (row.archetype && counts[row.archetype] !== undefined) {
      counts[row.archetype]++
    }
  })

  const pcts = {}
  Object.entries(counts).forEach(([key, n]) => {
    pcts[key] = total > 0 ? Math.round((n / total) * 100) : 0
  })

  const dominant = Object.entries(counts).reduce((best, cur) =>
    cur[1] > best[1] ? cur : best
  )[0]

  const dwellValues     = data.map((r) => r.dwell_seconds ?? 0)
  const scrollValues    = data.map((r) => r.scroll_depth ?? 0)
  const caseStudyValues = data.map((r) => r.case_studies_opened ?? 0)

  const rawAvgDwell     = trimmedMean(dwellValues)
  const avgDwellSeconds = rawAvgDwell !== null ? Math.round(rawAvgDwell) : null
  const avgScrollDepth  = trimmedMean(scrollValues)
  const avgCaseStudies  = trimmedMean(caseStudyValues)

  return { total, counts, pcts, dominant, avgDwellSeconds, avgScrollDepth, avgCaseStudies }
}
