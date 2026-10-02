import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookOpen, ChevronLeft, LineChart, Loader2, Play, Radio, Swords } from 'lucide-react'
import { CredibilityBar } from '@/components/actuaria/CredibilityBar'
import { LandmarkRow } from '@/components/actuaria/LandmarkRow'
import { SectorTile } from '@/components/actuaria/SectorTile'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { Term } from '@/components/actuaria/Term'
import { ExamWeightLabel } from '@/components/ExamWeightLabel'
import { ProgressGraph } from '@/components/ui/LearningProgressGraph'
import { buttonVariants } from '@/components/ui/button'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useConceptLearningHistory } from '@/hooks/useConceptLearningHistory'
import { projectedDecay, sectorCredibility, SECTOR_FILL } from '@/lib/actuaria/credibility'
import { decayingNow, sectorRegions, uniqueLandmarks, type Landmark } from '@/lib/actuaria/landmarks'
import { sectorName } from '@/lib/actuaria/lexicon'
import { sectorByKey, type Sector } from '@/lib/actuaria/sectors'
import { buildMasteryLookup, lookupConceptRecord } from '@/lib/conceptMatch'
import { examAccentStyle } from '@/lib/examColors'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'
import { useOpenLandmark } from './useOpenLandmark'

/**
 * A **sector** up close (docs/actuaria-online.md §6.4, §6.5): its regions —
 * the exam's learning objectives, with their weights — each listing its
 * landmarks with their Credibility and what decay is coming; and beside them,
 * how the sector's Z is made up, what is decaying now, and one landmark's
 * chart. Every landmark opens in the concept popup.
 */
export function SectorView({ world, battleCounts }: { world: ActuariaWorld; battleCounts: ReadonlyMap<string, number> }) {
  const { exam } = useParams()
  const sector = sectorByKey(world.sectors, exam)

  if (!sector) {
    return (
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-10 text-center">
        {world.loading ? (
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Charting the system…
          </p>
        ) : (
          <>
            <p className="actuaria-display text-sm">No such sector on your map</p>
            <Link to="/actuaria/map" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>Back to the star map</Link>
          </>
        )}
      </div>
    )
  }
  return <SectorDetail key={sector.key} sector={sector} world={world} battleCount={sector.bankLabel ? battleCounts.get(sector.bankLabel) ?? 0 : 0} />
}

