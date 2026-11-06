---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:270bb0fdcd746905c4384fe04e8424bba7b9a358fd04484b694a7bd3fe41c9f1
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.2 (printed p.231, PDF p.239), Thms 6.7-6.8 (printed p.259, PDF p.267), Ex. 6.3.17 (printed p.281, PDF p.289), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q80 (PDF p.25), Q86 (PDF pp.26-27), Q301 (PDF p.84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Linear Combinations.md
---

**Moments for Linear Combinations** are the expected value and variance of a weighted sum $W = a_1 X_1 + a_2 X_2 + \cdots + a_n X_n$ of random variables, written in terms of the moments of the $X_i$. These results give the [[Expected Value]] and [[Variance]] of aggregate losses and portfolios, and they underlie the [[Central Limit Theorem]].

> $$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$

> $$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i) + 2\sum_{i < j} a_i a_j \,\text{Cov}(X_i, X_j)$$

- where the $a_i$ are constants and $\text{Cov}$ is the [[Covariance]].
- For [[Independent Random Variables]], every covariance is 0 and $\text{Var}(W) = \sum a_i^2\,\text{Var}(X_i)$.
- A constant added to $W$ shifts the mean and leaves the variance alone: $\text{Var}(aX + b) = a^2\,\text{Var}(X)$.
- The broader picture, including indicator payments and normal sums, is on [[Linear Combinations of Random Variables]].

> [!idea] The idea
> The variance of a sum is the covariance of the sum with itself. Expanding that covariance pairs every term with every term. Each variable paired with itself gives a weighted variance, and each pair of different variables appears twice, once in each order.

![[Media/Figures/Moments_for_Linear_Combinations.svg|340]]

## The mean: add the weighted means

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

The table gives $E[X] = 0.40$, $E[Y] = 0.70$, $\text{Var}(X) = 0.24$, $\text{Var}(Y) = 0.53$ and $\text{Cov}(X, Y) = 0.12$. Each auto claim costs 10 and each home claim 5, so the annual cost is $L = 10X + 5Y$ with $E[L] = 4 + 3.5 = 7.5$. The two counts are dependent, and the mean didn't care.

## One variable rescaled and shifted

Next year, costs rise 10% and a fixed fee of 2 is added. The new cost is $1.1L + 2$.

> $$E[1.1L + 2] = 1.1(7.5) + 2 = 10.25$$

> $$\text{Var}(1.1L + 2) = 1.1^2\,\text{Var}(L)$$

The fee moves every outcome by the same amount, so it adds nothing to the spread. The 10% rise stretches every deviation by 1.1, so the variance grows by $1.1^2 = 1.21$.

## Two variables: the variance grid

Writing $\text{Var}(L) = \text{Cov}(10X + 5Y,\ 10X + 5Y)$ and expanding pairs each term with each term. The four pairings form a grid.

| | $10X$ | $5Y$ |
|---|---|---|
| $10X$ | $100\,\text{Var}(X) = 24$ | $50\,\text{Cov} = 6$ |
| $5Y$ | $50\,\text{Cov} = 6$ | $25\,\text{Var}(Y) = 13.25$ |

The four cells add to $\text{Var}(L) = 49.25$. The next year's cost then has variance $1.21(49.25) \approx 59.59$.

With $n$ variables the grid has $n^2$ cells. The diagonal holds the $n$ weighted variances. The off-diagonal cells hold each covariance twice, which is where the factor 2 in the formula comes from.

> [!trap] One copy of the covariance
> Writing $a_1a_2\,\text{Cov}(X_1, X_2)$ once gives 43.25 here instead of 49.25. Every off-diagonal pair appears twice in the grid.

## Covariance between two combinations

The same grid works for two different combinations. How does the auto cost $10X$ move with the total cost $L$?

> $$\text{Cov}\Big(\sum_i a_i X_i,\ \sum_j b_j Y_j\Big) = \sum_i \sum_j a_i b_j\,\text{Cov}(X_i, Y_j)$$

