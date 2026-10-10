---
id: "discda-an-213"
exam: "Exam DISC-DA"
topic: "Claims Modeling Dataset"
learning_objective: "Preparing Data for Insurance Applications"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Claims+Modeling+Dataset
answer: "D"
points: 1
---

A claims model will flag, at first report, claims likely to exceed \$50,000 incurred within 18 months of report. The extract is valued at 2025-06-30.

| Claim | Report date | Incurred at 18 months | Incurred at valuation |
| :--- | :--- | ---: | ---: |
| K1 | 2023-01-10 | 62,000 | 75,000 |
| K2 | 2023-09-01 | 30,000 | 70,000 |
| K3 | 2024-03-15 | — | 80,000 |
| K4 | 2023-12-31 | 55,000 | 55,000 |

With the target defined consistently for every claim, how many rows does the training data have, and how many are positive?

- A) 4 rows with 4 positives
- B) 4 rows with 3 positives
- C) 3 rows with 3 positives
- D) 3 rows with 2 positives

## Explanation

Every claim's target is measured at the same age, 18 months after report, and a claim is usable only if it has reached that age by the valuation date.

- **K1:** 18 months is 2024-07-10. Incurred \$62,000 > \$50,000, so a positive.
- **K2:** 18 months is 2025-03-01. Incurred \$30,000, so a negative, even though it has since grown.
- **K3:** 18 months would be 2025-09-15, after the valuation date, so it has no target yet and is excluded.
- **K4:** 18 months is 2025-06-30, the valuation date. Incurred \$55,000, so a positive.

Three rows, two positive. The answer is **D**.

**Why not the others**

- **A** — uses incurred at the valuation date for every claim, including K3, mixing claims of different ages.
- **B** — includes the immature K3 and labels K2 by its current value while labeling K3 by its current value too; the target is not consistent.
- **C** — drops K3 correctly but labels K2 by its current \$70,000 rather than its 18-month value.
