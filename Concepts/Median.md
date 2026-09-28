---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:279dfe92adcf264b1029fe49da2ff40059f1aeffef4a52617ca75ea9aa388238
  sources:
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q61 (PDF p.21), Q137 (PDF p.40), Q181 (PDF p.54), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch. 5 Exercise 22 (median m with F(m) = 1/2), Theorem 6.2, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Exponential A.3.3.1 (F(x), VaR_p = -theta ln(1-p)) and Lognormal A.5.1.1 (F(x) = Phi(z)) (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Median.md
---

The **Median** $m$ of a [[Random Variable]] $X$ is its 50th [[Percentile|percentile]]: the smallest value $m$ with $F(m) \ge 0.5$. For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in half.

> $$F(m) = 0.5$$

> $$m = F^{-1}(0.5)$$

- For a [[Continuous Random Variable|continuous]] $X$ with a strictly increasing [[Cumulative Distribution Function (CDF)|CDF]] the median is unique: solve $F(m) = 0.5$, or equivalently $\int_{-\infty}^{m} f(x)\,dx = 0.5$.
- For a [[Discrete Random Variable|discrete]] $X$ the CDF usually jumps past 0.5 rather than landing on it, so $F(m) = 0.5$ has no solution; the median is then the smallest $m$ with $F(m) \ge 0.5$ — the same rule as for every other [[Percentile]].
- **Median versus mean.** For a [[Normal Distribution|normal]] distribution the median equals the [[Expected Value|mean]]; for a skewed one they differ, the mean pulled toward the heavier tail. Claim severities are right-skewed — a few large claims pull the mean up but leave the median alone — so typically [[Mode|mode]] < median < mean. For the [[Exponential Distribution|exponential]], $m = \theta \ln 2 \approx 0.693\theta$ against a mean of $\theta$; for the [[Lognormal Distribution|lognormal]], $m = e^{\mu}$ against $e^{\mu + \sigma^2/2}$.
- **Deductibles pass straight through.** The payment $(X - d)_+$ is a continuous, non-decreasing function of the loss, so its median is the loss median less the deductible, floored at zero: $\max(m - d,\ 0)$. The same holds for every percentile. The mean has no such property: $E[g(X)] \ne g(E[X])$ in general.
- The **sample median** is the middle [[Order Statistics|order statistic]], or the average of the two middle values when $n$ is even.

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
> > Accumulate until the CDF first reaches 0.5: $F(0) = 0.35$, then $F(1) = 0.60$. So the median is $1$.
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
> > That is not $5{,}000 - 1{,}000 = 4{,}000$. The median payment is \$2,466 and the mean payment \$4,094: subtracting the deductible carries the median through, but not the mean.
