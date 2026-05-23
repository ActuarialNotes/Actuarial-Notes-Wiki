import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, Check } from 'lucide-react'
import { QuizFloatingSearch } from '@/components/QuizFloatingSearch'
import { useAuth } from '@/hooks/useAuth'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { EXAM_ID_TO_TOPIC } from '@/hooks/useExamProgress'
import { useTopics } from '@/hooks/useTopics'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { useStudyPlan } from '@/hooks/useStudyPlan'
import { aggregateForTopic } from '@/lib/mastery'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { filterQuestions } from '@/lib/parser'
import { getExamColor } from '@/lib/examColors'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { QuizMode } from '@/lib/parser'
import type { ConceptMasteryRecord } from '@/lib/mastery'
import type { Question } from '@/lib/parser'

const EXAMS = [
  { value: 'Probability', label: 'Exam P — Probability' },
  { value: 'Financial Mathematics', label: 'Exam FM — Financial Mathematics' },
]

function computeAdaptiveSubtopics(
  subtopics: string[],
  allQuestions: Question[],
  topic: string,
  masteryRecords: ConceptMasteryRecord[],
): string[] {
  if (!topic || masteryRecords.length === 0) return []
  const now = new Date()

  const slugsBySubtopic = new Map<string, string[]>()
  for (const q of allQuestions) {
    if (q.exam !== topic) continue
    const slugs: string[] = []
    for (const link of q.wiki_link) {
      const ref = hrefToEntryRef(link)
      if (ref?.kind === 'concept' && ref.name) {
        slugs.push(ref.name)
      } else {
        const last = link.split('/').filter(Boolean).pop()
        if (last) slugs.push(last.replace(/-/g, ' '))
      }
    }
    slugsBySubtopic.set(q.topic, [...(slugsBySubtopic.get(q.topic) ?? []), ...slugs])
  }

  interface Scored { subtopic: string; priority: number }
  const scored: Scored[] = subtopics.map(st => {
    const slugs = slugsBySubtopic.get(st) ?? []
    const agg = aggregateForTopic(masteryRecords, slugs, now)
    let priority: number
    if (agg.forgotten > 0) priority = 0
    else if (agg.learning > 0) priority = 1
    else if (agg.newCount > 0) priority = 2
    else priority = 3
    return { subtopic: st, priority }
  }).sort((a, b) => a.priority - b.priority)

  const selected: string[] = []
  let newIntroduced = 0
  for (const { subtopic, priority } of scored) {
    if (priority <= 1) {
      selected.push(subtopic)
    } else if (priority === 2 && newIntroduced < 2) {
      selected.push(subtopic)
      newIntroduced++
    }
  }
  return selected
}

// Question counts that mirror each real exam
const MOCK_EXAM_QUESTIONS: Record<string, number> = {
  'Probability': 30,
  'Financial Mathematics': 35,
}

const QUICK_COUNTS = [3, 5, 10]

