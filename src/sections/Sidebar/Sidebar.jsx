import { useState, useEffect, useRef } from 'react'
import NavCard from '../../components/NavCard/NavCard'
import PassCard from '../../components/PassCard/PassCard'
import { usePassEditor } from '../../lib/passEditor'
import TiltCard from '../../components/TiltCard/TiltCard'
import './Sidebar.css'

import logoMark from '../../assets/icons/logo-mark.svg'
import statusDot from '../../assets/icons/status-dot.svg'

// Module-scope formatter — constructing Intl.DateTimeFormat is expensive,
// formatting with it is cheap.
const DETROIT_TIME_FMT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Detroit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
})

// Leaf component so the per-second tick re-renders only this span,
// not the whole sidebar tree (PassCard, TiltCard, NavCard…).
function DetroitClock() {
  const [time, setTime] = useState(() => DETROIT_TIME_FMT.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(DETROIT_TIME_FMT.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return <span>DETROIT, {time}</span>
}

function useSidebarPush(sidebarRef) {
  useEffect(() => {
    let rafId = null
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    const clearOffset = () => {
      if (sidebarRef.current) {
        sidebarRef.current.style.top = ''
      }
    }

    // True when the pending frame was triggered only by a document-height
    // change (ResizeObserver), not by a scroll/resize event.
    let contentResizeOnly = false

    const update = () => {
      rafId = null
      const pushUpOnly = contentResizeOnly
      contentResizeOnly = false
      if (!desktopQuery.matches) return

      const footer = document.querySelector('.footer')
      const sidebar = sidebarRef.current
      if (footer && sidebar) {
        const gap = footer.getBoundingClientRect().top - window.innerHeight
        const nextTop = Math.min(0, gap)
        const currentTop = parseFloat(sidebar.style.top) || 0
        // Document-height changes (e.g. the project-card hover reveal
        // animating open/closed) may only push the sidebar further up,
        // never slide it back down — otherwise hovering a card near the
        // footer drags the whole sidebar (and the pass-card thumb) along
        // with the 0.4s height animation. Scroll and resize events still
        // relax the offset back toward 0.
        if (!pushUpOnly || nextTop < currentTop) {
          sidebar.style.top = `${nextTop}px`
        }

        const maxSidebarScroll = sidebar.scrollHeight - sidebar.clientHeight
        if (maxSidebarScroll > 0) {
          sidebar.scrollTop = Math.min(maxSidebarScroll, window.scrollY)
        }
      }
    }

    // Coalesce all triggers into at most one layout pass per frame,
    // and do nothing at all while the page is idle.
    const schedule = () => {
      contentResizeOnly = false
      if (rafId == null) rafId = requestAnimationFrame(update)
    }

    const scheduleContentResize = () => {
      if (rafId == null) {
        contentResizeOnly = true
        rafId = requestAnimationFrame(update)
      }
    }

    const syncMode = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      clearOffset()
      if (desktopQuery.matches) schedule()
    }

    syncMode()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    desktopQuery.addEventListener('change', syncMode)
    // Catches footer movement from content loading in (images/videos)
    // without scroll or resize firing.
    const resizeObserver = new ResizeObserver(scheduleContentResize)
    resizeObserver.observe(document.documentElement)

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      desktopQuery.removeEventListener('change', syncMode)
      resizeObserver.disconnect()
    }
  }, [sidebarRef])
}

const PAGE_ORDER = ['home', 'about', 'cave', 'archive']

export default function Sidebar({ activePage = 'home', onNavigate, isOpen = false, guest, showPassCard = true, onClose }) {
  const { openPassEditor, thumbPop } = usePassEditor()
  const [wfHover, setWfHover] = useState(false)
  const [wfTop, setWfTop] = useState(0)
  const sidebarRef = useRef(null)
  useSidebarPush(sidebarRef)

  const activeIndex = PAGE_ORDER.indexOf(activePage)

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} ref={sidebarRef}>
      <div className="sidebar__top">
        <div className="sidebar__logo-wrap">
          <button className="sidebar__logo-frame" onClick={() => onNavigate?.('home')} aria-label="Go to home">
            <div className="sidebar__logo-rotator">
              <div className="sidebar__logo-inner">
                <img src={logoMark} alt="Studio mark" />
              </div>
            </div>
          </button>
          {onClose && (
            <button className="sidebar__close" onClick={onClose} aria-label="Close menu" type="button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className="sidebar__identity">
          <div className="sidebar__name-group">
            <h1 className="sidebar__name">Manohar Achar</h1>
            <p className="sidebar__title">PRODUCT DESIGNER</p>
          </div>
          <p className="sidebar__bio">
            I am a designer who loves building software that's powerful but feels simple.
          </p>
          <div
            className="sidebar__workflow"
            onMouseEnter={(e) => { setWfHover(true); setWfTop(e.currentTarget.getBoundingClientRect().top) }}
            onMouseLeave={() => setWfHover(false)}
          >
            <span className="sidebar__wf-line">
              <span className="sidebar__wf-word" style={{ animationDelay: '0s' }}>FIGMA</span>
              <span className="sidebar__wf-arrow" style={{ animationDelay: '0.9s' }}> ⇄ </span>
              <span className="sidebar__wf-word" style={{ animationDelay: '1.8s' }}>LLM</span>
              <span className="sidebar__wf-arrow" style={{ animationDelay: '2.7s' }}> ⇄ </span>
              <span className="sidebar__wf-word" style={{ animationDelay: '3.6s' }}>CODE</span>
            </span>
          </div>
        </div>

        {wfHover && (
          <div className="sidebar__wf-panel" style={{ top: wfTop }} aria-hidden="true">
            <p className="sidebar__wf-panel-eyebrow">HOW I WORK</p>
            <p className="sidebar__wf-panel-body">
              No fixed start or finish. Ideation, edge cases, and high-level thinking happen with <b>LLMs</b>. <b>Figma</b> stays the source of truth for design, and it all lands in <b>code</b>. The loop runs all three ways.
            </p>
          </div>
        )}

        <NavCard
          activeIndex={activeIndex}
          onNavClick={(i) => onNavigate?.(PAGE_ORDER[i])}
        />

        <div className="sidebar__more">
          <p className="sidebar__more-heading">MORE</p>
          <div className="sidebar__more-links">
            <a href="mailto:manohar.create@gmail.com" className="sidebar__more-link">Email</a>
            <span className="sidebar__more-sep">, </span>
            <a href="https://www.linkedin.com/in/manohar-achar/" target="_blank" rel="noreferrer" className="sidebar__more-link">LinkedIn</a>
            <span className="sidebar__more-sep">, </span>
            <a href="/Manohar-Achar-Resume.pdf" target="_blank" rel="noreferrer" className="sidebar__more-link">Resume</a>
          </div>
        </div>
      </div>

      <div className="sidebar__bottom">
        <div
          className={`sidebar__pass-thumb${thumbPop ? ' sidebar__pass-thumb--pop' : ''}`}
          data-cursor={showPassCard && guest ? 'customize-pass' : undefined}
          role={showPassCard && guest ? 'button' : undefined}
          aria-label={showPassCard && guest ? 'Customize your guest pass' : undefined}
          onClick={showPassCard && guest ? openPassEditor : undefined}
        >
          {showPassCard && guest && (
            <TiltCard>
              <PassCard intent={guest.intent} name={guest.name} date={guest.date} passId={guest.passId} accent={guest.accent} />
            </TiltCard>
          )}
        </div>
        <div className="sidebar__location">
          <img className="sidebar__status-dot" src={statusDot} alt="" />
          <DetroitClock />
        </div>
      </div>
    </aside>
  )
}
