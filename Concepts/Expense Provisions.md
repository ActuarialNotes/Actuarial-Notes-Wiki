**Expense Provisions** are the loadings built into a rate to cover the insurer's costs of doing business other than losses and loss adjustment expense — commissions, other acquisition costs, general expenses, and premium taxes/licences/fees — together with the [[Profit and Contingency Provision|underwriting profit provision]]. How each is treated depends on whether it varies with premium.

> $$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$
>
> $$V = \text{variable expense \%}, \quad Q_T = \text{target UW profit \%}$$

- [[Variable Expenses]] move proportionally with premium — commissions (a percentage of premium), premium taxes, licences and fees. They are expressed as a percentage and enter the **denominator** of the rate formula, so they gross up the rate rather than being added to it.
- [[Fixed Expenses]] do not vary with premium — most general expenses, policy issuance, and much of "other acquisition". They are converted to a **dollar amount per exposure** and added to the pure premium in the numerator. Treating a fixed cost as variable over-charges large policies and under-charges small ones.
- The **all-variable expense method** loads every expense as a percentage of premium. It is simpler and still common, but it systematically distorts rates across policy sizes because it implies a $\$5{,}000$ policy costs ten times as much to issue as a $\$500$ policy.
- **Premium-based ratios use different denominators.** Commissions and taxes are incurred when premium is *written*, so those ratios are calculated on [[Written Premium]]; general and other-acquisition expenses are incurred as coverage is provided, so those ratios are calculated on [[Earned Premium]]. Mixing the two mis-states the provision when the book is growing or shrinking.
- The **permissible loss ratio** is the complement of the expense and profit provisions: $\text{PLR} = 1 - V - Q_T$ where fixed expenses are handled separately (see [[Permissible Loss Ratio]], [[Loss Ratio Method]]).
- **Reinsurance costs** and the [[Catastrophe Loss|catastrophe]] provision sit alongside the expense provisions in the [[Overall Rate Level Indication]]; the net cost of reinsurance (ceded premium less expected ceded losses) is a real cost of writing the business even though it is not an internal expense.
- Expense **trend** is often ignored on the assumption that fixed expenses inflate at roughly the same rate as premium, but where the two diverge materially the fixed provision should be trended independently (see [[Loss Trend]], [[Premium Trend]]).

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
