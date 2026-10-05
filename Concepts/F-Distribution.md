---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb68734ce1ca795682ae05a3e1a5bbb922fae67f9ccdea62db89284d52116f14
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

The **F-Distribution** $F(n, m)$ with $n$ numerator and $m$ denominator degrees of freedom is the distribution of the ratio of two independent [[Chi-Squared Distribution|chi-squared]] variables, each divided by its degrees of freedom. It is the [[Sampling Distribution|sampling distribution]] for comparing two variances and for testing groups of coefficients in linear models.

> $$F = \frac{U/n}{V/m} \sim F(n, m), \quad U \sim \chi^2(n),\ V \sim \chi^2(m)$$

> $$\begin{aligned} f(x) &= \frac{\Gamma\!\left(\frac{n + m}{2}\right)}{\Gamma\!\left(\frac{n}{2}\right)\Gamma\!\left(\frac{m}{2}\right)}\,\frac{n}{m} \\ &\quad \times \frac{\left(\frac{n}{m}x\right)^{n/2 - 1}}{\left(1 + \frac{n}{m}x\right)^{(n + m)/2}}, \quad x > 0 \end{aligned}$$

> $$E[F] = \frac{m}{m - 2}, \quad m > 2$$

> $$\text{Var}(F) = 2\left(\frac{m}{m - 2}\right)^2 \frac{n + m - 2}{n(m - 4)}, \quad m > 4$$

- $U$ and $V$ are independent. The mean depends only on the denominator degrees of freedom and is close to 1 when $m$ is large.
- **Reciprocal:** $1/F \sim F(m, n)$. A lower-tail critical value is therefore the reciprocal of an upper-tail one with the degrees of freedom swapped: the value below which $F(n, m)$ falls with probability $\alpha$ is $1/c$, where $c$ is the upper-$\alpha$ point of $F(m, n)$.
- **Link to t:** if $T \sim t(m)$ then $T^2 \sim F(1, m)$ — see [[Student's t-Distribution]].
- **Noncentral F:** if $U$ is instead [[Noncentral Chi-Squared Distribution|noncentral chi-squared]], the ratio has the noncentral F-distribution, whose mean is larger than that of the central $F(n, m)$.
- **Two normal variances:** for independent normal samples of sizes $n_X$ and $n_Y$, $\dfrac{S_X^2/\sigma_X^2}{S_Y^2/\sigma_Y^2} \sim F(n_X - 1,\ n_Y - 1)$, using the [[Sample Variance|sample variances]].
- **Nested linear models:** dropping $q$ of the $p$ predictors from a [[Linear Regression|linear regression]] fitted to $n$ observations raises the [[Residual Sum of Squares|residual sum of squares]] from $\text{RSS}$ to $\text{RSS}_0$; with normal errors and the $q$ coefficients truly zero,
  $\dfrac{(\text{RSS}_0 - \text{RSS})/q}{\text{RSS}/(n - p - 1)} \sim F(q,\ n - p - 1)$. With $q = p$ this is the overall F-statistic, and [[ANOVA]] tables test group means the same way.
- **GLMs:** to test $k$ added parameters, $\dfrac{D_S - D_B}{k\,\hat{\phi}_B}$ is compared with $F(k,\ n - p_B)$, where $D_S$ and $D_B$ are the unscaled [[Deviance|deviances]] of the small and big models, $\hat{\phi}_B$ is the big model's estimated [[Dispersion Parameter|dispersion parameter]] and $p_B$ its number of parameters.
- **The CAS MAS-I table** gives *upper-tail* critical values for areas $0.20,\ 0.10,\ 0.05,\ 0.02,\ 0.01$, numerator df $1$–$12$, $14, 16, 20, 24, 30, 40, 50, 75, 100, 200, 500, \infty$, and denominator df $1$–$26$. Find the denominator row, the upper-tail area, then the numerator column.

> [!example]- Can Two Predictors Be Dropped? {Example}
> A linear model for claim severity with $p = 5$ predictors is fitted to $n = 30$ observations, with $\text{RSS} = 120$. Refitting without two of the predictors gives $\text{RSS}_0 = 150$. Test at the 5% level whether both dropped coefficients are zero.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F &= \frac{(150 - 120)/2}{120/(30 - 5 - 1)} \\
> > &= \frac{15}{5} \\
> > &= 3.0
> > \end{align*}
> > $$
> >
> > Compare with $F(2, 24)$. In the table's denominator-24 rows, numerator column 2, the upper 5% point is $3.403$ and the upper 10% point is $2.538$. Since $2.538 < 3.0 < 3.403$, the p-value is between 0.05 and 0.10: do not reject at 5%. The data do not show that the two predictors are needed.

> [!example]- Comparing the Volatility of Two Territories {Example}
> Normal claim amounts are sampled from two territories: territory A has $n = 11$ and $s_A^2 = 2.4$; territory B has $n = 9$ and $s_B^2 = 0.8$. Test $H_0: \sigma_A^2 = \sigma_B^2$ against a two-sided alternative at the 10% level.
>
> > [!answer]-
> > Under $H_0$, $s_A^2/s_B^2 \sim F(10, 8)$, and the observed ratio is $2.4/0.8 = 3.0$. A two-sided 10% test puts 5% in each tail.
> >
> > - Upper 5% point of $F(10, 8)$, from the denominator-8 rows, numerator column 10: $3.347$.
> > - Lower 5% point: the reciprocal of the upper 5% point of $F(8, 10)$, which is $3.072$ (denominator-10 rows, numerator column 8), so $1/3.072 = 0.326$.
> >
> > Since $0.326 < 3.0 < 3.347$, do not reject $H_0$ at 10%. The ratio is large, but with samples this small an F-ratio of 3 is not unusual.
