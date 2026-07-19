// Desktop magnetic pull: an element drifts a few pixels toward the cursor.
// Uses the separate `translate` property so it composes with `transform`
// (press states). Pair with `transition: translate 0.2s ease-out` in CSS.
export const magnetMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  const mx = (e.clientX - r.left) / r.width
  const my = (e.clientY - r.top) / r.height
  e.currentTarget.style.translate = `${(mx - 0.5) * 8}px ${(my - 0.5) * 6}px`
}

export const magnetLeave = (e) => {
  e.currentTarget.style.translate = '0px 0px'
}
