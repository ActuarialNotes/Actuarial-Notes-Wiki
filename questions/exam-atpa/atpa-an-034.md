---
id: "atpa-an-034"
exam: "Exam ATPA"
topic: "Bayesian"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Bayesian
  - Concepts/Random+Effects
  - Concepts/Linear+Mixed+Model
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa764f28e09030d97d0b6a342fd1d632b726ec8b2fe57e5d29d583f412e349d9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-034.md
---

An actuary fits a Bayesian hierarchical model of loss ratio by territory. Each territory's effect has a normal prior with mean zero and variance $\tau^2$, and the global intercept and the slope on vehicle age have their own normal priors. The fitted effects of territories with little data are pulled almost all the way to zero, and the actuary believes territories differ more than that.

Which change to the model lets each thin territory keep more of its own deviation?

- A) Increase the prior variance of the global intercept
- B) Increase the prior variance of the slope on vehicle age
- C) Increase $\tau^2$, the prior variance of the territory effects
- D) Decrease $\tau^2$, the prior variance of the territory effects
- E) Increase the assumed residual variance within each territory

## Explanation

In a Bayesian hierarchical model the territory effects' normal prior plays the part of a random effect, and its variance $\tau^2$ plays the part of $\sigma_u^2$. A territory's effect is its average residual shrunk by the weight

$$
\frac{n_i\tau^2}{n_i\tau^2 + \sigma^2}
$$

which rises toward 1 as $\tau^2$ grows. A larger $\tau^2$ states a prior belief that territories differ more, so each one keeps more of its own data. The answer is **C**.

**Why not the others**

- **A** — the prior variance of the global intercept governs only the intercept, not the cluster effects.
- **B** — the same for the slope: it governs that parameter alone.
- **D** — a smaller $\tau^2$ shrinks every territory effect further toward zero, the opposite of what the actuary wants.
- **E** — a larger $\sigma^2$ makes each territory's data noisier, lowering the weight and shrinking more.
