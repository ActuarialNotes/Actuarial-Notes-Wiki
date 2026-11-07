---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3253b64e9621ef0b03b6385eea19ae90b0fbf291c7d8d5c6702203e5ed8ff84
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.218-222 (PDF pp.230-234), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.30 (PDF p.36), Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
    - "AN ACTUARIAL NOTE ON THE CREDIBILITY OF EXPERIENCE OF A SINGLE PRIVATE PASSENGER CAR, Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS 1959), pp.159-164 (PDF pp.1-6): Table 1-3, Appendix I-II, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), pp.75-83 (PDF pp.3-11), eqs (1)-(4), Tables C-D, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credibility.md
---

![[Media/Figures/Credibility.svg|340]]

**Credibility** is a measure of the predictive value the actuary attaches to a particular body of data, in ASOP No. 25's words. It is written $Z$, and it is the weight the observed experience receives when it is blended with related experience, the [[Complement of Credibility|complement of credibility]], into an estimate more accurate than either. The credibility-weighted estimate is

> $$\text{Estimate} = Z \times \text{Observed Experience} + (1 - Z) \times \text{Complement}$$

- $\text{Observed Experience}$ is the estimate from the subject's own data, also called the base statistic.
- $\text{Complement}$ is the estimate from the related experience.

The same blend weights an indicated rate change, an indicated relativity or a pure premium. When an indicated change factor is weighted, the result is a factor, and one is subtracted to give the change. Before indicated and current relativities are blended, each set is normalized so that its weighted average relativity is $1.00$, and the results may then be rebased so that the base class's relativity is $1.00$. With full credibility, $Z = 1$ and the indication uses the experience alone, with no complement.

> [!example]- An observed pure premium of $\$200$ has credibility $Z = 0.30$, and the pure premium of the related experience is $\$300$. What is the credibility-weighted pure premium? {Example}
> - The observed experience receives $0.30$ and the complement $0.70$.
> - The credibility-weighted pure premium is $0.30 \times 200 + 0.70 \times 300 = \$270$.

## Criteria for a measure of credibility

For homogeneous risks, a measure of credibility meets three criteria:

1. $Z$ is at least $0$ and at most $1$: no negative credibility, and full credibility is the cap.
2. $Z$ increases as the size of the risk underlying the estimate increases, all else being equal.
3. $Z$ increases at a decreasing rate as the size of the risk increases.

Experience from few exposures or a single year has low credibility. It is supplemented by lengthening the experience period or by a complement such as industry data, a larger related class or external data. Supplementing a small insurer's data with industry data increases the volume and reduces the volatility.

## Classical credibility

Classical, or [[Limited Fluctuation Credibility|limited fluctuation]], credibility is the method most often used in ratemaking. Its goal is to limit the effect that random fluctuations in the observations have on the estimate. The experience is fully credible when the probability $p$ is high that it is within $k$ of its expected value. With homogeneous exposures, Poisson claim counts and no variation in claim size, the expected number of claims needed for full credibility is

> $$n_{\text{full}} = \left(\frac{z}{k}\right)^2$$

- $z$ is the standard normal percentile at $(1 + p)/2$, since the interval is two-sided.
- $k$ is the allowed tolerance around the expected value.

The standard is a number of claims. Divided by the expected frequency, it becomes a number of exposures. When the size of loss is allowed to vary, the standard is multiplied by $1 + \text{CV}^2$, where $\text{CV}$ is the coefficient of variation of the claim size, its standard deviation over its mean.

> [!example]- The experience is to be within $5\%$ of its expected value with probability $90\%$. How many claims are needed for full credibility, and how many exposures at a $5\%$ frequency? {Example}
> - The percentile is at $(1 + 0.90)/2 = 0.95$, so $z = 1.645$.
> - The claims needed are $(1.645/0.05)^2 = 1{,}082$.
> - At a $5\%$ frequency, the exposures needed are $1{,}082/0.05 = 21{,}640$.
> - If the claim size has a coefficient of variation of $1.5$, the standard rises to $1{,}082 \times (1 + 1.5^2) = 3{,}517$ claims.

Below the standard, partial credibility follows the square root rule:

> $$Z = \min\left(\sqrt{\frac{n}{n_{\text{full}}}},\, 1\right)$$

- $n$ is the number of claims in the experience, or the expected claim count, the exposures times the frequency.

$n$ and $n_{\text{full}}$ are counted in the same unit, both claims or both exposures. The method is the most commonly used and so generally accepted, its data is readily available and its computations are easy. Its disadvantages are that it rests on simplifying assumptions that may not hold, such as no variation in claim size, and that it does not consider the quality of the complement against the observation.

