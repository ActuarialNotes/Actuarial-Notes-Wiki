---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f0c1554f85a5023fe6131038741d247293c45bd47740c651f290033abb6506b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Implementation.md
---

**Model Implementation** turns a validated model into a [[Rating Plan|rating plan]] that can be filed, programmed, sold and maintained. The fitted relativities become [[Rating Factors|rating factors]] in a [[Rating Algorithm|rating algorithm]]. They are adjusted for regulatory, systems and market constraints, balanced to the intended overall rate change, and phased in so that no policyholder's premium moves too far at once.

> $$B_{\text{new}} = B_{\text{current}} \times \frac{1 + \Delta}{\text{OB}}$$

> $$\text{OB} = \frac{\sum_j w_j R_j^{\text{new}}}{\sum_j w_j R_j^{\text{current}}}$$

- $B$ is the base rate, $\Delta$ the intended overall change, $R_j$ the relativity of level $j$, and $w_j$ its exposure weight. The **off-balance** OB is how much the new relativities alone would move average premium. Dividing it out makes the plan deliver $\Delta$ (see [[Rate Change]]).
- **From model to product.** The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] makes three points:
  - The plan must be clear, leaving no ambiguity about which class a risk falls in.
  - A factor that is in the plan but not in the model (a new safe-driving discount, say) may overlap variables that were modelled, and needs a judgmental adjustment.
  - Coverage options (deductibles, [[Increased Limits|increased limits]], peril groups) should be priced outside the GLM by loss-elimination methods and entered as [[Offset Variable|offsets]].
- **Stakeholder constraints.** Regulators may prohibit or restrict variables, and the rules vary by jurisdiction ([[Risk Classification Restrictions]], [[Unfair Discrimination]]). IT systems limit what the rating engine can compute, and programming costs money. Agents and underwriters have to be able to explain and sell the plan. The monograph's advice is to raise these constraints early, because they can change the model itself (see [[Considerations for Implementing Rates]]).
- **Dislocation and transition.** Before filing, each policy's premium is compared under the current and proposed plans. Large movements are **capped** and the rest is phased in over later renewals. The capped shortfall makes the achieved change smaller than the indicated one.
- **Maintenance.** A model's accuracy decays as the world changes. It should be **refreshed** (recalibrated on newer data) between full rebuilds, and monitored after launch with [[Actual vs Expected Analysis|actual vs. expected]] results by segment.

> [!example]- Off-Balance and a Premium Cap {Example}
> The current base rate is $\$500$. A three-level variable is being revised:
>
> - Level 1: $50\%$ of exposures, current relativity $1.00$, proposed $1.00$
> - Level 2: $30\%$ of exposures, current $1.20$, proposed $1.35$
> - Level 3: $20\%$ of exposures, current $1.50$, proposed $1.40$
>
> The overall target is $+3\%$. Find the new base rate and the change by level. If increases are capped at $+10\%$, what overall change is achieved?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{OB} &= \frac{0.5(1.00) + 0.3(1.35) + 0.2(1.40)}{0.5(1.00) + 0.3(1.20) + 0.2(1.50)} \\
> > &= \frac{1.185}{1.160} \\
> > &= 1.0216
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > B_{\text{new}} &= \$500 \times \frac{1.03}{1.0216} \\
> > &= \$504.14
> > \end{align*}
> > $$
> >
> > The premiums by level become $\$504.14$ against $\$500$ ($+0.8\%$), $\$680.58$ against $\$600$ ($+13.4\%$), and $\$705.79$ against $\$750$ ($-5.9\%$). Weighted, the average premium is $\$597.40$ against $\$580$, which is $+3.0\%$.
> >
> > With a $+10\%$ cap, Level 2 pays $\$660$:
> >
> > $$
> > \begin{align*}
> > \text{Average} &= 0.5(504.14) + 0.3(660) + 0.2(705.79) \\
> > &= \$591.23
> > \end{align*}
> > $$
> >
> > That is only $+1.9\%$. The cap costs about $1.1$ points of the indication. The insurer either accepts the shortfall and moves Level 2 the rest of the way at the next renewal, or raises the base rate further, which pushes more increase onto the uncapped levels.

> [!example]- The GLM Says a Higher Deductible Costs More {Example}
> A pure premium GLM that includes deductible as a variable returns a highly significant factor of $1.08$ for the $\$1{,}000$ deductible relative to $\$500$. Should that factor be implemented?
>
> > [!answer]-
> > **No.** Charging more for less coverage cannot be right as a price. The coefficient is picking up **selection effects**, not loss elimination. Insureds who choose high deductibles may have a greater appetite for risk, or underwriters may have required a higher deductible on risks they judged worse. The GLM predicts well for the existing book, but a deductible factor that departs from pure loss elimination would change which options future buyers choose, so the pattern would not repeat.
> >
> > The monograph's remedy is to derive deductible factors outside the GLM from a loss elimination analysis and include them as an **offset**. The other variables are then fitted around a fixed, defensible deductible structure.
