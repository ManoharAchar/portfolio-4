import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import ScrollVideo from '../../components/ScrollVideo/ScrollVideo'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import AppendixAccordion from '../../components/AppendixAccordion/AppendixAccordion'
import { useReveal } from '../../lib/useReveal'
import './CooperantLearning.css'

import heroVideo from '../../assets/cooperant/Hero video.mp4'
import podcastVideo from '../../assets/cooperant/Podcast page.mp4'
import episodeVideo from '../../assets/cooperant/Episode page.mp4'
import dashboardVideo from '../../assets/cooperant/Dashboard page.mp4'
import usabilityVideo from '../../assets/cooperant/Usability.mp4'
import decision1Video from '../../assets/cooperant/Decision 1.mp4'
import decision2Video from '../../assets/cooperant/Decision 2.mp4'
import decision3Video from '../../assets/cooperant/Decision 3.mp4'
import designSystemVideo from '../../assets/cooperant/Design Sysyem.mp4'
import v1ShippedVideo from '../../assets/cooperant/V1 shipped.mp4'
import validationVideo from '../../assets/cooperant/Iteration and validation.mp4'
import lowFiImage from '../../assets/cooperant/Low fidelity Wire frames.png'
import highFiImage from '../../assets/cooperant/High fidelity Wire frames.png'
import dragSvg from '../../assets/Drag.svg'

const TOC_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'branding', label: 'Branding' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'validation', label: 'Validation' },
  { id: 'closing', label: 'Closing' },
  { id: 'appendix', label: 'Appendix' },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const METRICS = [
  { value: '84.9', label: 'SUS SCORE', sub: 'Excellent (avg: 68)' },
  { value: '+65', label: 'NPS', sub: '14 promoters' },
  { value: '4.65/5', label: 'TRUST RATING', sub: 'None below 4' },
  { value: '86%', label: 'TASK COMPLETION', sub: '8 core journeys' },
  { value: '4.25/5', label: 'CEU CLARITY', sub: '85% understood' },
]

const CONSTRAINTS = [
  '0-to-1 product — no legacy UX to inherit',
  'Platform constraints — LearnDash + WooCommerce impose overlapping templates and states',
  'Trust and compliance — ACE credential visibility, policy access, certificate reliability',
  'No existing analytics — impact validated through usability testing only',
  'Handoff durability — content publishable by the Sparks team without breaking layouts',
]

const PRIORITIES = [
  { label: 'PRIORITY 1', body: 'Clarify the dual CTA. 25% hesitated at the most critical conversion moment. Differentiated microcopy would directly improve the 80% purchase completion rate.' },
  { label: 'PRIORITY 2', body: 'Add wayfinding labels to Dashboard. A one-liner ("Your learning progress and certificates") would push 75% first-click accuracy above 85%.' },
  { label: 'PRIORITY 3', body: 'Instrument analytics. Funnel tracking from listing view through certificate download turns this usability snapshot into ongoing measurement.' },
]


function QuoteCallout({ quote, attribution }) {
  return (
    <div className="cs-quote">
      <div className="cs-quote__bar" />
      <div className="cs-quote__text">
        <p className="cs-quote__quote">"{quote}"</p>
        <p className="cs-quote__attr">— {attribution}</p>
      </div>
    </div>
  )
}

