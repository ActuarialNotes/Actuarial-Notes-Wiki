---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2375e02aed6bc96e02de15c22b72bf730304ff7de91d5a74737266cf81c6f116
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Capital and Surplus.md
---

**Capital and Surplus** — *surplus as regards policyholders* — is a statutory insurer's net worth: admitted assets less liabilities, the cushion between policyholders and loss if reserves prove inadequate or assets fall in value. The **Capital and Surplus Account** at the foot of the statutory [[Income Statement]] reconciles it from one year end to the next.

> $$\begin{aligned} \text{PHS}_{\text{end}} = {} & \text{PHS}_{\text{begin}} + \text{Net income} \\ & + \text{Direct charges and credits to surplus} \\ & + \text{Capital paid in} - \text{Stockholder dividends} \end{aligned}$$

- **Composition** (on the [[Balance Sheet]]): capital stock, gross paid-in and contributed surplus, surplus notes, special surplus funds and unassigned funds, less treasury stock. A mutual has no capital stock; its surplus is built from retained earnings and, often, surplus notes.
- **Direct charges and credits** bypass net income: the change in net unrealised capital gains (less capital gains tax), the change in net deferred income tax, the change in nonadmitted assets, the change in the provision for reinsurance, the change in surplus notes, and the cumulative effect of changes in accounting principles. An **increase** in nonadmitted assets or in the provision for reinsurance **reduces** surplus.
- **Why it protects policyholders.** Statutory conservatism — nonadmitted assets, expensed acquisition costs, undiscounted reserves, the [[Schedule F]] provision — is designed so that surplus is money a regulator could count on in a wind-up. Surplus notes qualify because interest and principal cannot be paid without the regulator's approval, which subordinates them to policyholders.
- **How it is monitored.** [[Risk-Based Capital]] compares total adjusted capital (essentially surplus) with authorized control level RBC: a ratio below $200\%$ is the Company Action Level, $150\%$ the Regulatory Action Level, $100\%$ the Authorized Control Level and $70\%$ the Mandatory Control Level. Premium- and reserves-to-surplus ([[Insurance Leverage]]) and the year's change in surplus ([[IRIS Ratios]]) give earlier warning.
- **Capital leaving the company.** Stockholder dividends above a statutory threshold are "extraordinary" and need the regulator's prior approval — so statutory surplus, not GAAP equity, governs how much capital a parent can extract.
- **Other regimes.** The [[GAAP]] and [[IFRS]] counterpart is the statement of changes in shareholders' equity, which starts from larger equity and routes deferred tax through income.

> [!example]- Rolling Surplus Forward {Example}
> Surplus at 12/31 prior year was $\$500$M. During the year: net income $\$40$M; change in net unrealised capital gains, less tax, $-\$15$M; change in net deferred income tax $+\$3$M; nonadmitted assets **increased** by $\$6$M; the provision for reinsurance **increased** by $\$2$M; capital paid in $\$10$M; dividends to stockholders $\$20$M.
>
> Compute year-end surplus.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PHS}_{\text{end}} &= 500 + 40 - 15 + 3 - 6 - 2 + 10 - 20 \\
> > &= 510
> > \end{align*}
> > $$
> >
> > Surplus rises $\$10$M, although net income was $\$40$M: the $\$20$M of direct charges and the $\$20$M dividend absorbed all of it, and the whole increase is the $\$10$M capital contribution. A reader who looks only at net income misses half of what moved the cushion.

> [!example]- How Much Adverse Development Can Surplus Absorb? {Example}
> The insurer above has total adjusted capital of about $\$510$M, authorized control level RBC of $\$120$M, and net loss and LAE reserves of $\$1{,}500$M. Ignoring tax and any change in the RBC requirement itself, how much adverse reserve development would take it to the Company Action Level?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{RBC ratio} &= \frac{510}{120} \\
> > &= 425\% \\
> > \text{CAL threshold} &= 2.00 \times 120 \\
> > &= 240 \\
> > \text{Cushion} &= 510 - 240 \\
> > &= 270
> > \end{align*}
> > $$
> >
> > About $\$270$M of development — $270 / 1{,}500 = 18\%$ of carried reserves — before the company must file an RBC plan. That is the sense in which surplus *is* policyholder protection, and why reserve adequacy and surplus adequacy are one question seen from two sides. Tax relief would stretch the cushion; a higher RBC charge on the larger reserves would shrink it.
