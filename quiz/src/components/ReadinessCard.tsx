import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowUp, BookOpen, CalendarCheck, Check, CheckCircle2, ChevronDown, Circle, Gem, Info, Play, Lock, Settings2, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { ConceptScheduleBadge } from '@/components/TopicProgressSection'
import { ExamHeatmap } from '@/components/ExamHeatmap'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { aggregateForTopic, decayIfStale, sanitizeMasteryState } from '@/lib/mastery'
import { computeReadiness, type SectionReadiness } from '@/lib/readiness'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { todayISO, type StudyPlan, type StudyPlanConfig } from '@/lib/studyPlan'
import { readTodayLevelUps, LEVELUP_EVENT, type DailyLevelUp } from '@/lib/dailyProgressStore'
import type { QuizSession, QuestionResponse } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import type { Question } from '@/lib/parser'
import { useAuth } from '@/hooks/useAuth'
import { SessionRow, type SessionDetail } from '@/components/SessionRow'

// ── Radial donut chart ─────────────────────────────────────────────────────────

const CX = 80
const CY = 80
const R_OUTER = 66
const R_INNER = 44
const GAP_DEG = 2

function degreesToRadians(deg: number) { return (deg * Math.PI) / 180 }

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const a = degreesToRadians(angleDeg - 90)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(startDeg: number, endDeg: number, rOuter: number, rInner: number): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  const o1 = polarToCart(CX, CY, rOuter, startDeg)
  const o2 = polarToCart(CX, CY, rOuter, endDeg)
  const i1 = polarToCart(CX, CY, rInner, endDeg)
  const i2 = polarToCart(CX, CY, rInner, startDeg)
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

interface DonutProps {
  sections: SectionReadiness[]
  overallPct: number
  activeSection: number | null
  onSectionHover: (i: number | null) => void
  onSectionClick: (i: number) => void
}

