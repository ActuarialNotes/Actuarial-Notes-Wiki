An estimator $\hat{\theta}_n$ is **consistent** for $\theta$ if it converges in probability to the true parameter value as the sample size grows without bound — larger samples make the estimator's error arbitrarily small with arbitrarily high probability.

> $$\hat{\theta}_n \xrightarrow{p} \theta \quad \text{as } n \to \infty$$
>
> $$\text{i.e., } \lim_{n\to\infty} P\big(|\hat{\theta}_n - \theta| > \varepsilon\big) = 0 \quad \text{for every } \varepsilon > 0$$

- A convenient **sufficient condition**: if $\text{Bias}(\hat{\theta}_n) \to 0$ and $\text{Var}(\hat{\theta}_n) \to 0$ as $n \to \infty$, then $\hat{\theta}_n$ is consistent (this follows from $\text{MSE}(\hat{\theta}_n) \to 0$ and Chebyshev's inequality, since [[Mean Square Error|MSE]] bounds the tail probability)
- Consistency is a **large-sample (asymptotic)** property — it says nothing about how the estimator behaves at small $n$, unlike [[Unbiasedness]], which must hold for every $n$
- An estimator can be **biased but still consistent** (e.g., the MLE of $\sigma^2$ divides by $n$ instead of $n-1$, but the bias vanishes as $n \to \infty$)
- **[[Maximum Likelihood Estimation|MLEs]]** are consistent under standard regularity conditions, which is part of why MLE is the dominant estimation method in practice

> [!example]- Consistency of the Sample Mean {Example}
> Let $X_1, \ldots, X_n$ be i.i.d. with mean $\mu$ and finite variance $\sigma^2$. Show that $\bar{X}_n$ is consistent for $\mu$.
>
> > [!answer]-
> > $$E[\bar{X}_n] = \mu \quad \Rightarrow \quad \text{Bias}(\bar{X}_n) = 0 \text{ for all } n$$
> >
> > $$\text{Var}(\bar{X}_n) = \frac{\sigma^2}{n} \to 0 \quad \text{as } n \to \infty$$
> > Since the bias is always $0$ and the variance $\to 0$, $\text{MSE}(\bar{X}_n) \to 0$, so $\bar{X}_n \xrightarrow{p} \mu$ and the sample mean is consistent.

> [!example]- A Biased but Consistent Estimator {Example}
> For $X_i \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$, the MLE of the variance is $\hat{\sigma}^2_n = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$, with $E[\hat{\sigma}^2_n] = \frac{n-1}{n}\sigma^2$. Is $\hat{\sigma}^2_n$ consistent?
>
> > [!answer]-
> > $$\text{Bias}(\hat{\sigma}^2_n) = \frac{n-1}{n}\sigma^2 - \sigma^2 = -\frac{\sigma^2}{n} \to 0$$
> > The variance of $\hat{\sigma}^2_n$ also $\to 0$ as $n \to \infty$ (it is $O(1/n)$). Both conditions hold, so $\hat{\sigma}^2_n$ is consistent for $\sigma^2$ even though it is biased for every finite $n$.
