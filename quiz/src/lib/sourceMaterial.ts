// The `[!answer]- Source Material` callout on an exam study-guide page lists the
// exam's syllabus readings: one bullet per source (a [[wiki link]] to its
// Resources/Books page) with an indented bullet naming the chapters or sections
// the syllabus actually covers.
//
// The app renders that list as a gallery of resource cards — the same shelf the
// Study Guides tab's Resources page shows — instead of a collapsed callout, so this module
// lifts the entries out of the markdown and leaves a marker in their place for
// `WikiArticle` to swap for the gallery. The vault keeps the callout: it is what
// Obsidian renders, and `parseExamSyllabus` still reads its links.
//
// A reading assignment usually opens with the learning objectives the source
// is read for — `A1, C1-C5`, `B1–B3 (Chapter 7)` — so the shelf can be
// filtered by objective: `readingObjectives` reads those codes, and
// `parseSyllabusObjectives` names them from the page's own `[!example]`
// callouts. Nothing is inferred either way: a reading that opens with no codes
// is under no objective, and a code the page doesn't number is offered bare.

import { splitWeightTag } from './examWeight'

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

/** `[[Target|Shown]]` → `Shown`, `[[Folder/Target]]` → `Target`. */
function flattenWikiLinks(text: string): string {
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_full, target: string, shown?: string) =>
    (shown ?? target.split('/').pop() ?? target).trim(),
  )
}

