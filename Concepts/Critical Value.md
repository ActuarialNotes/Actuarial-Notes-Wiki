---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:94fb71a9c84e14a31c9a768fb76b28cb7ea86b10053310035343f159607156d1
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

A **critical value** $c$ is the boundary of the rejection region in [[Hypothesis Testing|a hypothesis test]]: the percentile of the test statistic's [[Sampling Distribution|sampling distribution]] under $H_0$ chosen so that, if $H_0$ is true, the statistic lands beyond it with probability equal to the significance level $\alpha$.

> $$P\left(T \ge c \mid H_0\right) = \alpha$$

- The block is for an upper-tailed test; a lower-tailed test rejects when $T \le c$ with $P(T \le c \mid H_0) = \alpha$, and a two-sided test splits $\alpha/2$ into each tail. Rejecting a true $H_0$ is a [[Type I Error]], so $\alpha$ is its probability by construction.
- **Notation.** Here $z_\alpha$, $t_{\alpha,\nu}$, $\chi^2_{\alpha,\nu}$ and $F_{\alpha,\nu_1,\nu_2}$ are *upper* $\alpha$ points — the value with probability $\alpha$ above it. Tables differ, so check which tail yours tabulates.
- **Tests on a mean.** Use $Z = \dfrac{\bar X - \mu_0}{\sigma/\sqrt n}$ against $z_\alpha$ when $\sigma$ is known ($z_{0.05} = 1.645$, $z_{0.025} = 1.960$). Use $T = \dfrac{\bar X - \mu_0}{S/\sqrt n}$ against $t_{\alpha,\,n-1}$ when $\sigma$ is estimated from a [[Normal Distribution|normal]] sample.
- **Tests on a variance.** Use $\chi^2 = (n-1)S^2/\sigma_0^2$ against $\chi^2_{\alpha,\,n-1}$. The chi-square is skewed, so a two-sided test needs two different critical values, $\chi^2_{1-\alpha/2,\,n-1}$ and $\chi^2_{\alpha/2,\,n-1}$, not $\pm$ one number. For two variances, $F = S_1^2/S_2^2$ is compared with $F_{\alpha,\,n_1-1,\,n_2-1}$. The lower point comes from $F_{1-\alpha,\,\nu_1,\,\nu_2} = 1/F_{\alpha,\,\nu_2,\,\nu_1}$.
- **Same decision as the [[p-Value]].** The statistic is beyond the critical value exactly when the p-value is below $\alpha$. A two-sided test at level $\alpha$ rejects $\mu_0$ exactly when $\mu_0$ lies outside the $1-\alpha$ [[Confidence Interval]]. Moving the critical value trades [[Type II Error]] against Type I error, which is what sets the [[Power of a Test|power]].

> [!example]- t-Test on Mean Claim Severity {Example}
> After a change in repair costs, a sample of $n = 16$ auto physical damage claims has mean \$5,400 and sample standard deviation \$800. Assuming severities are normal, test $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ at $\alpha = 0.05$ and at $\alpha = 0.01$.
>
> > [!answer]-
> > $\sigma$ is unknown, so use the $t$ distribution with $15$ degrees of freedom.
> >
> > $$
> > \begin{align*}
> > T &= \frac{5{,}400 - 5{,}000}{800/\sqrt{16}} \\
> > &= \frac{400}{200} \\
> > &= 2.00
> > \end{align*}
> > $$
> >
> > - At $\alpha = 0.05$: $t_{0.05,15} = 1.753$. Since $2.00 > 1.753$, **reject** $H_0$.
> > - At $\alpha = 0.01$: $t_{0.01,15} = 2.602$. Since $2.00 < 2.602$, **do not reject**.
> >
> > The evidence of higher severity is significant at 5% but not at 1%, which places the p-value between them (it is about $0.032$).

> [!example]- Chi-Square Test for Increased Volatility {Example}
> A pricing model assumes claim severities have standard deviation \$1,000. A sample of $n = 25$ recent claims has $s = 1{,}300$. Assuming normality, test $H_0: \sigma^2 = 1{,}000^2$ against $H_1: \sigma^2 > 1{,}000^2$ at $\alpha = 0.05$ and $\alpha = 0.01$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \chi^2 &= \frac{(n-1)s^2}{\sigma_0^2} \\
> > &= \frac{24 \times 1{,}300^2}{1{,}000^2} \\
> > &= 40.56
> > \end{align*}
> > $$
> >
> > With $24$ degrees of freedom, $\chi^2_{0.05,24} = 36.415$ and $\chi^2_{0.01,24} = 42.980$.
> >
> > - At $5\%$: $40.56 > 36.415$, so **reject** $H_0$.
> > - At $1\%$: $40.56 < 42.980$, so **do not reject**.
> >
> > At the usual 5% level the data say severity is more volatile than the model assumes — a reason to revisit any risk load built on the old standard deviation.
