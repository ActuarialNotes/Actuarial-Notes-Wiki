import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { test, expect, type Page } from '@playwright/test'

// Quiz Battle, played to the end both ways (docs/quiz-battle.md). The build
// runs with VITE_BATTLE_TRANSPORT=local, so the online battle is two pages of
// one browser talking over BroadcastChannel — the whole protocol, host and
// guest, with no Supabase project behind it.

/** Every bank question's right answer, read off the vault — the page doesn't say before the reveal. */
function answerKey(): Map<string, string> {
  const root = fileURLToPath(new URL('../../questions/', import.meta.url))
  const key = new Map<string, string>()
  // Banks nest (questions/exam-p/probability/…), so walk the whole tree.
  for (const file of readdirSync(root, { recursive: true, encoding: 'utf8' })) {
    if (!file.endsWith('.md')) continue
    const text = readFileSync(`${root}${file}`, 'utf8')
    const id = /^id:\s*"?([^"\n]+)"?/m.exec(text)?.[1]
    const answer = /^answer:\s*"?([^"\n]*)"?/m.exec(text)?.[1]
    if (id && answer) key.set(id.trim(), answer.trim())
  }
  return key
}

const ANSWERS = answerKey()

/** The question on screen, its right option and a wrong one. */
async function currentQuestion(page: Page): Promise<{ right: string; wrong: string }> {
  const card = page.getByTestId('battle-question')
  // The first question follows the deal (7 s) and its count-in, and a coin round a toss.
  await expect(card).toBeVisible({ timeout: 25_000 })
  const id = await card.getAttribute('data-question-id')
  const right = ANSWERS.get(id ?? '')
  expect(right, `answer for ${id}`).toBeTruthy()
  const options = await card.locator('[data-testid^="battle-option-"]').evaluateAll(els =>
    els.map(el => el.getAttribute('data-testid')!.replace('battle-option-', '')),
  )
  return { right: right!, wrong: options.find(o => o !== right)! }
}

async function chooseThreeQuestions(page: Page) {
  await page.getByRole('radiogroup', { name: 'Questions' }).getByRole('radio', { name: '3' }).click()
}

/**
 * The Deck's intro plays once per visit: a tap skips it. (The suite runs with
 * reduced motion, where it is a short fade that may be gone before the tap.)
 */
async function skipIntro(page: Page) {
  await expect(page.getByTestId('battle-home')).toBeVisible()
  const intro = page.getByTestId('battle-intro')
  if (await intro.count()) await intro.click({ timeout: 2000 }).catch(() => {})
  await expect(intro).toHaveCount(0)
}

/** The battle's setup, as the browser remembers it — names, exam — written before the page reads it. */
async function rememberSetup(page: Page, setup: { names?: [string, string]; exam?: string; lobbyExam?: string }) {
  await page.evaluate(s => {
    const stored = JSON.parse(localStorage.getItem('actuarial_battle_setup_v1') ?? '{}')
    localStorage.setItem('actuarial_battle_setup_v1', JSON.stringify({ ...stored, ...s }))
  }, setup)
}

/** Raise a mode's card in the start screen's hand, and press the button under it. */
async function startMode(page: Page, mode: 'local' | 'lobby' | 'friend') {
  await page.getByTestId(`battle-card-${mode}`).click()
  await expect(page.getByTestId(`battle-card-${mode}`)).toHaveAttribute('aria-pressed', 'true')
  await page.getByTestId(mode === 'friend' ? 'battle-mode-host' : `battle-mode-${mode}`).click()
}

/** The friend room's settings tiles step on with a tap: to three questions. */
async function roomToThreeQuestions(page: Page) {
  const tile = page.getByTestId('battle-room-rounds')
  for (let i = 0; i < 4 && !((await tile.textContent()) ?? '').startsWith('3'); i++) await tile.click()
  await expect(tile).toContainText('3questions')
}

async function roomCode(page: Page): Promise<string> {
  const codeTiles = page.getByTestId('battle-room-code')
  await expect(codeTiles).toBeVisible()
  const code = ((await codeTiles.getAttribute('aria-label')) ?? '').replace('Room code ', '').replace(/ /g, '')
  expect(code).toMatch(/^[A-Z2-9]{4}$/)
  return code
}

/** An online round on the Deck: choose an option, then lock it in. */
async function lockIn(page: Page, option: string) {
  await page.getByTestId(`battle-option-${option}`).click()
  await expect(page.getByTestId('battle-lock-in')).toHaveText(`Lock in ${option}`)
  await page.getByTestId('battle-lock-in').click()
}

/** Every topic tile the draw offers on this page, by name. */
async function topicNames(page: Page): Promise<string[]> {
  await expect(page.getByTestId('battle-topic-picker')).toBeVisible({ timeout: 15_000 })
  return page.getByTestId('battle-topic').evaluateAll(els => els.map(el => el.getAttribute('data-topic') ?? ''))
}