function SectorDetail({ sector, world, battleCount }: { sector: Sector; world: ActuariaWorld; battleCount: number }) {
  const navigate = useNavigate()
  const openLandmark = useOpenLandmark()
  const records = world.recordsFor(sector.key)
  const now = useMemo(() => new Date(), [])
  const regions = useMemo(() => sectorRegions(sector.syllabus, records, sector.key, now), [sector, records, now])
  const all = useMemo(() => uniqueLandmarks(regions), [regions])
  const soon = useMemo(() => decayingNow(all), [all])
  const readiness = world.readiness.get(sector.key)
  const credibility = sectorCredibility(readiness?.overallPct ?? 0)
  const [charted, setCharted] = useState<string | null>(null)
  const chartLandmark = all.find(l => l.concept.name === charted) ?? soon[0] ?? all.find(l => l.keystone) ?? all[0] ?? null
  const names = all.map(l => l.concept.name)
  const open = (l: Landmark) => openLandmark(names, names.indexOf(l.concept.name))
  const studyGuide = sector.syllabus.fileName ? wikiRoute({ kind: 'exam', name: sector.syllabus.fileName }) : '/wiki'
  const raceable = battleCount >= 3

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-4 sm:px-6 lg:py-6">
      <Link
        to="/actuaria/map"
        className="-ml-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden /> Star map
      </Link>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <SectorTile examKey={sector.key} charted={sector.charted} />
          <div className="min-w-0">
            <h1 className="actuaria-display truncate text-xl sm:text-2xl">{sectorName(sector.key)}</h1>
            <p className="truncate text-sm text-muted-foreground">{sector.label} · {sector.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={studyGuide} className={buttonVariants({ variant: 'outline', className: 'gap-2 rounded-full' })}>
            <BookOpen className="h-4 w-4" aria-hidden /> Study guide
          </Link>
          {raceable ? (
            <button
              type="button"
              onClick={() => navigate(`/actuaria/battle?exam=${encodeURIComponent(sector.bankLabel!)}`)}
              className={buttonVariants({ className: 'gap-2 rounded-full' })}
            >
              <Swords className="h-4 w-4" aria-hidden /> Battle this sector
            </button>
          ) : sector.bankLabel ? (
            <button
              type="button"
              onClick={() => navigate(`/?topic=${encodeURIComponent(sector.bankLabel!)}`)}
              className={buttonVariants({ className: 'gap-2 rounded-full' })}
            >
              <Play className="h-4 w-4" aria-hidden /> Train in Quiz
            </button>
          ) : null}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <section aria-label="Regions" className="space-y-4">
          <p className="actuaria-display text-[11px] text-muted-foreground"><Term id="region">Regions</Term></p>
          {regions.map(region => (
            <div key={region.name} className="rounded-xl bg-card p-4">
              <div className="mb-1 flex items-start gap-3">
                <h2 className="min-w-0 flex-1 text-sm font-semibold">{region.name}</h2>
                {region.weight && <ExamWeightLabel weight={region.weight} />}
              </div>
              <ul className="divide-y divide-border/60">
                {region.landmarks.map(l => (
                  <LandmarkRow
                    key={l.concept.name}
                    name={l.inWorldName ?? l.concept.name}
                    conceptName={l.inWorldName ? l.concept.name : null}
                    state={l.state}
                    keystone={l.keystone}
                    decay={l.decay}
                    onOpen={() => open(l)}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setCharted(l.concept.name)}
                        aria-pressed={chartLandmark?.concept.name === l.concept.name}
                        aria-label={`Chart ${l.concept.name}’s Credibility`}
                        className={cn(
                          'rounded-md p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          chartLandmark?.concept.name === l.concept.name ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                        )}
                      >
                        <LineChart className="h-4 w-4" aria-hidden />
                      </button>
                    }
                  />
                ))}
              </ul>
            </div>
          ))}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="space-y-3 rounded-xl bg-card p-4" style={examAccentStyle(sector.key)}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="actuaria-display text-[11px] text-muted-foreground"><Term id="sectorCredibility" /></p>
              {readiness && <p className="text-xs text-muted-foreground">{readiness.band.label}</p>}
            </div>
            <CredibilityBar z={credibility.z} label={credibility.label} ariaLabel={`${sectorName(sector.key)} Credibility`} />
            {/* How the one readiness number is made — its two criteria, each at its weight. */}
            <ul className="space-y-2 pt-1">
              {readiness?.criteria.map(c => (
                <li key={c.id} className="space-y-1">
                  <div className="flex justify-between gap-2 text-xs">
                    <span>{c.label}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">{Math.round(c.pct)}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={c.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(c.pct)}
                    className="overflow-hidden rounded-full bg-muted"
                    style={{ height: c.weight >= 0.5 ? 8 : 5 }}
                  >
                    <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: SECTOR_FILL }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 rounded-xl bg-card p-4">
            <p className="actuaria-display text-[11px] text-muted-foreground"><Term id="orbitalDecay">Decaying now</Term></p>
            {soon.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing here is losing a level. Keep it that way.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {soon.map(l => (
                  <LandmarkRow
                    key={l.concept.name}
                    name={l.inWorldName ?? l.concept.name}
                    conceptName={l.inWorldName ? l.concept.name : null}
                    state={l.state}
                    keystone={l.keystone}
                    decay={l.decay}
                    onOpen={() => open(l)}
                  />
                ))}
              </ul>
            )}
            <Link to="/actuaria/daily" className={buttonVariants({ variant: 'outline', className: 'w-full gap-2 rounded-full' })}>
              <Radio className="h-4 w-4" aria-hidden /> Repair · <Term id="transmission" />
            </Link>
          </div>

          {chartLandmark && (
            <LandmarkChart landmark={chartLandmark} records={records} now={now} />
          )}
        </aside>
      </div>
    </div>
  )
}

function LandmarkChart({ landmark, records, now }: { landmark: Landmark; records: ReturnType<ActuariaWorld['recordsFor']>; now: Date }) {
  const history = useConceptLearningHistory(landmark.concept.name)
  const record = useMemo(() => lookupConceptRecord(buildMasteryLookup(records), landmark.concept), [records, landmark])
  const projection = useMemo(() => projectedDecay(record, now), [record, now])

  return (
    <div className="space-y-2 rounded-xl bg-card p-4" data-testid="actuaria-landmark-chart">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-sm font-medium">{landmark.inWorldName ?? landmark.concept.name}</p>
        {landmark.decay && landmark.decay.inDays <= 7 && <StatusChip variant="decaying">{`${landmark.decay.inDays}d`}</StatusChip>}
      </div>
      <div className="rounded-lg bg-muted/30 p-1 text-foreground">
        {history.loading ? (
          <p className="flex items-center gap-2 p-4 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> Reading the log…</p>
        ) : (
          <ProgressGraph
            levelEvents={history.levelEvents}
            attemptDots={history.attemptDots}
            onHoverLevel={() => {}}
            presentation="actuaria"
            projection={projection}
          />
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Dashes: the decay to come if it isn’t reviewed.
      </p>
    </div>
  )
}
