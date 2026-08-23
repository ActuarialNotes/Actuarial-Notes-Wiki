---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:83a7ca63f1ad01da417bc338b0c8db8f1fa89f0c8e07bf322f8409657583ccf9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mixed Poisson Process.md
---

A **Mixed Poisson Process** treats the arrival rate itself as random: each risk has its own rate $\Lambda$ drawn from a mixing distribution, and conditional on $\Lambda = \lambda$ the counts follow an ordinary [[Poisson Process]]. It is the standard way to model a **heterogeneous** portfolio in which some insureds are simply more claim-prone than others.

> $$N(t) \mid \Lambda = \lambda \ \sim\ \text{Poi}(\lambda t)$$

> $$E[N(t)] = t\,E[\Lambda], \qquad \text{Var}(N(t)) = t\,E[\Lambda] + t^2\,\text{Var}(\Lambda)$$

- The variance always **exceeds** the mean (for $t$ where $\text{Var}(\Lambda) > 0$): mixing produces **overdispersion**, the signature that a plain Poisson model is too tight for the data
- The moments follow from conditioning: $E[N] = E[E[N \mid \Lambda]]$ and $\text{Var}(N) = E[\text{Var}(N\mid\Lambda)] + \text{Var}(E[N\mid\Lambda])$
- With a [[Gamma]] mixing distribution the unconditional counts are exactly **[[Negative Binomial Distribution|negative binomial]]** — the single most useful fact in this section
- Increments are **not independent**: observing many claims early raises the posterior for $\Lambda$ and so raises the expectation for later intervals. This is the probabilistic basis of experience rating and [[Bayesian Credibility]]
- Contrast with the [[Nonhomogeneous Poisson Process]], where the rate varies over *time* but is known; here it varies across *risks* and is unobserved
- Detecting it in data is a job for [[Exploratory Data Analysis]]: if the sample variance of counts far exceeds the sample mean, fit a negative binomial rather than a [[Poisson Regression]]

![[Media/Figures/Mixed_Poisson_Process.svg|340]]

> [!example]- Gamma Mixing Gives a Negative Binomial {Example}
> Annual claim counts for a randomly chosen insured are Poisson with rate $\Lambda$, where $\Lambda \sim \text{Gamma}$ with mean $0.20$ and variance $0.04$. Find the mean and variance of the number of claims in one year.
>
> > [!answer]-
> > $$E[N(1)] = E[\Lambda] = 0.20$$
> > $$\text{Var}(N(1)) = E[\Lambda] + \text{Var}(\Lambda) = 0.20 + 0.04 = 0.24$$
> > The variance-to-mean ratio is $0.24/0.20 = 1.2 > 1$, so the portfolio is overdispersed. Because the mixing distribution is Gamma, $N(1)$ is exactly negative binomial.

> [!example]- Why Overdispersion Appears {Example}
> A book of business is half "good" drivers with $\lambda = 0.10$ and half "poor" drivers with $\lambda = 0.30$. Compare the mean and variance of the annual claim count for a randomly selected driver against a single Poisson model with the same mean.
>
> > [!answer]-
> > $$E[\Lambda] = 0.5(0.10) + 0.5(0.30) = 0.20$$
> > $$E[\Lambda^2] = 0.5(0.01) + 0.5(0.09) = 0.05 \ \Rightarrow\ \text{Var}(\Lambda) = 0.05 - 0.04 = 0.01$$
> > $$E[N] = 0.20, \qquad \text{Var}(N) = 0.20 + 0.01 = 0.21$$
> > A single $\text{Poi}(0.20)$ model would claim a variance of $0.20$. The extra $0.01$ is the between-driver heterogeneity — ignoring it understates the spread of portfolio results.
