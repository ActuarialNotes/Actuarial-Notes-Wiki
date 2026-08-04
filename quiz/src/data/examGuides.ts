import type { ComponentType } from 'react'
import { Info, Lightbulb } from 'lucide-react'
import {
  AccumulationGraphic,
  AmortizationGraphic,
  AnnuityGraphic,
  CalculatorGraphic,
  DistributionsGraphic,
  FormatFmGraphic,
  FormatGraphic,
  FormulaSheetGraphic,
  FoundationGraphic,
  GapsGraphic,
  ImmunizationGraphic,
  JointRegionGraphic,
  NoAidSheetGraphic,
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
  /**
   * Card title — keep it short enough to sit two-up on a phone. It is the only
   * text on the card; the cover graphic carries the rest.
   */
  title: string
  Icon: ComponentType<{ className?: string }>
  pages: ExamGuidePage[]
}

const EXAM_P_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
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

const EXAM_FM_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    Icon: Info,
    pages: [
      {
        title: 'Format and pacing',
        Graphic: FormatFmGraphic,
        body: [
          '**2.5 hours, 35 multiple-choice questions**, computer-based at a Prometric centre.',
          '',
          'That is about **4 minutes 20 seconds per question** — noticeably tighter than Exam P. Most of that budget goes into setting the problem up, so a question you cannot write an [[Equation of Value|equation of value]] for within a minute should be flagged and skipped.',
        ].join('\n'),
      },
      {
        title: 'No formula sheet, no tables',
        Graphic: NoAidSheetGraphic,
        body: [
          '**Nothing is provided.** No formula sheet, and unlike Exam P there is no table under an Exhibit button either — every annuity, bond, and duration formula has to come from memory.',
          '',
          'The practical consequence: learn the handful of relationships you can *derive* the rest from, rather than memorizing every variation as a separate formula.',
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
          'Anything else disqualifies the exam. **Bring two**, with fresh batteries — and make one of them a BA II Plus, which is the only model on the list with the TVM and cash-flow worksheets this exam is built around.',
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
    title: 'How to Study for Exam FM',
    Icon: Lightbulb,
    pages: [
      {
        title: 'Everything starts on a time line',
        Graphic: AccumulationGraphic,
        body: [
          'Time Value of Money is the smallest section at **5–15%**, and every other section is an application of it.',
          '',
          'Before moving on, be able to draw the [[Cash Flow|cash flows]] on a line and write the [[Equation of Value]] without thinking, and convert freely between an [[Effective Rate|effective rate]], a [[Nominal Interest Rate|nominal rate]] convertible *m*-thly, a [[Discount Rate|discount rate]], and the [[Force of Interest]].',
        ].join('\n'),
      },
      {
        title: 'Annuities are the engine',
        Graphic: AnnuityGraphic,
        body: [
          'Annuities and non-contingent cash flows are **20–30%** on their own, and the machinery behind the two sections that follow.',
          '',
          'Learn [[Annuity Immediate]] and [[Annuity Due]] as one idea shifted by a period, then build outward: [[Perpetuity|perpetuities]], [[Payable m-thly|*m*-thly]] payments, [[Arithmetic Increasing Annuity|arithmetic]] and [[Geometric Increasing Annuity|geometric]] progressions. Derive the variants from the level case — do not memorize them as separate formulas.',
        ].join('\n'),
      },
      {
        title: 'Loans and bonds are annuities in disguise',
        Graphic: AmortizationGraphic,
        body: [
          'Together these are **30–50%** of the exam, and both are annuity valuation with new vocabulary.',
          '',
          'Be able to find an [[Outstanding Balance]] both prospectively and retrospectively, split a payment into [[Interest|interest]] and principal via [[Amortization]], and price a bond at a premium or a discount. For a [[Callable Bond]], price to the call date that gives the *worst* yield.',
        ].join('\n'),
      },
      {
        title: 'Duration and immunization last',
        Graphic: ImmunizationGraphic,
        body: [
          'The asset-liability section is **20–30%** and is where prepared candidates most often run out of study time.',
          '',
          'Know [[Macaulay Duration]] and [[Modified Duration]] as a pair, the first-order price approximation each one gives, and [[Convexity]]. Price cash flows off a [[Yield Curve|yield curve]] built from [[Spot Rate|spot]] and [[Forward Rate|forward]] rates, and be able to state the conditions for [[Redington Immunization]] versus [[Full Immunization]] — they are examined as conditions to check, not as calculations.',
        ].join('\n'),
      },
      {
        title: 'Where marks go missing',
        Graphic: GapsGraphic,
        body: [
          'The gaps are usually the same four:',
          '',
          '1. Calculator fluency — TVM keys and the cash-flow worksheet',
          '2. Annuity variations beyond the level case',
          '3. Duration and immunization, studied too late',
          '4. Speed',
          '',
          'At four minutes a question, the calculator is where time is won or lost. Practise on the one you will bring.',
        ].join('\n'),
      },
    ],
  },
]

/** Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`). */
export const EXAM_GUIDES: Record<string, ExamGuide[]> = {
  'p-1': EXAM_P_GUIDES,
  'fm-2': EXAM_FM_GUIDES,
}

export function guidesForExam(examId: string): ExamGuide[] {
  return EXAM_GUIDES[examId.toLowerCase()] ?? []
}
