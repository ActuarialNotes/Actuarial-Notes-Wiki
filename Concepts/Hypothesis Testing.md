---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:47a3ecc5427f3854e872213188d849f09c18bc126a52e7623473eb51e27585e4
  sources:
    - "Siegrist, Random (randomservices.org), ch.8 Hypothesis Testing §1 Introduction: hypotheses H0/H1, rejection (critical) region, type 1 and type 2 errors table, significance level, power, two-sided/left/right-tailed tests named for the alternative, P-value as the smallest alpha that rejects, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Penn State STAT 415 (2026 notes), Lesson 9 Hypothesis Tests (Part I): §9.1 Defs 9.1-9.4 (H0, Ha, alpha, beta), power = 1 - beta, Type I/II error table, alpha chosen in advance (0.05 most common), §9.5 Z test with known sigma, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy), §13.1 pp.555-560 (PDF pp.561-566): p-value = probability of a statistic equal to or more extreme under H0, Table 13.1 decision/truth table, power = probability of correctly rejecting H0, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 3 'Test statistical hypotheses, including Type I and Type II errors' (PDF p.4), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §7.3.1.1 Analysis of paired observations: d_i = Y_i - Z_i, t = dbar/(s_d/sqrt N), nu = N - 1 — https://itl.nist.gov/div898/handbook/prc/section3/prc311.htm"
    - "OpenStax Introductory Statistics 2e §10.7 Matched or Paired Samples (LibreTexts): \"The differences are the data\"; differences from a normal population; df = number of pairs, not observations, minus 1; sd of matched pairs expected smaller than unmatched — https://stats.libretexts.org/Bookshelves/Introductory_Statistics/Introductory_Statistics_2e_(OpenStax)/10%3A_Hypothesis_Testing_with_Two_Samples/10.07%3A_Matched_or_Paired_Samples"
    - "NIST/SEMATECH e-Handbook §1.3.6.7.2 Critical Values of the Student t Distribution: nu = 5, 0.95 column 2.015, 0.975 column 2.571 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hypothesis Testing.md
---

![[Media/Figures/Hypothesis_Testing.svg|340]]

**Hypothesis Testing** is the use of a [[Random Sample|random sample]] to decide between two hypotheses about the distribution the sample was drawn from: the null hypothesis $H_0$ and the alternative hypothesis $H_1$. A test rejects $H_0$ when the sample falls in a critical region $C$, a set of possible samples chosen before the data are seen.

The four outcomes of a test are:

|  | $H_0$ is true | $H_1$ is true |
| --- | --- | --- |
| **Reject $H_0$** | [[Type I Error]] | Correct decision |
| **Do not reject $H_0$** | Correct decision | [[Type II Error]] |

The significance level of the test is the probability of a Type I error:

> $$\alpha = P(\mathbf{X} \in C \mid H_0)$$

- $\mathbf{X} = (X_1, \ldots, X_n)$ is the sample.

The probability of a Type II error is $\beta$. The [[Power of a Test|power]] of the test, $1 - \beta$, is the probability that the test rejects $H_0$ when $H_1$ is true.

> [!example]- An actuary tests $H_0$: the current rates are adequate. The test rejects $H_0$ and rates are increased. Later analysis shows that the rates were adequate. Which error occurred? {Example}
> - $H_0$ was true, because the rates were adequate.
> - The test rejected $H_0$, so the error is a Type I error.
> - Its probability before the data were seen was the significance level $\alpha$.

## Simple and composite hypotheses

A hypothesis is **simple** if it specifies the distribution completely, and **composite** otherwise. For a parameter $\theta$ with null hypothesis $H_0: \theta = \theta_0$, the alternative hypothesis decides which tail of the test statistic's distribution forms the critical region:

| Alternative | Written | Critical region |
| --- | --- | --- |
| One-sided, upper | $H_1: \theta > \theta_0$ | Upper tail |
| One-sided, lower | $H_1: \theta < \theta_0$ | Lower tail |
| Two-sided | $H_1: \theta \ne \theta_0$ | Both tails |

