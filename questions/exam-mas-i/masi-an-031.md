---
id: "masi-an-031"
exam: "Exam MAS-I"
topic: "Random Sample"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Random+Sample
  - Concepts/Sample+Mean
  - Concepts/Sample+Variance
  - Concepts/Unbiasedness
  - Concepts/Order+Statistics
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f2641b1b6ee8e1fa16618b0b7406f63ede73a6a42b28c2c449ec1009a9d85ef2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-031.md
---

Claim sizes $X_1, \ldots, X_n$ are a random sample from a continuous distribution with CDF $F$, mean $\mu$ and finite variance $\sigma^2 > 0$. Let $\bar{X}$ be the sample mean, $S^2 = \frac{1}{n-1}\sum (X_i - \bar{X})^2$ the sample variance, and $X_{(n)}$ the largest claim.

Determine which of the following statements are true.

- I. Because $E[S^2] = \sigma^2$, the sample standard deviation $S$ is an unbiased estimator of $\sigma$.
- II. Whatever the shape of $F$, $\text{Var}(\bar{X}) = \sigma^2/n$.
- III. For every $x$, $P(X_{(n)} \le x) = F(x)^n$.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Each statement uses one consequence of the observations being independent and identically distributed.

**I is false.** Unbiasedness does not survive a nonlinear transformation. The square root is concave, so by Jensen's inequality

$$
E[S] = E\big[\sqrt{S^2}\,\big] < \sqrt{E[S^2]} = \sigma
$$

whenever $S^2$ is not constant. $S$ is biased low, even though $S^2$ is unbiased for $\sigma^2$.

**II is true.** Independence makes the covariances vanish, and identical distribution makes every variance $\sigma^2$:

$$
\text{Var}(\bar{X}) = \frac{1}{n^2}\sum_{i=1}^{n}\text{Var}(X_i) = \frac{\sigma^2}{n}
$$

No normality is needed; normality is only needed for $\bar{X}$ to be *exactly* normal.

**III is true.** The largest claim is at most $x$ exactly when every claim is, and the claims are independent with common CDF $F$:

$$
P(X_{(n)} \le x) = \prod_{i=1}^{n} P(X_i \le x) = F(x)^n
$$

Only II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** all include I, which carries the unbiasedness of $S^2$ over to $S$; a square root of an unbiased estimator is not unbiased.
- **B** also drops III, as if the distribution of the maximum needed more than independence and a common CDF.
- **E** would follow from believing $\text{Var}(\bar{X}) = \sigma^2/n$ requires normal data, which would leave III alone true.
