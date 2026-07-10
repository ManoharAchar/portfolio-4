import { useEffect, useRef, useState } from 'react'

// Renders a fixed-pixel design exhibit scaled to fit its container width —
// full size on desktop, shrinking fluidly below, never overflowing.
// The markup is trusted static content extracted from the design handoff
// (exhibits.js) — purely decorative, so it's hidden from the a11y tree.
export default function FitExhibit({ exhibit, animateStrip = false, className = '' }) {
  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const [metrics, setMetrics] = useState(() => ({
    scale: exhibit.maxScale,
    height: exhibit.naturalHeight ? Math.ceil(exhibit.naturalHeight * exhibit.maxScale) : 0,
    offset: 0,
  }))

  useEffect(() => {
    const container = containerRef.current
    const inner = innerRef.current
    if (!container || !inner) return

    const measure = () => {
      const cw = container.clientWidth
      if (!cw) return
      // Diagrams have naturalHeight null — measure their laid-out height
      const naturalH = exhibit.naturalHeight ?? inner.scrollHeight
      const scale = Math.min(exhibit.maxScale, (cw - 12) / exhibit.naturalWidth)
      setMetrics({
        scale,
        height: Math.ceil(naturalH * scale),
        offset: Math.max(0, (cw - exhibit.naturalWidth * scale) / 2),
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    // Diagrams size themselves (naturalHeight null) — their content lays out
    // after fonts/first paint, so watch the inner element for growth too.
    ro.observe(inner)
    // Belt & braces: re-measure after layout/fonts settle and on window
    // resize — ResizeObserver doesn't deliver in hidden/background tabs.
    const timers = [setTimeout(measure, 100), setTimeout(measure, 600), setTimeout(measure, 2000)]
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', measure)
    }
  }, [exhibit])

  // Hero status strip: alternate RUNNING / WARNING states (~1.6s), like the
  // real controller. Skipped for users who prefer reduced motion.
  const [strip, setStrip] = useState('warning')
  useEffect(() => {
    if (!animateStrip) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setStrip((s) => (s === 'running' ? 'warning' : 'running'))
    }, 1600)
    return () => clearInterval(id)
  }, [animateStrip])

  return (
    <div
      ref={containerRef}
      className={`hmi-exhibit ${className}`.trim()}
      data-hmi-state={animateStrip ? strip : undefined}
      style={{ position: 'relative', width: '100%', height: metrics.height, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: metrics.offset,
          width: exhibit.naturalWidth,
          transform: `scale(${metrics.scale})`,
          transformOrigin: 'top left',
        }}
        dangerouslySetInnerHTML={{ __html: exhibit.html }}
      />
    </div>
  )
}
