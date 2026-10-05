---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:33dc94dac9ac2c71717b31e7b36b077b345ba174a08f53493645a1995312a027
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 The Method of Moments, 'Estimating the Mean and Variance' and 'The Normal Distribution': mse(T_n²) = (1/n³)[(n−1)²σ4 − (n²−5n+3)σ⁴]; 'There is no simple, general relationship between mse(T_n²) and mse(S_n²)'; normal case mse(T²) = (2n−1)σ⁴/n² < mse(S²) = 2σ⁴/(n−1) for n ≥ 2 ('S² is unbiased, but when the sampling distribution is normal, T² has smaller mean square error'), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §5.5 The Sample Variance: dividing by n − 1 rather than n makes the sample variance an unbiased estimator of the distribution variance, sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unbiasedness.md
---

An estimator $\hat{\theta}$ of a parameter $\theta$ is **unbiased** if its expected value equals the true parameter value for all $\theta$. Unbiasedness means the estimator is correct **on average**.

> $$E[\hat{\theta}] = \theta \quad \text{for all } \theta$$

> $$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta = 0$$

- The **sample mean** $\bar{X} = \frac{1}{n}\sum X_i$ is an unbiased estimator of the population mean $\mu$
- The **sample variance** $S^2 = \frac{1}{n-1}\sum (X_i - \bar{X})^2$ is unbiased for $\sigma^2$; dividing by $n$ instead gives a biased estimator. For a **normal** population the divisor-$n$ version has the lower MSE, but that does not hold for every population: for Bernoulli$(1/2)$ data with $n \geq 5$, $S^2$ has the lower MSE
- Unbiasedness alone does not imply a good estimator — a large [[Variance]] is also undesirable; the **[[Mean Square Error]]** combines both: $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + \text{Bias}^2(\hat{\theta})$
- The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) is the unbiased estimator with smallest variance for all $\theta$
- **[[Maximum Likelihood Estimation|MLEs]]** are generally **asymptotically** unbiased but may be biased in small samples

![[Media/Figures/Unbiasedness.svg|340]]

> [!example]- Checking Unbiasedness of the Sample Mean {Example}
> Let $X_1, \ldots, X_n$ be i.i.d. with mean $\mu$. Show that $\bar{X}$ is unbiased for $\mu$.
>
> > [!answer]-
> > $$E[\bar{X}] = E\!\left[\frac{1}{n}\sum_{i=1}^n X_i\right] = \frac{1}{n}\sum_{i=1}^n E[X_i] = \frac{1}{n}(n\mu) = \mu$$
> > Since $E[\bar{X}] = \mu$, $\bar{X}$ is unbiased.

> [!example]- MLE Bias for the Exponential Distribution {Example}
> For $X_i \sim \text{Exp}(\theta)$, the MLE is $\hat{\theta} = \bar{X}$. Is it unbiased?
>
> > [!answer]-
> > $E[\bar{X}] = E[X_i] = \theta$. Yes, $\hat{\theta} = \bar{X}$ is **unbiased** for $\theta$ in the exponential case.
