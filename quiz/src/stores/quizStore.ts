import { create } from 'zustand'
import type { Question, QuizMode } from '@/lib/parser'
import { supabase } from '@/lib/supabase'

const TOPIC_TO_EXAM_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
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
  completeQuiz: (userId: string | null) => Promise<void>
  resetQuiz: () => void
}

const LAST_SESSION_KEY = 'actuarial_last_session'

const initialState = {
  questions: [] as Question[],
  currentIndex: 0,
  responses: {} as Record<string, Response>,
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
