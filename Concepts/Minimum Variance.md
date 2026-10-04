---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:892bff4a91b7b8420ca4704e987bda8112867045226698acfef9d57d1ea8eda6
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics: Rao–Blackwell and Lehmann–Scheffé theorems, sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n) with E = nh/(n+1), bias −h/(n+1), V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)) ('super efficient'), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15 Fisher information and the Cramér–Rao bound, Theorem 15.4 (Var_θ[T] ≥ 1/(nI(θ)) for unbiased T, 'satisfying certain mild regularity assumptions', I(θ) per observation) and p.15-4 (relative efficiency = ratio of variances of two unbiased estimators; efficient = attains 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
    - "Shao, UW–Madison Stat 610 Lecture 24 'Sample median and quantiles' (2014), slides 8–9: √n(Q̂0.5 − Q0.5) → N(0, 1/(4f(Q0.5)²)); ARE(median, X̄) = 4f(µ)²σ² = 0.637 for the normal, sha256:a9cfecddf7ec9f7d2d195a36cb6da10155367023055d078cd0d3343694296cd9 — https://pages.stat.wisc.edu/~shao/stat610/stat610-24.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Minimum Variance.md
---

**Minimum Variance** is a criterion for comparing estimators: among all estimators in a given class (typically unbiased), the one with the **smallest variance** is preferred, as it produces estimates closest to the true parameter on average.

> **Cramér–Rao Lower Bound (CRLB):** For any unbiased estimator $\hat{\theta}$,
> $$\text{Var}(\hat{\theta}) \geq \frac{1}{I(\theta)}$$

> $$= \frac{1}{n \cdot I_1(\theta)}$$

> $$\text{where } I_1(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X \mid \theta)\right)^2\right] \text{ is the Fisher information}$$

- An unbiased estimator that **achieves** the CRLB is called **efficient**
- The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) achieves minimum variance simultaneously for all $\theta$ within the class of unbiased estimators
- By the Lehmann–Scheffé theorem, an unbiased function of a **complete sufficient statistic** is the UMVUE
- [[Maximum Likelihood Estimation|MLEs]] are **asymptotically efficient**: their variance approaches the CRLB as $n \to \infty$

![[Media/Figures/Minimum_Variance.svg|340]]

> [!example]- Cramér–Rao Bound for the Exponential Mean {Example}
> For $X_i \stackrel{\text{iid}}{\sim} \text{Exp}(\theta)$, find the Cramér–Rao lower bound on the variance of any unbiased estimator of $\theta$.
>
> > [!answer]-
> > $f(x|\theta) = \frac{1}{\theta}e^{-x/\theta}$, so $\ln f = -\ln\theta - x/\theta$.
> > $\frac{\partial}{\partial\theta}\ln f = -\frac{1}{\theta} + \frac{x}{\theta^2}$.
> > $I_1(\theta) = \text{Var}\!\left(\frac{X-\theta}{\theta^2}\right) = \frac{\theta^2}{\theta^4} = \frac{1}{\theta^2}$.
> > CRLB $= \dfrac{\theta^2}{n}$. Since $\text{Var}(\bar{X}) = \theta^2/n$, the sample mean $\bar{X}$ is efficient.
