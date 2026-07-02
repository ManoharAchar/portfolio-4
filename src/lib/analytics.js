// Lazy PostHog loader — keeps the analytics library (~60KB gzip) out of the
// critical entry chunk. Events captured before the library finishes loading
// are queued and flushed in order once init completes.
let client = null
const queue = []

export function capture(event, properties) {
  if (client) client.capture(event, properties)
  else queue.push([event, properties])
}

export function initAnalytics() {
  // Headless crawlers (Bing's renderer, Teams/Outlook SafeLinks scanners)
  // execute JS from Azure datacenters and were filling session replay with
  // 30-45s ghost sessions. Automated Chrome always sets navigator.webdriver.
  if (navigator.webdriver) return
  // Don't capture localhost/dev sessions — they pollute recordings and
  // stats. Remove this guard temporarily if you need to test PostHog locally.
  if (!location.hostname.endsWith('manoharachar.design')) return

  import('posthog-js').then(({ default: posthog }) => {
    posthog.init('phc_wV2NMgi2Yzjw9uWSuFQoBZvBGhr85j6dV3WcZ6xbmjoE', {
      api_host: 'https://us.i.posthog.com',
      // Disable automatic pageview capture — this is a SPA using pushState/replaceState,
      // so we fire $pageview manually on each navigation to avoid session fragmentation.
      capture_pageview: false,
      // localStorage keeps the session ID stable across entry flows that call
      // replaceState multiple times (splash → welcome → home).
      persistence: 'localStorage',
    })
    client = posthog
    queue.forEach(([event, properties]) => posthog.capture(event, properties))
    queue.length = 0
  })
}