export default function CooperantLearning({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionsRef = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
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

  return (
    <div className="cs-page">
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
        <p className="cs-mobile-drawer__context">CASE STUDY / COOPERANT LEARNING</p>
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

            {/* Hero */}
            <section className="cs-section" id="hero">
              <p className="cs-label">CASE STUDY / COOPERANT LEARNING</p>
              <h1 className="cs-hero-title">
                Turning podcast listeners into CEU earners: a 0-to-1 learning and commerce platform designed and built for behavior analysts
              </h1>
              <p className="cs-hero-body">
                Cooperant Learning is an evidence-based continuing education platform where behavior professionals discover CEU content, purchase quickly, complete quizzes, and download certificates, with progress tracked in a purpose-built learning dashboard.
              </p>

              <div className="cs-hero-info">
                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">PROJECT SNAPSHOT</p>
                  {[
                    { label: 'ROLE', value: 'Product Designer (0-to-1) + Implementation' },
                    { label: 'TEAM', value: 'Solo designer, 2 stakeholders' },
                    { label: 'TIMELINE', value: '~4 months (Sep 2025 – Jan 2026)' },
                    { label: 'PLATFORM', value: 'WordPress + LearnDash + WooCommerce + custom components' },
                  ].map(({ label, value }) => (
                    <div key={label} className="cs-info-row">
                      <span className="cs-info-row__label">{label}</span>
                      <span className="cs-info-row__value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">CONTRIBUTION</p>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">OWNED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">UX strategy, IA, interaction design, UI, design system, WordPress implementation, QA, handoff documentation</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">COLLABORATED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Content strategy and publishing workflow with Sparks team</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">INFLUENCED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Business model (CEU pricing, course bundling)</span>
                  </div>
                  <div className="cs-status-pill">
                    <span className="cs-status-pill__dot" />
                    <span>Shipped and Live — cooperantlearning.com</span>
                  </div>
                </div>
              </div>

              <div className="cs-hero-media">
                <ScrollVideo src={heroVideo} className="cs-hero-video" />
              </div>

              <div className="cs-gallery">
                {[
                  { src: podcastVideo, caption: 'Podcast page.' },
                  { src: episodeVideo, caption: 'Individual episode page.' },
                  { src: dashboardVideo, caption: 'Dashboard page.' },
                ].map(({ src, caption }) => (
                  <div key={caption} className="cs-gallery-card">
                    <div className="cs-gallery-card__img-wrap">
                      <ScrollVideo src={src} className="cs-gallery-video" />
                    </div>
                    <p className="cs-gallery-card__caption">{caption}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcome */}
            <section className="cs-section" id="outcome">
              <p className="cs-label">OUTCOME</p>
              <h2 className="cs-section-heading">
                A 20-user usability test scored 84.9 on the System Usability Scale and validated all three core design decisions
              </h2>
              <p className="cs-section-body">
                This was a 0-to-1 product with no legacy analytics. I ran a moderated usability study with 20 practicing BCBAs to validate the design with real behavioral data instead of assumptions.
              </p>
              <div className="cs-metrics">
                {METRICS.map(({ value, label, sub }) => (
                  <div key={label} className="cs-metric-card">
                    <p className="cs-metric-card__value">{value}</p>
                    <p className="cs-metric-card__label">{label}</p>
                    <p className="cs-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="cs-media">
                <ScrollVideo src={usabilityVideo} className="cs-media__video" />
                <p className="cs-media__caption">Usability study results from 20 moderated sessions with practicing BCBAs.</p>
              </div>
              <QuoteCallout
                quote="It looks modern and trustworthy, which helps right away for a CEU platform."
                attribution="P10, BCBA, 6 years experience"
              />
            </section>

            {/* Problem */}
            <section className="cs-section cs-section--gap-24" id="problem">
              <p className="cs-label">PROBLEM</p>
              <h2 className="cs-section-heading">
                Sparks had high-quality content but no product to turn listening into earning
              </h2>
              <div className="cs-body-stack">
                <p className="cs-section-body">
                  Sparks Behavioral Services had been producing educational podcasts for behavior analysts, but the experience around that content was scattered.
                </p>
                <p className="cs-section-body">
                  The platform needed to build trust fast (CEUs require credibility before purchase), reduce friction in the pay-to-quiz-to-certificate journey (every extra step is a drop-off risk), and support multiple audiences without creating a maze (BCBAs, RBTs, clinic admins, and parents all use the platform differently). This was not a redesign. It was a new product.
                </p>
              </div>
              <div className="cs-cards-stack">
                {CONSTRAINTS.map((text) => (
                  <div key={text} className="cs-constraint-card">
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Approach */}
            <section className="cs-section cs-section--gap-24" id="approach">
              <p className="cs-label">APPROACH</p>
              <h2 className="cs-section-heading">
                I benchmarked, wireframed, systemized, built, tested, and documented the handoff in four months
              </h2>
              <p className="cs-section-body">
                Five phases: benchmark CEU competitors and define journeys, lock IA and state logic in low-fidelity wireframes, build the design system, implement in WordPress with AI pair-programming, and document the handoff for independent publishing.
              </p>
              <div className="cs-media cs-media--slider">
                <div className="cs-media__slider-wrap">
                  <ImageSlider leftImage={lowFiImage} rightImage={highFiImage} />
                </div>
                <img src={dragSvg} alt="" className="cs-media__drag-hint" />
                <p className="cs-media__caption">
                  Early wireframe (left) established page responsibilities and state logic. Final implementation (right) refined hierarchy and applied the design system.
                </p>
              </div>
            </section>

            {/* Key Decisions Intro */}
            <section className="cs-section cs-section--gap-20" id="decisions">
              <p className="cs-label">KEY DECISIONS</p>
              <h2 className="cs-section-heading">
                Three design decisions shaped the platform, and usability testing validated all of them cleanly
              </h2>
            </section>

            {/* Decision 1 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 1</p>
              <h3 className="cs-decision-heading">
                I used one canonical course URL with state-based UI instead of splitting pages per user state
              </h3>
              <p className="cs-decision-body">
                Sharing is simpler when one link works for everyone. The UI adapts its CTAs based on user state while the URL stays constant. Fewer templates means less breakage as content scales.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision1Video} className="cs-media__video" />
                <p className="cs-media__caption">One URL, four states. The page adapts its CTAs based on where the user is in their journey.</p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">State logic must be explicit and tested. I defined clear transitions and tested every CTA path end-to-end.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">RESULT</p>
                  <p className="cs-note-card__body">90% understood the page on first exposure. No "where am I" confusion.</p>
                </div>
              </div>
            </section>

            {/* Decision 2 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 2</p>
              <h3 className="cs-decision-heading">
                I gated login and registration only at the moment of intent, not at discovery
              </h3>
              <p className="cs-decision-body">
                Users browse freely: explore episodes, read show notes, listen to content. Login triggers only when they try to purchase or enroll.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision2Video} className="cs-media__video" />
                <p className="cs-media__caption">The login gate appears only when the user signals purchase intent. Everything before it is open.</p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">Requires return-to-context handling after login. Users must land back where they started.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">RESULT</p>
                  <p className="cs-note-card__body">100% encountered the gate with zero friction reports. 20% wanted brief reassurance text confirming they would return to their content.</p>
                </div>
              </div>
            </section>

            {/* Decision 3 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 3</p>
              <h3 className="cs-decision-heading">
                I separated the Learning Dashboard from My Account because learning and commerce are different mental models
              </h3>
              <p className="cs-decision-body">
                LearnDash and WooCommerce both generate account surfaces. Combining them creates confusion. Dashboard holds progress and certificates. My Account holds orders and settings.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision3Video} className="cs-media__video" />
                <p className="cs-media__caption">Learning Dashboard and My Account serve different mental models. Cross-links connect them without merging them.</p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">Users need a bridge between spaces. I added clear cross-links and consistent navigation.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">RESULT</p>
                  <p className="cs-note-card__body">75% navigated directly to Dashboard for certificates. The 25% who checked My Account first self-corrected without assistance.</p>
                </div>
              </div>
            </section>

            {/* Branding */}
            <section className="cs-section cs-section--gap-24" id="branding">
              <p className="cs-label">BRANDING</p>
              <h2 className="cs-section-heading">Branding</h2>
              <p className="cs-section-body">
                I built the design system before building pages, so the platform stays coherent as content scales. Shared components reduce drift, speed implementation, and make new content safe to publish.
              </p>
              <div className="cs-media">
                <ScrollVideo src={designSystemVideo} className="cs-media__video" />
              </div>
              <p className="cs-section-body cs-section-body--sm">
                The system covers colors, typography, and button styles — built early to prevent visual drift as the content library grows. Every page draws from the same token set, so new episodes and courses ship with consistent hierarchy and no ad-hoc overrides.
              </p>
            </section>

            {/* Shipped */}
            <section className="cs-section cs-section--gap-24" id="shipped">
              <p className="cs-label">SHIPPED</p>
              <h2 className="cs-section-heading">
                V1 shipped the full journey from first visit through certificate download
              </h2>
              <p className="cs-section-body">
                Six surface areas: discovery and trust, listings and search, episode-to-CEU flow, state-based course pages, learning dashboard and account, and end-to-end reliability.
              </p>
              <div className="cs-media">
                <ScrollVideo src={v1ShippedVideo} className="cs-media__video" />
                <p className="cs-media__caption">V1 shipped the full journey: homepage through certificate download.</p>
              </div>
            </section>

            {/* Validation */}
            <section className="cs-section cs-section--gap-24" id="validation">
              <p className="cs-label">VALIDATION</p>
              <h2 className="cs-section-heading">
                Testing validated all three decisions and surfaced iteration themes, all at minor severity
              </h2>
              <p className="cs-section-body">
                I validated the riskiest decisions through 20 moderated sessions covering 8 core user journeys. No catastrophic or major issues emerged.
              </p>
              <div className="cs-media">
                <ScrollVideo src={validationVideo} className="cs-media__video" />
                <p className="cs-media__caption">Task completion rates across 8 user journeys. All above 75%. Task 7 (Dashboard/Certificate) surfaced the clearest improvement opportunity.</p>
              </div>

              <div className="cs-priorities">
                <p className="cs-priorities__heading">WHAT I WOULD DO NEXT</p>
                {PRIORITIES.map(({ label, body }, i) => (
                  <div key={label} className="cs-priority-item">
                    <span className="cs-priority-pill">{label}</span>
                    <p className="cs-priority-body">{body}</p>
                    {i < PRIORITIES.length - 1 && <div className="cs-priority-divider" />}
                  </div>
                ))}
              </div>

              <QuoteCallout
                quote="I would trust this enough to look for a CEU I need. The one thing I would change is making the two purchase buttons more obviously different."
                attribution="P03, BCBA, 2 years experience"
              />
            </section>

            {/* Closing */}
            <section className="cs-section cs-section--gap-24" id="closing">
              <p className="cs-label">CLOSING</p>
              <QuoteCallout
                quote="The documentation made it possible for us to publish new episodes without needing to call anyone. That was the whole point."
                attribution="Dr. Steven Sparks, Founder, Sparks Behavioral Services"
              />
              <h2 className="cs-section-heading">
                This project proved I can take a product from zero to shipped and validated, across strategy, design, code, and research
              </h2>
              <p className="cs-section-body">
                Cooperant Learning is full-stack product design: UX strategy through system design through UI through real implementation on a platform where trust, clarity, and flow directly impact whether users can earn credit and prove it professionally.
              </p>
              <p className="cs-section-body cs-section-body--sm">
                The result: a platform scoring in the Excellent band on SUS (84.9), earning NPS +65 from target users, and surfacing clear, minor-severity improvements rather than fundamental design failures.
              </p>
            </section>

            {/* Appendix */}
            <section className="cs-section cs-section--gap-24" id="appendix">
              <p className="cs-label">APPENDIX</p>
              <h2 className="cs-section-heading">Appendix</h2>
              <p className="cs-section-body">
                Supporting artifacts from the design and research process. Each section links to the full deliverable.
              </p>
              <AppendixAccordion />
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="cooperant" onNavigate={onNavigate} />
    </div>
  )
}
