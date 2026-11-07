---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:43c2653bda28ecbf2fee73a1890e90330aaf28d578985a316af6a0e328f68884
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.4.2 Chi-squared distribution items 1-4 and 7 (sum of squares of n independent N(0,1) is chi-squared(n); E = n, var = 2n; item 4: Y_i = Z_i + mu_i with at least one mu_i non-zero gives the non-central chi-squared chi^2(n, lambda), lambda = sum mu_i^2, mean n + lambda, variance 2n + 4 lambda; reproductive property), printed pp.9-10 (PDF pp.26-27); §1.4.3-1.4.4 t and F defined from chi-squared, PDF pp.27-28, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 1-50 (df 9: 2.70 and 19.02; df 3: 7.81, 9.35, 11.34), PDF p.20, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'ChiSquare' page: gamma with shape n/2 and scale 2; 2 df = exponential with scale 2; X + Y chi-square with m + n df; sum of n squared standard normals; large-n normal approximation with mean n and variance 2n, sha256:f7b0f71fc588c1fe691b9de903b5aa28a70a68b8f4e659aa2adb6ca4abc831b3 — https://www.randomservices.org/random/special/ChiSquare.html"
    - "Siegrist, Random, §6 Random Samples, 'Special Properties of Normal Samples' page: V = (n-1)S^2/sigma^2 has the chi-square distribution with n-1 degrees of freedom, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Rodríguez, Generalized Linear Models notes, Appendix B §B.3.2 Likelihood Ratio Tests and the Deviance, eq. (B.13), PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition), publisher eBook preview, Contents PDF p.7 (§4.7 Chi-Square Tests), PDF p.8 (§8.3 Likelihood Ratio Tests) and PDF p.9 (§9.3 Noncentral chi^2 and F-Distributions), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Hogg Domain B 4.7, 8.3 and Domain C 9.3 assigned, PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chi-Squared Distribution.md
---

A **Chi-Squared Distribution** with $r$ degrees of freedom, written $\chi^2(r)$, is the distribution of the sum of the squares of $r$ independent standard [[Normal Distribution|normal]] random variables. A chi-squared random variable with $r$ degrees of freedom is

> $$V = Z_1^2 + Z_2^2 + \cdots + Z_r^2$$

- $Z_1, \ldots, Z_r$ are independent standard normal random variables.

Its mean is

> $$E[V] = r$$

and its variance is

> $$\text{Var}(V) = 2r$$

The chi-squared distribution with $r$ degrees of freedom is the [[Gamma|gamma distribution]] with shape $r/2$ and scale 2. A sum of independent chi-squared random variables is chi-squared, with degrees of freedom equal to the sum of their degrees of freedom.

> [!example]- $X_1, \ldots, X_5$ are a random sample from a normal distribution with mean $\mu$ and variance $\sigma^2$. What are the distribution, mean and variance of $\sum_{i=1}^{5}(X_i - \mu)^2/\sigma^2$? {Example}
> - Each $(X_i - \mu)/\sigma$ is standard normal, and the five are independent.
> - The sum of their squares is chi-squared with 5 degrees of freedom.
> - Its mean is 5 and its variance is $2 \times 5 = 10$.

## Sums of squares of a normal sample

For a random sample $X_1, \ldots, X_n$ from a normal distribution, replacing $\mu$ by the [[Sample Mean|sample mean]] $\bar{X}$ costs one degree of freedom, so the [[Sample Variance|sample variance]] $S^2$ satisfies

> $$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$$

The sample mean is normal with variance $\sigma^2/n$, so $n(\bar{X} - \mu)^2/\sigma^2$ is the square of one standard normal random variable and is $\chi^2(1)$.

> [!example]- The logarithms of 10 claim amounts are a random sample from a normal distribution, with sample variance $s^2 = 0.36$. What is a 95% confidence interval for $\sigma^2$? {Example}
> - $9S^2/\sigma^2$ is $\chi^2(9)$, and $9s^2 = 3.24$.
> - In the 9 degrees of freedom row, $P(V \le 2.70) = 0.025$ and $P(V \le 19.02) = 0.975$.
> - Solving $2.70 \le 3.24/\sigma^2 \le 19.02$ for $\sigma^2$ gives $3.24/19.02 \le \sigma^2 \le 3.24/2.70$.
> - The 95% [[Confidence Interval|confidence interval]] for $\sigma^2$ is $(0.170, 1.200)$.

## Testing a normal variance

To test $H_0: \sigma^2 = \sigma_0^2$ with a random sample of size $n$ from a normal distribution, the test statistic is

> $$\frac{(n-1)S^2}{\sigma_0^2}$$

- $\sigma_0^2$ is the variance under $H_0$.

Under $H_0$ the statistic is $\chi^2(n-1)$. Against $H_1: \sigma^2 > \sigma_0^2$, $H_0$ is rejected when the statistic exceeds the value that $\chi^2(n-1)$ exceeds with probability $\alpha$. Against $H_1: \sigma^2 < \sigma_0^2$, $H_0$ is rejected when the statistic is below the value that $\chi^2(n-1)$ falls below with probability $\alpha$.

The CAS MAS-I chi-squared table gives lower-tail areas. The entry in column $p$ is the value $c$ with $P(V \le c) = p$, so an upper-tail critical value at level $\alpha$ is read from the column $1 - \alpha$.

> [!example]- A random sample of 20 losses from a normal distribution has $s^2 = 45$. What is the smallest significance level at which $H_0: \sigma^2 = 100$ is rejected in favour of $H_1: \sigma^2 < 100$? {Example}
> - The test statistic is $19 \times 45/100 = 8.55$.
> - In the 19 degrees of freedom row, the lower-tail values are 7.63 at 0.010, 8.91 at 0.025 and 10.12 at 0.050.
> - The statistic is below 8.91 but not below 7.63.
> - $H_0$ is rejected at the 2.5% level but not at the 1% level.

## Likelihood ratio tests

For nested models, the [[Likelihood Ratio Test|likelihood ratio statistic]] is twice the difference between the maximized log-likelihoods of the larger and the smaller model. In large samples, under the hypothesis that the smaller model is adequate,

> $$2\bigl(l(\hat{\theta}_{\text{larger}}) - l(\hat{\theta}_{\text{smaller}})\bigr) \sim \chi^2(q)$$

- $q$ is the number of parameters the larger model adds.

For a [[Generalized Linear Model|GLM]], the statistic is the drop in [[Deviance|deviance]], divided by the [[Dispersion Parameter|dispersion parameter]] $\phi$ when $\phi$ is not 1. When the [[p-Value|p-value]] is below the significance level, the smaller model is rejected and the added variables are statistically significant.

> [!example]- A claim frequency GLM has maximized log-likelihood $-1{,}250.6$. Adding a rating variable with 4 levels raises it to $-1{,}245.9$. Is the variable significant at the 5% level, and between which values does the p-value lie? {Example}
> - The 4 levels add $q = 3$ parameters.
> - The statistic is $2\bigl(-1{,}245.9 - (-1{,}250.6)\bigr) = 9.4$.
> - In the 3 degrees of freedom row, the values are 7.81 at 0.950, 9.35 at 0.975 and 11.34 at 0.990.
> - The statistic exceeds 7.81, so the variable is significant at the 5% level.
> - The statistic is between 9.35 and 11.34, so the p-value is between 0.01 and 0.025.

> [!trap] Reading the lower-tail table for an upper-tail test
> The CAS table's column 0.050 holds the value $\chi^2(r)$ falls below with probability 0.05. An upper-tail test at the 5% level uses the column 0.950. With 3 degrees of freedom the critical value is 7.81, not 0.35.
