import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The quiz setup screen's card: the reader's own quiz, ready to start. The
 * count is the headline, the time it should take beside it, and under them a
 * pill for each thing that shapes the draw — the topics, the difficulty —
 * each opening the setup sheet (`onChange`). One action, Start, white on the
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
  onChange,
  onStart,
}: {
  /** How many questions Start will launch. */
  count: number
  /** "~53 min", or null when the exam has no pace on file. */
  estimate: string | null
  /** The pills, in order — each opens the sheet. */
  pills: string[]
  onChange: () => void
  onStart: () => void
}) {
  const empty = count === 0
  return (
    <section
      aria-label="Your quiz"
      className="space-y-4 rounded-3xl p-5 text-white shadow-sm"
      style={{ backgroundColor: 'var(--exam-accent-vivid, #4f46e5)' }}
    >
      <div className="flex items-center gap-4">
        <span className="text-6xl font-bold leading-none tracking-tight tabular-nums">{count}</span>
        <span className="min-w-0 text-xl font-bold leading-tight">
          <span className="block">{count === 1 ? 'question' : 'questions'}</span>
          {estimate && <span className="block opacity-60">{estimate}</span>}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {pills.map(label => (
          <button
            key={label}
            type="button"
            data-testid="quiz-pill"
            aria-label={`${label}. Change quiz`}
            aria-haspopup="dialog"
            onClick={onChange}
            className={cn(
              'max-w-full truncate rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 transition-colors',
              'hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {empty && (
        <p className="text-sm text-white/80">No questions match. Tap a pill to change the topics or levels.</p>
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
