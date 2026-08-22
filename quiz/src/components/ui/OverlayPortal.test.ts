// Layering test: an overlay that can be opened from more than one host must
// portal to the body, and must sit above every host that can open it.
//
// A `z-index` only orders an element inside its nearest stacking context, so an
// overlay rendered *within* the concept popup (z-40, z-56 in focus mode), the
// add-flashcards sheet (z-[64]) or the collect dialog (z-[120]) is pinned to
// that host's layer however high its own value is — it opens behind the
// floating search bar, the bottom nav, or the dialog that opened it. A
// transformed ancestor (the flashcard's swipe transform) is worse still: it
// makes `position: fixed` resolve against the card, so the overlay lands glued
// to it rather than covering the screen. Both failures look like a modal that
// half-appeared, which is not something a rendering test would catch, so the
// source is the fixture.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function read(rel: string): string {
  return readFileSync(path.join(SRC, rel), 'utf-8')
}

/** The z on the component's full-screen overlay root. */
function overlayZ(rel: string): number {
  const src = read(rel)
  const root = src.match(/className=\{?[`"](fixed inset-(?:0|x-0) [^`"]*)/)?.[1]
  if (!root) throw new Error(`no overlay root found in ${rel}`)
  const z = root.split(/\s+/).find(c => /^z-(\[\d+\]|\d+)$/.test(c))
  if (!z) throw new Error(`no z-index on the overlay root in ${rel}`)
  return Number(z.replace(/^z-\[?|\]$/g, ''))
}

/** The focus-mode concept popup's layer, which lives in CSS rather than a class. */
function focusPopupZ(): number {
  const css = read('index.css')
  const block = css.match(/\.concept-popup-aside\[data-focus="true"\]\s*\{[^}]*\}/)
  const z = block?.[0].match(/z-index:\s*(\d+)/)
  if (!z) throw new Error('no z-index on .concept-popup-aside[data-focus="true"]')
  return Number(z[1])
}

// Every overlay reachable from more than one host, and the layer it must clear.
const SHARED_OVERLAYS = [
  'components/wiki/ImageGalleryModal.tsx',
  'components/wiki/ConceptQuestionsModal.tsx',
  'components/wiki/LearningProgressModal.tsx',
  'components/wiki/ChooseSyllabusModal.tsx',
  'components/ConceptReadModal.tsx',
  'components/ConceptDetailModal.tsx',
  'components/StudyPlanConfigModal.tsx',
  'components/KeyboardShortcutsHelp.tsx',
]

describe('shared overlays', () => {
  it.each(SHARED_OVERLAYS)('%s portals to the body', rel => {
    const src = read(rel)
    const portalled = src.includes('OverlayPortal') || src.includes('createPortal')
    expect(portalled).toBe(true)
  })

  it('the image gallery clears the popup that hosts it and the search bar over it', () => {
    const gallery = overlayZ('components/wiki/ImageGalleryModal.tsx')
    // The concept popup opens it: docked at z-40, z-56 in focus mode.
    expect(gallery).toBeGreaterThan(focusPopupZ())
    // The wiki/quiz floating search bar (z-50) paints over that host.
    expect(gallery).toBeGreaterThan(50)
  })

  it('the concept detail modals clear the collect dialog that opens them', () => {
    // CollectConceptModal's own scrim; the modals it opens must sit over it.
    const collect = overlayZ('components/collect/CollectConceptModal.tsx')
    for (const rel of [
      'components/wiki/ConceptQuestionsModal.tsx',
      'components/ConceptReadModal.tsx',
    ]) {
      expect(overlayZ(rel)).toBeGreaterThan(collect)
    }
  })

  it('the floating search backdrop dims the concept popup under it', () => {
    // The popup is z-40; a tied backdrop left it bright under the dropdown.
    for (const rel of [
      'components/wiki/WikiFloatingSearch.tsx',
      'components/QuizFloatingSearch.tsx',
    ]) {
      expect(overlayZ(rel)).toBeGreaterThan(40)
    }
  })
})