function ReadinessDonut({ sections, overallPct, activeSection, onSectionHover, onSectionClick }: DonutProps) {
  const totalWeight = sections.reduce((s, sec) => s + sec.weight, 0) || 1
  const arcs = useMemo(() => {
    let cursor = 0
    return sections.map((sec) => {
      const span = (sec.weight / totalWeight) * 360
      const startDeg = cursor + GAP_DEG / 2
      const endDeg = cursor + span - GAP_DEG / 2
      cursor += span
      const opacity = 0.12 + 0.88 * (sec.readinessPct / 100)
      return { sec, startDeg, endDeg, opacity }
    })
  }, [sections, totalWeight])

  const activeSec = activeSection !== null ? arcs[activeSection]?.sec : null

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={CX * 2}
        height={CY * 2}
        viewBox={`0 0 ${CX * 2} ${CY * 2}`}
        role="img"
        aria-label="Section readiness donut chart"
      >
        <circle
          cx={CX} cy={CY}
          r={(R_OUTER + R_INNER) / 2}
          fill="none"
          strokeWidth={R_OUTER - R_INNER}
          stroke="rgba(34,197,94,0.06)"
        />
        {arcs.map(({ sec, startDeg, endDeg, opacity }, i) => (
          <path
            key={sec.name}
            d={arcPath(startDeg, endDeg, R_OUTER, R_INNER)}
            fill={`rgba(34,197,94,${opacity.toFixed(2)})`}
            onMouseEnter={() => onSectionHover(i)}
            onMouseLeave={() => onSectionHover(null)}
            onClick={() => onSectionClick(i)}
            className="cursor-pointer transition-opacity"
            style={{ opacity: activeSection !== null && activeSection !== i ? 0.5 : 1 }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        {activeSec ? (
          <>
            <span className="text-lg font-bold leading-none">{Math.round(activeSec.readinessPct)}%</span>
            <span className="text-[9px] text-muted-foreground mt-0.5 max-w-[60px] leading-tight">{activeSec.name}</span>
          </>
        ) : (
          <>
            <span className="text-lg font-bold leading-none">{Math.round(overallPct)}%</span>
            <span className="text-[9px] text-muted-foreground mt-0.5 leading-tight">overall</span>
          </>
        )}
      </div>
    </div>
  )
}

// ── Study-plan sub-components ──────────────────────────────────────────────────

function BehindWarning({ plan }: { plan: StudyPlan }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-3 py-2.5 text-xs text-amber-800 dark:text-amber-300 space-y-1">
      <div className="flex items-center gap-1.5 font-medium">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        {plan.status === 'target_passed'
          ? 'Your target ready date has passed — pacing to exam date instead.'
          : `Behind pace — ${plan.conceptsPerDay} concept${plan.conceptsPerDay === 1 ? '' : 's'} per day needed to catch up.`}
      </div>
      {plan.status === 'behind' && (
        <p>Consider an extended quiz session today to cover more ground.</p>
      )}
    </div>
  )
}

function ReviewModeNote({ concepts }: { concepts: string[] }) {
  return (
    <div className="rounded-lg border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30 px-3 py-2.5 text-xs text-purple-800 dark:text-purple-300 space-y-1">
      <div className="flex items-center gap-1.5 font-medium">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
        All concepts mastered — great work!
      </div>
      <p>Today's plan uses spaced repetition to keep your weakest concepts fresh.</p>
      {concepts.length > 0 && (
        <p>Reviewing: {concepts.slice(0, 3).join(', ')}{concepts.length > 3 ? ` +${concepts.length - 3} more` : ''}</p>
      )}
    </div>
  )
}

const STATE_BADGE: Record<MasteryState, string> = {
  new:      'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700',
  level1:   'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/20 dark:text-green-500 dark:border-green-900',
  level2:   'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800',
  level3:   'bg-green-200 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-700',
  forgotten: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
}

function StudyPlanTracker({
  syllabus,
  masteryRecords,
  studyPlan,
  allConceptsForNav,
  onConceptSelect,
  openTopics,
  onToggle,
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  studyPlan?: StudyPlan | null
  allConceptsForNav: { name: string; state: MasteryState }[]
  onConceptSelect: (concept: { name: string; state: MasteryState; index: number }) => void
  openTopics: Set<string>
  onToggle: (name: string) => void
}) {
  const examKey = wikiExamIdToProgressKey(syllabus.examId)
  const examMastery = masteryRecords.filter(r => r.exam_id === examKey)
  const now = new Date()

  const targetToDisplayName = new Map<string, string>()
  for (const topic of syllabus.topics) {
    for (const c of topic.concepts) {
      const tLow = c.target?.toLowerCase() ?? ''
      if (tLow && tLow !== c.name.toLowerCase()) targetToDisplayName.set(tLow, c.name)
    }
  }
  const normalizedMastery = examMastery.map(r => {
    const display = targetToDisplayName.get(r.concept_slug.toLowerCase())
    return display ? { ...r, concept_slug: display } : r
  })
  const recordsBySlug = new Map(normalizedMastery.map(r => [r.concept_slug.toLowerCase(), r]))

  return (
    <div className="space-y-1">
      {syllabus.topics.map(topic => {
        const conceptSlugs = topic.concepts.map(c => c.name)
        const agg = aggregateForTopic(normalizedMastery, conceptSlugs, now)
        const isOpen = openTopics.has(topic.name)
        return (
          <div key={topic.name}>
            <button
              data-topic={topic.name}
              className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors"
              onClick={() => onToggle(topic.name)}
              aria-expanded={isOpen}
            >
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
              <span className="text-sm font-semibold min-w-0 truncate">
                {topic.name}
                {topic.weight && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{topic.weight}</span>}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0" role="progressbar" aria-valuenow={agg.strongPct} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${agg.strongPct}%` }} />
              </div>
              <span className="text-xs font-medium shrink-0 text-right w-12 tabular-nums text-muted-foreground">{agg.level3}/{agg.total}</span>
            </button>
            {isOpen && topic.concepts.length > 0 && (
              <div className="space-y-1 pl-5 border-l-2 border-border ml-2 mb-2 mt-1">
                {topic.concepts.map(c => {
                  const rec = recordsBySlug.get(c.name.toLowerCase())
                  const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
                  const idx = allConceptsForNav.findIndex(ac => ac.name.toLowerCase() === c.name.toLowerCase())
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => onConceptSelect({ name: c.name, state, index: idx === -1 ? 0 : idx })}
                      className="flex items-center gap-2 w-full py-1 px-1 -mx-1 rounded hover:bg-muted/40 transition-colors text-left"
                    >
                      <span className="text-xs text-foreground min-w-0 flex-1 truncate">{c.name}</span>
                      {studyPlan && state !== 'level3' && (
                        <ConceptScheduleBadge conceptName={c.name} plan={studyPlan} />
                      )}
                      <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-medium ${STATE_BADGE[state]}`}>
                        {STATE_LABEL[state]}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── ReadinessCard ──────────────────────────────────────────────────────────────

const STATE_ORDER: Record<MasteryState, number> = {
  new: 0, forgotten: 0, level1: 1, level2: 2, level3: 3,
}

const STATE_LABEL: Record<MasteryState, string> = {
  new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
}

const NEXT_STATE: Partial<Record<MasteryState, MasteryState>> = {
  new: 'level1', forgotten: 'level1',
  level1: 'level2', level2: 'level3',
}

interface Props {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  sessions: QuizSession[]
  plan: StudyPlan | null
  masteryStateByName: Map<string, MasteryState>
  config: StudyPlanConfig
  loading: boolean
  examDate: string | null
  onConfigChange: (next: Partial<StudyPlanConfig>) => void
  onRegenerate: () => void
  onReplaceConcepts?: (concepts: string[]) => void
  onExamDateChange?: (date: string | null) => void
  openConceptsTrigger?: number
  startQuizTrigger?: number
  /** Whether the user has access to the custom Study Plan. Defaults to true. */
  isPremium?: boolean
}

export function ReadinessCard({
  syllabus, masteryRecords, sessions, plan, masteryStateByName,
  config, loading, examDate, onConfigChange, onRegenerate, onReplaceConcepts, onExamDateChange,
  openConceptsTrigger, startQuizTrigger,
  isPremium = true,
}: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const openDashboard = useConceptPopup(s => s.openDashboard)
  const popupOpen = useConceptPopup(s => s.open)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const toRefs = (arr: { name: string }[]): WikiEntryRef[] =>
    arr.map(c => ({ kind: 'concept' as const, name: c.name }))
  const prevPopupConceptRef = useRef<string | null>(null)
  const [flashingConcept, setFlashingConcept] = useState<string | null>(null)
  const [topicsMasteredOpen, setTopicsMasteredOpen] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [pinnedSection, setPinnedSection] = useState<number | null>(null)
  const [completedToday, setCompletedToday] = useState<DailyLevelUp[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [configInitialStep, setConfigInitialStep] = useState<1 | 2 | 3>(1)
  const [showInfo, setShowInfo] = useState(false)
  const [showBonusInfo, setShowBonusInfo] = useState(false)
  const [bonusClaimed, setBonusClaimed] = useState<boolean>(() => {
    try {
      const key = `actuarial_daily_bonus_${wikiExamIdToProgressKey(syllabus.examId)}_${todayISO()}`
      const raw = localStorage.getItem(key)
      return raw ? !!(JSON.parse(raw) as { amount?: number }).amount : false
    } catch { return false }
  })
  const [claimedBonusAmount, setClaimedBonusAmount] = useState<number>(() => {
    try {
      const key = `actuarial_daily_bonus_${wikiExamIdToProgressKey(syllabus.examId)}_${todayISO()}`
      const raw = localStorage.getItem(key)
      return raw ? ((JSON.parse(raw) as { amount?: number }).amount ?? 0) : 0
    } catch { return 0 }
  })
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())
  const [featurePanelIndex, setFeaturePanelIndex] = useState(0)
  const [swipeTouchStart, setSwipeTouchStart] = useState(0)

  // Quiz history state
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set())
  const [sessionDetails, setSessionDetails] = useState<Map<string, SessionDetail>>(new Map())
  const [selectedDayLevelUps, setSelectedDayLevelUps] = useState<DailyLevelUp[]>([])

  const toggleTopic = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  async function handleSessionToggle(sessionId: string) {
    if (!user) return
    const isExpanding = !expandedSessions.has(sessionId)
    setExpandedSessions(prev => {
      const next = new Set(prev)
      isExpanding ? next.add(sessionId) : next.delete(sessionId)
      return next
    })
    if (!isExpanding || sessionDetails.has(sessionId)) return
    setSessionDetails(prev => new Map(prev).set(sessionId, { loading: true, error: null, items: [] }))
    try {
      const [responsesResult, rawFiles] = await Promise.all([
        supabase
          .from('question_responses')
          .select('*')
          .eq('session_id', sessionId)
          .eq('user_id', user.id)
          .order('answered_at', { ascending: true }),
        fetchAllQuestions(),
      ])
      if (responsesResult.error) throw new Error(responsesResult.error.message)
      const questionMap = new Map(parseAllQuestions(rawFiles).map((q: Question) => [q.id, q]))
      const items = (responsesResult.data ?? []).map((r: QuestionResponse) => ({
        response: r,
        question: questionMap.get(r.question_id) ?? null,
      }))
      setSessionDetails(prev => new Map(prev).set(sessionId, { loading: false, error: null, items }))
    } catch (err) {
      setSessionDetails(prev => new Map(prev).set(sessionId, {
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load session details',
        items: [],
      }))
    }
  }

  useEffect(() => {
    if (openConceptsTrigger && allConcepts.length > 0) {
      const hasStudyPlan = studyPlanConceptsForModal.length > 0
      openDashboard(
        toRefs(allConcepts),
        hasStudyPlan ? toRefs(studyPlanConceptsForModal) : null,
        hasStudyPlan ? 'study-plan' : 'entire-syllabus',
        0,
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openConceptsTrigger])

  useEffect(() => {
    setCompletedToday(readTodayLevelUps())
    function handleLevelUp(e: Event) {
      setCompletedToday((e as CustomEvent<DailyLevelUp[]>).detail)
    }
    function handleStorage() {
      setCompletedToday(readTodayLevelUps())
    }
    window.addEventListener(LEVELUP_EVENT, handleLevelUp)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(LEVELUP_EVENT, handleLevelUp)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const activeSection = hoveredSection ?? pinnedSection

  const now = useMemo(() => new Date(), [])
  const progressKey = wikiExamIdToProgressKey(syllabus.examId)

  useEffect(() => {
    const today = todayISO()
    if (!selectedDay || selectedDay === today) { setSelectedDayLevelUps([]); return }
    if (!user) { setSelectedDayLevelUps([]); return }
    let cancelled = false
    supabase
      .from('daily_completions')
      .select('*')
      .eq('user_id', user.id)
      .eq('day', selectedDay)
      .eq('exam_id', progressKey)
      .then(({ data }: { data: Array<{ concept_slug: string; from_state: string; to_state: string; at: string }> | null }) => {
        if (cancelled) return
        setSelectedDayLevelUps((data ?? []).map(r => ({
          conceptSlug: r.concept_slug,
          from: sanitizeMasteryState(r.from_state),
          to: sanitizeMasteryState(r.to_state),
          at: r.at,
        })))
      })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, user, progressKey])

  // Keep the today panel in sync with live level-up events.
  useEffect(() => {
    if (selectedDay === todayISO()) setSelectedDayLevelUps(completedToday)
  }, [selectedDay, completedToday])

  const examSessions = useMemo(
    () => sessions.filter(s => s.exam === syllabus.examTopic),
    [sessions, syllabus.examTopic],
  )

  const examRecords = useMemo(
    () => masteryRecords.filter(r => r.exam_id === progressKey),
    [masteryRecords, progressKey],
  )

  const { overallPct, sections } = useMemo(
    () => computeReadiness(syllabus, examRecords, now),
    [syllabus, examRecords, now],
  )

  const aggregate = useMemo(() => {
    const allSlugs = syllabus.topics.flatMap(t => t.concepts.map(c => c.name))
    return aggregateForTopic(examRecords, allSlugs, now)
  }, [syllabus, examRecords, now])

  const level2Pct = aggregate.total > 0 ? Math.round((aggregate.level2 / aggregate.total) * 100) : 0
  const level1Pct = aggregate.total > 0 ? Math.round((aggregate.level1 / aggregate.total) * 100) : 0

  const allConcepts = useMemo(
    () => syllabus.topics.flatMap(t => t.concepts.map(c => ({
      name: c.name,
      state: (examRecords.find(r =>
        r.concept_slug.toLowerCase() === c.name.toLowerCase() ||
        r.concept_slug.toLowerCase() === c.target.toLowerCase()
      )?.state ?? 'new') as MasteryState,
    }))),
    [syllabus, examRecords],
  )

  // Set of concept names belonging to this exam — used to scope today's level-ups
  // so that completing an Exam P concept never shows up in an Exam FM plan.
  const syllabusConceptNames = useMemo(() =>
    new Set(syllabus.topics.flatMap(t => t.concepts.map(c => c.name.toLowerCase()))),
    [syllabus]
  )

  // Today's level-ups scoped to this exam's syllabus only
  const examCompletedToday = useMemo(() =>
    completedToday.filter(lu => syllabusConceptNames.has(lu.conceptSlug.toLowerCase())),
    [completedToday, syllabusConceptNames]
  )

  const displayConcepts = plan?.status === 'review_mode'
    ? (plan?.reviewConcepts ?? [])
    : (plan?.todaysConcepts ?? [])

  const targetByName = useMemo(() => {
    const map = new Map<string, MasteryState>()
    if (!plan) return map
    const today = todayISO()
    for (const a of plan.assignments) {
      if (a.scheduledDate === today) {
        const currentState = masteryStateByName.get(a.conceptName.toLowerCase()) ?? a.initialState
        const target: MasteryState = currentState === 'level3' ? 'level3' : (NEXT_STATE[currentState] ?? 'level1')
        const existing = map.get(a.conceptName.toLowerCase())
        if (!existing || STATE_ORDER[target] > STATE_ORDER[existing]) {
          map.set(a.conceptName.toLowerCase(), target)
        }
      }
    }
    return map
  }, [plan, masteryStateByName])

  const studyPlanConceptsForModal = useMemo(() =>
    displayConcepts.map(name => ({
      name,
      state: masteryStateByName.get(name.toLowerCase()) ?? 'new' as MasteryState,
    })),
    [displayConcepts, masteryStateByName]
  )

  const todayStr = todayISO()

  const todayQuestionsAnswered = useMemo(() =>
    examSessions
      .filter(s => s.completed_at.slice(0, 10) === todayStr)
      .reduce((sum, s) => sum + s.total_questions, 0),
    [examSessions, todayStr]
  )

  const todayGemsEarned = useMemo(() =>
    examSessions
      .filter(s => s.completed_at.slice(0, 10) === todayStr)
      .reduce((sum, s) => sum + s.correct_count, 0),
    [examSessions, todayStr]
  )

  const todayLevelUps = examCompletedToday.length

  const allConceptsDone = useMemo(() =>
    displayConcepts.length > 0 && displayConcepts.every(name => {
      const target = targetByName.get(name.toLowerCase()) ?? 'level1'
      const currentState = masteryStateByName.get(name.toLowerCase()) ?? 'new'
      return (
        examCompletedToday.some(lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()) ||
        STATE_ORDER[currentState] >= STATE_ORDER[target]
      )
    }),
    [displayConcepts, examCompletedToday, targetByName, masteryStateByName]
  )

  // Concepts levelled up today for this exam that weren't in the original plan
  const bonusConcepts = useMemo(() =>
    examCompletedToday.filter(lu =>
      !displayConcepts.some(n => n.toLowerCase() === lu.conceptSlug.toLowerCase())
    ),
    [examCompletedToday, displayConcepts]
  )

  // Originally planned concepts that are not yet completed (for this exam)
  const incompleteOriginalConcepts = useMemo(() =>
    displayConcepts.filter(name => {
      const target = targetByName.get(name.toLowerCase()) ?? 'level1'
      const current = masteryStateByName.get(name.toLowerCase()) ?? 'new'
      return (
        !examCompletedToday.some(lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()) &&
        STATE_ORDER[current] < STATE_ORDER[target]
      )
    }),
    [displayConcepts, examCompletedToday, targetByName, masteryStateByName]
  )

  const showReplaceButton = bonusConcepts.length > 0 && incompleteOriginalConcepts.length > 0

  function handleReplace() {
    // One-for-one swap: each bonus concept replaces exactly one incomplete planned concept.
    // Completed originals stay. Incomplete originals beyond the bonus count also stay.
    const completedOriginal = displayConcepts.filter(name =>
      !incompleteOriginalConcepts.some(n => n.toLowerCase() === name.toLowerCase())
    )
    const bonusSlugs = bonusConcepts.map(lu => lu.conceptSlug)
    // Incomplete concepts not covered by a bonus slot remain in the plan
    const remainingIncomplete = incompleteOriginalConcepts.slice(bonusSlugs.length)
    const merged = [...completedOriginal, ...bonusSlugs, ...remainingIncomplete]
    // Deduplicate while preserving order
    const seen = new Set<string>()
    const newConcepts = merged.filter(n => {
      const k = n.toLowerCase()
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    onReplaceConcepts?.(newConcepts)
  }

  // Auto-claim the 2× daily bonus when all plan concepts are done
  useEffect(() => {
    if (!allConceptsDone || bonusClaimed || todayGemsEarned === 0 || !user) return
    const amount = todayGemsEarned
    supabase.rpc('award_gems', { p_amount: amount })
      .then(({ error }: { error: { message: string } | null }) => {
        if (!error) {
          setBonusClaimed(true)
          setClaimedBonusAmount(amount)
          localStorage.setItem(
            `actuarial_daily_bonus_${progressKey}_${todayISO()}`,
            JSON.stringify({ amount })
          )
          window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount } }))
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allConceptsDone, bonusClaimed, todayGemsEarned, user, progressKey])

  function handleSectionHover(i: number | null) {
    setHoveredSection(i)
  }

  function handleSectionClick(i: number) {
    setPinnedSection(prev => (prev === i ? null : i))
    const topicName = sections[i]?.name
    if (topicName) {
      setOpenTopics(prev =>
        prev.has(topicName) ? new Set() : new Set([topicName])
      )
    }
  }

  const handleStartQuiz = useCallback(() => {
    navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}&mode=quiz`)
  }, [navigate, syllabus.examTopic])

  useEffect(() => {
    if (startQuizTrigger) handleStartQuiz()
  }, [startQuizTrigger, handleStartQuiz])

  useEffect(() => {
    if (!popupOpen) prevPopupConceptRef.current = null
  }, [popupOpen])

  useEffect(() => {
    if (!popupCurrentName || popupCurrentName === prevPopupConceptRef.current) return
    prevPopupConceptRef.current = popupCurrentName
    const el = document.querySelector<HTMLElement>(`[data-study-concept="${CSS.escape(popupCurrentName.toLowerCase())}"]`)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const popupHeight = popupOpen
      ? (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--concept-split-height')) || window.innerHeight * 0.5)
      : 0
    const visibleHeight = window.innerHeight - popupHeight
    window.scrollBy({ top: rect.top - visibleHeight / 2 + rect.height / 2, behavior: 'smooth' })
    setFlashingConcept(popupCurrentName)
    const id = setTimeout(() => setFlashingConcept(null), 1400)
    return () => clearTimeout(id)
  }, [popupCurrentName])

  return (
    <div className="space-y-4">
      {/* Primary exam card — first */}
      <Card className="border-primary/40 ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="How custom study plans work"
                title="How custom study plans work"
              >
                <Info className="h-4 w-4" />
              </button>
              {isPremium ? (
                <button
                  type="button"
                  onClick={() => setShowConfig(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Study plan settings"
                  title="Study plan settings"
                >
                  <Settings2 className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to="/upgrade"
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Upgrade to access study plan settings"
                  title="Upgrade to Premium to customize your study plan"
                >
                  <Lock className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Heatmap */}
          <ExamHeatmap
            sessions={examSessions}
            examProgressKey={progressKey}
            targetDate={examDate}
            onTargetDateChange={onExamDateChange ?? (() => {})}
            targetReadyDate={config.targetReadyDate}
            onTargetReadyDateChange={date => onConfigChange({ targetReadyDate: date })}
            onOpenStudyPlan={(step) => { setConfigInitialStep(step ?? 1); setShowConfig(true) }}
            onDayClick={date => { setSelectedDay(date); setExpandedSessions(new Set()); setSessionDetails(new Map()) }}
          />

          {/* Quiz history panel — shown when a heatmap day is clicked */}
          {selectedDay && (() => {
            const daySessions = examSessions.filter(s => s.completed_at.slice(0, 10) === selectedDay)
            const dayTotal = daySessions.reduce((s, r) => s + r.total_questions, 0)
            const dayCorrect = daySessions.reduce((s, r) => s + r.correct_count, 0)
            const dayLevelUps = selectedDayLevelUps.length
            return (
              <div className="border-t pt-3 space-y-1 mt-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
                  <span className="font-medium">Sessions on {selectedDay}</span>
                  <button
                    type="button"
                    onClick={() => { setSelectedDay(null); setExpandedSessions(new Set()); setSessionDetails(new Map()) }}
                    className="hover:text-foreground transition-colors"
                    aria-label="Clear day filter"
                  >
                    ✕
                  </button>
                </div>
                {daySessions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No sessions on this date.</p>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap pb-2">
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                        <Check className="h-3 w-3 text-green-500" />
                        {dayCorrect}/{dayTotal} correct
                      </span>
                      {dayCorrect > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                          <Gem className="h-3 w-3 text-cyan-400" />
                          {dayCorrect} gems
                        </span>
                      )}
                      {dayLevelUps > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                          <ArrowUp className="h-3 w-3 text-primary" />
                          {dayLevelUps} levelled up
                        </span>
                      )}
                    </div>
                    {daySessions.map((session, idx) => (
                      <SessionRow
                        key={session.id}
                        session={session}
                        divider={idx > 0}
                        expanded={expandedSessions.has(session.id)}
                        detail={sessionDetails.get(session.id)}
                        onToggle={() => handleSessionToggle(session.id)}
                      />
                    ))}
                  </>
                )}
              </div>
            )
          })()}

          {/* Warnings */}
          {!loading && plan && (plan.status === 'behind' || plan.status === 'target_passed') && (
            <BehindWarning plan={plan} />
          )}
          {!loading && plan?.status === 'review_mode' && (
            <ReviewModeNote concepts={plan.reviewConcepts ?? []} />
          )}
        </CardContent>
      </Card>

      {/* Action buttons – premium users, directly below heatmap */}
      {isPremium && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const hasStudyPlan = studyPlanConceptsForModal.length > 0
              openDashboard(
                toRefs(allConcepts),
                hasStudyPlan ? toRefs(studyPlanConceptsForModal) : null,
                hasStudyPlan ? 'study-plan' : 'entire-syllabus',
                0,
              )
            }}
            disabled={allConcepts.length === 0}
            className="gap-1.5 text-sm"
          >
            <BookOpen className="h-4 w-4" />
            Read concepts
          </Button>
          <Button
            onClick={handleStartQuiz}
            className="gap-1.5 text-sm"
          >
            <Play className="h-4 w-4" />
            Start Quiz
          </Button>
        </div>
      )}

      {/* Premium-gated content */}
      {isPremium ? (
        <>
          {/* Countdown numbers — premium users */}
          {(examDate || config.targetReadyDate) && (
            <div className="grid grid-cols-2 gap-3">
              {config.targetReadyDate && (() => {
                const now = new Date(); now.setHours(0, 0, 0, 0)
                const days = Math.ceil((new Date(config.targetReadyDate + 'T00:00:00').getTime() - now.getTime()) / 86400000)
                return (
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-5xl font-bold tabular-nums text-amber-400">
                      {Math.max(days, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 font-medium">days to prepare</p>
                  </div>
                )
              })()}
              {examDate && (() => {
                const now = new Date(); now.setHours(0, 0, 0, 0)
                const days = Math.ceil((new Date(examDate + 'T00:00:00').getTime() - now.getTime()) / 86400000)
                return (
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-5xl font-bold tabular-nums">
                      {Math.max(days, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 font-medium">days until exam</p>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Today's Study Plan card */}
          {displayConcepts.length > 0 && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold">Today's Study Plan</h3>
                <div className="space-y-0.5">
                  {displayConcepts.map((name, idx) => {
                    const target = targetByName.get(name.toLowerCase()) ?? 'level1'
                    const currentState = masteryStateByName.get(name.toLowerCase()) ?? 'new'
                    const isCompleted =
                      examCompletedToday.some(lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()) ||
                      STATE_ORDER[currentState] >= STATE_ORDER[target]
                    return (
                      <button
                        key={name}
                        type="button"
                        data-study-concept={name.toLowerCase()}
                        onClick={() => openDashboard(toRefs(allConcepts), toRefs(studyPlanConceptsForModal), 'study-plan', idx)}
                        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 text-left transition-colors${flashingConcept?.toLowerCase() === name.toLowerCase() ? ' concept-row-highlight' : ''}`}
                      >
                        {isCompleted
                          ? <Check className="h-4 w-4 text-green-500 shrink-0" />
                          : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <span className={`text-sm flex-1 min-w-0 truncate ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
                          {name}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">→ {STATE_LABEL[target]}</span>
                      </button>
                    )
                  })}

                  {/* Bonus concepts — levelled up today but not in the original plan */}
                  {bonusConcepts.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
                        <span className="text-xs text-muted-foreground shrink-0">Also completed today</span>
                        <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
                      </div>
                      {bonusConcepts.map(lu => {
                        const globalIdx = allConcepts.findIndex(ac => ac.name.toLowerCase() === lu.conceptSlug.toLowerCase())
                        return (
                          <button
                            key={lu.conceptSlug}
                            type="button"
                            data-study-concept={lu.conceptSlug.toLowerCase()}
                            onClick={() => openDashboard(toRefs(allConcepts), toRefs(studyPlanConceptsForModal), 'entire-syllabus', globalIdx === -1 ? 0 : globalIdx)}
                            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 text-left transition-colors${flashingConcept?.toLowerCase() === lu.conceptSlug.toLowerCase() ? ' concept-row-highlight' : ''}`}
                          >
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="text-sm flex-1 min-w-0 truncate text-muted-foreground line-through">
                              {lu.conceptSlug}
                            </span>
                            <span className="text-xs text-green-600 dark:text-green-400 shrink-0 font-medium">
                              → {STATE_LABEL[lu.to]}
                            </span>
                          </button>
                        )
                      })}
                    </>
                  )}
                </div>

                {/* Replace button — swap incomplete plan items with today's completed concepts */}
                {showReplaceButton && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReplace}
                    className="w-full gap-1.5 text-xs h-8"
                  >
                    Replace
                    <span className="text-muted-foreground font-normal">
                      — use today's completed concepts
                    </span>
                  </Button>
                )}

                {allConceptsDone ? (
                  <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/30 px-3 py-2.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-semibold">Done for Today!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                      <Check className="h-3 w-3 text-green-500" />
                      {todayGemsEarned}/{todayQuestionsAnswered} correct
                    </span>
                    {todayGemsEarned > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                        <Gem className="h-3 w-3 text-cyan-400" />
                        {todayGemsEarned} gems
                      </span>
                    )}
                    {todayLevelUps > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium">
                        <ArrowUp className="h-3 w-3 text-primary" />
                        {todayLevelUps} levelled up
                      </span>
                    )}
                  </div>
                )}

                {/* Daily Bonus — locked until plan is complete */}
                <button
                  type="button"
                  onClick={() => setShowBonusInfo(true)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors text-left ${
                    allConceptsDone
                      ? 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/15'
                      : 'border-dashed border-muted-foreground/30 hover:bg-muted/20'
                  }`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${allConceptsDone ? 'bg-cyan-500/20' : 'bg-muted/50'}`}>
                    {allConceptsDone
                      ? <Gem className="h-4 w-4 text-cyan-400" />
                      : <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    {allConceptsDone && bonusClaimed ? (
                      <>
                        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                          +{claimedBonusAmount} bonus gems earned!
                        </p>
                        <p className="text-xs text-cyan-600/70 dark:text-cyan-400/70">Daily plan bonus claimed</p>
                      </>
                    ) : allConceptsDone ? (
                      <>
                        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                          2× Daily Gems Bonus unlocked!
                        </p>
                        <p className="text-xs text-cyan-600/70 dark:text-cyan-400/70">Awarding +{todayGemsEarned} gems…</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-muted-foreground">2× Daily Gems Bonus</p>
                        <p className="text-xs text-muted-foreground/70">Complete today's plan to unlock</p>
                      </>
                    )}
                  </div>
                  <Info className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                </button>
              </CardContent>
            </Card>
          )}

          {/* Topics mastered + tracker */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <button
                type="button"
                onClick={() => setTopicsMasteredOpen(prev => !prev)}
                className="w-full"
                aria-expanded={topicsMasteredOpen}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Topics mastered</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {aggregate.level3}
                        <span className="text-muted-foreground font-normal">/{aggregate.total}</span>
                        <span className="text-muted-foreground font-normal ml-1.5">({aggregate.strongPct}%)</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${topicsMasteredOpen ? '' : '-rotate-90'}`} />
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-secondary overflow-hidden flex">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${aggregate.strongPct}%`, backgroundColor: 'rgba(34, 197, 94, 1)' }}
                    />
                    <div
                      className="h-full transition-all"
                      style={{ width: `${level2Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.55)' }}
                    />
                    <div
                      className="h-full transition-all"
                      style={{ width: `${level1Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.25)' }}
                    />
                  </div>
                  {(aggregate.level3 > 0 || aggregate.level2 > 0 || aggregate.level1 > 0) && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {aggregate.level3 > 0 && (
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                          Level 3
                        </span>
                      )}
                      {aggregate.level2 > 0 && (
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.55)' }} />
                          Level 2
                        </span>
                      )}
                      {aggregate.level1 > 0 && (
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.25)' }} />
                          Level 1
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>

              {topicsMasteredOpen && (
                <>
                  <div className="flex items-center gap-6">
                    <ReadinessDonut
                      sections={sections}
                      overallPct={overallPct}
                      activeSection={activeSection}
                      onSectionHover={handleSectionHover}
                      onSectionClick={handleSectionClick}
                    />
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      {sections.map((sec, i) => (
                        <div
                          key={sec.name}
                          className="flex items-center gap-2 min-w-0 cursor-pointer rounded px-1 -mx-1 transition-colors hover:bg-muted/50"
                          onMouseEnter={() => handleSectionHover(i)}
                          onMouseLeave={() => handleSectionHover(null)}
                          onClick={() => handleSectionClick(i)}
                        >
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: `rgba(34,197,94,${(0.12 + 0.88 * (sec.readinessPct / 100)).toFixed(2)})` }}
                          />
                          <span className="text-xs text-muted-foreground truncate flex-1">{sec.name}</span>
                          <span className="text-xs font-medium tabular-nums shrink-0">{Math.round(sec.readinessPct)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <StudyPlanTracker
                    syllabus={syllabus}
                    masteryRecords={masteryRecords}
                    studyPlan={plan}
                    allConceptsForNav={allConcepts}
                    onConceptSelect={concept => openDashboard(toRefs(allConcepts), null, 'entire-syllabus', concept.index)}
                    openTopics={openTopics}
                    onToggle={toggleTopic}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Action buttons – free users, above locked content */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const hasStudyPlan = studyPlanConceptsForModal.length > 0
                openDashboard(
                  toRefs(allConcepts),
                  hasStudyPlan ? toRefs(studyPlanConceptsForModal) : null,
                  hasStudyPlan ? 'study-plan' : 'entire-syllabus',
                  0,
                )
              }}
              disabled={allConcepts.length === 0}
              className="gap-1.5 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Read concepts
            </Button>
            <Button
              onClick={handleStartQuiz}
              className="gap-1.5 text-sm"
            >
              <Play className="h-4 w-4" />
              Start Quiz
            </Button>
          </div>

          {/* Countdown numbers */}
          {(examDate || config.targetReadyDate) && (
            <div className="grid grid-cols-2 gap-3">
              {config.targetReadyDate && (() => {
                const now = new Date(); now.setHours(0, 0, 0, 0)
                const days = Math.ceil((new Date(config.targetReadyDate + 'T00:00:00').getTime() - now.getTime()) / 86400000)
                return (
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-5xl font-bold tabular-nums text-amber-400">
                      {Math.max(days, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 font-medium">days to prepare</p>
                  </div>
                )
              })()}
              {examDate && (() => {
                const now = new Date(); now.setHours(0, 0, 0, 0)
                const days = Math.ceil((new Date(examDate + 'T00:00:00').getTime() - now.getTime()) / 86400000)
                return (
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <p className="text-5xl font-bold tabular-nums">
                      {Math.max(days, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5 font-medium">days until exam</p>
                  </div>
                )
              })()}
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden">
          {/* Blurred preview of premium content */}
          <div className="space-y-4 pointer-events-none select-none" aria-hidden="true">
            {/* Today's Study Plan preview */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold">Today's Study Plan</h3>
                <div className="space-y-0.5">
                  {(syllabus.topics[0]?.concepts ?? []).slice(0, 3).map((c, i) => (
                    <div key={i} className="w-full flex items-center gap-2.5 px-2 py-1.5">
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm flex-1 min-w-0 truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">→ Level 1</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Topics mastered preview */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">Topics mastered</span>
                    <span className="font-semibold text-muted-foreground">0/{aggregate.total} (0%)</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-secondary" />
                </div>
                <div className="flex items-center gap-6">
                  <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
                    <circle cx="80" cy="80" r="55" fill="none" strokeWidth="22" stroke="rgba(34,197,94,0.06)" />
                  </svg>
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    {(syllabus.topics ?? []).slice(0, 5).map((t, i) => (
                      <div key={i} className="flex items-center gap-2 min-w-0">
                        <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }} />
                        <span className="text-xs text-muted-foreground truncate flex-1">{t.name}</span>
                        <span className="text-xs font-medium tabular-nums shrink-0">0%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  {(syllabus.topics ?? []).slice(0, 3).map((t, i) => (
                    <div key={i} className="flex items-center gap-2 w-full py-2 px-1">
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground -rotate-90" />
                      <span className="text-sm font-semibold min-w-0 truncate">
                        {t.name}
                        {t.weight && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{t.weight}</span>}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-secondary" />
                      <span className="text-xs font-medium shrink-0 text-right w-12 tabular-nums text-muted-foreground">0/{t.concepts.length}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 backdrop-blur-md bg-background/80 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
              <Lock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold">Custom Study Plan</p>
              <p className="text-xs text-muted-foreground max-w-[220px]">
                A daily plan tailored to you
              </p>
            </div>
            <Link to="/upgrade" className={buttonVariants({ size: 'sm' }) + ' gap-1.5'}>
              Upgrade to Actuarial Notes Premium
            </Link>
            <div className="w-full max-w-xs mt-1">
              <div
                className="overflow-hidden rounded-xl"
                onTouchStart={e => setSwipeTouchStart(e.touches[0].clientX)}
                onTouchEnd={e => {
                  const diff = swipeTouchStart - e.changedTouches[0].clientX
                  if (Math.abs(diff) > 40) {
                    if (diff > 0 && featurePanelIndex < 2) setFeaturePanelIndex(i => i + 1)
                    if (diff < 0 && featurePanelIndex > 0) setFeaturePanelIndex(i => i - 1)
                  }
                }}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${featurePanelIndex * 100}%)` }}
                >
                  <div className="w-full shrink-0 flex flex-col items-center gap-3 border bg-background/60 p-6 text-center">
                    <CalendarCheck className="h-10 w-10 text-primary" />
                    <p className="text-base font-semibold">Daily Challenges</p>
                    <p className="text-sm text-muted-foreground leading-snug">Learn and practice target concepts each day</p>
                  </div>
                  <div className="w-full shrink-0 flex flex-col items-center gap-3 border bg-background/60 p-6 text-center">
                    <Gem className="h-10 w-10 text-primary" />
                    <p className="text-base font-semibold">Earn Gems</p>
                    <p className="text-sm text-muted-foreground leading-snug">Collect a gem for each correct question</p>
                  </div>
                  <div className="w-full shrink-0 flex flex-col items-center gap-3 border bg-background/60 p-6 text-center">
                    <Trophy className="h-10 w-10 text-primary" />
                    <p className="text-base font-semibold">Compete</p>
                    <p className="text-sm text-muted-foreground leading-snug">Rank up on the leaderboard</p>
                    <span className="text-xs bg-muted rounded-full px-2 py-0.5 text-muted-foreground">Coming Soon</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3">
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => setFeaturePanelIndex(i)}
                    className={`h-2 rounded-full transition-all ${featurePanelIndex === i ? 'w-5 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </>
      )}

      {showConfig && (
        <StudyPlanConfigModal
          config={config}
          examDate={examDate}
          examLabel={syllabus.examLabel}
          examId={wikiExamIdToProgressKey(syllabus.examId)}
          initialStep={configInitialStep}
          onSave={next => {
            onConfigChange(next)
            onRegenerate()
          }}
          onExamDateChange={onExamDateChange}
          onClose={() => setShowConfig(false)}
        />
      )}
      <StudyPlanInfoPanel open={showInfo} onClose={() => setShowInfo(false)} />
      <DailyBonusInfoPanel open={showBonusInfo} onClose={() => setShowBonusInfo(false)} />
    </div>
  )
}

// ── Daily Bonus Info Panel ────────────────────────────────────────────────────

function DailyBonusInfoPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Daily study plan bonus"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm bg-card border rounded-xl shadow-2xl flex flex-col my-16">
        <div className="flex items-center gap-2 px-4 h-12 border-b shrink-0">
          <Gem className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="flex-1 font-semibold text-sm">Daily Study Plan Bonus</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            aria-label="Close"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        <div className="p-5 space-y-4 text-sm leading-relaxed">
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-muted/50 border">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-2xl text-muted-foreground">→</span>
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-cyan-500/20 border border-cyan-500/30">
              <Gem className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <p className="text-muted-foreground">
            Complete every concept in today's study plan and we'll double the gems you earned today from quizzes.
          </p>
          <div className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-1">
            <p className="text-xs font-semibold">How it works</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>· Earn gems by answering questions correctly (1 gem each)</li>
              <li>· Finish all of today's planned concepts</li>
              <li>· Receive a bonus equal to your gems earned today</li>
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: if today's plan doesn't reflect what you actually studied, use the <strong>Replace</strong> button to swap in the concepts you completed today.
          </p>
        </div>
        <div className="px-5 pb-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
