import { test, expect, type Page } from '@playwright/test'

/**
 * The Community tab, from a signed-out browser. The tab is open to one
 * approved account while in Preview; the suite's build opens it to every
 * viewer (`VITE_COMMUNITY_PREVIEW=on`, `COMMUNITY_OPEN_TO_ALL`). The lock is
 * pinned by `src/lib/community/access.test.ts`. The discussion feed is stubbed
 * so the flow doesn't depend on the archive.
 */

const now = Date.now()
const FEED = {
  asOf: new Date(now).toISOString(),
  posts: [
    {
      id: 'aaa111',
      source: 'reddit',
      title: 'Passed Exam FM on the second try',
      author: 'tester',
      createdAt: new Date(now - 3 * 3600_000).toISOString(),
      url: 'https://www.reddit.com/r/actuary/comments/aaa111/passed_exam_fm/',
      comments: 14,
      score: 52,
      flair: 'Exams',
      excerpt: 'Studied about 300 hours.',
    },
    {
      id: 'bbb222',
      source: 'reddit',
      title: 'Entry level salary in Toronto?',
      author: 'another',
      createdAt: new Date(now - 26 * 3600_000).toISOString(),
      url: 'https://www.reddit.com/r/actuary/comments/bbb222/entry_level_salary/',
      comments: 30,
      score: 21,
      flair: null,
      excerpt: null,
    },
  ],
}

async function stubFeed(page: Page) {
  await page.route('**/api/community-feed', route => route.fulfill({ json: FEED }))
}

test.describe('community', () => {
  test('is a row in the sidebar and opens on the overview', async ({ page }) => {
    await stubFeed(page)
    await page.goto('/dashboard')
    await page.getByRole('link', { name: 'Community' }).first().click()
    await expect(page).toHaveURL(/\/community$/)
    await expect(page.getByRole('heading', { name: 'Community', level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'What actuaries are saying' })).toBeVisible()
    // The overview leads with the most-discussed thread (30 comments to 14).
    await expect(page.getByTestId('community-post').first()).toContainText('Entry level salary')
    await expect(page.getByTestId('community-featured-event')).toBeVisible()
  })

  test('follows a topic and builds For you from it', async ({ page }) => {
    await stubFeed(page)
    await page.goto('/community')
    await page.getByRole('button', { name: /Careers/ }).first().click()
    await page.getByRole('button', { name: 'For you' }).click()
    await expect(page).toHaveURL(/scope=following/)
    await page.getByRole('radio', { name: 'Discussions' }).click()
    await expect(page.getByTestId('community-post')).toHaveCount(1)
    await expect(page.getByTestId('community-post')).toContainText('Entry level salary')
  })

  test('opens a topic page with its exams and a follow button', async ({ page }) => {
    await stubFeed(page)
    await page.goto('/community/topic/exams')
    await expect(page.getByRole('heading', { name: 'Exams', level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Exam FM', exact: true })).toBeVisible()
    const follow = page.getByRole('button', { name: 'Follow Exams' })
    await follow.click()
    await expect(page.getByRole('button', { name: 'Unfollow Exams' })).toBeVisible()
  })

  test('sorts events by a chosen home city, and shows its CAS affiliate', async ({ page }) => {
    await stubFeed(page)
    await page.goto('/community?view=places')
    await page.getByTestId('community-home').first().selectOption('Toronto, ON')
    await expect(page.getByRole('heading', { name: 'Serving Toronto, ON' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Ontario Conference of Casualty Actuaries/ })).toBeVisible()
  })
})
