import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import { getViewNext, getProjectPage } from '../../data/projects'
import { playInView } from '../../lib/playInView'
import FitExhibit from '../../components/FitExhibit/FitExhibit'
import NdaNoticeModal from '../../components/NdaNoticeModal/NdaNoticeModal'
import { FLEET_EXHIBITS } from './exhibits'
import '../CooperantLearning/CooperantLearning.css'
import './exhibits.css'
import './FleetSaaS.css'

// Invite assets are shared content (identical files also live in
// assets/mochitta) — same import trick IndustrialHMI uses.
import invitePhoto from '../../assets/cooperant/v2/invite-photo.webp'
import iconCopy from '../../assets/cooperant/v2/icon-copy.svg'
import iconMail from '../../assets/cooperant/v2/icon-mail.webp'

// The four product flows, pre-rendered as looping videos.
import flow1Video from '../../assets/fleet/flow1-drilldown.mp4'
import flow2Video from '../../assets/fleet/flow2-handoff.mp4'
import flow3Video from '../../assets/fleet/flow3-commsloss.mp4'
import flow4Video from '../../assets/fleet/flow4-guarded.mp4'
import flow1Poster from '../../assets/fleet/poster-flow1-drilldown.jpg'
import flow2Poster from '../../assets/fleet/poster-flow2-handoff.jpg'
import flow3Poster from '../../assets/fleet/poster-flow3-commsloss.jpg'
import flow4Poster from '../../assets/fleet/poster-flow4-guarded.jpg'

// Hero videos — desktop + mobile cuts, loop-always muted autoplay.
import heroFleet from '../../assets/fleet/hero-fleet.mp4'
import heroFleetMobile from '../../assets/fleet/hero-fleet-mobile.mp4'
import heroFleetPoster from '../../assets/fleet/poster-hero-fleet.jpg'
import heroFleetMobilePoster from '../../assets/fleet/poster-hero-fleet-mobile.jpg'

// Product-identity fonts (Space Grotesk + IBM Plex) are only used inside the
// fleet exhibits, so they're loaded at page level (once, never removed).
const PRODUCT_FONTS_ID = 'flx-product-fonts'
const PRODUCT_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap'

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'impact', label: 'Impact' },
  { id: 'problem', label: 'The Problem' },
  { id: 'tour', label: 'Product Tour' },
  { id: 'decisions', label: 'What Was Hard' },
  { id: 'system', label: 'Design System' },
  { id: 'closing', label: 'Reflections' },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const META_CHIPS = [
  { label: 'My role', value: 'Product Designer' },
  { label: 'Team', value: 'Controls + software program' },
  { label: 'Timeline', value: '2023 – 2024' },
  { label: 'Platform', value: 'Web · remote-monitoring layer' },
]

const IMPACT_TILES = [
  { value: '~85', unit: '%', label: 'Adoption', note: 'time in coordinated mode: managers left the automation on' },
  { value: '~13', unit: '%', label: 'Energy', note: 'less energy on the pilot line' },
  { value: '~99.4', unit: '%', label: 'Uptime', note: 'availability: pressure held through 6 failure events' },
  { value: '~40', label: 'Scale', note: 'facilities after the pilot · ~150 assets · ~200 users' },
]

const CONTRIBUTION = [
  {
    label: 'Owned',
    body: 'The facility-manager–facing fleet layer: the dashboard and status model, the coordination legibility, the guarded remote-control model, and the three-channel design system across the fleet screens.',
  },
  {
    label: 'Collaborated',
    body: 'With controls and software engineers on sequencing behavior and feasibility; with field and pilot stakeholders on validation.',
  },
  {
    label: 'Influenced',
    body: 'Platform-level direction: the legibility-first approach shaped how the broader controller experience surfaced system condition.',
  },
]

const PROBLEM_CARDS = [
  {
    num: '01',
    title: 'The automation worked.',
    body: 'Compressors coordinated on their own to hold air pressure, balance wear, and cut energy across the plant.',
  },
  {
    num: '02',
    title: 'But it was invisible.',
    body: "Managers couldn't see what the automation was doing, or why it made the moves it made.",
  },
  {
    num: '03',
    title: 'So they ran it by hand.',
    body: "They didn't trust what they couldn't see, reverted to manual control, and lost the savings.",
  },
]

