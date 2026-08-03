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
//   3. `why` is one sentence, addressed to a student, saying what *else* breaks
//      without it. Not a definition — the concept page already has one.
//
// Consumed by lib/keystone.ts (lookup + progress) and rendered by
// components/KeystoneBadge.tsx. See docs/keystone-concepts.md.

export interface KeystoneConcept {
  /** Canonical concept name — matches `Concepts/<name>.md`. */
  name: string
  /** One sentence: what the rest of the syllabus leans on it for. */
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
        why: 'Every probability rule you will use — complements, unions, conditioning — is derived from these three statements, so a shaky grasp here quietly corrupts everything downstream.',
      },
      {
        name: 'Conditional Probability',
        why: 'Conditioning is the single most-used move on the exam: independence, Bayes, total probability and most multivariate questions are all it in disguise.',
      },
      {
        name: 'The Law of Total Probability',
        why: 'It is how you break a messy problem into cases you can actually compute, and it is the denominator of every Bayes calculation.',
      },
      {
        name: 'Bayes Theorem',
        why: 'The standard "given the result, which cause?" question — and the reasoning pattern behind credibility later in your exam sequence.',
      },
      {
        name: 'Random Variable',
        why: 'Distributions, moments, and every insurance-payment question are all just functions of a random variable; getting the object itself right makes the rest bookkeeping.',
      },
      {
        name: 'Expected Value',
        why: 'The one number every other quantity is built from — variance, covariance, moment generating functions and expected insurance payments are all expectations of something.',
      },
      {
        name: 'Variance',
        why: 'Second-moment work runs through it: linear combinations, the Central Limit Theorem, and any question about spread or risk.',
      },
      {
        name: 'Normal Distribution',
        why: 'The default answer for anything aggregated or approximated, and the table lookup you will do more than any other.',
      },
      {
        name: 'Poisson Distribution',
        why: 'The counting distribution of the exam — claim counts, arrivals, and the bridge to the exponential waiting times between them.',
      },
      {
        name: 'Central Limit Theorem',
        why: 'It licenses the normal approximation that turns otherwise intractable sums and averages into a table lookup.',
      },
      {
        name: 'Payment Random Variable',
        why: 'Deductibles, limits and coinsurance are all one transformation of a loss variable; the whole insurance-applications section is this idea repeated.',
      },
    ],
  },
  {
    id: 'FM',
    label: 'Exam FM',
    concepts: [
      {
        name: 'Present Value',
        why: 'Every FM answer is ultimately a present value — annuities, loans, bonds and immunization are just structured ways of discounting cash flows.',
      },
      {
        name: 'Accumulation Function',
        why: 'It is the common definition behind simple, compound and variable-force interest, so it tells you what any interest measure actually does to a dollar.',
      },
      {
        name: 'Force of Interest',
        why: 'The continuous-time view that makes non-level interest rates tractable and links every other rate measure together.',
      },
      {
        name: 'Equation of Value',
        why: 'The setup step for almost every problem: put the cash flows on a timeline, pick a comparison date, and set values equal.',
      },
      {
        name: 'Annuity Immediate',
        why: 'The base cash-flow pattern; annuity-due, deferred, increasing and m-thly annuities are all adjustments to this one formula.',
      },
      {
        name: 'Perpetuity',
        why: 'The limiting case that gives you fast sanity checks and shortcuts on increasing and level annuity values.',
      },
      {
        name: 'Amortization',
        why: 'The split of each payment into interest and principal drives every loan question, including outstanding balance and balloon or drop payments.',
      },
      {
        name: 'Bond Price',
        why: 'Bond questions are annuity-plus-redemption present values; once the pricing formula is automatic, premium, discount and book value follow.',
      },
      {
        name: 'Yield Rate',
        why: 'The rate that makes an equation of value balance — the unknown you are solving for in most calculator-heavy questions.',
      },
      {
        name: 'Macaulay Duration',
        why: 'The sensitivity measure the whole asset-liability section is written in, and the first half of every immunization condition.',
      },
      {
        name: 'Immunization',
        why: 'The capstone: it ties present value, duration and convexity into one testable set of conditions.',
      },
    ],
  },
  {
    id: 'MAS-I',
    label: 'Exam MAS-I',
    concepts: [
      {
        name: 'Poisson Process',
        why: 'The backbone of the stochastic-processes material — thinning, superposition, compound models and interarrival times all start here.',
      },
      {
        name: 'Aggregate Loss Model',
        why: 'The frequency-severity decomposition is how actuaries model total loss, and it recurs on every later exam you will sit.',
      },
      {
        name: 'Maximum Likelihood Estimation',
        why: 'The default estimator of the syllabus: GLM fitting, survival models and most asymptotic results assume you can set up a likelihood.',
      },
      {
        name: 'Sampling Distribution',
        why: 'Confidence intervals and hypothesis tests are statements about a statistic\'s sampling distribution, not about the data itself.',
      },
      {
        name: 'Mean Square Error',
        why: 'The bias-variance split that lets you compare estimators and explains why a biased model can still be the better one.',
      },
      {
        name: 'Type I Error',
        why: 'Fixing α is what defines a test; power, p-values and every "do we reject?" question are read off it.',
      },
      {
        name: 'Hazard Rate',
        why: 'Survival, distribution and reliability questions all convert between hazard, survival and density — this is the pivot.',
      },
      {
        name: 'Censoring',
        why: 'Real actuarial data is incomplete; whether an observation is censored or truncated changes the likelihood you write down.',
      },
      {
        name: 'Generalized Linear Model',
        why: 'Half the syllabus is GLMs, and they are the working model in pricing teams once you are on the job.',
      },
      {
        name: 'Link Function',
        why: 'The choice that decides whether your model is multiplicative or additive — and the reason GLM coefficients are read as they are.',
      },
      {
        name: 'Deviance',
        why: 'The GLM analogue of residual sum of squares: nested model comparison and goodness-of-fit both run through it.',
      },
      {
        name: 'AIC',
        why: 'The standard "is the extra parameter worth it?" tiebreaker for non-nested models on this exam.',
      },
    ],
  },
  {
    id: '5',
    label: 'Exam 5',
    concepts: [
      {
        name: 'Ratemaking',
        why: 'The fundamental insurance equation frames the entire first half of the exam; every adjustment you make is in service of balancing it.',
      },
      {
        name: 'Exposure Base',
        why: 'Pick the wrong measure of risk and every rate, trend and relativity built on top of it is wrong too.',
      },
      {
        name: 'On Level Premium',
        why: 'Historical premium is unusable until it is restated at current rates — skip it and the loss ratio method silently misstates the indication.',
      },
      {
        name: 'Loss Development',
        why: 'One of the three mandatory adjustments to historical data, and the mechanic the whole reserving half of the exam is built from.',
      },
      {
        name: 'Loss Trend',
        why: 'The second mandatory adjustment: it carries past losses forward to the future policy period without double-counting development.',
      },
      {
        name: 'Overall Rate Level Indication',
        why: 'The number the entire ratemaking process exists to produce, and the anchor every other ratemaking topic connects back to.',
      },
      {
        name: 'Pure Premium Method',
        why: 'One of the two ways to reach the indication — the exposure-based route that needs no premium data.',
      },
      {
        name: 'Loss Ratio Method',
        why: 'The other route to the indication; knowing when the two agree, and why they can differ, is a recurring exam question.',
      },
      {
        name: 'Credibility',
        why: 'It decides how much weight your own data earns, and choosing the complement well is where most of the exam\'s judgement lives.',
      },
      {
        name: 'Classification Ratemaking',
        why: 'Turning one overall indication into rates for individual risks is where the syllabus spends its relativity, GLM and ASOP 12 material.',
      },
      {
        name: 'Loss Reserving',
        why: 'The retrospective mirror of ratemaking, and the frame for every estimation method in the second half of the syllabus.',
      },
      {
        name: 'Development Triangle',
        why: 'The shared data structure of every reserving method — read a triangle fluently and the methods become variations on one theme.',
      },
      {
        name: 'Chain Ladder Method',
        why: 'The baseline estimate other methods are defined against, including where its "leverage on immature years" assumption breaks down.',
      },
      {
        name: 'Bornhuetter-Ferguson Method',
        why: 'The blend of chain ladder and expected losses that fixes exactly that immaturity problem — the most-tested reserving method on the exam.',
      },
      {
        name: 'IBNR',
        why: 'The quantity every reserving method is ultimately estimating, and the thing the reserve communication questions ask you to explain.',
      },
    ],
  },
]
