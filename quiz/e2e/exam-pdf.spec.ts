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

test.describe('exam syllabus', () => {
  test('opens the published syllabus from the study guide in the same viewer', async ({ page }) => {
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 200, contentType: 'application/pdf', body: SAMPLE_PDF }),
    )
    await page.goto('/wiki/exam/Exam+FM-2+(SOA)')

    // Beside the exam's title, and an anchor to the publisher underneath.
    const syllabusLink = page.getByRole('link', { name: /syllabus/i }).first()
    await expect(syllabusLink).toBeVisible()
    await expect(syllabusLink).toHaveAttribute('href', /soa\.org.*\.pdf$/)
    await syllabusLink.click()

    // Reads in the app rather than a browser tab — the page behind it is our
    // reading of this very document.
    const panel = page.getByRole('complementary', { name: /Syllabus/ })
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Exam FM-2')).toBeVisible()
    await expect(panel.getByText('1 of 2')).toBeVisible()
    await expect.poll(() => canvasIsDrawn(page)).toBe(true)

    // Saving goes through our endpoint: `<a download>` is ignored cross-origin.
    await expect(panel.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
      'href',
      /\/api\/exam-pdf\?url=.*&download=1/,
    )

    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
  })
})

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

    // Zoom starts with the whole page fitted to the panel. There is no zoom
    // control in the chrome — pinch, ctrl+wheel and the `+`/`−` keys are the
    // zoom — so the page's box, sized for the zoom asked for, is what moves.
    const pageBox = panel.locator('canvas').locator('..')
    const width = async () => (await pageBox.boundingBox())?.width ?? 0
    const fit = await width()
    expect(fit).toBeGreaterThan(0)
    await page.keyboard.press('+')
    await expect.poll(width).toBeGreaterThan(fit)
    // And back down to the fit it opened at, which is also the floor.
    await page.keyboard.press('-')
    await expect.poll(width).toBeCloseTo(fit, 0)
    await page.keyboard.press('-')
    await expect.poll(width).toBeCloseTo(fit, 0)
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

test.describe('source document read from the concept popup', () => {
  test('stacks on the resource page that offered it and owns the keys', async ({ page }) => {
    await page.route('**/api/exam-pdf**', route =>
      route.fulfill({ status: 200, contentType: 'application/pdf', body: SAMPLE_PDF }),
    )
    // A resource page is most often read *inside* the popup, reached from an
    // exam page's Source Material shelf — which is where a candidate meets it.
    // The shelf's card carries the standard's title; its code is in the metadata.
    await page.goto('/wiki/exam/Exam+5+(CAS)')
    await page.getByRole('link', { name: /Property\/Casualty Unpaid Claim Estimates/ }).first().click()

    const concept = page.getByRole('complementary', { name: /^Concept:/ })
    await expect(concept).toBeVisible()

    // Full screen first: the document has to keep the popup's focus mode.
    await concept.getByRole('button', { name: 'Focus mode' }).click()
    await expect(concept).toHaveAttribute('data-focus', 'true')

    await concept.getByRole('link', { name: /^Read Property\/Casualty Unpaid Claim Estimates/ }).click()

    // The document opens as the next page of the popup's own stack
    // (docs/stacked-pages.md), not as a second panel over it: the same pane,
    // still full screen, now reading the PDF.
    const doc = page.getByRole('complementary', { name: /^Document:/ })
    await expect(doc).toBeVisible()
    await expect(doc).toHaveAttribute('data-focus', 'true')
    await expect(concept).toHaveCount(0)
    await expect(doc.getByText('1 of 2')).toBeVisible()
    await expect.poll(() => canvasIsDrawn(page)).toBe(true)

    // The keys belong to the document while it is up: the arrows turn its
    // pages, and Esc closes it, landing back on the page that offered it,
    // exactly as it was left.
    await page.keyboard.press('ArrowRight')
    await expect(doc.getByText('2 of 2')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(doc).toHaveCount(0)
    await expect(concept).toBeVisible()
    await expect(concept).toHaveAttribute('data-focus', 'true')
  })
})
