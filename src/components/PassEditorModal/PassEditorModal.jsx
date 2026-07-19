import { useState, useEffect } from 'react'
import PassCard, { INTENT_LABELS } from '../PassCard/PassCard'
import { PASS_ACCENTS } from '../../lib/passEditor'
import './PassEditorModal.css'

const INTENT_KEYS = Object.keys(INTENT_LABELS)
const STAMP_MS = 620

// Default accent for a guest with none yet: their intent's default color.
const INTENT_DEFAULT_ACCENT = {
  designer: '#798c6d', 'see-work': '#64818c', 'sent-here': '#c87a5a', exploring: '#c4a24d',
}
const intentDefault = (intent) => INTENT_DEFAULT_ACCENT[intent] ?? '#798c6d'

export default function PassEditorModal({ guest, onClose, onSave }) {
  const baseAccent = guest?.accent ?? intentDefault(guest?.intent)
  const [draft, setDraft] = useState({
    name: guest?.name && guest.name !== 'Guest' ? guest.name : '',
    intent: guest?.intent ?? 'designer',
    accent: baseAccent,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !saving) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, saving])

  const save = () => {
    if (saving) return
    setSaving(true)
    // Stamp press plays, then commit (parent persists + closes + pops thumb).
    setTimeout(() => {
      onSave({ ...draft, name: draft.name.trim() || 'Guest' })
    }, STAMP_MS)
  }

  return (
    <div className="pf-modal" role="dialog" aria-modal="true" aria-label="Customize your guest pass">
      <div className="pf-modal__backdrop" onClick={() => !saving && onClose()} />
      <div className="pf-modal__panel pf-editor">
        <div className="pf-editor__head">
          <span className="pf-editor__eyebrow">YOUR GUEST PASS</span>
          <button className="pf-editor__close" onClick={onClose} aria-label="Close" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Live preview — the real PassCard, driven by the draft. */}
        <div className="pf-editor__preview">
          <div className={`pf-editor__preview-scale${saving ? ' pf-editor__preview-scale--stamp' : ''}`}>
            <PassCard
              intent={draft.intent}
              name={draft.name}
              accent={draft.accent}
              date={guest?.date}
              passId={guest?.passId}
            />
          </div>
        </div>

        <div className="pf-editor__field">
          <label className="pf-editor__label" htmlFor="pf-editor-name">NAME ON THE PASS</label>
          <input
            id="pf-editor-name"
            className="pf-editor__input"
            type="text"
            maxLength={16}
            placeholder="Your name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
        </div>

        <div className="pf-editor__field">
          <span className="pf-editor__label">WHAT BRINGS YOU HERE</span>
          <div className="pf-editor__intents">
            {INTENT_KEYS.map((key) => {
              const selected = draft.intent === key
              return (
                <button
                  key={key}
                  type="button"
                  className={`pf-editor__intent${selected ? ' pf-editor__intent--on' : ''}`}
                  style={selected ? { borderColor: draft.accent } : undefined}
                  onClick={() => setDraft((d) => ({ ...d, intent: key }))}
                >
                  {INTENT_LABELS[key]}
                </button>
              )
            })}
          </div>
        </div>

        <div className="pf-editor__field">
          <span className="pf-editor__label">PASS COLOR</span>
          <div className="pf-editor__swatches">
            {PASS_ACCENTS.map((a) => (
              <button
                key={a.hex}
                type="button"
                aria-label={a.name}
                className={`pf-editor__swatch${draft.accent === a.hex ? ' pf-editor__swatch--on' : ''}`}
                style={{ background: a.hex }}
                onClick={() => setDraft((d) => ({ ...d, accent: a.hex }))}
              />
            ))}
          </div>
        </div>

        <div className="pf-editor__actions">
          <button className="pf-editor__cancel" type="button" onClick={onClose}>Cancel</button>
          <button className="pf-editor__save" type="button" onClick={save}>
            {saving ? 'Stamping…' : 'Save my pass'}
          </button>
        </div>
      </div>
    </div>
  )
}