/**
 * Draws a hand of four and locks it in: the named topics, or the tiles from
 * `from` on. Returns the hand.
 */
async function drawHandAndLock(page: Page, hand: string[] | { from: number }): Promise<string[]> {
  const names = Array.isArray(hand) ? hand : (await topicNames(page)).slice(hand.from, hand.from + 4)
  await expect(page.getByTestId('battle-topic-picker')).toBeVisible({ timeout: 15_000 })
  for (const [i, name] of names.entries()) {
    const tile = page.locator(`[data-testid="battle-topic"][data-topic="${name.replace(/"/g, '\\"')}"]`)
    await tile.scrollIntoViewIfNeeded()
    await tile.click()
    await expect(tile).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByTestId('battle-topic-count')).toHaveText(`${i + 1} of 4`)
  }
  await page.getByTestId('battle-topics-lock').click()
  // Locked in: the button goes — to a wait for the other player, or (the
  // second in) straight to the strikes.
  await expect(page.getByTestId('battle-topics-lock')).toBeHidden()
  return names
}

/** Strikes one of the other player's cards — tapped, then Discard. */
async function strikeCard(page: Page, topic?: string) {
  await expect(page.getByTestId('battle-strike')).toBeVisible({ timeout: 15_000 })
  const card = topic
    ? page.locator(`[data-testid="battle-strike-card"][data-topic="${topic.replace(/"/g, '\\"')}"]`)
    : page.getByTestId('battle-strike-card').first()
  await card.click()
  await expect(card).toHaveAttribute('aria-pressed', 'true')
  await page.getByTestId('battle-discard').click()
  await expect(page.getByTestId('battle-strike-made')).toBeVisible()
}

/** The whole draft, for a battle that is about something else: four tiles each, a strike each, the deal skipped. */
async function draftThrough(a: Page, b: Page) {
  await drawHandAndLock(a, { from: 0 })
  await drawHandAndLock(b, { from: 4 })
  await strikeCard(a)
  await strikeCard(b)
  for (const page of [a, b]) {
    await expect(page.getByTestId('battle-deal')).toBeVisible({ timeout: 15_000 })
    await page.getByTestId('battle-deal').click()
  }
}

/** Each concept the bank tags, with every concept a question tags it beside — all questions, or only those a battle races. */
function coTags(raceable: boolean): Map<string, Set<string>> {
  const root = fileURLToPath(new URL('../../questions/exam-fm/', import.meta.url))
  const tags = new Map<string, Set<string>>()
  for (const file of readdirSync(root)) {
    if (!file.endsWith('.md')) continue
    const text = readFileSync(`${root}${file}`, 'utf8')
    const head = text.split(/^---$/m)[1] ?? ''
    if (raceable && (!/^type:\s*multiple-choice/m.test(head) || /^off_syllabus:\s*true/m.test(head))) continue
    const block = /^wiki_link:\s*\n((?:\s+-.*\n)+)/m.exec(head)?.[1] ?? ''
    const names = [...block.matchAll(/-\s*"?([^"\n]+)"?/g)].map(m => m[1].trim().split('/').pop()!.replace(/\+/g, ' ').toLowerCase())
    for (const n of names) {
      const set = tags.get(n) ?? new Set<string>()
      for (const o of names) if (o !== n) set.add(o)
      tags.set(n, set)
    }
  }
  return tags
}

/**
 * Two hands of four on Exam FM whose deal is known: once each player strikes
 * the other's fourth card, exactly one cross pair (`mine[0]`–`theirs[0]`) has
 * a question that tests both, and none of the other cards share a question
 * with anything — so that pair is the final, and the first two rounds go to a
 * coin.
 */
function knownDeal(offered: readonly string[]): { mine: string[]; theirs: string[] } {
  const any = coTags(false)
  const raced = coTags(true)
  const byKey = new Map(offered.map(n => [n.toLowerCase(), n]))
  const tied = (a: string, b: string) => any.get(a.toLowerCase())?.has(b.toLowerCase()) ?? false
  for (const [x, partners] of raced) {
    if (!byKey.has(x)) continue
    for (const y of partners) {
      if (!byKey.has(y)) continue
      const loners: string[] = []
      for (const n of offered) {
        const k = n.toLowerCase()
        if (k === x || k === y || !any.has(k)) continue
        if ([x, y, ...loners].some(o => tied(k, o))) continue
        loners.push(n)
        if (loners.length === 6) {
          const [a, b] = [byKey.get(x)!, byKey.get(y)!]
          return { mine: [a, loners[0], loners[1], loners[4]], theirs: [b, loners[2], loners[3], loners[5]] }
        }
      }
    }
  }
  throw new Error('No known deal on Exam FM')
}

