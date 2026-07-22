import fm from 'front-matter'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple-choice' | 'free-entry' | 'multi-part'
export type QuizMode = 'quiz' | 'mock-exam'

export interface AnswerOption {
  key: string   // "A", "B", "C", "D"
  text: string
}

export interface Part {
  label: string              // "a", "b", "c", "d", "e"
  points: number
  stem: string
  type: 'multiple-choice' | 'free-entry'
  options: AnswerOption[]    // empty for free-entry
  answer: string             // correct answer value
  explanation: string
  examiner_report?: string
}

export interface Question {
  id: string
  exam: string
  topic: string
  learning_objective: string  // syllabus learning-objective name, e.g. "Univariate Random Variables"
  difficulty: Difficulty
  type: QuestionType
  wiki_link: string[]  // normalized to array; single-string frontmatter becomes [string]
  answer: string       // '' for multi-part (answers live in parts[])
  explanation: string  // '' for multi-part
  points: number
  stem: string         // question body text; shared preamble for multi-part
  options: AnswerOption[]  // [] for free-entry and multi-part
  parts?: Part[]           // populated for multi-part questions
  examiner_report?: string // examiner's notes for single-part question types
  author?: string
  year?: number
  session?: string  // e.g. "Spring" or "Fall" for CAS/SOA sittings
}

export interface QuestionFilter {
  exam?: string
  topic?: string
  topics?: string[]  // multi-select topic filter
  learningObjective?: string
  learningObjectives?: string[]  // multi-select learning-objective filter
  difficulty?: Difficulty
  mode?: QuizMode
  count?: number        // max questions to return
  author?: string       // partial match, case-insensitive
  year?: number
  session?: string      // filter by sitting session, e.g. "Spring" or "Fall"
  search?: string       // free-text search on stem and id
  ids?: string[]        // when set, only return questions whose id is in this list
  concept?: string      // filter by wiki_link concept name (single)
  concepts?: string[]   // filter by wiki_link concept names (multi-select)
}

interface QuestionFrontmatter {
  id?: unknown
  exam?: unknown
  topic?: unknown
  learning_objective?: unknown
  difficulty?: unknown
  type?: unknown
  wiki_link?: unknown
  answer?: unknown
  explanation?: unknown  // kept for backward compat
  points?: unknown
  author?: unknown
  year?: unknown
  session?: unknown
}

const OPTION_REGEX = /^- ([A-E])\)\s+(.+)/

export type SelfGrade = 'correct' | 'partial' | 'incorrect'

// Normalize a free-entry answer for comparison: strip whitespace and common
// currency/formatting characters ($, €, £, commas), then if parseable as a
// number round to 4 decimal places so "3400", "$3,400", and "3,400" all compare
// equal, and "3.670" and "3.67" compare equal.
export function normalizeAnswerText(s: string): string {
  const trimmed = s.trim()
  const stripped = trimmed.replace(/[$€£,]/g, '')
  const num = Number(stripped)
  if (stripped !== '' && !isNaN(num)) {
    return String(Math.round(num * 10000) / 10000)
  }
  return trimmed.toLowerCase()
}

// Single grading function that works for all question types.
export function isAnswerCorrect(question: Question, chosen: string): boolean {
  if (question.type === 'multiple-choice') {
    return chosen === question.answer
  }
  if (question.type === 'free-entry') {
    return normalizeAnswerText(chosen) === normalizeAnswerText(question.answer)
  }
  if (question.type === 'multi-part') {
    try {
      const chosenParts = JSON.parse(chosen) as Record<string, string>
      const parts = question.parts ?? []
      if (parts.length === 0) return false
      // Essay parts (answer === '') are ungraded — exclude from correctness check.
      const gradedParts = parts.filter(p => p.answer !== '')
      if (gradedParts.length === 0) return true
      return gradedParts.every(part => {
        const partChosen = chosenParts[part.label] ?? ''
        if (part.type === 'multiple-choice') return partChosen === part.answer
        return normalizeAnswerText(partChosen) === normalizeAnswerText(part.answer)
      })
    } catch {
      return false
    }
  }
  return false
}

