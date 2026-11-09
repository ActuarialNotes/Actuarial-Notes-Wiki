import { useId, useState, type ReactNode } from 'react'
import { BookOpen, ChevronRight, Eye, Minus, Play, Plus, Timer } from 'lucide-react'
import type { SegmentedOption } from '@/components/ui/SegmentedControl'
import type { Difficulty } from '@/lib/parser'
import { cn } from '@/lib/utils'
import { CountChoice, DifficultyChoice } from './QuizSetupSheet'

/** The part of the setup sheet a tap on the card opens to. */
export type SetupSection = 'topics' | 'count' | 'difficulty' | 'sitting'

/**
 * The quiz setup screen's card: the reader's own quiz, ready to start, with
 * every choice on it set in place.
 *
 * The headline is the count, "3 questions", between a − and a + that step it
 * by one; the time it should take sits under it. Tapping the count opens the
 * presets and a field for any number under it. Then three labelled sections:
 * **Topics**, a field naming what is picked, which opens the setup sheet at
 * its topic list (the one choice too long for the card); **Difficulty**, the
 * three levels as a segmented row with how many questions each holds; and
 * **While you answer**, the on/off settings as chips that fill white when on
 * and go hollow and dashed when off. One action, Start, white on the exam's
 * colour.
 *
 * The card is painted in the exam's opaque accent (`--exam-accent-vivid`),
 * which carries white text in either theme; an exam with no accent falls back
 * to an indigo of the same weight.
 */
