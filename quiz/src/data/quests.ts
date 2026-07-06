// Daily-quest catalogue (roadmap P1.4) — authored as data, like mnemonics.ts.
//
// Quests are what turn the flat gem economy (earn on quiz completion, spend in
// the Store) into a daily loop: each day a small board of goals is generated,
// advances as quizzes complete, and pays gems + XP when the student collects a
// cleared quest. The *mechanics* (board generation, tallies, claiming) are pure
// and live in lib/quests.ts — this file only declares the quests themselves, so
// tuning the economy or adding a quest is a data edit, not a logic change.
//
// Design constraints (see the roadmap's risk register):
//   • Targets assume a normal day is a handful of questions: the highest core
//     target is 5 correct answers, not a grind.
//   • Rewards must reinforce the learning model, not fight it: the special
//     quests reward hard questions, reviving decayed concepts, climbing the
//     mastery ladder, and focusing on today's study plan — never raw volume
//     alone. Revive/focus quests only appear when the student's actual mastery
//     state / plan makes them achievable (see QuestContext in lib/quests.ts).
//   • Economy sizing: the base earn rate is 1 gem per correct answer and Store
//     prices are 10 (basic) / 50 (rare) / 100 (custom badge). A fully-cleared
//     day pays ~40–55 gems, so a rare cosmetic is a few days of clearing quests
//     — a real daily incentive that still keeps rare items feeling earned.

/** What a quest counts. Evaluated from a completed quiz in lib/quests.ts. */
export type QuestKind =
  | 'correct' // correct answers, any difficulty
  | 'hard_correct' // correct answers on hard questions
  | 'revive' // correct answers on concepts that had decayed to Forgotten
  | 'level_up' // concepts advanced up the mastery ladder
  | 'perfect_quiz' // quizzes of ≥ PERFECT_QUIZ_MIN questions, all answered correctly
  | 'concept_correct' // correct answers on one specific concept (from today's plan)

export interface QuestDef {
  /** Stable id — persisted in user_quests progress, so never reuse or rename. */
  id: string
  title: string
  /** One-line goal shown under the title. */
  description: string
  kind: QuestKind
  /** How many `kind` events clear the quest. */
  target: number
  /** Gem payout on collection. */
  gems: number
  /** XP payout on collection. */
  xp: number
  /** For kind 'concept_correct': the concept name the quest counts answers on. */
  concept?: string
}

/** Minimum quiz length for a perfect run to count (blocks 1-question freebies). */
export const PERFECT_QUIZ_MIN = 3

/** Quests on a day's board: one core + two personalized/special slots. */
export const DAILY_QUEST_COUNT = 3

/**
 * Core pool — always-achievable volume quests. Exactly one is picked per day so
 * every day has a quest any student can clear regardless of their mastery state.
 */
export const CORE_QUESTS: readonly QuestDef[] = [
  {
    id: 'core-correct-3',
    title: 'Warm-Up',
    description: 'Answer 3 questions correctly',
    kind: 'correct',
    target: 3,
    gems: 10,
    xp: 30,
  },
  {
    id: 'core-correct-4',
    title: 'On a Roll',
    description: 'Answer 4 questions correctly',
    kind: 'correct',
    target: 4,
    gems: 12,
    xp: 35,
  },
  {
    id: 'core-correct-5',
    title: 'Question Crusher',
    description: 'Answer 5 questions correctly',
    kind: 'correct',
    target: 5,
    gems: 15,
    xp: 40,
  },
]

/**
 * Revive ladder — only on the board when the student actually has concepts
 * decayed to Forgotten. The board generator picks the largest target covered by
 * the number of forgotten concepts due (3 forgotten → Memory Medic), so the
 * quest is always genuinely achievable.
 */
export const REVIVE_QUESTS: readonly QuestDef[] = [
  {
    id: 'revive-1',
    title: 'Back From the Brink',
    description: 'Correctly answer a question on a forgotten concept',
    kind: 'revive',
    target: 1,
    gems: 12,
    xp: 35,
  },
  {
    id: 'revive-2',
    title: 'Second Wind',
    description: 'Correctly answer 2 questions on forgotten concepts',
    kind: 'revive',
    target: 2,
    gems: 18,
    xp: 50,
  },
  {
    id: 'revive-3',
    title: 'Memory Medic',
    description: 'Correctly answer 3 questions on forgotten concepts',
    kind: 'revive',
    target: 3,
    gems: 24,
    xp: 65,
  },
]

/**
 * Generic special pool — always-eligible retention quests that fill whatever
 * board slots the personalized revive/focus quests don't take. Ordered with
 * kinds interleaved on purpose: the rotation scans this list from a hashed
 * start index, so adjacent entries sharing a kind would otherwise never appear
 * together.
 */
export const SPECIAL_QUESTS: readonly QuestDef[] = [
  {
    id: 'hard-2',
    title: 'Heavy Lifting',
    description: 'Clear 2 hard questions',
    kind: 'hard_correct',
    target: 2,
    gems: 15,
    xp: 40,
  },
  {
    id: 'levelup-2',
    title: 'Ladder Climber',
    description: 'Level up 2 concepts',
    kind: 'level_up',
    target: 2,
    gems: 14,
    xp: 40,
  },
  {
    id: 'perfect-1',
    title: 'Flawless',
    description: `Finish a quiz of ${PERFECT_QUIZ_MIN}+ questions with a perfect score`,
    kind: 'perfect_quiz',
    target: 1,
    gems: 18,
    xp: 50,
  },
  {
    id: 'hard-3',
    title: 'Boss Fight',
    description: 'Clear 3 hard questions',
    kind: 'hard_correct',
    target: 3,
    gems: 20,
    xp: 55,
  },
  {
    id: 'levelup-3',
    title: 'Momentum',
    description: 'Level up 3 concepts',
    kind: 'level_up',
    target: 3,
    gems: 18,
    xp: 50,
  },
]

/**
 * A study-plan focus quest, generated (not authored) for one of today's planned
 * concepts — e.g. "Answer 2 questions on Sample Space correctly". The id embeds
 * the concept so progress keys stay unambiguous within the day.
 */
export function makeConceptQuest(concept: string): QuestDef {
  const slug = concept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return {
    id: `concept-${slug}`,
    title: 'Topic Focus',
    description: `Answer 2 questions on ${concept} correctly`,
    kind: 'concept_correct',
    target: 2,
    gems: 14,
    xp: 40,
    concept,
  }
}
