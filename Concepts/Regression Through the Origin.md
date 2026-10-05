---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:437d994b132cab24d5ed70f58f6ab897a9c7f829d3419f7f8611fe1a30dd8339
  sources:
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), 'Regression Through the Origin', PDF p.1: intercept zero or left out; dropped when its test shows it not significantly different from zero; 'can lead to non-intuitive results'; for a general linear model it implies a zero response when all explanatory variables are zero, 'which may not yield sensible results', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Paul, D., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: proportional response / profit vs sales / insignificant intercept; errors uncorrelated, mean 0, variance sigma^2; b = sum XY / sum X^2, E(b) = beta; SSE = sum Y^2 - b^2 sum X^2; MSE = SSE/(n-1) unbiased, d.f. n-1; Var(b) = sigma^2/sum X^2; CI b ± t(1-alpha/2; n-1) s(b); SSTO = sum Y^2 with n d.f., SSR 1 d.f., sha256:1ab7ee828c0be9b0fc905be543dbc26e7f96577fc9086a72712491b866017b78 (HTML as fetched; the page embeds per-request session tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin"
    - "Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136 (metadata confirmed via Crossref): pp.76-77 a priori zero intercept, Hocking 'if the data are far from the origin, we have no evidence that the linearity applies'; p.77 RTO residuals usually have a nonzero mean and the cross-product term is nonzero, so the usual decomposition fails; p.78 centred R^2 can be negative; R^2 = sum Yhat^2/sum Y^2 is non-negative and 'equals or exceeds' the centred measure; d.f. n, k, n-k; p.79 packages disagree (Excel vs SPSS), SPSS: about-the-origin R^2 'CANNOT be compared'; p.80 compare RTO with OLS by the OLS constant's p-value and the two standard errors. Copy read: third-party repost of the publisher PDF at https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5"
    - "R documentation, stats::summary.lm, Value 'r.squared': R^2 = 1 - sum R_i^2 / sum (y_i - y*)^2, 'where y* is the mean of y_i if there is an intercept and zero otherwise', sha256:52be4406a547f6a905ee71eb8737033c90e339e8ff7147af116cb4b2d6376c2c — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.lm.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.8, PDF p.43 (the dummies for every level add up to the constant) and p.47 (alternative: drop the constant and give each group its own intercept), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; App. B §B.1.2, PDF p.3: eta = g(mu) = x'beta, mu = g^-1(x'beta), log and logit links, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), t table two-sided tail 0.05: df 4 = 2.776, df 3 = 3.182 (PDF p.16), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Through the Origin.md
---

**Regression Through the Origin** is a [[Linear Regression|linear regression]] fitted with no intercept term, so the fitted response is zero when every explanatory variable is zero. It suits a response that is proportional to its predictor, or a model whose intercept tests as not significantly different from zero.

> $$Y_i = \beta x_i + \varepsilon_i$$

> $$\hat\beta = \frac{\sum_{i=1}^{n} x_i y_i}{\sum_{i=1}^{n} x_i^2}$$

> $$\text{Var}(\hat\beta) = \frac{\sigma^2}{\sum_{i=1}^{n} x_i^2}$$

> $$s^2 = \frac{1}{n - 1}\sum_{i=1}^{n}\left(y_i - \hat\beta x_i\right)^2$$

- The errors $\varepsilon_i$ are uncorrelated with mean 0 and variance $\sigma^2$. $\hat\beta$ is the [[Ordinary Least Squares|least-squares]] slope and is [[Unbiasedness|unbiased]]. $s^2$ is an unbiased estimate of $\sigma^2$ on $n - 1$ degrees of freedom, one more than with an intercept, and a [[Confidence Interval|confidence interval]] for $\beta$ is $\hat\beta \pm t_{\alpha/2,\,n - 1}\, s\big/\sqrt{\sum x_i^2}$.
- **When to use it:** when theory says the response is zero at zero, such as profit at zero sales, or when the intercept in the full model is not significant. Leaving the intercept out can give non-intuitive results: the model then predicts a zero response whenever all the explanatory variables are zero, which may not be sensible. Data far from the origin say nothing about whether the line really runs through it.
- **Residuals:** only $\sum x_i e_i = 0$ holds, so the residuals $e_i = y_i - \hat\beta x_i$ usually have a nonzero mean. The decomposition of $\sum(y_i - \bar{y})^2$ into regression and residual parts then fails.
- **[[R-Squared]] is not comparable.** Packages disagree on $R^2$ without a constant. Some report $\sum\hat{y}_i^2 / \sum y_i^2$, the share of variation *about zero*: it is at least as large as the usual $R^2$ of the same fit and cannot be compared with the $R^2$ of a model with an intercept. Others apply the usual $1 - \text{SSE}/\sum(y_i - \bar{y})^2$, which can then be negative. To choose between the two models, use the intercept's t-test in the full model and the two residual standard errors.
- With $k$ predictors and no constant, the total, regression and residual sums of squares have $n$, $k$ and $n - k$ degrees of freedom.
- **A factor is different:** dropping the intercept while keeping indicators for *all* levels of a [[Categorical Predictor]] forces nothing through the origin. The indicators add up to the constant column, so the fit is unchanged and each level gets its own intercept.
- **GLMs:** with linear predictor $\eta = g(\mu) = \mathbf{x}^\top\boldsymbol\beta$, a [[Generalized Linear Model]] with no intercept has $\eta = 0$ when every predictor is zero, so $\mu = g^{-1}(0)$ there: 1 under a log [[Link Function|link]], 0.5 under a logit link.

> [!example]- Fitting Losses Proportional to Premium {Example}
> Five cedants have earned premium $x$ and incurred losses $y$ (both \$ millions):
>
> | $x$ | 10 | 20 | 30 | 40 | 50 |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | $y$ | 10 | 15 | 19 | 29.5 | 34 |
>
> Fit $y = \beta x$, give a 95% confidence interval for $\beta$, and check whether the residuals sum to zero. Fitted with an intercept, the same data give $\hat\beta_0 = 2.75$ with standard error $1.95$. Is the intercept needed?
>
> > [!answer]-
> > $\sum x_i y_i = 3{,}850$ and $\sum x_i^2 = 5{,}500$:
> >
> > $$
> > \begin{align*}
> > \hat\beta &= \frac{3{,}850}{5{,}500} \\
> > &= 0.70
> > \end{align*}
> > $$
> >
> > The fitted values are $7, 14, 21, 28, 35$, so the residuals are $3, 1, -2, 1.5, -1$. They sum to $2.5$, not zero.
> >
> > $$
> > \begin{align*}
> > s^2 &= \frac{9 + 1 + 4 + 2.25 + 1}{5 - 1} \\
> > &= 4.3125 \\
> > \text{se}(\hat\beta) &= \sqrt{4.3125/5{,}500} \\
> > &= 0.0280
> > \end{align*}
> > $$
> >
> > With $t_{0.025,\,4} = 2.776$ (two-sided area $0.05$ in the CAS table), the interval is $0.70 \pm 2.776(0.0280) = 0.70 \pm 0.078$, or $(0.622,\ 0.778)$. The slope is the expected loss ratio.
> >
> > For the intercept, $t = 2.75/1.95 = 1.41$ on $5 - 2 = 3$ df, below the two-sided 5% value $3.182$. The intercept is not significant, which supports the no-intercept fit.

> [!example]- The R-Squared Trap {Example}
> Expenses $y$ (\$000s) are regressed on policy count $x$ (hundreds) for five offices:
>
> | $x$ | 10 | 12 | 14 | 16 | 18 |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | $y$ | 48 | 62 | 66 | 80 | 86 |
>
> With an intercept the fit is $\hat{y} = 2.6 + 4.7x$, with SSE $23.60$ and $R^2 = 0.974$; the intercept's t-statistic is $0.41$. Through the origin, the software reports $R^2 = 0.999$. A colleague concludes the no-intercept model fits better. Assess this.
>
> > [!answer]-
> > Through the origin, $\hat\beta = \sum x_i y_i/\sum x_i^2 = 4{,}976/1{,}020 = 4.878$. Its SSE is
> >
> > $$
> > \begin{align*}
> > \text{SSE} &= \sum y_i^2 - \hat\beta^2 \sum x_i^2 \\
> > &= 24{,}300 - 24{,}275.07 \\
> > &= 24.93
> > \end{align*}
> > $$
> >
> > This is larger than $23.60$, as it must be: dropping a parameter can never lower the SSE. The reported $0.999$ is $1 - 24.93/24{,}300$, measured about zero. On the usual basis, $1 - 24.93/907.2 = 0.973$, just below the intercept model's $0.974$.
> >
> > The colleague's reason is wrong, but the conclusion can stand on valid grounds. The intercept is not significant ($t = 0.41$). The residual standard error is $\sqrt{24.93/4} = 2.50$ through the origin against $\sqrt{23.60/3} = 2.80$ with an intercept, because the no-intercept model keeps one more degree of freedom.
