import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import ScrollVideo from '../../components/ScrollVideo/ScrollVideo'
import '../CooperantLearning/CooperantLearning.css'
import './SeniorMode.css'

import heroVideo from '../../assets/senior-mode/The hero.mp4'
import problemVideo from '../../assets/senior-mode/The Problem.mp4'
import onboardingVideo from '../../assets/senior-mode/Final UI Onboarding.mp4'
import fullFlowVideo from '../../assets/senior-mode/Final UI Full flow.mp4'
import decision1Video from '../../assets/senior-mode/Decision 1.mp4'
import decision2Video from '../../assets/senior-mode/Decision 2.mp4'
import decision3Video from '../../assets/senior-mode/Decision 3.mp4'
import iaImage from '../../assets/senior-mode/IA.png'
import testingDataImage from '../../assets/senior-mode/Testing data.png'
import hoverSvg from '../../assets/Hover.svg'

const TOC_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'problem', label: 'Problem' },
  { id: 'final-ui', label: 'Final UI' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'testing', label: 'Testing' },
  { id: 'shipped', label: "What's next?" },
  { id: 'artefacts', label: 'Artefacts' },
]

export default function SeniorMode({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero')

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

  return (
    <div className="cs-page">
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
          <button
            className="cs-sidebar__back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ BACK TO TOP
          </button>
        </aside>

        {/* ── Main Content ── */}
        <main className="cs-main">
          <div className="cs-sections">

            {/* Hero */}
            <section className="cs-section" id="hero">
              <p className="cs-label">CASE STUDY / SENIOR MODE FOR ANDROID</p>
              <div className="sm-hero-title-group">
                <h1 className="cs-hero-title">Senior Mode for Android</h1>
                <p className="cs-hero-body">
                  Made silent mode legible for seniors and recoverable for caregivers.
                </p>
              </div>

              <div className="cs-hero-info">
                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">PROJECT SNAPSHOT</p>
                  {[
                    { label: 'TYPE', value: 'Concept prototype' },
                    { label: 'ROLE', value: 'End-to-end' },
                    { label: 'DURATION', value: '6 weeks' },
                    { label: 'PLATFORM', value: 'Android + caregiver app' },
                    { label: 'TESTING', value: '10 seniors | 8 caregivers | 4-person micro-test' },
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
                    <span className="cs-info-row__value cs-info-row__value--muted">
                      Problem framing, user flows, UI system, prototype wiring, test plan design, session moderation, synthesis, V2 iteration.
                    </span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">COLLABORATED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">
                      Recruited and tested with seniors and caregivers as evaluators.
                    </span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">INFLUENCED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">
                      A direction for Senior Mode as a stock Android feature with a lightweight companion app.
                    </span>
                  </div>
                </div>
              </div>

              <div className="cs-hero-media">
                <ScrollVideo src={heroVideo} className="cs-hero-video" />
              </div>

              <div className="sm-metrics-row">
                {[
                  { value: '100%', sub: 'Caregiver task success across setup, remote restore, and audit trail (n=8, avg confidence 5.6/7)' },
                  { value: '70% → 100%', sub: 'Senior sound-state recognition after V2 redesign. Median 13.5s to locate sound controls.' },
                  { value: '13.5s', sub: 'Median time for seniors to find and identify sound control in Quick Controls (V2)' },
                ].map(({ value, sub }) => (
                  <div key={value} className="sm-metric-card">
                    <p className="sm-metric-card__value">{value}</p>
                    <p className="sm-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Problem & Context */}
            <section className="cs-section cs-section--gap-24" id="problem">
              <p className="cs-label">PROBLEM &amp; CONTEXT</p>
              <h2 className="cs-section-heading">
                Android hid one critical state too well: seniors could not tell when the phone was silent.
              </h2>
              <p className="cs-section-body">
                The failure was not general accessibility. Seniors accidentally triggered Silent mode, could not tell the phone would not ring, and missed calls for hours.
              </p>
              <p className="cs-section-body">
                By the time a caregiver noticed, recovery already depended on a call that could no longer get through. The design problem was to make sound state obvious and recovery possible before the miss became a crisis.
              </p>
              <div className="cs-media">
                <ScrollVideo src={problemVideo} className="cs-media__video" />
                <p className="cs-media__caption">
                  The core failure loop: accidental silence, invisible state change, missed calls, then caregiver escalation.
                </p>
              </div>
            </section>

            {/* Constraints */}
            <section className="cs-section cs-section--gap-24" id="constraints">
              <p className="cs-label">CONSTRAINTS</p>
              <h2 className="cs-section-heading">
                The work had to stay credible without a product team, lab, or implementation partner.
              </h2>
              <div className="sm-constraint-row">
                {[
                  'Self-initiated concept',
                  'Remote testing only',
                  'No engineering partner',
                  'Android-first scope',
                ].map((text) => (
                  <div key={text} className="sm-constraint-card">
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Approach */}
            <section className="cs-section cs-section--gap-24" id="approach">
              <p className="cs-label">APPROACH</p>
              <h2 className="cs-section-heading">
                I treated this as a state-communication problem and prototyped both sides of recovery.
              </h2>
              <p className="cs-section-body">
                Rather than simplify Android wholesale, I made critical state explicit and recoverable. The prototype paired a senior-facing launcher with a caregiver companion because recovery usually happens through family, not settings menus. Testing focused on whether seniors could recognize phone state instantly and whether caregivers could fix the problem without coaching.
              </p>
            </section>

            {/* Key Decisions Intro */}
            <section className="cs-section cs-section--gap-20" id="decisions">
              <p className="cs-label">KEY DECISIONS</p>
              <h2 className="cs-section-heading">
                Three decisions shaped the design, each involving a real tradeoff.
              </h2>
            </section>

            {/* Decision 1 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 1</p>
              <h3 className="cs-decision-heading">
                Made "Phone will ring" the loudest element on Home.
              </h3>
              <p className="cs-decision-body">
                Seniors missed silent mode when state lived in subtle chips and icons. The interface had to answer the question before users started hunting.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision1Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Before: state hid in a chip. After: the home screen says the phone will ring in plain language.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">Home gives up premium space to status instead of staying minimal.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">V2 micro-test: 100% correctly read sound state on the redesigned home screen (4/4).</p>
                </div>
              </div>
            </section>

            {/* Decision 2 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 2</p>
              <h3 className="cs-decision-heading">
                Made sound recovery visible instead of buried.
              </h3>
              <p className="cs-decision-body">
                Recovery could not depend on a hidden swipe or a flat grid of equal controls. V2 gave sound a visible path from Home and the strongest hierarchy inside Quick Controls.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision2Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Sound now wins the visual hierarchy, so the recovery path is obvious instead of inferred.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">The layout became less symmetrical so the critical task could become unmistakable.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">V2 micro-test: 100% located the sound control; median time 13.5 seconds.</p>
                </div>
              </div>
            </section>

            {/* Decision 3 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 3</p>
              <h3 className="cs-decision-heading">
                Made caregiver recovery instant for safe fixes and explicit when something changed.
              </h3>
              <p className="cs-decision-body">
                The caregiver's job is rapid recovery, not remote coaching. Low-risk fixes had to apply immediately, confirm on both devices, and leave an audit trail people could trust.
              </p>
              <div className="cs-media">
                <ScrollVideo src={decision3Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Caregivers can restore the phone in three taps, and the senior can see that the change happened.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">Faster recovery increases caregiver power, so reversibility and clear logging had to be built in.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">Caregivers completed setup, remote restore, and audit trail tasks with 100% success.</p>
                </div>
              </div>
            </section>

            {/* Testing Results */}
            <section className="cs-section cs-section--gap-24" id="testing">
              <p className="cs-label">TESTING RESULTS</p>
              <h2 className="cs-section-heading">
                Testing exposed one blocker clearly: seniors could not tell when the phone was silent.
              </h2>
              <p className="cs-section-body">
                10 seniors + 8 caregivers across 6 remote moderated tasks.
              </p>
              <div className="sm-metrics-row">
                {[
                  { value: '86.7%', sub: 'Senior overall pass rate (26/30 tasks)' },
                  { value: '100%', sub: 'Caregiver pass rate (24/24 tasks)' },
                  { value: '5.6/7', sub: 'Caregiver average confidence' },
                ].map(({ value, sub }) => (
                  <div key={`r1-${value}`} className="sm-metric-card">
                    <p className="sm-metric-card__value">{value}</p>
                    <p className="sm-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>
              <p className="cs-section-body">The blocker that reshaped the design.</p>
              <p className="cs-section-body">
                Task S2 asked seniors to fix a silenced phone. Overall pass rate was 70%, but low-familiarity seniors only passed 25% of the time.
              </p>
              <div className="sm-metrics-row sm-metrics-row--wide">
                {[
                  { value: '25%', sub: 'S2 pass rate for LOW device-familiarity seniors (1/4). 100% needed help.' },
                  { value: '100%', sub: 'S2 pass rate for MEDIUM familiarity (5/5). No assistance needed.' },
                ].map(({ value, sub }) => (
                  <div key={`r2-${value}`} className="sm-metric-card">
                    <p className="sm-metric-card__value">{value}</p>
                    <p className="sm-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="cs-media">
                <div className="cs-media__pan-wrap">
                  <img src={testingDataImage} alt="Testing data from both rounds" className="cs-media__img" />
                  <img src={hoverSvg} alt="" className="cs-media__hover-hint" />
                </div>
                <p className="cs-media__caption">
                  Round 1 task-level results. The outlier was silent-phone recovery, which became the focus of V2.
                </p>
              </div>
            </section>

            {/* Final UI */}
            <section className="cs-section cs-section--gap-24" id="final-ui">
              <p className="cs-label">FINAL UI</p>
              <h2 className="cs-section-heading">
                The final UI uses plain language, strong state labels, and a deliberately small control set.
              </h2>
              <div className="cs-media">
                <ScrollVideo src={onboardingVideo} className="cs-media__video" />
                <p className="cs-media__caption">
                  The onboarding flow pairs the senior and caregiver setup so both sides are ready before the first silent-mode event.
                </p>
              </div>
              <div className="cs-media">
                <ScrollVideo src={fullFlowVideo} className="cs-media__video" />
                <p className="cs-media__caption">
                  The core control surfaces: status tile, controls entry, sound card, help request, and caregiver confirmation.
                </p>
              </div>
            </section>

            {/* What Shipped + Next */}
            <section className="cs-section cs-section--gap-24" id="shipped">
              <p className="cs-label">WHAT SHIPPED + NEXT</p>
              <h2 className="cs-section-heading">
                The concept is validated enough to hand off, and the remaining work is narrow.
              </h2>
              <div className="sm-shipped-content">
                <div className="sm-shipped-bullets">
                  <p>- High-fidelity concept prototype spanning senior and caregiver recovery flows</p>
                  <p>- Tested rationale for the three highest-risk interaction decisions</p>
                  <p>- Prioritized backlog for Android implementation</p>
                </div>
                <div className="sm-priorities-wrap">
                  <p className="sm-priorities-label">WHAT I WOULD DO NEXT</p>
                  {[
                    { label: 'PRIORITY 1', body: 'Increase segmented-control state contrast and add explicit current-state text' },
                    { label: 'PRIORITY 2', body: 'Prototype permission boundaries for higher-risk caregiver actions' },
                    { label: 'PRIORITY 3', body: 'Validate offline recovery states in broader field conditions' },
                  ].map(({ label, body }) => (
                    <div key={label} className="sm-priority-card">
                      <p className="sm-priority-card__label">{label}</p>
                      <p className="sm-priority-card__body">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="cs-section-body">
                Validated via remote moderated sessions with 10 seniors and 8 caregivers, plus a focused 4-person micro-test.
              </p>
            </section>

            {/* Process Artifacts */}
            <section className="cs-section cs-section--gap-24" id="artefacts">
              <p className="cs-label">PROCESS ARTIFACTS</p>
              <h2 className="cs-section-heading">Process artifacts</h2>
              <p className="cs-section-body">
                The architecture map framed the prototype scope. The V1–V2 comparison shows how testing findings reshaped the three key surfaces.
              </p>
              <div className="cs-media">
                <div className="cs-media__pan-wrap">
                  <img src={iaImage} alt="Prototype architecture map used to scope senior and caregiver flows" className="cs-media__img" />
                  <img src={hoverSvg} alt="" className="cs-media__hover-hint" />
                </div>
              </div>
              <p className="cs-section-body cs-section-body--sm">
                Prototype architecture map used to scope the senior and caregiver flows before testing.
              </p>
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="senior-mode" onNavigate={onNavigate} />
    </div>
  )
}
