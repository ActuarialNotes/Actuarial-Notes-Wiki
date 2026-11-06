---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce3a06d3d127b7a2e4b5a98914c3486214c4a75fc55c463b0b8949fffa0de8fd
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.5 independent trials process: mutually independent with the same distribution (PDF p.151); Thm 6.7 V(cX) = c^2 V(X) and Thm 6.9 E(S_n) = n mu, V(S_n) = n sigma^2 (PDF pp.267-268); §9.2 Central Limit Theorem (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Order Statistics: F_1(x) = 1 - [1 - F(x)]^n and F_n(x) = [F(x)]^n for an i.i.d. sample, HTML fetched 2026-11-06, sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Poisson Distribution: independent Poisson N, M with parameters a, b: N + M is Poisson(a + b), HTML fetched 2026-11-06, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Gamma Distribution (Poisson process): T_n, the sum of n independent exponential inter-arrival times, has the gamma distribution, HTML fetched 2026-11-06, sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Central Limit Theorem: the sum or average of many i.i.d. variables is approximately normal, HTML fetched 2026-11-06, sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: functions g_i(X_i) of independent variables are independent; the indicator sequence is exchangeable, HTML fetched 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 objective (order statistics, linear combinations of independent variables) and outcomes f, h, i (Central Limit Theorem for i.i.d. sums) (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent and Identically Distributed.md
---

Random variables $X_1, X_2, \ldots, X_n$ are **Independent and Identically Distributed** (i.i.d.) when they are mutually [[Independent Random Variables|independent]] *and* share one common distribution. They then have the same CDF $F$, hence the same mean $\mu$ and variance $\sigma^2$. It is the standard model for a [[Random Sample]] and for a book of similar, unrelated policies.

> $$f(x_1, \ldots, x_n) = \prod_{i=1}^{n} f(x_i)$$

> $$\begin{aligned} E[S_n] &= n\mu \\ \text{Var}(S_n) &= n\sigma^2 \end{aligned}$$

- Here $f$ is the common PMF or PDF and $S_n = X_1 + \cdots + X_n$.
- The product form is the independence. Using the same $f$ in every factor is the identical distribution. Each half can fail on its own.
- For the average, $E[\bar{X}] = \mu$ and $\text{Var}(\bar{X}) = \sigma^2/n$.

> [!idea] The idea
> Independence lets the variances of the terms add, with no covariance terms. Identical distribution makes every term the same size. So the total's variance grows like $n$ while its mean also grows like $n$, and the total becomes more predictable relative to its size as the book grows.

## A book of home policies

An insurer writes home policies to many unrelated policyholders. Each policy's number of claims next year is 0, 1 or 2 with probabilities 0.50, 0.35 and 0.15, and the policies don't affect one another. The claim counts are i.i.d. with

> $$\mu = 0.65, \quad \sigma^2 = 0.5275$$

**Two policies: what is the probability of two claims in total?** Independence makes each joint probability a product, and the common PMF supplies every factor. The patterns adding to 2 are $(2, 0)$, $(0, 2)$ and $(1, 1)$:

> $$P(S_2 = 2) = 2(0.15)(0.50) + (0.35)^2 = 0.2725$$

## Totals grow, relative spread shrinks

**How does the risk of the book change with its size?** The mean and variance of the total both scale with $n$, so the standard deviation scales with $\sqrt{n}$.

| $n$ | $E[S_n]$ | $\text{SD}(S_n)$ | CV |
|---|---|---|---|
| 1 | 0.65 | 0.726 | 1.117 |
| 100 | 65 | 7.26 | 0.112 |
| 10,000 | 6,500 | 72.6 | 0.0112 |

The mean of $S_n$ grows like $n$ but its standard deviation only like $\sqrt{n}$. So the [[Coefficient of Variation]] of the total falls as $1/\sqrt{n}$. This pooling effect is behind the [[Law of Large Numbers]].

**Identically distributed is not identical.** $X_1 + X_2$ has variance $2\sigma^2$, but $2X_1$ has variance $4\sigma^2$. Two policies with independent claims are less risky than one policy written twice as large, because their bad years don't always coincide.

> [!trap] $n\sigma^2$ or $n^2\sigma^2$
> A sum of $n$ i.i.d. terms has variance $n\sigma^2$. A single term multiplied by $n$ has variance $n^2\sigma^2$. Read whether the question adds independent risks or scales one risk.

## The normal approximation

The version of the [[Central Limit Theorem]] on Exam P assumes i.i.d. summands with finite variance. It is what licenses the [[Normal Approximation]] $S_n \approx N(n\mu,\ n\sigma^2)$. For 100 home policies, the total claim count is roughly normal with mean 65 and standard deviation 7.26. A probability about the total is then a z-score: subtract 65 and divide by 7.26.

## Sums that are known exactly

Some i.i.d. sums are known exactly: Bernoulli$(p)$ terms sum to a [[Binomial Distribution|binomial]]$(n, p)$, Poisson$(\lambda)$ terms to a Poisson$(n\lambda)$, and [[Exponential Distribution|exponentials]] with mean $\theta$ to a [[Gamma]]$(n, \theta)$. For these, no approximation is needed.

## The largest and the smallest

**What is the probability that no policy in a group of three has two claims?** That is the probability that the largest count is at most 1. Each policy is at most 1 with probability 0.85, and independence multiplies the three: $0.85^3 = 0.6141$.

The [[Order Statistics]] formulas rely on i.i.d. in exactly this way. The maximum has $P(X_{(n)} \le x) = F(x)^n$ and the minimum has $P(X_{(1)} > x) = [1 - F(x)]^n$.

## Symmetry

The joint density $f(x_1)\,f(x_2)$ is unchanged when $x_1$ and $x_2$ swap. So $(X_1, X_2)$ has the same joint distribution as $(X_2, X_1)$, and an event and its mirror image with the roles swapped have equal probability.

> $$P(X_1 > g(X_2)) = P(X_2 > g(X_1))$$

For example, $P(X_1 > 3X_2) = P(X_2 > 3X_1)$ and, for continuous variables, $P(X_1 < X_2) = P(X_2 < X_1) = 1/2$.

The symmetry survives conditioning on an event $C$ that treats the items alike, such as "at least one item is of type E". Every item then has the same conditional probability $P(\text{item } i \text{ has } A \mid C)$. Writing the number of items with property $A$ as a sum of indicators, linearity gives $E[\text{count} \mid C] = n \cdot P(\text{item 1 has } A \mid C)$.

For three home policies, let $C$ be "at least one policy has a claim", with $P(C) = 1 - 0.5^3 = 0.875$. A policy with a claim always lies in $C$, so $P(\text{policy 1 has a claim} \mid C) = 0.50 / 0.875 = 0.5714$. The expected number of policies with a claim, given $C$, is $3 \times 0.5714 = 1.714$.

## Try it

> [!example]- Fifty Policies versus One Large Policy {Example}
> Each of 50 independent policies has an annual loss with mean $\$1{,}000$ and standard deviation $\$400$. Compare the total $S = X_1 + \cdots + X_{50}$ with a single risk $T = 50X_1$ that has the same expected loss.
>
> > [!answer]-
> > **Plan:** the means match, so compare the variances: added for the i.i.d. sum, scaled by $50^2$ for the single risk.
> >
> > Both have mean $50 \times 1{,}000 = 50{,}000$.
> > $$
> > \begin{align*}
> > \text{Var}(S) &= 50(400^2) \\
> >               &= 8{,}000{,}000 \\
> > \text{SD}(S) &= 2{,}828 \\
> > \text{Var}(T) &= 50^2(400^2) \\
> >               &= 400{,}000{,}000 \\
> > \text{SD}(T) &= 20{,}000
> > \end{align*}
> > $$
> > The coefficient of variation is $2{,}828/50{,}000 = 0.057$ for the pooled book against $0.40$ for the single large risk. Same expected loss, but pooling cuts the standard deviation to $1/\sqrt{50} \approx 14\%$ of the concentrated risk's.

> [!example]- The Largest of Five Claims {Example}
> Five claims are i.i.d. exponential with mean $\$2{,}000$. Find the probability that the largest exceeds $\$5{,}000$.
>
> > [!answer]-
> > **Plan:** the largest is at most $\$5{,}000$ only if every claim is, so raise one claim's CDF to the fifth power.
> >
> > One claim stays at or below \$5,000 with probability $F(5{,}000) = 1 - e^{-2.5} = 0.917915$. The maximum is at or below \$5,000 only if all five claims are, and independence with a common $F$ turns that into a power:
> > $$
> > \begin{align*}
> > P(X_{(5)} > 5{,}000) &= 1 - F(5{,}000)^5 \\
> >                      &= 1 - 0.917915^5 \\
> >                      &= 1 - 0.651647 \\
> >                      &= 0.3484
> > \end{align*}
> > $$
> > A single claim exceeds \$5,000 only $8.2\%$ of the time, but with five claims there is a $34.8\%$ chance at least one does. This is why a per-claim retention is hit far more often than a single claim's tail suggests.

> [!example]- A mirror-image event {Example}
> Two claims $X_1$ and $X_2$ are i.i.d. exponential with mean $\theta$. Find $P(X_1 > 3X_2)$ and $P(X_2 \le 3X_1)$.
>
> > [!answer]-
> > **Plan:** condition on $X_2$ and use the exponential survival function, then use symmetry for the mirror image.
> > $$
> > \begin{align*}
> > P(X_1 > 3X_2) &= \int_0^\infty e^{-3x/\theta}\, \frac{1}{\theta} e^{-x/\theta}\, dx \\
> >               &= \frac{1}{4}
> > \end{align*}
> > $$
> > By symmetry, $P(X_2 > 3X_1) = 1/4$ as well, so $P(X_2 \le 3X_1) = 3/4$.
> >
> > The answer does not depend on $\theta$, because scaling both claims by the same factor leaves the event $X_1 > 3X_2$ unchanged.

> [!warning]- Exam traps
> - **$n\sigma^2$ against $n^2\sigma^2$.** Independent risks add variances. One risk scaled by $n$ multiplies its variance by $n^2$.
> - **Standard deviations added.** $\text{SD}(S_n) = \sigma\sqrt{n}$, not $n\sigma$.
> - **The variance of the average.** $\text{Var}(\bar{X}) = \sigma^2/n$, not $\sigma^2$ and not $\sigma^2/n^2$.
> - **Maximum and minimum mixed up.** The maximum uses $F(x)^n$ and the minimum uses $[1 - F(x)]^n$ for its survival function. Squaring the survival function for the maximum answers a different question.
