---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce3a06d3d127b7a2e4b5a98914c3486214c4a75fc55c463b0b8949fffa0de8fd
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.5 (PDF p.152), Thm 4.2 (PDF p.173), Def. 4.8 (PDF p.176), p.184 (PDF p.192), p.207 (PDF p.215), Thms 6.7 and 6.9 (PDF pp.267-268), Cor. 6.1 (PDF p.283), §9.2 (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q117, Q124, Q249 (PDF p.73), Q448 (PDF p.125), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: if {X_i} is independent then {g_i(X_i)} is independent; the Bernoulli indicator sequence is exchangeable (permuting does not change the probability), HTML fetched 2026-10-30, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
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
