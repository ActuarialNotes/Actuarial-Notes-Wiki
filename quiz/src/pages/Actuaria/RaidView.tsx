import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Gem, Loader2 } from 'lucide-react'
import { HudFrame } from '@/components/actuaria/HudFrame'
import { GamblersRuin } from '@/components/actuaria/GamblersRuin'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { Term } from '@/components/actuaria/Term'
import { Button } from '@/components/ui/button'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useCrew, useRaid } from '@/hooks/useCrew'
import { formatZ } from '@/lib/actuaria/credibility'
import { CREW_MIN } from '@/lib/actuaria/crews'
import { sectorName } from '@/lib/actuaria/lexicon'
import { DOUBLE_MULTIPLIER, MISS_HEAL, PHASE_LABEL, PHASE_MARKS, raidTimeLeft, type RaidView as Raid } from '@/lib/actuaria/raid'
import { raidDraw, raidQuizPath } from '@/lib/actuaria/raidClient'
import { cn } from '@/lib/utils'
import { useCrewSector } from './useCrewSector'
import { useOpenLandmark } from './useOpenLandmark'

/**
 * The **Raid** (docs/actuaria-online.md §6.12, §7.7): the cohort's weekly boss.
 * Not a Quiz Battle — each member answers alone, and a run at the boss is an
 * ordinary quiz of questions drawn on the cohort's weak spots, marked by the
 * server (quiz/api/raid.js) and saved like any quiz.
 */
export function RaidView({ world }: { world: ActuariaWorld }) {
  const sector = useCrewSector(world)
  const { crew, loading: crewLoading, signedIn } = useCrew(sector?.key ?? null)
  const { raid, loading, error } = useRaid(crew?.crew.id ?? null)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-4 sm:px-6 lg:py-6">
      <h1 className="actuaria-display text-xl sm:text-2xl">Raid</h1>
      {!signedIn || !sector || (!crewLoading && !crew) ? (
        <section className="space-y-3 rounded-xl bg-card p-5 text-sm">
          <p>A raid is fought by a cohort. Start or join one first.</p>
          <Link to="/actuaria/cohort" className="underline">Go to Cohort</Link>
        </section>
      ) : crewLoading || loading || !raid ? (
        error ? (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        ) : (
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Locating the boss…</p>
        )
      ) : raid.status === 'forming' ? (
        <section className="rounded-xl bg-card p-5 text-sm" data-testid="raid-forming">
          <Term id="boss" /> appears once {sectorName(raid.exam)}’s cohort has {CREW_MIN} members — {raid.needed} to go.
        </section>
      ) : (
        <RaidBoard raid={raid} crewId={crew!.crew.id} />
      )}
    </div>
  )
}

