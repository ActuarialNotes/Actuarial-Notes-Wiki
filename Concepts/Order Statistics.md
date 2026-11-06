---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:d3e918d8cc015b3759c792f9f5bc38b523cb0bbe36a35c90d807a6177d8775cb
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 6.6 Order Statistics: f_k(x) = n!/((k-1)!(n-k)!) F^(k-1)(1-F)^(n-k) f; joint f_{j,k}; uniform sample X_(k) beta(k, n-k+1) with mean k/(n+1), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 3.7 Transformations, Minimum and Maximum: independent X_i with CDFs F_i, max has F_1...F_n, min has 1 - prod(1 - F_i), sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 12.4 Order Statistics: P[X_(i) = x] = C(x-1,i-1)C(m-x,n-i)/C(m,n), sha256:8b4b38e1ca6a79fcc598b1bebf75fc7b9694f0592411d2ef539a6c727f139c77 — https://www.randomservices.org/random/urn/OrderStatistics.html"
    - "Sheffield, MIT OCW 18.440 (Spring 2014), Lecture 20 Exponential random variables, slide 8 (min of independent exponentials has rate the sum of rates), slide 16 radioactive decay: T1 exponential nλ, T2 (n-1)λ, E[T] = λ^-1 Σ 1/j, sha256:394516321e47a5eae056e929d398075f82956f7711c449c8deca16abb56c175c — https://ocw.mit.edu/courses/18-440-probability-and-random-variables-spring-2014/9c364e256bcc2b34ba6dd73025e8bcb2_MIT18_440S14_Lecture20.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 Multivariate Random Variables incl. order statistics (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Order Statistics.md
---

**Order Statistics** are the values of a random sample sorted from smallest to largest. In a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value, so $X_{(1)}$ is the minimum and $X_{(n)}$ is the maximum.

> $$X_{(1)} \le X_{(2)} \le \cdots \le X_{(n)}$$

- The sample's own labels are lost. $X_{(1)}$ is whichever observation turned out smallest.
- Order statistics are not independent, even when the sample is. If the minimum is large, every other value is larger still.

> [!idea] The idea
> Every order statistic question comes down to counting how many observations fall below a point. "The maximum is at most $x$" means all $n$ are at most $x$. "The second smallest is at most $x$" means at least two are. Counting turns a question about sorted values into a question about independent observations.

![[Media/Figures/Order_Statistics.svg|340]]

## The maximum and the minimum

Take three independent observations, each uniform on $(0, 1)$.

The maximum is at most $x$ exactly when all three are at most $x$. Independence lets the probabilities multiply.

> $$P(X_{(3)} \le x) = x \cdot x \cdot x = x^3$$

The minimum is above $x$ exactly when all three are above $x$.

> $$P(X_{(1)} > x) = (1 - x)^3$$

- Differentiating gives the maximum's density $3x^2$ and mean $3/4$.
- The minimum's mean is $1/4$. The two are symmetric about $1/2$.

The same argument works when the observations have different distributions, as long as they are independent. Multiply the CDFs for the maximum and the survival functions for the minimum.

> $$P(X_{(n)} \le x) = F_1(x)\,F_2(x)\cdots F_n(x)$$

> $$P(X_{(1)} > x) = [1 - F_1(x)]\,[1 - F_2(x)]\cdots[1 - F_n(x)]$$

> [!trap] Multiplying the wrong function
> The minimum multiplies *survival* functions, not CDFs. $P(X_{(1)} \le x)$ is one minus that product, not $F_1(x)F_2(x)\cdots F_n(x)$.

## Any order statistic: count the observations below

For an i.i.d. sample with CDF $F$, the number of observations at most $x$ is [[Binomial Distribution|binomial]] with $n$ trials and success probability $F(x)$. The $k$-th smallest is at most $x$ when at least $k$ of them are.

> $$P(X_{(k)} \le x) = \sum_{j=k}^{n} \binom{n}{j} [F(x)]^j [1 - F(x)]^{n-j}$$

The density counts one observation at $x$, $k - 1$ below it and $n - k$ above it. The coefficient counts the ways to choose which observations go where.

