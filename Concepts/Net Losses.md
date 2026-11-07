---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d55e9a46e526d3c2b618db2e4814bcbc58d0796fa5dd07b99d07cb26b987568e
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 pp.33-34 (PDF pp.39-40); Ch. 14 pp.329-332 (PDF pp.335-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Net Losses.md
---

![[Media/Figures/Net_Losses.svg|340]]

**Net Losses** are the claims an insurer retains after its recoveries: its [[Gross Losses|gross losses]] less the [[Ceded Losses|ceded losses]] its reinsurers pay. Net of [[Reinsurance|reinsurance]],

> $$\text{Net Losses} = \text{Gross Losses} - \text{Ceded Losses}$$

The same subtraction holds for every claim amount. Net reported claims are the gross paid claims plus the gross case outstanding, less the reinsurance recoveries on both. A first check of the data for an analysis is that net claims and net premium are equal to or less than gross.

> [!example]- An accident year has $\$700{,}000$ of gross paid claims and $\$300{,}000$ of gross case outstanding. The reinsurers' share is $\$150{,}000$. What are the net reported claims? {Example}
> - The gross reported claims are $700{,}000 + 300{,}000 = \$1{,}000{,}000$.
> - The net reported claims are $1{,}000{,}000 - 150{,}000 = \$850{,}000$.

## Net of salvage and subrogation

[[Salvage and Subrogation|Salvage and subrogation]] are recoveries too, and an estimate can be made net of them. Ultimate claims net of salvage and subrogation are

> $$\text{Net Ultimate} = \text{Gross Ultimate} - \text{Ultimate S\&S}$$

- $\text{Ultimate S\&S}$ is the ultimate salvage and subrogation, which can be projected by developing the recoveries or as the gross ultimate claims times a selected ratio of ultimate S&S to ultimate claims.

The S&S recoverable is the ultimate S&S less the S&S already received, and it reduces the estimate of unpaid claims.

> [!example]- An accident year's gross ultimate claims are $\$10{,}800{,}000$. The selected ratio of ultimate S&S to ultimate claims is 3.0%, and $\$200{,}000$ of S&S has been received. What are its ultimate claims net of S&S, and its S&S recoverable? {Example}
> - The ultimate S&S is $0.030 \times 10{,}800{,}000 = \$324{,}000$.
> - The net ultimate claims are $10{,}800{,}000 - 324{,}000 = \$10{,}476{,}000$.
> - The S&S recoverable is $324{,}000 - 200{,}000 = \$124{,}000$, which reduces the unpaid claims.

## Deriving net losses from gross

Net ultimate claims can be developed from a net triangle, or derived by projecting gross and ceded claims separately and subtracting. When the net data is unreliable but the gross data is correct, the actuary develops the gross ultimate claims on the gross triangle, applies the treaty terms to them to get the ceded ultimate claims, and subtracts ceded from gross to get the net ultimate claims.

> [!example]- An accident year's gross ultimate claims, developed on the gross triangle, are $\$12{,}000{,}000$. A 25% quota share is the only reinsurance. What are the net ultimate claims? {Example}
> - The ceded ultimate claims are $0.25 \times 12{,}000{,}000 = \$3{,}000{,}000$.
> - The net ultimate claims are $12{,}000{,}000 - 3{,}000{,}000 = \$9{,}000{,}000$.

## Consistency between net and gross

Key assumptions should be consistent between the net and gross analyses, and the implied relationships are reviewed at the start, during and at the end of the analysis. Net claims are often capped by excess or aggregate coverage, so net development patterns are usually equal to or less than gross ones. It is generally not reasonable for the net tail factor to be larger than the gross one, or for net IBNR to be greater than gross IBNR in an accident year. Net IBNR can exceed gross when an estimate of uncollectible reinsurance is in the net IBNR but not the gross, or in a runoff book with reinsurance disputes.

> [!example]- An actuary selects a tail factor of 1.08 for gross claims and 1.12 for net claims on a book with a $\$1{,}000{,}000$ excess of loss treaty. Is that reasonable? {Example}
> - The treaty caps each net claim at $\$1{,}000{,}000$, so the large, slow claims that drive late development are cut off in the net data.
> - Net claims should therefore develop no more than gross claims in the tail.
> - A net tail of 1.12 above a gross tail of 1.08 is not reasonable without a specific explanation, such as uncollectible reinsurance.

## Aggregate and stop-loss coverage

[[Stop-Loss Reinsurance|Stop-loss]] or aggregate coverage caps the insurer's retained claims across many claims, by accident, policy or calendar year. The actuary usually wants data before the stop-loss is applied, and applies it as a last step: first the ultimate claims limited to the per-occurrence retention, then the stop-loss limit on their total.

> [!example]- A self-insurance pool retains $\$500{,}000$ per occurrence. Its ultimate claims limited to that retention are $\$1.6$M, $\$1.5$M and $\$1.3$M for three policy years that share a combined $\$4.0$M stop-loss limit. What are its ultimate claims net of both coverages? {Example}
> - The total of the limited ultimate claims is $1.6 + 1.5 + 1.3 = \$4.4$M.
> - The stop-loss caps the retained total at $\$4.0$M, so $\$0.4$M is recovered from it.
> - The ultimate claims net of the excess of loss and the stop-loss are $\$4.0$M.
