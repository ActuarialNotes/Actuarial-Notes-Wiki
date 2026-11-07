---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0a3008292879fe0cd0158cf28784b010ca81da1b24d93019f45bc6c1929a9b38
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 126-137 (PDF pp. 138-149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expense Provisions.md
---

![[Media/Figures/Expense_Provisions.svg|340]]

**Expense Provisions** are the loadings in a rate for the insurer's [[Expenses|underwriting expenses]]: commissions and brokerage, other acquisition, taxes, licenses and fees, and general expenses. Each expense is provided for either as a [[Fixed Expenses|fixed expense]] per exposure or as a [[Variable Expenses|variable expense]] share of premium. With the target [[Profit and Contingency Provision|profit provision]], they turn a [[Pure Premium|pure premium]] into a rate, so the indicated average rate is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $F$ is the fixed expense per exposure.
- $V$ is the variable expense provision, as a share of premium.
- $Q_T$ is the target underwriting profit provision, as a share of premium.

Fixed expenses are assumed the same for each risk regardless of premium, so they are converted to a dollar amount per exposure and added to the pure premium in the numerator. Variable expenses and profit are a share of the rate being solved for. They are expressed as a percentage and enter the denominator of the rate formula, so they gross up the rate rather than being added to it.

> [!example]- Each policy has expected losses and LAE of $\$180$ and $\$20$ of fixed expenses for printing and data entry. Variable expenses are 15% of premium and the target profit provision is 5%. What premium should be charged? {Example}
> - The losses, LAE and fixed expenses come to $180 + 20 = \$200$.
> - The share of premium left after variable expenses and profit is $1 - 0.15 - 0.05 = 0.80$.
> - The premium is $200/0.80 = \$250$.
> - It pays $\$180$ of losses and LAE, $\$20$ of fixed expenses, $0.15 \times 250 = \$37.50$ of variable expenses and $0.05 \times 250 = \$12.50$ of profit.

## Expense ratios by category

Each category's historical expense ratio is calculated year by year. For one calendar year it is

> $$\text{Expense Ratio} = \frac{\text{Expenses}}{\text{Premium}}$$

- $\text{Expenses}$ are the category's calendar year expenses.
- $\text{Premium}$ is the [[Written Premium|written premium]] of the same year for expenses incurred at the onset of the policy: commissions and brokerage, other acquisition, and taxes, licenses and fees.
- $\text{Premium}$ is the [[Earned Premium|earned premium]] of the same year for expenses incurred throughout the policy: general expenses.

The choice of premium matters little when volume is stable. In a growing or shrinking book, written premium moves away from earned premium, and the matching denominator keeps the ratio right. Other acquisition and general expenses are usually assumed uniform across locations, so they use countrywide expenses and premium. Taxes, licenses and fees vary by state, so their ratios use the state's own data. Commissions use state or countrywide data, depending on whether the commission plan varies by location.

The actuary calculates each category's ratio for each year, usually with a multi-year average beside them. The selection is either the latest year's ratio or a multi-year average, balanced with management input, prior expense loads and judgment. Stable ratios favour the multi-year average, and ratios with a trend over time may favour the latest year's ratio.

The selection is a prospective estimate, so it may differ from history. A changing commission structure calls for the expected commission percentage, a staffing reduction calls for the expected expense level after it, and a new call centre built ahead of planned growth raises fixed costs in the short term. A non-recurring or extraordinary expense is examined for its materiality and nature. The actuary may spread it over several years when what it pays for will be used for a long time, or leave it out of the rates, in which case it is funded by existing surplus. Some states do not allow certain expenses, such as charitable contributions or lobbying, in the rates at all.

> [!example]- A commercial general liability insurer's other acquisition expenses were $\$72{,}009$, $\$104{,}707$ and $\$142{,}072$ in three years with written premium of $\$1{,}532{,}091$, $\$1{,}981{,}109$ and $\$2{,}801{,}416$. What other acquisition provision does a three-year average give? {Example}
> - Other acquisition costs are incurred at the onset of the policy, so each year's expenses are divided by its written premium.
> - The ratios are $4.7\%$, $5.3\%$ and $5.1\%$.
> - The ratios are stable and there are no extraordinary expenses, so the three-year straight average is selected.
> - The other acquisition provision is $5.0\%$ of premium.

## The all-variable expense method

The all-variable expense method treats every expense as variable. Every expense category is converted to a ratio to premium, and the selected ratios are summed into one variable expense provision with no fixed expense term, so the indicated rate is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium}}{1 - V - Q_T}$$

