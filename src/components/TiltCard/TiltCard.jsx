import { useEffect, useRef, useState } from 'react'
import './TiltCard.css'

const MAX_TILT = 14
const SHINE_OPACITY = 0.18

export default function TiltCard({ children }) {
  const sensorRef = useRef(null)
  const rafRef = useRef(null)
  const activePointerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const updateFromPointer = (e) => {
    if (!sensorRef.current) return
    const rect = sensorRef.current.getBoundingClientRect()
    const nx = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const ny = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
    const targetX = (ny - 0.5) * 2 * -MAX_TILT
    const targetY = (nx - 0.5) * 2 * MAX_TILT
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: targetX, y: targetY })
      setShine({ x: nx * 100, y: ny * 100 })
    })
  }

  const resetTilt = () => {
    cancelAnimationFrame(rafRef.current)
    activePointerRef.current = null
    setActive(false)
    setTilt({ x: 0, y: 0 })
    setShine({ x: 50, y: 50 })
  }

  const handlePointerEnter = (e) => {
    if (e.pointerType === 'touch') return
    setActive(true)
    updateFromPointer(e)
  }

  const handlePointerDown = (e) => {
    activePointerRef.current = e.pointerId
    setActive(true)
    updateFromPointer(e)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!active && activePointerRef.current !== e.pointerId) return
    updateFromPointer(e)
  }

  const handlePointerUp = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    resetTilt()
  }

  return (
    // Sensor: stable, no transform — owns all pointer events
    <div
      ref={sensorRef}
      className="tilt-card__sensor"
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetTilt}
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
