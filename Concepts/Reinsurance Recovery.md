---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2fb29e166ce06a23adb4f93067ee042381d751a240ea804b3e773503f33baf7
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 p.34 and fn 16 (PDF p.40); Ch. 14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Reinsurance Recovery.md
---

![[Media/Figures/Reinsurance_Recovery.svg|340]]

A **Reinsurance Recovery** is the amount an insurer expects to collect from its reinsurers on the claims it has ceded. The unpaid claims an insurer retains net of [[Reinsurance|reinsurance]] are

> $$\text{Net Unpaid Claims} = \text{Gross Unpaid Claims} - \text{Ceded Unpaid Claims}$$

- Each unpaid amount is its ultimate claims minus its paid claims, so the ceded unpaid claims are the ceded ultimate minus the ceded paid.

Every technique for estimating unpaid claims can be applied to gross, ceded or net data. Some actuaries analyze gross and ceded experience and derive net, and others analyze gross and net and derive ceded. The choice depends on the data available, the reinsurance program and the actuary's preference. With the [[Chain Ladder Method|development technique]], each projected ultimate is the latest cumulative reported claims times the CDF for their age.

Friedland's checks on the relationship between gross, ceded and net, at the start, during and at the end of the analysis, are:

1. Net claims and net premium are no greater than gross.
2. Under a [[Quota Share|quota share]], a triangle of net-to-gross claims shows the quota share percentage of each year.
3. Under [[Excess of Loss|excess of loss]], the large claims are ceded consistently with each year's retention and limit.
4. Net development and tail factors are generally no larger than gross, since net claims are often capped by the excess or aggregate cover.
5. Net IBNR in each accident year is generally no greater than gross IBNR.

The relationships have exceptions. An insurer fronting for a captive keeps the excess layer, and net IBNR can exceed gross when it includes uncollectible reinsurance or a runoff book has reinsurance disputes. Aggregate or stop-loss covers are usually applied as a final step, to ultimate claims estimated before them.

> [!example]- An accident year has gross reported claims of $\$4{,}000{,}000$ with a gross CDF of $1.20$, and ceded reported claims of $\$900{,}000$ with a ceded CDF of $1.55$ under a per-occurrence excess treaty. What are its net ultimate claims, and do they pass the checks? {Example}
> - The gross ultimate claims are $4{,}000{,}000 \times 1.20 = \$4{,}800{,}000$.
> - The ceded ultimate claims are $900{,}000 \times 1.55 = \$1{,}395{,}000$.
> - The net ultimate claims are $4{,}800{,}000 - 1{,}395{,}000 = \$3{,}405{,}000$.
> - The net reported claims are $\$3{,}100{,}000$, so the implied net CDF is $3{,}405{,}000/3{,}100{,}000 = 1.098$, below the gross $1.20$.
> - Net IBNR of $\$305{,}000$ is below gross IBNR of $\$800{,}000$, so the relationships hold.

## A change in the reinsurance program

Historical ceded and net data reflect the treaties in force when the claims occurred. A change in retention or limit makes the earlier years' net data inconsistent with the later ones. The actuary estimates gross ultimate claims and applies the current contract, or restates the history to the current terms from claim-level data.

> [!example]- A self-insurance pool keeps $\$500{,}000$ per occurrence and buys a $\$1{,}500{,}000$ stop-loss on one policy year's total. Its ultimate claims limited to $\$500{,}000$ per occurrence are $\$1{,}800{,}000$, and it has paid $\$1{,}200{,}000$. What are its unpaid claims net of both covers? {Example}
> - The ultimate claims are estimated on data limited to the per-occurrence retention, before the stop-loss.
> - The stop-loss caps the year's ultimate at $\min(1{,}800{,}000, 1{,}500{,}000) = \$1{,}500{,}000$.
> - The unpaid claims net of both covers are $1{,}500{,}000 - 1{,}200{,}000 = \$300{,}000$.
