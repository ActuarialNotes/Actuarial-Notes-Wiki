---
aliases:
  - Delta
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4b8b92bfc49254750ad42ac258fc58be1482258e2b1f0dbcc8590faf946c44e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Delta Method.md
---

The **Delta Method** approximates the variance of a smooth function $g(\hat\theta)$ of an [[Estimator|estimator]] $\hat\theta$ by linearizing $g$ about the true parameter $\theta$. It is how a variance for a [[Maximum Likelihood Estimation|maximum likelihood estimate]] of a parameter becomes a variance, and a [[Confidence Interval|confidence interval]], for a probability, a mean or a premium built from it.

The first-order Taylor expansion of $g(\hat\theta)$ about $\theta$ is

> $$g(\hat\theta) \approx g(\theta) + g'(\theta)\,(\hat\theta - \theta)$$

Only the last term varies, so the variance of $g(\hat\theta)$ is approximately

> $$\text{Var}\big[g(\hat\theta)\big] \approx \big[g'(\theta)\big]^2\, \text{Var}(\hat\theta)$$

In practice every quantity is evaluated at the estimate: $g'(\hat\theta)$ and $\widehat{\text{Var}}(\hat\theta)$. Klugman's statement is that if $\hat\theta_n$ is asymptotically normal with mean $\theta$ and variance $\sigma^2/n$, then $g(\hat\theta_n)$ is asymptotically normal with mean $g(\theta)$ and variance $[g'(\theta)]^2 \sigma^2/n$. By the [[Maximum Likelihood Estimation#Invariance|invariance]] of maximum likelihood estimates, $g(\hat\theta)$ is itself the maximum likelihood estimate of $g(\theta)$, and the delta method supplies its standard error. The approximation is good when $\text{Var}(\hat\theta)$ is small relative to the curvature of $g$. For a strongly nonlinear $g$ or a small sample it can understate the spread.

> [!example]- What is the probability that a loss exceeds a $\$500$ deductible, and its approximate 95% confidence interval? {Example}
> Fifty losses are fitted by an exponential distribution. The maximum likelihood estimate is $\hat\theta = \bar x = 2{,}000$, with $\widehat{\text{Var}}(\hat\theta) = \hat\theta^2/n$.
>
> > [!answer]-
> > - The probability is $g(\theta) = e^{-500/\theta}$, so $g'(\theta) = \frac{500}{\theta^2}e^{-500/\theta}$.
> > - At the estimate, $g(\hat\theta) = e^{-0.25} = 0.7788$ and $g'(\hat\theta) = (500/2{,}000^2)(0.7788) = 9.735 \times 10^{-5}$.
> > - $\widehat{\text{Var}}(\hat\theta) = 2{,}000^2/50 = 80{,}000$.
> > - $\widehat{\text{Var}}\big[g(\hat\theta)\big] = (9.735 \times 10^{-5})^2 (80{,}000) = 0.000758$.
> > - The interval is $0.7788 \pm 1.96\sqrt{0.000758}$, which is $(0.725,\ 0.833)$.
> > - Between about 72% and 83% of losses are expected to exceed the deductible and produce a payment.

## The delta method for several parameters

When $g$ depends on a vector of estimates $\hat{\boldsymbol\theta}$, the variance is the quadratic form

> $$\text{Var}\big[g(\hat{\boldsymbol\theta})\big] \approx (\partial \mathbf{g})^{T}\, \boldsymbol\Sigma\, (\partial \mathbf{g})$$

- $\partial \mathbf{g}$ is the vector of partial derivatives $\partial g/\partial \theta_j$.
- $\boldsymbol\Sigma$ is the covariance matrix of $\hat{\boldsymbol\theta}$. For a maximum likelihood estimate it is the inverse of the information matrix ([[Fisher Information|Fisher information]]).

With two parameters it expands to

> $$g_1^2\, \sigma_{11} + 2 g_1 g_2\, \sigma_{12} + g_2^2\, \sigma_{22}$$

- $g_j$ is $\partial g/\partial \theta_j$, and $\sigma_{jk}$ is the $(j, k)$ entry of $\boldsymbol\Sigma$.

Differentiate with respect to the parameter whose variance is given. If the variance is given for $\sigma$, differentiate in $\sigma$, not $\sigma^2$.

> [!example]- What is the fitted mean claim, and its approximate 95% confidence interval? {Example}
> A lognormal is fitted to 100 claims by maximum likelihood, giving $\hat\mu = 7.0$ and $\hat\sigma = 1.2$. The estimated covariance matrix is:
>
> $$\boldsymbol\Sigma = \begin{pmatrix} 0.0144 & 0 \\ 0 & 0.0072 \end{pmatrix}$$
>
> The mean claim is $E[X] = e^{\mu + \sigma^2/2}$.
>
> > [!answer]-
> > - The fitted mean is $e^{7 + 0.72} = 2{,}252.96$.
> > - The partial derivatives are $\partial g/\partial\mu = E[X]$ and $\partial g/\partial\sigma = \sigma E[X]$.
> > - The covariance is 0, so the variance is $E[X]^2(0.0144) + (1.2\,E[X])^2(0.0072) = E[X]^2(0.024768)$.
> > - That is $2{,}252.96^2(0.024768) = 125{,}718$, so the standard error is 354.57.
> > - The interval is $2{,}252.96 \pm 1.96(354.57)$, which is $(1{,}558,\ 2{,}948)$.
> > - About 42% of the variance ($0.010368/0.024768$) comes from the uncertainty in $\sigma$, which the mean amplifies through $\sigma^2/2$.

> [!trap] Forgetting to square the derivative
> The variance is $[g'(\theta)]^2\, \text{Var}(\hat\theta)$. Using $g'$ unsquared gives an answer off by a factor of $g'$, which for a probability is tiny and looks plausible.
