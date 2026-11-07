---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3451a78f07fe818d6590a2021d35c119f95add4ef1b6dd8a24a18afa681e48c8
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 pp.33-34 (PDF pp.39-40); Ch. 14 pp.329-332 (PDF pp.335-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Gross Losses.md
---

![[Media/Figures/Gross_Losses.svg|340]]

**Gross Losses** are an insurer's direct and assumed claims before the claims ceded to reinsurers are taken out. With [[Ceded Losses|ceded losses]] and [[Net Losses|net losses]] they are one of the three components of an [[Unpaid Claims|unpaid claim estimate]] made both gross and net of [[Reinsurance|reinsurance]], and

> $$\text{Gross Losses} = \text{Net Losses} + \text{Ceded Losses}$$

"Gross" says which recoveries are still in the figure, so it needs a qualifier. A figure gross of reinsurance can still be net of [[Salvage and Subrogation|salvage and subrogation]], and the actuary needs to know whether paid claims are recorded net or gross of those recoveries. For an insurer that cedes nothing, gross and net claims are the same and separate analyses are not needed.

> [!example]- An accident year's net claims are $\$800{,}000$ and $\$300{,}000$ is recoverable from excess of loss reinsurance. Salvage of $\$50{,}000$ has already been deducted from both. What are its gross claims? {Example}
> - Gross claims are net claims plus ceded claims, $800{,}000 + 300{,}000 = \$1{,}100{,}000$.
> - The salvage is still deducted, so this is gross of reinsurance and net of salvage.
> - Gross of both reinsurance and salvage, the claims are $1{,}100{,}000 + 50{,}000 = \$1{,}150{,}000$.

## Analyzing gross with ceded or with net

The development techniques apply to gross, ceded or net claims. To estimate unpaid claims net of reinsurance, actuaries analyze two of the three components and derive the third as the difference:

1. **Gross and ceded.** Net is gross less ceded, the usual choice when ceded claims are coded in a different system from gross, so net triangles are hard to build.
2. **Gross and net.** Ceded is gross less net, the more likely choice when ceded claims are in the same system and net data is readily available.

The choice also depends on the reinsurance program and on the volume and quality of the data. Either way the actuary reviews the implied third component for reasonableness. Gross triangles hold the most claims and so may be the more credible, and some actuaries select the gross development factors first and use them in selecting the net or ceded factors. Others select net factors first, because large claims make gross claims more variable. The selected gross and net factors should bear a reasonable relationship to each other.

> [!example]- An insurer's net claim data is unreliable after a system conversion, but its gross data is correct and it has one excess of loss treaty. How can it estimate net ultimate claims? {Example}
> - Project gross ultimate claims with a development technique on the gross triangle.
> - Estimate the ceded ultimate claims by applying the treaty's retention and limit to the projected gross claims.
> - Net ultimate claims are the gross ultimate less the ceded ultimate.
> - The unreliable net triangle is never developed.

## When the reinsurance program changes

Gross claims do not depend on the reinsurance the insurer buys. A change of retention or limit breaks the ceded and net histories and leaves the gross history whole, so the gross triangle keeps its full history for development, and the ceded claims can be estimated under the current treaty terms.

> [!example]- An insurer raised its per-occurrence retention from $\$250{,}000$ to $\$1{,}000{,}000$ on January 1, 2022. Why should it not select development factors from its net triangle across accident years 2018–2024? {Example}
> - Through 2021 the net triangle is net of a $\$250{,}000$ retention, and from 2022 net of $\$1{,}000{,}000$.
> - More of each large claim is retained from 2022, so net claims develop differently on the two sides of the change.
> - A factor averaged across the change describes neither retention.
> - The gross triangle is unaffected, so the insurer develops gross claims and estimates the ceded claims under the $\$1{,}000{,}000$ retention.
