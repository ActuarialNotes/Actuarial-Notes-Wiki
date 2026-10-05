---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d8b4e228ab841f48173102c5877f1d1acb2f0406ff27cdf47f5a01b3350ac201
  sources: []
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
