---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea5e2b66a5387c51186ebe9a2c2be2e9b7ee49400dafb5d5ce9117864043b264
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorems 6.6-6.8, Exercise 6.2.23, Exercise 6.3.17, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §5.3.1 Covariance and Correlation (independent implies Cov = 0, converse not necessarily true; uncorrelated implies Var(X+Y) = Var(X) + Var(Y)), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (SD of the sum of n independent policies sqrt(n) sigma, less than n sigma; CV = SD/mean) (PDF pp.4-5), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance and Standard Deviation.md
---

The **Variance** of a [[Random Variable|random variable]] $X$ with mean $\mu = E[X]$ is the expected squared deviation of $X$ from $\mu$. Its **Standard Deviation** is the square root of the variance, which is in the units of $X$. Both measure how far $X$ spreads around its mean.

The variance, written $\sigma^2$, is

> $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$

It is usually computed from the first two moments, as

> $$\text{Var}(X) = E[X^2] - \mu^2$$

- $E[X^2]$ is the second moment, $\sum x^2 \, P(X = x)$ for a discrete $X$ and $\int x^2 f(x)\,dx$ for a continuous $X$ with density $f$.

The standard deviation, written $\sigma$, is

> $$\text{SD}(X) = \sqrt{\text{Var}(X)}$$

Dividing $\sigma$ by $\mu$ gives the unitless [[Coefficient of Variation|coefficient of variation]].

> [!example]- The number of claims $N$ on a policy is 0, 1 or 2 with probabilities 0.6, 0.3 and 0.1. What are $\text{Var}(N)$ and $\text{SD}(N)$? {Example}
> - The mean is $E[N] = 0(0.6) + 1(0.3) + 2(0.1) = 0.5$.
> - The second moment is $E[N^2] = 0^2(0.6) + 1^2(0.3) + 2^2(0.1) = 0.7$.
> - The variance is $\text{Var}(N) = 0.7 - 0.5^2 = 0.45$.
> - The standard deviation is $\text{SD}(N) = \sqrt{0.45} \approx 0.67$.

> [!example]- Losses $X$ have density $f(x) = 3x^2$ on $0 < x < 1$. What is $\text{SD}(X)$? {Example}
> - The mean is $E[X] = \int_0^1 x \cdot 3x^2\,dx = 0.75$.
> - The second moment is $E[X^2] = \int_0^1 x^2 \cdot 3x^2\,dx = 0.60$.
> - The variance is $\text{Var}(X) = 0.60 - 0.75^2 = 0.0375$.
> - The standard deviation is $\text{SD}(X) = \sqrt{0.0375} \approx 0.194$.

## Variance of a linear function

For constants $a$ and $b$, the variance of $aX + b$ is

> $$\text{Var}(aX + b) = a^2\,\text{Var}(X)$$

The standard deviation is $\text{SD}(aX + b) = |a|\,\text{SD}(X)$. Adding $b$ moves the distribution without changing its spread.

> [!example]- A repair cost $X$ has standard deviation $\$200$. The bill is the cost plus a 10% surcharge plus a $\$50$ fee. What is the bill's standard deviation? {Example}
> - The bill is $1.1X + 50$.
> - The fee adds a constant, which leaves the spread unchanged.
> - The standard deviation is $1.1 \times 200 = \$220$.

## Variance of a sum

For two random variables $X$ and $Y$, the variance of their sum is

> $$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$$

- $\text{Cov}(X,Y)$ is the [[Covariance|covariance]] of $X$ and $Y$.

The covariance term drops out when $X$ and $Y$ are uncorrelated, $\text{Cov}(X,Y) = 0$, for example when they are [[Independent Random Variables|independent]]. Zero covariance does not imply independence. The rule for any [[Moments for Linear Combinations#Variance of a linear combination|linear combination]] follows from this one.

Standard deviations do **not** add: $\text{SD}(X+Y) \neq \text{SD}(X) + \text{SD}(Y)$. Add the variances, then take the square root. The standard deviation of the total of $n$ independent risks with standard deviation $\sigma$ each is $\sqrt{n}\,\sigma$, not $n\sigma$, which is why pooling independent risks reduces the risk per policy.

> [!example]- Two independent policies each have a loss standard deviation of $\$300$. What is the standard deviation of their combined loss? {Example}
> - The variances add, because the policies are independent: $300^2 + 300^2 = 180{,}000$.
> - The standard deviation is $\sqrt{180{,}000} \approx \$424.26$.

> [!trap] Adding standard deviations
> Adding the two standard deviations above gives $\$600$, against the correct $\$424.26$. Square each standard deviation, add the variances, and take the square root at the end.
