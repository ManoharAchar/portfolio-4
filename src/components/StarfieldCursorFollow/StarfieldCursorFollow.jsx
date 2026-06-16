import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

function createStar(width, height) {
  // size tier drives both visual size and speed — bigger stars move faster
  const sizeTier = Math.random()
  return {
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * width,
    pz: 0,
    sizeTier,
    speedMult: 0.4 + sizeTier * 2.2,   // 0.4× (tiny/slow) → 2.6× (large/fast)
    maxRadius: 0.8 + sizeTier * 4.0,    // 0.8px → 4.8px
    baseOpacity: 0.25 + sizeTier * 0.75,
    twinkleOffset: Math.random() * Math.PI * 2,
  }
}

const StarfieldCursorFollow = forwardRef(function StarfieldCursorFollow({
  backgroundColor = '#000000',
  starColor = '255, 255, 255',
  numStars = 200,
  speed = 0.4,
  style = {},
}, ref) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const starsRef = useRef([])
  const animFrameRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      starsRef.current = Array.from({ length: numStars }, () =>
        createStar(canvas.width, canvas.height)
      )
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      }
    }

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: 0, y: 0 }
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      frameRef.current++
      const { width, height } = canvas
      const cx = width / 2
      const cy = height / 2

      // Smooth lerp toward cursor
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

      // Vanishing point moves toward cursor
      const ox = cx + mouseRef.current.x * width * 0.25
      const oy = cy + mouseRef.current.y * height * 0.25

      // Full clear each frame — no trails
      ctx.clearRect(0, 0, width, height)

      for (const star of starsRef.current) {
        star.z -= speed * star.speedMult

        if (star.z <= 0) {
          star.x = Math.random() * width - cx
          star.y = Math.random() * height - cy
          star.z = width
            const t = Math.random()
          star.sizeTier = t
          star.speedMult = 0.4 + t * 2.2
          star.maxRadius = 0.8 + t * 4.0
          star.baseOpacity = 0.25 + t * 0.75
          star.twinkleOffset = Math.random() * Math.PI * 2
        }

        const sx = (star.x / star.z) * width + ox
        const sy = (star.y / star.z) * width + oy

        if (sx < 0 || sx > width || sy < 0 || sy > height) continue

        // Depth: closer = bigger & brighter
        const depth = 1 - star.z / width
        const radius = Math.max(0.4, depth * star.maxRadius)

        const opacity = depth * star.baseOpacity

        ctx.beginPath()
        ctx.arc(sx, sy, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${starColor}, ${opacity})`
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [numStars, speed, backgroundColor, starColor])

  // Spawns extra stars at given viewport-normalized points (0..1). Positions
  // are solved backwards through the same perspective projection used in the
  // render loop (sx = (star.x/star.z)*width + ox) so each star actually
  // renders at its intended screen point on the very first frame, then
  // disperses outward as z ticks down — settling into the ambient field once
  // it cycles past z <= 0.
  useImperativeHandle(ref, () => ({
    spawnBurst(points) {
      const canvas = canvasRef.current
      if (!canvas || !canvas.width || !canvas.height) return
      const { width, height } = canvas
      const ox = width / 2 + mouseRef.current.x * width * 0.25
      const oy = height / 2 + mouseRef.current.y * height * 0.25

      const burst = points.map(({ x, y }) => {
        // Biased toward the bright end so the burst reads at the same
        // brightness/density as the static logo silhouette it's replacing.
        const sizeTier = 0.75 + Math.random() * 0.25
        const z = width * (0.18 + Math.random() * 0.12)
        const px = x * width
        const py = y * height
        return {
          x: ((px - ox) * z) / width,
          y: ((py - oy) * z) / width,
          z,
          pz: 0,
          sizeTier,
          // Several times the ambient rate, so the burst visibly launches
          // toward the viewer rather than drifting — it falls back to the
          // normal ambient speed once it recycles past z <= 0.
          speedMult: (0.4 + sizeTier * 2.2) * 3.5,
          maxRadius: 0.8 + sizeTier * 4.0,
          baseOpacity: 0.25 + sizeTier * 0.75,
          twinkleOffset: Math.random() * Math.PI * 2,
        }
      })

      starsRef.current = [...starsRef.current, ...burst]
    },
  }))

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: backgroundColor,
        ...style,
      }}
    />
  )
})

export default StarfieldCursorFollow
