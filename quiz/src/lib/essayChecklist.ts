import type { Part, SelfGrade } from './parser'
import { isCalculationPart } from './numericCheck'
import { splitSampleAnswers } from './writtenAnswer'

// ── The essay checklist (roadmap L14) ───────────────────────────────────────
//
// A reader marking their own written answer grades it more accurately against
// a checklist of the expected answer's points than against the answer read as
// a whole (Rawson & Dunlosky 2007; docs/learning-review.md §3.4). The points
// here are the sample answer's own: each top-level bullet, numbered item and
// paragraph of prose is one, cut where the examiners' text already breaks —
// nothing reworded, nothing added. The reader ticks the points their answer
// makes, and the ticks suggest a grade (docs/answer-checking.md, layer 2).
//
// What isn't a point stays as text around the points: a heading, a lead-in
// ending in a colon ("Two likely consequences:"), a formula or table. A
// paragraph naming the other answers that were also accepted ("Other
// acceptable consequences include …") can be ticked too, but as a stand-in:
// an answer that made one of those instead of a sample point has made a
// point, so the tick counts — but it is not one more point every answer needs.

export type ChecklistBlock =
  | { kind: 'text'; markdown: string }
  /** `index` identifies the box; `also` marks the other accepted answers, which stand in for a point. */
  | { kind: 'point'; markdown: string; index: number; also?: true }

/** One sample answer as text and points, in the sample's own order. */
export interface SampleChecklist {
  blocks: ChecklistBlock[]
  /** How many points the sample makes — the boxes, less any for the other accepted answers. */
  points: number
}

export interface PartChecklist {
  /** Text above the samples ("Sample answers include:"), as `splitSampleAnswers` gives it. */
  intro: string | null
  /** One per sample answer. */
  samples: SampleChecklist[]
  /**
   * How many points the stem asks for, when it names a number fewer than a
   * sample makes ("List two likely consequences" over a sample of three).
   * Null: every point.
   */
  asked: number | null
}

