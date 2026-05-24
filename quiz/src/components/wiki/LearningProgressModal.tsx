import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Loader2, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import type { LevelEvent, AttemptDot } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'

// ─── Constants ────────────────────────────────────────────────────────────────

const VB_W = 500
const VB_H = 180
const PAD_LEFT = 42
const PAD_RIGHT = 16
const PAD_TOP = 16
const PAD_BOTTOM = 30
const CHART_W = VB_W - PAD_LEFT - PAD_RIGHT
const CHART_H = VB_H - PAD_TOP - PAD_BOTTOM

const Y_LEVELS: MasteryState[] = ['new', 'level1', 'level2', 'level3']
const Y_LABELS = ['New', '1', '2', '3']

const LEVEL_COLORS: Record<MasteryState, string> = {
  new: 'text-muted-foreground bg-muted',
  level1: 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300',
  level2: 'bg-green-200 text-green-800 dark:bg-green-900/60 dark:text-green-200',
  level3: 'bg-green-400 text-green-950 dark:bg-green-800 dark:text-green-100',
  forgotten: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300',
}

const LEVEL_LABELS: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Level 1',
  level2: 'Level 2',
  level3: 'Level 3',
  forgotten: 'Forgotten',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stateToYIndex(state: MasteryState): number {
  switch (state) {
    case 'level3':   return 3
    case 'level2':   return 2
    case 'level1':   return 1
    case 'forgotten': return 0
    default:          return 0
  }
}

function makeScales(levelEvents: LevelEvent[], attemptDots: AttemptDot[]) {
  const allTimes = [
    ...levelEvents.map(e => e.at.getTime()),
    ...attemptDots.map(d => d.at.getTime()),
  ]
  const now = Date.now()
  const tMin = allTimes.length > 0 ? Math.min(...allTimes) - 12 * 3600_000 : now - 7 * 86400_000
  const tMax = now + 12 * 3600_000

  function xScale(t: Date): number {
    return PAD_LEFT + ((t.getTime() - tMin) / (tMax - tMin)) * CHART_W
  }

  function xInverse(px: number, svgWidth: number): Date {
    const scaledX = (px / svgWidth) * VB_W
    const ratio = (scaledX - PAD_LEFT) / CHART_W
    return new Date(tMin + ratio * (tMax - tMin))
  }

  function yScale(yIndex: number): number {
    return PAD_TOP + CHART_H - (yIndex / 3) * CHART_H
  }

  function buildXLabels(): { label: string; x: number }[] {
    const steps = 4
    const labels: { label: string; x: number }[] = []
    for (let i = 0; i <= steps; i++) {
      const t = new Date(tMin + (i / steps) * (tMax - tMin))
      const x = xScale(t)
      if (x < PAD_LEFT + 10 || x > PAD_LEFT + CHART_W - 10) continue
      labels.push({
        label: t.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        x,
      })
    }
    return labels
  }

  function buildStepPath(): string {
    const startY = yScale(0)
    const startX = xScale(new Date(tMin))
    if (levelEvents.length === 0) {
      return `M ${startX} ${startY} H ${xScale(new Date(tMax))}`
    }
    let d = `M ${startX} ${startY}`
    for (const ev of levelEvents) {
      const x = xScale(ev.at)
      d += ` H ${x} V ${yScale(stateToYIndex(ev.to))}`
    }
    d += ` H ${xScale(new Date(tMax))}`
    return d
  }

  return { xScale, xInverse, yScale, buildXLabels, buildStepPath, tMin, tMax }
}

