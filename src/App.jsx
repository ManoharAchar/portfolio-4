import { useState, useEffect } from 'react'
import './styles/global.css'
import CustomCursor from './components/CustomCursor/CustomCursor'
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

// How long the welcome screen content fade lasts before unmounting
const WELCOME_FADE_MS = 380

function App() {
  const [page, setPage] = useState(null)
  const [guest, setGuest] = useState(null)
  const [welcomeExiting, setWelcomeExiting] = useState(false)
  const [flyingCard, setFlyingCard] = useState(null)
  const [homeVisible, setHomeVisible] = useState(false)

  // Sync page state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      const target = e.state?.page
      if (target) setPage(target)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // On mount: resolve returning visitor and skip welcome screen if recognised
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has('preview')
    if (preview) {
      setPage('welcome')
      window.history.replaceState({ page: 'welcome' }, '')
      return
    }

    resolveVisitor().then(({ pass, isNew }) => {
      if (!isNew && pass) {
        const guestData = passToGuest(pass)
        const accent = ACCENT_COLORS[pass.intent]
        if (accent) document.documentElement.style.setProperty('--accent', accent)
        setGuest(guestData)
        setHomeVisible(true)
        setPage('home')
        window.history.replaceState({ page: 'home' }, '')
        startSession(pass.id)
      } else {
        setPage('welcome')
        window.history.replaceState({ page: 'welcome' }, '')
      }
    })
  }, [])

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
      setPage('home')
      window.history.replaceState({ page: 'home' }, '')
      setWelcomeExiting(false)
    }, WELCOME_FADE_MS)
  }

  const navigate = (target) => {
    recordPageVisit(target)
    window.history.pushState({ page: target }, '')
    setPage(target)
  }

  const sharedProps = { onNavigate: navigate, guest, showPassCard: !flyingCard }

  return (
    <>
      <CustomCursor />

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
