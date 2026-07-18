import { useState, useEffect, useRef, lazy, Suspense, startTransition } from 'react'
import './styles/global.css'
import CustomCursor from './components/CustomCursor/CustomCursor'
import StarfieldCursorFollow from './components/StarfieldCursorFollow/StarfieldCursorFollow'
import SplashScreen from './sections/SplashScreen/SplashScreen'
import WelcomeScreen from './sections/WelcomeScreen/WelcomeScreen'
import HomePage from './sections/HomePage/HomePage'
import ChunkErrorBoundary from './components/ChunkErrorBoundary/ChunkErrorBoundary'
// Loaders shared by lazy() and the prefetch logic below — dynamic imports
// dedupe, so warming a chunk here makes the lazy mount instant.
const PAGE_LOADERS = {
  about:          () => import('./sections/AboutPage/AboutPage'),
  cooperant:      () => import('./sections/CooperantLearning/CooperantLearning'),
  'senior-mode':  () => import('./sections/SeniorMode/SeniorMode'),
  'black-bazaar': () => import('./sections/BlackBazaar/BlackBazaar'),
  mochitta:       () => import('./sections/Mochitta/Mochitta'),
  fleet:          () => import('./sections/FleetSaaS/FleetSaaS'),
  'industrial-hmi': () => import('./sections/IndustrialHMI/IndustrialHMI'),
  archive:        () => import('./sections/GuestArchive/GuestArchivePage'),
  cave:           () => import('./sections/Cave/CavePage'),
}
const AboutPage         = lazy(PAGE_LOADERS.about)
const CooperantLearning = lazy(PAGE_LOADERS.cooperant)
const SeniorMode        = lazy(PAGE_LOADERS['senior-mode'])
const BlackBazaar       = lazy(PAGE_LOADERS['black-bazaar'])
const Mochitta          = lazy(PAGE_LOADERS.mochitta)
const FleetSaaS         = lazy(PAGE_LOADERS.fleet)
const IndustrialHMI     = lazy(PAGE_LOADERS['industrial-hmi'])
const GuestArchivePage  = lazy(PAGE_LOADERS.archive)
const CavePage          = lazy(PAGE_LOADERS.cave)
import FlyingCard from './components/FlyingCard/FlyingCard'
import { resolveVisitor, createPass, passToGuest } from './lib/visitor'
import { startSession, recordPageVisit } from './lib/session'
import { PROJECTS } from './data/projects'
import { capture } from './lib/analytics'

const ACCENT_COLORS = {
  designer: '#798c6d',
  'see-work': '#64818c',
  'sent-here': '#c87a5a',
  exploring:  '#c4a24d',
}

const PAGE_TITLES = {
  home:          'Manohar Achar · Product Designer',
  about:         'About · Manohar Achar',
  cooperant:     'Cooperant Learning · Manohar Achar',
  'senior-mode': 'Senior Mode · Manohar Achar',
  'black-bazaar':'Black Bazaar · Manohar Achar',
  mochitta:      'Mochitta · Manohar Achar',
  fleet:         'Fleet Coordination · Manohar Achar',
  'industrial-hmi': 'Industrial HMI · Manohar Achar',
  cave:          'The Cave · Manohar Achar',
  archive:       'Guest Archive · Manohar Achar',
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
  const [entryFadeDone, setEntryFadeDone] = useState(false)

  // Once the 0.8s entry fade completes, drop opacity/transition from the page
  // wrappers entirely. Safari mispositions position:fixed descendants (the
  // mobile top bar) inside ancestors with animated opacity — the bar detaches
  // from the viewport and parks mid-screen.
  useEffect(() => {
    if (!homeVisible) return
    const t = setTimeout(() => setEntryFadeDone(true), 900)
    return () => clearTimeout(t)
  }, [homeVisible])

  // Preload thumbnail videos while splash/welcome is playing so they're ready
  // the moment the home page mounts. fetchPriority=low keeps them from
  // competing with fonts/JS/API calls still on the critical path.
  useEffect(() => {
    const links = PROJECTS.map(({ video }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.type = 'video/mp4'
      link.href = video
      link.fetchPriority = 'low'
      document.head.appendChild(link)
      return link
    })
    return () => links.forEach((link) => link.remove())
  }, [])

  const starfieldRef = useRef(null)
  const splashRef = useRef(null)
  const splashStartRef = useRef(Date.now())
  const prefetchedRef = useRef(false)

  // Once the visitor has entered, prefetch the remaining page chunks in the
  // background so in-app navigation never waits on the network.
  useEffect(() => {
    if (page === 'splash' || page === 'welcome' || prefetchedRef.current) return
    prefetchedRef.current = true
    const prefetch = () => Object.values(PAGE_LOADERS).forEach((load) => load())
    if ('requestIdleCallback' in window) requestIdleCallback(prefetch, { timeout: 3000 })
    else setTimeout(prefetch, 2000)
  }, [page])

  // Sync page state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      const target = e.state?.page ?? pathToPage(window.location.pathname)
      if (target) {
        document.title = PAGE_TITLES[target] ?? PAGE_TITLES.home
        // Keep the current page visible while the target chunk loads
        startTransition(() => {
          setPage(target)
        })
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
        // Deep link to a lazy page: warm its chunk now, while the splash is
        // still playing, so the page mounts instantly after the burst.
        PAGE_LOADERS[target]?.()
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
    // startTransition keeps the current page on screen while the target
    // page's lazy chunk loads, instead of suspending to a blank frame.
    startTransition(() => {
      setPage(target)
    })
    window.scrollTo(0, 0)
    capture('$pageview')
  }

  const sharedProps = { onNavigate: navigate, guest, showPassCard: !flyingCard }

  // position+zIndex keep pages above the starfield canvas (z-index:0) at all
  // times. The opacity fade only exists during entry; afterwards the style
  // reduces to just the stacking keys (see entryFadeDone above).
  const pageWrapStyle = entryFadeDone
    ? { position: 'relative', zIndex: 1 }
    : {
        opacity: homeVisible ? 1 : 0,
        transition: homeVisible ? 'opacity 0.8s ease' : 'none',
        pointerEvents: homeVisible ? 'auto' : 'none',
        position: 'relative',
        zIndex: 1,
      }

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

      {/* Home page — opacity 0 until card lands in sidebar */}
      {page === 'home' && (
        <div style={pageWrapStyle}>
          <HomePage activePage="home" {...sharedProps} />
        </div>
      )}

      {/* Same fade + stacking treatment as the home page: without the
          position+zIndex wrapper the starfield canvas (z-index:0) paints on
          top of deep-linked pages during the returning-visitor entry. */}
      <div style={pageWrapStyle}>
        <ChunkErrorBoundary>
          <Suspense>
            {page === 'about'       && <AboutPage activePage="about" {...sharedProps} />}
            {page === 'cooperant'   && <CooperantLearning {...sharedProps} />}
            {page === 'senior-mode' && <SeniorMode {...sharedProps} />}
            {page === 'black-bazaar'&& <BlackBazaar {...sharedProps} />}
            {page === 'mochitta'    && <Mochitta {...sharedProps} />}
            {page === 'fleet'       && <FleetSaaS {...sharedProps} />}
            {page === 'industrial-hmi' && <IndustrialHMI {...sharedProps} />}
            {page === 'cave'        && <CavePage activePage="cave" {...sharedProps} />}
            {page === 'archive'     && <GuestArchivePage activePage="archive" {...sharedProps} />}
          </Suspense>
        </ChunkErrorBoundary>
      </div>

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
