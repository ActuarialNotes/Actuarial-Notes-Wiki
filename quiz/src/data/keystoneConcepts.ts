// Keystone concepts — the load-bearing few per exam.
//
// A keystone is the block at the top of an arch: pull it and the arch falls.
// These are the concepts the rest of a syllabus is built on top of — the ones
// that show up inside other concepts' definitions, that every second exam
// question quietly assumes, and that are worth over-learning before anything
// else. They are *authored*, not derived from question counts: "appears often"
// and "everything else depends on it" are different things.
//
// Rules for editing this catalogue:
//   1. Keep it small. ~10–15 per exam. If everything is a keystone, nothing is.
//      The gold treatment in the UI is only meaningful while it stays rare.
//   2. `name` must match a real `Concepts/<name>.md` page *and* appear in that
//      exam's syllabus page — both are pinned by keystone.test.ts.
//   3. `why` is **one short line** — a single clause a student reads at a
//      glance, saying what *else* breaks without it. Not a definition (the
//      concept page already has one), and not two sentences: the explainer
//      shows this line and nothing else, so keep it under ~95 characters.
//
// Consumed by lib/keystone.ts (lookup + progress) and rendered by
// components/KeystoneName.tsx. See docs/keystone-concepts.md.

export interface KeystoneConcept {
  /** Canonical concept name — matches `Concepts/<name>.md`. */
  name: string
  /** One short line: what the rest of the syllabus leans on it for. */
  why: string
}

export interface KeystoneExam {
  /** Exam id, matching the exam_progress key (`P`, `FM`, `MAS-I`, `5`). */
  id: string
  /** Display label used in the badge popover. */
  label: string
  concepts: KeystoneConcept[]
}

