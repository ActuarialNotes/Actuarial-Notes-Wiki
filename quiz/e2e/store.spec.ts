import { test, expect } from '@playwright/test'

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

    // The exam strip is a radiogroup: choosing FM narrows every aisle to it.
    await page.getByRole('radio', { name: 'Exam FM' }).click()
    await expect(page).toHaveURL(/exam=FM/)
    await expect(page.getByTestId('store-item-register-FM')).toBeVisible()
    await expect(page.getByTestId('store-item-register-P')).toHaveCount(0)
    // FM is an SOA exam: the calculators on the SOA's list stay on the shelf.
    await expect(page.getByTestId('store-item-ba-ii-plus')).toBeVisible()

    // An aisle pill shows that aisle alone.
    await page.getByRole('button', { name: /^Calculators/ }).click()
    await expect(page).toHaveURL(/aisle=calculators/)
    await expect(page.getByRole('heading', { name: 'Registration', exact: true })).toHaveCount(0)

    await expect(page.getByText('Something went wrong')).toHaveCount(0)
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

  test('compares an exam’s study materials side by side', async ({ page }) => {
    await page.goto('/store?exam=MAS-I')
    await page.getByTestId('store-compare').click()
    const table = page.getByTestId('store-compare-sheet')
    await expect(table).toBeVisible()
    await expect(table).toContainText('Exam MAS-I')
    await expect(table.getByRole('rowheader', { name: 'Price', exact: true })).toBeVisible()
    await expect(table.getByRole('columnheader').filter({ hasText: 'ASM Study Manual Program for CAS Exam MAS-I' })).toBeVisible()

    // Another exam from the table's own strip.
    await table.getByRole('radio', { name: 'Exam FM' }).click()
    await expect(table).toContainText('Exam FM')

    await page.keyboard.press('Escape')
    await expect(table).toHaveCount(0)
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
