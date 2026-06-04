import { useState, useEffect } from 'react'
import './CustomCursor.css'

const CLICKABLE = 'a, button, [role="button"], label, input, select, textarea'

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [cursorState, setCursorState] = useState('default')
  const [tipText, setTipText] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isTouch) return
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const el = e.target
      if (el.closest('[data-cursor="coming-soon"]')) {
        setCursorState('coming-soon')
        setTipText('')
      } else if (el.closest('[data-cursor="view-project"]')) {
        setCursorState('view-project')
        setTipText('')
      } else if (el.closest('[data-cursor="tip"]')) {
        const tipEl = el.closest('[data-cursor="tip"]')
        setCursorState('tip')
        setTipText(tipEl.dataset.cursorTip || '')
      } else if (el.closest(CLICKABLE)) {
        setCursorState('hover')
        setTipText('')
      } else {
        setCursorState('default')
        setTipText('')
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [visible])

  if (isTouch) return null

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      {cursorState === 'default' && (
        <svg
          className="cursor-arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.92098 2.29927C6.93571 1.53286 5.5 2.23498 5.5 3.48325V20.492C5.5 21.9142 7.2945 22.538 8.17661 21.4224L12.3676 16.1222C12.6806 15.7264 13.1574 15.4956 13.6619 15.4956H20.5143C21.9425 15.4956 22.5626 13.6885 21.4353 12.8116L7.92098 2.29927Z"
            fill="var(--accent)"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {cursorState === 'hover' && (
        <div className="cursor-dot" />
      )}

      {(cursorState === 'view-project' || cursorState === 'coming-soon') && (
        <div className="cursor-pill">
          {cursorState === 'view-project' ? 'VIEW PROJECT' : 'COMING SOON'}
        </div>
      )}

      {cursorState === 'tip' && tipText && (
        <div className="cursor-tip">{tipText}</div>
      )}
    </div>
  )
}
