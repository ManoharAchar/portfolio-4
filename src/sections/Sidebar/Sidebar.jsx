import { useState, useEffect, useRef } from 'react'
import NavCard from '../../components/NavCard/NavCard'
import PassCard from '../../components/PassCard/PassCard'
import TiltCard from '../../components/TiltCard/TiltCard'
import './Sidebar.css'

import logoMark from '../../assets/icons/logo-mark.svg'
import statusDot from '../../assets/icons/status-dot.svg'

function useDetroitTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Detroit',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function useSidebarPush(sidebarRef) {
  useEffect(() => {
    let rafId
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    const clearOffset = () => {
      if (sidebarRef.current) {
        sidebarRef.current.style.top = ''
      }
    }

    const update = () => {
      if (!desktopQuery.matches) {
        clearOffset()
        return
      }

      const footer = document.querySelector('.footer')
      if (footer && sidebarRef.current) {
        const gap = footer.getBoundingClientRect().top - window.innerHeight
        sidebarRef.current.style.top = `${Math.min(0, gap)}px`

        const maxSidebarScroll = sidebarRef.current.scrollHeight - sidebarRef.current.clientHeight
        if (maxSidebarScroll > 0) {
          sidebarRef.current.scrollTop = Math.min(maxSidebarScroll, window.scrollY)
        }
      }
      rafId = requestAnimationFrame(update)
    }

    const syncMode = () => {
      cancelAnimationFrame(rafId)
      clearOffset()

      if (desktopQuery.matches) {
        rafId = requestAnimationFrame(update)
      }
    }

    syncMode()
    desktopQuery.addEventListener('change', syncMode)

    return () => {
      cancelAnimationFrame(rafId)
      desktopQuery.removeEventListener('change', syncMode)
    }
  }, [sidebarRef])
}

const PAGE_ORDER = ['home', 'about', 'cave', 'archive']

export default function Sidebar({ activePage = 'home', onNavigate, isOpen = false, guest, showPassCard = true, onClose }) {
  const time = useDetroitTime()
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
          <p className="sidebar__edu">
            <span className="sidebar__edu-label">HCDE</span>
            {' '}
            <span className="sidebar__edu-school">@ University of Michigan-Dearborn </span>
            <span className="sidebar__edu-label">('26)</span>
            <span className="sidebar__edu-school">.</span>
          </p>
        </div>

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
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="sidebar__more-link">Resume</a>
          </div>
        </div>
      </div>

      <div className="sidebar__bottom">
        <div className="sidebar__pass-thumb">
          {showPassCard && guest && (
            <TiltCard>
              <PassCard intent={guest.intent} name={guest.name} date={guest.date} passId={guest.passId} />
            </TiltCard>
          )}
        </div>
        <div className="sidebar__location">
          <img className="sidebar__status-dot" src={statusDot} alt="" />
          <span>DETROIT, {time}</span>
        </div>
      </div>
    </aside>
  )
}
