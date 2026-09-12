// The syllabus's chapters: which **learning objective** each concept of an exam
// page belongs to, so the concept viewer's walk can be cut into them the way the
// exam-PDF reader's page bar is cut into a document's bookmarks
// (`lib/pdfChapters.ts`).
//
// Reading an exam's material in the popup is a walk down a list — seventy-odd
// stops, Previous to Next — and the bar above that footer says how far along you
// are and nothing about *where*. But the syllabus does have sections: the
// `> [!example]- General Probability {23-30%}` callouts an exam page is built
// out of. Cutting the bar at each one turns the walk into the syllabus's own
// structure: these twenty stops are General Probability, the next thirty are
// Univariate Random Variables.
//
// A syllabus names the same concept under several objectives — conditional
// probability is defined in the first and used in the second — so the index has
// two halves, and which one answers depends on what the walk is stepping
// through:
//
//  - **By mention** (`byOccurrence`), for the document-ordered walk the popup
//    takes through an exam page: a mention belongs to the callout it is written
//    inside, which is the only reading that gives the bar unbroken chapters.
//    Keying by first introduction instead would flip the label back and forth
//    every time a later objective re-used an earlier concept.
//  - **By concept** (`byConcept`), for a walk of concepts rather than mentions —
//    the deduped list, a study-plan filter — where there is no one mention to
//    ask about. There, a concept belongs to the objective that introduces it.
//
// Nothing is inferred. A concept written outside every callout — the
// prerequisite line, the reading list — belongs to no objective, and its stretch
// of the bar is left unnamed rather than folded into the objective above it.
//
// Pure. The markdown comes from the exam page, which already has it.

import { splitWeightTag } from './examWeight'
import { extractWikiLinkOccurrences, stripWikiChrome } from './wikiExtract'
import type { WikiEntryRef } from './wikiRoutes'
import type { NavSegmentMark } from './navScrub'

/** Matches the header line of a learning-objective callout. */
const OBJECTIVE_HEADER_RE = /^>\s*\[!example\][-+]?\s*(.*)$/i

/**
 * Which links count as the syllabus's concepts.
 *
 * A dated name — "A First Course in Probability (Ross - 2019)" — is a source in
 * the reading list, not a concept, however it is linked. The exam page walks the
 * same predicate, so the popup's list and this index count the same things and
 * a mention's number means the same on both sides.
 */
export function isSyllabusConcept(ref: WikiEntryRef): boolean {
  return ref.kind === 'concept' && !/ \([^)]*\d{4}\)$/.test(ref.name)
}

/** One learning objective, and the concepts written inside it. */
export interface ObjectiveSection {
  /** The callout's title with its weight tag split off — "General Probability". */
  title: string
  /** The weight tag verbatim ("23-30%"), or '' when the callout carries none. */
  weight: string
  /** The concepts linked inside it, in the order the page writes them. */
  concepts: string[]
}

/** The two lookups, built together in one pass over the page. */
export interface ObjectiveIndex {
  /** Objective title by `name#n` — the page's nth mention of that concept. */
  byOccurrence: Record<string, string>
  /** Objective title by lowercased concept name — where it is introduced. */
  byConcept: Record<string, string>
}

/** An item of a walk: a concept, and which mention of it this stop is. */
export interface ObjectiveWalkItem {
  name: string
  /** 0-based index among the page's mentions of this concept, where known. */
  occurrence?: number
}

/** The key `byOccurrence` is written under. */
function occurrenceKey(name: string, occurrence: number): string {
  return `${name.toLowerCase()}#${occurrence}`
}

/**
 * Walk the page, handing every concept link the objective it is written inside.
 *
 * A callout runs from its `[!example]` header to the first line that leaves the
 * blockquote, which is how Obsidian reads it too — so a concept listed under
 * "Discrete Univariate Distributions" *inside* the callout is still that
 * objective's, while the `## Source Material` shelf below is outside them all.
 */