## Test for a mean with known variance

For a random sample from a [[Normal Distribution|normal distribution]] with known standard deviation $\sigma$, the test statistic for $H_0: \mu = \mu_0$ is

> $$Z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}}$$

- $\bar{X}$ is the [[Sample Mean|sample mean]].
- $\mu_0$ is the mean under $H_0$.

Under $H_0$, $Z$ has the standard normal distribution. Against $H_1: \mu > \mu_0$, the test rejects $H_0$ when $Z \ge z_\alpha$, the upper $\alpha$ point of the standard normal distribution and the [[Critical Value|critical value]] of the test.

> [!example]- Claim sizes are normal with standard deviation 800. A sample of 100 claims has mean 5,200. Does a test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ at significance level 0.05 reject $H_0$? {Example}
> - The test statistic is $Z = \frac{5{,}200 - 5{,}000}{800 / \sqrt{100}} = \frac{200}{80} = 2.50$.
> - The critical value of an upper-tailed test at 0.05 is $z_{0.05} = 1.645$.
> - Because $2.50 > 1.645$, the test rejects $H_0$.

## Test for a mean with unknown variance

When $\sigma$ is unknown, it is replaced by the sample standard deviation $S$, and the test statistic for $H_0: \mu = \mu_0$ is

> $$T = \frac{\bar{X} - \mu_0}{S / \sqrt{n}}$$

- $S^2$ is the [[Sample Variance|sample variance]], with divisor $n - 1$.

Under $H_0$, $T$ has a [[Student's t-Distribution|$t$ distribution]] with $n - 1$ degrees of freedom.

> [!example]- Claim severities are normal. A sample of 16 claims has mean 5,400 and sample standard deviation 800. Does a test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ reject $H_0$ at significance level 0.05, and at 0.01? {Example}
> - The test statistic is $T = \frac{5{,}400 - 5{,}000}{800 / \sqrt{16}} = \frac{400}{200} = 2.00$, with $16 - 1 = 15$ degrees of freedom.
> - At 0.05 the critical value is $t_{0.05,15} = 1.753$. Because $2.00 > 1.753$, the test rejects $H_0$.
> - At 0.01 the critical value is $t_{0.01,15} = 2.602$. Because $2.00 < 2.602$, the test does not reject $H_0$.

## Test for paired observations

When the observations come in dependent pairs, such as the same unit measured twice, the test uses the $n$ within-pair differences $d_i$ as one sample. The test statistic for $H_0: \mu_d = 0$ is

> $$T = \frac{\bar{d}}{s_d / \sqrt{n}}$$

- $\bar{d}$ and $s_d$ are the mean and the sample standard deviation of the differences.
- $\mu_d$ is the mean difference.
- $n$ is the number of pairs, not the number of observations.

Under $H_0$, and with normal differences, $T$ has a $t$ distribution with $n - 1$ degrees of freedom.

> [!example]- Two body shops each estimate the repair cost of the same six vehicles. Shop A's estimate minus Shop B's, in hundreds, is $3$, $1$, $4$, $-2$, $2$ and $4$. At significance level 0.05, are Shop A's estimates higher on average? {Example}
> - The estimates are paired by vehicle, so the six differences are one sample, with $\bar{d} = 12/6 = 2$.
> - The sample variance of the differences is $s_d^2 = \frac{1 + 1 + 4 + 16 + 0 + 4}{5} = 5.2$, so $s_d = 2.280$.
> - The test statistic is $T = \frac{2}{2.280 / \sqrt{6}} = 2.148$, with 5 degrees of freedom.
> - The alternative $H_1: \mu_d > 0$ is upper-tailed, and $t_{0.05,5} = 2.015$.
> - Because $2.148 > 2.015$, the test rejects $H_0$. Shop A's estimates are higher on average.

> [!trap] Treating "do not reject" as "accept"
> A test that does not reject $H_0$ has not shown that $H_0$ is true. With low power, a false $H_0$ is often not rejected, so the conclusion is only that the data are consistent with $H_0$.
