import './IntentCard.css'

const CHECKMARK_SVG = (
  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" width="21" height="21">
    <circle cx="10.5" cy="10.5" r="10.5" fill="#2a2a2a"/>
    <path d="M6 10.5l3.5 3.5 5.5-6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Inline SVGs taken directly from the Figma design frame.
// All normalised to a 40×40 viewBox with currentColor so CSS controls tint.
// Eye Figma export is 32.5×22.5; centred here with translate(3.75, 8.75).
const ICONS = {
  designer: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 20V33.3333M20 20V21.6667H25C27.6522 21.6667 30.1957 20.6131 32.0711 18.7377C33.9464 16.8624 35 14.3188 35 11.6667V10H30C27.3478 10 24.8043 11.0536 22.9289 12.9289C21.0536 14.8043 20 17.3478 20 20ZM20 16.6667V18.3333H15C12.3478 18.3333 9.8043 17.2798 7.92893 15.4044C6.05357 13.529 5 10.9855 5 8.33333V6.66667H10C12.6522 6.66667 15.1957 7.72024 17.0711 9.5956C18.9464 11.471 20 14.0145 20 16.6667Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(3.75, 8.75)">
        <path d="M31.25 11.25C31.25 13.25 24.5333 21.25 16.25 21.25C7.96667 21.25 1.25 13.25 1.25 11.25C1.25 9.25 7.96667 1.25 16.25 1.25C24.5333 1.25 31.25 9.25 31.25 11.25Z" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M21.25 11.25C21.25 12.5761 20.7232 13.8479 19.7855 14.7855C18.8479 15.7232 17.5761 16.25 16.25 16.25C14.9239 16.25 13.6521 15.7232 12.7145 14.7855C11.7768 13.8479 11.25 12.5761 11.25 11.25C11.25 9.92392 11.7768 8.65215 12.7145 7.71447C13.6521 6.77678 14.9239 6.25 16.25 6.25C17.5761 6.25 18.8479 6.77678 19.7855 7.71447C20.7232 8.65215 21.25 9.92392 21.25 11.25Z" stroke="currentColor" strokeWidth="2.5"/>
      </g>
    </svg>
  ),
  paperPlane: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.0659 1.55133C36.8342 1.35901 36.5527 1.23648 36.254 1.19801C35.9554 1.15955 35.6519 1.20673 35.3791 1.33406L2.6357 16.7031V19.677L16.3886 25.1781L25.2102 38.75H28.1847L37.5831 3.17187C37.6593 2.88051 37.6512 2.57348 37.5596 2.28657C37.4681 1.99966 37.2969 1.74467 37.0659 1.55133ZM26.3482 35.9135L18.7656 24.2477L30.4338 11.4678L28.5877 9.78219L16.8281 22.6616L5.48883 18.1259L34.6641 4.43125L26.3482 35.9135Z" fill="currentColor"/>
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.64 10.9481L16.4076 16.2075C16.1863 16.32 16.0064 16.4999 15.8938 16.7212L10.2901 28.0188C10.0607 28.4694 10.1438 29.0163 10.4976 29.3775C10.6074 29.4892 10.7383 29.5778 10.8828 29.6383C11.0272 29.6988 11.1822 29.73 11.3388 29.73C11.5119 29.73 11.6882 29.6919 11.8513 29.6125L23.7937 24.6525C24.0125 24.5476 24.193 24.3769 24.31 24.1643L30.2037 12.5668C30.455 12.1137 30.3806 11.55 30.0219 11.1775C29.6619 10.805 29.1006 10.7138 28.64 10.9481ZM13.9788 25.9694L17.3775 19.0287L20.81 23.325L13.9788 25.9694ZM22.84 21.86L19.3713 17.5181L26.2769 14.7931L22.84 21.86ZM20 0C8.95439 0 1.5625e-05 8.95437 1.5625e-05 20C1.5625e-05 31.0462 8.95439 40 20 40C31.0463 40 40 31.0462 40 20C40 8.95437 31.0463 0 20 0ZM20 37.5394C10.3506 37.5394 2.50002 29.6494 2.50002 19.9999C2.50002 10.3505 10.3506 2.49992 20 2.49992C29.6494 2.49992 37.5 10.3506 37.5 19.9999C37.5 29.6493 29.6494 37.5394 20 37.5394Z" fill="currentColor"/>
    </svg>
  ),
}

const CARD_DATA = {
  designer: { icon: ICONS.designer, label: "I'm looking for a designer." },
  'see-work': { icon: ICONS.eye, label: 'I want to see the work.' },
  'sent-here': { icon: ICONS.paperPlane, label: 'Someone sent me here.' },
  exploring: { icon: ICONS.compass, label: 'Just exploring.' },
}

export default function IntentCard({ type, selected, onClick }) {
  const { icon, label } = CARD_DATA[type]

  return (
    <button
      className={`intent-card ${selected ? 'intent-card--selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="intent-card__icon">
        {icon}
      </div>
      <p className="intent-card__label">{label}</p>
      <div className="intent-card__check" aria-hidden={!selected}>
        {CHECKMARK_SVG}
      </div>
    </button>
  )
}
