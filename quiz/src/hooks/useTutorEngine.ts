import { useEffect, useMemo, useState } from 'react'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useExamProgress } from '@/contexts/examProgress'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions, type Question } from '@/lib/parser'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { loadCachedStudyPlan } from '@/lib/studyPlan'
import { EXAM_SITTINGS } from '@/data/examSittings'
import { DEFAULT_TUTOR_EXAM, type TutorExam } from '@/lib/tutor/exams'
import { buildItems, itemsByConcept, type TutorItem } from '@/lib/tutor/items'
import { foldLog, introducedOn, ladderSeeds, type TutorModel } from '@/lib/tutor/log'
import { dayKey } from '@/lib/tutor/memory'
import {
  daysToExam,
  journeyPhase,
  resolveExamDate,
  syllabusCoverage,
  type Coverage,
  type ExamDate,
  type JourneyPhase,
} from '@/lib/tutor/journey'
import { dayPlan, tutorSyllabus, type DayPlan, type SchedulerInput, type SyllabusConcept } from '@/lib/tutor/scheduler'
import { foundationsOf, oneWayFoundations } from '@/lib/tutor/diagnosis'
import { useTutorStore } from '@/stores/tutorStore'

// The Tutor's engine, wired to the app (docs/tutor.md §15): the bundled
// syllabus page, the candidate's mastery rows, their exam date, today's study
// plan and the question bank, folded with the Tutor's own log into the one
// model every view reads. Everything it computes is a pure lib/tutor/ call;
// this hook only gathers the inputs and keeps the clock.

export interface TutorEngine {
  /** The bank and the syllabus are in. */
  ready: boolean
  exam: TutorExam
  syllabus: SyllabusConcept[]
  items: TutorItem[]
  byConcept: Map<string, TutorItem[]>
  model: TutorModel
  /** The ladder's state per concept for this exam, lowercased, decay applied. */
  ladder: Map<string, MasteryState>
  records: ConceptMasteryRecord[]
  examDate: ExamDate
  daysLeft: number | null
  coverage: Coverage
  phase: JourneyPhase
  now: Date
  today: string
  /** The scheduler's input, before a session's own state is added. */
  base: SchedulerInput
  plan: DayPlan
  /** Each concept's foundations — what its page defines it by (§7.5), lowercased key. */
  foundations: Map<string, string[]>
}

/** A clock that moves once a minute — enough for due dates and relearn gaps. */
function useMinuteClock(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

// The bank is a lazy chunk of its own (~11 MB raw); only this exam's files are
// parsed out of it.
function useExamQuestions(exam: TutorExam): Question[] | null {
  const [questions, setQuestions] = useState<Question[] | null>(null)
  useEffect(() => {
    let cancelled = false
    const label = new RegExp(`^exam:\\s*["']?${exam.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\s*$`, 'm')
    const load = () => {
      fetchAllQuestions()
        .then(raw => { if (!cancelled) setQuestions(parseAllQuestions(raw.filter(r => label.test(r)))) })
        .catch(() => { if (!cancelled) setQuestions([]) })
    }
    // Not on the first paint's critical path: wait for the app to settle.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(load, { timeout: 4000 })
      return () => { cancelled = true; window.cancelIdleCallback(id) }
    }
    const t = window.setTimeout(load, 1500)
    return () => { cancelled = true; window.clearTimeout(t) }
  }, [exam.label])
  return questions
}

// What each syllabus concept's page defines it by. The pages are the Study
// Guides' own lazy bundle — already warmed when the app is idle — read once.
function useFoundations(syllabus: readonly SyllabusConcept[], after: boolean): Map<string, string[]> {
  const [foundations, setFoundations] = useState<Map<string, string[]>>(new Map())
  useEffect(() => {
    if (!after || syllabus.length === 0) return
    let cancelled = false
    import('virtual:wiki-content')
      .then(({ default: bundle }) => {
        if (cancelled) return
        const names = syllabus.map(c => c.name)
        const pages = new Map(bundle.index.filter(i => i.category === 'concept').map(i => [i.name.toLowerCase(), i.path]))
        const map = new Map<string, string[]>()
        for (const name of names) {
          const path = pages.get(name.toLowerCase())
          const markdown = path ? bundle.files[path] : undefined
          if (markdown) map.set(name.toLowerCase(), foundationsOf(name, markdown, names))
        }
        setFoundations(oneWayFoundations(map))
      })
      .catch(() => { /* foundations are a refinement; the rest works without */ })
    return () => { cancelled = true }
  }, [syllabus, after])
  return foundations
}

export function useTutorEngine(): TutorEngine {
  const exam = DEFAULT_TUTOR_EXAM
  const now = useMinuteClock()
  const today = dayKey(now)
  const { syllabi } = useWikiSyllabus()
  const { records } = useConceptMastery()
  const { targetDates } = useExamProgress()
  const events = useTutorStore(s => s.events)
  const questions = useExamQuestions(exam)

  const syllabus = useMemo(() => {
    const page = syllabi.find(s => s.fileName === exam.pageFile)
    return page ? tutorSyllabus(page) : []
  }, [syllabi, exam.pageFile])

  const items = useMemo(() => (questions ? buildItems(questions, exam) : []), [questions, exam])
  const byConcept = useMemo(() => itemsByConcept(items), [items])
  const seeds = useMemo(() => ladderSeeds(records, exam.progressKey), [records, exam.progressKey])
  const ladder = useMemo(() => {
    const map = new Map<string, MasteryState>()
    for (const r of records) {
      if (r.exam_id === exam.progressKey) map.set(r.concept_slug.toLowerCase(), decayIfStale(r, now).state)
    }
    return map
  }, [records, exam.progressKey, now])
  const model = useMemo(() => foldLog(events, seeds, now), [events, seeds, now])

  const examDate = useMemo(() => resolveExamDate(
    targetDates[exam.progressKey] ?? null,
    EXAM_SITTINGS.filter(s => s.examId === exam.progressKey),
    today,
  ), [targetDates, exam.progressKey, today])

  const coverage = useMemo(() => syllabusCoverage(syllabus.map(c => c.name), model), [syllabus, model])
  const phase = journeyPhase(examDate, coverage.share, today)
  // Today's study plan, when there is one, decides which concepts are new today.
  const planNew = useMemo(() => {
    // Read again when the day turns: the cached plan is only today's.
    void today
    return loadCachedStudyPlan(exam.progressKey)?.todaysConcepts ?? []
  }, [exam.progressKey, today])

  const base = useMemo<SchedulerInput>(() => ({
    syllabus,
    items,
    byConcept,
    model,
    now,
    examDay: examDate.day,
    phase,
    ladder,
    planNew,
    introducedToday: introducedOn(model, now),
  }), [syllabus, items, byConcept, model, now, examDate.day, phase, ladder, planNew])

  const plan = useMemo(() => dayPlan(base), [base])
  const foundations = useFoundations(syllabus, questions !== null)

  return {
    ready: questions !== null && syllabus.length > 0,
    exam,
    syllabus,
    items,
    byConcept,
    model,
    ladder,
    records,
    examDate,
    daysLeft: daysToExam(examDate, today),
    coverage,
    phase,
    now,
    today,
    base,
    plan,
    foundations,
  }
}
