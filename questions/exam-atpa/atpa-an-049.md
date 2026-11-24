---
id: "atpa-an-049"
exam: "Exam ATPA"
topic: "Lift"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Lift
  - Concepts/Quantile+Plot
  - Concepts/Holdout+Sample
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28ed2ae2f2793e86604a7121540af9773fb4454d1682cd67c88cc356a332f5c1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-049.md
---

A modeler recommends replacing a pricing GLM with a GBM. The recommendation rests on decile plots built on the data both models were fit to: the GBM's actual loss costs run from 0.45 to 1.65 of the average, a lift of 3.7, while the GLM's run from 0.60 to 1.40, a lift of 2.3. Both models are monotonic and track their predictions closely.

Which critique of the recommendation is most valid?

- A) Lift should be read off each model's predicted values in the first and last deciles, which the modeler did not report
- B) The plots should be rebuilt on holdout data, because on the fitting data they flatter the more flexible GBM
- C) Both models should be shown on one decile plot whose deciles hold the same records, sorted by the GLM's predictions
- D) A lift above 3 is itself a sign of overfitting, so the GBM's larger lift counts against it rather than for it
- E) Lift is not a valid way to compare a GBM with a GLM, because the two models use different link functions

## Explanation

Lift is a model's ability to separate its best and worst risks, and it is measured on holdout data. On the data a model was fit to, a flexible model such as a GBM follows the noise in that data, so its quantiles separate further than they would on new business. A comparison on the fitting data therefore favours the GBM whether or not it predicts better. The plots should be rebuilt on holdout data before the lift is compared. The answer is **B**.

**Why not the others**

- **A** reverses the rule. Predictions rise across a model's own quantiles by construction; lift is read off the actual values.
- **C** misreads how the plots work. Each model's quantiles are sorted on its own predictions, so each model needs its own plot. A double lift chart is the direct comparison of two models.
- **D** invents a threshold. A larger lift on holdout data is what a better model shows; no size of lift is in itself evidence of overfitting.
- **E** is wrong because lift is measured on actual results by quantile, which can be done for any model that produces predictions, whatever its link.
