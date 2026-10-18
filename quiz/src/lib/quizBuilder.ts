// The Quiz tab's builder, as data (pages/Landing.tsx is the page that draws
// it). What lives here is everything the builder decides rather than draws:
// which exams it offers and under which track, how an exam's concepts are
// ordered and grouped by its syllabus, which questions today's plan draws on,
// how big the draw is, and the `/quiz` address each kind of launch writes.
// Pure and tested (quizBuilder.test.ts), apart from the few storage helpers at
// the bottom, which wrap pure parsers in a try/catch.

import {
  getExamPdfLink,
  getExamSolutionsPdfLink,
  getSittingPdfLink,
  type ExamPdfLink,
} from '@/data/examPdfLinks'
import { matchesSelectedVariant } from '@/data/examSittings'
import type { ExamBody } from '@/lib/bodyFilter'
import { decayIfStale, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { filterQuestions, type Question, type QuestionFilter, type QuizMode } from '@/lib/parser'
import { planConceptsToday } from '@/lib/planCompletion'
import type { RevealMode } from '@/lib/revealMode'
import type { StudyPlan } from '@/lib/studyPlan'
import type { WikiExamSyllabus } from '@/lib/wikiParser'

// ─── The exams ────────────────────────────────────────────────────────────────

export type QuizTrack = 'ASA' | 'ACAS' | 'FCAS' | 'FSA'

export interface QuizExam {
  /** The bank label a question's `exam` carries — what `?topic=` holds. */
  value: string
  /** The exam's name on its row and in the builder's strip. */
  label: string
  /** The credential tracks it is listed under. */
  tracks: readonly QuizTrack[]
  /** The exam_progress key (`lib/examStatus.ts`, `examAccentStyle`). */
  progressKey: string
  /** For an exam sat in variants sharing a progress key: whose syllabus this is. */
  examId?: string
}

/**
 * Every exam the builder offers — any exam with a question bank. Hand-kept:
 * an exam moved out of development (`lib/examStatus.ts`) with a bank to quiz
 * on is added here as well.
 */
export const QUIZ_EXAMS: readonly QuizExam[] = [
  { value: 'Probability', label: 'Exam P-1', tracks: ['ASA', 'ACAS'], progressKey: 'P' },
  { value: 'Financial Mathematics', label: 'Exam FM-2', tracks: ['ASA', 'ACAS'], progressKey: 'FM' },
  { value: 'Exam MAS-I', label: 'Exam MAS-I', tracks: ['ACAS'], progressKey: 'MAS-I' },
  { value: 'Exam MAS-II', label: 'Exam MAS-II', tracks: ['ACAS'], progressKey: 'MAS-II' },
  { value: 'Exam DISC-DA', label: 'DISC-DA', tracks: ['ACAS'], progressKey: 'CAS-DA' },
  { value: 'Exam DISC-RM', label: 'DISC-RM', tracks: ['ACAS'], progressKey: 'CAS-RM' },
  { value: 'Exam DISC-IA', label: 'DISC-IA', tracks: ['ACAS'], progressKey: 'CAS-IA' },
  { value: 'Exam 5', label: 'Exam 5', tracks: ['ACAS'], progressKey: 'CAS-5' },
  // Exam 6 is sat in regional variants sharing `CAS-6`; this card is the
  // Canadian one's, so `examId` says which syllabus it answers to.
  { value: 'Exam 6C', label: 'Exam 6C', tracks: ['ACAS'], progressKey: 'CAS-6', examId: '6C' },
  { value: 'Exam 7', label: 'Exam 7', tracks: ['FCAS'], progressKey: 'CAS-7' },
  { value: 'Exam 8', label: 'Exam 8', tracks: ['FCAS'], progressKey: 'CAS-8' },
  { value: 'Exam 9', label: 'Exam 9', tracks: ['FCAS'], progressKey: 'CAS-9' },
]

export interface QuizTrackGroup {
  key: QuizTrack
  name: string
  org: ExamBody
}

/** The exam list's headings, in the order the list draws them. */
export const QUIZ_TRACK_GROUPS: readonly QuizTrackGroup[] = [
  { key: 'ACAS', name: 'ACAS | Associate of the Casualty Actuarial Society', org: 'CAS' },
  { key: 'FCAS', name: 'FCAS | Fellow of the Casualty Actuarial Society', org: 'CAS' },
  { key: 'ASA',  name: 'ASA | Associate of the Society of Actuaries', org: 'SOA' },
  { key: 'FSA',  name: 'FSA | Fellow of the Society of Actuaries', org: 'SOA' },
]

/** One body's tracks, each with its exams; a track with none is left out. */
export function quizTrackGroups(
  body: ExamBody,
  exams: readonly QuizExam[] = QUIZ_EXAMS,
): (QuizTrackGroup & { exams: QuizExam[] })[] {
  return QUIZ_TRACK_GROUPS
    .filter(g => g.org === body)
    .map(g => ({ ...g, exams: exams.filter(e => e.tracks.includes(g.key)) }))
    .filter(g => g.exams.length > 0)
}

/** The builder's exam for a `?topic=`, if it is one of them. */
export function quizExamFor(topic: string, exams: readonly QuizExam[] = QUIZ_EXAMS): QuizExam | undefined {
  return exams.find(e => e.value === topic)
}

/**
 * The exams the reader is studying — in progress, on the variant they picked —
 * as their bank labels.
 */
export function activeQuizExamValues(
  progress: Readonly<Record<string, string | undefined>>,
  variants: Readonly<Record<string, string | null | undefined>>,
  exams: readonly QuizExam[] = QUIZ_EXAMS,
): string[] {
  return exams
    .filter(e => progress[e.progressKey] === 'in_progress'
      && (!e.examId || matchesSelectedVariant(e.progressKey, e.examId, variants[e.progressKey])))
    .map(e => e.value)
}

/** The study guide's id for an exam sat in variants (`6c-1`), for its info button. */
export function quizWikiExamId(exam: QuizExam): string | undefined {
  return exam.examId ? `${exam.examId.toLowerCase()}-1` : undefined
}

/** Bank size per exam, for the exam list's rows. */
export function quizQuestionCounts(
  questions: Question[],
  exams: readonly QuizExam[] = QUIZ_EXAMS,
): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const exam of exams) {
    counts[exam.value] = filterQuestions(questions, { exam: exam.value }).length
  }
  return counts
}

