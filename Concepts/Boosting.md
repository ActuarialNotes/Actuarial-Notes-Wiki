---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:59c2ab34b6533411a43d80050a39d98de15c7b3fe33e36130a8370c7c3bacce6
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.2.3 Algorithm 8.2, eqs (8.10)-(8.12), and the tuning parameters, p.347 (PDF 355), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Boosting.md
---

![[Media/Figures/Boosting.svg|340]]

**Boosting** is a method that grows [[Decision Tree|decision trees]] sequentially, each small tree fitted to the residuals of the model so far, and adds a shrunken version of each to the model. The boosted model is

> $$\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$$

- $\hat{f}^{b}$ is the $b$th tree.
- $\lambda$ is the shrinkage parameter, or learning rate, a small positive number.

The model's prediction is the sum of the trees' predictions, each multiplied by $\lambda$. Shrinking each tree makes the model learn slowly, and many small corrections fit better than one large one. Where [[Bagging|bagging]] fits independent trees to reduce variance, boosting reduces bias.

> [!example]- A boosted model with $\lambda = 0.1$ has two trees, which predict $50$ and $30$ at a point $x$. What does the model predict there? {Example}
> - Each tree contributes $\lambda$ times its prediction: $0.1(50) = 5$ and $0.1(30) = 3$.
> - $\hat{f}(x) = 5 + 3 = 8$.

## Boosting regression trees

The algorithm for regression trees (James et al., Algorithm 8.2) is:

1. Set $\hat{f}(x) = 0$ and $r_i = y_i$ for every training observation, so the first tree is fitted to the responses themselves.
2. For $b = 1, \ldots, B$, fit a tree $\hat{f}^{b}$ with $d$ splits to the data $(X, r)$, then update the model and the residuals.
3. Output the boosted model $\hat{f}(x) = \sum_{b=1}^{B}\lambda\hat{f}^{b}(x)$.

The update after tree $b$ is

> $$\hat{f}(x) \leftarrow \hat{f}(x) + \lambda \hat{f}^{b}(x)$$

> $$r_i \leftarrow r_i - \lambda \hat{f}^{b}(x_i)$$

There is no bootstrap sampling: each tree is fitted to the full data with the updated residuals as the response.

> [!example]- An observation has $y = 20$. With $\lambda = 0.1$, the first tree predicts $18$ for it and the second, fitted to the residuals, predicts $15$. What is its residual after two trees? {Example}
> - The first residual is $r = 20$.
> - After the first tree, $r = 20 - 0.1(18) = 18.2$.
> - After the second, $r = 18.2 - 0.1(15) = 16.7$.

## Tuning parameters

| Parameter | Meaning | Typical |
| :--- | :--- | :--- |
| $B$ | number of trees | chosen by [[Cross-Validation]] |
| $\lambda$ | shrinkage, or learning rate | $0.01$ or $0.001$; a smaller $\lambda$ needs a larger $B$ |
| $d$ | number of splits in each tree, the interaction depth | often $1$ to $4$ |

With $d = 1$ each tree is a stump, and the model is additive. A depth of $d$ allows interactions of up to $d$ predictors. Unlike bagging and [[Random Forest|random forests]], boosting can overfit if $B$ is too large, because each added tree keeps fitting the residuals. Because it learns slowly, its test error can keep falling over many trees and end below that of bagging and random forests.

> [!example]- A boosted model with $\lambda = 0.01$ and $d = 2$ has training error still falling at $B = 5{,}000$, but cross-validation error lowest at $B = 1{,}200$ and rising after. How many trees should be used? {Example}
> - Beyond $1{,}200$ trees, the added trees fit noise in the residuals.
> - The model should use $B = 1{,}200$, the minimum of the cross-validation error.
