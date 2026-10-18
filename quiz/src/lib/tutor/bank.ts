// **What an answer does to the rest of the app** (docs/tutor.md §5.4).
//
// A part answered in the Tutor counts toward mastery, XP, the streak, quests,
// the daily heatmap and the question's attempt badge exactly as one answered in
// a quiz: it is banked through `recordReviewAnswers`, the Fix-Mistakes
// reviewer's path. This module shapes the answers for it — pure, so the rules
// are tested rather than trusted.
//
// Each item is banked as a one-part question under its question's id, carrying
// only *its* concepts: a miss on part (c), about large losses, mustn't count
// against the trend concept part (a) was about. A written part is banked as a
// free-entry question with the candidate's self-grade as its manual grade —
// full credit is correct, partial and no credit are not, the quiz's own rule
// for a manually graded part. Two parts of one question can't share a batch
// (their ids would collide), so a batch is cut into rounds.

import type { Question, SelfGrade } from '../parser'
import type { TutorItem } from './items'

export interface BankedAnswer {
  item: TutorItem
  grade: SelfGrade
  /** What was chosen (an option key), or what was written — '' for nothing. */
  answer: string
  seconds: number
}

/** A concept's name as a question's `wiki_link` writes it — spaces as `+`. */
export function conceptLink(name: string): string {
  return `Concepts/${name.trim().replace(/ /g, '+')}`
}

/** The item as the one-part question it is banked as. */
export function bankQuestion(item: TutorItem): Question {
  const choice = item.options.length > 0
  return {
    id: item.questionId,
    exam: item.exam,
    topic: item.topic,
    learning_objective: '',
    difficulty: item.difficulty,
    type: choice ? 'multiple-choice' : 'free-entry',
    wiki_link: item.concepts.map(conceptLink),
    // `question_responses.correct_answer` is NOT NULL; a written part with no
    // printed answer line says what it was marked against.
    answer: item.answerKey || 'Self-graded against the sample answer',
    explanation: '',
    points: item.points,
    stem: item.prompt,
    options: item.options,
  }
}

export interface BankRound {
  questions: Question[]
  responses: Record<string, { chosen: string; timeSpent: number }>
  manualGrades: Record<string, SelfGrade>
}

/** A batch of answers, cut into rounds with no question twice in one. */
export function bankRounds(answers: readonly BankedAnswer[]): BankRound[] {
  const rounds: BankRound[] = []
  for (const a of answers) {
    const q = bankQuestion(a.item)
    let round = rounds.find(r => !r.questions.some(x => x.id === q.id))
    if (!round) {
      round = { questions: [], responses: {}, manualGrades: {} }
      rounds.push(round)
    }
    round.questions.push(q)
    const written = a.item.options.length === 0
    round.responses[q.id] = { chosen: written ? a.answer.trim() || '(worked on paper)' : a.answer, timeSpent: a.seconds }
    if (written) round.manualGrades[q.id] = a.grade
  }
  return rounds
}
