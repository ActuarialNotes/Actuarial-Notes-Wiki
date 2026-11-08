import type { Part, SelfGrade } from './parser'
import { splitSampleAnswers } from './writtenAnswer'

// ── Numeric answer check ────────────────────────────────────────────────────
//
// A calculation part's grade, *suggested*: the reader's final figure set
// against the figure the vault gives for the part. No model, nothing guessed
// about the reader's working — it reads numbers off two pieces of text and
// compares them. The reader still taps the grade; this only says which one
// the figures point to and why (docs/answer-checking.md).
//
// Where the expected figure comes from, most trusted first:
//
//   'answer'  the part's own `### Answer` line — the vault's statement of the
//             result ("Approximately \$17,735 (thousands)", "≈ 0.752",
//             "+3.45%"). Every result the line states is an accepted figure
//             (keyFigures): the line often names CAS's alternatives too. A
//             keyed part is checked against its key alone.
//   'sample'  for a written part with no key, where each sample answer's
//             working ends: the first figure after the last `=` on its last
//             line that has a figure. Softer — a sample can end on an
//             intermediate result, or list other accepted results above — so a
//             miss against it suggests no grade.
//
// Only a calculation part is checked (its stem asks to calculate, compute,
// determine or estimate, or its key is a short line), so a number that
// happens to sit in an essay's sample answer is never taken for its result.

/** A number read off a piece of text. */
export interface ParsedNumber {
  /** Its value: a percentage as a fraction (6.92% → 0.0692), a scale word applied (8,982k → 8,982,000). */
  value: number
  percent: boolean
  /** The number as written, cleaned of markdown and LaTeX: "17,735", "+6.92%". */
  text: string
}

export type NumericVerdict = 'match' | 'close' | 'mismatch'

export interface NumericCheck {
  verdict: NumericVerdict
  /** The grade the figures point to, or null when they're not enough to go on. */
  suggestion: SelfGrade | null
  /** The reader's figure the verdict is about. */
  yours: ParsedNumber
  /** The accepted figure nearest to it. */
  expected: ParsedNumber
  source: 'answer' | 'sample'
  /** How the two had to be read to agree: in other units (thousands, millions), or with the sign flipped. */
  note: 'units' | 'sign' | null
}

/** Within half a percent of the accepted figure: the same answer, rounded. */
export const MATCH_TOLERANCE = 0.005
/** Within 3%: a rounding choice or a small slip, worth partial credit. */
export const CLOSE_TOLERANCE = 0.03

// ── Reading numbers ─────────────────────────────────────────────────────────

/**
 * Markdown and LaTeX reduced to text a number can be read off: `\$` and `$`
 * dropped, `15{,}000` and `15\,000` joined, `\%` a percent sign, `\text{…}`
 * its contents, emphasis gone (a `*` between numbers stays: it multiplies), the Unicode minus a hyphen.
 */
export function plainText(s: string): string {
  return s
    .replace(/\\(?:text|mathrm|textbf|mathbf|operatorname)\{([^{}]*)\}/g, '$1')
    .replace(/\{,\}/g, ',')
    .replace(/(\d)\\[,;! ](?=\d)/g, '$1')
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '')
    .replace(/\$/g, ' ')
    .replace(/\\(?:times|cdot)/g, ' x ')
    .replace(/\\approx/g, '≈')
    .replace(/\\(?:left|right)/g, '')
    .replace(/\*\*|__/g, '')
    // A lone `*` is emphasis beside a word, multiplication between numbers.
    .replace(/(?<![\d\s])\*|\*(?![\d\s])/g, '')
    .replace(/−/g, '-')
}

