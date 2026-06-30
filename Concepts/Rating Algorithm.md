**Rating Algorithm** is the step-by-step set of rules and the order of operations that combines a base rate with rating variables, factors, discounts, and fees to produce the final premium for an individual policy. It is how the actuary's rate-level and classification analyses are actually applied to a quote.

> $$\text{Premium} = \Big[\text{Base Rate} \times \prod_i R_i \;(\text{multiplicative})$$
>
> $$+ \textstyle\sum_j A_j \;(\text{additive})\Big] \times (1 - \text{Discounts}) + \text{Fees}$$

- The **order of operations matters**: a $10\%$ multiplicative discount applied before vs. after an additive fee yields different premiums. The algorithm specifies sequencing, capping, and rounding precisely so results are reproducible.
- Factors may be **multiplicative** (relativities that compound, common for territory and class), **additive** (flat loadings), or a mix; the structure should reflect how the underlying costs actually interact.
- The algorithm also encodes implementation rules from [[Considerations for Implementing Rates]]: the [[Minimum Premium]] floor, maximum/minimum premium-change caps (rate capping for renewals), expense fees, and surcharge/discount stacking limits.
- A change to any single relativity must be evaluated **through the full algorithm**, since interactions with other factors and the minimum premium determine the realized rate impact and the resulting [[Mix of Business]].

> [!example]- Walking the Algorithm {Example}
> Base rate \$$500$. Territory relativity $1.20$ (mult.), class relativity $0.90$ (mult.), \$$25$ policy fee (additive), $10\%$ paid-in-full discount (mult.), minimum premium \$$400$.
>
> > [!answer]-
> > Apply multiplicative relativities to the base: $500 \times 1.20 \times 0.90 = \$540$
> >
> > Add the fee: $540 + 25 = \$565$
> >
> > Apply the discount: $565 \times (1 - 0.10) = \$508.50$
> >
> > Compare to minimum: $508.50 > 400$, so the final premium is $\$508.50$. Reordering (e.g., applying the discount before the fee) would change the result — hence the algorithm fixes the sequence.
