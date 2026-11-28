// Today's session for one exam (docs/redesign-spec.md §4.2, §4.3): this hook
// gathers what `lib/todaySession.ts` needs, builds the session once a day at
// the reader's chosen length, keeps it in the browser, and reads it back
// against what has been answered since.
//
// The session's *contents* live in localStorage, keyed by account and exam:
// they are a list for one day and are rebuilt tomorrow. The session *length*
// is one setting for every exam, kept in localStorage and, for "Use this every
// day", on the account (`user_metadata.session_minutes`), so another device
// opens at the same length.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useRecentMistakes } from '@/hooks/useRecentMistakes'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { buildMasteryLookup, lookupConceptRecord, resolveConceptState } from '@/lib/conceptMatch'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { Question } from '@/lib/parser'
import { planConceptsToday } from '@/lib/planCompletion'
import { linkedConcept, storeSessionMistakes } from '@/lib/quizBuilder'
import { paceForExam, pointsForPace } from '@/lib/quizTiming'
import { localDayKey } from '@/lib/streak'
import { todayISO, type StudyPlan } from '@/lib/studyPlan'
import {
  DEFAULT_SESSION_LENGTH,
  KEEP_GOING_LENGTH,
  PLAN_LENGTH,
  SESSION_CHOICES,
  buildSession,
  isSessionChoice,
  learnCandidates,
  lengthFor,
  lengthFromStored,
  planBudget,
  readSession,
  reviewCandidates,
  secondsPerQuestion,
  sessionBudget,
  sessionCounts,
  sessionMinutes,
  sessionFromStored,
  sessionIsCurrent,
  sessionIsEmpty,
  sessionRemaining,
  sessionWalk,
  withLength,
  type ConceptStanding,
  type SessionChoice,
  type SessionOption,
  type SessionSupply,
  type SessionView,
  type StoredLength,
  type StoredSession,
} from '@/lib/todaySession'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

export const SESSION_LENGTH_KEY = 'actuarial_session_length_v1'
const SESSION_KEY = 'actuarial_today_session_v1'
/** Outstanding misses read for Fix: everything waiting, bounded. */
const MISTAKE_LIMIT = 500

export function readLength(accountMinutes: unknown): StoredLength {
  try {
    const raw = localStorage.getItem(SESSION_LENGTH_KEY)
    if (raw) return lengthFromStored(JSON.parse(raw))
  } catch { /* private window */ }
  return lengthFromStored(isSessionChoice(accountMinutes) ? { everyDay: accountMinutes } : null)
}

/** Keep the reader's session length: in the browser, and on the account when asked. */
export function saveSessionLength(userId: string | null, next: StoredLength, toAccount: boolean): void {
  try { localStorage.setItem(SESSION_LENGTH_KEY, JSON.stringify(next)) } catch { /* private window */ }
  if (toAccount && userId) {
    void supabase.auth.updateUser({ data: { session_minutes: next.everyDay } })
  }
}

function sessionKey(userId: string | null, examKey: string): string {
  return `${SESSION_KEY}:${userId ?? 'visitor'}:${examKey}`
}

function readStoredSession(key: string): StoredSession | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? sessionFromStored(JSON.parse(raw)) : null
  } catch { return null }
}

/**
 * The concepts of today's session for an exam, lower-cased, as the browser
 * holds it: what the exam page outlines. Empty until Today has built the day's
 * session.
 */
export function storedSessionConcepts(userId: string | null, examKey: string, today: string): Set<string> {
  const session = readStoredSession(sessionKey(userId, examKey))
  if (!session || session.day !== today) return new Set()
  return new Set([...session.learn, ...session.review].map(name => name.toLowerCase()))
}

export interface TodaySessionInput {
  userId: string | null
  /** `user_metadata.session_minutes`, when the account carries one. */
  accountMinutes: unknown
  syllabus: WikiExamSyllabus | null
  examKey: string | null
  /** The question bank's label for this exam (`questionExamLabel`). */
  examLabel: string | null
  /** Mastery records for this exam only. */
  examRecords: ConceptMasteryRecord[]
  /** Today's study plan: a paid plan's, or null (a free session). */
  plan: StudyPlan | null
  /** Plan concepts already done today (`planDoneConceptSlugs`). */
  planDone: ReadonlySet<string>
  questions: readonly Question[]
  todayAnsweredIds: ReadonlySet<string>
  /** Mastery, the plan or the bank is still loading: don't build yet. */
  loading: boolean
}