const LIST_ITEM = /^( {0,3})(?:[-*+]|\d{1,2}[.)])\s+/
const FENCE = /^\s*(```|~~~)/
// A paragraph that names the other accepted answers: "Other acceptable
// factors include …", "Also accepted: …", "Any of these was accepted".
const ALSO_ACCEPTED = /^(?:[*_]{1,2})?(?:other\s+(?:acceptable|accepted|valid|possible)|also\s+(?:acceptable|accepted)|any\s+of\s+these\s+(?:was|were)\s+accepted|(?:acceptable|accepted)\s+(?:alternatives|answers)\s+(?:also\s+)?include)/i

type Raw = { lines: string[]; list: boolean }

/** The sample's blocks as written: paragraphs, top-level list items, fences, tables and display maths. */
function rawBlocks(markdown: string): Raw[] {
  const lines = markdown.split('\n')
  const out: Raw[] = []
  let cur: Raw | null = null
  let blankBefore = false
  const flush = () => { if (cur) out.push(cur); cur = null }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (FENCE.test(line)) {
      flush()
      const block = [line]
      const fence = line.trim().slice(0, 3)
      while (++i < lines.length) {
        block.push(lines[i])
        if (lines[i].trim().startsWith(fence)) break
      }
      out.push({ lines: block, list: false })
      blankBefore = false
      continue
    }
    if (line.trim() === '$$') {
      flush()
      const block = [line]
      while (++i < lines.length) {
        block.push(lines[i])
        if (lines[i].trim() === '$$') break
      }
      out.push({ lines: block, list: false })
      blankBefore = false
      continue
    }
    if (line.trim() === '') { blankBefore = true; continue }

    const indented = /^\s{2,}\S/.test(line)
    if (LIST_ITEM.test(line) && !(cur?.list && indented)) {
      flush()
      cur = { lines: [line], list: true }
    } else if (cur && (indented || (!blankBefore && !line.trimStart().startsWith('|') === !cur.lines[0].trimStart().startsWith('|')))) {
      // A line indented under an item belongs to it, across blank lines; an
      // unindented line straight after another carries its paragraph on —
      // unless it starts or ends a table.
      if (blankBefore) cur.lines.push('')
      cur.lines.push(line)
    } else {
      flush()
      cur = { lines: [line], list: false }
    }
    blankBefore = false
  }
  flush()
  return out
}

/** A list item's text without its marker, its continuation lines dedented. */
function itemText(lines: string[]): string {
  const marker = LIST_ITEM.exec(lines[0])!
  const first = lines[0].slice(marker[0].length)
  const rest = lines.slice(1)
  const indent = Math.min(...rest.filter(l => l.trim()).map(l => /^\s*/.exec(l)![0].length), Infinity)
  const cut = Number.isFinite(indent) ? Math.min(indent, marker[0].length) : 0
  return [first, ...rest.map(l => l.slice(cut))].join('\n').trimEnd()
}

/** Whether a paragraph is a point, or text around the points. */
function classify(text: string): 'point' | 'also' | 'text' {
  if (ALSO_ACCEPTED.test(text.trim())) return 'also'
  return isPoint(text) ? 'point' : 'text'
}

function isPoint(text: string): boolean {
  const t = text.trim()
  if (/^(?:#{1,6}\s|\$\$|\||>|!\[|<)/.test(t)) return false
  // A heading set in bold or italics on its own line: "**Recommendation**".
  if (!t.includes('\n') && /^(\*\*|__|\*|_)[^*_]+\1:?$/.test(t)) return false
  if (/:\s*$/.test(t)) return false
  if (ALSO_ACCEPTED.test(t)) return false
  // A short label with no sentence in it: "ii. Reported Claims", "Accepted
  // Answer 1 — Paid / Reported Claims", "Ignoring minimum premium for now".
  if (!t.includes('\n') && !/[.!?;)]$/.test(t.replace(/[*_]+$/, '')) && (t.match(/[A-Za-z]+/g) ?? []).length <= 8) return false
  // Enough words to say something: "Alternatively" alone, "1)", a stray label.
  return (t.match(/[A-Za-z]{2,}/g) ?? []).length >= 3
}

// A line of working: a result after an equals sign, or two numbers multiplied
// or divided. A sample made mostly of these is a calculation set out in steps,
// and its "points" would be its arithmetic.
const WORKING = /=\s*[-−(\\$\d]|\d\s*[x×*/]\s*\(?\d/

/** One sample answer cut into text and points; all text when it is a calculation set out in steps. */
export function sampleChecklist(sample: string): SampleChecklist {
  const cut = cutSample(sample)
  const pointBlocks = cut.blocks.filter(b => b.kind === 'point')
  if (pointBlocks.filter(b => WORKING.test(b.markdown)).length * 2 > pointBlocks.length) {
    return { blocks: [{ kind: 'text', markdown: sample.trim() }], points: 0 }
  }
  return cut
}

function cutSample(sample: string): SampleChecklist {
  const blocks: ChecklistBlock[] = []
  let points = 0
  let boxes = 0
  const text = (markdown: string) => {
    const last = blocks[blocks.length - 1]
    if (last?.kind === 'text') last.markdown += `\n\n${markdown}`
    else blocks.push({ kind: 'text', markdown })
  }
  for (const raw of rawBlocks(sample)) {
    const markdown = raw.list ? itemText(raw.lines) : raw.lines.join('\n')
    const kind = classify(markdown)
    if (kind === 'point') { blocks.push({ kind: 'point', markdown, index: boxes++ }); points++ }
    else if (kind === 'also') blocks.push({ kind: 'point', markdown, index: boxes++, also: true })
    else text(raw.list ? raw.lines.join('\n') : markdown)
  }
  return { blocks, points }
}

const NUMBER_WORDS: Record<string, number> = {
  a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
}
const COUNT = '(a|an|one|two|three|four|five|six|[1-6])'
const NUMBER = '(one|two|three|four|five|six|[1-6])'
const NOUN = '\\s+(?!of\\b)[a-z]'
// "List two likely consequences", "Briefly describe the four criteria",
// "Briefly describe a scenario", "describe one advantage and one
// disadvantage", "Assess it using two social criteria" — the stem's own count
// of what earns the marks. "a"/"an" counts only straight after an asking verb:
// "using a Berquist-Sherman technique" names a method, not a number of points.
const ASKS_FOR = [
  new RegExp(`\\b(?:list|give|provide|identify|describe|explain|discuss|state|name|propose|recommend|suggest)\\s+(?:the\\s+|any\\s+)?${COUNT}${NOUN}(?:[^.;?]{0,40}?\\s+and\\s+${COUNT}${NOUN})?`, 'gi'),
  new RegExp(`\\b(?:using|with|based\\s+on|against)\\s+(?:the\\s+|any\\s+)?${NUMBER}${NOUN}`, 'gi'),
]

/** How many points the stem asks for, when it names a number: every count it names, added up. */
export function askedFor(stem: string): number | null {
  let total = 0
  for (const re of ASKS_FOR) {
    for (const m of stem.matchAll(re)) {
      total += NUMBER_WORDS[m[1].toLowerCase()] + (m[2] ? NUMBER_WORDS[m[2].toLowerCase()] : 0)
    }
  }
  return total > 0 ? total : null
}

/**
 * A written part's checklist, or null when it has none: a calculation (its
 * final figure is checked instead — lib/numericCheck.ts), a keyed part, or a
 * sample answer that breaks into fewer than two points, where a checklist
 * would only be the sample again with one box beside it.
 */
export function partChecklist(part: Pick<Part, 'stem' | 'answer' | 'explanation'>): PartChecklist | null {
  if (part.answer !== '' || !part.explanation.trim() || isCalculationPart(part)) return null
  const { intro, samples } = splitSampleAnswers(part.explanation)
  const checklists = samples.map(sampleChecklist)
  if (!checklists.some(c => c.points >= 2)) return null
  const asked = askedFor(part.stem)
  return { intro, samples: checklists, asked: asked !== null && checklists.some(c => c.points > asked) ? asked : null }
}

// ── The suggestion ──────────────────────────────────────────────────────────

/** The points ticked, per sample, by the point's index. */
export type ChecklistTicks = Record<number, readonly number[]>

export interface ChecklistSuggestion {
  suggestion: SelfGrade
  /** The sample the ticks were read against: the one the answer covers most of. */
  sample: number
  ticked: number
  /** The points that sample needs for full credit — all of them, or as many as the stem asks for. */
  needed: number
}

/**
 * The grade the ticks point to, or null before any box is ticked — a reader
 * who hasn't used the checklist is given no grade by it. Read against the
 * sample the answer covers most of: an answer that followed sample 2 is
 * marked against sample 2. Every point needed: full credit; some: partial.
 * It never suggests no credit: a reader whose answer makes none of the points
 * has nothing to tick, and says so with the grade buttons themselves.
 */
export function checklistSuggestion(list: PartChecklist, ticks: ChecklistTicks): ChecklistSuggestion | null {
  if (!Object.values(ticks).some(t => t.length > 0)) return null
  let best: ChecklistSuggestion | null = null
  list.samples.forEach((sample, i) => {
    if (sample.points === 0) return
    const needed = list.asked !== null ? Math.min(list.asked, sample.points) : sample.points
    const ticked = Math.min(new Set(ticks[i] ?? []).size, needed)
    const suggestion: SelfGrade = ticked >= needed ? 'correct' : ticked > 0 ? 'partial' : 'incorrect'
    if (!best || ticked / needed > best.ticked / best.needed) best = { suggestion, sample: i, ticked, needed }
  })
  return best
}

/** The suggestion in words: the grade, and the count it came from. */
export function checklistMessage(s: ChecklistSuggestion, list: PartChecklist): { title: string; body: string } {
  const label = s.suggestion === 'correct' ? 'Full credit' : s.suggestion === 'partial' ? 'Partial' : 'No credit'
  const several = list.samples.length > 1
  const points = s.needed === 1 ? 'point' : 'points'
  const body = list.asked !== null
    ? `You ticked ${s.ticked} of the ${s.needed} ${points} the question asks for${several ? `, from sample ${s.sample + 1}` : ''}.`
    : `You ticked ${s.ticked} of the ${s.needed} ${points} in ${several ? `sample ${s.sample + 1}` : 'the sample answer'}.`
  return { title: `Suggested grade: ${label}`, body }
}
