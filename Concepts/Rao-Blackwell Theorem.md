---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3715528034cb766f024b3b0126e83834a76e6e075f1a6bfadc21848e510a293c
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

The **Rao-Blackwell Theorem** states that conditioning an [[Unbiasedness|unbiased]] estimator on a [[Sufficient Statistic|sufficient statistic]] gives an unbiased estimator with no larger variance. If $W$ is an unbiased estimator of $\theta$ and $T$ is a sufficient statistic for $\theta$, the improved estimator is

> $$\varphi(T) = E[W \mid T]$$

By the [[Variance for Conditional and Marginal Distributions#The law of total expectation|law of total expectation]], $E[\varphi(T)] = E[W] = \theta$, so $\varphi(T)$ is unbiased. By the [[Variance for Conditional and Marginal Distributions#The law of total variance|law of total variance]], the variance of $W$ is

> $$\text{Var}(W) = \text{Var}(\varphi(T)) + E\left[\text{Var}(W \mid T)\right]$$

The second term is never negative, so $\text{Var}(\varphi(T)) \le \text{Var}(W)$ for every value of $\theta$. The theorem holds in the same way for an unbiased estimator of a function of the parameter, such as $e^{-\lambda}$.

Sufficiency is what makes $\varphi(T)$ an estimator. The conditional distribution of the sample given $T$ does not involve $\theta$, so neither does $E[W \mid T]$. Conditioning on a statistic that is not sufficient can give a function of $\theta$, which cannot be computed from the sample.

> [!example]- Claim sizes are exponential with mean $\theta$. Eight claims total $\$12{,}000$. Starting from the first claim $X_1$ as an estimator of $\theta$, what is the improved estimate, and how do the variances compare? {Example}
> - The total $T = \sum X_i$ is sufficient for $\theta$.
> - By symmetry, $E[X_i \mid T]$ is the same for all eight claims, and the eight conditional means add to $E[T \mid T] = T$.
> - So $E[X_1 \mid T] = T/8 = \bar{X}$, and the improved estimate is $12{,}000/8 = 1{,}500$.
> - The variance falls from $\text{Var}(X_1) = \theta^2$ to $\text{Var}(\bar{X}) = \theta^2/8$.

## Completeness

A statistic $T$ is complete if the only function of $T$ with expected value 0 for every value of $\theta$ is 0 itself. For every function $g$, the condition is

> $$E[g(T)] = 0 \text{ for every } \theta \implies P(g(T) = 0) = 1 \text{ for every } \theta$$

Two unbiased estimators that are both functions of a complete statistic are then equal, because their difference is a function of $T$ with expected value 0. The sufficient statistic of a [[Sufficient Statistic#Sufficient statistics of an exponential family|regular exponential family]] is complete.

> [!example]- Two claim counts $X_1$ and $X_2$ are Poisson with mean $\lambda$. Is the statistic $(X_1, X_2)$ complete? {Example}
> - The function $g = X_1 - X_2$ has expected value $\lambda - \lambda = 0$ for every $\lambda$.
> - It is not 0 with probability 1, since $X_1 = 1$ and $X_2 = 0$ has positive probability.
> - So $(X_1, X_2)$ is sufficient but not complete.

## The Lehmann–Scheffé theorem

If $T$ is a complete sufficient statistic for $\theta$, the unique [[Minimum Variance|minimum variance unbiased estimator]] of $\theta$ is the function $\varphi(T)$ whose expected value, for every value of $\theta$, is

> $$E[\varphi(T)] = \theta$$

It can be found by finding a function of $T$ that is unbiased, or by conditioning any unbiased estimator on $T$. Both lead to the same $\varphi(T)$. Without completeness, conditioning improves an estimator but does not guarantee the minimum variance unbiased estimator. The whole sample is always sufficient, and conditioning on it returns $W$ unchanged.

> [!example]- Claim counts on five policies are Poisson with mean $\lambda$: 0, 2, 1, 0 and 1. Starting from $W = \mathbf{1}\{X_1 = 0\}$, an unbiased estimator of $e^{-\lambda}$, what is the minimum variance unbiased estimate of $e^{-\lambda}$? {Example}
> - The total $T = \sum X_i$ is complete and sufficient, with $T$ Poisson with mean $5\lambda$.
> - The sum of the other four counts is Poisson with mean $4\lambda$ and independent of $X_1$.
> - Conditioning $W$ on $T = t$ gives
>
> $$
> \begin{aligned}
> E[W \mid T = t] &= \frac{e^{-\lambda} \cdot e^{-4\lambda}(4\lambda)^t/t!}{e^{-5\lambda}(5\lambda)^t/t!} \\
> &= \left(\frac{4}{5}\right)^t
> \end{aligned}
> $$
>
> - Here $t = 4$, so the estimate is $0.8^4 = 0.4096$.
