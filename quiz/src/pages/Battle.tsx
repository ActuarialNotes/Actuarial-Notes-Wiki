import '@/components/battle/battle.css'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { backLabel as backName, useBack } from '@/hooks/useBack'
import { useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { OnlineGuest, OnlineHost } from '@/components/battle/OnlineBattle'
import { DeckScope } from '@/components/battle/deck/DeckParts'
import { DeckIntro } from '@/components/battle/deck/DeckIntro'
import { DeckHome } from '@/components/battle/deck/DeckHome'
import { DeckLobby } from '@/components/battle/deck/DeckLobby'
import { DeckJoin } from '@/components/battle/deck/DeckRoom'
import { DeckLocalBattle, DeckSeating } from '@/components/battle/deck/DeckLocal'
import { useBattleIntro } from '@/hooks/useBattleIntro'
import { ANY_EXAM } from '@/lib/battleLobby'
import type { DeckMode } from '@/lib/battleDeck'
import { useAuth } from '@/hooks/useAuth'
import { useAllQuestions } from '@/hooks/useAllQuestions'
import { useLobbyCount } from '@/hooks/useBattle'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { moveScreen } from '@/lib/viewTransition'
import {
  battleExamCounts,
  battlePool,
  cleanPlayerName,
  drawBattleQuestions,
  questionKey,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
} from '@/lib/battle'
import { DEFAULT_PLAYER_NAMES } from '@/lib/battleDisplay'
import { ROOM_CODE_LENGTH, normalizeRoomCode } from '@/lib/battleRoom'
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
import type { DraftSource } from '@/lib/battleSession'
import { catalogueTopics, topicCatalogue, type TopicGroup } from '@/lib/battleTopics'
import { battlePairReader, drawRound, type ReadPair } from '@/lib/battleDraft'
import { filterQuestions } from '@/lib/parser'
import { useConceptPages, usePlayerLevel } from '@/hooks/useBattleDraft'
import { EXAM_LABEL_TO_ID, bankLabelFor } from '@/lib/examIds'
import { trackBattleStarted } from '@/lib/analytics'

// **Quiz Battle** — two players, the same questions, one scoreboard
// (docs/quiz-battle.md). This page is the way in and the switchboard: the
// choice of how to play, the settings, joining a room by its code, the
// matchmaking lobby, and then whichever battle was picked — `DeckLocalBattle`
// on one screen, `OnlineHost` / `OnlineGuest` across two (a matched battle is an
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

/** Ladder order — the order the question bank's labels are declared in. */
const LADDER = Object.keys(EXAM_LABEL_TO_ID)

function accountName(user: ReturnType<typeof useAuth>['user']): string {
  const meta = user?.user_metadata ?? {}
  return (meta.full_name as string | undefined) || (meta.display_name as string | undefined) || user?.email?.split('@')[0] || ''
}

export default function Battle({
  onPlayingChange,
}: {
  /** Told when a battle (or a room) takes the screen over, and when it gives it back. */
  onPlayingChange?: (playing: boolean) => void
} = {}) {
  return (
    // The scope the battle's own utilities are generated under (tailwind.battle.config.ts).
    <div className="battle-css" style={{ display: 'contents' }}>
      <BattlePage onPlayingChange={onPlayingChange} />
    </div>
  )
}

function BattlePage({ onPlayingChange }: { onPlayingChange?: (playing: boolean) => void }) {
  // Out of Quiz Battle the way the reader came in — the Quiz tab, a study
  // guide, the Dashboard.
  const back = useBack({ to: '/games', label: 'Games' })
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
  // A player still in the queue from before they left the page comes back to
  // the lobby they were waiting in.
  const [screen, showScreen] = useState<Screen>(() =>
    joinParam
      ? { kind: 'join', code: normalizeRoomCode(joinParam).slice(0, ROOM_CODE_LENGTH) }
      : isQueued(useBattleQueueStore.getState().session?.getSnapshot())
      ? { kind: 'lobby' }
      : { kind: 'home' },
  )

  // The Deck's intro: once per visit, when the visit opens on the start screen.
  const intro = useBattleIntro(screen.kind === 'home')

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

  // Online, a battle is dealt from a draft (lib/battleDraft.ts): each exam's
  // topics, grouped the way its syllabus groups them, worked out once per exam.
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

  // How closely two topics pair — Concept Craft's strength, read off the
  // pages (fetched once a room is hosted) and the whole bank — and the battle
  // questions that test both. Each pair read once per exam.
  const conceptPage = useConceptPages(screen.kind === 'host' || screen.kind === 'local')
  const playerLevel = usePlayerLevel()
  const pairFor = useMemo(() => {
    const graphQuestions = filterQuestions([...questions], {}).map(q => ({ id: q.id, links: q.wiki_link }))
    const cache = new Map<string, ReadPair>()
    return (exam: string): ReadPair => {
      let read = cache.get(exam)
      if (!read) {
        const reader = battlePairReader({ pool: battlePool(questions, exam), graphQuestions, page: conceptPage })
        const seen = new Map<string, ReturnType<ReadPair>>()
        read = (a, b) => {
          const key = `${a}\u0000${b}`
          let hit = seen.get(key)
          if (!hit) seen.set(key, (hit = reader(a, b)))
          return hit
        }
        cache.set(exam, read)
      }
      return read
    }
  }, [questions, conceptPage])

  function topicsFor(difficulty: number): DraftSource {
    return {
      topics: exam => catalogueTopics(catalogueFor(exam)).map(t => t.name),
      pair: pairFor,
      draw: (config, cards, on, used) => {
        const drawn = drawRound(battlePool(questions, config.exam), cards, on, used, difficulty)
        return drawn ? { key: questionKey(drawn.question), basis: drawn.basis, topic: drawn.topic } : null
      },
      level: playerLevel,
    }
  }
  // One screen's draft keeps one source for the whole battle, so its
  // callbacks stay put while the questions play.
  const localDifficulty = screen.kind === 'local' ? screen.difficulty : null
  const localTopics = useMemo(
    () => topicsFor(localDifficulty ?? 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localDifficulty, catalogueFor, pairFor, questions, playerLevel],
  )

  function player(seat: 0 | 1, avatarUrl?: string): BattlePlayer {
    return { name: cleanPlayerName(effectiveSetup.names[seat], DEFAULT_PLAYER_NAMES[seat]), ...(avatarUrl ? { avatarUrl } : {}) }
  }

  function begin(mode: 'local' | 'host') {
    const config = mode === 'local' ? configFromSetup(effectiveSetup, 'buzzer') : roomConfig(effectiveSetup)
    const difficulty = difficultyTarget(effectiveSetup.difficulty)
    if (mode === 'local') setScreen({ kind: 'local', config, players: [player(0, myAvatar), player(1)], difficulty })
    else setScreen({ kind: 'host', config, player: player(0, myAvatar), difficulty })
  }

  // The Deck has no room setup screen: a friend room opens at once, and its
  // settings are on the room itself.
  useEffect(() => {
    if (screen.kind === 'setup' && screen.mode === 'host' && !loading && exam) begin('host')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, loading, exam])

  /** The start screen's button, for whichever card of the hand is raised. */
  function deckGo(mode: DeckMode) {
    if (mode === 'lobby') {
      // The deck the start screen shows is the one the lobby asks for — unless
      // the player last asked for any exam.
      setSetup({ ...effectiveSetup, lobbyExam: effectiveSetup.lobbyExam === ANY_EXAM ? ANY_EXAM : exam })
      enterLobby()
    } else if (mode === 'local') setScreen({ kind: 'setup', mode: 'local' })
    else begin('host')
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
  const shell = (children: ReactNode) => <DeckScope>{children}</DeckScope>

  if (screen.kind === 'local') {
    return shell(
      <DeckLocalBattle
        config={screen.config}
        players={screen.players}
        draw={drawFor(screen.config, screen.difficulty)}
        topics={localTopics}
        catalogue={catalogueFor(screen.config.exam)}
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
        room={screen.code ? undefined : {
          setup: effectiveSetup,
          exams,
          onSetup: setSetup,
          onJoinTab: () => setScreen({ kind: 'join', code: '' }),
        }}
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
        level={playerLevel}
      />,
    )
  }

  // ── The way in ────────────────────────────────────────────────────────────
  return (
    <DeckScope>
      {intro.showing && <DeckIntro me={{ name: effectiveSetup.names[0] || myName || DEFAULT_PLAYER_NAMES[0] }} onDone={intro.finish} />}
      {screen.kind === 'home' && (
        <DeckHome
          exams={exams}
          exam={exam}
          onExamChange={next => setSetup({ ...effectiveSetup, exam: next })}
          lobbyCount={lobbyCount}
          loading={loading}
          onBack={back.go}
          backLabel={backName(back)}
          onGo={deckGo}
        />
      )}
      {screen.kind === 'lobby' && (loading ? (
        <div className="flex items-center gap-2 px-5 py-8 text-sm text-[var(--deck-soft)]">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading questions…
        </div>
      ) : (
        <DeckLobby
          key={effectiveSetup.names[0]}
          player={player(0, myAvatar)}
          exam={lobbyExam}
          deckExam={exam}
          exams={exams}
          catalogueFor={catalogueFor}
          signedIn={!!user}
          onExamChange={next => setSetup({ ...effectiveSetup, lobbyExam: next })}
          onLeave={home}
        />
      ))}
      {screen.kind === 'setup' && screen.mode === 'local' && (
        <DeckSeating
          setup={effectiveSetup}
          exams={exams}
          onChange={setSetup}
          onBack={home}
          onDeal={() => begin('local')}
          loading={loading}
        />
      )}
      {screen.kind === 'setup' && screen.mode === 'host' && (
        <div className="flex items-center gap-2 px-5 py-8 text-sm text-[var(--deck-soft)]">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading questions…
        </div>
      )}
      {screen.kind === 'join' && (
        <DeckJoin
          code={screen.code}
          name={effectiveSetup.names[0]}
          loading={loading}
          onBack={home}
          onHost={() => begin('host')}
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
    </DeckScope>
  )
}

function rank(exam: string): number {
  const i = LADDER.indexOf(exam)
  return i < 0 ? LADDER.length : i
}
