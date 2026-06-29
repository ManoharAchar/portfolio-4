import { useState, useEffect, useRef } from 'react'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import { getViewNext, getProjectPage } from '../../data/projects'
import '../CooperantLearning/CooperantLearning.css'
import './Mochitta.css'

import heroComposite from '../../assets/mochitta/Mochitta Hero Image.mp4'
import iconUnhappy from '../../assets/mochitta/icon-unhappy.svg'
import iconNpcFace from '../../assets/mochitta/icon-npc-face.svg'
import iconConnected from '../../assets/mochitta/icon-connected.svg'
import productTrackSpending from '../../assets/mochitta/Track Spending - The Product.mp4'
import productTagEmotions from '../../assets/mochitta/Tag Emotions - The Product.mp4'
import productSeePatterns from '../../assets/mochitta/See patterns - The Product.mp4'
import productSetGoals from '../../assets/mochitta/Set Goals - The Product.mp4'
import flowGoalsVideo from '../../assets/mochitta/flow-goals.mp4'
import flowSpendTaggingVideo from '../../assets/mochitta/flow-spend-tagging.mp4'
import flowReflectVideo from '../../assets/mochitta/flow-reflect.mp4'
import brokeMixedTag from '../../assets/mochitta/Mixed tag amount split - What Broke.mp4'
import brokePatterns from '../../assets/mochitta/Patterns - What Broke.mp4'
import brokeGoalCategory from '../../assets/mochitta/Goal category linking - What Broke.mp4'
import fix1 from '../../assets/mochitta/Fix 1.mp4'
import fix2 from '../../assets/mochitta/Fix 2.mp4'
import fix3 from '../../assets/mochitta/Fix 3.mp4'
import iconGrowingPlant from '../../assets/mochitta/icon-growing-plant.png'
import iconLearnedEye from '../../assets/mochitta/icon-learned-eye.png'
import iconLearnedPen from '../../assets/mochitta/icon-learned-pen.png'
import iconLearnedPeople from '../../assets/mochitta/icon-learned-people.png'
import invitePhoto from '../../assets/mochitta/invite-photo.jpg'
import iconCopy from '../../assets/mochitta/icon-copy.svg'
import iconMail from '../../assets/mochitta/icon-mail.png'

// The autoplay attribute alone doesn't reliably start these (they mount at
// opacity:0 under the scroll-reveal observer), so kick play() explicitly.
const playOnMount = (el) => { if (el) el.play().catch(() => {}) }

const TOC_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem & Context' },
  { id: 'product', label: 'The Product' },
  { id: 'flows', label: 'Core Flows' },
  { id: 'broke', label: 'What Broke' },
  { id: 'redesign', label: 'Redesign & Impact' },
  { id: 'learned', label: 'What I Learned' },
  { id: 'next', label: "What's Next" },
]

const MOBILE_SITE_LINKS = [
  { label: 'My Work', page: 'home' },
  { label: 'About Me', page: 'about' },
  { label: 'The Cave', page: 'cave' },
  { label: 'Guest Archive', page: 'archive' },
]

const TAG_PILLS = ['CAPSTONE', 'PROTOTYPE', '2 USABILITY ROUNDS']

const META_CHIPS = [
  { label: 'MY ROLE', value: 'Product Designer (UX Research + Interaction Design)', full: 'always' },
  { label: 'TEAM', value: '2 Product designers, 1 Dev' },
  { label: 'TIMELINE', value: '6 Months' },
  { label: 'PLATFORM', value: 'iOS', full: 'mobile' },
]

const PROBLEM_CARDS = [
  { icon: iconUnhappy, title: 'Regret after spending', body: 'Young adults feel stress or guilt after everyday purchases, then avoid checking their finances entirely.' },
  { icon: iconNpcFace, title: 'No emotional context', body: 'Existing apps track dollars but ignore why the spending happened.' },
  { icon: iconConnected, title: 'Nothing connects the two', body: 'No product linked how a purchase felt to where the money went.' },
]

