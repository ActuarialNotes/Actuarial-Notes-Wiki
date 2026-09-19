import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderToStaticMarkup } from 'react-dom/server'
import { QuizSettingsMenu } from './QuizSettingsMenu'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function read(rel: string): string {
  return readFileSync(path.join(SRC, rel), 'utf-8')
}

describe('QuizSettingsMenu trigger', () => {
  it('renders a named, collapsed button and nothing of the menu until it is opened', () => {
    const html = renderToStaticMarkup(
      <QuizSettingsMenu
        countOptions={[{ value: '3', label: '3' }]}
        countValue="3"
        onCountChange={() => {}}
        reveal="during"
        onRevealChange={() => {}}
      />,
    )
    // Icon-only, so the name has to come from the label.
    expect(html).toContain('aria-label="Quiz settings"')
    expect(html).toContain('aria-expanded="false"')
    expect(html).not.toContain('Show answers after each question')
  })
})

describe('QuizSettingsMenu layering', () => {
  // The trigger lives in the quiz builder's action bar — `fixed … z-20`, under
  // the bottom nav. A menu rendered inside that bar is pinned to its layer
  // however high its own z-index, so it opens *behind* the nav; and being
  // `fixed` inside a clipped, bottom-anchored strip it has nowhere to grow.
  // Portalling to the body is the fix, and the only way this menu is reachable
  // on a phone at all.
  const src = read('components/QuizSettingsMenu.tsx')

  it('portals the menu to the body', () => {
    expect(src).toContain('OverlayPortal')
  })

  it('sits in the action-menu band of the layer map, above the bottom nav', () => {
    const z = Number(src.match(/z-\[(\d+)\]/)?.[1])
    expect(z).toBeGreaterThanOrEqual(55)
    expect(z).toBeLessThanOrEqual(70)
  })

  it('is placed against its trigger rather than at a fixed offset', () => {
    // `placeMenu` owns the one rule that matters: the menu is never off
    // screen. Opening near the bottom of the viewport, it flips above the
    // trigger instead of running past the fold.
    expect(src).toContain('placeMenu')
  })
})
