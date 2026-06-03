import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import App from './App.jsx'

posthog.init('phc_wV2NMgi2Yzjw9uWSuFQoBZvBGhr85j6dV3WcZ6xbmjoE', {
  api_host: 'https://us.i.posthog.com',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
