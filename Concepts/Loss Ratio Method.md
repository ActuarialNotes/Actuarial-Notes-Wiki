---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e9a0b7efd921f93be381e21cd18686bc69865ae8554cc1ec4fd7e47bf8c505a
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.139 (PDF p.151); Ch. 8 pp.141-148 (PDF pp.153-160), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Ratio Method.md
---

![[Media/Figures/Loss_Ratio_Method.svg|340]]

The **Loss Ratio Method** is the [[Overall Rate Level Indication|rate level indication]] that derives an indicated change to the current rates. It compares the share of each premium dollar needed for the projected losses, LAE and fixed expenses with the share available for them, the variable [[Permissible Loss Ratio|permissible loss ratio]]. The indicated change is

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio} + F\%}{1 - V - Q_T} - 1$$

- $\text{Projected Loss \& LAE Ratio}$ is the projected ultimate losses and LAE divided by the projected earned premium at current rate level.
- $F\%$ is the [[Fixed Expenses|fixed expense]] ratio, the projected fixed expenses divided by the same premium.
- $V$ is the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]], both as shares of premium.

Fixed expenses do not scale with premium, so they sit in the numerator with the losses, and only the variable expenses and profit reduce the denominator. A result above zero means the current rates are inadequate. A result below zero means they are excessive, and the sign is kept.

> [!example]- Projected ultimate losses and LAE are $65\%$ of projected premium at current rate level, and the fixed expense ratio is $6.5\%$. Variable expenses are $25\%$ and the target profit provision is $10\%$. What is the indicated change? {Example}
> - The numerator is $0.65 + 0.065 = 0.715$.
> - The variable permissible loss ratio is $1 - 0.25 - 0.10 = 0.65$.
> - The indicated change is $0.715/0.65 - 1 = +10\%$.

## All expenses variable

When all expenses are treated as variable, $V$ is the total expense ratio, there is no fixed expense term, and the indicated change is

> $$\text{Indicated Change} = \frac{\text{Projected Loss \& LAE Ratio}}{\text{PLR}} - 1$$

- $\text{PLR} = 1 - V - Q_T$ is the permissible loss ratio.

The same form gives the indicated change for one class or territory, from its own projected loss ratio. Using the fixed expense ratio in both the numerator and the PLR counts it twice.

> [!example]- Projected losses and LAE are $72\%$ of premium, variable expenses $22\%$, fixed expenses $6\%$ of premium and the target profit provision $5\%$. What do the two forms indicate, and what does counting the fixed expenses twice give? {Example}
> - With fixed expenses in the numerator, the change is $0.78/0.73 - 1 = +6.8\%$.
> - With all expenses variable, $\text{PLR} = 1 - 0.28 - 0.05 = 0.67$, and the change is $0.72/0.67 - 1 = +7.5\%$.
> - Both are defensible. Counting the fixed expenses twice gives $0.78/0.67 - 1 = +16.4\%$, which is not.

## The projected loss and LAE ratio

The loss ratio of each year of the experience period puts the year's losses and premium on the basis of the future policy period:

> $$\text{Loss Ratio}_y = \frac{\text{Losses}_y \times \text{CDF} \times \text{Trend Factor} \times (1 + \text{ULAE Ratio})}{\text{Earned Premium}_y \times \text{On-Level Factor} \times \text{Premium Trend Factor}}$$

- $\text{CDF}$ develops the year's reported losses and ALAE to ultimate.
- $\text{Trend Factor}$ is the [[Loss Trend|loss trend]] factor to the future cost level, $(1 + t)^n$.
- $\text{ULAE Ratio}$ is the ULAE provision as a percentage of loss and ALAE.
- $\text{On-Level Factor}$ brings the premium to [[On Level Premium|current rate level]], and $\text{Premium Trend Factor}$ trends it to the future period ([[Premium Trend|premium trend]]).

The loss ratio is thus trended at the loss trend factor divided by the premium trend factor. The years are combined into one projected ratio, usually by summing the projected losses and premium across all years, which weights each year by its premium. Selected weights, often favouring the most recent years, are an alternative, and the selection is justified by the stability of the years. The method uses premium and never exposures. It needs premium at current rate level, so it cannot price a new line of business or territory with no current rates, nor a new rating variable that the historical premium cannot be put on level for.

> [!example]- Three accident years have the data below. Loss trend is $5\%$ a year, with trend periods of 3.5, 2.5 and 1.5 years, and LAE is $11\%$ of loss. Variable expenses are $21\%$, the fixed expense ratio is $7\%$ and the target profit provision is $4\%$. What is the indicated change? {Example}
>
> | Accident year | Earned premium | Reported loss | On-level factor | CDF |
> | --- | --- | --- | --- | --- |
> | 2022 | $\$8{,}000{,}000$ | $\$4{,}600{,}000$ | 1.120 | 1.08 |
> | 2023 | $\$8{,}600{,}000$ | $\$4{,}500{,}000$ | 1.075 | 1.19 |
> | 2024 | $\$9{,}300{,}000$ | $\$3{,}900{,}000$ | 1.030 | 1.42 |
>
> - Developed, trended and loaded for LAE, the losses are $\$6{,}541{,}000$, $\$6{,}715{,}000$ and $\$6{,}614{,}000$.
> - At current rate level, the premiums are $\$8{,}960{,}000$, $\$9{,}245{,}000$ and $\$9{,}579{,}000$.
> - The years' loss ratios are $73.0\%$, $72.6\%$ and $69.0\%$, a stable series.
> - Summed over the years, the projected loss and LAE ratio is $19{,}870{,}000/27{,}784{,}000 = 71.5\%$.
> - The indicated change is $0.785/0.75 - 1 = +4.7\%$, with $1 - 0.21 - 0.04 = 0.75$.
> - Weights of $20\%$, $30\%$ and $50\%$ toward the recent years give a $70.9\%$ ratio and $+3.9\%$.

## Loss ratio method versus pure premium method

The loss ratio method is the more widely used of the two methods. It needs no exposure data, so it is preferable where exposure data is unavailable or the product has no clearly defined [[Exposure Base|exposure base]], such as commercial general liability, whose sub-lines use different exposure bases. It is preferred where the indicated change itself is a critically important statistic for the pricing decision. Its requirement is premium at current rate level, which is hard to calculate accurately after many changes to a complex rating algorithm.

Given consistent data and assumptions, the method is equivalent to the [[Pure Premium Method|pure premium method]], because a loss ratio is the pure premium divided by the average premium. An approximation in the on-level premium, such as the parallelogram method, can make the two disagree.

> [!trap] Leaving the premium at historical rates
> The loss ratio method measures the change to the current rates, so the premium must be at current rate level. A book that took a $+8\%$ rate change halfway through the experience period, left unadjusted, has its loss ratio overstated and its indicated change overstated with it.
