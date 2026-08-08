**Variance components** are the parameters that split the total variance of a [[Linear Mixed Model]] into a piece for each source of randomness — one per [[Random Effects|random effect]] plus the residual.

> $$\mathrm{Var}(\mathbf{y}) = \mathbf{V} = \mathbf{Z}\mathbf{D}\mathbf{Z}^{\top} + \mathbf{R}$$
>
> $$\text{random intercept: } \mathrm{Var}(y_{ij}) = \sigma_b^{2} + \sigma^{2}$$

- $\mathbf{D}$ collects the random-effect variances (and their covariances); $\mathbf{R}$ is the residual [[Covariance Structure|covariance structure]], usually $\sigma^2 \mathbf{I}$
- They are the mixed-model counterpart of the [[Variance of Hypothetical Means]] ($\sigma_b^2$) and [[Expected Value of Process Variance]] ($\sigma^2$) in credibility
- Variances are **non-negative**, so a fitted component at the boundary $\hat\sigma_b^2 = 0$ is a signal that the grouping factor explains nothing — the mixed model has collapsed to ordinary regression
- They drive everything downstream: the [[Intraclass Correlation]], the shrinkage of each [[Best Linear Unbiased Predictor|BLUP]], and the standard errors of the [[Fixed Effects|fixed effects]]
- [[Restricted Maximum Likelihood|REML]] is the default estimator because ML variance components are biased downward

![[Media/Figures/Variance_Components.svg|340]]

> [!example]- Reading Variance Components from Software Output {Example}
> A random-intercept model of claim severity by claims adjuster reports: `Random effects: adjuster (Intercept) Variance 250, Residual Variance 1,000`. How much of the variation is between adjusters, and what does one adjuster's total variance look like?
>
> > [!answer]-
> > $$\mathrm{Var}(y_{ij}) = \sigma_b^{2} + \sigma^{2} = 250 + 1{,}000 = 1{,}250$$
> > $$\mathrm{ICC} = \frac{250}{1{,}250} = 0.20$$
> > **20%** of the variance in severity sits between adjusters and 80% within. Two claims handled by the same adjuster have correlation 0.20; two handled by different adjusters are uncorrelated.
