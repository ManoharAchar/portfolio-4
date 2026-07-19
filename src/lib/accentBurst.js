// A throwaway full-screen canvas celebration fired when the pass color
// changes. Origin = the sidebar pass thumb (fallback: screen center). Draws a
// wavefront ring, a trailing cream ring, a core glow, and a spray of square
// particles (matching the splash's square language), then removes itself.
export function accentBurst(hex) {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const el = document.querySelector('.sidebar__pass-thumb')
  const r = el
    ? el.getBoundingClientRect()
    : { left: window.innerWidth / 2 - 100, top: window.innerHeight / 2 - 47, width: 200, height: 94 }
  const x0 = r.left + r.width / 2
  const y0 = r.top + r.height / 2

  const DPR = Math.min(window.devicePixelRatio || 1, 2)
  const W = window.innerWidth
  const H = window.innerHeight
  const cv = document.createElement('canvas')
  cv.width = W * DPR
  cv.height = H * DPR
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:96;'
  document.body.appendChild(cv)
  const c = cv.getContext('2d')
  c.setTransform(DPR, 0, 0, DPR, 0, 0)

  const hh = (hex || '#798c6d').replace('#', '')
  const col = `${parseInt(hh.slice(0, 2), 16)}, ${parseInt(hh.slice(2, 4), 16)}, ${parseInt(hh.slice(4, 6), 16)}`

  const COUNT = window.innerWidth <= 767 ? 130 : 170
  const parts = Array.from({ length: COUNT }, () => {
    const a = Math.random() * Math.PI * 2
    const sp = 260 + Math.random() * 700
    return {
      x: x0, y: y0,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 40, // slight upward bias
      s: 1 + Math.random() * 2.2,
      cream: Math.random() < 0.3,
      ph: Math.random() * Math.PI * 2,
    }
  })

  const maxR = Math.hypot(Math.max(x0, W - x0), Math.max(y0, H - y0))
  const t0 = performance.now()
  let lastT = t0

  const tick = (now) => {
    const t = (now - t0) / 1000
    const dt = Math.min(0.05, (now - lastT) / 1000)
    lastT = now
    c.clearRect(0, 0, W, H)
    if (t > 1.4) { cv.remove(); return }

    // Wavefront ring
    const rr = maxR * (1 - Math.pow(1 - Math.min(1, t / 0.9), 3))
    c.beginPath()
    c.arc(x0, y0, rr, 0, Math.PI * 2)
    c.strokeStyle = `rgba(${col}, ${0.5 * Math.max(0, 1 - t / 0.9)})`
    c.lineWidth = 1.5
    c.stroke()

    // Trailing cream ring (delayed 0.12s)
    if (t > 0.12) {
      const rr2 = maxR * (1 - Math.pow(1 - Math.min(1, (t - 0.12) / 0.9), 3))
      c.beginPath()
      c.arc(x0, y0, rr2, 0, Math.PI * 2)
      c.strokeStyle = `rgba(250, 248, 241, ${0.3 * Math.max(0, 1 - (t - 0.12) / 0.9)})`
      c.lineWidth = 1
      c.stroke()
    }

    // Core glow (first 0.35s)
    if (t < 0.35) {
      const g = c.createRadialGradient(x0, y0, 0, x0, y0, 120)
      g.addColorStop(0, `rgba(${col}, ${0.5 * (1 - t / 0.35)})`)
      g.addColorStop(1, `rgba(${col}, 0)`)
      c.fillStyle = g
      c.beginPath()
      c.arc(x0, y0, 120, 0, Math.PI * 2)
      c.fill()
    }

    // Square particles
    for (const p of parts) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vx *= (1 - 2.6 * dt)
      p.vy *= (1 - 2.6 * dt)
      const tw = 0.75 + 0.25 * Math.sin(now * 0.02 + p.ph)
      const al = (t < 0.55 ? 1 : Math.max(0, 1 - (t - 0.55) / 0.6)) * tw
      c.fillStyle = `rgba(${p.cream ? '250, 248, 241' : col}, ${al})`
      c.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s)
    }

    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
