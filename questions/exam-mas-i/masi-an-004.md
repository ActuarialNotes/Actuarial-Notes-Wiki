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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f6ac06b444fca2b9b4d2571f23920f0848dd7b6c2560c1ea6c27571a81d49fb5
  sources:
    - "CAS Exam MAS-I Tables (excerpts from the appendices to Loss Models, 2nd ed.), A.2.4.1/A.3.3.1 limited expected value E[X^x] definitions, PDF pp.10, 12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 (E(Y^L)=integral of survival function from d), 3.4.3 (inflated per-loss cost (1+r)[E(X^u/(1+r)) - E(X^d/(1+r))]), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