const CONSTRAINTS = [
  'Existing single-machine platform',
  'Live industrial machines',
  'Automation the user had to trust',
  'Confidential control system, recreated',
]

const TOUR_CROPS = [
  { key: 'fleetLight', lead: 'Fleet', rest: ': the whole plant at a glance' },
  { key: 'assetDetail', lead: 'Drill into one machine', rest: ': depth preserved' },
  { key: 'coordination', lead: 'Coordination', rest: ': the invisible, made legible' },
]

// Loop-always hero video: force muted + play() on mount. Belt-and-braces
// against the React autoplay quirk (muted set as a property, not an
// attribute, so the browser's autoplay gate can still block it).
function playAlways(el) {
  if (!el) return
  el.muted = true
  const tryPlay = () => el.play?.().catch(() => {})
  tryPlay()
  el.addEventListener('canplay', tryPlay, { once: true })
}

function FlowVideo({ src, poster }) {
  return (
    <video
      className="flx-flow-video"
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      ref={playInView}
      aria-hidden="true"
    />
  )
}

export default function FleetSaaS({ onNavigate, guest, showPassCard }) { // eslint-disable-line no-unused-vars
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isMobile = useIsMobile()
  const sectionsRef = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Exhibit fonts (product identity) — injected once, id-guarded, never removed.
  useEffect(() => {
    if (document.getElementById(PRODUCT_FONTS_ID)) return
    const link = document.createElement('link')
    link.id = PRODUCT_FONTS_ID
    link.rel = 'stylesheet'
    link.href = PRODUCT_FONTS_HREF
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
    <div className="cs-page flx-page">
      <NdaNoticeModal studyKey="fleet" projectTitle="Fleet Coordination Platform" />
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
        <p className="cs-mobile-drawer__context">CASE STUDY / FLEET COORDINATION PLATFORM</p>
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

            {/* 0 — Hero / Overview (impact + contribution nest here, as designed) */}
            <section className="cs-section flx-section" id="overview">
              {/* Split hero — shared cs-v2-hero-row: copy left (fixed 440px),
                  product dashboard right. Same primitive Cooperant/Mochitta use. */}
              <div className="cs-v2-hero-row">
                <div className="cs-v2-hero-copy">
                  <p className="cs-label">FLEET COORDINATION PLATFORM</p>
                  <h1 className="cs-hero-title">
                    Facility managers couldn't see why their compressors coordinated themselves, so they switched it off and ran them by hand.
                  </h1>
                  <p className="cs-hero-body">
                    I designed the fleet layer that made the automation legible enough to trust. A web platform that lets a facility manager run a whole plant's worth of compressors as one coordinated system (holding air pressure, balancing wear, and cutting energy) from a single screen.
                  </p>
                  <div className="cs-chip-row">
                    {META_CHIPS.map(({ label, value }) => (
                      <div key={label} className="cs-chip">
                        <p className="cs-chip__label">{label}</p>
                        <p className="cs-chip__value">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flx-pill-row">
                    <span className="flx-pill"><span className="flx-pill__dot" />Shipped &amp; live</span>
                  </div>
                </div>
                <div className="flx-hero-visual">
                  <div className="flx-hero-frame">
                    <video
                      ref={playAlways}
                      className="flx-hero-video"
                      src={isMobile ? heroFleetMobile : heroFleet}
                      poster={isMobile ? heroFleetMobilePoster : heroFleetPoster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* Impact strip */}
              <div className="flx-impact" id="impact">
                <p className="flx-eyebrow flx-impact__eyebrow">The impact</p>
                <div className="flx-impact-grid">
                  {IMPACT_TILES.map(({ value, unit, label, note }) => (
                    <div key={label} className="flx-impact-tile">
                      <div className="flx-impact-tile__value">{value}{unit && <span className="flx-impact-tile__unit">{unit}</span>}</div>
                      <p className="flx-impact-tile__label">{label}</p>
                      <p className="flx-impact-tile__note">{note}</p>
                    </div>
                  ))}
                </div>
                <p className="flx-impact__lead">Legible automation drove adoption; adoption unlocked the energy and uptime benefits.</p>
              </div>

              {/* Contribution strip */}
              <div className="flx-contribution">
                <p className="flx-eyebrow flx-contribution__eyebrow">What I contributed</p>
                <div className="flx-contribution__grid">
                  {CONTRIBUTION.map(({ label, body }) => (
                    <div key={label}>
                      <p className="flx-contribution__label">{label}</p>
                      <p className="flx-contribution__body">{body}</p>
                    </div>
                  ))}
                </div>
                <p className="flx-contribution__honest"><b>Honestly:</b> a multidisciplinary controls + software program. I owned the design of the fleet / coordination experience, not the control logic or the whole platform.</p>
              </div>
            </section>

            {/* 1 — The problem */}
            <section className="cs-section flx-section" id="problem">
              <p className="flx-eyebrow">The problem</p>
              <h2 className="flx-h2">The plant ran on coordination no one could see or trust.</h2>
              <div className="flx-problem-grid">
                {PROBLEM_CARDS.map(({ num, title, body }) => (
                  <div key={num} className="flx-problem-card">
                    <p className="flx-problem-card__num">{num}</p>
                    <p className="flx-problem-card__title">{title}</p>
                    <p className="flx-problem-card__body">{body}</p>
                  </div>
                ))}
              </div>
              <div className="flx-constraints">
                {CONSTRAINTS.map((label) => (
                  <span key={label} className="flx-constraint">{label}</span>
                ))}
              </div>
            </section>

            {/* 2 — Product tour */}
            <section className="cs-section flx-section" id="tour">
              <p className="flx-eyebrow">Product tour · the mental model</p>
              <h2 className="flx-h2">One screen for a whole plant's worth of compressors.</h2>
              <p className="flx-intro flx-tour-intro">
                The manager doesn't think in machines: they think in whether the plant has air, at what cost. The product is built at that altitude, with any single machine one click away.
              </p>

              <div className="flx-tour-row">
                {TOUR_CROPS.map(({ key, lead, rest }, i) => (
                  <div key={key} className="flx-tour-step">
                    {i > 0 && (
                      <svg className="flx-tour-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 12H20M14 6l6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <figure className="flx-crop">
                      <div className="flx-exhibit-shadow">
                        <FitExhibit exhibit={FLEET_EXHIBITS[key]} />
                      </div>
                      <figcaption className="flx-fig-caption"><b>{lead}</b>{rest}</figcaption>
                    </figure>
                  </div>
                ))}
              </div>

              <div className="flx-motion">
                <div className="flx-motion__copy">
                  <p className="flx-eyebrow flx-eyebrow--accent flx-motion__eyebrow">In motion</p>
                  <p className="flx-motion__title">Fleet → asset, the altitude change.</p>
                  <p className="flx-motion__body">One click drops from the whole plant into a single machine: same pressure, same lead role, now with per-machine depth. The overview and the detail are one continuous move.</p>
                </div>
                <div className="flx-video-frame flx-motion__media">
                  <FlowVideo src={flow1Video} poster={flow1Poster} />
                </div>
              </div>

              {/* Control-Room Dark moment */}
              <div className="flx-dark">
                <div>
                  <p className="flx-dark__eyebrow">Control-Room Dark</p>
                  <p className="flx-dark__caption">The same fleet, read at a glance on the night shift.</p>
                </div>
                <div className="flx-dark__stage">
                  <FitExhibit exhibit={FLEET_EXHIBITS.fleetDark} />
                </div>
              </div>
            </section>

            {/* 3 — What was hard */}
            <section className="cs-section flx-section" id="decisions">
              <p className="flx-eyebrow">What was hard</p>
              <h2 className="flx-h2">The automation ran the plant; the manager still answered for it.</h2>
              <p className="flx-intro">
                The coordination that held pressure and cut cost ran itself and hid its reasoning, yet the manager was accountable when it failed. Three decisions made it legible, trustworthy, and safe to leave running.
              </p>

              {/* Decision A */}
              <div className="flx-decision">
                <div className="flx-decision__head">
                  <span className="flx-decision__num">01</span>
                  <h3 className="flx-decision__statement">Rolled the whole fleet into one status view.</h3>
                </div>
                <div className="flx-decision__grid flx-ind">
                  <p className="flx-decision__rationale">Managers thought in "does my plant have air, at what cost". Opening each machine separately buried that answer. One roll-up view answers it before anything else.</p>
                  <div className="flx-tradeoff">
                    <p className="flx-tradeoff__label">Tradeoff</p>
                    <p className="flx-tradeoff__body">Gave up per-machine density on the overview, recovered on drill-down.</p>
                  </div>
                </div>
                <div className="flx-ba flx-ind">
                  <figure className="flx-ba__fig flx-w320">
                    <figcaption className="flx-ba__caption">Before · one machine at a time</figcaption>
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.beforeOnemachine} />
                    </div>
                  </figure>
                  <span className="flx-ba__arrow" aria-hidden="true">→</span>
                  <figure className="flx-ba__fig flx-w602">
                    <figcaption className="flx-ba__caption flx-ba__caption--accent">After · one fleet view</figcaption>
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.fleetLight} />
                    </div>
                  </figure>
                </div>
                <div className="flx-delta">
                  <span className="flx-delta__label">Evidence · pilot line</span>
                  <span className="flx-delta__sep" aria-hidden="true" />
                  <p className="flx-delta__value"><b>~8 min → under 1 min</b> <span>· time to read plant status</span></p>
                </div>
              </div>

              {/* Decision B */}
              <div className="flx-decision">
                <div className="flx-decision__head">
                  <span className="flx-decision__num">02</span>
                  <div>
                    <p className="flx-decision__spine">The spine of the project</p>
                    <h3 className="flx-decision__statement">Made the automation show why it acted.</h3>
                  </div>
                </div>
                <div className="flx-decision__grid flx-ind">
                  <p className="flx-decision__rationale">Managers distrust automation they can't see. The fix wasn't more automation. It was making the coordination's reasoning visible: why this machine leads, why it just handed off, what happens if comms drop.</p>
                  <div className="flx-tradeoff">
                    <p className="flx-tradeoff__label">Tradeoff</p>
                    <p className="flx-tradeoff__body">Added interface to explain decisions the system could have hidden.</p>
                  </div>
                </div>
                <div className="flx-ba flx-ind">
                  <figure className="flx-ba__fig flx-w320">
                    <figcaption className="flx-ba__caption">Before · raw setpoints</figcaption>
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.beforeSetpoints} />
                    </div>
                  </figure>
                  <span className="flx-ba__arrow" aria-hidden="true">→</span>
                  <figure className="flx-ba__fig flx-w602">
                    <figcaption className="flx-ba__caption flx-ba__caption--accent">After · why this machine leads</figcaption>
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.coordination} />
                    </div>
                  </figure>
                </div>
                <div className="flx-receipts flx-ind">
                  <p className="flx-receipts__label">Legibility in motion</p>
                  <div className="flx-receipts__row">
                    <figure className="flx-receipt flx-w480">
                      <div className="flx-video-frame">
                        <FlowVideo src={flow2Video} poster={flow2Poster} />
                      </div>
                      <figcaption className="flx-fig-caption"><b>Lead handoff</b>: pressure holds through the rotation</figcaption>
                    </figure>
                    <figure className="flx-receipt flx-w480">
                      <div className="flx-video-frame">
                        <FlowVideo src={flow3Video} poster={flow3Poster} />
                      </div>
                      <figcaption className="flx-fig-caption"><b>Comms-loss</b>: the plant stays up, shown plainly</figcaption>
                    </figure>
                  </div>
                </div>
                <div className="flx-delta">
                  <span className="flx-delta__label">Evidence · pilot line</span>
                  <span className="flx-delta__sep" aria-hidden="true" />
                  <p className="flx-delta__value"><b>Coordination support calls down ~30%</b> <span>· managers who ran manual left it on</span></p>
                </div>
              </div>

              {/* Decision C */}
              <div className="flx-decision">
                <div className="flx-decision__head">
                  <span className="flx-decision__num">03</span>
                  <h3 className="flx-decision__statement">Made remote control impossible to fire accidentally.</h3>
                </div>
                <div className="flx-decision__grid flx-ind">
                  <p className="flx-decision__rationale">The platform could start and stop real spinning machines from a browser. Power that useful is also dangerous, so it had to be un-fireable by accident or the wrong person.</p>
                  <div className="flx-tradeoff">
                    <p className="flx-tradeoff__label">Tradeoff</p>
                    <p className="flx-tradeoff__body">More friction on every remote action: enable, confirm, audit.</p>
                  </div>
                </div>
                <div className="flx-ba flx-ind">
                  <figure className="flx-ba__fig flx-w320">
                    <figcaption className="flx-ba__caption">Before · ungated control</figcaption>
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.beforeUngated} />
                    </div>
                  </figure>
                  <span className="flx-ba__arrow" aria-hidden="true">→</span>
                  <figure className="flx-ba__fig flx-w602">
                    <figcaption className="flx-ba__caption flx-ba__caption--accent">After · enable → confirm → audit</figcaption>
                    <div className="flx-video-frame flx-video-frame--r10">
                      <FlowVideo src={flow4Video} poster={flow4Poster} />
                    </div>
                  </figure>
                </div>
                <div className="flx-receipts flx-ind">
                  <p className="flx-receipts__label">Every action, on the record</p>
                  <figure className="flx-receipt flx-w980">
                    <div className="flx-exhibit-shadow">
                      <FitExhibit exhibit={FLEET_EXHIBITS.audit} />
                    </div>
                    <figcaption className="flx-fig-caption"><b>Audit view</b>: who did what, to which machine, when</figcaption>
                  </figure>
                </div>
                <div className="flx-delta">
                  <span className="flx-delta__label">Evidence</span>
                  <span className="flx-delta__sep" aria-hidden="true" />
                  <p className="flx-delta__value"><b>No unauthorized actions</b> <span>· every attempt gated &amp; logged · 100% audit coverage by design</span></p>
                </div>
              </div>
            </section>

            {/* 4 — Design system + what shipped */}
            <section className="cs-section flx-section" id="system">
              <p className="flx-eyebrow">Design system + what shipped</p>
              <h2 className="flx-h2 flx-h2--wide">One visual language where color only ever means something.</h2>
              <p className="flx-intro flx-system-lead">
                A quiet steel base carries structure; a single Signal channel carries coordination; a safety channel carries alarm. Three chromatic channels that never overlap, so a machine can read "running" and "lead" at once without the colors fighting.
              </p>

              <div className="flx-dsboard flx-exhibit-shadow">
                <FitExhibit exhibit={FLEET_EXHIBITS.dsBoard} />
              </div>
              <p className="flx-mono-caption"><span className="flx-mono-caption__dot" />The three-channel color system: the same tokens repaint the whole product light or dark.</p>

              <div className="flx-ds-receipts">
                <figure className="flx-receipt flx-ds-energy">
                  <div className="flx-exhibit-shadow">
                    <FitExhibit exhibit={FLEET_EXHIBITS.energy} />
                  </div>
                  <figcaption className="flx-fig-caption"><b>Energy by state</b>: where the plant's largest electrical load goes</figcaption>
                </figure>
              </div>

              <h2 className="flx-h2 flx-h2--wide flx-h2--shipped">Shipped, then scaled across forty facilities after the pilot.</h2>
              <div className="flx-ship-grid">
                <div className="flx-ship-card">
                  <p className="flx-ship-card__label">What shipped</p>
                  <p className="flx-ship-card__body">The fleet layer went live and rolled out past the pilot, across ~40 facilities, ~150 assets, ~200 users.</p>
                </div>
                <div className="flx-ship-card">
                  <p className="flx-ship-card__label flx-ship-card__label--accent">What's next</p>
                  <p className="flx-ship-card__body">Predictive-maintenance surfacing and cross-plant benchmarking, extending the same legibility to what hasn't happened yet.</p>
                </div>
              </div>
              <div className="flx-validation">
                <span className="flx-validation__chip">Pilot test · field data</span>
                <p className="flx-validation__body">Validated on the pilot line: coordinated-mode adoption, energy, and downtime were measured across four machines before the rollout.</p>
              </div>
            </section>

            {/* 5 — Closing */}
            <section className="cs-section flx-section" id="closing">
              <p className="flx-eyebrow flx-closing-eyebrow">What I learned</p>
              <div className="flx-closing">
                <h2 className="flx-h2 flx-closing__h2">What building trust into automation taught me.</h2>
                <p className="flx-pullquote">The hardest part of this wasn't the dashboard: it was making an automated system legible enough that the person accountable for it would trust it and leave it on. That's the design problem behind every product where a human has to supervise automation, and it's the one I'm built to solve.</p>
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
                {getViewNext('fleet').slice(0, isMobile ? 1 : 2).map(({ id, video, title, compact }) => (
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

      <Footer activePage="fleet" onNavigate={onNavigate} />
    </div>
  )
}
