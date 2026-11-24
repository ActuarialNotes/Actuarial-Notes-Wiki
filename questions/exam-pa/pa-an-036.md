---
id: "pa-an-036"
exam: "Exam PA"
topic: "Boosting"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Boosting
  - Concepts/Hyperparameter
  - Concepts/Cross-Validation
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b22272e87df3daa6ab4a272c747a0d21f97161798a6b224ae87378cd5d47dbd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-036.md
---

An actuary fits a boosted tree model for claim severity with shrinkage $\lambda = 0.01$ and interaction depth $d = 2$. As the number of trees $B$ grows to 4,000, the training error keeps falling. The five-fold cross-validation error falls to its lowest point at $B = 900$ and rises steadily after that.

What should the actuary do?

- A) Use $B = 900$, the minimum of the cross-validation error
- B) Use $B = 4{,}000$, because the training error is still falling
- C) Keep $B = 4{,}000$ and fit each tree to a bootstrap sample, so that adding trees cannot overfit
- D) Raise the shrinkage to $\lambda = 0.5$ and keep $B = 4{,}000$, so the model learns faster
- E) Raise the interaction depth to $d = 6$, so that each tree fits more of the residuals

## Explanation

Each boosted tree is fitted to the residuals of the model so far. Past 900 trees the added trees are fitting noise in the residuals, which is why the cross-validation error rises while the training error keeps falling. Unlike bagging and random forests, boosting can overfit when $B$ is too large, so $B$ is a hyperparameter chosen by cross-validation. The answer is **A**.

**Why not the others**

- **B** chooses $B$ by training error, which always favours the most flexible model.
- **C** borrows the property of bagging. Boosting fits each tree to the full data with the updated residuals as the response, and it overfits when $B$ is too large because each added tree keeps fitting the residuals. Fitting each tree to a bootstrap sample would not change that.
- **D** moves the wrong way. A smaller shrinkage needs a larger $B$, and a larger shrinkage learns faster and needs fewer trees. At $\lambda = 0.5$ the cross-validation error would reach its minimum well before 900 trees, so keeping 4,000 leaves the model even further into fitting noise.
- **E** makes each tree more flexible, allowing interactions of up to 6 predictors, which moves further toward overfitting, not away from it.
