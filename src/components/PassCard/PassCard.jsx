import { forwardRef } from 'react'
import './PassCard.css'

export const INTENT_LABELS = {
  designer: "I'M LOOKING FOR A DESIGNER",
  'see-work': "I WANT TO SEE THE WORK",
  'sent-here': "SOMEONE SENT ME HERE",
  exploring: "JUST EXPLORING",
}

export const PASS_CONFIG = {
  designer: {
    bg: '#798c6d',
    logo: new URL('../../assets/pass/logo-designer.png', import.meta.url).href,
    bgLayer: new URL('../../assets/pass/bg-layer.png', import.meta.url).href,
    lines: new URL('../../assets/pass/card-lines.svg', import.meta.url).href,
  },
  'see-work': {
    bg: '#64818c',
    logo: new URL('../../assets/pass/logo-see-work.png', import.meta.url).href,
    bgLayer: new URL('../../assets/pass/bg-layer.png', import.meta.url).href,
    lines: new URL('../../assets/pass/card-lines.svg', import.meta.url).href,
  },
  'sent-here': {
    bg: '#c87a5a',
    logo: new URL('../../assets/pass/logo-sent-here.png', import.meta.url).href,
    bgLayer: new URL('../../assets/pass/bg-layer-sent-here.png', import.meta.url).href,
    lines: new URL('../../assets/pass/card-lines-sent-here.svg', import.meta.url).href,
  },
  exploring: {
    bg: '#c4a24d',
    logo: new URL('../../assets/pass/logo-exploring.png', import.meta.url).href,
    bgLayer: new URL('../../assets/pass/bg-layer.png', import.meta.url).href,
    lines: new URL('../../assets/pass/card-lines.svg', import.meta.url).href,
  },
}

export function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric',
  }).toUpperCase()
}

const PassCard = forwardRef(function PassCard({ intent, name, date }, ref) {
  const config = PASS_CONFIG[intent] ?? PASS_CONFIG.designer
  const displayName = name && name.length > 13 ? name.slice(0, 13) + '…' : (name || '')
  const passDate = date || formatDate()

  return (
    <div className="pass-card" ref={ref}>
      <div className="pass-card__inner" style={{ background: config.bg }}>
        <img className="pass-card__bg pass-card__bg--1" src={config.bgLayer} alt="" aria-hidden="true" />
        <img className="pass-card__bg pass-card__bg--2" src={config.bgLayer} alt="" aria-hidden="true" />
        <img className="pass-card__lines" src={config.lines} alt="" aria-hidden="true" />

        <div className="pass-card__logo">
          {Object.entries(PASS_CONFIG).map(([key, cfg]) => (
            <img
              key={key}
              src={cfg.logo}
              alt=""
              aria-hidden="true"
              className={`pass-card__logo-img${key === intent ? ' pass-card__logo-img--active' : ''}`}
            />
          ))}
        </div>

        <div className="pass-card__studio">Manohar's Corner</div>
        <div className="pass-card__intent">{intent ? INTENT_LABELS[intent] : ''}</div>
        <span className="pass-card__date">{passDate}</span>
        <span className="pass-card__number">NO. 0047</span>
        <div className="pass-card__name-wrap">
          <span className="pass-card__name">{displayName}</span>
        </div>
      </div>
    </div>
  )
})

export default PassCard
