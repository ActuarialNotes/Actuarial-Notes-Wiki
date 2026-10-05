The **Rao-Blackwell Theorem** turns any [[Unbiasedness|unbiased]] estimator $W$ of $\tau(\theta)$ into one that is at least as good: condition it on a [[Sufficient Statistic|sufficient statistic]] $T$. The result $\varphi(T) = E[W \mid T]$ is still unbiased and its variance is never larger, for every value of $\theta$.

> $$\varphi(T) = E[\,W \mid T\,]$$

> $$E[\varphi(T)] = \tau(\theta)$$

> $$\text{Var}(\varphi(T)) = \text{Var}(W) - E\big[\text{Var}(W \mid T)\big] \le \text{Var}(W)$$

- Sufficiency is what makes $\varphi(T)$ a statistic: the conditional distribution of the sample given $T$ does not involve $\theta$, so neither does $E[W \mid T]$. The variance inequality is the law of total variance ([[Variance for Conditional and Marginal Distributions]]).
- **Completeness.** $T$ is **complete** if the only function of $T$ with expectation 0 for every $\theta$ is $0$ itself: $E_\theta[g(T)] = 0$ for all $\theta$ implies $P_\theta[g(T) = 0] = 1$. Then two unbiased estimators that are both functions of $T$ must coincide.
- **Lehmann–Scheffé Theorem.** If $T$ is complete and sufficient and $\varphi(T)$ is unbiased for $\tau(\theta)$, then $\varphi(T)$ is the **uniformly minimum variance unbiased estimator** (UMVUE, or MVUE): Rao–Blackwellizing any other unbiased estimator lands on the same $\varphi(T)$. So to find it, either guess an unbiased function of $T$ or condition a crude unbiased estimator on $T$.
- For a regular [[Exponential Family|exponential family]], the natural sufficient statistic (such as $\sum X_i$ for the Poisson, exponential and gamma with known shape) is complete, which is why these families have easy UMVUEs. Compare the [[Cramér-Rao Lower Bound]], which certifies a UMVUE only when its variance hits the bound; Lehmann–Scheffé needs no bound (see [[Minimum Variance]]).

> [!example]- UMVUE of the Claim-Free Probability {Example}
> Claim counts on $n = 5$ independent policies are Poisson($\lambda$): $0, 2, 1, 0, 1$. Starting from the crude unbiased estimator $W = \mathbf{1}\{X_1 = 0\}$ of $P(N = 0) = e^{-\lambda}$, find the UMVUE and evaluate it.
>
> > [!answer]-
> > $Y = \sum X_i$ is complete and sufficient, with $Y \sim \text{Poi}(5\lambda)$ and $\sum_{i \ge 2} X_i \sim \text{Poi}(4\lambda)$ independent of $X_1$. Condition $W$ on $Y = y$:
> >
> > $$
> > \begin{align*}
> > E[W \mid Y = y] &= \frac{P(X_1 = 0)\,P\big(\sum_{i \ge 2} X_i = y\big)}{P(Y = y)} \\
> >   &= \frac{e^{-\lambda} \cdot e^{-4\lambda}(4\lambda)^y / y!}{e^{-5\lambda}(5\lambda)^y / y!} \\
> >   &= \left(\frac{4}{5}\right)^{y}
> > \end{align*}
> > $$
> >
> > By Lehmann–Scheffé, $\left(\frac{n-1}{n}\right)^{Y}$ is the UMVUE of $e^{-\lambda}$. Here $Y = 4$, so the estimate is $(0.8)^4 = 0.4096$. The crude estimator would have said $1$ (policy 1 happened to be claim-free); the MLE $e^{-\bar{x}} = e^{-0.8} = 0.4493$ is biased.

> [!example]- Improving a One-Claim Estimate of Mean Severity {Example}
> Claim sizes are exponential with mean $\theta$. Eight claims total \$12,000. A colleague proposes estimating $\theta$ by the first claim, $X_1$. Rao–Blackwellize this estimator, evaluate it, and compare variances.
>
> > [!answer]-
> > $Y = \sum X_i$ is complete and sufficient for $\theta$. By symmetry $E[X_i \mid Y]$ is the same for all eight claims, and these eight conditional means add to $E[Y \mid Y] = Y$:
> >
> > $$
> > \begin{align*}
> > E[X_1 \mid Y] &= \frac{Y}{8} \\
> >   &= \bar{X}
> > \end{align*}
> > $$
> >
> > The improved estimate is $12{,}000/8 = \$1{,}500$, and it is the UMVUE of $\theta$. Its variance is $\theta^2/8$, against $\text{Var}(X_1) = \theta^2$ — conditioning on the sufficient statistic cut the variance by a factor of 8.
