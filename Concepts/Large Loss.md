---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:7eb019dbf032c87849331cfe186a25659665eb6f3fc75de36b1688d51642b0f3
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 pp.95-98 (PDF pp.107-110), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 p.32 (PDF p.38); Ch.7 p.96 (PDF p.102), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Large Loss.md
---

![[Media/Figures/Large_Loss.svg|340]]

A **Large Loss**, or shock loss, is an individual claim of unusual size, such as a large multi-claimant liability claim, a total loss on an exceptionally valuable home or the total permanent disability of a young worker. It is one of the [[Extraordinary Losses|extraordinary losses]]. Large losses are rare and volatile, so in an experience analysis each claim is capped at a threshold, and the non-excess loss of a claim is

> $$\text{Non-Excess Loss} = \min(X, M)$$

- $X$ is the claim's ground-up loss.
- $M$ is the large loss threshold.

The excess loss, $X - M$ for a claim above the threshold, is removed, and a provision based on longer-term and broader data is added back to the capped losses. Excluding the losses above a cap with no such provision understates losses and makes the rates inadequate. Capping and loading smooth the rate indications from year to year, so that the rate covers the full expected cost without depending on whether a shock loss happened to occur.

> [!example]- A general liability class produced $\$14{,}000{,}000$ of losses on 20,000 exposures over five years, including claims of $\$1{,}200{,}000$ and $\$800{,}000$. The threshold is $\$500{,}000$, and ten years of wider data show excess losses averaging $8\%$ of capped losses. What is the pure premium? {Example}
> - The excess removed is $700{,}000 + 300{,}000 = \$1{,}000{,}000$.
> - The capped losses are $14{,}000{,}000 - 1{,}000{,}000 = \$13{,}000{,}000$.
> - The capped pure premium is $13{,}000{,}000/20{,}000 = \$650$.
> - Loaded for excess losses, the pure premium is $650 \times 1.08 = \$702$.

## The excess loss factor

The provision added back is the excess loss factor, the long-run ratio of excess to non-excess losses:

> $$\text{ELF} = 1 + \frac{\sum \text{Excess Losses}}{\sum \text{Non-Excess Losses}}$$

- $\text{Excess Losses}$ sum, over a long experience period, the amount by which each claim above the threshold exceeds it.
- $\text{Non-Excess Losses}$ are the reported losses less the excess losses.

A single year's excess ratio is unstable, so the selected ratio comes from a longer period, such as a weighted average that includes the current year. The limited losses are developed and trended, then multiplied by the ELF, which applies to the limited losses only, not to total losses or ALAE. When the shock losses are trended to the future level, the trended shock losses are removed from the trended total losses, but the threshold amount of each shock claim is retained in the basic losses.

> [!example]- A year has $\$20{,}000{,}000$ of reported losses, including one claim of $\$2{,}000{,}000$, and the threshold is $\$1{,}000{,}000$. The selected excess ratio is $4\%$. What are the year's limited and loaded losses? {Example}
> - The claim's excess loss is $2{,}000{,}000 - 1{,}000{,}000 = \$1{,}000{,}000$.
> - The limited losses are $20{,}000{,}000 - 1{,}000{,}000 = \$19{,}000{,}000$, which keep the claim's first $\$1{,}000{,}000$.
> - Loaded for excess losses, they are $19{,}000{,}000 \times 1.04 = \$19{,}760{,}000$.

## Choosing the threshold

Ideally the threshold is the point at which losses become extraordinary and their inclusion makes the rates volatile. The capping level includes as much loss data as possible while limiting the volatility that large losses bring, and the premium is kept at a consistent limit with the losses. It may be the basic limit, a percentile of the size-of-loss distribution such as the 99th, or for property a percentage of the amount of insurance. In reserving, Friedland lists what actuaries consider in setting it:

1. The number of claims over the threshold each year.
2. The size of claims relative to policy limits.
3. The size of claims relative to reinsurance retentions and limits.
4. The credibility of internal data on large claims.
5. The availability of relevant external data.

The threshold may vary by line of business, by region and by the size of the book. The claims department's large claim reports are a starting point.

## Large claims in reserving

Development techniques apply historical patterns to current claims. A large reported but unpaid claim in an immature accident year inflates that year's reported claims, and the age-to-age factors leverage it into an overstated reported ultimate, while the paid technique is unaffected. A large open claim in the case reserves is scaled up the same way by the case outstanding development technique. The actuary may therefore:

1. Exclude the large claims from the initial projection, then add a case-specific projection for the reported large claims and a smoothed provision for the IBNR portion of large claims.
2. Build the triangles on claims limited to, for example, $\$500{,}000$ or $\$1$ million per occurrence.
3. Remove an anomalous large claim from the triangle used for the age-to-age factors, so that it does not distort the selected factors.

A large claim known to have no further development is held at its capped or retained amount and added to the developed ultimate of the other claims. A per occurrence retention limits each claim's retained amount to the lesser of the gross claim and the retention of its accident year. A large claim with atypical ALAE is removed before the ALAE development or ratio technique is applied, and its separately known ultimate ALAE is added back.

> [!example]- An accident year's reported losses at 12 months are $\$4{,}500{,}000$, including one $\$1{,}500{,}000$ claim reserved at policy limits. The reported CDF at 12 months, built on ordinary claims, is $3.20$. A smoothed provision for large claims not yet reported is $\$700{,}000$. What is the ultimate loss? {Example}
> - Developing everything gives $4{,}500{,}000 \times 3.20 = \$14{,}400{,}000$, which grows the limits claim to $\$4.8$ million.
> - The ordinary claims develop to $3{,}000{,}000 \times 3.20 = \$9{,}600{,}000$.
> - The large claim stays at $\$1{,}500{,}000$, since it is at policy limits.
> - The ultimate loss is the sum of the three, $\$11{,}800{,}000$.

## Large losses at the basic limit

A limited average severity at the basic limit caps every claim, from policies at every limit, at the basic limit. A claim above it counts at the basic limit, and the capped losses are divided by the total claim count. In a retrospective rating plan, the per-accident loss limitation likewise caps each claim's reported loss at the limit before the losses are summed.

## Large losses in experience rating

Experience rating limits the amount of any single loss or accident, with separate limits for single-claimant and multiple-claimant accidents, so that one large loss cannot swing the modification unduly. Each loss is limited to the basic limit, ALAE is included with it, and the loss and ALAE together are capped at the maximum single loss (MSL). A split plan divides each claim at the split point: the primary portion $A_p$ is the lesser of the claim and the split point, and the excess portion $A_e$ is the amount above it, each summed across claims ([[Experience Rating|experience rating]]).

## Large losses in thin classes

A class with few policies and a single large loss can have its relativity driven by that one record, so the estimate is unstable and does not reflect a lasting difference in expected cost. The remedies are to gather more data, to weight the class with a broader group through [[Credibility|credibility]], and to cap or limit large losses, rather than deleting the loss or splitting the class further.

## Large loss risk

In enterprise risk modelling, large loss risk is the risk of more or larger individual claims than expected. It can cause large unexpected losses that threaten solvency, and it is modelled separately from attritional losses.
