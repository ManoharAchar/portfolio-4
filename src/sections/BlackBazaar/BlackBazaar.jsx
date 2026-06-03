import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import ScrollVideo from '../../components/ScrollVideo/ScrollVideo'
import '../CooperantLearning/CooperantLearning.css'
import './BlackBazaar.css'

import blackBazaHeroVideo from '../../assets/black-baza/Blackbaza Hero.mp4'
import twoUserGroupVideo from '../../assets/black-baza/Two user group.mp4'
import bbDecision1Video from '../../assets/black-baza/Decision 1.mp4'
import bbDecision2Video from '../../assets/black-baza/Decision 2.mp4'
import bbDecision3Video from '../../assets/black-baza/Decision 3.mp4'
import buyerCoreFlowVideo from '../../assets/black-baza/Buyer core flow.mp4'
import traceabilityVideo from '../../assets/black-baza/Traceability.mp4'
import storePickupVideo from '../../assets/black-baza/Store pick up.mp4'
import usabilityTestImage from '../../assets/black-baza/Black Baza Usability test.png'
import hoverSvg from '../../assets/Hover.svg'

// ── Avatar image parts ────────────────────────────────────────
// Buyer (Asian Women)
const imgBody        = 'https://www.figma.com/api/mcp/asset/c3260ca0-d756-46b2-9a3b-7650d5b92a09'
const imgChangeColor = 'https://www.figma.com/api/mcp/asset/1079ff7d-b948-4c31-a9ad-cab7cc3b02b2'
const imgEarring     = 'https://www.figma.com/api/mcp/asset/b092035f-5d0a-4bd9-9932-1a2df7f7a165'
const imgCC1         = 'https://www.figma.com/api/mcp/asset/d4c493b7-d012-48d8-9b32-ba69e379bcf0'
const imgEyeEyebrow  = 'https://www.figma.com/api/mcp/asset/6f21fab1-1125-49cd-885a-39211fcd6e8a'
const imgCC2         = 'https://www.figma.com/api/mcp/asset/453ded57-06ab-4daa-8c33-314aa897ccd1'
const imgFace        = 'https://www.figma.com/api/mcp/asset/97f7ea1c-df63-4c86-abc9-300f6131c339'
const imgCC3         = 'https://www.figma.com/api/mcp/asset/8d034fb8-81dd-4f3a-b695-96076ec9524f'
const imgHair        = 'https://www.figma.com/api/mcp/asset/0a169e3d-ac8a-449f-b499-24a76e3ad0dd'
const imgCC4         = 'https://www.figma.com/api/mcp/asset/39d342c9-16ca-4904-8e4e-8df29df89117'
const imgMouth       = 'https://www.figma.com/api/mcp/asset/ab629a73-c89e-4039-9197-6893b78b9f0b'
// Retailer (Artis)
const imgAccecoris   = 'https://www.figma.com/api/mcp/asset/02a80db0-ee3a-4c7b-b4fb-18d5ac96c00f'
const imgCC7         = 'https://www.figma.com/api/mcp/asset/69c9d0d8-abd4-4ade-a320-198a3919c1c6'
const imgBeard       = 'https://www.figma.com/api/mcp/asset/c50aa9f8-fd69-4da0-ba9a-ac0cbab1c0ce'
const imgCC8         = 'https://www.figma.com/api/mcp/asset/08b98a25-cc65-4e0c-bab5-3babad96e958'
const imgEyeEyebrow1 = 'https://www.figma.com/api/mcp/asset/b5607ae3-ee11-4542-95f4-7af2007fba2a'
const imgCC9         = 'https://www.figma.com/api/mcp/asset/5069cc29-2517-439d-a72e-e04c4865c8c0'
const imgFace1       = 'https://www.figma.com/api/mcp/asset/ac6495ff-cb29-4f49-8050-561b875f5c39'
const imgCC10        = 'https://www.figma.com/api/mcp/asset/e5c72c53-896d-411d-ac93-f6211bac45a4'
const imgHair1       = 'https://www.figma.com/api/mcp/asset/252b6b63-c7a9-4194-a915-ec17c44bdb56'
const imgCC11        = 'https://www.figma.com/api/mcp/asset/6988e69a-5c99-4fe5-bbf6-e8e2f04ccf10'
const imgHat         = 'https://www.figma.com/api/mcp/asset/be76c3f2-9d40-419d-8449-face7b5ea842'
const imgCC12        = 'https://www.figma.com/api/mcp/asset/fb4c4ed7-2625-47b9-b6e0-15e3c39bb328'
const imgMouth1      = 'https://www.figma.com/api/mcp/asset/1dd7435c-b991-479a-9df0-9c66c9d5c5b8'
const imgCC13        = 'https://www.figma.com/api/mcp/asset/4d3574b7-d2a8-42f0-a111-99cac7010ce0'
const imgCC14        = 'https://www.figma.com/api/mcp/asset/a179fdb8-99a3-42ca-a5a8-b57a95580306'
const imgOuter       = 'https://www.figma.com/api/mcp/asset/42766456-714c-40e9-9bf4-1d2ad8bd47c1'
const imgTShirt      = 'https://www.figma.com/api/mcp/asset/bbf837b3-e20f-4e7f-b864-599734c90258'
// Farmer (Indian Man)
const imgBeard1      = 'https://www.figma.com/api/mcp/asset/cf6790b1-d63c-44ce-a2a9-3c20da8bf98a'
const imgCC17        = 'https://www.figma.com/api/mcp/asset/22b91e53-50f6-4614-9e2c-e1522decea2e'
const imgBody1       = 'https://www.figma.com/api/mcp/asset/37b1af81-111b-4980-b17f-452df6fde464'
const imgCC18        = 'https://www.figma.com/api/mcp/asset/2b81eb4e-9686-40c9-b532-963f1218938c'
const imgEyeEyebrow2 = 'https://www.figma.com/api/mcp/asset/4e6236f0-0eca-412c-8e96-0062c1a1c917'
const imgCC19        = 'https://www.figma.com/api/mcp/asset/8cba7822-266e-4493-86b4-1a74caaf408f'
const imgFace2       = 'https://www.figma.com/api/mcp/asset/3f33c962-8aef-48c8-9148-ab0f32a3075d'
const imgCC20        = 'https://www.figma.com/api/mcp/asset/ee01643c-1474-4a10-a27a-0e2575277aa5'
const imgMoustache   = 'https://www.figma.com/api/mcp/asset/14cf1c48-f854-4cff-9065-7321c93dd929'
const imgCC21        = 'https://www.figma.com/api/mcp/asset/7c648943-c80a-407d-8211-300c49829bb3'
const imgMouth2      = 'https://www.figma.com/api/mcp/asset/21f14ea5-db73-4e92-9227-26d981d1d8e1'
const imgCC23        = 'https://www.figma.com/api/mcp/asset/b40d3de9-0158-43a2-8994-980103c7f53d'
const imgNeck        = 'https://www.figma.com/api/mcp/asset/bea2de12-37ec-4be1-9af9-9f6d8ec64f73'
const imgTurban      = 'https://www.figma.com/api/mcp/asset/b27f284f-b650-4ccc-9024-5029cc79741c'

