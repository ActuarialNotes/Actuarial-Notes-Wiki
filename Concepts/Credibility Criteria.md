---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2fc8bf2edd4f7d15c398e389aba0bdd96a3656967e49e06eb4415c5604480e84
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credibility Criteria.md
---

**Credibility Criteria** are the objective tests used to choose [[Credibility|credibility]] weights, or to judge an [[Experience Rating|experience rating]] plan, by how well its predictions perform against what actually happened. Mahler compares three: least squared error, a small chance of large errors (limited fluctuation), and the Meyers/Dorweiler test that the modification is uncorrelated with the modified loss ratio.

> $$\text{1.}\quad \min_Z \; \frac{1}{n}\sum \left(F - X\right)^2$$

> $$Z^{*} = 1 - \frac{V(1)}{2\,V(0)}$$

> $$V(Z^{*}) = V(1)\left(1 - \frac{V(1)}{4\,V(0)}\right)$$

> $$\text{2.}\quad \min_Z \; \Pr\left(\left|X - F\right| > k\,F\right)$$

> $$\text{3.}\quad \tau\!\left(\frac{F}{M},\ \frac{X}{F}\right) \approx 0$$

> $$\tau = 1 - \frac{4Q}{n(n-1)}$$

- **Notation.** $F$ is a risk's prediction, $X$ its observed result and $M$ the grand (class) mean, over $n$ predictions. $V(0)$ and $V(1)$ are the mean squared errors of the two base cases: every risk at the mean ($Z = 0$) and the latest year repeating ($Z = 1$). $k$ is the error tolerance. $\tau$ is Kendall's rank correlation, where $Q$ counts the pairs of risks ranked in opposite order by $F/M$ and by $X/F$.
- **1. Least squared error.** The smaller the [[Mean Square Error|mean squared error]] between predicted and observed results, the better; [[Bühlmann Credibility|Bühlmann]] and Bayesian credibility are least squares methods. With one year of data and the grand mean, the error is a parabola in $Z$, which gives the two formulas above. In general it is a second order polynomial in the weights $Z_i$, with coefficients from the covariance structure, so setting its derivatives to zero gives linear equations for the weights (see [[Shifting Risk Parameters]]). Process variance in the observation is untouched by any weighting, so for one year credibility can at best cut the error to 75% of the better base case.
- **2. Small chance of large errors.** The fewer predictions that miss the observed result by more than $k$ percent, the better. This mirrors [[Limited Fluctuation Credibility|classical credibility]], whose [[Full Credibility Standard|full credibility standard]] asks for probability $P$ that the departure from expected is no more than $k$. The test is stated against the observation because a risk's true loss potential, which shifts over time, cannot be observed. It does not distinguish sharply between credibilities.
- **3. Meyers/Dorweiler.** If a plan works, the insurer should be equally willing to write debit and credit risks, so the modified loss ratio $X/F$ should not vary with the modification $F/M$. A positive correlation means the debits and credits are too small — too little credibility. A negative one means too much. The test looks at the *pattern* of the errors, not their size, so it can disagree with the other two. For exponential smoothing it put the optimal credibility near 5–10%, against about 55% under least squares.
- **Comparing them.** For one year of Mahler's National League data the optima were 68% (least squares), 75% (limited fluctuation) and 71% (Meyers/Dorweiler). For ten years, averaged over four data sets, they were 63%, 55% and 65%, and any credibility from 50% to 70% did well by all three. An optimum is the centre of an interval: nearby values perform almost as well. No single criterion should be relied on without understanding what it tests.

