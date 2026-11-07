---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:2a0d77736ab4d60f00660d9511596d5745035ec25edc7e20dfb6353668fed03c
  sources:
    - "NIST/SEMATECH e-Handbook §1.3.5.16 Kolmogorov-Smirnov Goodness-of-Fit Test (fetched 2026-10-05): D = max_i (F(Y_i) - (i-1)/N, i/N - F(Y_i)); distribution of D does not depend on the F tested; only continuous distributions; more sensitive near the centre than the tails; F fully specified, otherwise critical region invalid and determined by simulation; Technical Note: 5% critical value 0.294 at N = 20; example: 0.04301 at N = 1000, sha256:e5965a380db82d214fd2b4d8a6da5d8932c6ee91374c6e8b78a84d3bc90fb907 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm"
    - "NIST/SEMATECH e-Handbook §1.3.5.14 Anderson-Darling Test (fetched 2026-10-05): A^2 = -N - S, S = sum (2i-1)/N [ln F(Y_i) + ln(1 - F(Y_(N+1-i)))]; gives more weight to the tails than K-S; critical values depend on the distribution tested, tabulated for normal, lognormal, exponential, Weibull, logistic, extreme value type 1 and others, sha256:93676dee9c9f3f8236b95bbd8f47558c15e16aba78e6f96a389c49f342148f80 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35e.htm"
    - "Frees et al., Loss Data Analytics (open text), Ch 4 Model Selection and Estimation, Table 4.2 (K-S max|F_n - F|, D+ at i/n and D- at (i-1)/n; A-D n integral (F_n - F)^2/(F(1-F)) f dx) and the paragraph after it (A-D places greater emphasis on the tails), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "SOA Exam C Sample Questions, Question #172(iii), PDF p.111: K-S critical values 1.22/sqrt(n), 1.36/sqrt(n), 1.48/sqrt(n), 1.63/sqrt(n) at 0.10/0.05/0.025/0.01, sha256:2e44cec57f895a09b66bd11d32297b3d776d306d4a26b6146c30c1022b9130ed — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-quest.pdf"
    - "SOA Exam C Sample Solutions, Question #172, PDF p.62: n = 5 critical values 0.546, 0.608, 0.662, 0.729, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), all 20 pages checked: normal, life table, interest, Loss Models appendices, t, F and chi-square tables; no K-S table, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §13.2 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Kolmogorov-Smirnov Test.md
---

A **Kolmogorov-Smirnov Test** is a [[Hypothesis Testing|hypothesis test]] of whether individual observations come from a hypothesized continuous distribution with cdf $F^*(x)$. Its test statistic, the largest vertical distance between $F^*$ and the [[Empirical Distribution|empirical distribution function]] $F_n$ of the sample, is

> $$D = \max_{x} \left| F_n(x) - F^*(x) \right|$$

- $F_n(x)$ is the proportion of the $n$ observations that are at most $x$.

The empirical distribution function is a step function that jumps by $1/n$ at each observation, so the largest distance is found by comparing $F^*$ with the step just before and just at each observation. Computed this way, the test statistic is

> $$D = \max_{1 \le i \le n} \left\{ F^*(x_{(i)}) - \frac{i - 1}{n},\ \ \frac{i}{n} - F^*(x_{(i)}) \right\}$$

- $x_{(1)} \le \cdots \le x_{(n)}$ are the [[Order Statistics|order statistics]] of the sample.

The test rejects $H_0$ when $D$ exceeds the critical value. For a fully specified $F^*$, the large-sample critical values are $1.22/\sqrt{n}$, $1.36/\sqrt{n}$, $1.48/\sqrt{n}$ and $1.63/\sqrt{n}$ at significance levels 0.10, 0.05, 0.025 and 0.01, the same for every continuous $F^*$.

> [!example]- Eight claims are observed: 45, 110, 180, 260, 390, 520, 800 and 1,350. Does a Kolmogorov-Smirnov test at significance level 0.05 reject an [[Exponential Distribution|exponential distribution]] with mean 400? {Example}
> The hypothesized cdf is $F^*(x) = 1 - e^{-x/400}$, compared with the empirical step just before and at each claim:
>
> | $x_{(i)}$ | $F^*(x_{(i)})$ | $\frac{i-1}{8}$ | $\frac{i}{8}$ | Larger distance |
> | --- | --- | --- | --- | --- |
> | 45 | 0.1064 | 0.000 | 0.125 | 0.1064 |
> | 110 | 0.2404 | 0.125 | 0.250 | 0.1154 |
> | 180 | 0.3624 | 0.250 | 0.375 | 0.1124 |
> | 260 | 0.4780 | 0.375 | 0.500 | 0.1030 |
> | 390 | 0.6228 | 0.500 | 0.625 | 0.1228 |
> | 520 | 0.7275 | 0.625 | 0.750 | 0.1025 |
> | 800 | 0.8647 | 0.750 | 0.875 | 0.1147 |
> | 1,350 | 0.9658 | 0.875 | 1.000 | 0.0908 |
>
> - The largest distance is $D = 0.1228$, at $x = 390$.
> - The critical value at 0.05 is $1.36/\sqrt{8} = 0.481$.
> - Because $0.1228 < 0.481$, the test does not reject the exponential distribution with mean 400.

## Estimated parameters

The tabled critical values assume that $F^*$ is fully specified without reference to the data. When its parameters are estimated from the same sample, $F^*$ is fitted closer to $F_n$, so $D$ tends to be smaller, the tabled critical values are too large and the test rejects less often than its stated significance level. Unlike the [[Chi-Square Goodness-of-Fit Test|chi-square goodness-of-fit test]], whose degrees of freedom are reduced by one for each estimated parameter, the Kolmogorov-Smirnov test has no simple adjustment, and its critical values must then be found by simulation.

## Anderson-Darling test

The Anderson-Darling test weights the squared distance between $F_n$ and $F^*$ more heavily in the tails of the distribution. With $u_i = F^*(x_{(i)})$, its test statistic is

> $$A^2 = -n - \frac{1}{n} \sum_{i=1}^{n} (2i - 1)\left[\ln u_i + \ln(1 - u_{n+1-i})\right]$$

Unlike those of $D$, the critical values of $A^2$ depend on the hypothesized distribution.

> [!example]- Four losses, 20, 70, 130 and 260, are tested against an exponential distribution with mean 100. What is the Anderson-Darling statistic? {Example}
> - The values $u_i = 1 - e^{-x_{(i)}/100}$ are 0.1813, 0.5034, 0.7275 and 0.9257.
> - For an exponential distribution, $\ln(1 - u_{5-i}) = -x_{(5-i)}/100$, which gives $-2.6$, $-1.3$, $-0.7$ and $-0.2$.
> - The terms $(2i - 1)\left[\ln u_i + \ln(1 - u_{5-i})\right]$ are $-4.3078$, $-5.9590$, $-5.0909$ and $-1.9402$, which sum to $-17.2979$.
> - The statistic is $A^2 = -4 + \frac{17.2979}{4} = 0.3245$.
