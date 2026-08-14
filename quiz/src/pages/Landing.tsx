import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { CalendarCheck, Check, CheckCircle2, ChevronDown, ChevronLeft, Circle, Loader2, Lock, Play, X } from 'lucide-react'
import { QuizFloatingSearch } from '@/components/QuizFloatingSearch'
import { QuestionDeckCard } from '@/components/QuestionDeckCard'
import { TodayQuizCornerBadge } from '@/components/TodayQuizBadge'
import { useTodayQuizCounts } from '@/hooks/useTodayQuizCount'
import { badgeCountFor } from '@/lib/todayPlanCount'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConcepts } from '@/hooks/useConcepts'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { selectQuestionsForCoverage, minQuestionsToCoverConcepts, todayISO } from '@/lib/studyPlan'
import { planDoneConceptSlugs } from '@/lib/planCompletion'
import { useTodayCompletions } from '@/hooks/useTodayCompletions'
import { useTodayAnsweredQuestions } from '@/hooks/useTodayAnsweredQuestions'
import { useSubscription } from '@/hooks/useSubscription'
import { filterQuestions } from '@/lib/parser'
import type { Question } from '@/lib/parser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import type { QuizMode } from '@/lib/parser'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SegmentedControl, type SegmentedOption } from '@/components/ui/SegmentedControl'
import { MasteryBadge } from '@/components/MasteryBadge'
import { ExamWeightLabel } from '@/components/ExamWeightLabel'
import { parseExamWeight } from '@/lib/examWeight'
import { useActionBarHeight } from '@/hooks/useActionBarHeight'
import { useQuestionAttempts } from '@/hooks/useQuestionAttempts'
import { cn } from '@/lib/utils'
import { getSittingPdfLink, getExamPdfLink } from '@/data/examPdfLinks'
import { getPassRateLookup } from '@/data/pastExams'
import { buildPastExamRows } from '@/lib/pastExams'
import { applyPassRates } from '@/lib/passRates'
import { useExamPassRates } from '@/hooks/useExamPassRates'
import { PastExamBrowser } from '@/components/PastExamBrowser'

type ExamOrg = 'SOA' | 'CAS'

const EXAMS = [
  { value: 'Probability', label: 'Exam P-1', tracks: ['ASA', 'ACAS'] as const, progressKey: 'P' },
  { value: 'Financial Mathematics', label: 'Exam FM-2', tracks: ['ASA', 'ACAS'] as const, progressKey: 'FM' },
  { value: 'Exam MAS-I', label: 'Exam MAS-I', tracks: ['ACAS'] as const, progressKey: 'MAS-I' },
  { value: 'Exam 5', label: 'Exam 5', tracks: ['ACAS'] as const, progressKey: 'CAS-5' },
]

const QUIZ_TRACK_GROUPS = [
  { key: 'ACAS', name: 'ACAS | Associate of the Casualty Actuarial Society', org: 'CAS' as ExamOrg },
  { key: 'FCAS', name: 'FCAS | Fellow of the Casualty Actuarial Society', org: 'CAS' as ExamOrg },
  { key: 'ASA',  name: 'ASA | Associate of the Society of Actuaries', org: 'SOA' as ExamOrg },
  { key: 'FSA',  name: 'FSA | Fellow of the Society of Actuaries', org: 'SOA' as ExamOrg },
]

const SOA_TRACK_KEYS = new Set(['ASA', 'FSA'])
const BODY_FILTER_KEY = 'quiz.bodyFilter'


function formatTargetDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}


// Question counts that mirror each real exam
const MOCK_EXAM_QUESTIONS: Record<string, number> = {
  'Probability': 30,
  'Financial Mathematics': 35,
  'Exam MAS-I': 40,
  'Exam 5': 25,
}

const QUICK_COUNTS = [1, 3, 5, 10]

/**
 * What the builder is drawing from. This used to be two separate pieces of
 * state — a `conceptMode` of today/custom, and a `mode` of quiz/mock-exam that
 * the *question-count* row set — which meant picking "Mock Exam" from a row of
 * 1/3/5/10 silently changed the view. All three are one choice, so they're one
 * control now (see `SOURCE_OPTIONS` below).
 */
type QuizSource = 'today' | 'custom' | 'mock-exam'

// ─── Collapsible learning-objective group (mirrors example callout style) ─────

/** Marks a concept the day's study plan has scheduled. */
function TodayChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary',
        className,
      )}
    >
      <CalendarCheck className="h-3 w-3 shrink-0" aria-hidden />
      Today
    </span>
  )
}

