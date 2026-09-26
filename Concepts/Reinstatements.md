---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b0271fe6633b8c2030536cc369d84b3c72be5d47ce068c10ee0ae3fa67a88541
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinstatements.md
---

**Reinstatements** restore the limit of an [[Excess of Loss|excess of loss]] layer, typically a property catastrophe cover, after a loss has used it up, so the layer is available again for a later event in the same period. A reinstatement is usually paid for with a **reinstatement premium**, most often *pro rata as to amount* and less often also *pro rata as to time*.

> $$\text{RP} = P \times r \times \frac{\text{Limit reinstated}}{L}$$

> $$\text{Aggregate limit} = (1 + n)\,L$$

> $$\begin{aligned} &P\left(1 + r\,\frac{E[\min(S,\, nL)]}{L}\right) \\ &\quad = \text{Required total premium} \end{aligned}$$

- $P$ is the annual (up-front) premium, $r$ the reinstatement rate ($100\%$ is common; Clark's illustration uses $110\%$), $L$ the occurrence limit, $n$ the number of reinstatements and $S$ the year's total loss to the layer before any aggregate cap. *Pro rata as to time* multiplies RP by the fraction of the term left at the loss date. Clark notes few contracts do this, because catastrophes such as hurricanes are seasonal.
- **Aggregate limit.** With $n$ reinstatements the most the reinsurer pays in a year is $(1+n)L$. Pro rata as to amount means that, with one reinstatement, four half-limit losses produce the same result as two full-limit losses.
- **Effect on loss cost.** Limiting reinstatements caps expected ceded loss at $E[\min(S, (1+n)L)]$. Expected reinstatement premium is additional premium, so the up-front premium needed to hit a target is *lower* by the factor $1 + r\,E[\min(S, nL)]/L$. A reinsurer that ignored it would overprice the cover. *Free* reinstatements ($r = 0$) must be paid for in $P$ instead.
- **Who bears what.** The cedant pays the reinstatement premium at the worst moment, straight after a catastrophe. Its net cost of an event is retention, plus loss above the limit, plus RP, and the net [[Probable Maximum Loss|PML]] must include it. For the reinsurer, premium that arrives with the losses makes the result less volatile.
- Priced from [[Catastrophe Modelling|catastrophe model]] output (the annual loss distribution to the layer — see [[Catastrophe Expected Loss Cost]]). Before models, the *payback* approach set $P$ so that $L$ would be repaid over a chosen number of years. See [[Reinsurance Contract Provisions]].

> [!example]- Computing a Reinstatement Premium {Example}
> A calendar-year catastrophe cover is $\$20$M xs $\$30$M with an annual premium of $\$3$M and one reinstatement at $100\%$. A hurricane on September 1 causes a gross loss of $\$42$M. Find the recovery and reinstatement premium if the reinstatement is (a) pro rata as to amount only, (b) also pro rata as to time. What cover remains?
>
> > [!answer]-
> > Layer loss: $\min(\max(42 - 30, 0), 20) = \$12$M.
> >
> > **(a) As to amount:**
> >
> > $$
> > \begin{align*}
> > \text{RP} &= \$3\text{M} \times 1.00 \times \frac{12}{20} \\
> > &= \$1.8\text{M}
> > \end{align*}
> > $$
> >
> > **(b) Also as to time,** with four of twelve months left:
> >
> > $$
> > \begin{align*}
> > \text{RP} &= \$1.8\text{M} \times \frac{4}{12} \\
> > &= \$0.6\text{M}
> > \end{align*}
> > $$
> >
> > In case (a) the cedant recovers $\$12$M and pays back $\$1.8$M, so its net cost of the event is $\$30\text{M} + \$1.8\text{M} = \$31.8$M. The full $\$20$M occurrence limit is available again for the next event. Of the $\$40$M aggregate limit, $\$28$M remains: $\$8$M of reinstatement capacity is left after the $\$12$M reinstated.

> [!example]- Pricing a Layer with One Paid Reinstatement {Example}
> A $\$10$M xs $\$10$M catastrophe layer has one reinstatement at $100\%$, pro rata as to amount. The annual loss to the layer, before any cap, is $\$0$ ($p = 0.80$), $\$5$M ($0.10$, one partial event), $\$10$M ($0.06$), $\$20$M ($0.03$, two full events) or $\$30$M ($0.01$, three full events). The reinsurer targets a $60\%$ loss ratio on total premium. Find the up-front premium.
>
> > [!answer]-
> > With aggregate limit $\$20$M, ceded loss is $0, 5, 10, 20, 20$:
> >
> > $$
> > \begin{align*}
> > E[\text{Ceded}] &= 0.10(5) + 0.06(10) + 0.03(20) + 0.01(20) \\
> > &= 1.9
> > \end{align*}
> > $$
> >
> > Limit reinstated, $\min(S, 10)$, is $0, 5, 10, 10, 10$:
> >
> > $$
> > \begin{align*}
> > E[\min(S, 10)] &= 0.10(5) + 0.06(10) + 0.03(10) + 0.01(10) \\
> > &= 1.5
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > P\left(1 + \frac{1.5}{10}\right) &= \frac{1.9}{0.60} \\
> > P &= \frac{3.1667}{1.15} \\
> > &= \$2.754\text{M}
> > \end{align*}
> > $$
> >
> > The rate on line is $27.5\%$. Expected reinstatement premium is $0.15 \times 2.754 = \$0.413$M, which brings total expected premium to $\$3.167$M.
> >
> > **Comparisons:** with a *free* reinstatement the whole $\$3.167$M must be charged up front. With *no* reinstatement the aggregate limit is $\$10$M, expected loss falls to $\$1.5$M, and $P = 1.5/0.60 = \$2.5$M.
