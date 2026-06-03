import { useRef, useState } from 'react'
import './TiltCard.css'

const MAX_TILT = 14
const SHINE_OPACITY = 0.18

export default function TiltCard({ children }) {
  const sensorRef = useRef(null)
  const rafRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handleMouseEnter = () => {
    setActive(true)
  }

  const handleMouseMove = (e) => {
    if (!sensorRef.current) return
    const rect = sensorRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    const targetX = (ny - 0.5) * 2 * -MAX_TILT
    const targetY = (nx - 0.5) * 2 * MAX_TILT
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: targetX, y: targetY })
      setShine({ x: nx * 100, y: ny * 100 })
    })
  }

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current)
    setActive(false)
    setTilt({ x: 0, y: 0 })
    setShine({ x: 50, y: 50 })
  }

  return (
    // Sensor: stable, no transform — owns all pointer events
    <div
      ref={sensorRef}
      className="tilt-card__sensor"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Visual layer: transforms freely, pointer-events disabled so it never
          interferes with the sensor's hit area */}
      <div
        className="tilt-card"
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.03 : 1})`,
          transition: active
            ? 'transform 0.08s linear'
            : 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {children}
        <div
          className="tilt-card__shine"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${active ? SHINE_OPACITY : 0}) 0%, transparent 65%)`,
            transition: active ? 'none' : 'background 0.55s ease',
          }}
        />
      </div>
    </div>
  )
}
