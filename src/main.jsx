import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initAnalytics } from './lib/analytics'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Load PostHog off the critical path, after first paint. Events fired before
// it loads are queued by lib/analytics and flushed on init.
if ('requestIdleCallback' in window) {
  requestIdleCallback(initAnalytics, { timeout: 2000 })
} else {
  setTimeout(initAnalytics, 1500)
}
