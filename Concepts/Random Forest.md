---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8336c63888259d59b238c0df3d5c5ca0ce8599ae5cc26992c96967975eb20ca3
  sources: []
  open_findings: 0
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
> > At $m = 36$ the method **is bagging**: prior claim count is available at every split, so it is chosen at the root of nearly all 500 trees, the trees are near-copies, $\rho$ stays high and the averaged variance barely falls below a single tree's.
