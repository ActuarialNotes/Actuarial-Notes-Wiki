---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:5784dee056f3d6b92e4f240d319971c7b182a08203a7b93cc973394ec0791c90
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §6 intro and §6.1 Subset Selection (printed pp.225-235, PDF pp.233-243); §5.1 (printed pp.198-206); §6.5.1 (printed p.271, PDF p.279), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.2 PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 3, 7 and reading list, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-I Fall 2018, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (B), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
    - "CAS Exam MAS-I Spring 2019, Q39 — official exam paper (scan), PDF p.43; Final Answer Key PDF p.50 (A), sha256:02debe7c986ee38d3f484b277d0dc4a08ec424d0bb3b868b4890e4edb9312274 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Variable Selection.md
---

**Variable Selection** is the process of choosing which predictors to include in a model's [[Model Structure]], balancing improved fit against the risk of overfitting and loss of interpretability.

| Method | Description |
| :--- | :--- |
| Forward selection | Start with no predictors; add the most significant one at each step |
| Backward elimination | Start with all predictors; remove the least significant one at each step |
| Stepwise | Alternates forward and backward steps, re-evaluating at each step |
| Criterion-based | Compare candidate models directly via [[AIC]], [[BIC]], or [[Deviance]] |

- Lower [[AIC]] or [[BIC]] indicates a better trade-off between fit and complexity; **BIC penalizes additional parameters more heavily** than AIC, so it tends to favor sparser models
- In a [[Linear Mixed Model]], variable selection also requires deciding which effects are **fixed** versus **random**, not just which predictors to include
- Variable selection should combine statistical significance (from the [[Parameter Estimate Tables|parameter estimate table]]) with business and actuarial judgment, e.g., regulatory restrictions on certain rating variables
- Selecting too few variables causes underfitting (high bias); selecting too many causes overfitting (high variance) — a holdout sample or cross-validation helps detect overfitting that in-sample fit statistics alone would miss

![[Media/Figures/Variable_Selection.svg|340]]

> [!example]- Choosing Between Two Model Specifications {Example}
> Two competing GLMs for claim frequency: Model 1 has $5$ parameters and a log-likelihood of $-2{,}040$. Model 2 adds $2$ more parameters and has a log-likelihood of $-2{,}037$. Using AIC ($\text{AIC} = -2\ell + 2k$), which model is preferred?
>
> > [!answer]-
> > $$\text{AIC}_1 = -2(-2{,}040) + 2(5) = 4{,}080 + 10 = 4{,}090$$
> > $$\text{AIC}_2 = -2(-2{,}037) + 2(7) = 4{,}074 + 14 = 4{,}088$$
> > Model 2 has the lower AIC ($4{,}088 < 4{,}090$), so the extra $2$ parameters are worth the added complexity — **Model 2** is preferred.