export const KEYSTONE_EXAMS: KeystoneExam[] = [
  {
    id: 'P',
    label: 'Exam P',
    concepts: [
      {
        name: 'Axioms of Probability',
        why: 'Every rule you will use — complements, unions, conditioning — is derived from these three.',
      },
      {
        name: 'Conditional Probability',
        why: 'Independence, Bayes and total probability are all this one move in disguise.',
      },
      {
        name: 'The Law of Total Probability',
        why: 'Splits a messy problem into computable cases, and is the denominator in every Bayes answer.',
      },
      {
        name: 'Bayes Theorem',
        why: 'The standard "given the result, which cause?" question — and credibility later on.',
      },
      {
        name: 'Random Variable',
        why: 'Distributions, moments and payment questions are all just functions of one.',
      },
      {
        name: 'Expected Value',
        why: 'Variance, covariance, MGFs and expected payments are all expectations of something.',
      },
      {
        name: 'Variance',
        why: 'Carries every second-moment question: linear combinations, the CLT, spread and risk.',
      },
      {
        name: 'Normal Distribution',
        why: 'The default for anything aggregated or approximated, and your most-used table lookup.',
      },
      {
        name: 'Poisson Distribution',
        why: 'The counting model of the exam — claim counts, arrivals, exponential waiting times.',
      },
      {
        name: 'Central Limit Theorem',
        why: 'Licenses the normal approximation that turns intractable sums into a table lookup.',
      },
      {
        name: 'Payment Random Variable',
        why: 'Deductibles, limits and coinsurance are all one transformation of a loss.',
      },
    ],
  },
  {
    id: 'FM',
    label: 'Exam FM',
    concepts: [
      {
        name: 'Present Value',
        why: 'Annuities, loans, bonds and immunization are all structured ways of discounting.',
      },
      {
        name: 'Accumulation Function',
        why: 'Defines what simple, compound and variable-force interest each do to a dollar.',
      },
      {
        name: 'Force of Interest',
        why: 'The continuous-time view that makes non-level rates tractable and links the rest.',
      },
      {
        name: 'Equation of Value',
        why: 'The setup step for nearly every problem: pick a comparison date, set values equal.',
      },
      {
        name: 'Annuity Immediate',
        why: 'Due, deferred, increasing and m-thly annuities are all adjustments to this formula.',
      },
      {
        name: 'Perpetuity',
        why: 'The limiting case that gives fast sanity checks on level and increasing annuities.',
      },
      {
        name: 'Amortization',
        why: 'Splitting each payment into interest and principal drives every loan question.',
      },
      {
        name: 'Bond Price',
        why: 'Premium, discount and book value all follow once this present value is automatic.',
      },
      {
        name: 'Yield Rate',
        why: 'The rate that balances an equation of value — the unknown most questions ask for.',
      },
      {
        name: 'Macaulay Duration',
        why: 'The sensitivity measure the whole asset-liability section is written in.',
      },
      {
        name: 'Immunization',
        why: 'The capstone: present value, duration and convexity in one set of conditions.',
      },
    ],
  },
  {
    id: 'MAS-I',
    label: 'Exam MAS-I',
    concepts: [
      {
        name: 'Poisson Process',
        why: 'Thinning, superposition, compound models and interarrival times all start here.',
      },
      {
        name: 'Aggregate Loss Model',
        why: 'The frequency-severity split behind total loss, on this and every later exam.',
      },
      {
        name: 'Maximum Likelihood Estimation',
        why: 'GLM fitting, survival models and the asymptotic results all assume a likelihood.',
      },
      {
        name: 'Sampling Distribution',
        why: 'Confidence intervals and tests describe a statistic\'s behaviour, not the data\'s.',
      },
      {
        name: 'Mean Square Error',
        why: 'The bias-variance split that explains why a biased estimator can still win.',
      },
      {
        name: 'Type I Error',
        why: 'Fixing α is what defines a test; power and p-values are read straight off it.',
      },
      {
        name: 'Hazard Rate',
        why: 'The pivot every survival question converts through: hazard, survival, density.',
      },
      {
        name: 'Censoring',
        why: 'Whether an observation is censored or truncated changes the likelihood you write.',
      },
      {
        name: 'Generalized Linear Model',
        why: 'Half the syllabus, and the working model in pricing teams once you are on the job.',
      },
      {
        name: 'Link Function',
        why: 'Decides whether your model is multiplicative or additive, and how coefficients read.',
      },
      {
        name: 'Deviance',
        why: 'The GLM analogue of residual sum of squares: model comparison and fit run through it.',
      },
      {
        name: 'AIC',
        why: 'The standard "is the extra parameter worth it?" tiebreaker for non-nested models.',
      },
    ],
  },
  {
    id: '5',
    label: 'Exam 5',
    concepts: [
      {
        name: 'Ratemaking',
        why: 'The fundamental insurance equation every adjustment in the first half serves.',
      },
      {
        name: 'Exposure Base',
        why: 'Pick the wrong measure of risk and every rate and relativity above it is wrong.',
      },
      {
        name: 'On Level Premium',
        why: 'Without premium restated at current rates, the loss ratio method misstates the answer.',
      },
      {
        name: 'Loss Development',
        why: 'One of the three mandatory data adjustments, and the engine of the reserving half.',
      },
      {
        name: 'Loss Trend',
        why: 'Carries past losses to the future policy period without double-counting development.',
      },
      {
        name: 'Overall Rate Level Indication',
        why: 'The number the entire ratemaking process exists to produce.',
      },
      {
        name: 'Pure Premium Method',
        why: 'One of two routes to the indication — the exposure-based one, needing no premium.',
      },
      {
        name: 'Loss Ratio Method',
        why: 'The other route to the indication; when the two disagree is a recurring question.',
      },
      {
        name: 'Credibility',
        why: 'Decides how much weight your own data earns, and what the complement should be.',
      },
      {
        name: 'Classification Ratemaking',
        why: 'Turning one overall indication into rates for individual risks.',
      },
      {
        name: 'Loss Reserving',
        why: 'The retrospective mirror of ratemaking, framing every method in the second half.',
      },
      {
        name: 'Development Triangle',
        why: 'The shared data structure behind every reserving method on the syllabus.',
      },
      {
        name: 'Chain Ladder Method',
        why: 'The baseline other methods are defined against, including where it breaks down.',
      },
      {
        name: 'Bornhuetter-Ferguson Method',
        why: 'The blend that fixes chain ladder\'s leverage on immature years — the most-tested one.',
      },
      {
        name: 'IBNR',
        why: 'What every reserving method is ultimately estimating, and what you must explain.',
      },
    ],
  },
]
