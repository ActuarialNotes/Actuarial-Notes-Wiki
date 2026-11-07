---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:874240f558a131ea6bfbd5ff655ce55b593c259311b5a00d338af4e595a8e995
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Full Credibility Standard.md
---

![[Media/Figures/Full_Credibility_Standard.svg|340]]

A **Full Credibility Standard** is the volume of experience at which [[Limited Fluctuation Credibility|limited fluctuation credibility]] gives the observed experience a credibility of $Z = 1$. It is the smallest volume for which the observed value $W$ is within $100k\%$ of its expected value with probability $p$:

> $$P\big(|W - E[W]| \le k\,E[W]\big) \ge p$$

The probability $p$ is the probability level and $k$ is the range parameter. The pair $(p, k)$ is chosen by the actuary, and it defines the standard. At or above the standard the estimate is the observed experience alone, with no weight on the [[Complement of Credibility|complement of credibility]].

Approximating $W$ by a [[Normal Distribution|normal distribution]], the full credibility standard for [[Poisson Distribution|Poisson]] claim counts, in expected claims, is

> $$\lambda_0 = \left(\frac{z_{(1+p)/2}}{k}\right)^{2}$$

- $z_{(1+p)/2}$ is the $(1+p)/2$ quantile of the standard normal distribution, because the range is two-sided.

> [!example]- Claim counts are Poisson. How many expected claims are needed for the observed frequency to be within 5% of its expected value with probability 90%? {Example}
> - The range is two-sided, so $z$ is the $(1 + 0.90)/2 = 0.95$ quantile: $p = 0.90 \Rightarrow z_{0.95} = 1.645$, and $k = 0.05$.
> - $\lambda_0 = (1.645/0.05)^2 = 32.9^2 = 1{,}082.4$.
> - The standard is $1{,}082$ expected claims. Halving the range to $k = 0.025$ quadruples it to 4,330 claims.

> [!idea] The idea
> Every full credibility standard is $\lambda_0$ times the squared [[Coefficient of Variation|coefficient of variation]] of one unit of what is being estimated, counted in that unit.

The observed value is the mean of $n$ units, so its squared coefficient of variation is $\mathrm{CV}^2/n$. The condition above holds when $\mathrm{CV}^2/n \le (k/z_{(1+p)/2})^2$, that is when $n \ge \lambda_0\,\mathrm{CV}^2$.

## Full credibility for claim frequency

When each exposure's claim count $N$ has mean $E[N]$ and variance $\text{Var}(N)$, the full credibility standard for claim frequency, in expected claims, is

> $$n_F = \lambda_0\,\frac{\text{Var}(N)}{E[N]}$$

For Poisson claim counts $\text{Var}(N) = E[N]$, so the standard reduces to $n_F = \lambda_0$ expected claims.

> [!example]- Each exposure's claim count has mean $0.10$ and variance $0.15$. What is the full credibility standard for frequency at $p = 0.90$ and $k = 0.05$? {Example}
> - The ratio of the variance to the mean is $0.15/0.10 = 1.5$.
> - $n_F = 1{,}082.4 \times 1.5 = 1{,}623.6$ expected claims.
> - At $0.10$ claims per exposure that is $1{,}623.6/0.10 = 16{,}236$ exposures.

## Full credibility for claim severity

When claim sizes $X$ have coefficient of variation $\mathrm{CV}_X$, the full credibility standard for claim severity, in claims, is

> $$n_F = \lambda_0\,\mathrm{CV}_X^{2}$$

- $\mathrm{CV}_X = \sqrt{\text{Var}(X)}/E[X]$.

The volume counted against this standard is the number of claims actually observed, since severity is an average over claims.

> [!example]- Claim sizes have mean 3,000 and standard deviation 6,000. What is the full credibility standard for severity at $p = 0.90$ and $k = 0.05$? {Example}
> - $\mathrm{CV}_X = 6{,}000/3{,}000 = 2$, so $\mathrm{CV}_X^2 = 4$.
> - $n_F = 1{,}082.4 \times 4 = 4{,}330$ claims.

## Full credibility for aggregate loss and pure premium

For an [[Aggregate Loss Model|aggregate loss]] or a [[Pure Premium|pure premium]], the full credibility standard, in expected claims, is

> $$n_F = \lambda_0\left[\frac{\text{Var}(N)}{E[N]} + \mathrm{CV}_X^{2}\right]$$

With Poisson claim counts the frequency term is $1$, so $n_F = \lambda_0\,(1 + \mathrm{CV}_X^2)$ expected claims. The aggregate loss and the pure premium share one standard, because the pure premium is the aggregate loss divided by a fixed number of exposures.

> [!example]- Claim counts are Poisson, and claim sizes have mean 3,000 and standard deviation 6,000. What is the full credibility standard for aggregate losses at $p = 0.90$ and $k = 0.05$? {Example}
> - $\mathrm{CV}_X^2 = (6{,}000/3{,}000)^2 = 4$.
> - $n_F = 1{,}082.4 \times (1 + 4) = 5{,}412$ expected claims.
> - The severity variation multiplies the frequency standard by five.

## Full credibility standard in exposures

A standard stated in claims converts to exposures by dividing by the expected claim frequency per exposure. Counted directly in exposures, the standard is

> $$n_F = \lambda_0\,\frac{\text{Var}(N)}{E[N]^{2}}$$

- $N$ is the claim count of one exposure.

> [!example]- Each exposure has at most one claim, with probability $0.04$. How many exposures are needed for full credibility of the frequency at $p = 0.95$ and $k = 0.05$? {Example}
> - The claim count of one exposure is Bernoulli, with $E[N] = 0.04$ and $\text{Var}(N) = 0.04 \times 0.96 = 0.0384$.
> - $p = 0.95$ gives $z_{0.975} = 1.96$, so $\lambda_0 = (1.96/0.05)^2 = 1{,}536.6$.
> - $n_F = 1{,}536.6 \times 0.0384/0.04^2 = 36{,}879$ exposures, or $1{,}475$ expected claims.

> [!trap] Claims compared with exposures
> A standard of $1{,}082$ claims is not met by $1{,}082$ car years. At $0.05$ claims per car year it takes $1{,}082/0.05 = 21{,}640$ car years. Put the observed volume and the standard in the same unit before comparing them.
