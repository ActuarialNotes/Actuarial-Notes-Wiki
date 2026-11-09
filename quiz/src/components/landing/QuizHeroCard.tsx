import { useState, type ReactNode } from 'react'
import { BookOpen, BookX, ChevronDown, Eye, EyeOff, Play, Timer, TimerOff } from 'lucide-react'
import type { SegmentedOption } from '@/components/ui/SegmentedControl'
import type { Difficulty } from '@/lib/parser'
import { difficultySummary } from '@/lib/quizSetup'
import { cn } from '@/lib/utils'
import { DifficultyBars } from '@/components/QuizSettingsButton'
import { CountChoice, DifficultyChoice } from './QuizSetupSheet'

/** The part of the setup sheet a tap on the card opens to. */
export type SetupSection = 'topics' | 'count' | 'difficulty' | 'sitting'

/** What a tap on the card opens in place, under the row it was tapped in. */
type Inline = 'count' | 'difficulty' | null

/**
 * The quiz setup screen's card: the reader's own quiz, ready to start. The
 * count is the headline, with the time it should take beside it. Under them a
 * pill for each topic, which opens the setup sheet at its topics, then the
 * settings, each an icon with words saying what it is set to.
 *
 * Nothing but the topics leaves the card. The count and the difficulty open
 * their choices in place, under the row they were tapped in; the on/off
 * settings (timed, when answers show, tappable concepts) switch on a tap, the
 * words beside the icon changing with them. One action, Start, white on the
 * exam's colour.
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
  /** The topics' pills, in order — each opens the sheet at the topics. */
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
  const [inline, setInline] = useState<Inline>(null)
  const toggle = (which: Exclude<Inline, null>) => setInline(open => (open === which ? null : which))
  const empty = count === 0
  const word = count === 1 ? 'question' : 'questions'
  return (
    <section
      aria-label="Your quiz"
      className="space-y-4 rounded-3xl p-5 text-white shadow-sm"
      style={{ backgroundColor: 'var(--exam-accent-vivid, #4f46e5)' }}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          data-testid="quiz-count"
          aria-label={`${count} ${word}. Change how many`}
          aria-expanded={inline === 'count'}
          aria-controls="quiz-card-count"
          onClick={() => toggle('count')}
          className="-mx-1 flex items-end gap-1 rounded-xl px-1 text-6xl font-bold leading-none tracking-tight tabular-nums transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {count}
          <ChevronDown
            className={cn('mb-1 h-6 w-6 opacity-70 transition-transform', inline === 'count' && 'rotate-180')}
            aria-hidden
          />
        </button>
        <span className="min-w-0 text-xl font-bold leading-tight">
          <span className="block">{word}</span>
          {estimate && <span className="block opacity-60">{estimate}</span>}
        </span>
      </div>

      {inline === 'count' && (
        <div id="quiz-card-count">
          <CountChoice
            options={countOptions}
            value={String(count)}
            onChange={onCountChange}
            max={maxCount}
            tone="card"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {pills.map(label => (
          <button
            key={label}
            type="button"
            data-testid="quiz-pill"
            aria-label={`${label}. Change topics`}
            aria-haspopup="dialog"
            onClick={() => onChange('topics')}
            className={cn(
              'max-w-full truncate rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 transition-colors',
              'hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2 border-t border-white/20 pt-3">
        <div role="group" aria-label="Quiz settings" className="grid grid-cols-2 gap-2">
          <SettingButton
            icon={<DifficultyBars levels={levels} />}
            label={difficultySummary(levels)}
            aria-label={`Difficulty: ${difficultySummary(levels)}. Change`}
            aria-expanded={inline === 'difficulty'}
            aria-controls="quiz-card-difficulty"
            onClick={() => toggle('difficulty')}
            trailing={
              <ChevronDown
                className={cn('h-4 w-4 shrink-0 opacity-70 transition-transform', inline === 'difficulty' && 'rotate-180')}
                aria-hidden
              />
            }
          />
          <SettingSwitch
            on={timed}
            onToggle={() => onTimedChange(!timed)}
            name="Timed"
            onIcon={<Timer className="h-5 w-5" aria-hidden />}
            offIcon={<TimerOff className="h-5 w-5" aria-hidden />}
            onLabel="Timed"
            offLabel="Untimed"
            title={timed && timedPace ? `Exam pace: ${timedPace}` : undefined}
          />
          <SettingSwitch
            on={revealDuring}
            onToggle={() => onRevealDuringChange(!revealDuring)}
            name="Show answers after each question"
            onIcon={<Eye className="h-5 w-5" aria-hidden />}
            offIcon={<EyeOff className="h-5 w-5" aria-hidden />}
            onLabel="Answers as you go"
            offLabel="Answers at the end"
          />
          <SettingSwitch
            on={conceptLinks}
            onToggle={() => onConceptLinksChange(!conceptLinks)}
            name="Tap concepts to read them"
            onIcon={<BookOpen className="h-5 w-5" aria-hidden />}
            offIcon={<BookX className="h-5 w-5" aria-hidden />}
            onLabel="Concept links on"
            offLabel="Concept links off"
          />
        </div>

        {inline === 'difficulty' && (
          <div id="quiz-card-difficulty" className="pt-1">
            <DifficultyChoice levels={levels} onChange={onLevelsChange} counts={levelCounts} tone="card" />
          </div>
        )}
      </div>

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

const SETTING_CLASS =
  'flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-3 py-1.5 text-left text-sm font-semibold leading-tight text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'

/** A setting with a value rather than a switch: icon, value, chevron. */
function SettingButton({
  icon,
  label,
  trailing,
  onClick,
  ...aria
}: {
  icon: ReactNode
  label: string
  trailing?: ReactNode
  onClick: () => void
  'aria-label': string
  'aria-expanded': boolean
  'aria-controls': string
}) {
  return (
    <button
      type="button"
      data-testid="quiz-setting"
      onClick={onClick}
      className={cn(SETTING_CLASS, 'bg-white/20 hover:bg-white/30')}
      {...aria}
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">{label}</span>
      {trailing}
    </button>
  )
}

/**
 * An on/off setting, switched by a tap. Its words say what it is set to; off
 * is drawn hollow — no fill, a dashed edge, the struck icon dimmed — so off
 * reads at a glance, not only by the slash in the glyph.
 */
function SettingSwitch({
  on,
  onToggle,
  name,
  onIcon,
  offIcon,
  onLabel,
  offLabel,
  title,
}: {
  on: boolean
  onToggle: () => void
  /** The switch's accessible name, the same as the sheet's row. */
  name: string
  onIcon: ReactNode
  offIcon: ReactNode
  onLabel: string
  offLabel: string
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
        SETTING_CLASS,
        on
          ? 'bg-white/20 hover:bg-white/30'
          : 'border-[1.5px] border-dashed border-white/50 bg-transparent hover:bg-white/10 [&>span:first-child]:opacity-60',
      )}
    >
      <span className="shrink-0">{on ? onIcon : offIcon}</span>
      <span className={cn('min-w-0 flex-1', !on && 'text-white/80')}>{on ? onLabel : offLabel}</span>
    </button>
  )
}
