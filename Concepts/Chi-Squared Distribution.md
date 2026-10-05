---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6843fb9810b14daa489c0f49e0599c11ba676db62e477f2e7cef576282adacdf
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.4.2 Chi-squared distribution items 1-2 and 7 (sum of squares of n independent N(0,1) is chi-squared(n); E = n, var = 2n; reproductive property), printed pp.9-10 (PDF pp.26-27); §1.4.3-1.4.4 t and F defined from chi-squared, PDF pp.27-28, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 1-50, columns 0.005, 0.010, 0.025, 0.050, 0.950, 0.975, 0.990, 0.995 (df 9: 2.70 and 19.02; df 3: 7.81, 9.35, 11.34), PDF p.20, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'ChiSquare' page: pdf x^(n/2-1) e^(-x/2)/(2^(n/2) Gamma(n/2)) as the gamma with shape n/2 and scale 2; 2 df = exponential with scale 2; sum of independent chi-squares adds the degrees of freedom; for large n approximately normal with mean n and variance 2n, sha256:f7b0f71fc588c1fe691b9de903b5aa28a70a68b8f4e659aa2adb6ca4abc831b3 — https://www.randomservices.org/random/special/ChiSquare.html"
    - "Siegrist, Random, §6 Random Samples, 'Special Properties of Normal Samples' page: V = (n-1)S^2/sigma^2 has the chi-square distribution with n-1 degrees of freedom, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Rodríguez, Generalized Linear Models notes, Appendix B 'Generalized Linear Model Theory', §B.3.2 Likelihood Ratio Tests and the Deviance, eq. (B.13): -2 log lambda = (D(omega1) - D(omega2))/phi for nested models with p1 < p2 parameters, asymptotically chi-squared with p2 - p1 df, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition), publisher eBook preview, Contents PDF p.7 (§4.7 Chi-Square Tests) and PDF p.8 (§8.3 Likelihood Ratio Tests), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Hogg Sections 4.7 and 8.3 assigned (Domain B), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Chi-Squared Distribution.md
---

The **Chi-Squared Distribution** $\chi^2(n)$ with $n$ degrees of freedom is the distribution of the sum of squares of $n$ independent standard [[Normal Distribution|normal]] variables. It is the [[Sampling Distribution|sampling distribution]] behind tests and intervals for a normal variance and behind likelihood ratio tests.

> $$V = \sum_{i=1}^{n} Z_i^2 \sim \chi^2(n), \quad Z_i \sim N(0, 1)$$

> $$f(x) = \frac{x^{n/2 - 1}\,e^{-x/2}}{2^{n/2}\,\Gamma(n/2)}, \quad x > 0$$

> $$E[V] = n$$

> $$\text{Var}(V) = 2n$$

- $f$ is the density of $V$. It is the [[Gamma]] distribution with shape $n/2$ and scale 2; with $n = 2$ it is the [[Exponential Distribution|exponential]] with mean 2.
- **Additivity:** a sum of independent chi-squared variables is chi-squared, with the degrees of freedom added.
- **Normal samples:** for a sample of size $n$ from $N(\mu, \sigma^2)$ with [[Sample Variance|sample variance]] $S^2$, $(n - 1)S^2/\sigma^2 \sim \chi^2(n - 1)$. This gives the [[Confidence Interval|confidence interval]] and the test for $\sigma^2$.
- **[[Likelihood Ratio Test|Likelihood ratio tests]]:** for nested models with $p_1 < p_2$ parameters, $-2\ln\lambda = 2(\ell_2 - \ell_1)$ is approximately $\chi^2(p_2 - p_1)$ in large samples. For [[Generalized Linear Model|GLMs]] this is the drop in [[Deviance|deviance]] divided by the [[Dispersion Parameter|dispersion parameter]].
- **The CAS MAS-I table** gives *lower-tail* areas for $n = 1$ to 50: the entry in column $p$ is the value $c$ with $P(V \leq c) = p$, for $p = 0.005,\ 0.010,\ 0.025,\ 0.050,\ 0.950,\ 0.975,\ 0.990,\ 0.995$. An upper-tail 5% critical value is read from the $0.950$ column. For large $n$ the distribution is approximately normal with mean $n$ and variance $2n$.
- On MAS-I it supplies the critical values for tests of a normal variance, chi-square tests (Hogg §4.7), likelihood ratio tests (Hogg §8.3) and GLM model comparisons. The [[Student's t-Distribution]] and the [[F-Distribution]] are both built from it.

> [!example]- Confidence Interval for the Variance of Log-Losses {Example}
> The logarithms of 10 claim amounts are treated as a sample from a normal distribution. Their sample variance is $s^2 = 0.36$. Using the CAS chi-square table, find a 95% confidence interval for $\sigma^2$.
>
> > [!answer]-
> > $(n - 1)S^2/\sigma^2 \sim \chi^2(9)$, and $(n - 1)s^2 = 9(0.36) = 3.24$. From the $df = 9$ row, $P(\chi^2_9 \leq 2.70) = 0.025$ and $P(\chi^2_9 \leq 19.02) = 0.975$. Solving $2.70 \leq 3.24/\sigma^2 \leq 19.02$ for $\sigma^2$:
> >
> > $$
> > \begin{align*}
> > \text{lower} &= \frac{3.24}{19.02} \\
> > &= 0.170 \\
> > \text{upper} &= \frac{3.24}{2.70} \\
> > &= 1.200
> > \end{align*}
> > $$
> >
> > The interval $(0.170,\ 1.200)$ is not centred on $0.36$: the chi-squared distribution is skewed right, so the large quantile sets the lower bound.

> [!example]- Testing an Added Rating Variable {Example}
> A claim-frequency GLM has maximised log-likelihood $-1{,}250.6$. Adding a rating variable with 4 levels (3 extra parameters) raises it to $-1{,}245.9$. Test at the 5% level whether the variable is significant.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > 2(\ell_2 - \ell_1) &= 2\bigl(-1{,}245.9 - (-1{,}250.6)\bigr) \\
> > &= 9.4
> > \end{align*}
> > $$
> >
> > Compare with $\chi^2(3)$. The $df = 3$ row gives $7.81$ in the $0.950$ column and $9.35$ in the $0.975$ column. Since $9.4 > 7.81$, reject the smaller model at 5%: the variable is significant. Because $9.4$ also exceeds $9.35$ but not $11.34$ (the $0.990$ column), the [[p-Value|p-value]] lies between 0.01 and 0.025.
