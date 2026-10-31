import { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles, Star } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import {
  EMPTY_WATCH,
  observeSubscription,
  onProCelebrationRequest,
  requestCelebration,
} from '@/lib/proCelebration'
import { cn } from '@/lib/utils'

/**
 * The welcome to Pro: mounted once at the app root, it watches the
 * subscription and plays a small ceremony the moment an account becomes Pro —
 * the Pro chip dropping in with a burst of stars and a little confetti. When
 * it plays is `lib/proCelebration.ts`; this is only the drawing.
 */
export function ProCelebration() {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const { isPro, loading, refresh } = useSubscription()
  const watch = useRef(EMPTY_WATCH)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const step = observeSubscription(watch.current, { userId, isPro, loading })
    watch.current = step.watch
    if (step.celebrate) setOpen(true)
  }, [userId, isPro, loading])

  const refreshRef = useRef(refresh)
  refreshRef.current = refresh
  useEffect(() => onProCelebrationRequest(request => {
    const step = requestCelebration(watch.current, request)
    watch.current = step.watch
    if (step.celebrate) setOpen(true)
    // Waiting on Pro: ask for it rather than hoping Realtime brings it.
    else if (step.watch.pending) refreshRef.current()
  }), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  return <ProCelebrationOverlay onClose={() => setOpen(false)} />
}

// Stars thrown out from behind the chip: an angle and a distance each, fixed
// so the burst looks the same every time.
const BURST = [
  { angle: -90, dist: 74, size: 18, delay: 260 },
  { angle: -35, dist: 82, size: 14, delay: 320 },
  { angle: 20, dist: 70, size: 16, delay: 300 },
  { angle: 75, dist: 78, size: 12, delay: 360 },
  { angle: 130, dist: 72, size: 15, delay: 340 },
  { angle: 185, dist: 80, size: 13, delay: 280 },
  { angle: 235, dist: 70, size: 17, delay: 380 },
]

function ProCelebrationOverlay({ onClose }: { onClose: () => void }) {
  useSoundOnMount('levelUp')

  const confetti = useMemo(
    () => Array.from({ length: 30 }, (_, i) => ({
      left: (i * 37) % 100,
      delay: 200 + (i % 8) * 80,
      drift: ((i * 53) % 70) - 35,
      spin: ((i * 97) % 540) + 180,
      gold: i % 3 !== 0,
      wide: i % 2 === 0,
    })),
    [],
  )

  return (
    <div
      className="streak-celebrate-overlay fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="You have Pro"
      onClick={onClose}
    >
      <div
        className="streak-celebrate-card relative w-full max-w-sm space-y-5 overflow-hidden rounded-2xl bg-card p-6 text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-visible">
          {confetti.map((p, i) => (
            <span
              key={i}
              className={cn('battle-confetti absolute top-0 block rounded-[1px]', p.gold ? 'bg-amber-400' : 'bg-foreground')}
              style={{
                left: `${p.left}%`,
                width: p.wide ? 8 : 5,
                height: p.wide ? 5 : 9,
                animationDelay: `${p.delay}ms`,
                ['--drift' as string]: `${p.drift}px`,
                ['--spin' as string]: `${p.spin}deg`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <div aria-hidden className="relative flex h-32 w-40 items-center justify-center">
            <span className="streak-celebrate-halo absolute inset-3 rounded-full bg-amber-400/20" />
            {BURST.map((s, i) => (
              <Star
                key={i}
                className="pro-celebrate-star absolute text-amber-400"
                fill="currentColor"
                strokeWidth={1}
                style={{
                  width: s.size,
                  height: s.size,
                  animationDelay: `${s.delay}ms`,
                  ['--dx' as string]: `${Math.cos((s.angle * Math.PI) / 180) * s.dist}px`,
                  ['--dy' as string]: `${Math.sin((s.angle * Math.PI) / 180) * s.dist * 0.75}px`,
                }}
              />
            ))}
            <span className="pro-celebrate-chip relative inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-3xl font-extrabold leading-none tracking-wide text-background shadow-lg">
              Pro
              <Sparkles className="pro-celebrate-sparkle absolute -right-3 -top-3 h-6 w-6 text-amber-400" fill="currentColor" strokeWidth={1.5} />
            </span>
          </div>
          <div className="space-y-1.5">
            <p className="text-xl font-bold tracking-tight">You have Pro</p>
            <p className="text-sm text-muted-foreground">
              Your daily study plan, study strategies and the PCPA project are ready when you are.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Start studying
        </button>
      </div>
    </div>
  )
}
