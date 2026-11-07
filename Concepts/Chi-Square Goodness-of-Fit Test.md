---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa3b5bacddf792229038a002d34f319545aa8198e1642530ac1a43dc319f2f29
  sources:
    - "Siegrist, Random, ch.8 §6 Chi-Square Tests: statistic sum (O_j - e_j)^2/e_j, reject iff V > chi^2_(k-1)(1 - alpha), k - 1 df because the counts sum to n, rule of thumb e_j >= 5 and as many cells as possible subject to it, one df lost per estimated parameter, test of independence with E_ij = N_i M_j / n on (k-1)(m-1) df, sha256:379cf5939801c94b251884c0c82f0e6efc7ecce35cec11a645881d7ca9c7a6aa — https://www.randomservices.org/random/hypothesis/ChiSquare.html"
    - "NIST/SEMATECH e-Handbook §1.3.5.15 Chi-Square Goodness-of-Fit Test: E_i = N(F(Y_u) - F(Y_l)); k - c df with c = estimated parameters + 1; value depends on the binning; applies to discrete distributions such as the binomial and Poisson while K-S and A-D are restricted to continuous ones, sha256:e0110e7f23ed6b65947c69d9970817744285553a943548b52d7a527794c88b13 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm"
    - "SOA Exam C Sample Solutions (C-09-15), Question #222, PDF p.80: Poisson lambda estimated from the data, four cells, d.f. = 4 - 1 - 1 = 2, critical values 5.99 (5%), 7.38 (2.5%), sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), p.20 chi-square 'Lower-tail areas': df 2 0.950 -> 5.99, 0.975 -> 7.38; df 3 0.950 -> 7.81, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §4.7; Tse §13.2, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §13.2.3 'Chi-square goodness-of-fit test' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chi-Square Goodness-of-Fit Test.md
---

A **Chi-Square Goodness-of-Fit Test** is a [[Hypothesis Testing|hypothesis test]] of whether the counts of $n$ observations in $k$ categories agree with the probabilities $p_1, \ldots, p_k$ that a hypothesized distribution assigns to the categories. The test statistic is

> $$Q = \sum_{j=1}^{k} \frac{(O_j - n p_j)^2}{n p_j}$$

- $O_j$ is the observed count in category $j$, and $O_1 + \cdots + O_k = n$.
- $n p_j$ is the expected count in category $j$ under $H_0$.

Under $H_0$, $Q$ has approximately a [[Chi-Squared Distribution|chi-squared distribution]] with $k - 1$ degrees of freedom when the probabilities $p_j$ are fully specified. Large differences between the observed and expected counts make $Q$ large, so the test rejects $H_0$ at significance level $\alpha$ when $Q$ exceeds the upper $\alpha$ point $\chi^2_{\alpha,k-1}$. The approximation needs every expected count to be at least 5, and sparse categories are combined until this holds.

> [!example]- A die is rolled 120 times, and the faces 1 to 6 come up 25, 17, 15, 23, 24 and 16 times. Does a test at significance level 0.05 reject the hypothesis that the die is fair? {Example}
> - Under $H_0$ each face has probability $1/6$, so each expected count is $120/6 = 20$.
> - The squared differences from 20 are 25, 9, 25, 9, 16 and 16, which sum to 100.
> - The test statistic is $Q = 100/20 = 5.0$, with $6 - 1 = 5$ degrees of freedom.
> - Because $5.0 < \chi^2_{0.05,5} = 11.07$, the test does not reject the hypothesis that the die is fair.

## Testing a fitted distribution

When the hypothesized distribution has $r$ parameters estimated from the same data, one more degree of freedom is lost for each of them. The number of degrees of freedom of $Q$ is then

> $$k - 1 - r$$

> [!example]- Of 500 policies, 260 had no claims, 190 had one claim, 40 had two and 10 had three. Does a test at significance level 0.05 reject a [[Poisson Distribution|Poisson]] model fitted by maximum likelihood, with the categories 0, 1, 2 and 3 or more? {Example}
> - The maximum likelihood estimate is the sample mean, $\hat{\lambda} = \frac{190 + 80 + 30}{500} = 0.6$.
> - The Poisson probabilities are 0.5488, 0.3293 and 0.0988, which leaves 0.0231 for 3 or more claims.
> - The expected counts are 274.41, 164.64, 49.39 and 11.56.
> - The terms $(O_j - n p_j)^2 / (n p_j)$ are 0.756, 3.905, 1.786 and 0.210, so $Q = 6.66$.
> - One parameter was estimated, so there are $4 - 1 - 1 = 2$ degrees of freedom and $\chi^2_{0.05,2} = 5.991$.
> - Because $6.66 > 5.991$, the test rejects the Poisson model.

## Test of independence in a contingency table

The same statistic tests whether two classifications of the $n$ observations are independent. In a table with $I$ rows and $J$ columns, the expected count of the cell in row $i$ and column $j$ under independence is

> $$\frac{(\text{row } i \text{ total})(\text{column } j \text{ total})}{n}$$

The statistic $Q$, summed over all $IJ$ cells, is compared with a chi-squared distribution with $(I - 1)(J - 1)$ degrees of freedom.

> [!example]- Of 200 urban policies, 30 had a claim, and of 300 rural policies, 20 had a claim. Does a test at significance level 0.05 reject the hypothesis that having a claim is independent of territory? {Example}
> - The row totals are 200 and 300, the column totals are 50 with a claim and 450 without, and $n = 500$.
> - The expected counts are $\frac{200 \times 50}{500} = 20$ and 180 for urban, and 30 and 270 for rural.
> - The terms are $\frac{(30 - 20)^2}{20} = 5.000$, 0.556, 3.333 and 0.370, so $Q = 9.26$.
> - The table has $(2 - 1)(2 - 1) = 1$ degree of freedom, and $\chi^2_{0.05,1} = 3.841$.
> - Because $9.26 > 3.841$, the test rejects independence.

## Test for shifting risk parameters

To test whether a claim frequency is constant over $m$ periods, the actual claim count of each period is compared with its expected claim count under a constant frequency. If period $i$ has exposure $w_i$ and $A_i$ claims, the test statistic is

> $$Q = \sum_{i=1}^{m} \frac{(A_i - w_i \lambda)^2}{w_i \lambda}$$

- $\lambda$ is the hypothesized claim frequency per unit of exposure, so $w_i \lambda$ is the expected claim count of period $i$.

The periods' counts are independent rather than fixed in total, so with a given frequency the statistic has $m$ degrees of freedom. When the frequency is the overall mean estimated from the same data, it has $m - 1$. A statistic above the critical value rejects the null hypothesis that the frequency is not shifting.

> [!example]- Four years have exposures of 1,000, 1,200, 1,100 and 900 and claim counts of 52, 70, 48 and 30. Does a test at significance level 0.05 show that the claim frequency is shifting? {Example}
> - The overall mean frequency is $\frac{200}{4{,}200} = 0.04762$.
> - The expected counts are the exposures times 0.04762: 47.62, 57.14, 52.38 and 42.86.
> - The terms are 0.403, 2.893, 0.366 and 3.857, so the statistic is 7.52.
> - The frequency was estimated from the data, so there are $4 - 1 = 3$ degrees of freedom and $\chi^2_{0.05,3} = 7.815$.
> - Because $7.52 < 7.815$, the test does not reject the hypothesis that the frequency is constant.

> [!trap] Forgetting the estimated parameters in the degrees of freedom
> In the Poisson example, comparing $Q = 6.66$ with $\chi^2_{0.05,3} = 7.815$, as if no parameter had been estimated, would keep a model that the test with 2 degrees of freedom rejects.
