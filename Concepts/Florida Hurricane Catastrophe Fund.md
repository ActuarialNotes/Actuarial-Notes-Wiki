---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:78661ed7a50a794303841f8ffa986743019cd71807fea43829ad27c30a13f2a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Florida Hurricane Catastrophe Fund.md
---

The **Florida Hurricane Catastrophe Fund** (FHCF) is a tax-exempt state trust fund, administered by the State Board of Administration of Florida, that reimburses residential property insurers for a share of their Florida hurricane losses. Every insurer authorised to write residential property in Florida, above a de minimis exposure, must buy its reimbursement contract, which works like a layer of catastrophe [[Reinsurance|reinsurance]] with no profit or risk load.

For one hurricane, insurer $i$'s reimbursement is

> $$\text{Reimbursement}_i = \min\big\{1.10\,c\,(L_i - R_i)^+,\ \text{Limit}_i\big\}$$

- $L_i$ is the insurer's covered residential loss from the hurricane.
- $R_i$ is the insurer's retention.
- $c$ is the insurer's coverage percentage, $45\%$, $75\%$ or $90\%$, chosen each year.
- $1.10$ adds the $10\%$ allowance for loss adjustment expense.
- $(x)^+ = \max(x, 0)$.
- $\text{Limit}_i$ is the insurer's limit for the season.

The retention and the limit are the insurer's shares of industry figures. The retention is the insurer's FHCF premium times a *retention multiple*, set so that retentions sum to the industry retention ($\$9.9$ billion for 2024–25). The limit is the premium times a *payout multiple*, set so that limits sum to the statutory maximum of $\$17$ billion for a season. The full retention applies to an insurer's two largest hurricanes in a season, and one-third of it to any others.

> [!example]- How much does this insurer recover from the FHCF? {Example}
> For the 2024–25 contract year the retention multiple at $90\%$ coverage was $6.3136$ and the payout multiple $11.8595$. An insurer paid an FHCF premium of $\$20$ million and chose $90\%$ coverage. A hurricane causes it $\$300$ million of covered residential losses.
>
> > [!answer]-
> > - The retention is $6.3136 \times \$20\text{M} = \$126.27\text{M}$.
> > - The limit is $11.8595 \times \$20\text{M} = \$237.19\text{M}$.
> > - The loss reimbursed is $0.90 \times (\$300\text{M} - \$126.27\text{M}) = \$156.36\text{M}$.
> > - With the LAE allowance it is $1.10 \times \$156.36\text{M} = \$171.99\text{M}$.
> > - This is within the $\$237.19$ million limit, so the insurer recovers about $\$172$ million.
> > - The insurer keeps the $\$126$ million retention and the $10\%$ co-participation above it. That retained layer, and any loss above the FHCF limit, is what it must cover with private reinsurance and capital.

## Origin

The FHCF was created in November 1993 after Hurricane Andrew (1992) caused over $\$15$ billion of insured losses and at least $11$ insurer insolvencies. Its purpose is to provide a "stable and ongoing" source of reimbursement and so maintain insurance capacity in Florida.

## Funding

The FHCF charges an actuarially indicated premium, adequate but not excessive and reflecting each insurer's exposure, plus a $25\%$ cash build-up factor. When its cash is insufficient it issues **post-event revenue bonds**, repaid by **emergency assessments** on most Florida property and casualty premiums. Workers' compensation, medical malpractice, accident and health and federal flood premiums are exempt. An assessment is capped at $6\%$ of premium for losses from one year and $10\%$ for losses from several years.

Its obligation is not a full-faith-and-credit obligation of the state. Its capacity is its cash plus what it can borrow, and bonds can be issued only in the amounts the market will absorb after a catastrophe. The FHCF estimates its claims-paying capacity twice a year.

> [!example]- What emergency assessment do these bonds need, and who pays it? {Example}
> After a severe season the FHCF issues post-event bonds with annual debt service of $\$700$ million. The assessable premium base is $\$92.8$ billion.
>
> > [!answer]-
> > - The assessment rate is $\$0.70\text{B} / \$92.8\text{B} = 0.75\%$.
> > - This is well within the $6\%$ cap, and it is levied for as many years as the bonds are outstanding.
> > - The assessment falls on most Florida property and casualty policies, including private auto, commercial lines and surplus lines, not only on residential property.
> > - An inland renter's auto policy therefore helps repay the reinsurance of coastal homes. That cross-subsidy is what lets the FHCF price below the private market.

## Evaluation

The FHCF is cheaper than private reinsurance because it has no profit or risk load, is exempt from federal tax and can fund losses after the event rather than hold capital in advance. It has kept reinsurance costs down and stabilised a volatile market. Its post-event funding is also its main weakness. Its real capacity depends on access to the bond market after a major storm, and the assessments shift part of the cost of coastal residential risk onto all Florida property and casualty policyholders. [[Catastrophe Risk]], [[CAT Bonds]] and [[Government Program Evaluation]] set it among the other ways of financing catastrophe losses.

> [!trap] Treating the FHCF's capacity as a state guarantee
> The $\$17$ billion limit is not backed by the full faith and credit of Florida. What the FHCF can pay is its cash plus the bonds it can sell after the storm, so an evaluation of the fund has to ask whether the bond market will absorb them.
