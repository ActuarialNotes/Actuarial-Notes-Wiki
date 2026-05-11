import { useMemo, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Check, Circle, Play, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConceptDetailModal } from '@/components/ConceptDetailModal'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { ConceptMasteryRecord, MasteryState } from '@/lib/mastery'
import { aggregateForTopic } from '@/lib/mastery'
import { computeReadiness, type SectionReadiness } from '@/lib/readiness'
import { fetchAllQuestions } from '@/lib/github'
import { parseAllQuestions } from '@/lib/parser'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { todayISO, type StudyPlan } from '@/lib/studyPlan'
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
}

export function ReadinessCard({ syllabus, masteryRecords, plan, masteryStateByName }: Props) {
  const navigate = useNavigate()
  const [conceptModalOpen, setConceptModalOpen] = useState(false)
  const [selectedConceptIdx, setSelectedConceptIdx] = useState<number | null>(null)
  const [quizLoading, setQuizLoading] = useState(false)
  // activeSection: set by hover (desktop) or click (touch/toggle)
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [pinnedSection, setPinnedSection] = useState<number | null>(null)
  const [completedToday, setCompletedToday] = useState<DailyLevelUp[]>([])

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
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold truncate">{syllabus.examLabel}</h2>
            <span className="text-sm text-muted-foreground shrink-0">Exam Readiness</span>
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

          {/* Today's concepts panel for active section */}
          {activeSectionInfo && (activeSectionInfo.today.length > 0 || activeSectionInfo.upcoming.length > 0) && (
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-xs space-y-1.5">
              <p className="font-medium text-foreground truncate">{activeSectionInfo.sectionName}</p>
              {activeSectionInfo.today.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Today: </span>
                  <span>{activeSectionInfo.today.join(', ')}</span>
                </div>
              )}
              {activeSectionInfo.upcoming.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Coming up: </span>
                  <span>{activeSectionInfo.upcoming.join(', ')}</span>
                </div>
              )}
            </div>
          )}
          {activeSectionInfo && activeSectionInfo.today.length === 0 && activeSectionInfo.upcoming.length === 0 && (
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
              No concepts scheduled in <span className="font-medium text-foreground">{activeSectionInfo.sectionName}</span> yet.
            </div>
          )}

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
    </>
  )
}
