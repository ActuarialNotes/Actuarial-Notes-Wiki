---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a3913f471f89df427ff014a15043f8076e7f2b8f1df95b2df0083e755da5f297
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Growth Curve.md
---
A **Growth Curve** $G(x \mid \omega, \theta)$ is a smooth parametric curve, in the form of a cumulative distribution function, giving the expected cumulative proportion of ultimate loss reported (or paid) at age $x$. In [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]] it replaces a set of selected [[Development Factor|development factors]], and the age-to-ultimate factor is its reciprocal:

> $$\text{LDF}_x = \frac{1}{G(x)}$$

The share not yet emerged is $1 - G(x)$. The age $x$ runs from the *average* accident date to the evaluation date, so an [[Accident Year|accident year]] evaluated $t \ge 12$ months after it starts has $x = t - 6$. In Clark's LDF method the ultimate is the losses to date divided by $G(x)$, and the reserve is the ultimate less the losses to date.

## The loglogistic curve

The loglogistic growth curve is

> $$G(x) = \frac{x^{\omega}}{x^{\omega} + \theta^{\omega}}$$

- $\omega$ is the shape ("warp") parameter.
- $\theta$ is the scale parameter.

For the loglogistic, $\theta$ is the median, so $\text{LDF}_\theta = 2.000$, and $\text{LDF}_x = 1 + \theta^{\omega}x^{-\omega}$ is Sherman's inverse power curve applied to age-to-ultimate factors.

> [!example]- An accident year 48 months old has $3{,}000$ reported. With a loglogistic $\omega = 1.434294$, $\theta = 48.6249$, what is its reserve? {Example}
> - The average age is $x = 48 - 6 = 42$ months.
> - $(42/48.6249)^{1.434294} = 0.8105$, so $G(42) = 0.8105/1.8105 = 0.4477$.
> - The LDF is $1/0.4477 = 2.2338$.
> - The reserve is $3{,}000 \times (2.2338 - 1) = 3{,}701$.

## The Weibull curve

The Weibull growth curve is

> $$G(x) = 1 - \exp\!\left[-\left(\frac{x}{\theta}\right)^{\omega}\right]$$

For the Weibull, $\theta$ is about the 63.2nd percentile, so $\text{LDF}_\theta \approx 1.582$. Its tail is lighter than the loglogistic's, so it reaches full development sooner and suits shorter-tailed lines.

> [!example]- For the same accident year, what is the reserve from a Weibull with $\omega = 1.296906$, $\theta = 48.88453$? {Example}
> - $(42/48.88453)^{1.296906} = 0.8213$, so $G(42) = 1 - e^{-0.8213} = 0.5601$.
> - The LDF is $1/0.5601 = 1.7853$.
> - The reserve is $3{,}000 \times (1.7853 - 1) = 2{,}356$.
> - The two curves are Clark's fits to the same ten years of Mack's triangle, yet their reserves differ by $1{,}345$.

## Expected emergence

The expected increment between ages $x$ and $y$ is $\text{ULT}_{AY}[G(y) - G(x)]$ in Clark's LDF method, or $\text{Premium}_{AY} \times \text{ELR} \times [G(y) - G(x)]$ in his [[Cape Cod Method|Cape Cod]] method. For the first period, $G(x) = 0$. Actual and expected increments, not cumulative amounts, are compared. $\omega$, $\theta$ and the ultimates or ELR are fitted by [[Maximum Likelihood Estimation|maximum likelihood]] on [[Over-Dispersed Poisson Model|over-dispersed Poisson]] increments, and the fitted ultimates are the familiar [[Chain Ladder Method|chain ladder]] and Cape Cod estimates.

Clark gives three reasons for a curve. Only two parameters describe the whole pattern. The data need not sit on evenly spaced evaluation dates, so a latest diagonal nine months after the one before, or only the last few diagonals, can be used. And the pattern is smooth instead of following every random movement in the [[Age to Age Factor|age-to-age factors]].

## The tail and truncation

The curve extrapolates to infinite age, so it produces its own [[Tail Factor|tail factor]]. The loglogistic's is heavy: in Clark's example only $77.24\%$ has emerged after ten years (average age 114), a tail of $1.2946$ against the Weibull's $1.0525$. About 94% of the $1{,}345$ gap between the two reserves above is development beyond those ten years.

To avoid relying on a mechanical extrapolation, Clark truncates at a selected age $x_T$ (240 months). The truncated factor is

> $$\text{LDF}_{x \to x_T} = \frac{G(x_T)}{G(x)}$$

- $x_T$ is converted to an average age the same way as $x$.

Under the Cape Cod method, the truncated reserve uses $G(x_T) - G(x)$ in place of $1 - G(x)$. If $G$ at a far-out age is already close to 1, no truncation is needed.

> [!example]- What is the loglogistic reserve for the same accident year, truncated at 240 months? {Example}
> - The truncation point is the average age $240 - 6 = 234$.
> - $(234/48.6249)^{1.434294} = 9.5214$, so $G(234) = 9.5214/10.5214 = 0.90496$.
> - The truncated LDF is $0.90496/0.44767 = 2.0215$.
> - The reserve is $3{,}000 \times (2.0215 - 1) = 3{,}064$, which takes back $637$ of the untruncated loglogistic's tail.

## Limits and partial periods

Emergence must rise strictly from $0\%$ to $100\%$, so a line with real expected negative development, such as significant salvage recoveries, needs a different model. Every accident year shares one pattern.

For a period still being earned, Clark scales the curve by the exposed fraction:

> $$G_{AY}(t) = \text{Expos}(t) \times G^{*}\big(\text{AvgAge}(t)\big)$$

- $\text{Expos}(t)$ is the fraction of the period's exposure earned by time $t$.
- $\text{AvgAge}(t)$ is the average age of the earned exposure.
- $G^{*}$ is the growth curve defined on the average accident date of the earned exposure.

Clark gives separate formulas for accident and [[Policy Year|policy years]].

> [!example]- With a loglogistic $\omega = 1.5$, $\theta = 40$, what share of ultimate has emerged for an accident year 9 months after it starts? {Example}
> - Three quarters of the year is exposed, and the earned part has an average age of $4.5$ months.
> - $(4.5/40)^{1.5} = 0.03773$, so $G^{*}(4.5) = 0.03773/1.03773 = 0.03636$.
> - $G_{AY}(9) = 0.75 \times 0.03636 = 0.02727$, an LDF of $1/0.02727 = 36.67$.
> - The factor $1/G^{*}(4.5) = 27.50$ alone would develop the 9 months already exposed. The extra $12/9$ adds the quarter of the year not yet exposed.

> [!trap] Evaluating the curve at the evaluation age
> An accident year evaluated at 48 months has an average age of 42. Evaluating the loglogistic above at 48 gives $G(48) = 0.4954$ and an LDF of $2.02$, not $2.23$.
