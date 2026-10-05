---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:950a073ed9210bf55cd67e79b5d2d8a558e5d7ba57a593fad0cd3c83a712c3ad
  sources:
    - "Siegrist, Random, ch.6 §6 Sufficient, Complete and Ancillary Statistics: Rao-Blackwell theorem (E(V|U) a statistic because U is sufficient, unbiased, uniformly better); completeness definition (E_theta[r(U)] = 0 for all theta implies P_theta[r(U) = 0] = 1); Lehmann-Scheffe theorem and its proof via Rao-Blackwell; Poisson: Y = sum X_i complete and sufficient, UMVUE of P(X = 0) = e^-theta is ((n-1)/n)^Y; gamma with known shape: Y complete for the scale; exponential families: natural statistic sufficient and complete, sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Siegrist, Random, ch.6 §5 Best Unbiased Estimators: UMVUE definition; an unbiased estimator attaining the Cramer-Rao lower bound must be a UMVUE, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, ch.3 §7 Conditional Expected Value: var(Y) = E[var(Y|X)] + var[E(Y|X)], sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §§7.1-7.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-8: §7.3 'Properties of a Sufficient Statistic', §7.4 'Completeness and Uniqueness' (p.444), §7.5 'The Exponential Class of Distributions' (p.449) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rao-Blackwell Theorem.md
---

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