- $V$ is the sum of the selected expense ratios of all four categories.

The method is still used for products whose expenses are dominated by variable expenses, such as many commercial lines. It charges the right premium only for the average risk. Treating a fixed cost as variable over-charges large policies and under-charges small ones. Companies using it may soften the distortion with an expense constant, a flat charge on every policy for issuance, auditing and handling, or with premium discounts that reduce the expense loading as policy premium grows.

> [!example]- The $\$20$ fixed expense per policy is $8\%$ of the average $\$250$ premium, so the all-variable method loads $V = 15\% + 8\% = 23\%$. What does it charge a policy with $\$135$ of expected losses and LAE, and one with $\$225$, against the correct premiums? {Example}
> - The correct premium for the small policy is $(135 + 20)/0.80 = \$193.75$.
> - The all-variable premium for the small policy is $135/(1 - 0.23 - 0.05) = \$187.50$, which is $3.2\%$ too low.
> - The correct premium for the large policy is $(225 + 20)/0.80 = \$306.25$.
> - The all-variable premium for the large policy is $225/0.72 = \$312.50$, which is $2.0\%$ too high.

## The premium-based projection method

The premium-based projection method keeps fixed and variable expenses apart. Each category's selected ratio is split by the percentage of it assumed fixed, and the fixed part is turned into dollars, so the fixed expense per exposure is

> $$F = F\% \times \text{Projected Average Premium}$$

- $F\%$ is the fixed expense ratio, the sum over categories of each selected ratio times its percentage assumed fixed.
- $V$, the variable expense provision, is the sum over categories of each selected ratio times one minus its percentage assumed fixed.
- $\text{Projected Average Premium}$ is the average premium per exposure [[Premium Trend|trended]] to the projection period.

Ideally detailed expense data or activity-based cost studies make the split. Otherwise the actuary consults other professionals in the company to set it.

> [!example]- Commissions are $15.0\%$ and premium taxes $2.5\%$ of written premium, both variable. General expenses are $6.0\%$ of earned premium and $75\%$ fixed, and other acquisition is $4.0\%$ of written premium and $50\%$ fixed. The projected average premium is $\$800$. What are $V$, $F\%$ and $F$? {Example}
> - The variable parts are all of commissions and taxes, a quarter of general expenses and half of other acquisition.
> - $V = 15.0\% + 2.5\% + 1.5\% + 2.0\%$, which is $21.0\%$.
> - The fixed parts are three-quarters of general expenses and half of other acquisition.
> - $F\% = 4.5\% + 2.0\% = 6.5\%$.
> - The fixed expense per exposure is $F = 0.065 \times 800 = \$52.00$.

Fixed expenses do not vary with premium, so the fixed expense ratio is distorted when historical and projected premium levels differ:

1. **Rate changes.** Rate increases not fully reflected in the historical premium make the method overstate the expected fixed expenses, and decreases understate them. The remedy is to restate historical premium at [[On Level Premium|current rate level]].
2. **Shifts in average premium.** A shift that raises the average premium without affecting expenses, such as to higher amounts of insurance, overstates the fixed expense ratio. One that lowers it, such as to higher deductibles, understates it. The remedy is to trend historical premium to the projected level.
3. **Countrywide ratios.** A countrywide fixed expense ratio applied to a state's premium allocates fixed expenses by premium. It overstates them in high-premium states and understates them in low-premium states.

> [!example]- The $\$20$ fixed expense was measured when the average premium was $\$200$, so the historical fixed expense ratio is $10\%$. What premium does applying it to today's $\$250$ premium indicate? {Example}
> - The projected fixed expense is $0.10 \times 250 = \$25$, against the true $\$20$.
> - The indicated premium is $(180 + 25)/0.80 = \$256.25$.
> - The stale ratio overstates the indicated premium by $\$6.25$.

## The exposure/policy-based projection method

The exposure/policy-based projection method treats variable expenses as the premium-based method does but divides the fixed expenses by exposures or by policy count. When fixed expenses are assumed constant for each exposure, the fixed expense per exposure is

