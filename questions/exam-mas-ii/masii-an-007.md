---
id: "masii-an-007"
exam: "Exam MAS-II"
topic: "Statistical Learning"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Statistical+Learning
  - Concepts/Mean+Square+Error
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Test+Error
answer: "D"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a094a6167186896e96bed16fcdf4864ea2354acf49508533f712ff6032c3fe2
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §2.2.1-2.2.2, PDF pp.43-46: training MSE declines monotonically; U-shaped test MSE; 'Overfitting refers specifically to the case in which a less flexible model would have yielded a smaller test MSE'; 'the expected test MSE can never lie below Var(e)', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-007.md
---

An actuary fits a sequence of increasingly flexible models to predict claim severity, $Y = f(X) + \varepsilon$, and records each model's mean squared error (MSE) on the training data and on a large test set.

Determine which of the following statements are true.

- I. Once a model has started to overfit, the test MSE can be pushed below $\text{Var}(\varepsilon)$ by adding still more flexibility.
- II. As flexibility increases, the training MSE decreases, while the test MSE typically falls and then rises in a U-shape.
- III. A model is said to overfit when a less flexible model would have yielded a smaller test MSE.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I — false.** $\text{Var}(\varepsilon)$ is the irreducible error: no estimate of $f$, however flexible, can predict the noise in a new observation, so the expected test MSE can never fall below it. Extra flexibility after overfitting begins *raises* test MSE.
- **II — true.** Training MSE falls monotonically with flexibility, because the fitting procedure is minimising it. Test MSE first falls, as bias drops, then rises, as the variance of the fit grows faster than its bias shrinks — the U-shape.
- **III — true.** This is the definition: a small training MSE alongside a test MSE that a less flexible model would have beaten.

II and III only, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** — each counts statement I as true, the belief that enough flexibility can beat the irreducible error.
- **E** — would need all three true (or another combination); statement I is false.
