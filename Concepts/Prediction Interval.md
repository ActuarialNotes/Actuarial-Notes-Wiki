---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:783e6eea0d48915ecea03224a1e69b723d1d2854e2b1cc2afe614373b633f456
  sources:
    - "Penn State STAT 510 Applied Time Series Analysis, Lesson 3 §3.3 Forecasting with ARIMA Models: psi-weight (MA infinity) form with psi_0 = 1; AR(1) psi_j = phi^j (Ex 3.5); MA psi-weights equal the coefficients and are 0 past the order; Var(x^n_{n+m} - x_{n+m}) = sigma_w^2 sum_{j=0}^{m-1} psi_j^2; 95% PI x^n_{n+m} +/- 1.96 sqrt(that) 'with the assumption of normally distributed errors'; for large m the variance approaches the variance of the series; Ex 3.6 AR(1) forecasts with SE 2 and 2 sqrt(1 + 0.6^2), sha256:6c42884601a4af7581fc2047d4b89f77ab0428abbf19fc42567869f308acaca8 — https://online.stat.psu.edu/stat510/Lesson03.html"
    - "R Documentation, stats::predict.Arima (package stats 4.6.0): returns a list with components pred and se; 'The standard errors of prediction exclude the uncertainty in the estimation of the ARMA model', sha256:8c2d3e820dd8e2217dddb40d7bf182fb36025d7d62ccf3d174b3ec49d4663787 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/predict.arima.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy), §3.2.2 'Predictions' p.82 (PDF p.92) and §3.4 p.103 (PDF p.113): a confidence interval quantifies uncertainty about f(X) (the average response), a prediction interval about an individual Y; 'Prediction intervals are always wider than confidence intervals' because they add the irreducible error; the linear model is treated as correct (model bias ignored), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods, Lesson 7 §7.1-7.2: se(y-hat_h) = sqrt(MSE X_h'(X'X)^{-1} X_h), PI y-hat_h +/- t_{1-alpha/2, n-p} sqrt(MSE + se(y-hat_h)^2) with p parameters including the intercept; the CI's standard error can approach 0 as n grows, the PI's cannot; the PI depends strongly on normal errors, sha256:09f3e2de7b3b61cea327370053b219eb5c6b2d0981e0aca094fdd92178c2c631 — https://online.stat.psu.edu/stat501/Lesson07.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018): lognormal entry p.13, F(x) = Phi((ln x - mu)/sigma) and E[X^k] = exp(k mu + k^2 sigma^2/2) (median e^mu, mean e^{mu + sigma^2/2}); Inf row of the t table p.16 (1.960), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prediction Interval.md
---

**A prediction interval** is a range that will contain a *future observation*, such as next quarter's claim frequency or next month's claim count, with a stated probability. A [[Confidence Interval|confidence interval]] covers a fixed parameter such as a mean. A prediction interval must also allow for the random shock the new observation will carry, so it is always wider.

> $$\hat{x}_{t+h} \pm z_{1-\alpha/2}\,\mathrm{SE}(e_{t+h})$$
>
> $$\mathrm{SE}(e_{t+h}) = \sigma\sqrt{\sum_{j=0}^{h-1}\psi_j^{2}}$$

- $\hat{x}_{t+h}$ is the $h$-step [[Time Series Forecast|forecast]] and $e_{t+h} = x_{t+h} - \hat{x}_{t+h}$ its error. $\sigma$ is the white-noise standard deviation, and the $\psi_j$ are the weights of the model's MA($\infty$) form, with $\psi_0 = 1$. For $95\%$, $z = 1.96$.
- **How the width grows with $h$:**
  - [[Moving Average Model|MA($q$)]]: the $\psi_j$ vanish beyond $q$, so the width stops growing after $q$ steps, at $\sigma\sqrt{1 + \theta_1^2 + \cdots + \theta_q^2}$
  - stationary [[Autoregressive Model|AR(1)]]: $\psi_j = \phi^j$, so the variance is $\sigma^2(1 - \phi^{2h})/(1 - \phi^2)$, levelling off at the series' own variance $\sigma^2/(1 - \phi^2)$
  - [[Random Walk|random walk]]: $\psi_j = 1$, so the variance is $h\sigma^2$ and the interval widens without limit, the signature of a unit root
