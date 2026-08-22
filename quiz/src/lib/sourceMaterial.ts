// The `[!answer]- Source Material` callout on an exam study-guide page lists the
// exam's syllabus readings: one bullet per source (a [[wiki link]] to its
// Resources/Books page) with an indented bullet naming the chapters or sections
// the syllabus actually covers.
//
// The app renders that list as a gallery of resource cards — the same shelf the
// study-guide home page shows — instead of a collapsed callout, so this module
// lifts the entries out of the markdown and leaves a marker in their place for
// `WikiArticle` to swap for the gallery. The vault keeps the callout: it is what
// Obsidian renders, and `parseExamSyllabus` still reads its links.

export interface SourceMaterialEntry {
  /** Canonical page name — the last path segment of the [[target]]. */
  name: string
  /** Raw [[target]] as written, used to build the wiki route. */
  target: string
  /** Display label: the link's alias when it has one, otherwise the name. */
  label: string
  /** The reading note under the link ("Chapters 1–8, Excluding …"). */
  detail?: string
}

export const SOURCE_MATERIAL_MARKER = '%%source-material%%'

// `> [!answer]- Source Material {6 Sources}` — the `>` may carry no space, the
// fold marker may be `-`, `+` or absent, and the count tag is optional.
const CALLOUT_HEADER_RE = /^>\s*\[!(\w+)\][+-]?\s*(.*)$/

function isSourceMaterialHeader(line: string): boolean {
  const m = CALLOUT_HEADER_RE.exec(line)
  if (!m || m[1].toLowerCase() !== 'answer') return false
  const title = m[2].replace(/\{[^}]*\}/g, '').trim()
  return /^source material$/i.test(title)
}

function isCalloutHeader(line: string): boolean {
  return CALLOUT_HEADER_RE.test(line)
}

const LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/

// The vault writes Obsidian inline footnotes (`^[…]`) for the long
// excluded-sections lists. remark has no such syntax, so flatten them into
// parentheses rather than dropping the (load-bearing) content.
export function cleanReadingDetail(text: string): string {
  return text
    .replace(/\s*\^\[([^\]]*)\]/g, (_full, note: string) => ` (${note.trim()})`)
    .replace(/\|+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Pull the source-material entries out of an exam page and replace the callout
 * they came from with {@link SOURCE_MATERIAL_MARKER}. Pages without such a
 * callout come back unchanged with no entries.
 */
export function extractSourceMaterial(md: string): {
  markdown: string
  entries: SourceMaterialEntry[]
} {
  const lines = md.split('\n')
  const start = lines.findIndex(isSourceMaterialHeader)
  if (start === -1) return { markdown: md, entries: [] }

  // The block runs to the first line that leaves the blockquote or opens a
  // different callout.
  let end = start + 1
  while (end < lines.length && lines[end].startsWith('>') && !isCalloutHeader(lines[end])) end++

  const entries: SourceMaterialEntry[] = []
  const seen = new Set<string>()
  // Set while a top-level bullet was skipped (no link, or a source already
  // listed) so its indented readings don't land on the entry above it.
  let skipping = false

  for (const raw of lines.slice(start + 1, end)) {
    const body = raw.replace(/^>[ \t]?/, '')
    const bullet = /^(\s*)-\s*(.*)$/.exec(body)
    if (!bullet) continue
    const indent = bullet[1].length
    const text = bullet[2].trim()

    if (indent === 0) {
      const link = LINK_RE.exec(text)
      const target = link?.[1].trim() ?? ''
      const name = target.includes('/') ? target.split('/').pop()!.trim() : target
      skipping = !name || seen.has(name.toLowerCase())
      if (skipping) continue
      seen.add(name.toLowerCase())
      entries.push({ name, target, label: (link![2] ?? '').trim() || name })
      continue
    }

    // An indented bullet is the reading assignment for the entry above it.
    const last = entries[entries.length - 1]
    if (skipping || !last) continue
    const detail = cleanReadingDetail(text)
    if (!detail) continue
    last.detail = last.detail ? `${last.detail}; ${detail}` : detail
  }

  const markdown = [
    ...lines.slice(0, start),
    '',
    SOURCE_MATERIAL_MARKER,
    '',
    ...lines.slice(end),
  ].join('\n')

  return { markdown, entries }
}
