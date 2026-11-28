// The exam page as data (docs/redesign-spec.md §7.1): what `pages/wiki/WikiExam.tsx`
// draws, read off the page's markdown. Nothing here edits a word of the page:
// a syllabus sentence is the page's own line with each `[[Target|display]]`
// reduced to its display words, and the concepts it linked are listed beside it.
//
// One rule holds the page together: an objective's concepts are the ones
// `parseExamSyllabus` counts (every link in its callout, once, in the order
// written), so the pills under the sentences, the squares on a folded card and
// the objective's percentage are all about the same set. A concept linked
// twice in one objective is one pill, under the first line that names it.
//
// Pure and tested; `examPageVault.test.ts` holds it to every exam page.

import { splitWeightTag } from './examWeight'
import { cleanWikiLinks } from './wikiParser'
import { hrefToEntryRef, type WikiEntryRef } from './wikiRoutes'
import { isSyllabusConcept, type ObjectiveIndex } from './syllabusChapters'

/** A concept under a syllabus sentence. */
export interface ObjectivePill {
  /** The concept page's name: what the pill says and what it opens. */
  name: string
  ref: WikiEntryRef
}

export type ObjectiveLineKind = 'prose' | 'item' | 'heading'

/** One line of a learning objective, as the syllabus words it. */
export interface ObjectiveLine {
  kind: ObjectiveLineKind
  /** A list item's own marker ("1.", "a)"), or null for a bullet or a paragraph. */
  marker: string | null
  /** 0 for a top-level line, 1 or 2 for an item nested under one. */
  depth: number
  /** The line's words, as markdown with its wiki links reduced to their text. */
  text: string
  /** The concepts this line is the first in its objective to name. */
  pills: ObjectivePill[]
}

export interface ExamObjective {
  /** The callout's title without its weight tag: "General Probability". */
  name: string
  /** "23–30%", as the syllabus prints it; null when it prints none. */
  weight: string | null
  /** A `###` heading the objective is listed under (the CIA's "Part A …"), if any. */
  part: string | null
  lines: ObjectiveLine[]
  /** Every pill of the objective, in order. */
  concepts: ObjectivePill[]
}

/** A `[!question]` callout of the page: its title and its body's markdown. */
export interface ExamNote {
  title: string
  markdown: string
}

export interface ExamPage {
  /** The page's `# ` heading. */
  title: string | null
  /** The paragraph under the title. */
  lead: string
  notes: ExamNote[]
  objectives: ExamObjective[]
  /** The Source Material callout, as written, for the shelf to read; null with none. */
  sourceMaterial: string | null
}

const CALLOUT_RE = /^>\s*\[!(\w+)\][-+]?[ \t]*(.*)$/
const LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
const KEY_CONCEPTS_RE = /^\s*[-*]\s+\*Key concepts:\*/i
const ITEM_RE = /^(\s*)(\d+[.)]|[a-z][.)]|[-*+])\s+(.*)$/i
const HEADING_RE = /^#{1,6}\s+(.*)$/

/** The links of one line, as `parseExamSyllabus` names them: the target's last path segment. */
function lineLinks(line: string): ObjectivePill[] {
  const out: ObjectivePill[] = []
  for (const m of line.matchAll(LINK_RE)) {
    const target = m[1]!.trim()
    const base = target.includes('/') ? target.split('/').pop()! : target
    const name = base.split('#')[0]!.trim()
    if (!name) continue
    const ref = hrefToEntryRef(target) ?? { kind: 'concept' as const, name }
    out.push({ name, ref: { kind: ref.kind, name: ref.kind === 'concept' ? name : ref.name } })
  }
  return out
}

