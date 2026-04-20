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
  topic: string
  subtopic: string
  difficulty: Difficulty
  type: QuestionType
  tags: string[]
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
  topic?: string
  subtopic?: string
  subtopics?: string[]  // multi-select subtopic filter
  difficulty?: Difficulty
  tags?: string[]
  mode?: QuizMode
  count?: number        // max questions to return
  author?: string       // partial match, case-insensitive
  year?: number
  search?: string       // free-text search on stem and id
  ids?: string[]        // when set, only return questions whose id is in this list
}

interface QuestionFrontmatter {
  id?: unknown
  topic?: unknown
  subtopic?: unknown
  difficulty?: unknown
  type?: unknown
  tags?: unknown
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
    if (!data.id || !data.topic || !data.subtopic || !data.difficulty ||
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

    const rawLink = data.wiki_link
    const wikiLinks: string[] = Array.isArray(rawLink)
      ? (rawLink as unknown[]).map(String).filter(s => s.length > 0)
      : rawLink ? [String(rawLink)].filter(s => s.length > 0) : []

    return {
      id: String(data.id),
      topic: String(data.topic),
      subtopic: String(data.subtopic),
      difficulty: data.difficulty as Difficulty,
      type: data.type as QuestionType,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
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
    if (filters.topic && q.topic.toLowerCase() !== filters.topic.toLowerCase()) return false
    if (filters.subtopic && q.subtopic.toLowerCase() !== filters.subtopic.toLowerCase()) return false
    if (filters.subtopics?.length) {
      if (!filters.subtopics.some(s => q.subtopic.toLowerCase() === s.toLowerCase())) return false
    }
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false
    if (filters.tags?.length) {
      if (!filters.tags.every(t => q.tags.includes(t))) return false
    }
    if (filters.author) {
      if (!q.author?.toLowerCase().includes(filters.author.toLowerCase())) return false
    }
    if (filters.year && q.year !== filters.year) return false
    if (filters.search) {
      const needle = filters.search.toLowerCase()
      if (!q.stem.toLowerCase().includes(needle) && !q.id.toLowerCase().includes(needle)) return false
    }
    return true
  })
}
