---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:55e4a3cd1605d5ef0e3fcda1edd23471d0e998d130c5c9cd451c239fe1e75fc0
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), p.2 'Tweedie Distributions', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.3 (eqs.7-9, point mass at 0, p range and choice, PDF pp.33-35), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "scikit-learn User Guide sec.3.4.6.9 'Mean Poisson, Gamma, and Tweedie deviances' (closed-form Tweedie deviance), sha256:7e740e140ba75771bb1c7de132babfd958c277b5529d187e7ba744e69729120c — https://scikit-learn.org/stable/modules/model_evaluation.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tweedie Distribution.md
---

The **Tweedie Distribution** is the [[Exponential Family]] member whose variance is a power of the mean, $V(\mu) = \mu^{p}$. For $1 < p < 2$ it is a compound Poisson–Gamma distribution: a Poisson number of Gamma-sized claims. That gives it a point mass at zero plus a right-skewed continuous part — exactly the shape of **pure premium** data, where most policies have no claim at all.

> $$\text{Var}(Y) = \phi\,\mu^{p}, \qquad 1 < p < 2$$

> $$Y = \sum_{i=1}^{N} X_i, \quad N \sim \text{Poisson}(\lambda), \ X_i \sim \text{Gamma}$$

| $p$ | Distribution | Response |
| :--- | :--- | :--- |
| $0$ | Normal | Continuous, symmetric |
| $1$ | Poisson | Counts |
| $1 < p < 2$ | Compound Poisson–Gamma | Pure premium (mass at $0$, skewed above) |
| $2$ | [[Gamma]] | Severity |
| $3$ | Inverse Gaussian | Heavy-tailed severity |

- $P(Y = 0) = e^{-\lambda} > 0$: the Tweedie is the one member that puts genuine probability on exactly zero while remaining continuous elsewhere, which no Gamma or lognormal model can do
- Fitted with a **log link**, it models pure premium in one step instead of fitting [[Poisson Regression|frequency]] and severity separately — convenient, but with $\phi$ and $p$ constant across records it implicitly assumes frequency and severity **move in the same direction**: a predictor that raises pure premium raises both components
- $p$ is held constant across records. It may be estimated by the software along with $\boldsymbol\beta$, chosen from candidate values by log-likelihood or cross-validation, or selected judgmentally (common choices $1.6$, $1.67$ or $1.7$); values used in insurance modelling typically range from $1.5$ to $1.8$
- The [[Dispersion Parameter]] $\phi$ is estimated from the data. The unit [[Deviance]] has a closed form for $1 < p < 2$: $d(y, \mu) = 2\left[\dfrac{y^{2-p}}{(1-p)(2-p)} - \dfrac{y\,\mu^{1-p}}{1-p} + \dfrac{\mu^{2-p}}{2-p}\right]$
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
