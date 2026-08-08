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
//   3. `why` is **one line, in two beats**: a concrete plain-language gloss of
//      what the concept actually says or does, then what *else* leans on it.
//      The gloss is what stops the line reading as a riddle — "the retrospective
//      mirror of ratemaking" means nothing to someone who hasn't met the topic
//      yet, "estimating what is still owed on claims already incurred" does.
//      It is still not the concept page's full definition, and still not two
//      sentences: the explainer shows this line and nothing else, so keep it
//      under ~130 characters.
//
// Consumed by lib/keystone.ts (lookup + progress) and rendered by
// components/KeystoneName.tsx. See docs/keystone-concepts.md.

export interface KeystoneConcept {
  /** Canonical concept name — matches `Concepts/<name>.md`. */
  name: string
  /** One line: what it says, then what the rest of the syllabus leans on it for. */
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
        why: 'Non-negativity, a total of 1, and additivity over disjoint events — the complement, union and conditioning rules all follow.',
      },
      {
        name: 'Conditional Probability',
        why: 'Rescaling probability to a known outcome, P(A|B) = P(A and B)/P(B) — independence, Bayes and total probability rearrange it.',
      },
      {
        name: 'The Law of Total Probability',
        why: 'Splits a probability into weighted pieces over disjoint cases — how mixtures are computed, and the denominator of a Bayes answer.',
      },
      {
        name: 'Bayes Theorem',
        why: 'Flips a conditional: P(cause | evidence) from P(evidence | cause) and a prior — posterior questions here, credibility later.',
      },
      {
        name: 'Random Variable',
        why: 'A number attached to each outcome — distributions, moments, transformations and payment questions are all statements about one.',
      },
      {
        name: 'Expected Value',
        why: 'The probability-weighted average of a random variable — variance, covariance, MGFs and expected payments are all expectations.',
      },
      {
        name: 'Variance',
        why: 'E[X²] − E[X]², the average squared distance from the mean — it carries linear combinations, covariance, the CLT and risk.',
      },
      {
        name: 'Normal Distribution',
        why: 'The bell curve you standardize to z and read from the table — the limit for sums and the exam\'s default approximation.',
      },
      {
        name: 'Poisson Distribution',
        why: 'Counts of rare events at a constant rate, with mean = variance = λ — claim counts, arrivals, and exponential waiting times.',
      },
      {
        name: 'Central Limit Theorem',
        why: 'Sums and averages of many independent variables turn normal — this is what licenses the normal approximation you keep using.',
      },
      {
        name: 'Payment Random Variable',
        why: 'What the insurer actually pays once a deductible, limit and coinsurance are applied — one transformation of the underlying loss.',
      },
    ],
  },
  {
    id: 'FM',
    label: 'Exam FM',
    concepts: [
      {
        name: 'Present Value',
        why: 'What a future cash flow is worth today once discounted — annuities, loans, bonds and immunization are all structured discounting.',
      },
      {
        name: 'Accumulation Function',
        why: 'a(t), what one dollar grows to by time t — the single definition simple, compound and variable-force interest each specialize.',
      },
      {
        name: 'Force of Interest',
        why: 'The instantaneous rate of growth δ = a\'(t)/a(t) — the continuous-time view that handles non-level rates and links i, d and v.',
      },
      {
        name: 'Equation of Value',
        why: 'Setting what you pay equal to what you receive at one comparison date — the setup step for nearly every problem on the exam.',
      },
      {
        name: 'Annuity Immediate',
        why: 'n level payments at the ends of periods, worth (1 − vⁿ)/i — due, deferred, increasing and m-thly annuities all adjust this.',
      },
      {
        name: 'Perpetuity',
        why: 'Level payments forever, worth 1/i — the limiting case that gives fast sanity checks on level and increasing annuity values.',
      },
      {
        name: 'Amortization',
        why: 'Splitting each loan payment into interest on the balance and principal repaid — the basis of every outstanding-balance question.',
      },
      {
        name: 'Bond Price',
        why: 'The present value of the coupons plus the redemption amount — premium, discount, book value and write-up/down all follow.',
      },
      {
        name: 'Yield Rate',
        why: 'The interest rate that solves an equation of value (the IRR) — the unknown most problems are ultimately asking you to find.',
      },
      {
        name: 'Macaulay Duration',
        why: 'The present-value-weighted average time of the cash flows — the sensitivity measure the asset-liability section is written in.',
      },
      {
        name: 'Immunization',
        why: 'Matching asset and liability present values, durations and convexity so a small rate move can\'t hurt — the exam\'s capstone.',
      },
    ],
  },
  {
    id: 'MAS-I',
    label: 'Exam MAS-I',
    concepts: [
      {
        name: 'Poisson Process',
        why: 'Events arriving at rate λ with independent increments — the base for thinning, superposition, compound models and waiting times.',
      },
      {
        name: 'Aggregate Loss Model',
        why: 'Total loss as a random number of claims times their random sizes — the frequency-severity split used here and on every later exam.',
      },
      {
        name: 'Maximum Likelihood Estimation',
        why: 'Picking the parameters that make the observed data most likely — GLMs, survival models and the asymptotic results all assume it.',
      },
      {
        name: 'Sampling Distribution',
        why: 'How a statistic varies from sample to sample — confidence intervals and tests describe this, not the data\'s own distribution.',
      },
      {
        name: 'Mean Square Error',
        why: 'Bias squared plus variance — the decomposition that explains why a biased estimator can beat an unbiased one.',
      },
      {
        name: 'Type I Error',
        why: 'Rejecting a true null hypothesis; fixing its probability α is what defines a test, and power and p-values are read against it.',
      },
      {
        name: 'Hazard Rate',
        why: 'The instantaneous failure rate given survival so far — the pivot for converting between survival, density and cumulative hazard.',
      },
      {
        name: 'Censoring',
        why: 'An observation known only to lie beyond some value — whether it is censored or truncated changes the likelihood you write.',
      },
      {
        name: 'Generalized Linear Model',
        why: 'Regression for non-normal responses via a link and exponential-family errors — half the syllabus, and the job itself afterwards.',
      },
      {
        name: 'Link Function',
        why: 'Maps the linear predictor to the mean — log makes the model multiplicative, identity additive, and it sets how coefficients read.',
      },
      {
        name: 'Deviance',
        why: 'Twice the log-likelihood gap from a perfect fit — the GLM stand-in for residual sum of squares in model comparison and fit tests.',
      },
      {
        name: 'AIC',
        why: 'Log-likelihood penalized by parameter count — the standard "is the extra variable worth it?" tiebreaker for non-nested models.',
      },
    ],
  },
  {
    id: '5',
    label: 'Exam 5',
    concepts: [
      {
        name: 'Ratemaking',
        why: 'Setting rates so premium covers expected losses, expenses and profit — the fundamental insurance equation the first half serves.',
      },
      {
        name: 'Exposure Base',
        why: 'The unit of risk premium is charged per, like a car-year or $100 of payroll — pick it wrong and every rate above it is wrong.',
      },
      {
        name: 'On Level Premium',
        why: 'Historical premium restated at today\'s rates — without it the loss ratio method compares losses to the wrong premium.',
      },
      {
        name: 'Loss Development',
        why: 'The growth of known losses toward their ultimate value — one of the three mandatory data adjustments, and the engine of reserving.',
      },
      {
        name: 'Loss Trend',
        why: 'Adjusts past losses for cost changes up to the future policy period — the piece that must not double-count development.',
      },
      {
        name: 'Overall Rate Level Indication',
        why: 'The percentage rate change indicated for the whole book — the number the entire ratemaking process exists to produce.',
      },
      {
        name: 'Pure Premium Method',
        why: 'Indicates a rate directly from losses per exposure — the exposure-based route, usable when no premium history exists.',
      },
      {
        name: 'Loss Ratio Method',
        why: 'Indicates a rate change from losses over on-level premium — the other route, and why the two can disagree is a recurring question.',
      },
      {
        name: 'Credibility',
        why: 'How much weight Z your own data earns, and what complement fills the rest — applied at every level of a rate review.',
      },
      {
        name: 'Classification Ratemaking',
        why: 'Turning one overall indication into rates by class and territory, through relativities and multivariate methods.',
      },
      {
        name: 'Loss Reserving',
        why: 'Estimating what is still owed on claims already incurred — the backward-looking half of the syllabus and all of its methods.',
      },
      {
        name: 'Development Triangle',
        why: 'Losses arrayed by accident year and maturity — the shared data structure every reserving method on the syllabus reads.',
      },
      {
        name: 'Chain Ladder Method',
        why: 'Projects losses to ultimate with age-to-age factors — the baseline other methods are defined against, and where it breaks down.',
      },
      {
        name: 'Bornhuetter-Ferguson Method',
        why: 'Blends expected losses with reported ones by percent developed — it fixes chain ladder\'s leverage on immature years.',
      },
      {
        name: 'IBNR',
        why: 'Claims incurred but not yet reported, plus development on known ones — what every reserving method is ultimately estimating.',
      },
    ],
  },
  {
    id: 'MAS-II',
    label: 'Exam MAS-II',
    concepts: [
      {
        name: 'Credibility Theory',
        why: 'Weighting a class\'s own experience against a complement — every credibility method on the exam is one recipe for that weight.',
      },
      {
        name: 'Bühlmann Credibility',
        why: 'Sets Z = n/(n+k) from within-risk noise over between-risk spread — the least-squares answer the other methods are compared against.',
      },
      {
        name: 'Bayesian Credibility',
        why: 'The posterior mean given the experience; under a conjugate prior it equals Bühlmann exactly, which is why the pairs get memorized.',
      },
      {
        name: 'Linear Mixed Model',
        why: 'Regression with a population part plus group-level departures — the whole of section B, and how correlated observations are handled.',
      },
      {
        name: 'Random Effects',
        why: 'Group deviations treated as draws from a distribution, costing one variance rather than one coefficient per level.',
      },
      {
        name: 'Best Linear Unbiased Predictor',
        why: 'The shrunk prediction of a group effect — its shrinkage factor is Bühlmann\'s Z, which ties sections A and B together.',
      },
      {
        name: 'Bias-Variance Tradeoff',
        why: 'Flexibility trades approximation error for instability, so test error is U-shaped — why every tuning parameter on the exam exists.',
      },
      {
        name: 'Cross-Validation',
        why: 'Estimates test error by holding out folds in turn — how k, tree depth, m and λ are all actually chosen.',
      },
      {
        name: 'Decision Tree',
        why: 'Recursive binary splits carving predictor space into boxes — the base learner every ensemble method on the syllabus is built from.',
      },
      {
        name: 'Tree Ensemble',
        why: 'Combining many trees into one prediction; bagging and forests cut variance, boosting cuts bias, and the exam tests the difference.',
      },
      {
        name: 'Principal Components Analysis',
        why: 'Rotates correlated predictors onto directions of maximum variance — the loadings, scores and variance-explained computations.',
      },
      {
        name: 'Stationarity',
        why: 'A fixed mean, variance and autocovariance structure — the condition every ARIMA result assumes, and what differencing is for.',
      },
      {
        name: 'Autocorrelation Function',
        why: 'Correlation with the series k periods back; read with the PACF it is how the order of an ARIMA model gets identified.',
      },
      {
        name: 'ARIMA',
        why: 'Autoregressive, differencing and moving-average terms in one model — the framework the whole time-series section forecasts with.',
      },
    ],
  },
]
