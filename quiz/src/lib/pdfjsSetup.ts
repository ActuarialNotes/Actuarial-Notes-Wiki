import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'

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
 * Where the Standard 14 font programs live (Helvetica, Times, Courier…). A PDF
 * that names those fonts without embedding them — routine for anything produced
 * from Word, which is most of what the examining bodies publish — renders as
 * blanks without them. `vite.config.ts` copies the directory out of pdfjs-dist
 * and serves it from here.
 */
export const STANDARD_FONT_DATA_URL = `${import.meta.env.BASE_URL}pdf-standard-fonts/`

export { pdfjs }
