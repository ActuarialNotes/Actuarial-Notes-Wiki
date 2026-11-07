---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7fad9378aec27c1cef23074336110bc7bbcf935c9e7394541f5e1dc67b1c986c
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 4, §4.4.4 Conjugate Distributions, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Frees et al., Loss Data Analytics (open text), Appendix B, §16.3 Conjugate Distributions, sha256:66a757e0d3dfdac6e4196cd9458ad437bb4ea690dca28797e4c1fe403c5f9e92 — https://openacttexts.github.io/Loss-Data-Analytics/CAppB.html"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Conjugate Prior.md
---

![[Media/Figures/Conjugate_Prior.svg|340]]

A **Conjugate Prior** is a prior distribution for a risk parameter that, combined with a given likelihood, produces a [[Posterior Distribution|posterior distribution]] in the *same* family. Updating then reduces to arithmetic on the parameters, which is what makes [[Bayesian Credibility|Bayesian credibility]] computable by hand. The pairs to know, with $n$ observations $x_1, \ldots, x_n$:

| Likelihood | Prior | Posterior | Credibility $k$ |
| :--- | :--- | :--- | :--- |
| Poisson$(\lambda)$ | Gamma$(\alpha, \beta)$, scale $\beta$ | Gamma$\left(\alpha + \sum x_i,\; \frac{\beta}{1 + n\beta}\right)$ | $1/\beta$ |
| Bernoulli / Binomial | Beta$(a, b)$ | Beta$\left(a + \sum x_i,\; b + n - \sum x_i\right)$ | $a + b$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu, \tau^2)$ | Normal, precision-weighted | $\sigma^2/\tau^2$ |
| Exponential, mean $\theta$ | Inverse gamma$(\alpha, \beta)$ | Inverse gamma$(\alpha + n,\; \beta + \sum x_i)$ | $\alpha - 1$ |

For the binomial, $n$ counts the Bernoulli trials.

> [!idea] The idea
> Every posterior mean in the table is linear in $\bar{x}$, so for a conjugate pair the [[Bühlmann Credibility|Bühlmann]] and Bayesian estimates are identical, not merely close.

The prior's parameters act like observations already seen. A gamma prior with shape $\alpha$ and scale $\beta$ behaves like $1/\beta$ exposures with $\alpha$ claims. Outside a conjugate pair the posterior generally has no closed form, and Bühlmann is a linear approximation to it.

## Poisson likelihood with a gamma prior

For Poisson counts with mean $\lambda$, and a gamma prior with shape $\alpha$ and scale $\beta$, the posterior mean of $\lambda$ is

> $$E[\lambda \mid \mathbf{x}] = \left(\alpha + \sum x_i\right)\frac{\beta}{1 + n\beta}$$

It equals $Z\bar{x} + (1 - Z)\alpha\beta$ with $Z = n/(n + 1/\beta)$.

> [!example]- A driver's annual claim count is Poisson, and its mean has a gamma prior with $\alpha = 2$ and $\beta = 0.10$. Over 3 years the driver reports 1 claim. What is the Bayesian estimate of next year's frequency? {Example}
> - The posterior is gamma with shape $2 + 1 = 3$ and scale $0.10/(1 + 0.3) = 0.0769$.
> - The posterior mean is $3 \times 0.0769 = 0.2308$.
> - As a check, $k = 1/0.10 = 10$ and $Z = 3/13 = 0.2308$, so $0.2308\left(\tfrac{1}{3}\right) + 0.7692(0.20) = 0.2308$.

## Binomial likelihood with a beta prior

For $n$ Bernoulli trials with $x$ successes, and a beta prior with parameters $a$ and $b$, the posterior is Beta$(a + x, b + n - x)$, with mean

> $$E[q \mid x] = \frac{a + x}{a + b + n}$$

- $q$ is the success probability.

It equals $Z\bar{x} + (1 - Z)\frac{a}{a + b}$ with $Z = n/(n + a + b)$.

> [!example]- A claim probability $q$ has a Beta$(1, 9)$ prior. In 20 policy years there are 4 claims. What is the posterior mean of $q$? {Example}
> - The posterior is Beta$(5, 25)$: the 4 claims are added to $a$, and the 16 claim-free years to $b$.
> - Its mean is $5/30 = 0.1667$.
> - In credibility form, $Z = 20/30$, so $\tfrac{2}{3}(0.2) + \tfrac{1}{3}(0.1) = 0.1667$.

## Normal likelihood with a normal prior

For normal observations with mean $\theta$ and known variance $\sigma^2$, and a normal prior with mean $\mu$ and variance $\tau^2$, the posterior is normal with mean

> $$E[\theta \mid \mathbf{x}] = Z\bar{x} + (1 - Z)\mu$$

- $Z = n/(n + \sigma^2/\tau^2)$.

The posterior variance is $(1/\tau^2 + n/\sigma^2)^{-1}$, so the precisions of the prior and the data add.

> [!example]- Observations are normal with variance 100, and their mean has a normal prior with mean 50 and variance 25. Four observations average 60. What is the posterior distribution of the mean? {Example}
> - $k = 100/25 = 4$, so $Z = 4/(4 + 4) = 0.5$.
> - The posterior mean is $0.5(60) + 0.5(50) = 55$.
> - The posterior variance is $1/(1/25 + 4/100) = 12.5$.

## Exponential likelihood with an inverse gamma prior

For exponential claim sizes with mean $\theta$, and an inverse gamma prior with parameters $\alpha$ and $\beta$, the posterior is inverse gamma with parameters $\alpha + n$ and $\beta + \sum x_i$, with mean

> $$E[\theta \mid \mathbf{x}] = \frac{\beta + \sum x_i}{\alpha + n - 1}$$

The prior mean is $\beta/(\alpha - 1)$.

> [!example]- Claim sizes are exponential with mean $\theta$, and $\theta$ is inverse gamma with $\alpha = 4$ and $\beta = 3{,}000$. A risk has 2 claims totalling 2,500. What is the Bayesian estimate of its mean claim size? {Example}
> - The prior mean is $3{,}000/3 = 1{,}000$.
> - The posterior mean is $(3{,}000 + 2{,}500)/(4 + 2 - 1) = 1{,}100$.
> - In credibility form, $k = 3$ and $Z = 2/5$, so $0.4(1{,}250) + 0.6(1{,}000) = 1{,}100$.
