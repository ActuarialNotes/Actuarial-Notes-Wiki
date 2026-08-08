import type { ComponentType } from 'react'
import { Info, Lightbulb } from 'lucide-react'
import {
  AccumulationGraphic,
  AmortizationGraphic,
  AnnuityGraphic,
  CalculatorGraphic,
  ClockCover,
  CredibilityGraphic,
  DiagnosticsGraphic,
  DistributionsGraphic,
  FormatFmGraphic,
  FormatGraphic,
  FormatMasGraphic,
  FormatWrittenGraphic,
  FormulaSheetGraphic,
  FoundationGraphic,
  GapsGraphic,
  ImmunizationGraphic,
  JointRegionGraphic,
  MixedModelGraphic,
  NoAidSheetGraphic,
  PartialCreditGraphic,
  PastPapersGraphic,
  PayoutGraphic,
  PoissonProcessGraphic,
  RateIndicationGraphic,
  RegressionGraphic,
  ScoreScaleGraphic,
  StudyCover,
  TimeSeriesGraphic,
  TreeGraphic,
  TriangleGraphic,
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
  /**
   * The card face — a square mark drawn at the readiness dial's size, not one
   * of the wide page graphics (those are ~2.3:1 and shrink to a sliver in a
   * third-of-a-phone column). Shared across exams by guide kind: every exam-day
   * card is the clock, every how-to-study card the study curve.
   */
  Cover: ComponentType<{ className?: string }>
  pages: ExamGuidePage[]
}

const EXAM_P_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    Icon: Info,
    Cover: ClockCover,
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
    Cover: StudyCover,
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
    Cover: ClockCover,
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
    Cover: StudyCover,
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

/**
 * The CAS multiple-choice exams share a sitting: 4 hours, 45 questions, the
 * same approved calculators and the same 0–10 scale. Only the pacing advice
 * differs by syllabus, so the shared pages are built once here.
 */
function casMultipleChoiceDayPages(pacing: string): ExamGuidePage[] {
  return [
    {
      title: 'Format and pacing',
      Graphic: FormatMasGraphic,
      body: [
        '**4 hours, 45 multiple-choice questions**, computer-based at a Pearson VUE centre.',
        '',
        pacing,
      ].join('\n'),
    },
    {
      title: 'Tables, but no formula sheet',
      Graphic: FormulaSheetGraphic,
      body: [
        '**No formula sheet is provided.** Every estimator, likelihood, and model formula on the syllabus has to come from memory.',
        '',
        'What you *do* get is the CAS **table set** — standard normal, *t*, chi-square and *F* — on-screen. Practise with the same tables, because looking up a critical value fluently is worth a question or two on the day.',
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
        'Scaled **0–10, with 6 required to pass**. The pass mark reflects the difficulty of the paper, not the performance of the room, so a hard sitting is not a reason to bail.',
        '',
        'There is **no penalty for a wrong answer** — never leave a question blank.',
      ].join('\n'),
    },
  ]
}

const EXAM_MAS_I_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    Icon: Info,
    Cover: ClockCover,
    pages: casMultipleChoiceDayPages(
      'That is about **5 minutes 20 seconds per question**, but the paper is not evenly weighted: the extended-linear-model questions carry software output to read, while a [[Poisson Process]] or [[Survival Model]] question is often a single calculation. Bank the short ones first and spend the slack on the long ones.',
    ),
  },
  {
    id: 'how-to-study',
    title: 'How to Study for Exam MAS-I',
    Icon: Lightbulb,
    Cover: StudyCover,
    pages: [
      {
        title: 'Probability models first',
        Graphic: PoissonProcessGraphic,
        body: [
          'Section A is **20–30%** and the most self-contained material on the paper — start where you can finish something.',
          '',
          'Learn the [[Poisson Process]] as a family: thinning, superposition, the compound process, and the exponential waiting time between arrivals. Then the [[Survival Model]] side — the [[Hazard Rate]], the [[Limited Expected Value]], and simple [[Joint Life]] calculations.',
        ].join('\n'),
      },
      {
        title: 'Statistics is the bridge',
        Graphic: DistributionsGraphic,
        body: [
          'Section B is another **20–30%**, and it is the vocabulary the rest of the exam speaks.',
          '',
          '[[Maximum Likelihood Estimation]] is the load-bearing skill — set up the likelihood, log it, differentiate, and be ready for [[Censoring]] and [[Truncation]] in the data. Around it sit the estimator properties ([[Unbiasedness]], [[Consistency]], [[Sufficiency]], [[Efficiency]], [[Mean Square Error]]), hypothesis testing, and [[Order Statistics]].',
        ].join('\n'),
      },
      {
        title: 'Extended linear models are half the exam',
        Graphic: RegressionGraphic,
        body: [
          'Section C is **45–55%** on its own. If your study time runs out, it must not run out here.',
          '',
          'The examinable skill is **choosing and reading a model**, not deriving one: pick the distribution and [[Link Function]] that suit the response, handle [[Categorical Predictor|categorical predictors]] and [[Interaction|interactions]], and know what a [[Control Variable|control]] or [[Offset Variable|offset]] variable is doing in a [[Generalized Linear Model]].',
        ].join('\n'),
      },
      {
        title: 'Then judge the model you fitted',
        Graphic: DiagnosticsGraphic,
        body: [
          'A large share of section C asks whether a fitted model is any good.',
          '',
          'Be fluent in [[AIC]], [[BIC]], [[Deviance]] and [[R-Squared]] as a comparison toolkit, and be able to read [[Residual Plot|residual]], [[QQ Plot|QQ]] and [[Added Variable Plot|added-variable]] plots, [[ANOVA]] tables, and [[Parameter Estimate Tables|parameter estimate tables]] straight off a software printout.',
        ].join('\n'),
      },
      {
        title: 'Where marks go missing',
        Graphic: GapsGraphic,
        body: [
          'The gaps are usually the same four:',
          '',
          '1. Treating section C as theory instead of output-reading practice',
          '2. Likelihoods with censored or truncated data',
          '3. Interpreting a coefficient on the model\'s own scale (a log link is multiplicative)',
          '4. Speed',
          '',
          'Work full 45-question papers under the clock — the sections read very differently, and switching between them is its own skill.',
        ].join('\n'),
      },
    ],
  },
]

