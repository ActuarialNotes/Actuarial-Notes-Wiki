import type { ComponentProps, Ref } from 'react'
import { ClipboardCheck, ListChecks, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SegmentedControl, type SegmentedOption } from '@/components/ui/SegmentedControl'
import { QuestionDeckCard } from '@/components/QuestionDeckCard'
import { QuizSettingsMenu, type QuizSettingsMenuProps } from '@/components/QuizSettingsMenu'
import { TodayQuizCornerBadge } from '@/components/TodayQuizBadge'
import type { QuizMode } from '@/lib/parser'
import { PRACTICE_EXAM_LABEL } from '@/lib/pastExams'

// ── How it is sat ─────────────────────────────────────────────────────────
// The format sits beside Start, which it renames: one row says what the
// questions are, this one says how they're sat. Each option says, under its
// name, the one thing that separates the two — how long the set is. Whether
// the answers come as you go, and the clock, are the settings menu's, and
// remembered for each format apart.
const FORMAT_OPTIONS: SegmentedOption<QuizMode>[] = [
  {
    value: 'quiz',
    ariaLabel: 'Quiz: a short set',
    label: (
      <span className="flex min-w-0 flex-col items-center gap-0.5 leading-tight">
        <span className="flex items-center gap-1.5 text-base">
          <ListChecks className="h-4 w-4 shrink-0" aria-hidden />
          Quiz
        </span>
        <span className="truncate text-xs font-normal text-muted-foreground">Short set</span>
      </span>
    ),
  },
  {
    value: 'mock-exam',
    ariaLabel: `${PRACTICE_EXAM_LABEL}: full length`,
    label: (
      <span className="flex min-w-0 flex-col items-center gap-0.5 leading-tight">
        <span className="flex items-center gap-1.5 text-base">
          <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{PRACTICE_EXAM_LABEL}</span>
        </span>
        <span className="truncate text-xs font-normal text-muted-foreground">Full length</span>
      </span>
    ),
  },
]

/**
 * The quiz builder's bottom action bar: how the quiz is sat, the deck it
 * draws from with the settings that shape it, and Start. Fixed to the
 * viewport; the page reserves its measured height (`barRef`, read by
 * `useActionBarHeight`).
 */
export function QuizActionBar({
  barRef,
  format,
  onFormatChange,
  deck,
  settings,
  questionCount,
  onStart,
  todayBadge,
}: {
  barRef: Ref<HTMLDivElement>
  format: QuizMode
  onFormatChange: (format: QuizMode) => void
  /** The deck card, or null while the pool is empty. */
  deck: ComponentProps<typeof QuestionDeckCard> | null
  settings: Omit<QuizSettingsMenuProps, 'className'>
  /** How many questions Start will launch. */
  questionCount: number
  onStart: () => void
  /** Start's corner badge, when the launch is sized to finish today's plan. */
  todayBadge: { count: number; complete: boolean } | null
}) {
  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 lg:left-[var(--sidebar-width)] right-0 z-20 border-t border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-4 space-y-3">
        {/* ── How it is sat — Quiz or Practice Exam, whatever the source ── */}
        <SegmentedControl
          label="How to sit it"
          value={format}
          onChange={onFormatChange}
          options={FORMAT_OPTIONS}
          size="xl"
        />

        {/* ── Question deck: availability + shuffle the draw, and the
               settings that shape it ────────────────────────────────────
            The deck says what the quiz draws from; the button beside it
            holds how the quiz is run — how many questions, and when the
            answers show. Those two were full-width rows stacked here, which
            on a phone pushed Start Quiz to the edge of the fold. */}
        <div className="flex items-stretch gap-2">
          {deck && <QuestionDeckCard {...deck} className="min-w-0 flex-1" />}
          {/* A practice exam is sat whole, as the paper sets it, so it
              carries no count and no difficulty — the menu opens on the
              reveal, timing and concept choices alone. */}
          <QuizSettingsMenu {...settings} className={deck ? undefined : 'h-14'} />
        </div>

        <div className="relative">
          <Button
            type="button"
            size="lg"
            data-tour="start-quiz"
            // The launch cue rather than the solid Button's `press`: this is
            // the button the whole page exists for.
            data-sound="begin"
            onClick={onStart}
            disabled={questionCount === 0}
            className="h-14 w-full gap-3 rounded-xl text-base font-semibold"
          >
            <Play className="h-5 w-5" aria-hidden />
            Start {format === 'mock-exam' ? PRACTICE_EXAM_LABEL : 'Quiz'}
          </Button>
          {/* Only badge a launch that's actually sized to finish today's plan —
              picking a smaller count means this quiz won't complete it. */}
          {todayBadge && (
            <TodayQuizCornerBadge
              count={todayBadge.count}
              complete={todayBadge.complete}
              size="lg"
            />
          )}
        </div>

        {/* The selection can filter down to nothing; say so rather than
            launching into the quiz's "No questions found" screen. */}
        {questionCount === 0 && (
          <p className="text-center text-xs text-muted-foreground">
            No questions match this selection. Pick different topics to start.
          </p>
        )}
      </div>
    </div>
  )
}
