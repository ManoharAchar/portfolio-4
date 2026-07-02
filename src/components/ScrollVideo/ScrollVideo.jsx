import { useRef, useEffect, useState } from 'react'
import './ScrollVideo.css'

export default function ScrollVideo({ src, className = '', accentColor = 'var(--accent)', ...props }) {
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {})
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  const handleTimeUpdate = (e) => {
    const video = e.target
    if (video.duration) {
      if (video.currentTime >= video.duration - 0.25) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
      setProgress((video.currentTime / video.duration) * 100)
    }
  }

  const handlePointerDown = (e) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    video.pause()
    setIsDragging(true)

    // Rect captured once per drag — it can't change while scrubbing, and
    // reading it per pointermove forces layout between currentTime seeks.
    const rect = video.parentElement.getBoundingClientRect()
    const update = (clientX) => {
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      video.currentTime = ratio * video.duration
      setProgress(ratio * 100)
    }

    update(e.clientX)
    // Coalesce to one seek per frame — seeking per pointer event floods the
    // decoder with more seeks than it can display.
    let rafId = null
    let lastX = e.clientX
    const onMove = (e2) => {
      lastX = e2.clientX
      if (rafId == null) {
        rafId = requestAnimationFrame(() => {
          rafId = null
          update(lastX)
        })
      }
    }
    const onUp = () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      setIsDragging(false)
      video.play().catch(() => {})
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <div
      className={`scroll-video ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        className="scroll-video__el"
        onTimeUpdate={handleTimeUpdate}
        {...props}
      />
      {progress > 0 && (
        <div
          className="scroll-video__progress"
          style={{
            width: `${progress}%`,
            backgroundColor: accentColor,
            transition: progress < 5 || isDragging ? 'none' : 'width 250ms linear',
          }}
        />
      )}
      <div
        className={`scroll-video__scrub ${isDragging ? 'scroll-video__scrub--dragging' : ''}`}
        onPointerDown={handlePointerDown}
      >
        <div
          className="scroll-video__thumb"
          style={{
            left: `calc(${progress}% - 7px)`,
            opacity: isHovered || isDragging ? 1 : 0,
            transition: isDragging ? 'none' : 'opacity 150ms ease, left 250ms linear',
          }}
        />
      </div>
    </div>
  )
}
