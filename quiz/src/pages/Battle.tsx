import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Globe, Loader2, LogIn, Play, Shuffle, Timer, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkinLogo } from '@/components/battle/SkinParts'
import { BattleSetupForm } from '@/components/battle/BattleSetupForm'
import { LocalBattle } from '@/components/battle/LocalBattle'
import { OnlineGuest, OnlineHost } from '@/components/battle/OnlineBattle'
import { Matchmaking } from '@/components/battle/Matchmaking'
import { useAuth } from '@/hooks/useAuth'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useLobbyCount } from '@/hooks/useBattle'
import { BattleSkinContext, useBattleSkin } from '@/hooks/useBattleSkin'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { battleSkin, type BattleSkinId } from '@/lib/battleSkin'
import { moveScreen } from '@/lib/viewTransition'
import { stationCountLine, term } from '@/lib/actuaria/lexicon'
import {
  BASE_POINTS,
  FASTEST_BONUS,
  FINAL_ROUND_MULTIPLIER,
  SPEED_BONUS_MAX,
  STREAK_STEP,
  STREAK_STEPS_MAX,
  WRONG_BUZZ_PENALTY,
  battleExamCounts,
  battlePool,
  cleanPlayerName,
  drawBattleQuestions,
  questionKey,
  type AbilityId,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
} from '@/lib/battle'
import { DEFAULT_PLAYER_NAMES } from '@/lib/battleDisplay'
import { ROOM_CODE_LENGTH, isRoomCode, normalizeRoomCode } from '@/lib/battleRoom'
import {
  configFromSetup,
  difficultyTarget,
  loadBattleSetup,
  matchSettings,
  pickExam,
  pickLobbyExam,
  roomConfig,
  saveBattleSetup,
  type BattleSetup,
} from '@/lib/battleSetup'
import type { MatchFound } from '@/lib/battleMatchmaking'
import { isQueued } from '@/lib/battleQueue'
import { useBattleQueueStore } from '@/stores/battleQueueStore'
import type { TopicSource } from '@/lib/battleSession'
import { catalogueTopics, drawFromTopics, topicCatalogue, type TopicGroup } from '@/lib/battleTopics'
import { EXAM_LABEL_TO_ID, bankLabelFor } from '@/lib/examIds'
import { cn } from '@/lib/utils'
import { trackBattleStarted } from '@/lib/analytics'

// **Quiz Battle** — two players, the same questions, one scoreboard
// (docs/quiz-battle.md). This page is the way in and the switchboard: the
// choice of how to play, the settings, joining a room by its code, the
// matchmaking lobby, and then whichever battle was picked — `LocalBattle` on
// one screen, `OnlineHost` / `OnlineGuest` across two (a matched battle is an
// online one whose room the lobby chose).

type Screen =
  | { kind: 'home' }
  | { kind: 'setup'; mode: 'local' | 'host' }
  | { kind: 'join'; code: string }
  | { kind: 'lobby' }
  | { kind: 'local'; config: BattleConfig; players: [BattlePlayer, BattlePlayer]; difficulty: number }
  | { kind: 'host'; config: BattleConfig; player: BattlePlayer; difficulty: number; code?: string; opponent?: BattlePlayer }
  | { kind: 'guest'; code: string; player: BattlePlayer; matched?: boolean; opponent?: BattlePlayer }

/**
 * How far in from the way in a screen lies: the way in, then the lobby, a
 * battle's setup or the join form, then a battle. A change of screen deeper
 * lays a sheet over; one back up swipes it off (`moveScreen`).
 */
function screenDepth(screen: Screen): number {
  switch (screen.kind) {
    case 'home': return 0
    case 'setup':
    case 'join':
    case 'lobby': return 1
    default: return 2
  }
}

function lobbyCountLine(count: number | null): string {
  if (count === null) return 'Checking the lobby…'
  if (count === 0) return 'No one’s in the lobby right now'
  return `${count} ${count === 1 ? 'player' : 'players'} waiting now`
}

/** Ladder order — the order the question bank's labels are declared in. */
const LADDER = Object.keys(EXAM_LABEL_TO_ID)

function accountName(user: ReturnType<typeof useAuth>['user']): string {
  const meta = user?.user_metadata ?? {}
  return (meta.full_name as string | undefined) || (meta.display_name as string | undefined) || user?.email?.split('@')[0] || ''
}

