import type { Part, SelfGrade } from './parser'
import { isCalculationPart } from './numericCheck'
import { splitSampleAnswers } from './writtenAnswer'
import { RUBRIC } from './checklistKeys'

export { RUBRIC }

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
//
// A sample that lists candidates' responses — "Sample responses:", "Answers
// receiving full credit include:", "Sample Responses for Model 1" — is a
// *pool*: each response under the heading earned the credit on its own, so
// one tick from the pool is the point made (or as many as the heading or the
// stem names: "any two of which would earn full credit").
//
// Where the examiner's report says what full credit needed — "Candidates were
// expected to:" over a list of things to do — that list is the checklist
// instead (`reportRubric`): the examiners' own idea units, at the grain they
// marked. The sample answer then reads as the worked example of meeting them.

export type ChecklistBlock =
  | { kind: 'text'; markdown: string }
  /**
   * `index` identifies the box; `also` marks the other accepted answers, which
   * stand in for a point; `pool` is the pool of responses the point is one of.
   */
  | { kind: 'point'; markdown: string; index: number; also?: true; pool?: number }

/** A heading's run of candidates' responses: any `need` of them make the point. */
export interface ChecklistPool {
  need: number
  /** The heading named its count ("any two of which"), so the stem's count doesn't replace it. */
  counted: boolean
}

/** One sample answer (or the report's rubric) as text and points, in its own order. */
export interface SampleChecklist {
  blocks: ChecklistBlock[]
  /** Every box. */
  boxes: number
  /** What a full answer makes: each point outside a pool, and each pool's `need`. */
  points: number
  pools: ChecklistPool[]
}


export interface PartChecklist {
  /** Text above the samples ("Sample answers include:"), as `splitSampleAnswers` gives it. */
  intro: string | null
  /** One per sample answer. */
  samples: SampleChecklist[]
  /**
   * The examiner's report cut into text and the things candidates were
   * expected to do, when it lists two or more: the checklist then, in place
   * of the samples'.
   */
  rubric: SampleChecklist | null
  /**
   * How many points the stem asks for, when it names a number fewer than a
   * sample makes ("List two likely consequences" over a sample of three).
   * Null: every point.
   */
  asked: number | null
}

