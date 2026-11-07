---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:082abb18b487b2a9fa3b3b9c5637e98444638d1b71285a5325ffaad32280f283
  sources:
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, Ch. 9 §§9.2–9.6, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents pp. ix–x (PDF pp.11–12), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Content Outline 2026, p.2 Domain A; p.4 Tse Chs 6.1–6.3, 7.1–7.4, 8.1–8.2, 9.1–9.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Bühlmann Credibility.md"
---

![[Media/Figures/Bühlmann_Credibility.svg|340]]

**Bühlmann Credibility**, also called **greatest accuracy credibility**, is a [[Credibility|credibility]] method that estimates a risk's hypothetical mean $\mu(\Theta)$ by the linear function of its observations $X_1, \ldots, X_n$ with the smallest expected squared error. The credibility premium is

> $$Z\bar{X} + (1 - Z)\mu$$

- $\bar{X}$ is the mean of the risk's $n$ observations.
- $\mu = E[\mu(\Theta)]$ is the overall mean, the complement of credibility.

With $n$ observations the credibility is

> $$Z = \frac{n}{n + k}$$

- $k = v/a$ is the Bühlmann credibility parameter.
- $v$ is the [[Expected Value of Process Variance|expected value of the process variance]] (EPV).
- $a$ is the [[Variance of Hypothetical Means|variance of the hypothetical means]] (VHM).

$n$ counts observations of the unit $v$ and $a$ describe. When they describe one year's loss, each year of a policyholder's experience is one observation.

> [!example]- A risk has $v = 400$ and $a = 100$. Three years of observations give $\bar{X} = 50$, and the overall mean is $\mu = 40$. What is the credibility premium? {Example}
> - $k = 400/100 = 4$.
> - $Z = 3/(3 + 4) = 3/7 = 0.4286$.
> - The premium is $\frac{3}{7}(50) + \frac{4}{7}(40) = 21.43 + 22.86 = 44.29$.

> [!idea] The idea
> A risk's experience earns credibility when risks differ from one another and loses it when each risk's results are noisy.

A larger VHM lowers $k$ and raises $Z$, and a larger EPV raises $k$ and lowers $Z$. $Z$ rises toward 1 as $n$ grows but never reaches 1 for any finite $n$, unlike [[Limited Fluctuation Credibility|limited fluctuation credibility]].

## Computing the structural parameters

When the risks fall into types with known probabilities, $\mu$, $v$ and $a$ are found by weighting each type's hypothetical mean $\mu(\theta)$ and process variance $v(\theta)$ by its probability.

> [!example]- 60% of drivers have Poisson claim counts with mean 0.1 a year and 40% with mean 0.3. A driver has 1 claim in 2 years. What is the Bühlmann estimate of the driver's claims next year? {Example}
> - For a Poisson risk the hypothetical mean and the process variance both equal its mean.
> - $\mu = 0.6(0.1) + 0.4(0.3) = 0.18$, and $v = 0.18$.
> - $a = 0.6(0.1 - 0.18)^2 + 0.4(0.3 - 0.18)^2 = 0.0096$.
> - $k = 0.18/0.0096 = 18.75$, and $Z = 2/(2 + 18.75) = 0.0964$.
> - The driver's mean is $\bar{X} = 0.5$, so the estimate is $0.0964(0.5) + 0.9036(0.18) = 0.211$.

## Bühlmann and Bayesian credibility

The Bühlmann premium is the best linear approximation to the [[Bayesian Credibility|Bayesian premium]] $E[\mu(\Theta) \mid X_1, \ldots, X_n]$. The two are equal when the Bayesian premium is itself linear in the observations, as for a Poisson risk with a gamma prior, which is [[Exact Credibility|exact credibility]].

> [!trap] Observations counted in the wrong unit
> If $v$ and $a$ are for one year's aggregate loss, a policyholder with 3 years of experience has $n = 3$, not its number of claims. Count $n$ in the unit the structural parameters describe.
