import { useMemo, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, BookOpen, Check, CheckCircle2, ChevronDown, Circle, Play, Loader2, Settings2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import { StudyPlanConfigModal } from '@/components/StudyPlanConfigModal'
import { ConceptScheduleBadge } from '@/components/TopicProgressSection'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { aggregateForTopic, decayIfStale } from '@/lib/mastery'
import { computeReadiness, type SectionReadiness } from '@/lib/readiness'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { todayISO, type StudyPlan, type StudyPlanConfig } from '@/lib/studyPlan'
import { readTodayLevelUps, LEVELUP_EVENT, type DailyLevelUp } from '@/lib/dailyProgressStore'

// ── Radial donut chart ─────────────────────────────────────────────────────────
//
// Each section occupies an arc proportional to its syllabus weight.
// The arc's opacity encodes readiness: 0.12 (0%) → 1.0 (100%).
// A 2-degree gap separates adjacent arcs for clarity, including the wrap-around.

const CX = 80
const CY = 80
const R_OUTER = 66
const R_INNER = 44
const GAP_DEG = 2

function degreesToRadians(deg: number) { return (deg * Math.PI) / 180 }

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const a = degreesToRadians(angleDeg - 90) // start at 12 o'clock
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
      // Apply gap uniformly to all arcs (including first and last) so the
      // wrap-around boundary between the last and first section has a gap too.
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
        {/* Track ring */}
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

      {/* Centre label */}
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

// ── Helpers ────────────────────────────────────────────────────────────────────

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
}: {
  syllabus: WikiExamSyllabus
  masteryRecords: ConceptMasteryRecord[]
  studyPlan?: StudyPlan | null
  allConceptsForNav: { name: string; state: MasteryState }[]
  onConceptSelect: (concept: { name: string; state: MasteryState; index: number }) => void
}) {
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set())
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

  const toggle = (name: string) =>
    setOpenTopics(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <div className="space-y-1">
      {syllabus.topics.map(topic => {
        const conceptSlugs = topic.concepts.map(c => c.name)
        const agg = aggregateForTopic(normalizedMastery, conceptSlugs, now)
        const isOpen = openTopics.has(topic.name)
        return (
          <div key={topic.name}>
            <button
              className="flex items-center gap-2 w-full py-2 text-left hover:bg-muted/40 rounded-md px-1 -mx-1 transition-colors"
              onClick={() => toggle(topic.name)}
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
  plan: StudyPlan | null
  masteryStateByName: Map<string, MasteryState>
  config: StudyPlanConfig
  loading: boolean
  examDate: string | null
  onConfigChange: (next: Partial<StudyPlanConfig>) => void
  onRegenerate: () => void
  onExamDateChange?: (date: string | null) => void
}

export function ReadinessCard({
  syllabus, masteryRecords, plan, masteryStateByName,
  config, loading, examDate, onConfigChange, onRegenerate, onExamDateChange,
}: Props) {
  const navigate = useNavigate()
  const [conceptModalOpen, setConceptModalOpen] = useState(false)
  const [selectedConceptIdx, setSelectedConceptIdx] = useState<number | null>(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [pinnedSection, setPinnedSection] = useState<number | null>(null)
  const [completedToday, setCompletedToday] = useState<DailyLevelUp[]>([])
  const [planExpanded, setPlanExpanded] = useState(false)
  const [trackerConcept, setTrackerConcept] = useState<{ name: string; state: MasteryState; index: number } | null>(null)
  const [showConfig, setShowConfig] = useState(false)

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

  const examRecords = useMemo(
    () => masteryRecords.filter(r => r.exam_id === progressKey),
    [masteryRecords, progressKey],
  )

  const { overallPct, sections } = useMemo(
    () => computeReadiness(syllabus, examRecords, now),
    [syllabus, examRecords, now],
  )

  // Progress bar aggregate (same computation as ActiveExamCard)
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

  // Derive today's concepts and upcoming concepts for the active section
  const activeSectionInfo = useMemo(() => {
    if (activeSection === null || !sections[activeSection]) return null
    const sectionName = sections[activeSection].name
    const topic = syllabus.topics.find(t => t.name === sectionName)
    if (!topic) return null
    const conceptSet = new Set(topic.concepts.map(c => c.name.toLowerCase()))

    const displayConcepts = plan?.status === 'review_mode'
      ? (plan?.reviewConcepts ?? [])
      : (plan?.todaysConcepts ?? [])

    const today = displayConcepts.filter(n => conceptSet.has(n.toLowerCase()))

    const todayDate = todayISO()
    const seen = new Set(today.map(n => n.toLowerCase()))
    const upcoming: string[] = []
    for (const a of plan?.assignments ?? []) {
      if (a.scheduledDate <= todayDate) continue
      if (!conceptSet.has(a.conceptName.toLowerCase())) continue
      if (seen.has(a.conceptName.toLowerCase())) continue
      seen.add(a.conceptName.toLowerCase())
      upcoming.push(a.conceptName)
      if (upcoming.length >= 3) break
    }
    return { sectionName, today, upcoming }
  }, [activeSection, sections, syllabus, plan])

  // Today's checklist concepts
  const displayConcepts = plan?.status === 'review_mode'
    ? (plan?.reviewConcepts ?? [])
    : (plan?.todaysConcepts ?? [])

  const targetByName = useMemo(() => {
    const map = new Map<string, MasteryState>()
    if (!plan) return map
    const today = todayISO()
    for (const a of plan.assignments) {
      if (a.scheduledDate === today) {
        const target = NEXT_STATE[a.initialState] ?? 'level1'
        const existing = map.get(a.conceptName.toLowerCase())
        if (!existing || STATE_ORDER[target] > STATE_ORDER[existing]) {
          map.set(a.conceptName.toLowerCase(), target)
        }
      }
    }
    return map
  }, [plan])

  const studyPlanConceptsForModal = useMemo(() =>
    displayConcepts.map(name => ({
      name,
      state: masteryStateByName.get(name.toLowerCase()) ?? 'new' as MasteryState,
    })),
    [displayConcepts, masteryStateByName]
  )

  function handleSectionHover(i: number | null) {
    setHoveredSection(i)
  }

  function handleSectionClick(i: number) {
    setPinnedSection(prev => (prev === i ? null : i))
  }

  // Start quiz filtered to today's concepts (same logic as TodayCard)
  const handleStartQuiz = useCallback(async () => {
    const displayConcepts = plan?.status === 'review_mode'
      ? (plan?.reviewConcepts ?? [])
      : (plan?.todaysConcepts ?? [])

    if (!plan || displayConcepts.length === 0) {
      navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
      return
    }

    setQuizLoading(true)
    try {
      const raw = await fetchAllQuestions()
      const all = parseAllQuestions(raw)

      const todaySet = new Set(displayConcepts.map(n => n.toLowerCase()))

      function linkToName(link: string): string {
        const ref = hrefToEntryRef(link)
        const r = ref?.name ?? link.split('/').filter(Boolean).pop() ?? ''
        return r.replace(/-/g, ' ').toLowerCase()
      }

      const filtered = all.filter(q => {
        const names = q.wiki_link.map(linkToName)
        if (!names.some(n => todaySet.has(n))) return false
        return !names.some(n => {
          if (todaySet.has(n)) return false
          return STATE_ORDER[masteryStateByName.get(n) ?? 'new'] < 1
        })
      })

      if (filtered.length === 0) {
        navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
        return
      }

      const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
      function conceptGroup(q: { wiki_link: string[] }): number {
        for (const link of q.wiki_link) {
          const n = linkToName(link)
          if (!todaySet.has(n)) continue
          const s = masteryStateByName.get(n) ?? 'new'
          if (s === 'forgotten') return 0
          if (s === 'new')       return 1
          return 2
        }
        return 2
      }
      filtered.sort((a, b) => {
        const gd = conceptGroup(a) - conceptGroup(b)
        return gd !== 0 ? gd : (diffOrder[a.difficulty] ?? 1) - (diffOrder[b.difficulty] ?? 1)
      })

      const ids = filtered.map(q => q.id).join(',')
      navigate(`/quiz?ids=${ids}`)
    } catch {
      navigate(`/?topic=${encodeURIComponent(syllabus.examTopic)}`)
    } finally {
      setQuizLoading(false)
    }
  }, [plan, navigate, syllabus.examTopic, masteryStateByName])

  return (
    <>
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
                onClick={() => setShowConfig(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Study plan settings"
                title="Study plan settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Topics mastered progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">Topics mastered</span>
              <span className="font-semibold">
                {aggregate.level3}
                <span className="text-muted-foreground font-normal">/{aggregate.total}</span>
                <span className="text-muted-foreground font-normal ml-1.5">({aggregate.strongPct}%)</span>
              </span>
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

          {/* Body: score + donut + legend */}
          <div className="flex items-center gap-6">
            {/* Overall score */}
            <div className="flex flex-col items-center justify-center gap-1 shrink-0">
              <span className="text-4xl font-bold tabular-nums leading-none">
                {Math.round(overallPct)}%
              </span>
              <span className="text-xs text-muted-foreground">overall</span>
            </div>

            {/* Radial widget */}
            <ReadinessDonut
              sections={sections}
              overallPct={overallPct}
              activeSection={activeSection}
              onSectionHover={handleSectionHover}
              onSectionClick={handleSectionClick}
            />

            {/* Section legend */}
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

          {/* Today's study plan checklist */}
          {displayConcepts.length > 0 && (
            <div className="space-y-0.5">
              {displayConcepts.map((name, idx) => {
                const isCompleted = completedToday.some(
                  lu => lu.conceptSlug.toLowerCase() === name.toLowerCase()
                )
                const target = targetByName.get(name.toLowerCase()) ?? 'level1'
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedConceptIdx(idx)}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-muted/50 text-left transition-colors"
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
            </div>
          )}

          {/* Warnings */}
          {!loading && plan && (plan.status === 'behind' || plan.status === 'target_passed') && (
            <BehindWarning plan={plan} />
          )}
          {!loading && plan?.status === 'review_mode' && (
            <ReviewModeNote concepts={plan.reviewConcepts ?? []} />
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => setConceptModalOpen(true)}
              disabled={allConcepts.length === 0}
              className="gap-1.5 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Read concepts
            </Button>
            <Button
              onClick={handleStartQuiz}
              disabled={quizLoading}
              className="gap-1.5 text-sm"
            >
              {quizLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Start Quiz
            </Button>
          </div>

          {/* Collapsible full study plan */}
          {plan && (
            <div className="border-t pt-2">
              {planExpanded && (
                <div className="pb-2 pt-1">
                  <StudyPlanTracker
                    syllabus={syllabus}
                    masteryRecords={masteryRecords}
                    studyPlan={plan}
                    allConceptsForNav={allConcepts}
                    onConceptSelect={setTrackerConcept}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setPlanExpanded(v => !v)}
                className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${planExpanded ? 'rotate-180' : ''}`} />
                {planExpanded ? 'Hide study plan' : 'Show study plan'}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* "Read concepts" button opens from the beginning of today's concepts if available */}
      {conceptModalOpen && allConcepts.length > 0 && (
        <ConceptDetailModal
          conceptName={studyPlanConceptsForModal.length > 0 ? studyPlanConceptsForModal[0].name : allConcepts[0].name}
          masteryState={studyPlanConceptsForModal.length > 0 ? studyPlanConceptsForModal[0].state : allConcepts[0].state}
          onClose={() => setConceptModalOpen(false)}
          syllabus={syllabus}
          allConcepts={allConcepts}
          studyPlanConcepts={studyPlanConceptsForModal.length > 0 ? studyPlanConceptsForModal : undefined}
          initialConceptIndex={0}
          initialFilter={studyPlanConceptsForModal.length > 0 ? 'study-plan' : 'entire-syllabus'}
        />
      )}

      {/* Checklist item click — opens at that concept in study plan view */}
      {selectedConceptIdx !== null && studyPlanConceptsForModal.length > 0 && (
        <ConceptDetailModal
          conceptName={studyPlanConceptsForModal[selectedConceptIdx].name}
          masteryState={studyPlanConceptsForModal[selectedConceptIdx].state}
          onClose={() => setSelectedConceptIdx(null)}
          syllabus={syllabus}
          allConcepts={allConcepts}
          studyPlanConcepts={studyPlanConceptsForModal}
          initialConceptIndex={selectedConceptIdx}
          initialFilter="study-plan"
        />
      )}

      {/* Tracker concept click */}
      {trackerConcept && (
        <ConceptDetailModal
          conceptName={trackerConcept.name}
          masteryState={trackerConcept.state}
          onClose={() => setTrackerConcept(null)}
          syllabus={syllabus}
          allConcepts={allConcepts}
          initialConceptIndex={trackerConcept.index}
        />
      )}

      {/* Study plan config */}
      {showConfig && (
        <StudyPlanConfigModal
          config={config}
          examDate={examDate}
          examLabel={syllabus.examLabel}
          examId={wikiExamIdToProgressKey(syllabus.examId)}
          onSave={next => {
            onConfigChange(next)
            onRegenerate()
          }}
          onExamDateChange={onExamDateChange}
          onClose={() => setShowConfig(false)}
        />
      )}
    </>
  )
}
