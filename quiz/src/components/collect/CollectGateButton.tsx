// The "Collect" button the pre- and post-quiz gates put beside each uncollected
// concept — and the one place outside the collect modal that has to admit a
// check is shut. A concept whose comprehension check has been missed is locked
// for a while (30 minutes, then a day — see lib/collectLockout.ts), so the
// button counts that wait down rather than promising a collection the reader
// can't make yet.
//
// It stays clickable while locked: the collect modal is where the wait is
// explained and where the concept page is one tap away, which is exactly where a
// reader who just missed the check should end up.

import { Lock, TimerReset } from 'lucide-react'
import { useCollectLockout } from '@/hooks/useCollectLockouts'
import { formatLockoutRemaining, formatLockoutShort } from '@/lib/collectLockout'

export function CollectGateButton({ name, onClick }: { name: string; onClick: () => void }) {
  const { remainingMs } = useCollectLockout(name)
  return <CollectGateButtonView name={name} remainingMs={remainingMs} onClick={onClick} />
}

/** The button itself, given the wait rather than reading it (keeps it testable). */
export function CollectGateButtonView({
  name,
  remainingMs,
  onClick,
}: {
  name: string
  /** Milliseconds until this concept's check reopens; 0 when it's open. */
  remainingMs: number
  onClick: () => void
}) {
  const locked = remainingMs > 0
  const waitLabel = locked ? formatLockoutRemaining(remainingMs) : ''

  return (
    <button
      type="button"
      onClick={onClick}
      title={locked ? `Check locked — reopens in ${waitLabel}` : undefined}
      aria-label={locked ? `${name} check locked, reopens in ${waitLabel}` : `Collect ${name}`}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        locked
          ? 'bg-muted text-muted-foreground hover:bg-accent'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      }`}
    >
      {locked ? (
        <>
          <TimerReset className="h-3.5 w-3.5" />
          <span className="tabular-nums">{formatLockoutShort(remainingMs)}</span>
        </>
      ) : (
        <>
          <Lock className="h-3.5 w-3.5" />
          Collect
        </>
      )}
    </button>
  )
}
