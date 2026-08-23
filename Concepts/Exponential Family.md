---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9c09c57fd6d7250f4f84381ab8d309661ddfe40119015385084d5558eb9ebf7d
  sources: []
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
| Tweedie ($1<p<2$) | $\mu^{p}$ | $\ln\mu$ | Pure premium |

- The **canonical [[Link Function]]** is the one with $g(\mu) = \theta$; it makes $\sum x_{ij}y_i$ a [[Sufficient Statistic]] and the likelihood well behaved, but any link that maps the mean range onto the whole line is allowed — the log link is standard for insurance because it makes rating factors multiplicative
- Membership is what guarantees the GLM machinery works: iteratively reweighted least squares converges, the [[Deviance]] has its $\chi^2$ theory, and the [[Fisher Information]] has a closed form
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