- **Reading software output.** In R, `predict()` on a fitted `arima` model returns the point forecasts (`pred`) and their standard errors (`se`). The interval is `pred` $\pm\ 1.96 \times$ `se`. A `se` column that rises with $h$ is the $\psi$-sum accumulating.
- **Regression analogue.** For a new observation at $\mathbf{x}_0$ in a [[Linear Regression]], the interval is $\hat{y}_0 \pm t_{n-p-1}\,s\sqrt{1 + \mathbf{x}_0^{\top}(\mathbf{X}^{\top}\mathbf{X})^{-1}\mathbf{x}_0}$. The "$1 +$" is the new observation's own noise. It is why a prediction interval does not shrink to zero as $n$ grows, while the confidence interval for the mean does.
- **Caveats.** The usual intervals assume the model is correct, its parameters are known and the errors are normal, so check the residuals with a [[Correlogram|correlogram]] and a [[QQ Plot]]. They omit parameter and model uncertainty, so real outcomes land outside them more often than the nominal $5\%$. For a model fitted to logs, build the interval on the log scale and exponentiate the endpoints.

> [!example]- Reading an AR(1) Forecast Table {Example}
> Quarterly claim frequency (claims per $100$ exposures) is fitted as $x_t = 2.4 + 0.6x_{t-1} + \varepsilon_t$, and the latest value is $x_t = 7.0$. The software reports:
>
> | $h$ | `pred` | `se` |
> |---|---|---|
> | 1 | $6.600$ | $0.500$ |
> | 2 | $6.360$ | $0.583$ |
> | 3 | $6.216$ | $0.610$ |
>
> Give $95\%$ prediction intervals for $h = 1$ and $h = 3$, explain why `se` grows and where it stops, and recover $\phi$ from the `se` column.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PI}_{1} &= 6.600 \pm 1.96(0.500) \\
> > &= 6.600 \pm 0.980 \\
> > &= (5.62,\ 7.58) \\
> > \text{PI}_{3} &= 6.216 \pm 1.96(0.610) \\
> > &= 6.216 \pm 1.196 \\
> > &= (5.02,\ 7.41)
> > \end{align*}
> > $$
> > Each extra step adds one more unknown shock, so the error variance is $\sigma^2(1 + \phi^2 + \phi^4 + \cdots)$. The standard error levels off at $\sigma/\sqrt{1 - \phi^2} = 0.5/0.8 = 0.625$. Far ahead, the interval becomes the long-run mean $2.4/0.4 = 6.0$ plus or minus $1.96(0.625) = 1.225$.
> >
> > The ratio of the first two standard errors gives $\phi$:
> > $$
> > \begin{align*}
> > 1 + \phi^{2} &= \left(\frac{0.583}{0.500}\right)^{2} \\
> > &= 1.36 \\
> > \lvert\phi\rvert &= 0.6
> > \end{align*}
> > $$
> > This matches the fitted coefficient: the `se` column alone carries the AR structure of the model.

> [!example]- Back-Transforming a Log-Scale Interval {Example}
> An ARIMA model is fitted to the log of monthly average paid severity. Next month's forecast is $8.70$ on the log scale, with standard error $0.08$. Give a $95\%$ prediction interval for the severity in dollars.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{log scale} &= 8.70 \pm 1.96(0.08) \\
> > &= (8.543,\ 8.857) \\
> > \text{dollars} &= \left(e^{8.543},\ e^{8.857}\right) \\
> > &= (\$5{,}132,\ \$7{,}022)
> > \end{align*}
> > $$
> > The point forecast is $e^{8.70} = \$6{,}003$. The interval is **asymmetric**: $\$871$ below and $\$1{,}019$ above, as a lognormal should be. $\$6{,}003$ is the *median* forecast. The mean is higher, $e^{8.70 + 0.08^2/2} = \$6{,}022$.
