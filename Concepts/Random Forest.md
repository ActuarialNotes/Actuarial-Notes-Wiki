---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:58b9a5b1bd5bea60382f5ab9227fc56df1009063234c25316de13b5ca0f466da
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Random Forest.md
---

A **random forest** is [[Bagging|bagged]] [[Decision Tree|trees]] with one extra step: at *each split*, only a random subset of $m$ predictors is eligible. That decorrelates the trees, so averaging removes more variance than bagging can.

> $$m \approx \sqrt{p} \ \text{(classification)}, \qquad m \approx p/3 \ \text{(regression)}$$
>
> $$\mathrm{Var}\!\left(\bar{Z}\right) = \rho\sigma^{2} + \frac{1-\rho}{B}\sigma^{2}$$

- The problem it solves: with one dominant predictor, every bagged tree splits on it first, the trees look alike ($\rho$ high) and the averaged variance stalls at $\rho\sigma^2$. Forbidding that predictor at a random share of splits lets the others show through
- $m = p$ **is** bagging — bagging is the special case, not a different algorithm
- Small $m$ decorrelates more (lower $\rho$) but weakens each individual tree (higher $\sigma^2$); $m$ is the one real tuning parameter and can be chosen by [[Out-of-Bag Error]]
- Like bagging, $B$ only helps: more trees never overfit, they just stop improving
- Handles correlated predictors far better than bagging, which is exactly the situation in a rating dataset full of overlapping rating variables

![[Media/Figures/Random_Forest.svg|340]]

> [!example]- Choosing m {Example}
> A fraud classifier has $p = 36$ predictors, one of which (prior claim count) is far stronger than the rest. What $m$ would you start with, and what goes wrong at $m = 36$?
>
> > [!answer]-
> > Start at $m = \sqrt{36} = 6$, then check OOB error at $m = 3$ and $m = 12$.
> > At $m = 36$ the method **is bagging**: prior claim count is available at every split, so it is chosen at the root of nearly all the trees, the trees are near-copies, $\rho$ stays high and the averaged variance barely falls below a single tree's.
