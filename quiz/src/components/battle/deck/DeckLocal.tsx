import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { DeckBackButton, DeckChoice, DeckSheet, ExamDeckIcon, PlayerCard, DeckPrimaryButton, DeckSecondaryButton } from '@/components/battle/deck/DeckParts'
import { DeckCountdown, DeckQuestionCard } from '@/components/battle/deck/DeckQuestionCard'
import { DeckResults } from '@/components/battle/deck/DeckResults'
import { LeaveButton } from '@/components/battle/deck/DeckRound'
import { RoundResult } from '@/components/battle/BattleActionBar'
import { useBattleMusic, useLocalBattle, useNow } from '@/hooks/useBattle'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import {
  ANSWER_WINDOW_MS,
  MAX_NAME_LENGTH,
  ROUND_COUNTS,
  ROUND_TIME_PRESETS,
  createBattle,
  currentRound,
  isFinalRound,
  roundSecondsFor,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
  type BattleState,
  type Seat,
} from '@/lib/battle'
import { DEFAULT_PLAYER_NAMES, answerFor, battleExamName, battleMusicIntensity, playerAccentStyle, signedPoints } from '@/lib/battleDisplay'
import { deckRoundLabel } from '@/lib/battleDeck'
import { BATTLE_DIFFICULTIES, type BattleSetup } from '@/lib/battleSetup'
import { questionTopics } from '@/lib/battleTopics'
import type { Question } from '@/lib/parser'
import { formatClock } from '@/lib/quizTiming'
import { cn } from '@/lib/utils'

// **Same screen** (docs/quiz-battle-redesign.md §3.5): the phone split for two
// people facing each other — player 2's half turned 180° at the top, player 1's
// at the foot — and in the battle each half is that player's buzzer: tap
// anywhere on it to buzz, and it becomes their answer pad. The **A** and **L**
// keys still buzz from a keyboard. The rules are the buzzer rules they always
// were (lib/battle.ts).

/** The half of the phone a player sits at: theirs, in their colour, turned to face them. */
function Half({ seat, children, className, ...button }: {
  seat: Seat
  children: ReactNode
  className?: string
} & ({ onTap?: () => void; disabled?: boolean; label?: string; testid?: string })) {
  const style = playerAccentStyle(seat)
  const body = (
    <div className={cn('flex h-full w-full flex-col items-center justify-center gap-3 px-5', seat === 1 && 'rotate-180')}>
      {children}
    </div>
  )
  const base = cn(
    'relative flex min-h-0 w-full flex-1 overflow-hidden',
    'bg-[color-mix(in_srgb,var(--player-vivid)_22%,var(--deck-ground))]',
    className,
  )
  if (!button.onTap) return <div style={style} className={base}>{body}</div>
  return (
    <button
      type="button"
      style={style}
      onClick={button.onTap}
      disabled={button.disabled}
      aria-label={button.label}
      data-sound="none"
      data-testid={button.testid}
      className={cn(base, 'text-white transition-[filter] active:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60 disabled:cursor-default')}
    >
      {body}
    </button>
  )
}