export function QuizHeroCard({
  count,
  estimate,
  pills,
  countOptions,
  maxCount,
  onCountChange,
  levels,
  levelCounts,
  onLevelsChange,
  timed,
  timedPace,
  onTimedChange,
  revealDuring,
  onRevealDuringChange,
  conceptLinks,
  onConceptLinksChange,
  onChange,
  onStart,
}: {
  /** How many questions Start will launch. */
  count: number
  /** "~53 min", or null when the exam has no pace on file. */
  estimate: string | null
  /** The topics picked, as the card names them ("All topics" when none). */
  pills: string[]
  /** The preset counts, the same the sheet offers. */
  countOptions: SegmentedOption<string>[]
  /** What the pool holds; 0 while unknown. */
  maxCount: number
  onCountChange: (value: string) => void
  /** The difficulties the draw is from. */
  levels: Difficulty[]
  /** How many questions each difficulty holds. */
  levelCounts?: Record<Difficulty, number>
  onLevelsChange: (next: Difficulty[]) => void
  timed: boolean
  /** The exam's pace, e.g. "5:20 per question". */
  timedPace?: string
  onTimedChange: (next: boolean) => void
  /** Answers marked as each is confirmed (`during`), or held for the end. */
  revealDuring: boolean
  onRevealDuringChange: (next: boolean) => void
  /** Concepts a question names can be tapped to read. */
  conceptLinks: boolean
  onConceptLinksChange: (next: boolean) => void
  /** Opens the setup sheet at a section (the topics). */
  onChange: (section: SetupSection) => void
  onStart: () => void
}) {
  const [countOpen, setCountOpen] = useState(false)
  const countId = useId()
  const empty = count === 0
  const word = count === 1 ? 'question' : 'questions'
  const topics = pills.join(', ')
  const canLess = count > 1
  const canMore = count > 0 && (maxCount === 0 || count < maxCount)
  return (
    <section
      aria-label="Your quiz"
      className="space-y-5 rounded-3xl p-5 text-white shadow-sm"
      style={{ backgroundColor: 'var(--exam-accent-vivid, #4f46e5)' }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <StepButton label="One question fewer" disabled={!canLess} onClick={() => onCountChange(String(count - 1))}>
            <Minus className="h-6 w-6" aria-hidden />
          </StepButton>
          <div className="min-w-0 flex-1 text-center">
            <button
              type="button"
              data-testid="quiz-count"
              aria-label={`${count} ${word}. Change how many`}
              aria-expanded={countOpen}
              aria-controls={countId}
              onClick={() => setCountOpen(open => !open)}
              className="inline-flex max-w-full items-baseline gap-2 whitespace-nowrap rounded-xl px-1 font-bold leading-none tracking-tight transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="text-6xl font-extrabold tabular-nums">{count}</span>
              <span className="text-[28px]">{word}</span>
            </button>
            {estimate && <p className="mt-1.5 text-base font-semibold text-white/70">{estimate}</p>}
          </div>
          <StepButton label="One question more" disabled={!canMore} onClick={() => onCountChange(String(count + 1))}>
            <Plus className="h-6 w-6" aria-hidden />
          </StepButton>
        </div>
        {countOpen && (
          <div id={countId}>
            <CountChoice
              options={countOptions}
              value={String(count)}
              onChange={onCountChange}
              max={maxCount}
              tone="card"
            />
          </div>
        )}
      </div>

      <CardSection title="Topics">
        <button
          type="button"
          data-testid="quiz-pill"
          aria-label={`${topics}. Change topics`}
          aria-haspopup="dialog"
          onClick={() => onChange('topics')}
          className="flex h-12 w-full items-center gap-2 rounded-2xl bg-black/15 px-4 text-left text-[15px] font-semibold transition-colors hover:bg-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="min-w-0 flex-1 truncate">{topics}</span>
          <ChevronRight className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
        </button>
      </CardSection>

      <CardSection title="Difficulty">
        <DifficultyChoice levels={levels} onChange={onLevelsChange} counts={levelCounts} tone="card" />
      </CardSection>

      <CardSection title="While you answer">
        <div role="group" aria-label="While you answer" className="flex flex-wrap gap-2">
          <SettingChip
            on={timed}
            onToggle={() => onTimedChange(!timed)}
            name="Timed"
            icon={<Timer className="h-[18px] w-[18px]" aria-hidden />}
            label="Timed"
            title={timedPace ? `Exam pace: ${timedPace}` : undefined}
          />
          <SettingChip
            on={revealDuring}
            onToggle={() => onRevealDuringChange(!revealDuring)}
            name="Show answers after each question"
            icon={<Eye className="h-[18px] w-[18px]" aria-hidden />}
            label="Answers as you go"
          />
          <SettingChip
            on={conceptLinks}
            onToggle={() => onConceptLinksChange(!conceptLinks)}
            name="Tap concepts to read them"
            icon={<BookOpen className="h-[18px] w-[18px]" aria-hidden />}
            label="Concept links"
          />
        </div>
      </CardSection>

      {empty && (
        <p className="text-sm text-white/80">No questions match. Pick other topics or difficulties.</p>
      )}

      <button
        type="button"
        data-tour="start-quiz"
        // The launch cue rather than a button's `press`: this is the button
        // the whole page exists for.
        data-sound="begin"
        onClick={onStart}
        disabled={empty}
        className={cn(
          'flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-white text-base font-semibold text-black transition-transform',
          'active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:active:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        )}
      >
        <Play className="h-5 w-5 fill-current" aria-hidden />
        Start quiz
      </button>
    </section>
  )
}

/** A labelled part of the card: a small-capitals heading over its choice. */
function CardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-white/70">{title}</h3>
      {children}
    </div>
  )
}

/** The round − and + either side of the count. */
function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors enabled:hover:bg-white/30 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {children}
    </button>
  )
}

/**
 * An on/off setting as a chip, switched by a tap: solid white when on, hollow
 * with a dashed edge when off, so the state reads at a glance.
 */
function SettingChip({
  on,
  onToggle,
  name,
  icon,
  label,
  title,
}: {
  on: boolean
  onToggle: () => void
  /** The switch's accessible name, the same as the sheet's row. */
  name: string
  icon: ReactNode
  label: string
  title?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={name}
      data-testid="quiz-setting"
      data-on={on}
      data-sound="tick"
      title={title}
      onClick={onToggle}
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-full border-[1.5px] px-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        on
          ? 'border-white bg-white text-black'
          : 'border-dashed border-white/50 text-white/80 hover:bg-white/10 hover:text-white',
      )}
    >
      {icon}
      {label}
    </button>
  )
}
