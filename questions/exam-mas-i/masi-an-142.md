---
id: "masi-an-142"
exam: "Exam MAS-I"
topic: "High-Dimensional Data"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/High-Dimensional+Data
  - Concepts/Test+Error
  - Concepts/Variable+Selection
  - Concepts/Overfitting
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e0223a011dcdcddb63f1726e835ab39df3066cb9e39ade50fa98ad5d4f58a6b8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §6.4 Considerations in High Dimensions, PDF pp.270-275 (least squares fits perfectly when p >= n; Cp, AIC, BIC and adjusted R2 not appropriate, sigma-hat^2 = 0; lasso and forward stepwise useful; never use training SSE, p-values or R2 as evidence of fit; report independent test set or cross-validation), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-142.md
---

A pricing team has 250 drivers, each with 1,200 telematics features. Using all 250 drivers, it runs forward stepwise selection and keeps 30 features, then fits least squares on them. The team now wants to show management that the model will predict loss well for **new** drivers.

Which piece of evidence best supports that claim?

- A) The final 30-feature model's training $R^2$ of 0.96, the highest of all the models tried
- B) The final model's adjusted $R^2$ of 0.93, which already penalizes the 30 selected features
- C) Each of the 30 selected features has a p-value below 0.001 in the final least squares fit
- D) The model's error on 100 more drivers set aside before any selection or fitting began
- E) The final model's BIC, which is the lowest among the models the stepwise search compared

## Explanation

With 1,200 features for 250 drivers, $p > n$: some combination of features can be made to fit the training data almost perfectly whether or not any feature truly relates to loss. Every statistic computed on the same 250 drivers that chose the 30 features is contaminated by that choice. The only evidence of how the model does on *new* drivers is its error on drivers it has never seen — data held out **before** the feature selection, so the selection could not adapt to them. (Cross-validation that repeats the whole selection inside each fold would also serve.) The answer is **D**.

**Why not the others**

- **A** — training $R^2$ rises with every feature added and reaches 1 once there are as many coefficients as drivers. In high dimensions a high training $R^2$ is guaranteed, not earned.
- **B** — adjusted $R^2$ penalizes only the 30 features in the final model, not the search through 1,200 that picked them, so it is still optimistic.
- **C** — p-values from a model whose features were chosen *because* they fit these data well are not valid; with 1,200 candidates, some noise features will look highly significant by chance.
- **E** — BIC, like AIC, depends on an estimate of the error variance that is unreliable when $p$ is large relative to $n$, and it too was computed on the data used for selection.