function PageTitle({ onBack, backLabel = 'Back', children }: { onBack: () => void; backLabel?: string; children: ReactNode }) {
  const skin = useBattleSkin()
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        aria-label={backLabel}
        title={backLabel}
        className="-ml-1.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <h1
        className={cn(
          'min-w-0 flex-1 truncate',
          skin.id === 'actuaria' ? 'actuaria-display text-xl sm:text-2xl' : 'text-2xl font-bold tracking-tight',
        )}
      >
        {children}
      </h1>
    </div>
  )
}

function ModeCard({
  icon,
  title,
  plain,
  body,
  children,
}: {
  icon: ReactNode
  title: string
  /** Quiz Battle's own name for this way in, when the skin renames it. */
  plain?: string | null
  body: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted" aria-hidden>{icon}</span>
        <div className="min-w-0 space-y-1">
          <h2 className={plain ? 'actuaria-display text-sm' : 'font-semibold'} title={plain ?? undefined}>{title}</h2>
          {plain && <p className="text-xs font-medium text-foreground/80">{plain}</p>}
          <p className="text-sm text-muted-foreground">{body}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-2">{children}</div>
    </div>
  )
}

/** The scoring, stated once, from the constants the engine scores by. */
function HowPointsWork() {
  const [open, setOpen] = useState(false)
  const skin = useBattleSkin()
  const rows: [string, string][] = [
    ['Right answer', `${BASE_POINTS}`],
    ['Speed', `up to +${SPEED_BONUS_MAX} — the sooner, the more`],
    ['Streak', `+${STREAK_STEP} for two in a row, up to +${STREAK_STEP * STREAK_STEPS_MAX}`],
    ['Final question', `×${FINAL_ROUND_MULTIPLIER} everything`],
    [skin.local.title, `${skin.claim} costs ${WRONG_BUZZ_PENALTY} and hands your rival the steal`],
    ['Online', `the first right answer gets +${FASTEST_BONUS}; a wrong one costs nothing`],
    ...(skin.abilities
      ? [['Abilities', 'a private channel’s host can turn them on — each once per battle, scored on its own line'] as [string, string]]
      : []),
  ]
  return (
    <div className="rounded-xl bg-card">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-5 py-3.5 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span className="flex-1">How points work</span>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', !open && '-rotate-90')} aria-hidden />
      </button>
      {open && (
        <dl className="space-y-1.5 px-5 pb-4 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-28 shrink-0 font-medium">{k}</dt>
              <dd className="text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

export default function Battle({
  skin: skinId,
  onPlayingChange,
  loadout,
  onRoomOpen,
}: {
  /**
   * The skin to draw the page in — Quiz Battle's own, or Actuaria's Monte Carlo
   * Station (`/actuaria/battle`, docs/actuaria-online.md §6.8). Chrome and words
   * only: the game is the same.
   */
  skin?: BattleSkinId
  /** Told when a battle (or a room) takes the screen over, and when it gives it back. */
  onPlayingChange?: (playing: boolean) => void
  /**
   * The abilities this player takes into a private room with them on — their
   * Hangar loadout, cut to what is unlocked now (docs/actuaria-online.md §7.2).
   */
  loadout?: AbilityId[]
  /**
   * Told the code of a private room this player opens — Actuaria's Cohort
   * Clash hands it to the challenged member in-app (docs/actuaria-online.md
   * §6.11). The room is Quiz Battle's as ever; nothing about it is stored.
   */
  onRoomOpen?: (code: string) => void
} = {}) {
  const skin = battleSkin(skinId)
  return (
    <BattleSkinContext.Provider value={skin}>
      <BattlePage onPlayingChange={onPlayingChange} loadout={skin.abilities ? loadout : undefined} onRoomOpen={onRoomOpen} />
    </BattleSkinContext.Provider>
  )
}

function BattlePage({
  onPlayingChange,
  loadout,
  onRoomOpen,
}: {
  onPlayingChange?: (playing: boolean) => void
  loadout?: AbilityId[]
  onRoomOpen?: (code: string) => void
}) {
  const skin = useBattleSkin()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { user } = useAuth()
  const { questions, loading } = useAllQuestions()
  const { syllabi } = useWikiSyllabus()

  const myName = accountName(user)
  const myAvatar = (user?.user_metadata?.avatar_url as string | undefined) || undefined

  const [setup, setSetupState] = useState<BattleSetup>(() => {
    const stored = loadBattleSetup()
    return stored.names[0] ? stored : { ...stored, names: [myName.slice(0, 20), stored.names[1]] }
  })
  const setSetup = (next: BattleSetup) => {
    setSetupState(next)
    saveBattleSetup(next)
  }

  const joinParam = params.get('join')
  // `?host=1` — a way in that is opening a private room (Cohort Clash) goes
  // straight to the room's setup. A player still in the queue from before they
  // left the page comes back to the lobby they were waiting in.
  const [screen, showScreen] = useState<Screen>(() =>
    joinParam
      ? { kind: 'join', code: normalizeRoomCode(joinParam).slice(0, ROOM_CODE_LENGTH) }
      : params.get('host') === '1'
      ? { kind: 'setup', mode: 'host' }
      : isQueued(useBattleQueueStore.getState().session?.getSnapshot())
      ? { kind: 'lobby' }
      : { kind: 'home' },
  )

  // Every screen here is one address, so the router never sees a change of
  // screen: the page draws it, as a sheet laid over going in and swiped off
  // coming back (lib/viewTransition.ts). The screen it moves from is kept in a
  // ref, since the transition applies the change a frame after it is asked for.
  const screenRef = useRef(screen)
  function setScreen(next: Screen) {
    const from = screenRef.current
    screenRef.current = next
    if (next.kind === from.kind) showScreen(next)
    else moveScreen(screenDepth(next) < screenDepth(from) ? 'pop' : 'push', () => showScreen(next))
  }
  // A new screen opens at its top, the way a new page does — in a layout
  // effect, so it is in place before the transition takes its picture.
  const shownKind = useRef(screen.kind)
  useLayoutEffect(() => {
    if (shownKind.current === screen.kind) return
    shownKind.current = screen.kind
    window.scrollTo(0, 0)
  }, [screen.kind])

  const questionsById = useMemo(() => new Map(questions.map(q => [q.id, q])), [questions])
  const exams = useMemo(() => {
    const counts = battleExamCounts(questions)
    return [...counts]
      .map(([exam, count]) => ({ exam, count }))
      .sort((a, b) => rank(a.exam) - rank(b.exam))
  }, [questions])
  const examIds = exams.map(e => e.exam)
  const exam = pickExam(setup.exam, examIds)
  const lobbyExam = pickLobbyExam(setup.lobbyExam, examIds)
  const effectiveSetup = exam === setup.exam && lobbyExam === setup.lobbyExam ? setup : { ...setup, exam, lobbyExam }
  const lobbyCount = useLobbyCount(examIds, screen.kind === 'home')

  // `?exam=` — a way in that already knows the exam (Actuaria's "Battle this
  // sector") pre-fills the setup and the lobby with it, once the bank is in.
  const examParam = params.get('exam')
  const examApplied = useRef(false)
  useEffect(() => {
    if (examApplied.current || !examParam || examIds.length === 0) return
    examApplied.current = true
    if (examIds.includes(examParam)) setSetup({ ...setup, exam: examParam, lobbyExam: examParam })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examParam, examIds.length])

  // A battle, or a room, has the screen: the page around it can stand down —
  // in the same commit, so a battle slides in without the chrome it drops.
  const playing = screen.kind === 'local' || screen.kind === 'host' || screen.kind === 'guest'
  useLayoutEffect(() => { onPlayingChange?.(playing) }, [playing, onPlayingChange])
  useEffect(() => () => onPlayingChange?.(false), [onPlayingChange])

  // One `battle_started` per battle screen entered: a same-screen battle, a
  // room opened or joined by its code, or a lobby match (a match's host carries
  // the lobby's code). Every way in sets a new screen, so a rematch counts again.
  useEffect(() => {
    if (screen.kind === 'local') {
      trackBattleStarted({ format: 'same_screen', matched: false, exam: screen.config.exam, rounds: screen.config.rounds })
    } else if (screen.kind === 'host') {
      const matched = !!screen.code
      trackBattleStarted({ format: matched ? 'matched' : 'room_host', matched, exam: screen.config.exam, rounds: screen.config.rounds })
    } else if (screen.kind === 'guest') {
      trackBattleStarted({ format: screen.matched ? 'matched' : 'room_guest', matched: !!screen.matched })
    }
  }, [screen])

  // The queue outlives the lobby screen (stores/battleQueueStore.ts). This page
  // is where a match is played, wherever the player was when it was found —
  // once the bank is in, since the room is drawn from it.
  useEffect(() => useBattleQueueStore.getState().mountPage(), [])
  const pendingMatch = useBattleQueueStore(s => s.match)
  useEffect(() => {
    if (!pendingMatch || loading) return
    const match = useBattleQueueStore.getState().takeMatch()
    if (match) matched(match)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMatch, loading])
  // The pill's Return, pressed on this page's other screens: back to the lobby.
  const summons = useBattleQueueStore(s => s.summons)
  const seenSummons = useRef(summons)
  useEffect(() => {
    if (summons === seenSummons.current) return
    seenSummons.current = summons
    if (!playing) setScreen({ kind: 'lobby' })
  }, [summons, playing])
  // A battle begun some other way — a room, a code, one screen — gives up the
  // place in the queue: nobody can be in two battles.
  useEffect(() => { if (playing) useBattleQueueStore.getState().leaveQueue() }, [playing])

  function drawFor(config: BattleConfig, difficulty: number): () => BattleQuestionKey[] {
    return () => drawBattleQuestions(battlePool(questions, config.exam), config.rounds, difficulty).map(questionKey)
  }

  // Online, a battle is drawn from the topics both players pick
  // (lib/battleTopics.ts): each exam's topics, grouped the way its syllabus
  // groups them, worked out once per exam.
  const catalogueFor = useMemo(() => {
    const cache = new Map<string, TopicGroup[]>()
    return (exam: string): TopicGroup[] => {
      let catalogue = cache.get(exam)
      if (!catalogue) {
        catalogue = topicCatalogue(battlePool(questions, exam), syllabi.find(s => bankLabelFor(s) === exam))
        cache.set(exam, catalogue)
      }
      return catalogue
    }
  }, [questions, syllabi])

  function topicsFor(difficulty: number): TopicSource {
    return {
      topics: exam => catalogueTopics(catalogueFor(exam)).map(t => t.name),
      draw: (config, picks) =>
        drawFromTopics(battlePool(questions, config.exam), picks, config.rounds, difficulty)
          .map(d => ({ key: questionKey(d.question), topic: d.topic })),
    }
  }

  function player(seat: 0 | 1, avatarUrl?: string): BattlePlayer {
    return { name: cleanPlayerName(effectiveSetup.names[seat], DEFAULT_PLAYER_NAMES[seat]), ...(avatarUrl ? { avatarUrl } : {}) }
  }

  function begin(mode: 'local' | 'host') {
    // A room's abilities are its host's to turn on, where the skin offers them;
    // one screen never has them (seat 2 has no account and so no unlocks).
    const config = mode === 'local' ? configFromSetup(effectiveSetup, 'buzzer') : roomConfig(effectiveSetup, skin.abilities)
    const difficulty = difficultyTarget(effectiveSetup.difficulty)
    if (mode === 'local') setScreen({ kind: 'local', config, players: [player(0, myAvatar), player(1)], difficulty })
    else setScreen({ kind: 'host', config, player: player(0, myAvatar), difficulty })
  }

  function home() {
    if (params.has('join')) {
      const next = new URLSearchParams(params)
      next.delete('join')
      setParams(next, { replace: true })
    }
    setScreen({ kind: 'home' })
  }

  /** The lobby paired this player: into the room it chose, as its host or its guest. */
  function matched(match: MatchFound) {
    const me = player(0, myAvatar)
    if (match.role === 'host') {
      const { config, difficulty } = matchSettings(match.exam)
      setScreen({ kind: 'host', config, player: me, difficulty, code: match.code, opponent: match.opponent })
    } else {
      setScreen({ kind: 'guest', code: match.code, player: me, matched: true, opponent: match.opponent })
    }
  }

  /**
   * Into the lobby — watching it, and in the queue only once Ready is pressed;
   * or back to the place in the queue the player already has.
   */
  function enterLobby() {
    setScreen({ kind: 'lobby' })
  }
  const findAnother = enterLobby

  // ── The battles ───────────────────────────────────────────────────────────
  const shell = (children: ReactNode) => (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">{children}</div>
  )

  if (screen.kind === 'local') {
    return shell(
      <LocalBattle
        config={screen.config}
        players={screen.players}
        draw={drawFor(screen.config, screen.difficulty)}
        questionsById={questionsById}
        onSettings={() => setScreen({ kind: 'setup', mode: 'local' })}
        onExit={home}
      />,
    )
  }
  if (screen.kind === 'host') {
    return shell(
      <OnlineHost
        config={screen.config}
        player={screen.player}
        topics={topicsFor(screen.difficulty)}
        catalogueFor={catalogueFor}
        questionsById={questionsById}
        onExit={home}
        code={screen.code}
        onFindAnother={screen.code ? findAnother : undefined}
        opponent={screen.opponent}
        loadout={screen.code ? undefined : loadout}
        onRoomOpen={screen.code ? undefined : onRoomOpen}
      />,
    )
  }
  if (screen.kind === 'guest') {
    return shell(
      <OnlineGuest
        code={screen.code}
        player={screen.player}
        catalogueFor={catalogueFor}
        questionsById={questionsById}
        onExit={home}
        matched={screen.matched}
        onFindAnother={screen.matched ? findAnother : undefined}
        opponent={screen.opponent}
        loadout={screen.matched ? undefined : loadout}
      />,
    )
  }

  // ── The way in ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      {screen.kind === 'home' && (
        <>
          <PageTitle onBack={() => navigate(skin.home.path)} backLabel={skin.home.label}>{skin.title}</PageTitle>
          <div className="flex items-center gap-3 rounded-xl bg-card p-5">
            <SkinLogo size="lg" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Two players, the same questions, one scoreboard.</span>{' '}
              Fast right answers score more, streaks score more again, and the final question counts double.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <ModeCard
              icon={<Shuffle className="h-5 w-5" />}
              title={skin.lobby.title}
              plain={skin.lobby.plain}
              body="Join the lobby and play whoever’s there. Three questions from the topics you both pick, two minutes each."
            >
              <p className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="battle-lobby-status">
                <span
                  aria-hidden
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-full',
                    lobbyCount ? (skin.id === 'actuaria' ? 'bg-actuaria-signal' : 'bg-green-500') : 'bg-muted-foreground/40',
                  )}
                />
                {skin.id === 'actuaria' ? stationCountLine(lobbyCount, true) : lobbyCountLine(lobbyCount)}
              </p>
              <Button size="lg" className="h-12 gap-2 rounded-xl" onClick={enterLobby} disabled={loading} data-testid="battle-mode-lobby">
                <Shuffle className="h-4 w-4" aria-hidden />
                Find an opponent
              </Button>
            </ModeCard>
            <ModeCard
              icon={<Users className="h-5 w-5" />}
              title={skin.local.title}
              plain={skin.local.plain}
              body="Two players, one device. First to buzz answers — miss, and your rival gets to steal."
            >
              <Button size="lg" variant="outline" className="h-12 gap-2 rounded-xl" onClick={() => setScreen({ kind: 'setup', mode: 'local' })} data-testid="battle-mode-local">
                <Play className="h-4 w-4" aria-hidden />
                Play on this device
              </Button>
            </ModeCard>
            <ModeCard
              icon={<Globe className="h-5 w-5" />}
              title={skin.friend.title}
              plain={skin.friend.plain}
              body="Each on your own device, in a room only you two know the code to."
            >
              <Button size="lg" variant="outline" className="h-12 gap-2 rounded-xl" onClick={() => setScreen({ kind: 'setup', mode: 'host' })} data-testid="battle-mode-host">
                Create a room
              </Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 rounded-xl" onClick={() => setScreen({ kind: 'join', code: '' })} data-testid="battle-mode-join">
                <LogIn className="h-4 w-4" aria-hidden />
                Join with a code
              </Button>
            </ModeCard>
          </div>
          {skin.simulation && (
            <Link
              to={skin.simulation}
              className="flex items-center gap-3 rounded-xl bg-card p-5 transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-testid="battle-simulation"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted" aria-hidden>
                <Timer className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="actuaria-display block text-sm">{term('simulation')}</span>
                <span className="block text-sm text-muted-foreground">A timed practice exam, and what would lift your readiness most.</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          )}
          <HowPointsWork />
        </>
      )}

      {screen.kind === 'lobby' && (
        <>
          <PageTitle onBack={home}>{skin.screens.lobby}</PageTitle>
          <LobbyName
            name={effectiveSetup.names[0]}
            onChange={name => setSetup({ ...effectiveSetup, names: [name, effectiveSetup.names[1]] })}
          />
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading questions…
            </div>
          ) : (
            <Matchmaking
              // A new name is a new entry in the lobby.
              key={effectiveSetup.names[0]}
              player={player(0, myAvatar)}
              exam={lobbyExam}
              exams={exams}
              onExamChange={next => setSetup({ ...effectiveSetup, lobbyExam: next })}
              onPlayFriend={() => setScreen({ kind: 'setup', mode: 'host' })}
            />
          )}
        </>
      )}

      {screen.kind === 'setup' && (
        <>
          <PageTitle onBack={home}>{screen.mode === 'local' ? skin.screens.localSetup : skin.screens.hostSetup}</PageTitle>
          <BattleSetupForm
            setup={effectiveSetup}
            onChange={setSetup}
            exams={exams}
            players={screen.mode === 'local' ? 2 : 1}
            avatarUrl={myAvatar}
            offerAbilities={screen.mode === 'host' && skin.abilities}
            loadoutSize={loadout?.length ?? 0}
          />
          <Button
            size="lg"
            className="h-14 w-full gap-3 rounded-xl text-base font-semibold"
            disabled={loading || !exam}
            onClick={() => begin(screen.mode)}
            data-sound="begin"
            data-testid="battle-begin"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
            {screen.mode === 'local' ? 'Start battle' : 'Create room'}
          </Button>
        </>
      )}

      {screen.kind === 'join' && (
        <JoinForm
          code={screen.code}
          name={effectiveSetup.names[0]}
          loading={loading}
          onBack={home}
          onJoin={(code, name) => {
            setSetup({ ...effectiveSetup, names: [name, effectiveSetup.names[1]] })
            setScreen({
              kind: 'guest',
              code,
              player: { name: cleanPlayerName(name, DEFAULT_PLAYER_NAMES[1]), ...(myAvatar ? { avatarUrl: myAvatar } : {}) },
            })
          }}
        />
      )}
    </div>
  )
}

