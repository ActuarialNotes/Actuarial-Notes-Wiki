---
id: "masii-an-021"
exam: "Exam MAS-II"
topic: "Predictive Accuracy"
learning_objective: "Statistical Learning"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Predictive+Accuracy
  - Concepts/Gini+Index
answer: "D"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:01620c3e47ab2e42554f06cd21cba3146a0f62f15e31ecce645004c63d41aa2e
  sources:
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §3.2 Gini Index (for Lift), PDF pp.4-7: aggregate by predicted loss cost; x cumulative exposure, y cumulative loss; G = 1 - sum (x_j - x_(j-1))(y_(j-1) + y_j), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.4 The Gini Index, printed pp.80-81 (PDF 90-91): twice the area between the Lorenz curve and the line of equality, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-021.md
---

A pure premium model is scored on holdout data. Aggregated by predicted loss cost and sorted from lowest to highest prediction, the data are:

| Predicted loss cost | 40 | 60 | 80 | 100 | 150 |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Exposure | 2.0 | 3.0 | 2.0 | 2.0 | 1.0 |
| Loss | 40 | 120 | 140 | 200 | 500 |

The model's segmentation power is measured by the Gini index from its Lorenz curve, with the area under the curve calculated by the trapezoidal method.

Calculate the Gini index.

- A) 0.235
- B) 0.265
- C) 0.470
- D) 0.530
- E) 0.765

## Explanation

The Lorenz curve plots cumulative share of exposure ($x$) against cumulative share of loss ($y$), in order of predicted loss cost. Totals are 10 exposures and 1,000 of loss:

| $j$ | $x_j$ | $y_j$ | $(x_j - x_{j-1})(y_{j-1} + y_j)$ |
| ---: | ---: | ---: | ---: |
| 0 | 0.0 | 0.00 | |
| 1 | 0.2 | 0.04 | 0.008 |
| 2 | 0.5 | 0.16 | 0.060 |
| 3 | 0.7 | 0.30 | 0.092 |
| 4 | 0.9 | 0.50 | 0.160 |
| 5 | 1.0 | 1.00 | 0.150 |
| | | Sum | 0.470 |

The area under the curve is half the sum, 0.235. The Gini index is twice the area between the line of equality (area 0.5) and the curve:

$$
G = 2(0.5 - 0.235) = 1 - 0.470 = \mathbf{0.530}
$$

The answer is **D**.

**Why not the others**

- **A** — the area *under* the Lorenz curve, not between it and the line of equality.
- **B** — the area between the curve and the line, without doubling.
- **C** — the trapezoid sum itself, which is twice the area under the curve.
- **E** — one minus the area under the curve; the area under the line of equality is 0.5, not 1.
