---
id: "masii-an-013"
exam: "Exam MAS-II"
topic: "Activation Function"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Activation+Function
  - Concepts/Hidden+Layer
  - Concepts/Neural+Network
answer: "E"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e7de116b322f88b73e9c64a5c0a4c021413a5eb97ee42a3fa7f5754530940b3d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.1, PDF pp.411-413: parameters beta0..betaK and w10..wKp all estimated; Fig.10.1 caption 'these Ak are not directly observed. The functions hk(.) are not fixed in advance, but are learned during the training'; without a nonlinear g 'the model f(X) in (10.1) would collapse into a simple linear model', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-013.md
---

A pricing team fits a feed-forward neural network to a quantitative response with $p = 6$ predictors and a single hidden layer of $K = 10$ units, each with an activation function $g$, feeding a linear output layer.

Determine which of the following statements are true.

- I. If $g$ were the identity function, $g(z) = z$, the fitted network would reduce to a linear model in the six predictors.
- II. The network has 70 weights feeding the hidden layer (including the hidden units' biases) and 11 parameters in the output layer.
- III. The hidden-unit activations are not observed in the data: they are transformations of the predictors whose form is learned during training rather than fixed in advance.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I — true.** Each activation would be a linear combination of the inputs, and the output a linear combination of those, which is again linear in $X_1, \dots, X_6$. The non-linearity of $g$ is what lets the network represent curvature and interactions.
- **II — true.** Each of the 10 hidden units has a bias and one weight per predictor: 10 × (6 + 1) = 70. The output layer has an intercept and one coefficient per hidden unit: 10 + 1 = 11.
- **III — true.** The activations $A_k = g(w_{k0} + \sum_j w_{kj}X_j)$ are derived features, like basis functions, but their weights are estimated from the data rather than chosen beforehand. They are "hidden" because they are neither inputs nor targets.

All three statements are true, and the key has no "I, II and III" option, so the answer is **E**.

**Why not the others**

- **A** — misses statements II and III.
- **B** — misses statement III, treating hidden units as fixed basis functions chosen in advance, as splines are.
- **C** — misses statement II; the count is $K(p + 1)$ into the hidden layer and $K + 1$ in the output layer.
- **D** — misses statement I, the reason a network needs a non-linear activation at all.
