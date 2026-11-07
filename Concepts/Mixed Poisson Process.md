---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:edcdb8eaed340f7cf41e90f5de8e7cd2013eeff6cf61a39992785c7b5ff7a4af
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

![[Media/Figures/Mixed_Poisson_Process.svg|340]]

A **Mixed Poisson Process** is a [[Counting Process|counting process]] $\{N(t), t \ge 0\}$ whose rate is a [[Random Variable|random variable]] $\Lambda$. Given $\Lambda = \lambda$, the process is a [[Poisson Process|Poisson process]] with rate $\lambda$, and the distribution of $\Lambda$ is the [[Mixing Distribution|mixing distribution]]. In a portfolio, each insured has its own rate, fixed over time, drawn from the mixing distribution. Given the rate, the probability of $k$ events by time $t$ is

> $$P(N(t) = k \mid \Lambda = \lambda) = \frac{e^{-\lambda t}(\lambda t)^k}{k!}$$

- $k = 0, 1, 2, \ldots$.

The mean of the number of events by time $t$ is

> $$E[N(t)] = t\,E[\Lambda]$$

Given $\Lambda$, the mean and the variance of $N(t)$ are both $t\Lambda$. By the [[Variance for Conditional and Marginal Distributions#The law of total variance|law of total variance]], the variance is

> $$
> \begin{aligned}
> \text{Var}(N(t)) &= E[\text{Var}(N(t) \mid \Lambda)] + \text{Var}(E[N(t) \mid \Lambda]) \\
> &= t\,E[\Lambda] + t^2\,\text{Var}(\Lambda)
> \end{aligned}
> $$

The variance is greater than the mean whenever $\text{Var}(\Lambda) > 0$. The term $t^2\,\text{Var}(\Lambda)$ comes from the differences in rate between insureds.

> [!example]- Half of a book of drivers have a claim rate of 0.1 per year and half have a rate of 0.3 per year. What are the mean and the variance of the number of claims in one year for a driver selected at random? {Example}
> - $E[\Lambda] = 0.5(0.1) + 0.5(0.3) = 0.2$.
> - $E[\Lambda^2] = 0.5(0.01) + 0.5(0.09) = 0.05$, so $\text{Var}(\Lambda) = 0.05 - 0.2^2 = 0.01$.
> - The mean number of claims is $E[N(1)] = 0.2$.
> - The variance is $\text{Var}(N(1)) = 0.2 + 0.01 = 0.21$, greater than the variance of 0.2 for a Poisson count with the same mean.

## Gamma distributed rate

When $\Lambda$ has a [[Gamma|gamma distribution]] with shape $\alpha$ and scale $\theta$, the number of events by time $t$ has a [[Negative Binomial Distribution#The form used on later exams|negative binomial distribution]] with parameters

> $$r = \alpha, \qquad \beta = \theta t$$

Its mean is $r\beta = \alpha\theta t$ and its variance is $r\beta(1 + \beta)$. The probabilities are worked out in [[Mixing Distribution#Gamma mixing distribution|gamma mixing distribution]].

> [!example]- Annual claim rates across a portfolio are gamma distributed with mean 0.2 and variance 0.04. What is the distribution of the number of claims in one year for an insured selected at random, and what is the probability of no claims? {Example}
> - For a gamma distribution, the mean is $\alpha\theta = 0.2$ and the variance is $\alpha\theta^2 = 0.04$, so $\theta = 0.2$ and $\alpha = 1$.
> - The number of claims in one year is negative binomial with $r = 1$ and $\beta = 0.2$.
> - Its variance is $1 \times 0.2 \times 1.2 = 0.24$.
> - The probability of no claims is $(1 + \beta)^{-r} = 1/1.2 = 0.8333$.

## Dependence between intervals

A mixed Poisson process has stationary increments, but its increments are not independent. Given $\Lambda$, the numbers of events in non-overlapping intervals are independent. Unconditionally they share the same unknown rate, and the covariance of the numbers of events in $(0, s]$ and $(s, s + t]$ is

> $$\text{Cov}(N(s),\ N(s + t) - N(s)) = s\,t\,\text{Var}(\Lambda)$$

> [!example]- Annual claim rates are gamma distributed with mean 0.2 and variance 0.04, and each insured's rate is fixed over time. What is the covariance of an insured's number of claims in the first year and in the following two years? {Example}
> - The first interval is $(0, 1]$, so $s = 1$, and the second is $(1, 3]$, so $t = 2$.
> - The covariance is $1 \times 2 \times 0.04 = 0.08$.
> - The covariance is positive, so a year with more claims predicts more claims in the following years.

## Expected future events given the past

Because the increments are dependent, an insured's own number of events predicts its future number. Given $n$ events by time $s$, the expected number of events in the next $t$ units of time is

> $$E[N(s + t) - N(s) \mid N(s) = n] = t\,E[\Lambda \mid N(s) = n]$$

- $E[\Lambda \mid N(s) = n]$ is the mean of the posterior distribution of the rate, found by [[Mixing Distribution#Updating the mixing distribution|updating the mixing distribution]].

A larger number of past events makes the higher rates more likely, so the posterior mean rises with $n$. A record with no events lowers it.

> [!example]- In a portfolio, 70% of drivers have a claim rate of 0.1 per year and 30% have a rate of 0.5 per year. A driver selected at random has no claims in one year. What is the driver's expected number of claims next year? {Example}
> - The probability of no claims is $e^{-0.1} = 0.90484$ for a driver with rate 0.1 and $e^{-0.5} = 0.60653$ for a driver with rate 0.5.
> - The joint probabilities are $0.7 \times 0.90484 = 0.63339$ and $0.3 \times 0.60653 = 0.18196$, whose sum is $0.81535$.
> - The posterior probability of rate 0.5 is $0.18196/0.81535 = 0.2232$, and of rate 0.1 is $0.7768$.
> - The expected number of claims next year is $0.7768(0.1) + 0.2232(0.5) = 0.1893$, below the portfolio mean of 0.22.

> [!trap] Adding the yearly variances when the rate is fixed
> When one rate is drawn and kept, the yearly numbers of claims are positively correlated. With the drivers in the first example, adding the two yearly variances gives $0.21 + 0.21 = 0.42$ for two years. The variance is $\text{Var}(N(2)) = 2(0.2) + 2^2(0.01) = 0.44$, which includes twice the covariance of 0.01. The yearly variances add only when a new rate is drawn independently each year.
