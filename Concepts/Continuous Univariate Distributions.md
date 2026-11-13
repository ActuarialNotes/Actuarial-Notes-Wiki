---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e617002a35400eef0ff4b4b5e39fe725bf6019986efc9b0f0b6c505c02e99a05
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 p.60 (PDF p.68: point probability 0, f(x) not a probability, f(3/4)=3/2 > 1); Definition 2.2 and Theorem 2.1 (PDF p.69: F = integral of f, F' = f); §4 Beta density on [0,1] (PDF p.176), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma f, M(t) = (1 - theta t)^-alpha, E[X^k] (printed p.4, PDF p.9 page image, read 2026-11-06); A.3.3.1 Exponential f, F, M(t), VaR_p = -theta ln(1-p), TVaR_p = VaR_p + theta, E[X ^ x] = theta(1 - e^(-x/theta)); A.5.1.1 Lognormal E[X^k] = exp(k mu + k^2 sigma^2/2) (printed p.6, PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 4.1 Definitions and Basic Properties: symmetry, a density symmetric about a has f(a+x)=f(a-x) (HTML fetched 2026-11-06), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t), so F(a)=1/2; quantile symmetry (HTML fetched 2026-11-06), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: E(X)=(a+b)/2 on [a,b], location a any real (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: N(mu, sigma^2) on R, mean mu (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.17 The Beta Distribution: E(X)=a/(a+b) on (0,1) (HTML fetched 2026-11-06), sha256:9ef44a035fff82ca4d81ae3db74baa55abdc511dfea0522006c4a62e60909032 — https://www.randomservices.org/random/special/Beta.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuous Univariate Distributions.md
---

![[Media/Figures/Continuous_Univariate_Distributions.svg|340]]

A **Continuous Univariate Distribution** is the probability distribution of a single [[Continuous Random Variable|continuous random variable]] $X$. It is given by a [[Probability Density Function (PDF)|probability density function]] $f(x) \ge 0$ whose total area is 1:

> $$\int_{-\infty}^{\infty} f(x)\,dx = 1$$

The density is 0 outside the values $X$ can take, so every integral runs only over that range.

> [!example]- A repair cost $X$, in thousands, has density $f(x) = cx$ for $0 < x < 4$. What is $c$? {Example}
> - The total area must be 1, and $\int_0^4 cx\,dx = 8c$.
> - $8c = 1$, so $c = \frac{1}{8}$.

## The CDF and the survival function

The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] is the area to the left of $x$, and the **survival function** $S(x) = P(X > x)$ is the area to the right:

> $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$

> $$S(x) = 1 - F(x)$$

- The density is the derivative of the CDF, $f(x) = F'(x)$.

> [!example]- For the repair cost with density $\frac{x}{8}$ on $(0, 4)$, what is the probability that it exceeds 3? {Example}
> - $F(x) = \int_0^x \frac{t}{8}\,dt = \frac{x^2}{16}$.
> - $F(3) = \frac{9}{16} = 0.5625$.
> - $S(3) = 1 - 0.5625 = 0.4375$.

## Symmetric densities

A density symmetric about $m$ satisfies

> $$f(m + x) = f(m - x)$$

So the density on one side of $m$ is the mirror image of the density on the other. Exactly half the probability lies on each side, $P(X \le m) = P(X \ge m) = \tfrac{1}{2}$, so $m$ is the median.

> [!example]- $X$ has a density symmetric about 4, and $P(4 < X \le 5) = 0.3$. What is the 80th percentile of $X$? {Example}
> - Half the probability lies below 4, so $P(X \le 5) = 0.5 + 0.3 = 0.8$.
> - The 80th percentile is 5.

## Named continuous distributions

Each named distribution fits a different kind of quantity:

| Quantity | Distribution | Values | Mean |
| --- | --- | --- | --- |
| Every value in a range equally likely | [[Uniform Continuous Distribution]] $(a, b)$ | $(a, b)$ | $\frac{a + b}{2}$ |
| Memoryless waiting time | [[Exponential Distribution]] $(\theta)$ | $(0, \infty)$ | $\theta$ |
| Waiting time to the $\alpha$th event | [[Gamma]] $(\alpha, \theta)$ | $(0, \infty)$ | $\alpha\theta$ |
| A proportion | [[Beta]] $(\alpha, \beta)$ | $(0, 1)$ | $\frac{\alpha}{\alpha + \beta}$ |
| A sum or average of many variables | [[Normal Distribution]] $(\mu, \sigma^2)$ | all reals | $\mu$ |
| A loss whose logarithm is normal | [[Lognormal Distribution]] $(\mu, \sigma^2)$ | $(0, \infty)$ | $e^{\mu + \sigma^2/2}$ |

> [!example]- Which distribution fits the share of claims that are fraudulent, the time until the next claim when claims arrive at a constant rate, and the average of 100 independent claims? {Example}
> - A share lies between 0 and 1, so it is beta.
> - A waiting time at a constant rate is memoryless, so it is exponential.
> - An average of many independent claims is approximately normal.

> [!trap] Memorylessness used where it doesn't hold
> For the repair cost, $P(X > 3 \mid X > 2) = \frac{S(3)}{S(2)} = \frac{7}{12}$. Only the exponential would give $S(1) = 0.9375$. For any other density, divide the two survival probabilities.
