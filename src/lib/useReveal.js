import { useEffect, useRef } from 'react'

export function useReveal(markerClass = 'cs-sections--reveal') {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    container.classList.add(markerClass)
    const items = Array.from(container.children)

    // Hero (first section) is immediately visible — reveal it instantly
    // so autoplay fires while the element is opaque, not while it's hidden.
    if (items.length > 0) items[0].classList.add('is-revealed')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )

    items.slice(1).forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return ref
}
