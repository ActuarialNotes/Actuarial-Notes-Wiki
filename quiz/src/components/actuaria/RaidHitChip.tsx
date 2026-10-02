// What an answer did to the raid boss, said for a moment at the top of a raid
// run (docs/actuaria-online.md §7.7) — a run is an ordinary quiz, so this is
// the only thing on the quiz page that knows it is one. A right answer says
// what it dealt; a miss that healed the boss says so; any other miss says
// nothing, as a miss says nothing anywhere else.

import { useEffect, useState } from 'react'
import { RAID_HIT_EVENT, type RaidHit } from '@/lib/actuaria/raidClient'

const SHOW_MS = 2600

export function RaidHitChip() {
  const [hit, setHit] = useState<RaidHit | null>(null)

  useEffect(() => {
    let timer: number | undefined
    const onHit = (e: Event) => {
      const detail = (e as CustomEvent<RaidHit>).detail
      if (!detail || (detail.damage <= 0 && detail.healed <= 0)) return
      setHit(detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setHit(null), SHOW_MS)
    }
    window.addEventListener(RAID_HIT_EVENT, onHit)
    return () => {
      window.removeEventListener(RAID_HIT_EVENT, onHit)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center" aria-live="polite" data-testid="raid-hit">
      {hit && (
        <p className="rounded-full bg-card px-4 py-1.5 text-sm shadow-md ring-1 ring-border motion-safe:animate-in motion-safe:fade-in">
          {hit.damage > 0
            ? `Hit Gambler’s Ruin for ${hit.damage}${hit.phase === 'defeated' ? ' — it’s down' : ''}`
            : `Gambler’s Ruin healed ${hit.healed}`}
        </p>
      )}
    </div>
  )
}
