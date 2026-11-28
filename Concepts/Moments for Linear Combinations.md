---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:09710645621588b769023ac72fb75a007d0d377b7084c5b4f49ed17d3b9f2155
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), §6.2, Thm 6.7 V(cX)=c^2 V(X); Thm 6.8 V(X+Y)=V(X)+V(Y) for independent; PDF p.267 (printed p.259), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance, var(a+bX)=b^2 var(X), sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: bilinearity, var(X+Y), var(X-Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1, eq. 5.21 Var(aX+bY); pairwise uncorrelated sums, sha256:5c6e480937de94c3d9a36dd838e39f249b0a7aab4845c6f3fc539526fae31625 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Linear Combinations.md
---

![[Media/Figures/Moments_for_Linear_Combinations.svg|340]]

**Moments for Linear Combinations** are the expected value and variance of a [[Linear Combinations of Random Variables|linear combination]] $W = a_1 X_1 + \cdots + a_n X_n$ of random variables, where the $a_i$ are constants. The expected value of $W$ is

> $$E[W] = a_1 E[X_1] + \cdots + a_n E[X_n]$$

This holds whether or not the $X_i$ are independent.

> [!example]- A policyholder has $E[X] = 0.40$ auto claims and $E[Y] = 0.70$ home claims a year, and the two counts are dependent. Each auto claim costs 10 and each home claim costs 5. What is the expected annual cost? {Example}
> - The annual cost is $10X + 5Y$.
> - Its expected value is $10(0.40) + 5(0.70) = 7.5$.
> - The dependence between the counts doesn't change the expected value.

## Variance of a linear combination

For constants $a$, $b$ and $c$, the variance of $aX + bY + c$ is

> $$
> \begin{aligned}
> &\text{Var}(aX + bY + c) \\
> &\quad = a^2\,\text{Var}(X) + b^2\,\text{Var}(Y) \\
> &\quad\quad + 2ab\,\text{Cov}(X, Y)
> \end{aligned}
> $$

- $\text{Cov}(X, Y)$ is the [[Covariance|covariance]] of $X$ and $Y$.
- The constant $c$ shifts every outcome by the same amount, so it doesn't appear.

With $n$ random variables, there is a term $a_i^2\,\text{Var}(X_i)$ for each variable and a term $2a_ia_j\,\text{Cov}(X_i, X_j)$ for each pair.

> [!example]- The auto and home claim counts above have $\text{Var}(X) = 0.24$, $\text{Var}(Y) = 0.53$ and $\text{Cov}(X, Y) = 0.12$. What is the variance of the annual cost $10X + 5Y$? {Example}
> - The variance terms are $100(0.24) = 24$ and $25(0.53) = 13.25$.
> - The covariance term is $2(10)(5)(0.12) = 12$.
> - The variance of the annual cost is $24 + 13.25 + 12 = 49.25$.

> [!trap] One copy of the covariance
> Each pair of different variables contributes its covariance twice. Writing $ab\,\text{Cov}(X, Y)$ once gives 43.25 in place of 49.25.

## Independent random variables

[[Independent Random Variables|Independent random variables]] have covariance 0, so every covariance term drops out:

> $$
> \begin{aligned}
> \text{Var}\Big(\sum_i a_i X_i\Big) &= \sum_i a_i^2\,\text{Var}(X_i)
> \end{aligned}
> $$

The coefficients are squared, so the variance of a difference $X - Y$ is the sum of the variances, $\text{Var}(X) + \text{Var}(Y)$.

> [!example]- Independent losses have $\text{Var}(X) = 4$ and $\text{Var}(Y) = 9$. What is $\text{Var}(X - 2Y)$? {Example}
> - The coefficients are 1 and $-2$, whose squares are 1 and 4.
> - $\text{Var}(X - 2Y)$ is $4 + 4(9) = 40$.

## Totals of independent copies

For $n$ independent random variables that each have mean $\mu$ and variance $\sigma^2$, the total $T = X_1 + \cdots + X_n$ has

> $$E[T] = n\mu$$

> $$\text{Var}(T) = n\sigma^2$$

A single variable scaled by $n$ has the same mean but variance $\text{Var}(nX) = n^2\sigma^2$. Pooling independent risks lets them offset, while scaling one risk keeps all its spread.

> [!example]- An insurer covers 100 independent policyholders, each with an annual cost of mean 7.5 and variance 49.25. What are the mean and standard deviation of the total cost? {Example}
> - The mean is $100(7.5) = 750$.
> - The variance is $100(49.25) = 4{,}925$, so the standard deviation is $\sqrt{4{,}925} = 70.2$.
> - One policyholder's cost scaled by 100 would have standard deviation $100\sqrt{49.25} = 701.8$, ten times larger.