/** The settings chip's sheet: exam, length, time and difficulty. */
function SettingsSheet({ setup, exams, onChange, onClose }: {
  setup: BattleSetup
  exams: readonly { exam: string; count: number }[]
  onChange: (next: BattleSetup) => void
  onClose: () => void
}) {
  const row = (label: string, children: ReactNode) => (
    <div className="flex flex-col gap-2">
      <span className="deck-label">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
  return (
    <DeckSheet title="Settings" onClose={onClose}>
      <div className="flex flex-col gap-5">
        {row('Exam', exams.map(({ exam }) => (
          <DeckChoice key={exam} selected={setup.exam === exam} onClick={() => onChange({ ...setup, exam })} data-testid={`battle-exam-${exam}`}>
            <ExamDeckIcon exam={exam} small />{battleExamName(exam)}
          </DeckChoice>
        )))}
        {row('Questions', ROUND_COUNTS.map(n => (
          <DeckChoice key={n} selected={setup.rounds === n} onClick={() => onChange({ ...setup, rounds: n })} className="w-14">{n}</DeckChoice>
        )))}
        {row('Time each', ROUND_TIME_PRESETS.map(p => (
          <DeckChoice key={p.id} selected={setup.time === p.id} onClick={() => onChange({ ...setup, time: p.id })}>
            {p.label} · {formatClock(roundSecondsFor(p.id, setup.exam))}
          </DeckChoice>
        )))}
        {row('Difficulty', BATTLE_DIFFICULTIES.map(d => (
          <DeckChoice key={d.id} selected={setup.difficulty === d.id} onClick={() => onChange({ ...setup, difficulty: d.id })}>{d.label}</DeckChoice>
        )))}
        <DeckPrimaryButton onClick={onClose}>Done</DeckPrimaryButton>
      </div>
    </DeckSheet>
  )
}

/** Seat the players: a name each, at either end of the phone, and Deal. */
export function DeckSeating({
  setup,
  exams,
  onChange,
  onBack,
  onDeal,
  loading,
}: {
  setup: BattleSetup
  exams: readonly { exam: string; count: number }[]
  onChange: (next: BattleSetup) => void
  onBack: () => void
  onDeal: () => void
  loading: boolean
}) {
  const [settings, setSettings] = useState(false)
  const name = (seat: Seat) => (
    <label className="flex flex-col items-center gap-1.5 text-xs font-bold uppercase tracking-[.08em] text-[color-mix(in_srgb,var(--player)_35%,white)]">
      Player {seat + 1}
      <input
        value={setup.names[seat]}
        onChange={e => onChange({ ...setup, names: seat === 0 ? [e.target.value, setup.names[1]] : [setup.names[0], e.target.value] })}
        maxLength={MAX_NAME_LENGTH}
        placeholder={DEFAULT_PLAYER_NAMES[seat]}
        aria-label={`Player ${seat + 1} name`}
        autoComplete="off"
        className="h-11 w-[200px] rounded-xl border border-[var(--player-muted)] bg-black/25 text-center text-[17px] font-semibold normal-case tracking-normal text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        data-testid={`battle-name-${seat}`}
      />
    </label>
  )
  const half = (seat: Seat) => (
    <Half seat={seat}>
      <PlayerCard seat={seat} player={{ name: setup.names[seat] || DEFAULT_PLAYER_NAMES[seat] }} style={{ width: 92, height: 128 }} />
      {name(seat)}
      <span className="text-[13px] text-[color-mix(in_srgb,var(--player)_35%,white)]">Tap anywhere on this half to buzz</span>
    </Half>
  )
  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-screen" data-testid="battle-seating">
      {half(1)}
      <div className="flex h-[120px] shrink-0 items-center justify-between px-5">
        <DeckBackButton onClick={onBack} />
        <button
          type="button"
          onClick={onDeal}
          disabled={loading || !setup.exam}
          data-sound="begin"
          data-testid="battle-begin"
          className="deck-float deck-display h-16 rounded-[20px] bg-white px-[30px] text-2xl text-[var(--deck-ground)] shadow-[0_10px_30px_rgba(255,255,255,.12)] disabled:opacity-50"
        >
          Deal
        </button>
        <button
          type="button"
          onClick={() => setSettings(true)}
          aria-label={`Battle settings: ${battleExamName(setup.exam)}, ${setup.rounds} questions`}
          className="flex h-11 items-center gap-1.5 rounded-[14px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] px-2.5 text-[13px] font-bold"
          data-testid="battle-settings"
        >
          <ExamDeckIcon exam={setup.exam} small />×{setup.rounds}
        </button>
      </div>
      {half(0)}
      {settings && <SettingsSheet setup={setup} exams={exams} onChange={onChange} onClose={() => setSettings(false)} />}
    </div>
  )
}

