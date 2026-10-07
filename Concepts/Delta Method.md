---
aliases:
  - Delta
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9996d478c744d7348384ca431fab903cf560416407326b7856d96f434fe526d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Delta Method.md
---
The **delta method** approximates the variance of a smooth function $g(\hat\theta)$ of an [[Estimator|estimator]] by linearizing $g$ about the true parameter: a first-order Taylor expansion turns the variance of $\hat\theta$ into the variance of $g(\hat\theta)$. It is how a variance for a [[Maximum Likelihood Estimation|maximum likelihood estimate]] of a parameter becomes a variance — and a [[Confidence Interval|confidence interval]] — for a probability, a mean or a premium built from it.

> $$g(\hat\theta) \approx g(\theta) + g'(\theta)\,(\hat\theta - \theta)$$

> $$\text{Var}\big[g(\hat\theta)\big] \approx \big[g'(\theta)\big]^2\, \text{Var}(\hat\theta)$$

> $$\text{Var}\big[g(\hat{\boldsymbol\theta})\big] \approx (\partial \mathbf{g})^{T}\, \boldsymbol\Sigma\, (\partial \mathbf{g})$$

- In the multiparameter form $\partial \mathbf{g}$ is the vector of partial derivatives $\partial g/\partial \theta_j$ and $\boldsymbol\Sigma$ is the covariance matrix of $\hat{\boldsymbol\theta}$ — for an MLE, the inverse of the information matrix ([[Fisher Information]]). With two parameters it expands to $g_1^2 \sigma_{11} + 2 g_1 g_2 \sigma_{12} + g_2^2 \sigma_{22}$.
- In practice every quantity is evaluated at the estimate: $g'(\hat\theta)$ and $\widehat{\text{Var}}(\hat\theta)$. Klugman's statement: if $\hat\theta_n$ is asymptotically normal with mean $\theta$ and variance $\sigma^2/n$, then $g(\hat\theta_n)$ is asymptotically normal with mean $g(\theta)$ and variance $[g'(\theta)]^2 \sigma^2/n$.
- By the invariance of MLEs, $g(\hat\theta)$ is itself the MLE of $g(\theta)$, so the delta method supplies the missing piece: its standard error.
- The approximation is good when $\text{Var}(\hat\theta)$ is small relative to the curvature of $g$; for strongly nonlinear $g$ or small samples it can understate the spread.

> [!example]- Probability a Loss Exceeds the Deductible {Example}
> Fifty losses are fitted by an exponential distribution; the MLE is $\hat\theta = \bar x = 2{,}000$, with $\widehat{\text{Var}}(\hat\theta) = \hat\theta^2/n$. Estimate the probability that a loss exceeds a $\$500$ deductible, and give an approximate $95\%$ confidence interval.
>
> > [!answer]-
> > Here $g(\theta) = e^{-500/\theta}$, so $g'(\theta) = \frac{500}{\theta^2}e^{-500/\theta}$.
> >
> > $$
> > \begin{align*}
> > g(\hat\theta) &= e^{-0.25} \\
> > &= 0.7788 \\
> > g'(\hat\theta) &= \frac{500}{2{,}000^2}(0.7788) \\
> > &= 9.735 \times 10^{-5} \\
> > \widehat{\text{Var}}(\hat\theta) &= \frac{2{,}000^2}{50} \\
> > &= 80{,}000 \\
> > \widehat{\text{Var}}\big[g(\hat\theta)\big] &= (9.735 \times 10^{-5})^2 (80{,}000) \\
> > &= 0.000758 \\[4pt]
> > \text{CI} &= 0.7788 \pm 1.96\sqrt{0.000758} \\
> > &= (0.725,\ 0.833)
> > \end{align*}
> > $$
> >
> > Between about $72\%$ and $83\%$ of losses are expected to exceed the deductible and produce a payment.

> [!example]- Standard Error of a Fitted Lognormal Mean {Example}
> A lognormal is fitted to $100$ claims by maximum likelihood: $\hat\mu = 7.0$, $\hat\sigma = 1.2$, with estimated covariance matrix
>
> $$\boldsymbol\Sigma = \begin{pmatrix} 0.0144 & 0 \\ 0 & 0.0072 \end{pmatrix}$$
>
> Estimate the mean claim $E[X] = e^{\mu + \sigma^2/2}$ and an approximate $95\%$ confidence interval for it.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \widehat{E[X]} &= e^{7 + 0.72} \\
> > &= 2{,}252.96
> > \end{align*}
> > $$
> >
> > The partial derivatives are $\partial g/\partial\mu = E[X]$ and $\partial g/\partial\sigma = \sigma E[X]$, so
> >
> > $$
> > \begin{align*}
> > \widehat{\text{Var}} &= E[X]^2 (0.0144) + (1.2\,E[X])^2 (0.0072) \\
> > &= E[X]^2 (0.0144 + 0.010368) \\
> > &= 2{,}252.96^2 (0.024768) \\
> > &= 125{,}718 \\
> > \text{SE} &= 354.57 \\[4pt]
> > \text{CI} &= 2{,}252.96 \pm 1.96(354.57) \\
> > &= (1{,}558,\ 2{,}948)
> > \end{align*}
> > $$
> >
> > The fitted mean claim is about $\$2{,}253$, but with a coefficient of variation near $16\%$ on the estimate itself — about $42\%$ of the variance ($0.010368/0.024768$) comes from uncertainty in $\sigma$, which the mean amplifies through $\sigma^2/2$.

> [!tip]- How it appears on the exam
> - **ASTAM** (*use the delta method to estimate the variance of the maximum likelihood estimator of a function of the parameter(s)*): fit by maximum likelihood, get $\text{Var}(\hat\theta)$ from the information, then ask for the variance or interval of $S(d)$, a percentile, $E[X \wedge u]$ or a mean.
> - The two-parameter version supplies (or asks you to invert) the information matrix; the question is then the quadratic form $(\partial g)^T \boldsymbol\Sigma\, (\partial g)$ with a covariance term.
> - Often chained with the previous objective: construct a normal confidence interval for $g(\theta)$ once its variance is in hand.

> [!warning]- Exam traps
> - **Forgetting to square the derivative.** $\text{Var}[g(\hat\theta)] = [g'(\theta)]^2 \text{Var}(\hat\theta)$; using $g'$ unsquared gives an answer off by a factor of $g'$, which for a probability is tiny and looks plausible.
> - **Dropping the covariance term.** With two correlated estimates the cross term $2 g_1 g_2 \sigma_{12}$ matters; omitting it (or not doubling it) is the usual multiparameter error.
> - **Using the information instead of its inverse.** $\boldsymbol\Sigma$ is the *inverse* of the information matrix; plugging in the information itself gives a variance that is far too large or small.
> - **Differentiating with respect to the wrong parameterization.** If the MLE variance is given for $\sigma$, differentiate in $\sigma$, not $\sigma^2$.
