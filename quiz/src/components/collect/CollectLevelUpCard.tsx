// A results-screen card for a concept this quiz answered correctly but which
// stayed **New** because it hadn't been collected yet (see
// docs/flashcard-collection.md). It sits in the same two-column grid as the
// "levelled up" cards on /review and deliberately wears the same shape — the
// level-up is genuinely one comprehension check away, and collecting it here
// turns this card into a real level-up card in place.
//
// The two are still told apart at a glance: an earned card is emerald and
// static, this one is primary-coloured, carries the lock, and is obviously a
// control. Like CollectGateButton it stays clickable while the concept's check
// is locked out — the modal is where the wait is explained and where the link
// to the concept page lives.

import { ArrowRight, Loader2, Lock, TimerReset } from 'lucide-react'
import { useCollectLockout } from '@/hooks/useCollectLockouts'
import { formatLockoutRemaining, formatLockoutShort } from '@/lib/collectLockout'

interface Props {
  name: string
  /** True once the card is collected and its promotion is still in flight. */
  pending?: boolean
  onClick: () => void
}

export function CollectLevelUpCard({ name, pending = false, onClick }: Props) {
  const { remainingMs } = useCollectLockout(name)
  return (
    <CollectLevelUpCardView
      name={name}
      remainingMs={remainingMs}
      pending={pending}
      onClick={onClick}
    />
  )
}

/** The card itself, given the wait rather than reading it (keeps it testable). */
export function CollectLevelUpCardView({
  name,
  remainingMs,
  pending = false,
  onClick,
}: Props & { remainingMs: number }) {
  const locked = !pending && remainingMs > 0
  const waitLabel = locked ? formatLockoutRemaining(remainingMs) : ''

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title={locked ? `Check locked — reopens in ${waitLabel}` : undefined}
      aria-label={
        pending ? `Collecting ${name}`
          : locked ? `${name} check locked, reopens in ${waitLabel}`
          : `Collect ${name} to reach Level 1`
      }
      className="flex flex-col gap-1.5 rounded-xl bg-card px-4 py-3 text-left shadow-sm ring-1 ring-inset ring-primary/30 transition-all hover:shadow-md hover:ring-primary/60 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
    >
      <span className="flex items-start gap-1.5">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="min-w-0 text-sm font-semibold leading-snug text-foreground line-clamp-2">
          {name}
        </span>
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
        {pending ? (
          <>
            <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
            Collecting…
          </>
        ) : locked ? (
          <>
            <TimerReset className="h-3 w-3 shrink-0" />
            <span className="tabular-nums">Collect in {formatLockoutShort(remainingMs)}</span>
          </>
        ) : (
          <>
            Collect
            <ArrowRight className="h-3 w-3 shrink-0" />
            Level 1
          </>
        )}
      </span>
    </button>
  )
}
