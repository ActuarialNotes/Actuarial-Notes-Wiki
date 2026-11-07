---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb1ff09e3cef4dfcb173ef3195a4041887ebebccc565c504e5db8ca3f146acb8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Random Forest.md
---

![[Media/Figures/Random_Forest.svg|340]]

A **Random Forest** is a set of [[Decision Tree|decision trees]] grown as in [[Bagging|bagging]], on [[Bootstrap|bootstrap]] samples, except that each split may use only a random subset of $m$ of the $p$ predictors. The typical number of predictors per split is

> $$m \approx \sqrt{p} \text{ for classification}$$

> $$m \approx p/3 \text{ for regression}$$

A fresh random sample of $m$ predictors is drawn at every split of every tree, not once per tree, and the $m$ are drawn without replacement, so exactly $m$ distinct predictors are considered. A random forest with $m = p$ is bagging, so bagging is the special case of a random forest that considers every predictor at each split.

> [!example]- A fraud classifier has $p = 36$ predictors, one far stronger than the rest. What $m$ is a starting point, and what happens at $m = 36$? {Example}
> - For classification, $m = \sqrt{36} = 6$.
> - At $m = 36$ the forest is bagging: the strong predictor is available at every split, so it is chosen at the top of nearly every tree and the trees are near-copies.

## Decorrelating the trees

Restricting each split to a random subset of predictors keeps a dominant predictor out of many splits, so the other predictors show through and the trees are less alike. Decorrelated trees have a smaller correlation $\rho$ in the [[Bagging#Variance of an average of correlated trees|variance of an average]], so averaging them reduces the variance more than bagging does. This makes random forests an improvement over bagging, especially with many correlated predictors.

A smaller $m$ decorrelates the trees more but weakens each tree. $m$ can be chosen by [[Out-of-Bag Error|out-of-bag error]]. As in bagging, adding trees does not cause overfitting.

> [!example]- Bagged trees have $\sigma^2 = 1$ and $\rho = 0.6$. A random forest's trees have $\sigma^2 = 1.2$ and $\rho = 0.3$. With 500 trees, which average has the smaller variance? {Example}
> - Bagging gives $0.6(1) + 0.4(1)/500 = 0.601$.
> - The random forest gives $0.3(1.2) + 0.7(1.2)/500 = 0.362$.
> - The forest's average has the smaller variance, though each of its trees varies more.

> [!trap] A new subset at every split
> The $m$ predictors are not chosen once for each tree. A new subset is drawn at every split, so one tree can use all $p$ predictors across its splits.