export default function Landing() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { progress: examProgress, targetDates } = useExamProgress()
  const { byExam: subtopicsByTopic, loading: subtopicsLoading } = useTopics()
  const { questions: allQuestions } = useAllQuestions()
  const { records: masteryRecords, loading: masteryLoading } = useConceptMastery()
  const { syllabi } = useWikiSyllabus()

  const initialTopic = searchParams.get('topic') ?? ''
  const initialMode = (searchParams.get('mode') as QuizMode | null) ?? 'quiz'

  const inProgressExams = EXAMS.filter(e => {
    const examId = Object.entries(EXAM_ID_TO_TOPIC).find(([, t]) => t === e.value)?.[0]
    return examId ? examProgress[examId] === 'in_progress' : false
  })
  const otherExams = EXAMS.filter(e => !inProgressExams.includes(e))
  const hasInProgress = inProgressExams.length > 0

  const [topic, setTopic] = useState(initialTopic)
  const [mode, setMode] = useState<QuizMode>(initialMode)
  const [showOther, setShowOther] = useState(!hasInProgress)

  // Quiz-specific options
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([])
  const [isAdaptive, setIsAdaptive] = useState(false)
  const [count, setCount] = useState<number>(10)
  const [reveal, setReveal] = useState<'during' | 'end'>('during')
  const [openTopicGroups, setOpenTopicGroups] = useState<Set<string>>(new Set())

  // Pre-select first in-progress exam when progress loads
  useEffect(() => {
    if (initialTopic) return
    if (inProgressExams.length > 0) {
      setTopic(inProgressExams[0].value)
      setShowOther(false)
    }
  }, [examProgress.P, examProgress.FM])  // eslint-disable-line react-hooks/exhaustive-deps

  // Reset subtopic selection and accordion state when exam topic or mode changes
  useEffect(() => {
    setSelectedSubtopics([])
    setIsAdaptive(false)
    setOpenTopicGroups(new Set())
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
  )

  // Subtopics sorted by their position in the exam syllabus
  const orderedSubtopics = useMemo(() => {
    const sts = subtopicsByTopic[topic] ?? []
    if (!syllabusForTopic) return sts

    const conceptToIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((t, idx) => {
      conceptToIdx.set(t.name.toLowerCase(), idx)
      t.concepts.forEach(c => conceptToIdx.set(c.name.toLowerCase(), idx))
    })

    const getIdx = (st: string): number => {
      const exact = conceptToIdx.get(st.toLowerCase())
      if (exact !== undefined) return exact
      const stLower = st.toLowerCase()
      for (const [key, idx] of conceptToIdx) {
        if (stLower.includes(key) || key.includes(stLower)) return idx
      }
      return Number.MAX_SAFE_INTEGER
    }

    return [...sts].sort((a, b) => {
      const diff = getIdx(a) - getIdx(b)
      return diff !== 0 ? diff : a.localeCompare(b)
    })
  }, [subtopicsByTopic, topic, syllabusForTopic])

  // Group orderedSubtopics under their parent learning objectives from the syllabus
  const groupedSubtopics = useMemo(() => {
    if (!syllabusForTopic) {
      return [{ name: 'All Topics', weight: undefined as string | undefined, subtopics: orderedSubtopics }]
    }
    const subtopicToIdx = new Map<string, number>()
    syllabusForTopic.topics.forEach((wt, idx) => {
      for (const st of orderedSubtopics) {
        if (subtopicToIdx.has(st)) continue
        const stL = st.toLowerCase()
        if (stL === wt.name.toLowerCase()) { subtopicToIdx.set(st, idx); continue }
        for (const c of wt.concepts) {
          const cL = c.name.toLowerCase()
          if (stL === cL || stL.includes(cL) || cL.includes(stL)) {
            subtopicToIdx.set(st, idx); break
          }
        }
      }
    })
    const groups = syllabusForTopic.topics.map(t => ({
      name: t.name, weight: t.weight as string | undefined, subtopics: [] as string[]
    }))
    const ungrouped: string[] = []
    for (const st of orderedSubtopics) {
      const idx = subtopicToIdx.get(st)
      if (idx !== undefined) groups[idx].subtopics.push(st)
      else ungrouped.push(st)
    }
    const result = groups.filter(g => g.subtopics.length > 0)
    if (ungrouped.length > 0) result.push({ name: 'Other', weight: undefined, subtopics: ungrouped })
    return result
  }, [syllabusForTopic, orderedSubtopics])

  // Subtopics that have questions covering today's planned concepts
  const todaySubtopics = useMemo(() => {
    if (!plan?.todaysConcepts?.length) return new Set<string>()
    const todaySet = new Set(plan.todaysConcepts.map(c => c.toLowerCase()))
    const result = new Set<string>()
    for (const q of allQuestions) {
      if (q.exam !== topic) continue
      for (const link of q.wiki_link) {
        const ref = hrefToEntryRef(link)
        const name = ref?.name ?? (link.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? '')
        if (todaySet.has(name.toLowerCase())) {
          result.add(q.topic)
          break
        }
      }
    }
    return result
  }, [plan, allQuestions, topic])

  // Auto-select: prefer today's study plan topics; fall back to mastery-based selection
  useEffect(() => {
    if (!user || masteryLoading || subtopicsLoading || planLoading || mode !== 'quiz' || !topic) return

    if (todaySubtopics.size > 0) {
      setSelectedSubtopics([...todaySubtopics])
      setIsAdaptive(true)
    } else {
      const sts = subtopicsByTopic[topic] ?? []
      const adaptive = computeAdaptiveSubtopics(sts, allQuestions, topic, masteryRecords)
      if (adaptive.length > 0) {
        setSelectedSubtopics(adaptive)
        setIsAdaptive(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, mode, user?.id, masteryLoading, subtopicsLoading, planLoading, todaySubtopics.size])

  // Auto-expand sections that contain selected subtopics
  useEffect(() => {
    if (selectedSubtopics.length === 0) return
    const toOpen = new Set<string>()
    for (const group of groupedSubtopics) {
      if (group.subtopics.some(s => selectedSubtopics.includes(s))) toOpen.add(group.name)
    }
    setOpenTopicGroups(toOpen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubtopics.join(','), groupedSubtopics])

  // Compute available question count for the current filters
  const availableCount = useMemo(() => {
    if (!topic) return 0
    return filterQuestions(allQuestions, {
      exam: topic,
      ...(selectedSubtopics.length > 0 && { topics: selectedSubtopics }),
    }).length
  }, [allQuestions, topic, selectedSubtopics])

  // Clamp count when available pool shrinks
  useEffect(() => {
    if (availableCount > 0 && count > availableCount) {
      setCount(availableCount)
    }
  }, [availableCount, count])

  function toggleSubtopic(subtopic: string) {
    setIsAdaptive(false)
    setSelectedSubtopics(prev =>
      prev.includes(subtopic) ? prev.filter(s => s !== subtopic) : [...prev, subtopic]
    )
  }

  function toggleTopicGroup(groupName: string) {
    setOpenTopicGroups(prev => {
      const next = new Set(prev)
      next.has(groupName) ? next.delete(groupName) : next.add(groupName)
      return next
    })
  }

  function selectAllInGroup(group: { subtopics: string[] }, e: React.MouseEvent) {
    e.stopPropagation()
    setIsAdaptive(false)
    const allSelected = group.subtopics.every(s => selectedSubtopics.includes(s))
    setSelectedSubtopics(prev =>
      allSelected
        ? prev.filter(s => !group.subtopics.includes(s))
        : [...new Set([...prev, ...group.subtopics])]
    )
  }

  function handleStart() {
    const params = new URLSearchParams({ exam: topic, mode })

    if (mode === 'quiz') {
      if (selectedSubtopics.length > 0) params.set('topics', selectedSubtopics.join(','))
      params.set('count', String(count))
      params.set('reveal', reveal)
    } else {
      params.set('count', String(MOCK_EXAM_QUESTIONS[topic] ?? 30))
    }

    navigate(`/quiz?${params.toString()}`)
  }

  const mockExamCount = MOCK_EXAM_QUESTIONS[topic] ?? 30
  const examLabel = topic === 'Probability' ? 'Exam P' : 'Exam FM'
  const examColor = getExamColor(topic)
  const hasTopic = topic !== ''

  const topicsLabel = selectedSubtopics.length === 0
    ? '(all included)'
    : isAdaptive && todaySubtopics.size > 0
      ? `(${todaySubtopics.size} from today's plan)`
      : isAdaptive
        ? `(${selectedSubtopics.length} auto-selected)`
        : `${selectedSubtopics.length} selected`

  return (
    <>
    <QuizFloatingSearch />
    <div className="container max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Actuarial Quiz</h1>
        <p className="text-muted-foreground text-lg">
          Practice questions for SOA Exam P and Exam FM
        </p>
        {!user && (
          <p className="text-sm text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline">Sign in</a> to save your progress and track performance
          </p>
        )}
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {!hasTopic && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Exam</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(hasInProgress ? inProgressExams : EXAMS).map(exam => (
                  <button
                    key={exam.value}
                    type="button"
                    onClick={() => setTopic(exam.value)}
                    className="px-4 py-3 rounded-lg border border-input text-left text-sm transition-colors hover:bg-accent"
                  >
                    {exam.label}
                  </button>
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
                        <button
                          key={exam.value}
                          type="button"
                          onClick={() => setTopic(exam.value)}
                          className="px-4 py-3 rounded-lg border border-input text-left text-sm transition-colors hover:bg-accent"
                        >
                          {exam.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {hasTopic && (
            <>
              <button
                type="button"
                onClick={() => setTopic('')}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span className="font-medium" style={examColor ? { color: examColor } : undefined}>{examLabel}</span>
                <span>· change</span>
              </button>

              {/* Mode selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('quiz')}
                    className={`px-3 py-3 rounded-lg border text-left text-sm transition-colors ${
                      mode === 'quiz'
                        ? 'border-primary bg-primary/5 text-primary font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    <div className="font-medium">Quiz</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Choose topics, count &amp; reveal</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('mock-exam')}
                    className={`px-3 py-3 rounded-lg border text-left text-sm transition-colors ${
                      mode === 'mock-exam'
                        ? 'border-primary bg-primary/5 text-primary font-medium'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    <div className="font-medium">Mock Exam</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Mirrors real exam, answers at end</div>
                  </button>
                </div>
              </div>

              {/* ── Quiz mode options ──────────────────────────────────── */}
              {mode === 'quiz' && (
                <>
                  {/* Topics */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Topics
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {topicsLabel}
                      </span>
                    </label>
                    {subtopicsLoading && orderedSubtopics.length === 0 ? (
                      <p className="text-xs text-muted-foreground">Loading topics…</p>
                    ) : (
                      <div className="rounded-lg border divide-y">
                        {groupedSubtopics.map(group => {
                          const allSelected = group.subtopics.every(s => selectedSubtopics.includes(s))
                          const someSelected = group.subtopics.some(s => selectedSubtopics.includes(s))
                          const isOpen = openTopicGroups.has(group.name)
                          const hasToday = group.subtopics.some(s => todaySubtopics.has(s))
                          return (
                            <div key={group.name}>
                              <button
                                type="button"
                                onClick={() => toggleTopicGroup(group.name)}
                                className="flex items-center gap-2 w-full py-2.5 px-3 text-left hover:bg-muted/40 transition-colors"
                                aria-expanded={isOpen}
                              >
                                <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                                <span className="text-sm font-semibold flex-1 min-w-0 truncate">
                                  {group.name}
                                  {group.weight && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{group.weight}</span>}
                                </span>
                                {hasToday && <span className="text-[10px] text-primary/70 shrink-0">today</span>}
                                <button
                                  type="button"
                                  onClick={e => selectAllInGroup(group, e)}
                                  className={`shrink-0 ml-1 px-2 py-0.5 rounded border text-[11px] transition-colors ${
                                    allSelected
                                      ? 'bg-primary text-primary-foreground border-primary'
                                      : someSelected
                                        ? 'bg-primary/10 text-primary border-primary/30'
                                        : 'border-input text-muted-foreground hover:bg-accent'
                                  }`}
                                >
                                  {allSelected ? 'All ✓' : someSelected ? 'Some' : 'Select all'}
                                </button>
                              </button>
                              {isOpen && (
                                <div className="pb-2 px-3 pl-9 space-y-0.5 bg-muted/20">
                                  {group.subtopics.map(subtopic => {
                                    const isSelected = selectedSubtopics.includes(subtopic)
                                    const isToday = todaySubtopics.has(subtopic)
                                    return (
                                      <button
                                        key={subtopic}
                                        type="button"
                                        onClick={() => toggleSubtopic(subtopic)}
                                        className="flex items-center gap-2 w-full py-1 text-left text-xs rounded hover:bg-muted/40 transition-colors"
                                      >
                                        <div className={`h-3.5 w-3.5 shrink-0 rounded border flex items-center justify-center ${
                                          isSelected ? 'bg-primary border-primary' : 'border-input bg-background'
                                        }`}>
                                          {isSelected && <Check className="h-2 w-2 text-primary-foreground" />}
                                        </div>
                                        <span className={`flex-1 truncate ${isSelected ? 'font-medium text-primary' : isToday ? 'text-primary/80' : ''}`}>
                                          {subtopic}
                                        </span>
                                        {isToday && <span className="text-[10px] text-primary/60 shrink-0">today</span>}
                                      </button>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Number of questions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Number of Questions</label>
                      <span className="text-sm font-medium tabular-nums">
                        {availableCount > 0
                          ? count >= availableCount
                            ? `All (${availableCount})`
                            : count
                          : '—'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={availableCount > 0 ? availableCount : 1}
                      value={availableCount > 0 ? Math.min(count, availableCount) : 1}
                      onChange={e => setCount(Number(e.target.value))}
                      disabled={availableCount === 0}
                      className="w-full accent-foreground"
                    />
                    {/* Quick-select presets */}
                    <div className="flex gap-2">
                      {QUICK_COUNTS.map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setCount(Math.min(n, availableCount > 0 ? availableCount : n))}
                          disabled={availableCount === 0}
                          className={`px-3 py-1 rounded-md border text-xs font-medium transition-colors ${
                            count === n && availableCount >= n
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-input hover:bg-accent text-muted-foreground'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reveal answers */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reveal Answers</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setReveal('during')}
                        className={`px-3 py-2.5 rounded-lg border text-left text-sm transition-colors ${
                          reveal === 'during'
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-input hover:bg-accent'
                        }`}
                      >
                        <div className="font-medium text-sm">After each question</div>
                        <div className="text-xs text-muted-foreground mt-0.5">See explanation immediately</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setReveal('end')}
                        className={`px-3 py-2.5 rounded-lg border text-left text-sm transition-colors ${
                          reveal === 'end'
                            ? 'border-primary bg-primary/5 text-primary font-medium'
                            : 'border-input hover:bg-accent'
                        }`}
                      >
                        <div className="font-medium text-sm">At the end</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Review all after finishing</div>
                      </button>
                    </div>
                  </div>
                </>
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

              <Button onClick={handleStart} className="w-full" size="lg">
                Start {mode === 'mock-exam' ? 'Mock Exam' : 'Quiz'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {user && (
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </Button>
        </div>
      )}
    </div>
    </>
  )
}
