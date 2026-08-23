---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82311b597a687e2053eeaade592b91887175018a56fa1c3576a709f65a9de68e
  sources: []
  open_findings: 0
  log: .verify/Concepts/Bias.md
---

**Bias** is the systematic error of an estimator: the difference between its expected value and the parameter it estimates. An estimator with zero bias is [[Unbiasedness|unbiased]]; bias is one of the two components of [[Mean Square Error]], the other being variance.

> $$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$

> $$\text{MSE}(\hat\theta) = \text{Var}(\hat\theta) + \left[\text{Bias}(\hat\theta)\right]^{2}$$

- Bias is about the *centre* of the estimator's [[Sampling Distribution]], variance about its *spread* — an estimator can be unbiased and useless (huge variance) or biased and excellent (tiny variance)
- **Asymptotic unbiasedness** is weaker: $\text{Bias}(\hat\theta) \to 0$ as $n \to \infty$. The [[Maximum Likelihood Estimation|MLE]] is often biased in finite samples but asymptotically unbiased and [[Consistency|consistent]]
- Standard examples: the [[Sample Variance]] with divisor $n$ is biased low by $\sigma^2/n$; the MLE $\hat\theta = X_{(n)}$ for $\text{Uniform}(0,\theta)$ is biased low by $\theta/(n+1)$
- Bias does **not** invert through nonlinear functions: if $\hat\theta$ is unbiased for $\theta$, $g(\hat\theta)$ is generally biased for $g(\theta)$ (by Jensen's inequality)
- Accepting a little bias to remove a lot of variance is the whole point of shrinkage, credibility weighting, and the [[Bias-Variance Tradeoff]] that governs model complexity
- In modelling, bias also arises from the *model* rather than the estimator — an omitted predictor, an ignored [[Interaction]], or fitting a straight line to a curved relationship all bias the fitted values regardless of sample size

![[Media/Figures/Bias.svg|340]]

> [!example]- Bias of the Uniform MLE {Example}
> For $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Uniform}(0,\theta)$, the MLE is $\hat\theta = X_{(n)}$ with $E[X_{(n)}] = \frac{n}{n+1}\theta$. Find its bias and construct an unbiased alternative.
>
> > [!answer]-
> > $$\text{Bias} = \frac{n}{n+1}\theta - \theta = -\frac{\theta}{n+1}$$
> > The MLE understates $\theta$, which makes sense — the largest observation can never exceed the true maximum. Rescaling removes it:
> > $$\tilde\theta = \frac{n+1}{n}X_{(n)}, \qquad E[\tilde\theta] = \theta$$

> [!example]- Choosing a Biased Estimator on MSE {Example}
> Estimator A is unbiased with variance $100$. Estimator B has bias $-4$ and variance $50$. Which has the smaller mean square error?
>
> > [!answer]-
> > $$\text{MSE}_A = 100 + 0^2 = 100$$
> > $$\text{MSE}_B = 50 + (-4)^2 = 66$$
> > **B is preferred on MSE**, despite being biased — its variance reduction more than pays for the squared bias. This is the trade every shrinkage method makes.
