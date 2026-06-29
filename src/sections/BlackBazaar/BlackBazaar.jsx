import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import ScrollVideo from '../../components/ScrollVideo/ScrollVideo'
import { useReveal } from '../../lib/useReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import { getViewNext, getProjectPage } from '../../data/projects'
import '../CooperantLearning/CooperantLearning.css'
import './BlackBazaar.css'

import blackBazaHeroVideo from '../../assets/black-baza/Blackbaza Hero.mp4'
import twoUserGroupVideo from '../../assets/black-baza/Two user group.mp4'
import bbDecision1Video from '../../assets/black-baza/Decision 1.mp4'
import bbDecision2Video from '../../assets/black-baza/Decision 2.mp4'
import bbDecision3Video from '../../assets/black-baza/Decision 3.mp4'
import buyerCoreFlowVideo from '../../assets/black-baza/Buyer core flow.mp4'
import traceabilityVideo from '../../assets/black-baza/Traceability.mp4'
import storePickupVideo from '../../assets/black-baza/Store pick up.mp4'
import usabilityTestImage from '../../assets/black-baza/Black Baza Usability test.png'
import hoverSvg from '../../assets/Hover.svg'
import iconCopy from '../../assets/black-baza/icon-copy.svg'
import iconMail from '../../assets/black-baza/icon-mail.png'
import invitePhoto from '../../assets/black-baza/invite-photo.jpg'

// ── Avatar images (flat, pre-composited) ───────────────────────
import buyerAvatar    from '../../assets/black-baza/Buyer icon.png'
import retailerAvatar from '../../assets/black-baza/Retailer.png'
import farmerAvatar   from '../../assets/black-baza/Farmer.png'

const AVATAR_BY_NAME = { Buyer: buyerAvatar, Retailer: retailerAvatar, Farmer: farmerAvatar }

const TOC_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'final-screens', label: 'Final Screens' },
  { id: 'testing', label: 'Testing' },
  { id: 'shipped', label: 'What Shipped' },
  { id: 'validation', label: 'Validation' },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const METRICS = [
  { value: '71.6', label: 'BUYER SUS SCORE', sub: 'Grade B, above industry average of 68' },
  { value: '88%', label: 'REPEAT ORDER SUCCESS', sub: 'Fastest task, 65-second average completion' },
  { value: '3', label: 'USER GROUPS TESTED', sub: 'Buyers, retailers, farmer partners (n=16)' },
]

