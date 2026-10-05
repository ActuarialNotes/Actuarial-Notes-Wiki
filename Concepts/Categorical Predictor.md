---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e02d4d6a62b5491e835ed67742d12e0519bd2ecfd0e4f7c9fd0067292c97f866
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed p.2 (PDF p.19), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 Qualitative Predictors, printed p.86 (PDF p.96); §3.3.2 printed pp.88-90 (PDF pp.98-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §1.2 log-link relativities PDF p.21; §5.4.2 Binning Continuous Predictors PDF pp.59-60, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Categorical Predictor.md
---

A **Categorical Predictor** is an explanatory variable in a [[Generalized Linear Model]] whose values fall into a finite set of unordered groups (levels), such as territory or vehicle type — contrasted with an **ordinal predictor** (categories with a natural order, e.g., a credit tier) and a **continuous predictor** (a numeric variable, e.g., vehicle age).

| Predictor type | Example | How it enters the model |
| :--- | :--- | :--- |
| Categorical (nominal) | Territory, vehicle type | $k-1$ indicator variables for $k$ levels |
| Ordinal | Credit tier, limit band | As categorical, or with order-preserving (e.g., banded numeric) coding |
| Continuous | Vehicle age, driver age | A single coefficient, or banded/transformed |

- A categorical predictor with $k$ levels is represented using $k-1$ **indicator (dummy) variables**; the omitted level is the **reference level**, absorbed into the intercept (see [[Parameter Estimate Tables]])
- **Terminology differs between the MAS-I sources.** The CAS outline lists categorical, ordinal and continuous predictors as three kinds, which is the sense used here. Dobson & Barnett call nominal and ordinal variables alike *categorical*; a qualitative explanatory variable is a **factor** and its categories are its **levels**
- An **[[Interaction]]** between two predictors allows the effect of one to differ across the levels of the other, e.g., the effect of vehicle age differing by territory
- Continuous predictors assume a smooth effect on the response (linear on the link scale unless transformed); banding a continuous variable into categories trades smoothness for flexibility at the cost of extra parameters
- Choosing the right type for each variable is part of selecting the [[Model Structure]] of an [[Extended Linear Model]]

![[Media/Figures/Categorical_Predictor.svg|340]]

> [!example]- Coding a Categorical Predictor with a Reference Level {Example}
> Territory has three levels: A, B, C. A Poisson GLM with a log link uses Territory A as the reference level and fits $\hat{\beta}_B = 0.20$, $\hat{\beta}_C = -0.10$. Interpret the relativities for Territories B and C relative to A.
>
> > [!answer]-
> > $$\text{Relativity}_B = e^{0.20} \approx 1.22, \qquad \text{Relativity}_C = e^{-0.10} \approx 0.90$$
> > Territory B's expected claim frequency is about **22% higher** than Territory A, and Territory C's is about **10% lower**, holding all else equal.
