import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ActuariaMark, ActuariaWordmark } from '@/components/actuaria/ActuariaMark'
import { Button, buttonVariants } from '@/components/ui/button'
import { MobileNavButton } from '@/components/MobileNavButton'
import { stationCountLine } from '@/lib/actuaria/lexicon'
import { starfield } from '@/lib/actuaria/scene'
import { cn } from '@/lib/utils'

/**
 * The **title screen** (docs/actuaria-online.md §6.1) — the first visit only;
 * after it `/actuaria` goes straight to the map. A still scene: a field of
 * stars, a planet's horizon with the signal orbit ring across it, and the mark,
 * the wordmark and the tagline. The one number on it is real: how many players
 * are in Quiz Battle's lobby right now, from an observer session.
 */
export function TitleScreen({ lobbyCount, onEnter }: { lobbyCount: number | null; onEnter: () => void }) {
  const stars = useMemo(() => starfield(170, 1200, 800, 4104), [])

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden" data-testid="actuaria-title">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="hsl(var(--foreground))" opacity={s.opacity} />
        ))}
        {/* The planet's horizon, and the orbit ring laid across it. */}
        <ellipse cx="600" cy="1340" rx="980" ry="660" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <ellipse cx="600" cy="700" rx="760" ry="92" transform="rotate(-6 600 700)" fill="none" stroke="hsl(var(--actuaria-signal))" strokeWidth="2" opacity="0.9" />
      </svg>

      <div className="relative z-10 flex items-center gap-2 px-3 pt-3 sm:px-6 sm:pt-5">
        <MobileNavButton />
        <span className="flex items-center gap-2 text-sm font-semibold">
          <img src="/favicon.png" alt="" className="h-5 w-5 brightness-0 invert" />
          Actuarial Notes
          <span className="font-mono text-[10px] font-normal uppercase tracking-[0.4em] text-muted-foreground">presents</span>
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-28 text-center">
        <ActuariaMark size={112} />
        <h1 className="sr-only">Actuaria Online</h1>
        <ActuariaWordmark size="lg" />
        <p className="max-w-md text-base text-muted-foreground sm:text-lg">Pass actuarial exams like it’s a game.</p>
        <div className="flex w-full max-w-xs flex-col gap-2 sm:max-w-none sm:flex-row sm:justify-center">
          <Button size="lg" className="h-12 rounded-full px-8 text-base" onClick={onEnter} data-testid="actuaria-enter" data-sound="begin">
            Enter Actuaria
          </Button>
          <Link to="/wiki" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-12 rounded-full px-8 text-base' })}>
            Back to Study Guides
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-6">
        <p className="flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm backdrop-blur-sm" data-testid="actuaria-title-lobby">
          <span aria-hidden className={cn('h-2 w-2 rounded-full', lobbyCount ? 'bg-actuaria-signal' : 'bg-muted-foreground/40')} />
          {stationCountLine(lobbyCount)}
        </p>
      </div>
    </div>
  )
}