function AvatarLayer({ src, maskSrc, color }) {
  return (
    <>
      <img alt="" className="bb-avatar__img" src={src} />
      {color && maskSrc && (
        <div
          className="bb-avatar__overlay"
          style={{
            background: color,
            WebkitMaskImage: `url("${maskSrc}")`,
            maskImage: `url("${maskSrc}")`,
          }}
        />
      )}
    </>
  )
}

function BuyerAvatar() {
  return (
    <div className="bb-avatar">
      <AvatarLayer src={imgBody}      maskSrc={imgChangeColor} color="#9e7d84" />
      <AvatarLayer src={imgEarring}   maskSrc={imgCC1}         color="#dacdcc" />
      <AvatarLayer src={imgEyeEyebrow} maskSrc={imgCC2}        color="#ac7080" />
      <AvatarLayer src={imgFace}      maskSrc={imgCC3}         color="#c2837b" />
      <AvatarLayer src={imgHair}      maskSrc={imgCC4}         color="#ac7080" />
      <AvatarLayer src={imgMouth}     maskSrc={null}           color={null}    />
    </div>
  )
}

function RetailerAvatar() {
  return (
    <div className="bb-avatar">
      <AvatarLayer src={imgAccecoris}  maskSrc={imgCC7}  color="#c4948e" />
      <AvatarLayer src={imgBeard}      maskSrc={imgCC8}  color="#ac7080" />
      <AvatarLayer src={imgEyeEyebrow1} maskSrc={imgCC9} color="#ac7080" />
      <AvatarLayer src={imgFace1}      maskSrc={imgCC10} color="#c2837b" />
      <AvatarLayer src={imgHair1}      maskSrc={imgCC11} color="#e0ab62" />
      <AvatarLayer src={imgHat}        maskSrc={imgCC12} color="#9e7d84" />
      <AvatarLayer src={imgMouth1}     maskSrc={imgCC13} color="#edb66e" />
      <div className="bb-avatar__img" style={{ position: 'absolute', inset: 0 }}>
        <div className="bb-avatar__overlay" style={{ background: '#c4948e', WebkitMaskImage: `url("${imgCC14}")`, maskImage: `url("${imgCC14}")` }} />
      </div>
      <AvatarLayer src={imgOuter}  maskSrc={null} color={null} />
      <AvatarLayer src={imgTShirt} maskSrc={null} color={null} />
    </div>
  )
}

