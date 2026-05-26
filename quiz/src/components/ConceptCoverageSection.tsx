import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gem, Loader2, Lock } from 'lucide-react'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { useConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import { useSubscription } from '@/hooks/useSubscription'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import type { Question } from '@/lib/parser'
import type { MasteryState } from '@/lib/mastery'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Response {
  chosen: string | null
}

interface ConceptStat {
  name: string
  correct: number
  total: number
  questionIndices: number[]
}

export interface ScoreSummary {
  mode: 'quiz' | 'mock-exam'
  percentage: number
  correctCount: number
  totalQuestions: number
  timeTakenSeconds: number | null
  gemsEarned: number
  isLoggedIn: boolean
  onSignIn: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number | null): string {
  if (seconds === null || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
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
  selectedQuestion,
  onQuestionClick,
}: {
  totalQ: number
  questionIndices: number[]
  outcomes: boolean[]
  selectedQuestion: number | null
  onQuestionClick: (idx: number | null) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const linked = new Set(questionIndices)
  const segDeg = 360 / totalQ
  const correctCount = questionIndices.filter(i => outcomes[i]).length

  // active is the segment to label (selected takes priority over hovered)
  const active = selectedQuestion ?? hovered

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="w-full max-w-[220px] cursor-pointer"
        style={{ overflow: 'visible' }}
      >
        {Array.from({ length: totalQ }, (_, i) => {
          const startDeg = i * segDeg + GAP_DEG / 2
          const endDeg = (i + 1) * segDeg - GAP_DEG / 2
          const isLinked = linked.has(i)
          const isSelected = selectedQuestion === i
          const isHovered = hovered === i

          // Opacity logic: when something is selected, dim everything else
          let opacity: number
          if (selectedQuestion !== null) {
            opacity = isSelected ? 1 : (isLinked ? 0.3 : 0.06)
          } else {
            opacity = isLinked ? (isHovered ? 1 : 0.85) : (isHovered ? 0.22 : 0.1)
          }

          const fill = isLinked
            ? outcomes[i] ? '#22c55e' : '#ef4444'
            : 'currentColor'

          return (
            <g key={i}>
              <path
                d={arcPath(startDeg, endDeg, OUTER_R, INNER_R)}
                fill={fill}
                opacity={opacity}
                style={{ transition: 'opacity 150ms, transform 150ms', transformOrigin: `${CX}px ${CY}px`,
                  transform: isSelected ? 'scale(1.07)' : isHovered ? 'scale(1.03)' : 'scale(1)' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onQuestionClick(selectedQuestion === i ? null : i)}
              />
              {/* White highlight ring on selected segment */}
              {isSelected && (
                <path
                  d={arcPath(startDeg, endDeg, OUTER_R + 3, INNER_R - 3)}
                  fill="none"
                  stroke={outcomes[i] ? '#22c55e' : '#ef4444'}
                  strokeWidth={2.5}
                  opacity={0.7}
                  style={{ transform: 'scale(1.07)', transformOrigin: `${CX}px ${CY}px` }}
                  pointerEvents="none"
                />
              )}
            </g>
          )
        })}

        {/* Q# label outside the active segment */}
        {active !== null && (() => {
          const midDeg = active * segDeg + segDeg / 2
          const midRad = ((midDeg - 90) * Math.PI) / 180
          const labelR = OUTER_R + 16
          const lx = CX + labelR * Math.cos(midRad)
          const ly = CY + labelR * Math.sin(midRad)
          return (
            <text
              x={lx} y={ly + 4}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              fontWeight="700"
              opacity={0.9}
              pointerEvents="none"
            >
              Q{active + 1}
            </text>
          )
        })()}

        {/* Center: show selected question outcome, or overall score */}
        {selectedQuestion !== null ? (
          <>
            <text x={CX} y={CY - 10} textAnchor="middle" fontSize={13} fill="currentColor" opacity={0.5}>
              Q{selectedQuestion + 1}
            </text>
            <text
              x={CX} y={CY + 16}
              textAnchor="middle"
              fontSize={22}
              fontWeight="bold"
              fill={outcomes[selectedQuestion] ? '#22c55e' : '#ef4444'}
            >
              {outcomes[selectedQuestion] ? '✓' : '✗'}
            </text>
          </>
        ) : (
          <>
            <text x={CX} y={CY - 8} textAnchor="middle" fontSize={26} fontWeight="bold" fill="currentColor">
              {correctCount}/{questionIndices.length}
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fontSize={11} fill="currentColor" opacity={0.5}>
              correct
            </text>
          </>
        )}
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

      {selectedQuestion !== null && (
        <p className="text-xs text-muted-foreground">
          Click again to deselect · scroll down to see the question
        </p>
      )}
    </div>
  )
}

// ─── Learning Progress tab ────────────────────────────────────────────────────

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
  score: ScoreSummary
  selectedQuestion: number | null
  onQuestionSelect: (idx: number | null) => void
}

export function ConceptCoverageSection({
  questions,
  responses,
  isLoggedIn,
  score,
  selectedQuestion,
  onQuestionSelect,
}: ConceptCoverageSectionProps) {
  const stats = buildConceptStats(questions, responses)
  const outcomes = questions.map(q => responses[q.id]?.chosen === q.answer)

  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('quiz')

  const selected = selectedName !== null ? (stats.find(s => s.name === selectedName) ?? null) : null

  // Score header colors
  const pctColor =
    score.percentage >= 70 ? 'text-green-500' :
    score.percentage >= 50 ? 'text-amber-500' :
    'text-red-500'

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">

      {/* ── Score summary header ─────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4 border-b">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">
              {score.mode === 'mock-exam' ? 'Mock Exam Complete' : 'Quiz Complete'}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Here are your results</p>
          </div>
          <div className={`text-4xl font-black tabular-nums leading-none ${pctColor}`}>
            {score.percentage}%
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-4">
          <div>
            <span className="text-2xl font-bold tabular-nums">{score.correctCount}</span>
            <span className="text-lg text-muted-foreground">/{score.totalQuestions}</span>
            <p className="text-xs text-muted-foreground mt-0.5">Correct</p>
          </div>
          <div>
            <span className="text-2xl font-bold tabular-nums">{formatTime(score.timeTakenSeconds)}</span>
            <p className="text-xs text-muted-foreground mt-0.5">Time</p>
          </div>
          {score.isLoggedIn && score.gemsEarned > 0 && (
            <div>
              <span className="text-2xl font-bold tabular-nums text-emerald-500 inline-flex items-center gap-1">
                +{score.gemsEarned} <Gem className="h-5 w-5" />
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">Gems earned</p>
            </div>
          )}
        </div>

        {/* Sign-in prompt */}
        {!score.isLoggedIn && (
          <div className="mt-4 rounded-lg border bg-muted/40 px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <span className="text-muted-foreground">Sign in to save your results and track progress</span>
            <Button size="sm" variant="outline" onClick={score.onSignIn}>
              Sign In
            </Button>
          </div>
        )}
      </div>

      {/* ── Concept chip selector ────────────────────────────────── */}
      {stats.length > 0 && (
        <div className="px-5 py-3 border-b">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Concept Coverage
          </p>
          <div className="flex flex-wrap gap-2">
            {stats.map(stat => (
              <ConceptChip
                key={stat.name}
                stat={stat}
                isSelected={stat.name === selectedName}
                onSelect={() => setSelectedName(selectedName === stat.name ? null : stat.name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Graph panel with tabs ────────────────────────────────── */}
      {stats.length > 0 && (
        <>
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

          <div className="p-4">
            {tab === 'quiz' ? (
              <QuizCoverageRadial
                key={selectedName ?? '__all__'}
                totalQ={questions.length}
                questionIndices={selected ? selected.questionIndices : questions.map((_, i) => i)}
                outcomes={outcomes}
                selectedQuestion={selectedQuestion}
                onQuestionClick={onQuestionSelect}
              />
            ) : (
              <LearningProgressGated
                key={selectedName ?? stats[0]?.name}
                conceptName={selected?.name ?? stats[0]?.name ?? ''}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
