---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:11d6070354c0e6a6b4d124ec05cbf078d77735992d5dd6a3d83b246846e27b3d
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sufficient Statistic.md
---

A **Sufficient Statistic** $T(X_1, \ldots, X_n)$ for a parameter $\theta$ is a statistic that captures all the information in the sample about $\theta$. Once $T$ is known, the conditional distribution of the sample given $T$ does not depend on $\theta$.

> **Fisher–Neyman Factorization Theorem:** $T$ is sufficient for $\theta$ if and only if the joint density (or PMF) factors as:
> $$f(x_1, \ldots, x_n \mid \theta) = g(T(x_1,\ldots,x_n),\, \theta) \cdot h(x_1, \ldots, x_n)$$

- $g$ depends on the data **only through** $T$; $h$ does not depend on $\theta$
- The sufficient statistic **summarizes** the sample without loss of information about $\theta$
- For **exponential family** distributions, a natural sufficient statistic always exists (e.g., $\sum X_i$ for the Poisson and Exponential families)
- A **complete sufficient statistic** combined with the Lehmann–Scheffé theorem yields the **UMVUE** (uniformly minimum variance unbiased estimator)

| Distribution | Parameter | Sufficient Statistic |
| :--- | :--- | :--- |
| $\text{Poi}(\lambda)$ | $\lambda$ | $\sum_{i=1}^n X_i$ |
| $N(\mu, \sigma^2)$ | $\mu$ (known $\sigma^2$) | $\bar{X}$ |
| $\text{Exp}(\theta)$ | $\theta$ | $\sum_{i=1}^n X_i$ |

![[Media/Figures/Sufficient_Statistic.svg|340]]

> [!example]- Verifying a Sufficient Statistic via Factorization {Example}
> Let $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$. Show that $T = \sum X_i$ is sufficient for $\lambda$.
>
> > [!answer]-
> > The joint PMF is:
> > $$f(\mathbf{x} \mid \lambda) = \prod_{i=1}^n \frac{e^{-\lambda}\lambda^{x_i}}{x_i!} = \frac{e^{-n\lambda}\lambda^{\sum x_i}}{\prod x_i!}$$
> > Set $g(T, \lambda) = e^{-n\lambda}\lambda^T$ and $h(\mathbf{x}) = \dfrac{1}{\prod x_i!}$. Since $g$ depends on the data only through $T = \sum x_i$, the factorization theorem confirms $T$ is sufficient.
