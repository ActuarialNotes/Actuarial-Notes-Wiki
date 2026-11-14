---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bba9cd11f747c349a5b2f10fe4e578975d3233e0b2edd1ad9a4fefc08bff5baa
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06 frequency, severity, probability sources, mode/median, measures that matter most, sha256:b1b3f4d398fc20b80cf6d2c1861bf4bdf0a442a933224686daa102c72ecb18be — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-01-quantification-of-uncertainty-.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06 range, variance, SD, CV, deviation as surprise, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05 exposure unit (Galveston), sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html"
    - "NIST SP 800-30 Rev. 1, Guide for Conducting Risk Assessments (2012), §2.3 pp.6-11 (risk = f(likelihood, impact); likelihood over a time frame; impact = magnitude of harm), sha256:f214087f0bdb35932a28c16eb93932a33c67a6edfb5e6f1638866bd201c98e04 — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-30r1.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.117-118 (PDF p.19) solvency vs performance measures, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Basic Risk Measures.md
---

**Basic risk measures** are the descriptive figures a risk manager uses to size up a loss exposure before deciding how to treat it: how often losses happen, how large they are, what outcome is typical (central tendency) and how far outcomes stray from it (dispersion, or volatility).

## Frequency and severity

An exposure is the enterprise, property, person or activity that faces a possible loss ([[Loss Exposure]]). [[Frequency]] relates the count of losses to the number of exposure units, such as workplace injuries to the number of employees, so that a larger operation is not mistaken for a riskier one. Over a stated period, frequency is

> $$\text{Frequency} = \frac{\text{number of losses}}{\text{number of exposure units}}$$

A frequency of 0.08 means 8 losses per 100 units a year. [[Probability]] is the relative frequency with which an event occurs. It is estimated from historical relative frequency (mortality tables), from theory or engineering (the failure likelihood of a bridge), or, where neither exists, subjectively by expert opinion.

[[Severity]] is the size of a loss, measured as the average loss per claim, which is

> $$\text{Severity} = \frac{\text{total losses}}{\text{number of losses}}$$

Frequency times severity gives the loss per exposure unit. Frequency and severity over a stated period are usually the measures that matter most, and treatment aims to lower one or both. The pair places an exposure in the risk management matrix that points towards retention, loss control, insurance or avoidance ([[Risk Treatment]]).

> [!example]- Is this delivery fleet becoming less safe? {Example}
> A delivery company's operations manager says the fleet is becoming less safe because its auto physical damage claims rose every year:
>
> | Year | Vehicles | Claims | Losses ($) |
> | :--- | ---: | ---: | ---: |
> | 1 | 200 | 20 | 90,000 |
> | 2 | 300 | 24 | 120,000 |
> | 3 | 400 | 28 | 154,000 |
>
> > [!answer]-
> > - Frequency per vehicle-year is $20/200 = 0.10$, $24/300 = 0.08$ and $28/400 = 0.07$.
> > - Severity is $90{,}000/20 = \$4{,}500$, $120{,}000/24 = \$5{,}000$ and $154{,}000/28 = \$5{,}500$.
> > - The loss per vehicle-year is $\$450$, $\$400$ and $\$385$.
> > - Claim counts rose only because the fleet doubled, and per vehicle the frequency fell.
> > - The fleet is having fewer accidents for its size but more costly ones, so the useful questions are about what drives the cost of each claim.

## Central tendency

For a loss $X$ with possible outcomes $x_i$ and probabilities $p_i$, the [[Expected Value|expected value]] $\mu$ is the long-run average of all outcomes over many repetitions, which is

> $$\mu = E[X] = \sum_i p_i\, x_i$$

The expected value may not be a possible outcome at all. The [[Median|median]] is the 50 percent mark, with half the outcomes above and half below, and the [[Mode|mode]] is the single most likely value. For a loss distribution with rare large losses the three differ widely, and the expected value says nothing about the risk.

## Dispersion

Risk is the deviation of actual outcomes from the expected value. The *range*, highest outcome minus lowest, is a rough measure of the worst-case spread, but it ignores how likely the extremes are. Two exposures with the same range can reach their extremes with very different probabilities.

The [[Variance|variance]] averages the squared deviations, weighting each by its probability, and is in squared units. The [[Standard Deviation|standard deviation]] $\sigma$ returns to the original units, and is

> $$\sigma = \sqrt{\sum_i p_i\, (x_i - \mu)^2}$$

The larger of two exposures usually has the larger standard deviation. When two exposures have different means, the [[Coefficient of Variation|coefficient of variation]] compares their risk relative to their size, and is

> $$\text{CV} = \frac{\sigma}{\mu}$$

> [!example]- Why would budgeting the expected value each year not settle this warehouse's fire risk? {Example}
> A distributor estimates its warehouse's annual fire loss as:
>
> | Loss ($) | Probability |
> | ---: | ---: |
> | 0 | 0.80 |
> | 10,000 | 0.12 |
> | 50,000 | 0.06 |
> | 400,000 | 0.02 |
>
> > [!answer]-
> > - The expected value is $1{,}200 + 3{,}000 + 8{,}000 = \$12{,}200$.
> > - The median and the mode are both $\$0$, because no loss carries 80 percent of the probability.
> > - The range is $400{,}000 - 0 = \$400{,}000$.
> > - The probability-weighted squared deviations sum to $\sigma^2 = 3{,}213{,}160{,}000$, so $\sigma \approx \$56{,}685$.
> > - The coefficient of variation is $56{,}685/12{,}200 \approx 4.65$, almost all of it from the rare large fire.
> > - In most years the loss is nothing, and in one year in fifty it is \$400,000, so a budget of \$12,200 would not cover the loss that matters.

## Solvency-related and performance-related measures

The CAS's 2003 ERM overview sorts the measures used in ERM into two groups. *Solvency-related* measures look at the adverse tail of the distribution, such as the probability of ruin (the chance that capital is exhausted) and shortfall risk (the chance of falling below a threshold). They concern customers and their proxies, such as regulators and rating agencies. *Performance-related* measures look at the region near the mean, such as the variance, the standard deviation and the semivariance, which counts only unfavourable deviations. They concern owners and their proxies, such as stock analysts.

Tail measures such as value at risk and tail value at risk, and the properties that make a risk measure coherent, are covered in [[Risk Measure]].

> [!trap] Treating a rising claim count as rising frequency
> A rising number of claims means nothing until it is divided by the exposure base. A growing operation produces more claims at the same frequency.
