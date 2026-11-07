---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:198d62583687155342a08fed6246f6e8c01df6a6ba75a4b3e259e5839f466a6c
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

**Credibility** is the weight $Z$, between 0 and 1, given to a body of observed experience when it is blended with a [[Complement of Credibility|complement of credibility]] to estimate a future value. The credibility-weighted estimate is

> $$U = Z D + (1 - Z) M$$

- $D$ is the observed experience.
- $M$ is the complement of credibility.

Credibility reflects how much predictive value the experience has, given its volume and stability. Its role in ratemaking is to make a rate change reflect the signal in the data rather than the noise in sparse or erratic data.

Credibility increases with the volume of experience, so a larger risk's own experience earns more weight. Experience from few exposures or a single year has low credibility. It can be supplemented by lengthening the experience period, or by a complement such as industry data, which adds volume and reduces volatility.

> [!example]- A workers compensation class has 75 claims against a full credibility standard of 1,082 claims. Its indicated relativity is 1.25, and the current relativity is 1.00. What is the credibility-weighted relativity? {Example}
> - By the [[Partial Credibility|square-root rule]], $Z = \sqrt{75/1{,}082} = \sqrt{0.0693} = 0.263$.
> - The estimate is $0.263(1.25) + 0.737(1.00) = 1.066$.
> - With 75 claims, a 1.25 indication is well within the range that random fluctuation alone could produce.
> - The complement here is the current relativity. Where a larger related group's relativity is available, such as the countrywide relativity for the same class, it is usually the better complement.

## Limited fluctuation credibility

[[Limited Fluctuation Credibility|Limited fluctuation (classical) credibility]] gives full weight once the experience is large enough to be stable, within a chosen range of its expected value with a chosen probability. That volume is the [[Full Credibility Standard|full credibility standard]] $n_F$, and below it the credibility is

> $$Z = \min\left(\sqrt{\frac{n}{n_F}},\; 1\right)$$

- $n$ is the volume of the experience, in the same unit as $n_F$.

When the experience is fully credible, the indication is used as it is, with no weight on the complement.

## Bühlmann credibility

[[Bühlmann Credibility|Bühlmann (greatest accuracy) credibility]] derives $Z$ from how much the risks differ, not from a stability standard. With $n$ observations, the credibility is

> $$Z = \frac{n}{n + k}$$

- $k = v/a$ is the [[Expected Value of Process Variance|expected value of the process variance]] (EPV) divided by the [[Variance of Hypothetical Means|variance of the hypothetical means]] (VHM).

Credibility rises when risks genuinely differ from one another (large VHM) and falls when each risk's own results are noisy (large EPV).

> [!example]- An account has 400 claims, and the full credibility standard is 1,082 claims. A Bühlmann analysis of its class gives $\text{EPV} = 2{,}500$ and $\text{VHM} = 4$. What credibility does each method give? {Example}
> - The classical credibility is $\sqrt{400/1{,}082} = 0.608$.
> - The Bühlmann parameter is $k = 2{,}500/4 = 625$, so the Bühlmann credibility is $400/(400 + 625) = 0.390$.
> - The risks in the class are broadly alike and their results are noisy, so Bühlmann gives the account's own experience less weight than the claim-count standard does.

## Credibility and homogeneity

A class must be large enough for its experience to give credible predictions. Splitting a book into finer classes makes each class more [[Homogeneity|homogeneous]], but it shrinks the volume of data in each, which lowers each class's credibility. For the same reason, [[Classification Ratemaking|classification rating]] suits many small, homogeneous risks, none of whose own experience is credible, and a rating characteristic may be left out when there is too little data at a level to estimate a stable relativity.

## Credibility in reserving

The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] ultimate is a credibility-weighted average of the development method ultimate and the expected claims ultimate:

> $$\text{Ultimate}_{\text{BF}} = Z \cdot \text{Ultimate}_{\text{dev}} + (1 - Z) \cdot \text{Ultimate}_{\text{exp}}$$

- $Z = 1/\text{CDF}$, the reciprocal of the [[Cumulative Development Factor|cumulative development factor]].

> [!example]- An accident year has reported losses of 600, a cumulative development factor of 1.5 and expected losses of 1,000. What is its Bornhuetter-Ferguson ultimate? {Example}
> - The development method ultimate is $600 \times 1.5 = 900$.
> - $Z = 1/1.5 = 0.667$.
> - The ultimate is $0.667(900) + 0.333(1{,}000) = 933.3$, the same as $600 + (1 - 1/1.5)(1{,}000)$.

## Credibility on Exam 8

Credibility can also be measured from a plan's own experience, such as one car's accident record in [[Merit Rating|merit rating]], and extended to several correlated means at once in [[Multi-Dimensional Credibility|multi-dimensional credibility]].
