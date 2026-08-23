---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0173c4a319cddf6f28e10d091479bbe9445ebff0a8e345454b764a113a3577e3
  sources: []
  open_findings: 0
  log: .verify/Concepts/Method of Moments.md
---

The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the theoretical moments and solving. With $k$ unknown parameters, the first $k$ moment equations are used. It is the simplest estimation method and often supplies the starting values for [[Maximum Likelihood Estimation]].

> $$\frac{1}{n}\sum_{i=1}^{n} X_i^{\,r} = E[X^{\,r}], \qquad r = 1, 2, \ldots, k$$

> $$\bar{X} = E[X \mid \theta], \qquad \frac{1}{n}\sum X_i^2 = E[X^2 \mid \theta]$$

- One parameter needs one equation ($\bar{X} = \mu(\theta)$); two parameters need the first two moments, usually solved as mean and variance
- MoM estimators are **[[Consistency|consistent]]** by the law of large numbers, but they are generally **not** [[Efficiency|efficient]] and not always [[Unbiasedness|unbiased]] — MLE beats them asymptotically
- They can produce **impossible values** (a negative variance, a shape parameter below zero) when the sample moments are unusual; MLE is constrained by the likelihood and cannot
- MoM does not use the [[Sufficient Statistic]] structure of the model, which is exactly why information is left on the table
- It handles awkward likelihoods well: for a mixture or a compound distribution, the moments are simple even when the density is not
- Censored or truncated data breaks the plain method — the sample moments no longer estimate the population moments, so the theoretical moments must be recomputed under the [[Censoring]] or [[Truncation]] scheme

![[Media/Figures/Method_of_Moments.svg|340]]

> [!example]- Gamma Parameters by Moments {Example}
> A sample of claim amounts has $\bar{x} = 500$ and $s^2 = 125{,}000$ (using the $n$ divisor). Fit a [[Gamma]] distribution with shape $\alpha$ and scale $\theta$ by the method of moments.
>
> > [!answer]-
> > For a Gamma, $E[X] = \alpha\theta$ and $\text{Var}(X) = \alpha\theta^2$. Setting these to the sample values:
> > $$\alpha\theta = 500, \qquad \alpha\theta^2 = 125{,}000$$
> > Dividing the second by the first gives $\theta = 250$, and then
> > $$\alpha = \frac{500}{250} = 2$$
> > The fitted distribution is $\text{Gamma}(\alpha = 2, \theta = 250)$.

> [!example]- Method of Moments vs MLE for the Uniform {Example}
> A sample from $\text{Uniform}(0, \theta)$ has $\bar{x} = 6$ with largest observation $x_{(n)} = 14$. Compare the MoM and ML estimates of $\theta$.
>
> > [!answer]-
> > MoM: $E[X] = \theta/2$, so $\hat\theta_{\text{MoM}} = 2\bar{x} = 12$.
> > MLE: the likelihood is positive only when $\theta \ge x_{(n)}$ and decreasing in $\theta$, so $\hat\theta_{\text{MLE}} = x_{(n)} = 14$.
> > The MoM estimate is **impossible** — it is smaller than an observed value. This is the standard illustration that matching moments ignores the structure of the likelihood.
