import { create } from 'zustand'
import { isAnswerCorrect, normalizeAnswerText } from '@/lib/parser'
import type { Question, QuizMode, SelfGrade } from '@/lib/parser'
import { supabase } from '@/lib/supabase'
import { applyAnswer, decayIfStale, emptyRecord, sanitizeMasteryState, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { mergeLocalMastery } from '@/lib/localMasteryStore'
import { slugForLink } from '@/lib/conceptMatch'
import { appendTodayLevelUps, addDailyGems, addDailyQuizStats } from '@/lib/dailyProgressStore'
import { recordStreakActivity } from '@/lib/streakStore'
import { xpForAnswers } from '@/lib/xp'
import { recordXp } from '@/lib/xpStore'
import { recordQuestProgress } from '@/lib/questStore'
import { recordLeagueXp } from '@/lib/leagueStore'
import type { QuestAnswer } from '@/lib/quests'
import { LEAGUES_ENABLED, QUESTS_ENABLED, XP_ENABLED } from '@/lib/featureFlags'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { useCollectedCards } from '@/hooks/useCollectedCards'

// A concept must be collected (comprehension check passed) before a correct
// answer can advance it from 'new' to level1. Read straight from the collected
// store so this works outside React (the quiz store is a plain module).
function isConceptCollected(conceptName: string): boolean {
  try {
    return useCollectedCards.getState().isCollected(conceptName)
  } catch {
    return false
  }
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

// The answered questions of a completed quiz, reduced to the shape both the XP
// engine (roadmap P1.2) and the quest engine (P1.4) consume: difficulty-weighted
// correctness, the concepts each question touches (for study-plan focus
// quests), and whether the answer correctly revived a concept that had decayed
// to Forgotten — the `from: 'forgotten'` transitions tell us which concepts
// were revisited.
function quizAnswers(
  questions: Question[],
  responses: Record<string, Response>,
  manualGrades: Record<string, SelfGrade>,
  transitions: MasteryTransition[],
): QuestAnswer[] {
  const decayed = new Set(
    transitions.filter(t => t.from === 'forgotten').map(t => t.conceptSlug),
  )
  const answers: QuestAnswer[] = []
  for (const q of questions) {
    const chosen = responses[q.id]?.chosen
    if (chosen === undefined) continue
    const concepts = conceptsForQuestion(q)
    answers.push({
      isCorrect: effectiveIsCorrect(q, chosen, manualGrades),
      difficulty: q.difficulty,
      reviving: concepts.some(slug => decayed.has(slug)),
      concepts,
    })
  }
  return answers
}

// Award quiz XP toward the daily goal and the weekly league, then advance
// today's quests (which pay their own gem/XP rewards). Sequenced in one
// fire-and-forget chain — never awaited by callers — because both recordXp and
// a quest payout read-modify-write the same user_xp row; firing them
// concurrently could drop one of the writes. All three stores swallow their
// own failures, so this can never break quiz completion.
function awardXpAndQuests(
  userId: string | null,
  questions: Question[],
  responses: Record<string, Response>,
  manualGrades: Record<string, SelfGrade>,
  transitions: MasteryTransition[],
): void {
  if (!XP_ENABLED && !QUESTS_ENABLED && !LEAGUES_ENABLED) return
  const answers = quizAnswers(questions, responses, manualGrades, transitions)
  const levelUps = transitions.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3',
  ).length
  const xp = xpForAnswers(answers)
  // League XP is per-exam: credit it to this quiz's exam (undefined for untracked
  // exams, in which case recordLeagueXp no-ops).
  const leagueExam = EXAM_LABEL_TO_ID[questions[0]?.exam ?? ''] ?? null
  void (async () => {
    if (XP_ENABLED) await recordXp(userId, xp)
    if (LEAGUES_ENABLED) await recordLeagueXp(userId, leagueExam, xp)
    if (QUESTS_ENABLED) {
      await recordQuestProgress(userId, { answers, levelUps, totalQuestions: questions.length })
    }
  })()
}

async function upsertMasteryFromResponses(
  userId: string,
  questions: Question[],
  responses: Record<string, { chosen: string }>,
  fallbackRecords: ConceptMasteryRecord[] = [],
  manualGrades: Record<string, SelfGrade> = {},
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
    const isCorrect = effectiveIsCorrect(q, chosen, manualGrades)
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
    // Log but do not throw — falling back to fallbackRecords (the hook's cached
    // records) lets the upsert still run with the best available starting state.
    // Throwing here would skip the DB write entirely; using empty records here
    // would reset correct_count to 0 and overwrite real progress, preventing
    // concepts from ever advancing past Level 1.
    console.warn('concept_mastery select failed, using cached records:', selectError.message)
  }

  // Index fallback records for O(1) lookup. These are the hook's last-known
  // records — potentially stale if a prior quiz in the same session already
  // advanced the concept — but far better than starting from zero when the
  // DB SELECT returns nothing.
  const fallbackByKey = new Map<string, ConceptMasteryRecord>()
  for (const r of fallbackRecords) {
    fallbackByKey.set(`${r.exam_id}::${r.concept_slug}`, { ...r, state: sanitizeMasteryState(r.state) })
  }

  const byKey = new Map<string, ConceptMasteryRecord>()
  for (const r of (!selectError && existing ? existing : []) as ConceptMasteryRecord[]) {
    byKey.set(`${r.exam_id}::${r.concept_slug}`, r)
  }
  for (const key of keys) {
    if (byKey.has(key)) continue
    // Prefer the hook's cached record over a blank emptyRecord. A cached record
    // preserves the real correct_count from the last session; emptyRecord resets
    // it to 0, causing the upsert to write count=1 (new→level1) and permanently
    // prevent the concept from accumulating the count=2 needed for Level 2.
    const [examId, ...rest] = key.split('::')
    const conceptSlug = rest.join('::')
    byKey.set(key, fallbackByKey.get(key) ?? emptyRecord(userId, examId, conceptSlug))
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
    const collected = isConceptCollected(ev.conceptSlug)
    byKey.set(key, applyAnswer(prev, { isCorrect: ev.isCorrect, isHard: ev.isHard, at: now, collected }))
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

// Returns the effective correctness of a question, taking manual grade overrides
// into account. For multi-part questions each part may be individually overridden.
function effectiveIsCorrect(q: Question, chosen: string, manualGrades: Record<string, SelfGrade>): boolean {
  if (q.type === 'free-entry') {
    const override = manualGrades[q.id]
    if (override !== undefined) return override === 'correct'
    return isAnswerCorrect(q, chosen)
  }
  if (q.type === 'multi-part') {
    try {
      const parts = q.parts ?? []
      const gradedParts = parts.filter(p => p.answer !== '')
      if (gradedParts.length === 0) return true
      const chosenParts = JSON.parse(chosen) as Record<string, string>
      return gradedParts.every(part => {
        const override = manualGrades[`${q.id}__${part.label}`]
        if (override !== undefined) return override === 'correct'
        const partChosen = chosenParts[part.label] ?? ''
        if (part.type === 'multiple-choice') return partChosen === part.answer
        return normalizeAnswerText(partChosen) === normalizeAnswerText(part.answer)
      })
    } catch {
      return false
    }
  }
  return isAnswerCorrect(q, chosen)
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
  manualGrades?: Record<string, SelfGrade>
  // True when this session was completed while signed out, meaning it was
  // only written to localStorage and still needs to be persisted to Supabase
  // once the user signs in (see syncPendingSessionToCloud).
  needsCloudSync?: boolean
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
  manualGrades: Record<string, SelfGrade>

  // Actions
  startQuiz: (questions: Question[], mode: QuizMode) => void
  answerQuestion: (questionId: string, chosen: string) => void
  clearAnswer: (questionId: string) => void
  nextQuestion: () => void
  goToPreviousQuestion: () => void
  goToQuestion: (index: number) => void
  toggleFlag: (questionId: string) => void
  setManualGrade: (key: string, grade: SelfGrade) => void
  completeQuiz: (userId: string | null, priorMasteryRecords?: ConceptMasteryRecord[]) => Promise<void>
  resetQuiz: () => void
}

function computeMasteryTransitions(
  questions: Question[],
  responses: Record<string, { chosen: string }>,
  priorRecords: ConceptMasteryRecord[],
  manualGrades: Record<string, SelfGrade> = {},
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
    const isCorrect = effectiveIsCorrect(q, chosen, manualGrades)
    const isHard = q.difficulty === 'hard'

    for (const conceptSlug of conceptsForQuestion(q)) {
      const key = conceptSlug.toLowerCase()
      const current = simulated.get(key) ?? bySlug.get(key) ?? emptyRecord('', examId, conceptSlug)
      const collected = isConceptCollected(conceptSlug)
      simulated.set(key, applyAnswer(current, { isCorrect, isHard, at: now, collected }))
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

export const LAST_SESSION_KEY = 'actuarial_last_session'

interface PersistableSession {
  questions: Question[]
  responses: Record<string, Response>
  mode: QuizMode
  correctCount: number
  totalSeconds: number | null
  masteryTransitions: MasteryTransition[]
  manualGrades?: Record<string, SelfGrade>
}

// Writes a completed quiz to Supabase: quiz_sessions, question_responses,
// daily_completions, gem rewards and exam_progress. Shared by completeQuiz
// (for users who were already signed in) and syncPendingSessionToCloud (for
// sessions completed while signed out and persisted retroactively after the
// user signs in).
async function persistSessionToCloud(userId: string, params: PersistableSession): Promise<{ error: string | null }> {
  const { questions, responses, mode, correctCount, totalSeconds, masteryTransitions, manualGrades = {} } = params
  const upward = masteryTransitions.filter(
    t => t.to === 'level1' || t.to === 'level2' || t.to === 'level3',
  )

  // Persist the level-ups to daily_completions so the "completed today"
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
    return { error: sessionError?.message ?? 'Failed to save session' }
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
    is_correct: (() => { const c = responses[q.id]?.chosen; return c !== undefined && effectiveIsCorrect(q, c, manualGrades) })(),
    time_spent_seconds: responses[q.id]?.timeSpent ?? null,
    answered_at: answeredAt,
  }))

  const { error: respError } = await supabase
    .from('question_responses')
    .insert(responseRows)

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

  return { error: respError ? respError.message : null }
}

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
  manualGrades: {} as Record<string, SelfGrade>,
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

  setManualGrade(key, grade) {
    set(state => ({ manualGrades: { ...state.manualGrades, [key]: grade } }))
  },

  async completeQuiz(userId, priorMasteryRecords = []) {
    const { questions, responses, mode, startedAt, manualGrades } = get()
    set({ status: 'complete' })

    const totalSeconds = startedAt
      ? Math.round((Date.now() - startedAt.getTime()) / 1000)
      : null

    const correctCount = questions.filter(q => {
      const chosen = responses[q.id]?.chosen
      return chosen !== undefined && effectiveIsCorrect(q, chosen, manualGrades)
    }).length

    if (!userId) {
      // Unauthenticated: no DB to fetch from, so compute transitions from the
      // caller-provided priorMasteryRecords (localStorage). Fire the level-up
      // event so TodayCard reflects progress, then return early.
      const masteryTransitions = computeMasteryTransitions(questions, responses, priorMasteryRecords, manualGrades)
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
        manualGrades: Object.keys(manualGrades).length > 0 ? manualGrades : undefined,
        needsCloudSync: true,
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
      // A correct answer counts as a day of study — extend the streak (guest:
      // localStorage). Gated on at least one correct answer so an all-wrong quiz
      // doesn't bank the day. Idempotent per local day; fire-and-forget.
      if (correctCount > 0) void recordStreakActivity(null)
      // Award XP + quest progress (guest: localStorage). Fire-and-forget.
      awardXpAndQuests(null, questions, responses, manualGrades, masteryTransitions)
      return
    }

    // Authenticated: persist mastery to DB first and get DB-accurate transitions.
    // Using the transitions returned here (rather than computing them from the
    // caller-provided priorMasteryRecords) ensures daily_completions records the
    // correct from/to states even when the hook's cached records are stale — e.g.
    // when a prior quiz already changed the concept's state in this session.
    let masteryTransitions: MasteryTransition[]
    try {
      masteryTransitions = await upsertMasteryFromResponses(userId, questions, responses, priorMasteryRecords, manualGrades)
    } catch (masteryErr) {
      console.error('concept_mastery upsert failed:', masteryErr)
      // Fall back to stale computation so the session record and daily_completions
      // still carry approximate data rather than being empty.
      masteryTransitions = computeMasteryTransitions(questions, responses, priorMasteryRecords, manualGrades)
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
      manualGrades: Object.keys(manualGrades).length > 0 ? manualGrades : undefined,
    }
    try {
      localStorage.setItem(LAST_SESSION_KEY, JSON.stringify(completedSession))
    } catch {
      // quota exceeded — continue
    }

    addDailyQuizStats(correctCount, questions.length)

    // A correct answer counts as a day of study — extend the streak (signed-in:
    // Supabase). Gated on at least one correct answer so an all-wrong quiz
    // doesn't bank the day. Idempotent per local day; fire-and-forget so a
    // streak write never blocks or fails the session save.
    if (correctCount > 0) void recordStreakActivity(userId)
    // Award XP + quest progress (signed-in: Supabase). Fire-and-forget.
    awardXpAndQuests(userId, questions, responses, manualGrades, masteryTransitions)

    // Fire level-up event AFTER mastery is written to localStorage + DB so
    // Dashboard's refresh() call sees up-to-date records immediately.
    appendTodayLevelUps(upward.map(t => ({
      conceptSlug: t.conceptSlug,
      from: t.from,
      to: t.to,
      at: new Date().toISOString(),
    })))

    const { error } = await persistSessionToCloud(userId, {
      questions,
      responses,
      mode,
      correctCount,
      totalSeconds,
      masteryTransitions,
      manualGrades: Object.keys(manualGrades).length > 0 ? manualGrades : undefined,
    })
    if (error) set({ error })
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

// Persists a quiz that was completed while signed out to the user's account
// once they sign in (or create an account) from the results screen. Reads the
// pending session straight from localStorage — rather than the live store,
// which may have already been reset — and runs the same DB writes completeQuiz
// performs for an authenticated user (mastery, quiz_sessions, responses, gems,
// exam progress). Returns true once the session is saved (or was already saved).
export async function syncPendingSessionToCloud(
  userId: string,
  priorMasteryRecords: ConceptMasteryRecord[] = [],
): Promise<boolean> {
  const session = readLastSession()
  if (!session?.needsCloudSync) return false

  const { questions, responses, mode, correctCount, timeTakenSeconds, manualGrades = {} } = session

  let masteryTransitions: MasteryTransition[]
  try {
    masteryTransitions = await upsertMasteryFromResponses(userId, questions, responses, priorMasteryRecords, manualGrades)
  } catch (masteryErr) {
    console.error('concept_mastery upsert failed during pending session sync:', masteryErr)
    masteryTransitions = computeMasteryTransitions(questions, responses, priorMasteryRecords, manualGrades)
  }

  const { error } = await persistSessionToCloud(userId, {
    questions,
    responses,
    mode,
    correctCount,
    totalSeconds: timeTakenSeconds,
    masteryTransitions,
    manualGrades: Object.keys(manualGrades).length > 0 ? manualGrades : undefined,
  })
  if (error) {
    console.error('Failed to save pending quiz session after sign-in:', error)
    return false
  }

  // Seed the signed-in streak for today from this just-synced guest session —
  // only when it had a correct answer (matches the live completeQuiz gate).
  if (correctCount > 0) void recordStreakActivity(userId)
  // Award XP + quest progress for the just-synced guest session on the account.
  awardXpAndQuests(userId, questions, responses, manualGrades, masteryTransitions)

  // Mark as synced so a later visit to /review (or a re-render of this one)
  // doesn't insert a duplicate quiz_sessions row. Keep the rest of the session
  // intact — it's still what /review renders.
  try {
    localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({ ...session, needsCloudSync: false }))
  } catch {
    // quota exceeded — continue
  }

  return true
}
