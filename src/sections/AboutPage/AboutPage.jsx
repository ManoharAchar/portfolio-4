import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar'
import Footer from '../../components/Footer/Footer'
import { useReveal } from '../../lib/useReveal'
import './AboutPage.css'

import introPortrait  from '../../assets/about/invite-photo.jpg'
import introNature    from '../../assets/about/about-intro-nature.gif'
import introCandid    from '../../assets/about/about-intro-3.jpg'
import hobbySketching from '../../assets/about/about-hobby-sketching.jpeg'
import hobbyCycling   from '../../assets/about/about-hobby-cycling.gif'
import hobbyMaking    from '../../assets/about/about-hobby-making.gif'
import designClubImg  from '../../assets/about/about-community-design-club.jpg'
import aigaImg        from '../../assets/about/about-community-aiga.jpg'

const HOBBY_CARDS = [
  { label: 'Perspective sketching', src: hobbySketching, tip: 'A very cosy Black Baza Coffee Office' },
  { label: 'Western Ghats',         src: hobbyCycling,   rotate: true, tip: 'Electrolytes are gold while cycling 4 days straight.' },
  { label: 'Making things',         src: hobbyMaking,    tip: 'True freedom is working with clay. Ctrl Z anytime!' },
]

const CHIPS_ROW_1 = ['Inner Engineering', 'Bhagavad Gita', 'Design of Everyday Things', 'One Piece']
const CHIPS_ROW_2 = ['Vivekananda', 'Spirited Away']

