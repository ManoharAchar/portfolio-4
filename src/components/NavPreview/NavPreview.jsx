import { PASS_ACCENTS } from '../../lib/passEditor'
import './NavPreview.css'

const WORK_COLORS = ['#64818c', '#b0b082', '#82909f', '#8882b0']
const CAVE_COLORS = ['#64818c', '#c4a24d', '#b0b082', '#8882b0']
const PASS_HEXES = PASS_ACCENTS.map((a) => a.hex)

// A tiny CSS-only mock of each destination page, floating gently. Desktop
// only; rendered fixed just to the right of the sidebar, pointer-events none.
export default function NavPreview({ kind, top }) {
  return (
    <div className="nav-preview" style={{ top }} aria-hidden="true">
      {kind === 'work' && (
        <div className="nav-preview__work">
          <div className="nav-preview__work-rail">
            <span className="nav-preview__work-sq" />
            <span className="nav-preview__bar nav-preview__bar--35" />
            <span className="nav-preview__bar nav-preview__bar--20" />
          </div>
          <div className="nav-preview__work-grid">
            {WORK_COLORS.map((c, i) => (
              <div key={i} className="nav-preview__work-card nav-preview__float" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="nav-preview__work-thumb" style={{ background: c }} />
                <span className="nav-preview__bar nav-preview__bar--80" />
                <span className="nav-preview__bar nav-preview__bar--55" />
              </div>
            ))}
          </div>
        </div>
      )}

      {kind === 'about' && (
        <div className="nav-preview__about">
          <div className="nav-preview__portrait">
            <span className="nav-preview__portrait-head" />
            <span className="nav-preview__portrait-body" />
            <span className="nav-preview__shimmer" />
          </div>
          <div className="nav-preview__about-copy">
            <span className="nav-preview__bar nav-preview__bar--head" />
            <span className="nav-preview__bar nav-preview__bar--95" />
            <span className="nav-preview__bar nav-preview__bar--88" />
            <span className="nav-preview__bar nav-preview__bar--60" />
            <div className="nav-preview__chips">
              <span className="nav-preview__chip nav-preview__float" />
              <span className="nav-preview__chip nav-preview__float" style={{ animationDelay: '0.4s' }} />
              <span className="nav-preview__chip nav-preview__float" style={{ animationDelay: '0.8s' }} />
            </div>
          </div>
        </div>
      )}

      {kind === 'cave' && (
        <div className="nav-preview__cave">
          {CAVE_COLORS.map((c, i) => (
            <div key={i} className="nav-preview__cave-tile nav-preview__float" style={{ animationDelay: `${i * 0.28}s` }}>
              <span className="nav-preview__cave-tint" style={{ background: c }} />
              <span className="nav-preview__play" />
            </div>
          ))}
        </div>
      )}

      {kind === 'archive' && (
        <div className="nav-preview__archive">
          <span className="nav-preview__bar nav-preview__bar--head2" />
          <div className="nav-preview__marquee">
            <div className="nav-preview__marquee-row nav-preview__marquee-row--a">
              {[...PASS_HEXES, ...PASS_HEXES].map((c, i) => (
                <span key={i} className="nav-preview__mini-pass" style={{ background: c }}><span className="nav-preview__mini-pass-logo" /></span>
              ))}
            </div>
          </div>
          <div className="nav-preview__marquee">
            <div className="nav-preview__marquee-row nav-preview__marquee-row--b">
              {[...PASS_HEXES, ...PASS_HEXES].map((c, i) => (
                <span key={i} className="nav-preview__mini-pass" style={{ background: c }}><span className="nav-preview__mini-pass-logo" /></span>
              ))}
            </div>
          </div>
          <span className="nav-preview__bar nav-preview__bar--40" />
        </div>
      )}
    </div>
  )
}
