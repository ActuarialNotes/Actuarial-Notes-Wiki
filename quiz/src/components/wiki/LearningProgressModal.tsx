import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Lock, Loader2, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useSubscription } from '@/hooks/useSubscription'
import { useConceptLearningHistory, type ConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'
import { summarizeAttemptedQuestions } from '@/lib/learningHistory'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import { AttemptedQuestionsList } from '@/components/wiki/AttemptedQuestionsList'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { MasteryBadge } from '@/components/MasteryBadge'

// ─── Constants ────────────────────────────────────────────────────────────────


// ─── Sub-components ───────────────────────────────────────────────────────────

// `sm` sits inline with a small modal title (the collect modal's header);
// `md` is the standalone-modal header / level-row pill.
export function LevelPill({ level, size = 'md' }: { level: MasteryState; size?: 'sm' | 'md' }) {
  return <MasteryBadge state={level} size={size} className="font-bold tracking-wide" />
}

// ─── Reusable panel ─────────────────────────────────────────────────────────
//
// The level-pill + legend + graph, without any modal chrome. Rendered on its own
// inside the standalone modal below, and embedded alongside the 3D flashcard in
// the collect modal so a collected concept shows "card + progress" in one place.

interface PanelProps {
  /** Hide the internal "Current level" row — used when the level is shown elsewhere (e.g. beside a title). */
  showLevelRow?: boolean
  /** Hide the "Hover the graph…" hint below the graph. */
  showHint?: boolean
  /**
   * Put the legend + graph behind a "Show exam history" toggle, collapsed by
   * default. Used where the graph is a secondary detail rather than the point of
   * the view (the collect modal, where the card and quiz come first).
   */
  collapsible?: boolean
  /** Bubbles up the level currently on display (current or hovered), or null while unavailable. */
  onLevelChange?: (level: MasteryState | null) => void
}

export function LearningProgressPanel({ conceptName, ...props }: PanelProps & { conceptName: string }) {
  const history = useConceptLearningHistory(conceptName)
  return <LearningProgressPanelView history={history} {...props} />
}

// Same panel, driven by an already-loaded history. Callers that need the
// concept's history themselves (the collect modal reads it to decide which face
// of the card to show) pass theirs in rather than mounting a second copy of
// useConceptLearningHistory for the same concept — which would duplicate every
// query and every realtime subscription behind it.
export function LearningProgressPanelView({
  history,
  showLevelRow = true,
  showHint = true,
  collapsible = false,
  onLevelChange,
}: PanelProps & { history: ConceptLearningHistory }) {
  const { isPremium, isBetaTester, loading: subLoading } = useSubscription()
  const { levelEvents, attemptDots, questions, currentLevel, loading, error } = history
  const [hoveredLevel, setHoveredLevel] = useState<MasteryState | null>(null)
  const [graphOpen, setGraphOpen] = useState(false)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
  const graphVisible = !collapsible || graphOpen

  const attemptSummaries = useMemo(() => summarizeAttemptedQuestions(attemptDots), [attemptDots])

  // A filter picked on a graph that's since been hidden (or replaced by another
  // concept's history) would silently narrow the list next time it opens.
  useEffect(() => {
    if (!graphVisible) setSelectedQuestionId(null)
  }, [graphVisible])
  useEffect(() => {
    setSelectedQuestionId(null)
  }, [questions])

  const isAccessible = isPremium || isBetaTester
  const isLoading = loading || subLoading
  const isEmpty = !isLoading && isAccessible && levelEvents.length === 0 && attemptDots.length === 0
  const displayLevel = hoveredLevel ?? currentLevel
  const canShowLevel = !isLoading && isAccessible && !isEmpty && !error

  useEffect(() => {
    onLevelChange?.(canShowLevel ? displayLevel : null)
  }, [canShowLevel, displayLevel, onLevelChange])

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
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
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

      {canShowLevel && (
        <>
          {/* Level pill */}
          {showLevelRow && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {hoveredLevel ? 'Level at selected time' : 'Current level'}
              </span>
              <LevelPill level={displayLevel} />
            </div>
          )}

          {/* Disclosure toggle — only rendered when the graph starts collapsed */}
          {collapsible && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  // Drop any hovered level so the pill falls back to "current"
                  // while the graph is out of view.
                  if (graphOpen) setHoveredLevel(null)
                  setGraphOpen(open => !open)
                }}
                aria-expanded={graphOpen}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-transparent text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {graphOpen ? 'Hide exam history' : 'Show exam history'}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${graphOpen ? '' : '-rotate-90'}`}
                />
              </button>
            </div>
          )}

          {graphVisible && (
            <>
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
              <div className="rounded-lg bg-muted/30 p-2">
                <ProgressGraph
                  levelEvents={levelEvents}
                  attemptDots={attemptDots}
                  onHoverLevel={setHoveredLevel}
                  selectedQuestionId={selectedQuestionId}
                  onSelectQuestion={setSelectedQuestionId}
                />
              </div>

              {showHint && (
                <p className="text-xs text-muted-foreground text-center">
                  Hover the graph to explore your level at any point in time
                </p>
              )}

              {/* The questions behind the dots — filtered to one question while
                  a dot is selected. */}
              <AttemptedQuestionsList
                questions={questions}
                summaries={attemptSummaries}
                selectedQuestionId={selectedQuestionId}
                onClearSelection={() => setSelectedQuestionId(null)}
              />
            </>
          )}
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
  // Paper: the panel sliding in.
  useSoundOnMount('open')
  const [headerLevel, setHeaderLevel] = useState<MasteryState | null>(null)
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
      <div className="w-full max-w-xl bg-card rounded-xl shadow-2xl flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-16 shrink-0">
          <span className="flex-1 truncate text-xl font-bold">
            {conceptName}
          </span>
          {headerLevel && <LevelPill level={headerLevel} />}
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
          <LearningProgressPanel
            conceptName={conceptName}
            showLevelRow={false}
            showHint={false}
            onLevelChange={setHeaderLevel}
          />
        </div>
      </div>
    </div>
  )
}
