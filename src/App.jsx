import { useState, useEffect, useRef } from 'react'
import './styles/global.css'
import CustomCursor from './components/CustomCursor/CustomCursor'
import StarfieldCursorFollow from './components/StarfieldCursorFollow/StarfieldCursorFollow'
import SplashScreen from './sections/SplashScreen/SplashScreen'
import WelcomeScreen from './sections/WelcomeScreen/WelcomeScreen'
import HomePage from './sections/HomePage/HomePage'
import AboutPage from './sections/AboutPage/AboutPage'
import CooperantLearning from './sections/CooperantLearning/CooperantLearning'
import SeniorMode from './sections/SeniorMode/SeniorMode'
import BlackBazaar from './sections/BlackBazaar/BlackBazaar'
import GuestArchivePage from './sections/GuestArchive/GuestArchivePage'
import CavePage from './sections/Cave/CavePage'
import FlyingCard from './components/FlyingCard/FlyingCard'
import { resolveVisitor, createPass, passToGuest } from './lib/visitor'
import { startSession, recordPageVisit } from './lib/session'

const ACCENT_COLORS = {
  designer: '#798c6d',
  'see-work': '#64818c',
  'sent-here': '#c87a5a',
  exploring:  '#c4a24d',
}

const PAGE_TITLES = {
  home:          'Manohar Achar — Product Designer',
  about:         'About — Manohar Achar',
  cooperant:     'Cooperant Learning — Manohar Achar',
  'senior-mode': 'Senior Mode — Manohar Achar',
  'black-bazaar':'Black Bazaar — Manohar Achar',
  cave:          'The Cave — Manohar Achar',
  archive:       'Guest Archive — Manohar Achar',
}

