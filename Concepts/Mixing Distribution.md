---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e5fe0e7a7189b942e27d6a4e7f2ff2882ab9b4bf0e76b58181c68ddfe28068e
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, §1.3.3 pp.9-12 (Mixing Method; Gamma-mixed Poisson is negative binomial r = α, β = θ, Def. & Prop. 1.21; Example 1.24: for N(t), Λ = tλ is Gamma(α, tθ), so β = tθ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Frees et al., Loss Data Analytics (open text, arXiv:1808.06718v1, 2018), §2.6 Mixture Distributions, PDF pp.49-50 (Gamma(α, θ)-mixed Poisson pmf = C(α+k−1, k)(1/(1+θ))^α(θ/(1+θ))^k), sha256:1df1831e7d67a072712a2945645b788f5974748143da267bb471b9a7bc3baf33 — https://arxiv.org/pdf/1808.06718"
    - "Mahler & Dean, 'Credibility', ch.8 of Foundations of Casualty Actuarial Science (SOA study note C-21-01), §5.2-5.4, PDF pp.96-98 (negative binomial k = α, p = λ/(λ+1) in the rate parametrisation), pp.100-103 (posterior Gamma α + C, λ + Y), pp.107-109 (Bühlmann K = λ, Z = Y/(Y + λ), equal to the Bayesian estimate for the Gamma-Poisson; footnote 56: conjugate priors of linear exponential families), sha256:bccdb7968ae276e041bf7f6eb5aea3aea473f1dc7739bc64352419c8a6a0f3c5 — https://www.soa.org/globalassets/assets/files/edu/C-21-01.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.17-18 (mixed Poisson process: stationary, not independent, increments), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "McNulty, 'The Pareto-Gamma Mixture', CAS E-Forum Spring 2021, §3.1 Gamma-Exponential Mixture (result is Lomax = Pareto Type II), PDF pp.4-5, sha256:9499f17119a493997b6d69881adf50ff61033b80a6c43788366c521407710432 — https://www.casact.org/sites/default/files/2023-03/McNulty_The_Pareto_Gamma_Mixture_EForum-Spring2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mixing Distribution.md
---

A **Mixing Distribution** is the distribution of a model parameter that varies randomly from risk to risk. In a [[Mixed Poisson Process]] it is the distribution $g(\lambda)$ of the claim rate $\Lambda$ across the [[Insurance Portfolio|portfolio]]: each insured has a fixed but unknown rate, and a randomly chosen insured's count distribution is the Poisson averaged over $g$.

> $$P(N(t) = n) = \int_0^\infty \frac{e^{-\lambda t}(\lambda t)^n}{n!}\, g(\lambda)\, d\lambda$$

> $$\text{Var}(N(t)) = t\,E[\Lambda] + t^2\,\text{Var}(\Lambda)$$

- With a discrete mixing distribution (a few risk classes with weights $w_j$ and rates $\lambda_j$) the integral becomes a sum, $\sum_j w_j\, e^{-\lambda_j t}(\lambda_j t)^n/n!$. The mean is always $t\,E[\Lambda]$; the extra $t^2\,\text{Var}(\Lambda)$ in the variance is the between-risk heterogeneity.
- **Gamma mixing gives the negative binomial.** If $\Lambda \sim$ [[Gamma]]$(\alpha, \theta)$ (shape $\alpha$, scale $\theta$), then $N(t)$ is [[Negative Binomial Distribution|negative binomial]] in its failures-count form with $r = \alpha$ and $p = 1/(1 + \theta t)$:

> $$P(N(t) = n) = \frac{\Gamma(n + \alpha)}{n!\,\Gamma(\alpha)}\, p^{\alpha}(1-p)^{n}$$

- The mixing distribution is the **prior**. After $n$ claims in $t$ years, the gamma rate's [[Posterior Distribution|posterior]] is Gamma with shape $\alpha + n$ and scale $\theta/(1 + \theta t)$; its mean equals $Z(n/t) + (1-Z)\alpha\theta$ with $Z = t/(t + 1/\theta)$. This is the gamma–Poisson case of [[Bayesian Credibility]], where Bayes and [[Bühlmann Credibility|Bühlmann]] agree ([[Exact Credibility|exact credibility]]).
- Mixing is why a policyholder's past predicts its future — the basis of [[Experience Rating]] and a [[Bonus-Malus System]]. It also costs the process its independent increments (it keeps stationary ones).
- The same device mixes any parameter: an [[Exponential Distribution|exponential]] severity whose rate is gamma-distributed is Pareto unconditionally.

> [!example]- Gamma Mixing Across an Auto Portfolio {Example}
> Annual claim rates across a personal auto portfolio are Gamma with $\alpha = 2$ and $\theta = 0.1$ (mean $0.2$). For a randomly selected insured, find the probabilities of $0$ and $1$ claims next year, and compare with a $\text{Poi}(0.2)$ model.
>
> > [!answer]-
> > Here $p = 1/(1 + 0.1) = 10/11$:
> >
> > $$
> > \begin{align*}
> > P(N = 0) &= \left(\tfrac{10}{11}\right)^2 \\
> > &= 0.8264 \\
> > P(N = 1) &= \frac{\Gamma(3)}{1!\,\Gamma(2)}\left(\tfrac{10}{11}\right)^2\left(\tfrac{1}{11}\right) \\
> > &= 0.1503
> > \end{align*}
> > $$
> >
> > The Poisson gives $e^{-0.2} = 0.8187$ and $0.2e^{-0.2} = 0.1637$. Same mean, but mixing moves probability to zero claims and to the tail: the variance is $2(0.1)(1.1) = 0.22$ against $0.20$.

> [!example]- Updating One Insured's Rate {Example}
> In the same portfolio, an insured has $3$ claims in $2$ years. Find the posterior mean of its claim rate.
>
> > [!answer]-
> > The posterior is Gamma with shape $2 + 3 = 5$ and scale $0.1/(1 + 0.2) = 1/12$:
> >
> > $$
> > \begin{align*}
> > E[\Lambda \mid N(2) = 3] &= \frac{5}{12} \\
> > &= 0.4167
> > \end{align*}
> > $$
> >
> > As a credibility weighting, $Z = 2/(2 + 10) = 1/6$ on the observed $1.5$ per year and $5/6$ on the prior $0.2$: $0.25 + 0.1667 = 0.4167$. The rate estimate more than doubles on two years of data, yet most of the weight stays on the portfolio mean.

> [!example]- Two Risk Classes and a Claim-Free Year {Example}
> $70\%$ of drivers have rate $0.1$ and $30\%$ have rate $0.5$. Find the probability that a randomly chosen driver is claim-free for a year, and the probability that a claim-free driver is high-risk.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(N = 0) &= 0.7e^{-0.1} + 0.3e^{-0.5} \\
> > &= 0.63339 + 0.18196 \\
> > &= 0.81535
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P(\text{high} \mid N = 0) &= \frac{0.18196}{0.81535} \\
> > &= 0.2232
> > \end{align*}
> > $$
> >
> > One clean year lowers the chance the driver is high-risk from $30\%$ to $22\%$ — the logic a claim-free discount rests on.
