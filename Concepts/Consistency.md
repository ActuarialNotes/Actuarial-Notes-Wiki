---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb64e8547269442c5e421d49af935c3cbb3db8551127d7190f03f2fcfeb2459a
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 The Method of Moments, 'Estimating the Mean and Variance' and 'The Normal Distribution': mse(T_n²) = (1/n³)[(n−1)²σ4 − (n²−5n+3)σ⁴]; 'There is no simple, general relationship between mse(T_n²) and mse(S_n²)'; normal case mse(T²) = (2n−1)σ⁴/n² < mse(S²) = 2σ⁴/(n−1) for n ≥ 2 ('S² is unbiased, but when the sampling distribution is normal, T² has smaller mean square error'), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Consistency.md
---

An estimator $\hat{\theta}_n$ is **consistent** for $\theta$ if it converges in probability to the true parameter value as the sample size grows without bound — larger samples make the estimator's error arbitrarily small with arbitrarily high probability.

> $$\hat{\theta}_n \xrightarrow{p} \theta \quad \text{as } n \to \infty$$
>
> $$\text{i.e., } \lim_{n\to\infty} P\big(|\hat{\theta}_n - \theta| > \varepsilon\big) = 0 \quad \text{for every } \varepsilon > 0$$

- A convenient **sufficient condition**: if $\text{Bias}(\hat{\theta}_n) \to 0$ and $\text{Var}(\hat{\theta}_n) \to 0$ as $n \to \infty$, then $\hat{\theta}_n$ is consistent (this follows from $\text{MSE}(\hat{\theta}_n) \to 0$ and Chebyshev's inequality, since [[Mean Square Error|MSE]] bounds the tail probability)
- Consistency is a **large-sample (asymptotic)** property — it says nothing about how the estimator behaves at small $n$, unlike [[Unbiasedness]], which is a property of the estimator at the sample size actually used (it must hold for every value of $\theta$)
- An estimator can be **biased but still consistent** (e.g., the MLE of $\sigma^2$ divides by $n$ instead of $n-1$, but the bias vanishes as $n \to \infty$)
- **[[Maximum Likelihood Estimation|MLEs]]** are consistent under standard regularity conditions, which is part of why MLE is the dominant estimation method in practice

![[Media/Figures/Consistency.svg|340]]

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
