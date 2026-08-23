---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:54b6adcd88ffc5feaac39a8f9c18dd0d53fedf620be31e33255d13dedfb5e732
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bagging.md
---

**Bagging** (bootstrap aggregating) fits the same model to many [[Bootstrap|bootstrap]] resamples of the training data and averages the predictions. It leaves bias essentially unchanged and cuts variance — the reason it rescues high-variance learners like deep [[Decision Tree]]s.

> $$\hat{f}_{\text{bag}}(x) = \frac{1}{B}\sum_{b=1}^{B}\hat{f}^{*b}(x)$$
>
> $$\mathrm{Var}\!\left(\bar{Z}\right) = \rho\sigma^{2} + \frac{1-\rho}{B}\sigma^{2}$$

- For **classification** the aggregation is a **majority vote** across the $B$ trees rather than an average
- The trees are grown **deep and unpruned**: bagging handles the variance, so each tree is left to have low bias
- The variance formula is the catch — averaging kills the $(1-\rho)/B$ term but not $\rho\sigma^2$. Bagged trees are highly correlated because a dominant predictor is chosen first in nearly every tree, which caps the gain. [[Random Forest]] exists to break that correlation
- $B$ is **not** a tuning parameter: error flattens as $B$ grows and never increases, so $B$ is set by patience (a few hundred trees)
- Free error estimate: the ~37% of observations left out of each resample give the [[Out-of-Bag Error]], and interpretability is recovered via [[Variable Importance]]

![[Media/Figures/Bagging.svg|340]]

> [!example]- Why Bagging Helps a Tree and Not a Line {Example}
> An actuary bags 500 deep regression trees and, separately, 500 ordinary least-squares fits on the same data. Which shows the larger improvement in test MSE?
>
> > [!answer]-
> > **The trees.** A deep tree is high-variance — refit on a different resample it can change shape entirely — so averaging removes a large variance term.
> > An OLS fit on $n = 3{,}000$ is already stable; its $\hat\beta$ barely moves across resamples ($\sigma^2$ small, $\rho$ near 1), so the bagged average is almost the original fit and the gain is negligible. Bagging pays where variance is the problem.
