---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c8139ddd2a55f290c90cec30496dfcee59c742e0a697f1442f2b97f54e738909
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule F.md
---

**Schedule F** is the reinsurance schedule of the [[NAIC Annual Statement]]: it lists every reinsurer a U.S. P&C insurer cedes to or assumes from, with premiums, recoverables, collateral and the ageing of amounts due, and it computes the **provision for reinsurance** — a statutory liability that charges surplus for reinsurance that is unsecured, overdue or in dispute.

> $$\text{Slow-pay ratio} = \frac{O_{90}}{P + C_{90}}$$
>
> $$\Delta\,\text{Surplus} = -\,\Delta\,\text{Provision for reinsurance}$$

- $O_{90}$ is recoverables on paid losses and LAE more than 90 days past due, $P$ total recoverables on paid losses and LAE, and $C_{90}$ amounts received from that reinsurer in the prior 90 days, all excluding amounts in dispute. The provision is a page 3 liability whose change is charged **directly to surplus**, not through net income.
- **The parts:** Part 1 assumed reinsurance; Part 2 premium portfolio reinsurance effected or cancelled; **Part 3 ceded reinsurance** — the core, reinsurer by reinsurer: ceded premium, recoverables on paid and unpaid losses and LAE, IBNR, unearned premium and contingent commission, funds held, letters of credit, trusts and other collateral, ageing (1–29, 30–90, 91–120 and over 120 days), disputed amounts, RBC credit-risk factors and the provision; Part 4 banks issuing letters of credit; Part 5 interrogatories; Part 6 a restatement of the balance sheet gross of reinsurance. The restatement matters because statutory loss and unearned premium reserves are reported **net** of ceded reinsurance.
- **Reinsurer categories**, as determined by the ceding insurer's domiciliary state:
  - *Authorized* — licensed or accredited; full credit without collateral.
  - *Unauthorized* — credit only to the extent secured by funds held, letters of credit or trusts.
  - *Certified* — reduced collateral, from $0\%$ to $100\%$, according to a rating the state assigns.
  - *Reciprocal jurisdiction* — qualifying reinsurers under the NAIC's 2019 credit-for-reinsurance revisions, which implemented the U.S.–EU and U.S.–UK covered agreements; no collateral required.
- **The provision.** For unauthorized reinsurers: the unsecured balance in full, plus $20\%$ of paid recoverables over 90 days past due and $20\%$ of amounts in dispute. For certified reinsurers: the shortfall against the required collateral, plus an overdue component. For authorized and reciprocal-jurisdiction reinsurers: $20\%$ of paid recoverables over 90 days past due — but if the reinsurer is **slow-paying** (slow-pay ratio of $20\%$ or more), the greater of that amount or $20\%$ of its *entire* net recoverable after funds held and collateral.
- **Evaluating health** (the syllabus task): recoverables relative to surplus; concentration in a few reinsurers; the share due from unauthorized, unrated, affiliated or captive reinsurers; collateral adequacy; trends in overdue and disputed balances; ceded premium relative to direct (dependence on reinsurance and ceding commissions); and large IBNR recoverables, collectable only years from now. See [[Reinsurance Credit Risk]], [[Reinsurance Recovery]] and [[Risk-Based Capital|RBC]]. Under [[GAAP]] the same risk is instead measured as an expected-credit-loss allowance against a gross recoverable asset.

> [!example]- Provision for Two Authorized Reinsurers {Example}
> Balances in $\$$M, none in dispute:
>
> - **Reinsurer X:** paid recoverables $10.0$, of which $1.2$ over 90 days past due; received in the prior 90 days $6.0$.
> - **Reinsurer Y:** paid recoverables $4.0$, of which $1.5$ over 90 days past due; received in the prior 90 days $2.0$; total recoverables on all balances, net of funds held and collateral, $18.0$.
>
> Compute each slow-pay ratio and the provision.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ratio}_X &= \frac{1.2}{10.0 + 6.0} \\
> > &= 7.5\% \\[4pt]
> > \text{Provision}_X &= 0.20 \times 1.2 \\
> > &= \$0.24\text{M}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Ratio}_Y &= \frac{1.5}{4.0 + 2.0} \\
> > &= 25\% \\[4pt]
> > \text{Provision}_Y &= \max(0.20 \times 18.0,\ 0.20 \times 1.5) \\
> > &= \$3.60\text{M}
> > \end{align*}
> > $$
> >
> > Total provision $\$3.84$M, charged directly to surplus. Y's overdue balance is only $\$1.5$M, but crossing the $20\%$ slow-pay line extends the charge to everything Y owes — including IBNR recoverables not yet billed. The penalty is designed to bite before a reinsurer fails, not after.

> [!example]- An Unauthorized Reinsurer {Example}
> An unauthorized reinsurer owes $\$25.0$M: $\$3.0$M on paid losses (of which $\$0.5$M over 90 days past due, none disputed), $\$18.0$M on unpaid losses and LAE, and $\$4.0$M of ceded unearned premium. The cedant holds a $\$15.0$M letter of credit and $\$4.0$M of funds withheld. Compute the provision.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Unsecured} &= 25.0 - 15.0 - 4.0 \\
> > &= \$6.0\text{M} \\[4pt]
> > \text{Overdue charge} &= 0.20 \times 0.5 \\
> > &= \$0.1\text{M} \\[4pt]
> > \text{Provision} &= 6.0 + 0.1 \\
> > &= \$6.1\text{M}
> > \end{align*}
> > $$
> >
> > Unauthorized reinsurance earns statutory credit only where it is collateralised, so the unsecured $\$6.0$M is charged in full regardless of the reinsurer's actual strength. A cedant can remove the charge by obtaining more collateral — which is why letters of credit and trusts are negotiated into treaties with non-U.S. reinsurers.
