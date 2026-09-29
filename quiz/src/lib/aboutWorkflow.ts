import { factCheckBadge, UNVERIFIED, type FactCheckBadge, type Verification } from '@/lib/verification'

/**
 * Settings → **About**: how Actuarial Notes is written and how it is checked,
 * drawn as one flow — official material in, a published page out, and a fact
 * check that keeps going round. Rendered by `components/AboutCard.tsx`.
 *
 * Data rather than JSX so its claims can be held to the code that makes them
 * true (`aboutWorkflow.test.ts`): the verdicts a reader is told about are the
 * ones `factCheckBadge` actually prints, not a second copy of its labels. Every
 * step describes something the project does today — `docs/verification.md`,
 * `docs/validation-agent.md` and `docs/pdf-question-pipeline.md` are the long
 * form. Change the process there first, then here.
 */

/** Who does a step. `automated` is the scripts — no model reads or writes there. */
export type AboutActor = 'ai' | 'community' | 'automated'

export const ABOUT_ACTOR_LABEL: Record<AboutActor, string> = {
  ai: 'AI',
  community: 'Community',
  automated: 'Automated',
}

/** A thing the flow passes through — drawn as a box. */
export interface AboutNode {
  title: string
  detail: string
}

/** Something done to it — drawn as a numbered stop on the rail. */
export interface AboutStep extends AboutNode {
  actors: AboutActor[]
}

export interface AboutPhase {
  id: 'write' | 'check'
  title: string
  steps: AboutStep[]
  /** What the phase ends in. */
  outcome: AboutNode
}

/** Where every page starts. */
export const ABOUT_SOURCE: AboutNode = {
  title: 'Official material',
  detail: 'The syllabi, past exams and readings the CAS and SOA publish.',
}

export const ABOUT_PHASES: AboutPhase[] = [
  {
    id: 'write',
    title: 'Writing the notes',
    steps: [
      {
        title: 'Extract',
        detail: 'Questions, answer keys and official solutions are lifted straight from the published PDFs, never retyped by an AI.',
        actors: ['automated'],
      },
      {
        title: 'Draft',
        detail: 'AI helps write the concept pages, and the explanations an official solution leaves brief.',
        actors: ['ai'],
      },
      {
        title: 'Review',
        detail: 'A person reviews every page before it is published, and anyone can suggest an edit on GitHub.',
        actors: ['community'],
      },
    ],
    outcome: {
      title: 'Published',
      detail: 'The wiki, quizzes and flashcards you study from.',
    },
  },
  {
    id: 'check',
    title: 'Checking the notes',
    steps: [
      {
        title: 'Report',
        detail: 'Spot a mistake? Report it from a page’s Fact Check. It joins that page’s public log, and the next check reads it word for word.',
        actors: ['community'],
      },
      {
        title: 'Check',
        detail: 'An AI agent works through the pages in batches: it works each answer out before reading the stated one, then compares every number with the official source.',
        actors: ['ai'],
      },
      {
        title: 'Approve',
        detail: 'Its fixes arrive as a pull request a person reviews. The AI can raise a problem on its own, but only a cited source can mark a page checked.',
        actors: ['community'],
      },
    ],
    outcome: {
      title: 'Fact Check',
      detail: 'Every page and question shows where it stands.',
    },
  },
]

function badgeFor(overrides: Partial<Verification>): FactCheckBadge {
  return factCheckBadge({ ...UNVERIFIED, ...overrides })
}

const CHECKED: Partial<Verification> = { status: 'verified', confidence: 'high', sources: ['source'] }

/**
 * The verdicts the Fact Check step ends in — one per tone, each produced by
 * `factCheckBadge` itself so the About page can't name a state the badge
 * doesn't print. Undated: a date belongs to a particular page.
 */
export const ABOUT_VERDICTS: FactCheckBadge[] = [
  badgeFor({}),
  badgeFor(CHECKED),
  badgeFor({ status: 'stale' }),
  badgeFor({ ...CHECKED, openFindings: 1, openCritical: 1 }),
]

const RECHECK = badgeFor({ status: 'stale' })

/** The step that closes the loop: a fact check is bound to the page's bytes (docs/verification.md, P4). */
export const ABOUT_LOOP: AboutNode = {
  title: 'Round again',
  detail: `Any edit, a fix included, turns a page back to “${RECHECK.label}” until it is checked again.`,
}
