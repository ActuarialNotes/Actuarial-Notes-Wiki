import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  parseComprehensionCheck,
  parseAllComprehensionChecks,
} from './comprehensionCheckParser'

const SAMPLE = `---
concept: Axioms of Probability
exam: exam-p
topic: General Probability
correct: A
---
Which statement is NOT one of the three axioms of probability?

- A) For any two events, P(A ∪ B) = P(A) + P(B)
- B) P(S) = 1 for the sample space S
- C) P(E) ≥ 0 for every event E
- D) For disjoint events, P(A ∪ B) = P(A) + P(B)

<!-- rationale: 0: correct — additivity holds only for disjoint events -->
`

describe('parseComprehensionCheck', () => {
  it('parses a well-formed check into concept + check', () => {
    const parsed = parseComprehensionCheck(SAMPLE)
    expect(parsed).not.toBeNull()
    expect(parsed!.concept).toBe('Axioms of Probability')
    expect(parsed!.check.question).toBe(
      'Which statement is NOT one of the three axioms of probability?',
    )
    expect(parsed!.check.options).toHaveLength(4)
    expect(parsed!.check.options[0]).toBe('For any two events, P(A ∪ B) = P(A) + P(B)')
    expect(parsed!.check.correctIndex).toBe(0)
  })

  it('maps the correct letter to the right index', () => {
    const parsed = parseComprehensionCheck(SAMPLE.replace('correct: A', 'correct: D'))
    expect(parsed!.check.correctIndex).toBe(3)
  })

  it('ignores the rationale comment and trailing prose', () => {
    const parsed = parseComprehensionCheck(SAMPLE)
    expect(parsed!.check.options).toHaveLength(4)
    expect(parsed!.check.options.join(' ')).not.toContain('rationale')
  })

  it('returns null when concept is missing', () => {
    expect(parseComprehensionCheck(SAMPLE.replace('concept: Axioms of Probability\n', ''))).toBeNull()
  })

  it('returns null when correct is missing', () => {
    expect(parseComprehensionCheck(SAMPLE.replace('correct: A\n', ''))).toBeNull()
  })

  it('returns null when the correct letter is out of range', () => {
    // Only A–D exist; E has no option.
    expect(parseComprehensionCheck(SAMPLE.replace('correct: A', 'correct: E'))).toBeNull()
  })

  it('returns null when option letters are out of sequence (a gap)', () => {
    const gapped = SAMPLE.replace('- B) P(S) = 1 for the sample space S\n', '')
    expect(parseComprehensionCheck(gapped)).toBeNull()
  })

  it('returns null for a non-check markdown file', () => {
    expect(parseComprehensionCheck('# Just a heading\n\nSome prose.')).toBeNull()
  })
})

describe('parseAllComprehensionChecks', () => {
  it('keys checks by concept name', () => {
    const map = parseAllComprehensionChecks([SAMPLE])
    expect(Object.keys(map)).toEqual(['Axioms of Probability'])
    expect(map['Axioms of Probability']!.correctIndex).toBe(0)
  })

  it('skips malformed files without throwing', () => {
    const map = parseAllComprehensionChecks(['garbage', SAMPLE])
    expect(Object.keys(map)).toEqual(['Axioms of Probability'])
  })
})

// Corpus validation — guards the actual comprehension-checks/**/*.md content the
// app bundles, recovering the compile-time guarantees the old TS constant gave:
// every file parses, has exactly 4 options, an in-range correct index, and a
// concept name that matches its filename.
describe('comprehension-checks corpus', () => {
  const CONTENT_ROOT = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../../comprehension-checks',
  )

  const files = readdirSync(CONTENT_ROOT, { recursive: true, withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.md'))
    .map(d => ({
      name: d.name,
      full: path.join(d.parentPath ?? (d as unknown as { path: string }).path, d.name),
    }))

  it('finds the check files on disk', () => {
    expect(files.length).toBeGreaterThan(150)
  })

  it('every file parses into a valid check', () => {
    const failures: string[] = []
    for (const f of files) {
      const raw = readFileSync(f.full, 'utf-8')
      const parsed = parseComprehensionCheck(raw)
      if (!parsed) { failures.push(`${f.name}: failed to parse`); continue }
      const { concept, check } = parsed
      const expectedConcept = f.name.replace(/\.md$/, '')
      if (concept !== expectedConcept) {
        failures.push(`${f.name}: concept "${concept}" != filename`)
      }
      if (check.options.length !== 4) {
        failures.push(`${f.name}: ${check.options.length} options (expected 4)`)
      }
      if (check.correctIndex < 0 || check.correctIndex >= check.options.length) {
        failures.push(`${f.name}: correctIndex ${check.correctIndex} out of range`)
      }
      if (!check.question.trim()) failures.push(`${f.name}: empty question`)
      // The design rule: the correct answer is never the concept's own name.
      if (check.options[check.correctIndex]!.toLowerCase() === concept.toLowerCase()) {
        failures.push(`${f.name}: correct answer is the concept name`)
      }
    }
    expect(failures).toEqual([])
  })

  // Stems and options are rendered as markdown (MarkdownText) so authored LaTeX
  // shows as formulae, which means `$` is a math delimiter. A bare currency `$`
  // is therefore dangerous: two of them on one line silently swallow the text
  // between into an inline-math node ("$40,000 in a bond and $60,000" renders
  // the prose as math). Currency must be written `\$`.
  //
  // The proxy for "this is currency" is a digit straight after an unescaped `$`,
  // which can't be told apart from a math span that opens on a number. So the
  // rule is also an authoring constraint: don't start inline math with a bare
  // digit — lead with an operator, a parenthesis, or \text{} instead.
  it('escapes currency dollars, keeping math delimiters balanced', () => {
    const failures: string[] = []
    for (const f of files) {
      const parsed = parseComprehensionCheck(readFileSync(f.full, 'utf-8'))
      if (!parsed) continue
      const segments = [parsed.check.question, ...parsed.check.options]
      for (const text of segments) {
        if (/(?<!\\)\$\d/.test(text)) {
          failures.push(`${f.name}: unescaped currency $ (write \\$) in "${text}"`)
        }
        const delimiters = text.match(/(?<!\\)\$/g)?.length ?? 0
        if (delimiters % 2 !== 0) {
          failures.push(`${f.name}: ${delimiters} unescaped $ — unbalanced math in "${text}"`)
        }
      }
    }
    expect(failures).toEqual([])
  })

  it('has no duplicate concept keys across files', () => {
    const seen = new Map<string, string>()
    const dups: string[] = []
    for (const f of files) {
      const parsed = parseComprehensionCheck(readFileSync(f.full, 'utf-8'))
      if (!parsed) continue
      const prev = seen.get(parsed.concept)
      if (prev) dups.push(`${parsed.concept}: ${prev} & ${f.name}`)
      else seen.set(parsed.concept, f.name)
    }
    expect(dups).toEqual([])
  })
})
