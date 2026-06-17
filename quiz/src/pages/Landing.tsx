import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { CalendarCheck, Check, CheckCircle2, ChevronDown, ChevronLeft, Circle, Lock, Play, X } from 'lucide-react'
import { QuizFloatingSearch } from '@/components/QuizFloatingSearch'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useConcepts } from '@/hooks/useConcepts'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { selectQuestionsForCoverage } from '@/lib/studyPlan'
import { useSubscription } from '@/hooks/useSubscription'
import { filterQuestions } from '@/lib/parser'
import { decayIfStale, type MasteryState } from '@/lib/mastery'
import type { QuizMode } from '@/lib/parser'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const EXAMS = [
  { value: 'Probability', label: 'Exam P-1 (SOA)' },
  { value: 'Financial Mathematics', label: 'Exam FM-2 (SOA)' },
  { value: 'Exam 5', label: 'Exam 5 (CAS)' },
]


// Question counts that mirror each real exam
const MOCK_EXAM_QUESTIONS: Record<string, number> = {
  'Probability': 30,
  'Financial Mathematics': 35,
  'Exam 5': 25,
}

const QUICK_COUNTS = [3, 5, 10]

// ─── Mastery level labels and badge styles ────────────────────────────────────

const STATE_LABEL: Record<MasteryState, string> = {
  new:      'New',
  level1:   'Level 1',
  level2:   'Level 2',
  level3:   'Level 3',
  forgotten: 'Forgotten',
}

const STATE_BADGE: Record<MasteryState, string> = {
  new:       'border-border text-muted-foreground bg-muted/50',
  level1:    'border-green-200 text-green-600 bg-green-50 dark:border-green-800 dark:text-green-400 dark:bg-green-950/40',
  level2:    'border-green-300 text-green-700 bg-green-100 dark:border-green-700 dark:text-green-300 dark:bg-green-950/60',
  level3:    'border-green-400 text-green-800 bg-green-200 dark:border-green-600 dark:text-green-200 dark:bg-green-950/80',
  forgotten: 'border-red-200 text-red-600 bg-red-50 dark:border-red-800 dark:text-red-400 dark:bg-red-950/40',
}

// ─── Collapsible learning-objective group (mirrors example callout style) ─────

