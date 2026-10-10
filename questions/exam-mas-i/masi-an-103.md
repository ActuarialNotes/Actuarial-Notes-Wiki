---
id: "masi-an-103"
exam: "Exam MAS-I"
topic: "Dispersion Parameter"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Dispersion+Parameter
  - Concepts/Quasi-Likelihood
  - Concepts/Poisson+Regression
  - Concepts/Parameter+Estimate+Tables
  - Concepts/p-Value
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:68e067535ba2c27b3f5fb833d7a9bde2a0e99c3f5d944b23adeb276c46504504
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-103.md
---

A Poisson GLM for claim counts is fitted to 1,200 records and estimates 10 parameters. Its Pearson chi-square statistic is 2,856. For one rating-variable indicator the output shows $\hat\beta = 0.085$ with a standard error of 0.040, computed with the dispersion fixed at 1.

The model is refitted as a quasi-Poisson model, with the dispersion estimated by the Pearson statistic divided by its degrees of freedom.

Calculate the two-sided p-value of the Wald test of $H_0: \beta = 0$ for this indicator after the refit.

- A) Less than 0.01
- B) At least 0.01, but less than 0.05
- C) At least 0.05, but less than 0.10
- D) At least 0.10, but less than 0.25
- E) At least 0.25

## Explanation

Estimate the dispersion from the Pearson statistic on $n - p$ degrees of freedom:

$$
\begin{aligned}
\hat\phi &= \frac{2{,}856}{1{,}200 - 10} \\
&= \frac{2{,}856}{1{,}190} \\
&= 2.40
\end{aligned}
$$

The refit leaves $\hat\beta$ unchanged (the quasi-likelihood estimating equations are the Poisson ones) and multiplies every standard error by $\sqrt{\hat\phi}$:

$$
\begin{aligned}
\text{SE} &= 0.040\sqrt{2.40} \\
&= 0.06197 \\
z &= \frac{0.085}{0.06197} \\
&= 1.372 \\
p &= 2\left[1 - \Phi(1.372)\right] \\
&= 0.170
\end{aligned}
$$

(Using a $t$ distribution with 1,190 degrees of freedom, as R does for a quasi-Poisson fit, gives the same 0.170.) The p-value is in range **D**: after allowing for overdispersion the indicator is no longer significant.

**Why not the others**

- **A** — multiplying the statistic by $\sqrt{\hat\phi}$ instead of dividing, $z = 0.085\sqrt{2.4}/0.040 = 3.29$, gives $p = 0.001$.
- **B** — ignoring the overdispersion, $z = 0.085/0.040 = 2.125$, gives $p = 0.034$: the original, overconfident Poisson result.
- **C** — the one-sided p-value, $p = 1 - \Phi(1.372) = 0.085$, for a test that is two-sided.
- **E** — scaling the standard error by $\hat\phi$ instead of $\sqrt{\hat\phi}$, $z = 0.085/(0.040 \times 2.4) = 0.885$, gives $p = 0.376$; $\hat\phi$ scales the *variance*.
