import type { Page } from '@playwright/test'
import { PLACEHOLDER, USER_ID, signIn } from './signedIn'

// A signed-in account with something on every part of You (e2e/you.spec.ts):
// a level, a streak, gems, a day's quests with one finished, two exams with
// dates, and a place in Exam P's league. The day is fixed, so the quests are
// today's and the league's week has four days left.

const DAY = '2026-11-25'

const QUESTS = [
  { id: 'core-correct-3', title: 'Warm-Up', description: 'Answer 3 questions correctly', kind: 'correct', target: 3, gems: 10, xp: 30 },
  { id: 'hard-2', title: 'Second Wind', description: 'Answer 2 hard questions correctly', kind: 'hard_correct', target: 2, gems: 15, xp: 40 },
  { id: 'levelup-2', title: 'Topic Focus', description: 'Level up 2 concepts', kind: 'level_up', target: 2, gems: 15, xp: 40 },
]

const BOARD = [
  ['Mei', 1240], ['Tomas', 1105], ['Ada', 980], ['Priya', 910], ['Jonas', 760],
  ['Lucia', 615], ['Omar', 540], ['Hana', 310], ['Felix', 205], ['Ines', 90],
].map(([name, xp], i) => ({ rank: i + 1, display_name: name, avatar_url: '', weekly_xp: xp, is_self: name === 'Ada' }))

/** An account with a level, a streak, gems, a day's quests and, when `joined`, a league. */
export async function account(page: Page, opts: { pro?: boolean; joined?: boolean; exams?: boolean } = {}) {
  const { pro = true, joined = true, exams = true } = opts
  await page.clock.setFixedTime(new Date(`${DAY}T10:00:00Z`))
  await signIn(page, {
    pro,
    examProgress: exams
      ? [
        { exam_id: 'P', status: 'in_progress', target_date: '2027-01-14' },
        { exam_id: 'FM', status: 'in_progress', target_date: '2027-04-14' },
      ]
      : [],
    rpc: { get_league_board: () => (joined ? BOARD : []) },
  })
  const rows: Record<string, unknown> = {
    user_xp: { total_xp: 1240, goal_id: 'regular', today: DAY, today_xp: 60 },
    user_streaks: { current_streak: 12, longest_streak: 12, last_active_day: DAY, freezes: 0, last_broken_streak: 0, last_broken_on: null },
    user_gems: { balance: 86, total_earned: 120, total_spent: 34 },
    user_quests: { day: DAY, quests: QUESTS, progress: { 'core-correct-3': 3, 'hard-2': 1 }, claimed: [] },
    user_leagues: joined ? { opted_in: true, tier: 1, last_result: null, last_result_week: null, last_rank: null } : null,
  }
  for (const table of Object.keys(rows)) {
    await page.route(`${PLACEHOLDER}/rest/v1/${table}*`, route => {
      // A write is kept, so a read after it sees it (a quest collected stays collected).
      if (route.request().method() !== 'GET') {
        try {
          const body = route.request().postDataJSON()
          const sent = Array.isArray(body) ? body[0] : body
          if (sent && typeof sent === 'object') rows[table] = { ...(rows[table] as object | null), ...sent }
        } catch { /* no body */ }
        return route.fulfill({ status: 201, contentType: 'application/json', body: 'null' })
      }
      const row = rows[table]
      const single = (route.request().headers()['accept'] ?? '').includes('vnd.pgrst.object')
      if (!row) return route.fulfill({ status: single ? 406 : 200, contentType: 'application/json', body: single ? 'null' : '[]' })
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(single ? row : [{ user_id: USER_ID, ...row }]) })
    })
  }
}
