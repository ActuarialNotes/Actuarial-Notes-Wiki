---
aliases:
  - Non-Normal Confidence Interval
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c370732fe31a07ee6b72bad6dbb203667ceb7f7457be68641551e043bc0ddaa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Approximate Confidence Interval.md
---

An **Approximate Confidence Interval** is an interval for a parameter $\theta$ built from the large-sample behaviour of its [[Maximum Likelihood Estimation|maximum likelihood estimator]] $\hat\theta$ rather than from an exact sampling distribution. The usual one is the normal interval, the estimate plus or minus a normal percentile times a standard error taken from the [[Fisher Information|Fisher information]]. At confidence level $p$, the normal interval is

> $$\hat\theta \pm z_{(1+p)/2}\sqrt{\widehat{\text{Var}}(\hat\theta)}$$

- $z_{(1+p)/2}$ is the $100(1+p)/2$th percentile of the standard normal distribution, 1.96 for a 95% interval.
- $\sqrt{\widehat{\text{Var}}(\hat\theta)}$ is the standard error of $\hat\theta$, written $\text{SE}$.

The estimated variance is the inverse of the observed information:

> $$\widehat{\text{Var}}(\hat\theta) = \big[-l''(\hat\theta)\big]^{-1}$$

- $l(\theta)$ is the log-likelihood, and $l''$ is its second derivative.
- The expected information evaluated at $\hat\theta$ can be used in place of $-l''(\hat\theta)$.

For a function $g(\theta)$, the [[Delta Method|delta method]] gives the variance $g'(\hat\theta)^2\,\widehat{\text{Var}}(\hat\theta)$, and the normal interval for $g(\theta)$ is built the same way. All of these intervals are large-sample approximations. With few observations the normal interval can include impossible values, such as a negative intensity, and the non-normal intervals below are the remedy.

> [!example]- What is the maximum likelihood estimate of $\alpha$, and its 95% normal interval? {Example}
> Ten losses above $\$500{,}000$ are modelled as single-parameter Pareto with $\theta = 500{,}000$ known and $\alpha$ unknown. The data give $\sum \ln(x_i/500{,}000) = 4.0$.
>
> > [!answer]-
> > - Apart from a constant, the log-likelihood is $l(\alpha) = 10\ln\alpha - 4\alpha$. The constant does not depend on $\alpha$, so it does not move the maximum.
> > - Setting $l'(\alpha) = 10/\alpha - 4$ to 0 gives $\hat\alpha = 2.5$.
> > - The observed information is $-l''(\alpha) = 10/\alpha^2$, so $\widehat{\text{Var}}(\hat\alpha) = 2.5^2/10 = 0.625$ and $\text{SE} = 0.7906$.
> > - The 95% normal interval is $2.5 \pm 1.96(0.7906)$, which is $(0.950,\ 4.050)$.

## Non-normal confidence intervals

The log-transformed interval is the normal interval for $\ln\theta$ mapped back. The delta method gives $\text{SE}(\ln\hat\theta) \approx \text{SE}/\hat\theta$, so the interval is

> $$\Big(\hat\theta\,e^{-z_{(1+p)/2}\text{SE}/\hat\theta},\ \hat\theta\,e^{z_{(1+p)/2}\text{SE}/\hat\theta}\Big)$$

It stays positive and reaches further above $\hat\theta$ than below.

The likelihood-ratio interval keeps every $\theta$ that a [[Likelihood Ratio Test|likelihood ratio test]] would not reject:

> $$\Big\{\theta : l(\theta) \ge l(\hat\theta) - \tfrac{1}{2}\chi^2_{1,\,p}\Big\}$$

- $\chi^2_{1,\,p}$ is the $100p$th percentile of the [[Chi-Squared Distribution|chi-squared distribution]] with one degree of freedom, 3.841 at 95%.