> [!example]- Least Squares Credibility from the Two Base Cases {Example}
> A retrospective test of an experience rating plan predicts each risk's next-year relative loss ratio from its latest year and the class average. Over the test period the mean squared error is $V(0) = 0.0240$ when every risk is priced at the class average, and $V(1) = 0.0200$ when each risk's latest year is assumed to repeat.
>
> 1. Find the least squares credibility and the minimum mean squared error.
> 2. How large is the reduction, compared with the best possible?
> 3. The plan actually uses $Z = 0.40$. What mean squared error results?
>
> > [!answer]-
> > **1.**
> >
> > $$
> > \begin{align*}
> > Z^{*} &= 1 - \frac{0.0200}{2(0.0240)} \\
> > &= 1 - 0.4167 \\
> > &= 0.5833 \\[4pt]
> > V(Z^{*}) &= 0.0200\left(1 - \frac{0.0200}{4(0.0240)}\right) \\
> > &= 0.0200(1 - 0.2083) \\
> > &= 0.01583
> > \end{align*}
> > $$
> >
> > **2.** $0.01583 / 0.0200 = 79.2\%$ of the better base case. The best possible is 75%, reached only when $V(0) = V(1)$, so credibility captures most of the available gain.
> >
> > **3.** Write the parabola with $B = V(0) - \tfrac{1}{2}V(1) = 0.0140$:
> >
> > $$
> > \begin{align*}
> > V(Z) &= V(0)\,Z^2 - 2BZ + V(0) \\
> > V(0.40) &= 0.0240(0.16) - 2(0.0140)(0.40) + 0.0240 \\
> > &= 0.00384 - 0.01120 + 0.02400 \\
> > &= 0.01664
> > \end{align*}
> > $$
> >
> > That is only about 5% above the minimum. The criterion is flat near its optimum, so a credibility somewhat off optimal costs little.

> [!example]- Judging Two Plans by All Three Criteria {Example}
> Five risks in a class with mean $M = 1.00$ receive modifications $F$ under two plans — Plan 1 with credibility $0.30$ and Plan 2 with $0.60$ applied to the same experience. Their actual relative losses $X$ next year are shown.
>
> | Risk | $F$, Plan 1 | $F$, Plan 2 | $X$ |
> | :--- | ---: | ---: | ---: |
> | A | 0.80 | 0.60 | 0.70 |
> | B | 0.90 | 0.80 | 0.80 |
> | C | 1.00 | 1.00 | 1.10 |
> | D | 1.10 | 1.20 | 1.05 |
> | E | 1.20 | 1.40 | 1.45 |
>
> Evaluate each plan by mean squared error, by the share of predictions more than 20% from the observed result, and by Kendall's $\tau$ between $F/M$ and $X/F$. Comment.
>
> > [!answer]-
> > **Least squares.** The errors $X - F$ are $-0.10, -0.10, +0.10, -0.05, +0.25$ for Plan 1 and $+0.10, 0, +0.10, -0.15, +0.05$ for Plan 2.
> >
> > $$
> > \begin{align*}
> > \text{MSE}_1 &= \frac{0.01 + 0.01 + 0.01 + 0.0025 + 0.0625}{5} \\
> > &= 0.019 \\[4pt]
> > \text{MSE}_2 &= \frac{0.01 + 0 + 0.01 + 0.0225 + 0.0025}{5} \\
> > &= 0.009
> > \end{align*}
> > $$
> >
> > **Limited fluctuation.** Relative to $F$, Plan 1 misses risk E by $0.25/1.20 = 20.8\%$, so 1 of 5 (20%) exceeds the tolerance. Plan 2's largest miss is $0.10/0.60 = 16.7\%$, so none does.
> >
> > **Meyers/Dorweiler.** The modified loss ratios $X/F$, listed in order of the modification:
> >
> > - Plan 1: $0.875,\ 0.889,\ 1.100,\ 0.955,\ 1.208$. Only C–D is out of order, so $Q = 1$.
> > - Plan 2: $1.167,\ 1.000,\ 1.100,\ 0.875,\ 1.036$. The pairs A–B, A–C, A–D, A–E, B–D, C–D and C–E are out of order, so $Q = 7$.
> >
> > $$
> > \begin{align*}
> > \tau_1 &= 1 - \frac{4(1)}{5(4)} \\
> > &= 0.80 \\[4pt]
> > \tau_2 &= 1 - \frac{4(7)}{5(4)} \\
> > &= -0.40
> > \end{align*}
> > $$
> >
> > Least squares and limited fluctuation both prefer Plan 2. Meyers/Dorweiler says Plan 1's debits and credits are too small ($\tau > 0$: its surcharged risks still run worse than their mods, so an insurer would rather write its credit risks) and Plan 2's too large ($\tau < 0$), so its optimum lies between $0.30$ and $0.60$. With only five risks neither $\tau$ is clearly significant: $\text{Var}(\tau) = \frac{2(2n+5)}{9n(n-1)} = 0.167$, so a 95% band around zero is about $\pm 0.80$.