> [!example]- A class has 100 claims against the full credibility standard of 1,082. What is its credibility? {Example}
> - The claims are below the standard, so the square root rule applies.
> - The credibility is $Z = \sqrt{100/1{,}082} = 0.30$.

## Bühlmann credibility

[[Bühlmann Credibility|Bühlmann credibility]], or least squares credibility, chooses $Z$ to minimize the squared error between the estimate and the true expected value. Its complement is a prior mean, the actuary's a priori estimate, and its credibility is

> $$Z = \frac{N}{N + K}$$

- $N$ is the number of observations, such as exposures or years.
- $K = \text{EVPV}/\text{VHM}$, the expected value of the process variance over the variance of the hypothetical means.

A higher VHM lowers $K$ and raises credibility, and a higher EVPV raises $K$ and lowers it. Experience is more credible when risks differ greatly from one another and each risk's own experience is stable. If every exposure has the same claim distribution, $\text{VHM} = 0$ and $Z = 0$. The method assumes that the risk parameters and the risk process do not shift over time. Its major challenge is estimating EVPV and VHM. Bayesian analysis, the third method, calculates no $Z$ at all: it adjusts the prior estimate for the new information through Bayes' theorem.

> [!example]- An observed pure premium of $\$200$ is based on 21 observations. The EVPV is $2.00$, the VHM is $0.50$ and the prior mean is $\$225$. What is the Bühlmann credibility-weighted pure premium? {Example}
> - The Bühlmann parameter is $K = 2.00/0.50 = 4.00$.
> - The credibility is $Z = 21/(21 + 4) = 0.84$.
> - The credibility-weighted pure premium is $0.84 \times 200 + 0.16 \times 225 = \$204$.

## Credibility and homogeneity

Splitting data into more segments makes each more [[Homogeneity|homogeneous]] but reduces its volume, increasing its variability and lowering its credibility. In risk classification, a class must be large enough for credible predictions of its costs, and its estimates should be stable from year to year while still responding to real changes. Classification rating suits many small, homogeneous risks, where no one risk's experience is credible but groups of similar risks give credible relativities. A rating characteristic may be left out when there is too little data at its level for a stable relativity. In a GLM, levels with low exposure have low credibility, and their indicated relativities are adjusted when relativities are selected.

> [!example]- A workers compensation class has 75 claims against the standard of 1,082. Its indicated relativity is $1.25$ and its current relativity, the complement, is $1.00$. What relativity is selected? {Example}
> - The credibility is $Z = \sqrt{75/1{,}082} = 0.263$.
> - The weighted relativity is $0.263 \times 1.25 + 0.737 \times 1.00 = 1.066$.
> - Only about a quarter of the indicated $25\%$ difference moves into the rate.

## Credibility in reserving

The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] ultimate is a credibility-weighted average of the development method's ultimate and the expected claims ultimate. The credibility is the percent reported, or paid, $Z = 1/\text{CDF}$. In the same way, chain ladder and Stanard-Bühlmann IBNR can be blended with $Z$ equal to a selected credibility factor times the percent reported at the starting evaluation, $Z$ on the chain ladder and $1 - Z$ on Stanard-Bühlmann. For a ratio such as the percent recovered, a Bühlmann-Straub weighting uses $Z = \text{VHM}/(\text{VHM} + \text{EVPV})$, with the estimate $Z$ times the data-based estimate plus $1 - Z$ times the prior mean.

## Credibility in experience and merit rating

The credibility given to a risk's own experience increases with its size, because larger risks have more stable losses. It also depends on how much the hazards of individual risks vary within the class. The more heterogeneous the class, the more credibility experience rating earns. A [[Merit Rating|merit rating]] modification for a group is $Z \times R + (1 - Z)$, where $R$ is its relative frequency and the complement is $1.0$. A frequency estimate may also weight several recent periods, each with its own $Z$, plus $1 - Z$ times the overall mean. [[Multi-Dimensional Credibility|Multi-dimensional credibility]] extends the blend to several correlated means at once, and a single-dimensional estimate is $Z$ times the sector's observed mean plus $1 - Z$ times the complement's mean. In excess pricing, experience and exposure estimates of a layer's loss cost are blended the same way, $Z$ on the experience estimate.

> [!trap] Mixing claims and exposures in the square root rule
> The square root rule compares like with like. A class with 400 exposures at a $5\%$ frequency has 20 expected claims, so against a standard of 1,082 claims its credibility is $\sqrt{20/1{,}082} = 0.14$. Comparing its 400 exposures with the claim standard gives $0.61$.