test.describe('quiz battle', () => {
  // A battle strikes a cue on every tick of its count-in. A headless browser
  // with no audio device can trap in its audio output thread under that
  // (the page reports "Target crashed"), and no assertion here is about
  // sound — so play these with the app muted.
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => { localStorage.setItem('actuarial-notes-sounds', 'false') })
  })

  test('is reached from the Quiz tab, through the intro', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    await page.getByTestId('quiz-games-entry').click()
    await expect(page).toHaveURL(/\/games$/)
    await page.getByTestId('quiz-battle-entry').click()
    await expect(page).toHaveURL(/\/battle$/)
    await skipIntro(page)
    await expect(page.getByRole('heading', { name: 'Quiz Battle' })).toBeVisible()
  })

  test('the intro plays once per visit, and ends on its own', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/battle')
    // Left alone, it runs its course and lands on the start screen.
    await expect(page.getByTestId('battle-intro')).toBeVisible()
    await expect(page.getByTestId('battle-intro')).toHaveCount(0, { timeout: 6000 })
    await expect(page.getByTestId('battle-home')).toBeVisible()
    // Out to a screen and back up to the start screen is the same visit: no intro.
    await startMode(page, 'local')
    await expect(page.getByTestId('battle-seating')).toBeVisible()
    await page.getByRole('button', { name: 'Back' }).first().click()
    await expect(page.getByTestId('battle-home')).toBeVisible()
    await expect(page.getByTestId('battle-intro')).toHaveCount(0)
  })

  test('under reduced motion the intro is a short fade', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/battle')
    await expect(page.getByTestId('battle-intro')).toHaveCount(0, { timeout: 2500 })
    await expect(page.getByTestId('battle-home')).toBeVisible()
    await context.close()
  })

  test('raises a card of the hand, and the button follows it', async ({ page }) => {
    await page.goto('/battle')
    await skipIntro(page)
    await expect(page.getByTestId('battle-card-lobby')).toHaveAttribute('aria-pressed', 'true')
    await expect(page.getByTestId('battle-mode-lobby')).toHaveText('Find an opponent')
    await page.getByTestId('battle-card-friend').click()
    await expect(page.getByTestId('battle-mode-host')).toHaveText('Create a room')
    await page.getByTestId('battle-card-local').click()
    await expect(page.getByTestId('battle-mode-local')).toHaveText('Play on this device')
    // The exam is a deck, changed from its own sheet.
    await page.getByTestId('battle-exam-deck').click()
    await page.getByTestId('battle-exam-Financial Mathematics').click()
    await expect(page.getByTestId('battle-exam-deck')).toContainText('Exam FM deck')
  })

  test('plays a same-screen battle to the end: buzz, miss, steal, results, rematch', async ({ page }) => {
    await page.goto('/battle')
    await skipIntro(page)
    await startMode(page, 'local')
    // The players sit at either end of the phone: player 2's half is turned to face them.
    await page.getByTestId('battle-name-0').fill('Ada')
    await page.getByTestId('battle-name-1').fill('Sam')
    await page.getByTestId('battle-settings').click()
    await page.getByTestId('battle-exam-Probability').click()
    await chooseThreeQuestions(page)
    await page.getByRole('button', { name: 'Done' }).click()
    await page.getByTestId('battle-begin').click()

    await expect(page.getByTestId('battle-countdown')).toBeVisible()

    for (let round = 0; round < 3; round++) {
      const { right, wrong } = await currentQuestion(page)
      // Ada buzzes from the keyboard and misses…
      await page.keyboard.press('a')
      await expect(page.getByTestId('battle-player-0')).toContainText('Buzzed in!')
      await page.getByTestId(`battle-option-${wrong}`).click()
      await expect(page.getByTestId('battle-player-0')).toContainText('Locked out')
      await expect(page.getByTestId('battle-buzz-0')).toBeDisabled()
      // …and Sam steals it, tapping his half of the phone, on the pad it becomes.
      await page.getByTestId('battle-buzz-1').click()
      await expect(page.getByTestId(`battle-pad-${wrong}`)).toBeDisabled()
      await page.getByTestId(`battle-pad-${right}`).click()
      await expect(page.getByTestId('battle-round-result')).toContainText('Steal! Sam got it')
      await page.getByTestId('battle-next').click()
    }

    await expect(page.getByTestId('battle-result-headline')).toHaveText('Sam wins')
    // Three wrong buzzes, the last on the double-points question.
    await expect(page.getByTestId('battle-result-0')).toHaveText('-200')
    await expect(page.getByTestId('battle-rounds').locator('tbody tr')).toHaveCount(3)
    // Ada lost every round: one of them is offered as practice, a quiz on its topic.
    await expect(page.getByTestId('battle-lost-round')).toContainText('The round you lost')
    await expect(page.getByTestId('battle-practice')).toHaveAttribute('href', /^\/quiz\?concept=/)
    await page.getByTestId('battle-review').click()
    await expect(page.getByRole('region', { name: 'Review questions' }).locator('li')).toHaveCount(3)

    await page.getByTestId('battle-rematch').click()
    await expect(page.getByTestId('battle-countdown')).toBeVisible()
    await expect(page.getByTestId('battle-score-0')).toHaveText('0')
  })

  test('plays an online battle between two devices', async ({ context }) => {
    test.setTimeout(90_000)
    const host = await context.newPage()
    const guest = await context.newPage()

    await host.goto('/battle')
    await rememberSetup(host, { names: ['Ada', ''] })
    await host.reload()
    await skipIntro(host)
    await startMode(host, 'friend')

    // The room opens at once: the code as four cards, an empty seat, its settings.
    const code = await roomCode(host)
    await expect(host.getByTestId('battle-lobby')).toContainText('Empty seat')
    await expect(host.getByTestId('battle-start-online')).toHaveText('Waiting for your friend')
    await expect(host.getByTestId('battle-start-online')).toBeDisabled()
    await roomToThreeQuestions(host)
    await host.getByTestId('battle-room-exam').click()
    await host.getByTestId('battle-exam-Financial Mathematics').click()
    await expect(host.getByTestId('battle-room-exam')).toContainText('FM')

    // The invite link opens straight onto joining.
    await guest.goto(`/battle?join=${code}`)
    await expect(guest.getByTestId('battle-join-code')).toHaveValue(code)
    await guest.getByTestId('battle-join-name').fill('Bo')
    await guest.getByTestId('battle-join').click()

    await expect(host.getByTestId('battle-lobby')).toContainText('Bo is in')
    await expect(guest.getByTestId('battle-lobby')).toContainText('Waiting for Ada to start')
    await host.getByTestId('battle-start-online').click()

    // The draw: four cards each, from two hands whose deal is known (one
    // pair a question tests both of — the final — and two settled by a coin).
    const { mine, theirs } = knownDeal(await topicNames(host))
    // Bo watches Ada's hand fill as face-down pips; she can't lock in short of four.
    for (const [i, name] of mine.entries()) {
      await host.locator(`[data-testid="battle-topic"][data-topic="${name}"]`).click()
      await expect(host.getByTestId('battle-topic-count')).toHaveText(`${i + 1} of 4`)
      if (i === 1) {
        await expect(guest.getByTestId('battle-player-0')).toHaveAttribute('data-drawn', '2')
        await expect(host.getByTestId('battle-topics-lock')).toBeDisabled()
      }
    }
    await host.getByTestId('battle-topics-lock').click()
    // Bo sees that Ada is in — and not what she drew.
    await expect(guest.getByTestId('battle-player-0')).toContainText('Locked in')
    await expect(guest.getByTestId('battle-player-0')).toHaveAttribute('data-drawn', '4')
    await drawHandAndLock(guest, theirs)

    // The strikes: both hands face up, each strikes the other's fourth card,
    // and neither sees the other's until both are in.
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-strike')).toBeVisible()
      await expect(page.locator('ol[aria-label="Before the battle"] [aria-current="step"]')).toHaveText('Strike')
    }
    await strikeCard(host, theirs[3])
    await expect(guest.getByTestId('battle-strike-status')).toContainText('Ada has struck one of yours')
    await expect(guest.getByTestId('battle-strike-card').first()).toBeVisible()
    await strikeCard(guest, mine[3])

    // The deal: the grid, the pairs drawn out — the final tests both, the
    // other two go to a coin — and who struck what, the same on both screens.
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-deal')).toBeVisible()
      await expect(page.getByTestId('battle-deal-grid').getByRole('cell')).toHaveCount(9)
      await expect(page.getByTestId('battle-deal-card')).toHaveCount(3)
      await expect(page.locator('[data-testid="battle-deal-card"][data-coin]')).toHaveCount(2)
      await expect(page.locator('[data-testid="battle-deal-card"][data-final]')).not.toHaveAttribute('data-coin', /.*/)
    }
    await expect(host.getByTestId('battle-deal-strikes')).toHaveText(`Bo struck ${mine[3]}. You struck ${theirs[3]}.`)
    await expect(guest.getByTestId('battle-deal-strikes')).toHaveText(`Ada struck ${theirs[3]}. You struck ${mine[3]}.`)
    // A tap skips to the deal's last frame; it holds through Round 1's count-in.
    await host.getByTestId('battle-deal').click()
    await expect(host.getByTestId('battle-deal')).toHaveAttribute('data-done', 'true')

    for (let round = 0; round < 3; round++) {
      if (round < 2) {
        // A coin round: the host tosses, and both screens land on the same card.
        for (const page of [host, guest]) await expect(page.getByTestId('battle-coin')).toBeVisible({ timeout: 20_000 })
        const winner = await host.getByTestId('battle-coin').getAttribute('data-winner')
        await expect(guest.getByTestId('battle-coin')).toHaveAttribute('data-winner', winner ?? '')
        const topic = winner === '0' ? mine[round + 1] : theirs[round + 1]
        for (const page of [host, guest]) await expect(page.getByTestId('battle-coin-result')).toContainText(topic)
      }
      const { right, wrong } = await currentQuestion(host)
      await expect(guest.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
      await expect(host.getByTestId('battle-question')).toContainText(round === 2 ? 'Final ×2' : `Round ${round + 1} of 3`)
      // The chips: a coin round's one topic, the final's pair in both colours.
      await expect(host.getByTestId('battle-round-topic')).toHaveAttribute('data-chips', round === 2 ? '2' : '1')

      await lockIn(host, right)
      // Bo sees that Ada is in — and not what she picked.
      await expect(guest.getByTestId('battle-player-0')).toContainText('Locked in')
      await expect(guest.getByTestId(`battle-option-${right}`)).not.toContainText('Locked in')

      await lockIn(guest, wrong)
      for (const page of [host, guest]) {
        await expect(page.getByTestId('battle-round-result')).toContainText('Ada got it')
      }
      await host.getByTestId('battle-next').click()
      await expect(host.getByTestId('battle-next')).toContainText('Waiting for Bo')
      await guest.getByTestId('battle-next').click()
    }

    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-result-headline')).toHaveText('Ada wins')
    }
    // Bo lost them all and is offered one as practice; Ada lost none.
    await expect(guest.getByTestId('battle-lost-round')).toBeVisible()
    await expect(host.getByTestId('battle-lost-round')).toHaveCount(0)

    // Bo asks for a rematch; Ada starts it, and both draw again.
    await expect(guest.getByTestId('battle-rematch')).toHaveText('Rematch Ada')
    await guest.getByTestId('battle-rematch').click()
    await expect(host.getByText('Bo wants a rematch!')).toBeVisible()
    await host.getByTestId('battle-rematch').click()
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-topic-picker')).toBeVisible()
      await expect(page.getByTestId('battle-topic-count')).toHaveText('0 of 4')
      await expect(page.locator('ol[aria-label="Before the battle"] [aria-current="step"]')).toHaveText('Draw')
    }
  })

  test('a friend room is joined from its own Join tab, and switched back to Host', async ({ page }) => {
    await page.goto('/battle')
    await skipIntro(page)
    await startMode(page, 'friend')
    await roomCode(page)
    await page.getByTestId('battle-room-join').click()
    // Four empty card slots to type into; a code that can't be one says so.
    await expect(page.getByTestId('battle-join')).toBeDisabled()
    await page.getByTestId('battle-join-code').fill('ab1c')
    await expect(page.getByText('That isn’t a room code')).toBeVisible()
    await page.getByTestId('battle-room-host').click()
    await roomCode(page)
  })

  test('says so when nobody is in the lobby, and lets the player browse while they wait', async ({ context }) => {
    const page = await context.newPage()
    const other = await context.newPage()
    await page.goto('/battle')
    await skipIntro(page)
    await expect(page.getByTestId('battle-lobby-status')).toHaveText('No one’s in the lobby right now')
    await page.getByTestId('battle-mode-lobby').click()
    // Find an opponent is the Ready: straight into the queue, the clock running.
    await expect(page.getByTestId('battle-lobby-state')).toContainText('Finding an opponent · 0:0')

    // A concept card opens in the concept popup above the lobby…
    const card = page.getByTestId('battle-browse-card').first()
    const name = ((await card.getAttribute('aria-label')) ?? '').replace(/^Read /, '')
    await card.click()
    await expect(page.getByRole('complementary', { name: `Concept: ${name}` })).toBeVisible()
    // …and the queue doesn't pause for it: the player is still waiting, as others see.
    await expect(page.getByTestId('battle-lobby-state')).toContainText('Finding an opponent')
    await other.goto('/battle')
    await skipIntro(other)
    await expect(other.getByTestId('battle-lobby-status')).toHaveText('1 player waiting now')

    // Leaving the lobby takes the player out of it.
    await page.getByTestId('battle-lobby-leave').click()
    await expect(page.getByTestId('battle-home')).toBeVisible()
    await expect(other.getByTestId('battle-lobby-status')).toHaveText('No one’s in the lobby right now', { timeout: 10_000 })
  })

  test('matches two strangers from the lobby into a battle, and back to it', async ({ context }) => {
    test.setTimeout(120_000)
    const ada = await context.newPage()
    const bo = await context.newPage()

    await ada.goto('/battle')
    await rememberSetup(ada, { names: ['Ada', ''], exam: 'Probability', lobbyExam: 'Probability' })
    await ada.reload()
    await skipIntro(ada)
    await ada.getByTestId('battle-mode-lobby').click()
    await expect(ada.getByTestId('battle-lobby-state')).toContainText('Finding an opponent')
    // Ada reads a card while she waits.
    await ada.getByTestId('battle-browse-card').first().click()
    await expect(ada.getByRole('complementary', { name: /^Concept:/ })).toBeVisible()

    // One browser profile plays both: give Bo his own name and exam first.
    await bo.goto('/battle')
    await rememberSetup(bo, { names: ['Bo', ''], exam: 'Exam MAS-I', lobbyExam: 'Exam MAS-I' })
    await bo.reload()
    await skipIntro(bo)
    await expect(bo.getByTestId('battle-lobby-status')).toHaveText('1 player waiting now')
    await bo.getByTestId('battle-mode-lobby').click()

    // Different exams: they see each other, and nobody is matched…
    await expect(bo.getByTestId('battle-lobby-player')).toContainText('Ada is waiting for Exam P')
    await expect(ada.getByTestId('battle-lobby-player')).toContainText('Bo is waiting for Exam MAS-I')
    // …until Bo goes to Ada's exam. The match closes the card Ada was reading.
    await bo.getByRole('button', { name: 'Play Exam P' }).click()
    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-match-intro')).toBeVisible()
    }
    await expect(ada.getByRole('complementary', { name: /^Concept:/ })).toHaveCount(0)
    // The draft, then the deal on both screens.
    await draftThrough(ada, bo)

    // A matched battle is three questions. Ada's device hosts: she was waiting first.
    for (let round = 0; round < 3; round++) {
      const { right, wrong } = await currentQuestion(ada)
      await expect(bo.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
      await lockIn(ada, right)
      await lockIn(bo, wrong)
      await expect(bo.getByTestId('battle-round-result')).toContainText('Ada got it')
      await ada.getByTestId('battle-next').click()
      await bo.getByTestId('battle-next').click()
    }
    await expect(bo.getByTestId('battle-result-headline')).toHaveText('Ada wins')

    // And back into the lobby for someone new.
    await expect(bo.getByTestId('battle-find-another')).toHaveText('New opponent')
    await bo.getByTestId('battle-find-another').click()
    await expect(bo.getByTestId('battle-matchmaking')).toBeVisible()
  })

  // A place in the queue outlives the lobby screen (lib/battleQueue.ts): a
  // ready player can read elsewhere while they wait, a pill follows them with
  // how long they've waited, and the match brings them back to the battle.
  async function queueAsAda(ada: Page) {
    await ada.goto('/battle')
    await rememberSetup(ada, { names: ['Ada', ''], exam: 'Probability', lobbyExam: 'Probability' })
    await ada.reload()
    await skipIntro(ada)
    await ada.getByTestId('battle-mode-lobby').click()
    await expect(ada.getByTestId('battle-lobby-state')).toContainText('Finding an opponent')
  }
  const queuePill = (page: Page) => page.getByRole('button', { name: /Return to lobby/ })

  test('keeps a player in the queue away from the lobby, and brings them back for the match', async ({ context }) => {
    test.setTimeout(120_000)
    const ada = await context.newPage()
    const bo = await context.newPage()
    await queueAsAda(ada)
    await expect(queuePill(ada)).toHaveCount(0)

    await ada.getByRole('link', { name: 'Study Guides' }).first().click()
    await ada.waitForURL('**/wiki')
    await expect(queuePill(ada)).toBeVisible()
    await expect(queuePill(ada).getByRole('timer')).toHaveText(/^\d+:\d\d$/)

    // Still in the lobby, as everyone else sees it.
    await bo.goto('/battle')
    await skipIntro(bo)
    await expect(bo.getByTestId('battle-lobby-status')).toHaveText('1 player waiting now')

    // Return: the same lobby, still in the queue — and no intro on the way back.
    await queuePill(ada).click()
    await ada.getByRole('dialog', { name: 'Looking for an opponent' }).getByRole('button', { name: 'Return' }).click()
    await ada.waitForURL('**/battle')
    await expect(ada.getByTestId('battle-lobby-state')).toContainText('Finding an opponent')
    await expect(ada.getByTestId('battle-intro')).toHaveCount(0)
    await expect(queuePill(ada)).toHaveCount(0)

    // Away again — and an opponent arriving fetches her back to play.
    await ada.getByRole('link', { name: 'Study Guides' }).first().click()
    await ada.waitForURL('**/wiki')
    await expect(queuePill(ada)).toBeVisible()
    await rememberSetup(bo, { names: ['Bo', ''], exam: 'Probability', lobbyExam: 'Probability' })
    await bo.reload()
    await skipIntro(bo)
    await bo.getByTestId('battle-mode-lobby').click()
    await ada.waitForURL('**/battle')
    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-match-intro')).toBeVisible()
    }
    await expect(queuePill(ada)).toHaveCount(0)
  })

  test('Leave takes the player out of the queue from anywhere', async ({ context }) => {
    const ada = await context.newPage()
    const bo = await context.newPage()
    await queueAsAda(ada)
    await ada.getByRole('link', { name: 'Study Guides' }).first().click()
    await ada.waitForURL('**/wiki')

    await queuePill(ada).click()
    await ada.getByRole('dialog', { name: 'Looking for an opponent' }).getByRole('button', { name: 'Leave' }).click()
    await expect(queuePill(ada)).toHaveCount(0)

    await bo.goto('/battle')
    await skipIntro(bo)
    await expect(bo.getByTestId('battle-lobby-status')).toHaveText('No one’s in the lobby right now')
  })

  // Monte Carlo Station is this page under Actuaria's skin (docs/actuaria-online.md
  // §6.8): chrome and words, never the game. A room's code is its channel's
  // name, so a player on /actuaria/battle and one on /battle are in one room.
  test('plays across the two skins — Monte Carlo Station hosts, Quiz Battle joins', async ({ context }) => {
    test.setTimeout(90_000)
    const host = await context.newPage()
    const guest = await context.newPage()

    await host.goto('/actuaria/battle')
    await expect(host.getByRole('heading', { name: /monte carlo station/i })).toBeVisible()
    await expect(host.getByTestId('actuaria-scope')).toBeVisible()
    await host.getByTestId('battle-mode-host').click()
    await host.getByTestId('battle-name-0').fill('Ada')
    // The exam is picked as a sector; a written paper is listed, and can't be raced.
    await expect(host.getByTestId('battle-exam-Exam ASTAM')).toBeDisabled()
    await host.getByTestId('battle-exam-Financial Mathematics').click()
    await chooseThreeQuestions(host)
    await host.getByTestId('battle-begin').click()

    const codeTiles = host.getByTestId('battle-room-code')
    await expect(codeTiles).toBeVisible()
    const code = ((await codeTiles.getAttribute('aria-label')) ?? '').replace('Room code ', '').replace(/ /g, '')

    await guest.goto(`/battle?join=${code}`)
    await guest.getByTestId('battle-join-name').fill('Bo')
    await guest.getByTestId('battle-join').click()
    await expect(host.getByTestId('battle-lobby')).toContainText('Bo is in')
    await host.getByTestId('battle-start-online').click()
    // The draft is the Deck's under both skins.
    await draftThrough(host, guest)

    let missed = ''
    for (let round = 0; round < 3; round++) {
      const { right, wrong } = await currentQuestion(host)
      await expect(guest.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
      // The question is framed in space on the station, and plain on Quiz Battle.
      await expect(host.getByTestId('battle-hud-frame')).toBeVisible()
      await expect(guest.getByTestId('battle-hud-frame')).toHaveCount(0)
      if (round === 0) {
        missed = (await host.getByTestId('battle-question').getAttribute('data-question-id')) ?? ''
        await host.getByTestId(`battle-option-${wrong}`).click()
        // Quiz Battle's own page is the Deck: an option is chosen, then locked in.
        await lockIn(guest, right)
      } else {
        await host.getByTestId(`battle-option-${right}`).click()
        await lockIn(guest, wrong)
      }
      await expect(host.getByTestId('battle-round-result')).toBeVisible()
      await host.getByTestId('battle-next').click()
      await guest.getByTestId('battle-next').click()
    }

    for (const page of [host, guest]) await expect(page.getByTestId('battle-results')).toBeVisible()
    // The claims review: Ada's one miss, as an ordinary quiz. Quiz Battle's own
    // page offers no such thing.
    await expect(host.getByTestId('battle-review-misses')).toHaveAttribute('href', `/quiz?ids=${encodeURIComponent(missed)}`)
    await expect(guest.getByTestId('battle-review-misses')).toHaveCount(0)
    await expect(host.getByText('Claims review')).toBeVisible()

    // A battle saves nothing, on either skin.
    for (const page of [host, guest]) {
      const saved = await page.evaluate(() => ['actuarial_streak_state', 'actuarial_xp_state', 'actuarial_quests_state', 'actuarial_local_mastery_v1']
        .filter(k => localStorage.getItem(k) !== null))
      expect(saved).toEqual([])
    }
  })

  test('a private channel with abilities on: each brings the Hangar loadout, spent on both screens', async ({ context }) => {
    const host = await context.newPage()
    const guest = await context.newPage()

    await host.goto('/actuaria/battle')
    await host.getByTestId('battle-mode-host').click()
    await host.getByTestId('battle-name-0').fill('Ada')
    await host.getByTestId('battle-exam-Financial Mathematics').click()
    await chooseThreeQuestions(host)
    await host.getByRole('radiogroup', { name: 'Abilities' }).getByRole('radio', { name: 'On' }).click()
    await host.getByTestId('battle-begin').click()

    const codeTiles = host.getByTestId('battle-room-code')
    await expect(codeTiles).toBeVisible()
    await expect(host.getByTestId('battle-lobby')).toContainText('abilities on')
    const code = ((await codeTiles.getAttribute('aria-label')) ?? '').replace('Room code ', '').replace(/ /g, '')

    await guest.goto(`/actuaria/battle?join=${code}`)
    await guest.getByTestId('battle-join-name').fill('Bo')
    await guest.getByTestId('battle-join').click()
    await expect(host.getByTestId('battle-lobby')).toContainText('Bo is in')
    await host.getByTestId('battle-start-online').click()
    await draftThrough(host, guest)

    const { right, wrong } = await currentQuestion(host)
    await expect(guest.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
    // A guest pilot has mastered nothing yet, so each brings the starter alone.
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-ability-tray').getByTestId('ability-reinsurance')).toHaveAttribute('data-state', 'ready')
    }

    // Arming one is heard on this screen and seen as spent on the other.
    await host.getByTestId('ability-reinsurance').click()
    await expect(host.getByTestId('ability-reinsurance')).toHaveAttribute('data-state', 'armed')
    await expect(guest.getByTestId('battle-opponent-abilities')).toHaveText('Ada used Reinsurance')
    await expect(guest.getByTestId('ability-reinsurance')).toHaveAttribute('data-state', 'ready')

    await host.getByTestId(`battle-option-${right}`).click()
    await guest.getByTestId(`battle-option-${wrong}`).click()
    await expect(host.getByTestId('battle-round-result')).toBeVisible()
    // Reinsurance waits for a claim; a wrong lock-in under these rules is none.
    await expect(host.getByTestId('ability-reinsurance')).toHaveAttribute('data-state', 'armed')
  })

  test('a room without abilities, or a page without a loadout, shows no tray', async ({ context }) => {
    const host = await context.newPage()
    const guest = await context.newPage()

    // Quiz Battle's own page doesn't offer the setting: its room opens at once.
    const plain = await context.newPage()
    await plain.goto('/battle')
    await skipIntro(plain)
    await startMode(plain, 'friend')
    await roomCode(plain)
    await expect(plain.getByRole('radiogroup', { name: 'Abilities' })).toHaveCount(0)
    await plain.close()

    await host.goto('/actuaria/battle')
    await host.getByTestId('battle-mode-host').click()
    await host.getByTestId('battle-name-0').fill('Ada')
    await host.getByTestId('battle-exam-Financial Mathematics').click()
    await chooseThreeQuestions(host)
    await host.getByRole('radiogroup', { name: 'Abilities' }).getByRole('radio', { name: 'On' }).click()
    await host.getByTestId('battle-begin').click()
    const codeTiles = host.getByTestId('battle-room-code')
    await expect(codeTiles).toBeVisible()
    const code = ((await codeTiles.getAttribute('aria-label')) ?? '').replace('Room code ', '').replace(/ /g, '')

    // Joined from Quiz Battle: that player brings nothing, and sees what Ada spends.
    await guest.goto(`/battle?join=${code}`)
    await guest.getByTestId('battle-join-name').fill('Bo')
    await guest.getByTestId('battle-join').click()
    await expect(host.getByTestId('battle-lobby')).toContainText('Bo is in')
    await host.getByTestId('battle-start-online').click()
    await draftThrough(host, guest)
    await currentQuestion(host)
    await expect(guest.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
    await expect(guest.getByTestId('ability-reinsurance')).toHaveCount(0)
    await host.getByTestId('ability-reinsurance').click()
    await expect(guest.getByTestId('battle-opponent-abilities')).toHaveText('Ada used Reinsurance')
  })

  test('the lobby pairs a player at Monte Carlo Station with one at Quiz Battle', async ({ context }) => {
    test.setTimeout(90_000)
    const ada = await context.newPage()
    const bo = await context.newPage()

    await queueAsAda(ada)

    await bo.goto('/actuaria/battle')
    await expect(bo.getByTestId('battle-lobby-status')).toHaveText('1 pilot waiting')
    // One browser profile plays both, so Bo walks in asking for Ada's exam —
    // the setup the two pages share remembers it — and is matched on Ready.
    await bo.getByTestId('battle-mode-lobby').click()
    await expect(bo.getByTestId('battle-lobby-player')).toContainText('Ada')
    await bo.getByTestId('battle-lobby-ready').click()

    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-match-intro')).toBeVisible({ timeout: 15_000 })
    }
    // Through the draft, the same on both pages, to the first question.
    await draftThrough(ada, bo)
    for (const page of [ada, bo]) await currentQuestion(page)
  })
})