function FarmerAvatar() {
  return (
    <div className="bb-avatar">
      <AvatarLayer src={imgBeard1}     maskSrc={imgCC17} color="#ac7080" />
      <AvatarLayer src={imgBody1}      maskSrc={imgCC18} color="#edb66e" />
      <AvatarLayer src={imgEyeEyebrow2} maskSrc={imgCC19} color="#ac7080" />
      <AvatarLayer src={imgFace2}      maskSrc={imgCC20} color="#b96c64" />
      <AvatarLayer src={imgMoustache}  maskSrc={imgCC21} color="#ac7080" />
      <AvatarLayer src={imgMouth2}     maskSrc={null}    color={null}    />
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#e0ab62', WebkitMaskImage: `url("${imgCC23}")`, maskImage: `url("${imgCC23}")`, mixBlendMode: 'overlay' }} />
      <AvatarLayer src={imgNeck}   maskSrc={null} color={null} />
      <AvatarLayer src={imgTurban} maskSrc={null} color={null} />
    </div>
  )
}

const AVATAR_BY_NAME = { Buyer: BuyerAvatar, Retailer: RetailerAvatar, Farmer: FarmerAvatar }

const TOC_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'final-screens', label: 'Final Screens' },
  { id: 'testing', label: 'Testing' },
  { id: 'shipped', label: 'What Shipped' },
  { id: 'validation', label: 'Validation' },
]

const METRICS = [
  { value: '71.6', label: 'BUYER SUS SCORE', sub: 'Grade B, above industry average of 68' },
  { value: '88%', label: 'REPEAT ORDER SUCCESS', sub: 'Fastest task, 65-second average completion' },
  { value: '3', label: 'USER GROUPS TESTED', sub: 'Buyers, retailers, farmer partners (n=16)' },
]

const USER_GROUPS = [
  {
    name: 'Buyer',
    needs: [
      'Shopping and repeat ordering',
      'Traceability and origin context',
      'Community and sustainability trust',
    ],
  },
  {
    name: 'Retailer',
    needs: [
      'Weekly restocking and ordering',
      'Inventory visibility and payment terms',
      'Faster than WhatsApp and phone calls',
    ],
  },
  {
    name: 'Farmer',
    needs: [
      'Accurate public representation',
      'Privacy controls and consent',
      'Biodiversity and forest care context',
    ],
  },
]

