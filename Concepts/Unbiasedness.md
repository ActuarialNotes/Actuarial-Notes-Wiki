---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:7d25832bcd1ad1a8c20b3e6816d64cf44975928e75b958fd41622332c6e6d66a
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §5.5 The Sample Variance: divisor n − 1 makes the sample variance an unbiased estimator of the distribution variance, sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
  open_findings: 1
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