function RaidBoard({ raid, crewId }: { raid: Extract<Raid, { status: 'active' | 'defeated' }>; crewId: string }) {
  const navigate = useNavigate()
  const openLandmark = useOpenLandmark()
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { bossHealth, bossMax, phase, endsAt } = raid.raid
  const pct = bossMax > 0 ? (bossHealth / bossMax) * 100 : 0
  const defeated = raid.status === 'defeated'
  const ends = endsAt ? raidTimeLeft(new Date(endsAt), new Date()) : null

  async function join() {
    setJoining(true)
    setError(null)
    const out = await raidDraw(crewId)
    setJoining(false)
    if ('error' in out) setError(out.error)
    else navigate(raidQuizPath(out.draw, out.questions))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_20rem]" data-testid="raid-board">
      <div className="space-y-5">
        <HudFrame className="space-y-4 p-5" data-testid="raid-boss">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="actuaria-display text-sm">
              <Term id="boss">GAMBLER’S RUIN</Term>
              {ends && !defeated && <span className="text-muted-foreground"> · ENDS IN {ends.toUpperCase()}</span>}
            </p>
            {defeated ? (
              <StatusChip variant="cleared">Defeated</StatusChip>
            ) : phase !== 'open' && (
              // The boss's own state, in the boss's colour — not amber, which says "at risk".
              <span className="rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive" data-testid="raid-phase">{PHASE_LABEL[phase]}</span>
            )}
          </div>
          <GamblersRuin defeated={defeated} className="mx-auto h-40 w-40 sm:h-48 sm:w-48" />

          <div className="space-y-1.5">
            <div
              className="relative h-3 overflow-hidden rounded-full bg-muted"
              role="meter"
              aria-label="Boss health"
              aria-valuemin={0}
              aria-valuemax={bossMax}
              aria-valuenow={bossHealth}
              aria-valuetext={`${bossHealth.toLocaleString('en-US')} of ${bossMax.toLocaleString('en-US')}`}
            >
              <div className="h-full rounded-full bg-destructive motion-safe:transition-[width] motion-safe:duration-500" style={{ width: `${pct}%` }} />
              {PHASE_MARKS.map(m => (
                <span key={m.phase} className="absolute inset-y-0 w-px bg-background" style={{ left: `${m.at * 100}%` }} aria-hidden />
              ))}
            </div>
            <div className="relative h-4 text-[10px] text-muted-foreground" aria-hidden>
              {PHASE_MARKS.map(m => (
                <span key={m.phase} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${m.at * 100}%` }}>{PHASE_LABEL[m.phase]}</span>
              ))}
            </div>
            <p className="text-xs tabular-nums text-muted-foreground">{bossHealth.toLocaleString('en-US')} / {bossMax.toLocaleString('en-US')}</p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-3">
            <RuleCard title="Hit" active={phase === 'open'}>A right answer deals 100 + speed on the exam’s pace. A miss costs nothing.</RuleCard>
            <RuleCard title="Double or nothing" active={phase === 'double' || phase === 'all_in'}>
              At half health: hits deal ×{DOUBLE_MULTIPLIER}, and a miss heals it by {MISS_HEAL}.
            </RuleCard>
            <RuleCard title="All in" active={phase === 'all_in'}>At a quarter: hard questions only.</RuleCard>
          </ul>
        </HudFrame>

        {defeated ? (
          <p className="rounded-xl bg-card p-5 text-sm" data-testid="raid-defeated">
            Gambler’s Ruin is down. Everyone who dealt damage earned the Stop-Loss Shield decal — equip it in the{' '}
            <Link to="/actuaria/hangar" className="underline">Hangar</Link>. The loot is paid when the week ends.
          </p>
        ) : (
          <div className="space-y-2">
            <Button className="w-full rounded-full" size="lg" onClick={() => void join()} disabled={joining} data-testid="raid-join">
              {joining ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join the raid'}
            </Button>
            <p className="text-center text-xs text-muted-foreground">Five questions, marked as you go. Your answers count as a quiz too.</p>
            {error && <p className="text-center text-sm text-destructive" role="alert">{error}</p>}
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="raid-damage">
          <h2 id="raid-damage" className="actuaria-display text-[11px] text-muted-foreground">Cohort damage</h2>
          {raid.board.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hits yet this week.</p>
          ) : (
            <ul className="space-y-2" data-testid="raid-damage-board">
              {raid.board.map(row => (
                <li key={row.name + row.damage} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className={cn('truncate', row.isSelf && 'font-semibold')}>{row.name}{row.isSelf ? ' (you)' : ''}</span>
                    <span className="shrink-0 tabular-nums text-muted-foreground">{row.damage.toLocaleString('en-US')} · {Math.round(row.share * 100)}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
                    <div className="h-full rounded-full bg-foreground/70" style={{ width: `${row.share * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="raid-weak">
          <h2 id="raid-weak" className="actuaria-display text-[11px] text-muted-foreground">Weak spots the boss is using</h2>
          {raid.weakSpots.length === 0 ? (
            <p className="text-sm text-muted-foreground">Shared when members open the Cohort screen.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {raid.weakSpots.map((w, i) => (
                <li key={w.concept} className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="truncate text-left underline decoration-dotted underline-offset-2 hover:text-foreground"
                    onClick={() => openLandmark(raid.weakSpots.map(x => x.concept), i)}
                  >
                    {w.concept}
                  </button>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">Z {formatZ(w.z)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-1 rounded-xl bg-card p-5" aria-labelledby="raid-loot">
          <h2 id="raid-loot" className="actuaria-display text-[11px] text-muted-foreground">Loot pool</h2>
          <p className="flex items-center gap-1.5 text-lg font-semibold tabular-nums">{raid.lootPool} <Gem className="h-4 w-4" aria-label="gems" /></p>
          <p className="text-xs text-muted-foreground">Split by damage when the week ends.</p>
        </section>
      </aside>
    </div>
  )
}

function RuleCard({ title, active, children }: { title: string; active: boolean; children: ReactNode }) {
  return (
    <li className={cn('space-y-1 rounded-lg p-3 text-xs', active ? 'bg-muted ring-1 ring-border' : 'bg-muted/30 text-muted-foreground')}>
      <p className="font-semibold text-foreground">{title}</p>
      <p>{children}</p>
    </li>
  )
}
