---
id: "masii-an-011"
exam: "Exam MAS-II"
topic: "Residual Sum of Squares"
learning_objective: "Statistical Learning"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Residual+Sum+of+Squares
  - Concepts/Decision+Tree
answer: "A"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:014c692f231397ec2c10e108cd36d03985f0fa246fa776fbeb2d2fc00d3e986b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §8.1.1, PDF p.338: regions chosen to minimize RSS (8.1); recursive binary splitting picks the cutpoint giving the greatest reduction in RSS, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-011.md
---

A regression tree is grown to predict claim severity $Y$ (in thousands) from vehicle age $X$. The six training observations are:

| $X$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| $Y$ | 4 | 6 | 5 | 11 | 13 | 12 |

The first split is chosen by recursive binary splitting among the cutpoints $X < 3$, $X < 4$ and $X < 5$.

Determine the cutpoint chosen and the total residual sum of squares (RSS) of the resulting two regions.

- A) $X < 4$, with total RSS 4.00
- B) $X < 4$, with total RSS 2.00
- C) $X < 5$, with total RSS 29.50
- D) $X < 3$, with total RSS 40.75
- E) $X < 5$, with total RSS 0.50

## Explanation

Each region predicts the mean of its responses, and the split chosen is the one that **minimizes** the total RSS of the two regions:

| Cutpoint | Left region | RSS | Right region | RSS | Total |
| :--- | :--- | ---: | :--- | ---: | ---: |
| $X < 3$ | 4, 6 (mean 5) | 2.00 | 5, 11, 13, 12 (mean 10.25) | 38.75 | 40.75 |
| $X < 4$ | 4, 6, 5 (mean 5) | 2.00 | 11, 13, 12 (mean 12) | 2.00 | **4.00** |
| $X < 5$ | 4, 6, 5, 11 (mean 6.5) | 29.00 | 13, 12 (mean 12.5) | 0.50 | 29.50 |

The answer is **A**.

**Why not the others**

- **B** — the RSS of one region only. The criterion is the sum over both regions.
- **C** — a valid total for $X < 5$, but not the smallest.
- **D** — the split with the *largest* total RSS. The tree minimizes RSS; it does not maximize the difference between the regions' means.
- **E** — judges $X < 5$ by its purer right region alone, ignoring the 29.00 in the left.
