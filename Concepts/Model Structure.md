---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e8a9a413c79af98ee56cc856f20c851463a5793d706d1ba8fec5e7ef35f0fca4
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B description and tasks 1-4, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 printed p.89 (PDF p.99); §6.1.1-6.1.3 printed pp.227-234 (PDF pp.235-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76; §6.2.2 penalized measures PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Structure.md
---

**Model Structure** is the specified form of an [[Extended Linear Model]]: the distribution of the response, the [[Link Function]], and the terms of the linear predictor — which predictors, transformations, and [[Interaction|interactions]] appear. This is the CAS MAS-I usage: choosing a GLM's model structure from the behavior of the data includes choosing its link function and the distribution of the dependent variable.

> $$Y \sim \text{chosen distribution}, \qquad g(\mu) = \eta, \qquad \eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2) + \beta_4 x_1^2 + \cdots$$

- $\mu = E(Y)$ and $g$ is the link. The distribution and link are chosen from the behavior of the response; [[Model Selection]] covers how
- Linear-predictor decisions include: which [[Categorical Predictor|predictors]] to include, whether to add [[Interaction|interaction terms]], and whether to band or transform continuous variables (e.g., [[Polynomial Regression|polynomial terms]]) — the choice of terms is the focus of **[[Variable Selection]]**
- For a [[Linear Mixed Model]] (MAS-II), the structure also covers how the model accommodates correlated observations and a variance that is not constant; the MAS-II outline names the model structure and variable selection as separate things to evaluate
- A model can have the correct distribution and link but the wrong linear predictor (e.g., a missing interaction); its adequacy is checked with a [[Residual Plot]] or a [[Marginal Model Plot]]
- Adding terms always improves in-sample fit but risks overfitting; [[AIC]] and [[BIC]] penalize unnecessary complexity when comparing structures
- Two models with the same distribution and link, one's linear predictor nested within the other's, are compared using **[[ANOVA]] (analysis of deviance)**

![[Media/Figures/Model_Structure.svg|340]]

> [!example]- Comparing Two Candidate Model Structures {Example}
> An actuary fits a Poisson GLM for claim frequency two ways: Model 1 uses main effects for territory and vehicle age only ([[AIC]] $= 4{,}102$). Model 2 adds a territory $\times$ vehicle age interaction ([[AIC]] $= 4{,}085$). Which model structure is preferred?
>
> > [!answer]-
> > Lower AIC indicates a better trade-off between fit and complexity. Since Model 2's AIC ($4{,}085$) is lower than Model 1's ($4{,}102$), the richer model structure — including the territory $\times$ vehicle age **[[Interaction]]** — is preferred.
> >
> > Territory is categorical, so the interaction is a set of coefficients, at least one per non-base territory. Judge them **jointly**, as this AIC comparison does or as a nested F-test of all of them at once would, not one p-value at a time in the [[Parameter Estimate Tables|parameter estimate table]]: the individual coefficients and their p-values change with the choice of base territory, and the joint test does not.
