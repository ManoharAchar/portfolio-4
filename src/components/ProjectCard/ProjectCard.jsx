import { useRef, useEffect } from 'react'
import TagBadge from '../TagBadge/TagBadge'
import './ProjectCard.css'

export default function ProjectCard({ number, tags, imageColor, image, video, thumbTime = 0, title, description, role, team, timeframe, onClick }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const seek = () => { v.currentTime = thumbTime }
    if (v.readyState >= 1) seek()
    else v.addEventListener('loadedmetadata', seek, { once: true })
  }, [thumbTime])

  const handleEnter = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = thumbTime
    v.play().catch(() => {})
  }

  const handleLeave = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = thumbTime
  }

  return (
    <div
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
            preload="metadata"
            className="project-card__video"
          />
        ) : image ? (
          <img src={image} alt={title} />
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