function scanObjectiveLinks(markdown: string): { name: string; objective: string | null }[] {
  const links: { name: string; objective: string | null }[] = []
  let objective: string | null = null
  let inCallout = false

  // The same starting point the occurrence list counts from, so the two agree
  // about which mention is the nth.
  for (const line of stripWikiChrome(markdown).split('\n')) {
    const header = OBJECTIVE_HEADER_RE.exec(line)
    if (header) {
      const { title, weight: _weight } = splitWeightTag(header[1].trim())
      objective = title.trim() || null
      inCallout = true
    } else if (inCallout && !line.startsWith('>') && line.trim() !== '') {
      // A blank line between two callouts doesn't end anything; a line of prose
      // does. (Inside a callout a blank line is written as a bare ">".)
      objective = null
      inCallout = false
    }

    for (const ref of extractWikiLinkOccurrences(line)) {
      if (!isSyllabusConcept(ref)) continue
      links.push({ name: ref.name, objective })
    }
  }
  return links
}

/**
 * The learning objectives of an exam page, in page order, with the concepts
 * each one names.
 */
export function parseObjectiveSections(markdown: string): ObjectiveSection[] {
  if (!markdown) return []
  const sections: ObjectiveSection[] = []
  let current: ObjectiveSection | null = null
  let inCallout = false

  for (const line of stripWikiChrome(markdown).split('\n')) {
    const header = OBJECTIVE_HEADER_RE.exec(line)
    if (header) {
      const { title, weight } = splitWeightTag(header[1].trim())
      current = { title: title.trim(), weight: weight ?? '', concepts: [] }
      inCallout = true
      if (current.title) sections.push(current)
      continue
    }
    if (!inCallout) continue
    if (!line.startsWith('>') && line.trim() !== '') {
      current = null
      inCallout = false
      continue
    }
    for (const ref of extractWikiLinkOccurrences(line)) {
      if (current && isSyllabusConcept(ref)) current.concepts.push(ref.name)
    }
  }
  return sections
}

/**
 * Both lookups for one exam page. `null` in, empty index out — a page with no
 * objectives cuts no bar.
 */
export function buildObjectiveIndex(markdown: string | null | undefined): ObjectiveIndex {
  const index: ObjectiveIndex = { byOccurrence: {}, byConcept: {} }
  if (!markdown) return index

  const counts = new Map<string, number>()
  for (const link of scanObjectiveLinks(markdown)) {
    const key = link.name.toLowerCase()
    const occurrence = counts.get(key) ?? 0
    counts.set(key, occurrence + 1)
    if (!link.objective) continue
    index.byOccurrence[occurrenceKey(link.name, occurrence)] = link.objective
    // First one wins: the objective that introduces a concept is the one that
    // owns it wherever the walk isn't stepping through mentions.
    if (!(key in index.byConcept)) index.byConcept[key] = link.objective
  }
  return index
}

/** The objective one stop of a walk belongs to, or '' when it belongs to none. */
export function objectiveFor(item: ObjectiveWalkItem, index: ObjectiveIndex | null | undefined): string {
  if (!index || !item?.name) return ''
  if (typeof item.occurrence === 'number') {
    const byMention = index.byOccurrence[occurrenceKey(item.name, item.occurrence)]
    if (byMention) return byMention
    // A stop the page doesn't have a mention for — a concept the walk picked up
    // by following a link — falls back to where the concept is introduced.
  }
  return index.byConcept[item.name.toLowerCase()] ?? ''
}

/**
 * Where the objectives begin along a walk — the marks `NavProgressBar` cuts its
 * track at.
 *
 * A mark goes wherever the objective changes. A run of stops that belong to no
 * objective gets an unnamed mark, so it reads as a gap in the syllabus rather
 * than as part of whichever objective happens to precede it.
 */
export function objectiveMarks(
  items: ObjectiveWalkItem[],
  index: ObjectiveIndex | null | undefined,
): NavSegmentMark[] {
  if (!index || items.length === 0) return []
  const marks: NavSegmentMark[] = []
  let previous: string | undefined
  items.forEach((item, i) => {
    const label = objectiveFor(item, index) || undefined
    if (i === 0 || label !== previous) marks.push({ start: i + 1, label })
    previous = label
  })
  // One stretch covering the whole walk says nothing; `navSegments` would drop
  // it anyway, and returning it makes an unnamed bar look deliberate.
  return marks.length > 1 ? marks : []
}
