import { useCallback, useEffect, useRef } from 'react'
import { RotateCcw, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BattleScoreboard, type PlayerStatus } from '@/components/battle/BattleScoreboard'
import { BattleQuestionCard } from '@/components/battle/BattleQuestionCard'
import { BattleCountdown } from '@/components/battle/BattleCountdown'
import { BattleActionBar, Buzzers, FloorPad, NextButton, RoundResult } from '@/components/battle/BattleActionBar'
import { BattleResults } from '@/components/battle/BattleResults'
import { BattleTopRow } from '@/components/battle/BattleTopRow'
import { useLocalBattle } from '@/hooks/useBattle'
import { usePageKeyboard } from '@/hooks/useKeyboard'
import { playSound, resetSoundCombo } from '@/lib/soundEngine'
import {
  SEATS,
  createBattle,
  currentRound,
  isFinalRound,
  type BattleConfig,
  type BattlePlayer,
  type BattleQuestionKey,
  type Seat,
} from '@/lib/battle'
import { answerFor, battleExamName } from '@/lib/battleDisplay'
import type { Question } from '@/lib/parser'

/**
 * A battle on one screen, under buzzer rules: both players read, the first to
 * buzz (A on the left, L on the right, or their button) answers with 1–5, and
 * a miss hands the other the steal. See lib/battle.ts for the rules.
 */
export function LocalBattle({
  config,
  players,
  draw,
  questionsById,
  onSettings,
  onExit,
}: {
  config: BattleConfig
  players: [BattlePlayer, BattlePlayer]
  /** A fresh set of questions — called for the first battle and every rematch. */
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

  // ── Sounds ────────────────────────────────────────────────────────────────
  // The paper sound as each question is laid down; the climbing `correct` on a
  // right answer; and silence on a miss, which only ends the climb
  // (docs/sound-design.md, rules 7 and 10).
  const heard = useRef({ index: -1, phase: '', answers: 0 })
  useEffect(() => {
    if (!round) return
    const before = heard.current
    const sameRound = before.index === round.index
    heard.current = { index: round.index, phase: round.phase, answers: round.answers.length }
    if (round.phase === 'open' && round.answers.length === 0 && !(sameRound && before.phase === 'open')) {
      playSound(round.index === 0 ? 'launch' : 'page')
    }
    if (round.answers.length > (sameRound ? before.answers : 0)) {
      if (round.answers[round.answers.length - 1].correct) playSound('correct')
      else resetSoundCombo('correct')
    }
  }, [round])

  // Each question — and the results — starts at the top of the page, not
  // wherever the last one's options left the scroll.
  const roundIndex = round?.index ?? -1
  const finished = !!battle?.finished
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [roundIndex, finished])

  // ── Moves ─────────────────────────────────────────────────────────────────
  const buzz = (seat: Seat) => dispatch({ type: 'buzz', seat, now: Date.now() })
  const answer = (choice: string) => {
    if (!round?.floor) return
    dispatch({ type: 'answer', seat: round.floor.seat, choice, now: Date.now() })
  }
  const next = () => dispatch({ type: 'next', now: Date.now() })

  const optionAt = (i: number) => () => {
    if (!battle || !round || round.phase !== 'buzzed') return
    const option = battle.questions[round.index].options[i]
    // An option already struck out as a miss is off the pad and the card; the
    // number key for it does nothing either.
    const ruledOut = round.answers.some(a => !a.correct && a.choice === option)
    if (option && !ruledOut) {
      playSound('select')
      answer(option)
    }
  }
  const keyBuzz = (seat: Seat) => () => {
    if (round?.phase === 'open' && !round.lockedOut.includes(seat)) {
      playSound('press')
      buzz(seat)
    }
  }

  usePageKeyboard({
    a: keyBuzz(0), A: keyBuzz(0),
    l: keyBuzz(1), L: keyBuzz(1),
    '1': optionAt(0), '2': optionAt(1), '3': optionAt(2), '4': optionAt(3), '5': optionAt(4),
    Enter: () => { if (phase === 'revealed') next() },
  }, !!battle && !battle.finished)

  if (!battle || !round) return null

  const question = questionsById.get(round.questionId)

  if (battle.finished) {
    return (
      <BattleResults
        battle={battle}
        questionsById={questionsById}
        actions={
          <>
            <Button size="lg" onClick={start} className="h-12 gap-2 rounded-xl" data-testid="battle-rematch">
              <RotateCcw className="h-4 w-4" aria-hidden />
              Rematch
            </Button>
            <Button size="lg" variant="outline" onClick={onSettings} className="h-12 gap-2 rounded-xl">
              <Settings2 className="h-4 w-4" aria-hidden />
              Change settings
            </Button>
            <Button size="lg" variant="ghost" onClick={onExit} className="h-12 rounded-xl">
              Done
            </Button>
          </>
        }
      />
    )
  }

  const status = SEATS.map((seat): PlayerStatus | null => {
    if (phase === 'buzzed' && round.floor?.seat === seat) return { text: 'Buzzed in!', tone: 'player' }
    if (phase === 'revealed') {
      const a = answerFor(round, seat)
      if (!a) return null
      return a.correct ? { text: a.steal ? 'Stole it' : 'Got it', tone: 'player' } : { text: 'Missed', tone: 'muted' }
    }
    if (round.lockedOut.includes(seat)) return { text: 'Locked out', tone: 'muted' }
    return null
  }) as [PlayerStatus | null, PlayerStatus | null]

  const isLast = round.index + 1 >= battle.config.rounds

  return (
    <div style={{ paddingBottom: 'calc(var(--action-bar-height, 6rem) + 1.5rem)' }}>
      <BattleTopRow onLeave={onExit}>
        <span className="truncate">{battleExamName(battle.config.exam)} · first to buzz answers</span>
      </BattleTopRow>
      <BattleScoreboard battle={battle} status={status} />

      <div className="mt-4">
        {phase === 'countdown' ? (
          <BattleCountdown battle={battle} />
        ) : question ? (
          <div className="paper-sheet">
            <BattleQuestionCard
              key={question.id}
              question={question}
              players={battle.players}
              picker={phase === 'buzzed' ? round.floor?.seat ?? null : null}
              onPick={answer}
              picks={round.answers.map(a => ({ seat: a.seat, choice: a.choice, correct: a.correct }))}
              revealed={phase === 'revealed'}
            />
          </div>
        ) : null}
      </div>

      <BattleActionBar>
        {phase === 'revealed' ? (
          <RoundResult
            battle={battle}
            action={<NextButton label={isLast ? 'See results' : isFinalRound(battle, round.index + 1) ? 'Final question' : 'Next question'} onClick={next} />}
          />
        ) : phase === 'buzzed' ? (
          <FloorPad battle={battle} onAnswer={answer} />
        ) : (
          <Buzzers battle={battle} onBuzz={buzz} />
        )}
      </BattleActionBar>
    </div>
  )
}
