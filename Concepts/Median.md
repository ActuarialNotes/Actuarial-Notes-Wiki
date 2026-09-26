---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:112c045eb42b0fd3a19143acdd6c0c46e67570a946ac15e5758e18b714badb02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Median.md
---

The **Median** $m$ of a [[Random Variable]] $X$ is its 50th [[Percentile|percentile]]: the value that splits the distribution in half, with at least half the probability at or below it and at least half at or above it.

> $$F(m) = 0.5$$

> $$m = F^{-1}(0.5)$$

- For a [[Continuous Random Variable|continuous]] $X$ with a strictly increasing [[Cumulative Distribution Function (CDF)|CDF]] the median is unique: solve $F(m) = 0.5$, or equivalently $\int_{-\infty}^{m} f(x)\,dx = 0.5$.
- For a [[Discrete Random Variable|discrete]] $X$ the CDF usually jumps past 0.5 rather than landing on it, so the median is the smallest $m$ with $F(m) \ge 0.5$. The general condition is $P(X \le m) \ge 0.5$ and $P(X \ge m) \ge 0.5$; if $F$ equals exactly 0.5 across an interval, every point of it qualifies, and the [[Percentile]] convention takes the smallest.
- **Median versus mean.** A symmetric distribution has median equal to the [[Expected Value|mean]]. Claim severities are right-skewed — a few large claims pull the mean up but leave the median alone — so typically [[Mode|mode]] < median < mean. For the [[Exponential Distribution|exponential]], $m = \theta \ln 2 \approx 0.693\theta$ against a mean of $\theta$; for the [[Lognormal Distribution|lognormal]], $m = e^{\mu}$ against $e^{\mu + \sigma^2/2}$.
- **Increasing transformations pass straight through.** If $g$ is non-decreasing, $g(m)$ is a median of $g(X)$. So a payment $(X - d)_+$ has median $m - d$ whenever $F(d) < 0.5$. The mean has no such property: $E[g(X)] \ne g(E[X])$ in general.
- The median minimises expected *absolute* error $E|X - c|$, where the mean minimises expected *squared* error — which is why it is the robust summary of a skewed claim sample. The **sample median** is the middle [[Order Statistics|order statistic]], or the average of the two middle values when $n$ is even.

> [!example]- Median Fire Damage Ratio {Example}
> The fraction $X$ of a building's value destroyed in a fire has density $f(x) = 2(1 - x)$ for $0 < x < 1$. Find the median, and compare it with the mean and the mode.
>
> > [!answer]-
> > Integrate for the CDF, then set it to one half:
> > $$
> > \begin{align*}
> > F(x) &= \int_0^x 2(1 - t)\,dt \\
> >      &= 1 - (1 - x)^2 \\
> > (1 - m)^2 &= 0.5 \\
> > m &= 1 - \sqrt{0.5} \\
> >   &= 0.293
> > \end{align*}
> > $$
> > The mean is $\int_0^1 2x(1 - x)\,dx = \tfrac{1}{3} \approx 0.333$, and the density is largest at $x = 0$, so the mode is $0$. The ordering $0 < 0.293 < 0.333$ is the right-skew pattern: half of fires destroy less than 29% of the building, even though the average loss is a third of its value.

> [!example]- Median Claim Count {Example}
> The number of claims $N$ on a policy has $P(N = 0, 1, 2, 3) = 0.35, 0.25, 0.20, 0.20$. Find the median and the mean.
>
> > [!answer]-
> > Accumulate until the CDF first reaches 0.5: $F(0) = 0.35$, then $F(1) = 0.60$. So the median is $1$. Check: $P(N \le 1) = 0.60 \ge 0.5$ and $P(N \ge 1) = 0.65 \ge 0.5$.
> > $$
> > \begin{align*}
> > E[N] &= 1(0.25) + 2(0.20) + 3(0.20) \\
> >      &= 1.25
> > \end{align*}
> > $$
> > No value of $N$ has $F = 0.5$ exactly — a discrete median is found where the CDF *crosses* one half, not where it equals it.

> [!example]- Median Payment Under a Deductible {Example}
> Losses are exponential with mean \$5,000, and a policy pays $Y = (X - 1{,}000)_+$. Find the median and the mean of $Y$.
>
> > [!answer]-
> > The median loss is $5{,}000 \ln 2 = 3{,}465.74$. Because $F(1{,}000) = 1 - e^{-0.2} = 0.181 < 0.5$, the non-decreasing map $x \mapsto (x - 1{,}000)_+$ carries the median straight through:
> > $$
> > \begin{align*}
> > m_Y &= 3{,}465.74 - 1{,}000 \\
> >     &= 2{,}465.74
> > \end{align*}
> > $$
> > The mean does not shift that way. For the exponential, $E[(X - d)_+] = \theta e^{-d/\theta}$:
> > $$
> > \begin{align*}
> > E[Y] &= 5{,}000\,e^{-0.2} \\
> >      &= 4{,}093.65
> > \end{align*}
> > $$
> > That is not $5{,}000 - 1{,}000 = 4{,}000$. The median payment is \$2,466 and the mean payment \$4,094: subtracting the deductible works for the median, never for the mean.
