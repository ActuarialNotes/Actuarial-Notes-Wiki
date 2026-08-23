---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eadc382a8c7d9e6af82a20819dac959b7fa6e8be197dfd1b7e5fee821e8ccfbe
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Regression.md
---

**Poisson Regression** is the [[Generalized Linear Model]] for count data: the response is Poisson and the log [[Link Function]] makes the predictors act multiplicatively on the expected count. With log exposure entered as an [[Offset Variable|offset]], it is the standard model for claim **[[Frequency]]**.

> $$\ln \mu_i = \ln(e_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

> $$\mu_i = e_i\,e^{\beta_0}\,e^{\beta_1 x_{i1}} \cdots e^{\beta_p x_{ip}}$$

- The log link turns each coefficient into a **rating relativity**: $e^{\beta_j}$ is the multiplicative effect on frequency of a one-unit increase in $x_j$, which is exactly how rating algorithms are built
- The exposure term $\ln(e_i)$ is an **offset** — a predictor with coefficient fixed at $1$ — so the model predicts a *rate* per unit of exposure. Leaving exposure out (or entering it as an ordinary predictor) is a classic error
- The Poisson variance function is $V(\mu) = \mu$ and the [[Dispersion Parameter]] is nominally $\phi = 1$; when the residual [[Deviance]] far exceeds its degrees of freedom the data is **overdispersed**
- Overdispersion usually comes from unmodelled heterogeneity (a [[Mixed Poisson Process]]). Remedies: estimate $\phi$ (quasi-Poisson, which inflates standard errors by $\sqrt{\hat\phi}$ but leaves $\hat\beta$ unchanged), or fit a [[Negative Binomial Distribution|negative binomial]] model
- Coefficients are tested individually in [[Parameter Estimate Tables]] and in groups by analysis of deviance ([[Likelihood Ratio Test]])
- Poisson regression tolerates non-integer responses (average counts with weights) because the quasi-likelihood only needs the mean–variance relationship to be right

![[Media/Figures/Poisson_Regression.svg|340]]

> [!example]- Predicting a Frequency from a Fitted Model {Example}
> A frequency GLM with log link and log-exposure offset gives $\hat\beta_0 = -2.30$, urban $= 0.26$, young driver $= 0.41$. Find the expected claim count for a young urban driver with $0.5$ years of exposure.
>
> > [!answer]-
> > $$\ln\hat\mu = \ln(0.5) - 2.30 + 0.26 + 0.41 = -0.693 - 1.63 = -2.323$$
> > $$\hat\mu = e^{-2.323} = 0.098$$
> > Equivalently, the base rate is $e^{-2.30} = 0.100$ claims per exposure-year, multiplied by $e^{0.26} = 1.30$ for urban and $e^{0.41} = 1.51$ for young, times $0.5$ exposure: $0.100 \times 1.30 \times 1.51 \times 0.5 = 0.098$.

> [!example]- Detecting Overdispersion {Example}
> A Poisson GLM has residual deviance $1{,}840$ on $600$ degrees of freedom. What does this indicate, and how should the results be adjusted?
>
> > [!answer]-
> > $$\hat\phi \approx \frac{D}{n - p} = \frac{1{,}840}{600} = 3.07$$
> > A dispersion near $3$ instead of $1$ means the counts are far more variable than Poisson allows — **overdispersion**. The estimated coefficients remain usable, but standard errors are understated by a factor of $\sqrt{3.07} = 1.75$, so p-values are far too small. Refit as quasi-Poisson (scaling the standard errors) or as a negative binomial model, which builds the extra variance into the distribution.
