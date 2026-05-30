import { create } from 'zustand'
import type { Question, QuizMode } from '@/lib/parser'
import { supabase } from '@/lib/supabase'
import { applyAnswer, decayIfStale, emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { mergeLocalMastery } from '@/lib/localMasteryStore'
import { slugForLink } from '@/lib/conceptMatch'
import { appendTodayLevelUps, addDailyGems, addDailyQuizStats } from '@/lib/dailyProgressStore'

const EXAM_LABEL_TO_ID: Record<string, string> = {
  'Probability': 'P',
  'Financial Mathematics': 'FM',
}

// Resolve a Question's wiki_link[] entries to canonical concept names so that
// mastery upserts use the same key (concept_slug) regardless of whether the
// frontmatter spelled the link as "Concepts/X", "/probability/x", or "[[X]]".
function conceptsForQuestion(q: Question): string[] {
  const names = new Set<string>()
  for (const link of q.wiki_link) {
    const slug = slugForLink(link)
    if (slug) names.add(slug)
  }
  return [...names]
}

async function upsertMasteryFromResponses(
  userId: string,
  questions: Question[],
  responses: Record<string, { chosen: string }>,
): Promise<MasteryTransition[]> {
  // Group answer events by (exam_id, concept_slug). Within a single quiz a
  // concept may be touched multiple times — fold them in question order so
  // streak/state arithmetic is deterministic.
  const events: Array<{ examId: string; conceptSlug: string; isCorrect: boolean; isHard: boolean }> = []
  for (const q of questions) {
    const examId = EXAM_LABEL_TO_ID[q.exam]
    if (!examId) continue
    const chosen = responses[q.id]?.chosen
    if (chosen === undefined) continue
    const isCorrect = chosen === q.answer
    const isHard = q.difficulty === 'hard'
    for (const conceptSlug of conceptsForQuestion(q)) {
      events.push({ examId, conceptSlug, isCorrect, isHard })
    }
  }
  if (events.length === 0) return []

  const keys = [...new Set(events.map(e => `${e.examId}::${e.conceptSlug}`))]

  const { data: existing, error: selectError } = await supabase
    .from('concept_mastery')
    .select('*')
    .eq('user_id', userId)
    .in('exam_id', [...new Set(events.map(e => e.examId))])
    .in('concept_slug', [...new Set(events.map(e => e.conceptSlug))])

  if (selectError) {
    // Table may not exist yet (migration not applied to production). Treat as
    // no prior records so the computation and mergeLocalMastery still run.
    console.warn('concept_mastery select failed, continuing with empty state:', selectError.message)
  }

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
  const touchedKeys = new Set(events.map(e => `${e.examId}::${e.conceptSlug}`))

  // Capture the decay-adjusted pre-answer state for each touched concept so
  // transitions reflect what the user actually experienced (e.g. a level1
  // concept that decayed to forgotten before this quiz produces from:'forgotten',
  // not from:'level1'). This must use the fresh DB fetch, NOT caller-provided
  // priorMasteryRecords which may be stale if the React hook hasn't re-fetched
  // since a previous quiz in the same session.
  const preStates = new Map<string, MasteryState>()
  for (const key of touchedKeys) {
    preStates.set(key, decayIfStale(byKey.get(key)!, now).state)
  }

  for (const ev of events) {
    const key = `${ev.examId}::${ev.conceptSlug}`
    const prev = byKey.get(key)!
    byKey.set(key, applyAnswer(prev, { isCorrect: ev.isCorrect, isHard: ev.isHard, at: now }))
  }

  const rows = [...byKey.entries()]
    .filter(([key]) => touchedKeys.has(key))
    .map(([, r]) => ({ ...r, updated_at: now.toISOString() }))

  // Always persist to localStorage first so mastery state survives even if
  // the Supabase write fails (e.g. table not yet migrated in production).
  mergeLocalMastery(rows)

  const { error: upsertError } = await supabase
    .from('concept_mastery')
    .upsert(rows, { onConflict: 'user_id,exam_id,concept_slug' })
  if (upsertError) throw new Error(`concept_mastery upsert: ${upsertError.message}`)

  // Return DB-accurate transitions for daily_completions and session summary.
  const transitions: MasteryTransition[] = []
  for (const key of touchedKeys) {
    const fromState = preStates.get(key)!
    const afterRecord = byKey.get(key)!
    if (fromState !== afterRecord.state) {
      transitions.push({ conceptSlug: afterRecord.concept_slug, from: fromState, to: afterRecord.state })
    }
  }
  return transitions
}

export interface MasteryTransition {
  conceptSlug: string
  from: MasteryState
  to: MasteryState
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
  masteryTransitions?: MasteryTransition[]
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
  clearAnswer: (questionId: string) => void
  nextQuestion: () => void
  goToPreviousQuestion: () => void
  goToQuestion: (index: number) => void
  toggleFlag: (questionId: string) => void
  completeQuiz: (userId: string | null, priorMasteryRecords?: ConceptMasteryRecord[]) => Promise<void>
  resetQuiz: () => void
}

function computeMasteryTransitions(
  questions: Question[],
  responses: Record<string, { chosen: string }>,
  priorRecords: ConceptMasteryRecord[],
): MasteryTransition[] {
  const bySlug = new Map<string, ConceptMasteryRecord>()
  for (const r of priorRecords) {
    bySlug.set(r.concept_slug.toLowerCase(), r)
  }

  // Simulate answers in question order, accumulating state per concept
  const simulated = new Map<string, ConceptMasteryRecord>()
  const now = new Date()

  for (const q of questions) {
    const chosen = responses[q.id]?.chosen
    if (chosen === undefined) continue
    const examId = EXAM_LABEL_TO_ID[q.exam]
    if (!examId) continue
    const isCorrect = chosen === q.answer
    const isHard = q.difficulty === 'hard'

    for (const conceptSlug of conceptsForQuestion(q)) {
      const key = conceptSlug.toLowerCase()
      const current = simulated.get(key) ?? bySlug.get(key) ?? emptyRecord('', examId, conceptSlug)
      simulated.set(key, applyAnswer(current, { isCorrect, isHard, at: now }))
    }
  }

  const transitions: MasteryTransition[] = []
  for (const [key, after] of simulated) {
    // Apply decay so that a concept stored as e.g. level1 but displayed as
    // forgotten (due to elapsed time) produces fromState='forgotten', not
    // 'level1'. Without this, a stale concept answered correctly would compute
    // level1→level1 (no change) and the transition would be silently dropped,
    // causing daily_completions and TodayCard to miss the re-earning event.
    const rawRecord = bySlug.get(key)
    const fromState: MasteryState = rawRecord ? decayIfStale(rawRecord, now).state : 'new'
    if (fromState !== after.state) {
      transitions.push({ conceptSlug: after.concept_slug, from: fromState, to: after.state })
    }
  }
  return transitions
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

  clearAnswer(questionId) {
    set(state => {
      const { [questionId]: _removed, ...rest } = state.responses
      return { responses: rest as Record<string, Response>, status: 'active' }
    })
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

  async completeQuiz(userId, priorMasteryRecords = []) {
    const { questions, responses, mode, startedAt } = get()
    set({ status: 'complete' })

    const totalSeconds = startedAt
      ? Math.round((Date.now() - startedAt.getTime()) / 1000)
      : null

    const correctCount = questions.filter(q => responses[q.id]?.chosen === q.answer).length

    if (!userId) {
      // Unauthenticated: no DB to fetch from, so compute transitions from the
      // caller-provided priorMasteryRecords (localStorage). Fire the level-up
      // event so TodayCard reflects progress, then return early.
      const masteryTransitions = computeMasteryTransitions(questions, responses, priorMasteryRecords)
      const upward = masteryTransitions.filter(
        t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3',
      )
      const completedSession: CompletedSession = {
        questions,
        responses,
        mode,
        correctCount,
        totalQuestions: questions.length,
        timeTakenSeconds: totalSeconds,
        completedAt: new Date().toISOString(),
        masteryTransitions,
      }
      try {
        localStorage.setItem(LAST_SESSION_KEY, JSON.stringify(completedSession))
      } catch {
        // quota exceeded — continue
      }
      appendTodayLevelUps(upward.map(t => ({
        conceptSlug: t.conceptSlug,
        from: t.from,
        to: t.to,
        at: new Date().toISOString(),
      })))
      addDailyQuizStats(correctCount, questions.length)
      return
    }

    // Authenticated: persist mastery to DB first and get DB-accurate transitions.
    // Using the transitions returned here (rather than computing them from the
    // caller-provided priorMasteryRecords) ensures daily_completions records the
    // correct from/to states even when the hook's cached records are stale — e.g.
    // when a prior quiz already changed the concept's state in this session.
    let masteryTransitions: MasteryTransition[]
    try {
      masteryTransitions = await upsertMasteryFromResponses(userId, questions, responses)
    } catch (masteryErr) {
      console.error('concept_mastery upsert failed:', masteryErr)
      // Fall back to stale computation so the session record and daily_completions
      // still carry approximate data rather than being empty.
      masteryTransitions = computeMasteryTransitions(questions, responses, priorMasteryRecords)
    }

    const upward = masteryTransitions.filter(
      t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3',
    )

    // Persist to localStorage so /review survives a hard refresh
    const completedSession: CompletedSession = {
      questions,
      responses,
      mode,
      correctCount,
      totalQuestions: questions.length,
      timeTakenSeconds: totalSeconds,
      completedAt: new Date().toISOString(),
      masteryTransitions,
    }
    try {
      localStorage.setItem(LAST_SESSION_KEY, JSON.stringify(completedSession))
    } catch {
      // quota exceeded — continue
    }

    addDailyQuizStats(correctCount, questions.length)

    // Fire level-up event AFTER mastery is written to localStorage + DB so
    // Dashboard's refresh() call sees up-to-date records immediately.
    appendTodayLevelUps(upward.map(t => ({
      conceptSlug: t.conceptSlug,
      from: t.from,
      to: t.to,
      at: new Date().toISOString(),
    })))

    // Also persist the level-ups to daily_completions so the "completed today"
    // checkmark syncs across devices (localStorage above is device-local only).
    // Wrapped in try-catch so any failure here cannot abort the quiz_sessions insert below.
    try {
      const completionExamId = EXAM_LABEL_TO_ID[questions[0]?.exam ?? '']
      if (completionExamId && upward.length > 0) {
        const day = new Date().toISOString().slice(0, 10)
        const nowIso = new Date().toISOString()
        const completionRows = upward.map(t => ({
          user_id: userId,
          exam_id: completionExamId,
          concept_slug: t.conceptSlug,
          day,
          from_state: t.from,
          to_state: t.to,
          at: nowIso,
        }))
        const { error: completionError } = await supabase
          .from('daily_completions')
          .upsert(completionRows, { onConflict: 'user_id,exam_id,concept_slug,day' })
        if (completionError) {
          // Table may not be migrated yet — the local signal still works.
          console.warn('daily_completions upsert failed:', completionError.message)
        }
      }
    } catch (err) {
      console.warn('daily_completions upsert threw:', err)
    }

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({
        user_id: userId,
        mode,
        total_questions: questions.length,
        correct_count: correctCount,
        time_taken_seconds: totalSeconds,
        exam: questions[0]?.exam ?? null,
        topic: questions[0]?.topic ?? null,
      })
      .select()
      .single()

    if (sessionError || !session) {
      set({ error: sessionError?.message ?? 'Failed to save session' })
      return
    }

    // Signal useProgress (same tab) to refetch immediately — Supabase Realtime
    // doesn't fire for quiz_sessions because it's not in the realtime publication.
    window.dispatchEvent(new CustomEvent('quiz-session-saved'))

    // Use a JS timestamp for answered_at rather than the DB DEFAULT now().
    // daily_completions.at is also a JS timestamp set earlier in this function,
    // so using JS time here guarantees answered_at > daily_completions.at even
    // when the Supabase server clock lags the client clock. Without this, clock
    // skew can place dots before their level-up events, making levelAtTime()
    // return the pre-correction level and rendering dots below the graph line.
    const answeredAt = new Date().toISOString()

    // Build all response rows and bulk-insert in a single call
    const responseRows = questions.map(q => ({
      session_id: (session as { id: string }).id,
      user_id: userId,
      question_id: q.id,
      chosen_answer: responses[q.id]?.chosen ?? null,
      correct_answer: q.answer,
      is_correct: responses[q.id]?.chosen === q.answer,
      time_spent_seconds: responses[q.id]?.timeSpent ?? null,
      answered_at: answeredAt,
    }))

    const { error: respError } = await supabase
      .from('question_responses')
      .insert(responseRows)

    if (respError) set({ error: respError.message })

    // Award 1 gem per correct answer. Failure here is non-fatal: gem rewards
    // are nice-to-have and shouldn't block session save.
    if (correctCount > 0) {
      const { error: gemError } = await supabase.rpc('award_gems', { p_amount: correctCount })
      if (gemError) {
        console.warn('award_gems failed:', gemError.message)
      } else {
        // Notify useGems subscribers to re-fetch immediately (Supabase realtime
        // may lag or be blocked by RLS on RPC-triggered writes).
        window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount: correctCount } }))
        addDailyGems(correctCount)
      }
    }

    // Upsert exam_progress: transition not_started → in_progress on first quiz
    const examLabel = questions[0]?.exam ?? null
    const examId = examLabel ? EXAM_LABEL_TO_ID[examLabel] : null
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
