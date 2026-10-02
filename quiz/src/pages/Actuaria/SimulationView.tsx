import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Timer } from 'lucide-react'
import { CredibilityBar } from '@/components/actuaria/CredibilityBar'
import { SectorTile } from '@/components/actuaria/SectorTile'
import { Term } from '@/components/actuaria/Term'
import { Button } from '@/components/ui/button'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useLastSimulation } from '@/hooks/useLastSimulation'
import { sectorCredibility } from '@/lib/actuaria/credibility'
import { sectorName, term } from '@/lib/actuaria/lexicon'
import { biggestLifts, simulationFormat, simulationPath } from '@/lib/actuaria/simulation'
import { examAccentStyle } from '@/lib/examColors'
import { formatClock, formatPace } from '@/lib/quizTiming'
import { PRACTICE_EXAM_LABEL } from '@/lib/pastExams'
import { loadRevealMode } from '@/lib/revealMode'
import { cn } from '@/lib/utils'

/**
 * **Simulation** (docs/actuaria-online.md §6.10): the quiz builder's timed
 * Practice Exam, launched from Monte Carlo Station, and after a run the score,
 * the time it took and the sector's readiness — the one number, with its band
 * — then *Biggest lifts*, the promotions that would move that number most.
 */
export function SimulationView({ world }: { world: ActuariaWorld }) {
  const navigate = useNavigate()
  const sectors = useMemo(() => world.sectors.filter(s => s.bankLabel), [world.sectors])
  const [picked, setPicked] = useState<string | null>(null)
  const sector =
    sectors.find(s => s.key === picked) ??
    sectors.find(s => s.key === world.activeSector?.key) ??
    sectors.find(s => s.charted) ??
    sectors[0] ??
    null
  const format = sector ? simulationFormat(sector.bankLabel!) : null
  const { run } = useLastSimulation(sector?.bankLabel ?? null)
  const readiness = sector ? world.readiness.get(sector.key) : undefined
  const credibility = sectorCredibility(readiness?.overallPct ?? 0)
  const lifts = useMemo(
    () => (sector ? biggestLifts(sector.syllabus, world.recordsFor(sector.key), sector.key, new Date()) : []),
    [sector, world],
  )

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-4 sm:px-6 lg:py-6">
      <Link
        to="/actuaria/battle"
        className="-ml-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden /> {term('station')}
      </Link>
      <h1 className="actuaria-display text-xl sm:text-2xl"><Term id="simulation" /></h1>

      <div role="radiogroup" aria-label="Sector" className="flex flex-wrap gap-2">
        {sectors.map(s => (
          <button
            key={s.key}
            type="button"
            role="radio"
            aria-checked={sector?.key === s.key}
            onClick={() => setPicked(s.key)}
            style={examAccentStyle(s.key)}
            className={cn(
              'flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              sector?.key === s.key
                ? 'border-[var(--exam-accent-muted)] bg-[var(--exam-accent-soft)] text-foreground'
                : 'border-transparent bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            <SectorTile examKey={s.key} size="sm" charted={s.charted} />
            <span className="actuaria-display">{s.key.replace(/^CAS-/, '')}</span>
          </button>
        ))}
      </div>

      {sector && format && (
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <section className="space-y-4 rounded-xl bg-card p-5" aria-labelledby="sim-run">
            <div>
              <p className="actuaria-display text-[11px] text-muted-foreground">{sectorName(sector.key)}</p>
              <h2 id="sim-run" className="text-base font-semibold">{PRACTICE_EXAM_LABEL} · {sector.label}</h2>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Questions</dt>
                <dd className="font-mono text-lg tabular-nums">{format.questions}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">At exam pace</dt>
                <dd className="font-mono text-lg tabular-nums">
                  {format.seconds ? formatClock(format.seconds) : format.pace ? formatPace(format.pace) : 'Untimed'}
                </dd>
              </div>
            </dl>
            <Button
              size="lg"
              className="h-12 w-full gap-2 rounded-full text-base"
              onClick={() => navigate(simulationPath(format, loadRevealMode('mock-exam')))}
              data-testid="actuaria-start-simulation"
              data-sound="begin"
            >
              <Timer className="h-5 w-5" aria-hidden /> Start simulation
            </Button>
            {run && (
              <div className="rounded-lg bg-muted/40 p-3" data-testid="actuaria-last-simulation">
                <p className="text-xs text-muted-foreground">Last run · {new Date(run.completedAt).toLocaleDateString()}</p>
                <p className="mt-1 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold tabular-nums">{run.correct}/{run.total}</span>
                  <span className="text-sm text-muted-foreground">{Math.round((run.correct / Math.max(1, run.total)) * 100)}%</span>
                  {run.seconds !== null && <span className="ml-auto font-mono text-sm tabular-nums text-muted-foreground">{formatClock(run.seconds)}</span>}
                </p>
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-xl bg-card p-5" aria-labelledby="sim-readiness">
            <div className="flex items-baseline justify-between gap-2">
              <h2 id="sim-readiness" className="actuaria-display text-[11px] text-muted-foreground"><Term id="sectorCredibility" /></h2>
              {readiness && <p className="text-xs text-muted-foreground">{readiness.band.label}</p>}
            </div>
            <CredibilityBar z={credibility.z} label={credibility.label} ariaLabel={`${sectorName(sector.key)} Credibility`} />
            <div>
              <p className="actuaria-display text-[11px] text-muted-foreground">Biggest lifts</p>
              {lifts.length === 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">Every {term('region').toLowerCase()} is at the top of the ladder.</p>
              ) : (
                <ul className="mt-1 divide-y divide-border/60" data-testid="actuaria-lifts">
                  {lifts.map(l => (
                    <li key={l.name} className="flex items-center gap-3 py-2">
                      <span className="min-w-0 flex-1 truncate text-sm">{l.name}</span>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-green-400" title="Readiness points, one level up">
                        +{l.points.toFixed(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
