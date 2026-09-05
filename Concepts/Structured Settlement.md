---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:60bd089d23679731562938c1bd993ecbe132058fa4728d28cecbd7a3004cf11f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Settlement.md
---

**A Structured Settlement** resolves a bodily injury claim by purchasing an annuity that pays the claimant periodically over time, rather than by paying a single lump sum. The insurer buys an annuity from a life insurer; the claimant receives a stream of payments that, in Canada, is **tax-free** in the claimant's hands when the structure is properly constituted.

> $$\text{Cost to insurer} = \text{Annuity purchase price} < \text{Equivalent lump sum}$$

- **Why it costs the insurer less.** The tax exemption means a smaller pre-tax stream delivers the same after-tax value to the claimant, so both sides can be better off than under an equivalent lump sum. The saving is the tax the claimant would otherwise pay on investment income.
- **Why claimants accept:** protection against dissipating a large lump sum, no investment or longevity risk, and income matched to a lifetime of care needs — decisive for a [[Catastrophic Impairment|catastrophically injured]] claimant who will need care for decades.
- **Requirements for the tax treatment** (CRA's conditions): the insurer must own the annuity and remain liable for the payments, the annuity must be non-commutable, non-assignable and non-transferable, and it must be purchased to satisfy a claim for personal injury. A structure that fails these is taxable, which destroys its economics.
- **The insurer's residual exposure.** Because the casualty insurer remains ultimately liable if the life insurer defaults, the claim does not fully leave the balance sheet unless a qualifying assignment transfers it. The credit exposure to the annuity provider is real and is a [[Credit Risk Margin|credit risk]] item.
- **Actuarial valuation** is life-contingent: the cost depends on the claimant's age, impaired life expectancy, indexation of the payments, and the annuity rate available — the same drivers as pricing a life annuity, applied inside a P&C claim.
- Structures are most common on **large, long-duration** claims: catastrophic auto injuries, medical malpractice, and serious workers' compensation cases.

> [!example]- Lump Sum Versus Structure {Example}
> A claimant is entitled to $\$1{,}000{,}000$ as a lump sum. Alternatively the insurer can purchase an annuity paying $\$52{,}000$ per year for the claimant's expected $30$ remaining years, at a cost of $\$900{,}000$. The claimant's marginal tax rate on investment income is $40\%$ and they could earn $5\%$ before tax on invested funds.
>
> Compare the outcomes.
>
> > [!answer]-
> > **Lump sum route.** The $\$1$ million is itself tax-free (damages are not income), but the *investment income* it earns is taxable. At $5\%$ pre-tax and a $40\%$ rate, the after-tax return is $3\%$. The sustainable annual withdrawal over $30$ years:
> >
> > $$\begin{align*}
> > \text{Payment} &= \frac{\$1{,}000{,}000}{\dfrac{1 - 1.03^{-30}}{0.03}} \\
> > &= \frac{\$1{,}000{,}000}{19.600} \\
> > &= \$51{,}020 \text{ per year}
> > \end{align*}$$
> >
> > **Structure route.** $\$52{,}000$ per year, entirely tax-free, guaranteed, with no investment or longevity risk.
> >
> > The claimant receives **more** ($\$52{,}000$ against $\$51{,}020$) with **no risk**, and the insurer pays **less** ($\$900{,}000$ against $\$1{,}000{,}000$). Both sides gain $\$100{,}000$ of value between them, and the source of that gain is the tax the claimant no longer pays.
> >
> > The considerations that can still favour a lump sum: the claimant needs capital now (housing modification, a business), wants to leave an estate (a non-guaranteed life annuity pays nothing after death), or expects to live far longer than the assumed $30$ years — in which case a *life-contingent* structure is worth more than either figure above.
