---
id: "masi-an-004"
exam: "Exam MAS-I"
topic: "Limited Expected Value"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Policy+Limit
  - Concepts/Inflation
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f6ac06b444fca2b9b4d2571f23920f0848dd7b6c2560c1ea6c27571a81d49fb5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-004.md
---

Let $X$ be a non-negative ground-up loss with a continuous distribution and finite mean, and let $u > 0$ be a policy limit. Determine which of the following statements about the limited expected value $E[X \wedge u]$ are true.

- I. $E[X \wedge u]$ is no greater than $u$ and no greater than $E[X]$.
- II. Raising the limit from $u$ to $u + h$, where $h > 0$, increases $E[X \wedge u]$ by at most $h \cdot \Pr(X > u)$.
- III. If every loss increases by 10% and the limit $u$ is unchanged, $E[X \wedge u]$ increases by exactly 10%.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is true.** $\min(X, u) \le u$ and $\min(X, u) \le X$ for every outcome, so taking expectations gives both inequalities.

**II is true.** For a non-negative loss, $E[X \wedge u] = \int_0^u \Pr(X > x)\,dx$, so

$$
E[X \wedge (u+h)] - E[X \wedge u] = \int_u^{u+h} \Pr(X > x)\,dx \le h \cdot \Pr(X > u)
$$

because the survival function never increases. Each extra dollar of limit is worth only the probability that a loss reaches it.

**III is false.** With inflated losses $X' = 1.1X$,

$$
E[(1.1X) \wedge u] = 1.1\,E\!\left[X \wedge \tfrac{u}{1.1}\right] \le 1.1\,E[X \wedge u]
$$

with strict inequality whenever $\Pr(X > u/1.1) > 0$. A fixed limit caps part of the inflation, so the limited expected value grows by **less** than 10%.

The true statements are I and II, so the answer is **B**.

**Why not the others**

- **A** misses that the survival function bounds the gain from raising a limit (II).
- **C** and **D** accept III, treating a fixed limit as if it inflated along with the losses; inflation passes through in full only when there is no limit, or when the limit is indexed too.
- **E** would require I or II to fail, but both follow directly from $\min(X, u)$ and the integral formula.
