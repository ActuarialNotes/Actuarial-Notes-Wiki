---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:92e389150e0ff299baabeb6fe323db3dcd3be986ba232f63faf41b5b0666af80
  sources:
    - "SOA Exam P Sample Solutions (Aug 2026 rev.), Q137 (PDF p.40), Q181 (PDF p.54), Q61 (PDF p.21), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 rev.), Q137 (questions PDF p.59), Q181 (questions PDF pp.77-78), sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), VaR_p entries: Pareto A.2.3.1 (PDF p.8), Exponential A.3.3.1 (PDF p.11); Poisson B.2.1.1 pmf, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Distribution and Quantile Functions, §2.7 Distribution and Quantile Functions: F(x^-) = P(X < x); f(x) = F(x) - F(x^-) (discrete), g(x) = F(x) - F(x^-) on a mixed distribution's discrete part; quantile of order p: P(X < x) <= p <= P(X <= x); F^{-1}(p) the smallest quantile, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Location-Scale Families, Ch.4 Location-Scale Families: X = a + bZ, b in (0, inf); if z is a quantile of order p for Z then a + bz is a quantile of order p for X, sha256:d9bc65924c926bd13e91d33c7f63a368fff73aa005bddc1aeb595de5d0fbc738 — https://www.randomservices.org/random/special/LocationScale.html"
    - "Conditional Probability | Formulas | Calculation | Chain Rule | Prior Probability, §1.4.0 Conditional Probability: P(A|B) = P(A ∩ B)/P(B), P(B) > 0, sha256:c8061ae0b186a2655a22916fe53d09d9551ad8f170e533806480f8c86ced4c07 — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
    - "Siegrist (randomservices.org), 3.7 Transformations of Random Variables: r strictly decreasing gives G(y) = 1 - F[r^{-1}(y)], HTML fetched 2026-11-04, sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist (randomservices.org), The Lognormal Distribution: quantile function F^{-1}(p) = exp[mu + sigma Phi^{-1}(p)], HTML fetched 2026-11-04, sha256:cec8c0b516a0fcc03bb953f82c186e3faa8ec2eee2479caf48df2850bfe2c51c — https://www.randomservices.org/random/special/LogNormal.html"
    - "Siegrist (randomservices.org), 2.7 Distribution and Quantile Functions: quantile of order p: F(x^-) <= p <= F(x), HTML fetched 2026-11-04, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.2 Exponential p.205-207 (PDF pp.213-215: F = 1 - e^{-lambda x}, lambda the reciprocal of the average); Example 7.5 p.294 (PDF p.302: sum of independent normals is normal with mean mu1+mu2, variance sigma1^2+sigma2^2), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 learning outcome c) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Percentile.md
---

The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the smallest value at which the [[Cumulative Distribution Function (CDF)|CDF]] reaches $p$, so at least a proportion $p$ of the distribution lies at or below it. When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by inverting the CDF.

> $$x_p = \min\{x : F(x) \geq p\}$$

> $$F(x_p) = p \quad (F \text{ continuous, strictly increasing})$$

> $$x_p = F^{-1}(p)$$

- Here $p \in (0, 1)$. The $100p$-th percentile is the quantile of order $p$.
- The 50th percentile ($p = 0.5$) is the [[Median|median]].
- Percentiles describe the tail of a distribution. Value at Risk (VaR) is the loss level a portfolio will not exceed with probability $p$, which is a percentile.

> [!idea] The idea
> The CDF gives the probability that a loss is below a given amount. A percentile reverses the question: it gives the amount below which a given proportion of losses fall. Only the order of the losses matters, so doubling every loss doubles every percentile.

![[Media/Figures/Percentile.svg|340]]

## Reversing the CDF

Losses on a block of policies are uniform on $(0, 1000)$, so $F(x) = x/1000$. Setting $F(x_p) = p$ gives $x_p = 1000p$.

| $p$ | 0.25 | 0.50 | 0.75 | 0.90 |
|---|---|---|---|---|
| $x_p$ | 250 | 500 | 750 | 900 |

- The interquartile range is $x_{0.75} - x_{0.25} = 500$.
- The reverse question reads the CDF forward. A loss of 600 has $F(600) = 0.6$, so it is the 60th percentile.

## When the CDF jumps

The same block's monthly claim count is [[Poisson Distribution|Poisson]] with mean 3. Its CDF jumps at each whole number.

| $k$ | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| $F(k)$ | 0.4232 | 0.6472 | 0.8153 | 0.9161 |

No $k$ solves $F(k) = 0.75$. The CDF first reaches 0.75 at $k = 4$, so the 75th percentile is 4. This is why the definition takes the smallest $x$ with $F(x) \ge p$.

A [[Payment Random Variable|payment]] can jump too. With a deductible of 200, the payment $Y = (X - 200)_+$ is 0 for every loss up to 200, so $F_Y(0) = 0.2$. Every percentile with $p \le 0.2$ is 0.

## Transforming a loss

Above the jump, each payment is its loss less 200. The payment rises with the loss, so the losses and payments keep their order. The 75th percentile of the payment is $750 - 200 = 550$.

> $$y_p = g(x_p), \quad g \text{ continuous and increasing}$$

> $$y_p = a + b\,x_p, \quad b > 0$$

- If every loss rises 10%, the losses become uniform on $(0, 1100)$ and every percentile rises 10%. The 75th percentile becomes 825.
- A lognormal percentile is $e$ raised to the matching normal percentile, $e^{\mu + z_p \sigma}$.
- The mean passes through only a linear transformation. Percentiles pass through any increasing one.

