---
id: "masi-an-001"
exam: "Exam MAS-I"
topic: "Probability Distributions"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: easy
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Probability+Distributions
  - Concepts/Poisson+Process
  - Concepts/Poisson+Distribution
  - Concepts/Exponential+Distribution
  - Concepts/Gamma
  - Concepts/Uniform+Continuous+Distribution
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Poisson+Thinning
  - Concepts/Mixed+Poisson+Process
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aa199f24fc66a37ba0b3f10b539259c8da0ed9d946603a4917a0f18dedcff6a7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-001.md
---

Claims on a block of policies arrive as a Poisson process with a constant rate $\lambda$ per year, except where Part c says otherwise. Match each random quantity to the family of distributions it follows. An option may be used more than once or not at all.

## Part a (1 point)
The time from the start of the year until the fourth claim.

- A) Poisson
- B) Exponential
- C) Gamma
- D) Uniform
- E) Negative binomial

### Answer
C

### Explanation
The waiting time to the $n$-th event of a Poisson process is the sum of $n$ independent exponential interarrival times, each with mean $\tfrac{1}{\lambda}$, so it is **gamma** with shape $n = 4$ and scale $\tfrac{1}{\lambda}$. **B** is the time to the *first* claim only; **A** counts claims in a fixed interval rather than timing them.

## Part b (1 point)
The number of claims in the first half of the year that exceed a deductible, when each claim exceeds it with probability 0.3, independently of the arrival process and of the other claims.

- A) Poisson
- B) Exponential
- C) Gamma
- D) Uniform
- E) Negative binomial

### Answer
A

### Explanation
Thinning a Poisson process keeps it Poisson: claims above the deductible form a Poisson process with rate $\lambda' = 0.3\lambda$, so the count in half a year is **Poisson** with mean $\lambda'/2 = 0.15\lambda$. Choosing **E** treats "count of successes" as negative binomial; that would need a random rate, not independent marking.

## Part c (1 point)
The number of claims next year for a policyholder chosen at random from a portfolio in which each policyholder has its own fixed rate, and those rates follow a gamma distribution across the portfolio.

- A) Poisson
- B) Exponential
- C) Gamma
- D) Uniform
- E) Negative binomial

### Answer
E

### Explanation
Given its rate, the policyholder's count is Poisson; averaging the Poisson over a gamma mixing distribution gives the **negative binomial**. **A** ignores the variation in rates across the portfolio, which makes the unconditional variance exceed the mean. **C** is the distribution of the *rate*, not of the count.

## Part d (1 point)
The time from now until the next claim, given that the most recent claim occurred two months ago.

- A) Poisson
- B) Exponential
- C) Gamma
- D) Uniform
- E) Negative binomial

### Answer
B

### Explanation
Interarrival times are exponential and memoryless, so the two months already elapsed change nothing: the remaining wait is **exponential** with mean $\tfrac{1}{\lambda}$. **C** would add the elapsed time back in as if a second stage were still to come.

## Part e (1 point)
Given that exactly one claim occurred during the year, the time within the year at which it occurred.

- A) Poisson
- B) Exponential
- C) Gamma
- D) Uniform
- E) Negative binomial

### Answer
D

### Explanation
Conditional on $N(1) = 1$, the arrival time of that one claim is **uniform** on $(0, 1)$: every instant is equally likely. **B** confuses this conditional arrival time with the unconditional time to the first claim, which can exceed one year.
