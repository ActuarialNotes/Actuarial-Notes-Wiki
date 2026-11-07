---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:2e4df10688ed14133fd26fb00399288d66a7d90c26246fee457d6be0fe7d3339
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.94 and 98-99 (PDF pp.106, 110-111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Loss.md
---

![[Media/Figures/Catastrophe_Loss.svg|340]]

A **Catastrophe Loss** is a loss from a natural or man-made disaster that is unusually severe and results in a significant number of claims, such as a hurricane, tornado, hail storm, earthquake, wildfire, winter storm, explosion, oil spill or terrorist attack. It is one of the [[Extraordinary Losses|extraordinary losses]]. Catastrophe losses are too rare and severe for a short experience period to estimate, so they are removed from the experience and replaced with a long-term expected catastrophe provision, and the total pure premium is

> $$\text{Pure Premium} = \text{Non-Cat Pure Premium} + \text{Cat Pure Premium}$$

- $\text{Non-Cat Pure Premium}$ is the developed and trended pure premium with the catastrophe losses removed.
- $\text{Cat Pure Premium}$ is the long-term provision for catastrophe losses and their LAE per exposure.

In the U.S., ISO's Property Claim Services defines a catastrophe as an event that causes $\$25$ million or more of direct insured property losses and affects a significant number of policyholders and insurers. Insurers may use other definitions internally, but the definition is applied consistently across years. Catastrophes are also excluded from the data used to measure [[Loss Trend|loss trend]] and to select development factors.

> [!example]- Five years of homeowners experience have $\$50{,}000{,}000$ of losses on 10,000 house-years a year, of which $\$8{,}000{,}000$ came from one hurricane. A catastrophe model gives an expected annual hurricane loss of $\$600{,}000$ for the current book. What is the pure premium? {Example}
> - The non-catastrophe losses are $50{,}000{,}000 - 8{,}000{,}000 = \$42{,}000{,}000$.
> - The non-catastrophe pure premium is $42{,}000{,}000/50{,}000 = \$840$.
> - The catastrophe pure premium is $600{,}000/10{,}000 = \$60$.
> - The pure premium is $840 + 60 = \$900$.
> - Leaving the hurricane in would give $50{,}000{,}000/50{,}000 = \$1{,}000$, because the five years happened to contain one hurricane.

## Non-modeled catastrophe provision

Non-modeled catastrophes are events that happen with some regularity over decades, such as hail storms for auto comprehensive. Their provision is built from a long period, often 10 to 30 years, of the insurer's own catastrophe losses. Measured against amount of insurance years, which adjusts for inflation, the non-modeled catastrophe pure premium is

> $$\text{Cat Pure Premium} = \frac{\text{Cat Losses}}{\text{AIY}} \times \text{Projected AIY per Exposure} \times (1 + \text{ULAE Ratio})$$

- $\text{Cat Losses}/\text{AIY}$ is the long-term average ratio of non-modeled catastrophe losses and ALAE to amount of insurance years.
- $\text{Projected AIY per Exposure}$ is the average amount of insurance per exposure, trended to the period the rates will be in effect.
- $\text{ULAE Ratio}$ is the catastrophe ULAE ratio, not the non-catastrophe one.

A ratio to house-years would rise over a twenty-year period with inflation, which is why amount of insurance years are used. The number of years balances stability against responsiveness. If the concentration of exposure in the most hail-prone area has grown, a long statewide average understates the catastrophe potential. For a loss ratio indication, the provision per exposure is divided by the trended on-level premium per exposure.

> [!example]- Hail losses and ALAE have averaged $\$0.20$ per $\$1{,}000$ of amount of insurance years over 20 years, the projected average amount of insurance is $\$300{,}000$, and the catastrophe ULAE ratio is $5\%$. What is the hail pure premium? {Example}
> - The projected amount of insurance per exposure is $300$ thousands of dollars.
> - The hail losses and ALAE per exposure are $0.20 \times 300 = \$60.00$.
> - Loaded for ULAE, the hail pure premium is $60.00 \times 1.05 = \$63.00$.

## Modeled catastrophe provision

Hurricanes and earthquakes are too sporadic for even thirty years of data to show their expected cost. A [[Catastrophe Modelling|catastrophe model]], built by insurance professionals, meteorologists and engineers, simulates events of varying magnitudes against the insurer's current exposure and gives the expected annual catastrophe loss. The model's provision is at ultimate and at the future cost level, so it is added to the non-catastrophe losses after they have been developed and trended. Adding it before over-adjusts it. In most years the actual catastrophe losses are below the provision, and in a year with a major event they are far above it.

> [!example]- Ten years of a coastal insurer's catastrophe losses are $\$0$, $\$1$M, $\$0$, $\$4$M, $\$0$, $\$0$, $\$38$M, $\$2$M, $\$0$ and $\$1$M. Is their average a good hurricane provision? {Example}
> - The average is $\$4.6$ million a year, driven almost entirely by the one $\$38$ million year.
> - Without that year it falls to $\$0.9$ million, so one observation moves it by a factor of five.
> - A storm that returns every few decades cannot be measured by ten years of history.
> - A model's expected annual loss, simulated over many years of events against the current exposure, is the better provision.

Companies also monitor the number of policies in catastrophe-prone areas. They may restrict new business, require higher catastrophe deductibles or buy [[Reinsurance|reinsurance]], and the actuary may raise the underwriting profit provision for the cost of capital that a high concentration needs.

## Catastrophe losses in reserving

Catastrophe claims have different frequency, severity, reporting and development patterns from non-catastrophe claims. Combining them in one triangle distorts the IBNR and adds volatility, so catastrophe losses are analyzed separately from the non-catastrophe losses. When a catastrophe in the latest year is not separately identified, it can be estimated from the expected claims. The expected reported claims at the evaluation age are the expected ultimate claims divided by the reported CDF, and the excess of the actual reported claims over that amount is treated as the catastrophe. The development method is then applied to the non-catastrophe claims, and the catastrophe claims are estimated on their own. Reported development would otherwise leverage the catastrophe into an overstated ultimate, because the historical patterns contain no such event.

> [!trap] Trending and developing the modeled provision
> A catastrophe model's expected annual loss is already at ultimate and at the future cost level. Adding it to the historical losses before they are developed and trended applies both adjustments to it a second time.