/** An exam row's date: "Sep 26". */
export function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

/** The Quiz tab's exam list — `/` with no exam open. */
export function isExamList(path: string): boolean {
  const [pathname, search = ''] = path.split('?')
  return pathname === '/' && !new URLSearchParams(search.split('#')[0]).get('topic')
}

// ─── The builder's choices ────────────────────────────────────────────────────

/** The question counts a quiz offers, beside today's plan's "Full plan". */
export const QUICK_COUNTS = [1, 3, 5, 10]

/**
 * Where the builder's questions come from: today's plan, a hand-picked set of
 * topics, or the exam's past papers. *How* they are sat is a second, separate
 * choice — the format, Quiz or Practice Exam (`QuizMode`) — and any source can
 * be sat either way: a past paper as a quiz with the answers as you go, a set
 * of topics as a full-length practice exam. The two used to be one control,
 * whose "Past Papers" tab silently meant "practice exam" too, so the questions'
 * source and the way of sitting them couldn't be told apart.
 */
export type QuizSource = 'today' | 'custom' | 'papers'

/** A past paper picked on the shelf; `null` is the Mix. */
export type QuizSitting = { year: number; session?: string } | null

/** How many of a pool the learner has never attempted. */
export function newQuestionCount(
  pool: readonly Question[],
  attempted: { has(id: string): boolean },
): number {
  return pool.reduce((n, q) => n + (attempted.has(q.id) ? 0 : 1), 0)
}

