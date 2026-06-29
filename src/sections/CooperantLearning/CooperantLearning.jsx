import { useState, useEffect, Fragment } from 'react'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import './CooperantLearning.css'

import heroComposite from '../../assets/cooperant/v2/hero-composite.gif'
import problemSentiment from '../../assets/cooperant/v2/problem-sentiment.png'
import problemSentimentMobile from '../../assets/cooperant/v2/problem-sentiment-mobile.png'
import iconPodcast from '../../assets/cooperant/v2/icon-podcast.svg'
import iconQuiz from '../../assets/cooperant/v2/icon-quiz.svg'
import iconPayment from '../../assets/cooperant/v2/icon-payment.svg'
import iconCertificate from '../../assets/cooperant/v2/icon-certificate.svg'
import iconTracking from '../../assets/cooperant/v2/icon-tracking.svg'
import arrowFlow from '../../assets/cooperant/v2/arrow-flow.svg'
import step1 from '../../assets/cooperant/v2/step-1.png'
import step2 from '../../assets/cooperant/v2/step-2.png'
import step3 from '../../assets/cooperant/v2/step-3.png'
import step4 from '../../assets/cooperant/v2/step-4.png'
import mvpSentiment from '../../assets/cooperant/v2/mvp-sentiment.png'
import mvpSentimentMobile from '../../assets/cooperant/v2/mvp-sentiment-mobile.png'
import built1 from '../../assets/cooperant/v2/built-1.png'
import built2 from '../../assets/cooperant/v2/built-2.png'
import built3 from '../../assets/cooperant/v2/built-3.png'
import built4 from '../../assets/cooperant/v2/built-4.png'
import built5 from '../../assets/cooperant/v2/built-5.png'
import built6 from '../../assets/cooperant/v2/built-6.png'
import challenge1 from '../../assets/cooperant/v2/challenge-1.png'
import challenge2 from '../../assets/cooperant/v2/challenge-2.png'
import challenge3 from '../../assets/cooperant/v2/challenge-3.png'
import decision1 from '../../assets/cooperant/v2/decision-1.png'
import decision2 from '../../assets/cooperant/v2/decision-2.png'
import decision3 from '../../assets/cooperant/v2/decision-3.png'
import iconLearnedEye from '../../assets/cooperant/v2/icon-learned-eye.png'
import iconLearnedBarChart from '../../assets/cooperant/v2/icon-learned-barchart.png'
import iconLearnedSitemap from '../../assets/cooperant/v2/icon-learned-sitemap.png'
import iconArrowNext from '../../assets/cooperant/v2/icon-arrow-next.png'
import invitePhoto from '../../assets/cooperant/v2/invite-photo.jpg'
import iconCopy from '../../assets/cooperant/v2/icon-copy.svg'
import viewNextCooperant from '../../assets/cooperant/v2/viewnext-cooperant.png'
import viewNextAndroidElderly from '../../assets/cooperant/v2/viewnext-android-elderly.png'

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'mvp', label: 'The MVP' },
  { id: 'built', label: 'What Was Built' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'impact', label: 'Impact' },
  { id: 'learned', label: 'What I Learnt' },
  { id: 'next', label: 'Next Steps' },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const META_CHIPS = [
  { label: 'STATUS', value: 'Live' },
  { label: 'MY ROLE', value: 'Lead Product Designer' },
  { label: 'TEAM', value: '2 Stakeholders, 1 Dev' },
  { label: 'TIMELINE', value: 'Sep 2025 - Jan 2026' },
  { label: 'PLATFORM', value: 'Web App', full: 'mobile' },
]

const OUTCOME_STATS = [
  { value: '35%', label: 'REPEAT PURCHASE RATE' },
  { value: '+250%', label: 'ORGANIC SEARCH GROWTH' },
  { value: '18', label: 'CEU EPISODES LIVE' },
  { value: 'Team publishes independently', label: 'CONTENT INDEPENDENCE', isText: true },
]

const PAIN_POINTS = [
  { icon: iconPodcast, title: 'Podcast Distribution', desc: 'Episodes live on multiple podcast platforms.' },
  { icon: iconQuiz, title: 'External Quizzes', desc: 'Listeners find quizzes on separate sites.' },
  { icon: iconPayment, title: 'Manual Payments', desc: 'Transactions handled outside the experience.' },
  { icon: iconCertificate, title: 'Certificates', desc: 'Certificates emailed manually or inconsistently.' },
  { icon: iconTracking, title: 'Tracking', desc: 'No unified dashboard to see progress.' },
]

