/**
 * The collapsed preview of a question stem — the few lines a search result
 * shows before it is expanded.
 *
 * A stem is prose wrapped around data: a bulleted list of given figures, a
 * development triangle, an exhibit image. Six words of it ("Given the
 * following information: …") name the *shape* of the question and nothing
 * about which question it is, so the preview runs to a few lines instead.
 *
 * What it leaves out is the point. A markdown table flattened into one line is
 * noise — pipes, separators and bare numbers — so the tables and images are
 * dropped and their captions kept, which is the part that says what the data
 * is. Anything dropped or cut is marked with an ellipsis: the preview never
 * reads as the whole stem.
 *
 * The result is plain prose with markdown emphasis removed, so a surface can
 * cut it at a search match and wrap that in a `<mark>`. Escapes (`\$480`) and
 * math (`$X$`) are left as authored — the vault's own spelling — for the
 * markdown renderer to typeset.
 */

/** Roughly three lines at a search row's width. */
export const STEM_PREVIEW_CHARS = 320

/** How much of the run-up to a search match a snippet keeps in front of it. */
const SNIPPET_LEAD_CHARS = 60

interface FlatStem {
  text: string
  /** True when a table, an image or a fenced block was left out. */
  omitted: boolean
}

/** A table row — two or more cells, so a lone pipe in prose isn't one. */
function isTableRow(line: string): boolean {
  return line.includes('|') && line.split('|').length > 2
}

/** An image line: a markdown embed (`![alt](src)`) or an Obsidian one (`![[…]]`). */
function isImageLine(line: string): boolean {
  return line.startsWith('![')
}

/** Strips the markup that only means something in a block layout. */
function readableLine(line: string): string {
  return line
    // blockquote and heading markers
    .replace(/^\s*>+\s*/, '')
    .replace(/^#{1,6}\s+/, '')
    // list markers become bullets: flattened into a sentence, "- " reads as a
    // dash mid-line, where "•" still reads as a list
    .replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '• ')
    // bold/italic wrappers, which would otherwise show as literal asterisks
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .trim()
}

function flattenStem(stem: string): FlatStem {
  const parts: string[] = []
  let omitted = false
  let fenced = false

  for (const raw of stem.split('\n')) {
    const line = raw.trim()
    if (line.startsWith('```')) {
      fenced = !fenced
      omitted = true
      continue
    }
    if (fenced) continue
    if (!line) continue
    if (isTableRow(line) || isImageLine(line)) {
      omitted = true
      continue
    }
    const readable = readableLine(line)
    if (readable) parts.push(readable)
  }

  return { text: parts.join(' ').replace(/\s+/g, ' ').trim(), omitted }
}

/**
 * "…" continues a cut sentence, so it sits tight against the last word — but
 * after a full stop or a colon it needs the space, or it reads as "year....".
 */
function withEllipsis(text: string): string {
  return /[.!?:;,]$/.test(text) ? `${text} …` : `${text}…`
}

/** Cuts at the last word boundary inside `maxChars`, ellipsis appended. */
function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text
  const cut = text.slice(0, maxChars)
  const lastSpace = cut.lastIndexOf(' ')
  const kept = lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  return withEllipsis(kept.replace(/[\s•]+$/, ''))
}

/** The word boundary at or before `index`, so a snippet starts on a word. */
function wordStart(text: string, index: number): number {
  if (index <= 0) return 0
  const space = text.lastIndexOf(' ', index)
  return space < 0 ? 0 : space + 1
}

/** The stem's opening, flattened to a few lines of readable prose. */
export function stemPreview(stem: string, maxChars: number = STEM_PREVIEW_CHARS): string {
  const { text, omitted } = flattenStem(stem)
  const cut = truncate(text, maxChars)
  if (cut !== text) return cut
  return omitted && text ? withEllipsis(text) : text
}

/**
 * The same preview, but windowed onto a search match that falls past it — so
 * searching for a term buried in the third sentence shows that sentence rather
 * than an opening the term isn't in.
 */
export function stemSnippet(
  stem: string,
  query: string,
  maxChars: number = STEM_PREVIEW_CHARS,
): string {
  const needle = query.trim()
  if (!needle) return stemPreview(stem, maxChars)

  const { text, omitted } = flattenStem(stem)
  const idx = text.toLowerCase().indexOf(needle.toLowerCase())
  // No match in the prose (it may sit in a dropped table), or a match the
  // ordinary preview already reaches: nothing to window.
  if (idx < 0 || idx + needle.length <= maxChars) return stemPreview(stem, maxChars)

  const start = wordStart(text, Math.max(0, idx - SNIPPET_LEAD_CHARS))
  const tail = text.slice(start)
  const cut = truncate(tail, maxChars)
  return `…${cut === tail && omitted ? withEllipsis(tail) : cut}`
}

/**
 * The preview for a whole question — its stem, or, when the stem is empty, the
 * first part that has a prompt of its own.
 *
 * A multi-part CAS question often has no shared preamble at all: every word of
 * it lives in "Part a", "Part b"… Previewing the stem alone leaves those rows
 * blank, which is the one thing a search result must never be.
 */
export function questionPreview(
  question: {
    stem: string
    parts?: { label: string; stem: string }[]
  },
  query: string = '',
  maxChars: number = STEM_PREVIEW_CHARS,
): string {
  const own = stemSnippet(question.stem, query, maxChars)
  if (own) return own
  for (const part of question.parts ?? []) {
    const text = stemSnippet(part.stem, query, maxChars)
    if (text) return `${part.label}) ${text}`
  }
  return ''
}
