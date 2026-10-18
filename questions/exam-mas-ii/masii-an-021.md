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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01620c3e47ab2e42554f06cd21cba3146a0f62f15e31ecce645004c63d41aa2e
  sources: []
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
