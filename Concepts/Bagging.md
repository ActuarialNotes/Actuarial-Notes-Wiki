---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5843cef5a7ca424c2f796886c304107a72030411fc4acae616b819587a69877
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Bagging.md
---

![[Media/Figures/Bagging.svg|340]]

**Bagging**, or bootstrap aggregation, is a method that fits the same model to $B$ [[Bootstrap|bootstrap]] samples of the training data and averages the predictions. For regression trees the bagged prediction is

> $$\hat{f}_{\text{bag}}(x) = \frac{1}{B}\sum_{b=1}^{B}\hat{f}^{*b}(x)$$

- $\hat{f}^{*b}$ is the tree fitted to the $b$th bootstrap sample.

For classification, the bagged prediction is the majority vote of the $B$ trees. The trees are grown deep and unpruned, so each has low bias, and averaging cuts their variance while leaving the bias essentially unchanged. $B$ is not a tuning parameter: adding trees does not cause overfitting, because the error flattens as $B$ grows and never increases. $B$ is set large enough for the error to settle, often a few hundred trees.

> [!example]- An actuary bags 500 deep regression trees, and separately 500 ordinary least squares fits, on the same data. Which shows the larger improvement in test MSE? {Example}
> - A deep tree has high variance, since refitting it on a different sample can change its shape entirely, so averaging removes a large variance term.
> - A least squares fit with $n$ large relative to $p$ barely changes across samples, so its bagged average is almost the original fit.
> - The trees improve far more.

## Variance of an average of correlated trees

When each tree's prediction has variance $\sigma^2$ and any two trees' predictions have correlation $\rho$, the average $\bar{Z}$ of $B$ trees has variance

> $$\mathrm{Var}(\bar{Z}) = \rho\sigma^{2} + \frac{1 - \rho}{B}\sigma^{2}$$

Averaging more trees removes the second term but not $\rho\sigma^2$. In bagging, a dominant predictor tends to be chosen for the top split in most trees, so the trees are highly correlated, and averaging them reduces the variance less. [[Random Forest|Random forests]] decorrelate the trees.

> [!example]- Bagged trees have prediction variance $\sigma^2 = 1$ and correlation $\rho = 0.6$. What is the variance of the average of 100 trees? {Example}
> - $\mathrm{Var}(\bar{Z}) = 0.6(1) + 0.4(1)/100 = 0.604$.
> - No number of trees brings it below $0.6$.

## Out-of-bag error and variable importance

Each bootstrap sample leaves out about 37% of the observations, which gives the [[Out-of-Bag Error|out-of-bag error]], a test-error estimate with no extra fitting. A bagged model of hundreds of trees can't be read like one tree, and [[Variable Importance|variable importance]] recovers some of the interpretability.
