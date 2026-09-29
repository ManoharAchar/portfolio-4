import { useState, useEffect, useRef } from 'react'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import { getViewNext, getProjectPage } from '../../data/projects'
import { playInView } from '../../lib/playInView'
import '../CooperantLearning/CooperantLearning.css'
import '../Mochitta/Mochitta.css'
import './LocoCharge.css'

import heroVideo from '../../assets/loco-charge/Loco Hero Image.mp4'
import stripNearby from '../../assets/loco-charge/S1-1_nearby-freshness.webp'
import stripDetail from '../../assets/loco-charge/S1-2_station-detail.webp'
import stripBay from '../../assets/loco-charge/S1-3_bay-picker-F304.webp'
import stripNav from '../../assets/loco-charge/S1-4_nav-holding-F304.webp'
import iconOffline from '../../assets/loco-charge/I-1_charger-offline.svg'
import iconOverstay from '../../assets/loco-charge/I-2_car-overstay.svg'
import iconStale from '../../assets/loco-charge/I-3_data-stale.svg'
import iconCompass from '../../assets/loco-charge/I-4_directional-compass.svg'
import protoPoster from '../../assets/loco-charge/prototype-poster.webp'
import fR1 from '../../assets/loco-charge/F-R1_map-home.webp'
import fR2 from '../../assets/loco-charge/F-R2_station-detail.webp'
import fR3 from '../../assets/loco-charge/F-R3_slot-picker.webp'
import fR4 from '../../assets/loco-charge/F-R4_bay-picker.webp'
import fR5 from '../../assets/loco-charge/F-R5_bay-held.webp'
import fR6 from '../../assets/loco-charge/F-R6_nav-holding-F304.webp'
import fB1 from '../../assets/loco-charge/F-B1_en-route-11-min.webp'
import fB2 from '../../assets/loco-charge/F-B2_occupied-alert.webp'
import fB3 from '../../assets/loco-charge/F-B3_moved-to-F301.webp'
import fB4 from '../../assets/loco-charge/F-B4_activity-upcoming.webp'
import fP1 from '../../assets/loco-charge/F-P1_nearby-public.webp'
import fP2 from '../../assets/loco-charge/F-P2_nearby-private.webp'
import fP3 from '../../assets/loco-charge/F-P3_owner-chat-hollan.webp'
import fP4 from '../../assets/loco-charge/F-P4_hollan-slots.webp'
import fP5 from '../../assets/loco-charge/F-P5_P2-held.webp'
import hardConfirm from '../../assets/loco-charge/H-1_confirm-2024-sheet.webp'
import hardReview from '../../assets/loco-charge/H-2_review-2024-block.webp'
import decWithout from '../../assets/loco-charge/D1-L_without-check-in.webp'
import decKept from '../../assets/loco-charge/D1-R_kept-owner-chat.webp'
import decAlert from '../../assets/loco-charge/D3_occupied-alert-bottom.webp'
import invitePhoto from '../../assets/mochitta/invite-photo.webp'
import iconCopy from '../../assets/mochitta/icon-copy.svg'
import iconMail from '../../assets/mochitta/icon-mail.webp'

// The prototype is a standalone page in /public with its React + Babel runtime
// vendored next to it, so the embed never depends on a third-party CDN.
const PROTOTYPE_URL = '/loco-prototype/index.html'
// frame=0 drops the prototype's own presentation stage, which would otherwise
// pad and crop the 393px screen inside our bezel.
const EMBED_SRC = `${PROTOTYPE_URL}?frame=0&scenario=failure`
const FULL_PROTOTYPE_SRC = `${PROTOTYPE_URL}?scenario=failure&autoplay=0`

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem & context' },
  { id: 'product', label: 'The product' },
  { id: 'hard', label: 'What was hard' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'method', label: 'Method & honesty' },
  { id: 'next', label: "What's next" },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const TAG_PILLS = ['EV CHARGING', 'TESTED CONCEPT', 'WORKING PROTOTYPE']

