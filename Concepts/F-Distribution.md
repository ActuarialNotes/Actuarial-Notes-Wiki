---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:af3f97fc0ae69db4b292951f3cc58bc580e3e639d172758bef9d104dbe581a0f
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.4.4 F-distribution item 1 eq. (1.7) F = (X1^2/n)/(X2^2/m), item 2 eq. (1.8) T^2 ~ F(1, n), item 3 the non-central F (numerator non-central chi-squared, denominator central chi-squared; 'The mean of a non-central F-distribution is larger than the mean of central F-distribution with the same degrees of freedom'), printed pp.10-11 (PDF pp.27-28), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "CAS Exam MAS-I Tables, 'Selected Upper-tail areas for F-distributions' (den 24, num 2: 0.05 = 3.403, 0.10 = 2.538; den 8, num 10: 0.05 = 3.347; den 10, num 8: 0.05 = 3.072), PDF pp.17-19, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021, CAS-hosted copy), §3.2.2 eqs. (3.23)-(3.24), printed pp.76-77 (PDF pp.86-87), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Random, §4 Special Distributions, 'Fisher' page: density; E = d/(d-2) for d > 2; var 2(d/(d-2))^2 (n+d-2)/(n(d-4)) for d > 4; 1/X ~ F(d, n), sha256:3944665d80391bebd86152461bb25ec44050bdcdaab3e7de15038cd8f8a9ad74 — https://www.randomservices.org/random/special/Fisher.html"
    - "Siegrist, Random, §6 Random Samples, 'Special Properties of Normal Samples' page: ratios of sample variances have F distributions, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §6.2.1 Nested Models and the F-Test, Equation 17, printed pp.65-66 (PDF pp.75-76), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Rodríguez, Generalized Linear Models notes, Appendix B §B.3.2: in the normal linear model the criterion divided by p2 - p1 is F with p2 - p1 and n - p2 df, PDF p.7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition), publisher eBook preview, Contents PDF p.7 (§4.7 Chi-Square Tests), PDF p.8 (§8.3 Likelihood Ratio Tests) and PDF p.9 (§9.3 Noncentral chi^2 and F-Distributions), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/F-Distribution.md
---

An **F-Distribution** with $r_1$ numerator and $r_2$ denominator degrees of freedom, written $F(r_1, r_2)$, is the distribution of the ratio of two independent [[Chi-Squared Distribution|chi-squared]] random variables, each divided by its degrees of freedom. An $F$ random variable with $r_1$ and $r_2$ degrees of freedom is

> $$W = \frac{U/r_1}{V/r_2}$$

- $U$ is a chi-squared random variable with $r_1$ degrees of freedom.
- $V$ is a chi-squared random variable with $r_2$ degrees of freedom, independent of $U$.

Its mean is

> $$E[W] = \frac{r_2}{r_2 - 2}$$

- $r_2 > 2$.

The reciprocal $1/W$ has the $F(r_2, r_1)$ distribution. The square of a random variable with the [[Student's t-Distribution|t-distribution]] $t(r)$ has the $F(1, r)$ distribution.

The CAS MAS-I $F$ table gives upper-tail critical values for the areas 0.20, 0.10, 0.05, 0.02 and 0.01. A value is found from the denominator degrees of freedom, the upper-tail area and the numerator degrees of freedom.

> [!example]- What is the mean of an $F$-distribution with 2 and 24 degrees of freedom? {Example}
> - The mean depends only on the denominator degrees of freedom, $r_2 = 24$.
> - The mean is $24/(24 - 2) = 1.091$.

## Comparing two normal variances

For independent random samples of sizes $n_1$ and $n_2$ from normal distributions with variances $\sigma_1^2$ and $\sigma_2^2$, the [[Sample Variance|sample variances]] $S_1^2$ and $S_2^2$ satisfy

> $$\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2} \sim F(n_1 - 1, n_2 - 1)$$

Under $H_0: \sigma_1^2 = \sigma_2^2$ the unknown variances cancel, and the test statistic is $S_1^2/S_2^2$. A two-sided test also needs a lower-tail value, which the table does not give. If $c$ is the value that $F(r_2, r_1)$ exceeds with probability $\alpha$, then the value that $F(r_1, r_2)$ falls below with probability $\alpha$ is

> $$\frac{1}{c}$$

> [!example]- Normal claim amounts are sampled from two territories. Territory 1 has 11 claims with $s_1^2 = 2.4$, and territory 2 has 9 claims with $s_2^2 = 0.8$. Is $H_0: \sigma_1^2 = \sigma_2^2$ rejected against a two-sided alternative at the 10% level? {Example}
> - Under $H_0$, $S_1^2/S_2^2$ is $F(10, 8)$, and the observed ratio is $2.4/0.8 = 3.0$.
> - A two-sided 10% test puts 5% in each tail.
> - The upper 5% value of $F(10, 8)$ is 3.347.
> - The upper 5% value of $F(8, 10)$ is 3.072, so the lower 5% value of $F(10, 8)$ is $1/3.072 = 0.326$.
> - The ratio 3.0 lies between 0.326 and 3.347, so $H_0$ is not rejected.

## Testing nested linear models

To test whether $q$ of the $p$ predictors in a [[Linear Regression|linear regression]] fitted to $n$ observations can be dropped, the reduced model's [[Residual Sum of Squares|residual sum of squares]] $\text{RSS}_0$ is compared with the full model's $\text{RSS}$. The partial $F$ statistic is

> $$\frac{(\text{RSS}_0 - \text{RSS})/q}{\text{RSS}/(n - p - 1)}$$

- $n - p - 1$ is the residual degrees of freedom of the full model.

When the $q$ coefficients are 0 and the errors are normal, the statistic has the $F(q, n - p - 1)$ distribution, and a large value means the added terms are significant. For a [[Generalized Linear Model|GLM]] whose [[Dispersion Parameter|dispersion parameter]] is estimated, the drop in [[Deviance|deviance]] divided by $q\hat{\phi}$ is compared with $F$ on $q$ and the larger model's residual degrees of freedom. [[ANOVA]] tables test group means in the same way.

> [!example]- A linear model with 5 predictors is fitted to 30 observations, with RSS 120. Without two of the predictors, the RSS is 150. Is the hypothesis that both dropped coefficients are 0 rejected at the 5% level? {Example}
> - The numerator is $(150 - 120)/2 = 15$, and the denominator is $120/(30 - 5 - 1) = 5$.
> - The statistic is $15/5 = 3.0$.
> - It is compared with $F(2, 24)$, whose upper 10% value is 2.538 and upper 5% value is 3.403.
> - The p-value is between 0.05 and 0.10, so the hypothesis is not rejected at the 5% level.

> [!trap] Swapping the degrees of freedom
> The numerator degrees of freedom belong to the statistic in the numerator. For $S_1^2/S_2^2$ with 11 and 9 observations they are $F(10, 8)$, whose upper 5% value is 3.347. Reading $F(8, 10)$ gives 3.072.
