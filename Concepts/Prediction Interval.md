---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:17852e67ba886c464caddf9c5b7665199d21e38ccc16eaa6b096ac143516054b
  sources:
    - "Penn State STAT 510 Applied Time Series Analysis, Lesson 3 §3.3 Forecasting with ARIMA Models: psi-weight (MA infinity) form with psi_0 = 1; AR(1) psi_j = phi^j (Ex 3.5); MA psi-weights equal the coefficients and are 0 past the order; Var(x^n_{n+m} - x_{n+m}) = sigma_w^2 sum_{j=0}^{m-1} psi_j^2; 95% PI x^n_{n+m} +/- 1.96 sqrt(that) 'with the assumption of normally distributed errors'; for large m the variance approaches the variance of the series; Ex 3.6 AR(1) forecasts with SE 2 and 2 sqrt(1 + 0.6^2), sha256:6c42884601a4af7581fc2047d4b89f77ab0428abbf19fc42567869f308acaca8 — https://online.stat.psu.edu/stat510/Lesson03.html; R Documentation, stats::predict.Arima (package stats 4.6.0): returns a list with components pred and se; 'The standard errors of prediction exclude the uncertainty in the estimation of the ARMA model', sha256:8c2d3e820dd8e2217dddb40d7bf182fb36025d7d62ccf3d174b3ec49d4663787 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/predict.arima.html; James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (Springer 2021, CAS-hosted copy), §3.2.2 'Predictions' p.82 (PDF p.92) and §3.4 p.103 (PDF p.113): a confidence interval quantifies uncertainty about f(X) (the average response), a prediction interval about an individual Y; 'Prediction intervals are always wider than confidence intervals' because they add the irreducible error; the linear model is treated as correct (model bias ignored), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods, Lesson 7 §7.1-7.2: se(y-hat_h) = sqrt(MSE X_h'(X'X)^{-1} X_h), PI y-hat_h +/- t_{1-alpha/2, n-p} sqrt(MSE + se(y-hat_h)^2) with p parameters including the intercept; the CI's standard error can approach 0 as n grows, the PI's cannot; the PI depends strongly on normal errors, sha256:09f3e2de7b3b61cea327370053b219eb5c6b2d0981e0aca094fdd92178c2c631 — https://online.stat.psu.edu/stat501/Lesson07.html; CAS Exam MAS-I Tables (version 01/15/2018): lognormal entry p.13, F(x) = Phi((ln x - mu)/sigma) and E[X^k] = exp(k mu + k^2 sigma^2/2) (median e^mu, mean e^{mu + sigma^2/2}); Inf row of the t table p.16 (1.960), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Peng, HKBU Math3805 Lecture Note 3 (simple linear regression), slides 12-14 (CI for mean response Y0-hat +/- t_{n-2;1-a/2} sigma-hat sqrt(1/n + (x0-xbar)^2/Cxx); PI adds 1 under the root; prediction SE always larger; both smallest at x0 = xbar), sha256:6d75495260e012eee24745deee079225b94db1a33da339f762ebab27fc8eb803 — https://www.math.hkbu.edu.hk/~hpeng/Math3805/Lecture_Note3.pdf"
    - "Shalizi, CMU 36-401 Lecture 9 (2015), pp.2-3 (variance of the fitted mean grows away from the centre of the data; t_{n-2}), sha256:45c097d56dd52b157079bf2b2753cfb8bf9519843b52f83f6cb041ffd0d28da9 — https://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/09/lecture-09.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prediction Interval.md
---

A **Prediction Interval** is a range that will contain a future observation with a stated probability. It is centred on the point prediction. A [[Confidence Interval|confidence interval]] covers a fixed quantity such as a mean response. A prediction interval must also allow for the random error the new observation will carry, so it is always at least as wide.

For a [[Time Series Forecast|time series forecast]] $\hat{x}_{t+k \mid t}$ the 95% prediction interval is

> $$\hat{x}_{t+k \mid t} \pm 1.96\,\text{SE}$$

- $\text{SE}$ is the forecast standard error, the square root of the forecast error variance $\sigma^2\sum_{j=0}^{k-1}\psi_j^2$.

The interval assumes the new observation follows the same model as the data it was fitted to, with normal errors. In R, `predict()` on a fitted `arima` model returns the forecasts as `pred` and their standard errors as `se`.

