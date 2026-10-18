---
id: "masii-an-010"
exam: "Exam MAS-II"
topic: "Variable Importance"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Variable+Importance
  - Concepts/Residual+Sum+of+Squares
  - Concepts/Bagging
answer: "B"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:17f64e5d42c2468999060867b5fbeb97be8537fef68e1fe533193cf5a5c1525a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-010.md
---

A bagged model of $B = 3$ regression trees predicts pure premium. Every split in the three trees, with the predictor it splits on and the reduction in residual sum of squares (RSS) it achieves, is:

| Tree | Predictor | RSS reduction |
| :--- | :--- | ---: |
| 1 | Driver age | 400 |
| 1 | Territory | 150 |
| 1 | Driver age | 100 |
| 2 | Territory | 500 |
| 2 | Driver age | 120 |
| 3 | Driver age | 300 |
| 3 | Vehicle use | 260 |
| 3 | Vehicle use | 90 |

Variable importance is measured as the total reduction in RSS from splits on a predictor, averaged over all $B$ trees.

Calculate the variable importance of Territory.

- A) 81.3
- B) 216.7
- C) 325.0
- D) 500.0
- E) 650.0

## Explanation

Add every RSS reduction from a split on Territory, in every tree, then average over the $B = 3$ trees — including the tree where Territory never appears, which contributes 0:

$$
\text{Importance(Territory)} = \frac{150 + 500 + 0}{3} = \frac{650}{3} = \mathbf{216.7}
$$

For comparison, Driver age scores 920/3 = 306.7 and Vehicle use 350/3 = 116.7, so Territory ranks second. The answer is **B**.

**Why not the others**

- **A** — divides by all 8 splits in the ensemble rather than by the number of trees.
- **C** — the average reduction *per split on Territory* (650/2). That rewards a predictor used rarely but well and ignores how often the trees rely on it; it is also what averaging only over the trees that use Territory gives.
- **D** — the single largest split. Importance accumulates over every split and every tree, not the best one.
- **E** — the total over the trees, not averaged over $B$. It ranks the predictors the same way here, but it is not the measure defined.