const JOURNEY_STEPS = [
  { img: step1, title: 'Discover Episode', desc: 'Browse and find episodes on the listing page.' },
  { img: step2, title: 'Explore Episode', desc: 'Learn more about the episode: audio, content, learning objectives, and CEU details.' },
  { img: step3, title: 'Purchase and Access', desc: 'Purchase the CEU quiz and unlock course materials.' },
  { img: step4, title: 'Learn and Track', desc: 'Complete the quiz, earn your certificate, and track progress.' },
]

const BUILT_SURFACES = [
  { src: built1, alt: 'Home and Entry: Listen, Learn, Earn CEUs landing page' },
  { src: built2, alt: 'Episode Listing and Discovery: search and filter episodes with CEUs' },
  { src: built3, alt: 'Episode Page: episode details, learning objectives, and CEU info' },
  { src: built4, alt: 'Course Page: four conditional states for detail-oriented learners' },
  { src: built5, alt: 'Purchase Flow and Login Gate: sign up or log in only at high purchase intent' },
  { src: built6, alt: 'Quiz, Certificate, and Dashboard: complete quiz, earn certificate, track progress' },
]

const CHALLENGE_IMAGES = [
  { src: challenge1, alt: 'Information density before and after: episode card redesign' },
  { src: challenge2, alt: 'Login timing debate: stakeholder view versus user view' },
  { src: challenge3, alt: 'Funnel impact: drop-off rates from browse to purchase' },
]

const DECISION_IMAGES = [
  { src: decision1, alt: 'Decision 1: defer login until purchase intent, 80% purchase flow completion' },
  { src: decision2, alt: 'Decision 2: one URL with four conditional states' },
  { src: decision3, alt: 'Decision 3: separate Learning Dashboard from My Account' },
]

const IMPACT_METRICS = [
  { value: '84.9', label: 'SUS SCORE', sub: 'Excellent' },
  { value: '+65', label: 'NPS', sub: 'Strong' },
  { value: '4.65/5', label: 'TRUST IN PLATFORM', sub: 'High' },
  { value: '86%', label: 'TASK COMPLETION', sub: 'Success Rate' },
  { value: '20', label: 'RESEARCH SESSIONS', sub: 'Moderated BCBA' },
  { value: 'Minor', label: 'ALL ISSUES', sub: 'Severity' },
]

const LEARNED_ITEMS = [
  { icon: iconLearnedEye, num: '01', text: 'Users trained in a domain scan differently than general consumers.' },
  { icon: iconLearnedBarChart, num: '02', text: 'Stakeholder pushback is only useful if you can respond with data, not opinion.' },
  { icon: iconLearnedSitemap, num: '03', text: 'Two plugin systems on one platform is an information architecture problem, not a styling problem.' },
]

const NEXT_STEPS = [
  'Personalized CEU recommendations',
  'A/B test subscription vs. per-episode pricing',
  'CEU bundles and subscriptions',
  'Mobile app and offline access',
  'Microcopy revision on dual CTA',
  'ACE badge placement above the fold',
]

const VIEW_NEXT = [
  { img: viewNextCooperant, title: 'Cooperant Learning', desc: 'A 0-to-1 continuing-education platform turning podcast listeners into CEU earners for behavior analysts. Scored 84.9 SUS and +65 NPS with 20 BCBAs.' },
  { img: viewNextAndroidElderly, title: 'Android for Elderly', desc: 'A state-communication layer making silent mode legible for seniors and recoverable for caregivers. Sound-state recognition went 70% → 100% after V2.' },
]

function FlowCard({ icon, title, desc }) {
  return (
    <div className="cs-flow-card">
      <div className="cs-flow-card__icon">
        <img src={icon} alt="" />
      </div>
      <div className="cs-flow-card__text">
        <p className="cs-flow-card__title">{title}</p>
        <p className="cs-flow-card__desc">{desc}</p>
      </div>
    </div>
  )
}