// Whether every graded part of a multi-part question has a non-empty answer
// (essay parts with answer === '' need no user input and are skipped).
export function isMultiPartAnswerComplete(question: Question, chosen: string): boolean {
  const parts = question.parts ?? []
  if (parts.length === 0) return true
  try {
    const chosenParts = JSON.parse(chosen) as Record<string, string>
    return parts.every(p => p.answer === '' || (chosenParts[p.label] ?? '').trim() !== '')
  } catch {
    return false
  }
}

// Parse the content within a single Part block into its sub-sections.
function parsePartSections(content: string): {
  stem: string
  answer: string
  explanation: string
  examiner_report?: string
  options: AnswerOption[]
} {
  const sectionBlocks = content.split(/^### /m)
  const rawStem = sectionBlocks[0].trim()

  let answer = ''
  let explanation = ''
  let examiner_report: string | undefined

  for (let i = 1; i < sectionBlocks.length; i++) {
    const block = sectionBlocks[i]
    const newlineIdx = block.indexOf('\n')
    const heading = (newlineIdx >= 0 ? block.slice(0, newlineIdx) : block).trim().toLowerCase()
    const body = (newlineIdx >= 0 ? block.slice(newlineIdx + 1) : '').trim()

    if (heading === 'answer') {
      answer = body.split('\n')[0].trim()
    } else if (heading === 'explanation') {
      explanation = body
    } else if (heading === 'examiner report') {
      examiner_report = body
    }
  }

  // Detect option lines within the stem (supports mixed MC/free-entry multi-part)
  const stemLines = rawStem.split('\n')
  const optionStartIdx = stemLines.findIndex(l => OPTION_REGEX.test(l))
  let stem = rawStem
  let options: AnswerOption[] = []

  if (optionStartIdx >= 0) {
    stem = stemLines.slice(0, optionStartIdx).join('\n').trim()
    options = stemLines
      .slice(optionStartIdx)
      .filter(l => OPTION_REGEX.test(l))
      .map(l => {
        const match = l.match(OPTION_REGEX)!
        return { key: match[1], text: match[2].trim() }
      })
  }

  return { stem, answer, explanation, examiner_report, options }
}

// Parse the body of a multi-part question into an array of Parts.
// Format:
//   ## Part a (0.25 points)
//   [stem text]
//   ### Answer
//   4.5
//   ### Explanation
//   [text]
//   ### Examiner Report
//   [text]
function parseMultiPartBody(body: string): Part[] | null {
  const PART_HEADING_RE = /^## Part ([A-Ea-e])(?:\s*\(([0-9.]+)\s*points?\))?[^\n]*/gm
  const matches = [...body.matchAll(PART_HEADING_RE)]
  if (matches.length === 0) return null

  const parts: Part[] = []
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const label = match[1].toLowerCase()
    const points = match[2] ? parseFloat(match[2]) : 0

    const startIdx = match.index! + match[0].length
    const endIdx = i + 1 < matches.length ? matches[i + 1].index! : body.length
    const partContent = body.slice(startIdx, endIdx).trim()

    const { stem, answer, explanation, examiner_report, options } = parsePartSections(partContent)
    const type: 'multiple-choice' | 'free-entry' = options.length > 0 ? 'multiple-choice' : 'free-entry'

    // Skip malformed MC parts where the answer key has no matching option
    if (type === 'multiple-choice' && answer && !options.some(o => o.key === answer)) {
      continue
    }

    parts.push({ label, points, stem, type, options, answer, explanation, examiner_report })
  }

  return parts.length > 0 ? parts : null
}

