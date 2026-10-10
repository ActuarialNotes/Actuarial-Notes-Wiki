---
id: "masi-an-095"
exam: "Exam MAS-I"
topic: "Data Types"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Data+Types
  - Concepts/Categorical+Predictor
  - Concepts/Offset+Variable
  - Concepts/Design+Matrix
  - Concepts/Poisson+Regression
answer: "18"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0bee4faf7fd77c26aa75bcea76a7305ae245cd430d17dc47065f1dd5c7fe8d6f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (2021), CAS-hosted copy, MAS-I reading, 3.3.1 qualitative predictors with more than two levels: there will always be one fewer dummy variable than the number of levels, PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare & Tevet, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5 (CAS syllabus reading for MAS-II, Exam 8 and PCPA), 2.4 territory as a numeric-coded categorical variable, PDF p.20; 2.6 an offset is a predictor whose coefficient is constrained to be 1, PDF p.27, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain C tasks 1-9 and readings (Dobson & Barnett, Hogg, James et al., Larsen), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-095.md
---

A Poisson GLM with a log link is fitted to personal auto claim counts. Its linear predictor contains an intercept and the following terms:

- $\ln(\text{car-years})$, entered as an offset;
- territory, with 12 territories stored in the file as the integers 1–12 and declared categorical before fitting;
- credit tier, with five ordered tiers A–E, entered as categorical;
- driver age in years, entered as a single continuous term;
- vehicle use, business or pleasure, entered as categorical.

Calculate the number of parameters the model estimates, including the intercept. Enter a whole number, e.g. 7.

## Explanation

Count the estimated coefficients term by term. A categorical predictor with $k$ levels takes $k - 1$ indicator columns alongside the intercept; a continuous predictor takes one; an offset takes **none**, because its coefficient is fixed at 1.

$$
\begin{aligned}
\text{Intercept} &: 1 \\
\text{Offset } \ln(\text{car-years}) &: 0 \\
\text{Territory } (k = 12) &: 11 \\
\text{Credit tier } (k = 5) &: 4 \\
\text{Driver age (continuous)} &: 1 \\
\text{Vehicle use } (k = 2) &: 1 \\[4pt]
\text{Total} &: 18
\end{aligned}
$$

The model estimates **18** parameters. That territory is *stored* as numbers does not matter once it is declared categorical: it is nominal, and each territory other than the base gets its own coefficient.

**Common wrong entries**

- **19** — counts the offset as a parameter; its coefficient is fixed, not estimated.
- **21** — gives each categorical predictor $k$ indicators instead of $k - 1$ (1 + 12 + 5 + 1 + 2); with an intercept, a full set of indicators is collinear with the constant column.
- **8** — treats territory as a single numeric slope (1 + 1 + 4 + 1 + 1), which is how the model would be fitted had territory not been declared categorical.
