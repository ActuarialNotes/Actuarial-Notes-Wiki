---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b1f2ec8ed95ca3d8afadb28c7623ac6b6bb8a93bcf23dbbe819ba3e030c6bf66
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

**Efficiency** compares [[Unbiasedness|unbiased]] estimators by their variance relative to the smallest variance achievable: an unbiased estimator is **efficient** if it attains the Cramér–Rao lower bound, and of two unbiased estimators of the same parameter, the one with smaller variance is **relatively more efficient** (for an unbiased estimator the variance is the [[Mean Square Error]]).

> $$\text{Relative Efficiency}(\hat{\theta}_1, \hat{\theta}_2) = \frac{\text{Var}(\hat{\theta}_2)}{\text{Var}(\hat{\theta}_1)}$$

> $$\text{Efficiency}(\hat{\theta}) = \frac{1/\big(nI(\theta)\big)}{\text{Var}(\hat{\theta})} \leq 1$$

- $I(\theta)$ is the [[Fisher Information]] in a single observation, so $1/\big(nI(\theta)\big)$ is the [[Cramér-Rao Lower Bound|Cramér–Rao lower bound]] (CRLB) for a sample of size $n$; an unbiased estimator with $\text{Efficiency}(\hat{\theta}) = 1$ attains the CRLB and is called **efficient**
- The bound, and with it $\text{Efficiency} \leq 1$, holds only under **regularity conditions** — in practice, the support of $f(x \mid \theta)$ must not depend on $\theta$. For $\text{Uniform}(0,\theta)$ it fails: $\frac{n+1}{n}X_{(n)}$ is unbiased with variance $\frac{\theta^2}{n(n+2)}$, below the $\theta^2/n$ the formula would give, an "efficiency" of $n+2 > 1$
- If $\text{Var}(\hat{\theta}_2) > \text{Var}(\hat{\theta}_1)$, then $\hat{\theta}_1$ is **more efficient** — relative efficiency above $1$ favors $\hat{\theta}_1$
- Relative efficiency compares two **unbiased** estimators (asymptotic relative efficiency, two asymptotically unbiased ones). If either is biased, compare their [[Mean Square Error|MSEs]] instead: $\text{MSE} = \text{Var} + \text{Bias}^2$, so the smaller variance need not mean the smaller MSE
- Under regularity conditions (a support that does not depend on $\theta$, a true $\theta$ inside the parameter space, a differentiable log-likelihood), **[[Maximum Likelihood Estimation|MLEs]]** are **asymptotically efficient**: their variance converges to the CRLB as $n \to \infty$, even when no finite-sample estimator attains it exactly
- Efficiency is distinct from [[Consistency]] and [[Unbiasedness]]: an estimator can be consistent and unbiased yet inefficient if a lower-variance unbiased alternative exists

![[Media/Figures/Efficiency.svg|340]]

> [!example]- Comparing Two Unbiased Estimators {Example}
> For $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$, consider the sample mean $\bar{X}$ and the sample median $M$ as estimators of $\mu$. Both are unbiased, with $\text{Var}(\bar{X}) = \sigma^2/n$ and $\text{Var}(M) \approx 1.571\,\sigma^2/n$ for large $n$. Which is more efficient?
>
> > [!answer]-
> > $$\text{Relative Efficiency}(\bar{X}, M) = \frac{\text{Var}(M)}{\text{Var}(\bar{X})} = \frac{1.571\,\sigma^2/n}{\sigma^2/n} = 1.571$$
> > Since this exceeds $1$, $\bar{X}$ is the **more efficient** estimator — it has smaller variance for the same sample size.

> [!example]- Checking MLE Efficiency Against the CRLB {Example}
> For $X_i \stackrel{\text{iid}}{\sim} \text{Exp}(\theta)$, the CRLB for any unbiased estimator of $\theta$ is $\theta^2/n$, and $\hat{\theta}_{\text{MLE}} = \bar{X}$ has $\text{Var}(\bar{X}) = \theta^2/n$. Is the MLE efficient here?
>
> > [!answer]-
> > $$\text{Efficiency}(\bar{X}) = \frac{\theta^2/n}{\theta^2/n} = 1$$
> > The MLE's variance exactly equals the CRLB for every $n$, so $\bar{X}$ is efficient (not merely asymptotically efficient) in the exponential case.
