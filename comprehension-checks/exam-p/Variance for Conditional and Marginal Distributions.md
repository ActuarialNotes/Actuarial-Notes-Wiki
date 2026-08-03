---
concept: "Variance for Conditional and Marginal Distributions"
exam: exam-p
topic: "Multivariate Random Variables"
correct: A
---
Claim counts are Poisson with a mean $\Lambda$ that itself varies across policyholders. An analyst computes $\text{Var}(E[N \mid \Lambda])$ and reports it as $\text{Var}(N)$. What is wrong?

- A) That captures only the variation between policyholders, omitting the average variation within each one
- B) The outer variance should be dropped, leaving $E[N \mid \Lambda]$
- C) Nothing; the two quantities are always equal
- D) $E[\text{Var}(N \mid \Lambda)]$ should be subtracted from it rather than added

<!-- rationale: 1: that leaves a random variable, not a number · 2: they coincide only when the conditional variance is identically zero · 3: both terms are non-negative and are added, never subtracted -->
