// A PDF's chapters: the bookmarks a document carries, turned into the marks the
// page scrubber draws its segments from (`lib/navScrub.ts`).
//
// The source is the document's own **outline** — the tree a reader sees in a
// viewer's sidebar, which the examining bodies' reports carry a question at a
// time ("Question 14", "Question 15"…) because they are produced from Word.
// Nothing here guesses: a document with no outline gets no chapters and a plain
// bar, because evenly spaced fictions would read as the paper's real structure
// and send a candidate to the wrong page. Same rule as the pass-rate table and
// the examiner's-report links — transcribed, never constructed.
//
// Pure. The part that needs the document itself — resolving a bookmark's
// destination to a page number — is `hooks/usePdfChapters.ts`; everything that
// can be decided from the values alone is decided here.

/** One named stretch of a document, as the scrubber wants it. */
export interface PdfChapter {
  /** The bookmark's text, cleaned up but never rewritten. */
  title: string
  /** 1-indexed page the stretch begins on. */
  startPage: number
}

/** The parts of a pdf.js outline node this module uses. */
export interface PdfOutlineNode {
  title?: string
  dest?: string | unknown[] | null
  items?: PdfOutlineNode[]
}

/** An outline node once its destination has been resolved to a page. */
export interface ResolvedOutlineNode {
  title?: string
  /** 1-indexed, or null when the bookmark pointed nowhere we could follow. */
  page: number | null
}

/**
 * Which level of the outline is the chapter list.
 *
 * Normally the top one. But plenty of documents hang their whole body off a
 * single root bookmark — the paper's own title, an "Exam 5" wrapper — and one
 * chapter covering everything is no chapters at all. So descend while the level
 * is a single node with children, and use the first level that actually
 * branches. Only that level is used: the bookmarks under a question are its
 * parts, and a bar cut into parts is a hatched strip.
 */
export function chapterOutlineLevel(nodes: PdfOutlineNode[] | null | undefined): PdfOutlineNode[] {
  let level = Array.isArray(nodes) ? nodes : []
  // Bounded, because an outline is a tree out of an untrusted file and a cycle
  // in one would otherwise spin here rather than fail.
  for (let depth = 0; depth < 8; depth++) {
    if (level.length !== 1) break
    const children = level[0]?.items
    if (!Array.isArray(children) || children.length === 0) break
    level = children
  }
  return level
}

/**
 * A bookmark's text, fit for one line of a bar's bubble.
 *
 * Outline titles carry the line breaks and runs of spaces of whatever produced
 * them, and a soft hyphen or a stray BOM in the middle of one is common enough
 * to be worth removing. The words themselves are left exactly as the document
 * has them — this is the publisher's name for the section, not ours.
 */
export function cleanChapterTitle(title: unknown): string {
  if (typeof title !== 'string') return ''
  return title
    // A control character stands where a space belongs — a bookmark broken over
    // two lines is "Question 7\n(continued)" — so those become one, while the
    // invisible marks below stand for nothing and are removed outright.
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/[\u00AD\u200B-\u200F\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * The page a *resolved* destination array names, when it names one outright.
 *
 * A destination's first element is normally a reference to the page object,
 * which only the document can turn into a number (`getPageIndex`) — that is the
 * hook's half. Some documents instead write the page index directly, and those
 * are settled here. Returns a 1-indexed page, or null for anything else.
 */
export function destPageNumber(dest: unknown): number | null {
  if (!Array.isArray(dest) || dest.length === 0) return null
  const first = dest[0]
  if (typeof first !== 'number' || !Number.isFinite(first) || first < 0) return null
  return Math.floor(first) + 1
}

/**
 * The chapter list, from resolved outline nodes.
 *
 * Bookmarks arrive in the document's own order, which is usually but not always
 * the page order, and any of them can point off the end of the document or
 * nowhere at all. One whose destination didn't resolve is dropped rather than
 * guessed at, and so is an untitled one: an unnamed segment tells a reader only
 * that *something* changes there, which is worse than not cutting the bar.
 *
 * Two bookmarks on one page collapse to the first — the bar's finest grain is a
 * page, and the first is the one that page belongs to.
 */
export function buildChapters(nodes: ResolvedOutlineNode[], pageCount: number): PdfChapter[] {
  if (!Number.isFinite(pageCount) || pageCount < 1) return []

  const seen = new Set<number>()
  const chapters: PdfChapter[] = []
  for (const node of nodes) {
    const title = cleanChapterTitle(node?.title)
    const page = node?.page
    if (!title || typeof page !== 'number' || !Number.isFinite(page)) continue
    const startPage = Math.min(pageCount, Math.max(1, Math.round(page)))
    if (seen.has(startPage)) continue
    seen.add(startPage)
    chapters.push({ title, startPage })
  }
  return chapters.sort((a, b) => a.startPage - b.startPage)
}

/**
 * The chapter a page is in — the last one that starts at or before it, so the
 * front matter before the first bookmark is in none.
 */
export function chapterAt(chapters: PdfChapter[], page: number): PdfChapter | null {
  if (!Number.isFinite(page)) return null
  let found: PdfChapter | null = null
  for (const chapter of chapters) {
    if (chapter.startPage > page) break
    found = chapter
  }
  return found
}
