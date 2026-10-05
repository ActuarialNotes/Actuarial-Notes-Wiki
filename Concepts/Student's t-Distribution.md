---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a78bb1d48c848b981ef1de03af5f816f1f7c135c72651ca67045af156dfd039c
  sources: []
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
