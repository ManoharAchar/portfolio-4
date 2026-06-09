import { useState, useCallback, useRef, useEffect } from 'react'
import IntentCard from '../../components/IntentCard/IntentCard'
import PassCard, { formatDate } from '../../components/PassCard/PassCard'
import StarfieldCursorFollow from '../../components/StarfieldCursorFollow/StarfieldCursorFollow'
import TiltCard from '../../components/TiltCard/TiltCard'
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

const RefreshIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M15.5 9A6.5 6.5 0 1 1 9 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 2.5 L12 5.5 L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CARDS = ['designer', 'see-work', 'sent-here', 'exploring']

export default function WelcomeScreen({ onEnter, exiting = false }) {
  const [selected, setSelected] = useState(null)
  const [guestName, setGuestName] = useState(() => randomName(null))
  const [showAttrib, setShowAttrib] = useState(false)
  const passCardRef = useRef(null)
  const innerRef = useRef(null)
  const [passScale, setPassScale] = useState(0.599)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const update = () => setPassScale(Math.min(el.offsetWidth / 576, 0.599))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleCardClick = useCallback((type) => setSelected(type), [])

  const handleRefresh = useCallback(() => {
    setGuestName((prev) => randomName(prev))
  }, [])

  const handleEnter = useCallback(() => {
    if (!selected) return
    const cardRect = passCardRef.current?.getBoundingClientRect()
    onEnter?.({ intent: selected, name: guestName, date: formatDate(), cardRect })
  }, [selected, guestName, onEnter])

  return (
    <div className={`welcome-screen ${exiting ? 'welcome-screen--exiting' : ''}`}>
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
      <StarfieldCursorFollow
        backgroundColor="#2a2a2a"
        starColor="250, 248, 241"
        numStars={600}
        speed={0.8}
        style={{ position: 'absolute', inset: 0 }}
      />
      <div className="welcome-screen__inner" ref={innerRef}>

        <div className={`welcome-screen__title-group ${selected ? 'welcome-screen__title-group--hidden' : ''}`}>
          <p className="welcome-screen__eyebrow">WELCOME TO</p>
          <h1 className="welcome-screen__title">Manohar's Studio</h1>
        </div>

        <div className="welcome-screen__intent">
          <p className="welcome-screen__subtitle">
            EVERY <strong>JOURNEY</strong> BEGINS WITH <strong>INTENTION</strong>. <strong>WHAT'S YOURS?</strong>
          </p>
          <div className="welcome-screen__grid">
            {CARDS.map((type) => (
              <IntentCard
                key={type}
                type={type}
                selected={selected === type}
                onClick={() => handleCardClick(type)}
              />
            ))}
          </div>
        </div>

        <div className={`welcome-screen__response ${selected ? 'welcome-screen__response--visible' : ''}`}>
          <div className="welcome-screen__name-row">
            <span className="welcome-screen__name-label">NAME:</span>
            <span className="welcome-screen__name-input">{guestName}</span>
            <button className="welcome-screen__refresh" onClick={handleRefresh} type="button" aria-label="Refresh name">
              <RefreshIcon />
            </button>
          </div>

          {/* ref on PassCard — getBoundingClientRect gives the card's visual position */}
          <div
            className="welcome-screen__pass-wrap"
            style={{ '--pass-scale': passScale, '--pass-h': `${Math.round(passScale * 270)}px` }}
          >
            <TiltCard>
              <PassCard ref={passCardRef} intent={selected || 'designer'} name={guestName} />
            </TiltCard>
          </div>

          <p className="welcome-screen__pass-note">YOUR PASS WILL APPEAR IN THE GUEST ARCHIVE.</p>

          <button
            className={`welcome-screen__enter ${selected ? 'welcome-screen__enter--active' : ''}`}
            onClick={handleEnter}
            type="button"
          >
            ENTER →
          </button>
        </div>

      </div>
    </div>
  )
}
