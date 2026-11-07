---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:5b2a9fcb9e8e6fb3291325e91e0acbe2d20b7e95cb880a15e41e10eeca56946e
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.16 pp.312-319 (PDF pp.324-331), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Occurrence Coverage.md
---

![[Media/Figures/Occurrence_Coverage.svg|340]]

**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* during the policy period, however long afterwards the claim is reported. Its alternative is [[Claims Made Coverage|claims-made coverage]], triggered by the date the claim is reported.

A claim is covered by an occurrence policy when

> $$\text{Covered if } \; \text{effective date} \le \text{accident date} \le \text{expiration date}$$

- The effective and expiration dates are the start and end of the policy period.

The report date plays no part, so the insured needs no extended reporting endorsement for claims reported after the policy expires.

> [!example]- A general liability policy runs $1/1/2024$ to $12/31/2024$. A customer slips and falls on $8/10/2024$ but does not present a claim until $3/15/2026$. Does the policy respond under an occurrence form, and under a claims-made form? {Example}
> - Under the occurrence form the claim is covered, because the accident date falls inside the policy period.
> - The insurer carries the claim as pure IBNR in Accident Year 2024 until it is reported in 2026.
> - Under a claims-made form the 2024 policy does not respond, because the claim is reported in 2026.
> - The claim falls to the claims-made policy in force on $3/15/2026$, if its retroactive date is on or before $8/10/2024$.
> - If the insured let coverage lapse at the end of $2024$ and bought no extended reporting period, the claim is uninsured.

## Reserving for occurrence policies

Occurrence business is aggregated on an [[Accident Year|accident year]] basis, because the accident date is the trigger. The insurer must reserve for **pure [[IBNR]]**, claims it has no knowledge of, for as long as claims from expired policies can still emerge. It must also reserve for IBNER, the development on claims already reported.

An occurrence policy's losses take a report lag and then a settlement lag to emerge. Its development period is therefore longer than a claims-made policy's, which has only the settlement lag, and its ultimate losses are more volatile. The longer time from collecting the premium to paying the claim also earns an occurrence policy more [[Investment Income|investment income]].

## The cost of an occurrence policy

In the table of losses by [[Claims Made Coverage#Report year aggregation|report year and report lag]], an occurrence policy for year $Y$ is a diagonal. Its lag-$i$ claims are reported in year $Y + i$, so its cost is

> $$\text{Occurrence Policy}(Y) = \sum_{i=0}^{N} L(Y + i, i)$$

- $L(Y + i, i)$ is the loss reported in year $Y + i$ after a report lag of $i$ years.
- $N$ is the maximum report lag.

Each later lag is trended to a later report year. As long as claim costs are increasing, the occurrence policy costs more than the claims-made one ([[Claims Made Coverage#The five principles of claims-made policies|Principle 1 of claims-made policies]]). An error in the selected trend also compounds over every report year until the last lag, so it moves an occurrence price more.

> [!example]- Report Year 2024's loss cost is $\$1{,}000$, and loss costs rise 6% each report year. Claims report $40\%$ at lag 0, then $30\%$, $20\%$ and $10\%$, and loss costs do not vary by lag. What do a 2026 occurrence policy and a mature 2026 claims-made policy cost? {Example}
> - The mature claims-made policy covers claims reported in 2026, all at the Report Year 2026 cost level.
> - It costs $1{,}000 \times 1.06^{2} = \$1{,}123.60$.
> - The occurrence policy's lag-$i$ claims are reported in $2026 + i$, so lag $i$ is trended $2 + i$ years.
>
> | Lag | Report year | Loss cost |
> | --- | --- | --- |
> | 0 | 2026 | $0.4 \times 1{,}000 \times 1.06^2 = \$449.44$ |
> | 1 | 2027 | $0.3 \times 1{,}000 \times 1.06^3 = \$357.30$ |
> | 2 | 2028 | $0.2 \times 1{,}000 \times 1.06^4 = \$252.50$ |
> | 3 | 2029 | $0.1 \times 1{,}000 \times 1.06^5 = \$133.82$ |
>
> - The occurrence policy costs $\$1{,}193.06$, which is $6.2\%$ more than the claims-made policy.

> [!trap] Trending every lag to the policy year
> The claims of an occurrence policy are paid at the cost level of the year they are reported. Trending all of them only to 2026 gives $\$1{,}123.60$, the claims-made cost, and understates the occurrence policy's $\$1{,}193.06$.
