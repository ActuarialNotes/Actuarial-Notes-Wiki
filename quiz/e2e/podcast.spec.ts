import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test, type Page } from '@playwright/test'
import { PLACEHOLDER, signIn } from './fixtures/signedIn'
import { PODCAST_BRIDGES, podcastClipKey, podcastIndexFile, scriptHash, type PodcastClip } from '../src/lib/podcast'
import { briefScript, refresherScript } from '../src/lib/podcastScripts'

// The daily podcast (docs/daily-podcast.md): a Pro reader with a study plan
// finds today's episode on the plan card, plays it, keeps it playing while
// moving around the app, and the daily email's link opens it.
//
// The recordings are a fixture: every clip in the index is the same three-
// second tone (CBR MP3, no headers, as the recorder writes them), but the
// index is built from the real vault's script hashes, so the app's check that
// a clip is current with the page it reads is exercised for real.

const HERE = dirname(fileURLToPath(import.meta.url))
const CLIP = readFileSync(resolve(HERE, 'fixtures/podcast-clip.mp3'))
const CLIP_SECONDS = (statSync(resolve(HERE, 'fixtures/podcast-clip.mp3')).size * 8) / 64000

function indexForVault(): string {
  const clips: Record<string, PodcastClip> = {}
  const clip = (h: string): PodcastClip => ({ h, a: '', d: CLIP_SECONDS, b: CLIP.length, voice: 'af_heart', model: 'kokoro-82m' })
  for (const [id, text] of Object.entries(PODCAST_BRIDGES)) clips[podcastClipKey('bridge', id)] = clip(scriptHash(text))
  const dir = resolve(HERE, '../../Concepts')
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue
    const name = file.slice(0, -3)
    const markdown = readFileSync(resolve(dir, file), 'utf8')
    const brief = briefScript(name, markdown)
    const refresher = refresherScript(name, markdown)
    if (brief) clips[podcastClipKey('brief', name)] = clip(scriptHash(brief))
    if (refresher) clips[podcastClipKey('refresher', name)] = clip(scriptHash(refresher))
  }
  return JSON.stringify(podcastIndexFile(clips))
}

const INDEX = indexForVault()

async function setUp(page: Page) {
  await page.clock.setFixedTime(new Date('2026-10-31T10:00:00'))
  await signIn(page, { pro: true, examProgress: [{ exam_id: 'P', status: 'in_progress', target_date: '2027-01-15' }] })
  await page.addInitScript(() => {
    localStorage.setItem('actuarial_study_plan_config_v1_P', JSON.stringify({
      targetReadyDate: '2026-12-15', targetStrengthLevel: 'strong_all', planStartDate: '2026-10-20',
    }))
  })
  // Registered after signIn, so these win over its catch-all.
  await page.route(`${PLACEHOLDER}/storage/v1/object/public/podcast/index.json`, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: INDEX }))
  await page.route(`${PLACEHOLDER}/storage/v1/object/public/podcast/**/*.mp3`, route =>
    route.fulfill({ status: 200, contentType: 'audio/mpeg', body: CLIP }))
}

test('the plan card plays today\'s episode, and it keeps playing across the app', async ({ page }) => {
  await setUp(page)
  await page.goto('/dashboard')
  const button = page.getByTestId('podcast-play')
  await expect(button).toBeVisible({ timeout: 30_000 })
  await expect(button).toContainText("Listen to today's plan")
  await expect(button).toContainText(/\d+ concepts? · \d+ min/)
  await button.locator('xpath=ancestor::div[contains(@class,"space-y-5")][1]').screenshot({ path: 'test-results/podcast-plan-card.png' })
  await button.click()

  const player = page.getByTestId('podcast-player')
  const panel = player.getByRole('dialog', { name: /Today's episode · Exam P/ })
  await expect(panel).toBeVisible()
  await expect(panel).toContainText('Day 12 of')
  const chapters = panel.getByRole('list', { name: 'Chapters' }).getByRole('listitem')
  await expect(chapters.first()).toContainText('Intro')
  await expect(chapters.last()).toContainText('Wrap-up')
  const count = await chapters.count()
  expect(count).toBeGreaterThan(2)

  // Loaded: the clips joined into one track as long as the chapters say.
  await expect(panel.getByRole('button', { name: /^(Play|Pause)$/ })).toBeEnabled({ timeout: 15_000 })
  await expect(panel.getByRole('slider', { name: 'Position' })).toHaveAttribute('max', String(Math.round(count * CLIP_SECONDS)))
  // And it plays: the browser decodes the joined clips and the clock moves.
  const position = panel.getByRole('slider', { name: 'Position' })
  await expect.poll(async () => Number(await position.inputValue()), { timeout: 15_000 }).toBeGreaterThan(0)
  await panel.getByRole('button', { name: 'Pause' }).click()
  await panel.screenshot({ path: 'test-results/podcast-panel.png' })

  // A chapter jumps there; its Read link goes to the concept's page.
  await chapters.nth(1).getByRole('button').click()
  await expect(chapters.nth(1).getByRole('button')).toHaveAttribute('aria-current', 'true')

  // Leave the Dashboard: the pill stays, the episode with it.
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await page.goto('/wiki')
  await expect(page.getByTestId('podcast-player')).toBeHidden() // a full load ends playback…
})

test('the pill follows the reader around the app', async ({ page }) => {
  await setUp(page)
  await page.goto('/dashboard')
  await page.getByTestId('podcast-play').click({ timeout: 30_000 })
  const player = page.getByTestId('podcast-player')
  await expect(player.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  // …but moving within the app keeps it.
  await page.getByRole('link', { name: 'Study Guides' }).first().click()
  await expect(page).toHaveURL(/\/wiki/)
  await expect(player).toBeVisible()
  await expect(player.getByRole('button', { name: /^(Play|Pause)$/ })).toBeEnabled()
  await player.screenshot({ path: 'test-results/podcast-pill.png' })
  await player.getByRole('button', { expanded: false }).click()
  await player.getByRole('button', { name: 'Close the player' }).click()
  await expect(player).toBeHidden()
})

test('the daily email\'s Listen link opens the episode', async ({ page }) => {
  await setUp(page)
  await page.goto('/dashboard?episode=P&utm_source=daily-plan-email&utm_medium=email&utm_campaign=study-plan&utm_content=podcast')
  const panel = page.getByTestId('podcast-player').getByRole('dialog', { name: /Today's episode · Exam P/ })
  await expect(panel).toBeVisible({ timeout: 30_000 })
  await expect(page).toHaveURL(/\/dashboard$/)
})

test('a recording made from an older page is not played', async ({ page }) => {
  await setUp(page)
  // Every concept clip is stale: only the bridges are current, so there's no episode.
  const stale = JSON.parse(INDEX)
  for (const key of Object.keys(stale.clips)) if (!key.startsWith('bridge/')) stale.clips[key][0] = 'stale'
  await page.route(`${PLACEHOLDER}/storage/v1/object/public/podcast/index.json`, route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(stale) }))
  await page.goto('/dashboard')
  await expect(page.getByText("Today's Study Plan").first()).toBeVisible({ timeout: 30_000 })
  await expect(page.getByTestId('podcast-play')).toHaveCount(0)
})
