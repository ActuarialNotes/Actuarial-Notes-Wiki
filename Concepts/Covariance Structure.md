---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:eac24fc8b6cf255fc0e78e3e7cbbe64d64e220f81778087356c1d859c44cb736
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance Structure.md
---

The **covariance structure** of a [[Linear Mixed Model]] is the pattern imposed on $\mathrm{Var}(\mathbf{y}) = \mathbf{Z}\mathbf{D}\mathbf{Z}^\top + \mathbf{R}$. Choosing it is how the model says *which observations are correlated and how the correlation decays*.

> $$\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^{\top} + \mathbf{R}_i$$

**Common residual structures for a group of $n$ repeated measures:**

| Structure | Form of $\mathrm{Corr}(y_{ij}, y_{ik})$ | Parameters | Fits |
| :--- | :--- | :--- | :--- |
| Independent (VC) | $0$ | 1 | no within-group correlation |
| Compound symmetry (CS) | $\rho$ for all $j \neq k$ | 2 | exchangeable measures — the random-intercept model |
| First-order autoregressive AR(1) | $\rho^{\,\lvert j-k\rvert}$ | 2 | equally spaced measures over time |
| Toeplitz | $\rho_{\lvert j-k\rvert}$ | $n$ | banded, decay not forced to be geometric |
| Unstructured (UN) | free | $n(n+1)/2$ | anything, at maximum cost |

- A **random intercept** already implies compound symmetry — the two are the same model written differently, except that the random intercept constrains the common correlation to be positive while a compound-symmetric residual structure leaves it unconstrained
- More structure means fewer parameters and more power; the wrong structure biases the standard errors of the [[Fixed Effects|fixed effects]] even when $\hat{\boldsymbol\beta}$ is fine
- Compare nested structures with a [[Likelihood Ratio Test]] fitted by [[Restricted Maximum Likelihood|REML]] (the fixed effects must be identical), or non-nested ones with [[AIC]]
- Under-specifying (assuming independence when data are correlated) understates standard errors and finds effects that are not there
- **Dimension of $\mathbf{D}$.** In the subject-level model $\mathbf{y}_i = \mathbf{X}_i\boldsymbol\beta + \mathbf{Z}_i\mathbf{u}_i + \boldsymbol\varepsilon_i$, $\mathbf{D}$ is the covariance matrix of $\mathbf{u}_i$, which holds one random effect per column of $\mathbf{Z}_i$. With $q$ random-effect columns, $\mathbf{u}_i$ is $q \times 1$ and $\mathbf{D}$ is $q \times q$: a random intercept and two random slopes give a $3 \times 3$ $\mathbf{D}$ of three variances and three covariances. The number of fixed-effect columns in $\mathbf{X}_i$ and the number of observations do not enter it; they size $\boldsymbol\beta$, $\mathbf{y}_i$ and $\mathbf{R}_i$.
- **The implied marginal model** drops the random effects and models the marginal covariance $\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^\top + \mathbf{R}_i$ directly as a structure on the residuals (in SAS, a `REPEATED` statement instead of `RANDOM`). It is not held to the random-effects model's constraints: a random intercept constrains the common correlation to be positive, while the same compound-symmetry structure fitted on the residuals leaves the correlation unconstrained. So a marginal model can be fitted where the mixed model cannot, for instance when the data call for a negative within-subject correlation.

![[Media/Figures/Covariance_Structure.svg|340]]

> [!example]- Choosing Between CS and AR(1) {Example}
> Quarterly loss ratios for 40 accident years are modelled with a random year effect. The empirical correlations between quarters 1 apart, 2 apart and 3 apart are 0.62, 0.38 and 0.24. Which structure fits?
>
> > [!answer]-
> > Compound symmetry predicts one common correlation — the observed values decay, so it does not fit.
> > AR(1) predicts $\rho, \rho^2, \rho^3$. With $\rho = 0.62$: $0.62,\ 0.384,\ 0.238$ — almost exactly the observed pattern.
> > **AR(1)**, at the same two-parameter cost as compound symmetry.
