---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e1cfc0133f3fdcf79092734245393c240a2094428d6e6501b8961c67d9abcb0e
  sources:
    - "Siegrist, Random (randomservices.org), ch.7 §2 Estimation in the Normal Model: assumption 'random sample from the normal distribution'; T = (M - mu)/(S/sqrt n) ~ t_{n-1}, V = (n-1)S^2/sigma^2 ~ chi^2_{n-1}; M +/- z(1-alpha/2) sigma/sqrt n, M +/- t_{n-1}(1-alpha/2) S/sqrt n, [(n-1)S^2/chi^2_{n-1}(1-alpha/2), (n-1)S^2/chi^2_{n-1}(alpha/2)] with chi^2_k(p) the quantile of order p; 'Robustness': mean intervals approximately valid for large n by the CLT, variance intervals not robust, sha256:21c59dd27f38c17148de5af35d53d94a01c51cd4f230c81d75e91173a9917586 — https://www.randomservices.org/random/interval/Normal.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §1.3.5.8 Chi-Square Test for the Variance: T = (N-1)(s/sigma0)^2, critical values chi^2_{1-alpha,N-1} / chi^2_{1-alpha/2,N-1} (lower-tail quantile notation), interval for the variance, sha256:479a6c6d7f68671d8a61d0daa073e5884a428b477d7b0308c50863c7f164d467 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda358.htm"
    - "CAS Exam MAS-I Tables (version 01/15/2018): t table 'Tail areas (two-sided)' p.16 (df 15, 0.05 column: 2.131; Inf row 1.960, 2.576); 'Lower-tail areas for Chi-square distributions' p.20 (df 15: 0.025 column 6.26, 0.975 column 27.49), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Confidence Interval.md
---

![[Media/Figures/Confidence_Interval.svg|340]]

A **Confidence Interval** for a parameter $\theta$ is an interval computed from a [[Random Sample|random sample]] that contains $\theta$ with a stated probability $1 - \alpha$, called the confidence coefficient, before the sample is drawn. For the mean $\mu$ of a [[Normal Distribution|normal distribution]] with known standard deviation $\sigma$, the $100(1 - \alpha)\%$ confidence interval is

> $$\bar{X} \pm z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$

- $\bar{X}$ is the [[Sample Mean|sample mean]].
- $z_{\alpha/2}$ is the upper $\alpha/2$ point of the standard normal distribution.

The probability $1 - \alpha$ belongs to the procedure. Once an interval is computed, it either contains $\theta$ or it does not.

> [!example]- Claim sizes are normal with standard deviation 300. A sample of 36 claims has mean 1,200. What is the 95% confidence interval for the mean claim size? {Example}
> - The standard deviation of $\bar{X}$ is $300 / \sqrt{36} = 50$.
> - For 95% confidence, $z_{0.025} = 1.96$, so the half-width is $1.96 \times 50 = 98$.
> - The 95% confidence interval is $1{,}200 \pm 98$, or $(1{,}102,\ 1{,}298)$.

## Confidence interval for a mean with unknown variance

When $\sigma$ is unknown, it is replaced by the sample standard deviation $S$, and the $100(1 - \alpha)\%$ confidence interval for $\mu$ is

> $$\bar{X} \pm t_{\alpha/2,\,n-1} \frac{S}{\sqrt{n}}$$

