import thumbCooperant from '../assets/thumbnails/1 - Cooperant learning Thumbnail.mp4'
import thumbSeniorMode from '../assets/thumbnails/2 - Senior Mode Thumbnail.mp4'
import thumbBlackbaza from '../assets/thumbnails/3 - Blackbaza Thumbnail.mp4'
import thumbMochitta from '../assets/thumbnails/4 - Mochitta Thumbnail.mp4'

export const PROJECTS = [
  {
    id: 'cooperant',
    number: '01',
    tags: ['CLIENT WORK', 'SHIPPED'],
    imageColor: '#b0b082',
    video: thumbCooperant,
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
    number: '02',
    tags: ['CAPSTONE', 'TESTED'],
    imageColor: '#8882b0',
    video: thumbMochitta,
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
    number: '03',
    tags: ['CLIENT WORK', 'IN PRODUCTION'],
    imageColor: '#829eb0',
    video: thumbBlackbaza,
    thumbTime: 2.19,
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
    number: '04',
    tags: ['CONCEPT', 'TESTED'],
    imageColor: '#8eb082',
    video: thumbSeniorMode,
    thumbTime: 1.16,
    title: 'Senior Mode',
    description:
      'A state-communication layer making silent mode legible for seniors and recoverable for caregivers. Sound-state recognition went 70% → 100% after V2.',
    role: 'End-to-End Design',
    team: 'Solo',
    timeframe: '6 weeks, 2026',
    column: 'right',
  },
]
