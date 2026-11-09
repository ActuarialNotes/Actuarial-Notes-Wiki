---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:26b577d13c14439c21a05a4f8d7a69992629c55e22e189e105dc934f83b8b977
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.4.2 items 4, 6, 7 printed pp.9-10 (PDF pp.26-27): non-central chi-squared chi2(n, lambda) with lambda = sum mu_i^2 for unit-variance normals, mean n + lambda, variance 2n + 4lambda; y'V^-1 y ~ chi2(n, mu'V^-1 mu) for y ~ MVN(mu, V); reproductive property (sum of independent chi2(n_i, lambda_i) is chi2(sum n_i, sum lambda_i)); §1.4.4 item 3 printed p.11 (PDF p.28): non-central F = ratio of non-central chi2/df to independent central chi2/df, mean larger than the central F's, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Levine, STAT 517 Lecture 24 'Noncentral chi-squared, F, and multiple comparisons' (Purdue, Spring 2016; course reading Hogg, McKean & Craig), PDF pp.2-5: Y = (1/sigma^2) sum X_i^2 with X_i ~ N(mu_i, sigma^2) has mgf (1-2t)^(-r/2) exp(t theta/(1-2t)), t < 1/2, theta = sum mu_i^2/sigma^2; theta = 0 gives central chi2_r; theta = Q(mu_1..mu_n)/sigma^2 for a quadratic form with Q/sigma^2 ~ chi2_r(theta) (p.4); noncentral F = r2 U/(r1 V) with U ~ chi2_r1(theta), V ~ chi2_r2 independent, sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf"
    - "Levine, STAT 517 Lecture 25 'Analysis of Variance (ANOVA)', PDF pp.5, 8-9: one-way F = Q4/(b-1) over Q3/[b(a-1)]; under the alternative the noncentrality parameter is found by substituting means into the between-groups quadratic form, (a/sigma^2) sum beta_j^2, and F is noncentral F with that parameter, sha256:dcf94ad635982fc5cd206745bef2eb834f662f13ec8969e6d34e92ec51531750 — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture25_STAT517.pdf"
    - "Wikipedia, 'Noncentral chi-squared distribution' (oldid 1366665071, retrieved 2026-10-05), Definitions/Density/Properties: lambda = sum mu_i^2 for unit-variance normals, 'some references define lambda in other ways, such as half of the above sum, or its square root'; pdf = sum_i e^(-lambda/2)(lambda/2)^i/i! f_(k+2i)(x) (Poisson(lambda/2) mixture); mean k + lambda; variance 2(k + 2lambda); mgf exp(lambda t/(1-2t))/(1-2t)^(k/2) for 2t < 1; sums of independent noncentral chi-squares add k and lambda, sha256:37cf19212c3e70760508abf6874b9f4e1a55490a371581a016cbcf6e4c1cf455 — https://en.wikipedia.org/wiki/Noncentral_chi-squared_distribution"
    - "Wikipedia, 'Noncentral F-distribution' (oldid 1307839149, retrieved 2026-10-05), Moments: E[F] = nu2(nu1 + lambda)/(nu1(nu2 - 2)) for nu2 > 2, sha256:3221dec7e1010a7a57e943dfe0e0c49423dd331cefc752f6967ac1a50807fae7 — https://en.wikipedia.org/wiki/Noncentral_F-distribution"
    - "CAS Exam MAS-I Tables (version 01/15/2018): chi-square lower-tail 0.950, df 4 = 9.49 (PDF p.20); F(2,15) upper 0.05 = 3.682 (PDF p.18); the handout's statistical tables (PDF pp.16-20) are central t, F and chi-square only, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition) — publisher eBook preview, Contents PDF p.9: §9.3 'Noncentral chi-square and F-Distributions' p.536 (body not in preview), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Noncentral Chi-Squared Distribution.md
---

A **Noncentral Chi-Squared Distribution** with $r$ degrees of freedom and noncentrality parameter $\theta$, written $\chi^2(r, \theta)$, is the distribution of the sum of the squares of $r$ independent [[Normal Distribution|normal]] random variables $X_1, \ldots, X_r$ divided by their common variance $\sigma^2$, when their means $\mu_1, \ldots, \mu_r$ are not all 0. A noncentral chi-squared random variable is

