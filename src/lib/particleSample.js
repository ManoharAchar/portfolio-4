// Samples the logo mark's rendered silhouette into a cloud of normalized
// points, used to seed the splash screen's dematerialize burst so the dots
// briefly read as the logo shape before flying into the starfield.

const LOGO_SRC = new URL('../assets/icons/logo-mark.svg', import.meta.url).href

// Matches Sidebar.css's .sidebar__logo-frame / .sidebar__logo-rotator /
// .sidebar__logo-inner — the frame the mark is visually rotated within.
const FRAME_W = 106
const FRAME_H = 80
const INNER_W = 46
const INNER_H = 96
const ROTATE_DEG = -113.5
const SAMPLE_SCALE = 4
const ALPHA_THRESHOLD = 64

let cachedOpaquePixels = null

function loadOpaquePixels() {
  if (cachedOpaquePixels) return cachedOpaquePixels

  cachedOpaquePixels = new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const w = FRAME_W * SAMPLE_SCALE
      const h = FRAME_H * SAMPLE_SCALE
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')

      // Render the mark exactly as it appears on screen — rotated within
      // its frame — so the sampled silhouette matches what visitors see.
      ctx.translate(w / 2, h / 2)
      ctx.rotate((ROTATE_DEG * Math.PI) / 180)
      ctx.drawImage(
        img,
        -(INNER_W * SAMPLE_SCALE) / 2,
        -(INNER_H * SAMPLE_SCALE) / 2,
        INNER_W * SAMPLE_SCALE,
        INNER_H * SAMPLE_SCALE
      )

      const { data } = ctx.getImageData(0, 0, w, h)
      const opaque = []
      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const alpha = data[(py * w + px) * 4 + 3]
          if (alpha > ALPHA_THRESHOLD) opaque.push({ x: px / w, y: py / h })
        }
      }
      resolve(opaque)
    }
    img.onerror = reject
    img.src = LOGO_SRC
  })

  return cachedOpaquePixels
}

/**
 * Returns `count` randomly sampled points (normalized 0..1 within the logo's
 * on-screen frame) drawn from the mark's actual opaque silhouette.
 */
export async function sampleLogoPoints(count = 80) {
  const opaque = await loadOpaquePixels()
  if (opaque.length === 0) return []
  return Array.from({ length: count }, () => opaque[Math.floor(Math.random() * opaque.length)])
}
