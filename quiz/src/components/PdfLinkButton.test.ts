// The rule this file pins: **every PDF button in the app reads its document in
// the app.** A published paper opened in a browser tab costs a candidate their
// place — mid-quiz it costs them the quiz — and the failure is invisible in a
// rendering test, because a `target="_blank"` anchor is a perfectly good link.
// So the source is the fixture, the way `OverlayPortal.test.ts` pins layering.
//
// Two halves:
//   1. every surface that offers a PDF goes through `PdfLinkButton` (or, where
//      the chip has its own shape, through `opensInReader` + `openPdfReader`);
//   2. the reader paints above every surface that can open it — otherwise the
//      button appears to do nothing, which is what made the Fact Check shelf
//      and the quiz's Question info panel settle for a tab in the first place.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function read(rel: string): string {
  return readFileSync(path.join(SRC, rel), 'utf-8')
}

/** Every surface that puts a published PDF in front of the reader. */
const PDF_SURFACES = [
  // The past-paper shelf: a sitting's examiner's report and its solutions.
  'components/PastExamBrowser.tsx',
  // The study guide's sticky header: the exam's published syllabus.
  'components/wiki/ExamSyllabusButton.tsx',
  // A resource page's metadata card: "Read PDF".
  'components/wiki/ResourceMetaCard.tsx',
  // The quiz's Question info panel: the paper this question was sat on.
  'components/QuestionInfoButton.tsx',
  // The research feed's PDF chip (flag-gated, and mostly publishers the proxy
  // doesn't serve — it still has to ask rather than assume).
  'components/research/DocumentCard.tsx',
]

describe('every PDF button reads in the app', () => {
  it.each(PDF_SURFACES)('%s opens its document in the reader', rel => {
    const src = read(rel)
    const viaButton = src.includes('PdfLinkButton')
    const viaRule = src.includes('opensInReader') && src.includes('openPdfReader')
    expect(viaButton || viaRule).toBe(true)
  })

  it('the Fact Check shelf no longer sends its sources to a tab', () => {
    // `linkOnly` was the shelf's workaround for a reader that couldn't clear
    // the sheet it was opened from. The reader can now, so the veto is gone —
    // and if it comes back, so does the tab.
    expect(read('components/FactCheckSources.tsx')).not.toContain('linkOnly')
  })
})

/** The reader's layer — a class on the panel, backed by a rule in index.css. */
function readerZ(): number {
  const src = read('components/PdfViewerPanel.tsx')
  const fromClass = Number(src.match(/pdf-viewer-aside fixed[^"]*\bz-\[(\d+)\]/)?.[1])
  const css = read('index.css')
  const block = css.match(/\.concept-popup-aside\.pdf-viewer-aside,[^{]*\{[^}]*\}/)
  const fromCss = Number(block?.[0].match(/z-index:\s*(\d+)/)?.[1])
  expect(fromClass).toBeGreaterThan(0)
  // The CSS rule is what actually applies (it outranks the popup's focus-mode
  // layer); the class is what a reader of the component sees. They must agree.
  expect(fromCss).toBe(fromClass)
  return fromClass
}

/** The z on a component's full-screen overlay root. */
function overlayZ(rel: string): number {
  const src = read(rel)
  const root = src.match(/className=\{?[`"](fixed inset-(?:0|x-0) [^`"]*)/)?.[1]
  if (!root) throw new Error(`no overlay root found in ${rel}`)
  const z = root.split(/\s+/).find(c => /^z-(\[\d+\]|\d+)$/.test(c))
  if (!z) throw new Error(`no z-index on the overlay root in ${rel}`)
  return Number(z.replace(/^z-\[?|\]$/g, ''))
}

describe('the PDF reader clears every host that can open it', () => {
  it('clears the concept popup in focus mode', () => {
    const css = read('index.css')
    const focus = Number(
      css
        .match(/\.concept-popup-aside\[data-focus="true"\]\s*\{[^}]*\}/)?.[0]
        .match(/z-index:\s*(\d+)/)?.[1],
    )
    expect(readerZ()).toBeGreaterThan(focus)
  })

  it('clears the record sheets that carry a PDF button', () => {
    // The Fact Check sheet's "Checked against" shelf, and the quiz's Question
    // info panel. Both sit well above the popup stack because a collect dialog
    // can open them, so the reader has to sit above *them*.
    expect(readerZ()).toBeGreaterThan(overlayZ('components/FactCheckBadge.tsx'))
    expect(readerZ()).toBeGreaterThan(overlayZ('components/QuestionInfoButton.tsx'))
  })

  it('stays below the onboarding tour, which spotlights things inside it', () => {
    // `.onboarding-spotlight` (z-index 141) must stay on top of everything;
    // see docs/style-guide.md §8.2.
    const spotlight = Number(
      read('index.css')
        .match(/\.onboarding-spotlight\s*\{[^}]*\}/)?.[0]
        .match(/z-index:\s*(\d+)/)?.[1],
    )
    expect(readerZ()).toBeLessThan(spotlight)
  })
})

describe('one reader, mounted once', () => {
  it('is hosted at the app root rather than inside whatever opened it', () => {
    // A panel rendered inside its opener is pinned to that opener's stacking
    // context and unmounts with it. Both failures read as "the button did
    // nothing", so the host lives in App.
    expect(read('App.tsx')).toContain('<PdfReaderHost />')
  })

  it('is the only place the panel is drawn', () => {
    const hosts = PDF_SURFACES.filter(rel => read(rel).includes('<PdfViewerPanel'))
    expect(hosts).toEqual([])
  })
})
