import './MobileTopBar.css'

export default function MobileTopBar({ onToggle, isOpen }) {
  return (
    <div className="mobile-topbar">
      <span className="mobile-topbar__label">PRODUCT DESIGNER</span>
      <button
        className="mobile-topbar__toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