function readObjective(title: string, part: string | null, body: string[]): ExamObjective {
  const { title: name, weight } = splitWeightTag(title)
  const lines: ObjectiveLine[] = []
  const concepts: ObjectivePill[] = []
  const seen = new Set<string>()

  const take = (line: string): ObjectivePill[] => {
    const fresh: ObjectivePill[] = []
    for (const pill of lineLinks(line)) {
      const key = pill.name.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      fresh.push(pill)
      concepts.push(pill)
    }
    return fresh
  }

  for (const raw of body) {
    if (!raw.trim()) continue
    // The vault's own additions to a task: pills under the sentence, never a sentence.
    if (KEY_CONCEPTS_RE.test(raw)) {
      const pills = take(raw)
      const last = lines[lines.length - 1]
      if (last) last.pills.push(...pills)
      else if (pills.length > 0) lines.push({ kind: 'prose', marker: null, depth: 0, text: '', pills })
      continue
    }
    const item = raw.match(ITEM_RE)
    const heading = !item ? raw.trim().match(HEADING_RE) : null
    const words = item ? item[3]! : heading ? heading[1]! : raw.trim()
    lines.push({
      kind: item ? 'item' : heading ? 'heading' : 'prose',
      marker: item && !/^[-*+]$/.test(item[2]!) ? item[2]! : null,
      depth: item ? Math.min(2, Math.floor(item[1]!.length / 2)) : 0,
      text: cleanWikiLinks(words).trim(),
      pills: take(raw),
    })
  }

  return { name: name.trim(), weight: weight ? weight.replace(/\s*-\s*/, '–') : null, part, lines, concepts }
}

/** Everything the exam page draws, read off its markdown. */
export function parseExamPage(markdown: string): ExamPage {
  const body = markdown
    .replace(/^---\n[\s\S]*?\n---\n?/, '')
    .replace(/^<div\b[\s\S]*?<\/div> *\n?/gm, '')
  const lines = body.split('\n')

  let title: string | null = null
  const lead: string[] = []
  const notes: ExamNote[] = []
  const objectives: ExamObjective[] = []
  let sourceMaterial: string | null = null
  let part: string | null = null
  let seenSection = false

  let i = 0
  while (i < lines.length) {
    const line = lines[i]!
    const callout = line.match(CALLOUT_RE)
    if (callout) {
      const block: string[] = []
      let j = i + 1
      while (j < lines.length && lines[j]!.startsWith('>') && !CALLOUT_RE.test(lines[j]!)) {
        block.push(lines[j]!.replace(/^>\s?/, ''))
        j++
      }
      const kind = callout[1]!.toLowerCase()
      const heading = callout[2]!.trim()
      if (kind === 'example') objectives.push(readObjective(heading, part, block))
      else if (kind === 'answer') sourceMaterial = lines.slice(i, j).join('\n')
      else notes.push({ title: heading, markdown: block.join('\n').trim() })
      seenSection = true
      i = j
      continue
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      if (h[1] === '#') title = title ?? h[2]!.trim()
      else {
        seenSection = true
        // A heading inside the objectives ("### Part A …") groups the cards under it.
        part = h[1]!.length >= 3 ? h[2]!.trim() : null
      }
    } else if (title !== null && !seenSection && line.trim() && !line.startsWith('%%')) {
      lead.push(line.trim())
    }
    i++
  }

  return { title, lead: lead.join('\n\n'), notes, objectives, sourceMaterial }
}

// ── The foot rows ────────────────────────────────────────────────────────────

/** What a note is called on the page: the callout's own title, but for the one the design renames. */
export function noteLabel(title: string): string {
  return /^prerequisite knowledge$/i.test(title.trim()) ? 'What you should know first' : title.trim()
}

/**
 * The page's notes as its foot rows. The lead paragraph, which the header no
 * longer prints, opens the row about the exam itself (Exam format, About the
 * exam …); a page with no such note gets one, "About", for it.
 */
export function examFootNotes(page: Pick<ExamPage, 'lead' | 'notes'>): ExamNote[] {
  const rows = page.notes.map(n => ({ title: noteLabel(n.title), markdown: n.markdown }))
  if (!page.lead) return rows
  const about = rows.findIndex(r => /^(exam format|about\b)/i.test(r.title))
  if (about >= 0) {
    const row = rows[about]!
    rows[about] = { title: row.title, markdown: `${page.lead}\n\n${row.markdown}` }
    return rows
  }
  return [{ title: 'About', markdown: page.lead }, ...rows]
}

