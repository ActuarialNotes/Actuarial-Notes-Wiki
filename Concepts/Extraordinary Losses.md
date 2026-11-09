---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:da531ad54ad92da27df625f1b6666b46fa2f26930a4e7f14d9bc3ca1c6ae8108
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 95-99, 107-108, 112 (PDF pp. 107-111, 119-120, 124); Appendix B pp. B-2-B-3 (PDF pp. 359-361), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Extraordinary Losses.md
---

**Extraordinary Losses** are losses too rare and too large to be priced from a few years of experience: individual shock losses, or [[Large Loss|large losses]], and [[Catastrophe Loss|catastrophes]]. In ratemaking they are removed from the historical data and replaced with a provision based on a long-term view, so that rates reflect their expected cost without jumping after a bad year and falling after a quiet one. For shock losses, each claim is capped at a threshold, and the long-run excess loss factor is

> $$\text{ELF} = 1 + \frac{\sum \text{Excess Losses}}{\sum \text{Non-Excess Losses}}$$

- $\text{Excess Losses}$ are the portion of each claim above the threshold, summed over the claims of a long experience period.
- $\text{Non-Excess Losses}$ are the losses limited to the threshold, the reported losses less the excess losses.

A loss below the threshold is entirely non-excess. For a loss above it, the threshold amount counts as non-excess and the remainder as excess. The procedure assumes that the share of losses that is excess is volatile in the short run but stable over a long enough period. Each year's non-excess losses are developed and trended, then multiplied by the ELF in place of the year's own excess losses. The ELF is a factor of one plus the ratio of excess to non-excess losses. It is not an excess ratio to total losses, nor one minus a loss elimination ratio.

> [!example]- A liability line's reported losses over twelve years total $\$600{,}000{,}000$, including 30 claims above a $\$500{,}000$ threshold with ground-up value $\$27{,}000{,}000$. The latest year's reported losses are $\$52{,}000{,}000$, including shock losses of $\$2{,}400{,}000$ and $\$1{,}100{,}000$. What are the ELF and the latest year's adjusted losses? {Example}
> - Over the twelve years, the excess losses are $27{,}000{,}000 - 30 \times 500{,}000 = \$12{,}000{,}000$.
> - The non-excess losses are $600{,}000{,}000 - 12{,}000{,}000 = \$588{,}000{,}000$.
> - The ELF is $1 + 12/588 = 1.0204$.
> - The latest year's excess losses are $1{,}900{,}000 + 600{,}000 = \$2{,}500{,}000$, so its non-excess losses are $\$49{,}500{,}000$.
> - The adjusted losses are $49{,}500{,}000 \times 1.0204 = \$50{,}510{,}000$, against the $\$52{,}000{,}000$ reported.

## Choosing the threshold and the period

The threshold ideally is the point at which losses become extraordinary and their inclusion makes the rates volatile. It balances including as many losses as possible against minimizing the volatility of the analysis:

1. **The basic limit.** The indication is then the rate level need assuming every insured chooses the basic limit. In a loss ratio indication the premium is restated to basic limits too, and higher limits are priced with [[Increased Limits|increased limits factors]].
2. **A percentile** of the size-of-loss distribution, such as the 99th, or a percentage of losses rather than of claim counts.
3. **A percentage of the amount of insurance**, for property, whose size-of-loss distribution varies from one policy to the next.

The period is long enough to give a stable estimate but not so long that older data are irrelevant. A medium-sized homeowners insurer may estimate large fire losses from 10 years of data, while a small personal umbrella insurer may need 20. Losses in higher layers inflate faster than losses below them, so the procedure is ideally run on losses trended to future levels, or with a threshold indexed for trend. A threshold that is not indexed lets inflation push more of each loss into the excess layer over time.

> [!example]- An insurer caps its losses at a $\$1{,}000{,}000$ threshold, trends the capped losses to the future level, and stops there. What is wrong with its indication? {Example}
> - Removing the excess losses without adding a provision for them understates the projected losses.
> - The indicated rates are therefore inadequate.
> - The capped losses must be loaded with the ELF, or the indication must use uncapped losses.

## Catastrophes

[[Catastrophe Loss|Catastrophes]] are events that produce a large number of claims, such as hurricanes, tornadoes, hail, earthquakes, wildfires, winter storms, explosions, oil spills and some terrorist attacks. In the U.S., ISO's Property Claim Services defines a catastrophe as an event causing at least $\$25$ million of direct insured property losses and affecting a significant number of policyholders and insurers. An event counts as a catastrophe if its industry-wide insured losses meet the definition, and a non-catastrophe excess loss factor is computed after the catastrophe claims are removed. The catastrophe losses are replaced by a long-term provision:

1. **Non-modeled catastrophes** recur over decades, such as hail for auto comprehensive. Their provision is the ratio of catastrophe losses to non-catastrophe losses, or to exposures or amount of insurance years, over 10 to 30 years, applied to the projected values.
2. **Modeled catastrophes**, such as hurricanes and earthquakes, are too sporadic for any history. Their provision is a [[Catastrophe Modelling|catastrophe model]]'s expected annual loss for the current exposure.

A modeled provision is already at the future cost level and at ultimate, so it is added to the non-catastrophe losses after they have been developed and trended. Adding it before over-adjusts it.

> [!example]- A homeowners book's developed and trended non-catastrophe pure premium is $\$620$. Hail losses have averaged $\$0.21$ per $\$1{,}000$ of amount of insurance years, on a projected average amount of insurance of $\$400{,}000$. A hurricane model gives an expected annual loss of $\$1{,}800{,}000$ on 20,000 house-years. What is the pure premium? {Example}
> - The hail pure premium is $0.21 \times 400 = \$84$.
> - The hurricane pure premium is $1{,}800{,}000/20{,}000 = \$90$.
> - The pure premium is $620 + 84 + 90 = \$794$.
> - Adding the hurricane provision before a $1.13$ trend and development factor would turn $\$90$ into $\$101.70$, an over-adjustment.

> [!trap] Removing extraordinary losses without adding them back
> Capping a shock loss or removing a catastrophe takes real expected cost out of the data. The rates are adequate only when the ELF or the catastrophe provision puts the long-run average back.
