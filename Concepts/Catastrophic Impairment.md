---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08cca3e1588c3351557bed84f89d6c2df5e19f65b8cbde19d463e34f9280d77e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophic Impairment.md
---

![[Media/Figures/Catastrophic_Impairment.svg|340]]

**Catastrophic Impairment** is the top tier of the automobile [[Statutory Accident Benefits|accident benefit]] structure, a regulatory definition that, once met, raises an injured person's medical, rehabilitation and attendant care limits by an order of magnitude. In Ontario the limit rises from the low six figures to $\$1$ million.

The definition is a list of conditions, not a judgement:

1. Paraplegia or tetraplegia.
2. Amputation or loss of use above a stated threshold.
3. Blindness.
4. A specified level of traumatic brain injury, measured by the Glasgow Coma Scale or an equivalent.
5. Impairment reaching a stated percentage of whole-person impairment under the AMA *Guides*, with combined physical and psychological impairment addressed by formula.

Catastrophic claims are a small fraction of claim counts and a large fraction of accident benefit cost. The gap between the tiers is so large that the designation decision is worth more than most claims. Changes to the definition, such as tightening the brain-injury criteria, altering how physical and psychological impairments combine or changing the paediatric test, move large amounts of reserve on files that already exist.

## Reserving a catastrophic claim

A catastrophic claim is in effect a lifetime care annuity: attendant care, housing modification, case management and equipment replacement over decades. Its value depends on the claimant's age and life expectancy, the care regime, care-cost inflation and the [[IFRS 17 Discount Rates|discount rate]], the same drivers as a structured settlement.

If care costing $C$ a year today inflates at $g$ a year and is paid at the end of each of $n$ years, its present value at discount rate $i$ is

> $$\text{PV} = C \times \frac{1 - (1+j)^{-n}}{j}$$

- $j = \dfrac{1+i}{1+g} - 1$ is the net discount rate.
- When $i = g$, $j = 0$ and the present value is $n \times C$.

> [!example]- What is this claim's liability at discount rates of $4\%$ and $3\%$? {Example}
> A catastrophically injured claimant aged $30$ is assessed as needing $\$120{,}000$ a year of attendant and medical care for an expected $45$ years. Care costs are assumed to inflate at $3\%$ a year.
>
> > [!answer]-
> > - At $i = 4\%$, the net rate is $j = 1.04/1.03 - 1 = 0.009709$.
> > - The annuity factor is $\big(1 - 1.009709^{-45}\big)/0.009709 = 36.32$, so the liability is $\$120{,}000 \times 36.32 = \$4{,}358{,}000$.
> > - At $i = 3\%$, the net rate is zero, so the liability is $45 \times \$120{,}000 = \$5{,}400{,}000$.
> > - A $100$ basis point fall in the discount rate raises the liability by $\$1.04$ million, about $24\%$, on a single claim.

Because the liability is a long annuity, a small change in the discount rate or in assumed care-cost inflation moves the reserve far more than the same change would move a short-tailed line. A book of catastrophic claims therefore makes [[Duration|duration]] matching of the supporting assets especially important. The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] must reflect care-cost inflation and mortality uncertainty, both of which are non-financial.

## Delayed designation

Catastrophic designation often comes years after the accident, because the impairment must stabilise before it can be assessed. An accident year's catastrophic count therefore develops upward long after ordinary claims have closed, which makes it a principal driver of adverse development in accident benefits.

> [!trap] Reserving at annual cost times years
> Valuing the claim above at $\$120{,}000 \times 45 = \$5.4$ million ignores both inflation and discounting. It is right only when the two rates happen to be equal, and wrong at any other discount rate.
