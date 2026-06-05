import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowUp, BookOpen, Check, CheckCircle2, ChevronDown, Circle, Gem, Info, Play, Lock, Settings2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { StudyPlanInfoPanel } from '@/components/StudyPlanInfoPanel'
import { HeatmapInfoPanel } from '@/components/HeatmapInfoPanel'
import { ConceptScheduleBadge } from '@/components/TopicProgressSection'
import { ExamHeatmap } from '@/components/ExamHeatmap'
import { QuizSessionCard } from '@/components/QuizSessionCard'
import { SessionCompletionOverlay } from '@/components/SessionCompletionOverlay'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { aggregateForTopic, decayIfStale, sanitizeMasteryState } from '@/lib/mastery'
import { normalizeMasteryToDisplayNames } from '@/lib/conceptMatch'
import { parseSectionWeight } from '@/lib/readiness'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import { todayISO, type StudyPlan, type StudyPlanConfig } from '@/lib/studyPlan'
import { readTodayLevelUps, LEVELUP_EVENT, type DailyLevelUp } from '@/lib/dailyProgressStore'
import type { QuizSession } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useIsMobile } from '@/hooks/useIsMobile'


// ── Study Guide Radial ─────────────────────────────────────────────────────────

const SG_VB = 280
const SG_CX = SG_VB / 2
const SG_CY = SG_VB / 2
const SG_OUTER_R = 126
const SG_INNER_R = 74
const SG_CONCEPT_GAP = 1.5

const LEVEL_FILL: Record<MasteryState, string> = {
  new:       'rgba(34,197,94,0.10)',
  level1:    'rgba(34,197,94,0.28)',
  level2:    'rgba(34,197,94,0.62)',
  level3:    '#22c55e',
  forgotten: 'rgba(239,68,68,0.45)',
}

interface SGSegment {
  startDeg: number
  endDeg: number
  conceptName: string
  topicName: string
  state: MasteryState
}

function sgPolar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: SG_CX + r * Math.cos(rad), y: SG_CY + r * Math.sin(rad) }
}

function sgArc(startDeg: number, endDeg: number, ro: number, ri: number) {
  const s1 = sgPolar(startDeg, ro)
  const e1 = sgPolar(endDeg, ro)
  const s2 = sgPolar(endDeg, ri)
  const e2 = sgPolar(startDeg, ri)
  const lg = endDeg - startDeg > 180 ? 1 : 0
  return `M${s1.x} ${s1.y} A${ro} ${ro} 0 ${lg} 1 ${e1.x} ${e1.y} L${s2.x} ${s2.y} A${ri} ${ri} 0 ${lg} 0 ${e2.x} ${e2.y}Z`
}

