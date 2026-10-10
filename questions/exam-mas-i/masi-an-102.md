---
id: "masi-an-102"
exam: "Exam MAS-I"
topic: "Offset Variable"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
  - Concepts/Deviance
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Confidence+Interval
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f85a41b72d9b328397c3827582a224299979cee1aa4fa8bddcb1708f5714a83c
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.6 Offsets, printed pp.17-19 (PDF pp.27-29): an offset is a predictor whose coefficient is constrained to 1, on the linear-predictor scale (logged for a log link); deductible factors offset as ln(factor); multiple offsets added after logging; exposure offset ln(exposures) in a claim-count model, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.1.3 and §6.2.1, PDF pp.74-75 (deviance comparisons need identical data, missing values dropped by software; nested models and F = (D_S - D_B)/(# added parameters x phi-hat_B)), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Models for Count Data With Overdispersion (rev. 2022), §1 The Over-Dispersed Poisson Model, PDF pp.1-2 (var(Y) = phi mu; quasi-likelihood estimates equal the Poisson ones; var(beta-hat) = phi (X'WX)^-1; phi-hat = Pearson chi-square / (n - p); standard errors multiplied by sqrt(phi-hat)), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-102.md
---

Two Poisson GLMs with a log link are fitted to the same 3,000 records of claim counts, with the same rating variables:

| | Model 1 | Model 2 |
|---|---|---|
| How $\ln(\text{car-years})$ enters | offset | predictor |
| Coefficient of $\ln(\text{car-years})$ | 1 (fixed) | 0.960 (SE 0.030) |
| Residual deviance | 3,412.6 | 3,410.8 |
| Residual degrees of freedom | 2,985 | 2,984 |

Which recommendation is best supported, for the reason given?

- A) Model 2, because its residual deviance is lower, so it fits the data better
- B) Model 2, because its coefficient of 0.960 shows claims rise less than in proportion to exposure
- C) Model 1, because the data are consistent with a coefficient of 1, so fixing it costs nothing
- D) Model 2, because the coefficient's $z$ value of 32 shows that exposure is highly significant
- E) Model 1, because a model with an offset is not nested in the model without it, so no test applies

## Explanation

Model 1 is Model 2 with the coefficient of $\ln(\text{car-years})$ constrained to 1, so the two are **nested** and the question is whether the data reject $H_0: \beta = 1$.

Likelihood ratio test (dispersion fixed at 1), on 2,985 - 2,984 = 1 degree of freedom:

$$
\begin{aligned}
\Delta D &= 3{,}412.6 - 3{,}410.8 \\
&= 1.8 \quad\text{on 1 df} \\
\chi^2_{0.05,\,1} &= 3.84
\end{aligned}
$$

Since 1.8 < 3.84, the data do not reject $H_0$. The Wald test agrees: $z = (0.960 - 1)/0.030 = -1.33$, and the 95% interval $\hat\beta \pm 1.96\,\text{SE} = 0.960 \pm 1.96(0.030) = (0.901,\ 1.019)$ contains 1. Fixing the coefficient at 1 loses nothing significant, keeps expected claims exactly proportional to exposure — the relationship an exposure base is chosen to have — and saves a parameter (Model 1's AIC is 2 - 1.8 = 0.2 lower). The answer is **C**.

**Why not the others**

- **A** — adding a parameter can never raise the residual deviance; a drop of 1.8 for one parameter is within what chance alone produces.
- **B** — 0.960 is a point estimate; its interval includes 1, so the data do not show a less-than-proportional relationship.
- **D** — $z = 0.960/0.030 = 32$ tests $\beta = 0$, which no one doubts; the question that separates the models is $\beta = 1$.
- **E** — the models are nested (constraining one coefficient to a fixed value), which is exactly what makes the deviance comparison valid.
