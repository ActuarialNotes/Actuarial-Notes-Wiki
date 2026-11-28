---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:e480fc8489b5c65e6985bdcf98aabfb78d9c1ca43090d73778ada6a4519e451a
  sources:
    - "https://www.randomservices.org/random/special/UniformContinuous.html, §5.21 The Uniform Distribution on an Interval: E(X)=(a+b)/2, var=(b-a)^2/12, Related Distributions (location-scale), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "https://www.randomservices.org/random/special/Uniform.html, §5.20 General Uniform Distributions: conditional distribution given X in R; product of independent uniforms, sha256:df0f3d671bbd4ee0a72d98431cfd36e142ce833eb5c78d96dcfcb9c6650d7575 — https://www.randomservices.org/random/special/Uniform.html"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf, Q473 (PDF p.131-132): uniform loss, deductible d, claim uniform on [0,1-d] with probability 1-d, sha256:147ff95346ea891a1fc9e889f412701a3a41561dcd6f330d285422249ae25c84 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §2.2 Example 2.17 p.68 (PDF p.76): only continuous density with the memoryless property is exponential; §5.2 uniform density 1/(b-a) (PDF p.213), memoryless (PDF p.214), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uniform Continuous Distribution.md
---

![[Media/Figures/Uniform_Continuous_Distribution.svg|340]]

A **Uniform Continuous Distribution** is a continuous distribution whose density is constant on an interval $(a, b)$. Its probability density function is

> $$f(x) = \frac{1}{b - a}$$

- $a < x < b$, and $f(x) = 0$ outside the interval.

> [!idea] The idea
> Probability under a flat density is proportional to length.

The probability of a sub-interval is its length divided by $b - a$. The cumulative distribution function is $F(x) = (x - a)/(b - a)$ for $a < x < b$.

> [!example]- A loss is uniform on $(0, 500)$. What is the probability that it falls between 100 and 250? {Example}
> - The interval is 150 long, out of a total length of 500.
> - $P(100 < X < 250) = \frac{150}{500} = 0.3$.

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = \frac{a + b}{2}$$

> $$\text{Var}(X) = \frac{(b - a)^2}{12}$$

The mean is the midpoint, which is also the [[Median|median]]. The variance depends only on the length $b - a$, so the standard deviation is $(b - a)/\sqrt{12}$.

A linear function $cX + k$, with $c > 0$, is uniform on $(ca + k, cb + k)$.

> [!example]- A settlement time, in days, is uniform with mean 60 and variance 300. What is the probability that it exceeds 75 days? {Example}
> - $(b - a)^2 = 12 \times 300 = 3{,}600$, so the length is $b - a = 60$.
> - The interval is centred on 60, so it is $(30, 90)$.
> - $P(X > 75) = \frac{90 - 75}{60} = 0.25$.

## A deductible on a uniform loss

Given $X > d$, the loss is uniform on $(d, b)$. With a [[Deductible|deductible]] $d$ between $a$ and $b$, the expected payment per loss is

> $$E[(X - d)_+] = \frac{(b - d)^2}{2(b - a)}$$

> [!example]- Losses are uniform on $(0, 1000)$, with a deductible of 300. What is the expected payment per loss? {Example}
> - A payment happens with probability $\frac{700}{1000} = 0.7$.
> - Given a payment, the excess is uniform on $(0, 700)$, with mean 350.
> - The expected payment per loss is $0.7 \times 350 = 245$.

> [!trap] Using memorylessness on a uniform
> $P(X > s + t \mid X > s) = P(X > t)$ holds only for the [[Exponential Distribution|exponential]]. For a uniform on $(0, 10)$, $P(X > 8 \mid X > 5) = \frac{2}{5}$, but $P(X > 3) = \frac{7}{10}$.

## Two independent uniform variables

If $X$ and $Y$ are independent and each uniform on $(a, b)$, the pair is uniform on the square with side $b - a$. The probability of a region $R$ of the square is

> $$P\big((X, Y) \in R\big) = \frac{\text{area of } R}{(b - a)^2}$$

> [!example]- Two claims settle at independent times, each uniform on $(0, 1)$ years. What is the probability that the second settles more than half a year after the first? {Example}
> - Write $X$ and $Y$ for the two times. The region $Y > X + 0.5$ is a triangle with legs 0.5.
> - Its area is $\frac{0.5^2}{2} = 0.125$, and the square has area 1.
> - The probability is 0.125.
