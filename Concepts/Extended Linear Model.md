---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfb961eb5fbc3fcbdc78fa83674535dd62a1fff74210d4e4feaac1ea1ed8f20b
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; Dobson/James/Larsen citations PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.3.3.2 'Extensions of the Linear Model' (interaction and polynomial terms in least squares, printed pp.87-91, PDF pp.97-101); sec.4.6.3 (printed pp.170-172, PDF pp.180-182)"
    - "Rodriguez, GLM lecture notes (Princeton), App. B, Generalized Linear Model Theory, secs.B.1.1-B.1.2 (PDF pp.2-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (PDF p.16); secs.2.7.1-2.7.2 (gamma for severity, Poisson for frequency, PDF pp.29-31); secs.5.4, 5.6 (PDF pp.58-71)"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Extended Linear Model.md
---

An **Extended Linear Model (ELM)** is the broad class of regression models that go beyond ordinary least-squares regression by relaxing its classical assumptions — allowing a non-Normal response distribution, a non-identity [[Link Function]], and a flexible [[Model Structure]] for the linear predictor. [[Generalized Linear Model]]s are the most common extended linear model used in actuarial work.

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

> $$g(\mu_i) = \eta_i, \qquad Y_i \sim \text{(chosen response distribution)}$$

| Model class | Response distribution | Link | Predictor effects |
| :--- | :--- | :--- | :--- |
| Ordinary regression | Normal | Identity | Linear, additive |
| [[Generalized Linear Model]] | Exponential family | Chosen to fit the data | Linear, additive |
| Extended linear model | Any | Any | May include [[Interaction|interactions]], transformations, banded variables |

- Building an extended linear model requires three choices: the **response distribution**, the **[[Link Function]]**, and the **[[Model Structure]]** (which predictors, transformations, and interactions enter the linear predictor)
- Ordinary least-squares regression is a special case where the response is Normal and the link is the identity function
- Model adequacy is compared across candidate extended linear models using [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s
- In insurance ratemaking, the choice of extended linear model is driven by the data's behavior — e.g., a right-skewed, strictly positive severity favors a Gamma distribution with a log link, while integer claim counts favor a Poisson distribution

![[Media/Figures/Extended_Linear_Model.svg|340]]

> [!example]- Selecting an Extended Linear Model for Claim Severity {Example}
> An actuary has individual claim severities that are strictly positive and right-skewed. Why is ordinary least-squares regression not an appropriate extended linear model here, and what would be a better choice?
>
> > [!answer]-
> > Ordinary least-squares assumes a Normal response, which can produce negative fitted severities and underweights the right skew. A **Gamma [[Generalized Linear Model]] with a log [[Link Function]]** is a better extended linear model: it restricts fitted values to be positive and models the multiplicative, right-skewed behavior typical of claim severity.
