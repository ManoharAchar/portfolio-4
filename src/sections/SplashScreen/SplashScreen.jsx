import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import logoMark from '../../assets/icons/logo-mark.svg'
import './SplashScreen.css'

// Progressive dematerialize: a single canvas renders an ambient starfield, a
// crisp logo mark that breathes, then — on exit — erodes the mark left-to-right
// into square particles that drift, then fly into the field. Self-contained,
// so the shared starfield is hidden during the splash for continuity.
const FRAME_W = 178
const FRAME_H = 135
const INNER_W = 77
const INNER_H = 162
const ROT = (-113.5 * Math.PI) / 180
const S = 4
const HOLD_FADE_MS = 700
const ERODE_MS = 2400
const DRIFT = 16
const DENSITY = 1

const SplashScreen = forwardRef(function SplashScreen(_props, ref) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ running: true, exitStart: null, particles: [], resolveExit: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const st = stateRef.current
    st.running = true
    st.exitStart = null

    let W = 0, H = 0, DPR = 1
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    // Re-measure after layout settles and whenever the canvas box changes, so
    // a 0-width read at mount can never leave the canvas blank.
    requestAnimationFrame(resize)
    window.addEventListener('resize', resize)
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    // Accent (for ~10% of particles) from the saved pass.
    let accent = '121, 140, 109'
    try {
      const g = JSON.parse(localStorage.getItem('pf3_guest') || 'null')
      if (g && g.accent) {
        const h = g.accent.replace('#', '')
        accent = `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`
      }
    } catch { /* ignore */ }

    // Ambient starfield (StarfieldCursorFollow behavior).
    const mkStar = () => {
      const t = Math.random()
      return {
        x: Math.random() * W - W / 2, y: Math.random() * H - H / 2, z: Math.random() * W,
        speedMult: 0.4 + t * 2.2, maxRadius: 0.8 + t * 4.0, baseOpacity: 0.25 + t * 0.75,
      }
    }
    let stars = Array.from({ length: 500 }, mkStar)
    const mouse = { x: 0, y: 0 }
    const targetM = { x: 0, y: 0 }
    const onMouse = (e) => { targetM.x = e.clientX / W - 0.5; targetM.y = e.clientY / H - 0.5 }
    window.addEventListener('mousemove', onMouse, { passive: true })

    let logoCanvas = null
    let lctx = null
    let LDPR = DPR
    const frameGeom = () => ({ cx: W / 2 - FRAME_W / 2, cy: H / 2 - FRAME_H / 2 - 16, fw: FRAME_W, fh: FRAME_H })
    const noise = (x, y) =>
      0.5 + 0.32 * Math.sin(x * 0.052 + 1.7) * Math.sin(y * 0.047 + 0.4)
          + 0.18 * Math.sin(x * 0.13 + 2.1) * Math.sin(y * 0.11 + 5.2)

    const img = new Image()
    img.onload = () => {
      const w = FRAME_W * S, h = FRAME_H * S
      const off = document.createElement('canvas')
      off.width = w; off.height = h
      const octx = off.getContext('2d')
      octx.translate(w / 2, h / 2)
      octx.rotate(ROT)
      octx.drawImage(img, -(INNER_W * S) / 2, -(INNER_H * S) / 2, INNER_W * S, INNER_H * S)
      const data = octx.getImageData(0, 0, w, h).data

      LDPR = DPR
      logoCanvas = document.createElement('canvas')
      logoCanvas.width = FRAME_W * LDPR
      logoCanvas.height = FRAME_H * LDPR
      lctx = logoCanvas.getContext('2d')
      const drawSolidLogo = () => {
        lctx.save()
        lctx.setTransform(LDPR, 0, 0, LDPR, 0, 0)
        lctx.clearRect(0, 0, FRAME_W, FRAME_H)
        lctx.translate(FRAME_W / 2, FRAME_H / 2)
        lctx.rotate(ROT)
        lctx.drawImage(img, -INNER_W / 2, -INNER_H / 2, INNER_W, INNER_H)
        lctx.restore()
      }
      drawSolidLogo()

      let opaqueTotal = 0
      for (let i = 3; i < data.length; i += 4) if (data[i] > 64) opaqueTotal++
      const targetCount = Math.round(2600 * DENSITY)
      const g = Math.max(3, Math.round(Math.sqrt(opaqueTotal / targetCount)))
      const cx = W / 2 - FRAME_W / 2, cy = H / 2 - FRAME_H / 2 - 16
      const pts = []
      for (let gy = 0; gy < h; gy += g) {
        for (let gx = 0; gx < w; gx += g) {
          let fx = -1, fy = -1
          for (let sy = gy; sy < Math.min(gy + g, h) && fx < 0; sy += 2) {
            for (let sx = gx; sx < Math.min(gx + g, w); sx += 2) {
              if (data[(sy * w + sx) * 4 + 3] > 64) { fx = sx; fy = sy; break }
            }
          }
          if (fx < 0) continue
          const lx = fx / S, ly = fy / S
          const n = noise(lx, ly)
          const t0 = Math.min(0.98, Math.max(0.02, 0.62 * n + 0.24 * (lx / FRAME_W) + 0.14 * Math.random()))
          const driftAngle = noise(lx * 1.7 + 40, ly * 1.7 + 9) * Math.PI * 4
          pts.push({
            hx: cx + lx, hy: cy + ly, lx, ly, t0, cell: g / S,
            size: 1.1 + Math.random() * 1.3,
            driftX: Math.cos(driftAngle), driftY: Math.sin(driftAngle) - 0.55,
            isAccent: Math.random() < 0.1,
            ox: 0, oy: 0, detachAt: -1, dirX: 0, dirY: 0, gone: false,
          })
        }
      }
      st.particles = pts
      st.lctx = lctx
      st.logoCanvas = logoCanvas
      st.LDPR = LDPR
    }
    img.src = logoMark

    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const start = performance.now()
    let lastT = start

    const loop = (now) => {
      if (!st.running) return
      const dt = Math.min(0.05, (now - lastT) / 1000)
      lastT = now
      const t = now - start
      ctx.clearRect(0, 0, W, H)

      // starfield
      mouse.x += (targetM.x - mouse.x) * 0.04
      mouse.y += (targetM.y - mouse.y) * 0.04
      const ox = W / 2 + mouse.x * W * 0.25
      const oy = H / 2 + mouse.y * H * 0.25
      for (const s of stars) {
        s.z -= 0.8 * s.speedMult
        if (s.z <= 0) Object.assign(s, mkStar(), { z: W })
        const sx = (s.x / s.z) * W + ox
        const sy = (s.y / s.z) * W + oy
        if (sx < 0 || sx > W || sy < 0 || sy > H) continue
        const depth = 1 - s.z / W
        ctx.beginPath()
        ctx.arc(sx, sy, Math.max(0.4, depth * s.maxRadius), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(250, 248, 241, ${depth * s.baseOpacity * 0.55})`
        ctx.fill()
      }

      // erode progress — 0 until exit is triggered
      const exitStart = st.exitStart
      const erode = exitStart == null ? 0 : Math.min(1, Math.max(0, (now - exitStart) / ERODE_MS))

      // solid mark (fade in, breathe, fade the residue out at erosion end)
      if (st.logoCanvas) {
        const geo = frameGeom()
        const breathe = Math.sin(t * 0.0018) * 0.5
        const fadeOut = exitStart == null ? 1 : (1 - Math.min(1, Math.max(0, (now - exitStart - ERODE_MS) / 350)))
        ctx.globalAlpha = easeOut(Math.min(1, t / HOLD_FADE_MS)) * fadeOut
        if (ctx.globalAlpha > 0.005) ctx.drawImage(st.logoCanvas, geo.cx, geo.cy + breathe, geo.fw, geo.fh)
        ctx.globalAlpha = 1
      }

      // detaching chunks -> particles
      let alive = 0
      for (const p of st.particles) {
        if (p.gone) continue
        alive++
        if (erode >= p.t0 && p.detachAt < 0) {
          p.detachAt = now
          const dx = p.hx - W / 2, dy = p.hy - (H / 2 - 16)
          const len = Math.hypot(dx, dy) || 1
          p.dirX = dx / len; p.dirY = dy / len
          const l = st.lctx, r = p.cell * 1.15
          l.save()
          l.setTransform(st.LDPR, 0, 0, st.LDPR, 0, 0)
          l.globalCompositeOperation = 'destination-out'
          const gg = l.createRadialGradient(p.lx, p.ly, 0, p.lx, p.ly, r)
          gg.addColorStop(0, 'rgba(0,0,0,1)')
          gg.addColorStop(0.65, 'rgba(0,0,0,1)')
          gg.addColorStop(1, 'rgba(0,0,0,0)')
          l.fillStyle = gg
          l.beginPath()
          l.arc(p.lx, p.ly, r, 0, Math.PI * 2)
          l.fill()
          l.restore()
        }
        if (p.detachAt < 0) continue
        let x, y, alpha = 1, size = p.size
        const age = (now - p.detachAt) / 1000
        if (age < 0.45) {
          p.ox += p.driftX * DRIFT * dt * (1 + age * 2)
          p.oy += p.driftY * DRIFT * dt * (1 + age * 2)
          x = p.hx + p.ox; y = p.hy + p.oy
        } else {
          const fa = age - 0.45
          const v = 60 * Math.exp(fa * 3.4)
          p.ox += (p.dirX * 0.75 + p.driftX * 0.25) * v * dt
          p.oy += (p.dirY * 0.75 + p.driftY * 0.25) * v * dt
          x = p.hx + p.ox; y = p.hy + p.oy
          size = p.size * (1 + fa * 2.2)
          alpha = fa < 0.5 ? 1 : Math.max(0, 1 - (fa - 0.5) / 0.45)
          if (alpha <= 0 || x < -20 || x > W + 20 || y < -20 || y > H + 20) { p.gone = true; continue }
        }
        const col = p.isAccent ? accent : '250, 248, 241'
        ctx.fillStyle = `rgba(${col}, ${alpha})`
        ctx.fillRect(x - size / 2, y - size / 2, size, size)
      }

      // finished eroding + flying — resolve the exit
      if (exitStart != null && st.resolveExit && st.particles.length > 0 && alive === 0) {
        const done = st.resolveExit
        st.resolveExit = null
        done()
      }

      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      st.running = false
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      ro.disconnect()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    // Trigger the erosion and wait for the flight to finish BEFORE letting the
    // caller switch pages — switching earlier would unmount this canvas and cut
    // the dematerialize short. onBurstFired fires once the mark has dispersed.
    async playExit({ onBurstFired } = {}) {
      const st = stateRef.current
      st.exitStart = performance.now()
      await new Promise((resolve) => {
        st.resolveExit = resolve
        // Safety net if the RAF loop can't confirm completion (e.g. hidden tab).
        setTimeout(resolve, ERODE_MS + 1800)
      })
      onBurstFired?.()
    },
  }))

  return (
    <div className="splash-screen">
      <canvas className="splash-screen__canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  )
})

export default SplashScreen