export function parseQuestion(raw: string): Question | null {
  try {
    const parsed = fm<QuestionFrontmatter>(raw)
    const data = parsed.attributes
    const content = parsed.body
    const type = data.type as QuestionType

    if (!data.id || !data.exam || !data.topic || !data.difficulty || !data.type) {
      return null
    }
    // multi-part stores answers in parts[], not in frontmatter
    if (type !== 'multi-part' && !data.answer) {
      return null
    }

    const rawLink = data.wiki_link
    const wikiLinks: string[] = Array.isArray(rawLink)
      ? (rawLink as unknown[]).map(String).filter(s => s.length > 0)
      : rawLink ? [String(rawLink)].filter(s => s.length > 0) : []

    const base = {
      id: String(data.id),
      exam: String(data.exam),
      topic: String(data.topic),
      learning_objective: data.learning_objective ? String(data.learning_objective) : '',
      difficulty: data.difficulty as Difficulty,
      type,
      wiki_link: wikiLinks,
      points: Number(data.points ?? 1),
      author: data.author ? String(data.author) : undefined,
      year: data.year ? Number(data.year) : undefined,
      session: data.session ? String(data.session) : undefined,
    }

    // ── multi-part ──────────────────────────────────────────────────────────
    if (type === 'multi-part') {
      const firstPartIdx = content.search(/^## Part /m)
      const parts = parseMultiPartBody(content)
      if (parts) {
        const stem = firstPartIdx >= 0
          ? content.slice(0, firstPartIdx).trim()
          : content.trim()
        return { ...base, stem, options: [], answer: '', explanation: '', parts }
      }

      // No explicit "## Part" headings — treat the whole body as a single
      // implicit part. Covers single-part CAS written/calculation questions
      // authored with ### Answer/### Explanation/### Examiner Report sections
      // but no part split, so they parse instead of being silently dropped.
      const sec = parsePartSections(content)
      if (!sec.answer && !sec.explanation) return null
      const singlePart: Part = {
        label: 'a',
        points: base.points,
        stem: '',
        type: sec.options.length > 0 ? 'multiple-choice' : 'free-entry',
        options: sec.options,
        answer: sec.answer,
        explanation: sec.explanation,
        examiner_report: sec.examiner_report,
      }
      return { ...base, stem: sec.stem, options: [], answer: '', explanation: '', parts: [singlePart] }
    }

    // ── free-entry and multiple-choice ──────────────────────────────────────
    // Split off "## Explanation" section
    const bodyParts = content.split(/^## Explanation\s*$/m)
    const bodyBeforeExplanation = bodyParts[0]
    const rawExplanation = bodyParts.length > 1 ? bodyParts[1].trim() : null

    // Split off "## Examiner Report" from whichever section it appears in
    let explanation: string
    let examiner_report: string | undefined

    if (rawExplanation !== null) {
      const expParts = rawExplanation.split(/^## Examiner Report\s*$/m)
      explanation = expParts[0].trim()
      examiner_report = expParts.length > 1 ? expParts[1].trim() : undefined
    } else {
      // Backward compat: explanation in YAML frontmatter
      explanation = String(data.explanation ?? '')
    }

    // Also check body-before-explanation for an Examiner Report block
    if (!examiner_report) {
      const bodyExParts = bodyBeforeExplanation.split(/^## Examiner Report\s*$/m)
      if (bodyExParts.length > 1) {
        examiner_report = bodyExParts[1].split(/^## /m)[0].trim() || undefined
      }
    }

    // ── free-entry ──────────────────────────────────────────────────────────
    if (type === 'free-entry') {
      const stemContent = bodyBeforeExplanation
        .split(/^## Examiner Report\s*$/m)[0]
        .trim()

      return {
        ...base,
        stem: stemContent,
        options: [],
        answer: String(data.answer),
        explanation,
        examiner_report,
      }
    }

    // ── multiple-choice ─────────────────────────────────────────────────────
    const lines = bodyBeforeExplanation.trim().split('\n')
    const optionStartIdx = lines.findIndex(l => OPTION_REGEX.test(l))

    const stem = optionStartIdx > 0
      ? lines.slice(0, optionStartIdx).join('\n').trim()
      : bodyBeforeExplanation.trim()

    const options: AnswerOption[] = optionStartIdx >= 0
      ? lines
          .slice(optionStartIdx)
          .filter(l => OPTION_REGEX.test(l))
          .map(l => {
            const match = l.match(OPTION_REGEX)!
            return { key: match[1], text: match[2].trim() }
          })
      : []

    const answerKey = String(data.answer)
    if (options.length === 0 || !options.some(o => o.key === answerKey)) {
      return null
    }

    return {
      ...base,
      stem,
      options,
      answer: answerKey,
      explanation,
      examiner_report,
    }
  } catch {
    return null
  }
}

const STOP_WORDS = new Set([
  'the', 'and', 'that', 'this', 'with', 'for', 'are', 'was', 'were', 'been',
  'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might',
  'shall', 'can', 'does', 'did', 'not', 'but', 'from', 'they', 'their',
  'there', 'when', 'where', 'which', 'who', 'what', 'how', 'its', 'also',
  'more', 'than', 'some', 'such', 'each', 'into', 'about', 'over', 'does',
  'only', 'very', 'even', 'most', 'both', 'your', 'our', 'any', 'all',
])

export function estimateEssayScore(
  userAnswer: string,
  sampleAnswer: string,
): { matched: number; total: number; pct: number } {
  if (!userAnswer.trim() || !sampleAnswer.trim()) return { matched: 0, total: 0, pct: 0 }

  const tokenize = (text: string) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !STOP_WORDS.has(w)),
    )

  const sampleWords = tokenize(sampleAnswer)
  if (sampleWords.size === 0) return { matched: 0, total: 0, pct: 0 }

  const userWords = tokenize(userAnswer)
  let matched = 0
  for (const w of sampleWords) {
    if (userWords.has(w)) matched++
  }

  return { matched, total: sampleWords.size, pct: Math.round((matched / sampleWords.size) * 100) }
}

export function parseAllQuestions(rawFiles: string[]): Question[] {
  const seen = new Set<string>()
  const result: Question[] = []
  for (const raw of rawFiles) {
    const q = parseQuestion(raw)
    if (!q) continue
    if (seen.has(q.id)) continue
    seen.add(q.id)
    result.push(q)
  }
  return result
}

export function filterQuestions(questions: Question[], filters: QuestionFilter): Question[] {
  return questions.filter(q => {
    if (filters.ids?.length) return filters.ids.includes(q.id)
    if (filters.exam && q.exam.toLowerCase() !== filters.exam.toLowerCase()) return false
    if (filters.topic && q.topic.toLowerCase() !== filters.topic.toLowerCase()) return false
    if (filters.topics?.length) {
      if (!filters.topics.some(s => q.topic.toLowerCase() === s.toLowerCase())) return false
    }
    if (filters.learningObjective && q.learning_objective.toLowerCase() !== filters.learningObjective.toLowerCase()) return false
    if (filters.learningObjectives?.length) {
      if (!filters.learningObjectives.some(s => q.learning_objective.toLowerCase() === s.toLowerCase())) return false
    }
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false
    if (filters.author) {
      if (!q.author?.toLowerCase().includes(filters.author.toLowerCase())) return false
    }
    if (filters.year && q.year !== filters.year) return false
    if (filters.session && q.session?.toLowerCase() !== filters.session.toLowerCase()) return false
    if (filters.search) {
      const needle = filters.search.toLowerCase()
      if (!q.stem.toLowerCase().includes(needle) && !q.id.toLowerCase().includes(needle)) return false
    }
    if (filters.concept) {
      const needle = filters.concept.toLowerCase()
      const matches = q.wiki_link.some(link => {
        const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
        const lastSegment = clean.split('/').filter(Boolean).pop() ?? ''
        return lastSegment.toLowerCase() === needle
      })
      if (!matches) return false
    }
    if (filters.concepts?.length) {
      const needles = new Set(filters.concepts.map(c => c.toLowerCase()))
      const matches = q.wiki_link.some(link => {
        const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
        const lastSegment = clean.split('/').filter(Boolean).pop() ?? ''
        return needles.has(lastSegment.toLowerCase())
      })
      if (!matches) return false
    }
    return true
  })
}
