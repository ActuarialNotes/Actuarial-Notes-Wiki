---
id: "masi-an-015"
exam: "Exam MAS-I"
topic: "Negative Binomial Distribution"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Mixed+Poisson+Process
  - Concepts/Mixing+Distribution
  - Concepts/Gamma
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b4358ccbee7dde985b68ed88713ad9419ef3d417de97cda1f94a354117a9ad7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-015.md
---

Each insured's annual claim rate $\Lambda$ follows a gamma distribution with $\alpha = 3$ and $\theta = 0.1$. Given $\Lambda$, the insured's claims follow a Poisson process.

Calculate the probability that a randomly selected insured has exactly one claim in a 2-year period.

- A) Less than 0.10
- B) At least 0.10, but less than 0.18
- C) At least 0.18, but less than 0.25
- D) At least 0.25, but less than 0.31
- E) At least 0.31

## Explanation

Given $\Lambda$, the count over $t = 2$ years is Poisson with mean $t\Lambda$, and $t\Lambda$ is gamma with $\alpha = 3$ and scale $\theta t = 0.2$. A gamma mixture of Poissons is negative binomial with $r = \alpha = 3$ and $\beta = \theta t = 0.2$:

$$
\begin{align*}
P(N = 1) &= \frac{r\,\beta}{(1 + \beta)^{r + 1}} \\
&= \frac{3(0.2)}{1.2^{4}} \\
&= \frac{0.6}{2.0736} \\
&= 0.2894
\end{align*}
$$

This lies in **D**.

**Why not the others**

- **A**: $p = 1/(1 + \beta)$ placed where $(1 - p)$ belongs gives $P = 3(1/6)^3(5/6) = 0.0116$.
- **B**: dividing by the time, $\beta = \theta/t = 0.05$, gives 0.1234.
- **C**: forgetting the 2-year period, $\beta = 0.1$, gives the 1-year probability 0.2049.
- **E**: a Poisson with the same mean, $P = 0.6\,e^{-0.6} = 0.3293$, ignores the variation in rates; reporting $P(N = 0) = 1.2^{-3} = 0.5787$ answers the wrong count.
