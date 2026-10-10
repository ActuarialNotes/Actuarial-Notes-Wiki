---
id: "masi-an-164"
exam: "Exam MAS-I"
topic: "Step Function"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Step+Function
  - Concepts/Categorical+Predictor
  - Concepts/Design+Matrix
  - Concepts/Model+Output
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e157455c1970d01536ce3eee89b5601fb0794eedefc8aac856acde876f541fa0
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §7.2 Step Functions, PDF pp.300-301 (C_k(X) = I(c_k <= X < c_k+1); C0+...+CK = 1; least squares on C1..CK with an intercept; avoids a global structure), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.9 Correlation Among Predictors, PDF p.37 (the GLM sorts out each variable's unique effect from correlated variables; two-way correlation tables before modeling), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-164.md
---

An analyst fits claim frequency as a step function of driver age $X$ with cutpoints 30, 50 and 70. She creates all four indicators

$$
C_0 = I(X < 30), \quad C_1 = I(30 \le X < 50), \quad C_2 = I(50 \le X < 70), \quad C_3 = I(70 \le X)
$$

and enters all four, together with an intercept, in a least-squares fit. The data include 214 drivers aged 70 or older. The software reports:

| Term | Estimate |
| :--- | ---: |
| (Intercept) | 0.140 |
| $C_0$ | 0.085 |
| $C_1$ | 0.020 |
| $C_2$ | -0.030 |
| $C_3$ | NA |

Calculate the predicted claim frequency for a 24-year-old driver.

- A) 0.055
- B) 0.085
- C) 0.140
- D) 0.160
- E) 0.225

## Explanation

**Why $C_3$ is NA.** Every driver is in exactly one bin, so $C_0 + C_1 + C_2 + C_3 = 1$ for every row: the four indicator columns add up to the intercept column, and the design matrix is not of full rank. The 70+ bin is not empty (214 drivers), so the NA does not come from an empty column; the software has dropped the redundant column $C_3$. The remaining fit is a step function with **70 and over** as the reference bin:

- the intercept, 0.140, is the mean frequency of drivers aged 70 and over;
- each other coefficient is its bin's mean minus that reference mean.

A 24-year-old is in the $C_0$ bin:

$$
\begin{align*}
\hat y &= 0.140 + 0.085 \\
&= 0.225
\end{align*}
$$

The answer is **E**. The full set of bin means is 0.225, 0.160, 0.110 and 0.140.

**Why not the others**

- **A** — reverses the contrast, reading each coefficient as the reference mean minus the bin's mean: 0.140 - 0.085.
- **B** — reports the $C_0$ coefficient alone, forgetting that it is a difference from the intercept.
- **C** — assumes the youngest bin is the reference, as in the usual coding that leaves out $C_0$. Here the NA shows that $C_3$ was left out instead.
- **D** — numbers the bins from 1, so reads $C_1$ as the youngest bin and uses 0.140 + 0.020. $C_1$ is the bin from 30 to 49; the youngest bin is $C_0$.
