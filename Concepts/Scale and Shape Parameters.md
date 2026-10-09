---
aliases:
  - Shape Parameter
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5e3c7a6b6647523750fb65c6d7d47081d2438e801b661f606efa28440bf03b88
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Scale and Shape Parameters.md
---

**Scale and Shape Parameters** are the two roles a parameter can play in a continuous severity model. A **scale parameter** $\theta$ sets the units: multiplying the loss by a positive constant $c$ multiplies $\theta$ by $c$ and leaves every other parameter unchanged. A **shape parameter**, such as $\alpha$ or $\tau$, sets the form of the distribution, including its skewness, its [[Hazard Rate|hazard rate]] and the weight of its tail, and a change of units leaves it alone.

> $$F_X(x) = F_1\!\left(\frac{x}{\theta}\right)$$

> $$E[X^k] = \theta^k\,E[X_1^k]$$

> $$E[(cX) \wedge u] = c\,E\!\left[X \wedge \frac{u}{c}\right]$$

- **Definitions:** Loss Models calls a family a *scale distribution* if a member multiplied by a positive constant is still in the family, and calls a parameter a *scale parameter* if that multiplication multiplies it by the same constant and changes no other parameter. In the first two blocks, $X_1$ is the member with $\theta = 1$ and the same shape. In the exam tables, $\theta$ is the scale parameter of the exponential, gamma, Weibull and Pareto families and of their transformed and inverse versions. The lognormal is a scale distribution, but $cX$ has $\mu + \ln c$ in place of $\mu$, so $\mu$ is not a scale parameter, and $e^{\mu}$ plays that role instead.
- **What the scale carries:** The mean, the standard deviation, every percentile and the limited expected value at a proportionally scaled limit all move in proportion to $\theta$. Unit-free quantities, such as the [[Coefficient of Variation|coefficient of variation]], the skewness and the probability of exceeding a multiple of $\theta$, depend on the shape alone. This is why uniform [[Inflation|inflation]] or a change of currency is handled by changing $\theta$ and nothing else.
- **What the shape carries:** The Pareto's $\alpha$ decides which moments exist, since $E[X^k]$ is finite only for $k < \alpha$. The gamma's $\alpha$ sets the coefficient of variation $1/\sqrt{\alpha}$ and the skewness $2/\sqrt{\alpha}$. The Weibull's $\tau$ makes the hazard rate decrease when $\tau < 1$, stay constant when $\tau = 1$ and increase when $\tau > 1$. The shape therefore decides the [[Tail Weight|tail weight]], while the scale only stretches the axis.

> [!example]- Inflation Acts on the Scale Parameter {Example}
> Losses are gamma with $\alpha = 2$ and $\theta = 500$. Next year, every loss is 8% larger. Show that next year's losses are gamma with $\theta = 540$, and compare the mean, the coefficient of variation and the probability that a loss exceeds 3,000 in the two years. For $\alpha = 2$, $S(x) = e^{-x/\theta}(1 + x/\theta)$.
>
> > [!answer]-
> > If $Y = 1.08X$, then $F_Y(y) = F_X(y/1.08)$. The gamma CDF is $\Gamma(\alpha;\, x/\theta)$, so its argument becomes $y/(1.08 \times 500) = y/540$. That is the gamma CDF with $\alpha = 2$ and $\theta = 540$, so $\theta$ absorbs the inflation and $\alpha$ is unchanged.
> > $$
> > \begin{align*}
> > \Pr(X > 3{,}000) &= e^{-6}(1 + 6) \\
> > &= 0.017351 \\
> > \Pr(Y > 3{,}000) &= e^{-5.5556}(1 + 5.5556) \\
> > &= 0.025343
> > \end{align*}
> > $$
> > The mean rises from $2(500) = 1{,}000$ to $2(540) = 1{,}080$, by exactly 8%. The coefficient of variation stays at $1/\sqrt{2} = 0.7071$, because it depends on the shape alone. The probability of exceeding the fixed threshold of 3,000 rises by 46%, because the threshold has fallen from 6 to 5.56 in units of $\theta$.

> [!example]- Same Mean, Different Shape {Example}
> Two Weibull severities both have mean 1,000, one with $\tau = 0.5$ and one with $\tau = 2$. Find each scale parameter, coefficient of variation and probability of a loss above 5,000, and describe each hazard rate. The Weibull mean is $\theta\,\Gamma(1 + 1/\tau)$.
>
> > [!answer]-
> > The scale is the mean divided by $\Gamma(1 + 1/\tau)$, and $S(x) = e^{-(x/\theta)^{\tau}}$.
> > $$
> > \begin{align*}
> > \theta_{0.5} &= \frac{1{,}000}{\Gamma(3)} \\
> > &= 500 \\
> > \theta_{2} &= \frac{1{,}000}{\Gamma(1.5)} \\
> > &= 1{,}128.38 \\
> > S_{0.5}(5{,}000) &= e^{-\sqrt{10}} \\
> > &= 0.042329 \\
> > S_{2}(5{,}000) &= e^{-(4.4311)^2} \\
> > &= 2.97 \times 10^{-9}
> > \end{align*}
> > $$
> > The coefficients of variation are $\sqrt{\Gamma(5)/\Gamma(3)^2 - 1} = 2.236$ and $\sqrt{\Gamma(2)/\Gamma(1.5)^2 - 1} = 0.523$. The hazard rate $\tau x^{\tau-1}/\theta^{\tau}$ falls from 0.001 at 500 to 0.0005 at 2,000 when $\tau = 0.5$, and it rises from 0.00079 to 0.00314 when $\tau = 2$. With the same mean, the shape alone makes a loss above 5,000 about fourteen million times as likely.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the role of scale and shape parameters in continuous models. A typical question applies inflation or a currency change to a tabled distribution and asks for a probability, a moment or a limited expected value afterwards, often with a deductible or limit that stays fixed.
> - **ASTAM** asks candidates to describe how changes in the parameters affect the distributions. A question may ask which parameter moves the mean without changing the shape, or which one changes the tail.
> - **Spotting the scale:** In a scale family, $x$ enters the CDF only through $x/\theta$. That test identifies the scale parameter of a distribution the question defines from scratch.

> [!warning]- Exam traps
> - **The lognormal:** Inflation of $r$ adds $\ln(1+r)$ to $\mu$ and leaves $\sigma$ unchanged. Multiplying $\mu$ by $1 + r$ is a common error.
> - **Counting inflation twice:** With a fixed deductible $d$, either inflate $\theta$ to $(1+r)\theta$ or keep $\theta$ and deflate the deductible to $d/(1+r)$, then multiply by $1 + r$. Doing both counts the inflation twice.
> - **Shape parameters do not absorb inflation:** Inflation never changes $\alpha$ or $\tau$. Lowering a Pareto's $\alpha$ to match a higher mean also makes the tail heavier, which uniform inflation does not do.
> - **Unit-free does not mean unchanged:** The probability of exceeding a *fixed* amount changes with $\theta$, even though the probability of exceeding a fixed multiple of $\theta$ does not.
