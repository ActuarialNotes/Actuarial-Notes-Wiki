---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c9488742b8f6bfa364cb1f9676e775b384830787b87920c1b9b00e6c31023b9
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 Poisson as limit of binomial with np = lambda, b(n,p,k)/b(n,p,k-1) ~ lambda/k, eq. 5.2 p.189 (PDF p.197); §6.2 Poisson variance lambda p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 13.4 The Poisson Distribution: P(N_t=n) = e^{-rt}(rt)^n/n!; modes at a-1 and a for integer a; sum of independent Poissons; N_s given N_t = n is binomial(n, s/t), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "OpenStax Calculus Volume 2 (HTML fetched 2026-11-06), §6.3 Example 6.16: Maclaurin series of e^x = sum x^n/n!, all x, sha256:d31b601074d1b8cc7241191e2d4ec581e3524ae4ec5907a6c500f2ad4683f9dd — https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series"
    - "OpenStax Calculus Volume 1 (HTML fetched 2026-11-06), §1.5 natural log as the inverse of e^x, sha256:bb31120fbd3eefab30afe72f26fb353e84b3d34084c59d0f8b0521d1b4703113 — https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Distribution.md
---

![[Media/Figures/Poisson_Distribution.svg|340]]

A **Poisson Distribution** is the distribution of the number of events in a fixed interval, when events occur independently at a constant average rate. If the number of events $X$ has mean $\lambda$, the probability of $k$ events is

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$

- $k = 0, 1, 2, \ldots$.
- $\lambda > 0$.

The probability of no events is $P(X = 0) = e^{-\lambda}$.

> [!example]- Claims arrive at an average of 3 per month. What is the probability of at least 2 claims in a month? {Example}
> - The monthly count $X$ is Poisson with $\lambda = 3$.
> - "At least 2" has infinitely many terms, so use the complement.
> - $P(X = 0) = e^{-3} = 0.0498$.
> - $P(X = 1) = 3e^{-3} = 0.1494$.
> - $P(X \ge 2) = 1 - 0.0498 - 0.1494 = 0.8009$.

![[Media/Poisson_pmf.svg|500]]

## Mean and variance

The mean and the variance of a Poisson random variable are both $\lambda$:

> $$E[X] = \text{Var}(X) = \lambda$$

> [!example]- The number of claims is Poisson with variance 4. What is the probability of no claims? {Example}
> - The variance equals the mean, so $\lambda = 4$.
> - $P(X = 0) = e^{-4} = 0.0183$.

## Successive probabilities

Each probability is the one before it times $\lambda/k$:

> $$P(X = k) = \frac{\lambda}{k}\,P(X = k - 1)$$

The probabilities rise while $\lambda/k > 1$. So the most likely count, the [[Mode|mode]], is the whole-number part of $\lambda$, and it need not equal the mean. When $\lambda$ is a whole number, $\lambda - 1$ and $\lambda$ tie.

> [!example]- Claims are Poisson with mean 3. What are $P(X = k)$ for $k = 0$ to 5, and which count is most likely? {Example}
> Each probability is the one before it times $3/k$:
>
> | $k$ | 0 | 1 | 2 | 3 | 4 | 5 |
> | --- | --- | --- | --- | --- | --- | --- |
> | $P(X = k)$ | 0.0498 | 0.1494 | 0.2240 | 0.2240 | 0.1680 | 0.1008 |
>
> - $P(X = 3) = 0.2240 \times 3/3$, so 2 and 3 tie.
> - The most likely counts are 2 and 3.

## Finding the mean from the probability of no events

Since $P(X = 0) = e^{-\lambda}$, a given probability of no events fixes the mean:

> $$\lambda = -\ln P(X = 0)$$

> [!example]- 5% of months have no claims, and the monthly count is Poisson. What is the mean number of claims per month? {Example}
> - $e^{-\lambda} = 0.05$.
> - $\lambda = -\ln 0.05 = 3.00$.

A condition between two other probabilities is an equation in $\lambda$ too. A root with $\lambda \le 0$ is rejected, because $\lambda$ must be positive.

> [!example]- A Poisson count has $P(X = 2) = 3P(X = 4)$. What is its mean? {Example}
> - Write both sides with the formula and cancel $e^{-\lambda}$: $\frac{\lambda^2}{2} = \frac{3\lambda^4}{24}$.
> - So $\lambda^2 = 4$, with roots $2$ and $-2$.
> - The mean must be positive, so $\lambda = 2$.

> [!trap] "Half as likely" is not half the mean
> "Portfolio B is half as likely to have no claims as A" means $e^{-\lambda_B} = 0.5\,e^{-\lambda_A}$. With $\lambda_A = 2$, it gives $\lambda_B = 2 + \ln 2 = 2.69$, not 1.

## Sums of independent Poisson counts

If $X_1$ and $X_2$ are independent Poisson counts with means $\lambda_1$ and $\lambda_2$, their sum is a Poisson count with mean

> $$E[X_1 + X_2] = \lambda_1 + \lambda_2$$

A count over $t$ units of time, at a rate of $\lambda$ per unit, is Poisson with mean $\lambda t$.

> [!example]- A driver has claims at a Poisson rate of 0.2 per year. What is the probability of no claims in 5 years? {Example}
> - The 5-year count is Poisson with mean $0.2 \times 5 = 1$.
> - $P(X = 0) = e^{-1} = 0.3679$.

## Approximating a binomial count

When the number of trials $n$ is large and the success probability $p$ is small, a [[Binomial Distribution|binomial]] count is approximately Poisson with mean

> $$\lambda = np$$

> [!example]- 200 policies each have a claim with probability 0.01, independently. What is the probability of at least 2 claims? {Example}
> - The count is binomial with $n = 200$ and $p = 0.01$, so use $\lambda = 2$.
> - $P(X \ge 2) \approx 1 - e^{-2} - 2e^{-2} = 0.5940$.
> - The exact binomial probability is 0.5954.
