import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Loader2, TrendingUp } from 'lucide-react'
import { useConceptLearningHistory, type ConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import type { MasteryState } from '@/lib/mastery'
import { summarizeAttemptedQuestions } from '@/lib/learningHistory'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import { AttemptedQuestionsList } from '@/components/wiki/AttemptedQuestionsList'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { LevelSquare } from '@/components/LevelSquare'
import { BannerTile, InfoBanner, InfoSheet, Stat } from '@/components/ui/InfoSheet'
import { ExamLogo } from '@/components/ExamLogo'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { conceptExam } from '@/lib/conceptMatch'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { dialogOpenOver } from '@/lib/layeredDialog'

// ─── Constants ────────────────────────────────────────────────────────────────


// ─── Sub-components ───────────────────────────────────────────────────────────

// `sm` sits inline with a small modal title;
// `md` is the standalone-modal header / level-row pill.
export function LevelPill({ level, size = 'md' }: { level: MasteryState; size?: 'sm' | 'md' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${size === 'sm' ? 'text-[13px]' : 'text-[15px]'}`}>
      <LevelSquare state={level} size="sm" decorative />
      {MASTERY_LABEL[level]}
    </span>
  )
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
        <div className="flex items-center gap-2 text-[15px] py-8 justify-center">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading progress…
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && isEmpty && (
        <div className="py-8 text-center text-[15px] leading-relaxed">
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
              <span className="text-[13px]">
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
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-foreground px-4 text-[15px] font-semibold transition-colors hover:bg-foreground/10"
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
              <div className="rounded-[18px] border border-border px-2 pb-2 pt-3">
                <div className="flex items-center gap-4 px-2 text-[13px]">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-answer-correct" />
                    Right
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-answer-incorrect" />
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
  /** The exam page the concept is being read for (file name), when the surface knows it. */
  examFile?: string | null
}

export function LearningProgressModal({ conceptName, onClose, examFile }: LearningProgressModalProps) {
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

  // The exam the concept is being read for leads the header with its logo and
  // name: the page that says so, else the exam page the concept popup was
  // opened over, else the exam in focus, else the first in ladder order whose
  // syllabus names it. A concept on no syllabus gets a plain tile.
  const { syllabi } = useWikiSyllabus()
  const { active } = useExamInFocus()
  const popupSource = useConceptPopup(s => (s.open ? s.sourcePath : null))
  const syllabus = useMemo(
    () => conceptExam(syllabi, conceptName, [examFile, popupSource, active?.fileName]),
    [syllabi, conceptName, examFile, popupSource, active?.fileName],
  )
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
    >
      <InfoBanner
        tile={examKey
          ? <ExamLogo examKey={examKey} size="md" />
          : <BannerTile><TrendingUp className="h-5 w-5" /></BannerTile>}
        eyebrow={syllabus?.examLabel}
        title={conceptName}
        onClose={onClose}
        stats={level && attempts > 0 ? [
          <Stat key="level" value={level.value} label={level.label} />,
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
