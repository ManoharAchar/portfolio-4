import { Component } from 'react'

const CHUNK_ERROR_PATTERN = /fetch dynamically imported module|error loading dynamically imported module|unable to preload css/i
const RELOAD_FLAG = 'chunk-error-reload'

// After a deploy, tabs left open reference stale asset hashes that 404 once
// the new build replaces them. Reload once to pick up the fresh index.html;
// guard with sessionStorage so a genuinely broken chunk doesn't reload-loop.
class ChunkErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError(error) {
    if (CHUNK_ERROR_PATTERN.test(error?.message ?? '')) {
      return { failed: true }
    }
    throw error
  }

  componentDidCatch() {
    if (sessionStorage.getItem(RELOAD_FLAG)) {
      this.setState({ alreadyReloaded: true })
      return
    }
    sessionStorage.setItem(RELOAD_FLAG, '1')
    window.location.reload()
  }

  render() {
    if (!this.state.failed) return this.props.children
    if (this.state.alreadyReloaded) {
      return (
        <p style={{ padding: '2rem', textAlign: 'center' }}>
          Something didn't load right.{' '}
          <a href={window.location.pathname}>Refresh the page</a>.
        </p>
      )
    }
    return null
  }
}

export default ChunkErrorBoundary