const META_CHIPS = [
  { label: 'MY ROLE', value: 'Product Designer, interaction + prototype' },
  { label: 'TYPE', value: 'Tested concept' },
  { label: 'TEAM', value: '4-person team · prototype solo' },
  { label: 'TIMELINE', value: '2024 to 2026' },
  { label: 'PLATFORM', value: 'iOS' },
  { label: 'STATUS', value: 'Working prototype' },
]

const STRIP = [
  { img: stripNearby, alt: 'Nearby stations list with freshness labels', caption: 'Every station shows how fresh its data is.' },
  { img: stripDetail, alt: 'Livonia station detail, 5 of 8 working', caption: 'Five of eight chargers working, checked a minute ago.' },
  { img: stripBay, alt: 'Bay picker with F304 selected', caption: 'You reserve a numbered bay, not just a station.' },
  { img: stripNav, alt: 'Navigation holding a reservation for F304', caption: 'Twelve minutes out, bay F304 held.' },
]

const PROBLEM_CARDS = [
  { icon: iconOffline, title: 'Chargers fail silently', body: 'A charger can go offline between booking and arrival, and the app still shows it as held.' },
  { icon: iconOverstay, title: 'Drivers overstay', body: "Nothing makes the last car move. That's why public charging reservations have mostly failed." },
  { icon: iconStale, title: 'Data goes stale', body: 'By the time a driver acts on availability, it can be half an hour old.' },
]

const CONTRIBUTION = [
  { label: 'OWNED', body: 'Interaction design, wireframes, high-fidelity UI, and the working prototype.' },
  { label: 'COLLABORATED', body: 'Feature set and information architecture, with a four-person team.' },
  { label: 'INFLUENCED', body: 'Usability scenarios and tasks.' },
  { label: 'NOT MINE', body: 'Literature review, session moderation, and analysis.' },
]

// Each step's note is the action that leads to the next screen, so the last
// screen of a flow has none.
const FLOWS = [
  {
    label: 'RESERVE',
    line: 'Pick a station, an hour, and a numbered bay. Navigation carries the booking with you.',
    steps: [
      { img: fR1, alt: 'Map home with the nearby stations sheet', note: 'taps a station' },
      { img: fR2, alt: 'Livonia station detail', note: 'taps Reserve' },
      { img: fR3, alt: 'Time slot picker with 12 to 1 selected', note: 'picks 12 to 1' },
      { img: fR4, alt: 'Bay picker with F304 selected', note: 'picks bay F304' },
      { img: fR5, alt: 'Bay F304 held confirmation', note: 'taps Navigate' },
      { img: fR6, alt: 'Navigation holding the F304 reservation' },
    ],
  },
  {
    label: 'WHEN IT BREAKS',
    line: "If the bay won't be free, you hear about it on the road, with three ways out.",
    note: 'The freshness label on a station card is the same system that interrupts you on the road, and only when it has to.',
    steps: [
      { img: fB1, alt: 'En route to F304, eleven minutes out', note: 'occupant has not left' },
      { img: fB2, alt: "Alert: F304's occupant hasn't left, with three options", note: 'taps Switch bay' },
      { img: fB3, alt: 'Reservation moved to F301, confirmed live', note: 'reservation moves' },
      { img: fB4, alt: 'Activity tab with the upcoming reservation' },
    ],
  },
  {
    label: 'PRIVATE CHARGERS',
    line: "Book a homeowner's driveway charger and settle parking with the owner before you leave.",
    note: 'Coordination is the feature. A driveway charger works because someone answers.',
    steps: [
      { img: fP1, alt: 'Nearby stations, Public tab', note: 'switches to Private' },
      { img: fP2, alt: 'Nearby stations, Private tab', note: 'taps Owner chat' },
      { img: fP3, alt: 'Owner chat with Hollan P', note: 'host confirms parking' },
      { img: fP4, alt: "Hollan P's reservation slots", note: 'books the slot' },
      { img: fP5, alt: 'Bay P2 held, owner confirmed' },
    ],
  },
]

