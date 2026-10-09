---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:d0ed567d96ab1068444bcd2196e9971887296b8687178f2c2452e251caed07fa
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.14 pp.263-264, 276-285 (PDF pp.275-276, 288-297); Ch.13 pp.241-243, 256 (PDF pp.253-255, 268); Ch.6 p.113 (PDF p.125), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Considerations for Implementing Rates.md
---

**Considerations for Implementing Rates** are the decisions that turn an [[Overall Rate Level Indication|indication]] into rates in force — how much to file, how to distribute it, what mechanism to use, and what to do when the full indication cannot be taken.

> $$\text{Base Rate}_{\text{new}} = \text{Base Rate}_{\text{current}} \times \frac{1 + \text{overall change}}{1 + \text{change in average rate differential}}$$

**Non-pricing levers.** Werner's central point is that rate adequacy is not only achieved through rate. Where a full increase is unavailable, the same gap can be closed by:

- reducing **expenses** — fixed or variable;
- tightening **underwriting** criteria or non-renewing policies whose premium is grossly inadequate;
- changing **coverage** — raising deductibles, lowering sub-limits, adding exclusions or restricting a peril;
- shifting **marketing** away from the unprofitable segments;
- better **loss control** — for example, medical management and return-to-work programmes in workers compensation.

**Pricing mechanics.**

- The overall change is implemented through the [[Rating Algorithm|rating algorithm]], normally as a base rate adjustment, and must be **off-balanced** against any simultaneous change in relativities so the two together deliver the intended effect.
- A [[Minimum Premium|minimum premium]] and expense fees interact with the base rate; a percentage change to the base does not flow through evenly to policies sitting at the minimum.
- **Capping** limits how much premium can move: a cap on the change for any level of a rating variable is made up by adjusting the base rate and the other relativities, and a **premium transition rule** caps any one renewal's change (at $15\%$, an insured due $+20\%$ gets $+15\%$ now and $1.20/1.15 - 1 = 4.3\%$ at the next renewal). The base rate must reflect the transition — the actuary decides whether the target average premium is reached over the whole period or by its end — and long transitions risk overlapping the next rate change.

**Practical constraints.** Regulatory filing and approval, systems changes when the structure of the rating algorithm changes, and communication of the expected effect to management, regulators and the sales and customer-service functions all stand between the analysis and the proposed effective date — and the [[Loss Trend|trend period]] runs forward to the policies written from that date.

![[Media/Figures/Considerations_for_Implementing_Rates.svg|340]]

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
> > The cost of phasing is a full year written at an inadequate rate. If the book earns $\$40{,}000{,}000$ at the $+10\%$ level, the indicated level needs $9.1\%$ more, so the deficiency is roughly
> >
> > $$\$40{,}000{,}000 \times 0.0909 \approx \$3{,}640{,}000$$
> >
> > That is a real, quantified cost of the decision, and the reason phasing should be paired with non-pricing action — tightening underwriting in the worst segments recovers part of the gap without a filing.

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
> > One further check belongs here: the off-balance is computed on the **current** in-force distribution, which assumes the rate change will not alter the portfolio. If the relativity change is large enough to shift the mix — insureds receiving large increases non-renew — the realized average premium change may differ from $+6.0\%$, and if the risks that leave are not equally profitable, the shift affects the adequacy of the overall rates.
