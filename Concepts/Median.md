---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3cbbca90d40661b0d65a09e55bb7168f62a433357df610cfa400ed000ab5ec6
  sources:
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q61 (PDF p.21), Q137 (PDF p.40), Q181 (PDF p.54), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch. 5 Exercise 22 (median m with F(m) = 1/2), Theorem 6.2, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Exponential A.3.3.1 (F(x), VaR_p = -theta ln(1-p)) and Lognormal A.5.1.1 (F(x) = Phi(z)) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Distribution and Quantile Functions, §2.7 Distribution and Quantile Functions: F(x^-) = P(X < x); f(x) = F(x) - F(x^-) (discrete), g(x) = F(x) - F(x^-) on a mixed distribution's discrete part; quantile of order p: P(X < x) <= p <= P(X <= x); F^{-1}(p) the smallest quantile, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Median.md
---

The **Median** $m$ of a [[Random Variable]] $X$ is its 50th [[Percentile|percentile]]: the smallest value $m$ with $F(m) \ge 0.5$. For a continuous distribution it is the point where $F(m) = 0.5$, which splits the probability in half.

> $$F(m) = 0.5$$

> $$m = F^{-1}(0.5)$$

- $F$ is the [[Cumulative Distribution Function (CDF)|CDF]] of $X$. For a [[Continuous Random Variable|continuous]] $X$ with a strictly increasing CDF, the median is unique.
- For a [[Discrete Random Variable|discrete]] $X$, the median is the smallest $m$ with $F(m) \ge 0.5$, the same rule as for every other percentile.
- Compared with the [[Expected Value|mean]]: the median depends only on the order of the values, while the mean depends on their size.

> [!idea] The idea
> The median asks only which side of a value half the probability lies on. A huge claim counts as one claim above the median, however huge it is, so a heavy right tail pulls the mean up and leaves the median alone. The same fact explains why a deductible or a limit carries the median straight through.

## Which loss splits the claims in half?

Losses on a policy are [[Exponential Distribution|exponential]] with mean 5,000, so $F(x) = 1 - e^{-x/5000}$. Setting the CDF to one half gives the median.

> $$
> \begin{align*}
> 1 - e^{-m/5000} &= 0.5 \\
> m &= 5000 \ln 2 \\
> &\approx 3465.74
> \end{align*}
> $$

Half of all losses are below about 3,466. The general rule is to solve $F(m) = 0.5$, or equally $\int_{-\infty}^{m} f(x)\,dx = 0.5$.

> $$\text{Exponential: } m = \theta \ln 2 \approx 0.693\,\theta$$

## Why the median sits below the mean

The mean loss is 5,000, but the median is only 3,466. A few very large losses pull the mean up. They don't move the median, because each of them is just one loss above it.

Claim sizes are right-skewed, so [[Mode|mode]] < median < mean is the typical order.

- A [[Normal Distribution|normal]] distribution is symmetric, so its median equals its mean.
- A [[Lognormal Distribution|lognormal]] has median $e^{\mu}$ and mean $e^{\mu + \sigma^2/2}$, so its median is always below its mean.

## The median of a claim count

The number of claims $N$ on a policy has $P(N = 0, 1, 2, 3) = 0.35, 0.25, 0.20, 0.20$. Accumulate the probabilities until the CDF first reaches 0.5.

| $n$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $F(n)$ | 0.35 | 0.60 | 0.80 | 1.00 |

The CDF jumps from 0.35 to 0.60 at $n = 1$, so the median is 1. No value has $F = 0.5$ exactly. The mean is $0.25 + 0.40 + 0.60 = 1.25$.

## The median payment under a deductible

Return to the exponential loss with mean 5,000, and add a deductible of 1,000. The payment is $Y = (X - 1000)_+$.

The payment rises with the loss and never falls. So the loss that sits at the median gives the payment that sits at the median.

> $$\text{median of } (X - d)_+ = \max(m - d,\ 0)$$

- The median payment is $3465.74 - 1000 = 2465.74$.
- The mean payment is $E[Y] = 5000\,e^{-0.2} \approx 4093.65$, not $5000 - 1000 = 4000$.
- With a deductible of 4,000, $F(4000) = 1 - e^{-0.8} \approx 0.551$. More than half of losses pay nothing, so the median payment is 0.

