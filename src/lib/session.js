import { SUPABASE_URL, SUPABASE_KEY, supabase } from './supabase'

const CASE_STUDY_PAGES = new Set(['cooperant', 'senior-mode', 'black-bazaar'])

// Pages where scroll depth is meaningful content engagement.
// Home and archive are navigation surfaces, not content — excluded.
const SCROLL_DEPTH_PAGES = new Set(['about', 'cooperant', 'senior-mode', 'black-bazaar', 'cave'])

// Mutable session state — lives for the lifetime of the tab
let passId = null
let startTime = null
let lastActiveTime = null           // updated on any user interaction
let maxScrollDepth = 0
let currentPage = null
let openedCaseStudies = new Set()   // opened THIS visit
let scrollInterval = null
let beaconSent = false

// After this many ms of inactivity, stop counting dwell time
const IDLE_GRACE_MS = 5 * 60 * 1000  // 5 minutes

function onActivity() {
  lastActiveTime = Date.now()
}

const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']

function attachActivityListeners() {
  ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }))
}

function detachActivityListeners() {
  ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, onActivity))
}

// Lifetime baseline loaded from DB on startSession
let existingSession = null
// Case studies already counted in the DB row, loaded from localStorage
let previouslyOpenedStudies = new Set()

function sampleScrollDepth() {
  if (!SCROLL_DEPTH_PAGES.has(currentPage)) return
  const scrolled = window.scrollY || document.documentElement.scrollTop
  const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (scrollable <= 0) return
  const depth = Math.min(scrolled / scrollable, 1.0)
  if (depth > maxScrollDepth) maxScrollDepth = depth
}

export function computeArchetype(dwellSeconds, scrollDepth, caseStudiesOpened) {
  if (scrollDepth > 0.70 && dwellSeconds > 240 && caseStudiesOpened >= 2) return 'scholar'
  if (caseStudiesOpened >= 3 && dwellSeconds < 180) return 'hunter'
  if (dwellSeconds < 45 && scrollDepth < 0.20) return 'passerby'
  return 'wanderer'
}

function writeSession() {
  if (!passId || beaconSent) return
  beaconSent = true

  // Cap dwell at lastActiveTime + grace period to exclude idle tabs
  const effectiveEnd = lastActiveTime
    ? Math.min(Date.now(), lastActiveTime + IDLE_GRACE_MS)
    : Date.now()
  const dwellSeconds = Math.max(0, Math.round((effectiveEnd - startTime) / 1000))

  // Case studies opened this visit that were not already counted
  const newStudies = [...openedCaseStudies].filter((s) => !previouslyOpenedStudies.has(s))

  // Persist updated set to localStorage for future visits
  try {
    const merged = [...new Set([...previouslyOpenedStudies, ...openedCaseStudies])]
    localStorage.setItem(`portfolio_case_studies_${passId}`, JSON.stringify(merged))
  } catch {}

  if (existingSession) {
    const lifetimeDwell   = existingSession.dwell_seconds + dwellSeconds
    const lifetimeScroll  = Math.max(existingSession.scroll_depth ?? 0, maxScrollDepth)
    const lifetimeStudies = existingSession.case_studies_opened + newStudies.length
    const archetype       = computeArchetype(lifetimeDwell, lifetimeScroll, lifetimeStudies)

    // Cache accumulated values locally — survives a refresh race where the DB
    // fetch in startSession hasn't resolved before the next writeSession fires
    try {
      localStorage.setItem(`portfolio_session_baseline_${passId}`, JSON.stringify({
        dwell_seconds: lifetimeDwell, scroll_depth: lifetimeScroll, case_studies_opened: lifetimeStudies,
      }))
    } catch {}

    // keepalive PATCH — accumulate into the existing row
    fetch(`${SUPABASE_URL}/rest/v1/sessions?pass_id=eq.${passId}`, {
      method:    'PATCH',
      keepalive: true,
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify({
        archetype,
        dwell_seconds:       lifetimeDwell,
        scroll_depth:        lifetimeScroll,
        case_studies_opened: lifetimeStudies,
      }),
    }).catch(() => {})
  } else {
    const archetype = computeArchetype(dwellSeconds, maxScrollDepth, openedCaseStudies.size)

    try {
      localStorage.setItem(`portfolio_session_baseline_${passId}`, JSON.stringify({
        dwell_seconds: dwellSeconds, scroll_depth: maxScrollDepth, case_studies_opened: openedCaseStudies.size,
      }))
    } catch {}

    // keepalive POST — first visit, create the row
    fetch(`${SUPABASE_URL}/rest/v1/sessions`, {
      method:    'POST',
      keepalive: true,
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify({
        pass_id:             passId,
        archetype,
        dwell_seconds:       dwellSeconds,
        scroll_depth:        maxScrollDepth,
        case_studies_opened: openedCaseStudies.size,
      }),
    }).catch(() => {})
  }
}

function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') writeSession()
}

/**
 * Start tracking. Async — pre-fetches the existing session row so writeSession
 * can do a single keepalive PATCH at tab close without a second round-trip.
 */
export async function startSession(id) {
  clearInterval(scrollInterval)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  detachActivityListeners()

  passId = id
  startTime = Date.now()
  lastActiveTime = Date.now()
  maxScrollDepth = 0
  currentPage = null
  openedCaseStudies = new Set()
  beaconSent = false
  existingSession = null

  // Load previously counted case studies from localStorage
  try {
    const stored = localStorage.getItem(`portfolio_case_studies_${id}`)
    previouslyOpenedStudies = stored ? new Set(JSON.parse(stored)) : new Set()
  } catch { previouslyOpenedStudies = new Set() }

  // Pre-fetch existing row — enables lifetime accumulation on writeSession.
  // Use order+limit instead of maybeSingle so duplicate rows (from a prior refresh
  // race) don't cause an error that wipes existingSession.
  const { data } = await supabase
    .from('sessions')
    .select('dwell_seconds, scroll_depth, case_studies_opened')
    .eq('pass_id', id)
    .order('created_at', { ascending: false })
    .limit(1)
  existingSession = data?.[0] ?? null

  // localStorage fallback: covers the race where a refresh triggers writeSession
  // before this fetch resolves, writing a lower-dwell POST row that then sorts first.
  if (!existingSession) {
    try {
      const stored = localStorage.getItem(`portfolio_session_baseline_${id}`)
      if (stored) existingSession = JSON.parse(stored)
    } catch {}
  }

  scrollInterval = setInterval(sampleScrollDepth, 2000)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  attachActivityListeners()
}

/**
 * Call on every page navigation. Tracks unique case study opens for this visit.
 */
export function recordPageVisit(page) {
  currentPage = page
  if (CASE_STUDY_PAGES.has(page)) openedCaseStudies.add(page)
}

/**
 * Returns lifetime metrics (existing DB baseline + current visit) so the hero
 * section always reflects cumulative behavior, not just the current session.
 */
export function getSessionMetrics() {
  if (!startTime) return null
  const currentDwell   = Math.round((Date.now() - startTime) / 1000)
  const newStudies     = [...openedCaseStudies].filter((s) => !previouslyOpenedStudies.has(s))

  if (existingSession) {
    return {
      dwellSeconds:      existingSession.dwell_seconds + currentDwell,
      scrollDepth:       Math.max(existingSession.scroll_depth ?? 0, maxScrollDepth),
      caseStudiesOpened: existingSession.case_studies_opened + newStudies.length,
    }
  }
  return {
    dwellSeconds:      currentDwell,
    scrollDepth:       maxScrollDepth,
    caseStudiesOpened: openedCaseStudies.size,
  }
}