> $$F = \frac{\text{Fixed Expenses}}{\text{Exposures}}$$

- $\text{Fixed Expenses}$ are each category's expenses times its percentage assumed fixed.
- $\text{Exposures}$ are written exposures for expenses incurred at the onset of the policy and earned exposures for expenses incurred throughout it.
- When fixed expenses are assumed constant for each policy, the policy count replaces the exposures.

A loss ratio indication needs the fixed expense as a ratio, so $F$ is then divided by the projected average premium.

> [!example]- General expenses were $\$31{,}195{,}169$ in a year with 4,872,000 earned exposures and $\$545{,}250{,}000$ of earned premium, and $75\%$ of them are fixed. What are the fixed expense per exposure and the variable expense ratio? {Example}
> - The fixed expenses are $0.75 \times 31{,}195{,}169 = \$23{,}396{,}377$.
> - General expenses are incurred throughout the policy, so they are divided by earned exposures.
> - The fixed expense per exposure is $23{,}396{,}377/4{,}872{,}000 = \$4.80$.
> - The variable expenses, $\$7{,}798{,}792$, are divided by earned premium, for a variable expense ratio of $1.4\%$.

The method corrects the distortions of the other two, but it has shortcomings of its own:

1. The split into fixed and variable is still largely judgmental.
2. It allocates countrywide fixed expenses to states by exposure or policy count, although fixed expense levels may vary by location.
3. Some expenses treated as fixed vary by characteristic, such as new versus renewal business.
4. Economies of scale in a growing or shrinking book make the average fixed expense per exposure decline or rise.

## Trending expenses

A variable expense ratio needs no trend, since the variable expenses change with premium automatically. A fixed expense ratio from the premium-based method needs none if average fixed expense and average premium change at the same rate. A fixed expense per exposure on an inflation-sensitive base needs none if the expenses and the base change at the same rate. A fixed expense per exposure on a base that does not inflate (car-years, house-years), or per policy, is expected to change and is trended, so the projected fixed expense is

> $$\text{Projected } F = F \times (1 + t)^n$$

- $t$ is the annual expense trend, from internal expense data or government indices such as the Consumer Price Index.
- $n$ runs from the average date the expenses were incurred in the historical period to the average date they will be incurred while the rates are in effect.
- Expenses incurred at the onset of the policy are trended between average written dates, and expenses incurred throughout it between average earned dates.

> [!example]- General expenses were $\$4.80$ per exposure in calendar year 2015. Annual policies will be written for one year from January 1, 2017, and the expense trend is $3\%$ a year. What is the projected fixed expense? {Example}
> - The historical expenses were incurred on average at July 1, 2015.
> - General expenses are incurred throughout the policy, so they are trended to the average earned date of the policies written in 2017, January 1, 2018.
> - The trend period is 2.5 years, six months longer than the 2 years an expense incurred at the onset of the policy would be trended.
> - The projected fixed expense is $4.80 \times 1.03^{2.5} = \$5.17$ per exposure.

## Reinsurance costs

Proportional reinsurance may need no explicit treatment. For non-proportional reinsurance, the projected losses are reduced for the expected recoveries and the premium is reduced by the amount ceded. Alternatively, the net cost of the reinsurance, the cost of the reinsurance less the expected recoveries, is included as an expense item ([[Reinsurance#Reinsurance in ratemaking|reinsurance in ratemaking]]).

## The permissible loss ratios

What is left of each premium dollar after the provisions is a [[Permissible Loss Ratio|permissible loss ratio]]. The variable permissible loss ratio pays for loss, LAE and fixed expenses, and it is

> $$\text{VPLR} = 1 - V - Q_T$$

The total permissible loss ratio pays for loss and LAE alone, and it is

> $$\text{PLR} = 1 - F\% - V - Q_T$$

The two are equal when all expenses are treated as variable.

> [!trap] Adding the variable expense percentage instead of dividing by it
> Variable expenses and profit are a share of the final premium, so they cannot be added as a share of the costs. Grossing $\$200$ up by $20\%$ gives $\$240$, which leaves only $\$240 - 0.20 \times 240 = \$192$ for $\$200$ of losses and fixed expenses. Dividing by $0.80$ gives the $\$250$ that covers them.
