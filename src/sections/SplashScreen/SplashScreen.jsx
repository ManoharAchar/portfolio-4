import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { sampleLogoPoints } from '../../lib/particleSample'
import logoMark from '../../assets/icons/logo-mark.svg'
import './SplashScreen.css'

const BURST_POINT_COUNT = 160
// How long the dispersed dots keep flying toward the viewer in the shared
// starfield before the next screen is allowed to appear.
const FLIGHT_MS = 900

const SplashScreen = forwardRef(function SplashScreen({ onBurst }, ref) {
  const frameRef = useRef(null)
  const [dematerializing, setDematerializing] = useState(false)

  useImperativeHandle(ref, () => ({
    async playExit({ onBurstFired } = {}) {
      const frame = frameRef.current
      if (!frame) return

      // Capture rect synchronously before the first await — after sampleLogoPoints
      // resolves, React may have already unmounted this component and
      // getBoundingClientRect() on a detached node returns all zeros.
      const rect = frame.getBoundingClientRect()
      const points = await sampleLogoPoints(BURST_POINT_COUNT)
      const normalizedPoints = points.map((p) => ({
        x: (rect.left + p.x * rect.width) / window.innerWidth,
        y: (rect.top + p.y * rect.height) / window.innerHeight,
      }))

      // Hand off to the shared starfield and fade the logo in the same
      // instant — the dots are already moving on their very first rendered
      // frame, so there's no freeze between "logo" and "in motion".
      onBurst?.(normalizedPoints)
      setDematerializing(true)
      // Signal caller that burst has fired — safe to switch pages now.
      onBurstFired?.()

      await new Promise((resolve) => setTimeout(resolve, FLIGHT_MS))
    },
  }))

  return (
    <div className={`splash-screen${dematerializing ? ' splash-screen--dematerializing' : ''}`}>
      <div className="splash-screen__logo-frame" ref={frameRef}>
        <div className="splash-screen__logo-rotator">
          <div className="splash-screen__logo-inner">
            <img src={logoMark} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
})

export default SplashScreen
