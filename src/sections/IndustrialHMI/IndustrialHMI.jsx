import { useState, useEffect, Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import { getViewNext, getProjectPage } from '../../data/projects'
import { playInView } from '../../lib/playInView'
import FitExhibit from '../../components/FitExhibit/FitExhibit'
import { EXHIBITS } from './exhibits'
import '../CooperantLearning/CooperantLearning.css'
import './IndustrialHMI.css'

// Invite assets are shared content (identical files also live in
// assets/mochitta) — same import trick Mochitta uses with Cooperant's CSS.
import invitePhoto from '../../assets/cooperant/v2/invite-photo.webp'
import iconCopy from '../../assets/cooperant/v2/icon-copy.svg'
import iconMail from '../../assets/cooperant/v2/icon-mail.webp'

// IBM Plex family is only used inside the industrial exhibits, so it's
// loaded at page level (once, never removed — other visits stay warm).
const PLEX_FONTS_ID = 'hmi-plex-fonts'
const PLEX_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@500;600&display=swap'

const STANDING_CAPTION =
  'Interface recreated in my own visual treatment; proprietary details and branding fictionalized for confidentiality.'

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem & Context' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Key Decisions' },
  { id: 'system', label: 'Design System' },
  { id: 'reach', label: 'Reach' },
  { id: 'shipped', label: 'What Shipped' },
  { id: 'receipts', label: 'Receipts' },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const META_CHIPS = [
  { label: 'Platform', value: 'Industrial machine controller' },
  { label: 'Displays', value: '4.3″ · 7″ · 10.1″' },
  { label: 'Reach', value: '4 brands · 18 configurations' },
  { dot: true, value: 'In production · 4+ yrs' },
]

const CONTRIBUTION = [
  {
    label: 'Owned',
    body: "The operator-facing information hierarchy, machine-state and alarm surfacing, the home-page framework, the touch/interaction model within the hardware's limits, the 34-component controller UI system, plus the UI requirements in the platform SRS.",
  },
  {
    label: 'Collaborated',
    body: 'Control logic, alarm conditions, and hardware constraints with the controls/engineering team.',
  },
  {
    label: 'Influenced',
    body: 'The state-first hierarchy, adopted as the platform home framework across 18 machine configurations.',
  },
]

const OUTCOMES = [
  {
    num: '18',
    label: 'Machine configurations',
    desc: 'Adopted as the platform home framework across 4 brands, 3 display sizes, and 18 machine configurations.',
  },
  {
    num: '34',
    label: 'Component UI system',
    desc: 'Built and standardized a 34-component controller UI system across 3 sizes and 4 brands — replacing 4 separate per-brand UI approaches with one.',
  },
  {
    num: '4+',
    unit: 'yrs',
    label: 'Still the standard',
    desc: 'Still the standard controller UI 4+ years later.',
  },
]

const CONSTRAINTS = [
  { index: '01', title: 'Resistive, single-touch', desc: 'No gestures; every action a deliberate tap.' },
  { index: '02', title: 'Gloved operation', desc: 'Targets sized for a gloved fingertip.' },
  { index: '03', title: 'Glance-and-glare', desc: 'Read in ~1 second, at distance, under factory light and noise.' },
  { index: '04', title: 'Fixed hardware sizes', desc: '4.3″, 7″, 10.1″; the 4.3″ has almost no room.' },
  { index: '05', title: 'Safety-critical', desc: 'A misread state means downtime or a hazard, not just friction.' },
  { index: '06', title: 'Multi-language', desc: 'Every state and alarm label ships in 12 languages.' },
]

const REACH_NODES = [
  { value: '4', label: 'Brands' },
  { value: '3', label: 'Display sizes' },
  { value: '18', label: 'Configurations' },
  { value: '12', label: 'Languages' },
  { value: '40+', label: 'Markets' },
]

const RECEIPTS = [
  {
    index: 'R1',
    tag: 'Risk / edge',
    title: 'Alarm taxonomy — Trip vs Warning matrix',
    note: 'The severity model made explicit — the requirement that a state is never signaled by color alone.',
    map: '→ Decision 01',
  },
  {
    index: 'R2',
    title: '4.3″ 3-page alarm filter',
    note: 'The "no room" constraint made literal — one filter split across three pages.',
    map: '→ Decision 02',
  },
  {
    index: 'R3',
    title: 'Touch-target / ergonomic sizing spec',
    note: 'The gloved-hand minimums — 48 px standard, 56 px safety-critical.',
    map: '→ Decision 02',
  },
  {
    index: 'R4',
    title: 'Three-size home + size-logic diagram',
    note: 'What survives, what collapses, and what is protected at every display size.',
    map: '→ Decision 03',
  },
  {
    index: 'R5',
    title: 'Reach diagram',
    note: 'The blast radius — brands, sizes, configurations, languages, and markets.',
    map: '→ Section 06b',
  },
  {
    index: 'R6',
    title: 'Before / after home',
    note: 'Same data, opposite hierarchy — the buried warning surfaced.',
    map: '→ Problem + Decision 01',
  },
]