const FRESHNESS_STATES = [
  { name: 'Livonia, MI', dist: '2.1 mi', pill: 'live', kind: 'live', state: 'LIVE', desc: 'Solid border, filled dot' },
  { name: 'Mercury Drive, MI', dist: '3.4 mi', pill: '6 min ago', kind: 'recent', state: 'RECENT', desc: 'Solid border, hollow dot' },
  { name: 'New Valley, MI', dist: '3.6 mi', pill: '41 min ago · driver report', kind: 'stale', state: 'STALE', desc: 'Dashed border, source named' },
  { name: 'Knork High, MI', dist: '4.2 mi', pill: 'no live data', kind: 'unknown', state: 'UNKNOWN', desc: 'Dotted border, no dot' },
]

const EVIDENCE_STATS = [
  { value: '6', label: 'EV DRIVERS' },
  { value: '18 to 40', label: 'AGE RANGE' },
  { value: '30 sec', label: 'TO EXPLORE FIRST' },
  { value: '1', label: 'MODERATED ROUND' },
]

const NEXT_STEPS = [
  "Make a reservation binding, or define what the app owes a driver when it isn't.",
  'Connect the confidence labels to a live data feed.',
  'Re-plan a trip when a stop goes dark mid-route.',
]

const RECEIPTS = [
  { id: 'R1', title: 'Feature map and IA', line: 'The four-tab structure behind every flow.', to: 'problem', label: 'PROBLEM & CONTEXT' },
  { id: 'R2', title: 'Usability scenarios and tasks', line: 'The scenarios, tasks, and thirty-second exploration window.', to: 'method', label: 'METHOD' },
  { id: 'R3', title: 'Metrics audit', line: 'Why the original percentage claims were retired.', to: 'method', label: 'METHOD' },
  { id: 'R4', title: 'Freshness state spec', line: 'Four states, three scales, no status color.', to: 'decision-02', label: 'DECISION 02' },
  { id: 'R5', title: 'Confirmation, before and after', line: 'The screen that made the promise, rewritten.', to: 'decision-03', label: 'DECISION 03' },
]

// ── Prototype embed ─────────────────────────────────────────
// The poster stays up until the iframe reports load, so a slow network never
// shows a blank phone. A load that stalls is retried once with a cache-busting
// query; if that also stalls, the poster stays and links to the full prototype.
const LOAD_TIMEOUT_MS = 15000

function PrototypeEmbed() {
  const wrapRef = useRef(null)
  const [near, setNear] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)
  const [scale, setScale] = useState(1)

  // Mount the iframe once the phone is actually on screen: the failure
  // scenario autoplays from load, so mounting early would let it finish
  // before anyone scrolls to it. The poster covers the brief compile.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { setNear(true); return }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // The prototype is laid out at 393 × 852; narrower screens scale it down.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / 393))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!near || loaded || failed) return
    const t = setTimeout(() => {
      if (attempt === 0) setAttempt(1)
      else setFailed(true)
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [near, loaded, failed, attempt])

  const src = attempt === 0 ? EMBED_SRC : `${EMBED_SRC}&retry=${attempt}`

  return (
    <div className="loco-proto">
      <div className="loco-proto__screen" ref={wrapRef} style={{ height: 852 * scale }}>
        {near && !failed && (
          <iframe
            key={attempt}
            className={`loco-proto__frame${loaded ? ' loco-proto__frame--ready' : ''}`}
            src={src}
            title="Loco Charge working prototype"
            width="393"
            height="852"
            style={{ transform: `scale(${scale})` }}
            onLoad={() => setTimeout(() => setLoaded(true), 350)}
            allow="autoplay"
          />
        )}
        <img
          className={`loco-proto__poster${loaded && !failed ? ' loco-proto__poster--hidden' : ''}`}
          src={protoPoster}
          alt=""
          aria-hidden="true"
        />
        {failed && (
          <a className="loco-proto__fallback" href={FULL_PROTOTYPE_SRC} target="_blank" rel="noreferrer">
            Open the prototype ↗
          </a>
        )}
      </div>
    </div>
  )
}

