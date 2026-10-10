---
id: "masi-an-155"
exam: "Exam MAS-I"
topic: "Quasi-Likelihood"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Quasi-Likelihood
  - Concepts/Poisson+Regression
  - Concepts/Dispersion+Parameter
  - Concepts/Parameter+Estimate+Tables
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b03a008fe55b4eb21a48bceea3429e3c68a959b86559545cf73d073b991e10f0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-155.md
---

A Poisson claim-frequency GLM gives a coastal-territory coefficient of 0.30 with standard error 0.125, a Wald statistic of 2.4. Pearson's chi-square statistic divided by the residual degrees of freedom is 2.25, so the actuary refits the model as quasi-Poisson with $\text{Var}(Y) = \phi\mu$ and $\hat\phi = 2.25$.

Which of the following describes the coastal-territory row of the quasi-Poisson output?

- A) Estimate 0.133; standard error 0.125; test statistic 1.07
- B) Estimate 0.30; standard error 0.281; test statistic 1.07
- C) Estimate 0.20; standard error 0.083; test statistic 2.40
- D) Estimate 0.30; standard error 0.083; test statistic 3.60
- E) Estimate 0.30; standard error 0.188; test statistic 1.60

## Explanation

Under quasi-Poisson the variance is $\phi$ times the Poisson variance. In the iteratively reweighted least squares step every weight is divided by the same $\phi$, which cancels out of the estimating equations, so

- the coefficient is **exactly** the Poisson estimate, 0.30;
- the covariance matrix of the estimates is multiplied by $\phi$, so each standard error is multiplied by $\sqrt{\hat\phi}$.

$$
\begin{align*}
SE_Q &= 0.125\sqrt{2.25} \\
&= 0.125(1.5) \\
&= 0.1875 \\[4pt]
t &= \frac{0.30}{0.1875} \\
&= 1.60
\end{align*}
$$

The relativity $e^{0.30} = 1.35$ is unchanged, but the evidence for it weakens: the territory effect no longer looks significant at 5%. The answer is **E**.

**Why not the others**

- **A** — treats $\phi$ as a scale on the coefficient (0.30/2.25 = 0.133). The mean model is unchanged; $\phi$ only enters the variance.
- **B** — multiplies the standard error by $\hat\phi$ instead of $\sqrt{\hat\phi}$. $\phi$ scales the *variance*, so the standard error grows by $\sqrt{2.25} = 1.5$.
- **C** — rescales both the estimate and its standard error by 1.5, leaving the test unchanged. Overdispersion changes the uncertainty, not the fitted means.
- **D** — divides the standard error by $\sqrt{\hat\phi}$, as if extra variance made the estimate more precise. Ignoring overdispersion *understates* the standard errors.
