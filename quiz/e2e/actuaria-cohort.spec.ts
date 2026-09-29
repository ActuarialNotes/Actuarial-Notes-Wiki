import { test, expect } from '@playwright/test'
import { signIn } from './fixtures/signedIn'

// Actuaria's social layer (docs/actuaria-online.md §6.11, §6.12, §7.6, §7.7)
// against a stubbed backend: a signed-in player starts a cohort, sees its risk
// pool and members, opens the raid, and runs at the boss — an ordinary quiz
// whose answers the raid function marks. The database's own rules are held by
// supabase/tests/actuaria_crews.sql; this is the screens and the wiring.

const CREW_ID = '5ca1ab1e-0000-4000-8000-00000000c0c0'
const DRAW_ID = 'd4a00000-0000-4000-8000-00000000d0d0'

function crewPayload(members: { name: string; covered: boolean; self?: boolean }[]) {
  return {
    crew: { id: CREW_ID, name: 'The Bayesians', exam: 'P', sitting: 'Nov 2026', invite_code: 'AB2C3D', members: members.length, cohort_z: 0.4 },
    me: { member_id: 'm-self', role: 'member', last_loot: null, last_loot_week: null },
    pool: { members: members.length, covered: members.filter(m => m.covered).length, active: members.filter(m => m.covered).length >= Math.ceil(members.length * 0.75) && members.length >= 3 },
    raid: members.length >= 3 ? { boss_max: 3000, boss_health: 2400, phase: 'open' } : null,
    members: members.map((m, i) => ({
      member_id: m.self ? 'm-self' : `m-${i}`, name: m.name, avatar: '', role: 'member', sector_z: 0.4,
      covered_today: m.covered, nudged_today: false, explanations: 0, is_self: !!m.self,
    })),
    nudges: [],
    challenges: [],
  }
}

