**Efficiency** compares estimators by their variance relative to the smallest variance achievable: an [[Unbiasedness|unbiased]] estimator is **efficient** if it attains the Cramér–Rao lower bound, and one estimator is **relatively more efficient** than another if it has smaller variance (equivalently, smaller [[Mean Square Error]]) for the same parameter.

> $$\text{Relative Efficiency}(\hat{\theta}_1, \hat{\theta}_2) = \frac{\text{Var}(\hat{\theta}_2)}{\text{Var}(\hat{\theta}_1)}$$
>
> $$\text{Efficiency}(\hat{\theta}) = \frac{1/I(\theta)}{\text{Var}(\hat{\theta})} \leq 1$$

- $I(\theta)$ is the Fisher information, so $1/I(\theta)$ is the [[Minimum Variance|Cramér–Rao lower bound]] (CRLB); an unbiased estimator with $\text{Efficiency}(\hat{\theta}) = 1$ attains the CRLB and is called **efficient**
- If $\text{Var}(\hat{\theta}_2) > \text{Var}(\hat{\theta}_1)$, then $\hat{\theta}_1$ is **more efficient** — relative efficiency above $1$ favors $\hat{\theta}_1$
- **[[Maximum Likelihood Estimation|MLEs]]** are **asymptotically efficient**: their variance converges to the CRLB as $n \to \infty$, even when no finite-sample estimator attains it exactly
- Efficiency is distinct from [[Consistency]] and [[Unbiasedness]]: an estimator can be consistent and unbiased yet inefficient if a lower-variance unbiased alternative exists

> [!example]- Comparing Two Unbiased Estimators {Example}
> For $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$, consider the sample mean $\bar{X}$ and the sample median $M$ as estimators of $\mu$. Both are unbiased, with $\text{Var}(\bar{X}) = \sigma^2/n$ and $\text{Var}(M) \approx 1.571\,\sigma^2/n$ for large $n$. Which is more efficient?
>
> > [!answer]-
> > $$\text{Relative Efficiency}(\bar{X}, M) = \frac{\text{Var}(M)}{\text{Var}(\bar{X})} = \frac{1.571\,\sigma^2/n}{\sigma^2/n} = 1.571$$
> > Since this exceeds $1$, $\bar{X}$ is the **more efficient** estimator — it has smaller variance for the same sample size.

> [!example]- Checking MLE Efficiency Against the CRLB {Example}
> For $X_i \stackrel{\text{iid}}{\sim} \text{Exp}(\theta)$, the CRLB for any unbiased estimator of $\theta$ is $\theta^2/n$, and $\hat{\theta}_{\text{MLE}} = \bar{X}$ has $\text{Var}(\bar{X}) = \theta^2/n$. Is the MLE efficient here?
>
> > [!answer]-
> > $$\text{Efficiency}(\bar{X}) = \frac{\theta^2/n}{\theta^2/n} = 1$$
> > The MLE's variance exactly equals the CRLB for every $n$, so $\bar{X}$ is efficient (not merely asymptotically efficient) in the exponential case.
