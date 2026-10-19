import type { Part, Question, SelfGrade } from './parser'

// ── Written parts ───────────────────────────────────────────────────────────
//
// A written part is one the bank holds no answer key for (`answer === ''`):
// a CAS essay or calculation part, marked by the reader against the
// examiners' sample answer. Only the reader can grade it, so it is the one
// kind of part a quiz has to ask them about.

/** The parts of a question only the reader can mark. */
export function writtenParts(question: Question): Part[] {
  if (question.type !== 'multi-part') return []
  return (question.parts ?? []).filter(p => p.answer === '')
}

/**
 * The written parts not yet given a self-grade. `grades` is keyed by part
 * label, the way `QuestionCard` takes them.
 */
export function ungradedWrittenParts(
  question: Question,
  grades: Record<string, SelfGrade | undefined>,
): Part[] {
  return writtenParts(question).filter(p => grades[p.label] === undefined)
}

/**
 * How far a question's written parts have been graded, for the self-grade
 * screen's question bar: `done` when every part has a grade, `partial` when
 * some do, `none` when none do. A question with no written parts is `done` —
 * there is nothing left on it to grade.
 */
export interface GradingProgress {
  state: 'done' | 'partial' | 'none'
  graded: number
  total: number
}

export function gradingProgress(
  question: Question,
  grades: Record<string, SelfGrade | undefined>,
): GradingProgress {
  const total = writtenParts(question).length
  const graded = total - ungradedWrittenParts(question, grades).length
  const state = graded === total ? 'done' : graded > 0 ? 'partial' : 'none'
  return { state, graded, total }
}

// ── Sample answers ──────────────────────────────────────────────────────────
//
// An examiner's report often prints more than one full-credit answer to a
// written part, and the converter keeps them in the part's one
// `### Explanation` block — `Alternatively:` on a line between them (by far
// the most common), `Or:`, a lead-in such as `Alternatively, with phasing:`,
// or a `Sample Answer #1` heading above each. Read as one block they run
// together: the second sample's first bullet looks like the first sample's
// fifth. This splits them apart so each can be drawn as a card of its own. It
// only moves the boundaries — no sample's text is changed beyond the separator
// that is dropped (and the capital a lead-in's first word is given).
//
// A bare `or` / `OR` is deliberately *not* a separator. The papers use it
// inside one answer as often as between two — "Filling an unmet need: … or …"
// under one heading of five (cas6c-2014f-q10) — and splitting there would
// cut a single answer into fragments that each read as a whole one. Kept
// together, such an answer reads as it was printed.
//
// For the same reason an `Alternatively` *inside* one section of a sectioned
// answer splits nothing: "**i. Return on Equity** … Alternatively, on average
// equity: … **ii. Return on Revenue** …" (cas6c-2016f-q22) offers a second
// way to work part i, not a second answer to the question. It is recognised
// by its headings — a sample that opens sections the first sample never had
// is the rest of the first sample. Two whole answers repeat their headings
// ("**Advantages**" in both), or have none.

export interface SampleAnswers {
  /**
   * Text above the first numbered sample heading ("Sample answers include:")
   * — a lead-in to the samples rather than one of them. Null when there is
   * none, and always null when the samples are separated by `Alternatively:`,
   * where the text before the first separator *is* the first sample.
   */
  intro: string | null
  /** The samples, in order. One entry when the text holds no separator. */
  samples: string[]
}

