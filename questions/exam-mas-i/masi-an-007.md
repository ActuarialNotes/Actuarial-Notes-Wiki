---
id: "masi-an-007"
exam: "Exam MAS-I"
topic: "Severity"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Severity
  - Concepts/Inflation
  - Concepts/Deductible
  - Concepts/Policy+Limit
  - Concepts/Limited+Expected+Value
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:899f3354d7e959a1ae84e3cc9531e71fa6511248132cbfcee8fc090e3801dd5b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-007.md
---

Ground-up loss severity $X$ has a continuous distribution on $(0, \infty)$ with finite mean. Next year every loss will be 10% larger. Policy terms are fixed in dollars unless a statement says otherwise.

Determine which of the following statements about the insurer's expected payment per loss are true.

- I. Under an ordinary deductible with no policy limit, it rises by more than 10%.
- II. Under a policy limit with no deductible, it rises by more than 10%.
- III. Under 80% coinsurance with no deductible and no limit, it rises by exactly 10%.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Write the inflated loss as $X' = 1.1X$ and pull the factor out of each payment.

**I is true.** With deductible $d$:

$$
E[(1.1X - d)_+] = 1.1\,E\!\left[\left(X - \tfrac{d}{1.1}\right)_+\right] > 1.1\,E[(X - d)_+]
$$

because the effective deductible falls to $d/1.1$. Losses that were just under the deductible now produce payments, so the insurer's severity is **leveraged** above the 10% trend.

**II is false.** With limit $u$:

$$
E[(1.1X) \wedge u] = 1.1\,E\!\left[X \wedge \tfrac{u}{1.1}\right] < 1.1\,E[X \wedge u]
$$

The fixed limit absorbs part of the growth in large losses, so the insurer's severity rises by **less** than 10%.

**III is true.** The payment on the inflated loss, $(0.8)(1.1X) = 1.1(0.8X)$, is a fixed proportion of the loss, so it inflates by exactly 10%.

The true statements are I and III, so the answer is **C**.

**Why not the others**

- **A** rejects III, but a proportional share of the loss inflates exactly as the loss does.
- **B** and **D** accept II, carrying the deductible's leverage over to a limit; a limit works the other way.
- **E** would require I or III to fail.
