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

- A **random intercept** already implies compound symmetry — the two are the same model written differently
- More structure means fewer parameters and more power; the wrong structure biases the standard errors of the [[Fixed Effects|fixed effects]] even when $\hat{\boldsymbol\beta}$ is fine
- Compare nested structures with a [[Likelihood Ratio Test]] fitted by [[Restricted Maximum Likelihood|REML]] (the fixed effects must be identical), or non-nested ones with [[AIC]]
- Under-specifying (assuming independence when data are correlated) understates standard errors and finds effects that are not there

![[Media/Figures/Covariance_Structure.svg|340]]

> [!example]- Choosing Between CS and AR(1) {Example}
> Quarterly loss ratios for 40 accident years are modelled with a random year effect. The empirical correlations between quarters 1 apart, 2 apart and 3 apart are 0.62, 0.38 and 0.24. Which structure fits?
>
> > [!answer]-
> > Compound symmetry predicts one common correlation — the observed values decay, so it does not fit.
> > AR(1) predicts $\rho, \rho^2, \rho^3$. With $\rho = 0.62$: $0.62,\ 0.384,\ 0.238$ — almost exactly the observed pattern.
> > **AR(1)**, at the same two-parameter cost as compound symmetry.
