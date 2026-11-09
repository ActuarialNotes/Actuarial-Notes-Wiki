import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Loader2, TrendingUp } from 'lucide-react'
import { useConceptLearningHistory, type ConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'
import { summarizeAttemptedQuestions } from '@/lib/learningHistory'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import { AttemptedQuestionsList } from '@/components/wiki/AttemptedQuestionsList'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { MasteryBadge } from '@/components/MasteryBadge'
import { BannerTile, EXAM_BANNER, InfoBanner, InfoSheet, NEUTRAL_BANNER, Stat } from '@/components/ui/InfoSheet'
import { ExamLogo } from '@/components/ExamLogo'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { findSyllabiForConcept, wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { examAccentStyle } from '@/lib/examColors'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { dialogOpenOver } from '@/lib/layeredDialog'

// ─── Constants ────────────────────────────────────────────────────────────────


// ─── Sub-components ───────────────────────────────────────────────────────────

// `sm` sits inline with a small modal title;
// `md` is the standalone-modal header / level-row pill.
export function LevelPill({ level, size = 'md' }: { level: MasteryState; size?: 'sm' | 'md' }) {
  return <MasteryBadge state={level} size={size} className="font-bold tracking-wide" />
}

// ─── Reusable panel ─────────────────────────────────────────────────────────
//
// The level-pill + legend + graph, without any modal chrome. Rendered on its own
// inside the standalone modal below, or embedded in any surface that wants the
// graph without the modal.

interface PanelProps {
  /** Hide the internal "Current level" row — used when the level is shown elsewhere (e.g. beside a title). */
  showLevelRow?: boolean
  /**
   * Put the legend + graph behind a "Show history" toggle, collapsed by
   * default. Used where the graph is a secondary detail rather than the point of
   * the view.
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
// concept's history themselves pass theirs in rather than mounting a second copy of
// useConceptLearningHistory for the same concept — which would duplicate every
// query and every realtime subscription behind it.
export function LearningProgressPanelView({
  history,
  showLevelRow = true,
  collapsible = false,
  onLevelChange,
}: PanelProps & { history: ConceptLearningHistory }) {
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

  const isLoading = loading
  const isEmpty = !isLoading && levelEvents.length === 0 && attemptDots.length === 0
  const displayLevel = hoveredLevel ?? currentLevel
  const canShowLevel = !isLoading && !isEmpty && !error

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

      {!isLoading && error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && isEmpty && (
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
                {graphOpen ? 'Hide history' : 'Show history'}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${graphOpen ? '' : '-rotate-90'}`}
                />
              </button>
            </div>
          )}

          {graphVisible && (
            <>
              {/* Graph, with its legend */}
              <div className="rounded-xl bg-card px-2 pb-2 pt-3">
                <div className="flex items-center gap-4 px-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    Right
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    Wrong
                  </span>
                </div>
                <ProgressGraph
                  levelEvents={levelEvents}
                  attemptDots={attemptDots}
                  onHoverLevel={setHoveredLevel}
                  selectedQuestionId={selectedQuestionId}
                  onSelectQuestion={setSelectedQuestionId}
                />
              </div>

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
  const history = useConceptLearningHistory(conceptName)
  const [shownLevel, setShownLevel] = useState<MasteryState | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // A question's Info dialog, open over this one, takes its own Escape.
      if (e.key === 'Escape' && !dialogOpenOver(dialogRef.current)) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // The exam whose syllabus names the concept: its logo, colour and name lead
  // the banner. A concept on no syllabus gets the neutral banner.
  const { syllabi } = useWikiSyllabus()
  const syllabus = useMemo(() => findSyllabiForConcept(syllabi, conceptName)[0] ?? null, [syllabi, conceptName])
  const examKey = syllabus ? wikiExamIdToProgressKey(syllabus.examId) : null

  const attempts = history.attemptDots.length
  const right = history.attemptDots.filter(d => d.isCorrect).length
  const level = shownLevel ? levelFigure(shownLevel) : null

  return (
    <InfoSheet
      onClose={onClose}
      label={`Learning Progress: ${conceptName}`}
      // z-[130] — same hosts as ConceptQuestionsModal; see the note there.
      layer="z-[130]"
      dialogRef={dialogRef}
      style={examKey ? examAccentStyle(examKey) : undefined}
    >
      <InfoBanner
        tile={examKey
          ? <ExamLogo examKey={examKey} size="md" />
          : <BannerTile><TrendingUp className="h-5 w-5" /></BannerTile>}
        eyebrow={syllabus?.examLabel}
        title={conceptName}
        onClose={onClose}
        tint={examKey ? EXAM_BANNER : NEUTRAL_BANNER}
        stats={level && attempts > 0 ? [
          <Stat key="level" value={level.value} label={level.label} accent />,
          <Stat key="attempts" value={attempts} label={attempts === 1 ? 'attempt' : 'attempts'} />,
          <Stat key="right" value={`${Math.round((100 * right) / attempts)}%`} label="right" />,
        ] : undefined}
      />
      <LearningProgressPanelView
        history={history}
        showLevelRow={false}
        onLevelChange={setShownLevel}
      />
    </InfoSheet>
  )
}

/** "Level 2" → 2 over "level"; New and Forgotten are their own word. */
function levelFigure(level: MasteryState): { value: string; label?: string } {
  const label = MASTERY_LABEL[level]
  const n = /^Level (\d)$/.exec(label)
  return n ? { value: n[1], label: 'level' } : { value: label }
}
