import { useState, useEffect, useRef } from 'react'
import './NdaNoticeModal.css'

// One-time notice shown when an NDA case study opens: the visuals here are
// recreations, not the client's originals. Dismissed state is remembered per
// study on the device, so it never interrupts a second visit.
export default function NdaNoticeModal({ studyKey, projectTitle }) {
  const storageKey = `pf3_nda_${studyKey}`
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(storageKey) !== '1' } catch { return true }
  })
  const okRef = useRef(null)

  const dismiss = () => {
    try { localStorage.setItem(storageKey, '1') } catch { /* private mode */ }
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    okRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null

  return (
    <div className="pf-modal" role="dialog" aria-modal="true" aria-label="A note on the visuals">
      <div className="pf-modal__backdrop" onClick={dismiss} />
      <div className="pf-modal__panel pf-nda">
        <div className="pf-nda__head">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="1.8" />
            <path d="M12 11v5" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="7.8" r="1.05" fill="var(--accent)" />
          </svg>
          <span className="pf-nda__eyebrow">A NOTE ON THE VISUALS</span>
        </div>

        <h3 className="pf-nda__title">Everything here is recreated.</h3>
        <p className="pf-nda__body">
          {projectTitle} is under NDA, so every screen in this case study is rebuilt by me in my own visual treatment. The problems, decisions, and outcomes are real. Proprietary details, data, and branding are fictionalized.
        </p>

        <div className="pf-nda__actions">
          <button ref={okRef} className="pf-nda__ok" type="button" onClick={dismiss}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
