---
id: "masii-an-016"
exam: "Exam MAS-II"
topic: "Confusion Matrix"
learning_objective: "Statistical Learning"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Confusion+Matrix
answer: "D"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:85e8660fb6b77d65c24a7e9456d00070dbefdafef4454fe7a5b6137ec2e2e81e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-016.md
---

A claims fraud model is applied to a holdout set of 1,000 claims, of which 80 are fraudulent. At the chosen discrimination threshold the model flags 120 claims for investigation, and 50 of the flagged claims are fraudulent.

Calculate the specificity of the model at this threshold.

- A) 0.417
- B) 0.625
- C) 0.900
- D) 0.924
- E) 0.966

## Explanation

Fill in the confusion matrix:

| | Predicted fraud | Predicted not fraud | Total |
| :--- | ---: | ---: | ---: |
| Actual fraud | TP = 50 | FN = 30 | 80 |
| Actual not fraud | FP = 70 | TN = 850 | 920 |
| Total | 120 | 880 | 1,000 |

Specificity, the true negative rate, is the share of actual negatives the model correctly leaves alone:

$$
\text{Specificity} = \frac{TN}{TN + FP} = \frac{850}{920} = \mathbf{0.924}
$$

The answer is **D**.

**Why not the others**

- **A** — precision, $TP/(TP + FP) = 50/120$: of the flagged claims, the share that are fraud.
- **B** — sensitivity, $TP/(TP + FN) = 50/80$: of the fraudulent claims, the share caught.
- **C** — accuracy, $(TP + TN)/1{,}000 = 900/1{,}000$.
- **E** — negative predictive value, $TN/(TN + FN) = 850/880$, which divides across the *predicted* negatives rather than the actual ones.