const LIST_ITEM = /^( {0,3})(?:[-*+]|\d{1,2}[.)])\s+/
// A heading over candidates' responses, any of which earned the credit:
// "Sample responses:", "Sample Responses for \"Advantage\"", "Answers receiving
// full credit include:", "Sample Answers (any two of which would earn full
// credit)". Not a numbered sample ("Sample answer #2" separates whole answers —
// writtenAnswer.ts), and short: a heading, not a sentence about responses.
const POOL_HEADING = /^\s*(?:#{1,6}\s+)?(?:\*\*|__)?\s*(?:(?:sample|example|possible|acceptable|accepted)\s+(?:answers?|responses?)(?!\s*#?\s*\d)|(?:answers?|responses?)\s+(?:receiving|earning|given|that\s+(?:received|earned))\s+(?:full\s+)?credit|(?:answers?|responses?)\s+(?:for|to)\s)/i
// "any two of which would earn full credit", "needed three reasons for full credit".
const POOL_COUNT = /\b(?:any|needed|need|required|requires)\s+(one|two|three|four|[1-4])\b|\b(one|two|three|four)\s+of\s+(?:which|these)\b/i

function isPoolHeading(line: string): boolean {
  const t = line.trim()
  return POOL_HEADING.test(t) && !t.includes('\n') && (t.match(/[A-Za-z]+/g) ?? []).length <= 14
}
const FENCE = /^\s*(```|~~~)/
// A paragraph that names the other accepted answers: "Other acceptable
// factors include …", "Also accepted: …", "Any of these was accepted", "Note
// that this list is not exhaustive, and other reasonable answers were accepted".
const ALSO_ACCEPTED = /^(?:[*_]{1,2})?(?:other\s+(?:acceptable|accepted|valid|possible)|also\s+(?:acceptable|accepted)|any\s+of\s+these\s+(?:was|were)\s+accepted|(?:acceptable|accepted)\s+(?:alternatives|answers)\s+(?:also\s+)?include|(?:note\s+that\s+)?this\s+list\s+is\s+not\s+exhaustive)/i

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
    // A pool heading closes the paragraph above it and stands alone, so the
    // responses under it start fresh even with no blank line between.
    if (isPoolHeading(line) && !/^\s{2,}/.test(line)) {
      flush()
      out.push({ lines: [line], list: false })
      blankBefore = false
      continue
    }

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

/** Whether a block is a point, or text around the points. `listItem`: a bullet or numbered item, which is never a heading. */
function classify(text: string, listItem: boolean): 'point' | 'also' | 'text' {
  if (ALSO_ACCEPTED.test(text.trim())) return 'also'
  return isPoint(text, listItem) ? 'point' : 'text'
}

function isPoint(text: string, listItem: boolean): boolean {
  const t = text.trim()
  if (/^(?:#{1,6}\s|\$\$|\||>|!\[|<)/.test(t)) return false
  // A heading set in bold or italics on its own line: "**Recommendation**".
  if (!t.includes('\n') && /^(\*\*|__|\*|_)[^*_]+\1:?$/.test(t)) return false
  if (/:\s*$/.test(t)) return false
  if (ALSO_ACCEPTED.test(t)) return false
  if (isPoolHeading(t)) return false
  // A short label with no sentence in it: "ii. Reported Claims", "Ignoring
  // minimum premium for now". A bullet is never a label: "Stable case reserve
  // adequacy" under "Answers receiving full credit include:" is a response.
  if (!listItem && !t.includes('\n') && !/[.!?;)]$/.test(t.replace(/[*_]+$/, '')) && (t.match(/[A-Za-z]+/g) ?? []).length <= 8) return false
  // Enough words to say something: "Alternatively" alone, "1)", a stray label.
  // A bullet may be a response of two words ("Paid techniques").
  return (t.match(/[A-Za-z]{2,}/g) ?? []).length >= (listItem ? 1 : 3)
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
    return { blocks: [{ kind: 'text', markdown: sample.trim() }], boxes: 0, points: 0, pools: [] }
  }
  return cut
}

/** Blocks in order, a text block merging into the one before it. */
function builder() {
  const blocks: ChecklistBlock[] = []
  let boxes = 0
  return {
    blocks,
    text(markdown: string) {
      const last = blocks[blocks.length - 1]
      if (last?.kind === 'text') last.markdown += `\n\n${markdown}`
      else blocks.push({ kind: 'text', markdown })
    },
    point(markdown: string, extra: { also?: true; pool?: number } = {}) {
      blocks.push({ kind: 'point', markdown, index: boxes++, ...extra })
    },
    get boxes() { return boxes },
  }
}

/** What a full answer makes: each point outside a pool, and each pool with a response in it, at its need. */
function countPoints(blocks: ChecklistBlock[], pools: ChecklistPool[]): number {
  const used = new Map<number, number>()
  let single = 0
  for (const b of blocks) {
    if (b.kind !== 'point' || b.also) continue
    if (b.pool === undefined) single++
    else used.set(b.pool, (used.get(b.pool) ?? 0) + 1)
  }
  let pooled = 0
  for (const [pool, size] of used) pooled += Math.min(pools[pool].need, size)
  return single + pooled
}

function cutSample(sample: string): SampleChecklist {
  const out = builder()
  const pools: ChecklistPool[] = []
  let pool: number | undefined
  for (const raw of rawBlocks(sample)) {
    const markdown = raw.list ? itemText(raw.lines) : raw.lines.join('\n')
    // A pool is the list under its heading: a paragraph after it is not one of its responses.
    if (!raw.list) pool = undefined
    const kind = classify(markdown, raw.list)
    if (kind === 'point') out.point(markdown, pool === undefined ? {} : { pool })
    else if (kind === 'also') out.point(markdown, { also: true })
    else {
      out.text(raw.list ? raw.lines.join('\n') : markdown)
      // Text closes a pool; a pool heading opens the next one.
      pool = undefined
      if (isPoolHeading(markdown)) {
        const count = POOL_COUNT.exec(markdown)
        const word = count?.[1] ?? count?.[2]
        pools.push(word ? { need: NUMBER_WORDS[word.toLowerCase()], counted: true } : { need: 1, counted: false })
        pool = pools.length - 1
      }
    }
  }
  return { blocks: out.blocks, boxes: out.boxes, points: countPoints(out.blocks, pools), pools }
}

// ── The examiner's report as the checklist ──────────────────────────────────

// The sentence that heads the examiners' list of what full credit needed —
// every item of it: "Candidates were expected to:", "In order to receive full
// credit a candidate needed to:", "To receive full credit, the candidate
// should have:".
const ALL_LEAD = /\b(?:expected\s+to|needed\s+to|required\s+to|should\s+(?:have|know|give|demonstrate|include)|has\s+to\s+have|must)\b[^\n]*:\s*(?:\*\*|__)?\s*$/i
// …or any so many of it: "Any two of the following received full credit:",
// "Responses that received full credit for this subpart include:".
const POOL_LEAD = /\b(?:received|receiving|earned|earning|accepted\s+for|given)\s+full\s+credit\b[^\n]*:\s*(?:\*\*|__)?\s*$/i
// A lead about what went wrong is not a rubric: "Those who didn't get full
// credit typically made one of the following common errors:".
const NOT_A_RUBRIC = /\b(?:not|didn't|did\s+not|errors?|mistakes?|incorrect|lost|missed|failed)\b/i
// Guidance on the list rather than a thing to do: "Responses could include …",
// "While responses could …", "Examples include …".
const GUIDANCE = /^(?:\*\*|__)?(?:responses?\s+(?:could|may|might|can|should|that|include)|answers?\s+(?:could|may|might|can|that|include)|examples?\s+(?:include|of)|while|note\b|for\s+example|e\.g\.|partial\s+credit|full\s+credit|credit\s+was|candidates?\s+(?:could|may|might|often|typically|generally|who))\b/i

/** The sentence a block ends on — the lead-in's own, not the commentary before it. */
function lastSentence(text: string): string {
  const t = text.trim()
  const parts = t.split(/(?<=[.!?])\s+(?=[A-Z])/)
  return parts[parts.length - 1]
}

/**
 * The examiner's report with what full credit needed as points, or null when
 * it doesn't list two or more: every list under a lead-in saying so. Under
 * "expected to:" every item is a point (guidance on the list aside); under
 * "any two of the following received full credit:" the items are a pool, and
 * a report with one such list per category ("for the first of these
 * categories …", "for the second …") has a pool for each. Every word of the
 * report stays, in order — the rest of it is text around the points.
 */
export function reportRubric(report: string | undefined): SampleChecklist | null {
  if (!report?.trim()) return null
  const raws = rawBlocks(report)
  // Each list headed by a lead-in: every item of it, or (`pool`) any so many.
  const heads = new Map<number, { pool?: number }>()
  const pools: ChecklistPool[] = []
  raws.forEach((raw, i) => {
    if (raw.list || !raws[i + 1]?.list) return
    const sentence = lastSentence(raw.lines.join(' '))
    if (NOT_A_RUBRIC.test(sentence)) return
    if (POOL_LEAD.test(sentence)) {
      const count = POOL_COUNT.exec(sentence)
      const word = count?.[1] ?? count?.[2]
      pools.push(word ? { need: NUMBER_WORDS[word.toLowerCase()], counted: true } : { need: 1, counted: false })
      heads.set(i, { pool: pools.length - 1 })
    } else if (ALL_LEAD.test(sentence)) heads.set(i, {})
  })
  if (heads.size === 0) return null

  const out = builder()
  let under: { pool?: number } | null = null
  raws.forEach((raw, i) => {
    if (!raw.list) under = heads.get(i) ?? null
    else if (under) {
      const item = itemText(raw.lines)
      const t = item.trim()
      if (ALSO_ACCEPTED.test(t)) { out.point(item, { also: true }); return }
      if (under.pool !== undefined) { out.point(item, { pool: under.pool }); return }
      if (!GUIDANCE.test(t)) { out.point(item); return }
    }
    out.text(raw.lines.join('\n'))
  })
  const points = countPoints(out.blocks, pools)
  if (out.boxes < 2 || points === 0) return null
  return { blocks: out.blocks, boxes: out.boxes, points, pools }
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
 * final figure is checked instead — lib/numericCheck.ts), a keyed part, or
 * neither a rubric in the report nor a sample answer that breaks into two or
 * more boxes, where a checklist would only be the sample again with one box
 * beside it.
 */
export function partChecklist(part: Pick<Part, 'stem' | 'answer' | 'explanation' | 'examiner_report'>): PartChecklist | null {
  if (part.answer !== '' || !part.explanation.trim() || isCalculationPart(part)) return null
  const { intro, samples } = splitSampleAnswers(part.explanation)
  const asked = askedFor(part.stem)
  const checklists = samples.map(sample => withStemCount(sampleChecklist(sample), asked))
  const rubric = withStemCount(reportRubric(part.examiner_report), asked)
  if (!rubric && !checklists.some(c => c.boxes >= 2)) return null
  return {
    intro,
    samples: checklists,
    rubric,
    asked: asked !== null && checklists.some(c => c.points > asked) ? asked : null,
  }
}

/**
 * A list that is one pool of responses under an uncounted heading answers the
 * stem's count from it: "List two likely consequences" over "Sample
 * responses:" and seven of them needs two.
 */
function withStemCount<T extends SampleChecklist | null>(list: T, asked: number | null): T {
  if (list === null || asked === null || list.pools.length !== 1 || list.pools[0].counted) return list
  const pools = [{ need: asked, counted: false }]
  return { ...list, pools, points: countPoints(list.blocks, pools) } as T
}

// ── The suggestion ──────────────────────────────────────────────────────────

/** The points ticked, per sample, by the point's index. */
export type ChecklistTicks = Record<number, readonly number[]>

export interface ChecklistSuggestion {
  suggestion: SelfGrade
  /** The sample the ticks were read against — the one the answer covers most of — or `RUBRIC`. */
  sample: number
  ticked: number
  /** The points that sample needs for full credit — all of them, or as many as the stem asks for. */
  needed: number
}

/**
 * The ticks a list credits, up to `cap`: a point outside a pool for itself, a
 * pool for as many of its responses as it needs, the other accepted answers
 * for each point they stand in for.
 */
function credited(list: SampleChecklist, ticks: readonly number[], cap: number): number {
  const on = new Set(ticks)
  const inPool = new Map<number, number>()
  let count = 0
  for (const b of list.blocks) {
    if (b.kind !== 'point' || !on.has(b.index)) continue
    if (b.pool === undefined) count++
    else inPool.set(b.pool, (inPool.get(b.pool) ?? 0) + 1)
  }
  for (const [pool, n] of inPool) count += Math.min(n, list.pools[pool].need)
  return Math.min(count, cap)
}

/**
 * The grade the ticks point to, or null before any box is ticked — a reader
 * who hasn't used the checklist is given no grade by it. Read against the
 * report's rubric when there is one, else against the sample the answer
 * covers most of: an answer that followed sample 2 is marked against sample
 * 2. Every point needed: full credit; some: partial. It never suggests no
 * credit: a reader whose answer makes none of the points has nothing to tick,
 * and says so with the grade buttons themselves.
 */
export function checklistSuggestion(list: PartChecklist, ticks: ChecklistTicks): ChecklistSuggestion | null {
  const grade = (ticked: number, needed: number): SelfGrade => (ticked >= needed ? 'correct' : ticked > 0 ? 'partial' : 'incorrect')
  if (list.rubric) {
    if (!ticks[RUBRIC]?.length) return null
    const needed = list.rubric.points
    const ticked = credited(list.rubric, ticks[RUBRIC], needed)
    return { suggestion: grade(ticked, needed), sample: RUBRIC, ticked, needed }
  }
  if (!Object.values(ticks).some(t => t.length > 0)) return null
  let best: ChecklistSuggestion | null = null
  list.samples.forEach((sample, i) => {
    if (sample.points === 0) return
    const needed = list.asked !== null ? Math.min(list.asked, sample.points) : sample.points
    const ticked = credited(sample, ticks[i] ?? [], needed)
    if (!best || ticked / needed > best.ticked / best.needed) best = { suggestion: grade(ticked, needed), sample: i, ticked, needed }
  })
  return best
}

/** The suggestion in words: the grade, and the count it came from. */
export function checklistMessage(s: ChecklistSuggestion, list: PartChecklist): { title: string; body: string } {
  const label = s.suggestion === 'correct' ? 'Full credit' : s.suggestion === 'partial' ? 'Partial' : 'No credit'
  const several = list.samples.length > 1
  const points = s.needed === 1 ? 'point' : 'points'
  if (s.sample === RUBRIC) {
    return { title: `Suggested grade: ${label}`, body: `You ticked ${s.ticked} of the ${s.needed} ${points} the examiner's report asks for.` }
  }
  const body = list.asked !== null
    ? `You ticked ${s.ticked} of the ${s.needed} ${points} the question asks for${several ? `, from sample ${s.sample + 1}` : ''}.`
    : `You ticked ${s.ticked} of the ${s.needed} ${points} in ${several ? `sample ${s.sample + 1}` : 'the sample answer'}.`
  return { title: `Suggested grade: ${label}`, body }
}
