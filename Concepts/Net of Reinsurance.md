---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:10b83f41c02f8cd81d3abe2767991f9aba1a6d3c1ce5ad98aeb5d21f32bd6c07
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7), PDF pp.74-76, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.14 pp.330-331 (PDF 336-337), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 p.99 (PDF 111), Ch.7 p.137 (PDF 149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Net of Reinsurance.md
---

![[Media/Figures/Net_of_Reinsurance.svg|340]]

**Net of Reinsurance** describes premium, losses or unpaid claims after the amounts ceded to [[Reinsurance|reinsurers]], the part the primary insurer retains. Gross is before reinsurance, direct and assumed, and ceded is the reinsurers' share. For any of them,

> $$\text{Net} = \text{Gross} - \text{Ceded}$$

- $\text{Gross}$ is the amount before reinsurance.
- $\text{Ceded}$ is the amount transferred to reinsurers: the ceded premium, or the reinsurance recoveries on losses.

Equivalently, $\text{Gross} = \text{Net} + \text{Ceded}$. With several covers, the ceded amount is the sum of what each cover pays, applied in the order the covers inure, and the insurer's net loss is the retention plus any share of a layer it keeps plus any loss above the top layer.

> [!example]- An insurer has a per-risk excess of loss treaty covering $\$750{,}000$ excess of $\$250{,}000$, of which the reinsurer takes 90%. A single risk has a gross loss of $\$1{,}200{,}000$. What is the insurer's net loss? {Example}
> - The layer from $\$250{,}000$ to $\$1{,}000{,}000$ is fully used, $\$750{,}000$ of loss.
> - The reinsurer pays 90% of it, $0.90 \times 750{,}000 = \$675{,}000$, which is the ceded loss.
> - The net loss is $1{,}200{,}000 - 675{,}000 = \$525{,}000$.
> - That is the $\$250{,}000$ retention, the insurer's 10% of the layer, $\$75{,}000$, and the $\$200{,}000$ above the layer.

## Net loss ratio

Net losses belong over net premium, so the net loss ratio is

> $$\text{Net Loss Ratio} = \frac{\text{Gross Losses} - \text{Ceded Losses}}{\text{Gross Premium} - \text{Ceded Premium}}$$

Under proportional reinsurance, such as a quota share, the same proportion of premium and losses is ceded, so the net loss ratio equals the gross loss ratio.

> [!example]- An insurer earns $\$2{,}000{,}000$ of gross premium and cedes $\$200{,}000$ under an excess of loss treaty. Its gross losses are $\$1{,}300{,}000$, of which $\$150{,}000$ is recovered. What are its gross, ceded and net loss ratios? {Example}
> - The gross loss ratio is $1{,}300{,}000/2{,}000{,}000 = 65.0\%$.
> - The ceded loss ratio is $150{,}000/200{,}000 = 75.0\%$.
> - The net loss ratio is $1{,}150{,}000/1{,}800{,}000 = 63.9\%$.
> - The net ratio is below the gross because the ceded slice ran worse than the book.

## Reinsurance in ratemaking

Historically, ratemaking for primary insurance was done on a direct basis, without consideration of reinsurance. As reinsurance programs have become more extensive and costly, some analyses are now performed net. Proportional reinsurance may not need to be considered explicitly. For non-proportional reinsurance, such as catastrophe or per-risk excess of loss, the projected losses are reduced by the expected recoveries and the premium by the amount ceded. Alternatively, the net cost of reinsurance is included as an expense item in the overall indication:

> $$\text{Net Cost of Reinsurance} = \text{Ceded Premium} - \text{Expected Recoveries}$$

- $\text{Ceded Premium}$ is the cost of the reinsurance.
- $\text{Expected Recoveries}$ are the expected ceded losses.

> [!example]- A property indication built gross has a projected loss and LAE ratio of 58%, a fixed expense ratio of 6%, variable expenses of 22% and a 5% target profit. The insurer cedes $\$3{,}000{,}000$ of premium against $\$2{,}100{,}000$ of expected recoveries, on $\$40{,}000{,}000$ of gross premium. What is the indicated change with and without the net cost of reinsurance? {Example}
> - Without it, the indicated change is $(0.58 + 0.06)/(1 - 0.22 - 0.05) - 1 = -12.3\%$.
> - The net cost of reinsurance is $3{,}000{,}000 - 2{,}100{,}000 = \$900{,}000$, which is $900{,}000/40{,}000{,}000 = 2.25\%$ of premium.
> - As a fixed expense, it raises the indicated change to $(0.58 + 0.06 + 0.0225)/0.73 - 1 = -9.2\%$.

## Net underwriting profit

On a net basis, premium is net of ceded premium, losses are net of recoveries, and expenses are net of the ceding commission received:

> $$\text{Net UW Profit} = \text{Net Premium} - \text{Net Losses} - \text{Net Expenses}$$

- $\text{Net Expenses}$ are the insurer's expenses less the ceding commission.

The net underwriting profit is the gross underwriting profit less the net cost of the reinsurance, which here is the ceded premium less the ceding commission and the recoveries.

> [!example]- An insurer writes $\$1{,}000{,}000$ of premium with $\$600{,}000$ of losses and $\$250{,}000$ of expenses. It cedes 30% under a quota share with a 30% ceding commission. What are its gross and net underwriting profits? {Example}
> - The gross underwriting profit is $1{,}000{,}000 - 600{,}000 - 250{,}000 = \$150{,}000$.
> - It cedes $\$300{,}000$ of premium and $\$180{,}000$ of losses, and receives $0.30 \times 300{,}000 = \$90{,}000$ of commission.
> - The net underwriting profit is $700{,}000 - 420{,}000 - 160{,}000 = \$120{,}000$.
> - The difference, $\$30{,}000$, is the ceded premium less the commission and recoveries, $300{,}000 - 90{,}000 - 180{,}000$.

## Net unpaid claims

Every technique for estimating unpaid claims can be applied to gross, ceded or net experience. Some actuaries analyze gross and ceded experience and derive net, and others analyze gross and net and derive ceded, depending on data availability, the reinsurance program and preference. The implied relationships between gross, ceded and net are checked at every stage:

1. **The data.** Net claims and net premium are equal to or less than gross. Under a quota share, a triangle of net-to-gross claims tests the ceded percentage by year. Under excess of loss, large claims are checked against each year's retention and limit.
2. **The judgments.** Assumptions are consistent between the analyses. Net claims are often capped by excess or aggregate covers, so net development is frequently less than or equal to gross, and a net tail factor larger than the gross one is generally not reasonable.
3. **The selections.** The ultimate claims and unpaid estimates are consistent across gross, ceded and net.

Excess of loss reinsurance takes the large claims that drive volatility, so net experience is less volatile than gross. A change in retention or treaty terms leaves the net data of different years on different bases. The actuary then develops gross data and applies the current terms, or restates the earlier years' net data to them.

> [!trap] Gross losses over net premium
> A loss ratio mixes bases when gross losses are divided by net premium. On the book above that gives $1{,}300{,}000/1{,}800{,}000 = 72.2\%$, against a gross loss ratio of 65.0% and a net one of 63.9%. Keep losses and premium on the same basis.
