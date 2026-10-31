---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e98a2d73f95b5a72111109d38e18b05f375a30b58d31e6287f9323d71670616
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp. 126-137 (PDF pp. 138-149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expense Provisions.md
---

**Expense Provisions** are the loadings built into a rate to cover the insurer's costs of doing business other than losses and loss adjustment expense — commissions, other acquisition costs, general expenses, and premium taxes/licences/fees — together with the [[Profit and Contingency Provision|underwriting profit provision]]. How each is treated depends on whether it varies with premium.

> $$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$
>
> $$V = \text{variable expense \%}, \quad Q_T = \text{target UW profit \%}$$

- [[Variable Expenses]] move proportionally with premium — premium taxes and commissions are Werner's examples. They are expressed as a percentage and enter the **denominator** of the rate formula, so they gross up the rate rather than being added to it.
- [[Fixed Expenses]] are assumed the same for each risk regardless of premium — typically home-office overhead, and per-policy costs such as printing and data entry. They are converted to a **dollar amount per exposure** and added to the pure premium in the numerator. Treating a fixed cost as variable over-charges large policies and under-charges small ones.
- The **all-variable expense method** loads every expense as a percentage of premium. It is still used for products whose expenses are dominated by variable expenses (many commercial lines), but where fixed expenses are material it distorts rates across policy sizes, because it implies a $\$5{,}000$ policy costs ten times as much to issue as a $\$500$ policy.
- **Premium-based ratios use different denominators.** Expenses incurred at the onset of the policy — commissions, other acquisition, and taxes, licenses and fees — are calculated on [[Written Premium]]; general expenses, incurred throughout the policy, on [[Earned Premium]]. The choice matters little when volume is stable, but in a growing or shrinking book written premium moves away from earned, and the matching denominator keeps the ratio right.
- The **variable permissible loss ratio** is what is left after the variable expense and profit provisions, $\text{VPLR} = 1 - V - Q_T$, and pays for loss, LAE and fixed expenses; the **total permissible loss ratio** also takes out the fixed expense ratio, $\text{PLR} = 1 - F - V - Q_T$, and pays for loss and LAE alone. The two are equal when all expenses are treated as variable (see [[Permissible Loss Ratio]], [[Loss Ratio Method]]).
- **Reinsurance costs** can enter the [[Overall Rate Level Indication]] too. Proportional reinsurance may need no explicit treatment; for non-proportional reinsurance the projected losses are reduced for expected recoveries and the premium reduced by the amount ceded — or the net cost (cost of the reinsurance less expected recoveries) is included as an expense item.
- Expense **trend**: a variable expense ratio needs none, since it changes with premium automatically. A fixed expense *ratio* (premium-based method) needs none if average fixed expense and average premium change at the same rate; a fixed expense *per exposure* on a base that does not inflate (car-years, house-years) or per policy is expected to change and is trended (see [[Loss Trend]], [[Premium Trend]]).

## Selecting the provisions

Werner & Modlin, Ch. 7:

- **Year by year, then a selection.** The actuary calculates the historical expense ratio for each expense category and each year (or, in the exposure/policy-based method, the fixed expense per exposure or per policy), usually with a multi-year average beside them. The selection for each category is either the latest year's ratio or a multi-year average, balanced with management input, prior expense loads and judgment. Where the ratios are stable the multi-year average is selected; where they show a trend over time the actuary may select the most recent year's ratio or some other value.
- **Select the total, then split it.** In the premium-based method the selection is made on each category's total expense ratio, and the selected ratio is then divided into its fixed and variable parts.
- **A prospective estimate.** Because ratemaking projects future costs, the selected ratio should be consistent with the expenses expected in the future, which may differ from history: an expected commission percentage where the commission structure is changing, the expected expense level after a staffing reduction from productivity gains, and higher fixed costs in the short term where a growing company adds capacity (a new call centre) ahead of its planned growth.
- **Non-recurring and extraordinary items.** Non-recurring expense items, one-time changes in expense levels, or anticipated changes in expenses should be considered in making the selection. An extraordinary expense is examined for its materiality and nature: the actuary may reflect it in the rates, spreading it over several years where what it pays for (a new policy-issuance system, say) will be used for a significant length of time, or leave it out of the rates, in which case it is basically funded by existing surplus. In Werner's Table 7.1 there were no extraordinary expenses, so a three-year straight average is selected; a year inflated by an extraordinary item is not simply averaged in with the others. Some states do not allow certain expenses, such as charitable contributions or lobbying, in the rates at all.
- **Countrywide or state data.** Other acquisition costs and general expenses are usually assumed to be uniform across locations, so their ratios use countrywide expenses over countrywide premium. Taxes, licenses and fees vary by state, so their ratios are based on the state's own data, and commissions use state or countrywide data depending on whether the commission plan varies by location. A countrywide ratio therefore may not fit a single state's taxes, licenses and fees or commissions.

## Distortions in the projection methods

- **Premium-based method.** Since fixed expenses do not vary with premium, the fixed expense ratio is distorted when historical and projected premium levels differ. Rate increases not fully reflected in the historical premium make the method overstate the expected fixed expenses (decreases understate them); the remedy is to restate historical premium at current rate level. A shift in mix that raises the average premium without affecting expenses (higher amounts of insurance) makes the method overstate the fixed expense ratio, and one that lowers it (higher deductibles) understate it; the remedy is to trend historical premium to the projected level. Applying a countrywide fixed expense ratio to state premium allocates fixed expenses by premium, overstating them in high-premium states and understating them in low-premium states. The exposure/policy-based method avoids all three.
- **Exposure/policy-based method.** Its shortcomings are that the split into fixed and variable is still largely judgmental; that it allocates countrywide fixed expenses to states by exposure or policy count although fixed expense levels may vary by location; that some expenses treated as fixed actually vary by characteristic, such as new versus renewal business; and that economies of scale in a growing or shrinking book make the average fixed expense per exposure decline or rise.

![[Media/Figures/Expense_Provisions.svg|340]]

> [!example]- Splitting Fixed and Variable Expenses {Example}
> An insurer's expense study shows commissions $15.0\%$ of written premium, premium taxes $2.5\%$ of written premium, general expenses $6.0\%$ of earned premium ($75\%$ fixed), and other acquisition $4.0\%$ of written premium ($50\%$ fixed). The target underwriting profit provision is $5.0\%$. Projected average premium is $\$800$.
>
> Determine the variable expense percentage and the fixed expense per exposure.
>
> > [!answer]-
> > **Variable expenses** — the fully variable items plus the variable halves:
> >
> > $$V = 15.0\% + 2.5\% + (6.0\% \times 0.25) + (4.0\% \times 0.50)$$
> >
> > $$= 15.0\% + 2.5\% + 1.5\% + 2.0\% = 21.0\%$$
> >
> > **Fixed expenses** — the fixed portions, as a percentage of premium:
> >
> > $$F\% = (6.0\% \times 0.75) + (4.0\% \times 0.50) = 4.5\% + 2.0\% = 6.5\%$$
> >
> > Converted to dollars per exposure at the projected average premium:
> >
> > $$F = 6.5\% \times \$800 = \$52.00 \text{ per exposure}$$
> >
> > The [[Pure Premium Method]] rate is then $(\text{PP} + \$52.00)/(1 - 0.210 - 0.050) = (\text{PP} + \$52.00)/0.740$.

> [!example]- Why the Treatment Matters {Example}
> Using the provisions above, compare the indicated rate for a small risk (pure premium $\$150$) under the correct fixed/variable split versus an all-variable method that loads the full $27.5\%$ expense ratio as variable.
>
> > [!answer]-
> > **Fixed/variable split:**
> >
> > $$\text{Rate} = \frac{\$150 + \$52.00}{1 - 0.210 - 0.050} = \frac{\$202.00}{0.740} = \$272.97$$
> >
> > **All-variable:**
> >
> > $$\text{Rate} = \frac{\$150}{1 - 0.275 - 0.050} = \frac{\$150}{0.675} = \$222.22$$
> >
> > The all-variable method under-prices this small risk by about $\$51$, or $19\%$. It assumes the risk's expense load scales down with its pure premium, when in reality issuing and servicing the policy costs roughly the same $\$52$ regardless of size. The mirror-image error appears on large risks, which the all-variable method over-charges — an equity problem and, over time, an adverse-selection problem as competitors pick off the over-priced large accounts.
