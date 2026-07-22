import fm from 'front-matter'

// Parses the per-concept "quick comprehension check" markdown files under
// comprehension-checks/<exam-id>/<Concept Name>.md into the runtime shape the
// collect modal consumes. The markdown mirrors the question bank
// (questions/<exam-id>/*.md): YAML frontmatter + a `- A) …` option list.
//
//   ---
//   concept: Axioms of Probability
//   exam: exam-p
//   topic: General Probability
//   correct: A
//   ---
//   Which statement is NOT one of the three axioms of probability?
//
//   - A) For any two events, P(A ∪ B) = P(A) + P(B)
//   - B) P(S) = 1 for the sample space S
//   - C) P(E) ≥ 0 for every event E
//   - D) For disjoint events, P(A ∪ B) = P(A) + P(B)
//
//   <!-- rationale: … documentation of each distractor's misconception … -->
//
// The `<!-- rationale -->` comment and `exam`/`topic` frontmatter are authoring
// documentation only — they are ignored at runtime.

export interface ComprehensionCheck {
  /** Stem shown in the collect modal — keep it to ~3 sentences. */
  question: string
  /** The answer choices, in authored (canonical) order. The concept's own name
   *  must never appear here — the UI is free to shuffle at render time. */
  options: string[]
  /** Index into `options` of the correct answer. */
  correctIndex: number
}

export interface ParsedComprehensionCheck {
  /** Concept display name — its Concepts/*.md filename without the extension. */
  concept: string
  check: ComprehensionCheck
}

interface CheckFrontmatter {
  concept?: unknown
  correct?: unknown
  exam?: unknown
  topic?: unknown
}

const OPTION_RE = /^- ([A-E])\)\s+(.+)/
const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const

// Parse a single check file. Returns null (rather than throwing) for anything
// malformed, so one bad file can't blank the whole collect gate.
export function parseComprehensionCheck(raw: string): ParsedComprehensionCheck | null {
  try {
    const parsed = fm<CheckFrontmatter>(raw)
    const data = parsed.attributes

    const concept = data.concept != null ? String(data.concept).trim() : ''
    const correctLetter = data.correct != null ? String(data.correct).trim().toUpperCase() : ''
    if (!concept || !correctLetter) return null

    // Everything before the first `- A)` line is the question stem; the option
    // lines follow; anything after them (blank lines, the rationale comment) is
    // ignored.
    const questionLines: string[] = []
    const options: string[] = []
    let inOptions = false

    for (const line of parsed.body.split('\n')) {
      const m = OPTION_RE.exec(line)
      if (m) {
        // Options must run A, B, C, … in order with no gaps or repeats.
        if (m[1] !== LETTERS[options.length]) return null
        inOptions = true
        options.push(m[2].trim())
        continue
      }
      if (!inOptions) questionLines.push(line)
    }

    const question = questionLines.join('\n').trim()
    const correctIndex = LETTERS.indexOf(correctLetter as (typeof LETTERS)[number])
    if (!question || options.length < 2) return null
    if (correctIndex < 0 || correctIndex >= options.length) return null

    return { concept, check: { question, options, correctIndex } }
  } catch {
    return null
  }
}

// Parse a set of raw check files into the concept-keyed lookup the modal reads.
// Later files win on a duplicate concept key (matches object-literal semantics).
export function parseAllComprehensionChecks(rawFiles: string[]): Record<string, ComprehensionCheck> {
  const out: Record<string, ComprehensionCheck> = {}
  for (const raw of rawFiles) {
    const parsed = parseComprehensionCheck(raw)
    if (parsed) out[parsed.concept] = parsed.check
  }
  return out
}