- $t_{\alpha/2,\,n-1}$ is the upper $\alpha/2$ point of the [[Student's t-Distribution|$t$ distribution]] with $n - 1$ degrees of freedom.

The CAS MAS-I $t$ table is headed by the two-sided tail area, so $t_{0.025,15} = 2.131$ is in the column headed 0.05.

> [!example]- Claim sizes are normal. A sample of 16 claims has mean 8,400 and sample standard deviation 1,200. What is the 95% confidence interval for the mean claim size? {Example}
> - The estimated standard deviation of $\bar{X}$ is $1{,}200 / \sqrt{16} = 300$.
> - With 15 degrees of freedom, $t_{0.025,15} = 2.131$, so the half-width is $2.131 \times 300 = 639$.
> - The 95% confidence interval is $8{,}400 \pm 639$, or $(7{,}761,\ 9{,}039)$.

## Confidence interval for a variance

For a random sample from a normal distribution, $(n-1)S^2/\sigma^2$ has a [[Chi-Squared Distribution|chi-squared distribution]] with $n - 1$ degrees of freedom, and the $100(1 - \alpha)\%$ confidence interval for $\sigma^2$ is

> $$\left(\frac{(n-1)S^2}{\chi^2_{\alpha/2,\,n-1}},\ \frac{(n-1)S^2}{\chi^2_{1-\alpha/2,\,n-1}}\right)$$

- $\chi^2_{\alpha/2,\,n-1}$ and $\chi^2_{1-\alpha/2,\,n-1}$ are the upper $\alpha/2$ and the upper $1 - \alpha/2$ points of the chi-squared distribution.

The interval is not symmetric about $S^2$, and it requires a normal population at every sample size.

> [!example]- A sample of 16 claims from a normal distribution has sample standard deviation 1,200. What is the 95% confidence interval for the standard deviation? {Example}
> - With 15 degrees of freedom, $\chi^2_{0.025,15} = 27.488$ and $\chi^2_{0.975,15} = 6.262$.
> - The numerator is $(n-1)S^2 = 15 \times 1{,}200^2 = 21{,}600{,}000$.
> - The lower endpoint for $\sigma^2$ is $\frac{21{,}600{,}000}{27.488} = 785{,}797$.
> - The upper endpoint for $\sigma^2$ is $\frac{21{,}600{,}000}{6.262} = 3{,}449{,}377$.
> - Taking square roots, the 95% confidence interval for $\sigma$ is $(886,\ 1{,}857)$.

## Large-sample confidence interval

For an estimator $\hat{\theta}$ that is approximately normal in large samples, such as a [[Maximum Likelihood Estimation|maximum likelihood estimator]], the approximate $100(1 - \alpha)\%$ confidence interval is

> $$\hat{\theta} \pm z_{\alpha/2}\,\text{SE}(\hat{\theta})$$

- $\text{SE}(\hat{\theta})$ is the standard error of $\hat{\theta}$. For a maximum likelihood estimator it is $1/\sqrt{n I(\hat{\theta})}$, with $I(\theta)$ the [[Fisher Information|Fisher information]] of one observation.

At 95% confidence, $z_{0.025} = 1.96$, which is why an interval of about two standard errors on either side of an estimate is read as an approximate 95% confidence interval.

> [!example]- A portfolio has 400 claims in a year, and the number of claims is Poisson. What is an approximate 95% confidence interval for the expected number of claims? {Example}
> - The estimate of the Poisson mean is 400, and the variance of a Poisson count equals its mean, so the standard error is $\sqrt{400} = 20$.
> - The half-width is $1.96 \times 20 = 39.2$.
> - The approximate 95% confidence interval is $(360.8,\ 439.2)$.

## Confidence intervals and hypothesis tests

A two-sided [[Hypothesis Testing|hypothesis test]] of $H_0: \theta = \theta_0$ at significance level $\alpha$ rejects $H_0$ exactly when $\theta_0$ lies outside the $100(1 - \alpha)\%$ confidence interval. For a coefficient $\beta_j$ of a [[Generalized Linear Model|generalized linear model]] with a log link, the interval $\hat{\beta}_j \pm 1.96\,\text{SE}(\hat{\beta}_j)$ tests $H_0: \beta_j = 0$ at the 5% level, and exponentiating its endpoints gives the interval for the multiplicative relativity $e^{\beta_j}$. A relativity whose interval contains 1.00, the relativity of the base level, is not significantly different from the base level. At the same confidence level, a narrower interval, like a narrower [[Prediction Interval|prediction interval]], pins the quantity down more precisely.

> [!example]- A log-link GLM gives $\hat{\beta} = 0.35$ with standard error 0.12 for an urban territory. What is the 95% confidence interval for the urban relativity, and is the relativity significantly different from the base level? {Example}
> - On the scale of the linear predictor, the interval is $0.35 \pm 1.96 \times 0.12 = (0.115,\ 0.585)$.
> - Exponentiating the endpoints gives the interval for the relativity, $(e^{0.115},\ e^{0.585}) = (1.12,\ 1.80)$.
> - The interval does not contain 1.00, so the urban relativity is significantly different from the base level at the 5% level.
