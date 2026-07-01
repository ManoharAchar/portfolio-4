import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import './styles/global.css'
import CustomCursor from './components/CustomCursor/CustomCursor'
import StarfieldCursorFollow from './components/StarfieldCursorFollow/StarfieldCursorFollow'
import SplashScreen from './sections/SplashScreen/SplashScreen'
import WelcomeScreen from './sections/WelcomeScreen/WelcomeScreen'
import HomePage from './sections/HomePage/HomePage'
const AboutPage         = lazy(() => import('./sections/AboutPage/AboutPage'))
const CooperantLearning = lazy(() => import('./sections/CooperantLearning/CooperantLearning'))
const SeniorMode        = lazy(() => import('./sections/SeniorMode/SeniorMode'))
const BlackBazaar       = lazy(() => import('./sections/BlackBazaar/BlackBazaar'))
const Mochitta          = lazy(() => import('./sections/Mochitta/Mochitta'))
const GuestArchivePage  = lazy(() => import('./sections/GuestArchive/GuestArchivePage'))
const CavePage          = lazy(() => import('./sections/Cave/CavePage'))
import FlyingCard from './components/FlyingCard/FlyingCard'
import { resolveVisitor, createPass, passToGuest } from './lib/visitor'
import { startSession, recordPageVisit } from './lib/session'
import { PROJECTS } from './data/projects'
import posthog from 'posthog-js'

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
  mochitta:      'Mochitta — Manohar Achar',
  cave:          'The Cave — Manohar Achar',
  archive:       'Guest Archive — Manohar Achar',
}

