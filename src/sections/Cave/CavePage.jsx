import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar'
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
        onClose={() => setSidebarOpen(false)}
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
      <MobileTopBar onToggle={() => setSidebarOpen((o) => !o)} isOpen={sidebarOpen} />

      <main className="cave-content">
        <div className="cave-coming-soon">
          <span className="cave-coming-soon__label">Coming Soon</span>
        </div>
      </main>

      <Footer activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
