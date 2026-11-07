---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:73f5b5a174418f62ed77ff1677193d8228db63254712e3f8637d5629172ea8e1
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Tree Ensemble.md
---

![[Media/Figures/Tree_Ensemble.svg|340]]

A **Tree Ensemble** is a model that combines the predictions of many [[Decision Tree|decision trees]] into one. A single tree has high variance, and averaging many trees reduces it while keeping their ability to capture complex, nonlinear patterns. The three ensemble methods differ in how the trees are grown:

| Method | How the trees are grown | Effect |
| :--- | :--- | :--- |
| [[Bagging]] | Independently, each on a [[Bootstrap|bootstrap]] sample, and averaged | Reduces variance |
| [[Random Forest]] | As in bagging, with a random subset of predictors at each split | Decorrelates the trees, so it reduces variance more |
| [[Boosting]] | Sequentially, each small tree fitted to the residuals of the trees before it | Reduces bias |

An ensemble of bagged trees is more flexible than a single model. Its trees, fitted to bootstrap samples, leave about 37% of the observations out each time, which gives a free test-error estimate, the [[Out-of-Bag Error|out-of-bag error]]. An ensemble of hundreds of trees can't be read like one tree, and [[Variable Importance|variable importance]] recovers some of the interpretability.

> [!example]- An actuary's single severity tree changes shape every time it is refit on new data. Which ensemble method addresses this, and which addresses a model that is too simple? {Example}
> - A tree that changes with the data has high variance, which [[Bagging|bagging]] and [[Random Forest|random forests]] reduce by averaging.
> - A model that is too simple has high bias, which [[Boosting|boosting]] reduces by fitting each new tree to what the model so far gets wrong.

> [!trap] More trees only overfit with boosting
> Adding trees to a bagged model or a random forest never overfits, because the trees are averaged. Adding trees to a boosted model can, because each one keeps fitting the residuals.