const PRODUCT_CARDS = [
  { img: productTrackSpending, title: 'Track spending', desc: 'See your safe-to-spend amount and recent transactions at a glance.' },
  { img: productTagEmotions, title: 'Tag emotions', desc: 'Log how you feel in the moment, before or after spending.' },
  { img: productSeePatterns, title: 'See patterns', desc: 'Discover how emotions influence your spending over a week.' },
  { img: productSetGoals, title: 'Set goals', desc: 'Set targets, link spending categories, and track progress.' },
]

const FLOW_CARDS = [
  {
    label: 'GOALS',
    title: 'Set personal financial goals and track progress toward them.',
    video: flowGoalsVideo,
    items: [
      'Create custom goals (Save, Spend less, Build a habit)',
      'Set target amounts and timeframes.',
      'Link spending categories with a live preview.',
      'Visualize progress on the goal list.',
    ],
  },
  {
    label: 'SPEND TAGGING',
    title: 'Tag your emotions before or after you spend to build awareness.',
    video: flowSpendTaggingVideo,
    items: [
      'Create custom goals (Save, Spend less, Build a habit)',
      'Set target amounts and timeframes.',
      'Link spending categories with a live preview.',
      'Visualize progress on the goal list.',
    ],
  },
  {
    label: 'REFLECT',
    title: 'Capture insights that reveal how your emotions influence your spending weekly.',
    video: flowReflectVideo,
    items: [
      'End-of-day tagging carousel',
      'Headline-first weekly recap',
      'Evidence-backed pattern cards',
      'Suggested next steps and rule creation',
    ],
  },
]

const BROKE_ROWS = [
  {
    title: 'Mixed Tag amount split',
    body: 'Splitting one purchase across categories gave no running total. Users did the math in their heads, lost track, and gave up.',
    metric: '102.2s average',
    quote: '"I have no idea how much is left."',
    img: brokeMixedTag,
    reverse: false,
  },
  {
    title: 'Patterns screen',
    body: 'Patterns appeared with nothing behind them. Users saw the insight but had no reason to believe it and no next step.',
    metric: '2.67 / 5',
    quote: '"I see the pattern, but I don’t know what to do with it."',
    img: brokePatterns,
    reverse: true,
  },
  {
    title: 'Goal category linking',
    body: 'The app asked users to link spending categories to a goal but never showed why it mattered or what it changed.',
    metric: '3 of 6 confused',
    quote: '"I don’t get why I’m picking these."',
    img: brokeGoalCategory,
    reverse: false,
  },
]

const FIX_ROWS = [
  {
    before: { title: 'Blank amount split', body: 'No running total. Users guessed and gave up.' },
    after: { title: 'Running balance + suggested chips', body: 'Live balance shows remaining amount. Pre-suggested categories reduce input.' },
    img: fix1,
    metricValue: '-47%',
    metricCaption: 'Time on task: 102.2s to 54.0s',
    note: 'One participant overshot the split, watched the running balance go wrong, and corrected without prompting.',
  },
  {
    before: { title: 'Bare pattern card', body: 'No evidence, no next step.' },
    after: { title: 'Evidence line + "Why am I seeing this?" + Create rule', body: 'Data behind the claim plus one action.' },
    img: fix2,
    metricValue: '+1.16',
    metricCaption: 'Comprehension: 2.67 to 3.83 / 5',
    note: '"This feels credible": 4.17 / 5 (new item)\nScreen time: 69.5s to 44.5s',
  },
  {
    before: { title: 'Blind category checklist', body: '3 of 6 users could not see why categories mattered.' },
    after: { title: 'Live preview showing which spending counts', body: 'Preview updates as you check each box.' },
    img: fix3,
    metricValue: '-50%',
    metricCaption: 'Time on task: 46.8s to 23.5s',
    note: 'P5 selected the wrong set, saw the preview update, and fixed it before finalizing. Five of six used the preview proactively.',
  },
]

const LEARNED_ITEMS = [
  { icon: iconLearnedEye, num: '01', headline: 'Locate the failure before you fix it.', text: 'Vague friction ("users were confused") leads to vague fixes. Attaching a number to a specific screen is what made each redesign precise enough to validate.' },
  { icon: iconLearnedPen, num: '02', headline: 'Design for self-correction, not just speed.', text: 'The strongest signal from UT2 was not faster task times. It was users catching their own mistakes mid-task. That changed how I think about what good scaffolding does.' },
  { icon: iconLearnedPeople, num: '03', headline: 'Test with the same people twice.', text: 'Using the same participants and instruments across both rounds made the comparison direct. The improvement was not "different people found it easier." It was "the same people, on the same tasks, performed measurably better."' },
]


