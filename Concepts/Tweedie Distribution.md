---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:892a03408bbd2e28263904259376db3faaba8d2ab64354a9d9080899f113b2c7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tweedie Distribution.md
---

The **Tweedie Distribution** is the [[Exponential Family]] member whose variance is a power of the mean, $V(\mu) = \mu^{p}$. For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims. That gives it a point mass at zero plus a right-skewed continuous part — exactly the shape of **pure premium** data, where most policies have no claim at all.

> $$\text{Var}(Y) = \phi\,\mu^{p}, \qquad 1 < p < 2$$

> $$Y = \sum_{i=1}^{N} X_i, \quad N \sim \text{Poisson}, \ X_i \sim \text{Gamma}$$

| $p$ | Distribution | Response |
| :--- | :--- | :--- |
| $0$ | Normal | Continuous, symmetric |
| $1$ | Poisson | Counts |
| $1 < p < 2$ | Compound Poisson–Gamma | Pure premium (mass at $0$, skewed above) |
| $2$ | [[Gamma]] | Severity |
| $3$ | Inverse Gaussian | Heavy-tailed severity |

- $P(Y = 0) = e^{-\lambda} > 0$: the Tweedie is the one member that puts genuine probability on exactly zero while remaining continuous elsewhere, which no Gamma or lognormal model can do
- Fitted with a **log link**, it models pure premium in one step instead of fitting [[Poisson Regression|frequency]] and severity separately — convenient, but it forces frequency and severity to share the same relativities
- $p$ is usually estimated by profile likelihood over a grid (typically $1.4$–$1.7$ for personal lines) rather than fitted alongside $\boldsymbol\beta$
- The [[Dispersion Parameter]] $\phi$ is estimated from the data, and the [[Deviance]] has no simple closed form — the density itself requires an infinite series, so model comparison leans on [[AIC]] and holdout error
- Separate frequency and severity models are more transparent and diagnose better; the Tweedie is preferred when the split is unavailable or when a single pure-premium score is what the pricing system consumes

![[Media/Figures/Tweedie_Distribution.svg|340]]

> [!example]- Reading a Tweedie Pure Premium Model {Example}
> A Tweedie GLM ($p = 1.6$, log link) for pure premium gives $\hat\beta_0 = 5.30$ and a coefficient of $0.22$ for "prior claim". What pure premium does the model predict for a risk with a prior claim?
>
> > [!answer]-
> > $$\ln\hat\mu = 5.30 + 0.22 = 5.52 \ \Longrightarrow\ \hat\mu = e^{5.52} = 249.6$$
> > The base pure premium is $e^{5.30} = 200.3$ and the prior-claim relativity is $e^{0.22} = 1.246$ — a $24.6\%$ load, applied multiplicatively as in any log-link model.

> [!example]- Why Not Model Pure Premium with a Gamma? {Example}
> An actuary tries a Gamma GLM on pure premium and the fit fails outright. Why, and what does the Tweedie change?
>
> > [!answer]-
> > The Gamma density is defined only for $y > 0$, but most policies have pure premium exactly $0$ — the likelihood is undefined for those rows. The Tweedie with $1 < p < 2$ assigns positive probability $e^{-\lambda}$ to $Y = 0$ and a continuous Gamma-like density above it, so the whole book can be fitted in a single model.
