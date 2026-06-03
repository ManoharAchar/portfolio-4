import { useState, useRef } from 'react'
import './ImageSlider.css'

export default function ImageSlider({ leftImage, rightImage, alt = 'Before and after comparison' }) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [handleHovered, setHandleHovered] = useState(false)
  const containerRef = useRef(null)

  const getPercent = (clientX) => {
    if (!containerRef.current) return position
    const rect = containerRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(((clientX - rect.left) / rect.width) * 100, 100))
  }

  const handlePointerDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setPosition(getPercent(e.clientX))

    const onMove = (ev) => setPosition(getPercent(ev.clientX))
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const isActive = handleHovered || isDragging

  return (
    <div
      ref={containerRef}
      className="image-slider"
      onPointerDown={handlePointerDown}
    >
      <img src={rightImage} alt={alt} className="image-slider__img" />
      <img
        src={leftImage}
        alt={alt}
        className="image-slider__img"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <div
        className="image-slider__divider"
        style={{ left: `${position}%` }}
      >
        <div
          className="image-slider__handle"
          style={{
            boxShadow: isActive
              ? '0 4px 16px rgba(0,0,0,0.25)'
              : '0 2px 8px rgba(0,0,0,0.15)',
          }}
          onMouseEnter={() => setHandleHovered(true)}
          onMouseLeave={() => setHandleHovered(false)}
        >
          <svg
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="image-slider__icon"
            style={{
              transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <polyline points="13 18 19 12 13 6" />
            <polyline points="11 18 5 12 11 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