const EXAM_MAS_II_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    Icon: Info,
    Cover: ClockCover,
    pages: casMultipleChoiceDayPages(
      'That is about **5 minutes 20 seconds per question**. Much of this paper is interpretation — a [[Decision Tree]] to read, a clustering output to judge — so the calculation-heavy [[Credibility]] and [[ARIMA]] questions are where the time actually goes. Do the reading questions first and leave the arithmetic the room it needs.',
    ),
  },
  {
    id: 'how-to-study',
    title: 'How to Study for Exam MAS-II',
    Icon: Lightbulb,
    Cover: StudyCover,
    pages: [
      {
        title: 'Credibility first',
        Graphic: CredibilityGraphic,
        body: [
          'Section A is **15–25%** and the most mechanical material on the paper — it rewards study time immediately.',
          '',
          'Learn the four procedures as one ladder: [[Limited Fluctuation Credibility]], then [[Bühlmann Credibility]], then [[Bühlmann-Straub Credibility]], then [[Bayesian Credibility]]. Every one of them is the same weighted average — what changes is where the weight comes from.',
        ].join('\n'),
      },
      {
        title: 'Mixed models are regression with groups',
        Graphic: MixedModelGraphic,
        body: [
          'Section B is **10–20%** and builds straight on the MAS-I regression material.',
          '',
          'Know what a random effect *is* — a group-level term you estimate a variance for rather than a coefficient — and what a [[Hierarchical Model]] buys you. Most questions ask you to interpret [[Linear Mixed Model]] output and diagnostics, not to fit one by hand.',
        ].join('\n'),
      },
      {
        title: 'Statistical learning is the bulk',
        Graphic: TreeGraphic,
        body: [
          'Section C is **40–50%**, and the syllabus is a catalogue: [[K-Nearest Neighbors]], [[Decision Tree|trees]] and their pruning, [[Tree Ensemble|ensembles]], [[Principal Components Analysis]], [[Clustering]] including [[K-Means Clustering]], and [[Neural Network|neural networks]].',
          '',
          'For each one, hold three things: the mechanics you could be asked to compute, when it is the right tool, and how its result is scored — [[Lift]], [[Gini Index]], [[AUROC]].',
        ].join('\n'),
      },
      {
        title: 'Time series last',
        Graphic: TimeSeriesGraphic,
        body: [
          'Section D is **15–25%** and, like immunization on Exam FM, is the section prepared candidates most often run out of time for.',
          '',
          'Work the [[ARIMA]] framework as notation you can translate: which terms are autoregressive, which are moving average, what differencing removes. Then trend and seasonality with regression, and reading a forecast off the output.',
        ].join('\n'),
      },
      {
        title: 'Where marks go missing',
        Graphic: GapsGraphic,
        body: [
          'The gaps are usually the same four:',
          '',
          '1. Memorizing algorithms without knowing when each one is appropriate',
          '2. Credibility formulas learned separately instead of as one weighted average',
          '3. Time series, studied too late',
          '4. Speed',
          '',
          'This is a breadth exam — a topic you skipped is a topic you cannot bluff on a multiple-choice paper.',
        ].join('\n'),
      },
    ],
  },
]

