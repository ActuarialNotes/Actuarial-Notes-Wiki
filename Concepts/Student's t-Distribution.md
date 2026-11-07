---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:490b11fa68fc61f14178a80e6e12c4bd925450e3d101afefb21fc4f0cad05e75
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.4.3 t-distribution eq. (1.6) T = Z/(X^2/n)^(1/2) with Z ~ N(0,1), X^2 ~ chi-squared(n) independent; §1.4.4 item 2 eq. (1.8) T^2 ~ F(1, n), printed pp.10-11 (PDF pp.27-28), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "CAS Exam MAS-I Tables, 'Tail areas (two-sided) for t-distributions', columns 0.20, 0.10, 0.05, 0.02, 0.01; df 1-30, 35-60 by 5, 70, 80, 90, 100, 120, 400, Inf (df 15: 1.753, 2.947; df 18: 2.101, 2.552, 2.878), PDF p.16, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021, CAS-hosted copy), §3.1.2: 95% interval uses the 97.5% quantile of a t-distribution with n-2 df (footnote 3) and t = beta1-hat/SE has a t-distribution with n-2 df under beta1 = 0, printed pp.66-67 (PDF pp.76-77); §3.2.2 footnote 7 'The square of each t-statistic is the corresponding F-statistic' (q = 1 in (3.24)), printed p.77 (PDF p.87), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Student' page: pdf Gamma((n+1)/2)/(sqrt(n pi) Gamma(n/2)) (1 + t^2/n)^(-(n+1)/2); symmetric about 0; E(T) = 0 for n > 1; var n/(n-2) for n > 2; 1 df = Cauchy; f_n(t) -> standard normal density as n -> inf, sha256:6ff2ac51f78d5041cdf14dc24203650bbb08a608351a120f40e498876fd660c7 — https://www.randomservices.org/random/special/Student.html"
    - "Siegrist, Random, §6 Random Samples, 'Special Properties of Normal Samples' page: T = (M - mu)/(S/sqrt n) has the student t distribution with n-1 degrees of freedom, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Student's t-Distribution.md"
---

A **Student's t-Distribution** with $r$ degrees of freedom, written $t(r)$, is the distribution of a standard [[Normal Distribution|normal]] random variable divided by the square root of an independent [[Chi-Squared Distribution|chi-squared]] random variable over its degrees of freedom. A $t$ random variable with $r$ degrees of freedom is

> $$T = \frac{Z}{\sqrt{V/r}}$$

- $Z$ is a standard normal random variable.
- $V$ is a chi-squared random variable with $r$ degrees of freedom, independent of $Z$.

Its mean is

> $$E[T] = 0$$

- $r > 1$.

Its variance is

> $$\text{Var}(T) = \frac{r}{r-2}$$

- $r > 2$. For $r \le 2$ the variance does not exist.

The density is symmetric about 0 and has heavier tails than the standard normal density. As $r$ grows, $t(r)$ approaches the standard normal distribution, so with more than about 100 degrees of freedom the two-sided 5% critical value is close to 1.96. The square of a $t(r)$ random variable has the [[F-Distribution|F-distribution]] $F(1, r)$.

> [!example]- What are the mean and the variance of a $t$-distribution with 6 degrees of freedom? {Example}
> - The degrees of freedom exceed 1, so the mean is 0.
> - The degrees of freedom exceed 2, so the variance is $6/(6-2) = 1.5$.

## The t statistic for a normal sample

For a random sample of size $n$ from a normal distribution with mean $\mu$, the [[Sample Mean|sample mean]] standardized by the sample standard deviation $S$ has a $t$-distribution:

> $$\frac{\bar{X} - \mu}{S/\sqrt{n}} \sim t(n-1)$$

The CAS MAS-I $t$ table gives two-sided tail areas 0.20, 0.10, 0.05, 0.02 and 0.01. The entry $c$ in a column satisfies $P(|T| > c)$ equal to the column heading. A one-sided test at level $\alpha$ reads the column $2\alpha$. When the direction of a one-sided alternative matches the sign of the statistic, its [[p-Value|p-value]] is half the two-sided p-value. A p-value is bounded by finding the two critical values in the row that bracket the absolute value of the statistic.

