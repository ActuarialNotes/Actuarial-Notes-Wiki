---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a44177201a795e7246e04634fae102c3494b5901605dbcfedd8666041b267a9f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Estimator.md
---

An **estimator** $\hat\theta$ is a rule — a function of the sample $X_1, \ldots, X_n$ — that produces a value for an unknown parameter $\theta$; being a function of random data, it is itself a [[Random Variable|random variable]], and its quality is judged by the distribution it has *before* the data are seen. The number it produces from a particular sample is the **estimate**.

> $$\text{bias}_{\hat\theta}(\theta) = E[\hat\theta \mid \theta] - \theta$$

> $$\text{MSE}_{\hat\theta}(\theta) = E\big[(\hat\theta - \theta)^2 \mid \theta\big]$$

> $$\text{MSE}_{\hat\theta}(\theta) = \text{Var}(\hat\theta \mid \theta) + \big[\text{bias}_{\hat\theta}(\theta)\big]^2$$

- **Properties.** An estimator is [[Unbiasedness|unbiased]] if its bias is zero for every $\theta$, asymptotically unbiased if the bias vanishes as $n \to \infty$, and [[Consistency|consistent]] if $\Pr(|\hat\theta_n - \theta| > \delta) \to 0$ for every $\delta > 0$. Among unbiased estimators, the one with smallest variance is the most [[Efficiency|efficient]]; the [[Cramér-Rao Lower Bound]] is the floor.
- **MSE trades bias against variance**, so a biased estimator can beat an unbiased one ([[Bias-Variance Tradeoff]]).
- **Variance of an MLE.** Under regularity conditions the [[Maximum Likelihood Estimation|MLE]] is asymptotically normal with variance $1/I_n(\theta)$, estimated by the inverse of the observed information $-\ell''(\hat\theta)$ ([[Fisher Information]]). That gives the normal [[Confidence Interval|confidence interval]] $\hat\theta \pm z_{1-\alpha/2}\sqrt{\widehat{\text{Var}}(\hat\theta)}$; for a function $g(\hat\theta)$ use the [[Delta Method|delta method]].
- **Non-normal interval.** Klugman's likelihood-based alternative keeps every $\theta$ with $\ell(\theta) \ge \ell(\hat\theta) - \tfrac{1}{2}\chi^2_{1,\,1-\alpha}$; it need not be symmetric about $\hat\theta$.

> [!example]- Three Estimators of a Maximum Claim {Example}
> Claim sizes are uniform on $(0, \theta)$. From a sample of $n = 4$, compare by MSE: (a) $2\bar X$, (b) the sample maximum $X_{(4)}$ (the MLE), (c) $\tfrac{5}{4}X_{(4)}$. Use $E[X_{(n)}] = \frac{n\theta}{n+1}$ and $\text{Var}(X_{(n)}) = \frac{n\theta^2}{(n+1)^2(n+2)}$.
>
> > [!answer]-
> > (a) $E[2\bar X] = \theta$, so it is unbiased and
> >
> > $$
> > \begin{align*}
> > \text{MSE} &= 4 \cdot \frac{\theta^2}{12 \cdot 4} \\
> > &= 0.0833\,\theta^2
> > \end{align*}
> > $$
> >
> > (b) The maximum is biased low:
> >
> > $$
> > \begin{align*}
> > \text{bias} &= \tfrac{4}{5}\theta - \theta \\
> > &= -0.2\,\theta \\
> > \text{Var} &= \frac{4\theta^2}{25 \cdot 6} \\
> > &= 0.02667\,\theta^2 \\
> > \text{MSE} &= 0.02667\,\theta^2 + 0.04\,\theta^2 \\
> > &= 0.0667\,\theta^2
> > \end{align*}
> > $$
> >
> > (c) Scaling removes the bias:
> >
> > $$
> > \begin{align*}
> > \text{MSE} &= \left(\tfrac{5}{4}\right)^2 (0.02667\,\theta^2) \\
> > &= 0.0417\,\theta^2
> > \end{align*}
> > $$
> >
> > The biased MLE beats the unbiased $2\bar X$, and the bias-corrected maximum beats both: unbiasedness alone does not decide which estimator is better.

> [!example]- Confidence Interval for a Transition Intensity {Example}
> In a healthy–sick model with a constant intensity $\mu$ from healthy to sick, a study records $d = 45$ transitions in $v = 1{,}500$ years spent healthy. The log-likelihood is $\ell(\mu) = d \ln \mu - \mu v$. Estimate $\mu$ and give an approximate $95\%$ confidence interval.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\mu &= \frac{d}{v} \\
> > &= \frac{45}{1{,}500} \\
> > &= 0.03
> > \end{align*}
> > $$
> >
> > The observed information is $-\ell''(\hat\mu) = d/\hat\mu^2$, so
> >
> > $$
> > \begin{align*}
> > \widehat{\text{Var}}(\hat\mu) &= \frac{\hat\mu^2}{d} \\
> > &= \frac{d}{v^2} \\
> > \text{SE} &= \frac{\sqrt{45}}{1{,}500} \\
> > &= 0.004472 \\[4pt]
> > \text{CI} &= 0.03 \pm 1.96(0.004472) \\
> > &= (0.0212,\ 0.0388)
> > \end{align*}
> > $$
> >
> > The data place the annual sickness intensity between about $2.1\%$ and $3.9\%$; a tighter interval needs more transitions, not just more exposure time.

> [!tip]- How it appears on the exam
> - **ASTAM** (*estimate the variance of the estimators and construct normal and non-normal confidence intervals*): fit a severity or frequency by maximum likelihood, invert the (observed or expected) information for the variance, then build $\hat\theta \pm z\,\text{SE}$; a variant asks for the likelihood-based interval instead.
> - **ASTAM** also asks for the bias, variance or MSE of a stated estimator — sample mean, sample maximum, an empirical survival probability — where the answer turns on $\text{MSE} = \text{Var} + \text{bias}^2$.
> - **ALTAM** (*approximate confidence intervals for the estimators in Topic 1(h)*): the MLE of a constant transition intensity $d/v$ from multiple-state or multiple-decrement data, its variance $d/v^2$, and an interval for the intensity or, through the delta method, for a transition probability.

> [!warning]- Exam traps
> - **Squaring the bias into the wrong place.** $\text{MSE} = \text{Var} + \text{bias}^2$; adding the bias unsquared, or subtracting it because it is negative, gives a wrong answer that is often an offered choice.
> - **Confusing $\text{Var}(X)$ with $\text{Var}(\bar X)$.** The variance of the sample mean divides by $n$; an interval built on $\sigma$ instead of $\sigma/\sqrt n$ is $\sqrt n$ times too wide.
> - **Dividing by exposure instead of transitions.** For $\hat\mu = d/v$ the variance is $d/v^2$ (equivalently $\hat\mu^2/d$), not $\hat\mu/v^2$ or $\hat\mu^2/v$.
> - **Equating unbiased with best.** An unbiased estimator with large variance can lose to a biased one on MSE, as the sample maximum shows.