> [!example]- Quarterly claim frequency is fitted as $x_t = 2.4 + 0.6x_{t-1} + w_t$, and the software reports `pred` $6.600$ and `se` $0.500$ one step ahead, and `pred` $6.216$ and `se` $0.610$ three steps ahead. What are the 95% prediction intervals? {Example}
> - One step ahead, $6.600 \pm 1.96(0.500) = 6.600 \pm 0.980$, from $5.62$ to $7.58$.
> - Three steps ahead, $6.216 \pm 1.96(0.610) = 6.216 \pm 1.196$, from $5.02$ to $7.41$.
> - The standard error grows with each step because one more unknown shock enters. For this AR(1) it levels off at $\sigma/\sqrt{1 - 0.6^2} = 0.5/0.8 = 0.625$.

## How the width grows with the horizon

1. For an [[Moving Average Model|MA($q$)]] model, the width stops growing after $q$ steps, at $\sigma\sqrt{1 + \beta_1^2 + \cdots + \beta_q^2}$.
2. For a stationary [[Autoregressive Model|AR(1)]], the variance $\sigma^2(1 - \alpha_1^{2k})/(1 - \alpha_1^2)$ levels off at the series' own variance $\sigma^2/(1 - \alpha_1^2)$.
3. For a [[Random Walk|random walk]], the variance is $k\sigma^2$, and the interval widens without limit.

> [!example]- An ARIMA model fitted to the log of monthly average severity forecasts $8.70$ for next month, with standard error $0.08$. What is the 95% prediction interval for the severity? {Example}
> - On the log scale the interval is $8.70 \pm 1.96(0.08)$, from $8.543$ to $8.857$.
> - Exponentiating the endpoints gives $e^{8.543} = \$5{,}132$ to $e^{8.857} = \$7{,}022$.
> - The interval is not symmetric about the point forecast $e^{8.70} = \$6{,}003$.

## Prediction interval in regression

In [[Linear Regression|simple linear regression]] with $n$ observations, write $S_{xx} = \sum (x_i - \bar{x})^2$ and let $s$ be the residual standard error on $n - 2$ degrees of freedom. The confidence interval for the mean response $E[Y]$ at $x_0$ is

> $$\hat{y}_0 \pm t_{0.025,\,n-2}\; s\sqrt{\frac{1}{n} + \frac{(x_0 - \bar{x})^2}{S_{xx}}}$$

and the 95% prediction interval for a new observation $Y$ at $x_0$ is

> $$\hat{y}_0 \pm t_{0.025,\,n-2}\; s\sqrt{1 + \frac{1}{n} + \frac{(x_0 - \bar{x})^2}{S_{xx}}}$$

- $\hat{y}_0$ is the fitted value at $x_0$.

The extra $1$ is the variance of the new observation's own error. The confidence interval reflects only the error in estimating the mean, which goes to zero as $n$ grows, so its width approaches zero. The prediction interval does not shrink to zero, because the new observation's error does not depend on $n$. Both are narrowest at $x_0 = \bar{x}$, and the prediction interval is always the wider of the two, enclosing about 95% of new observations. With $p$ predictors, the term under the root is $1 + \mathbf{x}_0^T(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{x}_0$.

> [!example]- A regression on $n = 12$ points has $\bar{x} = 5$, $S_{xx} = 40$ and $s = 3$, and its fitted value at $x_0 = 7$ is $\hat{y}_0 = 20$. What are the 95% confidence interval for the mean response and the 95% prediction interval at $x_0$? {Example}
> - The $t$ value with 10 degrees of freedom is $t_{0.025,\,10} = 2.228$.
> - For the mean, $\sqrt{1/12 + 4/40} = 0.428$, so the interval is $20 \pm 2.228(3)(0.428) = 20 \pm 2.86$.
> - For a new observation, $\sqrt{1 + 1/12 + 4/40} = 1.088$, so the interval is $20 \pm 2.228(3)(1.088) = 20 \pm 7.27$.

> [!trap] Model uncertainty is left out
> The usual intervals take the model and its parameters as known, so real outcomes fall outside them more often than the nominal 5%. Check the residuals with a [[Correlogram|correlogram]] and a [[QQ Plot|QQ plot]] before relying on them.
