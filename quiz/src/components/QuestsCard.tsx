import { Gem, Loader2 } from 'lucide-react'

/** The emerald "collect rewards" pill shared by the quest panel's header and its quest detail. */
export function CollectButton({
  gems,
  xp,
  busy,
  onClick,
}: {
  gems: number
  xp: number
  busy: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Gem className="h-3.5 w-3.5" />}
      <span className="tabular-nums">{gems}</span>
      <span className="font-semibold opacity-90 tabular-nums">+{xp} XP</span>
    </button>
  )
}
