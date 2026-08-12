**Considerations for Implementing Rates** are the decisions that turn an [[Overall Rate Level Indication|indication]] into rates in force — how much to file, how to distribute it, what mechanism to use, and what to do when the full indication cannot be taken.

> $$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall change}}{1 + \text{off-balance from relativity changes}}$$

**Non-pricing levers.** Werner's central point is that rate adequacy is not only achieved through rate. Where a full increase is unavailable, the same gap can be closed by:

- tightening **underwriting** eligibility or reducing capacity in the worst segments;
- changing **coverage** — raising deductibles, lowering sub-limits, adding exclusions or restricting a peril;
- shifting **marketing** and agency compensation away from the unprofitable segments;
- improving **claims** handling and loss control.

**Pricing mechanics.**

- The overall change is implemented through the [[Rating Algorithm|rating algorithm]], normally as a base rate adjustment, and must be **off-balanced** against any simultaneous change in relativities so the two together deliver the intended effect.
- A [[Minimum Premium|minimum premium]] and expense fees interact with the base rate; a percentage change to the base does not flow through evenly to policies sitting at the minimum.
- **Rate capping** limits how much any individual renewal's premium can move, smoothing disruption at the cost of delaying adequacy and creating a book with two rate levels in force at once — which must be tracked for future [[On-Leveling|on-levelling]].

**Practical constraints.** Filing and approval timing, systems and IT release schedules, agent notification and training, and policyholder communication all determine when a change can actually take effect — often months after the analysis is finished, which is itself a reason the trend period reaches so far forward.

> [!example]- Phasing a Large Increase {Example}
> The indication is $+20\%$. The insurer judges that a single $+20\%$ would trigger regulatory scrutiny and heavy non-renewal, and decides to phase it over two annual filings.
>
> What second-year change reaches the same level, and what does the delay cost?
>
> > [!answer]-
> > Taking $+10\%$ now, the residual required is
> >
> > $$\frac{1.20}{1.10} - 1 = +9.1\%$$
> >
> > so $+10\%$ followed by $+9.1\%$ reaches the same cumulative level.
> >
> > The cost of phasing is a full year written at an inadequate rate. If the book earns $\$40{,}000{,}000$ and the shortfall is $9.1\%$ of premium, the deficiency is roughly
> >
> > $$\$40{,}000{,}000 \times \frac{0.091}{1.20} \approx \$3{,}000{,}000$$
> >
> > That is a real, quantified cost of the decision, and the reason phasing should be paired with non-pricing action — tightening eligibility in the worst segments recovers part of the gap without a filing, and does so immediately.

> [!example]- Off-Balancing a Class Revision {Example}
> An insurer's overall indication is $+6.0\%$. It is also revising class relativities; applied to the current distribution of exposures, the new relativities alone would produce $+3.5\%$ of premium. The current base rate is $\$480$.
>
> Compute the new base rate.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Off-balance factor} &= \frac{1.060}{1.035} \\
> > &= 1.0242 \\[4pt]
> > \text{New base rate} &= \$480 \times 1.0242 \\
> > &= \$491.62
> > \end{align*}$$
> >
> > Check: $1.0242 \times 1.035 = 1.060 \;\checkmark$.
> >
> > Applying $+6.0\%$ to the base rate *and* the new relativities would deliver $1.06 \times 1.035 = +9.7\%$ — three and a half points more than the analysis called for, and distributed unevenly across classes.
> >
> > One further check belongs here: the off-balance is computed on the **current** exposure distribution. If the relativity change is large enough to shift the mix — insureds in newly-expensive classes shop — the realized average premium will fall short of $+6.0\%$, and the next indication will pick up the shortfall a year late.
