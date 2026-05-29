import fm from 'front-matter'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple-choice'
export type QuizMode = 'quiz' | 'mock-exam'

export interface AnswerOption {
  key: string   // "A", "B", "C", "D"
  text: string
}

export interface Question {
  id: string
  exam: string
  topic: string
  learning_objective: string  // syllabus learning-objective name, e.g. "Univariate Random Variables"
  difficulty: Difficulty
  type: QuestionType
  wiki_link: string[]  // normalized to array; single-string frontmatter becomes [string]
  answer: string       // e.g. "B"
  explanation: string
  points: number
  stem: string         // question body text (above the options list)
  options: AnswerOption[]
  author?: string
  year?: number
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
}

const OPTION_REGEX = /^- ([A-E])\)\s+(.+)/

export function parseQuestion(raw: string): Question | null {
  try {
    const parsed = fm<QuestionFrontmatter>(raw)
    const data = parsed.attributes
    const content = parsed.body

    // Validate required fields (explanation is now in the body, not required in YAML)
    if (!data.id || !data.exam || !data.topic || !data.difficulty ||
        !data.type || !data.answer) {
      return null
    }

    // Split body at "## Explanation" section
    const bodyParts = content.split(/^## Explanation\s*$/m)
    const bodyBeforeExplanation = bodyParts[0]
    const explanationFromBody = bodyParts.length > 1 ? bodyParts[1].trim() : null

    // Fall back to YAML explanation for backward compatibility
    const explanation = explanationFromBody ?? String(data.explanation ?? '')

    // Split stem from options — options start with "- A)" pattern
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

    // Reject malformed questions where the answer key doesn't match any parsed
    // option — otherwise grading silently treats every response as wrong.
    const answerKey = String(data.answer)
    if (options.length === 0 || !options.some(o => o.key === answerKey)) {
      return null
    }

    const rawLink = data.wiki_link
    const wikiLinks: string[] = Array.isArray(rawLink)
      ? (rawLink as unknown[]).map(String).filter(s => s.length > 0)
      : rawLink ? [String(rawLink)].filter(s => s.length > 0) : []

    return {
      id: String(data.id),
      exam: String(data.exam),
      topic: String(data.topic),
      learning_objective: data.learning_objective ? String(data.learning_objective) : '',
      difficulty: data.difficulty as Difficulty,
      type: data.type as QuestionType,
      wiki_link: wikiLinks,
      answer: String(data.answer),
      explanation,
      points: Number(data.points ?? 1),
      stem,
      options,
      author: data.author ? String(data.author) : undefined,
      year: data.year ? Number(data.year) : undefined,
    }
  } catch {
    return null
  }
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
