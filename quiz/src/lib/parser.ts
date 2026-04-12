import fm from 'front-matter'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple-choice'
export type QuizMode = 'topic' | 'random' | 'exam'

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
  wiki_link: string
  answer: string       // e.g. "B"
  explanation: string
  points: number
  stem: string         // question body text (above the options list)
  options: AnswerOption[]
}

export interface QuestionFilter {
  topic?: string
  subtopic?: string
  difficulty?: Difficulty
  tags?: string[]
  mode?: QuizMode
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
  explanation?: unknown
  points?: unknown
}

const OPTION_REGEX = /^- ([A-E])\)\s+(.+)/

export function parseQuestion(raw: string): Question | null {
  try {
    const parsed = fm<QuestionFrontmatter>(raw)
    const data = parsed.attributes
    const content = parsed.body

    // Validate required fields
    if (!data.id || !data.topic || !data.subtopic || !data.difficulty ||
        !data.type || !data.answer || !data.explanation) {
      return null
    }

    // Split stem from options — options start with "- A)" pattern
    const lines = content.trim().split('\n')
    const optionStartIdx = lines.findIndex(l => OPTION_REGEX.test(l))

    const stem = optionStartIdx > 0
      ? lines.slice(0, optionStartIdx).join('\n').trim()
      : content.trim()

    const options: AnswerOption[] = optionStartIdx >= 0
      ? lines
          .slice(optionStartIdx)
          .filter(l => OPTION_REGEX.test(l))
          .map(l => {
            const match = l.match(OPTION_REGEX)!
            return { key: match[1], text: match[2].trim() }
          })
      : []

    return {
      id: String(data.id),
      topic: String(data.topic),
      subtopic: String(data.subtopic),
      difficulty: data.difficulty as Difficulty,
      type: data.type as QuestionType,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      wiki_link: String(data.wiki_link ?? ''),
      answer: String(data.answer),
      explanation: String(data.explanation),
      points: Number(data.points ?? 1),
      stem,
      options,
    }
  } catch {
    return null
  }
}

export function parseAllQuestions(rawFiles: string[]): Question[] {
  return rawFiles.flatMap(raw => {
    const q = parseQuestion(raw)
    return q ? [q] : []
  })
}

export function filterQuestions(questions: Question[], filters: QuestionFilter): Question[] {
  return questions.filter(q => {
    if (filters.topic && q.topic.toLowerCase() !== filters.topic.toLowerCase()) return false
    if (filters.subtopic && q.subtopic.toLowerCase() !== filters.subtopic.toLowerCase()) return false
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false
    if (filters.tags?.length) {
      if (!filters.tags.every(t => q.tags.includes(t))) return false
    }
    return true
  })
}