const pageToPath = (page) => (page === 'home' || page === 'welcome') ? '/' : `/${page}`
const pathToPage = (path) => (!path || path === '/') ? 'home' : path.replace(/^\//, '')

// How long the welcome screen content fade lasts before unmounting
const WELCOME_FADE_MS = 380

// Floor on how long the splash screen stays up before dematerializing —
// covers the logo's 1.4s fade-in plus a beat where it sits fully visible,
// so a warm Supabase response never cuts the fade-in short.
const SPLASH_MIN_VISIBLE_MS = 2200

function App() {
  const [page, setPage] = useState('splash')
  const [guest, setGuest] = useState(null)
  const [welcomeExiting, setWelcomeExiting] = useState(false)
  const [flyingCard, setFlyingCard] = useState(null)
  const [homeVisible, setHomeVisible] = useState(false)
  const [pendingEntry, setPendingEntry] = useState(null)

  const starfieldRef = useRef(null)
  const splashRef = useRef(null)
  const splashStartRef = useRef(Date.now())

  // Sync page state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      const target = e.state?.page ?? pathToPage(window.location.pathname)
      if (target) {
        document.title = PAGE_TITLES[target] ?? PAGE_TITLES.home
        setPage(target)
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // On mount: resolve returning visitor and skip welcome screen if recognised
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has('preview')
    if (preview) {
      setPage('welcome')
      window.history.replaceState({ page: 'welcome' }, '', '/')
      return
    }

    resolveVisitor().then(({ pass, isNew }) => {
      if (!isNew && pass) {
        const guestData = passToGuest(pass)
        const accent = ACCENT_COLORS[pass.intent]
        const requested = pathToPage(window.location.pathname)
        const target = PAGE_TITLES[requested] ? requested : 'home'
        setPendingEntry({ type: 'returning', guestData, accent, target, passId: pass.id })
      } else {
        setPendingEntry({ type: 'new' })
      }
    })
  }, [])

  // Once the visitor is resolved, let the splash screen dematerialize into
  // the starfield (respecting a minimum visible floor) before revealing
  // whichever page the visitor actually lands on.
  useEffect(() => {
    if (!pendingEntry) return

    const wait = Math.max(0, SPLASH_MIN_VISIBLE_MS - (Date.now() - splashStartRef.current))
    const timer = setTimeout(async () => {
      await splashRef.current?.playExit()

      if (pendingEntry.type === 'returning') {
        const { guestData, accent, target, passId } = pendingEntry
        if (accent) document.documentElement.style.setProperty('--accent', accent)
        setGuest(guestData)
        setHomeVisible(true)
        document.title = PAGE_TITLES[target]
        setPage(target)
        window.history.replaceState({ page: target }, '', pageToPath(target))
        startSession(passId)
      } else {
        setPage('welcome')
        window.history.replaceState({ page: 'welcome' }, '', '/')
      }
    }, wait)

    return () => clearTimeout(timer)
  }, [pendingEntry])

  const handleEnter = async ({ cardRect, intent, name, date }) => {
    const accent = ACCENT_COLORS[intent]
    if (accent) document.documentElement.style.setProperty('--accent', accent)

    // Persist to Supabase; fall back gracefully if it fails
    let passId = null
    try {
      const pass = await createPass({ intent, name })
      passId = pass.id
    } catch {
      // Non-blocking — visitor still enters the portfolio
    }

    const guestData = { intent, name, date, passId }
    setGuest(guestData)
    setFlyingCard({ rect: cardRect, intent, name, date })
    setWelcomeExiting(true)

    if (passId) startSession(passId)

    // Unmount welcome screen after its content fade completes
    // replaceState so back button can't return to welcome
    setTimeout(() => {
      document.title = PAGE_TITLES.home
      setPage('home')
      window.history.replaceState({ page: 'home' }, '', '/')
      setWelcomeExiting(false)
    }, WELCOME_FADE_MS)
  }

  const navigate = (target) => {
    recordPageVisit(target)
    document.title = PAGE_TITLES[target] ?? PAGE_TITLES.home
    window.history.pushState({ page: target }, '', pageToPath(target))
    setPage(target)
    window.scrollTo(0, 0)
  }

  const sharedProps = { onNavigate: navigate, guest, showPassCard: !flyingCard }

  return (
    <>
      <CustomCursor />

      {/* Shared starfield — persists across splash → welcome so the
          dematerialize transition reads as one continuous animation */}
      {(page === 'splash' || page === 'welcome') && (
        <StarfieldCursorFollow
          ref={starfieldRef}
          backgroundColor="#2a2a2a"
          starColor="250, 248, 241"
          numStars={600}
          speed={0.8}
          style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        />
      )}

      {page === 'splash' && (
        <SplashScreen ref={splashRef} onBurst={(points) => starfieldRef.current?.spawnBurst(points)} />
      )}

      {/* Welcome screen stays mounted during its exit animation */}
      {page === 'welcome' && (
        <div className="app">
          <WelcomeScreen onEnter={handleEnter} exiting={welcomeExiting} />
        </div>
      )}

      {/* Home page — opacity 0 until card lands in sidebar */}
      {page === 'home' && (
        <div
          style={{
            opacity: homeVisible ? 1 : 0,
            transition: homeVisible ? 'opacity 0.5s ease' : 'none',
            pointerEvents: homeVisible ? 'auto' : 'none',
          }}
        >
          <HomePage activePage="home" {...sharedProps} />
        </div>
      )}

      {page === 'about'       && <AboutPage activePage="about" {...sharedProps} />}
      {page === 'cooperant'   && <CooperantLearning {...sharedProps} />}
      {page === 'senior-mode' && <SeniorMode {...sharedProps} />}
      {page === 'black-bazaar'&& <BlackBazaar {...sharedProps} />}
      {page === 'cave'        && <CavePage activePage="cave" {...sharedProps} />}
      {page === 'archive'     && <GuestArchivePage activePage="archive" {...sharedProps} />}

      {/* Flying card overlay — fixed position, persists across page transition */}
      {flyingCard && (
        <FlyingCard
          intent={flyingCard.intent}
          name={flyingCard.name}
          date={flyingCard.date}
          startRect={flyingCard.rect}
          onFlying={() => setHomeVisible(true)}
          onDone={() => setFlyingCard(null)}
        />
      )}
    </>
  )
}

export default App
