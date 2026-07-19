import { useState } from 'react'
import { flushSync } from 'react-dom'
import Sidebar from '../Sidebar/Sidebar'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Footer from '../../components/Footer/Footer'
import HomeBanner from '../../components/HomeBanner/HomeBanner'
import { PROJECTS, getProjectPage } from '../../data/projects'
import './HomePage.css'

const CHIPS = [
  { id: 'all', label: 'ALL WORK' },
  { id: 'saas', label: 'ENTERPRISE SAAS' },
  { id: 'web', label: 'WEB APPS' },
  { id: 'mobile', label: 'MOBILE' },
  { id: 'hmi', label: 'PHYSICAL HMI' },
  { id: 'zero', label: '0 → 1' },
  { id: 'access', label: 'ACCESSIBILITY' },
  { id: 'fintech', label: 'FINTECH' },
]

export default function HomePage({ activePage = 'home', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const matches = (p) => filter === 'all' || (p.tags || []).includes(filter)
  // Matching projects re-sort to the top; Array.sort is stable so relative
  // order is preserved within each group.
  const sorted = [...PROJECTS].sort((a, b) => (matches(b) ? 1 : 0) - (matches(a) ? 1 : 0))

  const changeFilter = (id) => {
    if (id === filter) return
    // flushSync commits the reorder synchronously inside the transition
    // callback so the View Transition captures the new positions.
    const apply = () => flushSync(() => setFilter(id))
    if (document.startViewTransition) {
      const vt = document.startViewTransition(apply)
      // Skipped transitions reject these; swallow so the console stays clean.
      vt.ready?.catch(() => {})
      vt.finished?.catch(() => {})
      vt.updateCallbackDone?.catch(() => {})
    } else {
      apply()
    }
  }

  return (
    <div className="home-layout">
      {/* Fixed sidebar, z-index: 5 */}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        guest={guest}
        showPassCard={showPassCard}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Overlay — visible on small screens when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Tablet toggle (768–1023px) — replaced by MobileTopBar on mobile */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile top bar (≤ 767px) */}
      <MobileTopBar onToggle={() => setSidebarOpen((o) => !o)} isOpen={sidebarOpen} onNavigate={onNavigate} />

      {/* Content offset by sidebar width */}
      <main className="home-content" id="work">
        <HomeBanner onNavigate={onNavigate} />

        <div className="home-chips" role="group" aria-label="Filter work">
          {CHIPS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`home-chip${filter === c.id ? ' home-chip--active' : ''}`}
              aria-pressed={filter === c.id}
              onClick={() => changeFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Matching projects sort to the top; non-matching stay below, dimmed.
            Each card carries a view-transition-name so the reorder animates. */}
        <div className="projects-grid">
          {sorted.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              dimmed={!matches(project)}
              viewName={`card-${project.id}`}
              onClick={() => onNavigate(getProjectPage(project.id))}
            />
          ))}
        </div>
      </main>

      {/* Full-width footer, z-index: 10 — slides over the fixed sidebar as it scrolls up */}
      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
