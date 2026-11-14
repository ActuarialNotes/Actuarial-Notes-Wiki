---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d9c6201f6bd13d52f317be39153798002d4d980523e642a76394d66d06006e32
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Structured Settlement.md
---
![[Media/Figures/Structured_Settlement.svg|340]]

A **Structured Settlement** resolves a bodily injury claim by purchasing an annuity that pays the claimant periodically over time, rather than by paying a single lump sum. The insurer buys the annuity from a life insurer, and in Canada the payments are tax-free in the claimant's hands when the structure is properly constituted.

The annuity's purchase price is the insurer's cost, and it is less than the equivalent lump sum. The tax exemption means a smaller pre-tax stream delivers the same after-tax value to the claimant, so both sides can be better off. The saving is the tax the claimant would otherwise pay on investment income.

Claimants accept a structure for protection against dissipating a large lump sum, for freedom from investment and longevity risk, and for income matched to a lifetime of care needs. That last reason is decisive for a [[Catastrophic Impairment|catastrophically injured]] claimant who will need care for decades. Structures are most common on large, long-duration claims: catastrophic auto injuries, medical malpractice and serious workers' compensation cases.

> [!example]- Should this claimant take the lump sum or the structure? {Example}
> A claimant is entitled to $\$1{,}000{,}000$ as a lump sum. Alternatively the insurer can buy an annuity paying $\$52{,}000$ a year for the claimant's expected $30$ remaining years, at a cost of $\$900{,}000$. The claimant's marginal tax rate on investment income is $40\%$, and they could earn $5\%$ before tax on invested funds.
>
> > [!answer]-
> > - The lump sum is itself tax-free, because damages are not income, but the investment income it earns is taxable.
> > - The after-tax return is $5\% \times (1 - 0.40) = 3\%$.
> > - The annuity factor over $30$ years at $3\%$ is $(1 - 1.03^{-30})/0.03 = 19.600$.
> > - The lump sum supports a withdrawal of $1{,}000{,}000/19.600 = \$51{,}019$ a year, with investment and longevity risk left with the claimant.
> > - The structure pays $\$52{,}000$ a year, tax-free and guaranteed.
> > - The claimant receives more with no risk, and the insurer pays $\$100{,}000$ less. The tax the claimant no longer pays is the source of the gain.
> > - A lump sum can still be better for a claimant who needs capital now, such as for a housing modification, or who wants to leave an estate.

## Requirements for the tax treatment

The Canada Revenue Agency's conditions for the tax treatment are:

1. The insurer owns the annuity and remains liable for the payments.
2. The annuity is non-commutable, non-assignable and non-transferable.
3. The annuity is purchased to satisfy a claim for personal injury.

A structure that fails these conditions is taxable, which destroys its economics.

## The insurer's residual exposure

The casualty insurer remains ultimately liable if the life insurer defaults, so the claim does not fully leave its balance sheet unless a qualifying assignment transfers it. The credit exposure to the annuity provider is a [[Credit Risk Margin|credit risk]] item.

## Valuation

The cost of a structure is life-contingent. It depends on the claimant's age, impaired life expectancy, the indexation of the payments and the annuity rate available, the same drivers as pricing a life annuity, applied inside a P&C claim.
