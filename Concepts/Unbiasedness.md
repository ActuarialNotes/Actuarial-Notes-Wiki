---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:095b2904e691b52e925efac79e26f4bff1e2726e5926378ddfd2d1e1abadc3a6
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 The Method of Moments, 'Estimating the Mean and Variance' and 'The Normal Distribution': mse(T_n²) = (1/n³)[(n−1)²σ4 − (n²−5n+3)σ⁴]; 'There is no simple, general relationship between mse(T_n²) and mse(S_n²)'; normal case mse(T²) = (2n−1)σ⁴/n² < mse(S²) = 2σ⁴/(n−1) for n ≥ 2 ('S² is unbiased, but when the sampling distribution is normal, T² has smaller mean square error'), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §5.5 The Sample Variance: dividing by n − 1 rather than n makes the sample variance an unbiased estimator of the distribution variance, sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Siegrist, Random, §5.5 The Sample Variance: W^2 unbiased for sigma^2; E(W) = E(sqrt(W^2)) <= sqrt(E(W^2)) = sigma by concavity of sqrt (Jensen); \"S is a negatively biased estimator that tends to underestimate sigma\" — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §5.3 The Law of Large Numbers: E(M) = mu, var(M) = sigma^2/n, weak law P(|M_n - mu| > eps) -> 0 — https://www.randomservices.org/random/sample/LLN.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples: (n-1)S^2/sigma^2 chi-square n-1; n W^2/sigma^2 chi-square n (mu known); T = (M-mu)/(S/sqrt n) Student t n-1 — https://www.randomservices.org/random/sample/Normal.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unbiasedness.md
---

![[Media/Figures/Unbiasedness.svg|340]]

**Unbiasedness** is the property of an [[Estimator|estimator]] whose expected value equals the parameter it estimates, whatever the value of the parameter. An estimator $\hat{\theta}$ of a parameter $\theta$ is unbiased when, for every value of $\theta$, its expected value is

> $$E[\hat{\theta}] = \theta$$

An unbiased estimator has [[Bias|bias]] 0, and its [[Mean Square Error|mean square error]] equals its variance. Among the unbiased estimators of $\theta$, the one with the smallest variance for every value of $\theta$ is the [[Minimum Variance|minimum variance unbiased estimator]].

> [!example]- A loss $X_1$ is uniform on $(0, \theta)$. Is $2X_1$ an unbiased estimator of $\theta$? {Example}
> - The expected value of a uniform loss on $(0, \theta)$ is $\theta/2$.
> - The expected value of the estimator is $E[2X_1] = 2 \times \theta/2 = \theta$.
> - This holds for every $\theta$, so $2X_1$ is unbiased for $\theta$.

## Unbiasedness of the sample mean

Expectation is linear. For random variables $X$ and $Y$ and constants $a$ and $b$, the expected value of $aX + bY$ is

> $$E[aX + bY] = aE[X] + bE[Y]$$

This holds whether or not $X$ and $Y$ are independent. For a sample $X_1, \ldots, X_n$ from a population with mean $\mu$, the expected value of the [[Sample Mean|sample mean]] is therefore

> $$E[\bar{X}] = \mu$$

The average of the [[Order Statistics|order statistics]] $X_{(1)}, \ldots, X_{(n)}$ is the sample mean, so it is also unbiased for $\mu$, even though the order statistics are dependent.

> [!example]- The estimators $\hat{\theta}_1$ and $\hat{\theta}_2$ are both unbiased for $\theta$. Is $w\hat{\theta}_1 + (1 - w)\hat{\theta}_2$ unbiased for $\theta$? {Example}
> - By linearity, the expected value is $wE[\hat{\theta}_1] + (1 - w)E[\hat{\theta}_2]$.
> - This is $w\theta + (1 - w)\theta = \theta$.
> - The combination is unbiased for every weight $w$, whether or not the two estimators are independent.

## Unbiasedness of the sample variance

For a sample of $n$ from a population with variance $\sigma^2$, the expected sum of squared deviations from the sample mean is

> $$E\left[\sum_{i=1}^{n}(X_i - \bar{X})^2\right] = (n-1)\sigma^2$$

Dividing the sum by $n - 1$ gives the [[Sample Variance|sample variance]] $S^2$, whose expected value is

> $$E[S^2] = \sigma^2$$

Dividing by $n$ instead gives a [[Bias#Bias of the variance estimator that divides by the sample size|biased estimator]]. When the population mean $\mu$ is known, the average $\frac{1}{n}\sum (X_i - \mu)^2$ is unbiased for $\sigma^2$, because each $(X_i - \mu)^2$ has expected value $\sigma^2$.

> [!example]- Three losses are 2, 4 and 9. What is the unbiased estimate of the variance of a loss? {Example}
> - The sample mean is $\bar{x} = 15/3 = 5$.
> - The squared deviations are 9, 1 and 16, which sum to 26.
> - Dividing by $n - 1 = 2$ gives the unbiased estimate $26/2 = 13$.
