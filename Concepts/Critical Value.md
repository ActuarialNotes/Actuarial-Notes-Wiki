---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:04572b117381c1a21f7ba69f8a0f576430168c72295be2f5c7d8428e66ceb78f
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods §7.1.3.1 Critical values and p values: critical values are cut-offs exceeded with probability alpha under H0, bounding the rejection region; rejecting when the statistic exceeds the critical value is analogous to rejecting when the p-value is below alpha, sha256:1de003010ccb462a50f87f25eb777a581442a61423c97e884266d8e89b0ff797 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm"
    - "NIST/SEMATECH e-Handbook §1.3.5.8 Chi-Square Test for the Variance: T = (N-1)(s/sigma0)^2, upper, lower and two-tailed critical regions with two different chi-square points on N-1 df, sha256:479a6c6d7f68671d8a61d0daa073e5884a428b477d7b0308c50863c7f164d467 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda358.htm"
    - "NIST/SEMATECH e-Handbook §1.3.5.9 F-Test for Equality of Two Variances: F = s1^2/s2^2 against F_{alpha, N1-1, N2-1}, where F_alpha is the upper critical value and 'this is the opposite of the designation used by some texts', sha256:229d70acb2a3658aff51752469d7fe16a7e81068fbcca35f607010bbee74b536 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda359.htm"
    - "Siegrist, Random, ch.5 The F Distribution: if X ~ F(n, d) then 1/X ~ F(d, n) (gives F_{1-alpha,nu1,nu2} = 1/F_{alpha,nu2,nu1}), sha256:3944665d80391bebd86152461bb25ec44050bdcdaab3e7de15038cd8f8a9ad74 — https://www.randomservices.org/random/special/Fisher.html"
    - "Siegrist, Random, ch.8 §2 Tests in the Normal Model: Z test with sigma known, T = (M - mu0)/(S/sqrt n) ~ t_{n-1} and V = (n-1)S^2/sigma0^2 ~ chi^2_{n-1} for a normal sample, two-sided variance test with alpha/2 in each tail, test-interval duality, sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Penn State STAT 415 (2026 notes), Lesson 9 §9.1.4 (critical value c defined by alpha), §9.4 (two-tailed test splits alpha/2 into each tail, |Z| >= 1.96), §9.5 (t test with n - 1 df for normal data), sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018): t table p.16 'Tail areas (two-sided)' (df 15: 0.10 -> 1.753, 0.02 -> 2.602; Inf: 1.645, 1.960), chi-square p.20 'Lower-tail areas' (df 24: 0.950 -> 36.42, 0.990 -> 42.98), F table p.17 'Upper-tail areas', sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 4 'Test means and variances using critical values from a sampling distribution' (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Critical Value.md
---

A **Critical Value** is a boundary of the critical region of a [[Hypothesis Testing|hypothesis test]]. It is the value of the test statistic beyond which the null hypothesis $H_0$ is rejected. For an upper-tailed test with test statistic $W$ at significance level $\alpha$, the critical value $c$ is the value for which

> $$P(W \ge c \mid H_0) = \alpha$$

A lower-tailed test rejects $H_0$ when $W \le c$, with $P(W \le c \mid H_0) = \alpha$. A two-sided test puts probability $\alpha/2$ in each tail, so it has two critical values.

