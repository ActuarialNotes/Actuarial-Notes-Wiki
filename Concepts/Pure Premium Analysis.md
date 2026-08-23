---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:55093b06158b10568b04d640fc21c2712e24576ddf804fa98c56aff12687d90e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Premium Analysis.md
---

**Pure Premium Analysis** is the examination of loss and LAE per exposure — decomposed into [[Frequency|frequency]] and [[Severity|severity]] — to test rate adequacy, select trends, set classification relativities and diagnose reserve results.

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}} = \text{Frequency} \times \text{Severity}$$

> $$\text{Relativity}_i = \frac{\text{Pure Premium}_i}{\text{Pure Premium}_{\text{base}}}$$

- Pure premium is the **premium-free** view of cost: because it never divides by premium, it needs no [[On-Leveling|on-levelling]] and is unaffected by rate history. That makes it the natural measure for a new book, a re-tiered book, or any analysis where premium data is unreliable.
- Comparing the projected pure premium with the **rate-implied** pure premium (current rate $\times$ [[Permissible Loss Ratio|PLR]]) tests adequacy directly; a ratio above $1.0$ means the rate is inadequate.
- For **classification** work, pure premiums by class or [[Territory Ratemaking|territory]] give relativities directly. They must be [[Credibility|credibility-weighted]] against the overall average, and — because a univariate pure premium picks up the effect of every correlated variable — checked against a multivariate ([[Generalized Linear Model|GLM]]) result before use.
- The frequency/severity split is what makes the analysis **actionable**: a frequency problem calls for underwriting, classification and risk-control responses; a severity problem calls for rate, limits, deductibles and claims handling.
- In **reserving**, projected pure premium is a reasonableness test: multiply the reserving actuary's ultimate losses by nothing at all — just divide by exposures — and compare the resulting cost per exposure across accident years. A series that jumps in a way trend and rate changes cannot explain points at the estimate, not the world.

![[Media/Figures/Pure_Premium_Analysis.svg|340]]

> [!example]- Territory Relativities from Pure Premiums {Example}
> Three territories:
>
> | Territory | Losses | Exposures |
> |---|---|---|
> | Urban | $\$1{,}500{,}000$ | $5{,}000$ |
> | Suburban | $\$1{,}760{,}000$ | $8{,}000$ |
> | Rural | $\$450{,}000$ | $3{,}000$ |
>
> Compute pure premiums and relativities to rural.
>
> > [!answer]-
> > | Territory | Pure premium | Relativity |
> > |---|---|---|
> > | Urban | $\$1{,}500{,}000/5{,}000 = \$300$ | $2.00$ |
> > | Suburban | $\$1{,}760{,}000/8{,}000 = \$220$ | $1.47$ |
> > | Rural | $\$450{,}000/3{,}000 = \$150$ | $1.00$ |
> >
> > Before these become rating factors, two checks are mandatory:
> >
> > 1. **Credibility.** Rural has $3{,}000$ exposures. If that falls short of the full-credibility standard, its indicated relativity must be weighted toward the statewide average or a [[Complement of Credibility|complement]].
> > 2. **Correlation.** If urban policyholders also skew toward younger drivers or higher limits, part of the $2.00$ belongs to those variables rather than to geography. A univariate analysis assigns the whole effect to territory and would double-count when the other variables are rated too — the problem multivariate methods exist to solve.

> [!example]- Testing Rate Adequacy by Class {Example}
> A commercial property book, with projected pure premiums and current rates per $\$1{,}000$ of insured value. The permissible loss ratio is $62\%$.
>
> | Class | Projected PP | Current rate |
> |---|---|---|
> | A | $\$1.86$ | $\$3.20$ |
> | B | $\$2.79$ | $\$4.00$ |
> | C | $\$1.24$ | $\$1.80$ |
>
> Which classes are mispriced, and by how much?
>
> > [!answer]-
> > The rate-implied pure premium is $\text{rate} \times \text{PLR}$:
> >
> > | Class | Implied PP | Projected PP | Indicated change |
> > |---|---|---|---|
> > | A | $3.20 \times 0.62 = \$1.984$ | $\$1.86$ | $1.86/1.984 - 1 = -6.2\%$ |
> > | B | $4.00 \times 0.62 = \$2.480$ | $\$2.79$ | $2.79/2.480 - 1 = +12.5\%$ |
> > | C | $1.80 \times 0.62 = \$1.116$ | $\$1.24$ | $1.24/1.116 - 1 = +11.1\%$ |
> >
> > Class A is over-priced by $6\%$; B and C are under-priced by around $12\%$ and $11\%$.
> >
> > The overall indication is the exposure-weighted combination of these, and the class changes must then be **off-balanced** against it so that correcting the relativities does not accidentally deliver an overall increase the analysis did not call for — see [[Rate Change]] and [[Classification Ratemaking]].
