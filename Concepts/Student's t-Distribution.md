---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:a78bb1d48c848b981ef1de03af5f816f1f7c135c72651ca67045af156dfd039c
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.4.3 t-distribution eq. (1.6) T = Z/(X^2/n)^(1/2) with Z ~ N(0,1), X^2 ~ chi-squared(n) independent; §1.4.4 item 2 eq. (1.8) T^2 ~ F(1, n), printed pp.10-11 (PDF pp.27-28), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "CAS Exam MAS-I Tables, 'Tail areas (two-sided) for t-distributions', columns 0.20, 0.10, 0.05, 0.02, 0.01; df 1-30, 35-60 by 5, 70, 80, 90, 100, 120, 400, Inf (df 15: 1.753, 2.947; df 18: 2.101, 2.552, 2.878), PDF p.16, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021, CAS-hosted copy), §3.1.2: 95% interval uses the 97.5% quantile of a t-distribution with n-2 df (footnote 3) and t = beta1-hat/SE has a t-distribution with n-2 df under beta1 = 0, printed pp.66-67 (PDF pp.76-77); §3.2.2 footnote 7 'The square of each t-statistic is the corresponding F-statistic' (q = 1 in (3.24)), printed p.77 (PDF p.87), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Student' page: pdf Gamma((n+1)/2)/(sqrt(n pi) Gamma(n/2)) (1 + t^2/n)^(-(n+1)/2); symmetric about 0; E(T) = 0 for n > 1; var n/(n-2) for n > 2; 1 df = Cauchy; f_n(t) -> standard normal density as n -> inf, sha256:6ff2ac51f78d5041cdf14dc24203650bbb08a608351a120f40e498876fd660c7 — https://www.randomservices.org/random/special/Student.html"
    - "Siegrist, Random, §6 Random Samples, 'Special Properties of Normal Samples' page: T = (M - mu)/(S/sqrt n) has the student t distribution with n-1 degrees of freedom, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Student's t-Distribution.md"
---

**Student's t-Distribution** $t(n)$ with $n$ degrees of freedom is the distribution of a standard [[Normal Distribution|normal]] variable divided by the square root of an independent [[Chi-Squared Distribution|chi-squared]] variable over its degrees of freedom. It is the [[Sampling Distribution|sampling distribution]] of a mean or a regression coefficient standardised by an *estimated* standard error.

> $$T = \frac{Z}{\sqrt{V/n}} \sim t(n), \quad Z \sim N(0,1),\ V \sim \chi^2(n)$$

> $$f(t) = \frac{\Gamma\!\left(\frac{n + 1}{2}\right)}{\sqrt{n\pi}\;\Gamma\!\left(\frac{n}{2}\right)}\left(1 + \frac{t^2}{n}\right)^{-(n + 1)/2}$$

> $$E[T] = 0, \quad n > 1$$

> $$\text{Var}(T) = \frac{n}{n - 2}, \quad n > 2$$

- $Z$ and $V$ are independent, and $f$ is defined for all real $t$. The density is symmetric about 0 with heavier tails than the normal; as $n \to \infty$ it converges to the standard normal density. With $n = 1$ it is the Cauchy distribution, which has no mean.
- **Normal samples:** for a sample of size $n$ from $N(\mu, \sigma^2)$ with [[Sample Mean|sample mean]] $\bar{X}$ and [[Sample Variance|sample variance]] $S^2$, $\dfrac{\bar{X} - \mu}{S/\sqrt{n}} \sim t(n - 1)$. This is the one-sample t-test and the [[Confidence Interval|confidence interval]] for $\mu$ when $\sigma$ is unknown.
- **Regression coefficients:** in simple [[Linear Regression|linear regression]], $t = \hat{\beta}_1/\text{SE}(\hat{\beta}_1)$ has a $t(n - 2)$ distribution when $\beta_1 = 0$; a 95% interval for $\beta_1$ uses the 97.5% quantile of $t(n - 2)$.
- **Link to F:** $T^2 \sim F(1, n)$, so a two-sided t-test on one coefficient is the [[F-Distribution|F-test]] with one numerator degree of freedom.
- **The CAS MAS-I table** gives *two-sided* tail areas $0.20,\ 0.10,\ 0.05,\ 0.02,\ 0.01$: the entry $c$ satisfies $P(|T| > c) = $ the column heading. It covers $df = 1$ to 30, then 35 to 60 in fives, 70, 80, 90, 100, 120, 400 and $\infty$ (the normal row). For a **one-sided** test at level $\alpha$, read the $2\alpha$ column.
- On MAS-I it supplies critical values for [[Hypothesis Testing|tests]] of means and for the t-statistics reported for linear-model coefficients.

> [!example]- Has Average Severity Risen? {Example}
> Last year's average claim severity was 1,000. A sample of 16 claims this year has $\bar{x} = 1{,}150$ and $s = 200$; claim sizes are assumed normal. Test $H_0: \mu = 1{,}000$ against $H_1: \mu > 1{,}000$ at the 5% level, and bound the [[p-Value|p-value]].
>
> > [!answer]-
> > $$
> > \begin{align*}
> > t &= \frac{1{,}150 - 1{,}000}{200/\sqrt{16}} \\
> > &= \frac{150}{50} \\
> > &= 3.0
> > \end{align*}
> > $$
> >
> > There are $16 - 1 = 15$ degrees of freedom. The test is one-sided, so the 5% critical value is in the two-sided $0.10$ column: $1.753$. Since $3.0 > 1.753$, reject $H_0$. The two-sided $0.01$ column gives $2.947 < 3.0$, so the one-sided p-value is below $0.005$.

> [!example]- Significance of a Rating Factor in a Regression {Example}
> A simple linear regression of loss ratio on a credit-score variable, fitted to $n = 20$ territories, gives $\hat{\beta}_1 = 0.42$ with standard error $0.15$. Test $\beta_1 = 0$ against a two-sided alternative, and give a 95% confidence interval for $\beta_1$.
>
> > [!answer]-
> > $t = 0.42/0.15 = 2.8$, with $20 - 2 = 18$ degrees of freedom. In the $df = 18$ row the two-sided $0.02$ column is $2.552$ and the $0.01$ column is $2.878$, so the p-value is between 0.01 and 0.02: significant at 5% and 2%, not at 1%.
> >
> > The two-sided $0.05$ column gives $2.101$:
> >
> > $$
> > \begin{align*}
> > \hat{\beta}_1 \pm 2.101\,\text{SE} &= 0.42 \pm 2.101(0.15) \\
> > &= 0.42 \pm 0.315
> > \end{align*}
> > $$
> >
> > The interval $(0.105,\ 0.735)$ excludes 0, consistent with rejecting $\beta_1 = 0$ at 5%.
