# Manohar Achar Portfolio — Case Study Design Kit

**How to use this file:** attach it to a Claude Design conversation along with the case-study markdown and visual assets. It defines the design system, the narrative cadence, and the export contract for a new case-study page. Follow the FIXED rules exactly; invent freely inside the CREATIVE LICENSE areas.

---

## 1. Foundations (FIXED — never deviate)

### Colors
| Token | Value | Use |
|---|---|---|
| Page background | `#2a2a2a` | Every page |
| Panel / card surface | `#3c3c3a` | Cards, chips, info panels |
| Elevated gray | `#5c5c5c` | Small CTA chips sitting ON a `#3c3c3a` card |
| Primary text (cream) | `#faf8f1` | Headings, emphasis body |
| Secondary text | `#dbd8ce` | Body copy, labels |
| Muted text | `#cbc8bf` | De-emphasized inline text |
| Skeleton/hairline | `rgba(219,216,206,0.2)` | Dividers |
| Accent (varies per visitor) | `var(--accent)` — one of `#798c6d` `#64818c` `#c87a5a` `#c4a24d` | Highlights, quote bars. Never hardcode one of the four. |
| Dark ink on accent surfaces | `#120b06` | Any text sitting on an accent-colored background (WCAG AA requirement — light text can NOT pass on `#c4a24d`) |

### Typography
| Role | Font | Size / line-height | Color |
|---|---|---|---|
| Eyebrow / section label | Source Code Pro 400, letter-spacing 1.5px, UPPERCASE | 13px | `#dbd8ce` |
| Page hero title | Fraunces 400, `font-variation-settings: 'SOFT' 0, 'WONK' 1` | 35px | `#faf8f1` |
| Section heading | Fraunces 400 (same variation settings) | 30px | `#faf8f1` |
| Card / subsection title | Fraunces 400 | 18px / 28px | `#faf8f1` |
| Body | DM Sans 400, `font-variation-settings: 'opsz' 14` | 16px / 26px | `#dbd8ce` |
| Body large / lead | DM Sans 400 | 18px / 30px | `#dbd8ce` |
| Small body / captions | DM Sans 400 | 15px | `#dbd8ce` |
| Pull-quote text | Fraunces 400 | 18–24px / 28–32px | `#faf8f1` |
| Chip / CTA / data labels | Source Code Pro 400 | 13px / 19.5px | `#faf8f1` |

Fonts load from Google Fonts: Fraunces (opsz 9..144), DM Sans, Source Code Pro, Inter, Caveat.

### Spacing & radii
- Spacing steps: **8 / 14 / 20 / 22 / 24 / 28 / 48 / 64**. Section internal gaps are 20–28px; between-section rhythm is generous (48–64px).
- Radii: **20px** large media/cards · **12–14px** panels/chips · **8px** nav-size elements · **4px** small CTA chips.
- Content column: max-width ~**1240–1408px**, centered, 64px page padding on desktop.

---

## 2. Component vocabulary (the existing system — reuse these patterns by name)

- **Section label (`cs-label`)** — 13px uppercase mono eyebrow that opens every section.
- **Hero row (`cs-v2-hero-row`)** — two columns: left copy (label, 35px title, lead paragraph, chip row), right a large rounded-20px looping video/image.
- **Chip row (`cs-chip`)** — meta facts as small `#3c3c3a` pills (STATUS / MY ROLE / TEAM / TIMELINE / PLATFORM), each with a 13px mono label + value.
- **Live CTA (`cs-live-cta`)** — cream `#faf8f1` pill, dark text, 12px radius — the ONE loud button, used only for shipped/live products.
- **Outcomes banner (`cs-impact-grid`)** — a row of 3–4 big stat cards right under the hero: large Fraunces value + small mono label + sub-note.
- **Pull quote (`cs-quote`)** — 3px vertical accent bar (`var(--accent)`), Fraunces quote, DM Sans attribution ("P5, usability round 2" / "farmer partner, BR Hills"). The main tool for human voice.
- **Info card (`cs-info-card`)** — dark panel of label/value rows (`cs-info-row`), optionally with a status pill (dot + "In Production").
- **Decision block (`cs-decision-*`)** — numbered design decisions: heading, rationale body, supporting media, often followed by a pull quote as evidence.
- **Step / flow cards (`cs-step-card`, `cs-flow-card`)** — horizontal sequences with arrows for user journeys or process.
- **Gallery (`cs-gallery-card`)** — captioned media grid; videos are muted looping mp4s, never GIFs.
- **Learned cards (`cs-learned-grid`)** — numbered takeaway cards near the end.
- **Invite block (`cs-invite`)** — closing personal section: photo, "let's talk" copy, email + LinkedIn actions.
- **View-next grid (`cs-viewnext-grid`)** — two cards linking onward to other case studies. Always last before the footer.
- **Media hygiene** — every video is a muted, looping, `playsinline` mp4 in a rounded-20px container. Screen recordings sit on soft tinted backdrops (dusty pink, lavender, sage) rather than raw edge-to-edge.

## 3. Narrative cadence (the shared skeleton)

1. **Hero** — eyebrow, one-line thesis title, lead paragraph, chip row of meta facts, hero media. (Live CTA here if the product is shipped.)
2. **Outcomes up front** — the impact stats banner immediately after the hero. Numbers first, story second.
3. **Problem & context** — short, concrete, human.
4. **The work** — 2–4 numbered decisions, or broke→fix rows, or before/after sliders. This is the section that flexes most per project.
5. **Evidence** — testing results, charts, SUS scores… always paired with at least one human pull-quote so the numbers have a face.
6. **What I learned / what's next** — brief.
7. **Invite + view-next** — personal close, then onward links.

## 4. CREATIVE LICENSE (where to invent — please do)

The cadence above is a rhythm, not a template. Every existing case study invents its own mid-page moments: Mochitta has "What Broke / What We Fixed" paired rows; Black Baza has snapshot info-cards and farmer quotes; Cooperant has a versioned V1→V2 build story. **The new case study should get its own signature move** — a layout composition specific to its content. Free areas: section 4's structure, media arrangements (grids, overlaps, split layouts), how evidence is visualized, bespoke card types. Constraints that survive creativity: the color/type/spacing tokens above, generous whitespace, one accent used sparingly, media always in rounded containers, and the page must read as a sibling of the others — inventive, not off-brand.

## 5. Export contract (so the HTML imports cleanly)

- Output **one self-contained HTML file**: desktop layout only (1440–1920px), all CSS in a `<style>` block. Mobile/responsive will be handled during production import — don't attempt it.
- Use **class names prefixed `cs-`**, matching existing names where the component is the same concept, new names for new inventions.
- Reference assets by **descriptive placeholder**: `<video data-asset="hero-loop.mp4">`, `<img data-asset="testing-chart.png">` — with a comment noting intended crop/size. Don't inline base64.
- Use the exact font families/sizes from §1; don't substitute.
- No JavaScript — interactions (video gating, reveals, sliders) are added in production.
- Where a value is uncertain, prefer the §1 token over inventing a near-match.
