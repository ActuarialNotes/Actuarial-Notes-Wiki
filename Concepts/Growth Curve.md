---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c715e9e05f3f6846f42b53146b22544127db761b36b29e0901bee2faca2ecf0b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Growth Curve.md
---

**Growth curve** $G(x \mid \omega, \theta)$ is a smooth parametric curve, in the form of a cumulative distribution function, giving the expected cumulative proportion of ultimate loss reported (or paid) at age $x$. In [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]] it replaces a set of selected [[Development Factor|development factors]]: the age-to-ultimate factor is its reciprocal.

> $$\text{LDF}_x = \frac{1}{G(x)}$$

> $$\text{Loglogistic: } G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}$$

> $$\text{Weibull: } G(x) = 1 - \exp\!\left[-\left(\frac{x}{\theta}\right)^{\omega}\right]$$

- **Parameters and age.** $\omega$ is the shape ("warp") and $\theta$ the scale. The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year|accident year]] evaluated $t \ge 12$ months after it starts has $x = t - 6$. For the loglogistic, $\theta$ is the median, so $\text{LDF}_\theta = 2.000$, and $\text{LDF}_x = 1 + \theta^{\omega}x^{-\omega}$ is Sherman's inverse power curve applied to age-to-ultimate factors. For the Weibull, $\theta$ is about the 63.2nd percentile, so $\text{LDF}_\theta \approx 1.582$.
- **Expected emergence.** The expected increment between ages $x$ and $y$ is $\text{ULT}_{AY}[G(y) - G(x)]$ in Clark's LDF method, or $\text{Premium}_{AY} \times \text{ELR} \times [G(y) - G(x)]$ in his [[Cape Cod Method|Cape Cod]] method. $\omega$, $\theta$ and the ultimates or ELR are fitted by [[Maximum Likelihood Estimation|maximum likelihood]] on [[Over-Dispersed Poisson Model|over-dispersed Poisson]] increments, and the fitted ultimates are the familiar [[Chain Ladder Method|chain ladder]] and Cape Cod estimates.
- **Why a curve.** Clark gives three reasons. Only two parameters describe the whole pattern. The data need not sit on evenly spaced evaluation dates, so a latest diagonal nine months after the one before, or only the last few diagonals, can be used. And the pattern is smooth instead of following every random movement in the [[Age to Age Factor|age-to-age factors]].
- **The tail, and truncation.** The curve extrapolates to infinite age, so it produces its own [[Tail Factor|tail factor]]. The loglogistic's is heavy: in Clark's example only $77.24\%$ has emerged after ten years, a tail of $1.2946$ against the Weibull's $1.0525$. To avoid relying on a mechanical extrapolation, Clark truncates at a selected age $x_T$ (240 months), using $G(x_T)/G(x)$ in place of $1/G(x)$.
- **Limits.** Emergence must rise strictly from $0\%$ to $100\%$, so a line with real expected negative development, such as significant salvage recoveries, needs a different model. Every accident year shares one pattern. For a period still being earned, Clark scales the curve by the exposed fraction: $G_{AY}(t) = \text{Expos}(t) \times G^{*}\big(\text{AvgAge}(t)\big)$, with separate formulas for accident and [[Policy Year|policy years]].

