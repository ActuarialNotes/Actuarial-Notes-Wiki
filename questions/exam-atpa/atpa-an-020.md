---
id: "atpa-an-020"
exam: "Exam ATPA"
topic: "Predictive Accuracy"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Predictive+Accuracy
  - Concepts/Quantile+Plot
  - Concepts/Gini+Index
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d0ed4441adc6f12582f2f19f7712d19cb37c48f62c9fc63de21ce7ba9a4f39b7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-020.md
---

An insurer will use a new pure premium model to set its overall rate level. Two candidates are scored on the same holdout data. Model B's prediction for every record is exactly 1.15 times Model A's. In four equal-exposure buckets sorted by Model A's prediction, Model A's actual-to-predicted ratios are 1.03, 0.97, 1.02 and 0.99.

Which holdout comparison shows which model is better suited to this use?

- A) The AUROC of each model
- B) The normalized Gini of each model
- C) The lift of each model, top bucket against bottom bucket
- D) The actual-to-predicted ratios of each model on a quantile plot
- E) No comparison, since two models that rank every record alike are equally accurate

## Explanation

Multiplying every prediction by 1.15 leaves the order of the records unchanged, so every measure that depends only on the order gives the two models the same value. Lift, the AUROC and the Gini index all depend only on the order.

The models differ in **calibration**. Model A's actual-to-predicted ratios average about 1.00. Model B's are Model A's divided by 1.15:

$$
\frac{1.03}{1.15} = 0.90, \quad \frac{0.97}{1.15} = 0.84, \quad \frac{1.02}{1.15} = 0.89, \quad \frac{0.99}{1.15} = 0.86
$$

so Model B over-predicts by about 15% in every bucket. Only a calibration measure such as the quantile plot's actual-to-predicted ratios shows this, and calibration is what matters for setting a rate level. The answer is **D**.

**Why not the others**

- **A** — the AUROC depends only on the order of the predictions, so it is identical for the two models.
- **B** — $\text{normalized Gini} = 2 \times \text{AUROC} - 1$, so it is identical too, and it is not a separate check.
- **C** — lift also depends only on the order, so both models show the same lift.
- **E** — confuses discrimination with predictive accuracy as a whole. The models rank alike but predict different levels, and calibration is a separate question.