> $$Y = \frac{1}{\sigma^2}\sum_{i=1}^{r} X_i^2$$

and its noncentrality parameter is

> $$\theta = \frac{1}{\sigma^2}\sum_{i=1}^{r} \mu_i^2$$

With $\theta = 0$, $Y$ has the central [[Chi-Squared Distribution|chi-squared distribution]] $\chi^2(r)$.

The mean of $Y$ is

> $$E[Y] = r + \theta$$

and its variance is

> $$\text{Var}(Y) = 2r + 4\theta$$

> [!example]- Four lines' loss-ratio deviations from plan are independent and normal with standard deviation 0.05, and their true means are 0.05, $-0.05$, 0.10 and 0. What are the distribution, mean and variance of $Y = \sum_{i=1}^{4} X_i^2/0.05^2$, and what is the probability that it exceeds the 5% critical value of $\chi^2(4)$? {Example}
> - The noncentrality parameter is $\theta = (0.0025 + 0.0025 + 0.01 + 0)/0.0025 = 6$.
> - $Y$ is $\chi^2(4, 6)$, with mean $4 + 6 = 10$ and variance $2 \times 4 + 4 \times 6 = 32$.
> - The upper 5% value of the central $\chi^2(4)$ is 9.49.
> - Software gives $P(Y > 9.49) = 0.470$.

## The noncentral F-distribution

If $U$ is $\chi^2(r_1, \theta)$ and $V$ is an independent central $\chi^2(r_2)$, the ratio

> $$W = \frac{U/r_1}{V/r_2}$$

has the noncentral $F$-distribution $F(r_1, r_2, \theta)$. Its mean is

> $$E[W] = \frac{r_2(r_1 + \theta)}{r_1(r_2 - 2)}$$

- $r_2 > 2$.

With $\theta = 0$ it is the central [[F-Distribution|F-distribution]], whose mean $r_2/(r_2 - 2)$ is smaller.

## Power of the one-way ANOVA F test

In a one-way [[ANOVA]] with $k$ groups of $n$ observations, common variance $\sigma^2$ and true group means $\mu_1, \ldots, \mu_k$, the between-groups sum of squares divided by $\sigma^2$ is $\chi^2(k-1, \theta)$ with

> $$\theta = \frac{n}{\sigma^2}\sum_{j=1}^{k} \left(\mu_j - \bar{\mu}\right)^2$$

- $\bar{\mu}$ is the average of the $k$ group means.

The $F$ statistic therefore has the $F(k - 1, k(n-1), \theta)$ distribution, which is central only when all the group means are equal. The [[Power of a Test|power]] of the test is the probability that this noncentral $F$ exceeds the central critical value. With the degrees of freedom and the critical value fixed, the power increases as $\theta$ increases.

The noncentrality parameter depends only on the deviations of the group means from their average. Adding the same constant to every group mean leaves $\theta$ and the power unchanged. A wider spread of the means, more observations per group or a smaller $\sigma$ raises them.

> [!example]- Mean log severity in three territories is truly 8.0, 8.3 and 8.6, with $\sigma = 0.4$. A one-way ANOVA at the 5% level uses 6 claims per territory. What are the noncentrality parameter, the mean of the $F$ statistic and the power? {Example}
> - The average of the means is 8.3, so $\sum(\mu_j - \bar{\mu})^2 = 0.09 + 0 + 0.09 = 0.18$.
> - The noncentrality parameter is $\theta = 6 \times 0.18/0.4^2 = 6.75$.
> - The statistic is $F(2, 15, 6.75)$, with mean $\dfrac{15(2 + 6.75)}{2(15 - 2)} = 5.05$.
> - The upper 5% value of the central $F(2, 15)$ is 3.682, and software gives a power of $P(W > 3.682) = 0.546$.

> [!trap] Using the halved noncentrality parameter
> With $\theta = \sum \mu_i^2/\sigma^2$ the mean is $r + \theta$. A text that defines the parameter as $\lambda = \theta/2$ writes the mean as $r + 2\lambda$. Mixing the two gives a mean that is off by $\theta/2$.
