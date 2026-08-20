import { test, expect, type Page } from '@playwright/test'
import { buildSamplePdf } from './fixtures/samplePdf'

// The examiner's-report viewer: opening a past paper from the mock-exam shelf,
// reading it in the slide-up panel, paging, zooming, expanding, closing.
//
// `api/exam-pdf` is a Vercel function, so `vite preview` doesn't serve it; it's
// stubbed with a real two-page PDF instead (the proxy itself has unit coverage
// in src/lib/examPdfEndpoint.test.ts). What's under test here is that the panel
// actually *draws* the document — the thing no unit test can tell you, and the
// reason the app renders PDFs itself rather than leaving them to a browser
// plugin the test browser (and Chrome on Android) doesn't have.

const SAMPLE_PDF = buildSamplePdf()

/** The viewer panel, named so it can't collide with the sidebar's aside. */
const viewer = (page: Page) => page.getByRole('complementary', { name: /Examiner's Report/ })

/** Are any pixels painted on the page canvas? */
async function canvasIsDrawn(page: Page): Promise<boolean> {
  return page.locator('canvas').first().evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d')
    if (!context || canvas.width === 0) return false
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 3; i < data.length; i += 4) if (data[i] !== 0) return true
    return false
  })
}

test.describe("examiner's report viewer", () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 200, contentType: 'application/pdf', body: SAMPLE_PDF }),
    )
    await page.goto('/?topic=Exam%205&mode=mock-exam')
    // The report link tracks the *selection*, so a paper has to be picked first.
    await page.getByRole('radio', { name: /Spring 2019/ }).click()
  })

  test('reads the paper in the panel: renders, pages, zooms', async ({ page }) => {
    const reportLink = page.getByRole('link', { name: /Examiner's Report/ })
    // Still an anchor to the publisher underneath, so a modified click behaves
    // like a link even though a plain one opens the panel.
    await expect(reportLink).toHaveAttribute('href', /casact\.org.*\.pdf$/)
    await reportLink.click()

    const panel = viewer(page)
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Exam 5 · Spring 2019')).toBeVisible()

    // The document loaded and the first page is on screen.
    await expect(panel.getByText('1 of 2')).toBeVisible()
    await expect.poll(() => canvasIsDrawn(page)).toBe(true)

    // Paging: Previous is spent on page 1, Next is spent on the last page.
    await expect(panel.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    await panel.getByRole('button', { name: 'Next page' }).click()
    await expect(panel.getByText('2 of 2')).toBeVisible()
    await expect(panel.getByRole('button', { name: 'Next page' })).toBeDisabled()
    await expect.poll(() => canvasIsDrawn(page)).toBe(true)

    // Zoom starts fitted to the panel and steps up from there.
    await expect(panel.getByText('Fit')).toBeVisible()
    await panel.getByRole('button', { name: 'Zoom in' }).click()
    await expect(panel.getByText('150%')).toBeVisible()
  })

  test('expands, saves, and closes', async ({ page }) => {
    await page.getByRole('link', { name: /Examiner's Report/ }).click()
    const panel = viewer(page)
    await expect(panel).toBeVisible()

    // Download offers the same document as an attachment, through our endpoint
    // — a cross-origin `download` on the publisher's URL would just navigate.
    await expect(panel.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'href',
      /\/api\/exam-pdf\?url=.*&download=1/,
    )

    // Expand fills the viewport; Esc steps back out of it rather than closing.
    await panel.getByRole('button', { name: 'Full screen' }).click()
    await expect(panel).toHaveAttribute('data-focus', 'true')
    await page.keyboard.press('Escape')
    await expect(panel).toHaveAttribute('data-focus', 'false')

    // A second Esc closes the panel, leaving the builder as it was.
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
    await expect(page.getByRole('link', { name: /Examiner's Report/ })).toBeVisible()
  })

  test('offers the publisher’s copy when the document can’t be loaded', async ({ page }) => {
    await page.route('**/api/exam-pdf**', route => route.fulfill({ status: 502, body: 'no' }))
    await page.getByRole('link', { name: /Examiner's Report/ }).click()

    const panel = viewer(page)
    await expect(panel.getByText(/couldn't be loaded/)).toBeVisible()
    await expect(panel.getByRole('link', { name: /Open at casact\.org/ })).toHaveAttribute(
      'href',
      /^https:\/\/www\.casact\.org\//,
    )
  })
})
