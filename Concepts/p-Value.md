---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:c7767b19c24f2a00b499696f5ee3a91c8994b504b701ea490c4602bd6410812f
  sources:
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy): §3.1.2 p.67 (PDF p.77) p-value of the coefficient t-statistic; §3.2.2 p.77 (PDF p.87) each coefficient's p-value is 'the partial effect of adding that variable to the model' and with p = 100 null predictors about 5% of p-values fall below 0.05 by chance; §13.1.1 pp.556-558 (PDF pp.562-564) p-value definition, it is NOT the probability that H0 holds, it maps the statistic onto a number between 0 and 1, one- vs two-sided p-values (footnote 8), failing to reject may only reflect a small sample; §13.1.2 p.560 reject when p is below alpha, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Random, ch.8 §1 Introduction (P-value = smallest alpha for which H0 is rejected) and §2 Tests in the Normal Model (P-values 2[1 - Phi(|Z|)], 1 - Phi(Z), Phi(Z)), sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html ; sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 22 §22.1-22.2: p-value is the smallest alpha at which H0 is rejected, 'p is NOT equal to P(H0 | X)', and under the null P0(p-value <= u) = u for a continuous statistic (uniform on [0,1]), sha256:0770209dedee94e5af6d737ea4c6beb4f85386be3fa29e3d7d0c8335e56c56e5 — https://www.stat.cmu.edu/~siva/teaching/705/lec22.pdf"
    - "Penn State STAT 415 (2026 notes), Lesson 9 §9.4 (Def 9.5 P-value; two-tailed P-value = 2 x one-tailed) and Lesson 10 §10.4 (Wald statistic (theta-hat - c)/se, p = 2 Phi(-|Z*|)), sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html ; sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(2.50) = 0.9938, Phi(1.82) = 0.9656), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/p-Value.md
---

![[Media/Figures/p-Value.svg|340]]

A **p-Value** is the probability, computed under the null hypothesis $H_0$, that the test statistic of a [[Hypothesis Testing|hypothesis test]] is at least as extreme as the value observed, in the direction of the alternative hypothesis $H_1$. For an upper-tailed test with test statistic $W$ and observed value $w$, the p-value is

> $$p = P(W \ge w \mid H_0)$$

The p-value is the smallest significance level at which $H_0$ would be rejected. A test at significance level $\alpha$ rejects $H_0$ when $p \le \alpha$, which is exactly when $w$ is beyond the [[Critical Value|critical value]].

> [!example]- A $z$ test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ gives $z = 2.50$. What is the p-value, and does the test reject $H_0$ at significance level 0.05, and at 0.01? {Example}
> - The alternative is upper-tailed, so the p-value is $P(Z \ge 2.50) = 0.0062$.
> - Because $0.0062 < 0.05$ and $0.0062 < 0.01$, the test rejects $H_0$ at both levels.

## p-value of a two-sided test

For a two-sided alternative and a test statistic whose distribution under $H_0$ is symmetric about 0, such as $Z$ or $T$, the p-value counts both tails:

> $$p = 2P(W \ge |w| \mid H_0)$$

The one-sided p-value is half the two-sided p-value when $w$ lies on the side that $H_1$ points to. When a table gives only some percentiles, the p-value is bracketed by the tail areas of the two percentiles on either side of $|w|$.

> [!example]- A $t$ test with 12 degrees of freedom gives $t = 2.30$, and the alternative hypothesis is two-sided. Between which values does the p-value lie? {Example}
> - The table gives $t_{0.025,12} = 2.179$ and $t_{0.01,12} = 2.681$.
> - Because $2.179 < 2.30 < 2.681$, the upper tail beyond 2.30 is between 0.01 and 0.025.
> - The two-sided p-value is twice the upper tail, so it is between 0.02 and 0.05.
> - The test rejects $H_0$ at significance level 0.05 but not at 0.02.

## p-value of a regression coefficient

In the output of a [[Linear Regression|linear regression]] or a [[Generalized Linear Model|generalized linear model]], the test statistic for a coefficient $\beta_j$ is

> $$z = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)}$$

- $\text{SE}(\hat{\beta}_j)$ is the standard error of the estimate $\hat{\beta}_j$.

The p-value beside it tests $H_0: \beta_j = 0$, given the other terms in the model. It does not test any other value, such as $\beta_j = 1$. The predictor is significant at level $\alpha$ when this p-value is less than $\alpha$. A coefficient that is not significant for a numeric predictor shows only that there is no significant linear trend in that predictor on the scale of the linear predictor. It does not show that the predictor has no predictive value.

> [!example]- A Poisson GLM gives a territory coefficient $\hat{\beta} = 0.184$ with standard error 0.101. What is the two-sided p-value, and is the coefficient significant at 0.05? {Example}
> - The test statistic is $z = \frac{0.184}{0.101} = 1.82$.
> - The two-sided p-value is $2P(Z \ge 1.82) = 0.069$.
> - Because $0.069 > 0.05$, the coefficient is not significant at 0.05.

> [!trap] Reading the p-value as the probability that $H_0$ is true
> The p-value is a probability about the data, computed assuming $H_0$ is true. A p-value of 0.03 does not mean that $H_0$ has probability 0.03 of being true.
