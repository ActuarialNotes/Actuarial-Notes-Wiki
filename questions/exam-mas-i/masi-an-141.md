---
id: "masi-an-141"
exam: "Exam MAS-I"
topic: "High-Dimensional Data"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/High-Dimensional+Data
  - Concepts/Regularization
  - Concepts/Cross-Validation
  - Concepts/AIC
  - Concepts/R-Squared
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:913100277d698184d3e226b024d926077c949816bfb9201ecad21f06caf45bef
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §6.4 Considerations in High Dimensions, PDF pp.270-275 (least squares fits perfectly when p >= n; Cp, AIC, BIC and adjusted R2 not appropriate, sigma-hat^2 = 0; lasso and forward stepwise useful; never use training SSE, p-values or R2 as evidence of fit; report independent test set or cross-validation), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-141.md
---

An insurer has 300 policies, each described by 500 telematics features, and a continuous loss measure as the response.

Determine which of the following statements are true.

- I. A least squares regression on all 500 features fits the 300 training responses exactly, even if no feature is related to the response.
- II. A lasso, with its penalty chosen by cross-validation, can still be fitted and its prediction error estimated.
- III. AIC remains a reliable way to compare the candidate least squares models, because it penalizes the number of parameters.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I — True.** With more coefficients than observations ($p \ge n$), least squares can pass through every training point, so the residual sum of squares is 0 and $R^2 = 1$ whatever the data — including features that are pure noise. The perfect fit is evidence of nothing.

**II — True.** Less flexible methods are what work when $p > n$. The lasso's penalty shrinks coefficients (setting many to exactly zero), so the fit is defined and does not interpolate the data, and cross-validation gives an honest estimate of its prediction error and a way to choose the penalty.

**III — False.** AIC (like $C_p$ and BIC) needs an estimate of the error variance,

$$
\hat{\sigma}^2 = \frac{\text{RSS}}{n - p - 1}
$$

and once $p$ approaches $n$ that estimate collapses toward zero (and is undefined at $p + 1 \ge n$). The penalty for parameters cannot repair a variance estimate that is itself broken, so these criteria are unreliable in high dimensions.

The true statements are I and II. The answer is **B**.

**Why not the others**

- **A** — misses II, treating every method as broken when $p > n$; only the unpenalized, in-sample measures are.
- **C** and **D** — accept III, assuming a parameter penalty is enough when the variance estimate it relies on has failed.
- **E** — the true set, I and II, is option B.
