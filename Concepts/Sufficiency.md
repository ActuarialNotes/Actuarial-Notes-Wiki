**Sufficiency** is the property that a statistic $T(X_1, \ldots, X_n)$ captures all of a sample's information about a parameter $\theta$: once the [[Sufficient Statistic]] $T$ is known, the conditional distribution of the data no longer depends on $\theta$. It is a key criterion when judging an estimator built from $T$.

> $$f(x_1, \ldots, x_n \mid T = t,\, \theta) = f(x_1, \ldots, x_n \mid T = t)$$

- The right side is free of $\theta$, so $T$ leaves no extra information in the raw data
- Equivalently, by the **Fisher–Neyman factorization theorem**, $T$ is sufficient when the joint density factors as:

> $$f(x_1, \ldots, x_n \mid \theta) = g\big(T(x_1,\ldots,x_n),\, \theta\big) \cdot h(x_1, \ldots, x_n)$$

- An estimator should be a function of a sufficient statistic; by **Rao–Blackwell**, conditioning any [[Unbiasedness|unbiased]] estimator on $T$ never increases its variance, pushing toward [[Minimum Variance]]
- A [[Maximum Likelihood Estimation|MLE]] is always a function of a sufficient statistic, so it automatically satisfies the sufficiency criterion
- An unbiased function of a **complete** sufficient statistic is the UMVUE (Lehmann–Scheffé)

> [!example]- Sufficiency via the Conditional Distribution {Example}
> Let $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Bernoulli}(p)$ (e.g., whether each policy filed a claim). Show that $T = \sum X_i$ is sufficient for $p$.
>
> > [!answer]-
> > Given $T = t$, every arrangement of $t$ ones among $n$ trials is equally likely:
> > $$
> > \begin{align*}
> > P\!\left(\mathbf{X} = \mathbf{x} \mid T = t\right) &= \frac{p^{t}(1-p)^{n-t}}{\binom{n}{t} p^{t}(1-p)^{n-t}} \\
> >   &= \frac{1}{\binom{n}{t}}
> > \end{align*}
> > $$
> > The result is free of $p$, so knowing the total $T$ alone preserves all information about $p$ — $T$ is sufficient.

> [!example]- MLE Depends Only on the Sufficient Statistic {Example}
> Claim counts $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$ have sufficient statistic $T = \sum X_i$. Confirm the MLE of $\lambda$ uses the data only through $T$.
>
> > [!answer]-
> > Maximizing the log-likelihood $\ell(\lambda) = -n\lambda + T\ln\lambda - \sum\ln(x_i!)$ gives:
> > $$\hat{\lambda} = \frac{1}{n}\sum_{i=1}^n X_i = \frac{T}{n}$$
> > The estimator is a function of $T$ alone, so the [[Maximum Likelihood Estimation|MLE]] satisfies sufficiency.
