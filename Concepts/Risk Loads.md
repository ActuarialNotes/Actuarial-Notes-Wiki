---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:13914b54bf7c69a44df9f3d98cdbd69ff92bb0390ddc1b57555f3e16d56b4a1e
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §6.3 risk load, eqs.6.21-6.24, Example 6.5 and Table 6.3, PDF pp.183-186, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Loads.md
---

A **Risk Load** is the amount added to expected loss to pay an insurer's capital providers for bearing the risk of a contract. The **risk-loaded technical premium**, the price a pricing model indicates for the risk itself before expenses and commercial adjustments, is expected loss plus the risk load. It is

> $$P = E[X] + R(X)$$

- $X$ is the loss to the contract, after its limits and attachment.
- $R(X) \geq 0$ is the risk load.

In Mildenhall and Major's notation, with expenses, taxes and investment income ignored, the risk load is the **margin** $M = P - L$ ([[Insurance Margin]]). A contract whose loss is more volatile, such as a tail-focused reinsurance layer with a higher coefficient of variation, carries a higher risk load.

## Classical premium principles

Each classical principle is a [[Risk Measure|risk measure]] applied to $X$. Under the *expected value* principle the premium is

> $$P = (1 + \theta)\,E[X]$$

- $\theta$ is the loading factor.

The load ignores variability, so a remote catastrophe layer and a stable working layer with the same mean pay the same load. Under the *standard deviation* principle the premium is

> $$P = E[X] + k\,\sigma(X)$$

- $k$ is the selected multiplier and $\sigma(X)$ the standard deviation of the loss.

The load scales with share, so a 50% share pays half. Under the *variance* principle the premium is

> $$P = E[X] + k\,\text{Var}(X)$$

The load scales with the square of share, so a 50% share pays a quarter, and two 50% shares together pay half the load on 100%.

## Cost-of-capital and distortion loads

A cost-of-capital load sets capital first, with a capital risk measure (VaR, TVaR or a regulatory standard), and then charges the target [[Return on Capital|return]] $\iota$ on it ([[Cost of Capital]], [[Risk Capital]]). With assets $a$ and expected loss $L$, the load is

> $$R = \iota\,Q = \delta\,(a - L)$$

- $Q$ is the capital and $\delta = \iota/(1+\iota)$ the risk discount rate.

A distortion load weights remote layers more heavily than their probability:

> $$R = \rho_g(X) - E[X]$$

- $\rho_g$ is the [[Risk Measure#Distortion risk measures|distortion risk measure]] with distortion function $g$.

The distortion can be calibrated to observed market prices, for example of catastrophe bonds and reinsurance layers.

> [!example]- What is the technical premium for this catastrophe layer under five different risk loads? {Example}
> Losses (in $\$$M) to a $\$10$M xs $\$10$M catastrophe layer are $0$ with probability $0.90$, $5$ with probability $0.06$ and $10$ with probability $0.04$. Use (a) the expected value principle with $\theta = 0.5$, (b) the standard deviation principle with $k = 0.25$, (c) the variance principle with $k = 0.05$, (d) the proportional hazard distortion $g(s) = s^{0.7}$ and (e) a constant $15\%$ cost of capital with the layer fully collateralised ($a = 10$).
>
> > [!answer]-
> > - $E[X] = 0.06(5) + 0.04(10) = 0.70$ and $\text{Var}(X) = 0.06(25) + 0.04(100) - 0.70^2 = 5.01$, so $\sigma(X) = 2.238$.
> > - (a) $P = 1.5(0.70) = 1.050$.
> > - (b) $P = 0.70 + 0.25(2.238) = 1.260$.
> > - (c) $P = 0.70 + 0.05(5.01) = 0.9505$.
> > - (d) The probability of a loss in $[0, 5)$ of the layer is $0.10$, and in $[5, 10)$ it is $0.04$, so $P = 5(0.10^{0.7}) + 5(0.04^{0.7}) = 0.998 + 0.525 = 1.523$.
> > - (e) $\delta = 0.15/1.15 = 0.1304$, so $P = 0.70 + 0.1304(10 - 0.70) = 1.913$, a return of $1.213/(10 - 1.913) = 15\%$ on the capital the layer ties up.
> > - The same loss distribution gives risk loads from $0.25$ to $1.21$, so the choice of measure and parameter, not the data, drives the price.

## Diversification

Loads are not additive. Pooling reduces risk, so the load on a portfolio is less than the sum of the stand-alone loads. The portfolio load has to be set top-down and allocated to lines or policies, the problem of [[Risk-Adjusted Pricing|risk-adjusted pricing]]. In Exam 5 ratemaking the same idea sits inside the [[Profit and Contingency Provision|profit and contingency provision]].

> [!example]- Two independent lines each have expected loss $50$ and standard deviation $30$, loaded at $0.2$ standard deviations. How much does pooling save? {Example}
> - The stand-alone loads total $0.2(30) + 0.2(30) = 12.0$.
> - The pooled standard deviation is $\sqrt{30^2 + 30^2} = 42.43$, so the pooled load is $0.2(42.43) = 8.49$.
> - Pooling saves $3.51$ of load, so pricing each line stand-alone over-charges by $41\%$ of the load the insurer needs.

## Risk-loaded increased limit factors

Bahnemann adds a risk load $\rho(l)$, an increasing function of the policy limit $l$, to the expected severity at each limit. The risk-loaded [[Increased Limits|increased limit factor]] is the ratio of the risk-loaded premium at the limit to that at the basic limit $b$:

> $$I(l) = \frac{E[X; l](1 + u) + \rho(l)}{E[X; b](1 + u) + \rho(b)}$$

- $E[X; l]$ is the [[Limited Expected Value|limited expected value]] at $l$.
- $u$ is the ALAE ratio.

With Poisson claim counts, the variance method sets the risk load to

> $$\rho(l) = k\,E[X^2; l]$$

and the standard deviation method sets it to

> $$\rho(l) = k'\sqrt{E[X^2; l]}$$

- $E[X^2; l]$ is the second moment of the severity limited at $l$.
- $k$ and $k'$ are multipliers selected to produce the desired level of risk loading for the portfolio.

Calculating risk-loaded ILFs therefore means calibrating the multiplier and computing the second moment of limited severity for every limit.

> [!trap] Pricing a layer as the difference of risk loads
> Both methods are incompatible with the layer formula. Pricing the layer $(a, a + l]$ with the risk load $\rho(a + l) - \rho(a)$ overstates its risk load. Price the layer with non-risk-loaded factors, then add the risk load for the layer itself.
