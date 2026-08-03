import type { ComponentType } from 'react'
import { Info, Lightbulb } from 'lucide-react'
import {
  CalculatorGraphic,
  DistributionsGraphic,
  FormatGraphic,
  FormulaSheetGraphic,
  FoundationGraphic,
  GapsGraphic,
  JointRegionGraphic,
  PayoutGraphic,
  ScoreScaleGraphic,
} from '@/components/wiki/ExamGuideGraphics'

/**
 * The orientation guides that sit above the learning objectives on an exam
 * page: two dashboard-style cards, each opening a paged popup.
 *
 * This content used to be two collapsed `[!info]`/`[!tip]` callouts in the
 * vault markdown. It lives here instead because the presentation is now
 * app-side — one illustration and one idea per page — which a callout can't
 * express. The exam markdown keeps a bare `<div class="exam-guides"></div>`
 * marking where the cards go; `WikiArticle` swaps it for `ExamGuideCards`.
 *
 * Page bodies are markdown and may use `[[Wiki Links]]`, which the popup
 * rewrites into in-app routes.
 */

export interface ExamGuidePage {
  title: string
  Graphic: ComponentType<{ className?: string }>
  body: string
}

export interface ExamGuide {
  id: string
  /** Card title — keep it short enough to sit two-up on a phone. */
  title: string
  /** One supporting line on the card. */
  blurb: string
  Icon: ComponentType<{ className?: string }>
  pages: ExamGuidePage[]
}

const EXAM_P_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    blurb: 'Format, what you get, and how it is scored.',
    Icon: Info,
    pages: [
      {
        title: 'Format and pacing',
        Graphic: FormatGraphic,
        body: [
          '**3 hours, 30 multiple-choice questions**, computer-based at a Prometric centre.',
          '',
          'That is **6 minutes per question**, reading time included. A question you cannot start within 30 seconds should be flagged and skipped — come back to it once the rest of the paper is banked.',
        ].join('\n'),
      },
      {
        title: 'No formula sheet',
        Graphic: FormulaSheetGraphic,
        body: [
          '**No formula sheet is provided.** Every density, mean, and variance on this syllabus has to come from memory. This is the single biggest difference from a university course with an aid sheet.',
          '',
          'A **standard normal table *is* provided**, on-screen under an Exhibit button. You may not bring your own copy.',
        ].join('\n'),
      },
      {
        title: 'Approved calculators',
        Graphic: CalculatorGraphic,
        body: [
          'Only these models are allowed:',
          '',
          '- TI BA-35',
          '- TI BA II Plus / BA II Plus Professional',
          '- TI-30Xa',
          '- TI-30X II (IIS / IIB)',
          '- TI-30X MultiView (XS / XB)',
          '',
          'Anything else disqualifies the exam. **Bring two**, with fresh batteries.',
        ].join('\n'),
      },
      {
        title: 'Scoring',
        Graphic: ScoreScaleGraphic,
        body: [
          'Scaled **0–10, with 6 required to pass**. The pass mark is set before the sitting using Item Response Theory, so you are not competing against the other candidates in the room.',
          '',
          'There is **no penalty for a wrong answer** — never leave a question blank.',
        ].join('\n'),
      },
    ],
  },
  {
    id: 'how-to-study',
    title: 'How to Study for Exam P',
    blurb: 'A working order for the syllabus, and where marks go missing.',
    Icon: Lightbulb,
    pages: [
      {
        title: 'General Probability first',
        Graphic: FoundationGraphic,
        body: [
          'Work the topics in the order they build, not the order they are listed.',
          '',
          'General Probability is the smallest section, and everything else conditions on it. Get [[Conditional Probability]], [[The Law of Total Probability]], and [[Bayes Theorem]] genuinely automatic before you move on.',
        ].join('\n'),
      },
      {
        title: 'Then the distribution families',
        Graphic: DistributionsGraphic,
        body: [
          'Univariate distributions are the largest section, at **44–50%**. Learn the six discrete and six continuous families as a *set*: for each one, the story it models, its support, its PMF/PDF, its mean, and its variance.',
          '',
          'The hard skill is **identification, not integration** — see the selector tables on [[Discrete Univariate Distributions]] and [[Continuous Univariate Distributions]].',
        ].join('\n'),
      },
      {
        title: 'Insurance applications',
        Graphic: PayoutGraphic,
        body: [
          '[[Deductible]], [[Benefit Limit]], [[Coinsurance Percentage]], and [[Inflation]] are pure calculus applied to a [[Transformations of Random Variables|transformed]] loss variable.',
          '',
          'They are heavily tested and consistently under-practised, because they do not appear in a standard university probability course.',
        ].join('\n'),
      },
      {
        title: 'Multivariate last',
        Graphic: JointRegionGraphic,
        body: [
          'The [[Joint Probability Density Function|continuous joint density]] material is where most candidates lose marks, and the obstacle is almost always **setting up the double-integral limits over a non-rectangular region** — not the integration itself.',
          '',
          'Sketch the region every single time.',
        ].join('\n'),
      },
      {
        title: 'Coming from a university course?',
        Graphic: GapsGraphic,
        body: [
          'The gaps are usually the same four:',
          '',
          '1. Memorization without an aid sheet',
          '2. Insurance payment variables',
          '3. Non-rectangular double integrals',
          '4. Speed',
          '',
          'Working problems under a 6-minute clock is not optional preparation — it *is* the exam.',
        ].join('\n'),
      },
    ],
  },
]

/** Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`). */
export const EXAM_GUIDES: Record<string, ExamGuide[]> = {
  'p-1': EXAM_P_GUIDES,
}

export function guidesForExam(examId: string): ExamGuide[] {
  return EXAM_GUIDES[examId.toLowerCase()] ?? []
}
