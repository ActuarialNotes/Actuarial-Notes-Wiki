import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gem, LayoutDashboard, XCircle } from 'lucide-react'
import { hrefToEntryRef } from '@/lib/wikiRoutes'
import { Button } from '@/components/ui/button'
import { isAnswerCorrect, normalizeAnswerText } from '@/lib/parser'
import type { Question, SelfGrade } from '@/lib/parser'

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
  conceptsLevelledUp?: number
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
  outcomes: boolean[],
): ConceptStat[] {
  const map = new Map<string, ConceptStat>()
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    const isCorrect = outcomes[i] ?? false
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
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0',
        isSelected
          ? 'bg-foreground text-background shadow-sm'
          : 'bg-muted/40 text-foreground hover:bg-muted/70',
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

interface ConceptCoverageSectionProps {
  questions: Question[]
  responses: Record<string, Response>
  score: ScoreSummary
  selectedQuestion: number | null
  onQuestionSelect: (idx: number | null) => void
  manualGrades?: Record<string, SelfGrade>
  onReviewIncorrect?: () => void
}

export function effectiveOutcome(q: Question, chosen: string | null | undefined, manualGrades: Record<string, SelfGrade>): boolean {
  if (chosen == null) return false
  if (q.type === 'free-entry') {
    const override = manualGrades[q.id]
    if (override !== undefined) return override === 'correct'
    return isAnswerCorrect(q, chosen)
  }
  if (q.type === 'multi-part') {
    try {
      const parts = q.parts ?? []
      const gradedParts = parts.filter(p => p.answer !== '')
      if (gradedParts.length === 0) return true
      const chosenParts = JSON.parse(chosen) as Record<string, string>
      return gradedParts.every(part => {
        const override = manualGrades[`${q.id}__${part.label}`]
        if (override !== undefined) return override === 'correct'
        const partChosen = chosenParts[part.label] ?? ''
        if (part.type === 'multiple-choice') return partChosen === part.answer
        return normalizeAnswerText(partChosen) === normalizeAnswerText(part.answer)
      })
    } catch {
      return false
    }
  }
  return isAnswerCorrect(q, chosen)
}

export function ConceptCoverageSection({
  questions,
  responses,
  score,
  selectedQuestion,
  onQuestionSelect,
  manualGrades = {},
  onReviewIncorrect,
}: ConceptCoverageSectionProps) {
  const navigate = useNavigate()
  const outcomes = questions.map(q => effectiveOutcome(q, responses[q.id]?.chosen, manualGrades))
  const stats = buildConceptStats(questions, outcomes)
  const hasIncorrect = outcomes.some(o => !o)

  const [selectedName, setSelectedName] = useState<string | null>(null)

  const selected = selectedName !== null ? (stats.find(s => s.name === selectedName) ?? null) : null

  // Score header colors
  const pctColor =
    score.percentage >= 70 ? 'text-green-500' :
    score.percentage >= 50 ? 'text-amber-500' :
    'text-red-500'

  return (
    <div className="space-y-4">

      {/* ── Quiz complete card: score summary ─────────────────────── */}
      <div className="rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-4">
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
            {score.conceptsLevelledUp !== undefined && score.conceptsLevelledUp > 0 && (
              <div>
                <span className="text-2xl font-bold tabular-nums">{score.conceptsLevelledUp}</span>
                <p className="text-xs text-muted-foreground mt-0.5">Concepts levelled up</p>
              </div>
            )}
          </div>

          {/* Sign-in prompt */}
          {!score.isLoggedIn && (
            <div className="mt-4 rounded-lg bg-muted/40 px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <span className="text-muted-foreground">Sign in to save your results and track progress</span>
              <Button size="sm" variant="outline" onClick={score.onSignIn}>
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Actions card: go to dashboard + review incorrect ──────── */}
      {(score.isLoggedIn || (onReviewIncorrect && hasIncorrect)) && (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="p-4 flex gap-3">
            {score.isLoggedIn && (
              <Button
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="flex-1 gap-2.5 text-base h-auto py-4"
              >
                <LayoutDashboard className="h-5 w-5" />
                Go to Dashboard
              </Button>
            )}
            {onReviewIncorrect && hasIncorrect && (
              <button
                type="button"
                onClick={onReviewIncorrect}
                className="flex-1 flex items-center justify-center gap-2.5 px-4 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 text-base font-semibold transition-all active:scale-[0.97]"
              >
                <XCircle className="h-5 w-5" />
                Review Incorrect
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Quiz coverage card: graph + concept chips ─────────────── */}
      {stats.length > 0 && (
        <div className="rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quiz Coverage
            </p>
          </div>

          <div className="p-4">
            <QuizCoverageRadial
              key={selectedName ?? '__all__'}
              totalQ={questions.length}
              questionIndices={selected ? selected.questionIndices : questions.map((_, i) => i)}
              outcomes={outcomes}
              selectedQuestion={selectedQuestion}
              onQuestionClick={onQuestionSelect}
            />
          </div>

          <div className="px-5 py-3">
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
        </div>
      )}
    </div>
  )
}