> [!trap] A decreasing transformation flips $p$
> If $g$ is decreasing, then $y_p = g(x_{1-p})$. The present value of a death benefit falls as the time of death rises. So the 95th percentile of the present value comes from the 5th percentile of the lifetime, not the 95th.

## Percentiles of the losses above a deductible

The insurer's claims file holds only the losses above 200. What is the 75th percentile of those losses? This is a percentile of $X$ given $X > 200$, not of $X$ itself.

> $$P(X \leq x \mid X > d) = \frac{F(x) - F(d)}{1 - F(d)}$$

Setting this equal to $p$ gives the percentile $k$.

> $$F(k) = 1 - (1 - p)\,[1 - F(d)]$$

For the uniform losses, $k/1000 = 1 - 0.25 \times 0.8 = 0.8$, so $k = 800$.

- A check through the excess: given $X > 200$, the excess $X - 200$ is uniform on $(0, 800)$. Its 75th percentile is 600, and adding the deductible back gives 800.
- The 75th percentile of all losses is only 750. Conditioning removes the losses below $d$, so $F(k) = p + (1 - p)\,F(d) \ge p$ and the percentiles shift upward.

## Percentiles of a normal and of a total

A [[Normal Distribution|normal]] percentile comes from the standard normal one, $z_p$.

> $$x_p = \mu + z_p\,\sigma$$

Suppose two independent losses are each normal with mean 100 and standard deviation 15. Each has 95th percentile $100 + 1.645 \times 15 \approx 124.68$.

- Their total has mean 200 and standard deviation $15\sqrt{2}$. Its 95th percentile is about 234.90.
- Adding the two individual percentiles gives about 249.35, which is too high. The means add, but the standard deviations do not.

The same method gives an approximate percentile for a sum of many independent amounts, by the [[Central Limit Theorem]].

## On other exams

- **MAS-I**: percentile matching estimates parameters by setting fitted percentiles equal to smoothed empirical ones. Percentiles of [[Order Statistics|order statistics]] and of fitted loss distributions also appear.
- **FAM**: a percentile of a present value random variable, or of a count of survivors by the normal approximation.
- **MAS-II**: posterior intervals read from percentiles of a posterior distribution.
- **Exam 7 and Exam 9**: a confidence interval for a reserve from an approximating distribution (Mack's lognormal), and Value at Risk as a percentile of the loss distribution.

## Try it

> [!example]- 90th percentile of an exponential claim {Example}
> Claim sizes follow an [[Exponential Distribution]] with CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. Find the 90th percentile.
>
> > [!answer]-
> > **Plan:** set $F(x_{0.90}) = 0.90$ and solve.
> > $$
> > \begin{align*}
> > 1 - e^{-x_{0.90}/10} &= 0.90 \\
> > e^{-x_{0.90}/10} &= 0.10 \\
> > x_{0.90} &= 10 \ln 10 \\
> > &\approx 23.03
> > \end{align*}
> > $$
> > About 90% of claims fall below 23.03.

> [!example]- 95th percentile of a normal loss {Example}
> Annual losses follow a normal distribution with $\mu = 100$ and $\sigma^2 = 225$. Find the 95th percentile.
>
> > [!answer]-
> > **Plan:** take the standard normal percentile and transform back with $\sigma = 15$.
> > $$
> > \begin{align*}
> > x_{0.95} &= \mu + z_{0.95}\,\sigma \\
> > &= 100 + 1.645(15) \\
> > &\approx 124.68
> > \end{align*}
> > $$
> > The probability that the annual loss is below 124.68 is 0.95.

> [!example]- Percentiles of a payment under a deductible {Example}
> Losses $X$ are exponential with mean 5,000, and a policy pays $Y = (X - 1000)_+$. Find the 10th and 90th percentiles of $Y$.
>
> > [!answer]-
> > **Plan:** find the size of the jump at 0 first, then invert the CDF above it.
> >
> > $Y = 0$ whenever $X \le 1000$, so the CDF of $Y$ jumps at zero.
> > $$F_Y(0) = 1 - e^{-0.2} \approx 0.1813$$
> > Since $0.1813 \ge 0.10$, the 10th percentile is 0, even though $F_Y(y) = 0.10$ has no solution.
> >
> > Above the jump, the 90th percentile is the 90th percentile of the loss less 1,000.
> > $$
> > \begin{align*}
> > x_{0.90} &= 5000 \ln 10 \\
> > &\approx 11512.93 \\
> > y_{0.90} &= 11512.93 - 1000 \\
> > &= 10512.93
> > \end{align*}
> > $$
> > Every percentile with $p \le 0.1813$ is 0. Above that, the continuous rule applies.

> [!warning]- Exam traps
> - **A decreasing transformation flips $p$.** Use $x_{1-p}$ of the lifetime for the $p$-th percentile of a present value.
> - **The mean is not the median.** An exponential with mean $\theta$ has median $\theta \ln 2 \approx 0.693\,\theta$. Setting the median equal to $\theta$ gives the wrong parameter.
> - **Percentiles don't add.** The 95th percentile of a total of independent normal losses is $\mu_{\text{total}} + 1.645\sqrt{\sum \sigma_i^2}$, below the sum of the individual 95th percentiles.
> - **All losses or the losses above $d$.** A percentile of the losses that exceed a deductible uses the conditional CDF, and it is larger than the same percentile of all losses.
