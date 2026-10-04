---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc02eee856f4b5199cc28824912ba83d50001ad76caaaee159a717f6b02d8668
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §5.1 Introduction (Random Samples): the basic statistical model; a statistic is an observable function of the data; descriptive vs inferential statistics; in inference a statistic is a random variable with a distribution of its own, used to estimate or test a parameter, sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "Siegrist, Random, §5.5 The Sample Variance: divisor n − 1 makes the sample variance an unbiased estimator of the distribution variance, sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy, MAS-I/MAS-II reading): §2.2.1 eq. (2.5) MSE = (1/n)Σ(y_i − f̂(x_i))² (p.29, PDF p.40); §2.2.2 eq. (2.7) expected test MSE = Var(f̂(x0)) + [Bias(f̂(x0))]² + Var(ε) (p.34, PDF p.45) and bias = error from approximating a real problem by a simpler model, not removed by more data (p.35, PDF p.46); §6.2.1 ridge: larger λ gives decreased variance but increased bias (p.239, PDF p.247); §6.5.3 lab: RMSE squared is the MSE (p.280, PDF p.288); §3.1.2 eq. (3.7) Var(µ̂) = SE(µ̂)² = σ²/n (p.65, PDF p.75), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016): Ch.12 p.220 (PDF p.232) 'Bühlmann credibility is commonly referred to as least squares credibility since the goal of this approach is to minimize the square of the error...'; classical credibility standard by a probability criterion, p.218 (PDF p.230); Ch.10 GLMs for classification ratemaking, p.176 (PDF p.188), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Mack, 'Measuring the Variability of Chain Ladder Reserve Estimates' (CAS, 1994; Exam 7 reading), pp.114–116 (PDF p.14–16): mse(Ĉ_iI) = E[(Ĉ_iI − C_iI)² | D] = Var(C_iI | D) + (E(C_iI | D) − Ĉ_iI)² (process variance + estimation error); s.e. = √mse, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Statistics.md
---

**Statistics** is the discipline of collecting, summarizing, and drawing inferences about a population from sample data. A **statistic** is any quantity computed from a sample; the most fundamental are the **sample mean** $\bar{X}$ and **sample variance** $S^2$, which estimate the population mean $\mu$ and variance $\sigma^2$.

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$$

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$$

- Dividing $S^2$ by $n-1$ (rather than $n$) makes it an [[Unbiasedness|unbiased]] estimator of $\sigma^2$
- Every statistic has its own [[Sampling Distribution]], which quantifies how it varies from sample to sample
- **Descriptive** statistics summarize data (mean, variance, quantiles); **inferential** statistics generalize to the population via estimation (e.g. [[Maximum Likelihood Estimation]]) and [[Hypothesis Testing]]
- Statistics builds on [[Probability]]: a probability model for the data is assumed, then its parameters are estimated and tested
- Actuaries use statistics to model claim frequency and severity, set premiums, and quantify reserve uncertainty

![[Media/Figures/Statistics.svg|340]]

> [!example]- Estimating the Mean and Variance of Claim Sizes {Example}
> Five reported claims (in \$$1{,}000$s) are $4, 6, 7, 9, 9$. Estimate the mean and variance of the claim-size distribution.
>
> > [!answer]-
> > $$\bar{X} = \frac{4+6+7+9+9}{5} = \frac{35}{5} = 7$$
> > Sum of squared deviations: $(4-7)^2 + (6-7)^2 + (7-7)^2 + (9-7)^2 + (9-7)^2 = 9 + 1 + 0 + 4 + 4 = 18$.
> > $$S^2 = \frac{18}{5-1} = 4.5$$
> > The estimated mean claim is \$$7{,}000$ with sample variance $4.5$ (in $\$1{,}000^2$ units).

> [!example]- Standard Error of the Sample Mean {Example}
> Using the sample above ($n = 5$, $S^2 = 4.5$), estimate the standard error of $\bar{X}$.
>
> > [!answer]-
> > The standard error estimates the standard deviation of the [[Sampling Distribution]] of $\bar{X}$:
> > $$\text{SE}(\bar{X}) = \frac{S}{\sqrt{n}} = \frac{\sqrt{4.5}}{\sqrt{5}} = \frac{2.121}{2.236} \approx 0.949$$
> > So the mean claim estimate of \$$7{,}000$ carries a standard error of about \$$949$.
