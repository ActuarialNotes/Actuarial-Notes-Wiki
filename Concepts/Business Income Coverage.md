---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:30697a16585ea274c9d022a9d3108cd24a122c0ecf0282d42b9057eead58ee80
  sources:
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, A.1-2; A.5.c Extended Business Income (60 days); F.1 coinsurance and deducted expenses; G.1-4 optional coverages; H.3 'period of restoration', sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Income Coverage.md
---

**Business Income Coverage** pays the net income a business loses, and the operating expenses that continue, while it is shut down or slowed by direct physical loss to property from a covered cause. It is written on ISO business income forms within the [[Commercial Property Insurance|commercial property]] coverage part, and it insures the net income loss exposure that follows a property loss. Summed over the period of restoration (PoR), the business income loss is

> $$\text{BI} = \sum_{t \in \text{PoR}} \left(\text{NI}_t + \text{CE}_t\right)$$

- $\text{NI}_t$ is the net income, before income taxes, the business would have earned in period $t$.
- $\text{CE}_t$ is the normal operating expense, including payroll, that continues during the shutdown.

## Period of restoration

For business income, the period of restoration begins 72 hours after the direct physical loss, which acts as a waiting period, so the first three days of lost income are the insured's. For extra expense it begins immediately. It ends when the property should be repaired or replaced with reasonable speed, or when the business resumes at a new permanent location, and it is not cut short by the policy's expiration. Extended business income then pays for a further period while sales recover to their normal level.

## Extra expense

Extra expense coverage, usually written with business income, pays the additional costs of avoiding or shortening the interruption. These are necessary expenses incurred during the period of restoration that would not have been incurred without the loss, such as renting a temporary site or expediting equipment. An expense to repair or replace property is paid only to the extent it reduces the business income loss. Some businesses, such as a bank or a newspaper, buy extra expense alone because they must keep operating at almost any cost.

## Coinsurance

The coinsurance base $B_{12}$ is the net income and operating expenses the business would have earned and incurred in the 12 months following the policy's inception or last anniversary. It is net income plus all operating expenses, less the expenses that the form deducts because they stop with sales, such as the cost of goods sold, raw materials consumed and bad debts. It is a projection of the 12 months ahead, not last year's figures, so a growing business needs to raise its limit. With a business income limit $C$ and a coinsurance percentage $p$, the share of the loss paid is

> $$R = \min\left(\frac{C}{p \times B_{12}},\ 1\right)$$

and the payment is

> $$\text{Paid} = \min\big(R \times \text{BI},\ C\big)$$

> [!example]- What does the insurer pay for this retailer's business income loss? {Example}
> A retailer projects for the 12 months after its policy anniversary:
>
> | Item | Amount ($) |
> | :--- | ---: |
> | Sales | 4,000,000 |
> | Cost of goods sold | 2,200,000 |
> | Other operating expenses, including payroll | 1,300,000 |
>
> Its business income limit is \$750,000 with a 50% coinsurance clause. A covered fire causes a business income loss of \$240,000.
>
> > [!answer]-
> > - Net income is $4{,}000{,}000 - 2{,}200{,}000 - 1{,}300{,}000 = \$500{,}000$.
> > - The coinsurance base adds back the operating expenses but not the cost of goods sold: $B_{12} = 500{,}000 + 1{,}300{,}000 = \$1{,}800{,}000$.
> > - The required limit is $0.50 \times 1{,}800{,}000 = \$900{,}000$, so $R = 750{,}000/900{,}000 = 5/6$.
> > - The insurer pays $5/6 \times 240{,}000 = \$200{,}000$, and the retailer bears \$40,000.

The insured can choose an option that suspends the coinsurance condition. The maximum period of indemnity pays for loss over at most 120 days, the monthly limit of indemnity caps the payment in each 30 days at a fraction of the limit, and business income agreed value suspends coinsurance in exchange for a statement of projected income ([[Insurance to Value]]).

## Probable maximum loss

An underwriter estimates the [[Probable Maximum Loss|probable maximum loss]] of business income as the income lost over the longest likely period of restoration, plus the extra expense the insured would incur. The estimate starts from the worst probable property loss, because a larger physical loss takes longer to restore.

The maximum period of restoration depends on how long the property takes to rebuild, which grows with its size, its construction, building code and permit requirements and the season. It also depends on lead times for specialised machinery and on whether a substitute location is available.

The maximum loss during that period depends on how seasonal the business is and when the loss strikes, and on how much of its expense would continue. It also depends on whether the business can operate partially or move production to another site, whether lost production can be made up afterwards, and whether a single machine, process or supplier is a bottleneck. These factors change the size of the loss, not the length of the period of restoration.

> [!example]- What is this toy manufacturer's probable maximum loss of business income? {Example}
> A toy manufacturer's projected net income plus continuing operating expenses is \$150,000 a month from January to August, \$200,000 in September and \$300,000 a month from October to December. The underwriter judges that a fire at the main plant would take at most 5 months to restore, with about \$80,000 of extra expense. Ignore the 72-hour waiting period.
>
> > [!answer]-
> > - The worst case is a loss just before the peak season, so the 5 months run from August to December.
> > - The income lost is $150{,}000 + 200{,}000 + 3(300{,}000) = \$1{,}250{,}000$.
> > - Adding extra expense gives a probable maximum loss of $1{,}250{,}000 + 80{,}000 = \$1{,}330{,}000$.
> > - Five average months would be $\tfrac{5}{12} \times 2{,}300{,}000 \approx \$958{,}333$, which understates the income lost by about \$292,000.

> [!trap] Sizing the loss on average months
> A probable maximum loss estimate must use the worst probable timing. Multiplying an average month by the period of restoration understates the loss for a seasonal business, and a limit sized on averages would be exhausted by a fire in late summer.
