---
id: "masi-an-010"
exam: "Exam MAS-I"
topic: "Mixed Poisson Process"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Mixed+Poisson+Process
  - Concepts/Mixing+Distribution
  - Concepts/Poisson+Process
  - Concepts/Variance+for+Conditional+and+Marginal+Distributions
  - Concepts/Covariance
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:80b311c4a7aae7662161c9fd7a70cf38be4cc4b7d7c28e5c2e58eee73c0ff5f2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-010.md
---

An actuary has two years of claim counts for each of many insureds, and computes, per insured:

- mean count in one year: 0.20
- variance of a one-year count: 0.26
- variance of the two-year total count: 0.64

Three models are proposed. Each has a mean rate of 0.20 per year.

- **Model I.** Every insured's claims follow a Poisson process with rate 0.20.
- **Model II.** Each year, each insured's rate is drawn afresh, independently of the other year, from a distribution with mean 0.20 and variance 0.06. Given that year's rate, the year's count is Poisson.
- **Model III.** Each insured's rate is drawn once from a distribution with mean 0.20 and variance 0.06 and kept for both years: a mixed Poisson process.

## Part a (1 point)
Under Model III, calculate the variance of an insured's two-year total count. Give your answer to two decimal places.

### Answer
0.64

### Explanation
Given $\Lambda$, the two-year count is Poisson with mean $t\Lambda = 2\Lambda$. Conditioning on $\Lambda$:

$$
\begin{align*}
\text{Var}(N(2)) &= E[\text{Var}(N(2) \mid \Lambda)] + \text{Var}(E[N(2) \mid \Lambda]) \\
&= E[2\Lambda] + \text{Var}(2\Lambda) \\
&= 2(0.20) + 4(0.06) \\
&= \mathbf{0.64}
\end{align*}
$$

**Common wrong entries:** **0.52** doubles the one-year variance, as if the two years were independent; **0.58** adds the covariance between the years once instead of twice: $(0.26 + 0.26) + 0.06$.

## Part b (1 point)
Which model is consistent with all three statistics?

- A) Model I only
- B) Model II only
- C) Model III only
- D) Models II and III only
- E) Models I, II and III

### Answer
C

### Explanation
Compare each model's implied variances with the data:

| Model | One-year variance | Two-year variance |
|---|---|---|
| I | 0.20 | 0.40 |
| II | 0.20 + 0.06 = 0.26 | 2(0.26) = 0.52 |
| III | 0.20 + 0.06 = 0.26 | 2(0.20) + 4(0.06) = 0.64 |
| Data | 0.26 | 0.64 |

Only **Model III** reproduces both. Under it the two years share one rate, so their covariance is $\text{Var}(\Lambda) = 0.06$, and $\text{Var}(N(2)) = 0.26 + 0.26 + 2(0.06) = 0.64$.

**Why not the others**

- **A** — Model I has no rate variation, so its variance equals its mean; it misses the overdispersion already visible in one year.
- **B** and **D** — Model II matches one year, but a fresh rate each year makes the years independent, so it predicts 0.52 for two years. The one-year statistics cannot separate II from III; the two-year variance can.
- **E** includes Model I, which fails both variances.
