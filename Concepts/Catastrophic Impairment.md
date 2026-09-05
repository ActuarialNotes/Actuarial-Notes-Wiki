---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:591560941ed4cb85943c8e33dfec375fe643d4b2af26e493612973ee2859cc6d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophic Impairment.md
---

**Catastrophic Impairment** is the top tier of the automobile [[Statutory Accident Benefits|accident benefit]] structure: a regulatory definition which, once met, raises an injured person's medical, rehabilitation and attendant care limits by an order of magnitude — in Ontario, from the low six figures to $\$1$ million. It is a small fraction of claim counts and a large fraction of accident-benefit cost.

- **The definition is a list**, not a judgement: paraplegia or tetraplegia, amputation or loss of use above a stated threshold, blindness, a specified level of traumatic brain injury (measured by Glasgow Coma Scale or equivalent), and impairment reaching a stated percentage of whole-person impairment under the AMA *Guides*, with combined physical and psychological impairment addressed by formula.
- **Why the definition is fought over.** The financial gap between tiers is enormous, so the designation decision is worth more than most claims are. Definitional changes — tightening the brain-injury criteria, altering how physical and psychological impairments combine, changing the paediatric test — move large amounts of reserve on files that already exist.
- **Reserving.** A catastrophic claim is effectively a lifetime care annuity: attendant care, housing modification, case management, and equipment replacement over decades. Its value depends on the claimant's age and life expectancy, the care regime, care-cost inflation, and the [[IFRS 17 Discount Rates|discount rate]] — the same drivers as a structured settlement.
- **Reporting lag.** Catastrophic designation often occurs years after the accident (the impairment must stabilise before it can be assessed), so an accident year's catastrophic count develops upward long after ordinary claims have closed. This is a principal driver of adverse development in accident benefits.
- **Sensitivity.** Because the liability is a long annuity, a small change in the discount rate or in assumed care-cost inflation moves the reserve substantially — far more than an equivalent change would move a short-tailed line.

> [!example]- Discount Rate Sensitivity on a Catastrophic Claim {Example}
> A catastrophically injured claimant, aged $30$, is assessed as requiring $\$120{,}000$ per year of attendant and medical care for an expected $45$ years. Care costs are assumed to inflate at $3\%$ per year.
>
> Value the liability at discount rates of $4\%$ and $3\%$, and comment.
>
> > [!answer]-
> > With payments growing at $g = 3\%$ and discounting at $i$, the net rate is $j = \frac{1+i}{1+g} - 1$.
> >
> > **At $i = 4\%$:**
> >
> > $$\begin{align*}
> > j &= \frac{1.04}{1.03} - 1 = 0.009709 \\[4pt]
> > \text{PV} &= \$120{,}000 \times \frac{1 - (1.009709)^{-45}}{0.009709} \\
> > &= \$120{,}000 \times 36.20 \\
> > &= \$4{,}344{,}000
> > \end{align*}$$
> >
> > **At $i = 3\%$:** the net rate is zero, so the annuity is simply $45$ payments of $\$120{,}000$:
> >
> > $$\text{PV} = 45 \times \$120{,}000 = \$5{,}400{,}000$$
> >
> > A $100$ basis point fall in the discount rate raises the liability by $\$1.06$ million — about $24\%$ — on a single claim.
> >
> > Three things follow. First, a book of catastrophic claims has **equity-like interest rate sensitivity**, which is why [[Duration]] matching of supporting assets matters here more than anywhere else in P&C. Second, the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] must reflect care-cost inflation and mortality uncertainty, both of which are non-financial. Third, an actuary who reserves such a claim at "expected annual cost times years" without discounting or inflation has produced a number ($\$5.4$ million by coincidence here) that is right for the wrong reason and will be wrong at any other rate.
