---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:035b88169b9cc7a8b0d971fc6fd7607dd1344e13c2cc8f2e7302b3b593ae3d5e
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 Offsets (printed pp.17-19, PDF pp.27-29), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.3 offset log(n) for group totals (PDF p.10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 6 'Understand and apply control and offset variables in GLMs' (PDF p.5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Offset Variable.md
---

![[Media/Figures/Offset_Variable.svg|340]]

An **Offset Variable** is a known term in the linear predictor of a [[Generalized Linear Model]] whose coefficient is fixed at 1, so that its effect is imposed rather than estimated from the data. With an offset $o_i$ for observation $i$, the model is

> $$g(\mu_i) = o_i + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $g$ is the [[Link Function|link function]].

The offset is on the scale of the linear predictor, so under a log link it is the logarithm of the quantity it imposes.

## Exposure as an offset

The expected claim count of a policy is its exposure multiplied by its frequency. In a [[Poisson Regression|Poisson GLM]] with a log link, the offset is the logarithm of exposure:

> $$\ln \mu_i = \ln(\text{Exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $\mu_i$ is the expected claim count of observation $i$.

The expected claim count is then proportional to exposure, and $\mu_i / \text{Exposure}_i$ is the expected [[Frequency|frequency]]. Entering exposure as an ordinary predictor instead, with an estimated coefficient, gives a different model, one that drops the assumption that expected claims are proportional to exposure. The model with the offset is nested in that model, because it fixes the coefficient at 1.

> [!example]- A Poisson GLM for claim counts has $\ln(\text{Exposure})$ as an offset and $\hat{\eta} = -2.5 + 0.01x$, where $x$ is driver age. What are the expected claim count and the expected frequency for a 40-year-old driver with 2 car-years of exposure? {Example}
> - The linear predictor, with the offset, is $\ln 2 - 2.5 + 0.01 \times 40 = -1.4069$.
> - The expected claim count is $e^{-1.4069} = 0.2449$.
> - The expected frequency is $0.2449 / 2 = 0.1225$ claims per car-year.

## Relativities determined outside the model

A relativity determined outside the model, such as a deductible factor or an increased limit factor, is carried into the model as an offset so that the other coefficients are estimated in its presence. Under a log link, relativities $r_1$ and $r_2$ enter as the offset

> $$o_i = \ln r_1 + \ln r_2 = \ln(r_1 r_2)$$

The total offset is the sum of the logarithms of the factors, which is the logarithm of their product.

> [!example]- A pure premium GLM with a log link carries a deductible factor of 0.90 and an increased limit factor of 1.20 as offsets. What is the offset? {Example}
> - The deductible factor contributes $\ln 0.90 = -0.1054$.
> - The increased limit factor contributes $\ln 1.20 = 0.1823$.
> - The offset is $-0.1054 + 0.1823 = 0.0770$, which equals $\ln(0.90 \times 1.20) = \ln 1.08$.

## Offsets under other links

To refine an existing model with a new variable, without re-estimating the existing coefficients, the offset is the link function applied to the existing model's fitted value, $o_i = g(\hat{\mu}_i)$. The revised fitted value is the inverse link applied to the offset plus the new terms:

> $$\mu_i = g^{-1}(o_i + \beta_0 + \beta_1 x_{i1})$$

- $\beta_0$ and $\beta_1$ are the intercept and coefficient of the model that adds the new variable $x_1$.

> [!example]- A logistic model gives a policy a probability of 0.20 of renewing. A new model adds a variable with the old model's logit as an offset, and fits an intercept of $-0.10$ and a coefficient of $0.30$ on the new variable, which is 1 for this policy. What is the revised probability? {Example}
> - The offset is the logit of the old probability, $\ln\frac{0.20}{0.80} = -1.3863$.
> - The linear predictor is $-1.3863 - 0.10 + 0.30 = -1.1863$.
> - The revised probability is $\frac{1}{1 + e^{1.1863}} = 0.2339$.

> [!trap] Entering the factor instead of its logarithm
> Under a log link the offset is on the scale of the linear predictor. An exposure of 2 car-years enters as $\ln 2 = 0.6931$, not as 2, and a deductible factor of 0.90 enters as $\ln 0.90 = -0.1054$, not as 0.90.
