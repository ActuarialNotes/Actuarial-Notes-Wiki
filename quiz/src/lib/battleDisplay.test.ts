import { describe, expect, it } from 'vitest'
import { battleReducer, createBattle, currentRound, type BattleEvent, type BattleState } from './battle'
import {
  PLAYER_HUES,
  battleMusicIntensity,
  battleExamKey,
  battleExamName,
  playerAccentStyle,
  playerInitials,
  pointsChips,
  resultHeadline,
  roundHeadline,
  roundLabel,
  signedPoints,
} from './battleDisplay'

const NAMES = ['Ada', 'Bo'] as const

function played(rules: 'buzzer' | 'simultaneous', ...events: BattleEvent[]): BattleState {
  const s = createBattle({
    config: { rules, exam: 'Probability', rounds: 3, roundSeconds: 60 },
    players: [{ name: 'Ada' }, { name: 'Bo' }],
    questions: ['a', 'b', 'c'].map(id => ({ id, answer: 'B', options: ['A', 'B', 'C'] })),
    now: 0,
  })
  return [{ type: 'tick' as const, now: 3000 }, ...events].reduce(battleReducer, s)
}

describe('player colours', () => {
  it('keeps both hues clear of the meaning map', () => {
    // green (correct), red (incorrect), amber (caution), orange (streak)
    const meaning = [142, 0, 38, 25]
    for (const hue of PLAYER_HUES) {
      for (const taken of meaning) {
        const distance = Math.min(Math.abs(hue - taken), 360 - Math.abs(hue - taken))
        expect(distance).toBeGreaterThanOrEqual(40)
      }
    }
    const [a, b] = PLAYER_HUES
    expect(Math.abs(a - b)).toBeGreaterThanOrEqual(60)
  })

  it('hands out the four steps as custom properties', () => {
    expect(Object.keys(playerAccentStyle(1))).toEqual(['--player', '--player-muted', '--player-soft', '--player-vivid'])
  })

  it('cuts a name to its initials', () => {
    expect(playerInitials('Ada Lovelace')).toBe('AL')
    expect(playerInitials('bo')).toBe('B')
    expect(playerInitials('  ')).toBe('?')
  })
})

describe('exams', () => {
  it('names and keys an exam the way the rest of the app does', () => {
    expect(battleExamName('Probability')).toBe('Exam P')
    expect(battleExamName('Exam MAS-I')).toBe('Exam MAS-I')
    expect(battleExamKey('Financial Mathematics')).toBe('FM')
    expect(battleExamKey('Nope')).toBeNull()
  })
})

describe('telling a round', () => {
  it('says who got it, and whether it was a steal', () => {
    const won = played('buzzer', { type: 'buzz', seat: 0, now: 4000 }, { type: 'answer', seat: 0, choice: 'B', now: 5000 })
    expect(roundHeadline(currentRound(won), NAMES)).toBe('Ada got it')
    const stolen = played('buzzer',
      { type: 'buzz', seat: 0, now: 4000 }, { type: 'answer', seat: 0, choice: 'A', now: 5000 },
      { type: 'buzz', seat: 1, now: 6000 }, { type: 'answer', seat: 1, choice: 'B', now: 7000 })
    expect(roundHeadline(currentRound(stolen), NAMES)).toBe('Steal! Bo got it')
  })

  it('says who was faster when both got it', () => {
    const both = played('simultaneous',
      { type: 'answer', seat: 1, choice: 'B', now: 4000 }, { type: 'answer', seat: 0, choice: 'B', now: 9000 })
    expect(roundHeadline(currentRound(both), NAMES)).toBe('Both got it — Bo was faster')
  })

  it('tells a miss from the clock running out', () => {
    const missed = played('simultaneous',
      { type: 'answer', seat: 1, choice: 'A', now: 4000 }, { type: 'answer', seat: 0, choice: 'C', now: 5000 })
    expect(roundHeadline(currentRound(missed), NAMES)).toBe('Nobody got it')
    const timeout = played('simultaneous', { type: 'tick', now: 3000 + 60_000 })
    expect(roundHeadline(currentRound(timeout), NAMES)).toBe("Time's up")
  })

  it('lists only the points a right answer earned', () => {
    const won = played('buzzer', { type: 'buzz', seat: 0, now: 3000 }, { type: 'answer', seat: 0, choice: 'B', now: 4000 })
    expect(pointsChips(currentRound(won).answers[0].points)).toEqual([{ label: 'Speed', value: 50 }])
  })

  it('names the final question', () => {
    const s = played('buzzer')
    expect(roundLabel(s)).toBe('Question 1 of 3')
    expect(roundLabel(s, 2)).toBe('Final question')
  })

  it('signs points', () => {
    expect(signedPoints(135)).toBe('+135')
    expect(signedPoints(-50)).toBe('−50')
    expect(signedPoints(1250)).toBe('+1,250')
  })

  it('heads the results', () => {
    expect(resultHeadline(0, null, NAMES)).toBe('Ada wins')
    expect(resultHeadline(null, null, NAMES)).toBe("It's a draw")
    expect(resultHeadline(1, 0, NAMES)).toBe('Ada left — Bo wins')
  })
})

describe('the music, heard from the game', () => {
  it('is calm over a reveal, plays under a question and leans in at the end', () => {
    const counting = played('buzzer', { type: 'tick', now: 0 })
    expect(battleMusicIntensity(counting, 0, 'countdown')).toBe(1)
    const open = played('buzzer')
    expect(battleMusicIntensity(open, 3000 + 10_000)).toBe(1)
    expect(battleMusicIntensity(open, 3000 + 50_001)).toBe(2)
    const buzzed = played('buzzer', { type: 'buzz', seat: 0, now: 4000 })
    expect(battleMusicIntensity(buzzed, 4000)).toBe(2)
    const revealed = played('buzzer', { type: 'buzz', seat: 0, now: 4000 }, { type: 'answer', seat: 0, choice: 'B', now: 5000 })
    expect(battleMusicIntensity(revealed, 5000)).toBe(0)
    expect(battleMusicIntensity(open, 3000, 'closing')).toBe(2)
  })

  it('leans in for the whole of the final question, and stops at the end', () => {
    let s = played('buzzer')
    for (let i = 0; i < 2; i++) {
      const at = currentRound(s).opensAt
      s = [
        { type: 'buzz' as const, seat: 0 as const, now: at },
        { type: 'answer' as const, seat: 0 as const, choice: 'B', now: at + 1 },
        { type: 'next' as const, now: at + 2 },
        { type: 'tick' as const, now: at + 2 + 3000 },
      ].reduce(battleReducer, s)
    }
    expect(battleMusicIntensity(s, currentRound(s).opensAt)).toBe(2)
    expect(battleMusicIntensity(battleReducer(s, { type: 'forfeit', seat: 0, now: 0 }), 0)).toBeNull()
  })
})
