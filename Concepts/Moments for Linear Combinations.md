---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:09710645621588b769023ac72fb75a007d0d377b7084c5b4f49ed17d3b9f2155
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Ex. 6.3.17(a)-(c) and 6.3.18(a)-(c) printed p.281 (PDF p.289); Def. 7.1 p.286 (PDF p.294); Thm 7.1 and sum of two exponentials (PDF pp.299-301); Examples 7.5-7.6 (PDF p.302); Thms 9.4 and 9.6 (PDF pp.351, 365); continuity correction (PDF p.340), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Lemma 5.3 covariance properties incl. bilinearity; eq. 5.21 Var(aX+bY); correlation definition, -1<=rho<=1, rho=+-1 linear, rho(-X,Y)=-rho(X,Y), rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse fails; pairwise uncorrelated sums, sha256:10ac40b763d78b0fa19a116594da71769bf417b59a1714be707c7c410991a7fb — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.3 Variance: var(a+bX)=b^2 var(X); indicator var(X)=p(1-p), sha256:f0c1c5b0b4846e96d07f956599d1a428069c9402f2481a9e9ab3d6ca123f02bf — https://www.randomservices.org/random/expect/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: Events (cov and cor of indicators), var(X+Y), var(X-Y), cor = +-1 iff linear with that slope sign, uniform X and Y = X^2 uncorrelated, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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
