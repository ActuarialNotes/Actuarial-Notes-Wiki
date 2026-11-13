---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:397eb172414df5d9b47dd435f60dfe3a7d2801e8be89e8ad62a5753c3bdc5d5f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.7 Conditional expected value: var(Y)=E[var(Y|X)]+var[E(Y|X)], sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance.md
---

![[Media/Figures/Variance.svg|340]]

A **Variance** is a measure of how spread out a [[Random Variable|random variable]] is around its [[Expected Value|mean]]. The variance of a random variable $X$ with mean $\mu = E[X]$, written $\text{Var}(X)$, is

> $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$

- $\text{Var}(X) \geq 0$, and $\text{Var}(X) = 0$ only when $X$ is a constant.

The [[Standard Deviation|standard deviation]] $\sigma$ is the square root of the variance, so the variance is also written $\sigma^2$.

> [!idea] The idea
> Squaring the deviations makes every one count as positive, and makes a large deviation count far more than a small one.

> [!example]- A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. What is its variance? {Example}
> The mean is $\mu = 130$. Each squared deviation is weighted by its probability:
>
> | $x$ | $x - \mu$ | $(x - \mu)^2$ | Weighted |
> | --- | --- | --- | --- |
> | 0 | $-130$ | 16,900 | 8,450 |
> | 100 | $-30$ | 900 | 270 |
> | 500 | 370 | 136,900 | 27,380 |
>
> - The 500 claim has probability only 0.2, yet it supplies three-quarters of the variance.
> - Adding the last column gives $\text{Var}(X) = 36{,}100$.

## Variance from the second moment

Expanding the square gives the variance from the first two [[Moment|moments]] of $X$:

> $$\text{Var}(X) = E[X^2] - (E[X])^2$$

- $E[X^2]$ is the second moment of $X$.

Rearranged, the second moment is the variance plus the square of the mean.

For $X$ [[Uniform Continuous Distribution|uniform]] on $(a, b)$, the second moment is

> $$E[X^2] = \frac{a^2 + ab + b^2}{3}$$

> [!example]- A loss $X$ is uniform on $(0, 1000)$. What is $\text{Var}(X)$? {Example}
> - The density is $f(x) = \frac{1}{1000}$ on $(0, 1000)$, and the mean is $E[X] = 500$.
> - The second moment and the variance are
>
> $$
> \begin{aligned}
> E[X^2] &= \int_0^{1000} \frac{x^2}{1000}\,dx \\
> &= 333{,}333.3 \\
> \text{Var}(X) &= 333{,}333.3 - 500^2 \\
> &= 83{,}333.3
> \end{aligned}
> $$

> [!trap] Confusing $E[X^2]$ with $(E[X])^2$
> The second moment and the square of the mean are different numbers. For a claim of 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2, they are 53,000 and 16,900. Using $E[X^2]$ alone as the variance, or forgetting to square the mean, gives a wrong answer that is usually among the options.

## Variance of $aX + b$

For constants $a$ and $b$, the variance of $aX + b$ is

> $$\text{Var}(aX + b) = a^2\,\text{Var}(X)$$

Adding a constant moves every value and the mean by the same amount, so it does not change the variance.

> [!example]- A claim has variance 36,100. Every claim rises 10% with inflation, and then a handling fee of 20 is added. What is the new variance? {Example}
> - The new claim is $1.1X + 20$.
> - The fee of 20 moves every claim and the mean together, so it drops out.
> - The variance is $1.1^2 \times 36{,}100 = 43{,}681$.

## Variance of a sum of independent random variables

For constants $a$ and $b$ and [[Independent Random Variables|independent]] random variables $X$ and $Y$, the variance of $aX + bY$ is

> $$\text{Var}(aX + bY) = a^2\,\text{Var}(X) + b^2\,\text{Var}(Y)$$

When $X$ and $Y$ are not independent, the variance also has the term $2ab\,\text{Cov}(X, Y)$, from their [[Covariance|covariance]].

> [!example]- Two independent claims $X_1$ and $X_2$ each have variance 36,100. What are the variances of $X_1 + X_2$, $X_1 - X_2$ and $2X_1$? {Example}
> - The variances add, so $\text{Var}(X_1 + X_2) = 72{,}200$.
> - The coefficient $-1$ is squared, so $\text{Var}(X_1 - X_2) = 72{,}200$ as well.
> - One claim doubled has $\text{Var}(2X_1) = 4 \times 36{,}100$, which is 144,400.

## The law of total variance

When $X$ depends on another random variable $Y$, the variance of $X$ is

> $$\text{Var}(X) = E[\text{Var}(X \mid Y)] + \text{Var}(E[X \mid Y])$$

- $\text{Var}(X \mid Y)$ is the variance of $X$ given $Y$.
- $E[X \mid Y]$ is the mean of $X$ given $Y$.

The first term is the average spread within each value of $Y$. The second is the spread of the means between values of $Y$. See [[Variance for Conditional and Marginal Distributions]].

> [!example]- Half of a portfolio's policies are low risk, with claims of mean 100 and variance 2,500. The other half are high risk, with mean 300 and variance 10,000. What is the variance of the claims of a policy chosen at random? {Example}
> - Let $Y$ be the risk class. The class variances average to 6,250.
> - The class means 100 and 300 have mean 200 and variance 10,000.
> - The variance is
>
> $$
> \begin{aligned}
> \text{Var}(X) &= 6{,}250 + 10{,}000 \\
> &= 16{,}250
> \end{aligned}
> $$
