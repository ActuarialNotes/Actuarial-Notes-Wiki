---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:62efec6180a7951d98764e58f59d5f113adcabd2f748f4dc0c675bd3dd956653
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.34 (PDF p.40); Ch. 14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ceded Losses.md
---

![[Media/Figures/Ceded_Losses.svg|340]]

**Ceded Losses** are the claims an insurer transfers to its reinsurers, the part of [[Gross Losses|gross losses]] the [[Reinsurance|reinsurance]] pays. They are the difference between gross and [[Net Losses|net losses]],

> $$\text{Ceded Losses} = \text{Gross Losses} - \text{Net Losses}$$

For the insurer the ceded losses are a recoverable from the reinsurers. The insurer still owes its policyholders the gross claims, so a recoverable that is not collected becomes a retained loss. How much of each claim is ceded depends on whether the reinsurance is quota share or excess of loss.

> [!example]- An accident year's gross reported claims are $\$5{,}000{,}000$ and its net reported claims are $\$3{,}500{,}000$. What are its ceded reported claims? {Example}
> - The ceded reported claims are $5{,}000{,}000 - 3{,}500{,}000 = \$1{,}500{,}000$.
> - That is 30% of the gross reported claims.

## Quota share

A [[Quota Share|quota share]] treaty cedes a fixed percentage of every claim, so

> $$\text{Ceded Losses} = c \times \text{Gross Losses}$$

- $c$ is the quota share's ceded percentage.

Because the same proportion of every claim is ceded at every age, the net-to-gross ratio is constant across the development ages of an accident year, though it can differ between accident years when the percentage changes. Gross, ceded and net claims then have the same age-to-age factors and the same tail factor. A triangle of the ratios of net to gross reported claims tests the quota share percentage by year. The ceded IBNR is the ceded percentage times the gross IBNR, applied to the gross amount and not to the net.

> [!example]- In a triangle of net to gross reported claims, every age of accident year 2023 shows 0.80 and every age of accident year 2024 shows 0.70. What reinsurance does the insurer have, and what is 2024's ceded IBNR if its gross IBNR is $\$2{,}000{,}000$? {Example}
> - The ratio is constant across the ages of each accident year, so the reinsurance is quota share.
> - The percentage changed between the years, 20% ceded in 2023 and 30% in 2024.
> - 2024's ceded IBNR is $0.30 \times 2{,}000{,}000 = \$600{,}000$.

## Excess of loss

An [[Excess of Loss|excess of loss]] treaty cedes only the part of each claim above a retention, up to a limit, so for one claim

> $$\text{Ceded Loss} = \min\left(\max(X - R,\, 0),\, L\right)$$

- $X$ is the gross amount of the claim.
- $R$ is the retention and $L$ is the limit of the layer.

Only large claims reach the layer, so the ceded share grows as large claims develop, and the net-to-gross ratio falls with age. The actuary checks the large claims in the triangles against each year's retentions and limits, since the treatment of large claims decides whether the ceded and net triangles are correct.

> [!example]- Five claims of $\$2{,}600$K, $\$900$K, $\$800$K, $\$500$K and $\$200$K fall under a $\$1{,}000$K excess of $\$500$K treaty. What are the ceded losses? {Example}
> - The $\$2{,}600$K claim exhausts the layer and cedes $\$1{,}000$K.
> - The $\$900$K and $\$800$K claims cede $\$400$K and $\$300$K.
> - The $\$500$K and $\$200$K claims do not exceed the retention and cede nothing.
> - The ceded losses are $\$1{,}700$K of the $\$5{,}000$K gross.

## Severity trend in an excess layer

A severity trend has a leveraged effect on an excess layer. As every claim grows, claims below the retention cross it and claims in the layer cede more, so the ceded losses grow faster than the gross losses and the net losses slower.

> [!example]- Each of the five claims above grows 10%. What is the trend in the ceded and the net losses? {Example}
> - The claims become $\$2{,}860$K, $\$990$K, $\$880$K, $\$550$K and $\$220$K, so the gross losses are $\$5{,}500$K.
> - They cede $\$1{,}000$K, $\$490$K, $\$380$K, $\$50$K and $\$0$, which is $\$1{,}920$K.
> - The ceded trend is $1{,}920/1{,}700 - 1 = 12.9\%$, above the 10% gross trend.
> - The net losses go from $\$3{,}300$K to $\$3{,}580$K, a trend of 8.5%.
