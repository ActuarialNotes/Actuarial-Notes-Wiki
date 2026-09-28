import { useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronLeft, Globe, Loader2, LogIn, Play, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BattleLogo } from '@/components/battle/BattleLogo'
import { BattleSetupForm } from '@/components/battle/BattleSetupForm'
import { LocalBattle } from '@/components/battle/LocalBattle'
import { OnlineGuest, OnlineHost } from '@/components/battle/OnlineBattle'
import { useAuth } from '@/hooks/useAuth'
import { useAllQuestions } from '@/hooks/useAllQuestions'
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
  pickExam,
  saveBattleSetup,
  type BattleSetup,
} from '@/lib/battleSetup'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { cn } from '@/lib/utils'

// **Quiz Battle** — two players, the same questions, one scoreboard
// (docs/quiz-battle.md). This page is the way in and the switchboard: the
// choice of how to play, the settings, joining a room by its code, and then
// whichever of the two battles was picked — `LocalBattle` on one screen,
// `OnlineHost` / `OnlineGuest` across two.

type Screen =
  | { kind: 'home' }
  | { kind: 'setup'; mode: 'local' | 'host' }
  | { kind: 'join'; code: string }
  | { kind: 'local'; config: BattleConfig; players: [BattlePlayer, BattlePlayer]; difficulty: number }
  | { kind: 'host'; config: BattleConfig; player: BattlePlayer; difficulty: number }
  | { kind: 'guest'; code: string; player: BattlePlayer }

/** Ladder order — the order the question bank's labels are declared in. */
const LADDER = Object.keys(EXAM_LABEL_TO_ID)

function accountName(user: ReturnType<typeof useAuth>['user']): string {
  const meta = user?.user_metadata ?? {}
  return (meta.full_name as string | undefined) || (meta.display_name as string | undefined) || user?.email?.split('@')[0] || ''
}

function PageTitle({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="-ml-1.5 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">{children}</h1>
    </div>
  )
}

function ModeCard({
  icon,
  title,
  body,
  children,
}: {
  icon: ReactNode
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted" aria-hidden>{icon}</span>
        <div className="min-w-0 space-y-1">
          <h2 className="font-semibold">{title}</h2>
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
  const rows: [string, string][] = [
    ['Right answer', `${BASE_POINTS}`],
    ['Speed', `up to +${SPEED_BONUS_MAX} — the sooner, the more`],
    ['Streak', `+${STREAK_STEP} for two in a row, up to +${STREAK_STEP * STREAK_STEPS_MAX}`],
    ['Final question', `×${FINAL_ROUND_MULTIPLIER} everything`],
    ['Same screen', `a wrong buzz costs ${WRONG_BUZZ_PENALTY} and hands your rival the steal`],
    ['Online', `the first right answer gets +${FASTEST_BONUS}; a wrong one costs nothing`],
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

export default function Battle() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { user } = useAuth()
  const { questions, loading } = useAllQuestions()

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
  const [screen, setScreen] = useState<Screen>(() =>
    joinParam ? { kind: 'join', code: normalizeRoomCode(joinParam).slice(0, ROOM_CODE_LENGTH) } : { kind: 'home' },
  )

  const questionsById = useMemo(() => new Map(questions.map(q => [q.id, q])), [questions])
  const exams = useMemo(() => {
    const counts = battleExamCounts(questions)
    return [...counts]
      .map(([exam, count]) => ({ exam, count }))
      .sort((a, b) => rank(a.exam) - rank(b.exam))
  }, [questions])
  const examIds = exams.map(e => e.exam)
  const exam = pickExam(setup.exam, examIds)
  const effectiveSetup = exam === setup.exam ? setup : { ...setup, exam }

  function drawFor(config: BattleConfig, difficulty: number): () => BattleQuestionKey[] {
    return () => drawBattleQuestions(battlePool(questions, config.exam), config.rounds, difficulty).map(questionKey)
  }

  function player(seat: 0 | 1, avatarUrl?: string): BattlePlayer {
    return { name: cleanPlayerName(effectiveSetup.names[seat], DEFAULT_PLAYER_NAMES[seat]), ...(avatarUrl ? { avatarUrl } : {}) }
  }

  function begin(mode: 'local' | 'host') {
    const rules = mode === 'local' ? 'buzzer' : 'simultaneous'
    const config = configFromSetup(effectiveSetup, rules)
    const difficulty = difficultyTarget(effectiveSetup.difficulty)
    if (mode === 'local') setScreen({ kind: 'local', config, players: [player(0, myAvatar), player(1)], difficulty })
    else setScreen({ kind: 'host', config, player: player(0, myAvatar), difficulty })
  }

  function home() {
    if (params.has('join')) setParams({}, { replace: true })
    setScreen({ kind: 'home' })
  }

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
        draw={drawFor(screen.config, screen.difficulty)}
        questionsById={questionsById}
        onExit={home}
      />,
    )
  }
  if (screen.kind === 'guest') {
    return shell(
      <OnlineGuest code={screen.code} player={screen.player} questionsById={questionsById} onExit={home} />,
    )
  }

  // ── The way in ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
      {screen.kind === 'home' && (
        <>
          <PageTitle onBack={() => navigate('/')}>Quiz Battle</PageTitle>
          <div className="flex items-center gap-3 rounded-xl bg-card p-5">
            <BattleLogo size="lg" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Two players, the same questions, one scoreboard.</span>{' '}
              Fast right answers score more, streaks score more again, and the final question counts double.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ModeCard
              icon={<Users className="h-5 w-5" />}
              title="Same screen"
              body="Two players, one device. First to buzz answers — miss, and your rival gets to steal."
            >
              <Button size="lg" className="h-12 gap-2 rounded-xl" onClick={() => setScreen({ kind: 'setup', mode: 'local' })} data-testid="battle-mode-local">
                <Play className="h-4 w-4" aria-hidden />
                Play on this device
              </Button>
            </ModeCard>
            <ModeCard
              icon={<Globe className="h-5 w-5" />}
              title="Online"
              body="Each on your own device. Lock in your answer — the fastest right answer scores most."
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
          <HowPointsWork />
        </>
      )}

      {screen.kind === 'setup' && (
        <>
          <PageTitle onBack={home}>{screen.mode === 'local' ? 'Same-screen battle' : 'Create a room'}</PageTitle>
          <BattleSetupForm
            setup={effectiveSetup}
            onChange={setSetup}
            exams={exams}
            players={screen.mode === 'local' ? 2 : 1}
            avatarUrl={myAvatar}
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
  const [code, setCode] = useState(initialCode)
  const [name, setName] = useState(initialName)
  const valid = isRoomCode(code)

  return (
    <>
      <PageTitle onBack={onBack}>Join a battle</PageTitle>
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
