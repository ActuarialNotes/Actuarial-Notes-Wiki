---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ef8aa1bf01660e0cd17bd90e4b2b245b60717c5c98334d6f0143138ea1c98899
  sources:
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, A.1-2; A.5.c Extended Business Income (60 days); F.1 coinsurance and deducted expenses; G.1-4 optional coverages; H.3 'period of restoration', sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Income Coverage.md
---

**Business Income Coverage** pays the net income a business loses, and the operating expenses that continue, while it is shut down or slowed by direct physical loss to property from a covered cause. Extra expense coverage, usually written with it, pays the additional costs of avoiding or shortening the interruption. Both are written on ISO business income forms within the [[Commercial Property Insurance|commercial property]] coverage part, and they insure the net income loss exposure that follows a property loss.

> $$\text{BI} = \sum_{t \in \text{PoR}} \left(\text{NI}_t + \text{CE}_t\right)$$

> $$R = \min\left(\frac{C}{p \times B_{12}},\ 1\right)$$

> $$\text{Paid} = \min\big(R \times \text{BI},\ C\big)$$

- **Symbols:** $\text{NI}_t$ is the net income, before income taxes, the business would have earned in period $t$, and $\text{CE}_t$ is the normal operating expense, including payroll, that continues during the shutdown. The sum runs over the period of restoration (PoR). $C$ is the business income limit, $p$ is the coinsurance percentage and $B_{12}$ is the coinsurance base: the net income and operating expenses the business would have earned and incurred in the 12 months following the policy's inception or last anniversary.
- **Period of restoration:** For business income, it begins 72 hours after the direct physical loss, which acts as a waiting period, and for extra expense it begins immediately. It ends when the property should be repaired or replaced with reasonable speed, or when the business resumes at a new permanent location, and it is not cut short by the policy's expiration. Extended business income then pays for a further period while sales recover to their normal level.
- **Extra expense:** This covers necessary expenses incurred during the period of restoration that would not have been incurred without the loss, such as renting a temporary site or expediting equipment. An expense to repair or replace property is paid only to the extent it reduces the business income loss. Some businesses, such as a bank or a newspaper, buy extra expense alone because they must keep operating at almost any cost.
- **The coinsurance base:** $B_{12}$ is net income plus all operating expenses, less the expenses that the form deducts because they stop with sales, such as the cost of goods sold, raw materials consumed and bad debts. It is a projection of the 12 months ahead, not last year's figures, so a growing business needs to raise its limit.
- **Alternatives to coinsurance:** The insured can choose an option that suspends the coinsurance condition. The maximum period of indemnity pays for loss over at most 120 days, the monthly limit of indemnity caps the payment in each 30 days at a fraction of the limit, and business income agreed value suspends coinsurance in exchange for a statement of projected income (see [[Insurance to Value]]).
- **Probable maximum loss:** An underwriter estimates the [[Probable Maximum Loss|probable maximum loss]] of business income as the income lost over the longest likely period of restoration, plus the extra expense the insured would incur. The estimate starts from the worst probable property loss, because a larger physical loss takes longer to restore.
- **The maximum period of restoration:** It depends on how long the property takes to rebuild, which grows with its size, its construction, building code and permit requirements and the season. It also depends on lead times for specialised machinery and on whether a substitute location is available.
- **The maximum loss during that period:** It depends on how seasonal the business is and when the loss strikes, how much of its expense would continue, whether it can operate partially or move production to another site, whether lost production can be made up afterwards, and whether a single machine, process or supplier is a bottleneck.

> [!example]- Estimating the Probable Maximum Loss for a Seasonal Manufacturer {Example}
> A toy manufacturer's projected net income plus continuing operating expenses is \$150,000 a month from January to August, \$200,000 in September and \$300,000 a month from October to December. The underwriter judges that a fire at the main plant would take at most 5 months to restore, and that extra expense would be about \$80,000. Ignoring the 72-hour waiting period, estimate the probable maximum loss of business income, and compare it with an estimate that uses average months.
>
> > [!answer]-
> > The worst case is a loss just before the peak season. Two 5-month windows give the largest income loss, August to December and September to January.
> > $$
> > \begin{align*}
> > \text{BI}_{\text{Aug-Dec}} &= 150{,}000 + 200{,}000 + 3(300{,}000) \\
> > &= 1{,}250{,}000 \\
> > \text{PML} &= 1{,}250{,}000 + 80{,}000 \\
> > &= 1{,}330{,}000
> > \end{align*}
> > $$
> > The annual total is \$2,300,000, and 5 average months are 5/12 of it.
> > $$
> > \begin{align*}
> > \text{BI}_{\text{avg}} &= \tfrac{5}{12} \times 2{,}300{,}000 \\
> > &= 958{,}333
> > \end{align*}
> > $$
> > Using average months understates the worst probable loss by about \$292,000. Seasonality is one of the main factors in the maximum loss during the period of restoration, and a business income limit sized on averages would be exhausted by a fire in late summer.

> [!example]- The Coinsurance Basis for Business Income {Example}
> A retailer projects for the 12 months after its policy anniversary sales of \$4,000,000, cost of goods sold of \$2,200,000 and other operating expenses of \$1,300,000, including payroll. Its business income limit is \$750,000 with a 50% coinsurance clause. A covered fire causes a business income loss of \$240,000. What does the insurer pay?
>
> > [!answer]-
> > Net income is what is left of sales after all expenses. The coinsurance base adds back the operating expenses but not the cost of goods sold, which the form deducts.
> > $$
> > \begin{align*}
> > \text{NI} &= 4{,}000{,}000 - 2{,}200{,}000 - 1{,}300{,}000 \\
> > &= 500{,}000 \\
> > B_{12} &= 500{,}000 + 1{,}300{,}000 \\
> > &= 1{,}800{,}000 \\
> > R &= \frac{750{,}000}{0.50 \times 1{,}800{,}000} \\
> > &= \tfrac{5}{6} \\
> > \text{Paid} &= \tfrac{5}{6} \times 240{,}000 \\
> > &= 200{,}000
> > \end{align*}
> > $$
> > The retailer bears \$40,000 because its limit is below the required \$900,000. A limit of \$900,000, or a coinsurance alternative such as the maximum period of indemnity, would have avoided the penalty.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask how an underwriter estimates the probable maximum loss of business income, which factors lengthen the period of restoration, and which factors raise the loss during it, such as seasonality or a single-source machine. Insurance to value questions compute the coinsurance base from projected income and expenses, apply the coinsurance formula, or ask when an alternative such as the maximum period of indemnity suits an insured better.

> [!warning]- Exam traps
> - **Projected, not historical:** The coinsurance base uses the 12 months after inception or the last anniversary, as they would have been without the loss. Using last year's income understates the requirement for a growing business.
> - **Cost of goods sold is out:** The base is net income plus operating expenses, less the deducted expenses that stop with sales. Using gross sales as the base overstates the required limit.
> - **The waiting period:** Business income starts 72 hours after the loss, so the first three days of lost income are the insured's. Extra expense has no waiting period.
> - **Averages hide the peak:** A probable maximum loss estimate must use the worst probable timing. Multiplying an average month by the period of restoration understates the loss for a seasonal business.
