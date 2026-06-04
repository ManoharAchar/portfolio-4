import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Footer from '../../components/Footer/Footer'
import { PROJECTS } from '../../data/projects'
import './HomePage.css'

const PROJECT_CLICKS = {
  cooperant:    (nav) => nav('cooperant'),
  'black-baza': (nav) => nav('black-bazaar'),
  'senior-mode':(nav) => nav('senior-mode'),
}

export default function HomePage({ activePage = 'home', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      <MobileTopBar onToggle={() => setSidebarOpen((o) => !o)} isOpen={sidebarOpen} />

      {/* Content offset by sidebar width */}
      <main className="home-content" id="work">
        {/* All projects in document order so mobile stacks 01→02→03→04.
            CSS Grid places each slot in the correct column on desktop. */}
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`project-card-slot project-card-slot--${project.column}`}
            >
              <ProjectCard
                {...project}
                onClick={PROJECT_CLICKS[project.id] ? () => PROJECT_CLICKS[project.id](onNavigate) : undefined}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Full-width footer, z-index: 10 — slides over the fixed sidebar as it scrolls up */}
      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