The upper $\alpha$ points $z_\alpha$, $t_{\alpha,\nu}$, $\chi^2_{\alpha,\nu}$ and $F_{\alpha,\nu_1,\nu_2}$ are the values with probability $\alpha$ above them under the standard [[Normal Distribution|normal]], [[Student's t-Distribution|$t$]], [[Chi-Squared Distribution|chi-squared]] and [[F-Distribution|$F$]] distributions with the degrees of freedom shown. The CAS MAS-I $t$ table is headed by the two-sided tail area, so $t_{0.025,\nu}$ is in the column headed 0.05. Its chi-squared table is headed by the lower-tail probability, so $\chi^2_{0.05,\nu}$ is in the column headed 0.95.

> [!example]- A $z$ test is run at significance level 0.05. What are its critical values when the alternative hypothesis is upper-tailed, lower-tailed and two-sided? {Example}
> - An upper-tailed test rejects when $Z \ge z_{0.05} = 1.645$.
> - A lower-tailed test rejects when $Z \le -1.645$.
> - A two-sided test puts 0.025 in each tail, so it rejects when $Z \le -1.960$ or $Z \ge 1.960$.

## Critical values for a test on a variance

For a random sample from a normal distribution, the test statistic for $H_0: \sigma^2 = \sigma_0^2$ is

> $$\chi^2 = \frac{(n-1)S^2}{\sigma_0^2}$$

- $S^2$ is the [[Sample Variance|sample variance]], with divisor $n - 1$.

Under $H_0$, this statistic has a chi-squared distribution with $n - 1$ degrees of freedom. Against $H_1: \sigma^2 > \sigma_0^2$ the test rejects when $\chi^2 \ge \chi^2_{\alpha,n-1}$, and against $H_1: \sigma^2 < \sigma_0^2$ it rejects when $\chi^2 \le \chi^2_{1-\alpha,n-1}$. The chi-squared distribution is not symmetric, so the two critical values of a two-sided test are not the same distance from the centre.

> [!example]- Claim severities are normal. A sample of 25 claims has sample standard deviation 1,300. Does a test of $H_0: \sigma^2 = 1{,}000^2$ against $H_1: \sigma^2 > 1{,}000^2$ reject $H_0$ at significance level 0.05, and at 0.01? {Example}
> - The test statistic is $\chi^2 = \frac{24 \times 1{,}300^2}{1{,}000^2} = 40.56$, with 24 degrees of freedom.
> - At 0.05 the critical value is $\chi^2_{0.05,24} = 36.415$. Because $40.56 > 36.415$, the test rejects $H_0$.
> - At 0.01 the critical value is $\chi^2_{0.01,24} = 42.980$. Because $40.56 < 42.980$, the test does not reject $H_0$.

## Critical values for a test on two variances

For independent random samples of sizes $n_1$ and $n_2$ from two normal distributions, the test statistic for $H_0: \sigma_1^2 = \sigma_2^2$ is

> $$F = \frac{S_1^2}{S_2^2}$$

- $S_1^2$ and $S_2^2$ are the sample variances of the two samples.

Under $H_0$, $F$ has an $F$ distribution with $n_1 - 1$ and $n_2 - 1$ degrees of freedom. Against $H_1: \sigma_1^2 < \sigma_2^2$ the test rejects for small values of $F$, below the lower $\alpha$ point. Tables give only upper points, and the lower point is

> $$F_{1-\alpha,\nu_1,\nu_2} = \frac{1}{F_{\alpha,\nu_2,\nu_1}}$$

- $\nu_1 = n_1 - 1$ and $\nu_2 = n_2 - 1$.

> [!example]- Independent normal samples of sizes 6 and 11 are used to test $H_0: \sigma_1^2 = \sigma_2^2$ against $H_1: \sigma_1^2 < \sigma_2^2$ at significance level 0.05. What is the critical value of $S_1^2 / S_2^2$? {Example}
> - Under $H_0$, $S_1^2 / S_2^2$ has an $F$ distribution with 5 and 10 degrees of freedom.
> - The alternative is lower-tailed, so the critical value is the lower 0.05 point, $F_{0.95,5,10}$.
> - With the degrees of freedom reversed, the table gives $F_{0.05,10,5} = 4.735$.
> - The critical value is $\frac{1}{4.735} = 0.211$, and the test rejects $H_0$ when $S_1^2 / S_2^2 \le 0.211$.

## Critical values for a discrete test statistic

When the test statistic is discrete, only certain significance levels are possible. Raising the critical value shrinks the critical region and lowers the significance level, so for an upper-tailed test at significance level at most $\alpha$, the critical value is the smallest $k$ for which

> $$P(W \ge k \mid H_0) \le \alpha$$

The upper-tail probabilities are added from the largest possible value of $W$ downward until the total would exceed $\alpha$.

> [!example]- In 10 independent trials with success probability $q$, a test of $H_0: q = 0.5$ against $H_1: q > 0.5$ rejects $H_0$ when the number of successes $S$ is at least $k$. What is the smallest $k$ for a significance level of at most 0.05? {Example}
> - Under $H_0$, $S$ is binomial with 10 trials and $q = 0.5$.
> - $P(S \ge 10) = 1/1{,}024 = 0.0010$ and $P(S \ge 9) = 11/1{,}024 = 0.0107$.
> - $P(S \ge 8) = 56/1{,}024 = 0.0547$, which exceeds 0.05.
> - The smallest critical value is $k = 9$, and the significance level of the test is 0.0107.

> [!trap] Using a two-sided critical value for a one-sided test
> An upper-tailed $z$ test at significance level 0.05 rejects when $Z \ge z_{0.05} = 1.645$. Using $z_{0.025} = 1.960$, the two-sided value, gives a test whose significance level is 0.025, not 0.05, and whose power is lower.
