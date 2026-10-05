---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:149bcd4acc864692cda4cc699b9ec0b110771a39980c2514e4ddc3adfbe204d8
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026: James et al. 'Chapters 1 (background), 2.2, 4.4.2, 8, 10, 12' (PDF p.4) and §§2.2.1, 2.2.2 named for review (PDF p.5), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy, MAS-I/MAS-II reading): §2.2.1 eq. (2.5) MSE = (1/n)Σ(y_i − f̂(x_i))² (p.29, PDF p.40); §2.2.2 eq. (2.7) expected test MSE = Var(f̂(x0)) + [Bias(f̂(x0))]² + Var(ε) (p.34, PDF p.45) and bias = error from approximating a real problem by a simpler model, not removed by more data (p.35, PDF p.46); §6.2.1 ridge: larger λ gives decreased variance but increased bias (p.239, PDF p.247); §6.5.3 lab: RMSE squared is the MSE (p.280, PDF p.288); §3.1.2 eq. (3.7) Var(µ̂) = SE(µ̂)² = σ²/n (p.65, PDF p.75), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Mack, 'Measuring the Variability of Chain Ladder Reserve Estimates' (CAS, 1994; Exam 7 reading), pp.114–116 (PDF p.14–16): mse(Ĉ_iI) = E[(Ĉ_iI − C_iI)² | D] = Var(C_iI | D) + (E(C_iI | D) − Ĉ_iI)² (process variance + estimation error); s.e. = √mse, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016): Ch.12 p.220 (PDF p.232) 'Bühlmann credibility is commonly referred to as least squares credibility since the goal of this approach is to minimize the square of the error...'; classical credibility standard by a probability criterion, p.218 (PDF p.230); Ch.10 GLMs for classification ratemaking, p.176 (PDF p.188), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 2
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
