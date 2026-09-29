// The raid's rules the Vercel function needs (docs/actuaria-online.md §7.7):
// which bank an exam's raid draws from, the time a question gets, and how the
// draw is made. Plain JS — the function can't import the app's TypeScript — and
// mirrored from quiz/src/lib/actuaria/raid.ts and lib/battle.ts, pinned by
// src/lib/actuaria/raidEndpoint.test.ts. The damage itself is the database's
// (actuaria_raid_hit), timed by the database's clock.

/** Questions served per run at the boss (RAID_DRAW_SIZE). */
export const RAID_DRAW_SIZE = 5

/**
 * An exam_progress key as the vault export keys its bank: `P`, `FM`, `MAS-I`
 * as they are, `CAS-5` → `5`, and `CAS-6` → `6C`, the one variant with a bank.
 */
export function kbExamKey(progressKey) {
  const key = String(progressKey ?? '')
  if (key === 'CAS-6') return '6C'
  return key.replace(/^CAS-/, '')
}

/**
 * Seconds a raid question gets — Quiz Battle's *Exam pace* (`roundSecondsFor`):
 * the sitting's own time per question from lib/quizTiming.ts, else three minutes.
 */
const PACE_SECONDS = { P: 360, FM: 300, 'MAS-I': 320, 'MAS-II': 320 }
export const FALLBACK_PACE_SECONDS = 180

export function raidPaceSeconds(kbKey) {
  return PACE_SECONDS[kbKey] ?? FALLBACK_PACE_SECONDS
}

/** Only what a click can mark is raced — or raided (lib/battle.ts isBattleQuestion). */
export function isRaidQuestion(q) {
  return (
    q?.type === 'multiple-choice' &&
    Array.isArray(q.options) &&
    q.options.length >= 2 &&
    q.options.some(o => o.key === q.answer)
  )
}

const norm = s => String(s ?? '').trim().toLowerCase()

/**
 * The questions a run draws (§7.7): the exam's click-markable questions on the
 * crew's weak spots, none this member has already hit this week, hard ones only
 * once the boss is All in. Weak spots first; if they hold too few, the rest of
 * the exam fills the run. `random` is injectable for the tests.
 */
export function drawRaidQuestions(questions, { exam, weakSpots = [], answered = [], phase = 'open', size = RAID_DRAW_SIZE, random = Math.random }) {
  const done = new Set(answered.map(norm))
  const weak = new Set(weakSpots.map(norm))
  const pool = questions.filter(q =>
    q.exam === exam &&
    !q.offSyllabus &&
    isRaidQuestion(q) &&
    !done.has(norm(q.id)) &&
    (phase !== 'all_in' || q.difficulty === 'hard'),
  )
  const shuffle = list => {
    const copy = list.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }
  const onWeak = pool.filter(q => (q.concepts ?? []).some(c => weak.has(norm(c))))
  const rest = pool.filter(q => !onWeak.includes(q))
  return [...shuffle(onWeak), ...shuffle(rest)].slice(0, size)
}
