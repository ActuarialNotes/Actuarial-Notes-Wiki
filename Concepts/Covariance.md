---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b4c71000082334042c497b32456837e3b6528c322d28fc527fc0400fbfbbc7df
  sources:
    - "Covariance | Correlation | Variance of a sum | Correlation Coefficient:, §5.3.1 definition, Lemma 5.3, eq. 5.21, correlation properties, sha256:5c6e480937de94c3d9a36dd838e39f249b0a7aab4845c6f3fc539526fae31625 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Covariance and Correlation, 4.5 properties, var(X+Y), var(X-Y), Y=X^2 example, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, Exercise 6.3.17 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Covariance.md
---

![[Media/Figures/Covariance.svg|340]]

The **Covariance** of two [[Random Variable|random variables]] $X$ and $Y$ is a measure of how they move together. With means $\mu_X = E[X]$ and $\mu_Y = E[Y]$, the covariance is

> $$\text{Cov}(X, Y) = E\big[(X - \mu_X)(Y - \mu_Y)\big]$$

The covariance is positive when $X$ and $Y$ tend to lie on the same side of their means, and negative when they tend to lie on opposite sides. When $X + Y$ is a constant, such as the numbers of successes and failures in $n$ trials, $\text{Cov}(X, Y) = -\text{Var}(X)$ and their [[Covariance and Correlation Coefficient|correlation]] is $-1$. Expanding the product gives the form used to calculate it:

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the joint probabilities below. What is $\text{Cov}(X, Y)$? {Example}
> | $X$ \ $Y$ | 0 | 1 | 2 |
> | --- | --- | --- | --- |
> | 0 | 0.36 | 0.18 | 0.06 |
> | 1 | 0.10 | 0.20 | 0.10 |
>
> - The row totals give $E[X] = 0.40$, and the column totals give $E[Y] = 0.70$.
> - Only the cells $(1, 1)$ and $(1, 2)$ have a nonzero product $xy$, so $E[XY]$ is $0.20 + 2(0.10) = 0.40$.
> - Subtracting $E[X]\,E[Y] = 0.28$ gives $\text{Cov}(X, Y) = 0.12$.
> - The covariance is positive, so a policyholder with an auto claim tends to have more home claims.

## Covariance of independent random variables

If $X$ and $Y$ are [[Independent Random Variables|independent]], then $E[XY] = E[X]\,E[Y]$, so

> $$\text{Cov}(X, Y) = 0$$

Random variables with covariance 0 are called **uncorrelated**. Uncorrelated random variables need not be independent.

> [!example]- $X$ is $-1$, 0 or 1 with equal probability, and $Y = X^2$. Are $X$ and $Y$ uncorrelated? Are they independent? {Example}
> - $XY = X^3$, which is $-1$, 0 or 1 with equal probability, so $E[XY] = 0$.
> - $E[X] = 0$, so $\text{Cov}(X, Y) = 0 - 0 = 0$, and $X$ and $Y$ are uncorrelated.
> - $Y$ is determined by $X$. For example, $P(Y = 0 \mid X = 0) = 1$, but $P(Y = 0) = \frac{1}{3}$.
> - $X$ and $Y$ are not independent.

## Covariance of linear combinations

For constants $a$, $b$, $c$ and $d$, the covariance of two linear functions is

> $$\text{Cov}(aX + b,\ cY + d) = ac\,\text{Cov}(X, Y)$$

The covariance of a sum with a third random variable $Z$ is

> $$
> \begin{aligned}
> \text{Cov}(X + Y,\ Z) &= \text{Cov}(X, Z) \\
> &\quad + \text{Cov}(Y, Z)
> \end{aligned}
> $$

The covariance of a random variable with itself is its [[Variance|variance]], $\text{Cov}(X, X) = \text{Var}(X)$.

> [!example]- A claim has a surgical part $X$ and a hospital part $Y$, with $\text{Var}(X) = 4$, $\text{Var}(Y) = 9$ and $\text{Cov}(X, Y) = 1$. A 20% surcharge applies to the hospital part. What is the covariance of the claim before the surcharge, $X + Y$, and after it, $X + 1.2Y$? {Example}
> - Split the covariance into one term for each pair of parts:
>
> > $$
> > \begin{aligned}
> > \text{Cov} &= \text{Cov}(X, X) \\
> > &\quad + 1.2\,\text{Cov}(X, Y) \\
> > &\quad + \text{Cov}(Y, X) \\
> > &\quad + 1.2\,\text{Cov}(Y, Y) \\
> > &= 4 + 1.2 + 1 + 10.8 \\
> > &= 17
> > \end{aligned}
> > $$
>
> - The covariance is 17.

## Variance of a sum

The variance of a sum is the covariance of the sum with itself, which splits into

> $$
> \begin{aligned}
> \text{Var}(X + Y) &= \text{Var}(X) + \text{Var}(Y) \\
> &\quad + 2\,\text{Cov}(X, Y)
> \end{aligned}
> $$

> [!example]- Losses $X$ and $Y$ have $\text{Var}(X + Y) = 20$ and $\text{Var}(X - Y) = 12$. What is $\text{Cov}(X, Y)$? {Example}
> - $\text{Var}(X - Y)$ has the same two variances, with $-2\,\text{Cov}(X, Y)$ in place of $+2\,\text{Cov}(X, Y)$.
> - Subtracting the two variances leaves $4\,\text{Cov}(X, Y)$, which is $20 - 12 = 8$.
> - $\text{Cov}(X, Y) = 2$.

> [!trap] Dropping the covariance term
> $\text{Var}(X + Y)$ is $\text{Var}(X) + \text{Var}(Y)$ only when the covariance is 0. For the auto and home claims, $\text{Var}(X) = 0.24$ and $\text{Var}(Y) = 0.53$, so the shortcut gives 0.77. With the covariance, the variance of the total is $0.77 + 2(0.12) = 1.01$.