const pageToPath = (page) => (page === 'home' || page === 'welcome') ? '/' : `/${page}`
const pathToPage = (path) => (!path || path === '/') ? 'home' : path.replace(/^\//, '')

const SPLASH_BYPASS_REFERRERS = [
  'linkedin.com',
  'greenhouse.io',
  'workday.com',
  'teams.cdn.office.net',
  'com.linkedin.android',
]

const PASS_TOKEN_KEY = 'portfolio_pass_token'

function hasStoredPassToken() {
  try {
    return Boolean(localStorage.getItem(PASS_TOKEN_KEY))
  } catch {
    return false
  }
}

function shouldBypassSplash() {
  if (hasStoredPassToken()) return false
  if (new URLSearchParams(window.location.search).has('r')) return true
  if (!document.referrer) return false

  try {
    const referrer = new URL(document.referrer)
    const host = referrer.hostname.toLowerCase()
    return SPLASH_BYPASS_REFERRERS.some((domain) => (
      host === domain || host.endsWith(`.${domain}`)
    ))
  } catch {
    return false
  }
}

function isPreviewMode() {
  return new URLSearchParams(window.location.search).has('preview')
}

// How long the welcome screen content fade lasts before unmounting
const WELCOME_FADE_MS = 380

// Floor on how long the splash screen stays up before dematerializing —
// Keeps the splash as a quick front beat before the same welcome/pass flow.
const SPLASH_MIN_VISIBLE_MS = 1000

function App() {
  const [previewMode] = useState(isPreviewMode)
  const [skipSplash] = useState(shouldBypassSplash)
  const [page, setPage] = useState(() => (isPreviewMode() || shouldBypassSplash()) ? 'welcome' : 'splash')
  const [guest, setGuest] = useState(null)
  const [welcomeExiting, setWelcomeExiting] = useState(false)
  const [flyingCard, setFlyingCard] = useState(null)
  const [homeVisible, setHomeVisible] = useState(false)
  const [pendingEntry, setPendingEntry] = useState(null)
  const [keepStarfield, setKeepStarfield] = useState(false)

  // Preload thumbnail videos while splash/welcome is playing so they're ready
  // the moment the home page mounts.
  useEffect(() => {
    PROJECTS.forEach(({ video }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.type = 'video/mp4'
      link.href = video
      document.head.appendChild(link)
    })
  }, [])

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
    if (previewMode) {
      window.history.replaceState({ page: 'welcome' }, '', `${window.location.pathname}${window.location.search}`)
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
  }, [previewMode])

  // Once the visitor is resolved, let the splash screen dematerialize into
  // the starfield (respecting a minimum visible floor) before revealing
  // whichever page the visitor actually lands on.
  useEffect(() => {
    if (!pendingEntry) return

    const revealEntry = () => {
      if (pendingEntry.type === 'returning') {
        // skipSplash path only — the non-skip path handles returning visitors
        // directly in the timer below with an overlapping fade transition.
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
    }

    if (skipSplash) {
      revealEntry()
      return
    }

    const wait = Math.max(0, SPLASH_MIN_VISIBLE_MS - (Date.now() - splashStartRef.current))
    const timers = []
    const timer = setTimeout(() => {
      if (pendingEntry.type === 'returning') {
        const { guestData, accent, target, passId } = pendingEntry
        if (accent) document.documentElement.style.setProperty('--accent', accent)
        setGuest(guestData)
        document.title = PAGE_TITLES[target]
        window.history.replaceState({ page: target }, '', pageToPath(target))
        startSession(passId)
        // Keep starfield alive so particles keep flying after splash unmounts
        setKeepStarfield(true)
        // Drop the starfield once particles have finished flying off screen
        timers.push(setTimeout(() => setKeepStarfield(false), 2200))
        // Fire the burst. Only switch to home once the burst has actually fired —
        // setPage() unmounts SplashScreen, so we must wait until after the burst
        // fires to avoid getBoundingClientRect() returning zeros on a detached node.
        splashRef.current?.playExit({
          onBurstFired: () => {
            setPage(target)
            timers.push(setTimeout(() => setHomeVisible(true), 150))
          },
        })
      } else {
        Promise.resolve(splashRef.current?.playExit()).then(revealEntry)
      }
    }, wait)

    return () => {
      clearTimeout(timer)
      timers.forEach(clearTimeout)
    }
  }, [pendingEntry, skipSplash])

  const handleEnter = ({ cardRect, intent, name, date }) => {
    const accent = ACCENT_COLORS[intent]
    if (accent) document.documentElement.style.setProperty('--accent', accent)

    const guestData = { intent, name, date, passId: null }
    setGuest(guestData)
    setFlyingCard({ rect: cardRect, intent, name, date })
    setWelcomeExiting(true)

    if (!previewMode) {
      createPass({ intent, name })
        .then((pass) => {
          setGuest((current) => current ? { ...current, passId: pass.id } : current)
          startSession(pass.id)
        })
        .catch(() => {
          // Non-blocking — visitor still enters the portfolio.
        })
    }

    const homePath = previewMode ? `${window.location.pathname}${window.location.search}` : '/'

    // Unmount welcome screen after its content fade completes
    // replaceState so back button can't return to welcome
    setTimeout(() => {
      document.title = PAGE_TITLES.home
      setPage('home')
      window.history.replaceState({ page: 'home' }, '', homePath)
      setWelcomeExiting(false)
    }, WELCOME_FADE_MS)
  }

  const navigate = (target) => {
    recordPageVisit(target)
    document.title = PAGE_TITLES[target] ?? PAGE_TITLES.home
    window.history.pushState({ page: target }, '', pageToPath(target))
    setPage(target)
    window.scrollTo(0, 0)
    posthog.capture('$pageview')
  }

  const sharedProps = { onNavigate: navigate, guest, showPassCard: !flyingCard }

  return (
    <>
      <CustomCursor />

      {/* Shared starfield — persists across splash → welcome, and stays alive
          during the returning-visitor particle flight into the home page */}
      {(page === 'splash' || page === 'welcome' || keepStarfield) && (
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

      {/* Home page — opacity 0 until card lands in sidebar.
          position+zIndex keep this above the starfield canvas (z-index:0)
          at all times — without it, opacity:1 drops the stacking context
          and the canvas repaints on top. */}
      {page === 'home' && (
        <div
          style={{
            opacity: homeVisible ? 1 : 0,
            transition: homeVisible ? 'opacity 0.8s ease' : 'none',
            pointerEvents: homeVisible ? 'auto' : 'none',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <HomePage activePage="home" {...sharedProps} />
        </div>
      )}

      <Suspense>
        {page === 'about'       && <AboutPage activePage="about" {...sharedProps} />}
        {page === 'cooperant'   && <CooperantLearning {...sharedProps} />}
        {page === 'senior-mode' && <SeniorMode {...sharedProps} />}
        {page === 'black-bazaar'&& <BlackBazaar {...sharedProps} />}
        {page === 'mochitta'    && <Mochitta {...sharedProps} />}
        {page === 'cave'        && <CavePage activePage="cave" {...sharedProps} />}
        {page === 'archive'     && <GuestArchivePage activePage="archive" {...sharedProps} />}
      </Suspense>

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
