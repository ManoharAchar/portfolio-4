import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import App from './App.jsx'

posthog.init('phc_wV2NMgi2Yzjw9uWSuFQoBZvBGhr85j6dV3WcZ6xbmjoE', {
  api_host: 'https://us.i.posthog.com',
  // Disable automatic pageview capture — this is a SPA using pushState/replaceState,
  // so we fire $pageview manually on each navigation to avoid session fragmentation.
  capture_pageview: false,
  // localStorage keeps the session ID stable across entry flows that call
  // replaceState multiple times (splash → welcome → home).
  persistence: 'localStorage',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
