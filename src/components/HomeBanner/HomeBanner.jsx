import { useState, useEffect } from 'react'
import portrait from '../../assets/about/invite-photo.webp'
import './HomeBanner.css'

// ── Editable copy ────────────────────────────────────────────
// Greeting and the three rotating "right now" lines live here so
// they're trivial to update. Each ticker line is split into a lead,
// an emphasized phrase (cream), and a tail.
const GREETING = "Hi, I'm Manohar. Glad you're here."

const TICKER_MESSAGES = [
  { pre: 'Building ', em: 'Fridge Management', post: ' toward its first 500 users.' },
  { pre: 'Designing a ', em: 'SaaS product for a healthcare startup', post: ' in parallel.' },
  { pre: 'Two ', em: 'new case studies', post: ' are on their way to this shelf.' },
]

const TICKER_INTERVAL = 4200

export default function HomeBanner({ onNavigate }) {
  const [idx, setIdx] = useState(0)

  // Cycle the ticker 0 → 1 → 2 → 0; cleaned up on unmount.
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % TICKER_MESSAGES.length),
      TICKER_INTERVAL,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="home-banner">
      <img
        className="home-banner__portrait"
        src={portrait}
        alt="Manohar"
        loading="lazy"
        decoding="async"
      />
      <div className="home-banner__mid">
        <p className="home-banner__greeting">{GREETING}</p>
        <div className="home-banner__status">
          <span className="home-banner__dot" aria-hidden="true" />
          <span className="home-banner__label">RIGHT NOW</span>
          <div className="home-banner__ticker">
            <div className="home-banner__ticker-inner" style={{ '--idx': idx }}>
              {TICKER_MESSAGES.map((m, i) => (
                <p className="home-banner__msg" key={i}>
                  {m.pre}
                  <span className="home-banner__em">{m.em}</span>
                  {m.post}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="home-banner__chip"
        type="button"
        onClick={() => onNavigate?.('about')}
      >
        <span className="home-banner__chip-more">MORE </span>ABOUT ME →
      </button>
    </div>
  )
}
