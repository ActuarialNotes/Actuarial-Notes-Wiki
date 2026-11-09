---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:af662a8464396959f5fe405c0b035ee79c546916188ac3ddd7669e53a682f4ca
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7), PDF pp.22, 24, 74-76, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.14 pp.330-331 (PDF 336-337), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 p.99 (PDF 111), Ch.7 p.137 (PDF 149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Myers, Reinsurance Overview (NAMIC, 2017), slides pp.6, 15, sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance.md
---

![[Media/Figures/Reinsurance.svg|340]]

**Reinsurance** is insurance bought by an insurer to transfer some of the financial risk it faces. The **cedant** transfers, or cedes, part of its premium and losses to a **reinsurer**. Whatever the contract, the cedant's net losses are

> $$\text{Net Losses} = \text{Gross Losses} - \text{Ceded Losses}$$

- $\text{Gross Losses}$ are the cedant's direct losses before reinsurance.
- $\text{Ceded Losses}$ are the losses the reinsurer pays, the reinsurance recoverables.

Net premium is likewise the direct premium less the ceded premium. Comparing contracts by the lowest retained losses is the same as comparing them by the highest ceded losses.

## Proportional reinsurance

In proportional reinsurance, the reinsurer takes the same share of premium and losses:

1. **Quota share** cedes a fixed percentage of every policy's premium and losses. The net-to-gross ratio is constant across every claim and every development age.
2. **Surplus share** cedes the portion of each policy's limit above the cedant's retained line, so the percentage ceded varies by policy. Its gross, ceded and net development differ, though less than under non-proportional reinsurance.

Proportional reinsurance has the reinsurer share in the profits and losses of the ceded business, which aligns the two parties' interests, and it can cede an entire line. A quota share reduces losses only proportionally. It does not cut off extreme tail losses, so it does little to the severity of an extreme event relative to premium.

> [!example]- A cedant's five claims are $\$2{,}600{,}000$, $\$900{,}000$, $\$800{,}000$, $\$500{,}000$ and $\$200{,}000$, $\$5{,}000{,}000$ in all. What are its net losses under a $40\%$ quota share? {Example}
> - The quota share cedes $40\%$ of every claim, $0.40 \times 5{,}000{,}000 = \$2{,}000{,}000$.
> - The net losses are $5{,}000{,}000 - 2{,}000{,}000 = \$3{,}000{,}000$.
> - The cedant keeps $60\%$ of the $\$2{,}600{,}000$ claim, $\$1{,}560{,}000$.

## Excess of loss reinsurance

In non-proportional reinsurance, the reinsurer pays only the losses above an attachment point. Under an excess of loss treaty of limit $L$ excess of retention $R$, the reinsurer's payment on a loss is

> $$\text{Ceded Loss} = \min\left(\max(X - R,\, 0),\, L\right)$$

- $X$ is the loss, per risk or per occurrence.
- $R$ is the retention, or attachment point.
- $L$ is the layer's limit.

Above the retention, the recoverable rises one-for-one with the loss until the limit is exhausted. The cedant retains the rest of the loss, including anything above the top of the layer. The common forms are:

1. **Per risk excess of loss**, applied to each risk's loss separately, the recoveries then summed.
2. **Per occurrence or catastrophe excess of loss**, applied to the accumulated losses of one event.
3. **Aggregate stop loss**, which cedes only once the year's retained losses exceed the attachment point.

Several layers apply in a stated order, and the cedant keeps any share of a layer not reinsured and any loss beyond an exhausted aggregate limit. Excess of loss reinsurance caps the retained losses per claim or event, so it best addresses the extreme, low-frequency losses and the volatility of earnings and solvency risk they create.

> [!example]- Under a $\$1{,}000{,}000$ excess of $\$500{,}000$ per risk treaty, what are the cedant's net losses on the same five claims? {Example}
> - The $\$2{,}600{,}000$ claim pierces the layer, so $\$1{,}000{,}000$ is ceded and $\$1{,}600{,}000$ retained.
> - The $\$900{,}000$ and $\$800{,}000$ claims cede $\$400{,}000$ and $\$300{,}000$.
> - The $\$500{,}000$ and $\$200{,}000$ claims do not exceed the retention, so nothing is ceded.
> - The ceded losses are $\$1{,}700{,}000$ and the net losses $\$3{,}300{,}000$.

## Functions of reinsurance

Reinsurance serves several functions for the cedant:

1. **Capacity**, to write larger limits on a single risk or more business than its surplus alone supports.
2. **Stability**, smoothing its underwriting results over time.
3. **Catastrophe protection** against the accumulation of losses from one event, which also reduces liquidity risk, since the reinsurer pays a share of the claims that would otherwise need cash quickly.
4. **Surplus relief** while premium and unearned premium grow.
5. **Services**, such as underwriting, claims and actuarial reviews and help in developing new products.
6. **Withdrawal** from a state or line, by transferring the remaining policies to a reinsurer through portfolio reinsurance or a $100\%$ quota share until they expire.

Reinsurance reduces the volatility of results and the chance of financial distress, but its cost lowers the expected return on equity. A cedant remains liable to its policyholders whatever the reinsurer pays, so the recoverables carry the reinsurer's credit risk, which is worst in extreme scenarios.

## Sources of reinsurance

Reinsurance is bought from professional reinsurers, from the reinsurance departments of primary insurers, from Lloyd's syndicates, and from pools, which may be voluntary or involuntary, such as FAIR plans for hard-to-place risks. It is placed through two main marketing channels:

1. **Brokers or intermediaries**, who produce business for reinsurers and are paid by the reinsurers.
2. **Direct writers**, reinsurers whose own salaried employees negotiate directly with the ceding companies.

## Reinsurance in ratemaking

Some ratemaking analyses are now performed on a net basis, as reinsurance programs have grown and their costs have increased. Proportional reinsurance cedes the same percentage of premium and losses, so the net loss ratio equals the direct one and it may need no explicit treatment. Non-proportional reinsurance cedes premium and losses disproportionately, which distorts the loss ratio and the loss development, so its cost is reflected explicitly. The projected losses are reduced for the expected recoveries and the premium by the amount ceded. Alternatively, the net cost of the reinsurance is included as an expense item in the [[Overall Rate Level Indication|overall rate level indication]]:

> $$\text{Net Reinsurance Cost} = \text{Ceded Premium} - \text{Expected Recoveries}$$

- $\text{Ceded Premium}$ is the cost of the reinsurance, the expected premium ceded to the reinsurer.
- $\text{Expected Recoveries}$ are the reinsurance recoveries expected in an average year.

> [!example]- A homeowners insurer expects recoveries of $\$458{,}673$ on a reinsurance contract costing $\$673{,}248$, and projects 13,681 exposures for the contract term. What is the net reinsurance cost per exposure? {Example}
> - The net cost of reinsurance is $673{,}248 - 458{,}673 = \$214{,}575$.
> - The net reinsurance cost per exposure is $214{,}575/13{,}681 = \$15.68$.
> - It is added to the numerator of the [[Pure Premium Method|pure premium method]] beside the fixed expense per exposure.

With reinsurance, underwriting profit uses premium net of ceded premium, losses net of expected recoveries and expenses net of any ceding commission. Equivalently, it is the gross underwriting profit less the net cost of the reinsurance. A cost-of-capital comparison of reinsurance options adds the cost of the capital each option requires to its net reinsurance cost, and prefers the lower total.

## Reinsurance in reserving

Ceded excess losses attach only to large claims, which report late and settle slowly, so the ceded development is longer-tailed and more volatile than the gross. An aggregate stop loss cedes losses only after the retained losses pass its attachment point, so its ceded losses emerge later than the gross losses and its ceded tail factor exceeds the gross. To develop a book net of an excess of loss treaty, the ceded reported claims are subtracted from the gross reported claims and the net triangle is developed. Ultimate claim counts not exceeding the attachment point are the ultimate ground-up counts less the ultimate counts exceeding it.

Gross, ceded and net are kept consistent throughout, with net IBNR generally no greater than gross ([[Net of Reinsurance|net of reinsurance]], [[Ceded Loss Reserve|ceded loss reserve]]). Ceded data often have limited credibility, from low volume, large-loss and catastrophe volatility and frequent changes in terms, so actuaries typically select patterns and expected loss ratios gross and net and take ceded as the difference.

> [!example]- Under the same treaty, an accident year's gross reported losses are $\$3{,}000{,}000$ at 12 months and $\$5{,}000{,}000$ at 48 months, and its ceded reported losses $\$150{,}000$ and $\$1{,}700{,}000$. What do the two development factors show? {Example}
> - The gross factor from 12 to 48 months is $5{,}000/3{,}000 = 1.667$.
> - The ceded factor is $1{,}700/150 = 11.33$, nearly seven times as large.
> - Claims enter the layer only once they pass $\$500{,}000$, so almost nothing has attached at 12 months.
> - The gross factor would project ceded losses of $150{,}000 \times 1.667 = \$250{,}000$, far below the $\$1{,}700{,}000$.

## Reinsurance in enterprise risk management

A quota share with ceding percentage $p$ cedes $p$ times the gross losses, so the ceded tail value at risk is $p$ times the gross TVaR. When the net and ceded losses both rise with the gross losses, their TVaRs add, so the ceded TVaR equals the gross TVaR less the net TVaR. Insurers buy reinsurance for protection against large or catastrophic losses, which lowers insolvency risk and capital needs, for smoother earnings, for surplus relief, to exit a line or region, and for access to the reinsurer's expertise.
