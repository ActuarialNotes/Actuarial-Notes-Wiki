---
verification:
  status: disputed
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c3d163d768372cc5981af67eb8ebee765319eeb9c98b47282947e08077d517e
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.2 (Tweedie power-variance list, canonical link and unbiasedness) and p.3 (canonical link table; exponential-family form and table)"
    - "Rodriguez, GLM lecture notes (Princeton), App. B, secs.B.1.1-B.3.2, B.4.1 (PDF pp.2-9), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion (2013, rev. 2022), sec.1 (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (PDF p.16); sec.2.7.1 (gamma V = mu^2, PDF p.29); sec.2.7.3 (Tweedie, PDF pp.32-35)"
    - "statmod reference manual (G. Smyth), tweedie() help page: canonical link power = 1 - var.power, sha256:108779ab82400727c502d80a56cecb547895e7fc6dc51acbe105183e529d191a — https://search.r-project.org/CRAN/refmans/statmod/html/tweedie.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exponential Family.md
---

The **Exponential Family** is the class of distributions whose density can be written in a common exponential form. It is the set of response distributions a [[Generalized Linear Model]] can use: Normal, Poisson, binomial, [[Gamma]], inverse Gaussian, and the [[Tweedie Distribution]] all belong to it.

> $$f(y \mid \theta, \phi) = \exp\!\left\{\frac{y\theta - b(\theta)}{a(\phi)} + c(y, \phi)\right\}$$

> $$E[Y] = b'(\theta) = \mu, \qquad \text{Var}(Y) = a(\phi)\,b''(\theta) = \phi\,V(\mu)$$

- $\theta$ is the **canonical parameter**, $\phi$ the [[Dispersion Parameter]], $b(\theta)$ the cumulant function whose derivatives generate the mean and variance
- The **variance function** $V(\mu) = b''(\theta)$ is what distinguishes members and what makes the family so useful: it ties the spread to the mean instead of assuming it constant

| Distribution | $V(\mu)$ | Canonical link | Typical actuarial use |
| :--- | :--- | :--- | :--- |
| Normal | $1$ | Identity | Ordinary [[Linear Regression]] |
| Poisson | $\mu$ | $\ln\mu$ | Claim frequency |
| Binomial | $\mu(1-\mu)$ | $\ln\frac{\mu}{1-\mu}$ | Retention, large-claim indicator |
| Gamma | $\mu^2$ | $-1/\mu$ (log in practice) | Claim severity |
| Inverse Gaussian | $\mu^3$ | $-1/(2\mu^2)$ | Heavy-tailed severity |
| Tweedie ($1<p<2$) | $\mu^{p}$ | $\mu^{1-p}/(1-p)$ (log in practice) | Pure premium |

- The **canonical [[Link Function]]** is the one with $g(\mu) = \theta$; it makes $\sum x_{ij}y_i$ a [[Sufficient Statistic]] and the likelihood well behaved, but any one-to-one, differentiable link may be used — the log link is standard for insurance because it makes rating factors multiplicative
- Membership is what lets every GLM be fitted by the same algorithm — iteratively reweighted least squares, equivalent to Fisher scoring — with [[Fisher Information]] $X^\top W X/\phi$; the [[Deviance]]'s $\chi^2$ distribution is a large-sample approximation. Quasi-likelihood runs the same algorithm from the mean–variance relationship alone, when a full exponential-family distribution is not assumed
- Fixing $\phi$ at $1$ gives the "pure" one-parameter family; estimating it accommodates over- or under-dispersion without leaving the framework

![[Media/Figures/Exponential_Family.svg|340]]

> [!example]- Showing the Poisson Is in the Family {Example}
> Write the $\text{Poi}(\mu)$ probability function in exponential-family form and identify $\theta$, $b(\theta)$, and $V(\mu)$.
>
> > [!answer]-
> > $$f(y) = \frac{e^{-\mu}\mu^{y}}{y!} = \exp\left\{y\ln\mu - \mu - \ln y!\right\}$$
> > Matching the standard form: $\theta = \ln\mu$, $b(\theta) = e^{\theta} = \mu$, $a(\phi) = 1$, $c(y,\phi) = -\ln y!$.
> > $$E[Y] = b'(\theta) = e^{\theta} = \mu, \qquad V(\mu) = b''(\theta) = e^{\theta} = \mu$$
> > The canonical link is $\theta = \ln\mu$ — the log link, exactly what [[Poisson Regression]] uses.

> [!example]- Choosing a Member from the Data {Example}
> Plotting group variances against group means for a severity data set gives a relationship close to $\text{Var} \propto \mu^2$. Which family member fits, and what would $\text{Var} \propto \mu$ have suggested?
>
> > [!answer]-
> > $V(\mu) = \mu^2$ is the **Gamma**, so a Gamma GLM (log link) is indicated for severity. A variance proportional to $\mu$ would point at the **Poisson** — appropriate for counts, not amounts. This mean–variance plot is the practical way to pick a distribution and is a standard [[Exploratory Data Analysis]] step before fitting.