// The vault writes Obsidian inline footnotes (`^[…]`) for the long
// excluded-sections lists. remark has no such syntax, so flatten them into
// parentheses rather than dropping the (load-bearing) content.
//
// A note can name another source (`A1 — replaced by [[CFAI]] for Fall 2026`);
// the card prints text, so a wiki link is cut down to what it displays.
export function cleanReadingDetail(text: string): string {
  return flattenWikiLinks(text)
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

// ---------------------------------------------------------------------------
// Learning objectives
// ---------------------------------------------------------------------------

/** One numbered learning objective of an exam page — `A1`, `C5`. */
export interface SyllabusObjective {
  /** The section letter and the item's number, as the readings cite it. */
  code: string
  /** The section's letter — `A`. */
  section: string
  /** The section's callout title, weight tag split off — "A. Regulation of …". */
  sectionTitle: string
  /** The objective's own words with the wiki links flattened, up to its examples. */
  summary: string
}

const OBJECTIVE_HEADER_RE = /^>\s*\[!example\][-+]?\s*(.*)$/i
const SECTION_TITLE_RE = /^([A-Z])\.\s+\S/
const OBJECTIVE_ITEM_RE = /^>\s*(\d+)\.\s+(.*)$/

/**
 * The objective's statement without the list of examples a syllabus hangs off
 * it — "Discuss the current state of Insurance Regulation in Canada" rather than
 * the forty concepts after the dash. The cut is at the first bracket, dash or
 * semicolon, which is where the syllabi's examples begin.
 */
function objectiveSummary(text: string): string {
  const flat = flattenWikiLinks(text).replace(/\s+/g, ' ').trim()
  const cut = flat.search(/\s\(|\s[—–]\s|;/)
  return (cut > 0 ? flat.slice(0, cut) : flat).replace(/[.,\s]+$/, '')
}

/**
 * The numbered learning objectives of an exam page, in page order. A section
 * is a `> [!example]- A. Title {weight}` callout and an objective a numbered
 * item inside it, coded by the section's letter and the item's own number —
 * so a page that numbers each section from 1 (6C: A1–A3, B1–B3, C1–C5) and one
 * that numbers straight through (Exam 5: A1–A17, B18–B42) both come out as the
 * readings cite them. A callout with no letter numbers nothing.
 */
export function parseSyllabusObjectives(md: string): SyllabusObjective[] {
  const objectives: SyllabusObjective[] = []
  const seen = new Set<string>()
  let section: { letter: string; title: string } | null = null

  for (const line of md.split('\n')) {
    const header = OBJECTIVE_HEADER_RE.exec(line)
    if (header) {
      const title = splitWeightTag(header[1].trim()).title
      const letter = SECTION_TITLE_RE.exec(title)?.[1]
      section = letter ? { letter, title } : null
      continue
    }
    if (!section) continue
    if (!line.startsWith('>')) {
      // A blank line between callouts ends nothing; prose or a heading does.
      if (line.trim() !== '') section = null
      continue
    }
    const item = OBJECTIVE_ITEM_RE.exec(line)
    if (!item) continue
    const code = `${section.letter}${Number(item[1])}`
    if (seen.has(code)) continue
    seen.add(code)
    objectives.push({
      code,
      section: section.letter,
      sectionTitle: section.title,
      summary: objectiveSummary(item[2]),
    })
  }
  return objectives
}

// `C1`, `C1-C5`, `A1–15` — one code or a run of them, never a bare number
// (`Chapters 1–7` and The Institutes' `1–10` are chapters, not objectives).
const CODE_RUN = String.raw`[A-Z]\d+(?:\s*[-–]\s*[A-Z]?\d+)?(?![\w.])`
const LEADING_CODES_RE = new RegExp(String.raw`^\s*(${CODE_RUN}(?:\s*,\s*${CODE_RUN})*)`)
const RUN_RE = /^([A-Z])(\d+)(?:\s*[-–]\s*([A-Z])?(\d+))?$/

function objectiveSortKey(code: string): [string, number] {
  return [code[0], Number(code.slice(1))]
}

function compareCodes(a: string, b: string): number {
  const [la, na] = objectiveSortKey(a)
  const [lb, nb] = objectiveSortKey(b)
  return la === lb ? na - nb : la < lb ? -1 : 1
}

/**
 * The learning objectives a reading assignment is read for: the codes it opens
 * with, runs expanded (`A1, C1-C5` → A1, C1, C2, C3, C4, C5), in syllabus
 * order. Each `;`-joined reading is read on its own, so a source with two
 * bullets (`A1–A15; A17`) keeps both. A run across sections (`B8–C2`) can't be
 * expanded without knowing how long B is, so only its two ends are kept.
 */
export function readingObjectives(detail: string | undefined): string[] {
  if (!detail) return []
  const codes = new Set<string>()
  for (const reading of detail.split(';')) {
    const lead = LEADING_CODES_RE.exec(reading)?.[1]
    if (!lead) continue
    for (const run of lead.split(',')) {
      const m = RUN_RE.exec(run.replace(/\s+/g, ''))
      if (!m) continue
      const [, from, start, toLetter, end] = m
      if (end === undefined) {
        codes.add(`${from}${Number(start)}`)
      } else if ((toLetter ?? from) === from && Number(end) >= Number(start)) {
        for (let n = Number(start); n <= Number(end); n++) codes.add(`${from}${n}`)
      } else {
        codes.add(`${from}${Number(start)}`)
        codes.add(`${toLetter ?? from}${Number(end)}`)
      }
    }
  }
  return [...codes].sort(compareCodes)
}

/** One choice of the shelf's objective filter. */
export interface ObjectiveFilterOption {
  /** The code — what is selected, and what the pill says when it is the one. */
  value: string
  label: string
  /** The objective's statement, as the page words it. */
  hint: string
  /** The section heading it is listed under — "A. Regulation of …". */
  group: string
  /** How many of the shelf's sources are read for it. */
  count: number
}

/**
 * The objectives the shelf can be filtered by: every code some reading cites,
 * in syllabus order, named from the page. An objective no reading cites isn't
 * offered — choosing it would empty the shelf.
 *
 * A shelf with a reading that cites a code the page doesn't number gets no
 * filter at all: its readings and its objectives are numbered two different
 * ways (Exam 5 numbers its objectives A1–A17 then B18–B42, its readings cite
 * B1–B42), and a filter that named some codes and left others bare would be
 * guessing which numbering a reader means. Nor does a shelf with fewer than two
 * objectives to tell apart.
 */
export function objectiveFilterOptions(
  entries: SourceMaterialEntry[],
  objectives: SyllabusObjective[],
): ObjectiveFilterOption[] {
  const counts = new Map<string, number>()
  for (const entry of entries) {
    for (const code of readingObjectives(entry.detail)) counts.set(code, (counts.get(code) ?? 0) + 1)
  }
  const byCode = new Map(objectives.map(o => [o.code, o]))
  if (counts.size < 2 || [...counts.keys()].some(code => !byCode.has(code))) return []
  return [...counts.keys()].sort(compareCodes).map(code => {
    const objective = byCode.get(code)!
    return {
      value: code,
      label: code,
      hint: objective.summary,
      group: objective.sectionTitle,
      count: counts.get(code)!,
    }
  })
}

/**
 * The sources read for any of the chosen objectives, in the page's order. An
 * empty choice is no filter.
 */
export function filterSourcesByObjectives(
  entries: SourceMaterialEntry[],
  selected: ReadonlySet<string>,
): SourceMaterialEntry[] {
  if (selected.size === 0) return entries
  return entries.filter(entry => readingObjectives(entry.detail).some(code => selected.has(code)))
}
