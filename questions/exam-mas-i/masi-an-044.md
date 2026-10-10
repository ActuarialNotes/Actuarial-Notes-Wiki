---
id: "masi-an-044"
exam: "Exam MAS-I"
topic: "Convergence in Probability"
learning_objective: "Statistics"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Convergence+in+Probability
  - Concepts/Consistency
  - Concepts/Law+of+Large+Numbers
  - Concepts/Unbiasedness
  - Concepts/Order+Statistics
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6aa39d77076d452be126df863366514e14858129db1d144ee8d0ed35e4f2bdbd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-044.md
---

Losses $X_1, X_2, \ldots, X_n$ are a random sample from a uniform distribution on $(0, \theta)$. Five estimators of $\theta$ are proposed.

Which estimator does **not** converge in probability to $\theta$ as $n \to \infty$?

- A) The largest loss, $X_{(n)}$
- B) $\sqrt{3 \cdot \frac{1}{n}\sum_{i=1}^{n} X_i^2}$
- C) Twice the sample median
- D) Twice the sample mean plus $n^{-1}$
- E) The first two losses summed, $X_1 + X_2$

## Explanation

Check each estimator's behaviour as $n$ grows: does its distribution pile up on $\theta$?

$X_1 + X_2$ uses only two observations, whatever $n$ is. It is unbiased, $E[X_1 + X_2] = \theta$, but its distribution — triangular on $(0, 2\theta)$, variance $\theta^2/6$ — never changes with $n$. For example, with $\varepsilon = 0.1\theta$,

$$
P\big(|X_1 + X_2 - \theta| > 0.1\theta\big) = 0.9^2 = 0.81
$$

for every $n$, which does not go to 0. The answer is **E**: being unbiased is not enough; an estimator must use the growing sample to concentrate.

**Why not the others**

- **A** — $P(|X_{(n)} - \theta| > \varepsilon) = (1 - \varepsilon/\theta)^n \to 0$. The maximum is biased low at every $n$ but consistent.
- **B** — by the weak law of large numbers, $\frac{1}{n}\sum X_i^2 \xrightarrow{p} E[X^2] = \theta^2/3$; the function $\sqrt{3u}$ is continuous, so the estimator converges to $\sqrt{\theta^2} = \theta$.
- **C** — the sample median converges in probability to the population median, $\theta/2$, because the density is positive there; doubling is continuous, so twice the median converges to $\theta$.
- **D** — twice the sample mean converges in probability to $\theta$ (twice $\theta/2$) by the weak law, and the added $n^{-1}$ goes to 0; a bias that vanishes does not stop convergence.
