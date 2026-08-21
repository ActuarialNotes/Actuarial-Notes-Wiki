import { describe, it, expect } from 'vitest'
import { readdirSync, existsSync } from 'fs'
import path from 'path'
import { PDFJS_ASSET_DIRS, pdfjsAssetUrl } from './pdfjsAssets'

const PDFJS_DIST = path.resolve(__dirname, '../../node_modules/pdfjs-dist')

describe('pdfjsAssetUrl', () => {
  it('ends every URL in a slash, which pdf.js requires', () => {
    // `getFactoryUrlProp` throws `Invalid factory url` on one without it, so a
    // missing slash is a document that won't open rather than one that renders
    // oddly.
    for (const prefix of Object.values(PDFJS_ASSET_DIRS)) {
      expect(pdfjsAssetUrl('/', prefix)).toMatch(/\/$/)
      expect(pdfjsAssetUrl('/quiz/', prefix)).toBe(`/quiz/${prefix}/`)
    }
  })

  it('survives a base URL served without a trailing slash', () => {
    expect(pdfjsAssetUrl('/quiz', 'pdf-wasm')).toBe('/quiz/pdf-wasm/')
  })

  it('gives each directory its own path', () => {
    const prefixes = Object.values(PDFJS_ASSET_DIRS)
    expect(new Set(prefixes).size).toBe(prefixes.length)
  })
})

describe('the directories pdf.js is served from', () => {
  // These names are pdfjs-dist's, not ours: an upgrade that renames or drops
  // one would leave the viewer fetching 404s, and pdf.js answers that by
  // warning to the console and drawing the rest of the page. Nothing else in
  // the suite would notice.
  it.each(Object.keys(PDFJS_ASSET_DIRS))('pdfjs-dist still ships %s', dir => {
    const full = path.join(PDFJS_DIST, dir)
    expect(existsSync(full), `${dir} is missing from pdfjs-dist`).toBe(true)
    expect(readdirSync(full).length).toBeGreaterThan(0)
  })

  it('ships the image codecs a scanned page needs', () => {
    // CCITT fax and JBIG2 — the compression every bitonal scan uses, and so
    // every photocopied page in the older papers — decode through this module.
    // Without it the image resolves to null and the page's ink never lands.
    const wasm = readdirSync(path.join(PDFJS_DIST, 'wasm'))
    expect(wasm).toContain('jbig2.wasm')
    expect(wasm).toContain('jbig2_nowasm_fallback.js')
    expect(wasm).toContain('openjpeg.wasm')
  })
})
