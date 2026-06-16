import { useState, useCallback, useRef, useEffect } from 'react'
import IntentCard from '../../components/IntentCard/IntentCard'
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

const RefreshIcon = () => (
  <svg preserveAspectRatio="none" width="25" height="25" viewBox="0 0 19.0625 18.2012" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1875 4.41326C12.4361 4.41326 12.6746 4.31449 12.8504 4.13867C13.0262 3.96286 13.125 3.7244 13.125 3.47576C13.125 3.22712 13.0262 2.98866 12.8504 2.81285C12.6746 2.63703 12.4361 2.53826 12.1875 2.53826V4.41326ZM0.463437 11.757C0.509872 11.871 0.578311 11.9748 0.664846 12.0624C0.751381 12.1499 0.854318 12.2196 0.96778 12.2674C1.08124 12.3152 1.20301 12.3402 1.32612 12.3409C1.44923 12.3417 1.57129 12.3181 1.68531 12.2717C1.79934 12.2253 1.9031 12.1568 1.99067 12.0703C2.07825 11.9838 2.14792 11.8808 2.19571 11.7674C2.24351 11.6539 2.26849 11.5321 2.26922 11.409C2.26996 11.2859 2.24643 11.1638 2.2 11.0498L0.463437 11.757ZM6.27219 4.41326H12.1875V2.53826H6.27219V4.41326ZM1.875 9.39107V8.81045H0V9.39107H1.875ZM0 9.39107C0 10.2101 0.160312 11.0129 0.463437 11.757L2.2 11.0498C1.98564 10.5231 1.87527 9.95978 1.875 9.39107H0ZM6.27219 2.53826C5.44852 2.53827 4.63292 2.70052 3.87196 3.01575C3.111 3.33097 2.41958 3.793 1.83719 4.37545L3.16281 5.70107C3.57114 5.29275 4.0559 4.96885 4.58941 4.74789C5.12292 4.52693 5.69473 4.41322 6.27219 4.41326V2.53826ZM1.8375 4.37545C1.255 4.95782 0.792912 5.64922 0.477632 6.41018C0.162352 7.17114 5.19597e-05 7.98676 0 8.81045H1.875C1.875 7.6442 2.33844 6.52607 3.16281 5.70107L1.8375 4.37545Z" fill="currentColor"/>
    <path d="M12.1875 5.90013V1.05138C12.1875 0.562009 12.7791 0.317009 13.125 0.662947L15.4403 2.97826C15.5056 3.04355 15.5574 3.12106 15.5927 3.20637C15.6281 3.29168 15.6463 3.38311 15.6463 3.47545C15.6463 3.56778 15.6281 3.65922 15.5927 3.74452C15.5574 3.82983 15.5056 3.90734 15.4403 3.97263L13.125 6.28826C12.7791 6.6342 12.1875 6.38951 12.1875 5.90013Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.875 13.7883C6.62636 13.7883 6.3879 13.887 6.21209 14.0628C6.03627 14.2387 5.9375 14.4771 5.9375 14.7258C5.9375 14.9744 6.03627 15.2129 6.21209 15.3887C6.3879 15.5645 6.62636 15.6633 6.875 15.6633V13.7883ZM18.5991 6.44451C18.5025 6.21826 18.321 6.039 18.0935 5.94539C17.866 5.85178 17.6109 5.85132 17.3831 5.94411C17.1553 6.0369 16.9731 6.21549 16.8758 6.4414C16.7784 6.6673 16.7738 6.9224 16.8628 7.1517L18.5991 6.44451ZM12.7903 13.7883H6.875V15.6633H12.7903V13.7883ZM17.1875 8.81045V9.39107H19.0625V8.81045H17.1875ZM19.0625 8.81045C19.0625 7.99138 18.9022 7.18857 18.5991 6.44451L16.8628 7.1517C17.0771 7.67848 17.1873 8.24176 17.1875 8.81045H19.0625ZM12.7903 15.6633C13.614 15.6632 14.4296 15.501 15.1905 15.1858C15.9515 14.8705 16.6429 14.4085 17.2253 13.8261L15.8997 12.5004C15.4914 12.9088 15.0066 13.2327 14.4731 13.4536C13.9396 13.6746 13.3678 13.7883 12.7903 13.7883V15.6633ZM17.2253 13.8261C17.8078 13.2437 18.2698 12.5523 18.585 11.7913C18.9002 11.0303 19.0625 10.2147 19.0625 9.39107H17.1875C17.1875 10.5573 16.7241 11.6754 15.8997 12.5004L17.2253 13.8261Z" fill="currentColor"/>
    <path d="M6.875 12.3017V17.1498C6.875 17.6392 6.28344 17.8842 5.9375 17.5383L3.62219 15.2226C3.49042 15.0908 3.4164 14.912 3.4164 14.7256C3.4164 14.5392 3.49042 14.3604 3.62219 14.2286L5.9375 11.9133C6.28344 11.5673 6.875 11.8123 6.875 12.3017Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CARDS = ['designer', 'see-work', 'sent-here', 'exploring']

// How long the title sits alone before the subtitle + decision cards slide
// in from below, automatically — no user action triggers this.
const STAGE2_DELAY_MS = 900

export default function WelcomeScreen({ onEnter, exiting = false }) {
  const [selected, setSelected] = useState(null)
  const [guestName, setGuestName] = useState(() => randomName(null))
  const [showAttrib, setShowAttrib] = useState(false)
  const passCardRef = useRef(null)
  const innerRef = useRef(null)
  const [passScale, setPassScale] = useState(0.599)
  const [entered, setEntered] = useState(false)
  const [showIntent, setShowIntent] = useState(false)
  const [intentVisible, setIntentVisible] = useState(false)
  const [previewPassId, setPreviewPassId] = useState(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const update = () => setPassScale(Math.min(el.offsetWidth / 576, 0.599))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Fade the cards in on mount rather than having them appear instantly —
  // this is the moment the splash screen hands off to the welcome screen.
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Stage 1 → 2: the title sits alone, centered, then the subtitle + cards
  // mount and slide up from below on their own, pushing the title up.
  useEffect(() => {
    if (!entered) return
    const t = setTimeout(() => setShowIntent(true), STAGE2_DELAY_MS)
    return () => clearTimeout(t)
  }, [entered])

  useEffect(() => {
    if (!showIntent) return
    const id = requestAnimationFrame(() => setIntentVisible(true))
    return () => cancelAnimationFrame(id)
  }, [showIntent])

  // Fetch the current pass count so the preview card shows this visitor's
  // likely number (total + 1) before they've formally entered.
  useEffect(() => {
    fetchPassStats().then((stats) => {
      if (stats?.total != null) setPreviewPassId(stats.total + 1)
    })
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
      <div className="welcome-screen__vcenter">
      <div className={`welcome-screen__inner${entered ? ' welcome-screen__inner--entered' : ''}`} ref={innerRef}>

        <div className={`welcome-screen__title-group ${selected ? 'welcome-screen__title-group--hidden' : ''}`}>
          <p className="welcome-screen__eyebrow">WELCOME TO</p>
          <h1 className="welcome-screen__title">Manohar's Corner</h1>
        </div>

        {showIntent && (
          <>
            <div className={`welcome-screen__intent${intentVisible ? ' welcome-screen__intent--visible' : ''}`}>
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
              <div className="welcome-screen__name-pass">
                <div className="welcome-screen__name-row">
                  <span className="welcome-screen__name-label">NAME:</span>
                  <span className="welcome-screen__name-input">{guestName}</span>
                  <button className="welcome-screen__refresh" onClick={handleRefresh} type="button" aria-label="Refresh name">
                    <RefreshIcon />
                  </button>
                </div>

                <div
                  className="welcome-screen__pass-wrap"
                  style={{ '--pass-scale': passScale, '--pass-h': `${Math.round(passScale * 270)}px` }}
                >
                  <TiltCard>
                    <PassCard ref={passCardRef} intent={selected || 'designer'} name={guestName} passId={previewPassId} />
                  </TiltCard>
                </div>

                <p className="welcome-screen__pass-note">YOUR PASS WILL APPEAR IN THE GUEST ARCHIVE.</p>
              </div>

              <button
                className={`welcome-screen__enter ${selected ? 'welcome-screen__enter--active' : ''}`}
                onClick={handleEnter}
                type="button"
              >
                ENTER →
              </button>
            </div>
          </>
        )}

      </div>
      </div>

    </div>
  )
}
