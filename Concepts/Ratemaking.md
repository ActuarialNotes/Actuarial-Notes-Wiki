**Ratemaking** is the process of determining the appropriate price (the **rate**) to charge for insurance coverage. It is a **prospective** process that uses historical data and actuarial projections to ensure the premium collected is sufficient to cover future losses, expenses, and a margin for profit, while remaining competitive and regulatory-compliant. Contrast with [[Loss Reserving|loss reserving]], which is retrospective.

- The **fundamental insurance equation** states that, over the future policy period:

> $$\text{Premium} = \text{Losses} + \text{LAE} + \text{UW Expenses} + \text{UW Profit}$$

- The [[Overall Rate Level Indication|indicated rate change]] restates that equation as the adjustment needed to current rates:

> $$\text{Indicated Rate Change} = \frac{L + E_F}{1 - V - Q_T} \Big/ \text{Current Avg Rate} - 1$$
>
> $$L = \text{proj. loss \& LAE ratio (or PP)},\ E_F = \text{fixed expense}$$
>
> $$V = \text{variable expense \%},\ Q_T = \text{target UW profit \%}$$

- Two equivalent constructions produce this indication: the [[Pure Premium Method]] (works from exposures and losses, needs no premium) and the [[Loss Ratio Method]] (works from [[On Level Premium|on-level premium]] and a [[Permissible Loss Ratio]]). They agree when given consistent inputs.
- Historical data must be adjusted on three axes before it can be used: [[Loss Development|developed]] to ultimate, [[Loss Trend|trended]] to the future period, and [[On-Leveling|brought to current rate level]]. Skipping any one biases the indication; conflating development and trend double-counts.
- Ratemaking data is organized by [[Ratemaking Data Organization|calendar, accident, policy, or report period]], each trading timeliness against how cleanly it matches premium to loss.
- The overall indication is then allocated to individual risks through [[Classification Ratemaking|classification]], [[Territory Ratemaking|territory]], [[Increased Limits|limit]], and [[Deductible Rating|deductible]] relativities, and finalized through the [[Rating Algorithm|rating algorithm]].
- The [[Principles of Ratemaking|four CAS principles]] frame the whole exercise: a rate estimates expected future costs, provides for all costs of the risk transfer, provides for the costs of an *individual* risk transfer, and is actuarially sound — and therefore not excessive, inadequate, or unfairly discriminatory — when it does all three.
- The calculated indication is rarely the filed change: [[Ratemaking Constraints|regulatory, operational, and marketing constraints]] and [[Lifetime Value|customer lifetime value]] shape the selected [[Rate Change|rate change]].

![[Media/Figures/Ratemaking.svg|340]]

> [!example]- Calculating a Pure Premium {Example}
> 
> An actuary expects a fleet of 1,000 delivery vans to incur $250,000 in total losses over the next year. If the administrative expenses are estimated at $50$ per van, what is the **Pure Premium**?
> 
> > [!answer]-
> > 
> > - **Projected Losses ($L$):** $250,000
> > - **Exposure Units ($N$):** $1,000$ vans
> > 
> > The **Pure Premium** ($PP$) represents the portion of the rate required to pay for losses and loss adjustment expenses:
> > 
> > $$PP = \frac{L}{N} = \frac{250,000}{1,000} = \$250$$
> > 
> > > [!tip] The "Gross" Difference
> > > The Pure Premium is **not** the final price the customer pays. To get the **Gross Premium**, you must "load" the Pure Premium for taxes, commissions, and profit — see [[Expense Provisions]].

> [!example]- Indicated Rate Change {Example}
> Projected pure premium is $\$250$ per exposure, [[Fixed Expenses|fixed expenses]] are $\$40$ per exposure, [[Variable Expenses|variable expenses]] are $22\%$ of premium, and the target underwriting profit provision is $5\%$. The current average rate is $\$385$.
>
> What is the indicated rate change?
>
> > [!answer]-
> > Build the indicated average rate:
> >
> > $$\text{Indicated Rate} = \frac{\$250 + \$40}{1 - 0.22 - 0.05} = \frac{\$290}{0.73} = \$397.26$$
> >
> > Compare to the current average rate:
> >
> > $$\text{Indicated Change} = \frac{\$397.26}{\$385.00} - 1 = +3.2\%$$
> >
> > Note that fixed expenses are **added** in the numerator while variable expenses **gross up** the denominator. Loading both as percentages — or adding both as dollars — is the most common error on this calculation.
