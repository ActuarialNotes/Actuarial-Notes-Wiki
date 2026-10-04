---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:82311b597a687e2053eeaade592b91887175018a56fa1c3576a709f65a9de68e
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n) with E = nh/(n+1), bias −h/(n+1), V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)) ('super efficient'), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy, MAS-I/MAS-II reading): §2.2.1 eq. (2.5) MSE = (1/n)Σ(y_i − f̂(x_i))² (p.29, PDF p.40); §2.2.2 eq. (2.7) expected test MSE = Var(f̂(x0)) + [Bias(f̂(x0))]² + Var(ε) (p.34, PDF p.45) and bias = error from approximating a real problem by a simpler model, not removed by more data (p.35, PDF p.46); §6.2.1 ridge: larger λ gives decreased variance but increased bias (p.239, PDF p.247); §6.5.3 lab: RMSE squared is the MSE (p.280, PDF p.288); §3.1.2 eq. (3.7) Var(µ̂) = SE(µ̂)² = σ²/n (p.65, PDF p.75), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias.md
---

**Bias** is the systematic error of an estimator: the difference between its expected value and the parameter it estimates. An estimator with zero bias is [[Unbiasedness|unbiased]]; bias is one of the two components of [[Mean Square Error]], the other being variance.

> $$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$

> $$\text{MSE}(\hat\theta) = \text{Var}(\hat\theta) + \left[\text{Bias}(\hat\theta)\right]^{2}$$

- Bias is about the *centre* of the estimator's [[Sampling Distribution]], variance about its *spread* — an estimator can be unbiased and useless (huge variance) or biased and excellent (tiny variance)
- **Asymptotic unbiasedness** is weaker: $\text{Bias}(\hat\theta) \to 0$ as $n \to \infty$. The [[Maximum Likelihood Estimation|MLE]] is often biased in finite samples but asymptotically unbiased and [[Consistency|consistent]]
- Standard examples: the [[Sample Variance]] with divisor $n$ is biased low by $\sigma^2/n$; the MLE $\hat\theta = X_{(n)}$ for $\text{Uniform}(0,\theta)$ is biased low by $\theta/(n+1)$
- Bias does **not** invert through nonlinear functions: if $\hat\theta$ is unbiased for $\theta$, $g(\hat\theta)$ is generally biased for $g(\theta)$ (by Jensen's inequality)
- Accepting a little bias to remove a lot of variance is the whole point of shrinkage, credibility weighting, and the [[Bias-Variance Tradeoff]] that governs model complexity
- In modelling, bias also arises from the *model* rather than the estimator — an omitted predictor, an ignored [[Interaction]], or fitting a straight line to a curved relationship all bias the fitted values regardless of sample size

![[Media/Figures/Bias.svg|340]]

> [!example]- Bias of the Uniform MLE {Example}
> For $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Uniform}(0,\theta)$, the MLE is $\hat\theta = X_{(n)}$ with $E[X_{(n)}] = \frac{n}{n+1}\theta$. Find its bias and construct an unbiased alternative.
>
> > [!answer]-
> > $$\text{Bias} = \frac{n}{n+1}\theta - \theta = -\frac{\theta}{n+1}$$
> > The MLE understates $\theta$, which makes sense — the largest observation can never exceed the true maximum. Rescaling removes it:
> > $$\tilde\theta = \frac{n+1}{n}X_{(n)}, \qquad E[\tilde\theta] = \theta$$

> [!example]- Choosing a Biased Estimator on MSE {Example}
> Estimator A is unbiased with variance $100$. Estimator B has bias $-4$ and variance $50$. Which has the smaller mean square error?
>
> > [!answer]-
> > $$\text{MSE}_A = 100 + 0^2 = 100$$
> > $$\text{MSE}_B = 50 + (-4)^2 = 66$$
> > **B is preferred on MSE**, despite being biased — its variance reduction more than pays for the squared bias. This is the trade every shrinkage method makes.
