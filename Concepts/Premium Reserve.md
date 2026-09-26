---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da2100014da4ea8fbbea884decd51b9274c81bd6234ffd085cbb10d9086501ef
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Reserve.md
---

**A premium reserve**, in unpaid-claim work, is a balance-sheet estimate of premium that will still be billed or returned on coverage already provided. The final premium depends on events after the valuation date: losses on loss-sensitive contracts, exposure audits, or reinsurance adjustment clauses. It is estimated like a loss reserve and must be consistent with it. It is distinct from the [[Unearned Premium|unearned premium reserve]], which provides for coverage not yet given.

> $$\text{Premium reserve} = \text{Expected ultimate premium} - \text{Premium booked to date}$$

- **Sign.** A positive reserve is an asset: additional premium receivable, called the premium asset, accrued retrospective premium, or earned but unbilled (EBUB) premium. A negative reserve is a liability for return premium.
- **Where it arises.**
  - **Retrospectively rated policies:** premium moves with the insured's losses within a minimum and maximum. See [[Retrospective Premium Reserve]].
  - **Audit-rated policies**, such as workers compensation on payroll or general liability on sales: the deposit premium is trued up to audited exposure after expiry. See [[Premium Audit]].
  - **Reinsurance:** [[Reinstatements|reinstatement premiums]] triggered by losses to a layer, swing-rated or loss-rated premiums, and loss-sensitive commissions such as [[Sliding Scale Commissions|sliding scales]] and [[Profit Commission|profit commissions]].
- **It must move with the loss reserve.** If IBNR rises on a loss-sensitive book, so does the premium that those losses will generate. Estimating each on its own basis misstates the net position. Teng and Perkins' PDLD method makes the link explicit by projecting premium development from loss development.
- **Collectability.** Premium billed after the fact carries credit risk. Only the collectable, or admitted, portion supports the balance sheet, and collateral held against it matters.

> [!example]- Reinstatement Premium Owed on a Catastrophe Layer {Example}
> A cedant buys a $\$10$M xs $\$10$M catastrophe layer for an annual premium of $\$2$M. It has one reinstatement at $100\%$, pro rata as to amount. After a hurricane, reported losses to the layer are $\$4$M and the actuary estimates layer IBNR of $\$2$M. Reinstatement premium has been billed on reported losses only.
>
> What premium reserve is needed?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ultimate reinstatement} &= \frac{6}{10} \times 2 \times 100\% \\
> > &= 1.2 \\
> > \text{Billed} &= \frac{4}{10} \times 2 \\
> > &= 0.8 \\
> > \text{Reserve} &= 1.2 - 0.8 \\
> > &= 0.4
> > \end{align*}
> > $$
> >
> > The cedant owes a further $\$0.4$M of premium as the IBNR emerges. It is a liability for the cedant, offsetting part of the $\$2$M ceded IBNR recovery, and an asset for the reinsurer. Booking the ceded IBNR without it would overstate the cedant's net recovery.

> [!example]- Earned but Unbilled Audit Premium {Example}
> A workers compensation book has $\$30$M of deposit premium on expired policies not yet audited. Over the last five years, final audited premium has averaged $4\%$ above deposit on this book. Payroll growth has been faster this year than in any of the five.
>
> Estimate the premium reserve.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{EBUB} &= 0.04 \times \$30\text{M} \\
> > &= \$1.2\text{M}
> > \end{align*}
> > $$
> >
> > That is the historical indication, and it is probably *low*. Audit premium reflects payroll growth that deposits did not anticipate, and this year's growth exceeds the base period's. The actuary should adjust the ratio for the current payroll environment and check the collection rate on past audit billings. Audit premium on terminated or insolvent insureds is often uncollectable, so a collectability haircut is also needed.
