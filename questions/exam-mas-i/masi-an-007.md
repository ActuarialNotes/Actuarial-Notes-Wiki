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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:899f3354d7e959a1ae84e3cc9531e71fa6511248132cbfcee8fc090e3801dd5b
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.3 (inflated per-loss variable with fixed d and u; coinsurance factor scales payment), 3.4.1 (ordinary deductible), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge, 2009), publisher preview: table of contents, contents: 2.2 continuous severity distributions, 2.3 mixtures, 2.4 tail properties, 2.5 coverage modifications incl. 2.5.4 inflation, PDF pp.9-10 (contents only; text not read), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
