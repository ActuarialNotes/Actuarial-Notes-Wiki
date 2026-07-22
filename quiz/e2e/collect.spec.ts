import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { parseAllComprehensionChecks } from '../src/lib/comprehensionCheckParser'

// Load the comprehension-check corpus the same way the app does, but from disk
// rather than the build-time `virtual:comprehension-checks` module: Playwright's
// Node ESM loader can't resolve `virtual:` ids, so importing src/data/
// comprehensionChecks (which does) would blow up the whole run at collection
// time. This mirrors collectComprehensionChecks() in vite.config.ts.
function loadComprehensionChecks() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
  const root = path.join(repoRoot, 'comprehension-checks')
  const raw: string[] = []
  for (const examDir of readdirSync(root)) {
    const examPath = path.join(root, examDir)
    let files: string[]
    try {
      files = readdirSync(examPath)
    } catch {
      continue // skip non-directory entries
    }
    for (const name of files) {
      if (!name.endsWith('.md')) continue
      raw.push(readFileSync(path.join(examPath, name), 'utf-8'))
    }
  }
  return parseAllComprehensionChecks(raw)
}

const COMPREHENSION_CHECKS = loadComprehensionChecks()

// Collecting a flashcard is the gate that unlocks a concept's mastery (see
// docs/flashcard-collection.md). This drives the collect modal from the
// pre-quiz gate and passes its comprehension check.
//
// Visiting /wiki first arms the bundled wiki-content lookup (WikiLayout calls
// setWikiContentLookup at import time), so the modal can build its check from
// the bundled concept page without any network request.
test.describe('flashcard collection', () => {
  test('collects a concept by passing its comprehension check', async ({ page }) => {
    await page.goto('/wiki')
    await expect(page.getByRole('heading', { name: 'Study Guides' })).toBeVisible()

    await page.goto('/quiz?ids=p-004')

    // The pre-quiz collect gate lists this quiz's New concepts with Collect
    // buttons. Open the first one.
    const collectButton = page.getByRole('button', { name: 'Collect' }).first()
    await expect(collectButton).toBeVisible()
    await collectButton.click()

    // The collect modal opens with a multiple-choice comprehension check. Scope
    // to its "Collect <name>" aria-label so it isn't confused with the always-
    // mounted onboarding-tour dialog.
    const dialog = page.getByRole('dialog', { name: /^Collect / })
    await expect(dialog).toBeVisible()

    // Resolve the correct answer from the same source the app uses: an authored
    // comprehension check when one exists, otherwise the fallback question whose
    // answer is the concept's own name.
    const label = (await dialog.getAttribute('aria-label')) ?? ''
    const conceptName = label.replace(/^Collect /, '').trim()
    const check = COMPREHENSION_CHECKS[conceptName]
    const answer = check ? check.options[check.correctIndex] : conceptName

    await dialog.getByRole('button', { name: answer, exact: true }).click()

    await expect(page.getByText('Collected!')).toBeVisible()
  })
})
