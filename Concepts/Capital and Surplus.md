---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e82328506a4dfb71c01e29b810a0e2a7e03bd6c6815fe6b41a5175290f94eec2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital and Surplus.md
---
**Capital and Surplus**, or *surplus as regards policyholders*, is a statutory insurer's net worth: admitted assets less liabilities on the [[Balance Sheet]]. It is the cushion between policyholders and loss if reserves prove inadequate or assets fall in value.

The **Capital and Surplus Account** at the foot of the statutory [[Income Statement]] reconciles surplus from one year end to the next. Year-end surplus is

> $$\text{PHS}_{\text{end}} = \text{PHS}_{\text{begin}} + \text{NI} + \text{DC} + \text{CP} - \text{Div}$$

- $\text{PHS}_{\text{begin}}$ is surplus at the prior year end.
- $\text{NI}$ is statutory net income.
- $\text{DC}$ is the year's direct charges and credits to surplus.
- $\text{CP}$ is capital paid in.
- $\text{Div}$ is dividends to stockholders.

> [!example]- What is this insurer's year-end surplus? {Example}
> Surplus at 12/31 prior year was $\$500$M. During the year, in \$ millions:
>
> | Item | Amount |
> | :--- | ---: |
> | Net income | 40 |
> | Change in net unrealised capital gains, less tax | −15 |
> | Change in net deferred income tax | +3 |
> | Increase in nonadmitted assets | 6 |
> | Increase in the provision for reinsurance | 2 |
> | Capital paid in | 10 |
> | Dividends to stockholders | 20 |
>
> > [!answer]-
> > - The direct charges and credits are $-15 + 3 - 6 - 2 = -20$, since increases in nonadmitted assets and in the provision for reinsurance reduce surplus.
> > - Year-end surplus is $500 + 40 - 20 + 10 - 20 = \$510$M.
> > - Surplus rises only $\$10$M although net income was $\$40$M, because the direct charges and the dividend absorbed all of the income.

## Composition of surplus

Surplus comprises capital stock, gross paid-in and contributed surplus, surplus notes, special surplus funds and unassigned funds, less treasury stock. A mutual has no capital stock. Its surplus is built from retained earnings and, often, surplus notes.

Surplus notes qualify because interest and principal cannot be paid without the regulator's approval, which subordinates them to policyholders.

## Direct charges and credits to surplus

**Direct charges and credits** bypass net income: the change in net unrealised capital gains (less capital gains tax), the change in net deferred income tax, the change in nonadmitted assets, the change in the provision for reinsurance, the change in surplus notes, and the cumulative effect of changes in accounting principles. An **increase** in nonadmitted assets or in the provision for reinsurance **reduces** surplus.

Statutory conservatism (nonadmitted assets, expensed acquisition costs, undiscounted reserves, the [[Schedule F]] provision) is designed so that surplus is money a regulator could count on in a wind-up.

## Monitoring surplus

[[Risk-Based Capital]] compares total adjusted capital (essentially surplus) with authorized control level RBC. A ratio below $200\%$ is the Company Action Level, $150\%$ the Regulatory Action Level, $100\%$ the Authorized Control Level and $70\%$ the Mandatory Control Level. Premium- and reserves-to-surplus ([[Insurance Leverage]]) and the year's change in surplus ([[IRIS Ratios]]) give earlier warning.

> [!example]- How much adverse reserve development would take this insurer to the Company Action Level? {Example}
> Total adjusted capital is $\$510$M, authorized control level RBC is $\$120$M, and net loss and LAE reserves are $\$1{,}500$M. Ignore tax and any change in the RBC requirement itself.
>
> > [!answer]-
> > - The RBC ratio is $510/120 = 425\%$.
> > - The Company Action Level threshold is $2.00 \times 120 = \$240$M.
> > - The cushion is $510 - 240 = \$270$M, which is $270/1{,}500 = 18\%$ of carried reserves.
> > - About $\$270$M of adverse development would force the company to file an RBC plan.

## Dividends and other regimes

Stockholder dividends above a statutory threshold are "extraordinary" and need the regulator's prior approval. So statutory surplus, not GAAP equity, governs how much capital a parent can extract.

The [[GAAP]] and [[IFRS]] counterpart of the account is the statement of changes in shareholders' equity, which starts from larger equity and routes deferred tax through income.

> [!trap] Reading the change in surplus from net income alone
> Net income is only one line of the account. Direct charges and credits, capital paid in and dividends also move surplus, and in the example above they take a $\$40$M profit down to a $\$10$M rise.
