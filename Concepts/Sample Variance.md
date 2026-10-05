---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:657450d3fd8b09ea831e20f02d9937e2e52b5605938aea9d468d3d062eb6f31d
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §5.5 The Sample Variance (divisor n − 1, n − 1 free deviations, computing formula, E(S²) = σ², var(S²) = (σ4 − (n−3)σ⁴/(n−1))/n; outlier exercise: s 16 → 11.62 when one score is dropped), sha256:452e2841007fad173229a9bb069a4acdda8e0d0bc6c1632f7239ef585248b0c6 — https://www.randomservices.org/random/sample/Variance.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §6.2 Method of Moments (matching sample and distribution moments; mean/variance matching; T² bias −σ²/n and 'no simple, general relationship between mse(T²) and mse(S²)', T² smaller MSE for normal samples; negative binomial U = M²/(T² − M); uniform MoM 2M), sha256:43755b5bee6179fca8d7c1c964e7c6a9bb1a9de6f3916130100c69e666a3194e — https://www.randomservices.org/random/point/Moments.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Penn State STAT 415, Lesson 2 Estimation (Part I): Ex 2.7 divisor-n variance estimator biased, E = (n−1)σ²/n; Ex 2.8 S² unbiased, sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html"
    - "Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 24, 0.950 column = 36.42 (PDF p.20), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sample Variance.md
---

The **Sample Variance** $S^2$ measures the spread of a random sample around its [[Sample Mean]]. Dividing the sum of squared deviations by $n - 1$ rather than $n$ makes it an [[Unbiasedness|unbiased]] estimator of the population variance $\sigma^2$.

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$

> $$E[S^2] = \sigma^2, \qquad \frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1} \ \text{ (Normal data)}$$

- The divisor $n - 1$ is the **degrees of freedom**: one is spent estimating $\mu$ by $\bar{X}$, and the deviations $X_i - \bar{X}$ sum to zero, so only $n-1$ of them are free
- Using $n$ instead gives the [[Maximum Likelihood Estimation|MLE]] $\hat\sigma^2 = \frac{n-1}{n}S^2$, which is biased low by $\sigma^2/n$ but has smaller [[Mean Square Error]] — the classic bias-variance trade-off in estimation
- The computing form $S^2 = \frac{1}{n-1}\left(\sum X_i^2 - n\bar{X}^2\right)$ is what exam problems usually need
- For Normal data, $(n-1)S^2/\sigma^2 \sim \chi^2_{n-1}$ independent of $\bar{X}$; this is what makes the $t$-statistic $\frac{\bar{X}-\mu}{S/\sqrt{n}} \sim t_{n-1}$ work, and it gives $\text{Var}(S^2) = 2\sigma^4/(n-1)$
- Tests and [[Confidence Interval|intervals]] for $\sigma^2$ come from the same $\chi^2$ [[Sampling Distribution]]
- $S^2$ is even less resistant than $\bar{X}$ — deviations are squared, so a single outlier can dominate it entirely

![[Media/Figures/Sample_Variance.svg|340]]

> [!example]- Computing the Sample Variance {Example}
> Five claim amounts (in thousands) are $4, 6, 9, 11, 20$. Find $\bar{x}$ and $s^2$.
>
> > [!answer]-
> > $$\bar{x} = \frac{4 + 6 + 9 + 11 + 20}{5} = 10$$
> > $$\sum x_i^2 = 16 + 36 + 81 + 121 + 400 = 654$$
> > $$s^2 = \frac{654 - 5(10)^2}{5 - 1} = \frac{154}{4} = 38.5$$
> > So $s = 6.20$ (thousand). The MLE would divide by $5$ instead: $\hat\sigma^2 = 154/5 = 30.8$.

> [!example]- Testing a Variance {Example}
> A sample of $n = 25$ losses from a Normal population gives $s^2 = 150$. Test $H_0: \sigma^2 = 100$ against $H_1: \sigma^2 > 100$ at $\alpha = 0.05$, given $\chi^2_{0.05, 24} = 36.42$.
>
> > [!answer]-
> > $$\chi^2 = \frac{(n-1)s^2}{\sigma_0^2} = \frac{24 \times 150}{100} = 36.0$$
> > Since $36.0 < 36.42$, **fail to reject $H_0$** at the $5\%$ level — the observed spread is not quite strong enough evidence that the true variance exceeds $100$.
