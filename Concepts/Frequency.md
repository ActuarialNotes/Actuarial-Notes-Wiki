---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:ab622e81bd400a5492bdd90fd427709ab9df290e490d67125d4519c283396cbe
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.7 (PDF p.19), Ch. 6 pp.93-94 (PDF pp.105-106), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Frequency.md
---

![[Media/Figures/Frequency.svg|340]]

**Frequency** is the number of [[Claim|claims]] per unit of exposure. The frequency of a group of risks over a period is

> $$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$

- The [[Earned Exposure|earned exposures]] are measured in the unit of the [[Exposure Base|exposure base]], such as car-years, employee-years or $\$100$ of payroll.

A vehicle-year is one vehicle insured for one year, so the earned vehicle-years of a fleet are the number of vehicles multiplied by the fraction of the year each is insured. The same claims measured in a smaller unit of exposure give a proportionally larger frequency. Claims per car-year and claims per six-month policy term are different quantities. Frequency also depends on which claims are counted: reported claims, closed claims and claims with payment give three different frequencies from the same data. A frequency computed on reported counts at an early age is too low, because claims are still being reported, so the counts are first developed to ultimate with a [[Claim Count Triangle|claim count triangle]].

> [!example]- A fleet insures 50 vehicles from January 1 to June 30 and 150 vehicles from July 1 to December 31. It has 12 claims during the year. What is its claim frequency? {Example}
> - The first half of the year contributes $50 \times 0.5 = 25$ vehicle-years.
> - The second half of the year contributes $150 \times 0.5 = 75$ vehicle-years.
> - The earned exposure is $25 + 75 = 100$ vehicle-years.
> - The frequency is $12/100 = 0.12$ claims per vehicle-year.

## Pure premium

The [[Pure Premium|pure premium]] is the expected loss per unit of exposure. It is the product of frequency and [[Severity|severity]], the average cost per claim:

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

Both components are measured at ultimate. The [[Frequency-Severity Method|frequency-severity method]] selects and trends the two separately.

> [!example]- A workers compensation book has 25,000 employee-years of exposure and 1,750 ultimate claims, and its ultimate severity is 18,000. What are its frequency and its pure premium? {Example}
> - The frequency is $1{,}750/25{,}000 = 0.070$ claims per employee-year.
> - The pure premium is $0.070 \times 18{,}000 = 1{,}260$ per employee-year.

## Changes in frequency and severity

Because the pure premium is a product, its change factor is the product of the change factors of frequency and severity:

> $$1 + \Delta_{PP} = (1 + \Delta_{F})(1 + \Delta_{S})$$

- $\Delta_{PP}$, $\Delta_{F}$ and $\Delta_{S}$ are the percentage changes in pure premium, frequency and severity.

Frequency responds to the mix of risks, underwriting, the claim environment and coverage terms. Severity responds to inflation in medical, wage and repair costs, which frequency is much less sensitive to. The two are therefore trended separately ([[Loss Trend|loss trend]]), and the larger of the two changes points to the cause of a change in the pure premium.

> [!example]- A personal auto book had 3,000 claims on 50,000 car-years with losses of 12,000,000 in one year, and 3,744 claims on 52,000 car-years with losses of 17,160,000 two years later. How much did frequency and severity change, and which drove the change in pure premium? {Example}
> - Frequency moved from $3{,}000/50{,}000 = 0.0600$ to $3{,}744/52{,}000 = 0.0720$, a change of $+20.0\%$.
> - Severity moved from $12{,}000{,}000/3{,}000 = 4{,}000$ to $17{,}160{,}000/3{,}744 = 4{,}583$, a change of $+14.6\%$.
> - The pure premium moved from 240 to 330, a change of $+37.5\%$, and $1.200 \times 1.146 = 1.375$.
> - Frequency moved more, which points to a change in the mix of drivers, in underwriting, or in what is reported as a claim, rather than to inflation.

## Frequency of a Poisson number of claims

Suppose the number of claims on an exposure of $n$ units is Poisson with mean $\lambda n$, where $\lambda$ is the expected number of claims per unit of exposure. The observed frequency $F = N/n$ has mean

> $$E[F] = \lambda$$

and variance

> $$\text{Var}(F) = \frac{\lambda}{n}$$

- $N$ is the number of claims, with $E[N] = \text{Var}(N) = \lambda n$.

The observed frequency is an unbiased estimate of $\lambda$, and its variance falls as the exposure grows.

> [!example]- A commercial auto book has 5,000 vehicle-years of exposure, and its claims follow a Poisson process with 0.06 claims per vehicle-year. What are the mean and the standard deviation of its observed frequency? {Example}
> - The mean of the observed frequency is 0.06.
> - Its variance is $0.06/5{,}000 = 0.000012$.
> - Its standard deviation is $\sqrt{0.000012} = 0.00346$.
