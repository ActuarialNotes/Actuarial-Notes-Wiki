import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BarChart3, Eye, EyeOff, List, Minus, Plus, Timer, TimerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OUTLINE_CARD } from '@/components/ui/OutlineCard'
import { questionsWord } from '@/lib/quizSetup'
import type { PillSection, SettingPill } from '@/lib/practiceHome'
import { cn } from '@/lib/utils'

/**
 * Practice's quiz card (docs/redesign-spec.md §7a.1, canvas `Practice`): the
 * reader's own quiz as an outline. The count between a minus and a plus, the
 * time it should take under it, the four settings as pills that each say
 * their current value (R16), and Start, the page's one filled button. A pill
 * opens the setup sheet at its section; the count itself can be typed.
 */
export function QuizCard({
  count,
  maxCount,
  estimate,
  pills,
  onCountChange,
  onOpen,
  onStart,
  emptyNote,
}: {
  /** How many questions Start launches. */
  count: number
  /** What the pool holds; 0 while unknown, which caps nothing. */
  maxCount: number
  /** "~53 min", or null when the exam has no pace on file. */
  estimate: string | null
  pills: readonly SettingPill[]
  onCountChange: (next: number) => void
  /** Open the setup sheet at a section. */
  onOpen: (section: PillSection) => void
  onStart: () => void
  /** Said in place of the time when nothing matches. */
  emptyNote?: string
}) {
  const empty = count === 0
  const canLess = count > 1
  const canMore = count > 0 && (maxCount === 0 || count < maxCount)
  return (
    <section aria-label="Your quiz" className={cn(OUTLINE_CARD, 'flex flex-col gap-[18px] p-5')}>
      <div className="flex items-center justify-between gap-2">
        <StepButton label="One question fewer" disabled={!canLess} onClick={() => onCountChange(count - 1)}>
          <Minus className="h-6 w-6" aria-hidden="true" />
        </StepButton>
        <div className="flex min-w-0 flex-col items-center gap-0.5">
          <CountField count={count} maxCount={maxCount} onChange={onCountChange} />
          {empty && emptyNote
            ? <span className="text-center text-[15px]">{emptyNote}</span>
            : estimate && <span className="text-[15px] tabular-nums">{estimate}</span>}
        </div>
        <StepButton label="One question more" disabled={!canMore} onClick={() => onCountChange(count + 1)}>
          <Plus className="h-6 w-6" aria-hidden="true" />
        </StepButton>
      </div>

      <div role="group" aria-label="Settings" className="flex flex-wrap gap-2">
        {pills.map(pill => (
          <button
            key={pill.id}
            type="button"
            data-testid={pill.id === 'topics' ? 'quiz-pill' : `quiz-pill-${pill.id}`}
            aria-label={`${pill.name}. Change`}
            aria-haspopup="dialog"
            onClick={() => onOpen(pill.section)}
            className="flex h-11 max-w-full items-center gap-[7px] rounded-full border-[1.5px] border-foreground px-[13px] text-sm font-semibold transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
          >
            <PillIcon pill={pill} />
            <span className="truncate">{pill.value}</span>
          </button>
        ))}
      </div>

      <Button
        size="main"
        data-tour="start-quiz"
        // The launch cue, not a button's press: this is what the page is for.
        data-sound="begin"
        onClick={onStart}
        disabled={empty}
        className="w-full rounded-full"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-current">
          <path d="M7 4l13 8-13 8z" />
        </svg>
        Start
      </Button>
    </section>
  )
}

function PillIcon({ pill }: { pill: SettingPill }) {
  const cls = 'h-[17px] w-[17px] shrink-0'
  if (pill.id === 'topics') return <List className={cls} aria-hidden="true" />
  if (pill.id === 'levels') return <BarChart3 className={cls} aria-hidden="true" />
  if (pill.id === 'timed') {
    return pill.value === 'Timed'
      ? <Timer className={cls} aria-hidden="true" />
      : <TimerOff className={cls} aria-hidden="true" />
  }
  return pill.value === 'As you go'
    ? <Eye className={cls} aria-hidden="true" />
    : <EyeOff className={cls} aria-hidden="true" />
}

/** The round minus and plus either side of the count. */
function StepButton({
  label, disabled, onClick, children,
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
      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-foreground transition-colors enabled:hover:bg-foreground/10 disabled:border-border disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
    >
      {children}
    </button>
  )
}

/**
 * The count: a big figure with its unit beside it. Pressing it turns the
 * figure into a field for any number, held to what the pool holds.
 */
function CountField({
  count, maxCount, onChange,
}: {
  count: number
  maxCount: number
  onChange: (next: number) => void
}) {
  const [draft, setDraft] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (draft !== null) inputRef.current?.select() }, [draft === null]) // eslint-disable-line react-hooks/exhaustive-deps

  function type(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    setDraft(digits)
    const n = Number(digits)
    if (n >= 1) onChange(maxCount ? Math.min(n, maxCount) : n)
  }

  const figure = 'text-[56px] font-bold leading-none tracking-[-0.03em] tabular-nums'
  return (
    <div className="flex items-baseline gap-2">
      {draft === null ? (
        <button
          type="button"
          data-testid="quiz-count"
          aria-label={`${count} ${questionsWord(count)}. Type another number`}
          onClick={() => setDraft(String(count))}
          className={cn(figure, 'rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring')}
        >
          {count}
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          enterKeyHint="done"
          aria-label={maxCount ? `Number of questions, up to ${maxCount}` : 'Number of questions'}
          value={draft}
          onChange={e => type(e.target.value)}
          onBlur={() => setDraft(null)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') e.currentTarget.blur() }}
          style={{ width: `${Math.max(1, draft.length)}ch` }}
          className={cn(figure, 'box-content border-b-2 border-foreground bg-transparent text-center outline-none')}
        />
      )}
      <span className="text-lg font-medium">{questionsWord(count)}</span>
    </div>
  )
}
