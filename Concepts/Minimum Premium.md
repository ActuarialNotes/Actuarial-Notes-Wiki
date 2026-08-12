**Minimum Premium** is the floor below which an insurer will not write a policy, whatever the rated exposure. It exists because [[Fixed Expenses|fixed expenses]] — issuance, billing, servicing, filing — do not shrink with the size of the risk.

> $$\text{Premium} = \max\!\left(\text{Rate} \times \text{Exposure},\; \text{Minimum Premium}\right)$$

- The floor is calibrated to the **per-policy fixed expense load** plus a margin: below the crossover exposure, an exposure-based rate alone does not recover the cost of putting the policy on the books.
- It is one of the implementation levers in [[Considerations for Implementing Rates]], alongside expense fees, rounding rules and rate capping, and it must be encoded in the [[Rating Algorithm|rating algorithm]] because *where* in the sequence it applies changes the answer.
- Set too high, it prices the insurer out of desirable small accounts and invites competitors to take the segment; too low, it writes small policies at a loss. Either error is invisible in the aggregate indication, which is why minimum premiums are reviewed separately.
- A percentage rate change does **not** flow through evenly to policies sitting at the minimum: raising the base rate $8\%$ changes nothing for a risk already at the floor, so the achieved rate change on a book with many minimum-premium policies is less than the filed one.
- Distinguish from the **minimum retrospective premium** (the floor in a [[Retrospective Rating|retro]] plan, which prices a risk-transfer band rather than expenses) and from a **deposit premium** (an advance against an auditable exposure — see [[Premium Audit]]).

![[Media/Figures/Minimum_Premium.svg|340]]

> [!example]- Applying the Minimum Premium {Example}
> A liability rate is $\$4.00$ per $\$1{,}000$ of receipts, with a minimum premium of $\$750$. A small contractor has $\$150{,}000$ of receipts.
>
> Compute the premium, and find the receipts level at which the minimum stops binding.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Rated premium} &= \$4.00 \times \frac{\$150{,}000}{1{,}000} \\
> > &= \$600
> > \end{align*}$$
> >
> > Since $\$600 < \$750$, the minimum applies and the charge is $\$750$.
> >
> > The crossover is where the rated premium reaches the floor:
> >
> > $$\frac{\$750}{\$4.00} \times \$1{,}000 = \$187{,}500 \text{ of receipts}$$
> >
> > Every insured below $\$187{,}500$ of receipts pays the same $\$750$, so within that band the effective rate per $\$1{,}000$ falls as the risk grows — from $\$7.50$ at $\$100{,}000$ of receipts down to $\$4.00$ at the crossover.

> [!example]- Setting the Floor from the Expense Structure {Example}
> An insurer's fixed expenses are $\$95$ per policy, variable expenses $23\%$, target profit $5\%$. The smallest risks it writes have an expected loss cost of about $\$110$.
>
> What minimum premium is indicated, and what happens if the insurer files $\$200$ instead?
>
> > [!answer]-
> > The rate that covers the smallest risk's own costs is
> >
> > $$\frac{\$110 + \$95}{1 - 0.23 - 0.05} = \frac{\$205}{0.72} = \$284.72$$
> >
> > so a minimum around $\$285$ is indicated.
> >
> > At a $\$200$ minimum, each such policy contributes
> >
> > $$\$200 \times (1 - 0.23) = \$154$$
> >
> > after variable expenses, against $\$110$ of loss and $\$95$ of fixed expense — a loss of $\$51$ per policy, with no profit provision at all.
> >
> > The insurer would be **buying** small policies. Worse, a $\$200$ floor against competitors' $\$285$ guarantees it wins that segment: it will write every small risk in the market at a loss, and the volume will look like growth in every management report until the loss ratio arrives.
