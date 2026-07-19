import { useState } from 'react'
import NavPreview from '../NavPreview/NavPreview'
import { magnetMove, magnetLeave } from '../../lib/magnet'
import './NavCard.css'

const NAV_LINKS = [
  { label: 'My Work', href: '#work', kind: 'work' },
  { label: 'About Me', href: '#about', kind: 'about' },
  { label: 'The Cave', href: '#cave', kind: 'cave' },
  { label: 'Guest Archive', href: '#archive', kind: 'archive' },
]

export default function NavCard({ activeIndex = 0, onNavClick }) {
  const [hover, setHover] = useState(-1)
  const [previewTop, setPreviewTop] = useState(0)

  return (
    <div className="nav-card">
      <p className="nav-card__heading">EXPLORE</p>
      <div className="nav-card__links">
        {NAV_LINKS.map((link, i) => {
          const active = i === activeIndex
          return (
            <a
              key={link.href}
              href={link.href}
              className={`nav-card__link ${active ? 'nav-card__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); onNavClick?.(i) }}
              onMouseEnter={(e) => {
                setHover(i)
                setPreviewTop(Math.max(12, e.currentTarget.getBoundingClientRect().top - 50))
              }}
              onMouseMove={magnetMove}
              onMouseLeave={(e) => { magnetLeave(e); setHover(-1) }}
            >
              <span className="nav-card__link-label">
                {i + 1}. {link.label}
              </span>
              <span className="nav-card__link-arrow">→</span>
            </a>
          )
        })}
      </div>
      {hover >= 0 && <NavPreview kind={NAV_LINKS[hover].kind} top={previewTop} />}
    </div>
  )
}