export default function IndustrialHMI({ onNavigate, guest, showPassCard }) { // eslint-disable-line no-unused-vars
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isMobile = useIsMobile()
  const sectionsRef = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Exhibit fonts (IBM Plex) — injected once, id-guarded, never removed.
  useEffect(() => {
    if (document.getElementById(PLEX_FONTS_ID)) return
    const link = document.createElement('link')
    link.id = PLEX_FONTS_ID
    link.rel = 'stylesheet'
    link.href = PLEX_FONTS_HREF
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
    <div className="cs-page hmi-page">
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
        <p className="cs-mobile-drawer__context">CASE STUDY / INDUSTRIAL HMI</p>
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

            {/* 0 — Above the fold */}
            <section className="cs-section hmi-section" id="overview">
              <div className="hmi-breadcrumb">
                <span className="hmi-breadcrumb__root">Case Study</span>
                <span className="hmi-breadcrumb__sep">/</span>
                <span className="hmi-breadcrumb__page">Industrial HMI — Machine Controller</span>
              </div>
              <div className="hmi-accent-rule" />
              <h1 className="hmi-hero-title">
                Operators had to catch a failing compressor before the interface made it obvious one was failing — so I redefined what the machine shows first.
              </h1>
              <div className="hmi-meta-row">
                {META_CHIPS.map(({ label, value, dot }) => (
                  <div key={value} className="hmi-chip">
                    {dot ? <span className="hmi-chip__dot" /> : <span className="hmi-chip__label">{label}</span>}
                    <span className="hmi-chip__value">{value}</span>
                  </div>
                ))}
              </div>

              <div className="hmi-panel hmi-panel--hero">
                <FitExhibit exhibit={EXHIBITS.heroHome} animateStrip />
              </div>
              <p className="hmi-standing-caption">{STANDING_CAPTION}</p>

              <div className="hmi-contribution">
                <p className="hmi-eyebrow">My contribution</p>
                <div className="hmi-contribution__grid">
                  {CONTRIBUTION.map(({ label, body }) => (
                    <div key={label}>
                      <p className="hmi-contribution__label">{label}</p>
                      <p className="hmi-body">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 1 — Problem & context */}
            <section className="cs-section hmi-section" id="problem">
              <div className="hmi-problem-grid">
                <div>
                  <p className="hmi-eyebrow">01 / Problem &amp; context</p>
                  <h2 className="hmi-section-heading hmi-problem-heading">
                    The states that mattered most were the hardest to see.
                  </h2>
                </div>
                <div className="hmi-problem-copy">
                  <p className="hmi-lead">
                    This interface doesn't live on a desk. It's bolted to an industrial air compressor on a loud, hot factory floor, read by an operator in gloves glancing between other tasks.
                  </p>
                  <p className="hmi-lead">
                    Trip and maintenance states sat below the routine numbers an operator reads all day — so a machine heading toward a fault could go unnoticed until it faulted. I mapped what an operator needs to catch <em className="hmi-em hmi-em--italic">first</em>, and rebuilt the home hierarchy around machine state.
                  </p>
                </div>
              </div>
            </section>

            {/* 2 — Outcomes */}
            <section className="cs-section hmi-section" id="outcomes">
              <p className="hmi-eyebrow">02 / Outcomes</p>
              <div className="hmi-cards-grid">
                {OUTCOMES.map(({ num, unit, label, desc }) => (
                  <div key={label} className="hmi-stat-card">
                    <div className="hmi-stat-card__numrow">
                      <span className="hmi-stat-card__num">{num}</span>
                      {unit && <span className="hmi-stat-card__unit">{unit}</span>}
                    </div>
                    <p className="hmi-stat-card__label">{label}</p>
                    <p className="hmi-small">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 — Constraints */}
            <section className="cs-section hmi-section" id="constraints">
              <p className="hmi-eyebrow">03 / Constraints</p>
              <div className="hmi-cards-grid hmi-cards-grid--constraints">
                {CONSTRAINTS.map(({ index, title, desc }) => (
                  <div key={index} className="hmi-constraint-card">
                    <span className="hmi-constraint-card__index">{index}</span>
                    <p className="hmi-constraint-card__title">{title}</p>
                    <p className="hmi-small">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 — Approach */}
            <section className="cs-section hmi-section" id="approach">
              <p className="hmi-eyebrow">04 / Approach</p>
              <h2 className="hmi-section-heading hmi-section-heading--wide">
                I designed from the operator's reality, not the parameter list.
              </h2>
              <div className="hmi-approach-grid">
                <p className="hmi-lead">
                  The controller had been built like desktop software. I reframed it around the person standing at a running machine — what must be seen first, what can wait, and what the hand and eye can actually do on that hardware.
                </p>
                <p className="hmi-lead">
                  And it couldn't be a one-off. The same thinking had to hold across four brands and three display sizes — so the work was as much a system as a screen.
                </p>
              </div>
            </section>

            {/* 5 — Key decisions */}
            <section className="cs-section hmi-section" id="decisions">
              <p className="hmi-eyebrow">05 / Key decisions</p>

              {/* Decision 01 */}
              <div className="hmi-decision">
                <p className="hmi-eyebrow hmi-eyebrow--accent">Decision 01</p>
                <h3 className="hmi-decision-headline">Surface machine state above routine parameters</h3>
                <p className="hmi-lead hmi-decision-body">
                  The states with real consequence — trip, imminent fault, service-due — were buried under numbers read all day. I inverted the hierarchy so state is caught in the first glance, surfaced active alarms on the home itself, and labeled every state in <span className="hmi-em">plain language, not icons</span>, so it can't be misread.
                </p>
                <div className="hmi-proof-row">
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Tradeoff</p>
                    <p className="hmi-small hmi-proof-col__body">Routine parameters gave up prime real estate and moved into secondary views.</p>
                  </div>
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Evidence</p>
                    <p className="hmi-small hmi-proof-col__body">Adopted into the platform home framework across 18 configurations.</p>
                  </div>
                </div>
                <div className="hmi-panel">
                  <FitExhibit exhibit={EXHIBITS.beforeAfter} />
                </div>
                <p className="hmi-standing-caption">{STANDING_CAPTION}</p>
                <FitExhibit exhibit={EXHIBITS.diagramTaxonomy} className="hmi-diagram" />
              </div>

              {/* Decision 02 */}
              <div className="hmi-decision">
                <p className="hmi-eyebrow hmi-eyebrow--accent">Decision 02</p>
                <h3 className="hmi-decision-headline">Design the alarm interaction for the gloved hand</h3>
                <p className="hmi-lead hmi-decision-body">
                  Resistive single-touch can't do gestures, and a gloved fingertip is imprecise. On the 4.3″ display there was no room to show a filter at once — so I made it a deliberate <span className="hmi-em">3-page sequence</span> with larger targets and fewer competing actions, rather than one cramped screen.
                </p>
                <div className="hmi-proof-row">
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Tradeoff</p>
                    <p className="hmi-small hmi-proof-col__body">More steps on the smallest display — in exchange for taps that land and states that don't get mis-tapped.</p>
                  </div>
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Evidence</p>
                    <p className="hmi-small hmi-proof-col__body">Validated through field and dealer review across all 3 display sizes under gloved-operation conditions.</p>
                  </div>
                </div>
                <div className="hmi-panel">
                  <FitExhibit exhibit={EXHIBITS.filterTrio} />
                </div>
                <p className="hmi-standing-caption">{STANDING_CAPTION}</p>
                <FitExhibit exhibit={EXHIBITS.diagramTouch} className="hmi-diagram" />
              </div>

              {/* Decision 03 */}
              <div className="hmi-decision">
                <p className="hmi-eyebrow hmi-eyebrow--accent">Decision 03</p>
                <h3 className="hmi-decision-headline">One interface across three fixed displays</h3>
                <p className="hmi-lead hmi-decision-body">
                  The same job runs on 4.3″, 7″, and 10.1″. I defined what survives, what collapses to a list, and what needs a genuinely different pattern — with <span className="hmi-em">the safety-critical primary protected at every size</span>.
                </p>
                <div className="hmi-proof-row">
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Tradeoff</p>
                    <p className="hmi-small hmi-proof-col__body">A locked primary (discharge pressure) on constrained views — giving up per-view customization to guarantee the critical value is never displaced.</p>
                  </div>
                  <div className="hmi-proof-col">
                    <p className="hmi-proof-col__label">Evidence</p>
                    <p className="hmi-small hmi-proof-col__body">Built on the 34-component system I built and owned, reused across 3 sizes and 4 brands, consolidating 4 per-brand approaches into one framework.</p>
                  </div>
                </div>
                <div className="hmi-panel">
                  <FitExhibit exhibit={EXHIBITS.threeSize} />
                  <p className="hmi-scale-caption">4.3″ · 7″ · 10.1″ — shown at true relative scale</p>
                </div>
                <p className="hmi-standing-caption">{STANDING_CAPTION}</p>
                <FitExhibit exhibit={EXHIBITS.diagramSizeLogic} className="hmi-diagram" />
              </div>
            </section>

            {/* 6 — Design system */}
            <section className="cs-section hmi-section" id="system">
              <p className="hmi-eyebrow">06 / Design system</p>
              <p className="hmi-lead hmi-system-lead">
                One dark, high-contrast system built for the floor: a reserved safety palette (state color never decorative), monospaced numeric readouts that stay legible at a glance, plain-language state labels, and touch targets sized for gloves on resistive hardware.
              </p>
              <div className="hmi-panel">
                <FitExhibit exhibit={EXHIBITS.alarmPair} />
              </div>
              <p className="hmi-standing-caption">{STANDING_CAPTION}</p>
              <div className="hmi-panel hmi-panel--tight">
                <FitExhibit exhibit={EXHIBITS.alarmInfo} />
              </div>
            </section>

            {/* 6b — Reach */}
            <section className="cs-section hmi-section" id="reach">
              <p className="hmi-eyebrow">06b / Reach</p>
              <h2 className="hmi-section-heading hmi-section-heading--wide">
                One system, four brands, an entire product line.
              </h2>
              <div className="hmi-reach-panel">
                {REACH_NODES.map(({ value, label }, i) => (
                  <Fragment key={label}>
                    {i > 0 && <span className="hmi-reach-x" aria-hidden="true">×</span>}
                    <div className="hmi-reach-node">
                      <span className="hmi-reach-node__num">{value}</span>
                      <span className="hmi-reach-node__label">{label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </section>

            {/* 7 — What shipped */}
            <section className="cs-section hmi-section" id="shipped">
              <p className="hmi-eyebrow">07 / What shipped</p>
              <p className="hmi-lead hmi-shipped-body">
                The state-first hierarchy shipped across the platform and became the standard home framework — still in use 4+ years on.
              </p>

              {/* Validation */}
              <div className="cs-quote hmi-quote">
                <div className="cs-quote__bar" />
                <div className="cs-quote__text">
                  <p className="hmi-eyebrow hmi-quote__eyebrow">Validation</p>
                  <p className="cs-quote__quote hmi-quote__quote">
                    <span className="hmi-quote__lead">Validated through 3 rounds of field and dealer review</span> across all three display sizes — legibility under glare, gloved operation, alarm comprehension, and whether the state-first hierarchy held up across 4.3″, 7″, and 10.1″.
                  </p>
                </div>
              </div>
            </section>

            {/* Receipts */}
            <section className="cs-section hmi-section" id="receipts">
              <p className="hmi-eyebrow">Receipts</p>
              <div className="hmi-cards-grid">
                {RECEIPTS.map(({ index, tag, title, note, map }) => (
                  <div key={index} className="hmi-receipt-card">
                    {tag ? (
                      <div className="hmi-receipt-card__head">
                        <span className="hmi-receipt-card__index">{index}</span>
                        <span className="hmi-receipt-card__tag">{tag}</span>
                      </div>
                    ) : (
                      <span className="hmi-receipt-card__index">{index}</span>
                    )}
                    <p className="hmi-receipt-card__title">{title}</p>
                    <p className="hmi-receipt-card__note">{note}</p>
                    <p className="hmi-receipt-card__map">{map}</p>
                  </div>
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
                    Whether it&rsquo;s about this project, my process, or a role on your team — I&rsquo;m always up for a good conversation about design.
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
                {getViewNext('industrial-hmi').slice(0, isMobile ? 1 : 2).map(({ id, video, title, description }) => (
                  <div key={id} className="cs-viewnext-card" onClick={() => onNavigate(getProjectPage(id))} data-cursor="view-project">
                    <div className="cs-viewnext-card__img">
                      <video src={video} loop muted playsInline preload="metadata" ref={playInView} aria-label={`${title} preview`} />
                    </div>
                    <h3 className="cs-viewnext-card__title">{title}</h3>
                    <p className="cs-viewnext-card__desc">{description}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="industrial-hmi" onNavigate={onNavigate} />
    </div>
  )
}