> [!trap] Subtracting the deductible from the mean
> The median passes through the deductible, and the mean doesn't. $E[(X - d)_+]$ needs the [[Deductible|deductible]] formulas, not $E[X] - d$.

## The median payment under a limit

A policy limit $u$ caps the payment at $\min(X, u)$. This is also a non-decreasing function of the loss.

> $$\text{median of } \min(X, u) = \min(m,\ u)$$

- With a limit of 10,000, the median loss 3,466 is below it, so the median payment is 3,466.
- With a limit of 3,000, $P(X < 3000) \approx 0.451$. Every larger loss pays 3,000, so the median payment is 3,000, the limit itself.

## The median of a sample

Five claims were 1,200, 300, 4,500, 800 and 2,600. The sample median is the middle [[Order Statistics|order statistic]] once the values are sorted.

- Sorted, the claims are 300, 800, 1,200, 2,600 and 4,500. The median is 1,200 and the mean is 1,880.
- A sixth claim of 9,000 makes the count even. The median is the average of the two middle values, $(1200 + 2600)/2 = 1900$.
- The same claim moves the mean from 1,880 to about 3,066.67. The median moved by much less.

## Try it

> [!example]- Median fire damage ratio {Example}
> The fraction $X$ of a building's value destroyed in a fire has density $f(x) = 2(1 - x)$ for $0 < x < 1$. Find the median, and compare it with the mean and the mode.
>
> > [!answer]-
> > **Plan:** integrate for the CDF, then set it to one half.
> > $$
> > \begin{align*}
> > F(x) &= \int_0^x 2(1 - t)\,dt \\
> >      &= 1 - (1 - x)^2 \\
> > (1 - m)^2 &= 0.5 \\
> > m &= 1 - \sqrt{0.5} \\
> >   &\approx 0.293
> > \end{align*}
> > $$
> > The mean is $\int_0^1 2x(1 - x)\,dx = \tfrac{1}{3} \approx 0.333$. The density is largest at $x = 0$, so the mode is 0.
> >
> > The order $0 < 0.293 < 0.333$ is the right-skew pattern. Half of fires destroy less than 29% of the building, even though the average loss is a third of its value.

> [!example]- A median benefit at the limit {Example}
> Medical costs are exponential with mean 400. The policy pays the cost up to a maximum benefit of 250. Find the median benefit.
>
> > [!answer]-
> > **Plan:** find the median cost, then cap it at the limit.
> >
> > The median cost is $400 \ln 2 \approx 277.26$. That is above 250, so the median benefit is $\min(277.26,\ 250) = 250$.
> >
> > Why is the answer the limit? $P(X < 250) = 1 - e^{-0.625} \approx 0.465$, which is below one half. Every cost above 250 pays exactly 250, so the benefit CDF jumps past 0.5 at 250.

> [!example]- A median that fixes a parameter {Example}
> Claim sizes are exponential, and the median claim is 2,000. Find the probability that a claim exceeds 5,000.
>
> > [!answer]-
> > **Plan:** use the median to find $\theta$, then use $\theta$ for the tail.
> > $$
> > \begin{align*}
> > \theta &= \frac{2000}{\ln 2} \approx 2885.39 \\
> > P(X > 5000) &= e^{-5000/\theta} \\
> > &= 2^{-2.5} \\
> > &\approx 0.1768
> > \end{align*}
> > $$
> > Why not $\theta = 2000$? The exponential's mean is $\theta$, and its median is only $0.693\,\theta$. Setting $\theta$ to the median gives $e^{-2.5} \approx 0.082$, less than half the right answer.

> [!warning]- Exam traps
> - **Median for mean.** For a right-skewed loss the median is below the mean. An exponential with mean $\theta$ has median $\theta \ln 2$.
> - **Looking for $F(m) = 0.5$ in a discrete variable.** The median is where the CDF first reaches or passes 0.5.
> - **A deductible that takes more than half.** If $F(d) \ge 0.5$, the median payment is 0.
> - **An even sample.** The sample median of an even number of values is the average of the two middle values.
