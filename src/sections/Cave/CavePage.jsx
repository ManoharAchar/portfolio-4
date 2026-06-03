import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../../components/Footer/Footer'
import './CavePage.css'

export default function CavePage({ activePage = 'cave', onNavigate, guest, showPassCard }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="cave-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        guest={guest}
        showPassCard={showPassCard}
      />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>

      <main className="cave-content">
        <div className="cave-coming-soon">
          <span className="cave-coming-soon__label">Coming Soon</span>
        </div>
      </main>

      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
