---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:83a7ca63f1ad01da417bc338b0c8db8f1fa89f0c8e07bf322f8409657583ccf9
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, §1.3.3 pp.9-12 (Mixing Method; Poisson mixed over a Gamma(α, θ) is negative binomial r = α, β = θ; Examples 1.23-1.24: mixtures of Poisson processes, insureds' rates varying randomly), p.7 (conditional variance formula), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.17-18 §5.4.3 conditional (mixed) Poisson process: stationary increments, increments in general not independent, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Mahler & Dean, 'Credibility', ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), §5.2 The Gamma-Poisson Model, PDF pp.95-98 (mixed distribution negative binomial; variance > mean), §5.3 Bayesian analysis, PDF pp.100-103 (observed claims update the insured's expected frequency), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §4.6.2 footnote 5 (variance much higher than mean = overdispersion) and §4.6.3 (negative binomial regression), book pp.169-170 (PDF pp.179-180), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Frees et al., Loss Data Analytics (open text, arXiv:1808.06718v1, 2018), §2.4 MLE for the (a,b,0) class, PDF p.45 (if sample mean < sample variance the negative binomial gives the higher likelihood), sha256:1df1831e7d67a072712a2945645b788f5974748143da267bb471b9a7bc3baf33 — https://arxiv.org/pdf/1808.06718"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
