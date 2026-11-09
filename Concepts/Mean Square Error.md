---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:56925b07cbc9200fe18747fdb93d52e32c51727d5fbb839e03705671aa1bb374
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.2 The Method of Moments, 'Estimating the Mean and Variance' and 'The Normal Distribution': mse(T_n²) = (1/n³)[(n−1)²σ4 − (n²−5n+3)σ⁴]; 'There is no simple, general relationship between mse(T_n²) and mse(S_n²)'; normal case mse(T²) = (2n−1)σ⁴/n² < mse(S²) = 2σ⁴/(n−1) for n ≥ 2 ('S² is unbiased, but when the sampling distribution is normal, T² has smaller mean square error'), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy, MAS-I Domain C reading): (2.1) Y = f(X) + ε (PDF p.27); §2.2.1 eq. (2.5) MSE = (1/n)Σ(y_i − f̂(x_i))², computed on the training data = 'training MSE', (2.6) test MSE = Ave(y0 − f̂(x0))² (PDF pp.40–41); §2.2.2 eq. (2.7) E(y0 − f̂(x0))² = Var(f̂(x0)) + [Bias(f̂(x0))]² + Var(ε), 'the expected test MSE can never lie below Var(ε), the irreducible error' (PDF p.45); §3.1.2 eq. (3.7) Var(µ̂) = SE(µ̂)² = σ²/n (PDF p.75), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Mack, 'Measuring the Variability of Chain Ladder Reserve Estimates' (CAS, 1994; Exam 7 reading), pp.114–115 (PDF pp.14–15): mse(Ĉ_iI) = E[(Ĉ_iI − C_iI)² | D], D the data observed so far; mse(Ĉ_iI) = Var(C_iI | D) + (E(C_iI | D) − Ĉ_iI)², 'the sum of the pure future random error ... and of the estimation error', sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016): Ch.12 p.220 (PDF p.232) 'Bühlmann credibility is commonly referred to as least squares credibility since the goal of this approach is to minimize the square of the error between the estimate and the true expected value'; classical credibility's full-credibility standard set by a probability criterion, p.218 (PDF p.230); Ch.10 GLMs as the standard for classification ratemaking, p.176 (PDF p.188), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mean Square Error.md
---

![[Media/Figures/Mean_Square_Error.svg|340]]

The **Mean Square Error** of an [[Estimator|estimator]] $\hat{\theta}$ of a parameter $\theta$ is the expected squared difference between the estimator and the parameter. The mean square error, $\text{MSE}(\hat{\theta})$, is

> $$\text{MSE}(\hat{\theta}) = E\left[(\hat{\theta} - \theta)^2\right]$$

Expanding the square, the mean square error is the variance of the estimator plus the square of its [[Bias|bias]]:

> $$\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + \left[\text{Bias}(\hat{\theta})\right]^2$$

- $\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$ is the bias of $\hat{\theta}$.

For an [[Unbiasedness|unbiased]] estimator the bias is 0, so the mean square error equals the variance.

> [!example]- Estimator A of $\theta$ is unbiased with variance 100. Estimator B has bias $-4$ and variance 50. What is the mean square error of each? {Example}
> - The mean square error of A is $100 + 0^2 = 100$.
> - The mean square error of B is $50 + (-4)^2 = 66$.

## Comparing estimators by mean square error

Of two estimators of the same parameter, the one with the smaller mean square error is preferred, and two estimators with nearly equal mean square errors are about equally good. A biased estimator can have a smaller mean square error than an unbiased one when its variance is smaller by more than its squared bias, as estimator B is above.

For a normal sample of size $n$, the sample variance $S^2$ divides the sum of squared deviations by $n - 1$ and is unbiased. Its mean square error is

> $$\text{MSE}(S^2) = \frac{2\sigma^4}{n-1}$$

The estimator $\hat{\sigma}^2$ that divides by $n$ has [[Bias#Bias of the variance estimator that divides by the sample size|bias]] $-\sigma^2/n$, and its mean square error is

> $$\text{MSE}(\hat{\sigma}^2) = \frac{(2n-1)\sigma^4}{n^2}$$

For every $n \ge 2$, the biased estimator $\hat{\sigma}^2$ has the smaller mean square error.

> [!example]- A normal sample of size 10 is drawn from a population with variance 4. Which of $S^2$ and $\hat{\sigma}^2$ has the smaller mean square error? {Example}
> - The mean square error of $S^2$ is $2 \times 16/9 = 3.556$.
> - The variance of $\hat{\sigma}^2$ is $2 \times 9 \times 16/100 = 2.88$, and its bias is $-4/10 = -0.4$.
> - The mean square error of $\hat{\sigma}^2$ is $2.88 + 0.16 = 3.04$, which equals $19 \times 16/100$.
> - The biased estimator $\hat{\sigma}^2$ has the smaller mean square error.

## Mean square error of a prediction

In [[Statistical Learning|statistical learning]] the target is a response $y_i$ rather than a parameter. The mean square error of a fitted model on $n$ observations is

> $$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

- $\hat{y}_i$ is the fitted value for observation $i$.

On the observations used to fit the model it is the training MSE, and on observations not used to fit it the test MSE ([[Test Error|test error]]). The mean square error of a forecast is the same average, taken over the squared forecast errors. For a model $Y = f(X) + \varepsilon$ fitted as $\hat{f}$, the expected test MSE at a new point $x_0$ is

> $$
> \begin{aligned}
> E\left[(y_0 - \hat{f}(x_0))^2\right] &= \text{Var}(\hat{f}(x_0)) \\
> &\quad + \left[\text{Bias}(\hat{f}(x_0))\right]^2 \\
> &\quad + \text{Var}(\varepsilon)
> \end{aligned}
> $$

- $\text{Var}(\varepsilon)$ is the irreducible error, the variance of the error term that no model of $f$ can predict.

The expected test MSE is never below $\text{Var}(\varepsilon)$, however flexible the model. The first two terms are governed by the [[Bias-Variance Tradeoff|bias-variance tradeoff]].

> [!example]- A model fitted to three observations $y = 3, 5, 7$ gives fitted values $\hat{y} = 4, 5, 6$. What is the training MSE? {Example}
> - The residuals are $-1$, 0 and 1.
> - Their squares sum to 2.
> - The training MSE is $2/3 = 0.6667$.

> [!trap] Comparing biased estimators by their variances
> The smaller variance means the smaller mean square error only when both estimators are unbiased. An estimator with variance 10 and bias 10 has a mean square error of $10 + 100 = 110$, larger than the 100 of an unbiased estimator with variance 100.
