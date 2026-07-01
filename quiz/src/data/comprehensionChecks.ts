// Authored "quick comprehension check" questions gating flashcard collection.
//
// Stored as data (per docs/flashcard-collection.md, "similar to data/mnemonics.ts")
// rather than derived at runtime from the concept's first paragraph. Each key is a
// concept's display name — its Concepts/*.md filename without the extension — so it
// lines up with `concept.name` from useWikiSyllabus and `allConceptNames` in
// CollectConceptModal.tsx.
//
// Design rule (see .claude/skills/flashcard-comprehension-check): the correct answer
// is never the concept's own name or a paraphrase of its definition. Every question
// is built around a "fork" — a point where a true understanding and a common
// misconception diverge. The comment above each `options` array names the
// misconception each wrong choice targets; it is documentation, not runtime data.
//
// This batch covers the Exam P (Probability) syllabus concepts.

export interface ComprehensionCheck {
  /** Stem shown in the collect modal — keep it to ~3 sentences. */
  question: string
  /** Exactly 4 options, in a fixed canonical order. The concept's own name
   *  must never appear here — the UI is free to shuffle at render time. */
  options: string[]
  /** Index into `options` of the correct answer. */
  correctIndex: number
}

export const COMPREHENSION_CHECKS: Record<string, ComprehensionCheck> = {
  // ─── General Probability ─────────────────────────────────────────────

  'Probability': {
    question:
      "Which of the following could NOT be a valid probability for an event?",
    // 0: valid (some think 0 is disallowed) · 2: valid certainty (some think 1 is disallowed) · 3: correct, violates P ≤ 1
    options: [
      "0",
      "0.5",
      "1",
      "1.3",
    ],
    correctIndex: 3,
  },

  'Discrete Mathematics': {
    question:
      "Which question is best suited to discrete mathematics, as opposed to the continuous methods of calculus?",
    // 1–3: continuous/calculus problems (area, derivative, integral) mistaken for discrete-math territory
    options: [
      "The number of distinct ways to seat 5 people in a row",
      "The area under a probability density curve between two points",
      "The instantaneous rate of change of a function at a point",
      "The total distance traveled given a continuous velocity function",
    ],
    correctIndex: 0,
  },

  'Set Function': {
    question:
      "What distinguishes a set function from an ordinary real-valued function like f(x) = x²?",
    // 1: confines it to probability specifically · 2: invents a finiteness limit · 3: invents a linearity requirement
    options: [
      "Its inputs are sets (such as events), not individual numbers",
      "Its outputs must always lie between 0 and 1",
      "It can only be applied to finite sets",
      "It must be a linear function of its argument",
    ],
    correctIndex: 0,
  },

  'Venn Diagram': {
    question:
      "In a Venn diagram of events A and B, which region represents 'exactly one of A or B occurs'?",
    // 1: the overlap = both (A∩B) · 2: the whole union = at least one · 3: outside both = neither
    options: [
      "The two crescents outside the overlap (A only, plus B only)",
      "The central region where the two circles overlap",
      "The entire area covered by both circles together",
      "The region outside both circles",
    ],
    correctIndex: 0,
  },

  'Sample Space': {
    question:
      "A fair die is rolled once, and the outcome is defined as the number of pips shown. Which of the following is NOT an element of the sample space?",
    // 0–2: genuine single-outcome elements · 3: an event (a subset), not an outcome (an element)
    options: [
      "4",
      "6",
      "1",
      "\"Rolling an even number\"",
    ],
    correctIndex: 3,
  },

  'Event': {
    question:
      "A fair die is rolled. Which statement about events is FALSE?",
    // 0: correct (false claim) — simple events have exactly one outcome · 1–3: all true of events
    options: [
      "An event must contain at least two outcomes",
      "An event is a subset of the sample space",
      "The entire sample space is itself an event",
      "An event can consist of a single outcome",
    ],
    correctIndex: 0,
  },

  'Axioms of Probability': {
    question:
      "Which statement is NOT one of the three axioms of probability?",
    // 0: correct — additivity holds only for disjoint events, not all pairs · 1–3: the three genuine axioms
    options: [
      "For any two events, P(A ∪ B) = P(A) + P(B)",
      "P(S) = 1 for the sample space S",
      "P(E) ≥ 0 for every event E",
      "For disjoint events, P(A ∪ B) = P(A) + P(B)",
    ],
    correctIndex: 0,
  },

  'Set Theory': {
    question:
      "Given A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, what is A \\ B (the set difference)?",
    // 1: intersection A∩B · 2: reversed difference B\\A · 3: union A∪B
    options: [
      "{1, 2}",
      "{3, 4}",
      "{5, 6}",
      "{1, 2, 3, 4, 5, 6}",
    ],
    correctIndex: 0,
  },

  'Combinatorics': {
    question:
      "How many distinct ways can 4 different books be arranged in a row on a shelf?",
    // 1: 2⁴, counts subsets not arrangements · 2: 4×3, stops arranging early · 3: 4⁴, allows repetition
    options: [
      "24",
      "16",
      "12",
      "256",
    ],
    correctIndex: 0,
  },

  'Combination': {
    question:
      "An insurer forms a committee of 3 adjusters from a pool of 8, where the roles are identical. How many committees are possible?",
    // 1: P(8,3), treats order as mattering · 2: 8×3 · 3: 8³, ordered with replacement
    options: [
      "56",
      "336",
      "24",
      "512",
    ],
    correctIndex: 0,
  },

  'Permutation': {
    question:
      "From 8 adjusters, an insurer awards distinct 1st, 2nd, and 3rd place bonuses. How many ways can the three ranked prizes be assigned?",
    // 1: C(8,3), ignores that order matters · 2: 8×3 · 3: 8!, arranges all eight
    options: [
      "336",
      "56",
      "24",
      "40,320",
    ],
    correctIndex: 0,
  },

  'Independent Events': {
    question:
      "Events A and B are independent with P(A) = 0.4 and P(B) = 0.3. What is P(A ∩ B)?",
    // 1: confuses independent with mutually exclusive (0) · 2: adds the probabilities · 3: averages them
    options: [
      "0.12",
      "0",
      "0.7",
      "0.35",
    ],
    correctIndex: 0,
  },

  'Mutually Exclusive Events': {
    question:
      "Events A and B are mutually exclusive with P(A) = 0.5 and P(B) = 0.3. What is P(A ∩ B)?",
    // 1: treats them as independent and multiplies · 2: gives the union instead · 3: subtracts
    options: [
      "0",
      "0.15",
      "0.8",
      "0.2",
    ],
    correctIndex: 0,
  },

  'Probability Addition Rule': {
    question:
      "For two events, P(A) = 0.5, P(B) = 0.4, and P(A ∩ B) = 0.2. What is P(A ∪ B)?",
    // 1: forgets to subtract the overlap (double-counts) · 2: reports the intersection · 3: subtracts everything
    options: [
      "0.7",
      "0.9",
      "0.2",
      "0.1",
    ],
    correctIndex: 0,
  },

  'Probability Multiplication Rule': {
    question:
      "A portfolio has 10 policies, 4 of which will claim. Two are drawn at random without replacement. What is the probability both claim?",
    // 1: treats draws as independent (with replacement), (4/10)² · 2: adds instead of multiplying · 3: only the first draw
    options: [
      "4/10 × 3/9 = 0.133",
      "4/10 × 4/10 = 0.16",
      "4/10 + 3/9 = 0.733",
      "4/10 = 0.40",
    ],
    correctIndex: 0,
  },

  'Inclusion-Exclusion Principle': {
    question:
      "For three events, P(A ∪ B ∪ C) is found by which combination of terms?",
    // 1: omits the pairwise corrections · 2: ignores overlap entirely · 3: wrong sign on the pairwise terms
    options: [
      "Add the three singles, subtract the three pairwise intersections, then add the triple intersection",
      "Add the three singles, then subtract the triple intersection",
      "Add the three single probabilities with no further correction",
      "Add the three singles and the three pairwise intersections, then subtract the triple",
    ],
    correctIndex: 0,
  },

  'Conditional Probability': {
    question:
      "Given P(A) = 0.5, P(B) = 0.4, and P(A ∩ B) = 0.2, what is P(A | B)?",
    // 1: divides by P(A) — conditions on the wrong event · 2: forgets to divide (reports the joint) · 3: multiplies the marginals
    options: [
      "0.2 / 0.4 = 0.5",
      "0.2 / 0.5 = 0.4",
      "0.2",
      "0.5 × 0.4 = 0.2",
    ],
    correctIndex: 0,
  },

  'Bayes Theorem': {
    question:
      "20% of policyholders are high-risk; a high-risk one claims with probability 0.40, a low-risk one with probability 0.10. A random policyholder files a claim. What is the probability they are high-risk?",
    // 1: reports P(claim | high-risk), the reversed conditional · 2: uses the prior, ignoring the evidence · 3: the joint, undivided
    options: [
      "0.50",
      "0.40",
      "0.20",
      "0.08",
    ],
    correctIndex: 0,
  },

  'The Law of Total Probability': {
    question:
      "A portfolio is 30% young (claim rate 0.20), 50% middle-aged (0.10), and 20% senior (0.15). What is the overall probability of a claim?",
    // 1: simple average of the rates, ignoring class sizes · 2: sums the rates without weighting · 3: multiplies all three rates
    options: [
      "0.140",
      "0.150",
      "0.450",
      "0.075",
    ],
    correctIndex: 0,
  },

  // ─── Univariate Random Variables ─────────────────────────────────────

  'Discrete Univariate Distributions': {
    question:
      "Which of the following is NOT a requirement for a valid probability mass function?",
    // 0: correct — that's a PDF (continuous); a PMF sums, it doesn't integrate · 1–3: genuine PMF properties
    options: [
      "Its values must integrate to 1 over the real line",
      "Each value f(k) must be ≥ 0",
      "The values f(k) must sum to 1",
      "f(k) gives P(X = k) directly",
    ],
    correctIndex: 0,
  },

  'Continuous Univariate Distributions': {
    question:
      "For a continuous random variable X with density f, which statement is true?",
    // 1: density can exceed 1 · 2: confuses density with probability · 3: continuous variables integrate, not sum
    options: [
      "P(X = c) = 0 for any single value c",
      "f(x) can never exceed 1, since it is a probability",
      "f(x) equals the probability that X takes the value x",
      "Probabilities are found by summing f over the possible values",
    ],
    correctIndex: 0,
  },

  'Random Variable': {
    question:
      "Which best describes a random variable?",
    // 1: confuses it with a realized outcome · 2: confuses it with a probability · 3: that is the sample space
    options: [
      "A function that assigns a real number to each outcome of an experiment",
      "A single numerical outcome produced by one run of an experiment",
      "The probability assigned to a particular outcome",
      "The complete list of all possible outcomes of an experiment",
    ],
    correctIndex: 0,
  },

  'Percentile': {
    question:
      "The 90th percentile of a loss distribution is $5,000. What does this mean?",
    // 1: reverses the inequality · 2: confuses percentile with the mean · 3: reverses the direction
    options: [
      "There is a 90% probability that a loss is at most $5,000",
      "There is a 90% probability that a loss is at least $5,000",
      "The average loss is $5,000",
      "90% of losses are larger than $5,000",
    ],
    correctIndex: 0,
  },

  'Variance': {
    question:
      "If Var(X) = 100, what is Var(3X + 5)?",
    // 1: treats it as 3·Var + 5 (linear scaling plus shift) · 2: multiplies by 3 instead of 3² · 3: adds the shift after scaling
    options: [
      "900",
      "305",
      "300",
      "905",
    ],
    correctIndex: 0,
  },

  'Standard Deviation': {
    question:
      "A claim amount has variance 400. If every claim is doubled, what is the new standard deviation?",
    // 1: applies the factor 2² = 4 to the SD · 2: reports the new variance (2²·400) as an SD · 3: thinks scaling leaves SD unchanged
    options: [
      "40",
      "80",
      "1,600",
      "20",
    ],
    correctIndex: 0,
  },

  'Coefficient of Variation': {
    question:
      "Distribution A has mean $500 and SD $100; Distribution B has mean $2,000 and SD $300. Which has greater relative variability?",
    // 1: confuses absolute SD with relative variability · 2: irrelevant reasoning (larger mean) · 3: misreads the formula
    options: [
      "A — its SD is a larger fraction of its mean (0.20 vs 0.15)",
      "B — it has the larger standard deviation (300 vs 100)",
      "B — it has the larger mean",
      "They are equal, since the measure ignores the mean",
    ],
    correctIndex: 0,
  },

  'Policy Information': {
    question:
      "Policy provisions such as deductibles, limits, and coinsurance primarily determine what?",
    // 1: confuses payment provisions with claim frequency · 2: irrelevant · 3: unrelated finance concept
    options: [
      "How a ground-up loss is transformed into the amount the insurer actually pays",
      "The probability that a policyholder files a claim in a year",
      "The total number of policies an insurer chooses to issue",
      "The interest rate credited on the insurer's reserves",
    ],
    correctIndex: 0,
  },

  'Deductible': {
    question:
      "A policy has an ordinary deductible of $100. A loss of $600 occurs. How much does the insurer pay?",
    // 1: ignores the deductible, pays the full loss · 2: pays only the deductible amount · 3: thinks the insured retains the whole loss
    options: [
      "$500",
      "$600",
      "$100",
      "$0",
    ],
    correctIndex: 0,
  },

  'Coinsurance Percentage': {
    question:
      "A policy has a $500 deductible and 80% coinsurance (no limit). A loss of $1,500 occurs. What does the insurer pay?",
    // 1: applies the deductible but forgets the 80% · 2: applies coinsurance to the full loss, skipping the deductible · 3: computes the insured's 20% share
    options: [
      "$800",
      "$1,000",
      "$1,200",
      "$200",
    ],
    correctIndex: 0,
  },

  'Benefit Limit': {
    question:
      "A policy has a $100 deductible and a $400 benefit limit (no coinsurance). A loss of $600 occurs. What does the insurer pay?",
    // 1: applies the deductible but ignores the limit · 2: ignores both provisions · 3: subtracts the limit instead of capping at it
    options: [
      "$400",
      "$500",
      "$600",
      "$300",
    ],
    correctIndex: 0,
  },

  'Inflation': {
    question:
      "Losses grow 10% due to inflation, but the policy's deductible stays fixed. How does the insurer's expected payment change?",
    // 1: ignores the leveraging of the fixed deductible · 2: wrong direction of leverage · 3: ignores loss growth entirely
    options: [
      "It rises by more than 10%, since the fixed deductible covers a smaller share of the larger losses",
      "It rises by exactly 10%, matching the inflation rate",
      "It rises by less than 10%, because the deductible absorbs the increase",
      "It stays the same, since the deductible is unchanged",
    ],
    correctIndex: 0,
  },

  'Expected Value': {
    question:
      "A claim X has P(X=0) = 0.5, P(X=100) = 0.3, and P(X=500) = 0.2. What is E[X]?",
    // 1: simple average of the three values, ignoring probabilities · 2: sums the values without weighting · 3: midpoint of the range
    options: [
      "130",
      "200",
      "600",
      "250",
    ],
    correctIndex: 0,
  },

  'Loss Random Variable': {
    question:
      "In an insurance model, the loss random variable X refers to what?",
    // 1: that is the payment variable · 2: a piece of the retained loss, not X · 3: unrelated pricing quantity
    options: [
      "The full ground-up loss amount, before any deductible or limit is applied",
      "The amount the insurer pays after the deductible and limit",
      "The amount the policyholder pays out of pocket",
      "The premium charged for the policy",
    ],
    correctIndex: 0,
  },

  'Payment Random Variable': {
    question:
      "A policy has a $200 deductible, 75% coinsurance, and a $900 benefit limit. A loss of $1,500 occurs. What does the insurer pay?",
    // 1: forgets the limit (0.75 × 1,300) · 2: forgets the coinsurance · 3: applies coinsurance to the full loss, skipping deductible and limit
    options: [
      "$675",
      "$975",
      "$900",
      "$1,125",
    ],
    correctIndex: 0,
  },

  'Binomial Distribution': {
    question:
      "Which situation is correctly modeled by a binomial distribution?",
    // 1: hypergeometric (without replacement, dependent) · 2: geometric (trials until first success) · 3: Poisson (rate over an interval)
    options: [
      "The number of heads in 20 independent flips of a fair coin",
      "The number of red cards drawn when dealing 5 cards without replacement",
      "The number of flips until the first head appears",
      "The number of claims arriving over a month at a constant rate",
    ],
    correctIndex: 0,
  },

  'Geometric Distribution': {
    question:
      "What does a geometric random variable count?",
    // 1: binomial (successes in fixed n) · 2: negative binomial (until the r-th success) · 3: Poisson (events in an interval)
    options: [
      "The number of independent trials up to and including the first success",
      "The number of successes in a fixed number of trials",
      "The number of trials needed to reach a fixed number r of successes",
      "The number of events occurring in a fixed time interval",
    ],
    correctIndex: 0,
  },

  'Hypergeometric Distribution': {
    question:
      "What most distinguishes the hypergeometric distribution from the binomial?",
    // 1: that is binomial's constant-p assumption · 2: false · 3: geometric
    options: [
      "Items are drawn without replacement, so the trials are not independent",
      "Each trial keeps the same success probability throughout",
      "The number of trials is unlimited",
      "It counts the number of trials until the first success",
    ],
    correctIndex: 0,
  },

  'Negative Binomial Distribution': {
    question:
      "What does a negative binomial random variable count?",
    // 1: geometric, the r = 1 special case · 2: binomial · 3: confuses the distribution with its parameter p
    options: [
      "The number of trials needed to achieve a fixed number r of successes",
      "The number of trials needed to achieve the very first success",
      "The number of successes in a fixed number of trials",
      "The long-run success rate p across many trials",
    ],
    correctIndex: 0,
  },

  'Poisson Distribution': {
    question:
      "Which property is characteristic of the Poisson distribution?",
    // 1: imports the binomial variance form np(1−p) · 2: that is binomial's setup · 3: describes overdispersion, not Poisson
    options: [
      "Its mean and variance are equal, both equal to λ",
      "Its mean is λ and its variance is λ(1 − λ)",
      "It requires a fixed number of trials n and success probability p",
      "Its variance is always strictly larger than its mean",
    ],
    correctIndex: 0,
  },

  'Uniform Discrete': {
    question:
      "Which experiment is modeled by a discrete uniform distribution?",
    // 1: binomial — middle values far more likely than extremes · 2: Poisson · 3: continuous (exponential)
    options: [
      "The outcome of a single roll of a fair six-sided die",
      "The number of heads in 10 fair coin flips",
      "The number of claims per month at a constant average rate",
      "The time until the next claim arrives",
    ],
    correctIndex: 0,
  },

  'Beta': {
    question:
      "What makes the Beta distribution natural for modeling proportions and probabilities?",
    // 1: that describes gamma/lognormal on (0, ∞) · 2: that is the normal · 3: that is the binomial (discrete)
    options: [
      "It is supported on the interval (0, 1)",
      "It is supported on all positive numbers, suiting loss severities",
      "It is symmetric and supported on the whole real line",
      "It counts the number of successes in n trials",
    ],
    correctIndex: 0,
  },

  'Exponential Distribution': {
    question:
      "The exponential distribution is 'memoryless.' What does that mean?",
    // 1: gambler's-fallacy misreading · 2: that is the Poisson's property · 3: describes a uniform distribution
    options: [
      "The chance of waiting an extra t units is the same no matter how long you have already waited",
      "The longer you have already waited, the sooner the event is likely to occur",
      "Its mean and variance are always equal",
      "Every value in its range is equally likely",
    ],
    correctIndex: 0,
  },

  'Gamma': {
    question:
      "Which statement about the gamma distribution is correct?",
    // 1: that is the beta's support · 2: gamma is continuous, not a count · 3: α = 1 gives the exponential, not the normal
    options: [
      "The sum of several independent exponential variables with a common scale is gamma-distributed",
      "The gamma distribution is defined only on the interval (0, 1)",
      "The gamma is a discrete distribution that counts events",
      "Setting its shape α = 1 makes it identical to a normal distribution",
    ],
    correctIndex: 0,
  },

  'Lognormal Distribution': {
    question:
      "A random variable X is lognormally distributed. Which statement is correct?",
    // 1: reverses which quantity is normal · 2: reverses which quantity is logged · 3: forgets the +σ²/2 term in E[X]
    options: [
      "The natural logarithm of X is normally distributed",
      "X itself is normally distributed, then shifted to be positive",
      "X is the logarithm of a normal random variable",
      "The mean of X equals e^μ, where μ is its log-mean",
    ],
    correctIndex: 0,
  },

  'Normal Distribution': {
    question:
      "X is normal with mean 50 and variance 25. What is the z-score for the value X = 60?",
    // 1: divides by the variance 25 instead of the SD 5 · 2: forgets to divide by the SD · 3: divides the raw value by the SD without subtracting the mean
    options: [
      "2.0",
      "0.4",
      "10",
      "12",
    ],
    correctIndex: 0,
  },

  'Uniform Continuous Distribution': {
    question:
      "Losses are uniform on (0, 20). What is P(X < 5)?",
    // 1: uses the density value 1/20 as the probability · 2: reports the interval length · 3: assumes any threshold splits it in half
    options: [
      "0.25",
      "0.05",
      "5",
      "0.50",
    ],
    correctIndex: 0,
  },

  // ─── Multivariate Random Variables ───────────────────────────────────

  'Multivariate Distribution': {
    question:
      "When do the marginal distributions of X and Y, on their own, fully determine their joint distribution?",
    // 1: the classic misconception that marginals always determine the joint · 2–3: irrelevant conditions
    options: [
      "Only when X and Y are independent",
      "Always — the marginals fully determine the joint distribution",
      "Only when X and Y have the same mean",
      "Only when both X and Y are discrete",
    ],
    correctIndex: 0,
  },

  'Order Statistics': {
    question:
      "Three independent observations are drawn from Uniform(0, 1). What is the expected value of the maximum?",
    // 1: reports the mean of a single uniform · 2: assumes the max of values on (0,1) is 1 · 3: uses k/n instead of k/(n+1)
    options: [
      "3/4",
      "1/2",
      "1",
      "2/3",
    ],
    correctIndex: 0,
  },

  'Independent Random Variables': {
    question:
      "Which statement about independent random variables is correct?",
    // 1: the false converse — zero covariance need not imply independence · 2: independence gives E[XY]=E[X]E[Y], not E[XY]=0 · 3: confuses independence with identical distribution
    options: [
      "If X and Y are independent, then Cov(X, Y) = 0",
      "If Cov(X, Y) = 0, then X and Y must be independent",
      "Independence requires E[XY] = 0",
      "Independent variables always share the same distribution",
    ],
    correctIndex: 0,
  },

  'Joint Probability Function': {
    question:
      "A joint PMF has p(0,0)=0.5, p(0,1)=0.2, p(1,0)=0.2, p(1,1)=0.1. What is P(X=1, Y=1)?",
    // 1: reports the marginal P(X=1) by summing a row · 2: multiplies the marginals (false independence) · 3: reads an adjacent cell
    options: [
      "0.10",
      "0.30",
      "0.09",
      "0.20",
    ],
    correctIndex: 0,
  },

  'Joint Cumulative Distribution Function': {
    question:
      "X and Y are independent, each Uniform on [0, 1]. What is F(0.4, 0.6) = P(X ≤ 0.4, Y ≤ 0.6)?",
    // 1: adds the two probabilities · 2: averages them · 3: takes the smaller of the two
    options: [
      "0.24",
      "1.00",
      "0.50",
      "0.40",
    ],
    correctIndex: 0,
  },

  'Conditional Probability Function': {
    question:
      "A joint PMF has p(0,0)=0.4, p(0,1)=0.2, p(1,0)=0.1, p(1,1)=0.3. What is P(X=1 | Y=1)?",
    // 1: uses the joint probability, forgetting to divide · 2: divides by P(X=1)=0.4 instead of P(Y=1) · 3: reports P(Y=1) itself
    options: [
      "0.6",
      "0.3",
      "0.75",
      "0.5",
    ],
    correctIndex: 0,
  },

  'Marginal Probability Function': {
    question:
      "A joint PMF has p(1,1)=0.2, p(1,2)=0.3, p(2,1)=0.1, p(2,2)=0.4. What is the marginal p_X(1)?",
    // 1: reports only the cell p(1,1), forgetting to sum over Y · 2: sums the wrong margin, giving p_Y(1) · 3: sums the entire table
    options: [
      "0.5",
      "0.2",
      "0.3",
      "1.0",
    ],
    correctIndex: 0,
  },

  'Moments for Joint Distributions': {
    question:
      "A joint PMF has p(0,0)=0.3, p(0,1)=0.2, p(1,0)=0.1, p(1,1)=0.4. What is E[XY]?",
    // 1: computes E[X]·E[Y], assuming independence · 2: sums all the probabilities · 3: reports E[X]
    options: [
      "0.40",
      "0.30",
      "1.00",
      "0.50",
    ],
    correctIndex: 0,
  },

  'Covariance': {
    question:
      "Given E[X] = 2, E[Y] = 4, and E[XY] = 10, what is Cov(X, Y)?",
    // 1: reports E[XY], forgetting to subtract E[X]E[Y] · 2: reports E[X]·E[Y] instead · 3: multiplies all three quantities
    options: [
      "2",
      "10",
      "8",
      "80",
    ],
    correctIndex: 0,
  },

  'Correlation Coefficient': {
    question:
      "If Cov(X, Y) = 6, Var(X) = 9, and Var(Y) = 16, what is the correlation ρ?",
    // 1: divides by the variances 9×16 instead of the SDs · 2: reports the unstandardized covariance · 3: divides by √(9+16)=5, giving an impossible value above 1
    options: [
      "0.5",
      "0.042",
      "6",
      "1.2",
    ],
    correctIndex: 0,
  },

  'Probabilities for Linear Combinations': {
    question:
      "X₁ ~ N(100, 10²) and X₂ ~ N(200, 15²) are independent. What is the standard deviation of X₁ + X₂?",
    // 1: adds the SDs instead of the variances · 2: subtracts, as if for a difference (and even then variances add) · 3: adds the SDs then square-roots
    options: [
      "√(10² + 15²) ≈ 18.0",
      "10 + 15 = 25",
      "15 − 10 = 5",
      "√(10 + 15) ≈ 5.0",
    ],
    correctIndex: 0,
  },

  'Moments for Linear Combinations': {
    question:
      "X₁ (variance 400) and X₂ (variance 900) are independent. What is Var(X₁ − X₂)?",
    // 1: subtracts the variances, as if Var(X−Y)=Var(X)−Var(Y) · 2: adds the SDs (20+30) then squares · 3: subtracts the SDs, (30−20)²
    options: [
      "1,300",
      "500",
      "2,500",
      "100",
    ],
    correctIndex: 0,
  },

  'Central Limit Theorem': {
    question:
      "For a large sample from a non-normal population with finite variance, what does the Central Limit Theorem guarantee?",
    // 1: misreads CLT as changing the population's data · 2: false — it holds regardless of the population's shape · 3: confuses CLT with the law of large numbers
    options: [
      "The distribution of the sample sum (or mean) is approximately normal",
      "The individual data values become normally distributed as n grows",
      "It applies only when the underlying population is already normal",
      "The sample variance shrinks toward zero as n grows",
    ],
    correctIndex: 0,
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  EXAM FM (Financial Mathematics) syllabus concepts
  // ═══════════════════════════════════════════════════════════════════════

  // ─── Time Value of Money ─────────────────────────────────────────────

  'Present Value': {
    question:
      "A fixed $1,000 is due in 5 years. If the interest rate used to value it rises from 4% to 6%, what happens to its value today?",
    // 0: confuses PV with FV (higher rate = more) · 2: treats PV as the nominal amount · 3: mechanical off-by-the-rate error
    options: [
      "It rises, since a higher rate earns more interest",
      "It falls, because future dollars are discounted more heavily",
      "It stays at $1,000, since that amount is fixed",
      "It rises by exactly 2%",
    ],
    correctIndex: 1,
  },

  'Current Value': {
    question:
      "Cash flows occur at times 0, 3, and 6. To find their value at a reference time of 4, how is each cash flow treated?",
    // 0: confuses with present value (time 0) · 1: confuses with accumulated/future value (end) · 3: ignores the time value of money
    options: [
      "All are discounted back to time 0",
      "All are accumulated forward to time 6",
      "Flows before time 4 are accumulated forward and flows after are discounted back to time 4",
      "All are simply added at face value, ignoring timing",
    ],
    correctIndex: 2,
  },

  'Accumulated Value': {
    question:
      "$1,000 is deposited today at 5% effective annual interest. Its value 3 years from now is closest to:",
    // 1: discounted instead of accumulated · 2: used simple instead of compound interest · 3: ignored interest entirely
    options: [
      "$1,157.63",
      "$863.84",
      "$1,150.00",
      "$1,000.00",
    ],
    correctIndex: 0,
  },

  'Interest Rate': {
    question:
      "An account grows from $500 to $540 in one year. What is the effective annual interest rate?",
    // 1: reports the interest amount rather than the rate · 2: mistakes the accumulation factor for the rate · 3: divides by the ending balance instead of the principal
    options: [
      "8%",
      "$40",
      "108%",
      "7.4%",
    ],
    correctIndex: 0,
  },

  'Simple Interest': {
    question:
      "$1,000 earns 10% simple interest. How much interest accrues during the third year?",
    // 1: applies compound interest (interest on interest) · 2: partial-compounding misconception · 3: reports cumulative interest instead of one year's
    options: [
      "$100 — the same as every year",
      "$121 — interest itself earns interest, so it grows each year",
      "$110 — the prior interest is added to principal first",
      "$300 — the total interest over the three years",
    ],
    correctIndex: 0,
  },

  'Compound Interest': {
    question:
      "$1,000 is invested for 2 years. Compared with 10% simple interest, 10% compound interest earns how much more total interest?",
    // 1: misses that compounding adds interest-on-interest · 2: reverses the direction · 3: grossly overstates the effect
    options: [
      "$10 more — from interest earned on the first year's interest",
      "The same, since the rate is identical",
      "$10 less, because compounding uses a discounted base",
      "$100 more, doubling the interest",
    ],
    correctIndex: 0,
  },

  'Accumulation Function': {
    question:
      "The accumulation function a(t) gives the time-t value of 1 invested at time 0. Which property must every valid a(t) satisfy?",
    // 1: confuses starting from zero with starting from one unit · 2: reverses the non-decreasing requirement · 3: mistakes simple interest's form for a universal requirement
    options: [
      "a(0) = 1",
      "a(0) = 0",
      "a(t) decreases as t increases",
      "a(t) must be linear in t",
    ],
    correctIndex: 0,
  },

  'Fund Accumulation': {
    question:
      "Two $1,000 deposits go into a fund earning 5%, one at the start of the year and one at the end. Versus depositing both at year-end, the year-end fund value is:",
    // 1: ignores timing / the time value of money · 2: reverses the timing effect · 3: irrelevant condition
    options: [
      "Higher, because the earlier deposit earns a year of interest",
      "The same, since $2,000 is deposited either way",
      "Lower, because splitting the deposits reduces interest",
      "Impossible to tell without a withdrawal schedule",
    ],
    correctIndex: 0,
  },

  'Future Value': {
    question:
      "A single deposit is left to grow for 10 years. If the interest rate is higher, its value at the end is:",
    // 1: confuses future value with present value · 2: treats FV as the nominal deposit · 3: invents a spurious condition
    options: [
      "Larger — more interest accumulates",
      "Smaller — a higher rate discounts it more",
      "Unchanged — the deposit amount is fixed",
      "Larger only under simple, not compound, interest",
    ],
    correctIndex: 0,
  },

  'Net Present Value': {
    question:
      "A project's net present value is exactly $0 at a discount rate of 8%. What does this tell you?",
    // 1: confuses zero NPV with zero cash flow · 2: ignores discounting · 3: misreads the breakeven point
    options: [
      "8% is the project's internal rate of return",
      "The project produces no cash inflows at all",
      "The project's total undiscounted profit is zero",
      "The discount rate must be raised to make the project viable",
    ],
    correctIndex: 0,
  },

  'Discount Factor': {
    question:
      "At an effective interest rate of 25%, what is the one-period discount factor v?",
    // 1: uses 1 − i instead of 1/(1+i) · 2: uses the accumulation factor 1 + i · 3: mistakes the rate itself for the factor
    options: [
      "0.80",
      "0.75",
      "1.25",
      "0.25",
    ],
    correctIndex: 0,
  },

  'Discount Rate': {
    question:
      "A lender quotes an annual effective discount rate d. Compared with the equivalent effective interest rate i, the value of d is:",
    // 1: reverses the relationship · 2: conflates the two rates · 3: spurious algebraic relationship
    options: [
      "Smaller than i, because the charge is collected up front",
      "Larger than i, because discounting is more expensive",
      "Exactly equal to i",
      "Equal to i², the rate squared",
    ],
    correctIndex: 0,
  },

  'Convertible m-thly': {
    question:
      "A nominal rate of 12% convertible monthly means interest is credited each month at what rate?",
    // 1: treats the nominal annual rate as the monthly rate · 2: ignores the monthly compounding · 3: forgets that compounding raises the effective annual rate above 12%
    options: [
      "1% per month, compounding to slightly more than 12% per year",
      "12% per month",
      "12% per year, credited once at year-end",
      "1% per month, compounding to exactly 12% per year",
    ],
    correctIndex: 0,
  },

  'Nominal Interest Rate': {
    question:
      "Two accounts each quote a 6% nominal annual rate, but one compounds monthly and the other annually. Which earns more over a year?",
    // 1: assumes less frequent compounding earns more · 2: treats the nominal rate as the actual earned rate · 3: misunderstands crediting
    options: [
      "The monthly-compounding account, because interest is credited more often",
      "The annual-compounding account, because it applies the full 6% at once",
      "They earn the same, since both quote 6%",
      "Neither earns interest until the year ends",
    ],
    correctIndex: 0,
  },

  'Effective Rate': {
    question:
      "Rate A is 7.0% compounded annually; Rate B is 6.9% compounded monthly. Which has the higher effective annual rate?",
    // 1: compares nominal rates directly, ignoring compounding · 2: assumes the frequencies cancel the gap · 3: reverses the compounding effect
    options: [
      "Rate B — monthly compounding more than offsets the lower nominal rate",
      "Rate A, because 7.0% is the larger stated rate",
      "They are identical once compounding is considered",
      "Rate A, because annual compounding always beats monthly",
    ],
    correctIndex: 0,
  },

  'Real Rate of Interest': {
    question:
      "The nominal interest rate is 8% and inflation is 3%. The real rate of interest is approximately:",
    // 1: adds instead of subtracting · 2: ignores inflation · 3: multiplies the rates
    options: [
      "About 5% (roughly the nominal rate minus inflation)",
      "About 11% (the nominal rate plus inflation)",
      "About 8% (inflation doesn't affect it)",
      "About 0.24% (nominal times inflation)",
    ],
    correctIndex: 0,
  },

  'Force of Interest': {
    question:
      "For a positive effective annual rate i, the equivalent force of interest δ is:",
    // 1: reverses the inequality · 2: treats them as identical · 3: that is the discount rate, not the force
    options: [
      "Slightly less than i",
      "Slightly more than i",
      "Exactly equal to i",
      "Equal to i/(1+i)",
    ],
    correctIndex: 0,
  },

  'Equation of Value': {
    question:
      "When setting up an equation of value, does the choice of comparison (valuation) date change the value you solve for?",
    // 1: the misconception that the present-value date is mandatory · 2: spurious monotonic claim · 3: misunderstands the method
    options: [
      "No — any common date yields the same solution for the unknown",
      "Yes — only time 0 (present value) gives the correct answer",
      "Yes — a later date always produces a larger unknown",
      "It works only if inflows and outflows occur at the same time",
    ],
    correctIndex: 0,
  },

  'Time Value of Money Equations': {
    question:
      "At a fixed positive rate, an investment compounds and doubles in a certain number of years. If the interest rate doubles, the doubling time roughly:",
    // 1: reverses the inverse relationship · 2: treats time as independent of rate · 3: nonsense
    options: [
      "Halves",
      "Doubles",
      "Stays the same",
      "Falls to zero",
    ],
    correctIndex: 0,
  },

  'Variable Force of Interest': {
    question:
      "The force of interest varies as δ(t). The accumulated value of 1 from time 0 to time n is found by:",
    // 1: treats it like a constant endpoint effective rate · 2: uses the endpoint force instead of integrating · 3: crude averaging shortcut
    options: [
      "Exponentiating the integral of δ(t) from 0 to n",
      "Computing (1 + δ(n))ⁿ",
      "Exponentiating δ(n) × n, using the force at time n",
      "Averaging δ(0) and δ(n), then compounding",
    ],
    correctIndex: 0,
  },

  'Nominal Interest Rate Convertible m-thly': {
    question:
      "The effective annual rate is 8%. The nominal rate convertible quarterly, i⁽⁴⁾, is:",
    // 1: conflates nominal with effective · 2: wrong direction (nominal < effective for m>1) · 3: confuses the annual nominal rate with the per-quarter rate
    options: [
      "Slightly less than 8%",
      "Exactly 8%",
      "Slightly more than 8%",
      "2%, since 8% ÷ 4 = 2%",
    ],
    correctIndex: 0,
  },

  'Effective Discount Rate': {
    question:
      "At an effective discount rate of 5%, a borrower who will repay $1,000 in one year receives how much today?",
    // 1: treats d as an interest rate (1/1.05) · 2: adds the discount instead of deducting it · 3: misplaces the timing of the discount charge
    options: [
      "$950 — the $50 discount is deducted up front",
      "$952.38 — found by dividing by 1.05",
      "$1,050 — the discount is added to the repayment",
      "$1,000 — the full amount, with the discount paid later",
    ],
    correctIndex: 0,
  },

  'Nominal Discount Rate Convertible m-thly': {
    question:
      "For the same effective annual rate and the same frequency m, how does the nominal discount rate d⁽ᵐ⁾ compare with the nominal interest rate i⁽ᵐ⁾?",
    // 1: reverses the inequality · 2: conflates discount and interest · 3: nonsense
    options: [
      "d⁽ᵐ⁾ is smaller than i⁽ᵐ⁾",
      "d⁽ᵐ⁾ is larger than i⁽ᵐ⁾",
      "They are equal",
      "d⁽ᵐ⁾ is always negative",
    ],
    correctIndex: 0,
  },

  // ─── Annuities / Cash Flows with Non-Contingent Payments ─────────────

  'Annuity Immediate': {
    question:
      "An annuity-immediate makes its first payment when?",
    // 1: 'immediate' term-matching trap → confuses with annuity-due (time 0) · 2: confuses with accumulated-value timing · 3: confuses with a single lump sum
    options: [
      "At the end of the first period (time 1)",
      "At the beginning of the first period (time 0)",
      "One period after the last payment",
      "Only at maturity, as a single lump sum",
    ],
    correctIndex: 0,
  },

  'Annuity Due': {
    question:
      "An annuity-due and an annuity-immediate have identical payments, term, and rate. How do their present values compare?",
    // 1: 'immediate = sooner' term-matching trap · 2: ignores timing · 3: right direction, wrong factor
    options: [
      "The due is larger, by a factor of (1+i)",
      "The immediate is larger, since 'immediate' means paid sooner",
      "They are equal, since the payments are identical",
      "The due is larger, by a factor of i",
    ],
    correctIndex: 0,
  },

  'Perpetuity': {
    question:
      "A perpetuity pays $100 at the end of every year forever, at 5% interest. Its present value is:",
    // 1: mistakes endless payments for infinite value · 2: uses the perpetuity-due formula (payments at period start) · 3: values only the first payment
    options: [
      "$2,000",
      "Infinite, since the payments never stop",
      "$2,100",
      "$100",
    ],
    correctIndex: 0,
  },

  'Payable m-thly': {
    question:
      "An annuity 'payable monthly' at an annual rate of 1 makes payments of what size each month?",
    // 1: misreads the annual total as the monthly payment · 2: spurious · 3: denies that monthly payments actually occur
    options: [
      "1/12 each month, totaling 1 per year",
      "1 each month, totaling 12 per year",
      "12 each month",
      "1 once per year, merely recorded monthly",
    ],
    correctIndex: 0,
  },

  'Payable Continuously': {
    question:
      "A continuous annuity's present value formula differs from the annuity-immediate's in that it:",
    // 1: spurious · 2: plausible-looking but wrong rate substitution · 3: denies the timing benefit of continuous payment
    options: [
      "Divides by the force of interest δ instead of i",
      "Divides by i², the rate squared",
      "Uses the discount rate d instead of i",
      "Is identical, since continuous timing doesn't change the value",
    ],
    correctIndex: 0,
  },

  'Level Payment Annuity': {
    question:
      "A level annuity pays $1,000 at the end of each year for 3 years at 5%. Which expression gives its present value?",
    // 1: ignores discounting · 2: treats three payments as one lump sum at year 3 · 3: computes the accumulated value instead of present value
    options: [
      "1000 × (1 − 1.05⁻³)/0.05",
      "1000 × 3, the sum of the payments",
      "1000 × 1.05⁻³",
      "1000 × (1.05³ − 1)/0.05",
    ],
    correctIndex: 0,
  },

  'Arithmetic Increasing Annuity': {
    question:
      "In an 'arithmetic increasing' annuity, the payments grow how?",
    // 1: confuses with a geometric annuity (constant %) · 2: spurious · 3: geometric growth (doubling)
    options: [
      "By a constant dollar amount each period (100, 200, 300, …)",
      "By a constant percentage each period (×1.05 each time)",
      "By a constant amount, but only every other period",
      "By doubling each period (100, 200, 400, …)",
    ],
    correctIndex: 0,
  },

  'Geometric Increasing Annuity': {
    question:
      "A pension pays $20,000 growing 3% each year. What makes this geometric rather than arithmetic?",
    // 1: describes arithmetic growth · 2: spurious · 3: confuses payment growth with rate growth
    options: [
      "Each payment is a fixed multiple (1.03×) of the previous one",
      "Each payment adds a fixed $3,000 to the previous one",
      "The payments rise and then fall",
      "The interest rate grows 3% per year",
    ],
    correctIndex: 0,
  },

  'Decreasing Annuity': {
    question:
      "A decreasing annuity pays 5, 4, 3, 2, 1 at the ends of years 1–5, while an increasing one pays 1, 2, 3, 4, 5. Which has the larger present value?",
    // 1: ignores that later dollars are discounted more · 2: ignores timing (both total 15) · 3: the ordering actually holds for any i > 0
    options: [
      "The decreasing annuity, because its larger payments arrive earlier",
      "The increasing annuity, because its largest payments come last",
      "They are equal, since both total 15",
      "It cannot be determined without the interest rate",
    ],
    correctIndex: 0,
  },

  'Continuous Annuity': {
    question:
      "Compared with an annuity-immediate paying 1 at each year-end, a continuous annuity paying at rate 1 per year over the same term has a present value that is:",
    // 1: misconception that spreading payments lowers value · 2: ignores within-year timing · 3: spurious condition
    options: [
      "Larger, because payments arrive continuously (on average sooner)",
      "Smaller, because the money is spread thinly across the year",
      "Identical, since both pay 1 per year in total",
      "Larger only when i is negative",
    ],
    correctIndex: 0,
  },

  'Term of Annuity': {
    question:
      "Solving aₙ = PV/P for the term gives n = 8.7. What does the non-integer result mean?",
    // 1: treats fractional periods as literal equal payments · 2: ignores that a 9th full payment would overpay · 3: misreads a valid fractional term as unsolvable
    options: [
      "8 full payments plus a smaller final (drop) payment",
      "The annuity runs exactly 8.7 years with equal payments throughout",
      "Round to 9 equal full payments with no adjustment",
      "The problem has no valid solution",
    ],
    correctIndex: 0,
  },

  'Level Annuity': {
    question:
      "For a level annuity, aₙ gives the present value and sₙ the accumulated value. At what date does sₙ value the payments?",
    // 1: that is aₙ's valuation date · 2: confuses accumulated value with present value · 3: spurious
    options: [
      "At the date of the final payment",
      "One period before the first payment",
      "At time 0, today",
      "Halfway through the term",
    ],
    correctIndex: 0,
  },

  'Level Perpetuity': {
    question:
      "How does a level perpetuity-due's present value compare with an otherwise identical perpetuity-immediate?",
    // 1: spurious factor · 2: reverses; perpetuities never end · 3: ignores the one-period timing shift
    options: [
      "Larger by exactly one payment (an extra payment received today)",
      "Exactly double",
      "Smaller, since due payments come first and end sooner",
      "Equal, since both continue forever",
    ],
    correctIndex: 0,
  },

  'Non-level Annuities': {
    question:
      "Which of the following is NOT a non-level annuity?",
    // 0 is the correct pick (it is level). 1: arithmetic non-level · 2: geometric non-level · 3: irregular non-level
    options: [
      "$500 at the end of each year for 10 years",
      "$100, $200, $300, … increasing each year",
      "Payments growing 4% every year",
      "$1,000 in year 1, nothing in year 2, then $3,000",
    ],
    correctIndex: 0,
  },

  'Arithmetic Progression': {
    question:
      "Payments form an arithmetic progression starting at $100 with common difference $50. What is the 4th payment?",
    // 1: treats it as geometric (×1.5) · 2: miscounts the term (100 + 4×50) · 3: adds the difference only once
    options: [
      "$250",
      "$337.50",
      "$300",
      "$150",
    ],
    correctIndex: 0,
  },

  'Geometric Progression': {
    question:
      "Payments form a geometric progression: $1,000, then growing 10% each year. What is the 3rd payment?",
    // 1: treats it as arithmetic (adds $100 twice) · 2: applies 30% growth at once · 3: grows for only one period
    options: [
      "$1,210",
      "$1,200",
      "$1,300",
      "$1,100",
    ],
    correctIndex: 0,
  },

  // ─── Loans ───────────────────────────────────────────────────────────

  'Loans': {
    question:
      "On an amortized loan, the outstanding balance at any time equals:",
    // 1: the classic incorrect formula that ignores accrued interest · 2: ignores discounting · 3: spurious
    options: [
      "The present value of the remaining payments",
      "The original principal minus the sum of payments made",
      "The remaining payments added up undiscounted",
      "The original principal minus total interest paid",
    ],
    correctIndex: 0,
  },

  'Principal': {
    question:
      "In a level-payment amortized loan, the principal (not interest) portion of each successive payment:",
    // 1: confuses level total payment with level principal · 2: reverses (that's the interest portion) · 3: ignores the interest component
    options: [
      "Increases over time, as the balance and its interest shrink",
      "Stays constant, since the total payment is level",
      "Decreases over time",
      "Equals the full payment every period",
    ],
    correctIndex: 0,
  },

  'Interest': {
    question:
      "In a level-payment amortized loan at rate i, the interest portion of the payment in period t equals:",
    // 1: treats it like flat/simple interest on the original balance · 2: ignores principal repayment · 3: wrong base
    options: [
      "i times the outstanding balance at the start of period t",
      "i times the original loan amount, every period",
      "The full level payment",
      "i times the payment amount",
    ],
    correctIndex: 0,
  },

  'Term of Loan': {
    question:
      "Two loans of equal amount and rate are repaid with level payments, one over 10 years and one over 20 years. The 20-year loan has:",
    // 1: misses that a longer term accrues more total interest · 2: reverses the payment direction · 3: ignores the extra interest
    options: [
      "A smaller payment but more total interest paid",
      "A smaller payment and less total interest",
      "A larger payment and less total interest",
      "The same total interest, just spread out",
    ],
    correctIndex: 0,
  },

  'Outstanding Balance': {
    question:
      "Immediately after the k-th payment, the outstanding balance of a level-payment loan is best found as:",
    // 1: the incorrect formula that ignores interest · 2: that is the amount subtracted, not the balance · 3: spurious
    options: [
      "The present value of the remaining n − k payments",
      "The original loan minus k times the payment",
      "The accumulated value of the k payments already made",
      "k times the payment, discounted",
    ],
    correctIndex: 0,
  },

  'Final Payment': {
    question:
      "A loan's term works out to a non-integer number of periods. The final payment is therefore:",
    // 1: denies the adjustment · 2: spurious · 3: misconception that the loan is already repaid
    options: [
      "Different from the regular payment — a smaller drop or larger balloon",
      "Always equal to the regular payment",
      "Always exactly double the regular payment",
      "Zero, since the loan is already repaid",
    ],
    correctIndex: 0,
  },

  'Drop Payment': {
    question:
      "A drop payment on a loan is:",
    // 1: that describes a balloon payment · 2: 'drop = skip' term-matching trap · 3: spurious
    options: [
      "A final payment smaller than the regular payment",
      "A final payment larger than the regular payment",
      "A skipped payment deferred to later",
      "The first payment, reduced to cover interest only",
    ],
    correctIndex: 0,
  },

  'Balloon Payment': {
    question:
      "A balloon-payment loan structure means:",
    // 1: that describes a drop payment · 2: spurious · 3: reverses the timing
    options: [
      "The final payment is larger than the regular payments",
      "The final payment is smaller than the regular payments",
      "Every payment inflates a little each period",
      "The first payment is the largest, then they shrink",
    ],
    correctIndex: 0,
  },

  'Amortization': {
    question:
      "Under standard loan amortization, what stays constant from payment to payment?",
    // 1: the interest portion decreases each period · 2: the principal portion increases each period · 3: the balance decreases each period
    options: [
      "The total payment amount",
      "The interest portion",
      "The principal portion",
      "The outstanding balance",
    ],
    correctIndex: 0,
  },

  'Loan Repayment Comparison': {
    question:
      "A loan can be repaid by the amortization method or the sinking-fund method. If the sinking fund earns a lower rate than the loan charges, the sinking-fund method is:",
    // 1: reverses the cost comparison · 2: ignores the rate gap · 3: misconception that a building fund is cost-free
    options: [
      "More expensive to the borrower",
      "Less expensive to the borrower",
      "Identical in cost, regardless of the fund's rate",
      "Free of interest, since a fund is accumulating",
    ],
    correctIndex: 0,
  },

  // ─── Bonds ───────────────────────────────────────────────────────────

  'Bonds': {
    question:
      "A bond's coupon rate exceeds its yield rate. The bond sells at:",
    // 1: reverses the premium/discount rule · 2: the equal-rates (par) case · 3: denies that price depends on yield
    options: [
      "A premium (price above redemption value)",
      "A discount (price below redemption value)",
      "Par (price equal to redemption value)",
      "Exactly its face value, whatever the rates",
    ],
    correctIndex: 0,
  },

  'Bond Price': {
    question:
      "After a bond is issued, market yields rise. The bond's price:",
    // 1: thinks higher yield means higher price · 2: treats price as static · 3: spurious conditional
    options: [
      "Falls",
      "Rises",
      "Stays fixed at the purchase price",
      "Rises if a premium bond, falls if a discount bond",
    ],
    correctIndex: 0,
  },

  'Book Value': {
    question:
      "After issuance, market yields change. A bond's book value is computed using:",
    // 1: confuses book value with market value · 2: wrong rate · 3: spurious
    options: [
      "The original yield rate locked in at purchase",
      "The current market yield",
      "The coupon rate",
      "Whichever rate is higher",
    ],
    correctIndex: 0,
  },

  'Market Value': {
    question:
      "A bond's market value differs from its book value because market value is found using:",
    // 1: that is book value's rate · 2: spurious · 3: wrong rate
    options: [
      "The current prevailing market yield",
      "The original yield locked in at purchase",
      "The face value divided by the coupon rate",
      "The coupon rate only",
    ],
    correctIndex: 0,
  },

  'Amortization of Premium': {
    question:
      "For a bond bought at a premium, amortization of premium makes the book value over time:",
    // 1: that is accumulation of discount · 2: denies that amortization occurs · 3: spurious
    options: [
      "Decrease toward the redemption value",
      "Increase toward the redemption value",
      "Stay constant at the purchase price",
      "Jump straight to face value",
    ],
    correctIndex: 0,
  },

  'Accumulation of Discount': {
    question:
      "For a bond bought at a discount, the book value over the bond's life:",
    // 1: that is premium amortization · 2: denies accumulation · 3: spurious
    options: [
      "Rises toward the redemption value",
      "Falls toward the redemption value",
      "Stays at the discounted purchase price",
      "Equals the coupon each period",
    ],
    correctIndex: 0,
  },

  'Redemption Value': {
    question:
      "The redemption value C of a bond is:",
    // 1: confuses redemption value with purchase price · 2: spurious · 3: false — it usually equals face value
    options: [
      "The amount paid to the holder at maturity",
      "The price paid to buy the bond",
      "The sum of all coupon payments",
      "Always strictly greater than the face value",
    ],
    correctIndex: 0,
  },

  'Face Value': {
    question:
      "A bond's face value primarily determines:",
    // 1: confuses face value with the price · 2: wrong driver · 3: that is the term
    options: [
      "The size of each coupon (face × coupon rate)",
      "The price an investor pays for the bond",
      "The yield the investor earns",
      "The number of coupons paid",
    ],
    correctIndex: 0,
  },

  'Yield Rate': {
    question:
      "A bond trades below its redemption value (at a discount). Its yield rate is therefore:",
    // 1: reverses (that's a premium bond) · 2: the par case · 3: misconception
    options: [
      "Higher than its coupon rate",
      "Lower than its coupon rate",
      "Equal to its coupon rate",
      "Zero, since it's discounted",
    ],
    correctIndex: 0,
  },

  'Coupon': {
    question:
      "After a bond is issued, market interest rates rise. Each coupon payment the holder receives:",
    // 1: confuses a fixed coupon with a floating rate · 2: spurious · 3: misconception that coupons reprice
    options: [
      "Stays the same fixed dollar amount",
      "Rises along with market rates",
      "Falls to keep the yield constant",
      "Is recomputed using the new yield",
    ],
    correctIndex: 0,
  },

  'Coupon Rate': {
    question:
      "A $1,000 face-value bond pays $45 annual coupons. Its annual coupon rate is:",
    // 1: confuses the dollar coupon with the rate · 2: conflates coupon rate with yield · 3: invents a semiannual assumption
    options: [
      "4.5%",
      "$45 — the coupon amount is the rate",
      "Equal to the bond's yield rate",
      "9%, since $45 is paid twice a year",
    ],
    correctIndex: 0,
  },

  'Term of Bond': {
    question:
      "Between two otherwise-identical bonds, the one with the longer time to maturity is:",
    // 1: reverses the duration relationship · 2: ignores term's effect on duration · 3: misconception
    options: [
      "More sensitive to interest rate changes",
      "Less sensitive to interest rate changes",
      "Equally sensitive, since the coupons match",
      "Insensitive to rates, being held to maturity",
    ],
    correctIndex: 0,
  },

  'Callable Bond': {
    question:
      "A callable bond gives the right to redeem early to whom, and when is it typically exercised?",
    // 1: reverses who holds the option and the rate direction · 2: right party, wrong rate direction · 3: wrong party
    options: [
      "The issuer, typically when interest rates have fallen",
      "The bondholder, when rates have risen",
      "The issuer, typically when rates have risen",
      "The bondholder, at any coupon date",
    ],
    correctIndex: 0,
  },

  'Non-Callable Bond': {
    question:
      "Compared with a callable bond, a non-callable bond eliminates which risk?",
    // 1: overstates — its price still moves with rates · 2: unrelated to the call feature · 3: spurious
    options: [
      "The risk of early redemption by the issuer",
      "All interest rate risk, fixing its price",
      "Default (credit) risk",
      "Reinvestment risk on the final redemption",
    ],
    correctIndex: 0,
  },

  'Call Price': {
    question:
      "The call price of a callable bond is:",
    // 1: confuses call price with the purchase price · 2: ignores the call premium · 3: spurious
    options: [
      "The amount the issuer pays to redeem early, usually at or above face value",
      "The market price a buyer pays for the bond",
      "Always exactly the face value",
      "The present value of the remaining coupons only",
    ],
    correctIndex: 0,
  },

  'Call Premium': {
    question:
      "A bond callable at $1,050 has a face value of $1,000. Its call premium is:",
    // 1: confuses call premium with the full call price · 2: confuses call premium with a purchase premium · 3: spurious
    options: [
      "$50",
      "$1,050 — the full call price",
      "The amount the purchase price exceeds face when bought at a premium",
      "$1,000, the face value",
    ],
    correctIndex: 0,
  },

  'Reinvestment of Coupons': {
    question:
      "A bond is bought to yield 7%, but its coupons can only be reinvested at 4%. The investor's realized annual return over the holding period will be:",
    // 1: ignores reinvestment risk · 2: reverses the effect · 3: overcorrects all the way to the reinvestment rate
    options: [
      "Below 7%, because coupons grow more slowly than assumed",
      "Exactly 7%, the purchase yield",
      "Above 7%, since extra interest accumulates",
      "Exactly 4%, the reinvestment rate",
    ],
    correctIndex: 0,
  },

  // ─── General Cash Flows, Portfolios & Asset-Liability Management ──────

  'Duration': {
    question:
      "Bond A has duration 3; Bond B has duration 9. For a given small change in yield, which bond's price moves more?",
    // 1: reverses the sensitivity relationship · 2: ignores duration as a sensitivity measure · 3: misconception
    options: [
      "Bond B — higher duration means greater rate sensitivity",
      "Bond A — lower duration means more movement",
      "Both move equally, since duration is just average time",
      "Neither moves, if held to maturity",
    ],
    correctIndex: 0,
  },

  'Convexity': {
    question:
      "Two bonds have equal duration, but Bond A has higher convexity. Bond A will:",
    // 1: ignores the second-order effect · 2: reverses the benefit · 3: spurious
    options: [
      "Gain more when yields fall and lose less when yields rise",
      "Move identically to Bond B, since the durations match",
      "Lose more when yields fall",
      "Have lower price sensitivity in every scenario",
    ],
    correctIndex: 0,
  },

  'Macaulay Duration': {
    question:
      "Macaulay duration is best described as:",
    // 1: that is modified duration (a sensitivity) · 2: that is just maturity, not PV-weighted · 3: spurious
    options: [
      "The present-value-weighted average time until the cash flows are received",
      "The percentage price drop per 1% rise in yield",
      "The number of years until the final cash flow",
      "The total count of cash flows",
    ],
    correctIndex: 0,
  },

  'Modified Duration': {
    question:
      "How does modified duration relate to Macaulay duration?",
    // 1: conflates the two · 2: reverses the factor · 3: spurious
    options: [
      "Modified = Macaulay ÷ (1+i), so it's slightly smaller",
      "They are always equal",
      "Modified = Macaulay × (1+i), so it's larger",
      "Modified = Macaulay², squared",
    ],
    correctIndex: 0,
  },

  'Portfolio': {
    question:
      "A portfolio holds $40,000 in a bond of duration 3 and $60,000 in a bond of duration 8. Its duration is:",
    // 1: ignores value-weighting (simple average) · 2: adds instead of averaging · 3: takes the maximum
    options: [
      "6.0 — the market-value-weighted average",
      "5.5 — the simple average of 3 and 8",
      "11 — the sum of the two durations",
      "8 — the larger of the two",
    ],
    correctIndex: 0,
  },

  'Spot Rate': {
    question:
      "When pricing a 3-year coupon bond from a spot-rate curve, each cash flow is discounted:",
    // 1: applies one rate to every cash flow · 2: spurious · 3: an approximation, not the exact method
    options: [
      "At the spot rate matching its own payment date",
      "All at the 3-year spot rate",
      "All at the 1-year spot rate",
      "At the average of the three spot rates",
    ],
    correctIndex: 0,
  },

  'Forward Rate': {
    question:
      "The 1-year spot rate is 4% and the 2-year spot rate is 5%. The 1-year forward rate for year 2 is:",
    // 1: confuses the forward with the far spot · 2: uses the near spot · 3: averages instead of compounding
    options: [
      "About 6%, above both spot rates",
      "5%, equal to the 2-year spot rate",
      "4%, equal to the 1-year spot rate",
      "4.5%, the average of the two spots",
    ],
    correctIndex: 0,
  },

  'Yield Curve': {
    question:
      "An 'inverted' yield curve is one where:",
    // 1: that is a normal curve · 2: that is a flat curve · 3: confuses the curve with premium pricing
    options: [
      "Short-term rates exceed long-term rates",
      "Long-term rates exceed short-term rates",
      "All maturities carry the same rate",
      "Bond prices exceed face value",
    ],
    correctIndex: 0,
  },

  'Cash Flow': {
    question:
      "In cash flow analysis, a negative cash flow at time t represents:",
    // 1: misconception that cash flows must be positive · 2: spurious · 3: confuses the sign with discounting
    options: [
      "An outflow or payment made at time t",
      "An error, since cash flows must be positive",
      "A flow that lowers the interest rate",
      "A future inflow discounted to today",
    ],
    correctIndex: 0,
  },

  'Duration Matching': {
    question:
      "Duration matching protects a portfolio against small interest rate changes by setting:",
    // 1: confuses duration with maturity · 2: spurious · 3: an insufficient / wrong condition
    options: [
      "Asset and liability durations equal (with equal present values)",
      "Asset and liability maturity dates equal",
      "The number of assets equal to the number of liabilities",
      "Asset yields equal to liability yields only",
    ],
    correctIndex: 0,
  },

  'Immunization': {
    question:
      "Beyond matching present values and durations, Redington immunization also requires that:",
    // 1: reverses the convexity inequality · 2: the boundary case, not the requirement · 3: drops the third condition
    options: [
      "Asset convexity exceed liability convexity",
      "Asset convexity be less than liability convexity",
      "Asset and liability convexity be identical",
      "Convexity be ignored entirely",
    ],
    correctIndex: 0,
  },

  'Full Immunization': {
    question:
      "Full immunization differs from Redington immunization in that it:",
    // 1: that is Redington's scope · 2: false — durations still match · 3: false — present values still match
    options: [
      "Protects against any single rate shift — by bracketing each liability with asset cash flows before and after it",
      "Only protects against very small parallel shifts",
      "Requires no duration matching at all",
      "Ignores present-value matching",
    ],
    correctIndex: 0,
  },

  'Redington Immunization': {
    question:
      "Redington immunization protects a portfolio's surplus against:",
    // 1: that is full immunization's scope · 2: beyond parallel-shift protection · 3: an unrelated risk
    options: [
      "Small, parallel shifts in the interest rate",
      "Any interest rate shift, large or small",
      "Changes in the shape (steepening) of the yield curve",
      "Credit defaults in the asset portfolio",
    ],
    correctIndex: 0,
  },

  '1st-Order Linear Approximation': {
    question:
      "The first-order (duration-based) approximation of a bond's price change is:",
    // 1: ignores that it is only a linear approximation · 2: spurious asymmetry · 3: confuses first and second order
    options: [
      "Approximate — it omits the convexity (curvature) correction",
      "Exact for any size of yield change",
      "Valid only when yields rise, not when they fall",
      "The same thing as the convexity adjustment",
    ],
    correctIndex: 0,
  },

  'Asset-Liability Portfolio': {
    question:
      "In an asset-liability portfolio, exact cash-flow matching differs from duration matching in that cash-flow matching:",
    // 1: that describes duration matching · 2: that describes duration matching · 3: the opposite of the method
    options: [
      "Funds each liability with an asset payment on the same date, leaving no reinvestment risk",
      "Only approximately protects value and still carries reinvestment risk",
      "Matches durations but not the timing of cash flows",
      "Ignores the timing of cash flows entirely",
    ],
    correctIndex: 0,
  },
}
