// Daily-quest catalogue (roadmap P1.4) — authored as data, like mnemonics.ts.
//
// Quests are what turn the flat gem economy (earn on quiz completion, spend in
// the Store) into a daily loop: each day rotates a small set of goals that pay
// gems + XP when cleared. The *evaluation* logic (which quests run today, how a
// quiz advances them, when rewards fire) is pure and lives in lib/quests.ts —
// this file only declares the quests themselves, so tuning the economy or adding
// a quest is a data edit, not a logic change.
//
// Design constraints (see the roadmap's risk register):
//   • Rewards must reinforce the learning model, not fight it: the special pool
//     is weighted toward hard questions, reviving decayed concepts, and climbing
//     the mastery ladder — never raw volume alone.
//   • Economy sizing: the base earn rate is 1 gem per correct answer and Store
//     prices are 10 (basic) / 50 (rare) / 100 (custom badge). A fully-cleared
//     day of quests pays ~25–30 gems, so a rare cosmetic is roughly two weeks of
//     showing up and clearing quests — meaningful, not inflationary.

/** What a quest counts. Evaluated from a completed quiz in lib/quests.ts. */
export type QuestKind =
  | 'correct' // correct answers, any difficulty
  | 'hard_correct' // correct answers on hard questions
  | 'revive' // correct answers on concepts that had decayed to Forgotten
  | 'level_up' // concepts advanced up the mastery ladder
  | 'perfect_quiz' // quizzes of ≥ PERFECT_QUIZ_MIN questions, all answered correctly

export interface QuestDef {
  /** Stable id — persisted in user_quests progress, so never reuse or rename. */
  id: string
  title: string
  /** One-line goal shown under the title. */
  description: string
  kind: QuestKind
  /** How many `kind` events clear the quest. */
  target: number
  /** Gem payout on completion. */
  gems: number
  /** XP payout on completion. */
  xp: number
}

/** Minimum quiz length for a perfect run to count (blocks 1-question freebies). */
export const PERFECT_QUIZ_MIN = 5

/** Quests shown per day: one core + two specials (see lib/quests.ts). */
export const DAILY_QUEST_COUNT = 3

/**
 * Core pool — always-achievable volume quests. Exactly one is picked per day so
 * every day has a quest any student can clear regardless of their mastery state.
 */
export const CORE_QUESTS: readonly QuestDef[] = [
  {
    id: 'core-correct-5',
    title: 'Warm-Up',
    description: 'Answer 5 questions correctly',
    kind: 'correct',
    target: 5,
    gems: 5,
    xp: 15,
  },
  {
    id: 'core-correct-10',
    title: 'On a Roll',
    description: 'Answer 10 questions correctly',
    kind: 'correct',
    target: 10,
    gems: 8,
    xp: 25,
  },
  {
    id: 'core-correct-15',
    title: 'Question Crusher',
    description: 'Answer 15 questions correctly',
    kind: 'correct',
    target: 15,
    gems: 10,
    xp: 35,
  },
]

/**
 * Special pool — retention-aligned quests. Two distinct *kinds* are picked per
 * day. Ordered with kinds interleaved on purpose: the daily rotation scans this
 * list from a hashed start index, so adjacent entries sharing a kind would
 * otherwise never appear together.
 */
export const SPECIAL_QUESTS: readonly QuestDef[] = [
  {
    id: 'hard-3',
    title: 'Heavy Lifting',
    description: 'Clear 3 hard questions',
    kind: 'hard_correct',
    target: 3,
    gems: 10,
    xp: 30,
  },
  {
    id: 'revive-1',
    title: 'Back From the Brink',
    description: 'Correctly answer a question on a forgotten concept',
    kind: 'revive',
    target: 1,
    gems: 8,
    xp: 25,
  },
  {
    id: 'levelup-2',
    title: 'Ladder Climber',
    description: 'Level up 2 concepts',
    kind: 'level_up',
    target: 2,
    gems: 8,
    xp: 25,
  },
  {
    id: 'perfect-1',
    title: 'Flawless',
    description: `Finish a quiz of ${PERFECT_QUIZ_MIN}+ questions with a perfect score`,
    kind: 'perfect_quiz',
    target: 1,
    gems: 12,
    xp: 35,
  },
  {
    id: 'hard-5',
    title: 'Boss Fight',
    description: 'Clear 5 hard questions',
    kind: 'hard_correct',
    target: 5,
    gems: 14,
    xp: 45,
  },
  {
    id: 'revive-3',
    title: 'Memory Medic',
    description: 'Correctly answer 3 questions on forgotten concepts',
    kind: 'revive',
    target: 3,
    gems: 14,
    xp: 45,
  },
  {
    id: 'levelup-4',
    title: 'Momentum',
    description: 'Level up 4 concepts',
    kind: 'level_up',
    target: 4,
    gems: 12,
    xp: 40,
  },
]
