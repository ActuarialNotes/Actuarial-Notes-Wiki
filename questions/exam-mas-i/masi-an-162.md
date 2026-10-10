---
id: "masi-an-162"
exam: "Exam MAS-I"
topic: "Polynomial Regression"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Polynomial+Regression
  - Concepts/Confidence+Interval
  - Concepts/Ordinary+Least+Squares
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fafcfff73b841c73c29c345552b41003ae8b4ea0dca02b91e7011063ebddd8c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-162.md
---

Average claim severity (in \$000) is fitted as a quadratic in vehicle age $x$ (years):

$$
\hat f(x) = 2.8 + 0.75x - 0.04x^2
$$

The estimated covariance matrix of $(\hat\beta_0, \hat\beta_1, \hat\beta_2)$ is

$$
\hat{\mathbf{C}} = \begin{bmatrix} 0.16 & -0.035 & 0.0015 \\ -0.035 & 0.010 & -0.0006 \\ 0.0015 & -0.0006 & 0.0001 \end{bmatrix}
$$

Calculate the upper limit of the approximate 95% pointwise band $\hat f(6) \pm 2\,\text{SE}\big[\hat f(6)\big]$.

- A) Less than 6.10
- B) At least 6.10, but less than 6.60
- C) At least 6.60, but less than 6.95
- D) At least 6.95, but less than 7.30
- E) At least 7.30

## Explanation

The fitted value is

$$
\begin{align*}
\hat f(6) &= 2.8 + 0.75(6) - 0.04(36) \\
&= 5.86
\end{align*}
$$

With $\ell_0 = (1, 6, 36)$, the variance $\ell_0^\top \hat{\mathbf C}\,\ell_0$ weights each diagonal entry by the square of its $\ell_0$ term and each off-diagonal entry by **twice** the product of its two terms:

$$
\begin{align*}
\operatorname{Var}\big[\hat f(6)\big] &= 0.16 + 36(0.010) + 1296(0.0001) \\
&\quad + 2(6)(-0.035) + 2(36)(0.0015) + 2(216)(-0.0006) \\
&= 0.16 + 0.36 + 0.1296 - 0.42 + 0.108 - 0.2592 \\
&= 0.0784
\end{align*}
$$

$$
\begin{align*}
\text{SE} &= \sqrt{0.0784} \\
&= 0.28 \\[4pt]
\text{upper limit} &= 5.86 + 2(0.28) \\
&= 6.42
\end{align*}
$$

The answer is **B**: the band runs from about \$5,300 to \$6,420.

**Why not the others**

- **A** — adds twice the *variance* instead of twice the standard error: 5.86 + 2(0.0784) = 6.02.
- **C** — drops the intercept's variance and covariances, as if $\hat\beta_0$ were known: the variance becomes 0.2304 and the limit 5.86 + 2(0.48) = 6.82.
- **D** — weights each off-diagonal entry by the product once instead of twice: the variance becomes 0.364 and the limit 7.07.
- **E** — ignores the covariances altogether and uses only the diagonal: the variance becomes 0.6496 and the limit 7.47. The covariance terms largely offset the variances here, so leaving them out badly overstates the uncertainty.