function StudyGuideRadial({
  syllabus,
  examRecords,
  now,
  onConceptClick,
  masteredCount,
  totalCount,
  selectedConcept,
  flashRadial,
}: {
  syllabus: WikiExamSyllabus
  examRecords: ConceptMasteryRecord[]
  now: Date
  onConceptClick?: (name: string) => void
  masteredCount: number
  totalCount: number
  selectedConcept?: string | null
  flashRadial?: boolean
}) {
  const [hovered, setHovered] = useState<SGSegment | null>(null)

  const segments = useMemo(() => {
    const normalized = normalizeMasteryToDisplayNames(examRecords, syllabus)
    const bySlug = new Map(normalized.map(r => [r.concept_slug.toLowerCase(), r]))
    const totalWeight = syllabus.topics.reduce((s, t) => s + parseSectionWeight(t.weight), 0) || 1
    const result: SGSegment[] = []
    let cursor = 0

    for (const topic of syllabus.topics) {
      const topicWeight = parseSectionWeight(topic.weight)
      const topicDeg = (topicWeight / totalWeight) * 360
      const n = topic.concepts.length
      if (n === 0) { cursor += topicDeg; continue }
      const slotDeg = topicDeg / n
      const gap = Math.min(SG_CONCEPT_GAP, slotDeg * 0.5)

      for (const concept of topic.concepts) {
        const rec = bySlug.get(concept.name.toLowerCase())
        const state: MasteryState = rec ? decayIfStale(rec, now).state : 'new'
        const startDeg = cursor + gap / 2
        const endDeg = cursor + slotDeg - gap / 2
        if (endDeg > startDeg + 0.5) {
          result.push({ startDeg, endDeg, conceptName: concept.name, topicName: topic.name, state })
        }
        cursor += slotDeg
      }
    }
    return result
  }, [syllabus, examRecords, now])

  const selected = useMemo(
    () => selectedConcept ? (segments.find(s => s.conceptName.toLowerCase() === selectedConcept.toLowerCase()) ?? null) : null,
    [segments, selectedConcept],
  )

  const pctText = totalCount > 0 ? `${Math.round((masteredCount / totalCount) * 100)}%` : '0%'
  const centerSeg = hovered ?? selected

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
        {(['level3', 'level2', 'level1', 'new'] as MasteryState[]).map(s => (
          <span key={s} className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: LEVEL_FILL[s] }} />
            {s === 'new' ? 'New' : s === 'level1' ? 'Level 1' : s === 'level2' ? 'Level 2' : 'Level 3'}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${SG_VB} ${SG_VB}`} className="w-full max-w-[260px]" style={{ overflow: 'visible' }}>
        <circle
          cx={SG_CX} cy={SG_CY}
          r={(SG_OUTER_R + SG_INNER_R) / 2}
          fill="none"
          strokeWidth={SG_OUTER_R - SG_INNER_R}
          stroke="rgba(34,197,94,0.06)"
        />
        {segments.map((seg, i) => {
          const isActive = hovered === seg || selected === seg
          return (
            <path
              key={i}
              d={sgArc(seg.startDeg, seg.endDeg, SG_OUTER_R, SG_INNER_R)}
              fill={LEVEL_FILL[seg.state]}
              opacity={(hovered || selected) && !isActive ? 0.35 : 1}
              stroke={selected === seg && hovered !== seg ? 'rgba(255,255,255,0.55)' : 'none'}
              strokeWidth={selected === seg && hovered !== seg ? 1 : 0}
              style={{
                transition: 'opacity 100ms, transform 100ms',
                transformOrigin: `${SG_CX}px ${SG_CY}px`,
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
              }}
              onMouseEnter={() => setHovered(seg)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onConceptClick?.(seg.conceptName)}
              className="cursor-pointer"
            />
          )
        })}

        {centerSeg ? (
          <>
            <text x={SG_CX} y={SG_CY - 18} textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.45} fontStyle="italic">
              {centerSeg.topicName.length > 24 ? centerSeg.topicName.slice(0, 22) + '…' : centerSeg.topicName}
            </text>
            <text x={SG_CX} y={SG_CY + 2} textAnchor="middle" fontSize={11} fill="currentColor" fontWeight="700">
              {centerSeg.conceptName.length > 20 ? centerSeg.conceptName.slice(0, 18) + '…' : centerSeg.conceptName}
            </text>
            <text x={SG_CX} y={SG_CY + 18} textAnchor="middle" fontSize={10} fill={centerSeg.state === 'level3' ? '#22c55e' : 'currentColor'} opacity={centerSeg.state === 'level3' ? 1 : 0.65}>
              {centerSeg.state === 'new' ? 'New' : centerSeg.state === 'level1' ? 'Level 1' : centerSeg.state === 'level2' ? 'Level 2' : centerSeg.state === 'level3' ? 'Level 3' : 'Forgotten'}
            </text>
          </>
        ) : (
          <>
            <text x={SG_CX} y={SG_CY + 10} textAnchor="middle" fontSize={30} fontWeight="800"
              fill={flashRadial ? '#22c55e' : 'currentColor'}
              style={{ transition: 'fill 0.8s ease-out' }}
            >
              {pctText}
            </text>
            <text x={SG_CX} y={SG_CY + 24} textAnchor="middle" fontSize={10} fill="currentColor"
              opacity={flashRadial ? 0.9 : 0.4}
              style={{ transition: 'opacity 0.8s ease-out' }}
            >
              mastered
            </text>
          </>
        )}
      </svg>

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
  new:       'bg-muted text-muted-foreground border-transparent',
  level1:    'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/25',
  level2:    'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/35',
  level3:    'bg-green-500/30 text-green-800 dark:text-green-300 border-green-500/50',
  forgotten: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40',
}

function StudyPlanTracker({
  syllabus,
  masteryRecords,
  studyPlan,
  allConceptsForNav,
  onConceptSelect,
  openTopics,
  onToggle,
  flashingConcept,
  showMastery = true,
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  studyPlan?: StudyPlan | null
  allConceptsForNav: { name: string; state: MasteryState }[]
  onConceptSelect: (concept: { name: string; state: MasteryState; index: number }) => void
  openTopics: Set<string>
  onToggle: (name: string) => void
  flashingConcept?: string | null
  showMastery?: boolean
}) {
  const examKey = wikiExamIdToProgressKey(syllabus.examId)
  const examMastery = masteryRecords.filter(r => r.exam_id === examKey)
  const now = new Date()

  const normalizedMastery = normalizeMasteryToDisplayNames(examMastery, syllabus)
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
              className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors sticky top-0 z-10 bg-card/95 backdrop-blur-sm"
              onClick={() => onToggle(topic.name)}
              aria-expanded={isOpen}
            >
              <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
              <span className="text-sm font-semibold min-w-0 truncate">
                {topic.name}
                {topic.weight && <span className="ml-1.5 text-xs font-normal text-muted-foreground">{topic.weight}</span>}
              </span>
              {showMastery && (
                <>
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-0" role="progressbar" aria-valuenow={agg.strongPct} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${agg.strongPct}%` }} />
                  </div>
                  <span className="text-xs font-medium shrink-0 text-right w-12 tabular-nums text-muted-foreground">{agg.level3}/{agg.total}</span>
                </>
              )}
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
                      data-study-concept={c.name.toLowerCase()}
                      onClick={() => onConceptSelect({ name: c.name, state, index: idx === -1 ? 0 : idx })}
                      className={`flex items-center gap-2 w-full py-1 px-1 -mx-1 rounded hover:bg-muted/40 transition-colors text-left${flashingConcept?.toLowerCase() === c.name.toLowerCase() ? ' concept-row-highlight' : ''}`}
                    >
                      <span className="text-xs text-foreground min-w-0 flex-1 truncate">{c.name}</span>
                      {showMastery && studyPlan && state !== 'level3' && (
                        <ConceptScheduleBadge conceptName={c.name} plan={studyPlan} />
                      )}
                      {showMastery && (
                        <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${STATE_BADGE[state]}`}>
                          {STATE_LABEL[state]}
                        </span>
                      )}
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
  onOpenOnboarding?: (step?: 1 | 2 | 3) => void
  openConceptsTrigger?: number
  startQuizTrigger?: number
  scrollToRadialTrigger?: number
  /** Whether the user has access to the custom Study Plan. Defaults to true. */
  isPremium?: boolean
}

export function ReadinessCard({
  syllabus, masteryRecords, sessions, plan, masteryStateByName,
  config, loading, examDate, onConfigChange, onRegenerate, onReplaceConcepts, onExamDateChange,
  openConceptsTrigger, startQuizTrigger, scrollToRadialTrigger,
  isPremium = true,
}: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const openDashboard = useConceptPopup(s => s.openDashboard)
  const popupOpen = useConceptPopup(s => s.open)
  const popupCurrentName = useConceptPopup(s => s.open ? (s.list[s.index]?.name ?? null) : null)
  const popupFromRadial = useConceptPopup(s => s.dashboardContext?.fromRadial ?? false)
  const popupDashboardFilter = useConceptPopup(s => s.dashboardContext?.filter ?? 'entire-syllabus')
  const toRefs = (arr: { name: string }[]): WikiEntryRef[] =>
    arr.map(c => ({ kind: 'concept' as const, name: c.name }))
  const prevPopupConceptRef = useRef<string | null>(null)
  const studyGuideCardRef = useRef<HTMLDivElement>(null)
  const topicsMasteredContainerRef = useRef<HTMLDivElement>(null)
  const [flashingConcept, setFlashingConcept] = useState<string | null>(null)
  const [flashRadial, setFlashRadial] = useState(false)
  const [recentlyCompletedConcepts, setRecentlyCompletedConcepts] = useState<Set<string>>(new Set())
  const prevCompletedRef = useRef<Set<string>>(new Set())
  const [topicsMasteredOpen, setTopicsMasteredOpen] = useState(false)
  const [completedToday, setCompletedToday] = useState<DailyLevelUp[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [configInitialStep, setConfigInitialStep] = useState<1 | 2 | 3>(1)
  const [showInfo, setShowInfo] = useState(false)
  const [showBonusInfo, setShowBonusInfo] = useState(false)
  const [showHeatmapInfo, setShowHeatmapInfo] = useState(false)
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
  const [deselectedConcepts, setDeselectedConcepts] = useState<Set<string>>(new Set())
  const [highlightedTopicIdx, setHighlightedTopicIdx] = useState<number | null>(null)
  const [planTopicsOpen, setPlanTopicsOpen] = useState<Set<string>>(new Set())

  // Quiz history state
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedDayLevelUps, setSelectedDayLevelUps] = useState<DailyLevelUp[]>([])
  const [viewingSession, setViewingSession] = useState<QuizSession | null>(null)
  const [allDailyCompletions, setAllDailyCompletions] = useState<Array<{ day: string; concept_slug: string }>>([])
  const savedScrollY = useRef(0)

  const toggleTopic = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

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

  // Flash a concept row green when it transitions to completed for the first time today.
  const markConceptComplete = useCallback((slug: string) => {
    setRecentlyCompletedConcepts(prev => new Set([...prev, slug]))
    setTimeout(() => {
      setRecentlyCompletedConcepts(prev => {
        const next = new Set(prev); next.delete(slug); return next
      })
    }, 800)
  }, [])

  useEffect(() => {
    const nowCompleted = new Set(
      completedToday.map(lu => lu.conceptSlug.toLowerCase())
    )
    for (const slug of nowCompleted) {
      if (!prevCompletedRef.current.has(slug)) markConceptComplete(slug)
    }
    prevCompletedRef.current = nowCompleted
  }, [completedToday, markConceptComplete])

  const now = useMemo(() => new Date(), [])
  const progressKey = wikiExamIdToProgressKey(syllabus.examId)

  // Fetch all daily_completions for this exam — used for heatmap plan-completion coloring
  useEffect(() => {
    if (!user) { setAllDailyCompletions([]); return }
    let cancelled = false
    supabase
      .from('daily_completions')
      .select('day, concept_slug')
      .eq('user_id', user.id)
      .eq('exam_id', progressKey)
      .then(({ data }: { data: Array<{ day: string; concept_slug: string }> | null }) => {
        if (!cancelled) setAllDailyCompletions(data ?? [])
      })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, progressKey])

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

  // Group today's plan concepts by their parent syllabus topic
  const groupedPlanConcepts = useMemo(() => {
    if (displayConcepts.length === 0) return []
    const dcSet = new Set(displayConcepts.map(c => c.toLowerCase()))
    return syllabus.topics
      .map(t => ({
        topicName: t.name,
        concepts: t.concepts.filter(c => dcSet.has(c.name.toLowerCase())).map(c => c.name),
      }))
      .filter(g => g.concepts.length > 0)
  }, [syllabus, displayConcepts])

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

  // Order matches the visual display order (syllabus topic order) so that
  // prev/next in the popup navigates in the same order the user sees on screen.
  const studyPlanConceptsForModal = useMemo(() =>
    groupedPlanConcepts.flatMap(g => g.concepts.map(name => ({
      name,
      state: masteryStateByName.get(name.toLowerCase()) ?? 'new' as MasteryState,
    }))),
    [groupedPlanConcepts, masteryStateByName]
  )

  // Auto-open plan topic groups (uncollapsed by default) when the plan loads
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (groupedPlanConcepts.length === 0) return
    setPlanTopicsOpen(new Set(groupedPlanConcepts.map(g => g.topicName)))
  }, [groupedPlanConcepts.map(g => g.topicName).join('|')])

  // Auto-expand Topics Mastered section and relevant topics when study plan is active
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (displayConcepts.length === 0) return
    setTopicsMasteredOpen(true)
    const planTopicNames = new Set(groupedPlanConcepts.map(g => g.topicName))
    setOpenTopics(prev => {
      if (planTopicNames.size === 0) return prev
      const next = new Set(prev)
      planTopicNames.forEach(n => next.add(n))
      return next
    })
  }, [displayConcepts.join('|')])

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

  // Compute per-day plan completion % for heatmap coloring.
  // When a plan exists: color = concepts_completed_that_day / conceptsPerDay (capped at 100%).
  // When no plan: undefined → ExamHeatmap falls back to session-score coloring.
  const dayPlanPct = useMemo((): Map<string, number> | undefined => {
    if (!user || !plan) return undefined
    const cpd = plan.conceptsPerDay
    const today = todayISO()
    const result = new Map<string, number>()

    // Build per-day slug sets from historical daily_completions
    const countByDay = new Map<string, Set<string>>()
    for (const row of allDailyCompletions) {
      if (!countByDay.has(row.day)) countByDay.set(row.day, new Set())
      countByDay.get(row.day)!.add(row.concept_slug.toLowerCase())
    }
    // Also incorporate today's live level-up data
    if (examCompletedToday.length > 0) {
      if (!countByDay.has(today)) countByDay.set(today, new Set())
      const todaySet = countByDay.get(today)!
      for (const lu of examCompletedToday) todaySet.add(lu.conceptSlug.toLowerCase())
    }

    for (const [day, slugs] of countByDay) {
      if (day === today && displayConcepts.length > 0) {
        // Today: use exact plan completion ratio
        const completed = displayConcepts.filter(name =>
          slugs.has(name.toLowerCase()) ||
          STATE_ORDER[masteryStateByName.get(name.toLowerCase()) ?? 'new'] >= STATE_ORDER[targetByName.get(name.toLowerCase()) ?? 'level1']
        )
        result.set(day, (completed.length / displayConcepts.length) * 100)
      } else {
        // Past days: estimate via conceptsPerDay quota
        const pct = cpd > 0 ? Math.min((slugs.size / cpd) * 100, 100) : (slugs.size > 0 ? 100 : 0)
        result.set(day, pct)
      }
    }
    return result
  }, [user, plan, allDailyCompletions, examCompletedToday, displayConcepts, masteryStateByName, targetByName])

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

  const togglePlanConceptSelection = useCallback((name: string) => {
    setDeselectedConcepts(prev => {
      const next = new Set(prev)
      if (next.has(name.toLowerCase())) next.delete(name.toLowerCase())
      else next.add(name.toLowerCase())
      return next
    })
  }, [])

  const togglePlanTopicSelection = useCallback((_topicName: string, concepts: string[]) => {
    setDeselectedConcepts(prev => {
      const allDeselected = concepts.every(c => prev.has(c.toLowerCase()))
      const next = new Set(prev)
      if (allDeselected) {
        concepts.forEach(c => next.delete(c.toLowerCase()))
      } else {
        concepts.forEach(c => next.add(c.toLowerCase()))
      }
      return next
    })
  }, [])

  const togglePlanTopicOpen = useCallback((topicName: string) => {
    setPlanTopicsOpen(prev => {
      const next = new Set(prev)
      if (next.has(topicName)) next.delete(topicName)
      else next.add(topicName)
      return next
    })
  }, [])

  const handleStartQuiz = useCallback(() => {
    // Sequentially highlight each topic group before navigating
    groupedPlanConcepts.forEach((_group, idx) => {
      setTimeout(() => setHighlightedTopicIdx(idx), idx * 220)
    })
    const totalDelay = Math.max(groupedPlanConcepts.length * 220 + 150, 300)

    setTimeout(() => {
      setHighlightedTopicIdx(null)
      const selectedConceptNames = displayConcepts.filter(c => !deselectedConcepts.has(c.toLowerCase()))
      if (selectedConceptNames.length > 0 && selectedConceptNames.length < displayConcepts.length) {
        try {
          sessionStorage.setItem('actuarial_quiz_concept_override', JSON.stringify(selectedConceptNames))
        } catch { /* ignore */ }
      }
      navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}&mode=quiz`)
    }, totalDelay)
  }, [navigate, syllabus.examTopic, groupedPlanConcepts, displayConcepts, deselectedConcepts])

  useEffect(() => {
    if (startQuizTrigger) handleStartQuiz()
  }, [startQuizTrigger, handleStartQuiz])

  useEffect(() => {
    if (!scrollToRadialTrigger) return
    studyGuideCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setFlashRadial(true)
    const t = setTimeout(() => setFlashRadial(false), 1200)
    return () => clearTimeout(t)
  }, [scrollToRadialTrigger])

  useEffect(() => {
    if (!popupOpen) {
      prevPopupConceptRef.current = null
    }
  }, [popupOpen])

  useEffect(() => {
    if (!popupCurrentName || popupCurrentName === prevPopupConceptRef.current) return
    prevPopupConceptRef.current = popupCurrentName
    const fromRadial = popupFromRadial

    if (fromRadial) {
      // On every concept change, re-check whether the study guide card is still
      // visible above the popup. If it has scrolled out of view, bring it back.
      // The effect cleanup cancels a pending timeout on re-run, so rapid Next/Prev
      // clicks naturally debounce down to a single scroll at the end.
      const scrollId = setTimeout(() => {
        if (!studyGuideCardRef.current) return
        const popupEl = document.querySelector<HTMLElement>('.concept-popup-aside')
        const visibleHeight = popupEl ? popupEl.getBoundingClientRect().top : window.innerHeight
        const rect = studyGuideCardRef.current.getBoundingClientRect()
        if (rect.top < 0 || rect.top > visibleHeight - 80) {
          window.scrollBy({ top: rect.top - 16, behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(scrollId)
    }

    // Non-radial: for entire-syllabus mode expand the owning topic in topics-mastered
    // so the concept row becomes visible there. For study-plan mode the plan topics are
    // already auto-expanded and we don't want to cause a layout shift below.
    const ownerTopic = syllabus.topics.find(t =>
      t.concepts.some(c => c.name.toLowerCase() === popupCurrentName.toLowerCase())
    )
    if (popupDashboardFilter === 'entire-syllabus' && ownerTopic) {
      setOpenTopics(prev => prev.has(ownerTopic.name) ? prev : new Set([...prev, ownerTopic.name]))
      setTopicsMasteredOpen(true)
    }
    // For study-plan mode scroll to the active concept row in the study plan card.
    // The querySelector finds study-plan rows first (higher in the DOM), so the target
    // is always the correct element. For entire-syllabus, scroll within the overflow
    // container rather than the window to avoid jumping to the wrong section.
    let scrollId: ReturnType<typeof setTimeout> | undefined
    if (popupDashboardFilter === 'study-plan') {
      scrollId = setTimeout(() => {
        const popupEl = document.querySelector<HTMLElement>('.concept-popup-aside')
        const visibleHeight = popupEl ? popupEl.getBoundingClientRect().top : window.innerHeight
        const el = document.querySelector<HTMLElement>(`[data-study-concept="${CSS.escape(popupCurrentName.toLowerCase())}"]`)
        if (!el) return
        const rect = el.getBoundingClientRect()
        window.scrollBy({ top: rect.top - visibleHeight / 2 + rect.height / 2, behavior: 'smooth' })
      }, 50)
    } else if (popupDashboardFilter === 'entire-syllabus') {
      scrollId = setTimeout(() => {
        const container = topicsMasteredContainerRef.current
        if (!container) return
        const el = container.querySelector<HTMLElement>(`[data-study-concept="${CSS.escape(popupCurrentName.toLowerCase())}"]`)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
    setFlashingConcept(popupCurrentName)
    const clearId = setTimeout(() => setFlashingConcept(null), 1400)
    return () => { if (scrollId !== undefined) clearTimeout(scrollId); clearTimeout(clearId) }
  }, [popupCurrentName, popupFromRadial, popupDashboardFilter])

  return (
    <div className="space-y-4">
      {/* Bento grid: left = heatmap + plan, right = gauges + actions (md+) */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 items-start">
      {/* Left column: heatmap card + study plan card */}
      <div className="space-y-4">
      {/* Heatmap card */}
      <Card className="border-0 shadow-none">
        <CardContent className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setShowHeatmapInfo(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
                aria-label="Exam heatmap info"
                title="Exam heatmap info"
              >
                <Info className="h-5 w-5" />
              </button>
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
            onDayClick={date => { setSelectedDay(date) }}
            dayPlanPct={dayPlanPct}
            mobileMonthOnly={isMobile}
            highlightedDay={selectedDay}
          />

          {/* Day panel — shown when a heatmap day is clicked */}
          {selectedDay && (() => {
            const daySessions = examSessions.filter(s => s.completed_at.slice(0, 10) === selectedDay)
            const dayTotal = daySessions.reduce((s, r) => s + r.total_questions, 0)
            const dayCorrect = daySessions.reduce((s, r) => s + r.correct_count, 0)
            const dayLevelUps = selectedDayLevelUps.length
            const dayLabel = new Date(selectedDay + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
            const isFutureDay = selectedDay > todayStr
            return (
              <div className="border-t pt-4 mt-1 space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{dayLabel}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedDay(null)}
                    className="flex items-center justify-center h-8 w-8 rounded-full border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear day filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Large stats */}
                {daySessions.length > 0 && (
                  <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold tabular-nums leading-none">
                        {dayCorrect}
                        <span className="text-muted-foreground text-lg font-normal">/{dayTotal}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">correct</span>
                    </div>
                    {dayCorrect > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold tabular-nums leading-none text-cyan-500 inline-flex items-center gap-1">
                          {dayCorrect} <Gem className="h-5 w-5" />
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">gems</span>
                      </div>
                    )}
                    {dayLevelUps > 0 && (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold tabular-nums leading-none text-primary inline-flex items-center gap-1">
                          {dayLevelUps} <ArrowUp className="h-5 w-5" />
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-0.5">levelled up</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Session flashcard grid */}
                {daySessions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">{isFutureDay ? 'No sessions yet — this day is in the future.' : 'No sessions on this date.'}</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {daySessions.map(session => (
                      <QuizSessionCard
                        key={session.id}
                        session={session}
                        onClick={() => {
                          savedScrollY.current = window.scrollY
                          setViewingSession(session)
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Study plan for this day */}
                {isPremium && (() => {
                  if (selectedDay === todayStr) {
                    // Today: show live plan inline (moved below)
                    return null
                  }
                  if (isFutureDay && plan) {
                    const futureConcepts = plan.assignments.filter(a => a.scheduledDate === selectedDay)
                    if (futureConcepts.length === 0) return null
                    return (
                      <div className="border-t pt-3 space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Planned for this day</p>
                        {futureConcepts.map(a => (
                          <div key={a.conceptName} className="flex items-center gap-2.5 px-2 py-1.5">
                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm flex-1 min-w-0 truncate">{a.conceptName}</span>
                            <span className="text-xs text-muted-foreground shrink-0">→ {STATE_LABEL[NEXT_STATE[masteryStateByName.get(a.conceptName.toLowerCase()) ?? 'new'] ?? 'level1']}</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  // Past day: show level-ups
                  if (selectedDayLevelUps.length > 0) {
                    return (
                      <div className="border-t pt-3 space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Concepts mastered</p>
                        {selectedDayLevelUps.map(lu => (
                          <div key={lu.conceptSlug + lu.at} className="flex items-center gap-2.5 px-2 py-1.5">
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="text-sm flex-1 min-w-0 truncate text-muted-foreground line-through">{lu.conceptSlug}</span>
                            <span className="text-xs text-green-600 dark:text-green-400 shrink-0 font-medium">→ {STATE_LABEL[lu.to]}</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  return null
                })()}
              </div>
            )
          })()}

        </CardContent>
      </Card>

      {/* Today's Study Plan card */}
      {isPremium && displayConcepts.length > 0 && (selectedDay === null || selectedDay === todayStr) && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Today's Study Plan</h3>
                {/* Inline gems bonus pill */}
                <button
                  type="button"
                  onClick={() => setShowBonusInfo(true)}
                  title="Daily gems bonus info"
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0 transition-colors ${
                    allConceptsDone
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20'
                      : 'text-muted-foreground hover:bg-muted/30'
                  }`}
                >
                  {allConceptsDone
                    ? <Gem className="h-2.5 w-2.5 shrink-0" />
                    : <Lock className="h-2.5 w-2.5 shrink-0" />}
                  <span>
                    {allConceptsDone && bonusClaimed
                      ? `+${claimedBonusAmount} earned`
                      : '2× Bonus'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors p-1.5"
                  aria-label="How custom study plans work"
                  title="How custom study plans work"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>

              {/* Progress pills — shown when there's activity today */}
              {todayQuestionsAnswered > 0 && !allConceptsDone && (
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

              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full flex items-center gap-3 px-4 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 text-base font-semibold transition-colors"
              >
                <Play className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">
                  {todayQuestionsAnswered > 0 ? 'Continue Studying' : "Start Today's Quiz"}
                </span>
              </button>

              {/* Grouped concept list — topics uncollapsed by default, each concept is toggleable */}
              <div className="space-y-1.5">
                {groupedPlanConcepts.map((group, groupIdx) => {
                  const isHighlighted = highlightedTopicIdx === groupIdx
                  const allDeselected = group.concepts.every(c => deselectedConcepts.has(c.toLowerCase()))
                  const someDeselected = group.concepts.some(c => deselectedConcepts.has(c.toLowerCase()))
                  const isOpen = planTopicsOpen.has(group.topicName)
                  return (
                    <div
                      key={group.topicName}
                      className={`rounded-lg border transition-all duration-200 ${isHighlighted ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border/60'}`}
                    >
                      {/* Topic header row */}
                      <div className="flex items-center gap-1.5 px-2 py-1.5">
                        {/* Topic-level toggle */}
                        <button
                          type="button"
                          onClick={() => togglePlanTopicSelection(group.topicName, group.concepts)}
                          className="shrink-0 transition-colors text-muted-foreground hover:text-foreground"
                          aria-label={allDeselected ? `Include ${group.topicName}` : `Exclude ${group.topicName}`}
                          title={allDeselected ? 'Click to include this topic' : 'Click to exclude this topic'}
                        >
                          {allDeselected
                            ? <Circle className="h-4 w-4" />
                            : someDeselected
                              ? <CheckCircle2 className="h-4 w-4 text-primary/50" />
                              : <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </button>
                        {/* Topic name + expand/collapse */}
                        <button
                          type="button"
                          onClick={() => togglePlanTopicOpen(group.topicName)}
                          className="flex-1 flex items-center gap-1 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className={`text-xs font-semibold truncate min-w-0 ${allDeselected ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                            {group.topicName}
                          </span>
                          <ChevronDown className={`h-3 w-3 text-muted-foreground shrink-0 transition-transform duration-150 ${isOpen ? '' : '-rotate-90'}`} />
                        </button>
                      </div>
                      {/* Concepts list */}
                      {isOpen && (
                        <div className="border-t border-border/40 px-2 pb-1.5 pt-1 space-y-0.5">
                          {group.concepts.map(name => {
                            const isDeselected = deselectedConcepts.has(name.toLowerCase())
                            const target = targetByName.get(name.toLowerCase()) ?? 'level1'
                            const currentState = masteryStateByName.get(name.toLowerCase()) ?? 'new'
                            const isCompleted =
                              examCompletedToday.some(lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()) ||
                              STATE_ORDER[currentState] >= STATE_ORDER[target]
                            const planIdx = studyPlanConceptsForModal.findIndex(c => c.name.toLowerCase() === name.toLowerCase())
                            return (
                              <div key={name} className={`flex items-center gap-1.5 w-full${flashingConcept?.toLowerCase() === name.toLowerCase() ? ' concept-row-highlight' : ''}${recentlyCompletedConcepts.has(name.toLowerCase()) ? ' concept-success' : ''}`}>
                                {/* Concept toggle */}
                                <button
                                  type="button"
                                  onClick={() => togglePlanConceptSelection(name)}
                                  className={`shrink-0 transition-colors ${isDeselected ? 'text-muted-foreground/30' : 'text-muted-foreground hover:text-foreground'}`}
                                  aria-label={isDeselected ? `Include ${name}` : `Exclude ${name}`}
                                  title={isDeselected ? 'Click to include' : 'Click to exclude'}
                                >
                                  {isDeselected
                                    ? <Circle className="h-3.5 w-3.5" />
                                    : isCompleted
                                      ? <Check className="h-3.5 w-3.5 text-green-500" />
                                      : <Circle className="h-3.5 w-3.5" />}
                                </button>
                                {/* Concept name — opens popup */}
                                <button
                                  type="button"
                                  data-study-concept={name.toLowerCase()}
                                  onClick={() => openDashboard(toRefs(allConcepts), toRefs(studyPlanConceptsForModal), 'study-plan', planIdx === -1 ? 0 : planIdx)}
                                  className={`flex-1 text-left text-xs py-0.5 truncate transition-colors hover:text-foreground/80 ${isDeselected ? 'text-muted-foreground/30 line-through' : isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                                >
                                  {name}
                                </button>
                                {!isDeselected && (
                                  <span className="text-[10px] text-muted-foreground shrink-0">→ {STATE_LABEL[target]}</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Bonus concepts */}
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

              {/* Replace button */}
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

              {allConceptsDone && (
                <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/30 px-3 py-2.5 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-semibold">Done for Today!</span>
                </div>
              )}

            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked study plan — non-premium only, shown in left column */}
      {!isPremium && (
        <div className="relative rounded-xl overflow-hidden">
          {/* Blurred background: Custom Study Plan card */}
          <div className="absolute inset-0 pointer-events-none select-none blur-sm opacity-50 rounded-xl" aria-hidden="true">
            <div className="h-full bg-card rounded-xl border p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Today's Study Plan</h3>
                <Settings2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-0.5">
                {[
                  ...(syllabus.topics[0]?.concepts ?? []).slice(0, 4),
                  ...(syllabus.topics[1]?.concepts ?? []).slice(0, 3),
                ].map((c, i) => (
                  <div key={i} className="w-full flex items-center gap-2.5 px-2 py-1.5">
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1 min-w-0 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">→ Level 1</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lock overlay — in normal flow so parent sizes to content */}
          <div className="relative z-10 backdrop-blur-md bg-background/75 flex flex-col items-center px-6 pt-6 pb-5 text-center rounded-xl">
            {/* Lock icon + title */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-base font-semibold">Custom Study Plan</p>
                  <button
                    type="button"
                    onClick={() => setShowInfo(true)}
                    className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20 transition-colors shrink-0"
                    aria-label="How custom study plans work"
                    title="How custom study plans work"
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground max-w-[220px]">
                  A daily plan tailored to you
                </p>
              </div>
            </div>

            {/* Upgrade button */}
            <Link to="/upgrade" className={buttonVariants({ size: 'sm' }) + ' gap-1.5 mt-6 w-full max-w-xs'}>
              Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* Warnings */}
      {!loading && plan && (plan.status === 'behind' || plan.status === 'target_passed') && (
        <BehindWarning plan={plan} />
      )}
      {!loading && plan?.status === 'review_mode' && (
        <ReviewModeNote concepts={plan.reviewConcepts ?? []} />
      )}
      </div>{/* end left column */}

      {/* RIGHT COLUMN: Study Guide */}
      <div className="space-y-3">
        <Card ref={studyGuideCardRef} className="bg-card">
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-semibold">Study Guide</h3>

            <StudyGuideRadial
              syllabus={syllabus}
              examRecords={isPremium ? examRecords : []}
              now={now}
              masteredCount={isPremium ? aggregate.level3 : 0}
              totalCount={aggregate.total}
              selectedConcept={isPremium && popupFromRadial ? popupCurrentName : null}
              flashRadial={flashRadial}
              onConceptClick={name => {
                const idx = allConcepts.findIndex(c => c.name.toLowerCase() === name.toLowerCase())
                openDashboard(toRefs(allConcepts), null, 'entire-syllabus', idx === -1 ? 0 : idx, { circular: true, fromRadial: true })
              }}
            />

            <Button
              variant="outline"
              onClick={() => {
                if (isPremium) {
                  const hasStudyPlan = studyPlanConceptsForModal.length > 0
                  openDashboard(
                    toRefs(allConcepts),
                    hasStudyPlan ? toRefs(studyPlanConceptsForModal) : null,
                    hasStudyPlan ? 'study-plan' : 'entire-syllabus',
                    0,
                  )
                } else {
                  openDashboard(toRefs(allConcepts), null, 'entire-syllabus', 0)
                }
              }}
              disabled={allConcepts.length === 0}
              className="gap-3 text-base w-full h-auto py-4"
            >
              <BookOpen className="h-5 w-5" />
              Read concepts
            </Button>

            {/* Topics mastered collapsible */}
            <div className="border-t pt-3 space-y-2">
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
                        {isPremium ? aggregate.level3 : 0}
                        <span className="text-muted-foreground font-normal">/{aggregate.total}</span>
                        <span className="text-muted-foreground font-normal ml-1.5">({isPremium ? aggregate.strongPct : 0}%)</span>
                      </span>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${topicsMasteredOpen ? '' : '-rotate-90'}`} />
                    </div>
                  </div>
                  {isPremium ? (
                    <div className="h-2 rounded-full bg-secondary overflow-hidden flex">
                      <div className="h-full transition-all" style={{ width: `${aggregate.strongPct}%`, backgroundColor: 'rgba(34, 197, 94, 1)' }} />
                      <div className="h-full transition-all" style={{ width: `${level2Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.55)' }} />
                      <div className="h-full transition-all" style={{ width: `${level1Pct}%`, backgroundColor: 'rgba(34, 197, 94, 0.25)' }} />
                    </div>
                  ) : (
                    <div className="h-2 rounded-full bg-secondary overflow-hidden" />
                  )}
                </div>
              </button>

              {topicsMasteredOpen && (
                <div className="max-h-80 overflow-y-auto" ref={topicsMasteredContainerRef}>
                  <StudyPlanTracker
                    syllabus={syllabus}
                    masteryRecords={masteryRecords}
                    studyPlan={isPremium ? plan : null}
                    allConceptsForNav={allConcepts}
                    onConceptSelect={concept => openDashboard(toRefs(allConcepts), null, 'entire-syllabus', concept.index)}
                    openTopics={openTopics}
                    onToggle={toggleTopic}
                    flashingConcept={isPremium ? flashingConcept : undefined}
                    showMastery={isPremium ? undefined : false}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>{/* end bento grid */}

      {showConfig && (
        <StudyPlanConfigModal
          config={config}
          examDate={examDate}
          examLabel={syllabus.examLabel}
          examId={wikiExamIdToProgressKey(syllabus.examId)}
          initialStep={configInitialStep}
          isPremium={isPremium}
          onSave={next => {
            onConfigChange(next)
            onRegenerate()
          }}
          onExamDateChange={onExamDateChange}
          onClose={() => setShowConfig(false)}
        />
      )}
      <StudyPlanInfoPanel open={showInfo} onClose={() => setShowInfo(false)} />
      <HeatmapInfoPanel open={showHeatmapInfo} onClose={() => setShowHeatmapInfo(false)} />
      <DailyBonusInfoPanel open={showBonusInfo} onClose={() => setShowBonusInfo(false)} />

      {/* Session completion overlay */}
      {viewingSession && (
        <SessionCompletionOverlay
          session={viewingSession}
          isLoggedIn={!!user}
          onClose={() => {
            setViewingSession(null)
            requestAnimationFrame(() => window.scrollTo({ top: savedScrollY.current, behavior: 'instant' }))
          }}
        />
      )}
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
