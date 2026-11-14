---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aec49ba50bcf79e2c496454fbdb74e447fff2e3edb8c0f3c7482c426d0d5f8f8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Estimator.md
---

An **Estimator** $\hat\theta$ is a rule, a function of the sample $X_1, \ldots, X_n$, that produces a value for an unknown parameter $\theta$. The number it produces from a particular sample is the **estimate**.

An estimator is a function of random data, so it is itself a [[Random Variable|random variable]]. Its quality is judged by the distribution it has *before* the data are seen, over repeated samples. The estimates from one sample cannot by themselves show its bias.

The bias of an estimator $\hat\theta$, with the expectation taken at the true value of $\theta$, is

> $$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$

The mean squared error of $\hat\theta$, the expected squared difference between the estimator and the true value, is

> $$\text{MSE}(\hat\theta) = E\big[(\hat\theta - \theta)^2\big]$$

> $$\text{MSE}(\hat\theta) = \text{Var}(\hat\theta) + \big[\text{Bias}(\hat\theta)\big]^2$$

MSE trades bias against variance, so a biased estimator can have a smaller MSE than an unbiased one ([[Bias-Variance Tradeoff|bias-variance tradeoff]]).

> [!example]- Claim sizes are uniform on $(0, \theta)$, and $n = 4$. Which of $2\bar X$, $X_{(4)}$ and $\tfrac{5}{4}X_{(4)}$ has the smallest MSE? {Example}
> - For a sample of $n$ from a uniform on $(0, \theta)$, the sample maximum has $E[X_{(n)}] = \frac{n\theta}{n+1}$ and $\text{Var}(X_{(n)}) = \frac{n\theta^2}{(n+1)^2(n+2)}$.
> - $E[2\bar X] = \theta$, so $2\bar X$ is unbiased. Its MSE is its variance, $4 \cdot \frac{\theta^2}{12 \cdot 4} = 0.0833\,\theta^2$.
> - The maximum $X_{(4)}$, the MLE, is biased low: its bias is $\tfrac{4}{5}\theta - \theta = -0.2\,\theta$.
> - Its variance is $\frac{4\theta^2}{25 \cdot 6} = 0.02667\,\theta^2$, so its MSE is $0.02667\,\theta^2 + 0.04\,\theta^2 = 0.0667\,\theta^2$.
> - $\tfrac{5}{4}X_{(4)}$ is unbiased. Since $\text{Var}(cX) = c^2\,\text{Var}(X)$, its MSE is $\left(\tfrac{5}{4}\right)^2 (0.02667\,\theta^2) = 0.0417\,\theta^2$.
> - $\tfrac{5}{4}X_{(4)}$ has the smallest MSE, and the biased MLE beats the unbiased $2\bar X$.

## Properties of an estimator

An estimator is [[Unbiasedness|unbiased]] if its bias is zero for every $\theta$, and asymptotically unbiased if its bias goes to zero as $n \to \infty$. Among unbiased estimators, the one with the smallest variance is the most [[Efficiency|efficient]]. The [[Cramér-Rao Lower Bound|Cramér-Rao lower bound]] is the floor on that variance.

An estimator $\hat\theta_n$ from a sample of size $n$ is [[Consistency|consistent]], converging in probability to $\theta$, if, for every $\delta > 0$,

> $$\lim_{n \to \infty} P\big(|\hat\theta_n - \theta| > \delta\big) = 0$$

## Variance of a maximum likelihood estimator

Under regularity conditions, the [[Maximum Likelihood Estimation|maximum likelihood estimator]] is asymptotically normal with variance $1/I(\theta)$, where $I(\theta)$ is the [[Fisher Information|Fisher information]] of the sample. The variance is estimated by the inverse of the observed information,

> $$\widehat{\text{Var}}(\hat\theta) = \frac{1}{-l''(\hat\theta)}$$

- $l(\theta)$ is the log-likelihood, and $l''(\hat\theta)$ its second derivative at the estimate.

The normal [[Confidence Interval|confidence interval]] at level $1 - \alpha$ is

> $$\hat\theta \pm z_{1-\alpha/2}\sqrt{\widehat{\text{Var}}(\hat\theta)}$$

- $z_{1-\alpha/2}$ is the $1 - \alpha/2$ percentile of the standard normal distribution.

For a function $g(\hat\theta)$ of the estimate, the variance comes from the [[Delta Method|delta method]].

> [!example]- What are $\hat\mu$ and an approximate 95% confidence interval for this transition intensity? {Example}
> A healthy–sick model has a constant intensity $\mu$ from healthy to sick. A study records $d = 45$ transitions in $v = 1{,}500$ years spent healthy.
>
> > [!answer]-
> > - The log-likelihood is $l(\mu) = d \ln \mu - \mu v$.
> > - Setting $l'(\mu) = d/\mu - v = 0$ gives $\hat\mu = d/v = 45/1{,}500 = 0.03$.
> > - The observed information is $-l''(\hat\mu) = d/\hat\mu^2$, so $\widehat{\text{Var}}(\hat\mu) = \hat\mu^2/d = d/v^2$.
> > - The standard error is $\sqrt{45}/1{,}500 = 0.004472$.
> > - The interval is $0.03 \pm 1.96(0.004472)$, which is $(0.0212,\ 0.0388)$.

## Likelihood-based confidence interval

A non-normal confidence interval at level $1 - \alpha$ keeps every $\theta$ with

> $$l(\theta) \ge l(\hat\theta) - \tfrac{1}{2}\chi^2_{1,\,1-\alpha}$$

- $\chi^2_{1,\,1-\alpha}$ is the $1 - \alpha$ percentile of the chi-square distribution with one degree of freedom.

This interval need not be symmetric about $\hat\theta$.

> [!trap] Adding the bias without squaring it
> $\text{MSE} = \text{Var} + \text{Bias}^2$. Adding the bias unsquared, or subtracting it because it is negative, gives a wrong answer that is often one of the choices. For $X_{(4)}$ above, $0.02667\,\theta^2 - 0.2\,\theta$ is not an MSE at all.
