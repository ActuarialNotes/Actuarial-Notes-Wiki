---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac470267a649d0361ebc1c15e8561a2cbddba2037333cff2791c35555fcfc865
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.5-6 (PDF pp.17-18); Ch. 3 p.42 (PDF p.54); Ch. 6 pp.120-121 (PDF pp.132-133); Ch. 8 pp.141-148 (PDF pp.153-160); Ch. 13 p.257 (PDF p.269), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (1988), Parts I-II, pp.1-2, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 p.39 (PDF p.45), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking.md
---

**Ratemaking** is the process of determining the appropriate price (the **rate**) to charge for insurance coverage. It is a **prospective** process that uses historical data and actuarial projections to ensure the premium collected is sufficient to cover future losses, expenses, and a margin for profit, while remaining competitive and regulatory-compliant. Contrast with [[Loss Reserving|loss reserving]], which estimates the unpaid cost of claims that have already occurred.

- The **fundamental insurance equation** states that, over the future policy period:

> $$\text{Premium} = \text{Losses} + \text{LAE} + \text{UW Expenses} + \text{UW Profit}$$

- The [[Overall Rate Level Indication|overall indication]] restates that equation in one of two ways. The [[Pure Premium Method]] gives an indicated average **rate** per exposure, compared with the current average rate to get a change; the [[Loss Ratio Method]] gives the indicated **change** directly:

> $$\text{Indicated Average Rate} = \frac{\bar{L} + \bar{E}_F}{1 - V - Q_T}, \qquad \text{Indicated Change} = \frac{\text{Indicated Average Rate}}{\text{Current Average Rate}} - 1$$
>
> $$\text{Indicated Change} = \frac{\text{LR} + F}{1 - V - Q_T} - 1$$
>
> $$\bar{L} = \text{pure premium incl. LAE},\ \bar{E}_F = \text{fixed expense per exposure},\ \text{LR} = \text{proj. loss \& LAE ratio},\ F = \text{fixed expense ratio}$$
>
> $$V = \text{variable expense \%},\ Q_T = \text{target UW profit \%}$$

- Two equivalent constructions produce this indication: the [[Pure Premium Method]] (works from exposures and losses, needs no premium) and the [[Loss Ratio Method]] (works from [[On Level Premium|on-level premium]] and a [[Permissible Loss Ratio]]). They agree when given consistent inputs.
- Historical data must be adjusted on three axes before it can be used: [[Loss Development|developed]] to ultimate, [[Loss Trend|trended]] to the future period, and [[On-Leveling|brought to current rate level]]. Skipping any one biases the indication; applying both development and trend is not a double count (Werner & Modlin's *overlap fallacy*).
- Ratemaking data is organized by [[Ratemaking Data Organization|calendar, accident, policy, or report period]], each meeting Werner & Modlin's three objectives — match losses and premium, use the most recent data, minimize the cost of collection — to a different degree.
- The overall indication is then allocated to individual risks through [[Classification Ratemaking|classification]], [[Territory Ratemaking|territory]], [[Increased Limits|limit]], and [[Deductible Rating|deductible]] relativities, and finalized through the [[Rating Algorithm|rating algorithm]].
- The [[Principles of Ratemaking|four CAS principles]] frame the whole exercise: a rate estimates expected future costs, provides for all costs of the risk transfer, provides for the costs of an *individual* risk transfer, and is actuarially sound — and therefore not excessive, inadequate, or unfairly discriminatory — when it does all three.
- The calculated indication need not be the filed change: [[Ratemaking Constraints|regulatory, operational, and marketing constraints]] and [[Lifetime Value|customer lifetime value]] shape the selected [[Rate Change|rate change]].

![[Media/Figures/Ratemaking.svg|340]]

> [!example]- Calculating a Pure Premium {Example}
> 
> An actuary expects a fleet of $1{,}000$ delivery vans to incur \$$250{,}000$ in total losses over the next year. If the administrative expenses are estimated at \$$50$ per van, what is the **Pure Premium**?
> 
> > [!answer]-
> > 
> > - **Projected Losses ($L$):** \$$250{,}000$
> > - **Exposure Units ($N$):** $1{,}000$ vans
> > 
> > The **Pure Premium** ($PP$) represents the portion of the rate required to pay for losses and loss adjustment expenses:
> > 
> > $$PP = \frac{L}{N} = \frac{250{,}000}{1{,}000} = \$250$$
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