/**
 * How many questions the quiz will pull. A practice exam is the paper's
 * length — a sitting whole — and a quiz the count picked, either capped at
 * what the source holds.
 */
export function quizQuestionCount(input: {
  mode: QuizMode
  source: QuizSource
  sitting: QuizSitting
  poolCount: number
  practiceExamCount: number
  count: number
}): number {
  const { mode, source, sitting, poolCount, practiceExamCount, count } = input
  return mode === 'mock-exam'
    ? (source === 'papers' && sitting ? poolCount : Math.min(practiceExamCount, poolCount))
    : Math.min(count, poolCount)
}

/** The questions a past-paper source covers: the picked sitting, or the whole exam for the Mix. */
export function papersFilter(topic: string, sitting: QuizSitting): QuestionFilter {
  return {
    exam: topic,
    ...(sitting && { year: sitting.year, session: sitting.session }),
  }
}

/**
 * The documents the past-paper shelf offers for its selection. The report is a
 * sitting's examiner's report, or — for an exam with no dated papers at all
 * (Exam P / FM draw on the SOA's rolling sample set) — the exam-level question
 * PDF. The worked solutions only where they're a separate download: the SOA
 * splits P and FM's sample set in two, so the shelf shows both halves. A CAS
 * sitting has none: its examiner's report already carries the sample answers.
 */
export function shelfPdfLinks(
  topic: string,
  sitting: QuizSitting,
  /** How many sittings the shelf lists. */
  rowCount: number,
): { reportLink: ExamPdfLink | null; solutionsLink: ExamPdfLink | null } {
  const reportLink = sitting
    ? getSittingPdfLink(topic, sitting.year, sitting.session)
    : rowCount === 0
    ? getExamPdfLink(topic)
    : null
  const solutionsLink = !sitting && rowCount === 0 ? getExamSolutionsPdfLink(topic) : null
  return { reportLink, solutionsLink }
}

/** The questions a topic source covers: the exam, narrowed to the concepts picked. */
export function conceptsFilter(topic: string, concepts: readonly string[]): QuestionFilter {
  return {
    exam: topic,
    ...(concepts.length > 0 && { concepts: [...concepts] }),
  }
}

/**
 * The questions the current configuration covers before the difficulty
 * choice — what the menu's per-level counts are read from, and (filtered by
 * level) what the deck card counts and the shuffle draws from.
 */
export function builderPool(input: {
  questions: Question[]
  topic: string
  source: QuizSource
  sitting: QuizSitting
  concept: string
  concepts: readonly string[]
  /** Today's plan's pool when it is the source, else null. */
  todaysPlanPool: Question[] | null
}): Question[] {
  const { questions, topic, source, sitting, concept, concepts, todaysPlanPool } = input
  if (source === 'papers') {
    if (!topic) return []
    return filterQuestions(questions, papersFilter(topic, sitting))
  }
  if (concept) return filterQuestions(questions, { concept })
  if (todaysPlanPool) return todaysPlanPool
  if (!topic) return []
  return filterQuestions(questions, conceptsFilter(topic, concepts))
}

/**
 * Everything a draw depends on, as one string. A shuffled draw is cleared
 * whenever it changes, so Start can never launch a draw that no longer matches
 * the filters on screen.
 */
export function drawSignature(input: {
  mode: QuizMode
  source: QuizSource
  topic: string
  concept: string
  conceptMode: 'today' | 'custom'
  count: number
  sitting: QuizSitting
  concepts: readonly string[]
  levelsParam: string | null
}): string {
  return [
    input.mode,
    input.source,
    input.topic,
    input.concept,
    input.conceptMode,
    input.count,
    input.sitting ? `${input.sitting.year}|${input.sitting.session ?? ''}` : '',
    [...input.concepts].sort().join(','),
    input.levelsParam ?? '',
  ].join('§')
}

/**
 * The filter the search bar opens on: the exam (and paper) as its Exam /
 * Sitting choices, ticked, and the concepts as the pool.
 */
