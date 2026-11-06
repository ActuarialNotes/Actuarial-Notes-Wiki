---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:cf31740115a3e7823bc449dd6ad6f05ada9a35c1da02bcf217abdceeee2114a0
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), sec. 10.3 moments and moment generating function (mu_n = E(X^n), g(t) provided this series converges, mu_n = g^(n)(0), series will not converge for all t), Theorems 6.2 and 6.6, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Pareto A.2.3.1 (PDF p.8), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal A.5.1.1 (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.11 Measures of Skewness and Kurtosis (fetched 2026-09-27), sha256:e47d203aad5f3b584e818850bb3e51a89b29ed1d7ca9981f7dbffe3c5f94f165 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm; Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994 pp.101-182, lognormal approximation and eq. (10), printed pp.117-118 (PDF pp.18-19), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf; SOA Exam P normal distribution table (rev. 4/29/21), Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "Joyce, Moments and the moment generating function, Math 217 Probability and Statistics, Clark University, Fall 2014: 'A distribution that's symmetric about its mean has 0 skewness. (In fact all the odd central moments are 0 for a symmetric distribution.)', sha256:94f50359ff49bc2d3e2fdca2efd8b8f54013c707fb79aeeb966dc8611878332b — https://mathcs.clarku.edu/~djoyce/ma217/moment.pdf"
    - "Lancaster University MATH230 notes, Appendix C 3.3 Odd central moments of symmetric distributions: for odd r >= 3, finite r-th moment and density symmetric about the mean give r-th central moment zero — https://lancaster.ac.uk/~prendivs/accessible/math230/math230_notes.tex/A3.S3.html"
    - "Siegrist, 4.4 Skewness and Kurtosis: symmetric about a gives E(X) = a and skew(X) = 0; 'The converse is not true—a non-symmetric distribution can have skewness 0' — https://www.randomservices.org/random/expect/Skew.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moment.md
---

The $n$-th **Moment** of a [[Random Variable]] $X$ is the [[Expected Value]] of its $n$-th power, $E[X^n]$, called a *raw* moment. The $n$-th *central* moment $E[(X - \mu)^n]$ measures the same thing about the mean $\mu$.

> $$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$

> $$\mu_n = E\big[(X - \mu)^n\big]$$

- The mean is $\mu = \mu_1'$. For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.
- The first four moments summarise a distribution's location, spread, asymmetry and tail weight.
- The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.

> [!idea] The idea
> Raising $X$ to a higher power before averaging makes the large values count for more. The first moment says where the distribution sits. The second and higher moments, taken about the mean, say how far out it reaches and on which side, so each one adds a little more detail about the tail.

## Raw moments of one severity

Claim sizes $X$ are [[Exponential Distribution|exponential]] with mean $\theta = 1{,}000$. The exponential has a closed form for every raw moment.

> $$E[X^n] = n!\,\theta^n$$

| $n$ | $E[X^n]$ |
|---|---|
| 1 | $1{,}000$ |
| 2 | $2 \times 10^6$ |
| 3 | $6 \times 10^9$ |
| 4 | $2.4 \times 10^{13}$ |

The raw moments grow fast. They are dominated by the large claims, which is why the higher ones are hard to estimate from data.

## Central moments: about the mean

A raw moment mixes location with spread. Centring at the mean separates them. Each central moment expands into raw moments.

> $$\mu_2 = E[X^2] - \mu^2$$

> $$\mu_3 = E[X^3] - 3\mu E[X^2] + 2\mu^3$$

For the exponential severity:

> $$
> \begin{align*}
> \mu_2 &= 2 \times 10^6 - 1{,}000^2 \\
>       &= 10^6 \\
> \mu_3 &= 6 \times 10^9 - 3(1{,}000)(2 \times 10^6) + 2(1{,}000)^3 \\
>       &= 2 \times 10^9
> \end{align*}
> $$

## Shape: skewness and kurtosis

A central moment still carries units: $\mu_3$ is in dollars cubed. Dividing by the matching power of the standard deviation $\sigma$ gives a pure number that describes shape.

> $$\gamma_1 = \frac{\mu_3}{\sigma^3}$$

- The **skewness** of the exponential is $2 \times 10^9 / 1{,}000^3 = 2$. A positive skewness means a long right tail.
- The **kurtosis** is $\mu_4/\sigma^4$. It is 3 for a normal. For the exponential it is 9, a heavier tail than the normal's.
- Both are free of $\theta$. Every exponential severity has the same shape, whatever its scale.

**Symmetry kills the odd moments.** All odd central moments of a symmetric distribution equal zero, if they exist. Deviations on either side of the centre cancel.

- For a distribution symmetric about 0, such as the standard normal or a uniform on $(-a, a)$, $x^k f(x)$ is an odd function for odd $k$. So $E[X] = 0$ and every odd moment $E[X^k]$ that exists is 0.
- In particular the skewness of a symmetric distribution is 0. The converse fails: a skewness of 0 does not make a distribution symmetric.

## Moments from the MGF

Integrating $x^n f(x)$ for each $n$ is slow. The moment generating function $M_X(t) = E[e^{tX}]$ packs every raw moment into one function.

> $$E[X^n] = M_X^{(n)}(0)$$

- The MGF exists only where the sum or integral defining it is finite for $t$ in an interval around 0. For the exponential and the [[Gamma|gamma]], that is $t < 1/\theta$.
- For the exponential, $M_X(t) = (1 - 1000t)^{-1}$. Its $n$-th derivative at 0 is $n!\,1000^n$, matching the table.
- Other closed forms worth memorising: gamma $E[X^n] = \theta^n\,\alpha(\alpha+1)\cdots(\alpha+n-1)$, and [[Lognormal Distribution|lognormal]] $E[X^n] = e^{n\mu + n^2\sigma^2/2}$.
- Loss Models' tables give no MGF for the lognormal or the Pareto. Take their moments from the formulas directly.

## When moments don't exist

A moment is an expected value, so it exists only when its sum or integral converges.

- Moments need not exist. A heavy-tailed [[Pareto Distribution|Pareto]] with shape $\alpha$ has $E[X^n]$ finite only for $n < \alpha$, so a fitted $\alpha \le 2$ means an infinite variance.
- The exponential's tail falls off fast enough for every moment to exist.

> [!trap] A formula on a moment that doesn't exist
> The Pareto formula for $E[X^2]$ still returns a number when $\alpha \le 2$, and that number is meaningless. Check $n < \alpha$ before using it.

## On other exams

- Moments of several variables, such as $E[XY]$ and [[Covariance]], are in [[Moments for Joint Distributions]] and [[Moments for Linear Combinations]].
- Setting sample moments equal to these formulas is the [[Method of Moments]].
- **Exam 7.** Mack (1994) measures a chain-ladder reserve estimate $R$ by its standard error. A normal interval's lower limit turns negative once the standard error exceeds half of $R$. When the [[Unpaid Claim Distribution|reserve distribution]] is rather skewed, he instead fits a lognormal with the same mean and variance, $\sigma^2 = \ln\!\big(1 + \text{s.e.}(R)^2/R^2\big)$ and $\mu = \ln R - \sigma^2/2$, and reads [[Percentile|percentiles]] off it.

## Try it

> [!example]- Skewness of a discrete claim {Example}
> A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. Find its skewness.
>
> > [!answer]-
> > **Plan:** find the mean, then the second and third central moments directly from the deviations.
> >
> > The mean is 130, so the deviations are $-130$, $-30$ and $370$.
> > $$
> > \begin{align*}
> > \mu_2 &= 0.5(-130)^2 + 0.3(-30)^2 + 0.2(370)^2 \\
> >       &= 36{,}100 \\
> > \mu_3 &= 0.5(-130)^3 + 0.3(-30)^3 + 0.2(370)^3 \\
> >       &= 9{,}024{,}000 \\
> > \gamma_1 &= \frac{9{,}024{,}000}{190^3} \\
> >          &\approx 1.316
> > \end{align*}
> > $$
> > The skewness is positive because the one large claim sits far above the mean.

> [!example]- Moments from an MGF {Example}
> A loss has MGF $M(t) = (1 - 500t)^{-3}$ for $t < 1/500$. Find its mean and variance.
>
> > [!answer]-
> > **Plan:** differentiate twice and set $t = 0$.
> > $$
> > \begin{align*}
> > M'(t) &= 1500(1 - 500t)^{-4} \\
> > M''(t) &= 3{,}000{,}000(1 - 500t)^{-5} \\
> > E[X] &= M'(0) \\
> >      &= 1500 \\
> > E[X^2] &= M''(0) \\
> >        &= 3{,}000{,}000 \\
> > \text{Var}(X) &= 3{,}000{,}000 - 1500^2 \\
> >               &= 750{,}000
> > \end{align*}
> > $$
> > This is the gamma MGF with $\alpha = 3$ and $\theta = 500$, so the answers match $\alpha\theta$ and $\alpha\theta^2$.

> [!example]- Reserve Percentile from Two Moments {Example}
> A chain-ladder analysis gives total unpaid claims with mean $R = \$10.0$ million and standard error $\$2.5$ million. Fit a lognormal with those two moments, as Mack (1994) suggests for a skewed reserve distribution, and find its 95th percentile. Compare with a normal.
>
> > [!answer]-
> > **Plan:** match the coefficient of variation to get $\sigma$, match the mean to get $\mu$, then read off the percentile.
> >
> > The CV is $2.5/10 = 0.25$. Working in \$ millions:
> > $$
> > \begin{align*}
> > \sigma^2 &= \ln(1 + 0.25^2) \\
> >          &= \ln 1.0625 \\
> >          &= 0.06062 \\
> > \sigma &= 0.2462 \\
> > \mu &= \ln 10 - \tfrac{1}{2}(0.06062) \\
> >     &= 2.2723
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > x_{0.95} &= e^{\mu + 1.645\sigma} \\
> >          &= e^{2.2723 + 0.4050} \\
> >          &= 14.55
> > \end{align*}
> > $$
> > A normal with the same moments gives $10 + 1.645(2.5) = 14.11$. The lognormal 95th percentile is \$14.55 million, about \$0.43 million higher, and its median $e^{\mu} = 9.70$ sits below the mean. Two distributions sharing a mean and a variance still disagree in the tail. The skewness they don't share is what a [[Risk Margin|risk margin]] set at a percentile is sensitive to.

> [!warning]- Exam traps
> - **Raw for central.** $E[X^2]$ is not the variance. Subtract $\mu^2$, and expand $\mu_3$ with all three terms.
> - **Skewness without the scale.** $\gamma_1$ divides $\mu_3$ by $\sigma^3$, not by $\sigma^2$ or by $\mu^3$.
> - **Using a moment that doesn't exist.** A Pareto with shape $\alpha$ has no $n$-th moment for $n \ge \alpha$.
> - **Evaluating the MGF instead of its derivative.** $M_X(0) = 1$ always. The moments come from the derivatives at 0.
