---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:46bd5f1deeaf069f72e98c2133e318b864dd0236ad125233b04d6f75551036c0
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 Offsets (formal definition: 'a predictor whose coefficient is constrained to be 1'; linear-predictor scale; deductible and base-loss-cost examples; exposure offsets vs weights) printed pp.17-19, PDF pp.27-29; sec.5.1.3 control variable (PDF p.56)"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 sec.4.3 offset log(n) for group totals (PDF p.10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), task C6 'Understand and apply control and offset variables in GLMs', PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Offset Variable.md
---

An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed at exactly $1$ rather than estimated from the data — used to force a known, exact relationship (most commonly exposure) into the linear predictor.

> $$g(\mu_i) = \ln(\text{Exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- For claim counts $N_i \sim \text{Poi}(\mu_i)$, since $E[N_i] = \text{Exposure}_i \times \text{Frequency}_i$, including $\ln(\text{Exposure}_i)$ as an offset converts a model for expected claim counts into a model for the underlying claim **[[Frequency]]** rate per unit of exposure
- An offset differs from an ordinary [[Control Variable]]: its coefficient is **not estimated** — it is forced to equal $1$, consistent with the known proportional relationship between exposure and expected claims
- If exposure were instead entered as an ordinary covariate, its estimated coefficient need not equal $1$, which would mask the intended exactly-proportional relationship
- Offsets are also used to carry forward previously-determined relativities (e.g., an established territory relativity) into a new model without re-estimating them

![[Media/Figures/Offset_Variable.svg|340]]

> [!example]- Fitting a Poisson Frequency Model with an Exposure Offset {Example}
> A Poisson GLM for claim counts uses $\ln(\text{Exposure})$ as an offset and a single rating variable, driver age, with fitted equation $\ln\hat{\mu}_i = \ln(\text{Exposure}_i) - 2.5 + 0.01 \cdot \text{age}_i$. For a driver age 40 with $2$ car-years of exposure, find the expected claim count and the fitted frequency.
>
> > [!answer]-
> > $$\ln\hat{\mu} = \ln(2) - 2.5 + 0.01(40) = 0.693 - 2.5 + 0.4 = -1.407$$
> > $$\hat{\mu} = e^{-1.407} \approx 0.245 \text{ expected claims}$$
> > Since the offset coefficient is fixed at $1$, dividing back out the exposure gives the fitted frequency: $\hat{\mu}/\text{Exposure} = 0.245/2 \approx 0.122$ claims per car-year.
