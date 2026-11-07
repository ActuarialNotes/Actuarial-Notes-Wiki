---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:5efce71ac2524df48321fce1ddd7a9200ba16f1852b8465af9d6b41853d40e38
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p.94 (PDF p.106), Appendix A description at p.327 (PDF p.339), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Ratio.md
---

![[Media/Figures/Loss_Ratio.svg|340]]

A **Loss Ratio** is the ratio of losses to premium. It measures the portion of each premium dollar needed to pay losses. The loss ratio of a group of policies over a period is

> $$\text{Loss Ratio} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Premium}}$$

- $\text{Losses}$ are the reported or [[Ultimate Loss|ultimate]] losses of the period.
- $\text{LAE}$ is the [[Loss and Loss Adjustment Expense|loss adjustment expense]]. With it included, the ratio is called the loss and LAE ratio.
- $\text{Earned Premium}$ is the [[Earned Premium|earned premium]] of the same period.

The loss ratio changes with the losses and premium chosen: [[Accident Year|accident year]] or [[Calendar Year|calendar year]], reported or ultimate, with or without LAE. A loss ratio is quoted with its basis.

> [!example]- A personal auto book earned $\$10{,}000{,}000$ of premium in an accident year, and its ultimate losses and LAE are $\$6{,}800{,}000$. What is its loss and LAE ratio? {Example}
> - The losses and LAE are divided by the earned premium.
> - The loss and LAE ratio is $6{,}800{,}000/10{,}000{,}000 = 68.0\%$.

## Loss ratio and pure premium

Dividing the losses and the premium by the same exposures gives

> $$\text{Loss Ratio} = \frac{\text{Pure Premium}}{\text{Average Premium}}$$

- The [[Pure Premium|pure premium]] is the losses per earned exposure.
- The average premium is the premium per earned exposure.
- The premium and the exposures are on the same basis: written, earned or in-force.

The [[Loss Ratio Method|loss ratio method]] and the [[Pure Premium Method|pure premium method]] therefore measure the same quantity in two ways.

> [!example]- A homeowners book has a pure premium of $\$440$ per house-year and an average earned premium of $\$680$ per house-year. What is its loss ratio? {Example}
> - The pure premium is divided by the average premium.
> - The loss ratio is $440/680 = 64.7\%$.

## Loss and LAE ratio

The LAE ratio divides LAE by losses, not by premium. The loss and LAE ratio is therefore

> $$\text{Loss and LAE Ratio} = \text{Loss Ratio} \times (1 + \text{LAE Ratio})$$

- $\text{Loss Ratio}$ here excludes LAE.
- $\text{LAE Ratio}$ is $\text{LAE}/\text{Losses}$.

> [!example]- A book has a loss ratio of 62.5% without LAE, and its LAE is 12% of losses. What is its loss and LAE ratio? {Example}
> - The LAE ratio multiplies the loss ratio, because it is a share of losses.
> - The loss and LAE ratio is $0.625 \times 1.12 = 70.0\%$.

## Rate adequacy and the permissible loss ratio

A projected loss and LAE ratio is judged against the [[Permissible Loss Ratio|permissible loss ratio]], the share of premium left for losses and LAE after expenses and profit. When all expenses are variable, the indicated rate change is

> $$\text{Indicated Change} = \frac{\text{Projected Loss Ratio}}{\text{PLR}} - 1$$

- $\text{Projected Loss Ratio}$ is the loss and LAE ratio with the losses developed to ultimate and trended, over the premium brought to [[On Level Premium|current rate level]] and trended.
- $\text{PLR} = 1 - V - Q_T$, with $V$ the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]].

A projected loss ratio above the PLR means rates are inadequate even when the book appears to be making money.

> [!example]- An insurer projects ultimate losses and LAE of $\$715{,}000$ against $\$1{,}000{,}000$ of trended on-level earned premium. Variable expenses are 25% of premium and the target profit provision is 5%. Are its rates adequate? {Example}
> - The projected loss and LAE ratio is $715{,}000/1{,}000{,}000 = 71.5\%$.
> - The permissible loss ratio is $1 - 0.25 - 0.05 = 70.0\%$.
> - The indicated change is $0.715/0.700 - 1 = +2.1\%$.
> - The rates are inadequate by 2.1%, although the loss ratio is well below 100%.

## Loss ratios across accident years

In reserving, the loss ratios of successive accident years at the same age are compared. With no change in rates, [[Mix of Business|mix of business]] or claims handling, the series should move smoothly. A break in the series is a signal of such a change, such as an unrecorded rate change, a mix shift or a change in [[Case Adequacy|case reserve adequacy]].

> [!example]- Reported loss ratios at 24 months are 61%, 62%, 60% and 71% for four successive accident years, with no rate change in that time. What does the series say? {Example}
> - The first three years move smoothly, around 61%.
> - The latest year breaks the series by about 10 points.
> - With no rate change, the break points to a shift in the mix of business, a change in case reserve adequacy or a change in claims handling, to be investigated before the latest year's ultimate loss is selected.

> [!trap] Adding an LAE ratio measured against losses
> An LAE ratio is a share of losses, so it multiplies the loss ratio. Adding a 12% LAE ratio to a 62.5% loss ratio gives 74.5%, against the correct $0.625 \times 1.12 = 70.0\%$. Only an LAE provision stated as a share of premium is added to the loss ratio.
