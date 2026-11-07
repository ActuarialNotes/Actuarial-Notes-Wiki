---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e12ad899c8d027f52820819ed9167b92b74442dbd0d3f2ef6dfcaca8955e800
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n), E = nh/(n+1); V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (model 'satisfying certain mild regularity assumptions'; unbiased T: Var_θ[T] ≥ 1/(nI(θ)), I(θ) the information in one observation, Var of the sample score = nI(θ)) and p.15-4 ('For two unbiased estimators of θ, the ratio of their variances is called their relative efficiency'; efficient = variance equals 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Shao, UW–Madison Stat 610 Lecture 24 'Sample median and quantiles', Example 10.2.4 (slide 11): ARE(sample median, X̄) = 4f(µ)²σ² for F symmetric about its median (= 2/π ≈ 0.637 for the normal, i.e. Var(median)/Var(X̄) → π/2 ≈ 1.571), sha256:a9cfecddf7ec9f7d2d195a36cb6da10155367023055d078cd0d3343694296cd9 — https://pages.stat.wisc.edu/~shao/stat610/stat610-24.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Efficiency.md
---

![[Media/Figures/Efficiency.svg|340]]

**Efficiency** is the comparison of [[Unbiasedness|unbiased]] estimators of the same parameter by their variances. The efficiency of an unbiased estimator $\hat{\theta}_1$ relative to another unbiased estimator $\hat{\theta}_2$ of $\theta$ is

> $$\frac{\text{Var}(\hat{\theta}_2)}{\text{Var}(\hat{\theta}_1)}$$

A relative efficiency above 1 means that $\hat{\theta}_1$ has the smaller variance and is the more efficient estimator. Relative efficiency compares unbiased estimators only. Estimators with a [[Bias|bias]] are compared by their [[Mean Square Error#Comparing estimators by mean square error|mean square errors]].

> [!example]- Losses are uniform on $(0, \theta)$. From 4 losses, $2\bar{X}$ and $\frac{5}{4}X_{(4)}$ are both unbiased for $\theta$. What is the efficiency of $\frac{5}{4}X_{(4)}$ relative to $2\bar{X}$? {Example}
> - A uniform loss on $(0, \theta)$ has variance $\theta^2/12$, so $\text{Var}(2\bar{X}) = 4 \times \theta^2/48 = \theta^2/12$.
> - The sample maximum of $n$ uniform losses has variance $\frac{n\theta^2}{(n+1)^2(n+2)}$, which is $\frac{4\theta^2}{150}$ for $n = 4$.
> - Scaling by $\frac{5}{4}$ multiplies the variance by $\frac{25}{16}$, so $\text{Var}(\frac{5}{4}X_{(4)}) = \theta^2/24$.
> - The efficiency of $\frac{5}{4}X_{(4)}$ relative to $2\bar{X}$ is $\frac{\theta^2/12}{\theta^2/24} = 2$, so the scaled maximum is the more efficient estimator.

## Efficiency against the Cramér–Rao lower bound

Under regularity conditions, no unbiased estimator of $\theta$ from a sample of size $n$ has a variance below the [[Cramér-Rao Lower Bound|Cramér–Rao lower bound]] $1/(nI(\theta))$. The efficiency of an unbiased estimator $\hat{\theta}$ is the ratio of the bound to its variance:

> $$\frac{1/(nI(\theta))}{\text{Var}(\hat{\theta})}$$

- $I(\theta)$ is the [[Fisher Information|Fisher information]] in one observation.

The efficiency is at most 1. An unbiased estimator with efficiency 1 attains the bound and is called efficient, and it is the [[Minimum Variance|minimum variance unbiased estimator]]. The regularity conditions include that the set of possible values of $X$ does not depend on $\theta$, so the bound does not apply to the uniform distribution on $(0, \theta)$. Under the same conditions, the [[Maximum Likelihood Estimation|maximum likelihood estimator]] is asymptotically efficient. Its variance approaches the bound as $n$ grows.

> [!example]- Claim sizes are exponential with mean $\theta$. What is the efficiency of the sample mean $\bar{X}$ as an estimator of $\theta$? {Example}
> - The log of the density is $\ln f(x) = -\ln\theta - x/\theta$, and its derivative with respect to $\theta$ is $(x - \theta)/\theta^2$.
> - The Fisher information is the variance of that derivative, $I(\theta) = \text{Var}(X)/\theta^4 = 1/\theta^2$.
> - The Cramér–Rao lower bound is $1/(nI(\theta)) = \theta^2/n$.
> - The sample mean is unbiased with variance $\theta^2/n$, so its efficiency is 1 and $\bar{X}$ is efficient.

> [!trap] Putting the wrong variance in the numerator
> The relative efficiency of $\hat{\theta}_1$ to $\hat{\theta}_2$ puts the variance of $\hat{\theta}_2$ on top, so the more efficient estimator scores above 1. Some texts write the ratio the other way up. Check which estimator a question puts in the numerator before reading the answer as 2 or 0.5.
