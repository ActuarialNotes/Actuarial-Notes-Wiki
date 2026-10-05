---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:892a03408bbd2e28263904259376db3faaba8d2ab64354a9d9080899f113b2c7
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, p.2 'Tweedie Distributions' (Var = a E(Y)^p; p = 0, 1, (1,2), 2, 3; compound Poisson-gamma; software estimating p)"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.7.3 (Tweedie, eqs 5-9, point mass at zero, p range, PDF pp.32-35); sec.5.1.1 (frequency/severity vs pure premium, PDF pp.53-54)"
    - "scikit-learn User Guide, sec.3.4 'Mean Poisson, Gamma, and Tweedie deviances' (closed-form Tweedie deviance), sha256:7e740e140ba75771bb1c7de132babfd958c277b5529d187e7ba744e69729120c — https://scikit-learn.org/stable/modules/model_evaluation.html"
  open_findings: 3
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
