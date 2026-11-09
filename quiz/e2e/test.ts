import { test as base, type Page } from '@playwright/test'

export * from '@playwright/test'

// The first-load screen (#boot in index.html, components/BootDone.tsx) covers
// the whole page, above everything, until the app reports its first page ready
// — a few hundred milliseconds after the load event here, and longer on a
// loaded CI runner. A page's controls are already drawn and found underneath
// it, so a press made by coordinates in that window lands on the screen and
// does nothing. Every navigation in the suite therefore waits for the screen
// to lift, the way a reader waits for it.
async function bootLifted(page: Page) {
  await page
    .waitForFunction(() => !document.getElementById('boot'), null, { timeout: 15_000 })
    // A page the app never boots on (a PDF, an error) has nothing to wait for;
    // a boot that never lifts fails the spec's own steps, with a clearer error.
    .catch(() => {})
}

function waitsForBoot(page: Page) {
  const goto = page.goto.bind(page)
  const reload = page.reload.bind(page)
  page.goto = async (...args) => {
    const response = await goto(...args)
    await bootLifted(page)
    return response
  }
  page.reload = async (...args) => {
    const response = await reload(...args)
    await bootLifted(page)
    return response
  }
}

/** `@playwright/test`'s `test`, with every page of the context waiting out the first-load screen. */
export const test = base.extend({
  context: async ({ context }, use) => {
    context.pages().forEach(waitsForBoot)
    context.on('page', waitsForBoot)
    await use(context)
  },
})
