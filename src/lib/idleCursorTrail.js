// Idle cursor trail (desktop): once the pointer has been still for >=3s, the
// next 1.2s of movement drops small accent dots (at most one per 40ms) that
// fade and sink over 0.7s. Direct DOM only — no React state, no re-renders.
let installed = false

export function initIdleCursorTrail() {
  if (installed) return
  if (typeof window === 'undefined') return
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return
  installed = true

  let lastMove = performance.now()
  let activeUntil = 0
  let lastDrop = 0

  const dropDot = (x, y) => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#dbd8ce'
    const d = document.createElement('div')
    d.style.cssText =
      `position:fixed;left:${x - 3}px;top:${y - 3}px;width:6px;height:6px;` +
      `border-radius:50%;background:${accent};pointer-events:none;z-index:9998;` +
      `transition:transform 0.7s ease-out, opacity 0.7s ease-out;`
    document.body.appendChild(d)
    requestAnimationFrame(() => {
      d.style.transform = 'translateY(10px)'
      d.style.opacity = '0'
    })
    setTimeout(() => d.remove(), 750)
  }

  window.addEventListener('mousemove', (e) => {
    const now = performance.now()
    const idle = now - lastMove
    lastMove = now
    // Coming out of a >=3s pause opens a 1.2s window where movement leaves a trail.
    if (idle >= 3000) activeUntil = now + 1200
    if (now < activeUntil && now - lastDrop >= 40) {
      lastDrop = now
      dropDot(e.clientX, e.clientY)
    }
  }, { passive: true })
}
