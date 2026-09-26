---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:04ead418044f4fccbc250553cfd0eaa01f7580e28c2f8791ef9baf7ed69680a7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Florida Hurricane Catastrophe Fund.md
---

**The Florida Hurricane Catastrophe Fund** (FHCF) is a tax-exempt state trust fund, administered by the State Board of Administration of Florida, that **reimburses residential property insurers for a share of their Florida hurricane losses**. Participation is mandatory: every insurer authorised to write residential property in Florida (above a de minimis exposure) must buy its reimbursement contract, which works like a layer of catastrophe [[Reinsurance|reinsurance]] with no profit or risk load.

> $$\text{Reimbursement}_i = \min\big\{1.10\,c\,(L_i - R_i)^+,\ \text{Limit}_i\big\}$$

- **Symbols.** $L_i$ is insurer $i$'s covered residential loss from one hurricane, $R_i$ its retention, $c$ its coverage percentage — **$45\%$, $75\%$ or $90\%$**, chosen each year — and the factor $1.10$ is the $10\%$ allowance for loss adjustment expense. $(x)^+ = \max(x, 0)$.
- **Retention and limit** are the insurer's shares of industry figures. The retention is the insurer's FHCF premium times a *retention multiple*, set so that retentions sum to the industry retention ($\$9.9$ billion for 2024–25); the limit is the premium times a *payout multiple*, set so that limits sum to the statutory maximum of **$\$17$ billion** for a season. The full retention applies to an insurer's two largest hurricanes in a season, and one-third of it to any others.
- **Origin.** Created in November 1993 after Hurricane Andrew (1992) caused over $\$15$ billion of insured losses and at least $11$ insurer insolvencies, to provide a "stable and ongoing" source of reimbursement and so maintain insurance capacity in Florida.
- **Funding.** The FHCF charges an actuarially indicated premium — adequate but not excessive, reflecting each insurer's exposure — plus a $25\%$ cash build-up factor. When its cash is insufficient it issues **post-event revenue bonds**, repaid by **emergency assessments** on most Florida property and casualty premiums (workers' compensation, medical malpractice, accident and health and federal flood are exempt), capped at $6\%$ of premium for losses from one year and $10\%$ for losses from several years. Its obligation is not a full-faith-and-credit obligation of the state: capacity is cash plus what it can borrow.
- **Why it is cheaper than private reinsurance:** no profit or risk load, exemption from federal tax, and the ability to fund losses after the event rather than hold capital in advance. The last is also its main weakness — see the second example.
- **Evaluation.** It has kept reinsurance costs down and stabilised a volatile market, but its real capacity depends on bond-market access after a major storm, and its post-event funding shifts part of the cost of coastal residential risk onto all Florida property and casualty policyholders. Compare [[Catastrophe Risk]], [[CAT Bonds]] and [[Government Program Evaluation]].

> [!example]- An Insurer's FHCF Recovery {Example}
> For the 2024–25 contract year the retention multiple at $90\%$ coverage was $6.3136$ and the payout multiple $11.8595$. An insurer paid an FHCF premium of $\$20$ million and chose $90\%$ coverage. A hurricane causes it $\$300$ million of covered residential losses. Find its reimbursement.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R &= 6.3136 \times \$20\text{M} \\
> > &= \$126.27\text{M} \\[4pt]
> > \text{Limit} &= 11.8595 \times \$20\text{M} \\
> > &= \$237.19\text{M}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Loss reimbursed} &= 0.90 \times (\$300\text{M} - \$126.27\text{M}) \\
> > &= \$156.36\text{M} \\[4pt]
> > \text{With LAE allowance} &= 1.10 \times \$156.36\text{M} \\
> > &= \$171.99\text{M}
> > \end{align*}
> > $$
> >
> > Within the $\$237.19$ million limit, so the insurer recovers about $\$172$ million. It keeps the $\$126$ million retention and the $10\%$ co-participation above it; that retained layer, and any loss above the FHCF limit, is what it must cover with private reinsurance and capital.

> [!example]- Who Pays for Post-Event Bonds? {Example}
> After a severe season the FHCF issues post-event bonds with annual debt service of $\$700$ million. The assessable premium base is $\$92.8$ billion. What emergency assessment is needed, and who pays it?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Assessment rate} &= \frac{\$0.70\text{B}}{\$92.8\text{B}} \\
> > &= 0.75\%
> > \end{align*}
> > $$
> >
> > Well within the $6\%$ cap, and levied for as many years as the bonds are outstanding.
> >
> > **The evaluation point is the base, not the rate.** The assessment falls on most Florida property and casualty policies — private auto, commercial lines, surplus lines — not only on residential property. An inland renter's auto policy helps repay the reinsurance of coastal homes. That cross-subsidy is what lets the FHCF price below the private market, and it is a policy choice to be stated rather than a free lunch. The other constraint is capacity: bonds can be issued only in the amounts the market will absorb after a catastrophe, which is why the FHCF estimates its claims-paying capacity twice a year.
