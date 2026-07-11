import thumbCooperant from '../assets/thumbnails/1 - Cooperant learning Thumbnail.mp4'
import thumbSeniorMode from '../assets/thumbnails/2 - Senior Mode Thumbnail.mp4'
import thumbBlackbaza from '../assets/thumbnails/3 - Blackbaza Thumbnail.mp4'
import thumbMochitta from '../assets/thumbnails/4 - Mochitta Thumbnail.mp4'
import thumbIndustrialHmi from '../assets/thumbnails/5 - Industrial HMI Thumbnail.mp4'
import thumbFleet from '../assets/thumbnails/0 - Fleet SaaS Thumbnail.mp4'
// Poster frames (extracted at each video's thumbTime) — shown when the
// browser refuses to decode video, e.g. iOS Low Power Mode.
import posterCooperant from '../assets/thumbnails/poster-cooperant.jpg'
import posterSeniorMode from '../assets/thumbnails/poster-senior-mode.jpg'
import posterBlackbaza from '../assets/thumbnails/poster-black-baza.jpg'
import posterMochitta from '../assets/thumbnails/poster-mochitta.jpg'
import posterIndustrialHmi from '../assets/thumbnails/poster-industrial-hmi.jpg'
import posterFleet from '../assets/thumbnails/poster-fleet.jpg'

export const PROJECTS = [
  {
    id: 'fleet',
    number: '01',
    tags: ['PROFESSIONAL WORK', 'SHIPPED'],
    imageColor: '#64818c',
    video: thumbFleet,
    poster: posterFleet,
    thumbTime: 0,
    loopAlways: true,
    title: 'Fleet Coordination Platform',
    description:
      "An enterprise SaaS platform that runs a plant's worth of air compressors as one coordinated system — plant status readable in under a minute, adopted across ~40 facilities.",
    role: 'Product Design, SaaS',
    team: 'with Platform & Controls Engineering',
    timeframe: '2023 – 2024',
    column: 'left',
  },
  {
    id: 'industrial-hmi',
    number: '02',
    tags: ['PROFESSIONAL WORK', 'IN PRODUCTION'],
    imageColor: '#82909f',
    video: thumbIndustrialHmi,
    poster: posterIndustrialHmi,
    thumbTime: 0,
    loopAlways: true,
    title: 'Industrial HMI — Machine Controller',
    description:
      'Redefining what an industrial air-compressor controller shows first — a state-first interface adopted across 4 brands, 3 display sizes, and 18 machine configurations.',
    role: 'HMI / Interaction Design',
    team: 'with Controls & Platform Engineering',
    timeframe: 'In production · 4+ yrs',
    column: 'right',
  },
  {
    id: 'cooperant',
    number: '03',
    tags: ['CLIENT WORK', 'SHIPPED'],
    imageColor: '#b0b082',
    video: thumbCooperant,
    poster: posterCooperant,
    thumbTime: 1.21,
    loopAlways: true,
    title: 'Cooperant Learning',
    description:
      'A 0-to-1 continuing-education platform turning podcast listeners into CEU earners for behavior analysts. Scored 84.9 SUS and +65 NPS with 20 BCBAs.',
    role: 'Product Design, Implementation',
    team: 'with Sparks Founders',
    timeframe: 'Sep 2025 – Jan 2026',
    column: 'left',
  },
  {
    id: 'mochitta',
    number: '04',
    tags: ['CAPSTONE', 'TESTED'],
    imageColor: '#8882b0',
    video: thumbMochitta,
    poster: posterMochitta,
    thumbTime: 1.25,
    loopAlways: true,
    title: 'Mochitta',
    description:
      'A reflective fintech concept using emotion tagging and pre-purchase check-ins to slow impulse spending. Refined across two rounds of usability testing.',
    role: 'Product Design & Strategy',
    team: 'with UI Designer & Dev',
    timeframe: '2025–2026',
    column: 'right',
  },
  {
    id: 'black-baza',
    number: '05',
    tags: ['CLIENT WORK', 'IN PRODUCTION'],
    imageColor: '#829eb0',
    video: thumbBlackbaza,
    poster: posterBlackbaza,
    thumbTime: 2.19,
    loopAlways: true,
    title: 'Black Baza Coffee',
    description:
      'A two-sided mobile platform linking buyers and retailers to farmers through traceability and sustainability. Buyer SUS 71.6, validated with 16 users across 3 groups.',
    role: 'UX, UI, Research',
    team: 'with Black Baza Founders & Devs',
    timeframe: '8 weeks, 2025',
    column: 'left',
  },
  {
    id: 'senior-mode',
    number: '06',
    tags: ['CONCEPT', 'TESTED'],
    imageColor: '#8eb082',
    video: thumbSeniorMode,
    poster: posterSeniorMode,
    thumbTime: 1.16,
    loopAlways: true,
    title: 'Senior Mode',
    description:
      'A state-communication layer making silent mode legible for seniors and recoverable for caregivers. Sound-state recognition went 70% → 100% after V2.',
    role: 'End-to-End Design',
    team: 'Solo',
    timeframe: '6 weeks, 2026',
    column: 'right',
  },
]

// Picks the next 2 projects after currentId, wrapping around — never the current one.
export function getViewNext(currentId) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId)
  if (idx === -1) return PROJECTS.slice(0, 2)
  return [PROJECTS[(idx + 1) % PROJECTS.length], PROJECTS[(idx + 2) % PROJECTS.length]]
}

// Project id -> page id used by App.jsx's router (differs for black-baza).
const PROJECT_PAGES = {
  fleet: 'fleet',
  'industrial-hmi': 'industrial-hmi',
  cooperant: 'cooperant',
  mochitta: 'mochitta',
  'black-baza': 'black-bazaar',
  'senior-mode': 'senior-mode',
}

export function getProjectPage(id) {
  return PROJECT_PAGES[id]
}
