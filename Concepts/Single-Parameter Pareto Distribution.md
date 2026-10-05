---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8d50e7f823d5461e8f7b2ab871711fad1f5f21266ad8daa3ede4baf0172a8869
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Single-Parameter Pareto Distribution.md
---

The **Single-Parameter Pareto Distribution** with shape $\alpha > 0$ and a known lower bound $\theta > 0$ is a continuous distribution on $(\theta, \infty)$, used for losses observed only above a fixed threshold. Only $\alpha$ is a true parameter: $\theta$ is set in advance.

> $$f(x) = \frac{\alpha\,\theta^{\alpha}}{x^{\alpha + 1}}, \quad x > \theta$$

> $$F(x) = 1 - \left(\frac{\theta}{x}\right)^{\alpha}, \quad x > \theta$$

> $$E[X^k] = \frac{\alpha\,\theta^k}{\alpha - k}, \quad k < \alpha$$

> $$\text{Var}(X) = \frac{\alpha\,\theta^2}{(\alpha - 1)^2(\alpha - 2)}, \quad \alpha > 2$$

> $$E[X \wedge x] = \frac{\alpha\,\theta}{\alpha - 1} - \frac{\theta^{\alpha}}{(\alpha - 1)\,x^{\alpha - 1}}, \quad x \geq \theta$$

- This is the parameterization of the CAS MAS-I tables. The mean is $E[X] = \frac{\alpha\theta}{\alpha - 1}$ for $\alpha > 1$; the variance is $E[X^2] - E[X]^2$ from the moment formula. The last block is the [[Limited Expected Value]].
- **Link to the exponential:** $\ln(X/\theta)$ has the [[Exponential Distribution|exponential]] distribution with rate $\alpha$ (mean $1/\alpha$). That is why the [[Maximum Likelihood Estimation|maximum likelihood estimate]] of $\alpha$ from a sample is $\hat{\alpha} = n \big/ \sum \ln(x_i/\theta)$.
- **Link to the two-parameter [[Pareto Distribution]]:** $X - \theta$ has the Pareto distribution with shape $\alpha$ and scale $\theta$. The two are easy to confuse; the single-parameter version's support starts at $\theta$, not 0.
- As with any Pareto, the $k$-th moment exists only for $k < \alpha$, so the tail is heavy.

> [!example]- Fitting Large Losses Above a Reporting Threshold {Example}
> An insurer records only losses above 1,000, and models them as single-parameter Pareto with $\theta = 1{,}000$. Five recorded losses are $1{,}200,\ 1{,}500,\ 2{,}500,\ 1{,}100,\ 4{,}000$. Find the maximum likelihood estimate of $\alpha$, and use it to estimate the probability that a recorded loss exceeds 3,000.
>
> > [!answer]-
> > The log-likelihood is $\ell(\alpha) = n\ln\alpha + n\alpha\ln\theta - (\alpha + 1)\sum \ln x_i$. Setting $\ell'(\alpha) = n/\alpha - \sum \ln(x_i/\theta) = 0$:
> >
> > $$
> > \begin{align*}
> > \sum \ln\frac{x_i}{1{,}000} &= \ln 1.2 + \ln 1.5 + \ln 2.5 + \ln 1.1 + \ln 4 \\
> > &= 2.9857 \\
> > \hat{\alpha} &= \frac{5}{2.9857} \\
> > &= 1.6747
> > \end{align*}
> > $$
> >
> > Then
> >
> > $$
> > \begin{align*}
> > \hat{P}(X > 3{,}000) &= \left(\frac{1{,}000}{3{,}000}\right)^{1.6747} \\
> > &= 0.1588
> > \end{align*}
> > $$
> >
> > About 16% of recorded losses are estimated to exceed 3,000. With $\hat{\alpha} < 2$ the fitted distribution has an infinite variance.

> [!example]- Limited Expected Value of Excess Losses {Example}
> Losses above a threshold follow a single-parameter Pareto with $\alpha = 3$ and $\theta = 500$. A policy caps each payment at 2,000. Find the expected payment, and the expected amount by which losses exceed the cap.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X] &= \frac{3(500)}{3 - 1} \\
> > &= 750 \\
> > E[X \wedge 2{,}000] &= 750 - \frac{500^3}{(2)(2{,}000)^2} \\
> > &= 750 - 15.625 \\
> > &= 734.375
> > \end{align*}
> > $$
> >
> > The cap removes $E[X] - E[X \wedge 2{,}000] = 15.625$ per loss, even though only $(500/2{,}000)^3 = 1.56\%$ of losses exceed it.
