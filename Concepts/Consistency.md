---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:8fe1a7266cd610179a4897fd12e8d8f32e5fa3f8fba600e8e3a05d2ba01daecd
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 The Method of Moments, 'Estimating the Mean and Variance' and 'The Normal Distribution': mse(T_n²) = (1/n³)[(n−1)²σ4 − (n²−5n+3)σ⁴]; 'There is no simple, general relationship between mse(T_n²) and mse(S_n²)'; normal case mse(T²) = (2n−1)σ⁴/n² < mse(S²) = 2σ⁴/(n−1) for n ≥ 2 ('S² is unbiased, but when the sampling distribution is normal, T² has smaller mean square error'), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Slud, UMD STAT 701, Handout on HW3 Misspecified Model Problem (C), Step 1: \"The sample median is a consistent estimator of the population median, assuming ... a density f with unique median, i.e. ... F(mu) = 1/2 and for arbitrarily small delta > 0, F(mu - delta) < 1/2 < F(mu + delta)\", sha256:0dd97087f1a7d7ed9063a44e73efa3afde19a0cf365f2c014ec99030ab531c26 — https://math.umd.edu/~slud/s701/HW3(C)Handout.pdf"
    - "Ramachandramurty & Sudhakara Rao, \"Some Comments on Quantiles and Order Statistics\", Canad. Math. Bull. 16(2), 1973, §1: the p-th sample quantile \"is a consistent estimator of the p-th quantile of the population if it is unique\", sha256:6e77b64ba6ae9ddd0668830e24071bebe97ba67c63456a9282b686a11fb19e1f — https://doi.org/10.4153/CMB-1973-048-1"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Consistency.md
---

![[Media/Figures/Consistency.svg|340]]

**Consistency** is the property of an [[Estimator|estimator]] that [[Convergence in Probability|converges in probability]] to the parameter it estimates as the sample size grows. The condition for an estimator $\hat{\theta}_n$, computed from a sample of size $n$, to be consistent for a parameter $\theta$ is

> $$\lim_{n \to \infty} P\left(|\hat{\theta}_n - \theta| > \varepsilon\right) = 0$$

- $\varepsilon$ is any positive number. The limit must be 0 for every $\varepsilon$.

This is written $\hat{\theta}_n \xrightarrow{p} \theta$.

> [!example]- Losses are uniform on $(0, \theta)$. Is the largest loss $X_{(n)}$ a consistent estimator of $\theta$? {Example}
> - The largest loss is never above $\theta$, so it misses $\theta$ by more than $\varepsilon$ only when every loss is below $\theta - \varepsilon$.
> - That probability is $P(X_{(n)} < \theta - \varepsilon) = (1 - \varepsilon/\theta)^n$.
> - With $\varepsilon = 0.05\theta$, it is $0.95^{10} = 0.5987$ for $n = 10$ and $0.95^{100} = 0.0059$ for $n = 100$.
> - It goes to 0 as $n$ grows for every $\varepsilon > 0$, so $X_{(n)}$ is consistent for $\theta$.

## Consistency from vanishing bias and variance

By Markov's inequality applied to $(\hat{\theta}_n - \theta)^2$, the probability that $\hat{\theta}_n$ misses $\theta$ by more than $\varepsilon$ is at most

> $$P\left(|\hat{\theta}_n - \theta| > \varepsilon\right) \le \frac{\text{MSE}(\hat{\theta}_n)}{\varepsilon^2}$$

- $\text{MSE}(\hat{\theta}_n)$ is the [[Mean Square Error|mean square error]] of $\hat{\theta}_n$, its variance plus its squared [[Bias|bias]].

If the bias and the variance of $\hat{\theta}_n$ both go to 0 as $n$ grows, the mean square error goes to 0, and $\hat{\theta}_n$ is consistent. An estimator that is biased for every $n$ can therefore be consistent, as long as it is [[Bias#Asymptotic unbiasedness|asymptotically unbiased]] and its variance goes to 0.

> [!example]- For a normal sample, is $\hat{\sigma}^2 = \frac{1}{n}\sum (X_i - \bar{X})^2$ a consistent estimator of $\sigma^2$? {Example}
> - Its bias is $-\sigma^2/n$, which goes to 0 as $n$ grows.
> - Its variance is $2(n-1)\sigma^4/n^2$, which also goes to 0.
> - Both go to 0, so $\hat{\sigma}^2$ is consistent for $\sigma^2$, although it is biased for every $n$.

## Consistency of a function of a consistent estimator

If $\hat{\theta}_n$ is consistent for $\theta$ and the function $g$ is continuous at $\theta$, then

> $$g(\hat{\theta}_n) \xrightarrow{p} g(\theta)$$

By the weak [[Law of Large Numbers|law of large numbers]], the sample mean is consistent for the population mean. Continuous functions of the sample mean, and of other sample averages, are therefore consistent for the same functions of the population moments. The sample median is consistent for the population median when the density is positive there.

> [!example]- Losses are uniform on $(0, \theta)$. Are $2\bar{X}$ and $\sqrt{3 \cdot \frac{1}{n}\sum X_i^2}$ consistent estimators of $\theta$? {Example}
> - The population mean is $\theta/2$, so $\bar{X} \xrightarrow{p} \theta/2$ and $2\bar{X} \xrightarrow{p} \theta$.
> - The population second moment is $E[X^2] = \theta^2/3$, so $\frac{1}{n}\sum X_i^2 \xrightarrow{p} \theta^2/3$.
> - The function $u \mapsto \sqrt{3u}$ is continuous, so the second estimator converges in probability to $\sqrt{\theta^2} = \theta$.
> - Both estimators are consistent for $\theta$.

## Unbiased estimators that are not consistent

An [[Unbiasedness|unbiased]] estimator is consistent only if its distribution also concentrates around $\theta$ as $n$ grows. An estimator built from a fixed number of observations has the same distribution for every $n$, so it is not consistent.

> [!example]- Losses are uniform on $(0, \theta)$. The estimator $X_1 + X_2$ is unbiased for $\theta$. Is it consistent? {Example}
> - The estimator uses the first two losses whatever the sample size, so its distribution does not change with $n$.
> - With $\varepsilon = 0.1\theta$, the probability that it misses $\theta$ by more than $\varepsilon$ is $0.9^2 = 0.81$ for every $n$.
> - The probability does not go to 0, so $X_1 + X_2$ is not consistent.

> [!trap] Multiplying a consistent estimator by a factor that changes with $n$
> A factor that depends on $n$ is not a fixed continuous function, and it can destroy convergence. For a uniform sample, $X_{(n)}$ is consistent for $\theta$, but $X_{(n)}/(n+1)$ goes to 0 and $(n+1)X_{(n)}$ grows without bound. A factor that goes to 1, such as $(n+1)/n$, keeps the estimator consistent.
