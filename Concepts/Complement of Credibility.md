---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c57ae73adc34bb7f3140c71c5caa67f6236a844292225d4b49128814397fe8d2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Complement of Credibility.md
---

**Complement of Credibility** is the estimate that receives the weight $(1-Z)$ when observed experience receives [[Credibility|credibility]] $Z$. When $Z$ is low — a small class, a new territory, an excess layer — the complement, not the data, determines the answer.

> $$\text{Estimate} = Z \times \text{Experience} + (1 - Z) \times \text{Complement}$$

**Boor's desirable qualities of a complement.** It should be accurate (low error variance), **unbiased**, **statistically independent** of the experience it is blended with, **logically related** to the risks being priced, **available** in practice, and **not subject to the same distortions** as the base data. Independence is the one most often violated: a complement built from data that includes the subject experience is partly the experience itself, and the blend then over-weights it.

**Werner & Modlin's six first-dollar complements:**

1. **Loss costs of a larger related group** — the statewide or countrywide result for the same class.
2. **Loss costs of a larger group adjusted** for known differences between it and the subject group.
3. **Rate change from a larger group applied to present rates** — take the wider indication as a *change*, not a level.
4. **Harwayne's method** — adjust another state's class loss costs for its overall level difference before using them, so that a state whose overall rates are higher does not import that level into the class complement.
5. **Trended present rates** — the current rate, trended forward; effectively "no change plus inflation".
6. **Competitor or bureau rates.**

**Excess (increased-limits) complements:** increased limits analysis, lower limits analysis, limits analysis, and the fitted-curve approach — all built on the fact that excess layers have too few claims ever to be credible on their own.

Further points:

- The methods differ in what they assume is transferable. A **level** complement (methods 1, 2, 6) assumes the wider group's cost level applies here; a **change** complement (methods 3, 5) assumes only that the *direction and size of movement* transfers, which is a weaker and often safer assumption.
- The complement must be on the same basis as the experience: same limits, same coverage, same [[Loss Trend|trend]] and [[Loss Development|development]] treatment. Blending a trended indication with an untrended complement drags the answer backwards in time.
- In reserving, the [[Bornhuetter-Ferguson Method|BF]] a priori loss ratio *is* a complement of credibility, and the [[Cape Cod Method|Cape Cod]] technique differs from BF precisely in where that complement comes from.

![[Media/Figures/Complement_of_Credibility.svg|340]]

> [!example]- The Complement Drives a Low-Credibility Indication {Example}
> A new territory shows an indicated rate change of $+25\%$ but earns only $Z = 0.20$. The selected complement — the statewide trended change — is $+6\%$.
>
> Compute the weighted change, and assess how much the answer depends on the complement.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Weighted} &= 0.20(25\%) + 0.80(6\%) \\
> > &= 5.0\% + 4.8\% \\
> > &= +9.8\%
> > \end{align*}$$
> >
> > Half the answer comes from the complement, and it would move nearly one-for-one with it: had the complement been $+12\%$, the result would be $+14.6\%$.
> >
> > Given that leverage, the choice deserves the same scrutiny as the indication itself. "Statewide trended change" (method 3) is a reasonable pick for a *new* territory, because there is no historical rate for the territory to trend and no credible level to import. Using statewide *loss costs* (method 1) instead would assume the new territory costs the same as the state average — an assumption that is probably false, since a new territory is usually entered for a reason.

> [!example]- Harwayne's Method {Example}
> A class in State X has thin data. State Y has ample data for the same class. State Y's overall loss cost across all classes is $\$310$ per exposure; State X's is $\$260$. State Y's loss cost for the subject class is $\$465$.
>
> Compute the Harwayne complement for the class in State X.
>
> > [!answer]-
> > State Y's class loss cost carries State Y's *overall* level, which is $19\%$ higher than State X's. Harwayne's method strips that out by working in relativities:
> >
> > $$\begin{align*}
> > \text{State Y class relativity} &= \frac{\$465}{\$310} = 1.50 \\[6pt]
> > \text{Complement for X} &= 1.50 \times \$260 \\
> > &= \$390
> > \end{align*}$$
> >
> > Using State Y's $\$465$ raw would import State Y's higher cost level — its benefit structure, legal environment and medical costs — into a State X rate. What actually transfers between states is the **relationship between classes**, not the absolute level, and Harwayne's method is the mechanism for transferring only that.
> >
> > The same logic applies whenever data is borrowed across a boundary: adjust for the known systematic difference first, then use the residual relationship.
