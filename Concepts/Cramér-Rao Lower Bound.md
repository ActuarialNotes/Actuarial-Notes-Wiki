---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fcae0fd1b1737964d3c7d2a45dd4b875241f3848d73b127e34d4fc312fb8c7a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Cramér-Rao Lower Bound.md"
---

The **Cramér–Rao lower bound** (CRLB) is the smallest variance that any [[Unbiasedness|unbiased]] estimator of a parameter can have, under standard regularity conditions. For a [[Random Sample|random sample]] of size $n$ it is the reciprocal of the sample's [[Fisher Information|Fisher information]], $n I(\theta)$ — the benchmark against which [[Efficiency|efficiency]] is measured.

> $$\text{Var}(\hat\theta) \ge \frac{1}{n\,I(\theta)}$$

> $$\text{Var}(T) \ge \frac{\left[g'(\theta)\right]^2}{n\,I(\theta)}$$

> $$I(\theta) = -E\left[\frac{\partial^2}{\partial\theta^2}\ln f(X \mid \theta)\right]$$

- $\hat\theta$ is any unbiased estimator of $\theta$, and $T$ any unbiased estimator of a function $g(\theta)$ — a probability, a mean or a percentile. $I(\theta)$ is the information in **one** observation; information adds over independent observations, hence the factor $n$. The same $I(\theta)$ equals $E\big[(\partial_\theta \ln f)^2\big]$.
- **Regularity.** The bound needs the support of $f$ not to depend on $\theta$. It fails for $\text{Uniform}(0,\theta)$: there $\frac{n+1}{n}\max X_i$ is unbiased with variance $\frac{\theta^2}{n(n+2)}$, far below the $\theta^2/n$ a naive calculation would give.
- **Attaining it.** An unbiased estimator whose variance equals the bound is **efficient**, and is then the [[Minimum Variance|minimum-variance]] unbiased estimator. The bound is reached only when the score $\partial_\theta \ln L$ is a linear function of the estimator, which essentially confines attainment to [[Exponential Family|exponential-family]] models. Often no unbiased estimator attains it, even the best one.
- **Large samples.** The [[Maximum Likelihood Estimation|MLE]] attains the bound asymptotically, $\hat\theta \,\dot\sim\, N\big(\theta,\ 1/(nI(\theta))\big)$, which is where MLE standard errors come from.
- The bound restricts **unbiased** estimators only. A biased estimator can have smaller variance, and even smaller [[Mean Square Error]], than the CRLB.

> [!example]- Bound for Estimating the No-Claim Probability {Example}
> Annual claim counts on $n = 100$ policies are iid $\text{Poisson}(\lambda)$, with $\lambda$ around $0.2$. The insurer wants an unbiased estimate of $P(N = 0) = e^{-\lambda}$, the no-claim probability. Find the Cramér–Rao lower bound on its variance.
>
> > [!answer]-
> > For the Poisson, $I(\lambda) = 1/\lambda$. With $g(\lambda) = e^{-\lambda}$, $g'(\lambda) = -e^{-\lambda}$.
> >
> > $$
> > \begin{align*}
> > \text{Var}(T) &\ge \frac{e^{-2\lambda}}{n/\lambda} \\
> > &= \frac{\lambda e^{-2\lambda}}{n} \\
> > &= \frac{0.2\,e^{-0.4}}{100} \\
> > &= 0.0013406
> > \end{align*}
> > $$
> >
> > No unbiased estimator of the no-claim probability can have a standard error below $\sqrt{0.0013406} = 0.0366$. The best unbiased estimator, $(1 - 1/n)^{\sum X_i}$, has variance $e^{-2\lambda}(e^{\lambda/n} - 1) = 0.0013420$ — just above the bound, which it never quite reaches.

> [!example]- An Unattainable Bound for a Pareto Severity {Example}
> Claim severities follow a Pareto with known $\theta$, $f(x) = \dfrac{\alpha\theta^\alpha}{(x+\theta)^{\alpha+1}}$. From $n = 20$ claims with true $\alpha = 3$, compare the CRLB with the variance of the unbiased estimator $\hat\alpha = \dfrac{n-1}{G}$, where $G = \sum \ln(1 + X_i/\theta)$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ln f &= \ln\alpha + \alpha\ln\theta - (\alpha+1)\ln(x+\theta) \\
> > \frac{\partial^2}{\partial\alpha^2}\ln f &= -\frac{1}{\alpha^2} \\
> > I(\alpha) &= \frac{1}{\alpha^2}
> > \end{align*}
> > $$
> >
> > So the CRLB is $\alpha^2/n = 9/20 = 0.45$.
> >
> > Each $\ln(1 + X_i/\theta)$ is exponential with mean $1/\alpha$, so $G \sim \text{Gamma}(n,\ \text{rate } \alpha)$. That gives $E[1/G] = \frac{\alpha}{n-1}$ and $E[1/G^2] = \frac{\alpha^2}{(n-1)(n-2)}$:
> >
> > $$
> > \begin{align*}
> > \text{Var}(\hat\alpha) &= \frac{(n-1)^2\alpha^2}{(n-1)(n-2)} - \alpha^2 \\
> > &= \frac{\alpha^2}{n-2} \\
> > &= 0.50
> > \end{align*}
> > $$
> >
> > Efficiency is $0.45/0.50 = 0.90$. The estimator is a function of the sufficient statistic $G$ and is the best unbiased estimator available, yet it misses the bound. The bound is unattainable at $n = 20$, and the efficiency $(n-2)/n$ only tends to $1$ as $n$ grows.