const USER_GROUPS = [
  {
    name: 'Buyer',
    needs: [
      'Shopping and repeat ordering',
      'Traceability and origin context',
      'Community and sustainability trust',
    ],
  },
  {
    name: 'Retailer',
    needs: [
      'Weekly restocking and ordering',
      'Inventory visibility and payment terms',
      'Faster than WhatsApp and phone calls',
    ],
  },
  {
    name: 'Farmer',
    needs: [
      'Accurate public representation',
      'Privacy controls and consent',
      'Biodiversity and forest care context',
    ],
  },
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

export default function BlackBazaar({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const isMobile = useIsMobile()
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

  const copyEmail = () => {
    navigator.clipboard?.writeText('manohar.create@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 1800)
  }

  return (
    <div className="cs-page black-bazaar-page">
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
        <p className="cs-mobile-drawer__context">CASE STUDY / BLACK BAZA</p>
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
              <p className="cs-label">CASE STUDY / BLACK BAZA</p>
              <h1 className="cs-section-heading">
                I designed a three-sided mobile platform for an activist coffee brand, connecting buyers to farmers through traceability, community, and sustainability. In production.
              </h1>

              <div className="cs-hero-info">
                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">PROJECT SNAPSHOT</p>
                  {[
                    { label: 'ROLE', value: 'Product Designer (0-to-1)' },
                    { label: 'TYPE', value: 'Solo designer, 1 stakeholders, 1 developer' },
                    { label: 'DURATION', value: '~8 Weeks (Jun 2025 – Sep 2025)' },
                    { label: 'PLATFORM', value: 'iOS & Android' },
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
                    <span className="cs-info-row__value cs-info-row__value--muted">UX strategy, IA, interaction design, UI, design system, QA, handoff documentation</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">SCOPE</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Research through production build</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">NDA</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Select details shown</span>
                  </div>
                  <div className="cs-status-pill">
                    <span className="cs-status-pill__dot" />
                    <span>In Production</span>
                  </div>
                </div>
              </div>

              <div className="cs-media">
                <ScrollVideo src={blackBazaHeroVideo} className="cs-media__video" />
              </div>

              <div className="cs-metrics bb-metrics">
                {METRICS.map(({ value, label, sub }) => (
                  <div key={label} className="cs-metric-card">
                    <p className="cs-metric-card__value">{value}</p>
                    <p className="cs-metric-card__label">{label}</p>
                    <p className="cs-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>

              <p className="cs-media__caption">
                In Production. Usability validated with 16 participants across 3 user groups. NDA: details shown under password.
              </p>
            </section>

            {/* Problem */}
            <section className="cs-section cs-section--gap-24" id="problem">
              <p className="cs-label">PROBLEM</p>
              <h2 className="cs-section-heading">
                Black Baza needed more than a website: three user groups, zero digital infrastructure, and no competitor solving this problem
              </h2>
              <div className="cs-body-stack">
                <p className="cs-section-body">
                  Black Baza Coffee is an activist company in Karnataka, India, pairing specialty coffee sales with biodiversity conservation and fair farmer livelihoods. Their existing website could sell coffee but could not build community, surface origin stories, or support retail partners digitally.
                </p>
                <p className="cs-section-body">
                  No major competitor in the specialty coffee space offered traceability or community features. The opportunity was to design a single platform serving buyers, retailers, and farmer partners with fundamentally different needs.
                </p>
              </div>

              <div className="bb-user-group-row">
                {USER_GROUPS.map(({ name, needs }) => {
                  return (
                    <div key={name} className="bb-user-group-card">
                      <div className="bb-avatar">
                        <img alt="" className="bb-avatar__img" src={AVATAR_BY_NAME[name]} />
                      </div>
                      <div className="bb-user-group-card__accent" />
                      <p className="bb-user-group-card__name">{name}</p>
                      <ul className="bb-user-group-card__list">
                        {needs.map((need) => (
                          <li key={need}>{need}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <p className="cs-media__caption">
                Three user groups, one platform: each with distinct goals and different levels of digital literacy.
              </p>
            </section>

            {/* Approach */}
            <section className="cs-section cs-section--gap-24" id="approach">
              <p className="cs-label">APPROACH</p>
              <h2 className="cs-section-heading">
                I designed a two-sided platform with shared content and role-specific tools
              </h2>
              <p className="cs-section-body">
                The app onboards users as Buyer or Retailer, then tailors the experience while keeping traceability and community accessible across roles. AI-assisted research synthesis helped cluster interview findings from 8 customers, accelerating the transition from raw data to the information architecture below.
              </p>
              <div className="cs-media">
                <ScrollVideo src={twoUserGroupVideo} className="cs-media__video" />
                <p className="cs-media__caption">
                  Information architecture: shared content layers bridge two primary user groups, consulted farmer partners with role-specific entry points.
                </p>
              </div>
            </section>

            {/* Key Decisions Intro */}
            <section className="cs-section cs-section--gap-20" id="decisions">
              <p className="cs-label">KEY DECISIONS</p>
              <h2 className="cs-section-heading">
                Three decisions that shaped the product
              </h2>
            </section>

            {/* Decision 1 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 1</p>
              <h3 className="cs-decision-heading">
                Made sustainability a system, not a badge.
              </h3>
              <p className="cs-decision-body">
                Rationale: Buyers distrusted single sustainability scores and wanted to see the math.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision1Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Sustainability as a system: the carbon footprint calculator shows its math, and the store pickup flow reduces the footprint further.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">The experience is less scannable than a badge, but trust mattered more.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">Task B4 had 25% success and the lowest trust score; pickup needs better discoverability.</p>
                </div>
              </div>
            </section>

            {/* Decision 2 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 2</p>
              <h3 className="cs-decision-heading">
                Built a dedicated retailer workflow.
              </h3>
              <p className="cs-decision-body">
                Rationale: Retailers needed inventory, bulk ordering, and payment terms for weekly restocking.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision2Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Retailer experience: inventory and wholesale ordering designed for weekly restocking. SUS 61.2, in active iteration.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">The retailer side doubled scope and remains the roughest part of the product.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">Retailer SUS was 61.2, and Task R2 had 50% success. Iteration is ongoing.</p>
                </div>
              </div>
              <QuoteCallout
                quote="I expected a spreadsheet-like input, not repeated taps."
                attribution="R02, retailer participant"
              />
            </section>

            {/* Decision 3 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 3</p>
              <h3 className="cs-decision-heading">
                Validated farmer stories at the farm.
              </h3>
              <p className="cs-decision-body">
                Rationale: The product depended on representing farmers accurately, which screen tests could not validate.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision3Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Farmer profiles validated at the farm. Corrections, privacy requests, and content additions are being incorporated.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">It required travel, translation, and a slower method, but produced the sharpest findings.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">3 of 4 farmers requested corrections, 2 raised privacy concerns, and all preferred biodiversity context over biography.</p>
                </div>
              </div>
              <QuoteCallout
                quote="Show the birds too, not only me. They are part of this coffee."
                attribution="Chickaramagowda, farmer partner, BR Hills"
              />
            </section>

            {/* Final Screens */}
            <section className="cs-section cs-section--gap-24" id="final-screens">
              <p className="cs-label">FINAL PRODUCT</p>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Buyer core flow</h2>
                <div className="cs-media">
                  <ScrollVideo src={buyerCoreFlowVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Primary product demo: onboarding, discovery, traceability, and checkout in one recorded flow.
                  </p>
                </div>
              </div>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Traceability moment</h2>
                <div className="cs-media">
                  <ScrollVideo src={traceabilityVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Traceability moment: product detail to grower profile, showing the line from coffee to farmer.
                  </p>
                </div>
              </div>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Store pickup flow</h2>
                <div className="cs-media">
                  <ScrollVideo src={storePickupVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Store pickup flow: nearby pickup, reduced packaging, and local collection in one short loop.
                  </p>
                </div>
              </div>
            </section>

            {/* Testing */}
            <section className="cs-section cs-section--gap-24" id="testing">
              <p className="cs-label">TESTING</p>
              <h2 className="cs-section-heading">
                Usability testing with 16 participants validated the concept and surfaced 12 issues driving iteration
              </h2>
              <p className="cs-section-body">
                I tested the prototype with 8 buyers, 4 retailers, and conducted perception audits with 4 farmer partners at their farms, followed by a heuristic evaluation with 3 expert reviewers. Buyer usability scored 71.6 (SUS Grade B, above the industry average of 68). The retailer experience scored 61.2 (Grade D), confirming that retailer workflows need structural redesign before launch.
              </p>
              <div className="cs-media">
                <div className="cs-media__pan-wrap">
                  <img src={usabilityTestImage} alt="Black Baza usability testing" className="cs-media__img" />
                  <img src={hoverSvg} alt="" className="cs-media__hover-hint" />
                </div>
                <p className="cs-media__caption">
                  SUS scores by group. Buyer experience is above average. Retailer experience is the priority for the next iteration.
                </p>
              </div>
              <QuoteCallout
                quote="People should know coffee grows with the forest, not outside it."
                attribution="Achukkegowda, farmer partner, BR Hills"
              />
            </section>

            {/* What Shipped */}
            <section className="cs-section cs-section--gap-24" id="shipped">
              <p className="cs-label">SHIPPED</p>
              <h2 className="cs-section-heading">
                In Production. Iteration continues on retailer workflows and footprint discoverability.
              </h2>
              <p className="cs-section-body">
                The platform serves buyer commerce, farmer traceability, community, store pickup, and retailer ordering. Three areas are in active redesign based on usability findings: retailer inventory entry, carbon footprint discoverability, and grind guidance.
              </p>
            </section>

            {/* Validation */}
            <section className="cs-section cs-section--gap-24" id="validation">
              <p className="cs-label">VALIDATION</p>
              <p className="cs-section-body cs-section-body--sm">
                Validation: Moderated usability testing (n=16 across 3 user groups) + 3-evaluator heuristic review. SUS scoring, task success rates, severity-rated issue log. Full test plan, data workbook, and research report available on request.
              </p>
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
                      <img src={iconMail} alt="" className="cs-invite__email-icon" />
                      <span>manohar.create@gmail.com</span>
                      <img src={iconCopy} alt="Copy email address" />
                      {emailCopied && <span className="cs-invite__copied-tip" role="status">Copied!</span>}
                    </button>
                    <a className="cs-invite__linkedin" href="https://www.linkedin.com/in/manohar-achar/" target="_blank" rel="noreferrer">
                      LinkedIn <span>↗</span>
                    </a>
                  </div>
                </div>
                <div className="cs-invite__photo">
                  <img src={invitePhoto} alt="Manohar Achar" />
                </div>
              </div>
            </section>

            {/* View Next */}
            <section className="cs-section">
              <p className="cs-label">VIEW NEXT</p>
              <div className="cs-viewnext-grid">
                {getViewNext('black-baza').slice(0, isMobile ? 1 : 2).map(({ id, video, title, description }) => (
                  <div key={id} className="cs-viewnext-card" onClick={() => onNavigate(getProjectPage(id))} data-cursor="view-project">
                    <div className="cs-viewnext-card__img">
                      <video src={video} autoPlay loop muted playsInline aria-label={`${title} preview`} />
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

      <Footer activePage="black-bazaar" onNavigate={onNavigate} />
    </div>
  )
}
