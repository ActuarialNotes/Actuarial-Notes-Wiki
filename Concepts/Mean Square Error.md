---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d6d1f02c1b1f7ea8f2347e36553461435c34a96c6a6826385b9da4e2cfd21ca
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

The **Mean Square Error (MSE)** of an estimator $\hat{\theta}$ measures its **overall accuracy** by combining both variance (spread) and bias (systematic error); the same name is used for the prediction error of a fitted model (see *MSE as prediction error* below):

> $$\text{MSE}(\hat{\theta})$$

> $$= E\!\left[(\hat{\theta} - \theta)^2\right]$$

> $$= \text{Var}(\hat{\theta}) + \left(\text{Bias}(\hat{\theta})\right)^2$$

> $$\text{where } \text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

- For an **[[Unbiasedness|unbiased]]** estimator, $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta})$
- **Bias–variance trade-off**: a slightly biased estimator can have lower MSE than an unbiased one if its variance is sufficiently reduced
- The **root mean square error (RMSE)** $= \sqrt{\text{MSE}}$ is in the same units as $\theta$
- In [[Bühlmann Credibility|Bühlmann (least-squares) credibility]], the credibility estimator is chosen to minimize MSE

![[Media/Figures/Mean_Square_Error.svg|340]]

> [!example]- MSE of a Biased Estimator {Example}
> For $X_i \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$, compare the MSE of $S^2 = \frac{1}{n-1}\sum(X_i-\bar{X})^2$ (unbiased) and $\hat{\sigma}^2 = \frac{1}{n}\sum(X_i-\bar{X})^2$ (biased MLE).
>
> > [!answer]-
> > $E[S^2] = \sigma^2$ so $\text{Bias}(S^2) = 0$ and $\text{MSE}(S^2) = \text{Var}(S^2) = \dfrac{2\sigma^4}{n-1}$.
> >
> > $E[\hat{\sigma}^2] = \frac{n-1}{n}\sigma^2$ so $\text{Bias}(\hat{\sigma}^2) = -\frac{\sigma^2}{n}$ and
> > $$\text{MSE}(\hat{\sigma}^2) = \frac{2(n-1)\sigma^4}{n^2} + \frac{\sigma^4}{n^2} = \frac{(2n-1)\sigma^4}{n^2}$$
> > For $n > 1$, $\text{MSE}(\hat{\sigma}^2) < \text{MSE}(S^2)$, so the biased MLE has smaller MSE despite being biased.

## MSE as prediction error

In statistical learning the target is a random response, not a fixed parameter. For a model $Y = f(X) + \varepsilon$ fitted as $\hat f$, the MSE on the $n$ observations used to fit it is the **training MSE**; the same average over unseen observations is the **test MSE** (see [[Test Error]]):

> $$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}\big(y_i - \hat f(x_i)\big)^2$$

The expected test MSE at a point $x_0$ has **three** parts, not two:

> $$
> \begin{aligned}
> E\big[(y_0 - \hat f(x_0))^2\big] &= \text{Var}\big(\hat f(x_0)\big) \\
> &\quad + \big[\text{Bias}\big(\hat f(x_0)\big)\big]^2 \\
> &\quad + \text{Var}(\varepsilon)
> \end{aligned}
> $$

- $\text{Var}(\varepsilon)$ is the **irreducible error**: the expected test MSE can never lie below it, however good $\hat f$ is (the [[Bias-Variance Tradeoff]] governs the other two terms)
- Reserving uses the same split: Mack (1994) takes the MSE of a reserve forecast $\hat C_{iI}$ given the data $D$ observed so far, $E\big[(\hat C_{iI} - C_{iI})^2 \mid D\big]$, and splits it into $\text{Var}(C_{iI} \mid D)$, the future random (process) error, plus $\big(E[C_{iI} \mid D] - \hat C_{iI}\big)^2$, the estimation error — see [[Mack Chain Ladder Model]]