> $$f_{X_{(k)}}(x) = \frac{n!}{(k-1)!\,(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x)$$

- For the median of three uniforms, $k = 2$, so the density is $6x(1 - x)$ and the mean is $1/2$.
- For $n$ uniforms on $(0, 1)$ in general, the $k$-th order statistic has mean $k/(n+1)$. The $n$ values split the interval into $n + 1$ gaps of equal expected length.

## Two order statistics together

The joint density of the $j$-th and $k$-th order statistics, $j < k$, counts the observations in three regions: below $x$, between $x$ and $y$, and above $y$.

> $$f_{j,k}(x, y) = \frac{n!}{(j-1)!\,(k-j-1)!\,(n-k)!} [F(x)]^{j-1} [F(y) - F(x)]^{k-j-1} [1 - F(y)]^{n-k} f(x) f(y), \quad x < y$$

- For the minimum and maximum, $j = 1$ and $k = n$, and the density is $n(n-1)[F(y) - F(x)]^{n-2} f(x) f(y)$.

## Exponential samples: the gaps

Take $n$ i.i.d. exponential lifetimes with mean $\mu$. The first failure is the minimum of $n$, which is exponential with mean $\mu / n$. After it, the [[Exponential Distribution|exponential]] is memoryless, so the $n - 1$ survivors start afresh. The next gap has mean $\mu / (n - 1)$, and so on.

> $$E[X_{(k)}] = \mu\left(\frac{1}{n} + \frac{1}{n-1} + \cdots + \frac{1}{n-k+1}\right)$$

- The gaps are independent, each with mean $\mu$ divided by the number still surviving.
- The maximum's mean is $\mu\,(1/n + \cdots + 1/2 + 1)$.

## Draws without replacement

When $n$ distinct values are drawn without replacement from $\{1, 2, \ldots, N\}$, every set of $n$ is equally likely. The $k$-th smallest equals $x$ when $x$ is drawn, $k - 1$ draws are below it and $n - k$ are above it.

> $$P(X_{(k)} = x) = \frac{\binom{x-1}{k-1}\binom{N-x}{n-k}}{\binom{N}{n}}$$

## Try it

> [!example]- A system that fails with its first component {Example}
> A system fails as soon as either of two independent components fails. Their lifetimes are exponential with means 10 and 15. Find the mean lifetime of the system.
>
> > [!answer]-
> > **Plan:** the system lifetime is the minimum, so multiply the survival functions.
> > $$P(X_{(1)} > x) = e^{-x/10}\,e^{-x/15} = e^{-x/6}$$
> > That is an exponential with mean 6, shorter than either component's mean.

> [!example]- The last of three failures {Example}
> Three components have i.i.d. exponential lifetimes with mean 10. Find the expected time until all three have failed.
>
> > [!answer]-
> > **Plan:** add the mean gaps. Three survive for the first gap, then two, then one.
> > $$E[X_{(3)}] = 10\left(\frac{1}{3} + \frac{1}{2} + 1\right) \approx 18.33$$

> [!example]- The middle of three draws {Example}
> Three numbers are drawn without replacement from $\{1, 2, \ldots, 10\}$. Find the probability that the middle one is 5.
>
> > [!answer]-
> > **Plan:** 5 is drawn, one draw is below it and one is above it.
> > $$P(X_{(2)} = 5) = \frac{\binom{4}{1}\binom{5}{1}}{\binom{10}{3}} = \frac{20}{120} = \frac{1}{6}$$

> [!example]- The low and high die {Example}
> Two fair dice are rolled. Let $L$ be the smaller number and $H$ the larger. Find $P(H - L \ge 4)$.
>
> > [!answer]-
> > **Plan:** a pair with $l < h$ comes from two of the 36 outcomes, $(l, h)$ and $(h, l)$.
> > The pairs with $h - l \ge 4$ are $(1, 5)$, $(1, 6)$ and $(2, 6)$.
> > $$P(H - L \ge 4) = 3 \times \frac{2}{36} = \frac{1}{6}$$

> [!warning]- Exam traps
> - **CDFs for the minimum.** The minimum multiplies survival functions.
> - **Treating order statistics as independent.** $X_{(1)}$ and $X_{(n)}$ come from the same sample. Use the joint density.
> - **Assuming i.i.d. formulas for different distributions.** The $f_{X_{(k)}}$ formula needs a common $F$. With different distributions, use the max and min product forms or count the cases directly.
