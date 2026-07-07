import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar'
import Footer from '../../components/Footer/Footer'
import { playInView } from '../../lib/playInView'
import './CavePage.css'

import fridgeVideo from '../../assets/cave/fridge.mp4'
import fridgePoster from '../../assets/cave/poster-fridge.jpg'
import seekVideo from '../../assets/cave/seek.mp4'
import seekPoster from '../../assets/cave/poster-seek.jpg'
import vrNutritionVideo from '../../assets/cave/vr-nutrition.mp4'
import vrNutritionPoster from '../../assets/cave/poster-vr-nutrition.jpg'
import rockautoVideo from '../../assets/cave/rockauto.mp4'
import rockautoPoster from '../../assets/cave/poster-rockauto.jpg'

// Cave experiments — looping demo videos, not clickable case studies.
// Only Fridge Management ships a CTA (bit.ly so clicks are countable).
const EXPERIMENTS = [
  {
    id: 'fridge',
    title: 'Fridge Management',
    description:
      'We remember food by sight, not by lists. Snap it, track it, and get a nudge before it spoils. No more guessing how long that produce has been sitting there.',
    video: fridgeVideo,
    poster: fridgePoster,
    cta: { label: 'Sign up & use the Webapp ↗', href: 'https://bit.ly/3Rk0xAy' },
  },
  {
    id: 'seek',
    title: 'Seek',
    description:
      "A panic attack feels less lonely when someone who's been there picks up. Seekers and empathizers connect anonymously, voice or chat, for the few minutes that matter most.",
    video: seekVideo,
    poster: seekPoster,
  },
  {
    id: 'vr-nutrition',
    title: 'VR Nutrition',
    description:
      'Back from the gym and out of ideas? Your vitals, goals, and fridge inventory decide dinner. Pick a meal and cook along, step by step, hands free.',
    video: vrNutritionVideo,
    poster: vrNutritionPoster,
  },
  {
    id: 'rockauto',
    title: 'RockAuto Redesign',
    description:
      'An unbeatable parts catalog trapped in a Windows XP interface. A concept redesign that keeps the depth and finally makes search feel effortless.',
    video: rockautoVideo,
    poster: rockautoPoster,
  },
]

export default function CavePage({ activePage = 'cave', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="cave-layout">
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

      <main className="cave-content">
        <header className="cave-header">
          <p className="cave-header__eyebrow">THE CAVE</p>
          <h1 className="cave-header__title">Concepts I couldn&rsquo;t stop thinking about</h1>
        </header>

        <div className="cave-grid">
          {EXPERIMENTS.map(({ id, title, description, video, poster, cta }) => (
            <article className="cave-card" key={id}>
              <div className="cave-card__media">
                <video
                  src={video}
                  poster={poster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  ref={playInView}
                  aria-hidden="true"
                />
              </div>
              <div className="cave-card__text">
                <h2 className="cave-card__title">{title}</h2>
                <p className="cave-card__desc">{description}</p>
                {cta && (
                  <a className="cave-card__cta" href={cta.href} target="_blank" rel="noreferrer">
                    {cta.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
