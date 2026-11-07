import type { ReactNode } from 'react'
import { BookOpen, BookX, Eye, EyeOff, Play, Timer, TimerOff } from 'lucide-react'
import type { Difficulty } from '@/lib/parser'
import { DIFFICULTY_LEVELS } from '@/lib/quizDifficulty'
import { difficultySummary } from '@/lib/quizSetup'
import { cn } from '@/lib/utils'

/** The part of the setup sheet a tap on the card opens to. */
export type SetupSection = 'topics' | 'count' | 'difficulty' | 'sitting'

/**
 * The quiz setup screen's card: the reader's own quiz, ready to start. The
 * count is the headline — itself a button, opening the sheet at *How many* —
 * with the time it should take beside it. Under them a pill for each topic,
 * then the settings as a row of icons (difficulty, timed, when answers show,
 * whether concepts can be tapped — an off one drawn hollow):
 * the topics are names worth reading, the settings are states worth glancing
 * at. Every one of them opens the setup sheet at its own section
 * (`onChange`). One action, Start, white on the exam's colour.
 *
 * The card is painted in the exam's opaque accent (`--exam-accent-vivid`),
 * which carries white text in either theme; an exam with no accent falls back
 * to an indigo of the same weight.
 */
export function QuizHeroCard({
  count,
  estimate,
  pills,
  levels,
  timed,
  revealDuring,
  conceptLinks,
  onChange,
  onStart,
}: {
  /** How many questions Start will launch. */
  count: number
  /** "~53 min", or null when the exam has no pace on file. */
  estimate: string | null
  /** The topics' pills, in order — each opens the sheet at the topics. */
  pills: string[]
  /** The difficulties the draw is from. */
  levels: Difficulty[]
  timed: boolean
  /** Answers marked as each is confirmed (`during`), or held for the end. */
  revealDuring: boolean
  /** Concepts a question names can be tapped to read. */
  conceptLinks: boolean
  onChange: (section: SetupSection) => void
  onStart: () => void
}) {
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
          aria-haspopup="dialog"
          onClick={() => onChange('count')}
          className="-mx-1 rounded-xl px-1 text-6xl font-bold leading-none tracking-tight tabular-nums transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {count}
        </button>
        <span className="min-w-0 text-xl font-bold leading-tight">
          <span className="block">{word}</span>
          {estimate && <span className="block opacity-60">{estimate}</span>}
        </span>
      </div>

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

      <div role="group" aria-label="Quiz settings" className="flex gap-2 border-t border-white/20 pt-3">
        <SettingIcon
          label={`Difficulty: ${difficultySummary(levels)}`}
          onClick={() => onChange('difficulty')}
        >
          <DifficultyBars levels={levels} />
        </SettingIcon>
        <SettingIcon
          label={timed ? 'Timed' : 'Untimed'}
          on={timed}
          onClick={() => onChange('sitting')}
        >
          {timed ? <Timer className="h-[22px] w-[22px]" aria-hidden /> : <TimerOff className="h-[22px] w-[22px]" aria-hidden />}
        </SettingIcon>
        <SettingIcon
          label={revealDuring ? 'Answers after each question' : 'Answers at the end'}
          on={revealDuring}
          onClick={() => onChange('sitting')}
        >
          {revealDuring ? <Eye className="h-[22px] w-[22px]" aria-hidden /> : <EyeOff className="h-[22px] w-[22px]" aria-hidden />}
        </SettingIcon>
        <SettingIcon
          label={conceptLinks ? 'Tap concepts to read them' : 'Concepts not tappable'}
          on={conceptLinks}
          onClick={() => onChange('sitting')}
        >
          {conceptLinks ? <BookOpen className="h-[22px] w-[22px]" aria-hidden /> : <BookX className="h-[22px] w-[22px]" aria-hidden />}
        </SettingIcon>
      </div>

      {empty && (
        <p className="text-sm text-white/80">No questions match. Tap a topic or the difficulty to change them.</p>
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

/**
 * One setting as an icon button: no text, its state in its name. An on/off
 * setting that is off is drawn hollow — no fill, a dashed edge, the struck
 * icon dimmed — so off reads at a glance, not only by the slash in the glyph.
 */
function SettingIcon({
  label,
  on = true,
  onClick,
  children,
}: {
  label: string
  /** Omitted for a setting with a value rather than a switch (difficulty). */
  on?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      data-testid="quiz-setting"
      data-on={on}
      aria-label={`${label}. Change`}
      title={label}
      aria-haspopup="dialog"
      onClick={onClick}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
        on
          ? 'bg-white/20 hover:bg-white/30'
          : 'border-[1.5px] border-dashed border-white/50 bg-transparent hover:bg-white/10 [&>svg]:opacity-60',
      )}
    >
      {children}
    </button>
  )
}

/** Three rising bars, one per level, filled where the level is in the draw. */
function DifficultyBars({ levels }: { levels: Difficulty[] }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      {DIFFICULTY_LEVELS.map((level, i) => {
        const h = 6 + i * 5
        return (
          <rect
            key={level}
            x={2.5 + i * 7}
            y={19 - h}
            width={4}
            height={h}
            rx={1}
            fill="currentColor"
            fillOpacity={levels.includes(level) ? 1 : 0}
            stroke="currentColor"
            strokeWidth={1.4}
          />
        )
      })}
    </svg>
  )
}