function levelAtTime(time: Date, levelEvents: LevelEvent[]): MasteryState {
  let state: MasteryState = 'new'
  for (const ev of levelEvents) {
    if (ev.at <= time) state = ev.to
    else break
  }
  return state
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LevelPill({ level }: { level: MasteryState }) {
  return (
    <span className={`inline-flex items-center px-5 py-2 rounded-full text-base font-bold tracking-wide border ${LEVEL_COLORS[level]}`}>
      {LEVEL_LABELS[level]}
    </span>
  )
}

interface GraphProps {
  levelEvents: LevelEvent[]
  attemptDots: AttemptDot[]
  onHoverLevel: (level: MasteryState | null) => void
}

function ProgressGraph({ levelEvents, attemptDots, onHoverLevel }: GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursorX, setCursorX] = useState<number | null>(null)
  const { xScale, xInverse, yScale, buildXLabels, buildStepPath } = makeScales(levelEvents, attemptDots)

  function getHoveredLevel(clientX: number): MasteryState {
    const rect = svgRef.current!.getBoundingClientRect()
    const time = xInverse(clientX - rect.left, rect.width)
    return levelAtTime(time, levelEvents)
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current!.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * VB_W
    setCursorX(svgX)
    onHoverLevel(getHoveredLevel(e.clientX))
  }

  function handleMouseLeave() {
    setCursorX(null)
    onHoverLevel(null)
  }

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    onHoverLevel(getHoveredLevel(e.clientX))
  }

  const xLabels = buildXLabels()
  const stepPath = buildStepPath()

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="w-full cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Grid lines + Y labels */}
      {Y_LEVELS.map((state, i) => {
        const cy = yScale(stateToYIndex(state))
        return (
          <g key={state}>
            <line
              x1={PAD_LEFT} x2={PAD_LEFT + CHART_W}
              y1={cy} y2={cy}
              stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3"
            />
            <text
              x={PAD_LEFT - 5} y={cy + 4}
              textAnchor="end" fontSize={9}
              fill="currentColor" opacity={0.5}
            >
              {Y_LABELS[i]}
            </text>
          </g>
        )
      })}

      {/* X-axis date labels */}
      {xLabels.map(({ label, x }) => (
        <text key={label} x={x} y={VB_H - 6} textAnchor="middle" fontSize={9} fill="currentColor" opacity={0.4}>
          {label}
        </text>
      ))}

      {/* Step-function line */}
      <path
        d={stepPath}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.7}
      />

      {/* Attempt dots */}
      {attemptDots.map((dot, idx) => (
        <circle
          key={idx}
          cx={xScale(dot.at)}
          cy={yScale(stateToYIndex(dot.levelAtTime))}
          r={4}
          fill={dot.isCorrect ? '#22c55e' : '#ef4444'}
          stroke="white"
          strokeWidth={1.5}
          opacity={0.9}
        />
      ))}

      {/* Hover cursor line */}
      {cursorX !== null && (
        <line
          x1={cursorX} x2={cursorX}
          y1={PAD_TOP} y2={PAD_TOP + CHART_H}
          stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="4 3"
        />
      )}
    </svg>
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────

interface LearningProgressModalProps {
  conceptName: string
  onClose: () => void
}

export function LearningProgressModal({ conceptName, onClose }: LearningProgressModalProps) {
  const { isPremium, isBetaTester, loading: subLoading } = useSubscription()
  const { levelEvents, attemptDots, currentLevel, loading, error } = useConceptLearningHistory(conceptName)
  const [hoveredLevel, setHoveredLevel] = useState<MasteryState | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isAccessible = isPremium || isBetaTester
  const isLoading = loading || subLoading
  const isEmpty = !isLoading && isAccessible && levelEvents.length === 0 && attemptDots.length === 0
  const displayLevel = hoveredLevel ?? currentLevel

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Learning Progress: ${conceptName}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-xl bg-card border rounded-xl shadow-2xl flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-12 border-b shrink-0">
          <span className="flex-1 truncate font-semibold text-sm">
            Learning Progress — {conceptName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading progress…
            </div>
          )}

          {!isLoading && !isAccessible && (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Learning Progress</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your mastery journey over time
                </p>
              </div>
              <Link to="/upgrade" className={buttonVariants({ size: 'sm' })}>
                Upgrade to Premium
              </Link>
            </div>
          )}

          {!isLoading && isAccessible && error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {!isLoading && isAccessible && isEmpty && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No quiz attempts yet for this concept.
              <br />
              Complete a quiz to see your progress here.
            </div>
          )}

          {!isLoading && isAccessible && !isEmpty && !error && (
            <>
              {/* Level pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {hoveredLevel ? 'Level at selected time' : 'Current level'}
                </span>
                <LevelPill level={displayLevel} />
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                  Correct attempt
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                  Incorrect attempt
                </span>
              </div>

              {/* Graph */}
              <div className="rounded-lg border bg-muted/30 p-2">
                <ProgressGraph
                  levelEvents={levelEvents}
                  attemptDots={attemptDots}
                  onHoverLevel={setHoveredLevel}
                />
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Hover the graph to explore your level at any point in time
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
