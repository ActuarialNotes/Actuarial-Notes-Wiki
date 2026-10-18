---
id: "masii-an-014"
exam: "Exam MAS-II"
topic: "Backpropagation"
learning_objective: "Statistical Learning"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Backpropagation
  - Concepts/Neural+Network
answer: "C"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f88d1691cd2100cde104279071c943d1c8ea626774edc3c7b50b5c0da4b3343c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.7-10.7.1 eqs.(10.25)-(10.29), PDF pp.441-443: R(theta) = 1/2 sum (y - f)^2; theta <- theta - rho grad R (10.27); dR_i/dbeta_k = -(y_i - f(x_i)) g(z_ik) (10.29); 'a fraction of that residual gets attributed to each of the hidden units', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-014.md
---

A single-hidden-layer neural network for a quantitative response is trained by gradient descent on the objective

$$
R_i(\theta) = \tfrac{1}{2}\left(y_i - f_\theta(x_i)\right)^2, \qquad f_\theta(x) = \beta_0 + \sum_{k=1}^{K}\beta_k A_k .
$$

For one training observation, $y_i = 5.0$, the current prediction is $f_\theta(x_i) = 3.8$, and the second hidden unit's activation is $A_2 = 1.5$. The current value of $\beta_2$ is 0.6, and the learning rate is $\rho = 0.1$.

Calculate the value of $\beta_2$ after one gradient-descent step on this observation alone.

- A) 0.42
- B) 0.72
- C) 0.78
- D) 0.96
- E) 2.40

## Explanation

The chain rule gives the gradient with respect to an output-layer weight:

$$
\frac{\partial R_i}{\partial \beta_2} = \frac{\partial R_i}{\partial f_\theta(x_i)} \cdot \frac{\partial f_\theta(x_i)}{\partial \beta_2} = -\left(y_i - f_\theta(x_i)\right) A_2 = -(5.0 - 3.8)(1.5) = -1.8
$$

Gradient descent moves *against* the gradient:

$$
\beta_2 \leftarrow \beta_2 - \rho \frac{\partial R_i}{\partial \beta_2} = 0.6 - 0.1(-1.8) = \mathbf{0.78}
$$

The weight rises: the prediction was too low, and unit 2's activation was positive. Backpropagation hands each weight a share of the residual $y_i - f_\theta(x_i)$, scaled by the activation feeding it. The answer is **C**.

**Why not the others**

- **A** — moves *with* the gradient (0.6 + 0.1 × 1.8 = 0.42), which increases the loss.
- **B** — leaves out the activation $A_2$, using the residual alone as the gradient. A weight's share of the residual is proportional to the activation it multiplies.
- **D** — drops the $\tfrac12$ in $R_i$, doubling the gradient to $-3.6$.
- **E** — omits the learning rate, stepping by the full gradient.
