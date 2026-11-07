---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:78645957e7111d8b6682c00511eec07f62ce753cab5b61f5e6388a8e28f8ab91
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 (PDF p.76); Ch. 6 p.94 (PDF p.106); Ch. 7 pp.137, 139 (PDF pp.149, 151); Ch. 8 pp.141-148 (PDF pp.153-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASOP No. 13, Trending Procedures in Property/Casualty Insurance (ASB, 2009), Section 3.8, p.4 (PDF p.8), sha256:5d985e9cbf666cda56b67bb6489e2f1430313278145e87816c7b2297dcd59acd — https://www.casact.org/sites/default/files/2021-03/5_ASOP_13.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Overall Rate Level Indication.md
---

![[Media/Figures/Overall_Rate_Level_Indication.svg|340]]

An **Overall Rate Level Indication** is the change to the overall average rate that makes the premium cover the projected losses, LAE and expenses and achieve the target profit for the policies written while the new rates are in effect. It is the aggregate result, before [[Classification Ratemaking|classification ratemaking]] distributes it among the rating variables. In the [[Loss Ratio Method|loss ratio method]], the indicated change is

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

- $\text{Projected Loss \& LAE Ratio}$ is the projected ultimate losses and LAE divided by the projected earned premium at current rate level.
- $F\%$ is the [[Fixed Expenses|fixed expense]] ratio to the same premium.
- $V$ is the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]], both as shares of premium.

The projected loss and LAE ratio puts the losses and the premium of the experience period on the basis of the future policy period:

1. **Premium** is the historical earned premium brought to [[On Level Premium|current rate level]], developed to ultimate where it is still changing, and [[Premium Trend|trended]].
2. **Losses** are the reported losses with extraordinary [[Large Loss|large losses]] and [[Catastrophe Loss|catastrophes]] replaced by a long-term provision, [[Loss Development|developed]] to ultimate, [[Loss Trend|trended]] to the future cost level, and restated for any benefit or coverage change.
3. **LAE** is included with the losses: [[Allocated Loss Adjustment Expense|ALAE]] with them, and [[Unallocated Loss Adjustment Expenses ULAE|ULAE]] as a percentage load, multiplying the loss and ALAE by $1 + \text{ULAE ratio}$.

Werner & Modlin prescribe no single order for the adjustments. A catastrophe model's provision is already at ultimate and at the future cost level, so it is added after the non-catastrophe losses have been developed and trended.

> [!example]- Two accident years have the premium and losses below. Loss trend is $6\%$ a year, with trend periods of 3 and 2 years, and LAE is $10\%$ of loss. Variable expenses are $23\%$, the fixed expense ratio is $6\%$ and the target profit provision is $5\%$. What is the indicated change? {Example}
>
> | Accident year | Earned premium | On-level factor | Reported loss | CDF |
> | --- | --- | --- | --- | --- |
> | 2023 | $\$12{,}000{,}000$ | 1.085 | $\$7{,}100{,}000$ | 1.16 |
> | 2024 | $\$13{,}500{,}000$ | 1.030 | $\$6{,}200{,}000$ | 1.38 |
>
> - The 2023 losses and LAE are $7{,}100{,}000 \times 1.16 \times 1.06^{3} \times 1.10 = \$10{,}790{,}000$.
> - The 2024 losses and LAE are $6{,}200{,}000 \times 1.38 \times 1.06^{2} \times 1.10 = \$10{,}575{,}000$.
> - The premiums at current rate level are $12{,}000{,}000 \times 1.085 = \$13{,}020{,}000$ and $13{,}500{,}000 \times 1.030 = \$13{,}905{,}000$.
> - Summed over both years, the projected loss and LAE ratio is $21{,}365{,}000/26{,}925{,}000 = 79.35\%$.
> - The numerator is $0.7935 + 0.06 = 0.8535$, and the denominator is $1 - 0.23 - 0.05 = 0.72$.
> - The indicated change factor is $0.8535/0.72 = 1.1854$.
> - The indicated change is $+18.5\%$.

## Indicated change from an indicated rate

The [[Pure Premium Method|pure premium method]] gives an indicated average rate instead of a change. Compared with the current average rate at current rate level, the indicated change is

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

- $\text{Indicated Rate}$ is the pure premium method's indicated average rate per exposure.
- $\text{Current Rate}$ is the projected average premium per exposure at current rates.

Given consistent data and assumptions, the two methods give the same indication. The new average rate is the current average rate times the indicated change factor.

> [!example]- The pure premium method indicates an average rate of $\$441.03$ per exposure, and the current average rate is $\$425.00$. What is the indicated change? {Example}
> - The indicated change factor is $441.03/425.00 = 1.0377$.
> - The indicated change is $+3.8\%$.

## Combining the experience years

Each year's projected loss ratio is calculated, and the years are combined into one. Many companies sum the projected losses and the projected premium across all years, which weights each year's loss ratio by its premium:

> $$\text{Projected Loss \& LAE Ratio} = \frac{\sum_{y} (\text{Losses} + \text{LAE})_y}{\sum_{y} \text{Projected Premium}_y}$$

- $y$ runs over the years of the experience period.
- $(\text{Losses} + \text{LAE})_y$ is year $y$'s projected ultimate losses and LAE, and $\text{Projected Premium}_y$ its projected earned premium at current rate level.

Others select weights for each year, often giving more weight to the most recent years. Equal weights on a shrinking book weight the older years too heavily. An outlier year may be excluded, and the reason for the selection is documented. A pure premium indication combines the years' pure premiums the same way, weighted by exposures.

> [!example]- The two years' projected loss and LAE ratios are $82.9\%$ on $\$13{,}020{,}000$ of premium and $76.1\%$ on $\$13{,}905{,}000$. What combined ratio do premium weights give, and what do weights of $40\%$ and $60\%$ give? {Example}
> - The premium-weighted ratio is the total losses over the total premium, $79.35\%$.
> - Weighting the recent year more, $0.40 \times 82.9\% + 0.60 \times 76.1\%$, which is $78.8\%$.

## Credibility weighting the indication

Where the experience is not fully [[Credibility|credible]], the indicated change is weighted with a [[Complement of Credibility|complement]], such as the countrywide indicated change or the trended present rates. The indicated changes are weighted, not the loss ratios:

> $$\text{Weighted Change} = Z \times \text{Indicated Change} + (1 - Z) \times \text{Complement}$$

- $Z$ is the credibility of the experience.
- $\text{Complement}$ is the complement's indicated change.

With full credibility, $Z = 1$ and the indicated change is based entirely on the experience period.

> [!example]- The book's indication of $+18.5\%$ has credibility $Z = 0.80$, and its complement is $+2.0\%$. What is the credibility-weighted indication? {Example}
> - The weighted change is $0.80 \times 18.5\% + 0.20 \times 2.0\%$.
> - The credibility-weighted indication is $+15.2\%$.

## Sensitivity of the indication

The indication is an estimate built on selections, and testing it against other selections shows how much each one matters. In the two-year example, changing one assumption at a time gives:

| Change | Indicated change |
| --- | --- |
| None | $+18.5\%$ |
| Loss trend $4\%$ instead of $6\%$ | $+13.4\%$ |
| 2024 CDF $1.30$ instead of $1.38$ | $+15.4\%$ |
| Profit provision $3\%$ instead of $5\%$ | $+15.3\%$ |

The trend selection moves the indication most, because it compounds over the trend period and applies to every year's losses. [[ASOP 13 - Trending Procedures in Property Casualty Insurance (ASB - 2009)|ASOP 13]] asks that the trending procedure's methods, assumptions and data be documented so that another actuary could assess their reasonableness.
