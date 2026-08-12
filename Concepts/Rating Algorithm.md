**Rating Algorithm** is the ordered set of rules that turns a base rate and a risk's characteristics into a premium. It is where the actuary's rate level and classification work actually meets a quote, and it is filed as part of the rate manual.

> $$\text{Premium} = \left[\text{Base Rate} \times \prod_i R_i + \sum_j A_j\right] \times (1 - D) + \text{Fees}$$

- **Order of operations is part of the algorithm**, not an implementation detail. A multiplicative discount applied before or after an additive fee gives different premiums, so the sequence, the rounding and the capping rules are all specified precisely enough that two systems produce identical answers.
- **Multiplicative** structures (relativities that compound) are the norm for class, territory and vehicle factors, and they fall naturally out of a log-link [[Generalized Linear Model|GLM]]. **Additive** structures are used for flat loadings and fees. The structure should follow how the costs actually combine — a fixed per-policy cost is additive, a risk characteristic that scales the whole loss cost is multiplicative.
- The algorithm also encodes the implementation rules: the [[Minimum Premium|minimum premium]] floor, expense fees, renewal rate capping, and limits on how discounts stack.
- Because factors interact, a change to any single relativity must be evaluated **through the whole algorithm** on the actual book — the realized effect differs from the factor change wherever the minimum premium binds, a cap applies, or the factor multiplies against a skewed distribution of other factors.
- The algorithm is also the constraint on what the pricing analysis can deliver: a rating variable the policy administration system cannot capture, or an interaction the algorithm cannot express, is not usable however well it models.

![[Media/Figures/Rating_Algorithm.svg|340]]

> [!example]- Walking the Algorithm {Example}
> Base rate $\$500$; territory relativity $1.20$; class relativity $0.90$; policy fee $\$25$ (additive); paid-in-full discount $10\%$; minimum premium $\$400$.
>
> Compute the premium, and show that a different order changes it.
>
> > [!answer]-
> > Following the filed sequence — relativities, then fee, then discount, then the minimum:
> >
> > $$\begin{align*}
> > \$500 \times 1.20 \times 0.90 &= \$540.00 \\
> > \$540.00 + \$25 &= \$565.00 \\
> > \$565.00 \times 0.90 &= \$508.50 \\
> > \max(\$508.50,\; \$400) &= \$508.50
> > \end{align*}$$
> >
> > Applying the discount **before** the fee instead:
> >
> > $$\$540.00 \times 0.90 + \$25 = \$511.00$$
> >
> > A $\$2.50$ difference on one policy, and a systematic one across a book — which is exactly why the order is filed rather than left to the system.

> [!example]- A Relativity Change Does Not Deliver Its Face Value {Example}
> An insurer raises the relativity for one class from $0.85$ to $0.95$ — a $+11.8\%$ factor change. That class contains $4{,}000$ policies. Of them, $600$ currently sit at the $\$400$ minimum premium (their rated premium averages $\$355$), and renewal rate capping limits any individual increase to $+10\%$.
>
> What overall premium change does the class actually deliver in the first year?
>
> > [!answer]-
> > Take the three groups separately.
> >
> > **Policies above the minimum and under the cap** ($3{,}400$ policies): the full $+11.8\%$ would breach the $+10\%$ cap, so each is limited to $+10\%$.
> >
> > **Policies at the minimum** ($600$): their rated premium rises from $\$355$ to
> >
> > $$\$355 \times \frac{0.95}{0.85} = \$396.76$$
> >
> > still below the $\$400$ floor, so they pay $\$400$ — **no change at all**.
> >
> > Weighting by premium, with the $3{,}400$ capped policies averaging (say) $\$620$:
> >
> > $$\begin{align*}
> > \text{Current} &= 3{,}400(\$620) + 600(\$400) = \$2{,}348{,}000 \\
> > \text{New} &= 3{,}400(\$682) + 600(\$400) = \$2{,}558{,}800 \\[4pt]
> > \text{Change} &= \frac{2{,}558{,}800}{2{,}348{,}000} - 1 = +9.0\%
> > \end{align*}$$
> >
> > The $+11.8\%$ factor change delivers $+9.0\%$ — and the gap does not close by itself: the capped policies need a second year to reach the intended level, and the minimum-premium policies never get there at all until the minimum itself is raised.
> >
> > This is why an off-balance computed from factor changes alone ([[Considerations for Implementing Rates]]) overstates what will be collected, and why the achieved rate change must be measured through the algorithm on the real book.
