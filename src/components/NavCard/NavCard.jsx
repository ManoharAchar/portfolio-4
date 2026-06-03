import './NavCard.css'

const NAV_LINKS = [
  { label: 'My Work', href: '#work' },
  { label: 'About Me', href: '#about' },
  { label: 'The Cave', href: '#cave' },
  { label: 'Guest Archive', href: '#archive' },
]

export default function NavCard({ activeIndex = 0, onNavClick }) {
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
            >
              <span className="nav-card__link-label">
                {i + 1}. {link.label}
              </span>
              <span className="nav-card__link-arrow">→</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