export default function AboutPage({ activePage = 'about', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeImageTip, setActiveImageTip] = useState(null)
  const stackRef = useReveal('about-stack--reveal')
  const getImageTipProps = (tip) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': tip,
    'aria-pressed': activeImageTip === tip,
    'data-cursor': 'tip',
    'data-cursor-tip': tip,
    onPointerUp: (event) => {
      if (event.pointerType === 'mouse') return
      setActiveImageTip((current) => current === tip ? null : tip)
    },
    onFocus: () => {
      if (!window.matchMedia('(pointer: coarse)').matches) {
        setActiveImageTip(tip)
      }
    },
    onBlur: () => {
      if (!window.matchMedia('(pointer: coarse)').matches) {
        setActiveImageTip(null)
      }
    },
    onKeyDown: (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setActiveImageTip((current) => current === tip ? null : tip)
      }
    },
  })

  return (
    <div className="about-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        guest={guest}
        showPassCard={showPassCard}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>

      <MobileTopBar onToggle={() => setSidebarOpen((o) => !o)} isOpen={sidebarOpen} onNavigate={onNavigate} />

      <main className="about-content">
        <div className="about-stack" ref={stackRef}>

          {/* ── Intro ── */}
          <section className="about-intro">
            <div className="about-intro__text">
              <p className="about-section__label">ABOUT ME</p>
              <div className="about-intro__copy-stack">
                <h1 className="about-intro__headline">
                  I started by making things with my hands.
                </h1>
                <p className="about-intro__body">
                  Hi, I'm Manohar. I've been making things for as long as I can remember: painting, clay modelling, chiseling idols and designing magazines layouts for my department. Long before I knew the language of design, I was learning to understand materials, tools, constraints, and the patience it takes to make something feel right.
                </p>
              </div>
            </div>
            <div className="about-intro__media-row">
              <div className="about-media-card about-media-card--sm" {...getImageTipProps('Hey, Nice to meet you.')}>
                <img src={introPortrait} alt="" className="about-media-img" />
                <span className={`about-image-tip${activeImageTip === 'Hey, Nice to meet you.' ? ' about-image-tip--visible' : ''}`}>Hey, Nice to meet you.</span>
              </div>
              <div className="about-media-card about-media-card--lg" {...getImageTipProps('Climbing a hill is the easiest way to change perspectives.')}>
                <img src={introNature} alt="" className="about-media-img" />
                <span className={`about-image-tip${activeImageTip === 'Climbing a hill is the easiest way to change perspectives.' ? ' about-image-tip--visible' : ''}`}>Climbing a hill is the easiest way to change perspectives.</span>
              </div>
              <div className="about-media-card about-media-card--sm" {...getImageTipProps('Black granite is one hard piece of rock to work with')}>
                <img src={introCandid} alt="" className="about-media-img" />
                <span className={`about-image-tip${activeImageTip === 'Black granite is one hard piece of rock to work with' ? ' about-image-tip--visible' : ''}`}>Black granite is one hard piece of rock to work with</span>
              </div>
            </div>
          </section>

          {/* ── Quick facts ── */}
          <div className="about-quickfacts">
            <div className="about-divider-line" />
            <div className="about-quickfacts__row">
              <div className="about-quickfacts__fact">
                <span className="about-quickfacts__strong">Detroit, MI</span>
                <span className="about-quickfacts__muted"> · from Bangalore</span>
              </div>
              <div className="about-quickfacts__fact">
                <span className="about-quickfacts__strong">MS HCDE</span>
                <span className="about-quickfacts__muted"> · UMich-Dearborn</span>
              </div>
              <div className="about-quickfacts__fact">
                <span className="about-quickfacts__strong">President</span>
                <span className="about-quickfacts__muted"> · Design Club @ UMich</span>
              </div>
            </div>
            <div className="about-divider-line" />
          </div>

          {/* ── How I Got Here ── */}
          <section className="about-text-section">
            <p className="about-section__label">HOW I GOT HERE</p>
            <div className="about-text-section__paras">
              <p className="about-text-section__copy">
                I started as an engineer working on physical products, but I kept noticing how the digital tools around them could be clearer and easier to use. I did not know the word "UX" back then. I only knew I was drawn to understanding where people struggled and finding better ways through it.
              </p>
              <p className="about-text-section__copy">
                Studying human-centered design gave that instinct a rigorous foundation in research, iteration, and evidence.
              </p>
            </div>
          </section>

          {/* ── How I Think ── */}
          <section className="about-text-section">
            <p className="about-section__label">HOW I THINK</p>
            <div className="about-text-section__content">
              <p className="about-text-section__copy">
                I work best where disciplines meet: research, product thinking, interaction design, and building. I look for the source of truth in a problem, simplify what does not need to be complex, and learn whatever the solution demands.
              </p>
              <div className="about-callout">
                <div className="about-callout__bar" />
                <p className="about-callout__text">
                  The most thoughtful designs are shaped as much by what they give up as by what they make possible.
                </p>
              </div>
            </div>
          </section>

          {/* ── When I'm Not Designing ── */}
          <section className="about-text-section">
            <p className="about-section__label">WHEN I'M NOT DESIGNING</p>
            <div className="about-text-section__paras">
              <p className="about-text-section__copy">
                You'll probably find me making perspective sketches of ordinary rooms from impossible angles, writing songs for people I love, playing guitar while still losing battles to bar chords, or attempting recipes with unreasonable confidence. Meditation helps me slow down and pay attention, while long hikes remind me how much there is still to notice.
              </p>
              <p className="about-text-section__copy">
                I once cycled 400+ km through the Western Ghats. One Piece has taught me more life lessons than most books. And Steph Curry is the greatest shooter to ever live. I will not be taking questions on that.
              </p>
            </div>
          </section>

          {/* ── Hobby gallery ── */}
          <div className="about-hobby-gallery">
            {HOBBY_CARDS.map(({ label, src, rotate, tip }) => (
              <div key={label} className="about-hobby-card">
                <div
                  className="about-hobby-card__frame"
                  {...getImageTipProps(tip)}
                >
                  <img
                    src={src}
                    alt={label}
                    className={`about-hobby-img${rotate ? ' about-hobby-img--rotate' : ''}`}
                  />
                  <span className={`about-image-tip${activeImageTip === tip ? ' about-image-tip--visible' : ''}`}>{tip}</span>
                </div>
                <p className="about-hobby-card__label">{label}</p>
              </div>
            ))}
          </div>

          {/* ── My Communities ── */}
          <section className="about-communities">
            <p className="about-section__label">MY COMMUNITIES</p>
            <div className="about-community-cards">
              <div className="about-community-card">
                <div className="about-community-card__body">
                  <p className="about-community-card__role">PRESIDENT</p>
                  <div className="about-community-card__name-desc">
                    <p className="about-community-card__name">Design Club, UMich-Dearborn</p>
                    <p className="about-community-card__desc">
                      Hackathons, portfolio workshops, art-in-nature walks, and bridging campus with Detroit's design scene.
                    </p>
                  </div>
                </div>
                <div className="about-community-card__image">
                  <img src={designClubImg} alt="Design Club" className="about-community-img" />
                </div>
              </div>
              <div className="about-community-card">
                <div className="about-community-card__body">
                  <p className="about-community-card__role">VOLUNTEER</p>
                  <div className="about-community-card__name-desc">
                    <p className="about-community-card__name">AIGA Detroit</p>
                    <p className="about-community-card__desc">
                      Speaker sessions, mentoring events, and connecting local designers back to campus.
                    </p>
                  </div>
                </div>
                <div className="about-community-card__image">
                  <img src={aigaImg} alt="AIGA Detroit" className="about-community-img" />
                </div>
              </div>
            </div>
          </section>

          <div className="about-dashed-divider" />

          {/* ── Things That Shaped Me ── */}
          <section className="about-chips-section">
            <p className="about-section__label">THINGS THAT SHAPED ME</p>
            <div className="about-chip-rows">
              <div className="about-chip-row">
                {CHIPS_ROW_1.map((chip) => (
                  <div key={chip} className="about-chip">
                    <span className="about-chip__label">{chip}</span>
                  </div>
                ))}
              </div>
              <div className="about-chip-row">
                {CHIPS_ROW_2.map((chip) => (
                  <div key={chip} className="about-chip">
                    <span className="about-chip__label">{chip}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="about-dashed-divider" />

          {/* ── Closing quote ── */}
          <div className="about-callout">
            <div className="about-callout__bar" />
            <p className="about-callout__text">
              The best work feels like playing in a band: bring your craft, listen closely, and make something better together.
            </p>
          </div>

        </div>
      </main>

      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
