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
    // Let the start frame render, then fly while welcome copy is fading.
    const t1 = setTimeout(() => {
      setPhase('flying')
      onFlying?.()
    }, 80)

    const t2 = setTimeout(() => onDone?.(), 760)

    return () => [t1, t2].forEach(clearTimeout)
  }, [])

  const vw = window.innerWidth
  const vh = window.innerHeight

  // Start: match the card's exact visual position from the welcome screen
  const startScale = startRect ? startRect.width / CARD_W : 0.87
  const startX    = startRect ? startRect.left : vw / 2 - (CARD_W * 0.87) / 2
  const startY    = startRect ? startRect.top  : vh / 2 - (CARD_H * 0.87) / 2

  let transform, transition

  if (phase === 'start') {
    transform  = `translate(${startX}px, ${startY}px) scale(${startScale})`
    transition = 'none'
  } else {
    // flying
    transform  = `translate(${SIDEBAR_LEFT}px, ${sidebarThumbTop(vh)}px) scale(${SIDEBAR_SCALE})`
    transition = 'transform 0.68s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  return (
    <div className="flying-card" style={{ transform, transition }}>
      <PassCard intent={intent} name={name} date={date} />
    </div>
  )
}