Here $\text{Cov}(10X,\ 10X + 5Y) = 100\,\text{Var}(X) + 50\,\text{Cov}(X, Y) = 24 + 6 = 30$. A variance of a combination is the special case where both combinations are the same.

## Independent copies: totals and averages

The insurer covers 100 independent policyholders like this one. The grid for their total $T$ has only its diagonal, because independent policyholders have no covariance.

| Quantity | Mean | Variance |
|---|---|---|
| One cost $L$ | 7.5 | 49.25 |
| $100L$ | 750 | 492,500 |
| Total $T$ of 100 | 750 | 4,925 |
| Average $T/100$ | 7.5 | 0.4925 |

- $100L$ and $T$ have the same mean but very different variances. Scaling one risk keeps all its volatility, while pooling independent risks lets them offset.
- The [[Coefficient of Variation|coefficient of variation]] of $L$ is $\sqrt{49.25}/7.5 \approx 0.936$. For the total of 100 it is $\sqrt{4{,}925}/750 \approx 0.094$, smaller by a factor of $\sqrt{100}$.

> $$\text{Var}(X_1 + \cdots + X_n) = n\sigma^2$$

> $$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

## Try it

> [!example]- A profit model with two independent inputs {Example}
> A product's profit is $Z = 3X - Y - 5$, where $X$ and $Y$ are independent with $\text{Var}(X) = 2$ and $\text{Var}(Y) = 4$. Find $\text{Var}(Z)$.
>
> > [!answer]-
> > **Plan:** square each weight, drop the constant, and add.
> > $$
> > \begin{align*}
> > \text{Var}(Z) &= 3^2(2) + (-1)^2(4) \\
> > &= 18 + 4 \\
> > &= 22
> > \end{align*}
> > $$
> > The $-Y$ adds variance, because its weight is squared.

> [!example]- A flat increase and a percentage increase {Example}
> A benefit has a surgeon's part $X$ and a hospital part $Y$, with $\text{Var}(X) = 400$, $\text{Var}(Y) = 900$ and $\text{Var}(X + Y) = 1{,}600$. The insurer raises $X$ by a flat 50 and $Y$ by 20%. Find the variance of the new total.
>
> > [!answer]-
> > **Plan:** recover the covariance from the old total, then build the new variance.
> > $$
> > \begin{align*}
> > 2\,\text{Cov}(X, Y) &= 1{,}600 - 400 - 900 \\
> > &= 300 \\
> > \text{Var}(X + 50 + 1.2Y) &= 400 + 1.44(900) + 1.2(300) \\
> > &= 400 + 1{,}296 + 360 \\
> > &= 2{,}056
> > \end{align*}
> > $$
> > The flat 50 changes nothing in the variance, while the 20% scales $Y$'s variance by 1.44 and the covariance by 1.2.

> [!example]- Making two combinations uncorrelated {Example}
> Losses have $\text{Var}(X) = 4$, $\text{Var}(Y) = 9$ and $\text{Cov}(X, Y) = 3$. Find the constant $c$ for which $X + Y$ and $cX + Y$ are uncorrelated.
>
> > [!answer]-
> > **Plan:** expand the covariance over the grid and set it to 0.
> > $$
> > \begin{align*}
> > \text{Cov}(X + Y,\ cX + Y) &= c\,\text{Var}(X) + \text{Cov}(X, Y) \\
> > &\quad + c\,\text{Cov}(X, Y) + \text{Var}(Y) \\
> > &= 4c + 3 + 3c + 9 \\
> > &= 7c + 12
> > \end{align*}
> > $$
> > Setting $7c + 12 = 0$ gives $c = -12/7 \approx -1.71$.

> [!warning]- Exam traps
> - **$\text{Var}(nX)$ for a sum of $n$ independent copies.** The total has variance $n\sigma^2$, not $n^2\sigma^2$.
> - **One copy of each covariance.** The factor 2 counts both orderings of the pair.
> - **Subtracting a variance.** A negative weight is squared, so $\text{Var}(X - Y)$ adds $\text{Var}(Y)$.
> - **Letting a constant into the variance.** A flat fee changes $E[W]$ but not $\text{Var}(W)$.