const NUMBER = /(?<![\w.,])([+-]?)((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?|\.\d+)(?![\d,]\d)(?:\s*(%|percent\b|k\b|thousand\b|million\b|mm\b|m\b|billion\b|bn\b))?/gi

const SCALE: Record<string, number> = {
  k: 1e3, thousand: 1e3, m: 1e6, mm: 1e6, million: 1e6, billion: 1e9, bn: 1e9,
}

const MONTH = '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)'
// A word that makes the number after it a name rather than a quantity:
// AY 2012, age 24, Part 3, Policy 1, Q12, December 31.
const LABEL_BEFORE = new RegExp(`(?:\\b(?:[acpr]y|ays|cys|pys|rys|year|years|q|part|parts|age|ages|policy|policies|territory|class|step|steps|no\\.?|item|option|per|${MONTH})\\s*|#\\s*|[/])$`, 'i')
// …or the word after it: 36 months, 1/1/2020, 2nd.
const LABEL_AFTER = /^(?:\s*-?\s*(?:months?|years?|days?|weeks?|quarters?)\b|st\b|nd\b|rd\b|th\b|\/)/i
// A range of whole numbers is a pair of development ages (12-24, 24-to-36);
// with a decimal on either side it's a subtraction (1-0.8).
const RANGE_AFTER = /^-(?:to-)?\d+(?![.\d])/
const RANGE_BEFORE = /(?:^|[^\d.])\d+-(?:to-)?$/

/**
 * Every quantity in a piece of text, in order. Labels — accident years,
 * development ages, dates, part and policy numbers — are left out, and so is
 * a bare four-digit year.
 */
export function parseNumbers(text: string): ParsedNumber[] {
  const s = plainText(text)
  const out: ParsedNumber[] = []
  for (const m of s.matchAll(NUMBER)) {
    const [whole, sign, digits, unit] = m
    const start = m.index!
    const end = start + whole.length
    if (LABEL_BEFORE.test(s.slice(Math.max(0, start - 14), start))) continue
    if (LABEL_AFTER.test(s.slice(end, end + 12))) continue
    if (!digits.includes('.') && !unit && (RANGE_AFTER.test(s.slice(end, end + 12)) || RANGE_BEFORE.test(s.slice(Math.max(0, start - 8), start)))) continue
    if (!sign && !unit && /^(?:19|20)\d\d$/.test(digits)) continue
    // "($000)": a unit, not a zero.
    if (/^0\d/.test(digits)) continue
    // A list marker: "1. Consult the claims department".
    if (!sign && /^\d{1,2}$/.test(digits) && /^\s*$/.test(s.slice(0, start)) && /^[.)](?:\s|$)/.test(s.slice(end, end + 2))) continue
    const lower = unit?.toLowerCase()
    const percent = lower === '%' || lower === 'percent'
    let value = Number(digits.replace(/,/g, ''))
    if (sign === '-') value = -value
    if (percent) value /= 100
    else if (lower) value *= SCALE[lower]
    out.push({ value, percent, text: whole.trim() })
  }
  return out
}

/** The text after the last `=` or `≈` on a line, or the whole line. */
function afterLastEquals(line: string): string {
  const i = Math.max(line.lastIndexOf('='), line.lastIndexOf('≈'))
  return i >= 0 ? line.slice(i + 1) : line
}

const isTableRow = (line: string) => line.trimStart().startsWith('|')

/**
 * The figures a piece of working ends on: the numbers of its last line that
 * has one, after that line's last `=` if it has one. A reader's response is
 * read this way, and so is a sample answer.
 */
export function finalFigures(text: string): ParsedNumber[] {
  const lines = text.split('\n').map(l => l.replace(/\$\$/g, ' ').trim()).filter(Boolean)
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    if (isTableRow(line)) return []
    const nums = parseNumbers(afterLastEquals(line))
    if (nums.length > 0) return nums
    if (parseNumbers(line).length > 0) return []
  }
  return []
}

// ── What a part's figure should be ──────────────────────────────────────────

type CheckablePart = Pick<Part, 'stem' | 'answer' | 'explanation'>

const COMPUTE = /\b(?:calculate|compute)\b/i
const ESTIMATE = /\b(?:estimate|determine)\b/i
// "Explain how you would estimate…" asks for words, not a figure.
const ASKS_FOR_WORDS = /^\s*(?:briefly\s+)?(?:explain|describe|discuss|identify|list|justify|recommend|evaluate)\b/i

/** A part that asks for a figure: a sentence of its stem says calculate or compute, or estimate or determine where it isn't asking for an explanation. */
export function isCalculationPart(part: CheckablePart): boolean {
  return plainText(part.stem).split(/(?<=[.?!])\s+/).some(sentence =>
    COMPUTE.test(sentence) || (ESTIMATE.test(sentence) && !ASKS_FOR_WORDS.test(sentence)))
}

/** The figures a part accepts, and where they came from; null when there are none to check against. */
export function answerTargets(part: CheckablePart): { targets: ParsedNumber[]; source: 'answer' | 'sample' } | null {
  const calculation = isCalculationPart(part)
  const key = part.answer.trim()
  if (key !== '') {
    const firstLine = key.split('\n')[0]
    if (isTableRow(firstLine)) return null
    if (!calculation && plainText(firstLine).length > 80) return null
    const targets = keyFigures(firstLine)
    return targets.length > 0 ? { targets, source: 'answer' } : null
  }
  if (!calculation) return null
  const targets = sampleFinals(part.explanation)
  return targets.length > 0 ? { targets, source: 'sample' } : null
}

/**
 * The results an answer line states. Each clause ("IBNR = 1,525; total unpaid
 * claims = 2,850", "Class A: -1.7%. Class B: +58.4%") gives the figures after
 * its last `=`, `≈` or `:`, so an input named on the way — the limit in
 * "ILF(\$250,000) = 1.599", the "Scenario 1" in "Scenario 1: \$128,500" — is
 * not taken for a result.
 */
export function keyFigures(line: string): ParsedNumber[] {
  return line
    .replace(LIST_MARKER, '')
    .split(/;|\.\s+(?=[A-Z(*])/)
    .flatMap(clause => {
      const i = Math.max(clause.lastIndexOf('='), clause.lastIndexOf('≈'), clause.lastIndexOf('\\approx'), clause.lastIndexOf(':'))
      if (i < 0) return parseNumbers(clause)
      const after = parseNumbers(clause.slice(i + 1))
      // "About \$12,890: \$12,886 with the rounded factors" — a dollar or
      // percent figure before a colon is a result too; "Scenario 1:" is not.
      const before = clause[i] === ':' && /\$|%/.test(clause.slice(0, i)) ? parseNumbers(clause.slice(0, i)) : []
      return [...before, ...after]
    })
}

const LIST_MARKER = /^\s*(?:\d+|[ivx]+|[a-h])[.)]\s+/i

