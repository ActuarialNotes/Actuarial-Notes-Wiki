---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:735a3cee35e7fb1e2cd4d6c64444c68ee0d4af9ac8350ceb6f2b57a7212065ad
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Noncentral Chi-Squared Distribution.md
---

The **Noncentral Chi-Squared Distribution** $\chi^2(r, \theta)$ is the distribution of $\sum X_i^2/\sigma^2$ for $r$ independent [[Normal Distribution|normal]] variables $X_i \sim N(\mu_i, \sigma^2)$ whose means are not all zero. When the null hypothesis is false, a chi-square statistic built from normal data follows it and an F statistic follows the **noncentral F-distribution** built from it, so the two give the [[Power of a Test|power]] of those tests.

> $$Y = \frac{1}{\sigma^2}\sum_{i=1}^{r} X_i^2 \sim \chi^2(r, \theta)$$

> $$\theta = \frac{1}{\sigma^2}\sum_{i=1}^{r} \mu_i^2$$

> $$M_Y(t) = \frac{e^{\theta t/(1 - 2t)}}{(1 - 2t)^{r/2}}, \quad t < \tfrac{1}{2}$$

> $$f(y) = \sum_{j=0}^{\infty} \frac{e^{-\theta/2}\,(\theta/2)^j}{j!}\, f_{r + 2j}(y)$$

> $$E[Y] = r + \theta$$

> $$\text{Var}(Y) = 2r + 4\theta$$

- $r$ is the degrees of freedom and $\theta \geq 0$ the **noncentrality parameter**. $f_v$ is the density of the central [[Chi-Squared Distribution|chi-squared]] distribution with $v$ degrees of freedom, so $f$ is a [[Mixture Distribution|mixture]] of central chi-squared densities with [[Poisson Distribution|Poisson]]$(\theta/2)$ weights. With $\theta = 0$ it is the central $\chi^2(r)$.
- **Convention:** $\theta$ here is the full sum $\sum \mu_i^2/\sigma^2$, not half of it. Dobson & Barnett write $\chi^2(n, \lambda)$ with $\lambda = \sum \mu_i^2$ for unit-variance normals, mean $n + \lambda$ and variance $2n + 4\lambda$. Some references define the parameter as half that sum, or its square root; under the halved parameter $\lambda'$ the mean is $r + 2\lambda'$. Check which one a source uses before reading off its mean.
- **Additivity:** independent $\chi^2(r_i, \theta_i)$ variables sum to $\chi^2\!\left(\sum r_i,\ \sum \theta_i\right)$.
- **Quadratic forms:** when $Q/\sigma^2$ is chi-squared for normal $X_i$, its noncentrality parameter is found by replacing each $X_i$ in $Q$ by its mean. For $\mathbf{y} \sim \text{MVN}(\boldsymbol\mu, \mathbf{V})$, $\mathbf{y}^\top\mathbf{V}^{-1}\mathbf{y} \sim \chi^2(n,\ \boldsymbol\mu^\top\mathbf{V}^{-1}\boldsymbol\mu)$.
- **Noncentral F:** for independent $U \sim \chi^2(r_1, \theta)$ and $V \sim \chi^2(r_2)$, $F = \dfrac{U/r_1}{V/r_2}$ has the noncentral F-distribution $F(r_1, r_2, \theta)$, with mean $\dfrac{r_2(r_1 + \theta)}{r_1(r_2 - 2)}$ for $r_2 > 2$, larger than the central [[F-Distribution]]'s $r_2/(r_2 - 2)$.
- **Power of the ANOVA F test:** with $k$ groups of $n$ observations and group means $\mu_j$, the between-groups sum of squares over $\sigma^2$ is $\chi^2(k - 1, \theta)$ with $\theta = n\sum_j(\mu_j - \bar\mu)^2/\sigma^2$, so the [[ANOVA]] statistic is $F(k - 1,\ k(n - 1),\ \theta)$. It is central only when $H_0$ (all $\mu_j$ equal) is true. The power is $P\big(F(k - 1, k(n - 1), \theta) > c\big)$, where $c$ is the central critical value; $\theta$ grows with $n$ and the spread of the true means and falls as $\sigma^2$ grows.
- The CAS MAS-I tables give only central chi-squared and F percentiles, so a noncentral probability needs software.

> [!example]- Mean and Power for a Loss-Ratio Monitoring Statistic {Example}
> Each of four lines' loss-ratio deviation from plan is independent and normal with standard deviation $\sigma = 0.05$. The monitoring statistic is $Y = \sum_{i=1}^{4} X_i^2/\sigma^2$, which is $\chi^2(4)$ when every true deviation is 0. This year the true mean deviations are $0.05$, $-0.05$, $0.10$ and $0$. Find the distribution of $Y$, its mean and variance, and the chance it exceeds the 5% critical value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \theta &= \frac{0.05^2 + 0.05^2 + 0.10^2 + 0^2}{0.05^2} \\
> > &= \frac{0.015}{0.0025} \\
> > &= 6
> > \end{align*}
> > $$
> >
> > So $Y \sim \chi^2(4, 6)$, with
> >
> > $$
> > \begin{align*}
> > E[Y] &= 4 + 6 \\
> > &= 10 \\
> > \text{Var}(Y) &= 2(4) + 4(6) \\
> > &= 32
> > \end{align*}
> > $$
> >
> > The test rejects when $Y > 9.49$, the $0.950$ entry in the $df = 4$ row of the CAS chi-square table. Software gives $P\big(\chi^2(4, 6) > 9.49\big) = 0.470$. Even with one line's true deviation at two standard deviations, the test flags the drift less than half the time.

> [!example]- Power of a Territory Severity ANOVA {Example}
> Mean log severity in three territories is truly $8.0$, $8.3$ and $8.6$, with $\sigma = 0.4$. A one-way ANOVA at the 5% level uses $n = 6$ claims per territory. Find the noncentrality parameter, the expected F-statistic and the power.
>
> > [!answer]-
> > $\bar\mu = 8.3$, so $\sum(\mu_j - \bar\mu)^2 = 0.09 + 0 + 0.09 = 0.18$:
> >
> > $$
> > \begin{align*}
> > \theta &= \frac{6(0.18)}{0.4^2} \\
> > &= 6.75
> > \end{align*}
> > $$
> >
> > The statistic is $F(2, 15, 6.75)$, with $k - 1 = 2$ and $k(n - 1) = 15$:
> >
> > $$
> > \begin{align*}
> > E[F] &= \frac{15(2 + 6.75)}{2(15 - 2)} \\
> > &= 5.05
> > \end{align*}
> > $$
> >
> > against $15/13 = 1.15$ when $H_0$ is true. The CAS table's upper 5% point of $F(2, 15)$ is $3.682$, and software gives $P\big(F(2, 15, 6.75) > 3.682\big) = 0.546$. Raising $n$ to 10 claims per territory gives $\theta = 11.25$ on $(2, 27)$ df and a power of $0.817$.