// ── Folding ──────────────────────────────────────────────────────────────────

/** How many lines an opened objective shows before "N more". */
export const OBJECTIVE_LINES_SHOWN = 3

/**
 * How many of an objective's lines are shown before the fold. Everything, when
 * the fold would hide a single line or the concept being opened sits past it.
 */
export function linesShown(objective: ExamObjective, expanded: boolean, focus?: string | null): number {
  const total = objective.lines.length
  if (expanded || total <= OBJECTIVE_LINES_SHOWN + 1) return total
  if (focus) {
    const key = focus.toLowerCase()
    const at = objective.lines.findIndex(l => l.pills.some(p => p.name.toLowerCase() === key))
    if (at >= OBJECTIVE_LINES_SHOWN) return total
  }
  return OBJECTIVE_LINES_SHOWN
}

/** The first objective that names a concept, or -1. */
export function objectiveOf(objectives: readonly ExamObjective[], concept: string): number {
  const key = concept.toLowerCase()
  return objectives.findIndex(o => o.concepts.some(p => p.name.toLowerCase() === key))
}

/**
 * The concept after this one in its objective, for "Next in <objective>".
 * Null at the objective's last concept, or when the exam doesn't name it.
 */
export function nextInObjective(
  objectives: readonly ExamObjective[],
  concept: string,
): { objective: string; next: ObjectivePill } | null {
  const o = objectives[objectiveOf(objectives, concept)]
  if (!o) return null
  const key = concept.toLowerCase()
  const at = o.concepts.findIndex(p => p.name.toLowerCase() === key)
  const next = o.concepts.slice(at + 1).find(p => p.ref.kind === 'concept')
  return next ? { objective: o.name, next } : null
}

/** One stop of the walk down an exam page: a pill, in page order. */
export interface ObjectiveStop {
  name: string
  /** Which of the page's pills for this concept this one is (0 for the first). */
  occurrence: number
  /** The objective the pill is drawn under. */
  objective: number
}

/** The reader's walk down the exam page's pills. */
export interface ObjectiveWalk {
  /** Every concept once, in the order the page first names it. */
  list: WikiEntryRef[]
  /** Every pill, in page order: a concept named by two objectives is two stops. */
  stops: ObjectiveStop[]
  /** The chapters of the walk, keyed the way `stops` count. */
  index: ObjectiveIndex
}

/**
 * The walk the concept popup takes over an exam page. It steps through the
 * pills as the page draws them, so a concept two objectives name is visited in
 * both, and Next from the later one goes on through the later objective rather
 * than back to where the concept first appeared.
 */
export function objectiveWalk(objectives: readonly ExamObjective[]): ObjectiveWalk {
  const list: WikiEntryRef[] = []
  const stops: ObjectiveStop[] = []
  const index: ObjectiveIndex = { byOccurrence: {}, byConcept: {} }
  const counts = new Map<string, number>()
  objectives.forEach((o, at) => {
    for (const pill of o.concepts) {
      if (!isSyllabusConcept(pill.ref)) continue
      const key = pill.name.toLowerCase()
      const occurrence = counts.get(key) ?? 0
      counts.set(key, occurrence + 1)
      if (occurrence === 0) {
        list.push({ kind: 'concept', name: pill.name })
        index.byConcept[key] = o.name
      }
      index.byOccurrence[`${key}#${occurrence}`] = o.name
      stops.push({ name: pill.name, occurrence, objective: at })
    }
  })
  return { list, stops, index }
}

/** The stop for a pill under an objective, or the concept's first stop; -1 for none. */
export function stopOf(stops: readonly ObjectiveStop[], concept: string, objective?: number | null): number {
  const key = concept.toLowerCase()
  const here = objective == null ? -1 : stops.findIndex(s => s.objective === objective && s.name.toLowerCase() === key)
  return here >= 0 ? here : stops.findIndex(s => s.name.toLowerCase() === key)
}