The likelihood-ratio interval follows the shape of the likelihood, needs no variance, and transforms with the parameter. It is the non-normal interval of Klugman, Panjer & Willmot (*Loss Models*, chapter 11). Its two endpoints are found by solving $l(\theta) = l(\hat\theta) - \tfrac{1}{2}\chi^2_{1,\,p}$, numerically or by checking given candidate values.

> [!example]- What are the 95% log-transformed and likelihood-ratio intervals for $\alpha$? {Example}
> The ten Pareto losses of the example above give $l(\alpha) = 10\ln\alpha - 4\alpha$, $\hat\alpha = 2.5$ and $\text{SE} = 0.7906$.
>
> > [!answer]-
> > - For the log-transformed interval, $e^{1.96(0.7906)/2.5} = e^{0.6198} = 1.8586$.
> > - The log-transformed interval is $(2.5/1.8586,\ 2.5 \times 1.8586)$, which is $(1.345,\ 4.646)$.
> > - For the likelihood-ratio interval, $l(2.5) = 10\ln 2.5 - 10 = -0.8371$, and the cutoff is $-0.8371 - 3.841/2 = -2.7576$.
> > - Solving $10\ln\alpha - 4\alpha = -2.7576$ numerically gives the interval $(1.253,\ 4.385)$.
> > - Both non-normal intervals sit further right than the normal interval $(0.950,\ 4.050)$, because the log-likelihood falls away more steeply below $\hat\alpha$ than above it. Both stay well clear of $\alpha = 1$, below which the Pareto mean is infinite.

## Transition intensities in a multiple state model

In a [[Multiple State Model|multiple state model]] with a constant [[Transition Intensity|transition intensity]] $\mu$ out of a state, the likelihood is $\mu^d e^{-\mu v}$, and the maximum likelihood estimate is

> $$\hat\mu = \frac{d}{v}$$

- $d$ is the number of transitions observed.
- $v$ is the total time that lives were observed in the state the transition leaves, not the total time in the study.

From $-l''(\mu) = d/\mu^2$, its estimated variance (Dickson, Hardy & Waters, chapter 8) is

> $$\widehat{\text{Var}}(\hat\mu) = \frac{d}{v^2}$$

Intensities out of the same state share $v$, but the cross derivatives of the log-likelihood are 0, so their estimators are asymptotically independent. A probability of staying in a state depends on every intensity out of it, so the variance of their total adds all of their variances.

> [!example]- What are 95% intervals for $\mu^{01}$ and for ${}_1p_{60}^{\overline{00}}$? {Example}
> In a healthy–sick–dead model with constant intensities over ages 60 to 65, a study observes 1,250 person-years in the healthy state, with 30 transitions to sick and 5 deaths. The probability that a healthy life stays healthy for a year is ${}_1p_{60}^{\overline{00}} = e^{-(\mu^{01} + \mu^{02})}$.
>
> > [!answer]-
> > - $\hat\mu^{01} = 30/1{,}250 = 0.024$, with standard error $\sqrt{30}/1{,}250 = 0.004382$.
> > - The interval for $\mu^{01}$ is $0.024 \pm 1.96(0.004382)$, which is $(0.0154,\ 0.0326)$.
> > - The total intensity is $35/1{,}250 = 0.028$. The two estimators are asymptotically independent, so its variance is $35/1{,}250^2$ and its standard error is 0.004733.
> > - The derivative of $e^{-s}$ is $-e^{-s}$, so the delta method multiplies that standard error by $\hat p = e^{-0.028} = 0.97239$, giving 0.004602.
> > - The interval for ${}_1p_{60}^{\overline{00}}$ is $0.97239 \pm 1.96(0.004602)$, which is $(0.9634,\ 0.9814)$.

> [!trap] Using the information as the variance
> The variance is the inverse of the information. Using $-l''(\hat\theta)$ itself as the variance gives a nonsense interval, which is easy to miss when the information happens to be close to 1.
