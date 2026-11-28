---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:80a0cd83b441a96e6e1729478d48b550aa6200dc378e9af4114dd415dcb65621
  sources:
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Thm 7.1 and Def. 7.1, PDF pp.294, 299; Thms 9.4, 9.6, PDF pp.351, 365; Ex. 6.23 (printed p.282, PDF p.290); Thms 6.10, 6.14, 6.16 (PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e"
    - "https://www.randomservices.org/random/poisson/Poisson.html, The Poisson Distribution, 14.4 Sums: Poisson closed under independent sums, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688"
    - "https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf, The Normal Distribution, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Probabilities for Linear Combinations.md
---

![[Media/Figures/Probabilities_for_Linear_Combinations.svg|340]]

**Probabilities for Linear Combinations** are the probabilities of events about a [[Linear Combinations of Random Variables|linear combination]] of random variables, such as a sum $X + Y$ being at least some value. For discrete random variables $X$ and $Y$ with joint probability function $p(x, y)$, the probability that their sum is $s$ is

> $$P(X + Y = s) = \sum_x p(x,\ s - x)$$

- The sum runs over every value $x$ of $X$.

The terms of the sum are the cells of the joint table on one diagonal.

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the joint probabilities below. What is the probability of at least 2 claims in total? {Example}
> | $X$ \ $Y$ | 0 | 1 | 2 |
> | --- | --- | --- | --- |
> | 0 | 0.36 | 0.18 | 0.06 |
> | 1 | 0.10 | 0.20 | 0.10 |
>
> - A total of 2 is the diagonal $(0, 2)$ and $(1, 1)$, with probability $0.06 + 0.20 = 0.26$.
> - A total of 3 is the cell $(1, 2)$, with probability 0.10.
> - $P(X + Y \ge 2)$ is $0.26 + 0.10 = 0.36$.

## Sums of independent random variables

When $X$ and $Y$ are [[Independent Random Variables|independent]], each joint probability is a product of the marginal probabilities, so

> $$P(X + Y = s) = \sum_x p_X(x)\,p_Y(s - x)$$

- $p_X$ and $p_Y$ are the marginal probability functions of $X$ and $Y$.

This sum is called a **convolution**. The sum of independent [[Poisson Distribution|Poisson]] random variables is Poisson, with mean equal to the sum of the means.

> [!example]- The numbers of claims on two independent policies are Poisson with means 1 and 2. What is the probability of 2 claims in total? {Example}
> - The totals of 2 are $(0, 2)$, $(1, 1)$ and $(2, 0)$.
> - Their probabilities are $e^{-1}\frac{2^2}{2!}e^{-2}$, $e^{-1}(2e^{-2})$ and $\frac{e^{-1}}{2!}e^{-2}$.
> - They add to $e^{-3}(2 + 2 + 0.5) = 0.2240$.
> - The total is Poisson with mean 3, and $\frac{e^{-3}\,3^2}{2!} = 0.2240$ agrees.

## Linear combinations of independent normal random variables

If $X_1, \ldots, X_n$ are independent [[Normal Distribution|normal]] random variables with means $\mu_i$ and standard deviations $\sigma_i$, then for constants $c_i$ the linear combination $L = c_1 X_1 + \cdots + c_n X_n$ is normal:

> $$L \sim N\!\left(\sum_i c_i\,\mu_i,\ \sum_i c_i^2\,\sigma_i^2\right)$$

A probability for $L$ is found by standardizing it, subtracting its mean and dividing by its standard deviation.

> [!example]- Two independent lines of business have annual losses $X \sim N(400, 30^2)$ and $Y \sim N(350, 40^2)$. What is the probability that the total loss exceeds 800? {Example}
> - The total has mean $400 + 350 = 750$.
> - Its variance is $30^2 + 40^2 = 2{,}500$, so its standard deviation is 50.
> - The standardized value of 800 is $\frac{800 - 750}{50} = 1$.
> - The probability is $P(Z > 1) = 0.1587$.

> [!trap] Adding standard deviations
> Variances add, standard deviations don't. Adding $30 + 40 = 70$ as the standard deviation of the total gives $P(Z > 0.71) = 0.2389$ in place of 0.1587.

For a sum of many independent random variables of any distribution, the [[Central Limit Theorem]] makes the sum approximately normal. That is the [[Normal Approximation|normal approximation]].

## Sums of continuous random variables

For continuous random variables with joint density $f(x, y)$, the probability that the sum is at most $s$ is the integral of the density over the region below the line $x + y = s$:

> $$P(X + Y \le s) = \iint_{x + y \le s} f(x, y)\,dx\,dy$$

> [!example]- Two independent losses are each uniform on $(0, 10)$. What is the probability that their total is at most 5? {Example}
> - The pair is uniform on the square $(0, 10) \times (0, 10)$, which has area 100.
> - The region $x + y \le 5$ inside it is a triangle with legs 5, so its area is 12.5.
> - $P(X + Y \le 5)$ is $\frac{12.5}{100} = 0.125$.
