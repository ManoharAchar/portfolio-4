import { useRef, useEffect } from 'react'
import TagBadge from '../TagBadge/TagBadge'
import './ProjectCard.css'

export default function ProjectCard({ number, tags, imageColor, image, video, thumbTime = 0, loopAlways = false, title, description, role, team, timeframe, onClick }) {
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
      v.pause()
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
            v.play().catch(() => {})
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
      className={`project-card${onClick ? ' project-card--clickable' : ''}`}
      data-cursor={onClick ? 'view-project' : 'coming-soon'}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="project-card__header-row">
        <span className="project-card__number">NO. {number}</span>
        <div className="project-card__tags">
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
      </div>

      <div
        className="project-card__image"
        style={{ background: !image && !video ? imageColor : undefined }}
      >
        {video ? (
          <video
            ref={videoRef}
            src={video}
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

      <div className="project-card__body">
        <h2 className="project-card__title">{title}</h2>
        <p className="project-card__description">{description}</p>
      </div>

      <div className="project-card__meta">
        <div className="project-card__divider" />
        <div className="project-card__table">
          <div className="project-card__labels">
            <span>ROLE</span>
            <span>TEAM</span>
            <span>TIMEFRAME</span>
          </div>
          <div className="project-card__values">
            <span>{role}</span>
            <span>{team}</span>
            <span>{timeframe}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
