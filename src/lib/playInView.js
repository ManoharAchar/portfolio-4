// Shared viewport observer: play each video only while it's on screen.
// The autoplay attribute alone doesn't reliably start videos that mount at
// opacity:0 under scroll-reveal observers, and autoplaying every video on a
// page keeps offscreen ones downloading and decoding simultaneously.
const videoInViewObserver = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {})
        else target.pause()
      })
    }, { threshold: 0.15 })
  : null

// Callback ref (React 19 cleanup form): <video ref={playInView} … />
export const playInView = (el) => {
  if (!el) return
  if (!videoInViewObserver) {
    el.play().catch(() => {})
    return
  }
  videoInViewObserver.observe(el)
  return () => videoInViewObserver.unobserve(el)
}