/** One player's half during a round: their buzzer, then their answer pad. */
function PlayerHalf({ battle, seat, onBuzz, onAnswer }: {
  battle: BattleState
  seat: Seat
  onBuzz: (seat: Seat) => void
  onAnswer: (choice: string) => void
}) {
  const round = currentRound(battle)
  const player = battle.players[seat]
  const holding = round.phase === 'buzzed' && round.floor?.seat === seat
  const out = round.lockedOut.includes(seat)
  const canBuzz = round.phase === 'open' && !out
  const now = useNow(holding, 100)
  const answer = answerFor(round, seat)
  const status = holding ? 'Buzzed in!'
    : round.phase === 'revealed' ? (answer ? (answer.correct ? (answer.steal ? 'Stole it' : 'Got it') : 'Missed') : null)
    : out ? 'Locked out' : null
  const roundPoints = round.answers.filter(a => a.seat === seat).reduce((n, a) => n + a.points.total, 0)

  const head = (
    <div className="flex w-full items-center justify-between gap-3" data-testid={`battle-player-${seat}`}>
      <span className="flex min-w-0 items-center gap-2.5">
        <PlayerCard seat={seat} player={player} size="xs" />
        <span className="flex min-w-0 flex-col text-left">
          <span className="truncate text-[13px] font-bold">{player.name}</span>
          <span className="deck-display text-xl leading-none tabular-nums" data-testid={`battle-score-${seat}`}>{battle.scores[seat].toLocaleString('en-US')}</span>
        </span>
      </span>
      {status && <span className="shrink-0 text-sm font-semibold text-[color-mix(in_srgb,var(--player)_35%,white)]" aria-live="polite">{status}</span>}
      {round.phase === 'revealed' && answer && <span className="shrink-0 text-sm font-bold tabular-nums">{signedPoints(roundPoints)}</span>}
    </div>
  )

  if (holding) {
    const options = battle.questions[round.index].options
    const ruledOut = round.answers.filter(a => !a.correct && a.choice).map(a => a.choice!)
    const left = Math.max(0, round.deadline - now)
    return (
      <Half seat={seat} className="battle-buzz-flash">
        {head}
        <span className="text-sm font-semibold">{player.name}, answer now · {Math.ceil(left / 1000)}s</span>
        <div role="group" aria-label={`${player.name}'s answer`} className="flex w-full gap-2" data-testid="battle-pad">
          {options.map(key => {
            const struck = ruledOut.includes(key)
            return (
              <button
                key={key}
                type="button"
                disabled={struck}
                onClick={() => onAnswer(key)}
                data-sound="select"
                data-testid={`battle-pad-${key}`}
                aria-label={`Answer ${key}`}
                className={cn(
                  'deck-display flex h-14 flex-1 items-center justify-center rounded-xl text-xl',
                  struck ? 'bg-white/10 text-white/40 line-through' : 'bg-[#F5F3F8] text-[var(--deck-ground)] active:scale-95',
                )}
              >
                {key}
              </button>
            )
          })}
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/15" aria-hidden>
          <div className="h-full bg-white transition-[width] duration-100 ease-linear" style={{ width: `${(left / ANSWER_WINDOW_MS) * 100}%` }} />
        </div>
      </Half>
    )
  }

  return (
    <Half
      seat={seat}
      onTap={() => onBuzz(seat)}
      disabled={!canBuzz}
      label={`${player.name}: buzz in (${seat === 0 ? 'A' : 'L'})`}
      testid={`battle-buzz-${seat}`}
      className={cn(!canBuzz && 'saturate-50')}
    >
      {head}
      <span className={cn('deck-display text-2xl uppercase tracking-wider', !canBuzz && 'opacity-60')}>
        {out ? 'Missed' : round.phase === 'countdown' ? 'Get ready' : round.phase === 'open' ? 'Buzz' : ''}
      </span>
      {canBuzz && <span className="text-[13px] text-[color-mix(in_srgb,var(--player)_35%,white)]">Tap anywhere on this half to buzz</span>}
    </Half>
  )
}

