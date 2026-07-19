import { useState, useEffect, useRef } from 'react'
import './PasscodeModal.css'

// One passcode opens every protected study. Kept in an env var so it never
// lives in the source; note it still inlines into the built bundle (Vite),
// so this is a soft NDA deterrent, not real access control.
// The passcode is a soft, client-side gate (it ships in the bundle either way),
// so the real code is the committed default. VITE_UNLOCK_CODE still overrides it
// if it's ever set in the Vercel env.
const UNLOCK_CODE = (import.meta.env.VITE_UNLOCK_CODE ?? 'a-good-fit').trim().toLowerCase()

export default function PasscodeModal({ projectTitle, onClose, onSuccess }) {
  const [value, setValue] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = () => {
    if (success) return
    if (value.trim().toLowerCase() === UNLOCK_CODE) {
      setSuccess(true)
      setError(false)
      try { localStorage.setItem('pf3_unlocked', '1') } catch { /* private mode */ }
      setTimeout(() => onSuccess(), 750)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="pf-modal" role="dialog" aria-modal="true" aria-label="Protected case study">
      <div className="pf-modal__backdrop" onClick={onClose} />
      <div className="pf-modal__panel pf-passcode">
        <div className="pf-passcode__head">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="var(--accent)" strokeWidth="1.8" />
            <path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 v3" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="pf-passcode__eyebrow">PROTECTED CASE STUDY</span>
          <button className="pf-passcode__close" onClick={onClose} aria-label="Close" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <h3 className="pf-passcode__title">This one&rsquo;s still under NDA.</h3>
        <p className="pf-passcode__body">
          <span className="pf-passcode__project">{projectTitle}</span> is client-confidential. If we&rsquo;ve been in touch, through an application or on LinkedIn, you&rsquo;ll find the passcode in my note. One passcode opens every protected study, and this device stays unlocked.
        </p>

        <div className={`pf-passcode__row${shake ? ' pf-shake' : ''}`}>
          <div className="pf-passcode__field">
            <input
              ref={inputRef}
              type={showPw ? 'text' : 'password'}
              className={`pf-passcode__input${error ? ' pf-passcode__input--error' : ''}`}
              placeholder="Enter passcode"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
            />
            <button
              type="button"
              className="pf-passcode__eye"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? 'Hide passcode' : 'Show passcode'}
              tabIndex={-1}
            >
              {showPw ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M10.6 10.6a2 2 0 002.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M9.4 5.2A9.4 9.4 0 0112 5c5 0 8.5 4.2 9.4 6.3a1.7 1.7 0 010 1.4 15.7 15.7 0 01-2.4 3.5M6.2 6.6C3.9 8 2.4 10 1.6 11.3a1.7 1.7 0 000 1.4C2.5 14.8 6 19 11 19a9.9 9.9 0 004.3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M1.6 12.3a1.7 1.7 0 010-1.4C2.6 8.6 6 4.5 12 4.5s9.4 4.1 10.4 6.4a1.7 1.7 0 010 1.4C21.4 14.4 18 18.5 12 18.5S2.6 14.4 1.6 12.3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="11.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="button"
            className={`pf-passcode__submit${success ? ' pf-passcode__submit--ok' : ''}`}
            onClick={submit}
          >
            {success ? 'Unlocked ✓' : 'Unlock'}
          </button>
        </div>

        {error && (
          <p className="pf-passcode__error">That&rsquo;s not it. Double-check my note, or just ask.</p>
        )}

        <a className="pf-passcode__mail" href="mailto:manohar.create@gmail.com">
          Don&rsquo;t have a passcode? Email me →
        </a>
      </div>
    </div>
  )
}
