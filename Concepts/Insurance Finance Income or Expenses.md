---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6b4615d2a010081932335e4d0158eff4e338bdf4cc6d1958870dd3b108b97ae8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Finance Income or Expenses.md
---

![[Media/Figures/Insurance_Finance_Income_or_Expenses.svg|340]]

**Insurance Finance Income or Expenses** (IFIE) are the [[IFRS 17]] effects of the time value of money and financial risk on insurance contract liabilities. They are presented separately from [[Insurance Service Expenses|insurance service expenses]], so that the [[Insurance Service Result|insurance service result]] measures underwriting alone.

IFIE is

> $$\text{IFIE} = \text{Unwind of discount} + \text{Effect of rate changes}$$

- $\text{Unwind of discount}$ is the growth of a discounted liability toward its undiscounted amount as the payment date approaches.
- $\text{Effect of rate changes}$ is the effect of changes in [[IFRS 17 Discount Rates|discount rates]] and other financial assumptions.

The unwind is mechanical and predictable. It is an expense, but it is not a deterioration in claims, a distinction the old presentation could not make.

The effect of rate changes is the volatile part. A fall in rates raises the present value of the liabilities and produces a finance expense, and a rise produces finance income. On a long-duration liability this can dominate the income statement.

The corresponding finance effects on [[Reinsurance Contracts Held|reinsurance contracts held]] are presented in IFIE too, so a matched reinsurance programme partially offsets the gross movement. IFIE is one half of the net financial result. The other half is the investment income on the assets backing the liabilities, and reading the two together shows whether an insurer's asset-liability position is well matched.

## The OCI option

The [[Other Comprehensive Income Option|OCI option]] allows the effect of rate changes to be presented in other comprehensive income (OCI) instead of profit or loss. A systematic amount, based on the rate locked in at initial recognition, remains in profit. The option is elected by portfolio and, once elected, is applied consistently.

The option exists because of accounting mismatch. If the assets are held at fair value through OCI while the liability rate effects go through profit or loss, a parallel movement in rates produces offsetting effects in different statements, and reported profit swings for no economic reason. Electing the OCI option for the liabilities aligns them.

> [!example]- What are profit or loss and OCI for this insurer, with and without the OCI option on its liabilities? {Example}
> An insurer's LIC is $\$600$ million with a duration of $4$ years. During the year, discount rates fall $80$ basis points. The unwind of discount at the opening rate is $\$21$ million. The assets backing the liabilities are $\$650$ million of bonds with a duration of $3.5$ years, held at fair value through OCI.
>
> > [!answer]-
> > - The liability increases by about the duration times the rate change times the liability, $4 \times 0.0080 \times \$600\text{M} = \$19.2\text{M}$.
> > - The assets increase by about $3.5 \times 0.0080 \times \$650\text{M} = \$18.2\text{M}$, and that gain goes to OCI because the bonds are held at fair value through OCI.
> > - Without the option, profit or loss carries a finance expense of $\$21\text{M} + \$19.2\text{M} = \$40.2\text{M}$, and OCI carries the asset gain of $\$18.2\text{M}$.
> > - The position has barely moved economically, but profit shows $\$19.2\text{M}$ of extra expense while the offsetting gain sits in OCI.
> > - With the option, profit or loss carries only the unwind, a finance expense of $\$21\text{M}$.
> > - OCI then carries the asset gain of $\$18.2\text{M}$ and the liability loss of $\$19.2\text{M}$, a net of $-\$1.0\text{M}$.
> > - That $\$1.0\text{M}$ is the economic effect of the duration mismatch, $4$ years against $3.5$.

> [!trap] Getting the sign of a rate change wrong
> A fall in discount rates raises the present value of the liabilities, so it produces a finance expense. A rise produces finance income. In the example above, the $80$ basis point fall is a $\$19.2$ million expense.