// A line opening with "Alternatively" opens the next sample: bare
// ("Alternatively:"), as a lead-in ("Alternatively, with phasing:",
// "Alternatively (the report's sample answer):"), or with the sample begun on
// the same line ("Alternatively: the insurer may …"). Whatever follows the
// word stays, as the first line of the sample it starts.
const ALTERNATIVELY = /^\s*(\*\*|__)?alternatively\b\1?\s*[:,]?\s*\1?\s*:?\s*(?<lead>.*)$/i
// "Or:" alone, or a lead-in that ends in a colon — "Or, assuming the primary
// insurer is the buyer:". A bare "or" is not one (see above).
const OR = /^\s*(\*\*|__)?or(?:\s*:\s*\1?\s*$|,\s+(?<lead>\S.*:(?:\*\*|__)?)\s*$)/i
// "Sample Answer #1", "Sample Answer 2", "Sample Response 3", "**Sample 1:**",
// "### Sample Answer 1".
const NUMBERED_SAMPLE =
  /^\s*(?:#{1,6}\s+)?(?:\*\*|__)?\s*Sample\s+(?:(?:Answer|Response)\s*)?#?\s*\d+\s*:?\s*(?:\*\*|__)?\s*:?\s*$/i

const FENCE = /^\s*(?:```|~~~)/
// A line that heads a section: "**Advantages**", "**i. Return on Equity:**",
// "### Disadvantages".
const SECTION_HEADING = /^\s*(?:\*\*([^*]+)\*\*|#{1,6}\s+(.+?))\s*:?\s*$/

function sectionHeadings(sample: string): string[] {
  const headings: string[] = []
  for (const line of sample.split('\n')) {
    const m = SECTION_HEADING.exec(line)
    if (m) headings.push((m[1] ?? m[2]).trim().replace(/[:.]+$/, '').toLowerCase())
  }
  return headings
}

// Whether the later samples are really the rest of the first one: it is cut
// into sections, and a later "sample" opens a section it never had.
function splitsOneAnswer(samples: string[]): boolean {
  const first = new Set(sectionHeadings(samples[0]))
  if (first.size === 0) return false
  return samples.slice(1).some(sample => sectionHeadings(sample).some(h => !first.has(h)))
}

// A lead-in's first word, now that it opens the sample: "with phasing:" →
// "With phasing:", "**against the surcharge:**" → "**Against the surcharge:**".
function capitalised(text: string): string {
  return text.replace(/^([*_("“]*)([a-z])/, (_, markup: string, letter: string) => markup + letter.toUpperCase())
}

export function splitSampleAnswers(markdown: string): SampleAnswers {
  const whole = markdown.trim()
  const lines = whole.split('\n')

  interface Chunk { lines: string[]; numbered: boolean }
  const chunks: Chunk[] = [{ lines: [], numbered: false }]
  let inCode = false
  let inMath = false

  for (let line of lines) {
    // A separator only counts between blocks — never inside a fenced code
    // block or a `$$ … $$` display, where "or" can be a line of the working.
    if (!inCode && !inMath) {
      if (NUMBERED_SAMPLE.test(line)) {
        chunks.push({ lines: [], numbered: true })
        continue
      }
      const separator = ALTERNATIVELY.exec(line) ?? OR.exec(line)
      if (separator) {
        chunks.push({ lines: [], numbered: false })
        const lead = (separator.groups?.lead ?? '').trim()
        if (!lead) continue
        line = capitalised(lead)
      }
    }
    if (FENCE.test(line)) inCode = !inCode
    else if (!inCode && (line.match(/\$\$/g) ?? []).length % 2 === 1) inMath = !inMath
    chunks[chunks.length - 1].lines.push(line)
  }

  if (!whole) return { intro: null, samples: [] }
  if (chunks.length === 1) return { intro: null, samples: [whole] }

  const text = (c: Chunk) => c.lines.join('\n').trim()
  // What precedes the first separator: a lead-in when the samples are
  // headed ("Sample Answer 1"), the first sample when they are not.
  const [first, ...rest] = chunks
  const headed = rest[0].numbered
  const intro = headed ? text(first) || null : null
  const samples = (headed ? rest : chunks).map(text).filter(Boolean)

  // A lone sample needs no lead-in of its own: put the two back together.
  if (samples.length <= 1 || splitsOneAnswer(samples)) return { intro: null, samples: [whole] }
  return { intro, samples }
}
