---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:77da7155ae342a14123a83a76e6d01d3307df2fb8b822a0e4c2ba34f6cc8d4b7
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n), E = nh/(n+1); V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics: Lehmann–Scheffé theorem (an unbiased function of a sufficient, complete statistic is a UMVUE), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (model 'satisfying certain mild regularity assumptions'; unbiased T: Var_θ[T] ≥ 1/(nI(θ)), I(θ) the information in one observation, Var of the sample score = nI(θ)) and p.15-4 ('For two unbiased estimators of θ, the ratio of their variances is called their relative efficiency'; efficient = variance equals 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Minimum Variance.md
---

![[Media/Figures/Minimum_Variance.svg|340]]

**Minimum Variance** is the criterion that, among the [[Unbiasedness|unbiased]] estimators of a parameter, prefers the one with the smallest variance. An unbiased estimator $\hat{\theta}^*$ of $\theta$ is the minimum variance unbiased estimator (MVUE) when the condition on its variance is

> $$\text{Var}(\hat{\theta}^*) \le \text{Var}(\hat{\theta})$$

- $\hat{\theta}$ is any unbiased estimator of $\theta$.
- The inequality holds for every value of $\theta$.

The MVUE is also called the uniformly minimum variance unbiased estimator (UMVUE).

> [!example]- Two losses $X_1$ and $X_2$ have mean $\mu$ and variance $\sigma^2$. Among the unbiased estimators $wX_1 + (1 - w)X_2$, which weight $w$ gives the smallest variance? {Example}
> - The variance of the estimator is $\left[w^2 + (1 - w)^2\right]\sigma^2$.
> - Setting the derivative $2w - 2(1 - w)$ to 0 gives $w = 0.5$.
> - The estimator with the smallest variance in this class is the sample mean $\bar{X}$, with variance $0.5\sigma^2$.

## The Cramér–Rao lower bound

Under regularity conditions, the variance of every unbiased estimator of $\theta$ from a sample of size $n$ is at least the [[Cramér-Rao Lower Bound|Cramér–Rao lower bound]]:

> $$\text{Var}(\hat{\theta}) \ge \frac{1}{nI(\theta)}$$

- $I(\theta)$ is the [[Fisher Information|Fisher information]] in one observation.

An unbiased estimator whose variance equals the bound is [[Efficiency#Efficiency against the Cramér–Rao lower bound|efficient]] and is the MVUE. The bound limits unbiased estimators only, so a biased estimator can have a smaller variance without any contradiction. It says nothing about the [[Mean Square Error|mean square error]] of a biased estimator, which can also be smaller.

> [!example]- Claim sizes are exponential with mean $\theta$, so $I(\theta) = 1/\theta^2$. For 4 claims, is the variance of $\sum X_i/5$ below the Cramér–Rao lower bound? {Example}
> - The bound for an unbiased estimator is $\theta^2/4 = 0.25\theta^2$.
> - The variance of $\sum X_i/5$ is $4\theta^2/25 = 0.16\theta^2$, which is below the bound.
> - There is no contradiction, because $E[\sum X_i/5] = 0.8\theta$ and the estimator is biased.

## Finding a minimum variance unbiased estimator

By the [[Rao-Blackwell Theorem#The Lehmann–Scheffé theorem|Lehmann–Scheffé theorem]], an unbiased estimator that is a function of a [[Rao-Blackwell Theorem#Completeness|complete]] [[Sufficient Statistic|sufficient statistic]] is the unique MVUE. This does not need the Cramér–Rao lower bound to be attained. The MVUEs of the common parameters are:

| Distribution | Parameter | Complete sufficient statistic | MVUE |
| :--- | :--- | :--- | :--- |
| Normal, $\mu$ known | $\sigma^2$ | $\sum (X_i - \mu)^2$ | $\frac{1}{n}\sum (X_i - \mu)^2$ |
| Normal, $\mu$ unknown | $\mu$ | $\sum X_i$ and $\sum X_i^2$ | $\bar{X}$ |
| Normal, $\mu$ unknown | $\sigma^2$ | $\sum X_i$ and $\sum X_i^2$ | $S^2$ |
| Poisson | $\lambda$ | $\sum X_i$ | $\bar{X}$ |
| Exponential | $\theta$ | $\sum X_i$ | $\bar{X}$ |
| Uniform on $(0, \theta)$ | $\theta$ | $X_{(n)}$ | $\frac{n+1}{n}X_{(n)}$ |

> [!example]- A normal sample of 8 has known mean 0, and $\sum x_i^2 = 200$. What is the minimum variance unbiased estimate of $\sigma^2$? {Example}
> - With the mean known, $\sum X_i^2$ is a complete sufficient statistic for $\sigma^2$.
> - Each $X_i^2$ has expected value $\sigma^2$, so $\frac{1}{8}\sum X_i^2$ is unbiased.
> - It is an unbiased function of a complete sufficient statistic, so it is the MVUE.
> - The estimate is $200/8 = 25$.
