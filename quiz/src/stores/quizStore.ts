import { create } from 'zustand'
import type { Question, QuizMode } from '@/lib/parser'
import { supabase } from '@/lib/supabase'
import { applyAnswer, emptyRecord, type ConceptMasteryRecord } from '@/lib/mastery'
import { hrefToEntryRef } from '@/lib/wikiRoutes'

const TOPIC_TO_EXAM_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
}

// Resolve a Question's wiki_link[] entries to canonical concept names so that
// mastery upserts use the same key (concept_slug) regardless of whether the
// frontmatter spelled the link as "Concepts/X", "/probability/x", or "[[X]]".
function conceptsForQuestion(q: Question): string[] {
  const names = new Set<string>()
  for (const link of q.wiki_link) {
    const ref = hrefToEntryRef(link)
    if (ref?.kind === 'concept' && ref.name) {
      names.add(ref.name)
    } else {
      // Fall back to the slug's last segment (matches ConceptQuestionsModal).
      const last = link.split('/').filter(Boolean).pop()
      if (last) names.add(last.replace(/-/g, ' '))
    }
  }
  return [...names]
}

async function upsertMasteryFromResponses(
  userId: string,
  questions: Question[],
  responses: Record<string, { chosen: string }>,
): Promise<void> {
  // Group answer events by (exam_id, concept_slug). Within a single quiz a
  // concept may be touched multiple times — fold them in question order so
  // streak/state arithmetic is deterministic.
  const events: Array<{ examId: string; conceptSlug: string; isCorrect: boolean; isHard: boolean }> = []
  for (const q of questions) {
    const examId = TOPIC_TO_EXAM_ID[q.topic]
    if (!examId) continue
    const chosen = responses[q.id]?.chosen
    if (chosen === undefined) continue
    const isCorrect = chosen === q.answer
    const isHard = q.difficulty === 'hard'
    for (const conceptSlug of conceptsForQuestion(q)) {
      events.push({ examId, conceptSlug, isCorrect, isHard })
    }
  }
  if (events.length === 0) return

  const keys = [...new Set(events.map(e => `${e.examId}::${e.conceptSlug}`))]

  const { data: existing } = await supabase
    .from('concept_mastery')
    .select('*')
    .eq('user_id', userId)
    .in('exam_id', [...new Set(events.map(e => e.examId))])

  const byKey = new Map<string, ConceptMasteryRecord>()
  for (const r of (existing ?? []) as ConceptMasteryRecord[]) {
    byKey.set(`${r.exam_id}::${r.concept_slug}`, r)
  }
  for (const key of keys) {
    if (byKey.has(key)) continue
    const [examId, conceptSlug] = key.split('::')
    byKey.set(key, emptyRecord(userId, examId, conceptSlug))
  }

  const now = new Date()
  for (const ev of events) {
    const key = `${ev.examId}::${ev.conceptSlug}`
    const prev = byKey.get(key)!
    byKey.set(key, applyAnswer(prev, { isCorrect: ev.isCorrect, isHard: ev.isHard, at: now }))
  }

  const rows = [...byKey.values()].map(r => ({ ...r, updated_at: now.toISOString() }))
  await supabase.from('concept_mastery').upsert(rows, { onConflict: 'user_id,exam_id,concept_slug' })
}

type QuizStatus = 'idle' | 'loading' | 'active' | 'reviewing' | 'complete'

interface Response {
  chosen: string
  timeSpent: number  // seconds
}

export interface CompletedSession {
  questions: Question[]
  responses: Record<string, Response>
  mode: QuizMode
  correctCount: number
  totalQuestions: number
  timeTakenSeconds: number | null
  completedAt: string
}

export interface QuizStore {
  // State
  questions: Question[]
  currentIndex: number
  responses: Record<string, Response>  // keyed by question.id
  flaggedIds: string[]
  mode: QuizMode
  startedAt: Date | null
  questionStartedAt: Date | null
  status: QuizStatus
  error: string | null

  // Actions
  startQuiz: (questions: Question[], mode: QuizMode) => void
  answerQuestion: (questionId: string, chosen: string) => void
  nextQuestion: () => void
  goToPreviousQuestion: () => void
  goToQuestion: (index: number) => void
  toggleFlag: (questionId: string) => void
  completeQuiz: (userId: string | null) => Promise<void>
  resetQuiz: () => void
}

const LAST_SESSION_KEY = 'actuarial_last_session'