> [!example]- Loglogistic and Weibull LDFs, With and Without Truncation {Example}
> Clark's fits to Mack's triangle were loglogistic $\omega = 1.434294$, $\theta = 48.6249$ and Weibull $\omega = 1.296906$, $\theta = 48.88453$.
>
> An accident year is $48$ months old at year-end, with $3{,}000$ reported (\$000s). Estimate its reserve (a) from the loglogistic, (b) from the loglogistic truncated at $240$ months, and (c) from the Weibull.
>
> > [!answer]-
> > The average age is $x = 48 - 6 = 42$ months, and the truncation point is $240 - 6 = 234$.
> >
> > **(a) Loglogistic.** With $(x/\theta)^{\omega} = (42/48.6249)^{1.434294} = 0.8105$:
> >
> > $$
> > \begin{align*}
> > G(42) &= \frac{0.8105}{1 + 0.8105} \\
> > &= 0.4477 \\
> > \text{LDF} &= 1/0.4477 \\
> > &= 2.2338 \\
> > \text{Reserve} &= 3{,}000 \times (2.2338 - 1) \\
> > &= 3{,}701
> > \end{align*}
> > $$
> >
> > **(b) Truncated at 240 months.** With $(234/48.6249)^{1.434294} = 9.5214$:
> >
> > $$
> > \begin{align*}
> > G(234) &= \frac{9.5214}{10.5214} \\
> > &= 0.90496 \\
> > \text{LDF}_{42 \to 234} &= 0.90496/0.44767 \\
> > &= 2.0215 \\
> > \text{Reserve} &= 3{,}000 \times (2.0215 - 1) \\
> > &= 3{,}064
> > \end{align*}
> > $$
> >
> > **(c) Weibull.** With $(42/48.88453)^{1.296906} = 0.8213$:
> >
> > $$
> > \begin{align*}
> > G(42) &= 1 - e^{-0.8213} \\
> > &= 0.5601 \\
> > \text{LDF} &= 1/0.5601 \\
> > &= 1.7853 \\
> > \text{Reserve} &= 3{,}000 \times (1.7853 - 1) \\
> > &= 2{,}356
> > \end{align*}
> > $$
> >
> > The two curves fit the same ten years of data, yet their reserves differ by $1{,}345$. About $94\%$ of the gap is development beyond those ten years (average age $114$), where the loglogistic's tail factor is $1/0.7724 = 1.2946$ and the Weibull's is $1.0525$. Truncation takes back $637$ of the loglogistic's tail. The curve form is itself an assumption, and the tail is where it shows.

> [!example]- Growth Function for a Partial Accident Year and a Policy Year {Example}
> A loglogistic pattern has $\omega = 1.5$ and $\theta = 40$ months, defined on the average accident date of the earned exposure. Using Clark's exposure adjustments, find the cumulative percent of ultimate for (a) an accident year $9$ months after it starts, and (b) a policy year of annual policies $18$ months after it starts. Compare (b) with an accident year at the same age.
>
> > [!answer]-
> > **(a) Accident year at 9 months.** Three quarters of the year is exposed, and the earned part has an average age of $4.5$ months. With $(4.5/40)^{1.5} = 0.03773$, $G^{*}(4.5) = 0.03773/1.03773 = 0.03636$:
> >
> > $$
> > \begin{align*}
> > G_{AY}(9) &= \tfrac{9}{12} \times 0.03636 \\
> > &= 0.02727 \\
> > \text{LDF} &= 1/0.02727 \\
> > &= 36.67
> > \end{align*}
> > $$
> >
> > The factor $1/G^{*}(4.5) = 27.50$ alone would develop the $9$ months already exposed. The extra $12/9$ adds the quarter of the year not yet exposed.
> >
> > **(b) Policy year at 18 months.** Policies are written evenly over the first $12$ months, and each is exposed for $12$ months:
> >
> > $$
> > \begin{align*}
> > \text{Expos}(18) &= 1 - \tfrac{1}{2}\left(2 - \tfrac{18}{12}\right)^2 \\
> > &= 0.875 \\
> > \text{AvgAge}(18) &= \frac{(18 - 12) + \tfrac{1}{3}(24 - 18)(1 - 0.875)}{0.875} \\
> > &= 7.143
> > \end{align*}
> > $$
> >
> > With $(7.143/40)^{1.5} = 0.07546$, $G^{*}(7.143) = 0.07546/1.07546 = 0.07017$:
> >
> > $$
> > \begin{align*}
> > G_{PY}(18) &= 0.875 \times 0.07017 \\
> > &= 0.06140 \\
> > \text{LDF} &= 16.29
> > \end{align*}
> > $$
> >
> > An accident year at $18$ months is fully exposed with average age $12$, so $G(12) = 0.1643/1.1643 = 0.1411$ and its LDF is $7.09$. The policy year is less than half as developed at the same age, because its accidents happen later: some of its exposure is not yet earned, and what is earned is younger.
