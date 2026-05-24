import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Loader2, Lock } from 'lucide-react'
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

const SIZE = 160
const CX = SIZE / 2
const CY = SIZE / 2
const OUTER_R = 68
const INNER_R = 44
const GAP_DEG = 3

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
  const linked = new Set(questionIndices)
  const segDeg = 360 / totalQ

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
      {Array.from({ length: totalQ }, (_, i) => {
        const startDeg = i * segDeg + GAP_DEG / 2
        const endDeg = (i + 1) * segDeg - GAP_DEG / 2
        const isLinked = linked.has(i)
        const fill = isLinked
          ? outcomes[i] ? '#22c55e' : '#ef4444'
          : 'currentColor'
        const opacity = isLinked ? 0.9 : 0.12
        return (
          <path
            key={i}
            d={arcPath(startDeg, endDeg, OUTER_R, INNER_R)}
            fill={fill}
            opacity={opacity}
          />
        )
      })}
      {/* Center label */}
      <text x={CX} y={CY - 5} textAnchor="middle" fontSize={18} fontWeight="bold" fill="currentColor">
        {questionIndices.filter(i => outcomes[i]).length}/{questionIndices.length}
      </text>
      <text x={CX} y={CY + 14} textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.5}>
        correct
      </text>
    </svg>
  )
}

// ─── Learning Progress tab (isolated so hook call is unconditional) ────────────

function LearningProgressTab({ conceptName }: { conceptName: string }) {
  const { levelEvents, attemptDots, currentLevel, loading, error } = useConceptLearningHistory(conceptName)
  const [hoveredLevel, setHoveredLevel] = useState<MasteryState | null>(null)

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-6 justify-center">
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
      <div className="text-center py-8 text-muted-foreground text-sm">
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
        <span className="text-muted-foreground">{hoveredLevel ? 'Level at time' : 'Current level'}</span>
        <span className="font-semibold">{LEVEL_LABELS[displayLevel]}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          Incorrect
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

// ─── Premium gate wrapper ─────────────────────────────────────────────────────

function LearningProgressGated({ conceptName }: { conceptName: string }) {
  const { isPremium, isBetaTester, loading } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-6 justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  if (!isPremium && !isBetaTester) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
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

// ─── Expandable concept row ───────────────────────────────────────────────────

type Tab = 'quiz' | 'history'

function ConceptRow({
  stat,
  outcomes,
  totalQ,
  isExpanded,
  onToggle,
  isLoggedIn,
}: {
  stat: ConceptStat
  outcomes: boolean[]
  totalQ: number
  isExpanded: boolean
  onToggle: () => void
  isLoggedIn: boolean
}) {
  const [tab, setTab] = useState<Tab>('quiz')
  const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Row header */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-muted/40 transition-colors text-left"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${isExpanded ? '' : '-rotate-90'}`}
        />
        <span className="flex-1 text-sm font-medium truncate min-w-0">{stat.name}</span>
        <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
          {stat.correct}/{stat.total}
        </span>
      </button>

      {/* Progress bar */}
      <div className="h-1.5 bg-secondary mx-3 rounded-full overflow-hidden mb-0.5">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? '#22c55e' : pct >= 50 ? '#84cc16' : '#ef4444',
          }}
        />
      </div>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="border-t">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setTab('quiz')}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${tab === 'quiz' ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Quiz Coverage
            </button>
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => setTab('history')}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${tab === 'history' ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Learning Progress
              </button>
            )}
          </div>

          <div className="p-3">
            {tab === 'quiz' ? (
              <div className="flex flex-col items-center gap-3 py-2">
                <QuizCoverageRadial
                  totalQ={totalQ}
                  questionIndices={stat.questionIndices}
                  outcomes={outcomes}
                />
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                    Correct
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                    Incorrect
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
                    Other question
                  </span>
                </div>
              </div>
            ) : (
              <LearningProgressGated conceptName={stat.name} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface ConceptCoverageSectionProps {
  questions: Question[]
  responses: Record<string, Response>
  isLoggedIn: boolean
}

export function ConceptCoverageSection({ questions, responses, isLoggedIn }: ConceptCoverageSectionProps) {
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null)

  const stats = buildConceptStats(questions, responses)
  const outcomes = questions.map(q => responses[q.id]?.chosen === q.answer)

  if (stats.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Concept Coverage</h2>
      <div className="space-y-2">
        {stats.map(stat => (
          <ConceptRow
            key={stat.name}
            stat={stat}
            outcomes={outcomes}
            totalQ={questions.length}
            isExpanded={expandedConcept === stat.name}
            onToggle={() => setExpandedConcept(prev => prev === stat.name ? null : stat.name)}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  )
}
