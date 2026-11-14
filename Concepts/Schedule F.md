---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7fdf9617b88e6f615044939e40515ecfa49cc3e2ee2a3e2f9a95f22abf4aa9be
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule F.md
---

**Schedule F** is the reinsurance schedule of the [[NAIC Annual Statement]]. It lists every reinsurer a U.S. P&C insurer cedes to or assumes from, with premiums, recoverables, collateral and the ageing of amounts due, and it computes the **provision for reinsurance**, a statutory liability that charges surplus for reinsurance that is unsecured, overdue or in dispute.

Schedule F has six parts:

1. Part 1: assumed reinsurance.
2. Part 2: premium portfolio reinsurance effected or cancelled.
3. **Part 3: ceded reinsurance**, reinsurer by reinsurer, which is the core of the schedule.
4. Part 4: banks issuing letters of credit.
5. Part 5: interrogatories.
6. Part 6: a restatement of the balance sheet gross of reinsurance.

Part 3 shows ceded premium, recoverables on paid and unpaid losses and LAE, IBNR, unearned premium and contingent commission, funds held, letters of credit, trusts and other collateral, ageing (1–29, 30–90, 91–120 and over 120 days), disputed amounts, RBC credit-risk factors and the provision. Part 6 matters because statutory loss and unearned premium reserves are reported **net** of ceded reinsurance.

## Reinsurer categories

The ceding insurer's domiciliary state places each reinsurer in one of four categories, which set the [[Credit for Reinsurance|credit for reinsurance]] the cedant takes:

- **Authorized**: licensed or accredited, with full credit without collateral.
- **Unauthorized**: credit only to the extent secured by funds held, letters of credit or trusts.
- **Certified**: reduced collateral, from $0\%$ to $100\%$, according to a rating the state assigns.
- **Reciprocal jurisdiction**: qualifying reinsurers under the NAIC's 2019 credit-for-reinsurance revisions, which implemented the U.S.–EU and U.S.–UK covered agreements, with no collateral required.

## The provision for reinsurance

The provision is a page 3 liability whose change is charged **directly to surplus**, not through net income, so the change in surplus is

> $$\Delta\,\text{Surplus} = -\,\Delta\,\text{Provision for reinsurance}$$

The provision depends on the reinsurer's category. For an unauthorized reinsurer it is the unsecured balance in full, plus $20\%$ of paid recoverables over 90 days past due and $20\%$ of amounts in dispute. For a certified reinsurer it is the shortfall against the required collateral, plus an overdue component.

> [!example]- What is the provision for reinsurance for this unauthorized reinsurer? {Example}
> An unauthorized reinsurer owes $\$25.0$M: $\$3.0$M on paid losses (of which $\$0.5$M is over 90 days past due, none disputed), $\$18.0$M on unpaid losses and LAE, and $\$4.0$M of ceded unearned premium. The cedant holds a $\$15.0$M letter of credit and $\$4.0$M of funds withheld.
>
> > [!answer]-
> > - The unsecured balance is $25.0 - 15.0 - 4.0 = \$6.0$M, charged in full.
> > - The overdue charge is $0.20 \times 0.5 = \$0.1$M.
> > - The provision is $6.0 + 0.1 = \$6.1$M.
> > - Unauthorized reinsurance earns statutory credit only where it is collateralized, so the cedant can remove the charge only by obtaining more collateral. That is why letters of credit and trusts are negotiated into treaties with non-U.S. reinsurers.

## Slow-paying reinsurers

For an authorized or reciprocal-jurisdiction reinsurer the provision is $20\%$ of paid recoverables over 90 days past due, unless the reinsurer is slow-paying. Excluding amounts in dispute, the slow-pay ratio is

> $$\text{Slow-pay ratio} = \frac{O_{90}}{P + C_{90}}$$

- $O_{90}$ is recoverables on paid losses and LAE more than 90 days past due.
- $P$ is total recoverables on paid losses and LAE.
- $C_{90}$ is amounts received from that reinsurer in the prior 90 days.

A reinsurer with a slow-pay ratio of $20\%$ or more is slow-paying. Its provision is the greater of $20\%$ of paid recoverables over 90 days past due and $20\%$ of its *entire* net recoverable after funds held and collateral.

> [!example]- What is the provision for reinsurance for these two authorized reinsurers? {Example}
> Balances in $\$$M, none in dispute:
>
> | | Reinsurer X | Reinsurer Y |
> | :--- | ---: | ---: |
> | Paid recoverables | 10.0 | 4.0 |
> | Of which over 90 days past due | 1.2 | 1.5 |
> | Received in the prior 90 days | 6.0 | 2.0 |
> | Total recoverables, net of funds held and collateral | | 18.0 |
>
> > [!answer]-
> > - X's slow-pay ratio is $1.2/(10.0 + 6.0) = 7.5\%$, below $20\%$.
> > - X's provision is $0.20 \times 1.2 = \$0.24$M.
> > - Y's slow-pay ratio is $1.5/(4.0 + 2.0) = 25\%$, so Y is slow-paying.
> > - Y's provision is the greater of $0.20 \times 18.0 = \$3.60$M and $0.20 \times 1.5 = \$0.30$M, which is $\$3.60$M.
> > - The total provision is $0.24 + 3.60 = \$3.84$M, charged directly to surplus.

## Evaluating reinsurance health

Schedule F shows how dependent an insurer is on its reinsurers and how sound they are. The measures are recoverables relative to surplus, concentration in a few reinsurers, and the share due from unauthorized, unrated, affiliated or captive reinsurers. The schedule also shows collateral adequacy, trends in overdue and disputed balances, ceded premium relative to direct (dependence on reinsurance and ceding commissions), and large IBNR recoverables, collectable only years from now. [[Reinsurance Credit Risk]], [[Reinsurance Recovery]] and [[Risk-Based Capital|RBC]] build on these. Under [[GAAP]] the same risk is measured as an expected-credit-loss allowance against a gross recoverable asset.

> [!trap] Charging a slow payer only on its overdue balance
> Once a reinsurer's slow-pay ratio reaches $20\%$, the charge extends to everything it owes, including IBNR recoverables not yet billed. Reinsurer Y above has only $\$1.5$M overdue, yet its provision is $\$3.60$M.