function BrokeRow({ title, body, metric, quote, img, reverse, index }) {
  const info = (
    <div className="cs-broke-info">
      <p className="cs-broke-info__title">{title}</p>
      <p className="cs-broke-info__body">{body}</p>
      <p className="cs-broke-info__metric">{metric}</p>
      <p className="cs-broke-info__quote">{quote}</p>
    </div>
  )
  const media = (
    <div className="cs-broke-media">
      <video src={img} autoPlay loop muted playsInline ref={playOnMount} aria-label={`${title} screen`} />
    </div>
  )
  return (
    <div className="cs-broke-block">
      <p className="cs-broke-block__no">NO. {String(index + 1).padStart(2, '0')}</p>
      <div className="cs-broke-row">
        {reverse ? <>{media}{info}</> : <>{info}{media}</>}
      </div>
    </div>
  )
}

function FixRow({ before, after, img, metricValue, metricCaption, note, index }) {
  return (
    <div className="cs-fix-block">
      <p className="cs-fix-block__no">NO. {String(index + 1).padStart(2, '0')}</p>
      <div className="cs-fix-row">
        <div className="cs-fix-text cs-fix-text--before">
          <p className="cs-fix-text__label">BEFORE</p>
          <p className="cs-fix-text__title">{before.title}</p>
          <p className="cs-fix-text__body">{before.body}</p>
        </div>
        <div className="cs-fix-media">
          <video src={img} autoPlay loop muted playsInline ref={playOnMount} aria-label={`${before.title} versus ${after.title}`} />
        </div>
        <div className="cs-fix-text cs-fix-text--after">
          <p className="cs-fix-text__label">AFTER</p>
          <p className="cs-fix-text__title">{after.title}</p>
          <p className="cs-fix-text__body">{after.body}</p>
        </div>
      </div>
      <div className="cs-fix-metric">
        <div className="cs-fix-metric__stat">
          <p className="cs-fix-metric__value">{metricValue}</p>
          <p className="cs-fix-metric__caption">{metricCaption}</p>
        </div>
        <p className="cs-fix-metric__note">{note}</p>
      </div>
    </div>
  )
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
)

const ReplayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 5V2L7 7l5 5V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
)

function FlowCarouselSlide({ label, title, items, video }) {
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef(null)
  const slideRef = useRef(null)

  useEffect(() => {
    const videoEl = videoRef.current
    const slideEl = slideRef.current
    if (!videoEl || !slideEl) return
    const carousel = slideEl.closest('.cs-flows-carousel')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) videoEl.play().catch(() => {})
        else videoEl.pause()
      },
      { root: carousel, threshold: 0.6 }
    )
    observer.observe(slideEl)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  const replay = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play()
  }

  return (
    <div className="cs-flows-slide" ref={slideRef}>
      <div className="cs-flows-card cs-flows-card--light">
        <p className="cs-flows-card__label">{label}</p>
        <p className="cs-flows-card__title">{title}</p>
        <ul className="cs-flows-card__list">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="cs-flows-media">
        <video
          ref={videoRef}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          className="cs-flows-media__control cs-flows-media__control--play"
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          className="cs-flows-media__control cs-flows-media__control--replay"
          onClick={replay}
          aria-label="Replay video"
        >
          <ReplayIcon />
        </button>
      </div>
    </div>
  )
}

