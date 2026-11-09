import { test, expect } from './test'

// The Store (docs/store.md): real products, each bought on its seller's own
// page. Nothing here is bought in the app, so the smoke checks the shelf
// renders, narrows by exam and aisle, and that a product's sheet sends the
// reader to the seller in a new tab.
test.describe('store', () => {
  test('shelves the aisles and narrows them by exam', async ({ page }) => {
    await page.goto('/store')

    await expect(page.getByRole('heading', { name: 'Store', exact: true })).toBeVisible()
    for (const aisle of ['Registration', 'Study materials', 'Calculators', 'Textbooks']) {
      await expect(page.getByRole('heading', { name: aisle, exact: true })).toBeVisible()
    }

    // The exam strip is a radiogroup: choosing FM opens FM's kit, its steps
    // with registration in the spotlight.
    await page.getByRole('radio', { name: 'Exam FM' }).click()
    await expect(page).toHaveURL(/exam=FM/)
    const kit = page.getByTestId('store-kit')
    await expect(kit.getByTestId('store-kit-next')).toContainText('Register')
    await expect(page.getByTestId('store-item-register-FM')).toBeVisible()
    await expect(page.getByTestId('store-item-register-P')).toHaveCount(0)
    // FM is an SOA exam: the calculators on the SOA's list are its calculator step.
    await kit.getByRole('button', { name: /^Calculator\s*\d+ allowed/ }).click()
    await expect(page.getByTestId('store-item-ba-ii-plus')).toBeVisible()

    // The aisles ride above the kit: one leaves it for that aisle's shelf, and
    // the first pill comes back to the kit.
    await page.getByRole('navigation', { name: 'Aisles' }).getByRole('button', { name: /^Calculators/ }).click()
    await expect(page).toHaveURL(/aisle=calculators/)
    await expect(page.getByTestId('store-kit')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Registration', exact: true })).toHaveCount(0)
    await page.getByRole('button', { name: 'Your kit' }).click()
    await expect(page.getByTestId('store-kit')).toBeVisible()

    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('switches between the SOA and CAS ladders, and searches the shelf', async ({ page }) => {
    await page.goto('/store')
    await page.getByRole('radio', { name: 'SOA', exact: true }).click()
    await expect(page.getByRole('radio', { name: 'Exam FAM' })).toBeVisible()
    await expect(page.getByRole('radio', { name: 'Exam 5' })).toHaveCount(0)
    await page.getByRole('radio', { name: 'Exam FAM' }).click()
    await expect(page.getByTestId('store-item-register-FAM')).toBeVisible()

    // The SOA's exams past FM are off the CAS ladder, so the choice goes.
    await page.getByRole('radio', { name: 'CAS', exact: true }).click()
    await expect(page).not.toHaveURL(/exam=FAM/)
    await expect(page.getByRole('radio', { name: 'Exam FAM' })).toHaveCount(0)

    // The search bar narrows every aisle at once, and rides the URL.
    await page.getByRole('textbox', { name: 'Search the Store' }).fill('Exam 9')
    await expect(page).toHaveURL(/q=Exam/)
    await expect(page.getByTestId('store-item-register-CAS-9')).toBeVisible()
    await expect(page.getByTestId('store-item-register-CAS-5')).toHaveCount(0)
  })

  test('shows Exam 6 once, with its regions under the strip', async ({ page }) => {
    await page.goto('/store')
    await page.getByRole('radio', { name: 'CAS', exact: true }).click()
    await expect(page.getByRole('radio', { name: 'Exam 6', exact: true })).toHaveCount(1)
    await page.getByRole('radio', { name: 'Exam 6', exact: true }).click()
    const regions = page.getByTestId('exam-variants')
    await expect(regions).toBeVisible()
    await regions.getByRole('radio', { name: 'Canada' }).click()
    await expect(page).toHaveURL(/region=6C/)
    await expect(page.getByTestId('store-item-register-CAS-6')).toBeVisible()
  })

  test('opens a product sheet whose button goes to the seller', async ({ page }) => {
    await page.goto('/store?aisle=calculators')

    await page.getByTestId('store-item-ti-30xs-multiview').click()
    const sheet = page.getByTestId('store-sheet')
    await expect(sheet).toBeVisible()
    await expect(sheet.getByRole('heading', { name: 'TI-30XS MultiView' })).toBeVisible()
    await expect(sheet.getByText('On the SOA’s list')).toBeVisible()

    const buy = sheet.getByRole('link', { name: /^Buy at / })
    await expect(buy).toHaveAttribute('target', '_blank')
    await expect(buy).toHaveAttribute('rel', /noopener/)
    await expect(buy).toHaveAttribute('href', /^https:\/\//)

    // Every listing carries the legal notice, naming its seller.
    await expect(sheet.getByTestId('store-disclaimer')).toContainText('not affiliated with')

    await page.keyboard.press('Escape')
    await expect(sheet).toHaveCount(0)
  })

  test('filters to what is free, and back', async ({ page }) => {
    await page.goto('/store?exam=FM&aisle=study')
    await page.getByRole('button', { name: 'Free', exact: true }).click()
    await expect(page).toHaveURL(/free=1/)
    // TIA's FM course is free; ACTEX's manual is not.
    await expect(page.getByTestId('store-item-tia-fm-video')).toBeVisible()
    await expect(page.getByTestId('store-item-actex-fm-manual')).toHaveCount(0)

    await page.getByRole('button', { name: 'Clear' }).click()
    await expect(page.getByTestId('store-item-actex-fm-manual')).toBeVisible()
  })

  test('ticks a kit step off and brings the next one forward', async ({ page }) => {
    await page.goto('/store?exam=P')
    const next = page.getByTestId('store-kit-next')
    await expect(next).toContainText('Register')
    await next.getByRole('button', { name: 'I’ve registered' }).click()
    await expect(next).toContainText('Calculator')
    await expect(page.getByTestId('store-kit-progress')).toHaveAttribute('aria-label', /^1 of 5 steps done/)

    // Undo puts it back, and so does its tick, which stays on the step.
    await page.getByTestId('store-kit-undo').getByRole('button', { name: 'Undo' }).click()
    await expect(page.getByTestId('store-kit-next')).toContainText('Register')
    await page.getByRole('button', { name: 'Mark Register done' }).click()
    await expect(page.getByTestId('store-kit-next')).toContainText('Calculator')
    await page.getByRole('button', { name: /^Register: done/ }).click()
    await expect(page.getByTestId('store-kit-next')).toContainText('Register')
    await page.getByRole('button', { name: 'Mark Register done' }).click()

    // The calculator step asks which one; the pick names the step.
    await page.getByRole('radio', { name: 'I have BA II Plus', exact: true }).click()
    await expect(page.getByTestId('store-kit-step-calculator')).toContainText('You have the BA II Plus')
    await expect(page.getByTestId('store-kit-progress')).toHaveAttribute('aria-label', /^2 of 5 steps done/)

    // The picks outlive the visit.
    await page.reload()
    await expect(page.getByTestId('store-kit-next')).toContainText('Learn the syllabus')
    await expect(page.getByTestId('store-kit-step-calculator')).toContainText('You have the BA II Plus')
  })

  test('compares a step’s study materials, question by question', async ({ page }) => {
    await page.goto('/store?exam=MAS-I')
    await page.getByRole('button', { name: /^Learn the syllabus/ }).click()
    await page.getByTestId('store-compare').click()
    const sheet = page.getByTestId('store-compare-sheet')
    await expect(sheet).toBeVisible()
    await expect(sheet).toContainText('Exam MAS-I')
    await expect(sheet.getByRole('region', { name: 'Price', exact: true })).toBeVisible()
    await expect(sheet.getByRole('button', { name: /^ASM Study Manual Program for CAS Exam MAS-I/ })).toBeVisible()

    // Every answer is headed by its product's name, not a number to look up;
    // taking a product out of the comparison takes its lines out too.
    const price = sheet.getByRole('region', { name: 'Price', exact: true })
    await expect(price.getByText('ASM Study Manual Program for CAS Exam MAS-I')).toBeVisible()
    await sheet.getByRole('checkbox', { name: 'Compare ASM Study Manual Program for CAS Exam MAS-I' }).click()
    await expect(price.getByText('ASM Study Manual Program for CAS Exam MAS-I')).toHaveCount(0)

    // Another exam from the sheet's own strip.
    await sheet.getByRole('radio', { name: 'Exam FM' }).click()
    await expect(sheet).toContainText('Exam FM')

    await page.keyboard.press('Escape')
    await expect(sheet).toHaveCount(0)
  })

  test('the comparison reads on a phone without scrolling sideways', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/store?exam=MAS-I')
    await page.getByRole('button', { name: /^Learn the syllabus/ }).click()
    await page.getByTestId('store-compare').click()
    const body = page.getByTestId('store-compare-body')
    await expect(body).toBeVisible()
    const overflow = await body.evaluate(el => el.scrollWidth - el.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    const box = await page.getByTestId('store-compare-sheet').boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(390 + 1)
  })
})

// The gem shop is a corner of the Store. A full purchase needs auth + a gem
// balance (Supabase), so this smoke verifies the catalog surface renders and
// is navigable — the shell every cosmetic purchase starts from.
test.describe('gem shop', () => {
  test('renders the cosmetics catalog and switches tabs', async ({ page }) => {
    await page.goto('/store/gems')

    await expect(page.getByRole('heading', { name: 'Gem Shop', exact: true })).toBeVisible()

    // Default tab shows the characters catalog.
    await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible()

    // Tabs are interactive: switch to Skins.
    await page.getByRole('button', { name: 'Skins', exact: true }).click()
    await expect(page.getByText(/skin/i).first()).toBeVisible()

    await expect(page.getByText('Something went wrong')).toHaveCount(0)
  })

  test('the old store links land in the gem shop', async ({ page }) => {
    await page.goto('/store?tab=skins')
    await expect(page).toHaveURL(/\/store\/gems\?tab=skins/)
    await expect(page.getByRole('heading', { name: 'Gem Shop', exact: true })).toBeVisible()
  })
})
