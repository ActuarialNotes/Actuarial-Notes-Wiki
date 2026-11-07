---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:064dc7023747ef4b46d754ef29d071e330cd4ce14387776f72ba2c21e1f1d50b
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), pp.1-3 (quasi-likelihood; Tweedie power-variance list; canonical links and exponential-family table), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), App. B secs.B.1.1-B.3.2 (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes, Models for Count Data With Overdispersion, sec.1 (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.1.3 fn.1 (PDF p.16), sec.2.7.1 (PDF p.29), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "statmod reference manual (G. Smyth), tweedie() help page: canonical link power = 1 - var.power, sha256:108779ab82400727c502d80a56cecb547895e7fc6dc51acbe105183e529d191a — https://search.r-project.org/CRAN/refmans/statmod/html/tweedie.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exponential Family.md
---

![[Media/Figures/Exponential_Family.svg|340]]

The **Exponential Family** is the class of distributions whose probability function or density can be written in the form below. The response of a [[Generalized Linear Model]] has a distribution in this family. A distribution with canonical parameter $\theta$ and [[Dispersion Parameter|dispersion parameter]] $\phi$ is in the exponential family if its probability function or density is

> $$f(y; \theta, \phi) = \exp\left(\frac{y\theta - b(\theta)}{a(\phi)} + c(y, \phi)\right)$$

- $b(\theta)$ is the cumulant function.
- $a(\phi)$ is a function of the dispersion parameter, usually $a(\phi) = \phi$.
- $c(y, \phi)$ is a function that does not involve $\theta$.

The family is also called the exponential dispersion family, or the linear exponential family.

> [!example]- Is the Poisson distribution with mean $\mu$ in the exponential family, and what are $\theta$, $b(\theta)$ and $a(\phi)$? {Example}
> - The Poisson probability function is $f(y) = \frac{e^{-\mu}\mu^{y}}{y!}$.
> - Taking the exponential of its logarithm gives $f(y) = \exp(y \ln \mu - \mu - \ln y!)$.
> - This has the exponential family form with $\theta = \ln \mu$, $b(\theta) = e^{\theta}$, $a(\phi) = 1$ and $c(y, \phi) = -\ln y!$.
> - The Poisson distribution is in the exponential family, with dispersion parameter $\phi = 1$.

## Mean and variance

The first derivative of the cumulant function gives the mean:

> $$\mu = E[Y] = b'(\theta)$$

and its second derivative gives the variance:

> $$\text{Var}(Y) = a(\phi)\, b''(\theta)$$

The canonical parameter is the inverse of $b'$ applied to the mean, $\theta = (b')^{-1}(\mu)$. Writing $b''(\theta)$ as a function of the mean gives the [[Variance Function|variance function]] $V(\mu)$, so that with $a(\phi) = \phi$ the variance is

> $$\text{Var}(Y) = \phi\, V(\mu)$$

The variance function says how the variance changes with the mean, and the dispersion parameter sets its overall size.

> [!example]- What are the mean and the variance function of the Poisson distribution, from its cumulant function $b(\theta) = e^{\theta}$? {Example}
> - The mean is $b'(\theta) = e^{\theta}$, and $\theta = \ln \mu$, so $b'(\theta) = \mu$.
> - The second derivative is $b''(\theta) = e^{\theta} = \mu$, so $V(\mu) = \mu$.
> - With $\phi = 1$, the variance is $\text{Var}(Y) = \mu$, equal to the mean.

## Members of the family

The common members, with their variance functions and canonical links, are:

| Distribution | $V(\mu)$ | $\phi$ | Canonical link |
| --- | --- | --- | --- |
| [[Normal Distribution|Normal]] | $1$ | $\sigma^2$ | $\mu$ (identity) |
| [[Poisson Distribution|Poisson]] | $\mu$ | $1$ | $\ln \mu$ (log) |
| [[Binomial Distribution|Binomial]] proportion | $\mu(1 - \mu)$ | $1$ | $\ln\frac{\mu}{1 - \mu}$ (logit) |
| [[Gamma]] | $\mu^2$ | $1/\alpha$ | $1/\mu$ (inverse) |
| Inverse Gaussian | $\mu^3$ | estimated | $1/\mu^2$ |
| [[Tweedie Distribution|Tweedie]], $1 < p < 2$ | $\mu^p$ | estimated | $\mu^{1-p}$ |

The canonical link is the [[Link Function|link function]] that sets the linear predictor equal to the canonical parameter, $g(\mu) = \theta$. A constant multiple does not change a link, so the gamma's canonical parameter $\theta = -1/\mu$ gives the inverse link $1/\mu$. The Tweedie distribution with $1 < p < 2$ is a compound Poisson-gamma distribution.

> [!example]- Plotting the variance of a severity data set's groups against their means shows the variance growing with the square of the mean. Which member of the family should model severity? {Example}
> - A variance proportional to $\mu^2$ is the variance function $V(\mu) = \mu^2$.
> - That is the variance function of the gamma distribution.
> - A gamma GLM, usually with a log link, should model severity.
> - A variance proportional to $\mu$ would have pointed to the Poisson distribution, which is for counts rather than amounts.
