import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Lock } from 'lucide-react'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { buttonVariants } from '@/components/ui/button'
import { useConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import { useSubscription } from '@/hooks/useSubscription'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import type { Question } from '@/lib/parser'
import type { MasteryState } from '@/lib/mastery'

interface Response {
  chosen: string | null
}

interface ConceptStat {
  name: string
  correct: number
  total: number
  questionIndices: number[]
}

function resolveConceptName(link: string): string | null {
  const ref = hrefToEntryRef(link)
  if (ref?.kind === 'concept' && ref.name) return ref.name
  const last = link.split('/').filter(Boolean).pop()
  return last ? last.replace(/-/g, ' ') : null
}

function buildConceptStats(
  questions: Question[],
  responses: Record<string, Response>,
): ConceptStat[] {
  const map = new Map<string, ConceptStat>()
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    const isCorrect = responses[q.id]?.chosen === q.answer
    const names = new Set<string>()
    for (const link of q.wiki_link) {
      const name = resolveConceptName(link)
      if (name) names.add(name)
    }
    for (const name of names) {
      const key = name.toLowerCase()
      if (!map.has(key)) {
        map.set(key, { name, correct: 0, total: 0, questionIndices: [] })
      }
      const stat = map.get(key)!
      stat.total += 1
      if (isCorrect) stat.correct += 1
      stat.questionIndices.push(i)
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name))
}

// ─── Radial quiz coverage chart ───────────────────────────────────────────────

const VB = 240
const CX = VB / 2
const CY = VB / 2
const OUTER_R = 100
const INNER_R = 64
const GAP_DEG = 4

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

function arcPath(startDeg: number, endDeg: number, outerR: number, innerR: number) {
  const s1 = polarToXY(startDeg, outerR)
  const e1 = polarToXY(endDeg, outerR)
  const s2 = polarToXY(endDeg, innerR)
  const e2 = polarToXY(startDeg, innerR)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ')
}

function QuizCoverageRadial({
  totalQ,
  questionIndices,
  outcomes,
}: {
  totalQ: number
  questionIndices: number[]
  outcomes: boolean[]
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const linked = new Set(questionIndices)
  const segDeg = 360 / totalQ
  const correctCount = questionIndices.filter(i => outcomes[i]).length

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="w-full max-w-[220px]"
        style={{ overflow: 'visible' }}
      >
        {Array.from({ length: totalQ }, (_, i) => {
          const startDeg = i * segDeg + GAP_DEG / 2
          const endDeg = (i + 1) * segDeg - GAP_DEG / 2
          const isLinked = linked.has(i)
          const isHovered = hovered === i
          const fill = isLinked
            ? outcomes[i] ? '#22c55e' : '#ef4444'
            : 'currentColor'
          const opacity = isLinked ? (isHovered ? 1 : 0.85) : (isHovered ? 0.25 : 0.1)
          const scale = isHovered ? 1.04 : 1
          const midDeg = (startDeg + endDeg) / 2
          const midRad = ((midDeg - 90) * Math.PI) / 180
          const ox = CX + (OUTER_R + INNER_R) / 2 * Math.cos(midRad) * (scale - 1)
          const oy = CY + (OUTER_R + INNER_R) / 2 * Math.sin(midRad) * (scale - 1)

          return (
            <path
              key={i}
              d={arcPath(startDeg, endDeg, OUTER_R, INNER_R)}
              fill={fill}
              opacity={opacity}
              style={{ transform: isHovered ? `translate(${ox * 0}px, ${oy * 0}px) scale(${scale})` : undefined, transformOrigin: `${CX}px ${CY}px`, transition: 'opacity 120ms, transform 120ms' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}

        {/* Hover tooltip: Q# label near arc */}
        {hovered !== null && (() => {
          const midDeg = (hovered * segDeg + GAP_DEG / 2 + (hovered + 1) * segDeg - GAP_DEG / 2) / 2
          const midRad = ((midDeg - 90) * Math.PI) / 180
          const labelR = OUTER_R + 14
          const lx = CX + labelR * Math.cos(midRad)
          const ly = CY + labelR * Math.sin(midRad)
          return (
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize={10} fill="currentColor" fontWeight="600">
              Q{hovered + 1}
            </text>
          )
        })()}

        {/* Center label */}
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize={26} fontWeight="bold" fill="currentColor">
          {correctCount}/{questionIndices.length}
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.5}>
          correct
        </text>
      </svg>

      <div className="flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
          Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          Incorrect
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-foreground/10" />
          Other question
        </span>
      </div>
    </div>
  )
}

// ─── Learning Progress tab (isolated component so hook is always called) ──────

function LearningProgressTab({ conceptName }: { conceptName: string }) {
  const { levelEvents, attemptDots, currentLevel, loading, error } = useConceptLearningHistory(conceptName)
  const [hoveredLevel, setHoveredLevel] = useState<MasteryState | null>(null)

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-10 justify-center">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading history…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}
      </div>
    )
  }

  const isEmpty = levelEvents.length === 0 && attemptDots.length === 0
  if (isEmpty) {
    return (
      <div className="text-center py-10 text-muted-foreground text-sm">
        No prior history for this concept yet.
      </div>
    )
  }

  const displayLevel = hoveredLevel ?? currentLevel
  const LEVEL_LABELS: Record<MasteryState, string> = {
    new: 'New', level1: 'Level 1', level2: 'Level 2', level3: 'Level 3', forgotten: 'Forgotten',
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{hoveredLevel ? 'Level at selected time' : 'Current level'}</span>
        <span className="font-semibold">{LEVEL_LABELS[displayLevel]}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Correct attempt
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          Incorrect attempt
        </span>
      </div>
      <div className="rounded-lg border bg-muted/30 p-2">
        <ProgressGraph levelEvents={levelEvents} attemptDots={attemptDots} onHoverLevel={setHoveredLevel} />
      </div>
      <p className="text-[10px] text-muted-foreground text-center">
        Hover the graph to explore your level at any point in time
      </p>
    </div>
  )
}

function LearningProgressGated({ conceptName }: { conceptName: string }) {
  const { isPremium, isBetaTester, loading } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-10 justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  if (!isPremium && !isBetaTester) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm">Learning Progress</p>
          <p className="text-xs text-muted-foreground mt-0.5">Track your mastery journey over time</p>
        </div>
        <Link to="/upgrade" className={buttonVariants({ size: 'sm' })}>
          Upgrade to Premium
        </Link>
      </div>
    )
  }

  return <LearningProgressTab conceptName={conceptName} />
}