const EXAM_5_GUIDES: ExamGuide[] = [
  {
    id: 'exam-day',
    title: 'Exam Day Tips',
    Icon: Info,
    Cover: ClockCover,
    pages: [
      {
        title: 'Format and pacing',
        Graphic: FormatWrittenGraphic,
        body: [
          'A **4-hour written-answer exam** delivered by computer (a 4.5-hour Pearson VUE appointment), typically around **25 questions worth roughly 55 points** in total.',
          '',
          'Budget by **point value, not by question**: about **four minutes per point**. A 1-point sub-part that has swallowed ten minutes is costing you a question elsewhere.',
        ].join('\n'),
      },
      {
        title: 'Partial credit is the whole game',
        Graphic: PartialCreditGraphic,
        body: [
          'Nothing here is multiple choice. Graders award points **per step**, so an answer with a wrong final number can still bank most of its marks — and a bare correct number can lose them.',
          '',
          'Label what you are doing, show the calculation, and then **answer the question that was asked** — a "briefly describe" part wants a sentence, not another triangle.',
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
          'Anything else disqualifies the exam. **Bring two**, with fresh batteries — this paper is four hours of arithmetic and a dead calculator is unrecoverable.',
        ].join('\n'),
      },
      {
        title: 'Scoring',
        Graphic: ScoreScaleGraphic,
        body: [
          'Scaled **0–10, with 6 required to pass**. The pass mark reflects the difficulty of the paper rather than the performance of the room.',
          '',
          'Every sitting is followed by an **Examiner\'s Report** carrying sample answers and the points they earned. It is the only published statement of what full credit actually looks like — read it as part of studying, not after the result.',
        ].join('\n'),
      },
    ],
  },
  {
    id: 'how-to-study',
    title: 'How to Study for Exam 5',
    Icon: Lightbulb,
    Cover: StudyCover,
    pages: [
      {
        title: 'Two halves, weighted alike',
        Graphic: RateIndicationGraphic,
        body: [
          '[[Ratemaking]] and [[Loss Reserving|reserving]] are **45–55%** each, so neither can be a favourite.',
          '',
          'Start on the ratemaking side, because it ends somewhere definite: everything — [[Earned Premium]] brought [[On Level Premium|on-level]], losses [[Loss Development|developed]] and [[Loss Trend|trended]], the [[Expense Provisions|expense provisions]] — feeds one [[Overall Rate Level Indication]], by either the [[Pure Premium Method]] or the [[Loss Ratio Method]].',
        ].join('\n'),
      },
      {
        title: 'Reserving is one triangle, many methods',
        Graphic: TriangleGraphic,
        body: [
          'Build the [[Development Triangle]] machinery once — [[Age to Age Factor|age-to-age factors]], [[Cumulative Development Factor|CDFs]], a [[Tail Factor]] — and every method after that is a different way of choosing an [[Ultimate Loss]].',
          '',
          'Learn [[Chain Ladder Method|chain ladder]], [[Expected Loss Method|expected loss]], [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]], [[Cape Cod Method|Cape Cod]] and [[Benktander Method|Benktander]] as **one family**: they differ only in how much weight the data gets against the a priori expectation.',
        ].join('\n'),
      },
      {
        title: 'Know when a method breaks',
        Graphic: DiagnosticsGraphic,
        body: [
          'The marks above pass level are in the *judgement* parts: which method, and why this one here.',
          '',
          'Tie each diagnostic to the response it implies — a shift in [[Settlement Rate|settlement rates]] or [[Case Adequacy|case adequacy]] points at [[Berquist-Sherman Method|Berquist-Sherman]]; a changing [[Mix of Business|mix of business]], a [[Rate Level Change|rate level change]] or a [[Large Loss|large loss]] changes which data you can trust at all.',
        ].join('\n'),
      },
      {
        title: 'Study by working past papers',
        Graphic: PastPapersGraphic,
        body: [
          'This exam is examined the same way year after year, and the CAS publishes every paper with its sample answers.',
          '',
          'Work them **under the clock and in full sentences**, then mark yourself against the Examiner\'s Report point by point. Reading a solution and agreeing with it is not the same skill as producing one in four minutes.',
        ].join('\n'),
      },
      {
        title: 'Where marks go missing',
        Graphic: GapsGraphic,
        body: [
          'The gaps are usually the same four:',
          '',
          '1. Answering a "describe" or "justify" part with a calculation',
          '2. Not stating assumptions and selections — an unlabelled number earns nothing',
          '3. Reserving judgement questions, prepared only as formulas',
          '4. Pacing against point values',
          '',
          'Almost everyone who sits this exam can do the arithmetic. The pass is in writing it down the way a grader can award it.',
        ].join('\n'),
      },
    ],
  },
]

/** Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`). */
export const EXAM_GUIDES: Record<string, ExamGuide[]> = {
  'p-1': EXAM_P_GUIDES,
  'fm-2': EXAM_FM_GUIDES,
  'mas-i': EXAM_MAS_I_GUIDES,
  'mas-ii': EXAM_MAS_II_GUIDES,
  // "Exam 5 (CAS)" carries no dash, so `examIdFromFile` fills in the -1 suffix.
  '5-1': EXAM_5_GUIDES,
}

export function guidesForExam(examId: string): ExamGuide[] {
  return EXAM_GUIDES[examId.toLowerCase()] ?? []
}