test.describe('actuaria cohorts', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => { localStorage.setItem('actuarial-notes-sounds', 'false') })
  })

  test('asks a signed-out player to sign in, and shows the Cohort tab', async ({ page }) => {
    await page.goto('/actuaria/cohort')
    await expect(page.getByRole('heading', { name: 'Cohort' })).toBeVisible()
    await expect(page.getByText('so it needs an account')).toBeVisible()
    await page.goto('/actuaria/raid')
    await expect(page.getByText('A raid is fought by a cohort')).toBeVisible()
  })

  test('starts a cohort, sees its pool and members, and nudges one', async ({ page }) => {
    let crew: unknown = null
    const calls: { name: string; args: Record<string, unknown> }[] = []
    const log = (name: string, answer: (args: Record<string, unknown>) => unknown) => (args: Record<string, unknown>) => {
      calls.push({ name, args })
      return answer(args)
    }
    await signIn(page, {
      examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: null }],
      rpc: {
        actuaria_get_crew: log('get_crew', () => crew),
        actuaria_create_crew: log('create', () => {
          crew = crewPayload([{ name: 'Ada', covered: true, self: true }, { name: 'Bo', covered: false }, { name: 'Cy', covered: true }])
          return CREW_ID
        }),
        actuaria_share_progress: log('share', () => null),
        actuaria_get_threads: log('threads', () => []),
        actuaria_nudge: log('nudge', () => true),
      },
    })

    await page.goto('/actuaria/cohort')
    const empty = page.getByTestId('actuaria-cohort-empty')
    await expect(empty).toBeVisible()
    // What joining shares is said before anything is shared.
    await expect(empty).toContainText('never your email')
    await page.getByTestId('cohort-name').fill('The Bayesians')
    await page.getByTestId('cohort-create').click()

    const home = page.getByTestId('actuaria-cohort')
    await expect(home).toBeVisible()
    expect(calls.find(c => c.name === 'create')?.args).toMatchObject({ p_exam: 'P', p_name: 'The Bayesians', p_display_name: 'Ada' })
    await expect(page.getByTestId('cohort-invite-code')).toHaveText('AB2C3D')
    await expect(page.getByTestId('cohort-pool')).toContainText('2 / 3 covered today')
    await expect(page.getByTestId('cohort-members').getByRole('listitem')).toHaveCount(3)

    // Opening the screen shares this member's Credibility, for the raid's weak spots.
    await expect.poll(() => calls.some(c => c.name === 'share')).toBe(true)
    const share = calls.find(c => c.name === 'share')!.args
    expect(share.p_crew).toBe(CREW_ID)
    expect(typeof share.p_sector_z).toBe('number')
    expect(Object.keys(share.p_concept_z as object).length).toBeGreaterThan(10)

    await page.getByTestId('cohort-nudge-Bo').click()
    await expect(page.getByTestId('cohort-nudge-Bo')).toHaveText('Nudged')
    expect(calls.find(c => c.name === 'nudge')?.args).toMatchObject({ p_crew: CREW_ID, p_member: 'm-1' })
  })

  test('opens the raid and runs at the boss as a quiz the server marks', async ({ page }) => {
    const hits: unknown[] = []
    await signIn(page, {
      examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: null }],
      rpc: {
        actuaria_get_crew: () => crewPayload([{ name: 'Ada', covered: true, self: true }, { name: 'Bo', covered: true }, { name: 'Cy', covered: true }]),
        actuaria_get_threads: () => [],
        actuaria_get_raid: () => ({
          status: 'active', exam: 'P', members: 3, loot_pool: 300,
          raid: { id: 'r1', week: '2026-09-28', ends_at: '2026-10-05T00:00:00+00:00', boss_max: 3000, boss_health: 2400, phase: 'open' },
          board: [{ name: 'Bo', damage: 400, share: 0.67, is_self: false }, { name: 'Ada', damage: 200, share: 0.33, is_self: true }],
          weak_spots: [{ concept: 'Independent Events', z: 0.1 }],
          answered: [],
        }),
      },
    })
    await page.route('**/api/raid', async route => {
      const body = route.request().postDataJSON() as Record<string, unknown>
      expect(route.request().headers()['authorization']).toBe('Bearer e2e-access-token')
      if (body.action === 'draw') {
        return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ draw: DRAW_ID, questions: ['p-004'], phase: 'open' }) })
      }
      hits.push(body)
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ correct: true, damage: 142, healed: 0, boss_health: 2258, boss_max: 3000, phase: 'open' }) })
    })

    await page.goto('/actuaria/cohort')
    await page.getByTestId('cohort-raid-card').click()
    await expect(page).toHaveURL(/\/actuaria\/raid/)
    await expect(page.getByTestId('raid-boss')).toContainText('GAMBLER’S RUIN')
    await expect(page.getByRole('meter', { name: 'Boss health' })).toHaveAttribute('aria-valuenow', '2400')
    await expect(page.getByTestId('raid-damage-board')).toContainText('Bo')
    await expect(page.getByRole('button', { name: 'Independent Events' })).toBeVisible()

    await page.getByTestId('raid-join').click()
    await expect(page).toHaveURL(new RegExp(`/quiz\\?ids=p-004&raid=${DRAW_ID}`))
    await page.getByRole('button', { name: 'Start Quiz' }).click()
    await page.getByRole('button', { name: 'Option A' }).click()
    await page.getByRole('button', { name: 'Confirm Answer' }).click()

    // The answer goes to the function to mark — the client sends only its choice.
    await expect.poll(() => hits.length).toBe(1)
    expect(hits[0]).toEqual({ action: 'answer', draw: DRAW_ID, question: 'p-004', choice: 'A' })
    await expect(page.getByTestId('raid-hit')).toContainText('Hit Gambler’s Ruin for 142')
  })

  test('draws Gambler’s Ruin on the map while the cohort’s raid is up', async ({ page }) => {
    await signIn(page, {
      examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: null }],
      rpc: {
        actuaria_get_crew: () => crewPayload([{ name: 'Ada', covered: true, self: true }, { name: 'Bo', covered: true }, { name: 'Cy', covered: true }]),
      },
    })
    await page.goto('/actuaria/map')
    await expect(page.getByTestId('actuaria-raid')).toBeVisible()
    await page.goto('/actuaria/daily')
    await expect(page.getByTestId('actuaria-risk-pool')).toContainText('3 / 3')
    await expect(page.getByTestId('actuaria-risk-pool')).toContainText('+25% gems active')
  })
})
