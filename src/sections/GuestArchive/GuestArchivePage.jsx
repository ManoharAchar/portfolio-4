import { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import PassCard from '../../components/PassCard/PassCard'
import TiltCard from '../../components/TiltCard/TiltCard'
import Footer from '../../components/Footer/Footer'
import { getSessionMetrics, computeArchetype } from '../../lib/session'
import { fetchAggregateData, fetchCarouselPasses, fetchGridPasses, fetchLastSession, fetchLedgerRows, fetchPassStats, formatPassDate } from '../../lib/archive'
import './GuestArchivePage.css'

const ARCHETYPE_INFO = {
  wanderer: {
    title: 'You move like a Wanderer.',
    blurb:  'Curious and unhurried, you followed your own path through the work. Impossible to predict.',
    color:  '#7c6f9f',
  },
  scholar: {
    title: 'You move like a Scholar.',
    blurb:  'A steady cursor, deep scrolls, and every case study opened end to end. You came to understand.',
    color:  '#4a8fa8',
  },
  hunter: {
    title: 'You move like a Hunter.',
    blurb:  'Fast and deliberate. You knew what you were looking for before you arrived.',
    color:  '#b87333',
  },
  passerby: {
    title: 'You move like a Passerby.',
    blurb:  'A brief visit. Sometimes that is all it takes to leave an impression.',
    color:  '#5c5c5c',
  },
}

function formatDwell(seconds) {
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

function formatPassNumber(id) {
  return `No. ${String(id).padStart(4, '0')}`
}

// Static tile shapes — pct is injected from live aggregate data at render time
const ARCHETYPE_TILES = [
  { key: 'wanderer', label: 'Wanderer', color: '#7c6f9f', desc: 'Followed their own path through the work. Curious, unhurried, and impossible to predict.' },
  { key: 'scholar',  label: 'Scholar',  color: '#4a8fa8', desc: 'Stayed long, scrolled deep, opened everything. Came to understand, not just to see.' },
  { key: 'hunter',   label: 'Hunter',   color: '#b87333', desc: 'Moved fast and with purpose. Knew what they were looking for before they arrived.' },
  { key: 'passerby', label: 'Passerby', color: '#5c5c5c', desc: 'A brief visit. Sometimes that is all it takes to leave an impression.' },
]

const DOMINANT_COPY = {
  wanderer: { headline: 'Most visitors are Wanderers.',  sub: 'They follow their own path, curious and unhurried.' },
  scholar:  { headline: 'Most visitors are Scholars.',   sub: 'They come prepared and leave having understood everything.' },
  hunter:   { headline: 'Most visitors are Hunters.',    sub: 'They arrive knowing exactly what they want.' },
  passerby: { headline: 'Most visitors are Passersby.',  sub: 'Brief visits, quiet traces, lasting impressions.' },
}

const FILTER_DOTS = {
  wanderer: '#7c6f9f',
  scholar:  '#4a8fa8',
  hunter:   '#b87333',
  passerby: '#5c5c5c',
}

const PASS_COLORS = {
  designer:   '#798c6d',
  'see-work': '#64818c',
  exploring:  '#c4a24d',
  'sent-here':'#c87a5a',
}

const INTENT_LABELS = {
  designer:   "I'M LOOKING FOR A DESIGNER",
  'see-work': 'I WANT TO SEE THE WORK',
  'sent-here':'SOMEONE SENT ME HERE',
  exploring:  'JUST EXPLORING',
}

const ARCHETYPE_COLORS = {
  SCHOLAR:  '#4a8fa8',
  HUNTER:   '#b87333',
  WANDERER: '#7c6f9f',
  PASSERBY: '#5c5c5c',
}

function formatRelativeTime(isoString) {
  if (!isoString) return null
  const mins = Math.floor((Date.now() - new Date(isoString).getTime()) / 60000)
  if (mins < 60) return `${mins}M AGO`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}H AGO`
  return `${Math.floor(hours / 24)}D AGO`
}

export default function GuestArchivePage({ activePage = 'archive', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [liveMetrics, setLiveMetrics] = useState(() => getSessionMetrics())
  const [aggregate, setAggregate] = useState(undefined)

  // Carousel state: undefined=loading, null=error, array=loaded
  const [carouselPasses, setCarouselPasses] = useState(undefined)

  // Expanded grid state
  const [gridOpen, setGridOpen] = useState(false)
  const [gridPasses, setGridPasses] = useState([])
  const [gridHasMore, setGridHasMore] = useState(false)
  const [gridLoading, setGridLoading] = useState(false)
  const [gridOffset, setGridOffset] = useState(0)

  // Hero fallback: most recent completed session (undefined=loading, null=none)
  const [lastSession, setLastSession] = useState(undefined)

  // Ledger table state
  const [ledgerRows, setLedgerRows] = useState([])
  const [ledgerHasMore, setLedgerHasMore] = useState(false)
  const [ledgerLoading, setLedgerLoading] = useState(true)
  const [ledgerOffset, setLedgerOffset] = useState(0)
  const [pinnedYouRow, setPinnedYouRow] = useState(null)
  const [youPulse, setYouPulse] = useState(false)
  const youRowRef = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    if (!carouselRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width
        if (w === 0) continue
        
        let visibleCount = 2.5
        if (w < 450) visibleCount = 1.25
        else if (w < 700) visibleCount = 1.5
        else if (w < 900) visibleCount = 2.25
        else visibleCount = 2.5
        
        const gaps = Math.floor(visibleCount)
        const cw = (w - gaps * 24) / visibleCount
        const scale = cw / 576
        
        entry.target.style.setProperty('--card-width', `${cw}px`)
        entry.target.style.setProperty('--card-height', `${cw / (576/270)}px`)
        entry.target.style.setProperty('--card-scale', scale)
      }
    })
    observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [gridOpen])

  useEffect(() => {
    const id = setInterval(() => setLiveMetrics(getSessionMetrics()), 2000)
    return () => clearInterval(id)
  }, [])

  const [passStats, setPassStats] = useState(undefined)

  useEffect(() => { fetchAggregateData().then(setAggregate) }, [])
  useEffect(() => { fetchPassStats().then(setPassStats) }, [])
  useEffect(() => {
    fetchCarouselPasses()
      .then(setCarouselPasses)
      .catch((err) => { console.error('[Guest Archive] Carousel effect caught:', err); setCarouselPasses(null) })
  }, [])

  // Fetch last completed session for hero fallback
  useEffect(() => {
    if (!guest?.passId) { setLastSession(null); return }
    fetchLastSession(guest.passId).then(setLastSession)
  }, [guest?.passId])

  // Re-fetch ledger whenever filter changes
  useEffect(() => {
    setLedgerLoading(true)
    setLedgerRows([])
    setLedgerOffset(0)
    fetchLedgerRows(0, filter).then(({ data, hasMore }) => {
      setLedgerRows(data)
      setLedgerHasMore(hasMore)
      setLedgerLoading(false)
    })
  }, [filter])

  // Re-fetch grid whenever it opens or the filter changes
  useEffect(() => {
    if (!gridOpen) return
    setGridLoading(true)
    setGridPasses([])
    setGridOffset(0)
    fetchGridPasses(filter, 0).then(({ data, hasMore }) => {
      setGridPasses(data)
      setGridHasMore(hasMore)
      setGridLoading(false)
    })
  }, [gridOpen, filter])

  const handleGridLoadMore = () => {
    const nextOffset = gridOffset + 27
    setGridLoading(true)
    fetchGridPasses(filter, nextOffset).then(({ data, hasMore }) => {
      setGridPasses((prev) => [...prev, ...data])
      setGridOffset(nextOffset)
      setGridHasMore(hasMore)
      setGridLoading(false)
    })
  }

  const handleLedgerLoadMore = () => {
    const nextOffset = ledgerOffset + 10
    fetchLedgerRows(nextOffset, filter).then(({ data, hasMore }) => {
      setLedgerRows((prev) => [...prev, ...data])
      setLedgerOffset(nextOffset)
      setLedgerHasMore(hasMore)
    })
  }

  // Auto-inject live session if it's the newest, and clear pinned row if natively loaded
  useEffect(() => {
    if (ledgerLoading || !guest?.passId || ledgerRows.length === 0) return

    const inData = ledgerRows.some((r) => r.passes?.id === guest.passId)

    if (inData && pinnedYouRow) {
      setPinnedYouRow(null)
    }

    if (!inData) {
      const maxPassId = Math.max(...ledgerRows.map((r) => r.passes?.id || 0))
      if (guest.passId >= maxPassId) {
        const m = getSessionMetrics() ?? { dwellSeconds: 0, scrollDepth: 0, caseStudiesOpened: 0 }
        const syntheticRow = {
          id: 'live-' + guest.passId,
          archetype: computeArchetype(m.dwellSeconds, m.scrollDepth, m.caseStudiesOpened),
          dwell_seconds: m.dwellSeconds,
          scroll_depth: m.scrollDepth,
          case_studies_opened: m.caseStudiesOpened,
          passes: {
            id: guest.passId,
            animal_name: guest.name,
            intent: guest.intent,
            pass_color: PASS_COLORS[guest.intent] ?? '#798c6d',
          },
        }
        setLedgerRows((prev) => [syntheticRow, ...prev])
      }
    }
  }, [ledgerLoading, guest, ledgerRows, pinnedYouRow])

  const handleYouClick = () => {
    const inRows = ledgerRows.some((r) => r.passes?.id === guest?.passId)
    if (inRows) {
      youRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setYouPulse(true)
      setTimeout(() => setYouPulse(false), 900)
    } else {
      if (pinnedYouRow) {
        youRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setYouPulse(true)
        setTimeout(() => setYouPulse(false), 900)
      } else {
        fetchLastSession(guest.passId).then((session) => {
          if (session) {
            setPinnedYouRow(session)
          } else {
            // No session written yet (first visit, tab still open) — build from live metrics
            const m = getSessionMetrics() ?? { dwellSeconds: 0, scrollDepth: 0, caseStudiesOpened: 0 }
            setPinnedYouRow({
              archetype:           computeArchetype(m.dwellSeconds, m.scrollDepth, m.caseStudiesOpened),
              dwell_seconds:       m.dwellSeconds,
              scroll_depth:        m.scrollDepth,
              case_studies_opened: m.caseStudiesOpened,
              passes: {
                id:          guest.passId,
                animal_name: guest.name,
                intent:      guest.intent,
                pass_color:  passColor,
              },
            })
          }
          
          setTimeout(() => {
            youRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            setYouPulse(true)
            setTimeout(() => setYouPulse(false), 900)
          }, 100)
        })
      }
    }
  }

  // ── Derived values ────────────────────────────────────────
  const metrics = liveMetrics ?? { dwellSeconds: 0, scrollDepth: 0, caseStudiesOpened: 0 }
  const liveIsEmpty = metrics.dwellSeconds < 45 && metrics.scrollDepth === 0 && metrics.caseStudiesOpened === 0

  // Hero: live metrics take priority; fall back to last session; empty state last
  const showLastSession = liveIsEmpty && lastSession != null
  // heroLoading: live metrics blank AND last session fetch hasn't resolved yet
  const heroLoading = liveIsEmpty && lastSession === undefined
  // heroIsEmpty: live metrics blank AND last session confirmed absent (null)
  const heroIsEmpty = liveIsEmpty && lastSession === null
  const heroArchetypeKey = showLastSession
    ? lastSession.archetype
    : computeArchetype(metrics.dwellSeconds, metrics.scrollDepth, metrics.caseStudiesOpened)
  const heroInfo = ARCHETYPE_INFO[heroArchetypeKey] ?? ARCHETYPE_INFO.wanderer
  const heroMetrics = showLastSession
    ? { dwellSeconds: lastSession.dwell_seconds, scrollDepth: lastSession.scroll_depth, caseStudiesOpened: lastSession.case_studies_opened }
    : metrics

  const passNumber = guest?.passId ? formatPassNumber(guest.passId) : '—'
  const passColor = PASS_COLORS[guest?.intent] ?? '#798c6d'

  const filteredCarousel = !Array.isArray(carouselPasses)
    ? []
    : filter === 'all'
      ? carouselPasses
      : carouselPasses.filter((p) => p.archetype === filter)

  const visibleLedger = filter === 'all'
    ? ledgerRows
    : ledgerRows.filter((r) => r.archetype === filter)

  return (
    <div className="ga-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        guest={guest}
        showPassCard={showPassCard}
      />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <span /><span /><span />
      </button>

      <main className="ga-main">
        <div className="ga-content">

          {/* Header */}
          <header className="ga-header">
            <p className="ga-breadcrumb">GUEST ARCHIVE</p>
            <h1 className="ga-title">Every visitor leaves a trace.</h1>
            <p className="ga-subtitle">
              {passStats === undefined
                ? <span className="ga-skeleton" style={{ height: 14, width: 240, display: 'inline-block' }} />
                : passStats === null
                  ? 'GUEST ARCHIVE'
                  : `${passStats.total} PASSES ISSUED${passStats.lastCreatedAt ? ` · LAST ISSUED ${formatRelativeTime(passStats.lastCreatedAt)}` : ''}`
              }
            </p>
          </header>

          {/* YouPanel — current visitor */}
          <section className="ga-you-panel">
            <div className="ga-you-panel__label">{passNumber} · FIRST VISIT · YOURS TO KEEP</div>
            <div className="ga-you-panel__body">
              <div className="ga-you-panel__card-wrap">
                <div className="ga-you-panel__card-scale">
                  {guest && (
                    <TiltCard>
                      <PassCard intent={guest.intent} name={guest.name} date={guest.date} />
                    </TiltCard>
                  )}
                </div>
              </div>
              <div className="ga-you-panel__result">
                {heroLoading ? (
                  <>
                    <span className="ga-skeleton" style={{ height: 42, width: 280, borderRadius: 8 }} />
                    <span className="ga-skeleton" style={{ height: 18, width: 220, borderRadius: 6 }} />
                    <div className="ga-metric-cards">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="ga-metric-card">
                          <span className="ga-skeleton" style={{ height: 13, width: 80 }} />
                          <span className="ga-skeleton" style={{ height: 32, width: 60 }} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : heroIsEmpty ? (
                  <>
                    <h2 className="ga-you-panel__archetype-title">Still getting to know you.</h2>
                    <p className="ga-you-panel__archetype-blurb">Explore a little and this will fill in.</p>
                    <div className="ga-metric-cards">
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">DWELL TIME</span>
                        <span className="ga-metric-card__value">—</span>
                      </div>
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">SCROLL DEPTH</span>
                        <span className="ga-metric-card__value">—</span>
                      </div>
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">CASE STUDIES</span>
                        <span className="ga-metric-card__value">—</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="ga-you-panel__archetype-title">{heroInfo.title}</h2>
                    <p className="ga-you-panel__archetype-blurb">{heroInfo.blurb}</p>
                    <div className="ga-metric-cards">
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">DWELL TIME</span>
                        <span className="ga-metric-card__value">{formatDwell(heroMetrics.dwellSeconds)}</span>
                      </div>
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">SCROLL DEPTH</span>
                        <span className="ga-metric-card__value">{Math.round(heroMetrics.scrollDepth * 100)}%</span>
                      </div>
                      <div className="ga-metric-card">
                        <span className="ga-metric-card__label">CASE STUDIES</span>
                        <span className="ga-metric-card__value">{heroMetrics.caseStudiesOpened}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Page sections */}
          <div className="ga-sections">

            {/* Archetype breakdown */}
            <section className="ga-archetype-section">
              <div className="ga-archetype-section__copy">
                <p className="ga-section-label">VISITOR ARCHETYPE / ALL VISITORS ALL TIME</p>
                <p className="ga-archetype-section__body">
                  Every pass carries a personality, inferred from how long they stayed, how far they scrolled, and how many doors they opened.
                </p>
                {aggregate === undefined ? (
                  <span className="ga-skeleton" style={{ height: 42, width: 280 }} />
                ) : aggregate === null || aggregate.total === 0 ? (
                  <h2 className="ga-archetype-section__headline">
                    Not enough visitors yet to see patterns emerge. Check back soon.
                  </h2>
                ) : (
                  <h2 className="ga-archetype-section__headline">
                    {DOMINANT_COPY[aggregate.dominant]?.headline ?? 'Most visitors are Wanderers.'}
                  </h2>
                )}
              </div>
              <div className="ga-archetype-tiles">
                {ARCHETYPE_TILES.map((tile) => (
                  <div key={tile.key} className="ga-archetype-tile" style={{ background: tile.color }}>
                    <div className="ga-archetype-tile__labels">
                      <div className="ga-archetype-tile__name">{tile.label}</div>
                      <div className="ga-archetype-tile__pct">
                        {aggregate === undefined
                          ? <span className="ga-skeleton" style={{ height: 32, width: 48, display: 'inline-block' }} />
                          : `${aggregate?.pcts?.[tile.key] ?? 0}%`
                        }
                      </div>
                    </div>
                    <p className="ga-archetype-tile__desc">{tile.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Global stats row */}
            <div className="ga-stats-row">
              <div className="ga-stat-tile">
                <span className="ga-stat-tile__label">AVG DWELL TIME</span>
                <span className="ga-stat-tile__value">
                  {aggregate === undefined
                    ? <span className="ga-skeleton" style={{ height: 32, width: 100, display: 'inline-block' }} />
                    : aggregate?.avgDwellSeconds != null
                      ? formatDwell(aggregate.avgDwellSeconds)
                      : '—'
                  }
                </span>
              </div>
              <div className="ga-stat-tile">
                <span className="ga-stat-tile__label">AVG SCROLL DEPTH</span>
                <span className="ga-stat-tile__value">
                  {aggregate === undefined
                    ? <span className="ga-skeleton" style={{ height: 32, width: 80, display: 'inline-block' }} />
                    : aggregate?.avgScrollDepth != null
                      ? `${Math.round(aggregate.avgScrollDepth * 100)}%`
                      : '—'
                  }
                </span>
              </div>
              <div className="ga-stat-tile">
                <span className="ga-stat-tile__label">AVG CASE STUDIES OPENED</span>
                <span className="ga-stat-tile__value">
                  {aggregate === undefined
                    ? <span className="ga-skeleton" style={{ height: 32, width: 60, display: 'inline-block' }} />
                    : aggregate?.avgCaseStudies != null
                      ? aggregate.avgCaseStudies.toFixed(1)
                      : '—'
                  }
                </span>
              </div>
            </div>

            {/* Guest log */}
            <section className="ga-guest-log">
              {/* Filter bar — shared by carousel, grid, and ledger */}
              <div className="ga-guest-log__header">
                <div className="ga-filter-group">
                  <button
                    className={`ga-filter-btn${filter === 'all' ? ' ga-filter-btn--active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  {Object.entries(FILTER_DOTS).map(([key, dotColor]) => (
                    <button
                      key={key}
                      className={`ga-filter-btn${filter === key ? ' ga-filter-btn--active' : ''}`}
                      onClick={() => setFilter(key)}
                    >
                      <span className="ga-filter-dot" style={{ background: dotColor }} />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                  {guest?.passId && (
                    <button
                      className="ga-you-filter-btn"
                      style={{ background: passColor }}
                      onClick={handleYouClick}
                    >
                      YOU
                    </button>
                  )}
                </div>
                {gridOpen ? (
                  <button className="ga-see-all-btn" onClick={() => setGridOpen(false)}>← COLLAPSE</button>
                ) : (
                  <button className="ga-see-all-btn" onClick={() => setGridOpen(true)}>SEE ALL →</button>
                )}
              </div>

              {/* Carousel — shown when grid is collapsed */}
              {!gridOpen && (
                filter !== 'all' ? (
                  <div className="ga-carousel">
                    <div className="ga-carousel__empty-state">
                      <span>The carousel only features recent arrivals. Scroll down to the ledger to explore all {filter} passes.</span>
                    </div>
                  </div>
                ) : carouselPasses === undefined ? (
                  <div className="ga-carousel" ref={carouselRef}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="ga-carousel__item">
                        <span className="ga-skeleton" style={{ width: '100%', height: '100%', borderRadius: 17 }} />
                      </div>
                    ))}
                  </div>
                ) : carouselPasses === null ? (
                  <div className="ga-carousel" ref={carouselRef}>
                    <div className="ga-carousel__see-all">
                      <span>Could not load passes. Check the console for details.</span>
                    </div>
                  </div>
                ) : carouselPasses.length < 2 ? (
                  <div className="ga-carousel" ref={carouselRef}>
                    <div className="ga-carousel__see-all">
                      <span>The archive is just getting started.</span>
                    </div>
                  </div>
                ) : (
                  <div className="ga-carousel" ref={carouselRef}>
                    {filteredCarousel.map((p) => {
                      const isYou = p.id === guest?.passId;
                      return (
                        <div key={p.id} className={`ga-carousel__item${isYou ? ' ga-carousel__item--you' : ''}`}>
                          <PassCard intent={p.intent} name={p.animal_name} date={formatPassDate(p.created_at)} />
                        </div>
                      );
                    })}
                    <div className="ga-carousel__see-all" onClick={() => setGridOpen(true)} style={{ cursor: 'pointer' }}>
                      <span>See All ›</span>
                    </div>
                  </div>
                )
              )}

              {/* Expanded grid — shown when See All is active */}
              {gridOpen && (
                <div className="ga-passes-grid">
                  {gridLoading && gridPasses.length === 0 ? (
                    <div className="ga-passes-grid__items">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="ga-carousel__item">
                          <span className="ga-skeleton" style={{ width: '100%', height: '100%', borderRadius: 17 }} />
                        </div>
                      ))}
                    </div>
                  ) : gridPasses.length === 0 ? (
                    <p className="ga-passes-grid__empty">No passes found for this filter.</p>
                  ) : (
                    <div className="ga-passes-grid__items">
                      {gridPasses.map((p) => {
                        const isYou = p.id === guest?.passId;
                        return (
                          <div key={p.id} className={`ga-carousel__item${isYou ? ' ga-carousel__item--you' : ''}`}>
                            <PassCard intent={p.intent} name={p.animal_name} date={formatPassDate(p.created_at)} />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {gridHasMore && (
                    <div className="ga-passes-grid__footer">
                      <button
                        className="ga-load-more"
                        onClick={handleGridLoadMore}
                        disabled={gridLoading}
                      >
                        {gridLoading ? 'LOADING...' : 'LOAD MORE'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Visitor ledger table */}
              <div className="ga-table">
                <div className="ga-table__divider" />

                <div className="ga-table__header">
                  <div className="ga-table__cell ga-table__cell--no">NO</div>
                  <div className="ga-table__cell ga-table__cell--pass">PASS</div>
                  <div className="ga-table__cell ga-table__cell--name">NAME</div>
                  <div className="ga-table__cell ga-table__cell--intent">INTENT</div>
                  <div className="ga-table__cell ga-table__cell--archetype">ARCHETYPE</div>
                  <div className="ga-table__cell ga-table__cell--scroll">SCROLL DEPTH</div>
                  <div className="ga-table__cell ga-table__cell--dwell">DWELL TIME</div>
                </div>

                <div className="ga-table__body">
                  {/* Pinned YOU row — shown when visitor's session is not in the loaded page */}
                  {pinnedYouRow && (
                    <>
                      <div 
                        ref={youRowRef}
                        className={`ga-table__row ga-table__row--you ga-table__row--pinned-below ${youPulse ? 'ga-table__row--pulse' : ''}`}
                      >
                        <div className="ga-table__cell ga-table__cell--no">
                          <span className="ga-table__no">{formatPassNumber(pinnedYouRow.passes?.id)}</span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--pass">
                          <span className="ga-you-badge" style={{ background: pinnedYouRow.passes?.pass_color ?? passColor }}>YOU</span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--name">
                          <span className="ga-table__name">{pinnedYouRow.passes?.animal_name}</span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--intent">
                          <span className="ga-table__intent">{INTENT_LABELS[pinnedYouRow.passes?.intent]}</span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--archetype">
                          <span className="ga-archetype-badge" style={{ background: ARCHETYPE_COLORS[pinnedYouRow.archetype?.toUpperCase()] }}>
                            {pinnedYouRow.archetype?.toUpperCase()}
                          </span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--scroll">
                          <span className="ga-table__stat">{Math.round((pinnedYouRow.scroll_depth ?? 0) * 100)}%</span>
                        </div>
                        <div className="ga-table__cell ga-table__cell--dwell">
                          <span className="ga-table__stat">{formatDwell(pinnedYouRow.dwell_seconds ?? 0)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Loading skeletons */}
                  {ledgerLoading && ledgerRows.length === 0 && (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="ga-table__row">
                        <div className="ga-table__cell ga-table__cell--no">
                          <span className="ga-skeleton" style={{ width: 64, height: 14 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--pass">
                          <span className="ga-skeleton" style={{ width: 48, height: 26, borderRadius: 6 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--name">
                          <span className="ga-skeleton" style={{ width: 120, height: 18 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--intent">
                          <span className="ga-skeleton" style={{ width: 160, height: 14 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--archetype">
                          <span className="ga-skeleton" style={{ width: 80, height: 24, borderRadius: 8 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--scroll">
                          <span className="ga-skeleton" style={{ width: 40, height: 14 }} />
                        </div>
                        <div className="ga-table__cell ga-table__cell--dwell">
                          <span className="ga-skeleton" style={{ width: 56, height: 14 }} />
                        </div>
                      </div>
                    ))
                  )}

                  {/* Empty state */}
                  {!ledgerLoading && visibleLedger.length === 0 && !pinnedYouRow && (
                    <div className="ga-table__row">
                      <div className="ga-table__cell ga-table__cell--intent" style={{ flex: 1 }}>
                        <span className="ga-table__intent">
                          {filter !== 'all'
                            ? 'No sessions match this filter.'
                            : 'You are the first. Everything starts here.'
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Real rows */}
                  {(() => {
                    let firstYouRendered = false
                    return visibleLedger.map((row) => {
                      const isYou = row.passes?.id === guest?.passId
                      let ref = null
                      if (isYou && !firstYouRendered) { ref = youRowRef; firstYouRendered = true }
                      return (
                        <div
                          key={row.id}
                          ref={ref}
                          className={[
                            'ga-table__row',
                            isYou ? 'ga-table__row--you' : '',
                            isYou && youPulse ? 'ga-table__row--pulse' : '',
                          ].filter(Boolean).join(' ')}
                        >
                          <div className="ga-table__cell ga-table__cell--no">
                            <span className="ga-table__no">{formatPassNumber(row.passes?.id)}</span>
                          </div>
                          <div className="ga-table__cell ga-table__cell--pass">
                            {isYou
                              ? <span className="ga-you-badge" style={{ background: row.passes?.pass_color ?? passColor }}>YOU</span>
                              : <span className="ga-pass-thumb" style={{ background: row.passes?.pass_color }} />
                            }
                          </div>
                          <div className="ga-table__cell ga-table__cell--name">
                            <span className="ga-table__name">{row.passes?.animal_name}</span>
                          </div>
                          <div className="ga-table__cell ga-table__cell--intent">
                            <span className="ga-table__intent">{INTENT_LABELS[row.passes?.intent]}</span>
                          </div>
                          <div className="ga-table__cell ga-table__cell--archetype">
                            <span className="ga-archetype-badge" style={{ background: ARCHETYPE_COLORS[row.archetype?.toUpperCase()] }}>
                              {row.archetype?.toUpperCase()}
                            </span>
                          </div>
                          <div className="ga-table__cell ga-table__cell--scroll">
                            <span className="ga-table__stat">{Math.round((row.scroll_depth ?? 0) * 100)}%</span>
                          </div>
                          <div className="ga-table__cell ga-table__cell--dwell">
                            <span className="ga-table__stat">{formatDwell(row.dwell_seconds ?? 0)}</span>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>

                {ledgerHasMore && (
                  <div className="ga-table__footer">
                    <button className="ga-load-more" onClick={handleLedgerLoadMore}>MORE</button>
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>

      </main>

      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
