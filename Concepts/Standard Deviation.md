---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:fbc50aef957163db5a8043a6723eb441bfdf5df7a87d97bfe32db871479f0b73
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.3 Variance: var>=0, =0 iff constant; var(a+bX)=b^2 var(X), sd(a+bX)=|b|sd(X); standard score; cv(X)=sd(X)/E(X), E(X)!=0, compares variability across different means, sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Ch. 9 Central Limit Theorem, Thms 9.2-9.5 pp.330-345 (PDF pp.338-354), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 6.5 Sample variance: s^2 = sum (x_i - m)^2/(n-1), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS, Exam 9 Content Outline, Fall 2026, Domains A-D tasks and readings (pp.3-6): no investment-return volatility or portfolio variance task, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "The Institutes / CAS, DISC RM syllabus, Course syllabus (pp.2-4): 1c Basic Risk Measures; no named measure, sha256:34fbee38024d3433de5d84c09138114c56edfb0336468dfefefdc78e23f67eac — https://www.casact.org/sites/default/files/2022-12/DISC_RM.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Standard Deviation.md
---

![[Media/Figures/Standard_Deviation.svg|340]]

A **Standard Deviation** is the positive square root of the [[Variance|variance]] of a [[Random Variable|random variable]]. The standard deviation of a random variable $X$, $\sigma$, is

> $$\sigma = \sqrt{\text{Var}(X)}$$

The standard deviation is measured in the same units as $X$, while the variance is in squared units. The variance is the square of the standard deviation, $\text{Var}(X) = \sigma^2$.

> [!example]- A claim amount $X$ has $E[X] = 200$ and $E[X^2] = 50{,}000$. What is its standard deviation? {Example}
> - The variance is the second moment less the square of the mean:
>
> $$
> \begin{aligned}
> \text{Var}(X) &= 50{,}000 - 200^2 \\
> &= 10{,}000
> \end{aligned}
> $$
>
> - The standard deviation is $\sigma = \sqrt{10{,}000} = 100$.

## Standard deviation of $aX + b$

For constants $a$ and $b$, the standard deviation of $aX + b$ is

> $$\sigma(aX + b) = |a|\,\sigma(X)$$

The factor is $|a|$, not $a^2$ as for the variance. Adding a constant does not change the standard deviation.

> [!example]- A claim has standard deviation 190. Every claim rises 10% with inflation, and then a handling fee of 20 is added. What is the new standard deviation? {Example}
> - The new claim is $1.1X + 20$.
> - The fee moves every claim and the mean together, so it drops out.
> - The standard deviation is $1.1 \times 190 = 209$.

## Standard deviation of a sum of independent random variables

Standard deviations do not add. For [[Independent Random Variables|independent]] random variables $X$ and $Y$, the variances add, so the standard deviation of $X + Y$ is

> $$\sigma(X + Y) = \sqrt{\text{Var}(X) + \text{Var}(Y)}$$

The sum of $n$ independent random variables, each with standard deviation $\sigma$, has standard deviation $\sigma\sqrt{n}$.

> [!example]- Each of 400 independent policies has annual claims with mean 250 and standard deviation 500. What is the approximate probability that the total claims exceed 110,000? {Example}
> - The total $S$ has mean $400 \times 250 = 100{,}000$.
> - Its standard deviation is $500\sqrt{400} = 10{,}000$.
> - By the [[Central Limit Theorem|central limit theorem]], $S$ is approximately [[Normal Distribution|normal]]. The value 110,000 is one standard deviation above the mean, $z = 1$.
> - The probability is $P(Z > 1) = 0.1587$.

> [!trap] Adding standard deviations
> Two independent claims, each with standard deviation 190, have a total with standard deviation $\sqrt{190^2 + 190^2} \approx 268.7$, not 380. The 380 is the standard deviation of one claim doubled. Add the variances, then take the square root.