const initialState = {
  questions: [] as Question[],
  currentIndex: 0,
  responses: {} as Record<string, Response>,
  flaggedIds: [] as string[],
  mode: 'quiz' as QuizMode,
  startedAt: null,
  questionStartedAt: null,
  status: 'idle' as QuizStatus,
  error: null,
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,

  startQuiz(questions, mode) {
    set({
      ...initialState,
      questions,
      mode,
      status: 'active',
      startedAt: new Date(),
      questionStartedAt: new Date(),
    })
  },

  answerQuestion(questionId, chosen) {
    const { questionStartedAt } = get()
    const timeSpent = questionStartedAt
      ? Math.round((Date.now() - questionStartedAt.getTime()) / 1000)
      : 0
    set(state => ({
      responses: { ...state.responses, [questionId]: { chosen, timeSpent } },
      status: 'reviewing',
    }))
  },

  nextQuestion() {
    const { currentIndex, questions, responses } = get()
    if (currentIndex + 1 >= questions.length) {
      set({ status: 'complete' })
    } else {
      const newIndex = currentIndex + 1
      const nextQ = questions[newIndex]
      const hasResponse = nextQ !== undefined && responses[nextQ.id] !== undefined
      set({ currentIndex: newIndex, status: hasResponse ? 'reviewing' : 'active', questionStartedAt: new Date() })
    }
  },

  goToPreviousQuestion() {
    const { currentIndex, questions, responses } = get()
    if (currentIndex <= 0) return
    const newIndex = currentIndex - 1
    const prevQ = questions[newIndex]
    const hasResponse = prevQ !== undefined && responses[prevQ.id] !== undefined
    set({ currentIndex: newIndex, status: hasResponse ? 'reviewing' : 'active', questionStartedAt: new Date() })
  },

  goToQuestion(index) {
    const { questions, responses } = get()
    if (index < 0 || index >= questions.length) return
    const q = questions[index]
    const hasResponse = q !== undefined && responses[q.id] !== undefined
    set({ currentIndex: index, status: hasResponse ? 'reviewing' : 'active', questionStartedAt: new Date() })
  },

  toggleFlag(questionId) {
    set(state => ({
      flaggedIds: state.flaggedIds.includes(questionId)
        ? state.flaggedIds.filter(id => id !== questionId)
        : [...state.flaggedIds, questionId],
    }))
  },

  async completeQuiz(userId) {
    const { questions, responses, mode, startedAt } = get()
    set({ status: 'complete' })

    const totalSeconds = startedAt
      ? Math.round((Date.now() - startedAt.getTime()) / 1000)
      : null

    const correctCount = questions.filter(q => responses[q.id]?.chosen === q.answer).length

    // Persist to localStorage so /review survives a hard refresh
    const completedSession: CompletedSession = {
      questions,
      responses,
      mode,
      correctCount,
      totalQuestions: questions.length,
      timeTakenSeconds: totalSeconds,
      completedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(LAST_SESSION_KEY, JSON.stringify(completedSession))
    } catch {
      // quota exceeded — continue
    }

    if (!userId) return  // unauthenticated — skip Supabase write

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({
        user_id: userId,
        mode,
        total_questions: questions.length,
        correct_count: correctCount,
        time_taken_seconds: totalSeconds,
        topic: questions[0]?.topic ?? null,
        subtopic: questions[0]?.subtopic ?? null,
        tags: [...new Set(questions.flatMap(q => q.tags))],
      })
      .select()
      .single()

    if (sessionError || !session) {
      set({ error: sessionError?.message ?? 'Failed to save session' })
      return
    }

    // Build all response rows and bulk-insert in a single call
    const responseRows = questions.map(q => ({
      session_id: (session as { id: string }).id,
      user_id: userId,
      question_id: q.id,
      chosen_answer: responses[q.id]?.chosen ?? null,
      correct_answer: q.answer,
      is_correct: responses[q.id]?.chosen === q.answer,
      time_spent_seconds: responses[q.id]?.timeSpent ?? null,
    }))

    const { error: respError } = await supabase
      .from('question_responses')
      .insert(responseRows)

    if (respError) set({ error: respError.message })

    // Persist concept-level mastery state (non-blocking — UI doesn't gate on this)
    upsertMasteryFromResponses(userId, questions, responses).catch(err => {
      console.warn('concept_mastery upsert failed:', err)
    })

    // Upsert exam_progress: transition not_started → in_progress on first quiz
    const topic = questions[0]?.topic ?? null
    const examId = topic ? TOPIC_TO_EXAM_ID[topic] : null
    if (examId) {
      const { data: existing } = await supabase
        .from('exam_progress')
        .select('status')
        .eq('user_id', userId)
        .eq('exam_id', examId)
        .maybeSingle()

      if (!existing || existing.status === 'not_started') {
        await supabase
          .from('exam_progress')
          .upsert(
            { user_id: userId, exam_id: examId, status: 'in_progress', updated_at: new Date().toISOString() },
            { onConflict: 'user_id,exam_id' }
          )
        // Mirror to quiz-journey localStorage so ExamProgressBar reflects on next render
        try {
          const raw = localStorage.getItem('quiz-journey')
          const journey = raw ? JSON.parse(raw) : { selectedTrack: 'DEFAULT', progress: {} }
          if (!journey.progress) journey.progress = {}
          journey.progress[examId] = 'in_progress'
          localStorage.setItem('quiz-journey', JSON.stringify(journey))
        } catch { /* ignore */ }
      }
    }
  },

  resetQuiz() {
    localStorage.removeItem(LAST_SESSION_KEY)
    set(initialState)
  },
}))

export function readLastSession(): CompletedSession | null {
  try {
    const raw = localStorage.getItem(LAST_SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CompletedSession
  } catch {
    return null
  }
}
