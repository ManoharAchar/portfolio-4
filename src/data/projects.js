import thumbCooperant from '../assets/thumbnails/1 - Cooperant learning Thumbnail.mp4'
import thumbSeniorMode from '../assets/thumbnails/2 - Senior Mode Thumbnail.mp4'
import thumbBlackbaza from '../assets/thumbnails/3 - Blackbaza Thumbnail.mp4'
import thumbMochitta from '../assets/thumbnails/4 - Mochitta Thumbnail.mp4'
import thumbIndustrialHmi from '../assets/thumbnails/5 - Industrial HMI Thumbnail.mp4'
import thumbFleet from '../assets/thumbnails/0 - Fleet SaaS Thumbnail.mp4'
// Poster frames (extracted at each video's thumbTime), shown when the
// browser refuses to decode video, e.g. iOS Low Power Mode.
import posterCooperant from '../assets/thumbnails/poster-cooperant.jpg'
import posterSeniorMode from '../assets/thumbnails/poster-senior-mode.jpg'
import posterBlackbaza from '../assets/thumbnails/poster-black-baza.jpg'
import posterMochitta from '../assets/thumbnails/poster-mochitta.jpg'
import posterIndustrialHmi from '../assets/thumbnails/poster-industrial-hmi.jpg'
import posterFleet from '../assets/thumbnails/poster-fleet.jpg'

// Home cards (Figma "Home / Desktop"): media, title, an uppercase `metadata`
// line (role · context · years), a short `description`, and a combined
// `domain · maturity` chip pinned to the bottom. `compact` is the shorter line
// used on related / View Next cards. `number` drives mobile sort order. Order
// reflects hiring priority (enterprise scale first, self-initiated last).
export const PROJECTS = [
  {
    id: 'fleet',
    tags: ['saas', 'web'],
    number: '01',
    domain: 'Enterprise SaaS',
    maturity: 'Shipped',
    imageColor: '#64818c',
    video: thumbFleet,
    poster: posterFleet,
    thumbTime: 0,
    loopAlways: true,
    title: 'Fleet Coordination Platform',
    metadata: 'PRODUCT DESIGNER · CROSS-FUNCTIONAL · 2023-2024',
    description:
      'A fleet coordination platform that made compressor status, alarms, and automated actions scannable in under a minute across about 40 facilities.',
    compact:
      'Enterprise fleet coordination for industrial facilities, making machine status and automation decisions scannable in under a minute.',
    column: 'left',
  },
  {
    id: 'cooperant',
    tags: ['web', 'zero'],
    number: '02',
    domain: 'Learning Platform',
    maturity: 'Shipped',
    imageColor: '#b0b082',
    video: thumbCooperant,
    poster: posterCooperant,
    thumbTime: 1.21,
    loopAlways: true,
    title: 'Cooperant Learning',
    metadata: 'PRODUCT DESIGNER · 0-TO-1 · SMALL TEAM · 2025–2026',
    description:
      'A 0-to-1 CEU learning platform unifying discovery, payment, quizzes, certificates, and progress tracking, scoring 84.9 SUS and +65 NPS.',
    compact:
      'A shipped 0-to-1 CEU platform unifying podcast discovery, purchase, quizzes, certificates, and learner progress.',
    column: 'right',
  },
  {
    id: 'industrial-hmi',
    tags: ['hmi'],
    number: '03',
    domain: 'Industrial HMI',
    maturity: 'In Production',
    imageColor: '#82909f',
    video: thumbIndustrialHmi,
    poster: posterIndustrialHmi,
    thumbTime: 0,
    loopAlways: true,
    title: 'Industrial HMI, Machine Controller',
    metadata: 'PRODUCT DESIGNER, HMI · CROSS-FUNCTIONAL TEAM · 2019-2024',
    description:
      'A state-first machine controller UI used across 4 brands, 3 display sizes, and 18 machine configurations.',
    compact:
      'A state-first machine controller UI system used across 4 brands, 3 display sizes, and 18 machine configurations.',
    column: 'left',
  },
  {
    id: 'mochitta',
    tags: ['mobile', 'fintech', 'zero'],
    number: '04',
    domain: 'Consumer Fintech',
    maturity: 'Tested',
    imageColor: '#8882b0',
    video: thumbMochitta,
    poster: posterMochitta,
    thumbTime: 1.25,
    loopAlways: true,
    title: 'Mochitta',
    metadata: 'PRODUCT DESIGNER · CAPSTONE TEAM · 2025–2026',
    description:
      'A reflective fintech concept connecting emotions, spending, and goals, raising SUS from 62.9 to 72.9 across two usability rounds.',
    compact:
      'A tested consumer fintech concept connecting emotions, purchases, and goals across two usability rounds.',
    column: 'right',
  },
  {
    id: 'black-baza',
    tags: ['web', 'zero'],
    number: '05',
    domain: 'Commerce + Traceability',
    maturity: 'In Production',
    imageColor: '#829eb0',
    video: thumbBlackbaza,
    poster: posterBlackbaza,
    thumbTime: 2.19,
    loopAlways: true,
    title: 'Black Baza Coffee',
    metadata: 'PRODUCT DESIGNER · 0-TO-1 · CLIENT PRODUCT · 2025',
    description:
      'A commerce and traceability platform connecting purchases to farmer origins, validated with 16 participants across three stakeholder groups.',
    compact:
      'A commerce and traceability platform for buyers and retailers, validated with farmer partners and 16 participants.',
    column: 'left',
  },
  {
    id: 'senior-mode',
    tags: ['mobile', 'access'],
    number: '06',
    domain: 'Accessibility',
    maturity: 'Tested',
    imageColor: '#8eb082',
    video: thumbSeniorMode,
    poster: posterSeniorMode,
    thumbTime: 1.16,
    loopAlways: true,
    title: 'Senior Mode',
    metadata: 'PRODUCT DESIGNER, END TO END · SOLO · 2026',
    description:
      'An accessibility concept making silent mode legible for seniors and recoverable for caregivers, improving recognition from 70% to 100%.',
    compact:
      'An accessibility concept that makes silent mode legible for seniors and recoverable for caregivers.',
    column: 'right',
  },
]

// Picks the next 2 projects after currentId, wrapping around, never the current one.
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
