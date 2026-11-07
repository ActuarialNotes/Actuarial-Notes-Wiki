import type { Difficulty } from './parser'
import { DIFFICULTY_LEVELS, isAllDifficultyLevels } from './quizDifficulty'
import { paceForExam, timeAllowanceSeconds } from './quizTiming'

// What the quiz setup screen's card says about the quiz it will start: how
// long it should take, which topics it covers and which difficulties it draws
// from. Each line is a tap target that opens the setup sheet, so each has to be
// short enough to sit in a pill. Pure; the page is pages/Landing.tsx and the
// card components/landing/QuizHeroCard.tsx.

/**
 * How long `count` questions drawn from `pool` should take at the real
 * paper's pace (lib/quizTiming.ts), before the draw is made. A paper whose
 * source says how many questions it sets (ALTAM, ASTAM: three hours, six
 * questions) gives each question its share of the sitting — so a full paper's
 * worth reads as the paper's own length. Otherwise each question is the
 * pool's average allowance: an exam paced per *point* with no question count
 * (Exam 5) has questions of different sizes, and the average is the honest
 * figure for a draw not yet made. Null when the pool is empty or its exam has
 * no pace on file — the card then says nothing rather than guess.
 */
export function estimateSeconds(
  pool: readonly { exam: string; points: number }[],
  count: number,
): number | null {
  if (count <= 0 || pool.length === 0) return null
  let total = 0
  for (const q of pool) {
    const pace = paceForExam(q.exam)
    if (pace?.per === 'point' && pace.questions) {
      total += (pace.minutes * 60) / pace.questions
      continue
    }
    const own = timeAllowanceSeconds([q])
    if (own === null) return null
    total += own
  }
  return Math.round((total / pool.length) * count)
}

/**
 * An estimate as the card prints it: "~8 min", "~53 min", "~4 h",
 * "~1 h 15 min". Minutes under the hour; past it, hours and the minutes
 * rounded to five, since a quarter-hour is as precise as a pace allows.
 */
export function formatEstimate(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60))
  if (minutes < 60) return `~${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = Math.round((minutes % 60) / 5) * 5
  if (rest === 0) return `~${hours} h`
  if (rest === 60) return `~${hours + 1} h`
  return `~${hours} h ${rest} min`
}

/** The topics' pills: at most `cap` names, and how many more there are. */
export interface TopicPills {
  labels: string[]
  more: number
}

/**
 * The topics a quiz covers, named as briefly as they can be: a learning
 * objective picked whole is one pill under its own name, a concept picked on
 * its own is a pill of its own, and nothing picked — or everything — is "All
 * topics", since that is what the draw then covers. Objectives come first, in
 * syllabus order, then the loose concepts in the order the syllabus lists them.
 */
export function topicPills(
  groups: readonly { name: string; subtopics: readonly string[] }[],
  selected: readonly string[],
  cap = 3,
): TopicPills {
  const picked = new Set(selected)
  const everything = groups.length > 0 && groups.every(g => g.subtopics.every(s => picked.has(s)))
  if (picked.size === 0 || everything) return { labels: ['All topics'], more: 0 }

  const whole: string[] = []
  const loose: string[] = []
  const covered = new Set<string>()
  for (const g of groups) {
    if (g.subtopics.length > 0 && g.subtopics.every(s => picked.has(s))) {
      whole.push(g.name)
      for (const s of g.subtopics) covered.add(s)
    }
  }
  for (const g of groups) {
    for (const s of g.subtopics) {
      if (picked.has(s) && !covered.has(s)) {
        loose.push(s)
        covered.add(s)
      }
    }
  }
  // A picked concept the syllabus no longer lists still counts.
  for (const s of selected) if (!covered.has(s)) loose.push(s)

  const all = [...whole, ...loose]
  return { labels: all.slice(0, cap), more: Math.max(0, all.length - cap) }
}

const LEVEL_NAME: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/** The difficulty pill: "All levels", or the levels ticked — "Easy + Medium". */
export function difficultySummary(levels: readonly Difficulty[]): string {
  if (levels.length === 0 || isAllDifficultyLevels(levels)) return 'All levels'
  return DIFFICULTY_LEVELS.filter(l => levels.includes(l)).map(l => LEVEL_NAME[l]).join(' + ')
}

/** "1 question", "10 questions". */
export function questionsWord(n: number): string {
  return n === 1 ? 'question' : 'questions'
}