function StepCard({ img, title, desc, index }) {
  return (
    <div className="cs-step-card">
      <div className="cs-step-card__img">
        <img src={img} alt={`${title} screen`} />
      </div>
      <div>
        <p className="cs-step-card__title">{index + 1}. {title}</p>
        <p className="cs-step-card__desc">{desc}</p>
      </div>
    </div>
  )
}

export default function CooperantLearning({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('overview')
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

  const copyEmail = () => {
    navigator.clipboard?.writeText('manohar.create@gmail.com')
  }

  return (
    <div className="cs-page cooperant-page">
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

            {/* Overview */}
            <section className="cs-section cs-v2-overview" id="overview">
              <div className="cs-v2-hero-row">
                <div className="cs-v2-hero-copy">
                  <p className="cs-label">COOPERANT LEARNING</p>
                  <h1 className="cs-hero-title">Turning podcast listening into certified learning.</h1>
                  <div className="cs-v2-hero-visual--mobile">
                    <img src={heroComposite} alt="Cooperant Learning product screens across desktop and mobile" />
                  </div>
                  <p className="cs-hero-body">
                    BCBAs — board-certified behavior analysts — are required to earn continuing education credits (CEUs) every certification cycle. Cooperant Learning gives them one place to listen to expert podcasts, take a short quiz, and walk away with the credits they need. I designed and built the platform from scratch.
                  </p>
                  <div className="cs-chip-row">
                    {META_CHIPS.map(({ label, value, full }) => (
                      <div key={label} className={`cs-chip${full === 'always' ? ' cs-chip--full' : full === 'mobile' ? ' cs-chip--full-mobile' : ''}`}>
                        <p className="cs-chip__label">{label}</p>
                        <p className="cs-chip__value">{value}</p>
                      </div>
                    ))}
                  </div>
                  <a className="cs-live-link" href="https://cooperantlearning.com" target="_blank" rel="noreferrer">
                    View the live site ↗
                  </a>
                </div>
                <div className="cs-v2-hero-visual">
                  <img src={heroComposite} alt="Cooperant Learning product screens across desktop and mobile" />
                </div>
              </div>

              <div className="cs-outcomes-banner">
                {OUTCOME_STATS.map(({ value, label, isText }) => (
                  <div key={label} className="cs-outcome-stat">
                    <p className={`cs-outcome-stat__value${isText ? ' cs-outcome-stat__value--text' : ''}`}>{value}</p>
                    <p className="cs-outcome-stat__label">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Problem */}
            <section className="cs-section cs-section--gap-28" id="problem">
              <p className="cs-label">PROBLEM</p>
              <h2 className="cs-section-heading">
                A behavioral health company with expert content but no product to sell it through.
              </h2>
              <p className="cs-section-body">
                A BCBA finishes a podcast episode on their commute. To earn the CEU, they opens a separate site, finds the matching quiz, pays through a third-party checkout, and waits for a certificate by email. There is no dashboard, no progress tracking, and no way to know how many credits they still needs this cycle. They do this dozens of times a year.
              </p>

              <div className="cs-flow">
                {PAIN_POINTS.map((p, i) => (
                  <Fragment key={p.title}>
                    <FlowCard {...p} />
                    {i < PAIN_POINTS.length - 1 && (
                      <div className="cs-flow-arrow"><img src={arrowFlow} alt="" /></div>
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="cs-v2-chart">
                <img src={problemSentiment} alt="Experience without Cooperant Learning: sentiment trends from enjoying the content down to not knowing how many credits are left" />
              </div>
              <div className="cs-v2-chart--mobile">
                <img src={problemSentimentMobile} alt="Experience without Cooperant Learning: sentiment trends from enjoying the content down to not knowing how many credits are left" />
              </div>

              <p className="cs-section-body">
                For BCBAs, earning a CEU meant five disconnected steps. For Sparks, every step was lost revenue.
              </p>
            </section>

            {/* The MVP */}
            <section className="cs-section cs-section--gap-28" id="mvp">
              <p className="cs-label">THE MVP</p>
              <h2 className="cs-section-heading">The learner journey in four steps.</h2>

              <div className="cs-steps">
                {JOURNEY_STEPS.map((s, i) => (
                  <Fragment key={s.title}>
                    <StepCard {...s} index={i} />
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div className="cs-flow-arrow"><img src={arrowFlow} alt="" /></div>
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="cs-v2-chart">
                <img src={mvpSentiment} alt="The Cooperant Learning experience: sentiment trends positive from browsing to having all credits in one dashboard" />
              </div>
              <div className="cs-v2-chart--mobile">
                <img src={mvpSentimentMobile} alt="The Cooperant Learning experience: sentiment trends positive from browsing to having all credits in one dashboard" />
              </div>
            </section>

            {/* What Was Built */}
            <section className="cs-section cs-section--gap-28" id="built">
              <p className="cs-label">WHAT WAS BUILT</p>
              <h2 className="cs-section-heading">Six core surfaces. One cohesive experience.</h2>
              <div className="cs-built-grid">
                {BUILT_SURFACES.map(({ src, alt }) => (
                  <div key={alt} className="cs-built-card">
                    <img src={src} alt={alt} />
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section className="cs-section cs-section--gap-28" id="challenges">
              <p className="cs-label">CHALLENGES</p>
              <h2 className="cs-section-heading">
                Users needed more information density. Stakeholders debated login timing.
              </h2>
              <div className="cs-challenge-grid">
                {CHALLENGE_IMAGES.map(({ src, alt }) => (
                  <div key={alt} className="cs-challenge-card">
                    <img src={src} alt={alt} />
                  </div>
                ))}
              </div>
              <p className="cs-section-body--bright">We validated with users and data.</p>
            </section>

            {/* Decisions and Validation */}
            <section className="cs-section cs-section--gap-28" id="decisions">
              <p className="cs-label">DECISIONS AND VALIDATION</p>
              <h2 className="cs-section-heading">
                Three key decisions. Validated by research, data, and usability testing.
              </h2>
              <div className="cs-decision-grid">
                {DECISION_IMAGES.map(({ src, alt }) => (
                  <div key={alt} className="cs-decision-card">
                    <img src={src} alt={alt} />
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section className="cs-section cs-section--gap-28" id="impact">
              <p className="cs-label">IMPACT</p>
              <h2 className="cs-section-heading">Live platform. Real learners. Measurable results.</h2>
              <div className="cs-impact-grid">
                {IMPACT_METRICS.map(({ value, label, sub }) => (
                  <div key={label} className="cs-impact-card">
                    <p className="cs-impact-card__value">{value}</p>
                    <p className="cs-impact-card__label">{label}</p>
                    <p className="cs-impact-card__sub">{sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What I Learned */}
            <section className="cs-section cs-section--gap-28" id="learned">
              <p className="cs-label">WHAT I LEARNED</p>
              <h2 className="cs-section-heading">Three things this project changed about how I design.</h2>
              <div className="cs-learned-grid">
                {LEARNED_ITEMS.map(({ icon, num, text }) => (
                  <div key={num} className="cs-learned-card">
                    <div className="cs-learned-card__top">
                      <span
                        aria-hidden="true"
                        className="cs-learned-card__icon"
                        style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
                      />
                      <span className="cs-learned-card__num">{num}</span>
                    </div>
                    <p className="cs-learned-card__text">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Next Steps */}
            <section className="cs-section cs-section--gap-28" id="next">
              <p className="cs-label">NEXT STEPS</p>
              <h2 className="cs-section-heading">Continuously improving the learning experience.</h2>
              <div className="cs-next-grid">
                {NEXT_STEPS.map((text) => (
                  <div key={text} className="cs-next-card">
                    <span
                      aria-hidden="true"
                      className="cs-next-card__icon"
                      style={{ maskImage: `url(${iconArrowNext})`, WebkitMaskImage: `url(${iconArrowNext})` }}
                    />
                    <p className="cs-next-card__text">{text}</p>
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
                      <span>✉</span>
                      <span>manohar.create@gmail.com</span>
                      <img src={iconCopy} alt="Copy email address" />
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
                {VIEW_NEXT.map(({ img, title, desc }) => (
                  <div key={title} className="cs-viewnext-card">
                    <div className="cs-viewnext-card__img">
                      <img src={img} alt={`${title} preview`} />
                    </div>
                    <h3 className="cs-viewnext-card__title">{title}</h3>
                    <p className="cs-viewnext-card__desc">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="cooperant" onNavigate={onNavigate} />
    </div>
  )
}
