---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e5ac3dec2deb3342adcb186b309eaa66c01e41061bf21df3bdbc191328f4a1d
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency and asymptotic normality N(θ, 1/I) 'subject to some regularity conditions', sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
  open_findings: 1
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
