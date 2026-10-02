import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { ActuariaBottomBar } from '@/components/actuaria/ActuariaBottomBar'
import { ActuariaHud } from '@/components/actuaria/ActuariaHud'
import { ActuariaScope } from '@/components/actuaria/ActuariaScope'
import { ConceptPopup } from '@/components/wiki/ConceptPopup'
import { useActuariaPrefs } from '@/hooks/useActuariaPrefs'
import { useActuariaWorld } from '@/hooks/useActuariaWorld'
import { useLobbyCount } from '@/hooks/useBattle'
import { useBattleExams } from '@/hooks/useBattleExams'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { battleLoadout } from '@/lib/actuaria/abilities'
import { challenge } from '@/lib/actuaria/crewStore'
import type { LeagueExamOption } from '@/components/LeaderboardPanel'
// Monte Carlo Station *is* Quiz Battle's page, under Actuaria's skin (§6.8).
import Battle from '@/pages/Battle'
import { CohortView } from './CohortView'
import { DailyView } from './DailyView'
import { HangarView } from './HangarView'
import { MapView } from './MapView'
import { RaidView } from './RaidView'
import { SectorView } from './SectorView'
import { SimulationView } from './SimulationView'
import { TitleScreen } from './TitleScreen'

/**
 * **Actuaria Online** — the game layer over Study Mode (docs/actuaria-online.md).
 *
 * Each exam is a *sector* of a star system and each concept a *landmark* in
 * it; a player raises their *Credibility* by studying, battling other
 * candidates and, with a cohort, fighting a weekly boss. It is a skin and a
 * social layer over systems the app already has, never a second game:
 * Credibility is the mastery ladder and the readiness score, Coverage is the
 * streak, a duel is a Quiz Battle, and every concept, question and guide stays
 * exactly as reachable as it is in Study Mode (G9).
 *
 * Every screen renders inside one `ActuariaScope` — always dark, on the dot-grid
 * floor — and this one lazy chunk, so none of it reaches Study Mode's bundle.
 */
export default function Actuaria() {
  const world = useActuariaWorld()
  const { questions, loading: questionsLoading, counts: battleCounts, exams: battleExams } = useBattleExams()
  const { pathname, search } = useLocation()
  const popupOpen = useConceptPopup(s => s.open)
  const closePopupOnNavigation = useConceptPopup(s => s.closeOnNavigation)

  // A landmark opened on one screen closes when the player moves to another,
  // as a concept opened on one wiki page does (WikiLayout).
  useEffect(() => { closePopupOnNavigation(pathname) }, [pathname, closePopupOnNavigation])

  const onTitle = pathname.replace(/\/+$/, '') === '/actuaria'
  const lobbyCount = useLobbyCount(battleExams, onTitle || pathname.startsWith('/actuaria/map'))

  const leagueExams = useMemo<LeagueExamOption[]>(
    () => world.sectors.filter(s => s.status === 'in_progress').map(s => ({ id: s.key, label: s.label })),
    [world.sectors],
  )

  // The abilities this player would take into a private channel: their Hangar
  // loadout, cut to what their keystones hold now (§7.2).
  const { prefs } = useActuariaPrefs()
  const loadout = useMemo(() => battleLoadout(prefs.loadout, world.records, new Date()), [prefs.loadout, world.records])

  // Cohort Clash (§6.11): a room opened from a member's Challenge hands its
  // code to that member in-app — `?crew=&challenge=` on the way in.
  const clashChallenge = useMemo(() => {
    const params = new URLSearchParams(search)
    const crew = params.get('crew')
    const member = params.get('challenge')
    if (!pathname.startsWith('/actuaria/battle') || !crew || !member) return undefined
    return (code: string) => { void challenge(crew, member, code) }
  }, [pathname, search])

  // A battle owns the foot of the screen while it runs; the tab bar stands down.
  const [battling, setBattling] = useState(false)

  const inWorld = (children: ReactNode, opts: { tabBar?: boolean } = {}) => (
    <InWorld leagueExams={leagueExams} popupOpen={popupOpen} tabBar={opts.tabBar ?? true}>{children}</InWorld>
  )

  return (
    <ActuariaScope>
      <Routes>
        <Route index element={<TitleOrMap lobbyCount={lobbyCount} />} />
        <Route path="map" element={inWorld(<MapView world={world} lobbyCount={lobbyCount} battleCounts={battleCounts} />)} />
        <Route path="sector/:exam" element={inWorld(<SectorView world={world} battleCounts={battleCounts} />)} />
        <Route path="daily" element={inWorld(<DailyView world={world} questions={questions} questionsLoading={questionsLoading} />)} />
        <Route path="hangar" element={inWorld(<HangarView world={world} />)} />
        <Route path="simulation" element={inWorld(<SimulationView world={world} />)} />
        <Route path="cohort" element={inWorld(<CohortView world={world} />)} />
        <Route path="raid" element={inWorld(<RaidView world={world} />)} />
        <Route
          path="battle"
          element={inWorld(<Battle skin="actuaria" onPlayingChange={setBattling} loadout={loadout} onRoomOpen={clashChallenge} />, { tabBar: !battling })}
        />
        <Route path="*" element={<Navigate to="/actuaria/map" replace />} />
      </Routes>
      {/* The one reader: a landmark opens where a concept always does. */}
      <ConceptPopup />
    </ActuariaScope>
  )
}

/** `/actuaria`: the title screen the first time, the map every time after (§6.1). */
function TitleOrMap({ lobbyCount }: { lobbyCount: number | null }) {
  const navigate = useNavigate()
  const { prefs, loading, update } = useActuariaPrefs()
  if (prefs.titleSeen) return <Navigate to="/actuaria/map" replace />
  // A signed-in player's row may say they've seen it on another device.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Entering orbit…
      </div>
    )
  }
  return (
    <TitleScreen
      lobbyCount={lobbyCount}
      onEnter={() => {
        void update({ titleSeen: true })
        navigate('/actuaria/map')
      }}
    />
  )
}

function InWorld({
  leagueExams,
  popupOpen,
  tabBar,
  children,
}: {
  leagueExams: LeagueExamOption[]
  popupOpen: boolean
  tabBar: boolean
  children: ReactNode
}) {
  return (
    <>
      <ActuariaHud leagueExams={leagueExams} />
      <div
        style={{
          paddingBottom: popupOpen
            ? 'calc(var(--concept-split-height, 50vh) + 1.5rem)'
            : 'calc(var(--action-bar-height, 0px) + 1.5rem)',
        }}
      >
        {children}
      </div>
      {tabBar && <ActuariaBottomBar />}
    </>
  )
}