export interface TodaySession {
  /** The reader's choice today. */
  choice: SessionChoice
  setMinutes: (minutes: SessionChoice, everyDay: boolean) => void
  /** Today's session read against the day; null until it is built, or when nothing is waiting. */
  view: SessionView | null
  /** Built, and nothing was waiting. */
  empty: boolean
  /** The sheet's rows: today's plan first when there is one, then the fixed lengths. */
  options: SessionOption[]
  /** Misses outstanding now, for "Fix" beside a length. */
  launching: boolean
  /** Run what is left of the session as one quiz. */
  start: () => void
  /** Questions missed today and not yet answered right. */
  missedToday: string[]
  fixMissed: () => void
  /** Build a further ten minutes from what is still waiting. */
  keepGoing: () => void
  /** Open a concept of the session in the reader, walking the session's concepts. */
  openConcept: (name: string) => void
  /** Every concept on the syllabus, once each, in syllabus order: the reader's full walk. */
  conceptRefs: WikiEntryRef[]
}

export function useTodaySession(input: TodaySessionInput): TodaySession {
  const { userId, accountMinutes, syllabus, examKey, examLabel, examRecords, plan, planDone, questions, todayAnsweredIds, loading } = input
  const navigate = useNavigate()
  const openDashboard = useConceptPopup(s => s.openDashboard)
  const today = todayISO()

  // ── Length ────────────────────────────────────────────────────────────────
  const [length, setLength] = useState<StoredLength>(() => readLength(accountMinutes))
  const choice = lengthFor(length, today)
  const saveLength = useCallback((next: StoredLength, toAccount: boolean) => {
    setLength(next)
    saveSessionLength(userId, next, toAccount)
  }, [userId])

  // ── What the session draws from ───────────────────────────────────────────
  const { mistakes, loading: mistakesLoading } = useRecentMistakes(examRecords, examLabel, MISTAKE_LIMIT)

  const pace = paceForExam(examLabel)
  const examQuestions = useMemo(
    () => (examLabel ? questions.filter(q => q.exam === examLabel && !q.off_syllabus) : []),
    [questions, examLabel],
  )
  const secondsEach = useMemo(() => {
    if (!pace || pace.per !== 'point' || examQuestions.length === 0) return secondsPerQuestion(pace)
    const total = examQuestions.reduce((n, q) => n + pointsForPace(q.points, pace), 0)
    return secondsPerQuestion(pace, total / examQuestions.length)
  }, [pace, examQuestions])

  /** Lower-cased names of the concepts some question in this exam's bank is tagged with. */
  const quizzable = useMemo(() => {
    const set = new Set<string>()
    for (const q of examQuestions) for (const link of q.wiki_link) set.add(linkedConcept(link))
    return set
  }, [examQuestions])

  const now = useMemo(() => new Date(), [])
  const lookup = useMemo(() => buildMasteryLookup(examRecords), [examRecords])
  const standings = useMemo<ConceptStanding[]>(() => {
    if (!syllabus) return []
    const seen = new Set<string>()
    const out: ConceptStanding[] = []
    for (const topic of syllabus.topics) {
      for (const c of topic.concepts) {
        const key = c.name.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        out.push({
          name: c.name,
          state: resolveConceptState(lookup, c, now),
          lastCorrectAt: lookupConceptRecord(lookup, c)?.last_correct_at ?? null,
        })
      }
    }
    return out
  }, [syllabus, lookup, now])

  const achievedToday = useMemo(() => {
    const set = new Set<string>()
    for (const c of standings) {
      if (c.lastCorrectAt && localDayKey(new Date(c.lastCorrectAt)) === today) set.add(c.name.toLowerCase())
    }
    return set
  }, [standings, today])

  const attemptedToday = useMemo(() => {
    const set = new Set<string>()
    if (todayAnsweredIds.size === 0) return set
    for (const q of examQuestions) {
      if (!todayAnsweredIds.has(q.id)) continue
      for (const link of q.wiki_link) set.add(linkedConcept(link))
    }
    return set
  }, [examQuestions, todayAnsweredIds])

  const supply = useMemo<SessionSupply>(() => {
    // Oldest first: the hook hands the misses newest first.
    const outstanding = [...mistakes].reverse().map(m => m.question.id)
    // The next New concepts in syllabus order, and the concepts closest to
    // stepping down a level. Where the exam has a bank, only concepts it can
    // ask a question on, since the session is a quiz.
    const pool = quizzable.size > 0 ? standings.filter(c => quizzable.has(c.name.toLowerCase())) : standings
    const freeLearn = learnCandidates(pool)
    const freeReview = reviewCandidates(pool, now, today, iso => localDayKey(new Date(iso)))
    if (plan) {
      // A paid plan: what it introduces today, then what it brings back. A
      // longer session goes on to what the plan introduces next, then the
      // rest of the syllabus, and to what is due for review.
      const planConcepts = planConceptsToday(plan).filter(n => !planDone.has(n.toLowerCase()))
      const scheduledNew = new Set(
        plan.assignments
          .filter(a => a.scheduledDate === today && a.initialState === 'new')
          .map(a => a.conceptName.toLowerCase()),
      )
      const learn = plan.status === 'review_mode' ? [] : planConcepts.filter(n => scheduledNew.has(n.toLowerCase()))
      const learnKeys = new Set(learn.map(n => n.toLowerCase()))
      const newNow = new Set(freeLearn.map(n => n.toLowerCase()))
      const upcoming = plan.status === 'review_mode' ? [] : plan.assignments
        .filter(a => a.scheduledDate > today && newNow.has(a.conceptName.toLowerCase()))
        .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
        .map(a => a.conceptName)
      return {
        mistakes: outstanding,
        learn,
        review: planConcepts.filter(n => !learnKeys.has(n.toLowerCase())),
        more: {
          learn: plan.status === 'review_mode' ? [] : [...upcoming, ...freeLearn],
          review: freeReview,
        },
      }
    }
    return { mistakes: outstanding, learn: freeLearn, review: freeReview }
  }, [mistakes, plan, planDone, today, standings, quizzable, now])

  /** Questions and minutes today's plan takes; null with no plan, or nothing left in it today. */
  const planQuestions = useMemo(() => planBudget(supply), [supply])
  const planMinutes = planQuestions === null ? null : sessionMinutes(planQuestions, secondsEach)

  /** A choice as minutes and questions. Today's plan with nothing to size it by is the default length. */
  const sized = useCallback((c: SessionChoice): { minutes: number; n: number } => {
    if (c === PLAN_LENGTH) {
      if (planQuestions !== null && planMinutes !== null) return { minutes: planMinutes, n: planQuestions }
      return { minutes: DEFAULT_SESSION_LENGTH, n: sessionBudget(DEFAULT_SESSION_LENGTH, secondsEach) }
    }
    return { minutes: c, n: sessionBudget(c, secondsEach) }
  }, [planQuestions, planMinutes, secondsEach])

  const options = useMemo<SessionOption[]>(() => SESSION_CHOICES
    .filter(c => c !== PLAN_LENGTH || planQuestions !== null)
    .map(c => {
      const { minutes, n } = sized(c)
      return { choice: c, minutes, counts: sessionCounts(n, supply) }
    }), [sized, planQuestions, supply])

  // ── Today's session, frozen ───────────────────────────────────────────────
  const key = examKey ? sessionKey(userId, examKey) : null
  const [stored, setStored] = useState<StoredSession | null>(() => (key ? readStoredSession(key) : null))
  const [empty, setEmpty] = useState(false)
  useEffect(() => {
    setStored(key ? readStoredSession(key) : null)
    setEmpty(false)
  }, [key])

  const ready = !!key && !!syllabus && !loading && !mistakesLoading
  const build = useCallback((forChoice: SessionChoice) => {
    if (!key) return
    const { minutes, n } = sized(forChoice)
    const next = buildSession(today, forChoice, minutes, n, supply)
    if (sessionIsEmpty(next)) {
      setStored(null)
      setEmpty(true)
      try { localStorage.removeItem(key) } catch { /* private window */ }
      return
    }
    setEmpty(false)
    setStored(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* private window */ }
  }, [key, today, sized, supply])

  useEffect(() => {
    if (!ready || empty) return
    if (!sessionIsCurrent(stored, today, choice)) build(choice)
  }, [ready, empty, stored, today, choice, build])

  const setMinutes = useCallback((next: SessionChoice, everyDay: boolean) => {
    setEmpty(false)
    saveLength(withLength(length, next, today, everyDay), everyDay)
  }, [length, today, saveLength])

  const mistakeById = useMemo(() => new Map(mistakes.map(m => [m.question.id, m])), [mistakes])
  const view = useMemo(() => {
    if (!sessionIsCurrent(stored, today, choice)) return null
    return readSession(stored, {
      // Until the misses have loaded nothing reads as fixed.
      isOutstanding: id => mistakesLoading || mistakeById.has(id),
      answeredToday: id => todayAnsweredIds.has(id),
      conceptAttempted: name => attemptedToday.has(name.toLowerCase()),
      conceptAchieved: name => achievedToday.has(name.toLowerCase()),
      conceptOfMistake: id => mistakeById.get(id)?.problemConcepts[0]?.name ?? null,
    })
  }, [stored, today, choice, mistakesLoading, mistakeById, todayAnsweredIds, attemptedToday, achievedToday])

  // ── Launching ─────────────────────────────────────────────────────────────
  const [launching, setLaunching] = useState(false)
  const allConceptRefs = useMemo<WikiEntryRef[]>(
    () => standings.map(c => ({ kind: 'concept' as const, name: c.name })),
    [standings],
  )
  const openConcept = useCallback((name: string) => {
    if (!view) return
    const walk: WikiEntryRef[] = sessionWalk(view).map(n => ({ kind: 'concept' as const, name: n }))
    const idx = walk.findIndex(r => r.name.toLowerCase() === name.toLowerCase())
    openDashboard(allConceptRefs, walk, 'study-plan', idx === -1 ? 0 : idx, { studyPlanLabel: "Today's session" })
  }, [view, allConceptRefs, openDashboard])

  const launch = useCallback((ids: string[], concepts: string[], learn: string[] = []) => {
    if (!examLabel) return
    storeSessionMistakes({ ids, plan: false, concepts, learn })
    setLaunching(true)
    navigate(`/?topic=${encodeURIComponent(examLabel)}&mode=quiz&autostart=1`)
  }, [examLabel, navigate])

  const start = useCallback(() => {
    if (!view || launching) return
    const { fixIds, concepts } = sessionRemaining(view)
    const askable = concepts.filter(c => quizzable.has(c.toLowerCase()))
    if (fixIds.length === 0 && askable.length === 0) {
      // An exam with no question bank: the session is its reading.
      const first = concepts[0] ?? sessionWalk(view)[0]
      if (first) openConcept(first)
      return
    }
    const learn = new Set(
      view.steps.filter(s => s.kind === 'learn').flatMap(s => s.items.map(i => i.key.toLowerCase())),
    )
    launch(fixIds, askable, askable.filter(c => learn.has(c.toLowerCase())))
  }, [view, launching, quizzable, launch, openConcept])

  const missedToday = useMemo(
    () => mistakes.filter(m => localDayKey(new Date(m.answeredAt)) === today).map(m => m.question.id),
    [mistakes, today],
  )
  const fixMissed = useCallback(() => {
    if (missedToday.length > 0 && !launching) launch(missedToday, [])
  }, [missedToday, launching, launch])

  const keepGoing = useCallback(() => {
    saveLength(withLength(length, KEEP_GOING_LENGTH, today, false), false)
    build(KEEP_GOING_LENGTH)
  }, [length, today, saveLength, build])

  return { choice, setMinutes, view, empty, options, launching, start, missedToday, fixMissed, keepGoing, openConcept, conceptRefs: allConceptRefs }
}
