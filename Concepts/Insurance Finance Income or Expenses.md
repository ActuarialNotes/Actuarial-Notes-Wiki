---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9faf69c8f460dc6b355ab0478d293383973a74f72d7b56c256814c55070049c2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Finance Income or Expenses.md
---

**Insurance Finance Income or Expenses** (IFIE) are the [[IFRS 17]] effects of the **time value of money and financial risk** on insurance contract liabilities: the unwinding of the discount as time passes, and the effect of changes in [[IFRS 17 Discount Rates|discount rates]] and other financial assumptions. They are presented **separately** from [[Insurance Service Expenses]], so that the [[Insurance Service Result]] measures underwriting alone.

> $$\text{IFIE} = \underbrace{\text{Unwind of discount}}_{\text{time passing}} + \underbrace{\text{Effect of rate changes}}_{\text{remeasurement}}$$

- **The unwind** is mechanical and predictable: a discounted liability grows toward its undiscounted amount as the payment date approaches. It is an expense, but it is not a deterioration in claims — a distinction the old presentation could not make.
- **The effect of rate changes** is the volatile part: a fall in rates raises the present value of the liabilities and produces a finance expense; a rise produces finance income. On a long-duration liability this can dominate the income statement.
- **The [[Other Comprehensive Income Option|OCI option]]** allows the effect of rate changes to be presented in OCI instead of profit or loss, with a systematic amount (based on the rate locked in at initial recognition) remaining in profit. Elected by portfolio, and once elected it is applied consistently.
- **Accounting mismatch is the reason the option exists.** If assets are held at fair value through OCI while liability rate effects go through profit or loss, a parallel movement in rates produces offsetting effects in *different* statements — reported profit swings for no economic reason. Electing OCI for the liabilities aligns them.
- **Where reinsurance sits:** the corresponding finance effects on [[Reinsurance Contracts Held]] are presented in IFIE too, so a matched reinsurance programme partially offsets the gross movement.
- IFIE is one half of the **net financial result**, the other being investment income on the assets backing the liabilities — and reading the two together is how one judges whether an insurer's asset-liability position is well matched.

> [!example]- A Rate Fall Through Two Presentations {Example}
> An insurer's LIC is $\$600$ million with a duration of $4$ years. During the year, discount rates fall $80$ basis points. The unwind of discount at the opening rate is $\$21$ million. Assets backing the liabilities are $\$650$ million of bonds with a duration of $3.5$ years, held at fair value through OCI.
>
> Compare profit and OCI with and without the OCI option on the liabilities.
>
> > [!answer]-
> > **The liability increases** by approximately duration times the rate change:
> >
> > $$\begin{align*}
> > \Delta L &\approx 4 \times 0.0080 \times \$600\text{M} \\
> > &= \$19.2\text{M}
> > \end{align*}$$
> >
> > **The assets increase** similarly:
> >
> > $$\begin{align*}
> > \Delta A &\approx 3.5 \times 0.0080 \times \$650\text{M} \\
> > &= \$18.2\text{M}
> > \end{align*}$$
> >
> > and that gain goes to **OCI**, since the bonds are FVOCI.
> >
> > **Without the OCI option on liabilities:**
> >
> > - Profit or loss: finance expense of $\$21$M (unwind) $+ \$19.2$M (rate change) $= \$40.2$M.
> > - OCI: asset gain of $+\$18.2$M.
> >
> > The insurer reports $\$19.2$ million of extra expense in profit while the offsetting $\$18.2$ million sits in OCI. Economically the position barely moved; the income statement says otherwise.
> >
> > **With the OCI option on liabilities:**
> >
> > - Profit or loss: finance expense of $\$21$M — the unwind only.
> > - OCI: asset gain $+\$18.2$M, liability loss $-\$19.2$M, net $-\$1.0$M.
> >
> > Profit now reflects the predictable unwind, and OCI carries the $\$1.0$ million residual — which is the **actual** economic effect of the duration mismatch ($4$ years against $3.5$).
> >
> > **The lesson.** The OCI option does not change economics; it puts the rate-driven noise where it belongs and leaves the duration mismatch visible as a small net figure. An insurer that has matched well will see a small OCI residual; one that has not will see a large one — which is far more informative than a $\$19$ million swing in profit.
