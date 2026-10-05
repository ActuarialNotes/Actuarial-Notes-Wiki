---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb0b0758900801957e621c431be110eff352ff1cc005d93b9a05128727bfbe27
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n), E = nh/(n+1); V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics: Lehmann–Scheffé theorem (an unbiased function of a sufficient, complete statistic is a UMVUE), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (model 'satisfying certain mild regularity assumptions'; unbiased T: Var_θ[T] ≥ 1/(nI(θ)), I(θ) the information in one observation, Var of the sample score = nI(θ)) and p.15-4 ('For two unbiased estimators of θ, the ratio of their variances is called their relative efficiency'; efficient = variance equals 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Minimum Variance.md
---

**Minimum Variance** is a criterion for comparing estimators: among the [[Unbiasedness|unbiased]] estimators of a parameter, the one with the **smallest variance** is preferred — for an unbiased estimator the variance is the [[Mean Square Error]], the expected squared distance from the true parameter.

> **[[Cramér-Rao Lower Bound|Cramér–Rao Lower Bound]] (CRLB):** Under regularity conditions (the support of $f(x \mid \theta)$ does not depend on $\theta$), for any unbiased estimator $\hat{\theta}$,
> $$\text{Var}(\hat{\theta}) \geq \frac{1}{I(\theta)}$$

> $$= \frac{1}{n \cdot I_1(\theta)}$$

> $$\text{where } I_1(\theta) = E\!\left[\left(\frac{\partial}{\partial\theta}\ln f(X \mid \theta)\right)^2\right] \text{ is the Fisher information}$$

- $I_1(\theta)$ is the information in one observation and $I(\theta) = n\,I_1(\theta)$ the [[Fisher Information]] in a sample of size $n$
- An unbiased estimator that **achieves** the CRLB is called **efficient**
- The regularity conditions matter: for $\text{Uniform}(0,\theta)$ the support depends on $\theta$, and $\frac{n+1}{n}X_{(n)}$ is unbiased with variance $\frac{\theta^2}{n(n+2)}$ — below the $\theta^2/n$ the bound would give
- The **UMVUE** (Uniformly Minimum Variance Unbiased Estimator) achieves minimum variance simultaneously for all $\theta$ within the class of unbiased estimators
- By the Lehmann–Scheffé theorem, an unbiased function of a **complete sufficient statistic** is the UMVUE
- Under the same kind of regularity conditions (common support, a true $\theta$ inside the parameter space, a differentiable log-likelihood), [[Maximum Likelihood Estimation|MLEs]] are **asymptotically efficient**: their variance approaches the CRLB as $n \to \infty$

![[Media/Figures/Minimum_Variance.svg|340]]

> [!example]- Cramér–Rao Bound for the Exponential Mean {Example}
> For $X_i \stackrel{\text{iid}}{\sim} \text{Exp}(\theta)$, find the Cramér–Rao lower bound on the variance of any unbiased estimator of $\theta$.
>
> > [!answer]-
> > $f(x|\theta) = \frac{1}{\theta}e^{-x/\theta}$, so $\ln f = -\ln\theta - x/\theta$.
> > $\frac{\partial}{\partial\theta}\ln f = -\frac{1}{\theta} + \frac{x}{\theta^2}$.
> > $I_1(\theta) = \text{Var}\!\left(\frac{X-\theta}{\theta^2}\right) = \frac{\theta^2}{\theta^4} = \frac{1}{\theta^2}$.
> > CRLB $= \dfrac{\theta^2}{n}$. Since $\text{Var}(\bar{X}) = \theta^2/n$, the sample mean $\bar{X}$ is efficient.
