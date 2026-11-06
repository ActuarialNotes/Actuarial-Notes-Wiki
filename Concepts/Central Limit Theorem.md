---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:4e179204932662cf34d7cc838e51496a4f151a981b0fe8554482f2f3ffc81094
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: standard score Z_n of the partial sum converges to standard normal; mean mu, variance sigma^2 in (0, infinity); the more abnormal the basic distribution the larger n must be; continuity correction; binomial and Poisson as sums (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.4 The Poisson Distribution: Poisson infinitely divisible: a sum of any number of i.i.d. Poisson variables (HTML fetched 2026-11-06), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: sum of independent normals normal (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: var of uniform (b-a)^2/12 (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Limit Theorem.md
---

The **Central Limit Theorem** (CLT) states that the standardized sum of [[Independent and Identically Distributed|independent and identically distributed]] random variables with mean $\mu$ and finite variance $\sigma^2$ converges in distribution to a standard normal as $n \to \infty$.

> $$\frac{S_n - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} N(0,1) \quad \text{as } n \to \infty$$

- $S_n = X_1 + \cdots + X_n$ is the sum, and $\mu$ and $\sigma^2$ are the mean and variance of **one** $X_i$.
- For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution.
- The [[Sample Mean|sample mean]] $\bar{X} = S_n/n$ is then approximately $N(\mu,\, \sigma^2/n)$.

> [!idea] The idea
> Adding independent pieces lets their quirks cancel. The mean of the sum grows like $n$ but its standard deviation grows only like $\sqrt{n}$, so the sum settles around its mean and its shape is smoothed into a bell. Only the mean and the variance of one piece survive into the answer, which is why the shape of the original distribution no longer matters.

![[Media/Figures/Central_Limit_Theorem.svg|340]]

## Why a sum settles down

An insurer's claims are independent, each with mean 1,000 and standard deviation 400. How does the total behave as the number of claims grows?

Means add, and for independent claims variances add. So the mean of the total grows like $n$ and its standard deviation like $\sqrt{n}$.

| Claims $n$ | $E[S_n]$ | $\text{SD}(S_n)$ | $\text{SD}(\bar{X})$ |
|---|---|---|---|
| 1 | 1,000 | 400 | 400 |
| 25 | 25,000 | 2,000 | 80 |
| 100 | 100,000 | 4,000 | 40 |
| 400 | 400,000 | 8,000 | 20 |

- Relative to its mean, the total gets tighter. At 400 claims the standard deviation is 2% of the mean.
- The average claim gets tighter too. Its standard deviation is $\sigma/\sqrt{n}$, so four times as many claims halve it.

## Probabilities for the total

What is the probability that 100 claims total less than 92,000?

By the CLT the total is approximately normal with mean 100,000 and standard deviation 4,000. The threshold is two standard deviations below the mean, so $z = (92{,}000 - 100{,}000)/4{,}000 = -2$.

> $$P(S_{100} < 92{,}000) \approx \Phi(-2) = 0.0228$$

The same calculation works for any sum. Find $n\mu$ and $n\sigma^2$ from one claim, standardize, and read $\Phi$. The full recipe, with the continuity correction for counts, is on [[Normal Approximation]].

## Probabilities for the average

What is the probability that the average of the 100 claims exceeds 1,050?

The average has the same mean as one claim, 1,000, and standard deviation $400/\sqrt{100} = 40$. The threshold is $z = 50/40 = 1.25$ standard deviations above the mean.

> $$P(\bar{X} > 1{,}050) \approx 1 - \Phi(1.25) = 0.1056$$

> [!trap] Dividing by $n$ instead of $\sqrt{n}$
> The standard deviation of the average is $\sigma/\sqrt{n}$, not $\sigma/n$. Equivalently, its variance is $\sigma^2/n$. Using $400/100 = 4$ here would make a 1,050 average look impossible.

## What the theorem needs

The CLT asks only three things of the pieces: they are independent, they share one distribution, and that distribution has a finite variance.

- **Any shape works.** The pieces can be discrete, skewed or flat. Rounding errors uniform on $(-2.5, 2.5)$ and claims that are 0 or 2 with equal probability both give a normal sum.
- **Skewed pieces need more of them.** A sum of highly skewed claims stays skewed for longer, so the approximation is rougher at moderate $n$.
- **Normal pieces need no theorem.** A sum of independent normals is exactly normal for every $n$. See [[Probabilities for Linear Combinations]].
- **Counts are sums too.** A [[Binomial Distribution|binomial]] count is a sum of $n$ yes-or-no trials, and a [[Poisson Distribution|Poisson]] count over 1,600 days is a sum of 1,600 daily Poisson counts. Both are approximately normal when large.
- **Related, but different.** The [[Law of Large Numbers|law of large numbers]] says the average approaches $\mu$. The CLT says how far from $\mu$ it typically lands, and with what probabilities.

## Try it

> [!example]- Approximating Total Claims Across 200 Policies {Example}
> An insurer has 200 independent policies. Each policy's annual claim has mean \$500 and standard deviation \$300. Approximate $P(S_{200} > 104{,}000)$.
>
> > [!answer]-
> > **Plan:** find the mean and standard deviation of the total, then standardize.
> > $$\mu_S = 200 \times 500 = 100{,}000$$
> > $$\sigma_S = 300\sqrt{200} \approx 4{,}243$$
> > $$
> > \begin{align*}
> > P(S_{200} > 104{,}000) &\approx P\!\left(Z > \frac{4{,}000}{4{,}243}\right) \\
> >                         &= P(Z > 0.94) \\
> >                         &\approx 0.174
> > \end{align*}
> > $$
> > The standard deviation of the total is $300\sqrt{200}$, not $300 \times 200$. Independent claims partly cancel.

> [!example]- Average Claim Count per Group {Example}
> The number of claims in each of 36 independent groups is Poisson with mean 9. Find the approximate probability that the average count per group is between 8 and 10.
>
> > [!answer]-
> > **Plan:** a Poisson has variance equal to its mean, so one group has $\sigma = 3$. Then the average has standard deviation $3/\sqrt{36}$.
> > $$\text{SD}(\bar{X}) = \frac{3}{6} = 0.5$$
> > $$
> > \begin{align*}
> > P(8 < \bar{X} < 10) &\approx \Phi(2) - \Phi(-2) \\
> >                     &= 0.9545
> > \end{align*}
> > $$
> > The answer is about 95% because the interval is two standard deviations either side of the mean.

> [!example]- Rounding Errors {Example}
> Each of 75 premium amounts is rounded to the nearest dollar. The rounding errors are independent and uniform on $(-0.5, 0.5)$. Find the approximate probability that the total rounding error is less than \$5 in absolute value.
>
> > [!answer]-
> > **Plan:** one uniform error has mean 0 and variance $1/12$. The total of 75 is then approximately normal.
> > $$
> > \begin{align*}
> > \text{Var}(S) &= \frac{75}{12} = 6.25 \\
> > \text{SD}(S) &= 2.5
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P(\lvert S \rvert < 5) &\approx \Phi(2) - \Phi(-2) \\
> >                         &= 0.9545
> > \end{align*}
> > $$
> > Why is a normal right when each error is flat? The CLT needs only the mean and variance of one error. The flat shape is smoothed out by adding 75 of them.

> [!warning]- Exam traps
> - **$\sigma/n$ for the average.** The standard deviation of $\bar{X}$ is $\sigma/\sqrt{n}$.
> - **$n\sigma$ for the sum.** The standard deviation of $S_n$ is $\sigma\sqrt{n}$. Add variances, then take the root.
> - **A variance read as a standard deviation.** A Poisson with mean 9 has standard deviation 3, not 9.
> - **Using $E[X^2]$ as the variance.** For a discrete claim, compute $\text{Var}(X) = E[X^2] - (E[X])^2$ before scaling by $n$.