function rank(exam: string): number {
  const i = LADDER.indexOf(exam)
  return i < 0 ? LADDER.length : i
}

function JoinForm({
  code: initialCode,
  name: initialName,
  loading,
  onBack,
  onJoin,
}: {
  code: string
  name: string
  loading: boolean
  onBack: () => void
  onJoin: (code: string, name: string) => void
}) {
  const skin = useBattleSkin()
  const [code, setCode] = useState(initialCode)
  const [name, setName] = useState(initialName)
  const valid = isRoomCode(code)

  return (
    <>
      <PageTitle onBack={onBack}>{skin.screens.join}</PageTitle>
      <form
        className="mx-auto max-w-sm space-y-5 pt-2"
        onSubmit={e => {
          e.preventDefault()
          if (valid && !loading) onJoin(code, name)
        }}
      >
        <div className="space-y-2">
          <label htmlFor="battle-code" className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room code</label>
          <Input
            id="battle-code"
            value={code}
            onChange={e => setCode(normalizeRoomCode(e.target.value).slice(0, ROOM_CODE_LENGTH))}
            placeholder="ABCD"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            autoFocus={!initialCode}
            className="h-16 text-center font-mono text-3xl font-bold uppercase tracking-[0.4em]"
            data-testid="battle-join-code"
          />
          {code.length === ROOM_CODE_LENGTH && !valid && (
            <p className="px-1 text-xs text-red-600 dark:text-red-400">That isn’t a room code — codes use letters and the digits 2–9.</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="battle-join-name" className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your name</label>
          <Input
            id="battle-join-name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={20}
            placeholder={DEFAULT_PLAYER_NAMES[1]}
            autoComplete="off"
            autoFocus={!!initialCode}
            data-testid="battle-join-name"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 w-full rounded-xl" disabled={!valid || loading} data-testid="battle-join">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
          Join
        </Button>
      </form>
    </>
  )
}

/**
 * The name the lobby knows this player by. Committed on blur or Enter, not on
 * every keystroke — each new name is a new entry in the lobby.
 */
function LobbyName({ name, onChange }: { name: string; onChange: (name: string) => void }) {
  const [draft, setDraft] = useState(name)
  const commit = () => { if (draft.trim() !== name.trim()) onChange(draft.trim()) }
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="battle-lobby-name" className="shrink-0 text-sm text-muted-foreground">Playing as</label>
      <Input
        id="battle-lobby-name"
        value={draft}
        maxLength={20}
        placeholder={DEFAULT_PLAYER_NAMES[0]}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit() }}
        autoComplete="off"
        className="h-9 max-w-xs"
        data-testid="battle-lobby-name"
      />
    </div>
  )
}
