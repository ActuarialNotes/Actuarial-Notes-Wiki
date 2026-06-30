**Minimum Premium** is the lowest premium an insurer will charge to issue a policy, regardless of how little exposure the risk presents. It ensures that even the smallest policy contributes enough to cover the fixed costs of underwriting, issuing, and servicing the contract plus a margin.

> $$\text{Premium} = \max\!\left(\text{Rate} \times \text{Exposure},\; \text{Minimum Premium}\right)$$

- Small policies generate the same per-policy fixed expenses (issuance, billing, policy maintenance) as larger ones, but their variable-rated premium may not cover those costs; the minimum premium floor prevents writing such risks at a loss.
- A minimum premium is one of the **non-pricing / implementation levers** in [[Considerations for Implementing Rates]], alongside rounding rules, premium-change capping, and the overall [[Rating Algorithm]].
- Setting it too high deters desirable small accounts and invites competitive selection against the insurer; too low fails to recover fixed costs — so it is calibrated to the per-policy fixed-expense load.
- Distinct from a **minimum retrospective premium** (the floor in a [[Retrospective_Rating|retrospective rating]] plan) and from a **deposit premium**, though the terms are sometimes used loosely together.

> [!example]- Applying a Minimum Premium {Example}
> A liability rate is \$$4.00$ per \$1{,}000 of receipts. A small contractor has \$$150{,}000$ of receipts. The policy's minimum premium is \$$750$.
>
> > [!answer]-
> > Rated premium $= 4.00 \times (150{,}000 / 1{,}000) = 4.00 \times 150 = \$600$
> >
> > Since \$$600 < \$750$, the minimum premium applies and the insured is charged $\$750$.
> >
> > The extra \$$150$ recovers fixed per-policy costs that the exposure-based rate alone would leave uncovered.