function FreshnessStates() {
  return (
    <div className="loco-fresh" role="list" aria-label="Four freshness states">
      {FRESHNESS_STATES.map(({ name, dist, pill, kind, state, desc }) => (
        <div key={state} role="listitem">
          <div className="loco-fresh__card">
            <div className="loco-fresh__row">
              <span className="loco-fresh__name">{name}</span>
              <span className="loco-fresh__dist">{dist}</span>
            </div>
            <span className={`loco-pill loco-pill--${kind}`}>
              {(kind === 'live' || kind === 'recent') && <span className={`loco-dot loco-dot--${kind === 'live' ? 'filled' : 'hollow'}`} />}
              <span>{pill}</span>
            </span>
          </div>
          <p className="loco-fresh__state">{state}</p>
          <p className="loco-fresh__desc">{desc}</p>
        </div>
      ))}
    </div>
  )
}

function DecisionMetric({ value, evLabel, ev, trade }) {
  return (
    <div className="loco-metric">
      <p className="loco-metric__value">{value}</p>
      <div className="loco-metric__col">
        <p className="loco-metric__label">{evLabel}</p>
        <p className="loco-metric__text">{ev}</p>
      </div>
      <div className="loco-metric__col">
        <p className="loco-metric__label">TRADEOFF</p>
        <p className="loco-metric__text">{trade}</p>
      </div>
    </div>
  )
}

function Decision({ id, num, heading, body, media, caption, metric }) {
  return (
    <div className="loco-decision" id={id}>
      <div className="loco-decision__head">
        <p className="loco-decision__kicker">DECISION {num}</p>
        <h3 className="cs-decision-heading">{heading}</h3>
        <p className="cs-section-body">{body}</p>
      </div>
      {media}
      <p className="loco-caption">{caption}</p>
      <DecisionMetric {...metric} />
    </div>
  )
}

