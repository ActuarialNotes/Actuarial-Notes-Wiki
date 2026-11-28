---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:17dbb24e9af12f2f8d9bc43e4aa3c074b63d60d3f7ea19aa2d1b4473a3c04347
  sources:
    - "Covariance and Correlation, §4.5 Covariance and Correlation: var(X - Y); indicator covariance, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Covariance | Correlation | Variance of a sum | Correlation Coefficient:, §5.3.1 Lemma 5.3, eq. 5.21, Definition of uncorrelated, sha256:5c6e480937de94c3d9a36dd838e39f249b0a7aab4845c6f3fc539526fae31625 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §6.1 Thm 6.2, PDF p.239, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §6.2 Thms 6.7-6.9, PDF pp.267-268, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §6.3 Ex. 6.3.17, PDF p.289, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §7.2 Example 7.5, PDF p.302, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Linear Combinations of Random Variables.md
---

![[Media/Figures/Linear_Combinations_of_Random_Variables.svg|340]]

A **Linear Combination of Random Variables** is a weighted sum of [[Random Variable|random variables]] with constant weights, such as an aggregate loss or an average. For random variables $X$ and $Y$ and constants $a$, $b$ and $c$, the mean of $aX + bY + c$ is

> $$E[aX + bY + c] = a\,E[X] + b\,E[Y] + c$$

This holds whether or not $X$ and $Y$ are independent. The mean of a sum of any number of random variables is the sum of their means.

The same rule applies to a sum of functions of one random variable. Since $X(X + 1) = X^2 + X$, the second moment can be found from $E[X(X + 1)]$ as

> $$E[X^2] = E[X(X + 1)] - E[X]$$

> [!example]- Each auto claim costs 10 and each home claim costs 5. The numbers of claims $X$ and $Y$ have means 0.4 and 0.7. What is the expected total cost? {Example}
> - The total cost is $10X + 5Y$.
> - Its mean is $10(0.4) + 5(0.7) = 7.5$.

## Variance of a linear combination

The variance of $aX + bY + c$ is

> $$
> \begin{aligned}
> & \text{Var}(aX + bY + c) \\
> &= a^2\,\text{Var}(X) \\
> &\quad + b^2\,\text{Var}(Y) \\
> &\quad + 2ab\,\text{Cov}(X, Y)
> \end{aligned}
> $$

- $\text{Cov}(X, Y)$ is the [[Covariance|covariance]] of $X$ and $Y$.
- The constant $c$ shifts the mean but adds nothing to the variance.

For one random variable multiplied by a constant $a$, the mean is $a\,E[X]$ and the variance is

> $$\text{Var}(aX) = a^2\,\text{Var}(X)$$

So dividing a random variable by a constant divides its mean by that constant and its variance by the constant's square.

The weights enter squared, so a negative weight still adds variance. Only the sign of the covariance term changes:

> $$\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y) - 2\,\text{Cov}(X, Y)$$

> [!example]- Losses $X$ and $Y$ have variances 9 and 16, and their covariance is 6. What is the variance of $X - Y$? {Example}
> - The weights are $a = 1$ and $b = -1$, so $2ab = -2$.
> - $\text{Var}(X - Y) = 9 + 16 - 2(6) = 13$.

## Independent random variables

When $X_1, \ldots, X_n$ are [[Independent Random Variables|independent]], every covariance is 0. Random variables with zero covariance are called uncorrelated. For independent or uncorrelated random variables, the variance of $a_1 X_1 + \cdots + a_n X_n$ is

> $$
> \begin{aligned}
> & \text{Var}\Big(\sum_{i=1}^{n} a_i X_i\Big) \\
> &= a_1^2\,\text{Var}(X_1) \\
> &\quad + \cdots + a_n^2\,\text{Var}(X_n)
> \end{aligned}
> $$

A linear combination of independent [[Normal Distribution|normal]] random variables is itself normal. The probabilities for such combinations are on [[Probabilities for Linear Combinations]].

> [!example]- Independent losses have $E[X] = 300$, $\text{Var}(X) = 2{,}500$, $E[Y] = 500$ and $\text{Var}(Y) = 10{,}000$. What are the mean and variance of $2X + 3Y$? {Example}
> - The mean is $2(300) + 3(500) = 2{,}100$.
> - The variance is
>
> $$2^2(2{,}500) + 3^2(10{,}000) = 100{,}000$$

## Sums and averages of i.i.d. random variables

For $n$ [[Independent and Identically Distributed|independent and identically distributed]] random variables with mean $\mu$ and variance $\sigma^2$, the sum has mean $n\mu$, and its variance is

> $$\text{Var}(X_1 + \cdots + X_n) = n\sigma^2$$

Their average $\bar{X}$ has mean $\mu$, and its variance is

> $$\text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

> [!example]- Claim sizes are i.i.d. with mean 400 and standard deviation 100. What are the mean and standard deviation of the average of 25 claims? {Example}
> - The average has mean 400.
> - Its variance is $\frac{100^2}{25} = 400$.
> - Its standard deviation is $\sqrt{400} = 20$, which is $\frac{100}{\sqrt{25}}$.

> [!trap] $n$ copies versus $n$ independent draws
> $nX$ is one random variable scaled by $n$, with variance $n^2 \sigma^2$. The sum of $n$ independent copies of $X$ has variance $n\sigma^2$.

## Counting with indicators

The indicator $I$ of an [[Event|event]] $E$ is 1 when $E$ occurs and 0 otherwise. Its mean is

> $$E[I] = P(E)$$

A count is a sum of indicators, so its mean is the sum of their probabilities, whether or not the events are independent.

> [!example]- Five cards are dealt from a standard deck. What is the expected number of aces? {Example}
> - Let $I_j$ be 1 if the $j$th card is an ace. Each card is an ace with probability $\frac{4}{52}$.
> - The number of aces is $I_1 + \cdots + I_5$.
> - Its mean is $5 \times \frac{4}{52} = 0.3846$.