function GroupSection({
  group,
  selectedSubtopics,
  todaySubtopics,
  onToggle,
  onSelectAll,
  conceptLevelMap,
  isPremium,
}: {
  group: { name: string; weight?: string; subtopics: string[] }
  selectedSubtopics: string[]
  todaySubtopics: Set<string>
  onToggle: (subtopic: string) => void
  onSelectAll: (group: { subtopics: string[] }, e: React.MouseEvent) => void
  conceptLevelMap?: Map<string, MasteryState>
  isPremium?: boolean
}) {
  const selectedCount = group.subtopics.filter(s => selectedSubtopics.includes(s)).length
  const allSelected = selectedCount === group.subtopics.length
  const someSelected = selectedCount > 0
  // A group that already holds restored selections opens itself, so returning to
  // the builder shows what's picked rather than a wall of collapsed rows.
  const [open, setOpen] = useState(someSelected)
  const examPercentage = parseExamWeight(group.weight)

  const rowBg = allSelected
    ? 'bg-primary/10 group-hover:bg-primary/15'
    : someSelected
    ? 'bg-primary/5 group-hover:bg-primary/10'
    : 'group-hover:bg-accent/30'

  return (
    <div className="overflow-hidden rounded-lg bg-background">
      <div className="relative">
        {/* Share of the exam, drawn as the row itself: the fill reaches the
            group's percentage while collapsed and runs the full width when
            expanded — the same background the study guide's learning
            objectives use. The selection tints below are translucent and sit
            on top, so a picked group still shows its weight. */}
        {examPercentage !== null && (
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 bg-card transition-all duration-300"
            style={{ width: open ? '100%' : `${Math.min(100, examPercentage)}%` }}
          />
        )}
        <div className="relative flex items-stretch group">
          {/* Select-all checkmark circle */}
          <button
            type="button"
            role="checkbox"
            aria-checked={allSelected ? true : someSelected ? 'mixed' : false}
            data-sound="tick"
            onClick={e => onSelectAll(group, e)}
            className={cn(
              'flex shrink-0 items-center justify-center px-3 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              rowBg,
            )}
            aria-label={allSelected ? `Deselect all ${group.name}` : `Select all ${group.name}`}
          >
            {allSelected ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : someSelected ? (
              <CheckCircle2 className="h-5 w-5 text-primary/40" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/60" />
            )}
          </button>

          {/* Expand/collapse button */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className={cn(
              'flex-1 py-3 pr-3 text-left transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              rowBg,
            )}
            aria-expanded={open}
          >
            <div className="flex w-full items-center gap-2">
              <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
                {group.name}
              </span>
              {/* The precise reading of what the fill behind the row shows. */}
              {group.weight && <ExamWeightLabel weight={group.weight} />}
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div hidden={!open} className="bg-card pb-1 pt-1">
        <div className="flex flex-col">
          {group.subtopics.map(subtopic => {
            const isSelected = selectedSubtopics.includes(subtopic)
            const isToday = todaySubtopics.has(subtopic)
            const conceptLevel = conceptLevelMap?.get(subtopic)
            return (
              <button
                key={subtopic}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                data-sound="tick"
                onClick={() => onToggle(subtopic)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                  isSelected
                    ? 'bg-primary/10 text-primary hover:bg-primary/15'
                    : 'text-foreground hover:bg-accent/40',
                )}
              >
                {isSelected ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                )}
                <span className="min-w-0 flex-1 text-sm font-medium leading-snug">
                  {subtopic}
                </span>
                {/* Both signals, not one or the other. These used to be an
                    if/else on mastery, and `conceptLevelMap` has an entry for
                    every concept — so a premium user, the only kind with a
                    study plan, could never see which concepts were in it. */}
                {isToday && <TodayChip />}
                {isPremium && conceptLevel !== undefined && (
                  <MasteryBadge state={conceptLevel} compact />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ExamOptionCard({
  exam,
  onClick,
  questionCount,
  colorIdx,
  targetDate,
  subtitle,
  todayQuizCount = 0,
}: {
  exam: { value: string; label: string }
  onClick: () => void
  questionCount: number
  colorIdx: number  // -1 means not active
  targetDate?: string | null
  subtitle?: string | null
  /** Questions left in this exam's plan today — picking the card starts here. */
  todayQuizCount?: number
}) {
  const isActive = colorIdx >= 0
  // P and FM are the mature exams with a full question bank; others are in beta.
  const isBeta = exam.value !== 'Probability' && exam.value !== 'Financial Mathematics'
  const description = subtitle ?? null

  return (
    <button
      type="button"
      data-tour={exam.value === 'Probability' ? 'quiz-exam-p' : undefined}
      onClick={onClick}
      className="relative w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className={cn(
        'h-full transition-all duration-150 overflow-hidden',
        isActive
          ? 'bg-primary/10 hover:bg-primary/25'
          : 'hover:bg-accent/30',
      )}>
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-base leading-snug">{exam.label}</CardTitle>
          {description && (
            <CardDescription className="mt-0.5">{description}</CardDescription>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {questionCount} question{questionCount !== 1 ? 's' : ''}
            </span>
            {/* Style guide §4.1: blue is the info hue, amber means "caution".
                A scheduled date is information; being part-way through an exam
                is neither, so it stays neutral rather than borrowing the
                warning colour. Beta *is* a caution, and takes the amber that
                the mobile nav's Research chip already uses for the same word —
                it used to be emerald here and amber there. */}
            {isActive ? (
              <span className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                targetDate
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'bg-muted text-muted-foreground',
              )}>
                {targetDate ? `Exam: ${formatTargetDate(targetDate)}` : 'In progress'}
              </span>
            ) : isBeta ? (
              <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                Beta
              </span>
            ) : null}
          </div>
        </CardHeader>
      </Card>
      {/* After the Card so it paints above the card surface. */}
      <TodayQuizCornerBadge count={todayQuizCount} size="md" />
    </button>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { progress: examProgress, targetDates, selectedTrack } = useExamProgress()
  const { byExam: conceptsByExam, loading: conceptsLoading } = useConcepts()
  const { questions: allQuestions } = useAllQuestions()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { isPremium, loading: subLoading } = useSubscription()
  // Per-exam "questions left in today's plan" — badges the exam cards, so the
  // count is visible before an exam is even picked.
  const { byExam: todayQuizByExam } = useTodayQuizCounts()
  // Attempt history, for the "new to you" read on the question deck.
  const { byQuestionId: attemptsByQuestionId, tracked: attemptsTracked } = useQuestionAttempts()

  const initialTopic = searchParams.get('topic') ?? ''
  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  const initialConcept = searchParams.get('concept') ?? ''

  const [filterOverride, setFilterOverride] = useState<ExamOrg | null>(() => {
    try {
      const saved = localStorage.getItem(BODY_FILTER_KEY)
      return saved === 'SOA' || saved === 'CAS' ? saved : null
    } catch { return null }
  })
  const defaultFilter: ExamOrg = SOA_TRACK_KEYS.has(selectedTrack) ? 'SOA' : 'CAS'
  const activeFilter = filterOverride ?? defaultFilter

  function handleSetFilter(f: ExamOrg) {
    try { localStorage.setItem(BODY_FILTER_KEY, f) } catch { /* ignore */ }
    setFilterOverride(f)
  }

  // Exam subtitles (e.g. "Basic Techniques for Ratemaking and Estimating Claim
  // Liabilities" for Exam 5) sourced from the wiki syllabus so the Quiz tab
  // matches the Study Guides tab exactly.
  const examTopicByProgressKey = useMemo(() => {
    const map: Record<string, string> = {}
    for (const s of syllabi) {
      map[wikiExamIdToProgressKey(s.examId)] = s.examTopic
    }
    return map
  }, [syllabi])

  const filteredTrackGroups = QUIZ_TRACK_GROUPS
    .filter(g => g.org === activeFilter)
    .map(g => ({ ...g, exams: EXAMS.filter(e => (e.tracks as readonly string[]).includes(g.key)) }))
    .filter(g => g.exams.length > 0)

  // Index of each exam in the global active-exams list (for consistent colour across tabs)
  const activeExamValues = EXAMS
    .filter(e => examProgress[e.progressKey] === 'in_progress')
    .map(e => e.value)

  const [topic, setTopic] = useState(initialTopic)

  const [selectedConcept, setSelectedConcept] = useState(initialConcept)

  // What the quiz draws from: today's plan, a hand-picked set of topics, or a
  // mock exam. One choice, one control — `mode` and `conceptMode` below are
  // read-only views of it, kept so the launch/filter code reads unchanged.
  const [source, setSource] = useState<QuizSource>(initialMode === 'mock-exam' ? 'mock-exam' : 'custom')
  const mode: QuizMode = source === 'mock-exam' ? 'mock-exam' : 'quiz'
  const conceptMode: 'today' | 'custom' = source === 'today' ? 'today' : 'custom'

  // Quiz-specific options
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [isAdaptive, setIsAdaptive] = useState(false)
  const [count, setCount] = useState<number>(3)
  const reveal = 'during' as const

  // Set once the user picks a specific question count, so the auto-sizing effect
  // (which defaults Today's Quiz to the whole-plan coverage count) stops overriding
  // their choice. Reset whenever the exam/mode changes.
  const userPickedCountRef = useRef(false)

  // Questions today's quizzes have already served — held back from the draw so a
  // re-launch of the plan gives new questions instead of the ones just answered.
  const todayAnsweredIds = useTodayAnsweredQuestions()

  // Mock exam sitting selection (null = random mix across all years)
  const [selectedSitting, setSelectedSitting] = useState<{ year: number; session?: string } | null>(null)

  // Concept override passed from dashboard when user deselects some plan concepts
  const conceptOverrideRef = useRef<string[] | null>(null)
  const didApplyOverrideRef = useRef(false)
  if (!didApplyOverrideRef.current && conceptOverrideRef.current === null) {
    try {
      const raw = sessionStorage.getItem('actuarial_quiz_concept_override')
      if (raw) {
        sessionStorage.removeItem('actuarial_quiz_concept_override')
        conceptOverrideRef.current = JSON.parse(raw) as string[]
      }
    } catch { /* ignore */ }
  }

  // Reset state and restore saved topic selections when exam topic or mode changes
  useEffect(() => {
    setIsAdaptive(false)
    setSource(prev => (prev === 'mock-exam' ? prev : 'custom'))
    setSelectedSitting(null)
    userPickedCountRef.current = false
    if (topic && mode === 'quiz') {
      try {
        const saved = localStorage.getItem(`actuarial_quiz_concepts_v1_${topic}`)
        const parsed = saved ? JSON.parse(saved) : null
        setSelectedConcepts(Array.isArray(parsed) ? parsed : [])
      } catch {
        setSelectedConcepts([])
      }
    } else {
      setSelectedConcepts([])
    }
  }, [topic, mode])

  // --- Syllabus-derived data ---

  const syllabusForTopic = useMemo(
    () => syllabi.find(s => s.examTopic === topic || s.examLabel === topic) ?? null,
    [syllabi, topic],
  )

  const examIdForPlan = useMemo(
    () => Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === topic)?.[0] ?? null,
    [topic],
  )
  const examDateForPlan = examIdForPlan ? (targetDates[examIdForPlan] ?? null) : null

  // Today's Plan only applies to the exam the user is actively working
  // toward — not every exam they happen to browse to on this screen.
  const examInProgress = !!examIdForPlan && examProgress[examIdForPlan] === 'in_progress'

  const { plan, loading: planLoading } = useStudyPlan(
    syllabusForTopic,
    masteryRecords,
    examDateForPlan,
    masteryLoading,
  )

  // Concepts sorted by their position in the exam syllabus
  const orderedConcepts = useMemo(() => {
    const cs = conceptsByExam[topic] ?? []
    if (!syllabusForTopic) return cs

    const conceptToIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((t, idx) => {
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

    return [...cs].sort((a, b) => {
      const diff = getIdx(a) - getIdx(b)
      return diff !== 0 ? diff : a.localeCompare(b)
    })
  }, [conceptsByExam, topic, syllabusForTopic])

  // Group orderedConcepts under their parent learning objectives from the syllabus
  const groupedConcepts = useMemo(() => {
    if (!syllabusForTopic) {
      return [{ name: 'All Concepts', weight: undefined as string | undefined, subtopics: orderedConcepts }]
    }
    const conceptToGroupIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((wt, idx) => {
      for (const c of orderedConcepts) {
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
    const groups = syllabusForTopic.topics.map(t => ({
      name: t.name, weight: t.weight as string | undefined, subtopics: [] as string[]
    }))
    const ungrouped: string[] = []
    for (const c of orderedConcepts) {
      const idx = conceptToGroupIdx.get(c)
      if (idx !== undefined) groups[idx].subtopics.push(c)
      else ungrouped.push(c)
    }
    const result = groups.filter(g => g.subtopics.length > 0)
    if (ungrouped.length > 0) result.push({ name: 'Other', weight: undefined, subtopics: ungrouped })
    return result
  }, [syllabusForTopic, orderedConcepts])

  // For premium users: map each concept name to its mastery level
  const conceptLevelMap = useMemo(() => {
    if (!examIdForPlan) return new Map<string, MasteryState>()
    const now = new Date()
    const examRecords = masteryRecords.filter(r => r.exam_id === examIdForPlan)
    const recordsBySlug = new Map(examRecords.map(r => [r.concept_slug.toLowerCase(), r]))

    const result = new Map<string, MasteryState>()
    for (const c of orderedConcepts) {
      const cL = c.toLowerCase()
      const rec = recordsBySlug.get(cL)
      result.set(c, rec ? decayIfStale(rec, now).state : 'new')
    }
    return result
  }, [examIdForPlan, masteryRecords, orderedConcepts])

  // Concepts from today's study plan (used for "today" badges on concept cards)
  const todayConcepts = useMemo(() => {
    if (!plan?.todaysConcepts?.length) return new Set<string>()
    const displayConcepts = plan.status === 'review_mode'
      ? (plan.reviewConcepts ?? [])
      : plan.todaysConcepts
    return new Set(displayConcepts.map(c => c.toLowerCase()))
  }, [plan])

  // Number of concepts in today's plan (handles review_mode)
  const planConceptCount = useMemo(() => {
    if (!plan) return 0
    return plan.status === 'review_mode'
      ? (plan.reviewConcepts?.length ?? 0)
      : plan.todaysConcepts.length
  }, [plan])

  // Questions available for today's study plan concepts
  const todayAvailableCount = useMemo(() => {
    if (!plan || !topic) return 0
    const displayConcepts = plan.status === 'review_mode'
      ? (plan.reviewConcepts ?? [])
      : plan.todaysConcepts
    if (!displayConcepts.length) return 0
    const todaySet = new Set(displayConcepts.map(c => c.toLowerCase()))
    return allQuestions.filter(q => {
      if (q.exam !== topic) return false
      return q.wiki_link.some(link => {
        const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
        const n = clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
        return todaySet.has(n)
      })
    }).length
  }, [plan, allQuestions, topic])

  // Derived: whether today's plan is the active filter
  const useTodaysPlan = examInProgress && conceptMode === 'today' && isPremium && !!plan && planConceptCount > 0

  // True once the async data that decides the initial Today's Plan vs. By Topic
  // mode (mastery, concepts, study plan, subscription) has settled, so the
  // segmented control can render its resolved state directly instead of
  // painting the 'custom' default first and flashing to 'today' once the
  // auto-activate effect above fires.
  const quizModeResolved = !user || !examInProgress || (!masteryLoading && !conceptsLoading && !planLoading && !subLoading)

  // Display names for concepts in today's plan (used in dropdown)
  const todayConceptDisplayNames = useMemo(() => {
    if (!plan) return []
    return plan.status === 'review_mode'
      ? (plan.reviewConcepts ?? [])
      : plan.todaysConcepts
  }, [plan])

  // Today's level-ups (this device merged with the cross-device signal) — the
  // input to the "already done today" test the plan checklist ticks with.
  const completedToday = useTodayCompletions(examIdForPlan)

  // Concepts today's plan still wants worked on, by the same rule the Dashboard
  // checklist paints with: dropped once advanced today (anywhere) or once
  // mastery already sits at today's target. Sizing off level-ups alone kept
  // asking for concepts that need no work — a Level 3 maintenance refresher is
  // already at target and can never produce a level-up. See lib/planCompletion.
  const doneConceptSlugs = useMemo(
    () => planDoneConceptSlugs({
      plan,
      syllabus: syllabusForTopic,
      masteryRecords,
      examProgressKey: examIdForPlan,
      levelUps: completedToday,
      today: todayISO(),
    }),
    [plan, syllabusForTopic, masteryRecords, examIdForPlan, completedToday],
  )

  // Resolve today's plan into the concepts still to be completed and the question
  // pool that can cover them, so a re-launch after some wrong answers only
  // re-tests what's left. When everything is already done, fall back to the full
  // plan for extra practice — the `seenIds` option on the coverage helpers is
  // what keeps that extra practice from being a replay of the questions just
  // answered.
  const buildTodaysPlanSelection = useCallback((): { todayQs: typeof allQuestions; concepts: string[] } | null => {
    if (!plan || !topic) return null
    const displayConcepts = plan.status === 'review_mode'
      ? (plan.reviewConcepts ?? [])
      : plan.todaysConcepts
    if (displayConcepts.length === 0) return null

    const remaining = displayConcepts.filter(n => !doneConceptSlugs.has(n.toLowerCase()))
    const concepts = remaining.length > 0 ? remaining : displayConcepts

    const conceptSet = new Set(concepts.map(n => n.toLowerCase()))
    const todayQs = allQuestions.filter(q => {
      if (q.exam !== topic) return false
      return q.wiki_link.some(link => {
        const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
        const n = clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
        return conceptSet.has(n)
      })
    })
    if (todayQs.length === 0) return null
    return { todayQs, concepts }
  }, [plan, topic, allQuestions, doneConceptSlugs])

  // Fewest questions needed to cover the whole (remaining) plan — the count a
  // dashboard-launched Today's Quiz auto-selects to complete the day's plan.
  const todaysPlanFullCount = useMemo(() => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return 0
    return minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds })
  }, [buildTodaysPlanSelection, todayAnsweredIds])

  // Store the coverage-optimal question set and jump straight into the quiz.
  // `desiredCount` caps the questions (used when the user picks a smaller count);
  // the fewest-questions greedy cover keeps it on today's concepts either way.
  const launchTodaysPlan = useCallback((desiredCount: number): boolean => {
    const sel = buildTodaysPlanSelection()
    if (!sel) return false
    const selected = selectQuestionsForCoverage(sel.todayQs, sel.concepts, desiredCount, { seenIds: todayAnsweredIds })
    if (selected.length === 0) return false
    try {
      sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(selected.map(q => q.id)))
    } catch { /* ignore */ }
    navigate(`/quiz?selection=stored&mode=quiz&reveal=${reveal}&count=${selected.length}&from=home`)
    return true
  }, [buildTodaysPlanSelection, navigate, todayAnsweredIds])

  // Auto-activate today's study plan for premium users when it has concepts.
  // If the dashboard passed a custom concept selection (some deselected), apply that instead.
  useEffect(() => {
    if (!user || masteryLoading || conceptsLoading || planLoading || subLoading || mode !== 'quiz' || !topic) return

    if (!didApplyOverrideRef.current && conceptOverrideRef.current) {
      didApplyOverrideRef.current = true
      setSelectedConcepts(conceptOverrideRef.current)
      conceptOverrideRef.current = null
      setSource('custom')
      setIsAdaptive(false)
      return
    }

    if (!didApplyOverrideRef.current && examInProgress && isPremium && plan && planConceptCount > 0) {
      setSource('today')
      setSelectedConcepts([])
      setIsAdaptive(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, mode, user?.id, masteryLoading, conceptsLoading, planLoading, subLoading, isPremium, planConceptCount, examInProgress])

  // Auto-size Today's Quiz to cover the entire (remaining) plan, until the user
  // picks a specific count. This is what makes "Start Today's Quiz" pull exactly
  // the number of questions needed to complete the day's plan.
  useEffect(() => {
    if (useTodaysPlan && !userPickedCountRef.current && todaysPlanFullCount > 0) {
      setCount(todaysPlanFullCount)
    }
  }, [useTodaysPlan, todaysPlanFullCount])

  // One-click launch from the dashboard: as soon as the plan + question bank are
  // ready, jump straight into a quiz sized to complete today's plan. Falls back to
  // the normal config screen if the user isn't premium or has no plan.
  //
  // While this is pending we render a brief loading state (see `isAutostarting`
  // below) instead of the config screen — the dashboard's launch animation flows
  // straight into the quiz's collect gate with no flash of the config UI in
  // between. `autostartFailed` flips us back to the config screen only once we
  // know autostart can't proceed (not premium / no plan / no questions).
  const didAutostartRef = useRef(false)
  const [autostartFailed, setAutostartFailed] = useState(false)
  useEffect(() => {
    if (didAutostartRef.current) return
    if (searchParams.get('autostart') !== '1') return
    if (!user || mode !== 'quiz' || !topic) return
    if (masteryLoading || conceptsLoading || planLoading || subLoading) return
    // Everything the autostart decision depends on has loaded. If we're not
    // eligible, reveal the config screen instead of holding the spinner forever.
    if (!examInProgress || !isPremium || !plan || planConceptCount === 0 || allQuestions.length === 0) {
      setAutostartFailed(true)
      return
    }
    const sel = buildTodaysPlanSelection()
    if (!sel) {
      setAutostartFailed(true)
      return
    }
    didAutostartRef.current = true
    launchTodaysPlan(minQuestionsToCoverConcepts(sel.todayQs, sel.concepts, { seenIds: todayAnsweredIds }))
  }, [searchParams, user, mode, topic, masteryLoading, conceptsLoading, planLoading, subLoading, isPremium, plan, planConceptCount, allQuestions, buildTodaysPlanSelection, launchTodaysPlan, examInProgress, todayAnsweredIds])

  // True while a dashboard-initiated autostart is still resolving (loading data
  // or navigating into the quiz). Suppresses the config screen so the launch is
  // seamless; `autostartFailed` ends it if we can't autostart after all.
  const isAutostarting =
    searchParams.get('autostart') === '1' &&
    !autostartFailed &&
    mode === 'quiz' &&
    !!user &&
    !!topic

  // Persist manual concept selections to localStorage
  useEffect(() => {
    if (!topic || mode !== 'quiz' || isAdaptive || conceptMode === 'today') return
    try {
      localStorage.setItem(`actuarial_quiz_concepts_v1_${topic}`, JSON.stringify(selectedConcepts))
    } catch { /* ignore */ }
  }, [selectedConcepts, topic, mode, isAdaptive, conceptMode])

  // Question counts per exam (for the exam selection cards)
  const questionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const exam of EXAMS) {
      counts[exam.value] = filterQuestions(allQuestions, { exam: exam.value }).length
    }
    return counts
  }, [allQuestions])

  // Compute available question count for the current filters
  const availableCount = useMemo(() => {
    if (!topic) return 0
    return filterQuestions(allQuestions, {
      exam: topic,
      ...(selectedConcepts.length > 0 && { concepts: selectedConcepts }),
    }).length
  }, [allQuestions, topic, selectedConcepts])

  const conceptAvailableCount = useMemo(() => {
    if (!selectedConcept) return 0
    return filterQuestions(allQuestions, { concept: selectedConcept }).length
  }, [allQuestions, selectedConcept])

  // When study plan is active, use its question pool size; otherwise use subtopic-filtered count
  const effectiveAvailableCount = selectedConcept
    ? conceptAvailableCount
    : useTodaysPlan ? todayAvailableCount : availableCount

  // Clamp count when available pool shrinks
  useEffect(() => {
    if (effectiveAvailableCount > 0 && count > effectiveAvailableCount) {
      setCount(effectiveAvailableCount)
    }
  }, [effectiveAvailableCount, count])

  function toggleConcept(concept: string) {
    setIsAdaptive(false)
    setSource('custom')
    setSelectedConcepts(prev =>
      prev.includes(concept) ? prev.filter(s => s !== concept) : [...prev, concept]
    )
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    setIsAdaptive(false)
    setSource('custom')
    const allSelected = group.subtopics.every(s => selectedConcepts.includes(s))
    setSelectedConcepts(prev =>
      allSelected
        ? prev.filter(s => !group.subtopics.includes(s))
        : [...new Set([...prev, ...group.subtopics])]
    )
  }

  // The one control that says what this quiz is drawn from. "Today's Plan" only
  // appears for a signed-in learner working toward this exam — for everyone else
  // it isn't a choice, so it isn't offered.
  const showTodayOption = !!user && examInProgress
  const sourceOptions = useMemo<SegmentedOption<QuizSource>[]>(() => {
    const options: SegmentedOption<QuizSource>[] = []
    if (showTodayOption) {
      options.push({
        value: 'today',
        flex: 2,
        ariaLabel: isPremium
          ? `Today's plan${planConceptCount > 0 ? `, ${planConceptCount} concepts` : ''}`
          : "Today's plan (premium)",
        label: (
          <>
            <CalendarCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">Today's Plan</span>
            {!isPremium && <Lock className="h-3 w-3 shrink-0 text-amber-500" aria-hidden />}
            {isPremium && planConceptCount > 0 && (
              <span className="text-xs tabular-nums text-muted-foreground">{planConceptCount}</span>
            )}
          </>
        ),
      })
    }
    options.push({
      value: 'custom',
      flex: showTodayOption ? 2 : 1,
      ariaLabel: selectedConcepts.length > 0
        ? `By topic, ${selectedConcepts.length} selected`
        : 'By topic',
      label: (
        <>
          <span className="truncate">By Topic</span>
          {selectedConcepts.length > 0 && (
            <span className="text-xs tabular-nums text-muted-foreground">{selectedConcepts.length}</span>
          )}
        </>
      ),
    })
    options.push({
      value: 'mock-exam',
      flex: showTodayOption ? 2 : 1,
      label: <span className="truncate">Mock Exam</span>,
    })
    return options
  }, [showTodayOption, isPremium, planConceptCount, selectedConcepts.length])

  function handleSourceChange(next: QuizSource) {
    setSource(next)
    if (next === 'today' && isPremium) {
      setSelectedConcepts([])
      setIsAdaptive(false)
    }
    // Leaving quiz mode invalidates a question count the user picked for it, and
    // arriving at one should re-run the auto-size for today's plan.
    if (next !== 'mock-exam') setSelectedSitting(null)
  }

  function handleStart() {
    // A shuffled draw pins the exact question set, whichever mode produced it.
    if (drawnIds && drawnIds.length > 0) {
      try {
        sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(drawnIds))
      } catch { /* ignore */ }
      const params = new URLSearchParams({
        selection: 'stored',
        mode,
        count: String(drawnIds.length),
        from: 'home',
      })
      if (mode === 'quiz') params.set('reveal', reveal)
      navigate(`/quiz?${params.toString()}`)
      return
    }

    if (selectedConcept) {
      const params = new URLSearchParams({ concept: selectedConcept, mode: 'quiz', reveal, from: 'home' })
      if (count < conceptAvailableCount) params.set('count', String(count))
      navigate(`/quiz?${params.toString()}`)
      return
    }

    // Today's study plan mode: greedily cover as many of today's (still-incomplete)
    // concepts as possible with the fewest questions, capped at the chosen count.
    if (useTodaysPlan && plan) {
      if (launchTodaysPlan(count)) return
    }

    const params = new URLSearchParams({ exam: topic, mode })
    if (mode === 'quiz') {
      if (selectedConcepts.length > 0) params.set('concepts', selectedConcepts.join(','))
      params.set('count', String(count))
      params.set('reveal', reveal)
    } else if (selectedSitting !== null) {
      params.set('year', String(selectedSitting.year))
      if (selectedSitting.session) params.set('session', selectedSitting.session)
      params.set('count', String(sittingQuestionCount || (MOCK_EXAM_QUESTIONS[topic] ?? 30)))
    } else {
      params.set('count', String(MOCK_EXAM_QUESTIONS[topic] ?? 30))
    }
    navigate(`/quiz?${params.toString()}`)
  }

  // The exam's past sittings — the authored catalogue merged with whatever the
  // question bank holds, so papers that exist but haven't been imported still
  // appear (greyed out) in the browser. Published pass ratios, fetched live
  // through `api/pass-rates.js`, are laid over the authored figures; when the
  // source is unconfigured or unreachable the catalogue stands on its own.
  const livePassRates = useExamPassRates(topic)
  const pastExamRows = useMemo(
    () => (topic ? applyPassRates(buildPastExamRows(allQuestions, topic), livePassRates) : []),
    [allQuestions, topic, livePassRates],
  )

  // Questions belonging to the selected sitting — shared by the launch params,
  // the browser's footer line, and the availability count in the action bar.
  const sittingQuestionCount = useMemo(() => {
    if (!topic || !selectedSitting) return 0
    return allQuestions.filter(q =>
      q.exam === topic &&
      q.year === selectedSitting.year &&
      (!selectedSitting.session || q.session?.toLowerCase() === selectedSitting.session.toLowerCase())
    ).length
  }, [allQuestions, topic, selectedSitting])

  const mockExamCount = MOCK_EXAM_QUESTIONS[topic] ?? 30
  const examLabel = EXAMS.find(e => e.value === topic)?.label ?? topic

  // What the "Mix" row draws: the exam-shaped question count, unless the bank
  // holds fewer than that.
  const examQuestionCount = useMemo(
    () => (topic ? filterQuestions(allQuestions, { exam: topic }).length : 0),
    [allQuestions, topic],
  )
  const mixQuestionCount = Math.min(mockExamCount, examQuestionCount || mockExamCount)

  // The source paper behind the current selection: a sitting's examiner's
  // report, or — for an exam with no dated papers at all (Exam P / FM draw on
  // the SOA's rolling sample set) — the exam-level question PDF.
  const mockReportLink = selectedSitting
    ? getSittingPdfLink(topic, selectedSitting.year, selectedSitting.session)
    : pastExamRows.length === 0
    ? getExamPdfLink(topic)
    : null

  // The questions the current configuration can draw from. Backs the deck
  // card's availability number and gives the shuffle something to draw from.
  const currentPool = useMemo<Question[]>(() => {
    if (mode === 'mock-exam') {
      if (!topic) return []
      return filterQuestions(allQuestions, {
        exam: topic,
        ...(selectedSitting && { year: selectedSitting.year, session: selectedSitting.session }),
      })
    }
    if (selectedConcept) return filterQuestions(allQuestions, { concept: selectedConcept })
    if (useTodaysPlan) return buildTodaysPlanSelection()?.todayQs ?? []
    if (!topic) return []
    return filterQuestions(allQuestions, {
      exam: topic,
      ...(selectedConcepts.length > 0 && { concepts: selectedConcepts }),
    })
  }, [mode, topic, allQuestions, selectedSitting, selectedConcept, useTodaysPlan, buildTodaysPlanSelection, selectedConcepts])

  // How many the pool holds, and how many of those the quiz will pull.
  const poolCount = currentPool.length

  // How much of the pool the learner has never seen. "349 questions" barely
  // moves as topics are picked; "229 new to you" is the number that decides
  // whether this draw is worth taking. Same attempt history the search rows and
  // question lists read (see QuestionAttemptBadge in CLAUDE.md) — server-side
  // only, so `tracked` is false for guests and the line is simply omitted.
  const poolNewCount = useMemo(
    () => currentPool.reduce((n, q) => n + (attemptsByQuestionId.has(q.id) ? 0 : 1), 0),
    [currentPool, attemptsByQuestionId],
  )
  const quizQuestionCount = mode === 'mock-exam'
    ? (selectedSitting ? poolCount : Math.min(mockExamCount, poolCount))
    : Math.min(count, poolCount)

  // ── Shuffling the draw ────────────────────────────────────────────────────
  // Tapping the deck card fixes a specific set of questions for the next quiz.
  // The set is cleared whenever the configuration changes, so Start can never
  // launch a draw that no longer matches the filters on screen.
  const [drawnIds, setDrawnIds] = useState<string[] | null>(null)
  const [shuffleTick, setShuffleTick] = useState(0)
  const [justShuffled, setJustShuffled] = useState(false)
  const shuffleTimerRef = useRef<number | null>(null)

  const drawSignature = [
    mode,
    topic,
    selectedConcept,
    conceptMode,
    count,
    selectedSitting ? `${selectedSitting.year}|${selectedSitting.session ?? ''}` : '',
    [...selectedConcepts].sort().join(','),
  ].join('§')

  useEffect(() => {
    setDrawnIds(null)
    setJustShuffled(false)
  }, [drawSignature])

  useEffect(() => () => {
    if (shuffleTimerRef.current !== null) window.clearTimeout(shuffleTimerRef.current)
  }, [])

  function handleShuffle() {
    if (quizQuestionCount <= 0) return
    const shuffled = [...currentPool]
    // Fisher-Yates (uniform; sort+random is biased) — same draw the quiz itself uses.
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    // Today's Plan keeps its coverage guarantee: the greedy cover takes the
    // first best-covering question, so running it over a shuffled pool yields a
    // different set that still covers the day's concepts.
    const planConcepts = useTodaysPlan ? buildTodaysPlanSelection()?.concepts : undefined
    const draw = planConcepts
      ? selectQuestionsForCoverage(shuffled, planConcepts, quizQuestionCount, { seenIds: todayAnsweredIds })
      : shuffled.slice(0, quizQuestionCount)

    setDrawnIds(draw.map(q => q.id))
    setShuffleTick(t => t + 1)
    setJustShuffled(true)
    if (shuffleTimerRef.current !== null) window.clearTimeout(shuffleTimerRef.current)
    shuffleTimerRef.current = window.setTimeout(() => setJustShuffled(false), 1800)
  }

  // Nothing a shuffle could change: an empty pool, or a draw that already takes
  // every question available.
  const shuffleDisabled = poolCount === 0 || quizQuestionCount >= poolCount
  const hasTopic = topic !== ''
  const hasSelection = hasTopic || selectedConcept !== ''

  // The bottom action bar's real height, published as `--action-bar-height` so
  // the page below reserves exactly that much and the onboarding launcher can
  // ride above it instead of landing on the Start button.
  const actionBarRef = useRef<HTMLDivElement>(null)
  useActionBarHeight(actionBarRef, hasSelection)

  // ── Question count ────────────────────────────────────────────────────────
  // "Full plan" carries its own value rather than its numeric count: when the
  // plan happens to need 3 questions it would otherwise collide with the "3"
  // option and light both.
  const countOptions = useMemo<SegmentedOption<string>[]>(() => {
    const options: SegmentedOption<string>[] = []
    if (useTodaysPlan && todaysPlanFullCount > 0) {
      options.push({
        value: 'full',
        flex: 2,
        ariaLabel: `Full plan, ${todaysPlanFullCount} question${todaysPlanFullCount === 1 ? '' : 's'}`,
        label: <span className="truncate">Full plan</span>,
      })
    }
    for (const n of QUICK_COUNTS) {
      options.push({
        value: String(n),
        ariaLabel: `${n} question${n === 1 ? '' : 's'}`,
        label: <span className="tabular-nums">{n}</span>,
        disabled: effectiveAvailableCount > 0 && n > effectiveAvailableCount,
      })
    }
    return options
  }, [useTodaysPlan, todaysPlanFullCount, effectiveAvailableCount])

  const countValue = useTodaysPlan && count === todaysPlanFullCount ? 'full' : String(count)

  function handleCountChange(next: string) {
    userPickedCountRef.current = true
    if (next === 'full') {
      setCount(todaysPlanFullCount)
      return
    }
    const n = Number(next)
    setCount(Math.min(n, effectiveAvailableCount > 0 ? effectiveAvailableCount : n))
  }

  // Filter reflecting the current quiz configuration — passed to the search
  // bar so it only previews questions from the active pool.
  const searchFilter = useMemo(() => {
    if (selectedConcept) return { concept: selectedConcept }
    if (!topic) return {}
    if (useTodaysPlan && plan) {
      const displayConcepts = plan.status === 'review_mode'
        ? (plan.reviewConcepts ?? [])
        : plan.todaysConcepts
      return {
        exam: topic,
        ...(displayConcepts.length > 0 && { concepts: displayConcepts }),
      }
    }
    return {
      exam: topic,
      ...(selectedConcepts.length > 0 && { concepts: selectedConcepts }),
    }
  }, [topic, selectedConcept, selectedConcepts, useTodaysPlan, plan])

  // Active filter chips shown in the search dropdown so the user can see and
  // remove concept filters without leaving the search panel.
  const filterPills = useMemo(() => {
    const pills: { label: string; onRemove: () => void }[] = []
    if (selectedConcept) {
      pills.push({ label: selectedConcept, onRemove: () => setSelectedConcept('') })
    }
    selectedConcepts.forEach(c => {
      pills.push({ label: c, onRemove: () => toggleConcept(c) })
    })
    return pills
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConcept, selectedConcepts])

  // Dashboard launch is still resolving — hold a quiet loading state rather than
  // flashing the quiz config screen on the way into the quiz.
  if (isAutostarting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Getting today's quiz ready…</p>
      </div>
    )
  }

  return (
    <>
    <QuizFloatingSearch filter={searchFilter} filterPills={filterPills} />
    {/* Bottom padding tracks the action bar's measured height rather than a
        fixed guess — the bar grows and shrinks with the deck card and the
        sitting selector, and the old `pb-72` both clipped and over-reserved. */}
    <div
      className="container max-w-2xl mx-auto px-4 pt-0 space-y-6"
      style={{
        paddingBottom: hasSelection
          ? 'calc(var(--action-bar-height, 16rem) + 1.5rem)'
          : '3rem',
      }}
    >
      {/* One compact row: back out of the exam, and the exam's name. This was a
          three-row block ~155px tall on a phone, on a screen where fixed chrome
          already took two-thirds of the viewport. */}
      {/* Same treatment as the Dashboard's sticky header — a translucent blurred
          background rather than a rule, which would stop at this container's
          edge rather than spanning the viewport. */}
      <div className="sticky top-14 md:top-28 lg:top-14 z-20 -mx-4 space-y-2 bg-background/95 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {hasTopic && (
            <button
              type="button"
              onClick={() => setTopic('')}
              aria-label="Change exam"
              className="-ml-1.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">
            {hasTopic ? examLabel : 'Quiz'}
          </h1>
          {!user && (
            <Link
              to="/auth"
              className="shrink-0 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-primary underline-offset-2 hover:underline">Sign in</span>
              <span className="hidden sm:inline"> to save progress</span>
            </Link>
          )}
        </div>

        {selectedConcept && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Concept:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
              {selectedConcept}
              <button
                type="button"
                onClick={() => setSelectedConcept('')}
                className="hover:text-primary/70 transition-colors"
                aria-label="Remove concept filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
            {conceptAvailableCount > 0 && (
              <span className="text-xs text-muted-foreground">{conceptAvailableCount} question{conceptAvailableCount !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}

      </div>

      <div className="space-y-6">
          {!hasTopic && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Exam</p>
                <SegmentedControl
                  label="Examining body"
                  size="sm"
                  value={activeFilter}
                  onChange={handleSetFilter}
                  options={[
                    { value: 'SOA', label: 'SOA' },
                    { value: 'CAS', label: 'CAS' },
                  ]}
                  className="shrink-0"
                />
              </div>
              <div className="space-y-4">
                {filteredTrackGroups.map(group => (
                  <div key={group.key}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {group.name}
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {group.exams.map(exam => {
                        const colorIdx = activeExamValues.indexOf(exam.value)
                        const isActive = colorIdx >= 0
                        return (
                          <ExamOptionCard
                            key={exam.value}
                            exam={exam}
                            onClick={() => setTopic(exam.value)}
                            questionCount={questionCounts[exam.value] ?? 0}
                            colorIdx={colorIdx}
                            targetDate={isActive ? (targetDates[exam.progressKey] ?? null) : null}
                            subtitle={examTopicByProgressKey[exam.progressKey]}
                            todayQuizCount={badgeCountFor(todayQuizByExam[exam.progressKey])}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasTopic && (
            <>
              {/* ── What the quiz draws from ───────────────────────────── */}
              <div className="space-y-3">
                {!quizModeResolved ? (
                  <div className="h-11 rounded-lg border border-border bg-muted/50 animate-pulse" />
                ) : (
                  <SegmentedControl
                    label="What to quiz on"
                    value={source}
                    onChange={handleSourceChange}
                    options={sourceOptions}
                  />
                )}

                {/* Today's Plan content */}
                {quizModeResolved && source === 'today' && (
                  !isPremium ? (
                    <div className="rounded-lg bg-muted/40 px-4 py-3 flex items-start gap-3">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Personalized daily study plan</p>
                        <p className="text-xs text-muted-foreground">Get a daily study schedule tailored to your exam date and mastery progress.</p>
                      </div>
                      <Link
                        to="/upgrade"
                        className="shrink-0 px-3 py-1.5 rounded-md bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Go Pro
                      </Link>
                    </div>
                  ) : planConceptCount === 0 ? (
                    <div className="rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                      No concepts scheduled for today. Set your exam date in the dashboard to generate a study plan.
                    </div>
                  ) : (
                    <ul className="overflow-hidden rounded-lg bg-muted/30">
                      {todayConceptDisplayNames.map(concept => (
                        <li key={concept} className="flex items-center gap-2.5 px-3 py-2.5">
                          <Check className="h-4 w-4 shrink-0 text-primary/60" aria-hidden />
                          <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}

                {/* By Topic concept groups */}
                {quizModeResolved && source === 'custom' && (
                  <div className="space-y-2">
                    {conceptsLoading && orderedConcepts.length === 0 ? (
                      <p className="text-xs text-muted-foreground px-1">Loading concepts…</p>
                    ) : (
                      <>
                        {selectedConcepts.length > 0 && (
                          <p className="px-1 text-xs text-muted-foreground">
                            {selectedConcepts.length} topic{selectedConcepts.length === 1 ? '' : 's'} selected.
                            <button
                              type="button"
                              onClick={() => setSelectedConcepts([])}
                              className="ml-1.5 rounded underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              Clear
                            </button>
                          </p>
                        )}
                        {groupedConcepts.map(group => (
                          <GroupSection
                            key={group.name}
                            group={group}
                            selectedSubtopics={selectedConcepts}
                            todaySubtopics={todayConcepts}
                            onToggle={toggleConcept}
                            onSelectAll={selectAllInGroup}
                            conceptLevelMap={isPremium ? conceptLevelMap : undefined}
                            isPremium={isPremium}
                          />
                        ))}
                      </>
                    )}
                  </div>
                )}

                {/* Mock Exam content — the past-paper shelf */}
                {quizModeResolved && source === 'mock-exam' && (
                  <PastExamBrowser
                    rows={pastExamRows}
                    selected={selectedSitting}
                    onSelect={setSelectedSitting}
                    mixCount={mixQuestionCount}
                    examLabel={examLabel}
                    lookup={getPassRateLookup(topic)}
                    reportLink={mockReportLink}
                  />
                )}
              </div>

            </>
          )}
      </div>

    </div>

    {hasSelection && (
      <div
        ref={actionBarRef}
        className="fixed bottom-14 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-20 border-t border-border bg-background/95 backdrop-blur-sm"
      >
        <div className="container max-w-2xl mx-auto px-4 pt-3 pb-4 space-y-3">
          {/* ── Question deck: availability + shuffle the draw ────────── */}
          {poolCount > 0 && (
            <QuestionDeckCard
              available={poolCount}
              selected={quizQuestionCount}
              newCount={poolNewCount}
              attemptsTracked={attemptsTracked}
              onShuffle={handleShuffle}
              shuffleTick={shuffleTick}
              justShuffled={justShuffled}
              disabled={shuffleDisabled}
            />
          )}

          {/* ── How many questions ────────────────────────────────────
              Counts only. "Mock Exam" used to sit at the end of this row,
              which made a mode switch look like a quantity — it lives in the
              source control at the top of the page now. */}
          {mode === 'quiz' && (
            <SegmentedControl
              label="Question count"
              value={countValue}
              onChange={handleCountChange}
              options={countOptions}
            />
          )}

          {/* The sitting picker used to live here as a row of pills. It's the
              past-exam browser in the page body now — a pill row can't carry a
              paper's size or its pass rate, and it had no room to list the
              sittings that exist but aren't in the bank yet. */}

          <div className="relative">
            <Button
              type="button"
              size="lg"
              data-tour="start-quiz"
              // The launch cue rather than the solid Button's `press`: this is
              // the button the whole page exists for.
              data-sound="begin"
              onClick={handleStart}
              disabled={quizQuestionCount === 0}
              className="h-14 w-full gap-3 rounded-xl text-base font-semibold"
            >
              <Play className="h-5 w-5" aria-hidden />
              Start {mode === 'mock-exam' ? 'Mock Exam' : 'Quiz'}
            </Button>
            {/* Only badge a launch that's actually sized to finish today's plan —
                picking a smaller count means this quiz won't complete it. */}
            {mode === 'quiz' && useTodaysPlan && count === todaysPlanFullCount && (
              <TodayQuizCornerBadge count={badgeCountFor(todayQuizByExam[examIdForPlan ?? ''])} size="lg" />
            )}
          </div>

          {/* The selection can filter down to nothing; say so rather than
              launching into the quiz's "No questions found" screen. */}
          {quizQuestionCount === 0 && (
            <p className="text-center text-xs text-muted-foreground">
              No questions match this selection. Pick different topics to start.
            </p>
          )}
        </div>
      </div>
    )}

    </>
  )
}