export default function LocoCharge({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isMobile = useIsMobile()
  const sectionsRef = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // The freshness-state cards reproduce app UI set in Public Sans, a face the
  // rest of the site doesn't use, so it's only fetched on this page.
  useEffect(() => {
    const href = 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap'
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    const observers = []
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateToSection = (id) => {
    setMobileMenuOpen(false)
    scrollToSection(id)
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText('manohar.create@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 1800)
  }

  return (
    <div className="cs-page mochitta-page loco-page">
      <div className="cs-mobile-topbar">
        <button className="cs-mobile-topbar__back" onClick={() => onNavigate?.('home')} aria-label="Back to home" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6L9 12L15 18" />
            <path d="M10 12H21" />
          </svg>
        </button>
        <button
          className="cs-mobile-topbar__menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close table of contents' : 'Open table of contents'}
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="cs-mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={`cs-mobile-drawer${mobileMenuOpen ? ' cs-mobile-drawer--open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <button
          className="cs-mobile-drawer__close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close table of contents"
          type="button"
        >
          ×
        </button>
        <p className="cs-mobile-drawer__context">CASE STUDY / LOCO CHARGE</p>
        <div className="cs-mobile-toc">
          <p className="cs-mobile-toc__heading">TABLE OF CONTENTS</p>
          <div className="cs-mobile-toc__links">
            {TOC_ITEMS.map(({ id, label }, i) => (
              <button
                key={id}
                className={`cs-mobile-toc__item${activeSection === id ? ' cs-mobile-toc__item--active' : ''}`}
                onClick={() => navigateToSection(id)}
                type="button"
              >
                {i + 1}. {label}
              </button>
            ))}
          </div>
        </div>
        <div className="cs-mobile-site-nav" aria-label="Site navigation">
          {MOBILE_SITE_LINKS.map(({ label, page }) => (
            <button
              key={page}
              className="cs-mobile-site-nav__item"
              onClick={() => {
                setMobileMenuOpen(false)
                onNavigate?.(page)
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </aside>

      <div className="cs-body">

        {/* ── Sidebar ── */}
        <aside className="cs-sidebar">
          <button className="cs-sidebar__home" onClick={() => onNavigate?.('home')}>
            ← HOME
          </button>

          <div className="cs-sidebar__toc-card">
            <p className="cs-sidebar__toc-heading">TABLE OF CONTENTS</p>
            <div className="cs-sidebar__toc-links">
              {TOC_ITEMS.map(({ id, label }, i) => (
                <button
                  key={id}
                  className={`cs-sidebar__toc-item${activeSection === id ? ' cs-sidebar__toc-item--active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  {i + 1}. {label}
                </button>
              ))}
            </div>
          </div>

          <button className="cs-sidebar__back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ BACK TO TOP
          </button>
        </aside>

        {/* ── Main Content ── */}
        <main className="cs-main">
          <div className="cs-sections" ref={sectionsRef}>

            {/* Overview */}
            <section className="cs-section cs-v2-overview loco-overview" id="overview">
              <div className="cs-v2-hero-row">
                <div className="cs-v2-hero-copy">
                  <p className="cs-label">LOCO CHARGE</p>
                  <h1 className="cs-hero-title">EV charging apps promise a bay they can't guarantee. I designed one that tells drivers the truth in time to act.</h1>
                  <div className="cs-v2-hero-visual--mobile">
                    <video src={heroVideo} loop muted playsInline preload="metadata" ref={playInView} aria-label="Loco Charge map home with the sample review that named the failure" />
                  </div>
                  <div className="cs-tag-pill-row">
                    {TAG_PILLS.map((label) => (
                      <span key={label} className="cs-tag-pill">{label}</span>
                    ))}
                  </div>
                  <p className="cs-hero-body">
                    Loco Charge finds a charger, reserves a specific bay for a specific hour, and warns you the moment that reservation stops being reliable.
                  </p>
                  <div className="cs-chip-row">
                    {META_CHIPS.map(({ label, value }) => (
                      <div key={label} className="cs-chip">
                        <p className="cs-chip__label">{label}</p>
                        <p className="cs-chip__value">{value}</p>
                      </div>
                    ))}
                  </div>
                  <a className="cs-live-cta" href={FULL_PROTOTYPE_SRC} target="_blank" rel="noreferrer">
                    WALK THROUGH THE PROTOTYPE <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="cs-v2-hero-visual">
                  <video src={heroVideo} loop muted playsInline preload="metadata" ref={playInView} aria-label="Loco Charge map home with the sample review that named the failure" />
                </div>
              </div>

              <div className="loco-divider" />

              <div className="loco-strip">
                {STRIP.map(({ img, alt, caption }) => (
                  <figure key={caption} className="loco-strip__item">
                    <img loading="lazy" decoding="async" src={img} alt={alt} className="loco-phone" />
                    <figcaption className="loco-strip__caption">{caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Problem & Context */}
            <section className="cs-section loco-section--gap-56" id="problem">
              <div className="loco-stack loco-stack--24">
                <div className="loco-stack loco-stack--12">
                  <p className="cs-label">PROBLEM & CONTEXT</p>
                  <h2 className="cs-section-heading">A reservation is only as good as the data behind it.</h2>
                </div>
                <p className="cs-section-body">A ground-up concept, tested with six EV drivers and built out as a working prototype.</p>
                <div className="cs-problem-grid">
                  {PROBLEM_CARDS.map(({ icon, title, body }) => (
                    <div key={title} className="cs-problem-card">
                      <div className="cs-problem-card__top">
                        <span
                          aria-hidden="true"
                          className="loco-mask-icon cs-problem-card__icon"
                          style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
                        />
                        <p className="cs-problem-card__title">{title}</p>
                      </div>
                      <p className="cs-problem-card__body">{body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="loco-contrib">
                <p className="cs-label">MY CONTRIBUTION</p>
                <div className="loco-contrib__grid">
                  {CONTRIBUTION.map(({ label, body }) => (
                    <div key={label} className="loco-contrib__col">
                      <p className="loco-contrib__label">{label}</p>
                      <p className="loco-contrib__body">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* The Product */}
            <section className="cs-section loco-section--gap-48" id="product">
              <div className="loco-stack loco-stack--12">
                <p className="cs-label">THE PRODUCT</p>
                <h2 className="cs-section-heading">This is what Loco Charge does.</h2>
                <p className="cs-section-body">Find a charger, reserve a bay, get there, and know early if anything changes.</p>
              </div>

              <div className="loco-embed">
                <div className="loco-embed__intro">
                  <p className="loco-embed__text">
                    <strong>Try the failure yourself.</strong> Reserve bay F304 and start navigating. Before you arrive, the app tells you the bay won't be free.
                  </p>
                  <a className="cs-live-cta" href={FULL_PROTOTYPE_SRC} target="_blank" rel="noreferrer">
                    WALK THROUGH IT YOURSELF <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <PrototypeEmbed />
              </div>

              {FLOWS.map(({ label, line, note, steps }) => (
                <div key={label} className="loco-flow">
                  <div className="loco-stack loco-stack--8">
                    <p className="cs-label">{label}</p>
                    <p className="loco-flow__line">{line}</p>
                  </div>
                  <div className="loco-flow__grid">
                    {steps.map(({ img, alt, note: stepNote }) => (
                      <figure key={alt} className="loco-flow__step">
                        <img loading="lazy" decoding="async" src={img} alt={alt} className="loco-phone" />
                        {stepNote && <figcaption className="loco-flow__note">→ {stepNote}</figcaption>}
                      </figure>
                    ))}
                  </div>
                  {note && <p className="loco-flow__connect">{note}</p>}
                </div>
              ))}
            </section>

            {/* What Was Hard */}
            <section className="cs-section loco-section--gap-48" id="hard">
              <div className="loco-stack loco-stack--12">
                <p className="cs-label">WHAT WAS HARD</p>
                <h2 className="cs-section-heading">The first version made the same promise, and broke in two places.</h2>
              </div>

              <div className="loco-stack loco-stack--20">
                <div className="cs-broke-row loco-broke-row loco-broke-row--confirm">
                  <div className="loco-panel loco-panel--confirm">
                    <img loading="lazy" decoding="async" src={hardConfirm} alt="The original 2024 reservation confirmation" className="loco-panel__confirm" />
                    <span className="loco-annot loco-annot--confirm">
                      <span className="loco-annot__line" />
                      <span className="loco-chip">Nothing enforces this.</span>
                    </span>
                  </div>
                  <div className="cs-broke-info">
                    <p className="cs-broke-info__title">The confirmation read like a guarantee.</p>
                    <p className="cs-broke-info__body">Bay booked, hour held, arrive ten minutes early. Nothing behind the screen could keep any of it.</p>
                    <div className="loco-broke-why">
                      <p className="loco-broke-why__label">WHY IT'S HARD</p>
                      <p className="cs-broke-info__quote">Public charging reservations have mostly failed for one reason: nothing makes the last driver leave.</p>
                    </div>
                  </div>
                </div>
                <p className="loco-caption">The original confirmation. Every line is a promise.</p>
                <div className="cs-broke-row loco-broke-row">
                  <div className="loco-panel loco-panel--review">
                    <img loading="lazy" decoding="async" src={hardReview} alt="The 2024 sample review: great place but they need to force folks to come back and move car when done" className="loco-panel__review" />
                  </div>
                  <div className="cs-broke-info">
                    <p className="cs-broke-info__title">Our own sample review named the failure.</p>
                    <p className="cs-broke-info__body">We wrote it as placeholder copy, then designed as if it would never happen.</p>
                    <p className="loco-broke-metric">The complaint was in the product from day one.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Decisions */}
            <section className="cs-section loco-section--gap-48" id="decisions">
              <div className="loco-stack loco-stack--12">
                <p className="cs-label">KEY DECISIONS</p>
                <h2 className="cs-section-heading">Three decisions, one rule: tell the driver while there's still time to choose.</h2>
              </div>

              <Decision
                id="decision-01"
                num="01"
                heading="Kept the owner check-in instead of trimming it"
                body="The private flow had one more step than public booking, and nobody had used anything like it. Cutting it to match was the obvious move. Drivers wanted it kept, because it worked when public charging didn't."
                media={
                  <div className="loco-panel loco-panel--compare">
                    <figure className="loco-compare__side">
                      <span className="loco-chip loco-chip--dark">WITHOUT THE CHECK-IN</span>
                      <img loading="lazy" decoding="async" src={decWithout} alt="Private charger detail with the owner check-in removed, a comparison state" className="loco-panel__crop" />
                    </figure>
                    <span className="loco-compare__vs" aria-hidden="true">VS</span>
                    <figure className="loco-compare__side">
                      <span className="loco-chip">KEPT</span>
                      <img loading="lazy" decoding="async" src={decKept} alt="Owner chat, where the host confirms parking before booking" className="loco-panel__crop" />
                    </figure>
                  </div>
                }
                caption="Without the check-in, a stranger's driveway is a guess."
                metric={{
                  value: '36.2s',
                  evLabel: 'EVIDENCE · TESTED, FIVE TIMED SESSIONS',
                  ev: 'Booking took 36.2s private and 35.6s public. A flow nobody had seen matched one they used every week.',
                  trade: 'One extra step on the least familiar flow.',
                }}
              />
              <div className="loco-divider" />
              <Decision
                id="decision-02"
                num="02"
                heading="Showed data confidence without spending a color"
                body="Drivers asked for availability before navigating, a time filter, and word when someone leaves. All three were one complaint: the app knew something and said it too late. Color already meant status, so confidence got its own channel."
                media={
                  <div className="loco-panel loco-panel--fresh">
                    <FreshnessStates />
                  </div>
                }
                caption="Four states of knowing. No status color spent."
                metric={{
                  value: '4 states',
                  evLabel: 'EVIDENCE · DEFENDED, NOT YET TESTED',
                  ev: 'Four states on border and timestamp: live, recent, stale, unknown. One system across cards, station detail, and navigation.',
                  trade: 'Slower to read than color, and every state needs a text label.',
                }}
              />
              <div className="loco-divider" />
              <Decision
                id="decision-03"
                num="03"
                heading="Surfaced the failure before arrival, not at it"
                body="A reservation is worth something only while the driver can still change plans. So a blocked bay shows up on the road, with minutes left to act."
                media={
                  <div className="loco-panel loco-panel--alert">
                    <span className="loco-annot loco-annot--left">
                      <span className="loco-chip">1 min ago · driver report</span>
                      <span className="loco-annot__line" />
                    </span>
                    <img loading="lazy" decoding="async" src={decAlert} alt="Alert: your bay may not be free on arrival, with options to switch to F301, hold F304, or pick another station" className="loco-panel__alert" />
                    <span className="loco-annot loco-annot--right">
                      <span className="loco-annot__line" />
                      <span className="loco-chip">Decide before you're there</span>
                    </span>
                  </div>
                }
                caption="The reservation held. The bay didn't. Eleven minutes out is early enough to choose."
                metric={{
                  value: '11 min',
                  evLabel: 'EVIDENCE · DEFENDED, NOT YET TESTED',
                  ev: "When the occupant hasn't left, a bar slides in: hold, switch bays, or switch stations. A charger going offline gets the same treatment.",
                  trade: 'It interrupts navigation. The alternative is the same news at the curb, with no options left.',
                }}
              />

              <blockquote className="loco-payoff">
                Loco Charge doesn't promise a charger will be free. It promises you'll know in time to do something about it.
              </blockquote>
            </section>

            {/* Method & Honesty */}
            <section className="cs-section loco-section--gap-32" id="method">
              <div className="loco-stack loco-stack--12">
                <p className="cs-label">METHOD</p>
                <h2 className="cs-section-heading">What six drivers can prove, and what they can't.</h2>
              </div>
              <div className="loco-evidence">
                {EVIDENCE_STATS.map(({ value, label }) => (
                  <div key={label} className="cs-impact-card loco-evidence__card">
                    <p className="cs-impact-card__value">{value}</p>
                    <p className="loco-evidence__label">{label}</p>
                  </div>
                ))}
              </div>
              <p className="cs-section-body loco-wide">One moderated round on a mid-fidelity prototype. Earlier percentage claims are left out; six people can't support them.</p>
              <div className="cs-impact-banner">
                <div className="cs-impact-banner__text">
                  <p className="cs-impact-banner__headline">Directional, not conclusive.</p>
                  <p className="cs-impact-banner__body">
                    <span className="loco-banner-label">VALIDATION</span> · Moderated sessions with six EV drivers on a mid-fidelity prototype. Task times measured in session; benchmarks from published figures. The working prototype has not been retested.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="loco-mask-icon cs-impact-banner__icon"
                  style={{ maskImage: `url(${iconCompass})`, WebkitMaskImage: `url(${iconCompass})` }}
                />
              </div>
            </section>

            {/* What's Next */}
            <section className="cs-section loco-section--gap-32" id="next">
              <div className="loco-stack loco-stack--12">
                <p className="cs-label">WHAT'S NEXT</p>
                <h2 className="cs-section-heading">Three problems left to solve.</h2>
              </div>
              <div className="cs-next-grid loco-next-grid">
                {NEXT_STEPS.map((text) => (
                  <div key={text} className="cs-next-card loco-next-card">
                    <span className="loco-next-card__arrow" aria-hidden="true">→</span>
                    <p className="cs-next-card__text">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Receipts */}
            <section className="cs-section cs-section--gap-20">
              <p className="cs-label">RECEIPTS</p>
              <div className="loco-receipts">
                {RECEIPTS.map(({ id, title, line, to, label }) => (
                  <button key={id} type="button" className="loco-receipt" onClick={() => scrollToSection(to)}>
                    <span className="loco-receipt__id">{id}</span>
                    <span className="loco-receipt__text">
                      <span className="loco-receipt__title">{title}</span>
                      <span className="loco-receipt__line">{line}</span>
                    </span>
                    <span className="loco-receipt__to">→ {label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Invite */}
            <section className="cs-section">
              <div className="cs-invite">
                <div className="cs-invite__content">
                  <p className="cs-invite__eyebrow">STILL CURIOUS?</p>
                  <h2 className="cs-invite__heading">
                    I&rsquo;d love to walk you<br />through my thinking.
                  </h2>
                  <p className="cs-invite__body">
                    Whether it&rsquo;s about this project, my process, or a role on your team, I&rsquo;m always up for a good conversation about design.
                  </p>
                  <div className="cs-invite__actions">
                    <button className="cs-invite__email" type="button" onClick={copyEmail}>
                      <img loading="lazy" decoding="async" src={iconMail} alt="" className="cs-invite__email-icon" />
                      <span>manohar.create@gmail.com</span>
                      <img loading="lazy" decoding="async" src={iconCopy} alt="Copy email address" />
                      {emailCopied && <span className="cs-invite__copied-tip" role="status">Copied!</span>}
                    </button>
                    <a className="cs-invite__linkedin" href="https://www.linkedin.com/in/manohar-achar/" target="_blank" rel="noreferrer">
                      LinkedIn <span>↗</span>
                    </a>
                  </div>
                </div>
                <div className="cs-invite__photo">
                  <img loading="lazy" decoding="async" src={invitePhoto} alt="Manohar Achar" />
                </div>
              </div>
            </section>

            {/* View Next */}
            <section className="cs-section">
              <p className="cs-label">VIEW NEXT</p>
              <div className="cs-viewnext-grid">
                {getViewNext('loco-charge').slice(0, isMobile ? 1 : 2).map(({ id, video, title, compact }) => (
                  <div key={id} className="cs-viewnext-card" onClick={() => onNavigate(getProjectPage(id))} data-cursor="view-project">
                    <div className="cs-viewnext-card__img">
                      <video src={video} loop muted playsInline preload="metadata" ref={playInView} aria-label={`${title} preview`} />
                    </div>
                    <h3 className="cs-viewnext-card__title">{title}</h3>
                    <p className="cs-viewnext-card__desc">{compact}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="loco-charge" onNavigate={onNavigate} />
    </div>
  )
}
