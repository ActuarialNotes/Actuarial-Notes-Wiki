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
  await expect(card).toBeVisible({ timeout: 10_000 })
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

/** Picks the `nth` topic tile on the page and locks it in; returns its name. */
async function pickTopicAndLock(page: Page, nth: number): Promise<string> {
  await expect(page.getByTestId('battle-topic-picker')).toBeVisible({ timeout: 15_000 })
  const tile = page.getByTestId('battle-topic').nth(nth)
  const name = (await tile.getAttribute('data-topic')) ?? ''
  await tile.click()
  await expect(tile).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByTestId('battle-topic-count')).toHaveText('1 of 3 picked')
  await page.getByTestId('battle-topics-lock').click()
  // Locked in: the button goes — to a wait for the other player, or (the
  // second in) straight to the draw.
  await expect(page.getByTestId('battle-topics-lock')).toBeHidden()
  return name
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

    // Each picks a topic. Bo sees that Ada is in — and not what she picked.
    const adaTopic = await pickTopicAndLock(host, 0)
    await expect(guest.getByTestId('battle-player-0')).toContainText('Locked in')
    const boTopic = await pickTopicAndLock(guest, 1)

    // Both picks go up on both screens, and the questions are drawn from them.
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-topic-draw')).toBeVisible()
      await expect(page.getByTestId('battle-picks-0')).toContainText(adaTopic)
      await expect(page.getByTestId('battle-picks-1')).toContainText(boTopic)
      await expect(page.locator('[data-testid="battle-drawn"][data-drawn]')).toHaveCount(3)
    }
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-countdown-topic')).toBeVisible({ timeout: 15_000 })
    }

    for (let round = 0; round < 3; round++) {
      const { right, wrong } = await currentQuestion(host)
      await expect(guest.getByTestId('battle-question')).toBeVisible({ timeout: 10_000 })
      await expect(host.getByTestId('battle-question')).toContainText(round === 2 ? 'Final ×2' : `Round ${round + 1} of 3`)

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

    // Bo asks for a rematch; Ada starts it, and both pick their topics again.
    await expect(guest.getByTestId('battle-rematch')).toHaveText('Rematch Ada')
    await guest.getByTestId('battle-rematch').click()
    await expect(host.getByText('Bo wants a rematch!')).toBeVisible()
    await host.getByTestId('battle-rematch').click()
    for (const page of [host, guest]) {
      await expect(page.getByTestId('battle-topic-picker')).toBeVisible()
      await expect(page.getByTestId('battle-topic-count')).toHaveText('Pick up to 3 topics')
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
    // A topic each — Bo locks in none, and plays on Ada's and the whole exam.
    await pickTopicAndLock(ada, 2)
    await expect(bo.getByTestId('battle-topic-picker')).toBeVisible()
    await bo.getByTestId('battle-topics-lock').click()
    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-topic-draw')).toBeVisible()
      await expect(page.getByTestId('battle-picks-1')).toContainText('No topics')
    }
    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-countdown')).toBeVisible({ timeout: 15_000 })
    }

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
    // The topic pick is the same under both skins.
    await pickTopicAndLock(host, 0)
    await pickTopicAndLock(guest, 1)

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
    await pickTopicAndLock(host, 0)
    await pickTopicAndLock(guest, 1)

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
    await pickTopicAndLock(host, 0)
    await pickTopicAndLock(guest, 1)
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
    // Through the topic pick, the same on both pages, to the count-in.
    await pickTopicAndLock(ada, 0)
    await pickTopicAndLock(bo, 1)
    for (const page of [ada, bo]) {
      await expect(page.getByTestId('battle-countdown')).toBeVisible({ timeout: 15_000 })
    }
  })
})
