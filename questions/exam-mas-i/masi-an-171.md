---
id: "masi-an-171"
exam: "Exam MAS-I"
topic: "Noncentral Chi-Squared Distribution"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: remember
wiki_link:
  - Concepts/Noncentral+Chi-Squared+Distribution
  - Concepts/Chi-Squared+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:38bef719e55770201e96af04c8ce340de123861a9405f587bc7cad292fee972c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-171.md
---

$X_1, \dots, X_5$ are independent normal variables with common variance $\sigma^2$ and means $\mu_1, \dots, \mu_5$, not all zero. The statistic $Y = \sum_{i=1}^{5} X_i^2/\sigma^2$ has a noncentral chi-squared distribution with 5 degrees of freedom and noncentrality parameter $\theta = \sum_{i=1}^{5} \mu_i^2/\sigma^2 = 3$.

Determine $E[Y]$ and $\text{Var}(Y)$.

- A) $E[Y] = 5$ and $\text{Var}(Y) = 10$
- B) $E[Y] = 8$ and $\text{Var}(Y) = 16$
- C) $E[Y] = 8$ and $\text{Var}(Y) = 22$
- D) $E[Y] = 11$ and $\text{Var}(Y) = 22$
- E) $E[Y] = 11$ and $\text{Var}(Y) = 34$

## Explanation

With the noncentrality parameter defined as the full sum $\theta = \sum\mu_i^2/\sigma^2$, a $\chi^2(r, \theta)$ variable has

$$
\begin{align*}
E[Y] &= r + \theta \\
&= 5 + 3 \\
&= 8 \\[4pt]
\text{Var}(Y) &= 2r + 4\theta \\
&= 10 + 12 \\
&= 22
\end{align*}
$$

The mean is easy to check directly: $E[X_i^2/\sigma^2] = 1 + \mu_i^2/\sigma^2$, and summing over the five variables gives $r + \theta$ with $r = 5$. The answer is **C**.

**Why not the others**

- **A** — the central $\chi^2(5)$ moments, ignoring the nonzero means.
- **B** — treats $Y$ as a central chi-squared with $r + \theta = 8$ degrees of freedom, so the variance is 2 × 8 = 16; the noncentral variance grows by four times $\theta$, not twice.
- **D** — right variance, but adds twice $\theta$ to the mean, the formula for a parameter defined as *half* the sum.
- **E** — applies the half-sum convention's formulas (mean $r$ plus twice $\lambda'$, variance twice $r$ plus eight times $\lambda'$) to the full sum $\theta = 3$, doubling its effect on both moments.