// ─── Concept chip / tag ───────────────────────────────────────────────────────

function ConceptChip({
  stat,
  isSelected,
  onSelect,
}: {
  stat: ConceptStat
  isSelected: boolean
  onSelect: () => void
}) {
  const pct = stat.total > 0 ? stat.correct / stat.total : 0
  const dotColor = pct === 1 ? '#22c55e' : pct >= 0.5 ? '#84cc16' : '#ef4444'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shrink-0',
        isSelected
          ? 'bg-foreground text-background border-foreground shadow-sm'
          : 'bg-muted/40 text-foreground border-border hover:border-foreground/40 hover:bg-muted/70',
      ].join(' ')}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: isSelected ? 'currentColor' : dotColor }}
      />
      {stat.name}
      <span className={`tabular-nums ${isSelected ? 'opacity-70' : 'text-muted-foreground'}`}>
        {stat.correct}/{stat.total}
      </span>
    </button>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

type Tab = 'quiz' | 'history'

interface ConceptCoverageSectionProps {
  questions: Question[]
  responses: Record<string, Response>
  isLoggedIn: boolean
}

export function ConceptCoverageSection({ questions, responses, isLoggedIn }: ConceptCoverageSectionProps) {
  const stats = buildConceptStats(questions, responses)
  const outcomes = questions.map(q => responses[q.id]?.chosen === q.answer)

  const [selectedName, setSelectedName] = useState<string>(() => stats[0]?.name ?? '')
  const [tab, setTab] = useState<Tab>('quiz')

  if (stats.length === 0) return null

  const selected = stats.find(s => s.name === selectedName) ?? stats[0]

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Concept Coverage</h2>

      {/* Concept chip selector */}
      <div className="flex flex-wrap gap-2">
        {stats.map(stat => (
          <ConceptChip
            key={stat.name}
            stat={stat}
            isSelected={stat.name === selected.name}
            onSelect={() => setSelectedName(stat.name)}
          />
        ))}
      </div>

      {/* Single graph panel */}
      <div className="rounded-xl border overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setTab('quiz')}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${tab === 'quiz' ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Quiz Coverage
          </button>
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => setTab('history')}
              className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${tab === 'history' ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Learning Progress
            </button>
          )}
        </div>

        {/* Graph area */}
        <div className="p-4">
          {tab === 'quiz' ? (
            <QuizCoverageRadial
              key={selected.name}
              totalQ={questions.length}
              questionIndices={selected.questionIndices}
              outcomes={outcomes}
            />
          ) : (
            <LearningProgressGated key={selected.name} conceptName={selected.name} />
          )}
        </div>
      </div>
    </div>
  )
}