export default function Mochitta({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFlow, setActiveFlow] = useState(0)
  const [flowVideoPlaying, setFlowVideoPlaying] = useState(true)
  const [emailCopied, setEmailCopied] = useState(false)
  const flowVideoRef = useRef(null)
  const isMobile = useIsMobile()
  const sectionsRef = useReveal()

  const selectFlow = (index) => {
    setActiveFlow(index)
    setFlowVideoPlaying(true)
  }

  const toggleFlowVideo = () => {
    const video = flowVideoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const replayFlowVideo = () => {
    const video = flowVideoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
  }

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
    <div className="cs-page mochitta-page">
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
        <p className="cs-mobile-drawer__context">CASE STUDY / MOCHITTA</p>
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
                  <p className="cs-label">MOCHITTA</p>
                  <h1 className="cs-hero-title">Young adults had no way to see how emotions shaped their spending. So we built one.</h1>
                  <div className="cs-v2-hero-visual--mobile">
                    <video src={heroComposite} autoPlay loop muted playsInline ref={playOnMount} aria-label="Mochitta app screens: emotion tagging and weekly financial pulse" />
                  </div>
                  <div className="cs-tag-pill-row">
                    {TAG_PILLS.map((label) => (
                      <span key={label} className="cs-tag-pill">{label}</span>
                    ))}
                  </div>
                  <p className="cs-hero-body">
                    Mochitta is a spending companion that asks how a purchase felt, then shows what those feelings reveal over time.
                  </p>
                  <div className="cs-chip-row">
                    {META_CHIPS.map(({ label, value, full }) => (
                      <div key={label} className={`cs-chip${full === 'always' ? ' cs-chip--full' : full === 'mobile' ? ' cs-chip--full-mobile' : ''}`}>
                        <p className="cs-chip__label">{label}</p>
                        <p className="cs-chip__value">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cs-v2-hero-visual">
                  <video src={heroComposite} autoPlay loop muted playsInline ref={playOnMount} aria-label="Mochitta app screens: emotion tagging and weekly financial pulse" />
                </div>
              </div>
            </section>

            {/* Problem & Context */}
            <section className="cs-section cs-section--gap-28" id="problem">
              <p className="cs-label">PROBLEM & CONTEXT</p>
              <h2 className="cs-section-heading">A ground-up prototype, tested in two rounds with real users.</h2>
              <div className="cs-problem-grid">
                {PROBLEM_CARDS.map(({ icon, title, body }) => (
                  <div key={title} className="cs-problem-card">
                    <div className="cs-problem-card__top">
                      <img src={icon} alt="" className="cs-problem-card__icon" />
                      <p className="cs-problem-card__title">{title}</p>
                    </div>
                    <p className="cs-problem-card__body">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* The Product */}
            <section className="cs-section cs-section--gap-24" id="product">
              <p className="cs-label">THE PRODUCT</p>
              <h2 className="cs-section-heading">This is what Mochitta does.</h2>
              <p className="cs-section-body">Track what you spend, tag how it felt, spot the patterns, and set goals to change them.</p>
              <div className="cs-product-grid">
                {PRODUCT_CARDS.map(({ img, title, desc }) => (
                  <div key={title} className="cs-product-card">
                    <video src={img} autoPlay loop muted playsInline ref={playOnMount} aria-label={`${title}: ${desc}`} />
                  </div>
                ))}
              </div>
            </section>

            {/* Core Flows */}
            <section className="cs-section cs-section--gap-20" id="flows">
              <p className="cs-label">CORE FLOWS</p>
              {isMobile ? (
                <div className="cs-flows-carousel">
                  {FLOW_CARDS.map((card) => (
                    <FlowCarouselSlide key={card.label} {...card} />
                  ))}
                </div>
              ) : (
                <div className="cs-flows-row">
                  <div className="cs-flows-col">
                    {FLOW_CARDS.map(({ label, title, items }, index) => {
                      const isActive = index === activeFlow
                      return (
                        <div
                          key={label}
                          className={`cs-flows-card${isActive ? ' cs-flows-card--light' : ''}`}
                          onClick={() => selectFlow(index)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isActive}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectFlow(index) } }}
                        >
                          <p className="cs-flows-card__label">{label}</p>
                          <p className="cs-flows-card__title">{title}</p>
                          <ul className="cs-flows-card__list">
                            {items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                  <div className="cs-flows-media">
                    <video
                      key={activeFlow}
                      ref={flowVideoRef}
                      src={FLOW_CARDS[activeFlow].video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onPlay={() => setFlowVideoPlaying(true)}
                      onPause={() => setFlowVideoPlaying(false)}
                    />
                    <button
                      type="button"
                      className="cs-flows-media__control cs-flows-media__control--play"
                      onClick={toggleFlowVideo}
                      aria-label={flowVideoPlaying ? 'Pause video' : 'Play video'}
                    >
                      {flowVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button
                      type="button"
                      className="cs-flows-media__control cs-flows-media__control--replay"
                      onClick={replayFlowVideo}
                      aria-label="Replay video"
                    >
                      <ReplayIcon />
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* What Broke */}
            <section className="cs-section cs-section--gap-28" id="broke">
              <p className="cs-label">WHAT BROKE</p>
              <h2 className="cs-section-heading">The first version worked until people touched it. Three moments broke, each in a specific place.</h2>
              <p className="cs-section-body">
                Task-based testing with 6 participants uncovered three concentrated friction points. Not vague confusion, but a number attached to a place.
              </p>
              {BROKE_ROWS.map((row, i) => <BrokeRow key={row.title} {...row} index={i} />)}
            </section>

            {/* Redesign & Impact */}
            <section className="cs-section cs-section--gap-28" id="redesign">
              <p className="cs-label">REDESIGN & IMPACT</p>
              <h2 className="cs-section-heading">I fixed each failure with a specific piece of scaffolding. Two of them, users caught their own mistakes.</h2>
              <p className="cs-section-body">
                Each redesign targeted one located cause. The second round used the same six participants, the same tasks, and the same instruments, so the comparison is direct.
              </p>

              <div className="cs-fix-stack">
                <FixRow {...FIX_ROWS[0]} index={0} />
                <div className="cs-fix-divider" />
                <FixRow {...FIX_ROWS[1]} index={1} />
                <div className="cs-fix-divider" />
                <FixRow {...FIX_ROWS[2]} index={2} />
              </div>

              <p className="cs-section-body">
                Validated through two rounds of moderated usability testing (n=6 each, same participants and instruments). SUS, post-task Likert scales, and screen-level time data. Tested prototype; proxy metrics only; no production deployment.
              </p>

              <div className="cs-impact-banner">
                <div className="cs-impact-banner__text">
                  <p className="cs-impact-banner__headline">Across both rounds, SUS rose from 62.9 to 72.9, and all 12 benchmarks passed.</p>
                  <p className="cs-impact-banner__body">
                    The fixes worked because they were precise. Each one targeted a located cause, not a general complaint, and two of them gave users the scaffolding to catch their own errors. That is the kind of design I want to keep doing.
                  </p>
                </div>
                <img src={iconGrowingPlant} alt="" className="cs-impact-banner__icon" />
              </div>
            </section>

            {/* What I Learned */}
            <section className="cs-section cs-section--gap-28" id="learned">
              <p className="cs-label">WHAT I LEARNED</p>
              <h2 className="cs-section-heading">Three shifts in how I think about usability testing.</h2>
              <div className="cs-learned-grid">
                {LEARNED_ITEMS.map(({ icon, num, headline, text }) => (
                  <div key={num} className="cs-learned-card">
                    <div className="cs-learned-card__top">
                      <span
                        aria-hidden="true"
                        className="cs-learned-card__icon"
                        style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
                      />
                      <span className="cs-learned-card__num">{num}</span>
                    </div>
                    <p className="cs-learned-card__headline">{headline}</p>
                    <p className="cs-learned-card__text">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Next */}
            <section className="cs-section cs-section--gap-28" id="next">
              <p className="cs-label">WHAT'S NEXT</p>
              <h2 className="cs-section-heading">If this shipped, the next priorities are</h2>
              <p className="cs-next-lead">Week-over-week trend comparison and user-controlled notification frequency.</p>
              <p className="cs-section-body">
                The second round surfaced three minor findings, all with clear fixes: an AI-coach button that did not name its destination, a rule step that wanted an impact preview before committing, and a Simple Tag flow that needed a quick edit before confirming.
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
                {getViewNext('mochitta').slice(0, isMobile ? 1 : 2).map(({ id, video, title, description }) => (
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

      <Footer activePage="mochitta" onNavigate={onNavigate} />
    </div>
  )
}
