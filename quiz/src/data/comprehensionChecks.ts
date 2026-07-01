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
}