export function quizSearchFilter(input: {
  topic: string
  source: QuizSource
  sitting: QuizSitting
  concept: string
  concepts: readonly string[]
  /** Today's plan, when it is the source in use. */
  todaysPlan: StudyPlan | null
}): QuestionFilter {
  const { topic, source, sitting, concept, concepts, todaysPlan } = input
  if (concept) return { concept }
  if (!topic) return {}
  // Past papers: the shelf's selection is the pool. Opening the search while
  // Spring 2019 is picked should show that paper, not the whole exam.
  if (source === 'papers') return papersFilter(topic, sitting)
  if (todaysPlan) return conceptsFilter(topic, planConceptsToday(todaysPlan))
  return conceptsFilter(topic, concepts)
}

// ─── The syllabus ─────────────────────────────────────────────────────────────

/** An exam's concepts, sorted by their position in its syllabus. */
export function orderConceptsBySyllabus(
  concepts: readonly string[],
  syllabus: WikiExamSyllabus | null,
): string[] {
  if (!syllabus) return [...concepts]

  const conceptToIdx = new Map<string, number>()
  syllabus.topics.forEach((t, idx) => {
    conceptToIdx.set(t.name.toLowerCase(), idx)
    t.concepts.forEach(c => {
      conceptToIdx.set(c.name.toLowerCase(), idx)
      if (c.target) conceptToIdx.set(c.target.toLowerCase().replace(/\+/g, ' '), idx)
    })
  })

  const getIdx = (c: string): number => {
    const exact = conceptToIdx.get(c.toLowerCase())
    if (exact !== undefined) return exact
    const cLower = c.toLowerCase()
    for (const [key, idx] of conceptToIdx) {
      if (cLower.includes(key) || key.includes(cLower)) return idx
    }
    return Number.MAX_SAFE_INTEGER
  }

  return [...concepts].sort((a, b) => {
    const diff = getIdx(a) - getIdx(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })
}

/** A learning objective and the concepts the builder lists under it. */
export interface ConceptGroup {
  name: string
  weight?: string
  subtopics: string[]
}

/**
 * Ordered concepts grouped under their parent learning objectives from the
 * syllabus. A concept no objective names goes under "Other"; with no
 * syllabus at all, everything is one "All Concepts" group.
 */
export function groupConceptsBySyllabus(
  ordered: readonly string[],
  syllabus: WikiExamSyllabus | null,
): ConceptGroup[] {
  if (!syllabus) {
    return [{ name: 'All Concepts', weight: undefined, subtopics: [...ordered] }]
  }
  const conceptToGroupIdx = new Map<string, number>()
  syllabus.topics.forEach((wt, idx) => {
    for (const c of ordered) {
      if (conceptToGroupIdx.has(c)) continue
      const cL = c.toLowerCase()
      for (const sylConcept of wt.concepts) {
        const sL = sylConcept.name.toLowerCase()
        const tL = sylConcept.target?.toLowerCase().replace(/\+/g, ' ') ?? ''
        if (cL === sL || cL === tL || sL.includes(cL) || cL.includes(sL)) {
          conceptToGroupIdx.set(c, idx)
          break
        }
      }
    }
  })
  const groups: ConceptGroup[] = syllabus.topics.map(t => ({
    name: t.name, weight: t.weight, subtopics: [],
  }))
  const ungrouped: string[] = []
  for (const c of ordered) {
    const idx = conceptToGroupIdx.get(c)
    if (idx !== undefined) groups[idx].subtopics.push(c)
    else ungrouped.push(c)
  }
  const result = groups.filter(g => g.subtopics.length > 0)
  if (ungrouped.length > 0) result.push({ name: 'Other', weight: undefined, subtopics: ungrouped })
  return result
}

/** Ticks or unticks one concept under By Topic. */
export function toggleConcept(selected: readonly string[], concept: string): string[] {
  return selected.includes(concept) ? selected.filter(s => s !== concept) : [...selected, concept]
}

/**
 * Ticks every concept of a learning objective (`select`), or unticks them
 * all — what the group's own checkbox does. Ticking keeps the order things
 * were picked in and adds nothing twice.
 */
export function selectGroup(selected: readonly string[], group: readonly string[], select: boolean): string[] {
  return select
    ? [...new Set([...selected, ...group])]
    : selected.filter(s => !group.includes(s))
}

/**
 * Each concept's decay-adjusted mastery on one exam, `new` where the reader
 * has no record — the badges the builder shows a Pro reader.
 */
export function conceptLevels(
  examId: string | null,
  records: readonly ConceptMasteryRecord[],
  concepts: readonly string[],
  now: Date,
): Map<string, MasteryState> {
  if (!examId) return new Map<string, MasteryState>()
  const examRecords = records.filter(r => r.exam_id === examId)
  const recordsBySlug = new Map(examRecords.map(r => [r.concept_slug.toLowerCase(), r]))

  const result = new Map<string, MasteryState>()
  for (const c of concepts) {
    const rec = recordsBySlug.get(c.toLowerCase())
    result.set(c, rec ? decayIfStale(rec, now).state : 'new')
  }
  return result
}

// ─── Today's plan ─────────────────────────────────────────────────────────────

/**
 * The plan's concepts, lower-cased, for the "Today" chips on the concept
 * list. A plan scheduling nothing new today marks nothing, review mode or not.
 */
export function todayConceptChips(plan: StudyPlan | null): Set<string> {
  if (!plan?.todaysConcepts?.length) return new Set<string>()
  return new Set(planConceptsToday(plan).map(c => c.toLowerCase()))
}

/** The concept a question's `wiki_link` entry names, lower-cased. */
function linkedConcept(link: string): string {
  const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
  return clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
}

/**
 * The questions on `topic` tagged with any of `concepts` (matched on the
 * concept's name, case-blind), and passing `keep`.
 */
export function questionsOnConcepts(
  questions: Question[],
  topic: string,
  concepts: readonly string[],
  keep: (q: Question) => boolean = () => true,
): Question[] {
  const conceptSet = new Set(concepts.map(c => c.toLowerCase()))
  return questions.filter(q => {
    if (q.exam !== topic || !keep(q)) return false
    return q.wiki_link.some(link => conceptSet.has(linkedConcept(link)))
  })
}

/**
 * Today's plan resolved into the concepts still to be completed and the
 * question pool that can cover them, so a re-launch after some wrong answers
 * only re-tests what's left. When everything is already done it falls back to
 * the full plan for extra practice. `null` when there is nothing to draw.
 * Mirrors `todayPlanCountForExam` (lib/todayPlanCount.ts), whose badge counts
 * the quiz this builds.
 */
export function todaysPlanSelection(
  plan: StudyPlan | null,
  topic: string,
  questions: Question[],
  doneConceptSlugs: ReadonlySet<string>,
  keep?: (q: Question) => boolean,
): { todayQs: Question[]; concepts: string[] } | null {
  if (!plan || !topic) return null
  const displayConcepts = planConceptsToday(plan)
  if (displayConcepts.length === 0) return null

  const remaining = displayConcepts.filter(n => !doneConceptSlugs.has(n.toLowerCase()))
  const concepts = remaining.length > 0 ? remaining : displayConcepts

  const todayQs = questionsOnConcepts(questions, topic, concepts, keep)
  if (todayQs.length === 0) return null
  return { todayQs, concepts }
}

// ─── Launching ────────────────────────────────────────────────────────────────

/** The settings every launch carries: the menu's choices. */
export interface LaunchSettings {
  mode: QuizMode
  reveal: RevealMode
  /** `links=` — whether a question's concepts are tappable. */
  links: '1' | '0'
  timed: boolean
}

/**
 * What Start (or today's plan) launches. Each kind writes its keys in the
 * order it always has, so a quiz's address — which `lib/quizResume.ts`
 * resumes by — is the one it was.
 */
export type QuizLaunch =
  /** Today's plan's coverage set, stored under `actuarial_selected_ids`. */
  | { kind: 'plan'; count: number }
  /** A shuffled draw, stored the same way. */
  | { kind: 'draw'; count: number }
  /** One concept (from the dashboard or a search); `count` only when it cuts the pool. */
  | { kind: 'concept'; concept: string; levels: string | null; count?: number }
  /** The source's filter plus the format's size. */
  | {
      kind: 'exam'
      exam: string
      sitting?: QuizSitting
      concepts?: readonly string[]
      levels: string | null
      count: number
    }

/** The `/quiz` address a launch navigates to. */
export function quizLaunchUrl(launch: QuizLaunch, s: LaunchSettings): string {
  let params: URLSearchParams
  switch (launch.kind) {
    case 'plan':
      params = new URLSearchParams({
        selection: 'stored', mode: s.mode, reveal: s.reveal,
        count: String(launch.count), from: 'home', links: s.links,
      })
      if (s.timed) params.set('timed', '1')
      break
    case 'draw':
      params = new URLSearchParams({
        selection: 'stored', mode: s.mode, count: String(launch.count),
        reveal: s.reveal, from: 'home', links: s.links,
      })
      if (s.timed) params.set('timed', '1')
      break
    case 'concept':
      params = new URLSearchParams({
        concept: launch.concept, mode: s.mode, reveal: s.reveal, from: 'home', links: s.links,
      })
      if (launch.levels) params.set('levels', launch.levels)
      if (s.timed) params.set('timed', '1')
      if (launch.count !== undefined) params.set('count', String(launch.count))
      break
    case 'exam':
      params = new URLSearchParams({ exam: launch.exam, mode: s.mode, reveal: s.reveal, links: s.links })
      if (s.timed) params.set('timed', '1')
      if (launch.sitting !== undefined) {
        if (launch.sitting !== null) {
          params.set('year', String(launch.sitting.year))
          if (launch.sitting.session) params.set('session', launch.sitting.session)
        }
      } else if (launch.concepts && launch.concepts.length > 0) {
        params.set('concepts', launch.concepts.join(','))
      }
      if (launch.levels) params.set('levels', launch.levels)
      params.set('count', String(launch.count))
      break
  }
  return `/quiz?${params.toString()}`
}

// ─── Storage ──────────────────────────────────────────────────────────────────

/** Where a stored launch's question ids wait for `/quiz?selection=stored`. */
export const SELECTED_IDS_KEY = 'actuarial_selected_ids'

/** Concepts the dashboard handed over when some of today's plan was deselected. */
export const CONCEPT_OVERRIDE_KEY = 'actuarial_quiz_concept_override'

/** An exam's hand-picked topics, remembered for the next visit. */
export function savedConceptsKey(topic: string): string {
  return `actuarial_quiz_concepts_v1_${topic}`
}

/** A stored topic list, or none for anything that isn't one. */
export function conceptsFromStored(raw: string | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadSavedConcepts(topic: string): string[] {
  try {
    return conceptsFromStored(localStorage.getItem(savedConceptsKey(topic)))
  } catch {
    return []
  }
}

export function saveConcepts(topic: string, concepts: readonly string[]): void {
  try {
    localStorage.setItem(savedConceptsKey(topic), JSON.stringify(concepts))
  } catch { /* ignore */ }
}

/** Hands a launch's question ids to the quiz page. */
export function storeSelectedIds(ids: readonly string[]): void {
  try {
    sessionStorage.setItem(SELECTED_IDS_KEY, JSON.stringify(ids))
  } catch { /* ignore */ }
}

/** The dashboard's concept override, read once and removed; null when there is none. */
export function takeConceptOverride(): string[] | null {
  try {
    const raw = sessionStorage.getItem(CONCEPT_OVERRIDE_KEY)
    if (raw) {
      sessionStorage.removeItem(CONCEPT_OVERRIDE_KEY)
      return JSON.parse(raw) as string[]
    }
  } catch { /* ignore */ }
  return null
}
