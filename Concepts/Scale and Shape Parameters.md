---
aliases:
  - Shape Parameter
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d4d704465900ad34cbb514ad856e699751dfdc4652e511b8a2cf324e8dbc38a9
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3, 3.2.1-3.2.3 gamma/Pareto/Weibull shape and scale; Weibull hazard decreasing/constant/increasing in the shape; 3.3.2 Multiplication by a Constant: scale distribution and scale parameter definition, lognormal mu + log c with e^mu the scale, inflation and currency, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Tables for Exam FAM (Loss Models Appendices A and B excerpts), Appendix A: x enters each CDF through x/theta; gamma E[X^k]; Pareto E[X^k] k<alpha; Weibull; lognormal; A.6 \"the scale parameter theta\", pp.5-12, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam ASTAM Syllabus, October 2026, Topic 1 outcome a (how changes in the parameters affect the distributions), p.2, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "SOA Exam FAM Syllabus, February 2027, Topic 2 outcome b (role of scale and shape parameters), p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Scale and Shape Parameters.md
---

**Scale and Shape Parameters** are the two roles a parameter can play in a continuous severity model. A **scale parameter** $\theta$ sets the units: multiplying the loss by a positive constant $c$ multiplies $\theta$ by $c$ and leaves every other parameter unchanged. A **shape parameter**, such as $\alpha$ or $\tau$, sets the form of the distribution, including its skewness, its [[Hazard Rate|hazard rate]] and the weight of its tail, and a change of units leaves it alone.

In a family with a scale parameter, $x$ enters the cdf only through $x/\theta$, so the cdf of a loss $X$ is

> $$F_X(x) = F_1\!\left(\frac{x}{\theta}\right)$$

- $F_1$ is the cdf of $X_1$, the member of the family with $\theta = 1$ and the same shape.

Loss Models calls a family a scale distribution if a member multiplied by a positive constant is still in the family. In the exam tables, $\theta$ is the scale parameter of the exponential, gamma, Weibull and Pareto families and of their transformed and inverse versions. The lognormal is a scale distribution, but $cX$ has $\mu + \ln c$ in place of $\mu$, so $\mu$ is not a scale parameter and $e^{\mu}$ plays that role instead. This is why uniform [[Inflation|inflation]] or a change of currency is handled by changing $\theta$ and nothing else.

> [!example]- What are next year's mean, coefficient of variation and probability of a loss above 3,000? {Example}
> Losses are gamma with $\alpha = 2$ and $\theta = 500$. Next year, every loss is 8% larger. For $\alpha = 2$, $S(x) = e^{-x/\theta}(1 + x/\theta)$.
>
> > [!answer]-
> > - If $Y = 1.08X$, then $F_Y(y) = F_X(y/1.08)$. The gamma cdf's argument $x/\theta$ becomes $y/(1.08 \times 500) = y/540$.
> > - Next year's losses are gamma with $\alpha = 2$ and $\theta = 540$.
> > - The mean rises from $2(500) = 1{,}000$ to $2(540) = 1{,}080$, by exactly 8%.
> > - The coefficient of variation stays at $1/\sqrt{2} = 0.7071$, because it depends on the shape alone.
> > - $\Pr(X > 3{,}000) = e^{-6}(1 + 6) = 0.017351$ and $\Pr(Y > 3{,}000) = e^{-5.5556}(1 + 5.5556) = 0.025343$.
> > - The probability of exceeding the fixed amount of 3,000 rises by 46%, because 3,000 has fallen from 6 to 5.56 in units of $\theta$.

## What the scale parameter carries

The moments of $X$ scale with $\theta$:

> $$E[X^k] = \theta^k\,E[X_1^k]$$

The mean, the standard deviation, every percentile and the limited expected value at a proportionally scaled limit all move in proportion to $\theta$. Unit-free quantities, such as the [[Coefficient of Variation|coefficient of variation]], the skewness and the probability of exceeding a multiple of $\theta$, depend on the shape alone.

A limit or deductible that stays fixed while losses are multiplied by $c$ is handled by the limited expected value

> $$E[(cX) \wedge u] = c\,E\!\left[X \wedge \frac{u}{c}\right]$$

- $u$ is the fixed limit or deductible.

A fixed deductible does not inflate with the losses, so the expected payment above it rises by more than the inflation.

> [!example]- Losses are exponential with $\theta = 1{,}000$, they rise 10% next year, and the deductible stays at 500. What is next year's expected payment per loss? {Example}
> - Next year's losses are exponential with $\theta = 1{,}100$, so $E[Y] = 1{,}100$.
> - $E[Y \wedge 500] = 1{,}100\,(1 - e^{-500/1{,}100}) = 401.79$.
> - The expected payment per loss is $1{,}100 - 401.79 = 698.21$.
> - This year it is $1{,}000 - 1{,}000(1 - e^{-0.5}) = 606.53$, so the payment rises 15.1% on 10% inflation.

## What the shape parameter carries

The shape decides the [[Tail Weight|tail weight]], while the scale only stretches the axis. The Pareto's $\alpha$ decides which moments exist, since $E[X^k]$ is finite only for $k < \alpha$. The gamma's $\alpha$ sets the coefficient of variation $1/\sqrt{\alpha}$ and the skewness $2/\sqrt{\alpha}$. The Weibull's $\tau$ makes the hazard rate decrease when $\tau < 1$, stay constant when $\tau = 1$ and increase when $\tau > 1$.

Inflation never changes $\alpha$ or $\tau$. Lowering a Pareto's $\alpha$ to match a higher mean also makes the tail heavier, which uniform inflation does not do.

> [!example]- How do these two Weibull severities differ? {Example}
> Two Weibull severities both have mean 1,000, one with $\tau = 0.5$ and one with $\tau = 2$. The Weibull mean is $\theta\,\Gamma(1 + 1/\tau)$ and $S(x) = e^{-(x/\theta)^{\tau}}$.
>
> > [!answer]-
> > - The scale is the mean divided by $\Gamma(1 + 1/\tau)$, so $\theta_{0.5} = 1{,}000/\Gamma(3) = 500$ and $\theta_{2} = 1{,}000/\Gamma(1.5) = 1{,}128.38$.
> > - The coefficients of variation are $\sqrt{\Gamma(5)/\Gamma(3)^2 - 1} = 2.236$ and $\sqrt{\Gamma(2)/\Gamma(1.5)^2 - 1} = 0.523$.
> > - The hazard rate $\tau x^{\tau-1}/\theta^{\tau}$ falls from 0.001 at 500 to 0.0005 at 2,000 when $\tau = 0.5$, and rises from 0.00079 to 0.00314 when $\tau = 2$.
> > - $S_{0.5}(5{,}000) = e^{-\sqrt{10}} = 0.042329$ and $S_{2}(5{,}000) = e^{-(4.4311)^2} = 2.97 \times 10^{-9}$.
> > - With the same mean, the shape alone makes a loss above 5,000 about fourteen million times as likely.

> [!trap] Counting inflation twice
> With a fixed deductible $d$, either inflate $\theta$ to $(1+r)\theta$, or keep $\theta$, deflate the deductible to $d/(1+r)$ and multiply the result by $1 + r$. Doing both counts the inflation twice.
