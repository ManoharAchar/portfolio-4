import { useState, useEffect } from 'react'
import PassCard from '../PassCard/PassCard'
import './FlyingCard.css'

const CARD_W = 576
const CARD_H = 270

// Scale to match sidebar pass-thumb (200px wide)
const SIDEBAR_SCALE = 200 / CARD_W

// Sidebar bottom section geometry (from Sidebar.css):
//   .sidebar__bottom: padding 0 20px 24px, gap 14px
//   pass-thumb: 94px tall
//   location row: ~18px tall
// Total from bottom: 24 + 18 + 14 + 94 = 150px
const sidebarThumbTop = (vh) => vh - 150
const SIDEBAR_LEFT = 20

export default function FlyingCard({ intent, name, date, startRect, onFlying, onDone }) {
  const [phase, setPhase] = useState('start')

  useEffect(() => {
    // Brief pause so the 'start' frame renders, then card moves deliberately to center
    const t1 = setTimeout(() => setPhase('centering'), 80)

    // Beat ends at 80 + 500 (center anim) + 220 (pause) = 800ms → start flying
    const t2 = setTimeout(() => {
      setPhase('flying')
      onFlying?.()
    }, 800)

    // Card lands at 800 + 520 = 1320ms
    const t3 = setTimeout(() => onDone?.(), 1320)

    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  const vw = window.innerWidth
  const vh = window.innerHeight

  // Start: match the card's exact visual position from the welcome screen
  const startScale = startRect ? startRect.width / CARD_W : 0.87
  const startX    = startRect ? startRect.left : vw / 2 - (CARD_W * 0.87) / 2
  const startY    = startRect ? startRect.top  : vh / 2 - (CARD_H * 0.87) / 2

  // Center: 5% larger than the welcome screen scale (the "prominence beat")
  const centerScale = startScale * 1.05
  const centerX = vw / 2 - (CARD_W * centerScale) / 2
  const centerY = vh / 2 - (CARD_H * centerScale) / 2

  let transform, transition

  if (phase === 'start') {
    transform  = `translate(${startX}px, ${startY}px) scale(${startScale})`
    transition = 'none'
  } else if (phase === 'centering') {
    transform  = `translate(${centerX}px, ${centerY}px) scale(${centerScale})`
    transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  } else {
    // flying
    transform  = `translate(${SIDEBAR_LEFT}px, ${sidebarThumbTop(vh)}px) scale(${SIDEBAR_SCALE})`
    transition = 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  return (
    <div className="flying-card" style={{ transform, transition }}>
      <PassCard intent={intent} name={name} date={date} />
    </div>
  )
}
