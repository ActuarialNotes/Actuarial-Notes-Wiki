---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d35f4e97459404a874301f4f106469681e57e46f604023db2ade2d3f70c221ba
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 125-135 (PDF pp. 137-147), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Expenses.md
---

![[Media/Figures/Fixed_Expenses.svg|340]]

**Fixed Expenses** are underwriting expenses assumed to be the same for each risk regardless of the size of the premium, a constant dollar amount for each exposure or policy. Typically they are home-office overhead and per-policy costs such as printing and data entry. In the exposure/policy-based projection method, the fixed expense per exposure is

> $$F = \frac{\text{Fixed Expenses}}{\text{Exposures}}$$

- $\text{Fixed Expenses}$ are each expense category's expenses times its percentage assumed fixed, summed over the categories.
- $\text{Exposures}$ are written exposures for expenses incurred at the onset of the policy and earned exposures for expenses incurred throughout it.
- When fixed expenses are assumed constant for each policy, the policy count replaces the exposures.

The split into fixed and variable is ideally made from detailed expense data or activity-based cost studies. Otherwise it is generally made judgmentally, with other professionals in the company, as a percentage of each category, such as general expenses $75\%$ fixed.

> [!example]- An insurer has $\$500{,}000$ of fixed general expenses and 10,000 earned exposures. What is its fixed expense per exposure? {Example}
> - General expenses are incurred throughout the policy, so they are divided by earned exposures.
> - The fixed expense per exposure is $500{,}000/10{,}000 = \$50$.

## Fixed expenses in the indicated rate

$F$ is added to the [[Pure Premium|pure premium]] in the numerator of the indicated rate, while the [[Variable Expenses|variable expenses]] and the profit provision are in the denominator:

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $V$ is the variable expense provision, as a share of premium.
- $Q_T$ is the target underwriting profit provision, as a share of premium.

The rate is therefore a flat charge plus a proportional gross-up. In the [[Loss Ratio Method|loss ratio method]] the same expense is a fixed expense ratio, $F\%$, added to the projected loss ratio in the numerator.

> [!example]- With $\$50$ of fixed expenses per exposure, a projected pure premium of $\$200$, variable expenses of $20\%$ and a target profit provision of $5\%$, what is the indicated rate? {Example}
> - The pure premium and the fixed expense together are $200 + 50 = \$250$.
> - The share of premium left after variable expenses and profit is $1 - 0.20 - 0.05 = 0.75$.
> - The indicated rate is $250/0.75 = \$333.33$.
> - The variable expenses, $\$66.67$, and the profit, $\$16.67$, are exactly $25\%$ of the rate.

## Fixed expenses from a fixed expense ratio

In the premium-based projection method, fixed expenses are divided by premium instead, which gives a fixed expense ratio. Converted to dollars, the fixed expense per exposure is

> $$F = F\% \times \text{Projected Average Premium}$$

- $F\%$ is the fixed expense ratio, the sum over categories of each selected expense ratio times its percentage assumed fixed.
- $\text{Projected Average Premium}$ is the average premium per exposure trended to the projection period.

The method assumes fixed expenses scale with average premium. When the historical and projected premium levels differ, from rate changes or from shifts in the average premium, the fixed expense estimate is distorted, while the variable expenses are not ([[Expense Provisions#The premium-based projection method|premium-based projection method]]).

> [!example]- General expenses are $6.0\%$ of earned premium and $75\%$ fixed, other acquisition is $4.0\%$ of written premium and $50\%$ fixed, and the projected average premium is $\$800$. What is the fixed expense per exposure? {Example}
> - The fixed expense ratio is $4.5\% + 2.0\% = 6.5\%$, three-quarters of the general expenses and half of other acquisition.
> - The fixed expense per exposure is $0.065 \times 800 = \$52.00$.

## Treating fixed expenses as variable

The all-variable expense method loads every expense, fixed ones included, as a percentage of premium. It gives the right premium only for the average risk. Treating fixed expenses as variable understates the premium of small-premium policies and overstates the premium of large-premium policies, so large policies subsidize small ones. The overall rate level is unchanged, only its distribution across policy sizes is wrong. Separating fixed and variable expenses improves equity across risk sizes, and it lets each be trended and monitored on its own.

> [!example]- The insurer's $\$50$ fixed expense is $15\%$ of its $\$333.33$ average rate. What do the correct method and the all-variable method charge a risk with a pure premium of $\$80$ and one with $\$1{,}200$? {Example}
> - The correct rate for the small risk is $(80 + 50)/0.75 = \$173.33$.
> - The all-variable rate for the small risk is $80/0.60 = \$133.33$, with $1 - 0.20 - 0.15 - 0.05 = 0.60$, $23\%$ too low.
> - The correct rate for the large risk is $(1{,}200 + 50)/0.75 = \$1{,}666.67$.
> - The all-variable rate for the large risk is $1{,}200/0.60 = \$2{,}000.00$, $20\%$ too high.

Companies using the all-variable method may soften the distortion with an expense constant, a flat fee on every policy for issuance, auditing and handling expenses that apply uniformly, or with premium discounts that reduce the expense loading as policy premium grows, as workers compensation insurers do.

## Fixed expense fee

When the rating algorithm collects fixed expenses through an additive fee, the fee must also carry the variable expenses and profit on the premium it brings in. The fee is the fixed expense per exposure divided by the variable permissible loss ratio:

> $$\text{Fixed Expense Fee} = \frac{F}{1 - V - Q_T}$$

The fee is part of premium, so the variable expense ratio applies to it too.

> [!example]- The fixed expense is $\$20$ per exposure, variable expenses are $15\%$ and the target profit provision is $5\%$. What fixed expense fee should the rating algorithm add? {Example}
> - The variable permissible loss ratio is $1 - 0.15 - 0.05 = 0.80$.
> - The fee is $20/0.80 = \$25$.
> - It holds $\$20$ for the fixed expenses and $\$5$ for the variable expenses and profit on the fee itself.

## Trending fixed expenses

Fixed expenses are a constant dollar amount, so they are expected to rise with inflation. In the premium-based method no trend is needed if average fixed expense and average premium change at the same rate. A fixed expense per exposure on an inflation-sensitive base, such as payroll, needs no trend if the expenses and the base change at the same rate. A fixed expense per exposure on a base that does not inflate (car-years, house-years), or per policy, is trended:

> $$\text{Projected } F = F \times (1 + t)^n$$

- $t$ is the annual fixed expense trend.
- $n$ runs from the average date the expenses were incurred in the historical period to the average date they will be incurred while the rates are in effect.

A growing portfolio can make expense ratios decrease, since volume will likely increase faster than expenses. Where a growing book's average fixed expense per exposure declines through economies of scale, the selection should reflect the expected growth.

> [!example]- The fixed expense is $\$50$ per car-year at the average date of the experience period, the fixed expense trend is $3\%$ a year and the trend period is 2.5 years. What is the projected fixed expense? {Example}
> - The car-year does not inflate, so the fixed expense per car-year is trended.
> - The projected fixed expense is $50 \times 1.03^{2.5} = \$53.84$ per car-year.
