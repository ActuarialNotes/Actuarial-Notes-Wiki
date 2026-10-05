---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:735a3cee35e7fb1e2cd4d6c64444c68ee0d4af9ac8350ceb6f2b57a7212065ad
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.4.2 items 4, 6, 7 printed pp.9-10 (PDF pp.26-27): non-central chi-squared chi2(n, lambda) with lambda = sum mu_i^2 for unit-variance normals, mean n + lambda, variance 2n + 4lambda; y'V^-1 y ~ chi2(n, mu'V^-1 mu) for y ~ MVN(mu, V); reproductive property (sum of independent chi2(n_i, lambda_i) is chi2(sum n_i, sum lambda_i)); §1.4.4 item 3 printed p.11 (PDF p.28): non-central F = ratio of non-central chi2/df to independent central chi2/df, mean larger than the central F's, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Levine, STAT 517 Lecture 24 'Noncentral chi-squared, F, and multiple comparisons' (Purdue, Spring 2016; course reading Hogg, McKean & Craig), PDF pp.2-5: Y = (1/sigma^2) sum X_i^2 with X_i ~ N(mu_i, sigma^2) has mgf (1-2t)^(-r/2) exp(t theta/(1-2t)), t < 1/2, theta = sum mu_i^2/sigma^2; theta = 0 gives central chi2_r; theta = Q(mu_1..mu_n)/sigma^2 for a quadratic form with Q/sigma^2 ~ chi2_r(theta); noncentral F = r2 U/(r1 V) with U ~ chi2_r1(theta), V ~ chi2_r2 independent, sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf"
    - "Levine, STAT 517 Lecture 25 'Analysis of Variance (ANOVA)', PDF pp.5, 8-9: one-way F = Q4/(b-1) over Q3/[b(a-1)]; under the alternative the noncentrality parameter is found by substituting means into the between-groups quadratic form, (a/sigma^2) sum beta_j^2, and F is noncentral F with that parameter, sha256:dcf94ad635982fc5cd206745bef2eb834f662f13ec8969e6d34e92ec51531750 — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture25_STAT517.pdf"
    - "Wikipedia, 'Noncentral chi-squared distribution' (oldid 1366665071, retrieved 2026-10-05), Definitions/Density/Properties: lambda = sum mu_i^2 for unit-variance normals, 'some references define lambda in other ways, such as half of the above sum, or its square root'; pdf = sum_i e^(-lambda/2)(lambda/2)^i/i! f_(k+2i)(x) (Poisson(lambda/2) mixture); mean k + lambda; variance 2(k + 2lambda); mgf exp(lambda t/(1-2t))/(1-2t)^(k/2) for 2t < 1; sums of independent noncentral chi-squares add k and lambda, sha256:37cf19212c3e70760508abf6874b9f4e1a55490a371581a016cbcf6e4c1cf455 — https://en.wikipedia.org/wiki/Noncentral_chi-squared_distribution"
    - "Wikipedia, 'Noncentral F-distribution' (oldid 1307839149, retrieved 2026-10-05), Moments: E[F] = nu2(nu1 + lambda)/(nu1(nu2 - 2)) for nu2 > 2, sha256:3221dec7e1010a7a57e943dfe0e0c49423dd331cefc752f6967ac1a50807fae7 — https://en.wikipedia.org/wiki/Noncentral_F-distribution"
    - "CAS Exam MAS-I Tables (version 01/15/2018): chi-square lower-tail 0.950, df 4 = 9.49 (PDF p.20); F(2,15) upper 0.05 = 3.682 (PDF p.18); the handout's statistical tables (PDF pp.16-20) are central t, F and chi-square only, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics, 8th ed. (Global Edition) — publisher eBook preview, Contents PDF p.9: §9.3 'Noncentral chi-square and F-Distributions' p.536 (body not in preview), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 1
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
