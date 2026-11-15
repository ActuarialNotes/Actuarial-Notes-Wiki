// The exam in focus (docs/design-review.md §5.3, F2): the one exam the reader
// is studying, picked once and opened on by every tab.
//
// Each tab used to pick an exam on its own: the Quiz tab's list, Study Guides'
// list, the strips on Resources and the Store, the Dashboard's chips. The
// focus is one choice, kept as the exam page's file name ("Exam 5 (CAS)"),
// because every other name an exam goes by is derived from it: its progress
// key, its page id, its question bank, the label its readings carry.
//
// This module is the facts: every exam as the switcher lists it, which exam is
// in focus when nothing is stored (the first one the reader is studying), the
// switcher's groups, and where each tab opens for an exam. The stored choice is
// `hooks/useExamFocus.ts`.
//
// Pure.

import { TRACKS } from '@/data/tracks'
import { matchesSelectedVariant } from '@/data/examSittings'
import { CAS_TRACK_KEYS, SOA_TRACK_KEYS, type ExamBody } from './bodyFilter'
import { bankLabelFor } from './examIds'
import { examStatus, type ExamStatus } from './examStatus'
import { compareExamLabels } from './resourceExams'
import { wikiExamIdToProgressKey, type WikiExamSyllabus } from './wikiParser'
import { examDisplayName, requirementDisplayName, wikiRoute } from './wikiRoutes'

export const EXAM_FOCUS_KEY = 'quiz.examFocus'

/** `?exam=all`: every exam, chosen over the one in focus (Resources, the Store). */
export const ALL_EXAMS = 'all'

export interface FocusExam {
  /** The exam page's file name, without `.md`: "Exam 5 (CAS)". What is stored. */
  file: string
  /** The `exam_progress` key: `CAS-5`. Exam 6's regional pages share one. */
  progressKey: string
  /** The page's own id: `5`, `6C`, `P-1`. */
  pageId: string
  /** What the switcher calls it: "Exam 5", "DISC-DA". */
  name: string
  /** Its subject line, from the syllabus. */
  topic: string
  /** The label its questions carry, the quiz builder's `topic`; none for an exam with no bank. */
  bank: string | undefined
  /** The label its readings carry on the Resources shelf: "Exam 5", "Exam P-1". */
  readingsLabel: string
  status: ExamStatus
  /** Whose ladder it stands on. P and FM are on both; a CIA requirement on neither. */
  bodies: ExamBody[]
}

const BODY_BY_KEY: Map<string, Set<ExamBody>> = (() => {
  const map = new Map<string, Set<ExamBody>>()
  for (const track of TRACKS) {
    const body: ExamBody | null = SOA_TRACK_KEYS.has(track.key) ? 'SOA' : CAS_TRACK_KEYS.has(track.key) ? 'CAS' : null
    if (!body) continue
    for (const section of track.sections) {
      for (const item of section.items) {
        if (!map.has(item.id)) map.set(item.id, new Set())
        map.get(item.id)!.add(body)
      }
    }
  }
  return map
})()

/** Every exam page as the switcher knows it, in ladder order (Exam P before Exam 9). */
export function focusExams(syllabi: readonly WikiExamSyllabus[]): FocusExam[] {
  return syllabi
    .filter(s => !!s.fileName)
    .map(s => {
      const progressKey = wikiExamIdToProgressKey(s.examId)
      return {
        file: s.fileName!,
        progressKey,
        pageId: s.examId,
        name: requirementDisplayName(s.fileName!),
        topic: s.examTopic,
        bank: bankLabelFor(s),
        readingsLabel: examDisplayName(s.fileName!),
        status: examStatus(progressKey, s.examId),
        bodies: [...(BODY_BY_KEY.get(progressKey) ?? [])],
      }
    })
    .sort((a, b) => compareExamLabels(a.readingsLabel, b.readingsLabel))
}

/** The exams the reader is studying: in progress, on the regional page they picked. */
export function studiedExams(
  exams: readonly FocusExam[],
  progress: Readonly<Record<string, string | undefined>>,
  variants: Readonly<Record<string, string | null | undefined>>,
): FocusExam[] {
  return exams.filter(e =>
    progress[e.progressKey] === 'in_progress'
    && matchesSelectedVariant(e.progressKey, e.pageId, variants[e.progressKey]),
  )
}

/**
 * The exam in focus: the stored one while its page exists, else the first exam
 * the reader is studying, else none (a visitor who hasn't picked).
 */
export function resolveFocus(
  stored: string | null,
  exams: readonly FocusExam[],
  studied: readonly FocusExam[],
): FocusExam | null {
  return exams.find(e => e.file === stored) ?? studied[0] ?? null
}

export interface SwitcherGroups {
  /** The exams the reader is studying, and the one in focus if it isn't among them. */
  yours: FocusExam[]
  /** The other ready and beta exams of the body. In-development exams are under All exams. */
  others: FocusExam[]
}

/** What the switcher lists, before **All exams**. */
export function switcherGroups(
  exams: readonly FocusExam[],
  studied: readonly FocusExam[],
  focus: FocusExam | null,
  /** Whose ladder to list; null for both, which is what a reader with no exam yet picks from. */
  body: ExamBody | null,
): SwitcherGroups {
  const yours = focus && !studied.some(e => e.file === focus.file) ? [focus, ...studied] : [...studied]
  const mine = new Set(yours.map(e => e.file))
  const others = exams.filter(e => !mine.has(e.file) && e.status !== 'development' && (body ? e.bodies.includes(body) : e.bodies.length > 0))
  return { yours, others }
}

/** The body whose exams the switcher lists: the focus's own ladder when the picked body doesn't hold it. */
export function switcherBody(focus: FocusExam | null, picked: ExamBody): ExamBody {
  if (!focus || focus.bodies.length === 0 || focus.bodies.includes(picked)) return picked
  return focus.bodies[0]!
}

// ── Where each tab opens ─────────────────────────────────────────────────────

/** The Quiz tab: the exam's builder, or the exam list for an exam with no bank (or no exam). */
export function quizPath(exam: FocusExam | null): string {
  return exam?.bank ? `/?topic=${encodeURIComponent(exam.bank)}` : '/'
}

/** Study Guides: the exam's page, or the exam list. */
export function guidePath(exam: FocusExam | null): string {
  return exam ? wikiRoute({ kind: 'exam', name: exam.file }) : '/wiki'
}

/** Resources, narrowed to the exam's readings. */
export function resourcesPath(exam: FocusExam): string {
  return `/wiki/resources?exam=${encodeURIComponent(exam.readingsLabel)}`
}

/**
 * Where the page the reader is on goes when the focus changes: the same place,
 * for the new exam. Null where the page isn't about one exam (it stays put), or
 * reads the focus for itself (the Dashboard, the Store with no exam in its address).
 */
export function focusedPath(pathname: string, search: string, exam: FocusExam): string | null {
  const params = new URLSearchParams(search)
  if (pathname === '/') return quizPath(exam)
  if (pathname === '/wiki' || pathname.startsWith('/wiki/exam/')) return guidePath(exam)
  if (pathname === '/wiki/resources') return resourcesPath(exam)
  if (pathname === '/store' && params.has('exam')) return '/store'
  return null
}

/** Narrow an untrusted stored value to a file name, or null. */
export function parseStoredFocus(value: string | null | undefined): string | null {
  const file = value?.trim()
  return file ? file : null
}
