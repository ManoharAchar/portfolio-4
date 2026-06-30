import { useState, useEffect, useRef } from 'react'
import posthog from 'posthog-js'
import PassCard, { formatDate } from '../../components/PassCard/PassCard'
import TiltCard from '../../components/TiltCard/TiltCard'
import { fetchPassStats } from '../../lib/archive'
import './WelcomeScreen.css'

const TRAVEL_NAMES = [
  'Travelling Bee', 'Scavenging Hawk', 'Wandering Fox', 'Patient Heron',
  'Restless Sparrow', 'Curious Otter', 'Quiet Moth', 'Drifting Crane',
  'Gentle Finch', 'Sleepy Owl', 'Bold Falcon', 'Wistful Dove',
  'Nimble Rabbit', 'Pensive Lynx', 'Roaming Elk', 'Daydreaming Wren',
  'Stubborn Badger', 'Gliding Swan', 'Clever Magpie', 'Bashful Deer',
  'Daring Osprey', 'Mellow Turtle', 'Loyal Wolf', 'Humble Beetle',
  'Graceful Ibis', 'Playful Seal', 'Whispering Jay', 'Steadfast Bear',
  'Flickering Firefly', 'Drowsy Panda', 'Eager Marten', 'Soaring Eagle',
  'Thoughtful Raven', 'Spirited Colt', 'Tranquil Frog', 'Dapper Starling',
  'Swift Gazelle', 'Brooding Panther', 'Jolly Pelican', 'Timid Chipmunk',
  'Bright Parrot', 'Stealthy Gecko', 'Moonlit Hare', 'Cautious Crane',
  'Wandering Ermine', 'Tidy Sparrowhawk', 'Fearless Condor', 'Musing Flamingo',
  'Cozy Hedgehog', 'Lively Kingfisher', 'Careful Tortoise', 'Radiant Oriole',
  'Lone Coyote', 'Peaceful Manatee', 'Perched Robin', 'Hidden Chameleon',
  'Skipping Lamb', 'Floating Jellyfish', 'Attentive Meerkat', 'Hushed Owl',
  'Gallant Stag', 'Freckled Trout', 'Sly Raccoon', 'Nodding Pigeon',
  'Frosty Penguin', 'Amber Dragonfly', 'Distant Albatross', 'Tender Duckling',
  'Vigilant Hound', 'Breezy Swallow', 'Shadowed Panther', 'Rosy Flamingo',
  'Gentle Bison', 'Quick Ferret', 'Ancient Tortoise', 'Misty Egret',
  'Sunlit Warbler', 'Dappled Fawn', 'Idle Sloth', 'Plucky Woodpecker',
  'Velvet Moth', 'Sheltered Crab', 'Dusty Roadrunner', 'Golden Pheasant',
  'Tiny Shrew', 'Scribbling Crow', 'Languid Catfish', 'Noble Stork',
  'Winding Serpent', 'Earnest Puffin', 'Soft Chinchilla', 'Prancing Foal',
  'Crystal Hummingbird', 'Rustic Quail', 'Solemn Moose', 'Spotted Leopard',
  'Calm Capybara', 'Weary Salmon', 'Speckled Lark', 'Meadow Bunting',
]

function randomName(exclude) {
  const pool = TRAVEL_NAMES.filter((n) => n !== exclude)
  return pool[Math.floor(Math.random() * pool.length)]
}

// Blue 60%, burnt orange 25%, sage green 10%, golden 5%
function randomWeightedIntent() {
  const r = Math.random()
  if (r < 0.60) return 'see-work'
  if (r < 0.85) return 'sent-here'
  if (r < 0.95) return 'designer'
  return 'exploring'
}

const STAGE2_DELAY_MS = 900
const AUTO_ENTER_MS = 2000

export default function WelcomeScreen({ onEnter, exiting = false }) {
  const [intent] = useState(randomWeightedIntent)
  const [guestName] = useState(() => randomName(null))
  const [passDate] = useState(formatDate)
  const [showAttrib, setShowAttrib] = useState(false)
  const passCardRef = useRef(null)
  const innerRef = useRef(null)
  const [passScale, setPassScale] = useState(0.599)
  const [entered, setEntered] = useState(false)
  const [showIntent, setShowIntent] = useState(false)
  const [intentVisible, setIntentVisible] = useState(false)
  const [previewPassId, setPreviewPassId] = useState(null)

  // Mobile pass card scale via ResizeObserver
  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const update = () => setPassScale(Math.min(el.offsetWidth / 576, 0.599))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    posthog.capture('pass_screen_viewed')
  }, [])

  useEffect(() => {
    fetchPassStats().then((stats) => {
      if (stats?.total != null) setPreviewPassId(stats.total + 1)
    })
  }, [])

  // Stage 1 — fade the inner in on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Stage 2 — mount the pass section after the title has sat alone
  useEffect(() => {
    if (!entered) return
    const t = setTimeout(() => setShowIntent(true), STAGE2_DELAY_MS)
    return () => clearTimeout(t)
  }, [entered])

  // Trigger the slide-up animation one frame after mounting
  useEffect(() => {
    if (!showIntent) return
    const id = requestAnimationFrame(() => setIntentVisible(true))
    return () => cancelAnimationFrame(id)
  }, [showIntent])

  // Auto-advance after a short pass-read beat — no click required
  useEffect(() => {
    if (!showIntent) return
    const t = setTimeout(() => {
      const cardRect = passCardRef.current?.getBoundingClientRect()
      posthog.capture('pass_screen_entered', { intent })
      onEnter?.({ intent, name: guestName, date: passDate, cardRect })
    }, AUTO_ENTER_MS)
    return () => clearTimeout(t)
  }, [showIntent, guestName, intent, onEnter, passDate])

  return (
    <div className={`welcome-screen${exiting ? ' welcome-screen--exiting' : ''}`}>
      <button
        className="welcome-screen__attrib-btn"
        onClick={() => setShowAttrib((v) => !v)}
        aria-label="Design attribution"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="8" r="0.75" fill="currentColor"/>
        </svg>
      </button>
      {showAttrib && (
        <div className="welcome-screen__attrib-tip">
          Design inspired by{' '}
          <a
            href="https://www.linkedin.com/in/megan-qz-yap/"
            target="_blank"
            rel="noreferrer"
            className="welcome-screen__attrib-link"
          >
            Megan Yap
          </a>
        </div>
      )}

      <div className="welcome-screen__vcenter">
        <div className={`welcome-screen__inner${entered ? ' welcome-screen__inner--entered' : ''}`} ref={innerRef}>

          <div className={`welcome-screen__title-group${intentVisible ? ' welcome-screen__title-group--hidden' : ''}`}>
            <p className="welcome-screen__eyebrow">WELCOME TO</p>
            <h1 className="welcome-screen__title">Manohar's Portfolio</h1>
          </div>

          {showIntent && (
            <div className={`welcome-screen__intent${intentVisible ? ' welcome-screen__intent--visible' : ''}`}>
              <p className="welcome-screen__pass-headline">Here's your pass!</p>
              <div
                className="welcome-screen__pass-wrap"
                style={{ '--pass-scale': passScale, '--pass-h': `${Math.round(passScale * 270)}px` }}
              >
                <div className="welcome-screen__pass-float">
                  <TiltCard>
                    <PassCard
                      ref={passCardRef}
                      intent={intent}
                      name={guestName}
                      date={passDate}
                      passId={previewPassId}
                    />
                  </TiltCard>
                </div>
              </div>
              <p className="welcome-screen__pass-note">
                YOUR PASS WILL APPEAR IN THE <strong>GUEST ARCHIVE</strong>.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
