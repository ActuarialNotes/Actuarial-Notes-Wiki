// Where pdf.js's run-time assets come from, named once for both halves of the
// arrangement: `vite.config.ts` serves these directories out of pdfjs-dist,
// and `lib/pdfjsSetup.ts` turns them into the URLs handed to `getDocument`.
//
// They are together in one file because the failure mode when they disagree is
// invisible. pdf.js doesn't error on an asset URL it can't fetch — it warns to
// the console and draws the rest of the page — so a renamed directory or a
// mistyped prefix surfaces as a document that renders *almost* right, which is
// far harder to trace than one that doesn't render at all.

/** Directory inside `pdfjs-dist` → the path prefix it is served from. */
export const PDFJS_ASSET_DIRS = {
  /**
   * The Standard 14 font programs. A PDF that names Helvetica/Times/Courier
   * without embedding it — routine for anything produced from Word, which is
   * most of what the examining bodies publish — renders blank text without
   * these.
   */
  standard_fonts: 'pdf-standard-fonts',
  /**
   * The image codecs, compiled to WebAssembly. **CCITT fax and JBIG2 are
   * here**, which is to say every bitonal scan: the older CAS papers are
   * photocopies whose ink is one fax-compressed image. Without this,
   * `JBig2CCITTFaxImage.decode` throws "JBig2 failed to initialize", the image
   * resolves to null and the page's ink is never painted — leaving whatever
   * else that page drew, which is why the failure looks like a haunting rather
   * than a blank page. JPEG 2000 and colour management live here too.
   */
  wasm: 'pdf-wasm',
  /** Character maps, for CID-keyed fonts naming a predefined encoding. */
  cmaps: 'pdf-cmaps',
  /** The fallback ICC profile, for documents relying on colour management. */
  iccs: 'pdf-iccs',
} as const

/**
 * The URL a served directory is reached at.
 *
 * The trailing slash is not cosmetic: pdf.js validates these and throws
 * `Invalid factory url` on one without it.
 */
export function pdfjsAssetUrl(baseUrl: string, prefix: string): string {
  return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${prefix}/`
}
