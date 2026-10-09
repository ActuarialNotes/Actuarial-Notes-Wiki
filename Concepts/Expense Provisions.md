---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:92699e7865a20f6cf42723cfec21b8052b00c0c68df9a6fa19882dac701e3103
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 pp.125-139 (PDF pp.137-151), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 p.9 (PDF p.21), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.141-145 (PDF pp.153-157), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 p.151 (PDF p.163), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
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