function parseGroupWeight(weight?: string): number | null {
  if (!weight) return null
  const rangeMatch = weight.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*%/)
  if (rangeMatch) return (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2
  const singleMatch = weight.match(/(\d+(?:\.\d+)?)\s*%/)
  if (singleMatch) return parseFloat(singleMatch[1])
  return null
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
  const [open, setOpen] = useState(false)
  const allSelected = group.subtopics.every(s => selectedSubtopics.includes(s))
  const someSelected = group.subtopics.some(s => selectedSubtopics.includes(s))
  const selectedCount = group.subtopics.filter(s => selectedSubtopics.includes(s)).length
  const examPercentage = parseGroupWeight(group.weight)

  return (
    <div className="rounded-lg overflow-hidden bg-background border border-border">
      <div className="relative">
        {/* Bar fill – proportional to exam weight when collapsed, full width when expanded */}
        {examPercentage !== null && (
          <div
            className="absolute inset-y-0 left-0 bg-card transition-all duration-300"
            style={{ width: open ? '100%' : `${examPercentage}%` }}
          />
        )}
        <div className="relative z-10 flex items-stretch">
          {/* Select-all checkmark circle */}
          <button
            type="button"
            onClick={e => onSelectAll(group, e)}
            className="flex items-center justify-center px-3 hover:bg-accent/30 transition-colors duration-150 shrink-0"
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
            className="flex-1 py-3 pr-4 text-left hover:bg-accent/30 transition-colors duration-150"
            aria-expanded={open}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="font-medium flex-1 text-base text-left text-foreground">
                {group.name}
                {group.weight && (
                  <span className="ml-1.5 inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary align-middle">
                    {group.weight}
                  </span>
                )}
              </span>
              {selectedCount > 0 && (
                <span className="text-xs text-muted-foreground shrink-0">
                  {selectedCount}/{group.subtopics.length}
                </span>
              )}
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
              />
            </div>
          </button>
        </div>
      </div>

      <div hidden={!open} className="border-t border-border/40 pb-1 pt-1 bg-card">
        <div className="flex flex-col">
          {group.subtopics.map(subtopic => {
            const isSelected = selectedSubtopics.includes(subtopic)
            const isToday = todaySubtopics.has(subtopic)
            const conceptLevel = conceptLevelMap?.get(subtopic)
            return (
              <button
                key={subtopic}
                type="button"
                onClick={() => onToggle(subtopic)}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                  isSelected
                    ? 'text-primary bg-primary/10 hover:bg-primary/15'
                    : 'text-primary/60 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {isSelected ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-primary/30" />
                )}
                <span className="flex-1 text-sm font-medium leading-snug">
                  {subtopic}
                </span>
                {isPremium && conceptLevel !== undefined ? (
                  <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium shrink-0 ${STATE_BADGE[conceptLevel]}`}>
                    {STATE_LABEL[conceptLevel]}
                  </span>
                ) : isToday ? (
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${isSelected ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary/70'}`}>
                    today
                  </span>
                ) : null}
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
}: {
  exam: { value: string; label: string }
  onClick: () => void
  questionCount: number
}) {
  const isExam5 = exam.value === 'Exam 5'
  const description = isExam5 ? null : exam.value

  return (
    <button type="button" data-tour={exam.value === 'Probability' ? 'quiz-exam-p' : undefined} onClick={onClick} className="text-left w-full">
      <Card className={cn('h-full transition-all duration-150 overflow-hidden hover:bg-accent/30')}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base leading-snug">{exam.label}</CardTitle>
          {description && (
            <CardDescription className="mt-0.5">{description}</CardDescription>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground">
              {questionCount} question{questionCount !== 1 ? 's' : ''}
            </span>
            {isExam5 && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                In Development
              </span>
            )}
            {!isExam5 && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Beta
              </span>
            )}
          </div>
        </CardHeader>
      </Card>
    </button>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { byExam: conceptsByExam, loading: conceptsLoading } = useConcepts()
  const { questions: allQuestions } = useAllQuestions()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()
  const { isPremium, loading: subLoading } = useSubscription()

  const initialTopic = searchParams.get('topic') ?? ''
  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'
  const initialConcept = searchParams.get('concept') ?? ''

  const inProgressExams = EXAMS.filter(e => {
    const examId = Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === e.value)?.[0]
    return examId ? examProgress[examId] === 'in_progress' : false
  })
  const otherExams = EXAMS.filter(e => !inProgressExams.includes(e))
  const hasInProgress = inProgressExams.length > 0

  const [topic, setTopic] = useState(initialTopic)
  const [mode, setMode] = useState<QuizMode>(initialMode)
  const [showOther, setShowOther] = useState(!hasInProgress)

  const [selectedConcept, setSelectedConcept] = useState(initialConcept)

  // Quiz-specific options
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [isAdaptive, setIsAdaptive] = useState(false)
  const [conceptMode, setConceptMode] = useState<'today' | 'custom'>('custom')
  const [count, setCount] = useState<number>(3)
  const reveal = 'during' as const

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

  // Pre-select first in-progress exam when progress loads
  useEffect(() => {
    if (initialTopic) return
    if (inProgressExams.length > 0) {
      setTopic(inProgressExams[0].value)
      setShowOther(false)
    }
  }, [examProgress.P, examProgress.FM])  // eslint-disable-line react-hooks/exhaustive-deps

  // Reset state and restore saved topic selections when exam topic or mode changes
  useEffect(() => {
    setIsAdaptive(false)
    setConceptMode('custom')
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
    () => syllabi.find(s => s.examTopic === topic) ?? null,
    [syllabi, topic],
  )

  const examIdForPlan = useMemo(
    () => Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === topic)?.[0] ?? null,
    [topic],
  )
  const examDateForPlan = examIdForPlan ? (targetDates[examIdForPlan] ?? null) : null

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
  const useTodaysPlan = conceptMode === 'today' && isPremium && !!plan && planConceptCount > 0

  // Display names for concepts in today's plan (used in dropdown)
  const todayConceptDisplayNames = useMemo(() => {
    if (!plan) return []
    return plan.status === 'review_mode'
      ? (plan.reviewConcepts ?? [])
      : plan.todaysConcepts
  }, [plan])

  // Auto-activate today's study plan for premium users when it has concepts.
  // If the dashboard passed a custom concept selection (some deselected), apply that instead.
  useEffect(() => {
    if (!user || masteryLoading || conceptsLoading || planLoading || subLoading || mode !== 'quiz' || !topic) return

    if (!didApplyOverrideRef.current && conceptOverrideRef.current) {
      didApplyOverrideRef.current = true
      setSelectedConcepts(conceptOverrideRef.current)
      conceptOverrideRef.current = null
      setConceptMode('custom')
      setIsAdaptive(false)
      return
    }

    if (!didApplyOverrideRef.current && isPremium && plan && planConceptCount > 0) {
      setConceptMode('today')
      setSelectedConcepts([])
      setIsAdaptive(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, mode, user?.id, masteryLoading, conceptsLoading, planLoading, subLoading, isPremium, planConceptCount])

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
    setConceptMode('custom')
    setSelectedConcepts(prev =>
      prev.includes(concept) ? prev.filter(s => s !== concept) : [...prev, concept]
    )
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    setIsAdaptive(false)
    setConceptMode('custom')
    const allSelected = group.subtopics.every(s => selectedConcepts.includes(s))
    setSelectedConcepts(prev =>
      allSelected
        ? prev.filter(s => !group.subtopics.includes(s))
        : [...new Set([...prev, ...group.subtopics])]
    )
  }

  function handleStart() {
    if (selectedConcept) {
      const params = new URLSearchParams({ concept: selectedConcept, mode: 'quiz', reveal, from: 'home' })
      if (count < conceptAvailableCount) params.set('count', String(count))
      navigate(`/quiz?${params.toString()}`)
      return
    }

    // Today's study plan mode: filter by concept names, prioritize multi-concept questions
    if (useTodaysPlan && plan) {
      const displayConcepts = plan.status === 'review_mode'
        ? (plan.reviewConcepts ?? [])
        : plan.todaysConcepts
      if (displayConcepts.length > 0) {
        const todaySet = new Set(displayConcepts.map(n => n.toLowerCase()))
        const todayQs = allQuestions.filter(q => {
          if (q.exam !== topic) return false
          return q.wiki_link.some(link => {
            const clean = link.replace(/\+/g, ' ').replace(/\.md$/i, '')
            const n = clean.split('/').filter(Boolean).pop()?.toLowerCase() ?? ''
            return todaySet.has(n)
          })
        })
        if (todayQs.length > 0) {
          // Greedily cover as many of today's concepts as possible with the
          // fewest questions, so a quiz with count >= concepts covers every
          // concept at least once.
          const selected = selectQuestionsForCoverage(todayQs, displayConcepts, count)
          const poolIds = selected.map(q => q.id)
          try {
            sessionStorage.setItem('actuarial_selected_ids', JSON.stringify(poolIds))
          } catch { /* ignore */ }
          navigate(`/quiz?selection=stored&mode=quiz&reveal=${reveal}&count=${count}&from=home`)
          return
        }
      }
    }

    const params = new URLSearchParams({ exam: topic, mode })
    if (mode === 'quiz') {
      if (selectedConcepts.length > 0) params.set('concepts', selectedConcepts.join(','))
      params.set('count', String(count))
      params.set('reveal', reveal)
    } else {
      params.set('count', String(MOCK_EXAM_QUESTIONS[topic] ?? 30))
    }
    navigate(`/quiz?${params.toString()}`)
  }

  const mockExamCount = MOCK_EXAM_QUESTIONS[topic] ?? 30
  const examLabel = EXAMS.find(e => e.value === topic)?.label ?? topic
  const hasTopic = topic !== ''
  const hasSelection = hasTopic || selectedConcept !== ''

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

  return (
    <>
    <QuizFloatingSearch filter={searchFilter} filterPills={filterPills} />
    <div className={`container max-w-2xl mx-auto px-4 pt-0 space-y-8 ${hasSelection ? 'pb-56' : 'pb-12'}`}>
      <div className="sticky top-14 md:top-28 lg:top-14 z-20 bg-background -mx-4 px-4 pt-3 pb-4 space-y-3">
        {hasTopic && (
          <button
            type="button"
            onClick={() => setTopic('')}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>change exam</span>
          </button>
        )}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{hasTopic ? examLabel : 'Quiz'}</h1>
            </div>
            {!user && (
              <p className="text-xs text-muted-foreground">
                <a href="/auth" className="text-primary hover:underline">Sign in</a> to save your progress
              </p>
            )}
          </div>
        </div>

        {selectedConcept && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Concept:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(hasInProgress ? inProgressExams : EXAMS).map(exam => (
                  <ExamOptionCard
                    key={exam.value}
                    exam={exam}
                    onClick={() => setTopic(exam.value)}
                    questionCount={questionCounts[exam.value] ?? 0}
                  />
                ))}
              </div>

              {hasInProgress && otherExams.length > 0 && (
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setShowOther(v => !v)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-3 h-3 transition-transform ${showOther ? 'rotate-90' : ''}`}
                    >
                      <polyline points="6 4 12 10 6 16" />
                    </svg>
                    Other exams
                  </button>
                  {showOther && (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-2">
                      {otherExams.map(exam => (
                        <ExamOptionCard
                          key={exam.value}
                          exam={exam}
                          onClick={() => setTopic(exam.value)}
                          questionCount={questionCounts[exam.value] ?? 0}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {hasTopic && (
            <>
              {/* ── Quiz mode options ──────────────────────────────────── */}
              {mode === 'quiz' && (
                <div className="space-y-3">
                  {/* Today's Plan / By Topic segmented control */}
                  {user && (
                    <div className="flex rounded-xl border border-input bg-muted/30 p-0.5 gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setConceptMode('today')
                          if (isPremium) {
                            setSelectedConcepts([])
                            setIsAdaptive(false)
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-colors ${
                          conceptMode === 'today'
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                        }`}
                      >
                        <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
                        <span>Today's Plan</span>
                        {!isPremium && <Lock className="h-3 w-3 shrink-0 text-amber-500" />}
                        {isPremium && planConceptCount > 0 && (
                          <span className="text-xs opacity-75">· {planConceptCount}</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConceptMode('custom')}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-colors ${
                          conceptMode === 'custom'
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                        }`}
                      >
                        <span>By Topic</span>
                        {conceptMode === 'custom' && selectedConcepts.length > 0 && (
                          <span className="text-xs opacity-75">· {selectedConcepts.length}</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Today's Plan content */}
                  {user && conceptMode === 'today' && (
                    !isPremium ? (
                      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 flex items-start gap-3">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Personalized daily study plan</p>
                          <p className="text-xs text-muted-foreground">Get a daily study schedule tailored to your exam date and mastery progress.</p>
                        </div>
                        <Link
                          to="/upgrade"
                          className="shrink-0 px-3 py-1.5 rounded-md bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors mt-0.5"
                        >
                          Go Pro
                        </Link>
                      </div>
                    ) : planConceptCount === 0 ? (
                      <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                        No concepts scheduled for today. Set your exam date in the dashboard to generate a study plan.
                      </div>
                    ) : (
                      <div className="rounded-lg border border-border/60 bg-muted/30 overflow-hidden">
                        <div className="divide-y divide-border/30">
                          {todayConceptDisplayNames.map(concept => (
                            <div key={concept} className="flex items-center gap-2.5 px-3 py-2.5">
                              <Check className="h-4 w-4 shrink-0 text-primary/60" />
                              <span className="flex-1 text-sm font-medium leading-snug">{concept}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* By Topic concept groups */}
                  {(!user || conceptMode === 'custom') && (
                    <div className="space-y-2">
                      {conceptsLoading && orderedConcepts.length === 0 ? (
                        <p className="text-xs text-muted-foreground px-1">Loading concepts…</p>
                      ) : (
                        groupedConcepts.map(group => (
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
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── Mock Exam mode info ────────────────────────────────── */}
              {mode === 'mock-exam' && (
                <div className="rounded-lg border bg-muted/40 px-4 py-3 space-y-1">
                  <p className="text-sm font-medium">{mockExamCount} questions</p>
                  <p className="text-xs text-muted-foreground">
                    Distributed across all {examLabel} topics to mirror the real exam.
                    Answers and explanations are revealed at the end.
                  </p>
                </div>
              )}

            </>
          )}
      </div>

    </div>

    {hasSelection && (
      <div className="fixed bottom-14 md:bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-20 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="container max-w-2xl mx-auto px-4 pt-3 pb-4 space-y-3">
          <div className="flex rounded-xl border border-input bg-muted/30 p-0.5 gap-0.5">
            {QUICK_COUNTS.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => { setMode('quiz'); setCount(Math.min(n, effectiveAvailableCount > 0 ? effectiveAvailableCount : n)) }}
                className={`flex-1 h-10 rounded-lg text-sm font-bold transition-colors ${
                  mode === 'quiz' && count === n && effectiveAvailableCount >= n
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMode('mock-exam')}
              className={`flex-[2] h-10 rounded-lg text-sm font-bold transition-colors px-2 ${
                mode === 'mock-exam'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
              }`}
            >
              Mock Exam
            </button>
          </div>
          <button
            type="button"
            data-tour="start-quiz"
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors"
          >
            <Play className="h-5 w-5" />
            Start {mode === 'mock-exam' ? 'Mock Exam' : 'Quiz'}
          </button>
        </div>
      </div>
    )}

    </>
  )
}
