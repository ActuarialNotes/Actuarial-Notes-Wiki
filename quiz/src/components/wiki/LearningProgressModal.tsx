import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Loader2, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function LevelPill({ level }: { level: MasteryState }) {
  return (
    <span className={`inline-flex items-center px-5 py-2 rounded-full text-base font-bold tracking-wide ${LEVEL_COLORS[level]}`}>
      {LEVEL_LABELS[level]}
    </span>
  )
}

// ─── Reusable panel ─────────────────────────────────────────────────────────
//
// The level-pill + legend + graph, without any modal chrome. Rendered on its own
// inside the standalone modal below, and embedded alongside the 3D flashcard in
// the collect modal so a collected concept shows "card + progress" in one place.

export function LearningProgressPanel({ conceptName }: { conceptName: string }) {
  const { isPremium, isBetaTester, loading: subLoading } = useSubscription()
  const { levelEvents, attemptDots, currentLevel, loading, error } = useConceptLearningHistory(conceptName)
  const [hoveredLevel, setHoveredLevel] = useState<MasteryState | null>(null)

  const isAccessible = isPremium || isBetaTester
  const isLoading = loading || subLoading
  const isEmpty = !isLoading && isAccessible && levelEvents.length === 0 && attemptDots.length === 0
  const displayLevel = hoveredLevel ?? currentLevel

  return (
    <div className="space-y-5">
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500 shrink-0" />
              Correct attempt
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500 shrink-0" />
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
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────

interface LearningProgressModalProps {
  conceptName: string
  onClose: () => void
}

export function LearningProgressModal({ conceptName, onClose }: LearningProgressModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

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
        <div className="p-5">
          <LearningProgressPanel conceptName={conceptName} />
        </div>
      </div>
    </div>
  )
}
