import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Footer from '../../components/Footer/Footer'
import { PROJECTS } from '../../data/projects'
import './HomePage.css'

const leftProjects = PROJECTS.filter((p) => p.column === 'left')
const rightProjects = PROJECTS.filter((p) => p.column === 'right')

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
      />

      {/* Overlay — visible on small screens when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Toggle button — hidden on large screens */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Content offset by sidebar width */}
      <main className="home-content" id="work">
        <div className="projects-grid">
          <div className="projects-col projects-col--left">
            {leftProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onClick={
                  project.id === 'cooperant' ? () => onNavigate('cooperant') :
                  project.id === 'black-baza' ? () => onNavigate('black-bazaar') :
                  undefined
                }
              />
            ))}
          </div>
          <div className="projects-col projects-col--right">
            {rightProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onClick={project.id === 'senior-mode' ? () => onNavigate('senior-mode') : undefined}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Full-width footer, z-index: 10 — slides over the fixed sidebar as it scrolls up */}
      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
