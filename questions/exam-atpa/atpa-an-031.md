---
id: "atpa-an-031"
exam: "Exam ATPA"
topic: "Stacking"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Stacking
  - Concepts/Train-Test+Split
  - Concepts/Overfitting
answer: "A"
points: 1
---

A team wants to combine several models of claim frequency to improve accuracy, and to report an honest comparison of the combination with its base models. Which plan does both?

- A) Stack a GLM, a GBM and a neural network on their out-of-fold predictions, and compare all of them on a test set kept out of both levels
- B) Stack three GBMs that differ only in their learning rate on their out-of-fold predictions, and compare them on a test set kept out of both levels
- C) Stack a GLM, a GBM and a neural network on the predictions each makes for its own training records, and compare them on a separate test set
- D) Blend a GLM, a GBM and a neural network by fitting the meta-model on a hold-out part, and compare them on that same hold-out part
- E) Stack a GLM, a GBM and a neural network on their out-of-fold predictions, and compare them on the records used to fit the meta-model

## Explanation

Stacking gains most when the base models are each accurate and differ from one another, because their errors are then not perfectly correlated. The meta-model must learn from out-of-fold predictions, made by models that never saw the record. An honest comparison needs a test set that neither level has seen. Plan A meets all three. The answer is **A**.

**Why not the others**

- **B** — three GBMs that differ only slightly have highly correlated errors, so stacking them adds little accuracy, even though the comparison is honest.
- **C** — on its own training records a flexible model looks far more accurate than it is, so the meta-model gives most of the weight to whichever model overfits most.
- **D** — the blend's weights were chosen to fit the hold-out part, so its accuracy there is too good and the comparison favours the blend.
- **E** — the same flaw as D for a stack: the meta-model's weights were fitted to those records, so the stack's accuracy on them is too good.