function sampleFinals(explanation: string): ParsedNumber[] {
  if (!explanation.trim()) return []
  return splitSampleAnswers(explanation).samples.flatMap(finalFigures)
}

// ── Comparing ───────────────────────────────────────────────────────────────

interface Reading { value: number; note: NumericCheck['note'] }

/** The ways a reader's figure can be read against an expected one. */
function readings(yours: ParsedNumber, expected: ParsedNumber): Reading[] {
  const base = [yours.value]
  // 6.92 written for 6.92%: the reader dropped the sign, not the decimal point.
  if (expected.percent && !yours.percent) base.push(yours.value / 100)
  const out: Reading[] = base.map(value => ({ value, note: null }))
  for (const value of base) {
    for (const f of [1e3, 1e6, 1e-3, 1e-6]) out.push({ value: value * f, note: 'units' })
  }
  for (const r of [...out]) out.push({ value: -r.value, note: 'sign' })
  return out
}

function relativeError(a: number, b: number): number {
  if (Math.abs(b) < 1e-12) return Math.abs(a) < 1e-12 ? 0 : Infinity
  return Math.abs(a - b) / Math.abs(b)
}

/**
 * The reader's response checked against the part's accepted figures, or null
 * when either side has no figure — an essay part, an answer that's a table,
 * a response with no number in its last line.
 */
export function checkNumericAnswer(response: string, part: CheckablePart): NumericCheck | null {
  const found = answerTargets(part)
  if (!found) return null
  const mine = finalFigures(response)
  if (mine.length === 0) return null

  let best: { yours: ParsedNumber; expected: ParsedNumber; error: number; note: NumericCheck['note'] } | null = null
  for (const yours of mine) {
    for (const expected of found.targets) {
      for (const r of readings(yours, expected)) {
        const error = relativeError(r.value, expected.value)
        // A plain reading beats a units or sign reading of the same error.
        const rank = error + (r.note ? 1e-9 : 0)
        if (!best || rank < best.error + (best.note ? 1e-9 : 0)) best = { yours, expected, error, note: r.note }
      }
    }
  }
  if (!best) return null

  const { yours, expected, error, note } = best
  // A sign flipped is the right size and the wrong answer: partial at best.
  const verdict: NumericVerdict =
    error <= MATCH_TOLERANCE && note !== 'sign' ? 'match'
      : error <= CLOSE_TOLERANCE ? 'close'
        : 'mismatch'
  // A miss against a sample's last line suggests nothing: the sample may end
  // on an intermediate result, or list other accepted answers above it.
  const suggestion: SelfGrade | null =
    verdict === 'match' ? 'correct'
      : verdict === 'close' ? 'partial'
        : found.source === 'answer' ? 'incorrect' : null
  // A mismatch is about the reader's figure as written, not a reading of it.
  const shownNote = verdict === 'mismatch' ? null : note
  return { verdict, suggestion, yours, expected, source: found.source, note: shownNote }
}

// ── What the suggestion says ────────────────────────────────────────────────

export const SUGGESTION_LABEL: Record<SelfGrade, string> = {
  correct: 'Full credit',
  partial: 'Partial',
  incorrect: 'No credit',
}

/** The suggestion's heading and the sentence under it. */
export function numericCheckMessage(check: NumericCheck): { title: string; body: string } {
  const yours = check.yours.text
  const expected = check.expected.text
  const theirs = check.source === 'answer' ? 'the answer' : "the sample answer's"
  const title = check.suggestion ? `Suggested grade: ${SUGGESTION_LABEL[check.suggestion]}` : 'Check your final figure'
  if (check.verdict === 'match') {
    const body = check.source === 'answer'
      ? `Your final figure, ${yours}, matches the answer, ${expected}`
      : `Your final figure, ${yours}, matches the sample answer's, ${expected}`
    return { title, body: check.note === 'units' ? `${body}, in different units.` : `${body}.` }
  }
  if (check.verdict === 'close') {
    if (check.note === 'sign') {
      return { title, body: `Your final figure, ${yours}, is the size of ${theirs}, ${expected}, with the opposite sign.` }
    }
    return { title, body: `Your final figure, ${yours}, is close to ${theirs}, ${expected}. Check your rounding and your working against the sample answer.` }
  }
  if (check.source === 'answer') {
    return { title, body: `Your final figure, ${yours}, doesn't match the answer, ${expected}. Examiners often give partial credit for correct steps, so compare your working with the sample answer.` }
  }
  return { title, body: `Your final figure, ${yours}, isn't where the sample answer ends (${expected}). It may show other accepted results, so read it before you grade.` }
}
