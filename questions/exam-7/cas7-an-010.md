---
id: "cas7-an-010"
exam: "Exam 7"
topic: "ODP Bootstrap Model"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: free-entry
bloom: understand
wiki_link:
  - Concepts/ODP+Bootstrap+Model
  - Concepts/Pearson+Residual
  - Concepts/Over-Dispersed+Poisson+Model
  - Concepts/Parameter+Risk
  - Concepts/Process+Risk
answer: "BDCEA"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:84866d41e903c772200e50c0e1aa832386bced7f8b6542f8e0f16156aa528dfb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-010.md
---

An actuary uses Shapland's ODP bootstrap model to simulate the distribution of unpaid claims from a triangle of paid losses. Put the following steps in the order they are carried out, from first to last. Enter the letters with no spaces, e.g. ABCDE.

- (A) Draw each projected future incremental value from a gamma distribution with mean $m$ and variance $\phi m$, and sum the draws to get the iteration's unpaid claims
- (B) Calculate volume-weighted development factors and divide the latest cumulative diagonal backwards to get the fitted incremental values
- (C) Sample a residual with replacement for every cell and form a pseudo triangle of incremental values
- (D) Calculate the unscaled Pearson residuals and the scale parameter $\phi$
- (E) Cumulate the pseudo triangle, recalculate the development factors, and project the future incremental values

## Explanation

Each step needs what the step before it produced:

1. **(B) Fit.** With a Poisson error, the ODP model's fitted incremental values $m_{w,d}$ equal those obtained by dividing the latest diagonal backwards with volume-weighted factors. Shapland calls this the "simplified GLM".
2. **(D) Residuals.** The unscaled Pearson residuals compare each actual incremental value with its fitted value, $r = (q - m)/\sqrt{m}$. The scale parameter $\phi = \sum r^2/(N - p)$ is calculated from them.
3. **(C) Resample.** In each iteration, a residual is drawn for every cell and turned back into a pseudo value, $q^{*} = r^{*}\sqrt{m} + m$.
4. **(E) Refit and project.** The pseudo triangle is cumulated and new factors are calculated, which projects the future incremental values. The spread of these projections across iterations is the **parameter** variance.
5. **(A) Process variance.** Each projected future value is drawn from a gamma with mean $m$ and variance $\phi m$. This adds **process** variance, and it is the last step of each iteration.

Steps C, E and A are repeated for each of the thousands of iterations; B and D are done once. The answer is **BDCEA**.

**Common wrong entries**

- **BDCAE** adds process variance before refitting. But the gamma draws need a mean, and in each iteration that mean is the future incremental value projected from the pseudo triangle in step E. Drawing first would add process variance to the original projection and leave parameter variance out of it.
- **BCDEA** resamples before the residuals exist. Step C draws from the pool of residuals that step D calculates, so D must come first. The pool also has to leave out the zero residuals in the triangle's corners.
- **DBCEA** calculates the residuals before the fit. A Pearson residual measures the gap between an actual and a *fitted* value, so the fitted values from step B are needed first.