/** A battle on one screen, under buzzer rules. */
export function DeckLocalBattle({
  config,
  players,
  draw,
  questionsById,
  onSettings,
  onExit,
}: {
  config: BattleConfig
  players: [BattlePlayer, BattlePlayer]
  draw: () => BattleQuestionKey[]
  questionsById: ReadonlyMap<string, Question>
  onSettings: () => void
  onExit: () => void
}) {
  const { battle, dispatch } = useLocalBattle()
  const start = useCallback(() => {
    const questions = draw()
    if (questions.length === 0) return
    dispatch({ type: 'reset', state: createBattle({ config, players, questions, now: Date.now() }) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { start() }, [start])

  const round = battle ? currentRound(battle) : null
  const phase = round?.phase ?? null

  // The cues are the same-screen battle's: `launch` then `go`, the climb on a
  // right answer, the steal's flourish, and silence on a miss.
  const heard = useRef({ index: -1, phase: '', answers: 0 })
  useEffect(() => {
    if (!round) return
    const before = heard.current
    const sameRound = before.index === round.index
    heard.current = { index: round.index, phase: round.phase, answers: round.answers.length }
    if (round.phase === 'open' && round.answers.length === 0 && !(sameRound && before.phase === 'open')) {
      playSound(round.index === 0 ? 'launch' : 'go')
    }
    if (round.answers.length > (sameRound ? before.answers : 0)) {
      const last = round.answers[round.answers.length - 1]
      if (last.correct) playSound(last.steal ? 'steal' : 'correct')
      else resetSoundCombo('correct')
    }
  }, [round])

  const now = useNow(phase === 'open', 500)
  useBattleMusic(battle && !battle.finished ? battleMusicIntensity(battle, now) : null)

  const buzz = (seat: Seat) => {
    if (round?.phase !== 'open' || round.lockedOut.includes(seat)) return
    playSound('buzz')
    dispatch({ type: 'buzz', seat, now: Date.now() })
  }
  const answer = (choice: string) => {
    if (!round?.floor) return
    dispatch({ type: 'answer', seat: round.floor.seat, choice, now: Date.now() })
  }
  const next = () => dispatch({ type: 'next', now: Date.now() })
  const optionAt = (i: number) => () => {
    if (!battle || !round || round.phase !== 'buzzed') return
    const option = battle.questions[round.index].options[i]
    if (option && !round.answers.some(a => !a.correct && a.choice === option)) {
      playSound('select')
      answer(option)
    }
  }
  usePageKeyboard({
    a: () => buzz(0), A: () => buzz(0),
    l: () => buzz(1), L: () => buzz(1),
    '1': optionAt(0), '2': optionAt(1), '3': optionAt(2), '4': optionAt(3), '5': optionAt(4),
    Enter: () => { if (phase === 'revealed') next() },
  }, !!battle && !battle.finished)

  const topicOf = useCallback((index: number) => {
    const id = battle?.rounds[index]?.questionId
    const q = id ? questionsById.get(id) : undefined
    return q ? questionTopics(q)[0] ?? null : null
  }, [battle, questionsById])

  if (!battle || !round) return null

  if (battle.finished) {
    return (
      <DeckResults
        battle={battle}
        questionsById={questionsById}
        me={0}
        topicOf={topicOf}
        primary={{ label: 'Rematch', onClick: start, testid: 'battle-rematch' }}
        secondary={{ label: 'Change settings', onClick: onSettings }}
        onLeave={onExit}
      />
    )
  }

  const question = questionsById.get(round.questionId)
  const label = deckRoundLabel(battle, round.index)
  const final = isFinalRound(battle, round.index)
  const isLast = round.index + 1 >= battle.config.rounds
  const missedPicks = round.answers.map(a => ({ seat: a.seat, choice: a.choice, correct: a.correct }))

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-screen">
      <PlayerHalf battle={battle} seat={1} onBuzz={buzz} onAnswer={answer} />
      <div className="flex max-h-[62%] shrink-0 flex-col gap-2 overflow-y-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <LeaveButton onLeave={onExit} />
          <span className="text-xs font-semibold text-[var(--deck-label)]">{battleExamName(battle.config.exam)} · first to buzz answers</span>
        </div>
        {phase === 'countdown' ? (
          <DeckCountdown label={label} final={final} opensAt={round.opensAt} />
        ) : question ? (
          <div className="paper-sheet">
            <DeckQuestionCard
              key={question.id}
              question={question}
              players={battle.players}
              label={label}
              final={final}
              clock={phase === 'open' ? { opensAt: round.opensAt, deadline: round.deadline, running: true } : null}
              picker={phase === 'buzzed' ? round.floor?.seat ?? null : null}
              onPick={answer}
              picks={missedPicks}
              revealed={phase === 'revealed'}
            />
          </div>
        ) : null}
        {phase === 'revealed' && (
          <div className="flex flex-col gap-2 rounded-2xl border border-[var(--deck-table-edge)] bg-[var(--deck-table)] p-3">
            <RoundResult battle={battle} action={null} />
            <DeckSecondaryButton onClick={next} className="bg-white font-bold text-[var(--deck-ground)] hover:bg-white/90" data-testid="battle-next">
              {isLast ? 'See results' : isFinalRound(battle, round.index + 1) ? 'Final question' : 'Next question'}
            </DeckSecondaryButton>
          </div>
        )}
      </div>
      <PlayerHalf battle={battle} seat={0} onBuzz={buzz} onAnswer={answer} />
    </div>
  )
}
