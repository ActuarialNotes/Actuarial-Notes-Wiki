---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:1b5770c8b4eb0f1a0cf4df64cb36134757472fda2c977b398adc2c8bc6d3833e
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

A **Mixing Distribution** is the distribution of a parameter that varies randomly from risk to risk across an [[Insurance Portfolio|insurance portfolio]]. In a [[Mixed Poisson Process|mixed Poisson process]] it is the distribution of the rate $\Lambda$, and the distribution of the number of events for a risk selected at random is a [[Mixture Distribution|mixture]] of Poisson distributions. When $\Lambda$ takes the values $\lambda_1, \lambda_2, \ldots$, the probability of $k$ events by time $t$ is

> $$P(N(t) = k) = \sum_j P(\Lambda = \lambda_j)\,\frac{e^{-\lambda_j t}(\lambda_j t)^k}{k!}$$

When $\Lambda$ is continuous with density $g(\lambda)$, the sum becomes an integral:

> $$P(N(t) = k) = \int_0^\infty \frac{e^{-\lambda t}(\lambda t)^k}{k!}\,g(\lambda)\,d\lambda$$

The mean of any function of $\Lambda$ is weighted the same way. For example, $E[\Lambda] = \sum_j \lambda_j P(\Lambda = \lambda_j)$ for a discrete mixing distribution.

> [!example]- In a motor portfolio, 75% of drivers have a claim rate of 0.2 per year and 25% have a rate of 0.8 per year. What is the probability that a driver selected at random has no claims in a year? {Example}
> - A driver with rate 0.2 has no claims with probability $e^{-0.2} = 0.81873$.
> - A driver with rate 0.8 has no claims with probability $e^{-0.8} = 0.44933$.
> - Weighting by the mixing distribution, $P(N(1) = 0) = 0.75(0.81873) + 0.25(0.44933)$.
> - The probability is $0.61405 + 0.11233 = 0.7264$.

## Gamma mixing distribution

When the mixing distribution is [[Gamma|gamma]] with shape $\alpha$ and scale $\theta$, the number of events by time $t$ is [[Negative Binomial Distribution#The form used on later exams|negative binomial]] with $r = \alpha$ and $\beta = \theta t$. The probability of $k$ events is

> $$P(N(t) = k) = \binom{k + \alpha - 1}{k}\frac{(\theta t)^k}{(1 + \theta t)^{\alpha + k}}$$

Its mean is $\alpha\theta t$ and its variance is $\alpha\theta t(1 + \theta t)$, which is greater than the mean.

> [!example]- Annual claim rates across a portfolio are gamma distributed with $\alpha = 2$ and $\theta = 0.1$. What are the probabilities of 0 claims and of 1 claim next year for an insured selected at random, and how do they compare with a Poisson count with the same mean? {Example}
> - The number of claims is negative binomial with $r = 2$ and $\beta = 0.1$, with mean $0.2$.
> - The probability of 0 claims is $\frac{1}{1.1^{2}} = 0.8264$.
> - The probability of 1 claim is $\binom{2}{1}\frac{0.1}{1.1^{3}} = 0.1503$.
> - A Poisson count with mean 0.2 gives $e^{-0.2} = 0.8187$ and $0.2e^{-0.2} = 0.1637$.
> - The mixture puts more probability on 0 claims and on large numbers of claims, and its variance is $2(0.1)(1.1) = 0.22$ against 0.2.

## Updating the mixing distribution

The mixing distribution is the prior distribution of a risk's rate. After the risk has $n$ events by time $t$, [[Bayes Theorem|Bayes' theorem]] gives the [[Posterior Distribution|posterior distribution]] of its rate. For a discrete mixing distribution, the posterior probability of the rate $\lambda_j$ is

> $$P(\Lambda = \lambda_j \mid N(t) = n) = \frac{P(\Lambda = \lambda_j)\,e^{-\lambda_j t}\lambda_j^n}{\sum_i P(\Lambda = \lambda_i)\,e^{-\lambda_i t}\lambda_i^n}$$

The expected number of events in a future period is the posterior mean of the rate multiplied by the length of the period. For a group of identical risks, it is multiplied by the number of risks as well.

> [!example]- In the motor portfolio above, a driver has exactly 1 claim in a year. What is the probability that the driver has rate 0.8, and what is the driver's expected number of claims next year? {Example}
> - The weight of rate 0.2 is $0.75 \times e^{-0.2} \times 0.2 = 0.12281$.
> - The weight of rate 0.8 is $0.25 \times e^{-0.8} \times 0.8 = 0.08987$.
> - The probability of rate 0.8 is $\frac{0.08987}{0.12281 + 0.08987} = 0.4225$.
> - The expected number of claims next year is $0.5775(0.2) + 0.4225(0.8) = 0.4535$, against the portfolio mean of 0.35.

For a gamma mixing distribution with shape $\alpha$ and scale $\theta$, the posterior is gamma with shape $\alpha + n$ and scale $\theta/(1 + \theta t)$. The posterior mean is

> $$E[\Lambda \mid N(t) = n] = \frac{\alpha + n}{1/\theta + t}$$

The posterior mean is a [[Bayesian Credibility|credibility]] weighted average of the risk's observed rate $n/t$ and the prior mean $\alpha\theta$:

> $$E[\Lambda \mid N(t) = n] = Z\,\frac{n}{t} + (1 - Z)\,\alpha\theta$$

- $Z = \frac{t}{t + 1/\theta}$ is the credibility factor, which increases with $t$.

> [!example]- Annual claim rates are gamma distributed with $\alpha = 2$ and $\theta = 0.1$. An insured has 3 claims in 2 years. What is the posterior mean of its claim rate? {Example}
> - The posterior mean is $\frac{2 + 3}{10 + 2} = \frac{5}{12} = 0.4167$.
> - The credibility factor is $Z = \frac{2}{2 + 10} = \frac{1}{6}$.
> - The observed rate is $3/2 = 1.5$ and the prior mean is $2 \times 0.1 = 0.2$.
> - As a check, $\frac{1}{6}(1.5) + \frac{5}{6}(0.2) = 0.25 + 0.1667 = 0.4167$.