function QuoteCallout({ quote, attribution }) {
  return (
    <div className="cs-quote">
      <div className="cs-quote__bar" />
      <div className="cs-quote__text">
        <p className="cs-quote__quote">"{quote}"</p>
        <p className="cs-quote__attr">— {attribution}</p>
      </div>
    </div>
  )
}

export default function BlackBazaar({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observers = []
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-20% 0px -65% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="cs-page">
      <div className="cs-body">

        {/* ── Sidebar ── */}
        <aside className="cs-sidebar">
          <button className="cs-sidebar__home" onClick={() => onNavigate?.('home')}>
            ← HOME
          </button>

          <div className="cs-sidebar__toc-card">
            <p className="cs-sidebar__toc-heading">TABLE OF CONTENTS</p>
            <div className="cs-sidebar__toc-links">
              {TOC_ITEMS.map(({ id, label }, i) => (
                <button
                  key={id}
                  className={`cs-sidebar__toc-item${activeSection === id ? ' cs-sidebar__toc-item--active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  {i + 1}. {label}
                </button>
              ))}
            </div>
          </div>

          <button className="cs-sidebar__back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ BACK TO TOP
          </button>
        </aside>

        {/* ── Main Content ── */}
        <main className="cs-main">
          <div className="cs-sections">

            {/* Hero */}
            <section className="cs-section" id="hero">
              <p className="cs-label">CASE STUDY / BLACK BAZA</p>
              <h1 className="cs-section-heading">
                I designed a three-sided mobile platform for an activist coffee brand, connecting buyers to farmers through traceability, community, and sustainability. In production.
              </h1>

              <div className="cs-hero-info">
                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">PROJECT SNAPSHOT</p>
                  {[
                    { label: 'ROLE', value: 'Product Designer (0-to-1)' },
                    { label: 'TEAM', value: 'Solo designer, 1 stakeholders, 1 developer' },
                    { label: 'TIMELINE', value: '~8 Weeks (Jun 2025 – Sep 2025)' },
                    { label: 'PLATFORM', value: 'iOS & Android' },
                  ].map(({ label, value }) => (
                    <div key={label} className="cs-info-row">
                      <span className="cs-info-row__label">{label}</span>
                      <span className="cs-info-row__value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="cs-info-card">
                  <p className="cs-info-card__section-label">CONTRIBUTION</p>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">OWNED</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">UX strategy, IA, interaction design, UI, design system, QA, handoff documentation</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">SCOPE</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Research through production build</span>
                  </div>
                  <div className="cs-info-row">
                    <span className="cs-info-row__label">NDA</span>
                    <span className="cs-info-row__value cs-info-row__value--muted">Select details shown</span>
                  </div>
                  <div className="cs-status-pill">
                    <span className="cs-status-pill__dot" />
                    <span>In Production</span>
                  </div>
                </div>
              </div>

              <div className="cs-media">
                <ScrollVideo src={blackBazaHeroVideo} className="cs-media__video" />
              </div>

              <div className="cs-metrics bb-metrics">
                {METRICS.map(({ value, label, sub }) => (
                  <div key={label} className="cs-metric-card">
                    <p className="cs-metric-card__value">{value}</p>
                    <p className="cs-metric-card__label">{label}</p>
                    <p className="cs-metric-card__sub">{sub}</p>
                  </div>
                ))}
              </div>

              <p className="cs-media__caption">
                In Production. Usability validated with 16 participants across 3 user groups. NDA: details shown under password.
              </p>
            </section>

            {/* Problem */}
            <section className="cs-section cs-section--gap-24" id="problem">
              <p className="cs-label">PROBLEM</p>
              <h2 className="cs-section-heading">
                Black Baza needed more than a website: three user groups, zero digital infrastructure, and no competitor solving this problem
              </h2>
              <div className="cs-body-stack">
                <p className="cs-section-body">
                  Black Baza Coffee is an activist company in Karnataka, India, pairing specialty coffee sales with biodiversity conservation and fair farmer livelihoods. Their existing website could sell coffee but could not build community, surface origin stories, or support retail partners digitally.
                </p>
                <p className="cs-section-body">
                  No major competitor in the specialty coffee space offered traceability or community features. The opportunity was to design a single platform serving buyers, retailers, and farmer partners with fundamentally different needs.
                </p>
              </div>

              <div className="bb-user-group-row">
                {USER_GROUPS.map(({ name, needs }) => {
                  const Avatar = AVATAR_BY_NAME[name]
                  return (
                    <div key={name} className="bb-user-group-card">
                      <Avatar />
                      <div className="bb-user-group-card__accent" />
                      <p className="bb-user-group-card__name">{name}</p>
                      <ul className="bb-user-group-card__list">
                        {needs.map((need) => (
                          <li key={need}>{need}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <p className="cs-media__caption">
                Three user groups, one platform: each with distinct goals and different levels of digital literacy.
              </p>
            </section>

            {/* Approach */}
            <section className="cs-section cs-section--gap-24" id="approach">
              <p className="cs-label">APPROACH</p>
              <h2 className="cs-section-heading">
                I designed a two-sided platform with shared content and role-specific tools
              </h2>
              <p className="cs-section-body">
                The app onboards users as Buyer or Retailer, then tailors the experience while keeping traceability and community accessible across roles. AI-assisted research synthesis helped cluster interview findings from 8 customers, accelerating the transition from raw data to the information architecture below.
              </p>
              <div className="cs-media">
                <ScrollVideo src={twoUserGroupVideo} className="cs-media__video" />
                <p className="cs-media__caption">
                  Information architecture: shared content layers bridge two primary user groups, consulted farmer partners with role-specific entry points.
                </p>
              </div>
            </section>

            {/* Key Decisions Intro */}
            <section className="cs-section cs-section--gap-20" id="decisions">
              <p className="cs-label">KEY DECISIONS</p>
              <h2 className="cs-section-heading">
                Three decisions that shaped the product
              </h2>
            </section>

            {/* Decision 1 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 1</p>
              <h3 className="cs-decision-heading">
                Made sustainability a system, not a badge.
              </h3>
              <p className="cs-decision-body">
                Rationale: Buyers distrusted single sustainability scores and wanted to see the math.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision1Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Sustainability as a system: the carbon footprint calculator shows its math, and the store pickup flow reduces the footprint further.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">The experience is less scannable than a badge, but trust mattered more.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">Task B4 had 25% success and the lowest trust score; pickup needs better discoverability.</p>
                </div>
              </div>
            </section>

            {/* Decision 2 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 2</p>
              <h3 className="cs-decision-heading">
                Built a dedicated retailer workflow.
              </h3>
              <p className="cs-decision-body">
                Rationale: Retailers needed inventory, bulk ordering, and payment terms for weekly restocking.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision2Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Retailer experience: inventory and wholesale ordering designed for weekly restocking. SUS 61.2, in active iteration.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">The retailer side doubled scope and remains the roughest part of the product.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">Retailer SUS was 61.2, and Task R2 had 50% success. Iteration is ongoing.</p>
                </div>
              </div>
              <QuoteCallout
                quote="I expected a spreadsheet-like input, not repeated taps."
                attribution="R02, retailer participant"
              />
            </section>

            {/* Decision 3 */}
            <section className="cs-section cs-section--gap-22">
              <p className="cs-decision-label">DECISION 3</p>
              <h3 className="cs-decision-heading">
                Validated farmer stories at the farm.
              </h3>
              <p className="cs-decision-body">
                Rationale: The product depended on representing farmers accurately, which screen tests could not validate.
              </p>
              <div className="cs-media">
                <ScrollVideo src={bbDecision3Video} className="cs-media__video" />
                <p className="cs-media__caption">
                  Farmer profiles validated at the farm. Corrections, privacy requests, and content additions are being incorporated.
                </p>
              </div>
              <div className="cs-notes">
                <div className="cs-note-card">
                  <p className="cs-note-card__label">TRADEOFF</p>
                  <p className="cs-note-card__body">It required travel, translation, and a slower method, but produced the sharpest findings.</p>
                </div>
                <div className="cs-note-card">
                  <p className="cs-note-card__label">EVIDENCE</p>
                  <p className="cs-note-card__body">3 of 4 farmers requested corrections, 2 raised privacy concerns, and all preferred biodiversity context over biography.</p>
                </div>
              </div>
              <QuoteCallout
                quote="Show the birds too, not only me. They are part of this coffee."
                attribution="Chickaramagowda, farmer partner, BR Hills"
              />
            </section>

            {/* Final Screens */}
            <section className="cs-section cs-section--gap-24" id="final-screens">
              <p className="cs-label">FINAL PRODUCT</p>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Buyer core flow</h2>
                <div className="cs-media">
                  <ScrollVideo src={buyerCoreFlowVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Primary product demo: onboarding, discovery, traceability, and checkout in one recorded flow.
                  </p>
                </div>
              </div>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Traceability moment</h2>
                <div className="cs-media">
                  <ScrollVideo src={traceabilityVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Traceability moment: product detail to grower profile, showing the line from coffee to farmer.
                  </p>
                </div>
              </div>

              <div className="bb-final-sub">
                <h2 className="bb-final-sub__heading">Store pickup flow</h2>
                <div className="cs-media">
                  <ScrollVideo src={storePickupVideo} className="cs-media__video" />
                  <p className="cs-media__caption">
                    Store pickup flow: nearby pickup, reduced packaging, and local collection in one short loop.
                  </p>
                </div>
              </div>
            </section>

            {/* Testing */}
            <section className="cs-section cs-section--gap-24" id="testing">
              <p className="cs-label">TESTING</p>
              <h2 className="cs-section-heading">
                Usability testing with 16 participants validated the concept and surfaced 12 issues driving iteration
              </h2>
              <p className="cs-section-body">
                I tested the prototype with 8 buyers, 4 retailers, and conducted perception audits with 4 farmer partners at their farms, followed by a heuristic evaluation with 3 expert reviewers. Buyer usability scored 71.6 (SUS Grade B, above the industry average of 68). The retailer experience scored 61.2 (Grade D), confirming that retailer workflows need structural redesign before launch.
              </p>
              <div className="cs-media">
                <div className="cs-media__pan-wrap">
                  <img src={usabilityTestImage} alt="Black Baza usability testing" className="cs-media__img" />
                  <img src={hoverSvg} alt="" className="cs-media__hover-hint" />
                </div>
                <p className="cs-media__caption">
                  SUS scores by group. Buyer experience is above average. Retailer experience is the priority for the next iteration.
                </p>
              </div>
              <QuoteCallout
                quote="People should know coffee grows with the forest, not outside it."
                attribution="Achukkegowda, farmer partner, BR Hills"
              />
            </section>

            {/* What Shipped */}
            <section className="cs-section cs-section--gap-24" id="shipped">
              <p className="cs-label">SHIPPED</p>
              <h2 className="cs-section-heading">
                In Production. Iteration continues on retailer workflows and footprint discoverability.
              </h2>
              <p className="cs-section-body">
                The platform serves buyer commerce, farmer traceability, community, store pickup, and retailer ordering. Three areas are in active redesign based on usability findings: retailer inventory entry, carbon footprint discoverability, and grind guidance.
              </p>
            </section>

            {/* Validation */}
            <section className="cs-section cs-section--gap-24" id="validation">
              <p className="cs-label">VALIDATION</p>
              <p className="cs-section-body cs-section-body--sm">
                Validation: Moderated usability testing (n=16 across 3 user groups) + 3-evaluator heuristic review. SUS scoring, task success rates, severity-rated issue log. Full test plan, data workbook, and research report available on request.
              </p>
            </section>

          </div>
        </main>
      </div>

      <Footer activePage="black-bazaar" onNavigate={onNavigate} />
    </div>
  )
}
