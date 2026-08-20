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
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 502, contentType: 'application/json', body: '{"error":"Source responded 404"}' }),
    )
    await page.getByRole('link', { name: /Examiner's Report/ }).click()

    const panel = viewer(page)
    // The endpoint's own explanation, not a parser's guess about the bytes.
    await expect(panel.getByText(/Source responded 404/)).toBeVisible()
    await expect(panel.getByRole('link', { name: /Open at casact\.org/ })).toHaveAttribute(
      'href',
      /^https:\/\/www\.casact\.org\//,
    )
  })

  test('says so when the endpoint is missing and the SPA answers instead', async ({ page }) => {
    // Exactly what a deployment without the function does: the host rewrites
    // the unknown path to index.html and answers 200 with the app's own page.
    // Before this was handled the panel reported "Invalid PDF structure", which
    // reads as a corrupt paper rather than a missing service.
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html><body>app</body></html>' }),
    )
    await page.getByRole('link', { name: /Examiner's Report/ }).click()

    const panel = viewer(page)
    await expect(panel.getByText(/PDF service isn't available on this deployment/)).toBeVisible()
    await expect(panel.getByRole('link', { name: /Open at casact\.org/ })).toBeVisible()
  })
})

// The same panel, reached from the other end of the app: a wiki resource page's
// source document. A study note is read beside the concept that cites it for
// the same reason a paper is read beside the builder — the way back matters.
test.describe('resource source viewer', () => {
  const RESOURCE =
    '/wiki/resource/Statement+of+Principles+Regarding+Property+and+Casualty+Insurance+Ratemaking+(CAS+-+1988)'

  test('reads the resource’s PDF in the panel', async ({ page }) => {
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 200, contentType: 'application/pdf', body: SAMPLE_PDF }),
    )
    await page.goto(RESOURCE)

    const link = page.getByRole('link', { name: /^Read Statement of Principles/ })
    await expect(link).toHaveAttribute('href', /casact\.org.*\.pdf$/)
    await link.click()

    const panel = page.getByRole('complementary', { name: /Statement of Principles/ })
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Casualty Actuarial Society · 1988')).toBeVisible()
    await expect(panel.getByText('1 of 2')).toBeVisible()
    await expect.poll(() => canvasIsDrawn(page)).toBe(true)

    // Closing leaves the page as it was, with the button ready to open again.
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
    await expect(link).toBeVisible()
  })

  test('leaves a source the proxy won’t serve as a plain out-link', async ({ page }) => {
    // ASOP 13's current text is only published as a page, not a file, so there
    // is nothing for the viewer to draw — the card must not promise otherwise.
    await page.goto(
      '/wiki/resource/ASOP+13+-+Trending+Procedures+in+Property+Casualty+Insurance+(ASB+-+2009)',
    )
    const link = page.getByRole('link', { name: /^Get a copy of ASOP No\. 13/ })
    await expect(link).toHaveAttribute('href', /^https:\/\/www\.actuarialstandardsboard\.org\//)
    await expect(link).toHaveAttribute('target', '_blank')
  })
})
