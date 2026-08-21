import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'
import { PDFJS_ASSET_DIRS, pdfjsAssetUrl } from './pdfjsAssets'

// pdf.js, wired up once and kept out of the main bundle.
//
// This module is only ever reached through a dynamic import (see
// `hooks/usePdfDocument.ts`), so the library and its worker are fetched the
// first time somebody opens a paper and never by anyone who doesn't.
//
// Why the app renders PDFs itself rather than framing them: a browser's own
// viewer isn't a given. Chrome on Android has none, and neither do the headless
// browsers the e2e suite runs — an embedded PDF is a blank rectangle there,
// with no event to tell the page it failed. Drawing the pages means the panel
// looks and behaves the same everywhere, and that "expand" and "download" are
// ours rather than a plugin's.

// The **legacy** build, deliberately: the modern one calls
// `Map.prototype.getOrInsertComputed`, a proposal only the newest browsers ship
// — everything else throws on the first page render, which is exactly the kind
// of failure a candidate on a two-year-old phone would hit and we would never
// see. The legacy bundle carries the polyfills for it.
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

/**
 * The asset directories pdf.js fetches from at run time.
 *
 * pdf.js keeps a good deal of itself outside its bundle and asks the caller
 * where to find it. Each of these is a URL it is given at `getDocument` time
 * (see `hooks/usePdfDocument.ts`), served by `pdfjsAssetsPlugin` in
 * `vite.config.ts` out of pdfjs-dist — the two halves have to agree, and the
 * trailing slash is required: pdf.js throws `Invalid factory url` without it.
 *
 * Leaving any of them unset does not fail loudly. The library warns to the
 * console and carries on drawing the rest of the page, so the symptom is a
 * document that renders *almost* right — which is much harder to recognise
 * than one that doesn't render at all.
 */

/**
 * The Standard 14 font programs (Helvetica, Times, Courier…). A PDF that names
 * those fonts without embedding them — routine for anything produced from
 * Word, which is most of what the examining bodies publish — renders as blanks
 * without them.
 */
export const STANDARD_FONT_DATA_URL = pdfjsAssetUrl(import.meta.env.BASE_URL, PDFJS_ASSET_DIRS.standard_fonts)

/**
 * The image codecs, compiled to WebAssembly (with JS fallbacks beside them).
 *
 * This is the one that matters most for these documents: **CCITT fax and
 * JBIG2 decoding live here**, and those are how a bitonal scan is stored. The
 * older CAS papers are photocopies — the page is one big fax-compressed image
 * — so without this URL `JBig2CCITTFaxImage.decode` throws "JBig2 failed to
 * initialize", the image resolves to null, and the page's ink is never
 * painted. What's left is whatever else that page happened to draw, which is
 * why the failure looks like a haunting rather than a blank: ghost text from a
 * background layer, a few crisp fragments, and a lot of missing paper.
 * JPEG 2000 (openjpeg) and colour management (qcms) are here too.
 */
export const WASM_URL = pdfjsAssetUrl(import.meta.env.BASE_URL, PDFJS_ASSET_DIRS.wasm)

/** Character maps, for CID-keyed fonts that name a predefined encoding. */
export const CMAP_URL = pdfjsAssetUrl(import.meta.env.BASE_URL, PDFJS_ASSET_DIRS.cmaps)

/** The fallback ICC profile, for documents that rely on colour management. */
export const ICC_URL = pdfjsAssetUrl(import.meta.env.BASE_URL, PDFJS_ASSET_DIRS.iccs)

export { pdfjs }
