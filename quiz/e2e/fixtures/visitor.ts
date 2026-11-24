import type { Page } from '@playwright/test'

/**
 * A visitor who has added exams: their list is the browser's
 * (`quiz.browserExams`, lib/examFocus.ts), so no account is needed. The first
 * exam with the nearest date is the exam in focus.
 */
export async function studying(
  page: Page,
  exams: { exam_id: string; target_date?: string | null; variant?: string }[] = [{ exam_id: 'P' }],
) {
  await page.addInitScript(rows => {
    if (localStorage.getItem('quiz.browserExams') !== null) return
    localStorage.setItem('quiz.browserExams', JSON.stringify(rows))
  }, exams.map(e => ({ exam_id: e.exam_id, status: 'in_progress', target_date: e.target_date ?? null, variant: e.variant ?? null })))
}
