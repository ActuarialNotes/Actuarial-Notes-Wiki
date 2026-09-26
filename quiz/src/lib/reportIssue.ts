// "Report an issue" as data: what a reader can say is wrong, the three steps
// they say it in, and the name the report is credited to.
//
// The modal (components/ReportIssueModal.tsx) is three pages — what kind of
// problem, what's wrong in their own words, then how they're credited and their
// consent to publish — because a report is only as good as the one thing a
// reader writes, and a form showing five fields at once buried that under
// questions nobody needed answering.
//
// The category values are a contract with two places that aren't TypeScript:
// the CHECK constraint on `content_reports.severity` (supabase/migrations) and
// the triage hints `scripts/sync_reports.py` writes into the log. A value one
// of them doesn't know is a report that fails to insert, or lands in the log
// with no hint. `reportIssue.test.ts` reads both and fails if they drift.

/** The value stored in `content_reports.severity` — the reader's vocabulary. */
export type ReportCategory =
  | 'wrong answer'
  | 'solution error'
  | 'mistranscribed'
  | 'incorrect'
  | 'missing'
  | 'outdated'
  | 'typo'
  | 'unclear'
  | 'display'
  | 'broken link'
  | 'other'

export interface ReportCategoryOption {
  value: ReportCategory
  label: string
  /** One line saying what the category covers, so two close ones can be told apart. */
  hint: string
  /** The description step's placeholder: the detail that makes this kind of report checkable. */
  prompt: string
  /** Where it is offered. A question has a keyed answer and a published original; a page has neither. */
  on: 'question' | 'page' | 'any'
}

/** In the order they are offered. `other` stays last. */
export const REPORT_CATEGORIES: readonly ReportCategoryOption[] = [
  {
    value: 'wrong answer',
    label: 'Wrong answer',
    hint: "The marked answer isn't right",
    prompt: 'Which answer do you get, and how did you get there?',
    on: 'question',
  },
  {
    value: 'solution error',
    label: 'Mistake in the solution',
    hint: "A step or number in the working doesn't follow",
    prompt: 'Which step goes wrong, and what should it say?',
    on: 'question',
  },
  {
    value: 'mistranscribed',
    label: "Doesn't match the original",
    hint: 'Differs from the published exam or sample',
    prompt: 'What does the published version say instead?',
    on: 'question',
  },
  {
    value: 'incorrect',
    label: 'Incorrect fact or formula',
    hint: 'A definition, formula or number is wrong',
    prompt: "What's wrong, and what should it be? A source helps.",
    on: 'page',
  },
  {
    value: 'missing',
    label: "Something's missing",
    hint: 'A key idea, step or example is left out',
    prompt: 'What did you expect to find here?',
    on: 'page',
  },
  {
    value: 'outdated',
    label: 'Out of date',
    hint: 'No longer matches the current syllabus or source',
    prompt: "What's changed, and where did you see it?",
    on: 'any',
  },
  {
    value: 'typo',
    label: 'Typo',
    hint: 'Spelling, grammar or formatting',
    prompt: 'Which word or line, and what should it say?',
    on: 'any',
  },
  {
    value: 'unclear',
    label: 'Hard to follow',
    hint: 'Confusing or ambiguous wording',
    prompt: 'Which part lost you, and why?',
    on: 'any',
  },
  {
    value: 'display',
    label: 'Display problem',
    hint: "Math, a table or an image doesn't show properly",
    prompt: 'What looks broken, and on which device or browser?',
    on: 'any',
  },
  {
    value: 'broken link',
    label: 'Broken link',
    hint: 'A link goes nowhere, or to the wrong place',
    prompt: 'Which link, and where does it take you?',
    on: 'any',
  },
  {
    value: 'other',
    label: 'Something else',
    hint: "Anything that isn't listed",
    prompt: 'What looks wrong?',
    on: 'any',
  },
]

/** Is this vault path a question-bank file (as opposed to a concept, resource or exam page)? */
export function isQuestionPath(contentPath: string): boolean {
  return contentPath.replace(/^\.?\//, '').startsWith('questions/')
}

/** The categories offered for one piece of content. */
export function reportCategoriesFor(contentPath: string): ReportCategoryOption[] {
  const kind = isQuestionPath(contentPath) ? 'question' : 'page'
  return REPORT_CATEGORIES.filter((c) => c.on === 'any' || c.on === kind)
}

export function reportCategory(value: ReportCategory | null | undefined): ReportCategoryOption | undefined {
  return value ? REPORT_CATEGORIES.find((c) => c.value === value) : undefined
}

/** Mirrors the CHECK constraint on `content_reports.body`. */
export const REPORT_MAX_LENGTH = 4000

/** Mirrors the CHECK constraint on `content_reports.reporter_name`. */
const REPORTER_NAME_MAX_LENGTH = 60

/**
 * The name a report is credited to when the reader doesn't report anonymously:
 * the display name they set in Settings, else the name their sign-in provider
 * gave. Never anything derived from the email address — the log is a public
 * repository, and an email's local part is often the most identifying thing an
 * account carries. Null when there is no name to credit.
 */
export function reportCreditName(metadata: Record<string, unknown> | null | undefined): string | null {
  for (const key of ['display_name', 'full_name'] as const) {
    const value = metadata?.[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim().slice(0, REPORTER_NAME_MAX_LENGTH)
    }
  }
  return null
}

/** The three pages, in order. */
export const REPORT_STEPS = ['category', 'details', 'send'] as const
export type ReportStep = (typeof REPORT_STEPS)[number]

export interface ReportDraft {
  category: ReportCategory | null
  body: string
  anonymous: boolean
  /** The reader has agreed to the report being published. */
  consent: boolean
}

/**
 * Whether a step is complete enough to leave forwards — for the last step,
 * whether the report can be sent. Each step also requires the ones before it,
 * so no path through the modal reaches Send with a hole in the report.
 */
export function canContinue(step: ReportStep, draft: ReportDraft): boolean {
  const hasCategory = draft.category !== null
  if (step === 'category') return hasCategory
  const hasBody = draft.body.trim().length > 0
  if (step === 'details') return hasCategory && hasBody
  return hasCategory && hasBody && draft.consent
}
