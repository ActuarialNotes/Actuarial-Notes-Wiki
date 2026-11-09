---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3894b2a2fec6f1619500dd61471974c7e75d9cfc744360c210f0006193dbbbcd
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Variable Importance.md
---

![[Media/Figures/Variable_Importance.svg|340]]

**Variable Importance** is a measure of how much a predictor contributes to a [[Tree Ensemble|tree ensemble]], which recovers some of the interpretability that one [[Decision Tree|decision tree]] has and hundreds of trees do not. The importance of predictor $X_j$ in a bagged model of $B$ trees is

> $$\mathrm{Imp}(X_j) = \frac{1}{B}\sum_{b=1}^{B}\ \sum_{\text{splits on } X_j \text{ in tree } b} \Delta I$$

- $\Delta I$ is the [[Node Impurity|impurity]] decrease of a split: the reduction in [[Residual Sum of Squares|RSS]] for regression trees, or in the [[Gini Index|Gini index]] for classification trees.

For each tree, sum the decreases of every split on the predictor, add these sums across the trees, and divide by $B$. A tree that never splits on a predictor contributes zero to its importance, but it still counts in the divisor $B$. Importances are usually reported rescaled so the largest is 100.

> [!example]- Three bagged fraud trees record the total Gini decrease from splits on each predictor. Which predictor is most important? {Example}
>
> | Tree | Prior claims | Claim amount | Days to report |
> |---|---|---|---|
> | 1 | $0.060$ | $0.025$ | $0$ |
> | 2 | $0.052$ | $0$ | $0.030$ |
> | 3 | $0.018$ | $0.041$ | $0.012$ |
>
> - Prior claims: $(0.060 + 0.052 + 0.018)/3 = 0.0433$.
> - Claim amount: $(0.025 + 0 + 0.041)/3 = 0.0220$.
> - Days to report: $(0 + 0.030 + 0.012)/3 = 0.0140$.
> - Rescaled so the largest is 100, the importances are $100$, $51$ and $32$, so prior claims is most important. Tree 3 alone would have ranked claim amount first.

## Permutation importance

Permutation importance shuffles the values of $X_j$ in the [[Out-of-Bag Error|out-of-bag]] observations and measures how far the accuracy falls. It is slower than impurity-based importance, but it is not biased toward predictors with many distinct values, as impurity-based importance is.

> [!example]- Shuffling territory in the out-of-bag data raises a forest's out-of-bag MSE from $40$ to $41$, and shuffling prior claims raises it to $55$. Which predictor matters more? {Example}
> - Breaking prior claims' link to the response costs $15$ in MSE, against $1$ for territory.
> - Prior claims is much more important.

## Reading an importance ranking

An importance says a predictor matters, not which way it moves the prediction. Its direction and shape need a [[Partial Dependence Plot|partial dependence plot]]. Correlated predictors split the credit between them, so either can look unimportant on its own, and dropping one makes the other's importance jump.

> [!trap] A low importance is not proof of no effect
> A predictor whose credit is taken by a correlated stronger one looks unimportant. Drop it, refit, and compare the [[Out-of-Bag Error|out-of-bag error]]: an unchanged error means it was redundant, and a higher error means its importance hid a real contribution.
