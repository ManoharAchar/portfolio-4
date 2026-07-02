// Shared viewport observer: play each video only while it's on screen.
// The autoplay attribute alone doesn't reliably start videos that mount at
// opacity:0 under scroll-reveal observers, and autoplaying every video on a
// page keeps offscreen ones downloading and decoding simultaneously.

// Videos whose play() was rejected (iOS Low Power Mode blocks playback that
// doesn't originate from a user gesture). Retried on the next tap/click —
// user-paused videos never enter this set, so controls stay respected.
const blocked = new Set()

export const tryPlay = (el) => {
  el.play().then(() => blocked.delete(el)).catch(() => blocked.add(el))
}

// Pause without leaving the element eligible for gesture retries.
export const cancelPlay = (el) => {
  blocked.delete(el)
  el.pause()
}

if (typeof document !== 'undefined') {
  const retryBlocked = () => {
    blocked.forEach((el) => tryPlay(el))
  }
  document.addEventListener('pointerup', retryBlocked, { passive: true })
  document.addEventListener('touchend', retryBlocked, { passive: true })
}

const videoInViewObserver = typeof IntersectionObserver !== 'undefined'
  ? new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) tryPlay(target)
        else cancelPlay(target)
      })
    }, { threshold: 0.15 })
  : null

// Callback ref (React 19 cleanup form): <video ref={playInView} … />
export const playInView = (el) => {
  if (!el) return
  if (!videoInViewObserver) {
    tryPlay(el)
    return
  }
  videoInViewObserver.observe(el)
  return () => {
    videoInViewObserver.unobserve(el)
    blocked.delete(el)
  }
}
