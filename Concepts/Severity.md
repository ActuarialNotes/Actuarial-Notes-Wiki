---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:09d7fbdc781bc5ca8f514b9ecfaa05f480caf0a8bb7f58977b207f651a53b911
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 and p.117 (PDF pp.106, 129), Ch. 11 p.197 (PDF p.209), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Severity.md
---

![[Media/Figures/Severity.svg|340]]

**Severity** is the average cost per [[Claim|claim]]. The severity of a group of claims is

> $$\text{Severity} = \frac{\text{Total Losses}}{\text{Number of Claims}}$$

Severity does not depend on the exposure base, because neither the losses nor the number of claims does. Multiplied by [[Frequency|frequency]], it gives the pure premium, $\text{Pure Premium} = \text{Frequency} \times \text{Severity}$, as in [[Frequency#Pure premium|pure premium]]. In a probability model, the severity of a claim is the random claim amount $X$, described by a [[Severity Distribution|severity distribution]].

> [!example]- An accident year has 600 reported claims and 4,200,000 of reported losses at 24 months. What is its reported severity at 24 months? {Example}
> - The reported severity is $4{,}200{,}000/600 = 7{,}000$.

## Severity development

The reported severity at each age is the cumulative reported losses divided by the cumulative reported claim counts at that age. These values form a severity triangle, whose age-to-age factors develop each accident year's latest severity to an ultimate severity. Ultimate losses are then

> $$\text{Ultimate Losses} = \text{Ultimate Claim Count} \times \text{Ultimate Severity}$$

Severity develops in two directions. It rises as known claims are reserved and paid at higher amounts, and it falls as late-reported small claims enter the average. Severity triangles are often built by [[Report Year|report year]], where the claim count does not develop.

> [!example]- In the accident year above, the severity development factor from 24 months to ultimate is 1.20 and the ultimate claim count is projected at 650. What are the ultimate losses and the [[IBNR]]? {Example}
> - The ultimate severity is $7{,}000 \times 1.20 = 8{,}400$.
> - The ultimate losses are $650 \times 8{,}400 = 5{,}460{,}000$.
> - The IBNR is the ultimate losses minus the reported losses, $5{,}460{,}000 - 4{,}200{,}000 = 1{,}260{,}000$.

## Limited severity

A few [[Large Loss|large losses]] can move an average severity a long way, so severity is less stable than frequency at the same volume of data. Severity is therefore often measured with every claim capped at a basic limit $u$. The limited severity of $n$ claims $x_1, \ldots, x_n$ is

> $$\frac{1}{n}\sum_{i=1}^{n} (x_i \wedge u)$$

- $x_i \wedge u$ is the smaller of $x_i$ and $u$.

The losses above the basic limit are priced separately with [[Increased Limits|increased limits factors]]. Policies with higher limits allow larger claims and so have higher severity.

> [!example]- Four claims are 10,000, 40,000, 150,000 and 400,000. What are the unlimited severity and the severity limited at a basic limit of 100,000? {Example}
> - The four claims total 600,000, so the unlimited severity is $600{,}000/4 = 150{,}000$.
> - Capped at 100,000, the claims are 10,000, 40,000, 100,000 and 100,000.
> - The limited severity is $250{,}000/4 = 62{,}500$.

> [!trap] Applying the inflation rate to severity under a fixed deductible
> Inflation of $r$ in every loss raises the insurer's severity by more than $r$ under a fixed [[Inflation#Inflation with a fixed deductible|deductible]]. The deductible stays fixed while each loss grows, so the amount above the deductible grows by more than $r$. Under a fixed [[Inflation#Inflation with a fixed limit|limit]], inflation raises the insurer's severity by less than $r$.
