import logoMarkTopbar from '../../assets/icons/logo-mark-topbar.svg'
import './MobileTopBar.css'

export default function MobileTopBar({ onToggle, isOpen, onNavigate }) {
  return (
    <div className="mobile-topbar">
      <div className="mobile-topbar__hero">
        <button
          className="mobile-topbar__logo-frame"
          onClick={() => onNavigate?.('home')}
          aria-label="Go to home"
          type="button"
        >
          <img src={logoMarkTopbar} alt="" />
        </button>
        <div className="mobile-topbar__identity">
          <p className="mobile-topbar__name">Manohar Achar</p>
          <p className="mobile-topbar__title">PRODUCT DESIGNER</p>
        </div>
      </div>
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
