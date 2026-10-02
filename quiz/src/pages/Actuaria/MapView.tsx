import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Loader2, Play, Swords } from 'lucide-react'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { CredibilityBar } from '@/components/actuaria/CredibilityBar'
import { HudFrame } from '@/components/actuaria/HudFrame'
import { LandmarkRow } from '@/components/actuaria/LandmarkRow'
import { SectorTile } from '@/components/actuaria/SectorTile'
import { StarMap } from '@/components/actuaria/StarMap'
import { ShipGlyph } from '@/components/actuaria/ShipGlyph'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { Term } from '@/components/actuaria/Term'
import { Button, buttonVariants } from '@/components/ui/button'
import { useActuariaPrefs } from '@/hooks/useActuariaPrefs'
import { useAuth } from '@/hooks/useAuth'
import { useCrew } from '@/hooks/useCrew'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useOwnedShips } from '@/hooks/useOwnedShips'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { sectorCredibility } from '@/lib/actuaria/credibility'
import { panelLandmarks, sectorRegions, uniqueLandmarks } from '@/lib/actuaria/landmarks'
import { sectorName, stationCountLine } from '@/lib/actuaria/lexicon'
import { shipView } from '@/lib/actuaria/ship'
import { sectorByKey, type Sector } from '@/lib/actuaria/sectors'
import { examAccentStyle } from '@/lib/examColors'
import { wikiRoute } from '@/lib/wikiRoutes'
import { useOpenLandmark } from './useOpenLandmark'

/** A battle needs at least this many raceable questions — `battleExamCounts`' own floor. */
const MIN_BATTLE_QUESTIONS = 3

/**
 * The **star map** (docs/actuaria-online.md §6.3): every sector on the player's
 * track round a central star, Monte Carlo Station on the inner orbit with the
 * lobby's live count, and the selected sector's panel — its Credibility, its
 * landmarks and the ways into it.
 */
export function MapView({
  world,
  lobbyCount,
  battleCounts,
}: {
  world: ActuariaWorld
  lobbyCount: number | null
  battleCounts: ReadonlyMap<string, number>
}) {
  const navigate = useNavigate()
  const compact = useIsMobile(1023)
  const [selected, setSelected] = useState<string | null>(null)
  const selectedSector = sectorByKey(world.sectors, selected ?? undefined) ?? world.activeSector ?? world.sectors[0] ?? null

  // Gambler's Ruin is drawn only while the active sector's cohort has a raid up.
  const activeKey = world.activeSector?.status === 'in_progress' ? world.activeSector.key : null
  const { crew } = useCrew(activeKey)
  const raid = crew?.raid
  const raidOnMap = raid && raid.phase !== 'defeated'
    ? {
        label: `${raid.bossHealth.toLocaleString('en-US')} of ${raid.bossMax.toLocaleString('en-US')} health left`,
        onOpen: () => navigate(`/actuaria/raid?exam=${encodeURIComponent(crew.crew.exam)}`),
      }
    : null

  if (world.loading && world.sectors.length === 0) {
    return (
      <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Charting the system…
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-4 sm:px-6 lg:py-6">
      <h1 className="sr-only">Star map</h1>
      <div className="grid gap-4 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="relative min-w-0">
          <PlayerCard world={world} />
          <StarMap
            sectors={world.sectors}
            readiness={world.readiness}
            selectedKey={selectedSector?.key ?? null}
            activeKey={world.activeSector?.key ?? null}
            stationLabel={stationCountLine(lobbyCount, true)}
            size={compact ? 'compact' : 'wide'}
            onSelect={setSelected}
            onStation={() => navigate('/actuaria/battle')}
            raid={raidOnMap}
          />
          <Legend />
        </div>
        {selectedSector && (
          <SectorPanel
            key={selectedSector.key}
            sector={selectedSector}
            world={world}
            battleCount={selectedSector.bankLabel ? battleCounts.get(selectedSector.bankLabel) ?? 0 : 0}
          />
        )}
      </div>
    </div>
  )
}

function PlayerCard({ world }: { world: ActuariaWorld }) {
  const { user } = useAuth()
  const meta = user?.user_metadata ?? {}
  const name = (meta.full_name as string | undefined) || (meta.display_name as string | undefined) || user?.email?.split('@')[0] || 'Guest pilot'
  const active = world.activeSector
  const credibility = active ? sectorCredibility(world.readiness.get(active.key)?.overallPct ?? 0) : null
  // The ship they fly — cosmetic, and shown only here and in the Hangar (§7.3).
  const { prefs } = useActuariaPrefs()
  const { owned } = useOwnedShips()
  const ship = shipView(prefs.ship, owned)

  return (
    <div className="mb-3 flex w-full max-w-xs items-center gap-3 rounded-xl bg-card/90 p-3 backdrop-blur-sm lg:absolute lg:left-0 lg:top-0 lg:z-10 lg:mb-0 lg:w-64">
      <AvatarDisplay avatarUrl={(meta.avatar_url as string | undefined) ?? ''} initials={name.slice(0, 2).toUpperCase()} size={36} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        {active && credibility ? (
          <CredibilityBar
            z={credibility.z}
            label={credibility.label}
            size="sm"
            ariaLabel={`${sectorName(active.key)} Credibility`}
          />
        ) : (
          <p className="text-xs text-muted-foreground">No sector charted yet</p>
        )}
      </div>
      <Link to="/actuaria/hangar" aria-label={`Your ship: hull ${ship.labels.hull}, trail ${ship.labels.trail}. Open the Hangar`} data-testid="actuaria-player-ship" className="rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ShipGlyph look={ship.look} size={36} />
      </Link>
    </div>
  )
}

function Legend() {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-muted-foreground" /> <Term id="sector">Charted sector</Term>
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full border border-dashed border-muted-foreground" /> <Term id="uncharted" />
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-actuaria-signal" /> You are here
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full border-2 border-green-500" /> <Term id="sectorCredibility" />
      </span>
    </div>
  )
}