> [!example]- Last year's mean claim severity was 1,000. A random sample of 16 claims this year has $\bar{x} = 1{,}150$ and $s = 200$, and claim sizes are normal. Is $H_0: \mu = 1{,}000$ rejected in favour of $H_1: \mu > 1{,}000$ at the 5% level, and what bound is there on the p-value? {Example}
> - The statistic is $(1{,}150 - 1{,}000)/(200/\sqrt{16}) = 150/50 = 3.0$, with $16 - 1 = 15$ degrees of freedom.
> - The one-sided 5% critical value is in the two-sided 0.10 column, 1.753.
> - The statistic exceeds 1.753, so $H_0$ is rejected.
> - The two-sided 0.01 column gives 2.947, which the statistic also exceeds, so the one-sided p-value is below 0.005.

## The paired t test

When each of $n$ subjects is measured twice, the test uses the differences $d_1, \ldots, d_n$, with mean $\bar{d}$ and sample standard deviation $s_d$. If the differences are normal with mean 0 under $H_0$, the paired $t$ statistic is

> $$t = \frac{\bar{d}}{s_d/\sqrt{n}}$$

- $n$ is the number of pairs, and the statistic has $n - 1$ degrees of freedom.

For a one-sided alternative, the differences are taken in the direction that makes the alternative a mean difference greater than 0, and the p-value is the upper tail.

> [!example]- Six claims are each estimated by two adjusters. The differences, adjuster A less adjuster B, are 10, 6, 14, $-4$, 8 and 8. Is there evidence at the 5% level that adjuster A's estimates are higher on average, and what bound is there on the p-value? {Example}
> - The mean difference is $\bar{d} = 42/6 = 7$.
> - The sample variance of the differences is $s_d^2 = (476 - 6 \times 7^2)/5 = 36.4$, so $s_d = 6.033$.
> - The statistic is $t = 7/(6.033/\sqrt{6}) = 2.842$, with 5 degrees of freedom.
> - The one-sided 5% critical value is 2.015, which the statistic exceeds, so $H_0$ is rejected.
> - The statistic lies between 2.571 (two-sided 0.05) and 3.365 (two-sided 0.02), so the one-sided p-value is between 0.01 and 0.025.

## The t statistic for a regression coefficient

In a [[Linear Regression|linear regression]] with $p$ predictors and an intercept fitted to $n$ observations, the statistic for $H_0: \beta_j = 0$ is

> $$t = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)}$$

- $\text{SE}(\hat{\beta}_j)$ is the standard error of $\hat{\beta}_j$ reported in the [[Parameter Estimate Tables|parameter estimate table]].
- The statistic has $n - p - 1$ degrees of freedom when $H_0$ is true and the errors are normal.

A $100(1-\alpha)\%$ [[Confidence Interval|confidence interval]] for $\beta_j$ is $\hat{\beta}_j \pm c\,\text{SE}(\hat{\beta}_j)$, where $c$ is the two-sided $\alpha$ critical value of $t(n - p - 1)$. For the same statistic, fewer degrees of freedom give heavier tails and a larger p-value.

> [!example]- A simple linear regression fitted to 20 territories gives $\hat{\beta}_1 = 0.42$ with standard error 0.15. What bound is there on the two-sided p-value for $\beta_1 = 0$, and what is a 95% confidence interval for $\beta_1$? {Example}
> - The statistic is $t = 0.42/0.15 = 2.8$, with $20 - 1 - 1 = 18$ degrees of freedom.
> - In the 18 degrees of freedom row, the 0.02 column is 2.552 and the 0.01 column is 2.878, so the p-value is between 0.01 and 0.02.
> - The 0.05 column is 2.101, so the interval is $0.42 \pm 2.101 \times 0.15 = 0.42 \pm 0.315$.
> - The 95% confidence interval for $\beta_1$ is $(0.105, 0.735)$.

> [!trap] Using the two-sided column for a one-sided test
> The CAS $t$ table's columns are two-sided areas. A one-sided test at the 5% level uses the 0.10 column. With 15 degrees of freedom its critical value is 1.753, not the 2.131 in the 0.05 column.
