An estimator $\hat{\theta}$ of a parameter $\theta$ is **unbiased** if its expected value equals the true parameter value for all $\theta$. Unbiasedness means the estimator is correct **on average**.

> $$E[\hat{\theta}] = \theta \quad \text{for all } \theta$$
>
> $$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta = 0$$

- The **sample mean** $\bar{X} = \frac{1}{n}\sum X_i$ is an unbiased estimator of the population mean $\mu$
- The **sample variance** $S^2 = \frac{1}{n-1}\sum (X_i - \bar{X})^2$ is unbiased for $\sigma^2$; dividing by $n$ instead gives a biased (but lower MSE) estimator
- Unbiasedness alone does not imply a good estimator — a large [[Variance]] is also undesirable; the **[[Mean Square Error]]** combines both: $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + \text{Bias}^2(\hat{\theta})$
- The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) is the unbiased estimator with smallest variance for all $\theta$
- **[[Maximum Likelihood Estimation|MLEs]]** are generally **asymptotically** unbiased but may be biased in small samples

> [!example]- Checking Unbiasedness of the Sample Mean {Example}
> Let $X_1, \ldots, X_n$ be i.i.d. with mean $\mu$. Show that $\bar{X}$ is unbiased for $\mu$.
>
> > [!answer]-
> > $$E[\bar{X}] = E\!\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n}(n\mu) = \mu$$
> > Since $E[\bar{X}] = \mu$, $\bar{X}$ is unbiased.

> [!example]- MLE Bias for the Exponential Distribution {Example}
> For $X_i \sim \text{Exp}(\theta)$, the MLE is $\hat{\theta} = \bar{X}$. Is it unbiased?
>
> > [!answer]-
> > $E[\bar{X}] = E[X_i] = \theta$. Yes, $\hat{\theta} = \bar{X}$ is **unbiased** for $\theta$ in the exponential case.