function SectorPanel({ sector, world, battleCount }: { sector: Sector; world: ActuariaWorld; battleCount: number }) {
  const navigate = useNavigate()
  const openLandmark = useOpenLandmark()
  const [charting, setCharting] = useState(false)
  const [chartError, setChartError] = useState(false)
  const readiness = world.readiness.get(sector.key)
  const credibility = sectorCredibility(readiness?.overallPct ?? 0)
  const landmarks = useMemo(
    () => panelLandmarks(uniqueLandmarks(sectorRegions(sector.syllabus, world.recordsFor(sector.key), new Date()))),
    [sector, world],
  )
  const raceable = battleCount >= MIN_BATTLE_QUESTIONS
  const studyGuide = sector.syllabus.fileName ? wikiRoute({ kind: 'exam', name: sector.syllabus.fileName }) : '/wiki'

  async function chart() {
    setCharting(true)
    setChartError(false)
    const ok = await world.chart(sector.key)
    setCharting(false)
    if (!ok) setChartError(true)
  }

  const battleAction = raceable ? (
    <Button
      size="lg"
      variant={sector.charted ? 'default' : 'outline'}
      className="w-full gap-2 rounded-full"
      onClick={() => navigate(`/actuaria/battle?exam=${encodeURIComponent(sector.bankLabel!)}`)}
      data-testid="actuaria-battle-sector"
    >
      <Swords className="h-4 w-4" aria-hidden /> Battle this sector
    </Button>
  ) : sector.bankLabel ? (
    <Button
      size="lg"
      variant={sector.charted ? 'default' : 'outline'}
      className="w-full gap-2 rounded-full"
      onClick={() => navigate(`/?topic=${encodeURIComponent(sector.bankLabel!)}`)}
      data-testid="actuaria-train-sector"
    >
      <Play className="h-4 w-4" aria-hidden /> Train in Quiz
    </Button>
  ) : null

  return (
    <HudFrame as="aside" radius="2xl" className="space-y-4 p-4" aria-label={`${sectorName(sector.key)} — selected sector`} data-testid="actuaria-sector-panel">
      <div
        style={examAccentStyle(sector.key)}
        className="flex items-center gap-3 rounded-xl border border-[var(--exam-accent-muted)] bg-[var(--exam-accent-soft)] p-3"
      >
        <SectorTile examKey={sector.key} charted={sector.charted} />
        <div className="min-w-0 flex-1">
          <p className="actuaria-display truncate text-sm">{sectorName(sector.key)}</p>
          <p className="truncate text-xs text-muted-foreground">{sector.title}</p>
        </div>
        {sector.cleared ? (
          <StatusChip variant="cleared">Passed</StatusChip>
        ) : !sector.charted ? (
          <StatusChip variant="locked">Uncharted</StatusChip>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="actuaria-display text-[11px] text-muted-foreground"><Term id="sectorCredibility" /></p>
          {readiness && <p className="text-xs text-muted-foreground">{readiness.band.label}</p>}
        </div>
        <CredibilityBar z={credibility.z} label={credibility.label} ariaLabel={`${sectorName(sector.key)} Credibility`} />
      </div>

      {landmarks.length > 0 && (
        <div>
          <p className="actuaria-display text-[11px] text-muted-foreground"><Term id="landmark">Landmarks</Term></p>
          <ul className="divide-y divide-border/60">
            {landmarks.map((l, i) => (
              <LandmarkRow
                key={l.concept.name}
                name={l.inWorldName ?? l.concept.name}
                conceptName={l.inWorldName ? l.concept.name : null}
                state={l.state}
                decay={l.decay}
                onOpen={() => openLandmark(landmarks.map(x => x.concept.name), i)}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        {!sector.charted && (
          world.signedIn ? (
            <Button size="lg" className="w-full rounded-full" onClick={chart} disabled={charting} data-testid="actuaria-chart">
              {charting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Chart this sector
            </Button>
          ) : (
            <Link to="/auth" className={buttonVariants({ size: 'lg', className: 'w-full rounded-full' })}>
              Sign in to chart this sector
            </Link>
          )
        )}
        {chartError && <p className="text-xs text-destructive">That didn’t save — try again in a moment.</p>}
        {battleAction}
        {!raceable && sector.bankLabel && (
          <p className="text-xs text-muted-foreground">
            Battles need multiple-choice questions, and this exam’s are written — train on them in a quiz.
          </p>
        )}
        <Link to={studyGuide} className={buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full gap-2 rounded-full' })}>
          <BookOpen className="h-4 w-4" aria-hidden /> Open study guide
        </Link>
        <Link
          to={`/actuaria/sector/${encodeURIComponent(sector.key)}`}
          className="block rounded-md text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          data-testid="actuaria-sector-detail"
        >
          Every landmark in {sectorName(sector.key)}
        </Link>
      </div>
    </HudFrame>
  )
}
