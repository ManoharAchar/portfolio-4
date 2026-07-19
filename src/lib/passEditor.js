import { createContext, useContext } from 'react'

// The 8 selectable pass accents (name + hex). The first four match the
// intent defaults; the last four are new. All read against #120b06 ink.
export const PASS_ACCENTS = [
  { hex: '#798c6d', name: 'Sage' },
  { hex: '#64818c', name: 'Slate' },
  { hex: '#c87a5a', name: 'Terracotta' },
  { hex: '#c4a24d', name: 'Gold' },
  { hex: '#b0b082', name: 'Olive' },
  { hex: '#8882b0', name: 'Lavender' },
  { hex: '#829eb0', name: 'Steel' },
  { hex: '#b08288', name: 'Rose' },
]

// App-level provider exposes the editor opener + the sidebar-thumb pop flag,
// so the sidebar (any page) and the Guest Archive card can open the editor
// without threading props through every page.
export const PassEditorContext = createContext({
  openPassEditor: () => {},
  thumbPop: false,
})

export const usePassEditor = () => useContext(PassEditorContext)
