import { useRef, useEffect } from 'react'
import { tryPlay, cancelPlay } from '../../lib/playInView'
import './ProjectCard.css'

export default function ProjectCard({ domain, maturity, imageColor, image, video, poster, thumbTime = 0, loopAlways = false, title, metadata, description, onClick, dimmed = false, viewName, locked = false, unlocked = false }) {
  const lockedNow = locked && !unlocked
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const seek = () => { v.currentTime = thumbTime }
    if (v.readyState >= 1) seek()
    else v.addEventListener('loadedmetadata', seek, { once: true })
  }, [thumbTime])

  useEffect(() => {
    const card = cardRef.current
    const v = videoRef.current
    if (!card || !v || !video) return

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    let observer

    const pauseAtThumb = () => {
      cancelPlay(v)
      v.currentTime = thumbTime
    }

    const syncObserver = () => {
      observer?.disconnect()

      if (!loopAlways && !mobileQuery.matches) {
        pauseAtThumb()
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // tryPlay retries on the next tap if playback was blocked
            // (iOS Low Power Mode rejects non-gesture play()).
            tryPlay(v)
          } else {
            pauseAtThumb()
          }
        },
        {
          threshold: 0.45,
          rootMargin: '0px 0px -12% 0px',
        }
      )

      observer.observe(card)
    }

    syncObserver()
    mobileQuery.addEventListener('change', syncObserver)

    return () => {
      observer?.disconnect()
      cancelPlay(v)
      mobileQuery.removeEventListener('change', syncObserver)
    }
  }, [thumbTime, video, loopAlways])

  const handleEnter = () => {
    if (loopAlways) return
    const v = videoRef.current
    if (!v) return
    v.currentTime = thumbTime
    v.play().catch(() => {})
  }

  const handleLeave = () => {
    if (loopAlways) return
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = thumbTime
  }

  return (
    <div
      ref={cardRef}
      className={`project-card${onClick ? ' project-card--clickable' : ''}${dimmed ? ' project-card--dimmed' : ''}`}
      data-cursor={lockedNow ? 'passcode' : onClick ? 'view-project' : 'coming-soon'}
      style={viewName ? { viewTransitionName: viewName } : undefined}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="project-card__thumb-wrap">
      <div
        className="project-card__image"
        style={{ background: !image && !video ? imageColor : undefined }}
      >
        {video ? (
          <video
            ref={videoRef}
            src={video}
            poster={poster}
            muted
            playsInline
            loop
            preload="auto"
            className="project-card__video"
          />
        ) : image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : null}
      </div>
      </div>

      {locked && (
        <div
          className={`project-card__lock${unlocked ? ' project-card__lock--open' : ''}`}
          aria-hidden="true"
        >
          {unlocked ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="var(--accent)" strokeWidth="1.8" />
              <path d="M8 10.5 V7.5 a4 4 0 0 1 7.4 -2" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="#faf8f1" strokeWidth="1.8" />
              <path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 v3" stroke="#faf8f1" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </div>
      )}

      <div className="project-card__body">
        <h2 className="project-card__title">{title}</h2>
        {metadata && <p className="project-card__meta">{metadata}</p>}
        <p className="project-card__description">{description}</p>
        {domain && maturity && (
          <span className="project-card__chip">{`${domain} · ${maturity}`.toUpperCase()}</span>
        )}
      </div>
    </div>
  )
}
