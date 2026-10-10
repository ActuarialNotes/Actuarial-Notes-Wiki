---
id: "masi-an-140"
exam: "Exam MAS-I"
topic: "Correlation"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Correlation
  - Concepts/Scatter+Plot
  - Concepts/Outlier
  - Concepts/R-Squared
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ac2f810ed62c778261afae69039fdbf77c7518a94bab1159987d84cff5f9287
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 Potential Problems, PDF pp.107-112 (outliers vs high-leverage points; collinearity, correlation matrix, VIF), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Random, 'Sample Correlation and Regression', sample covariance s(x,y) with divisor n - 1 and sample correlation r = s(x,y)/(s(x)s(y)), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-140.md
---

For six commercial auto fleets, an analyst records the number of vehicles $x$ and the loss cost per vehicle $y$ (in hundreds):

| Fleet | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Vehicles $x$ | 1 | 2 | 3 | 4 | 5 | 20 |
| Loss cost $y$ | 4.1 | 3.8 | 4.4 | 3.9 | 4.2 | 9.0 |

The sample correlation of the six pairs is $r = 0.979$.

Which conclusion is best supported?

- A) Loss cost rises steadily with fleet size across the whole range of the data
- B) Fleet 6 has a large residual from the fitted line and should be removed as an outlier
- C) The high $r$ rests on fleet 6 alone; among the other five fleets, loss cost barely moves
- D) Since $r^2 = 0.96$, fleet size explains 96% of the variation in loss cost at every fleet size
- E) Since $r$ is near 1, adding vehicles to a fleet causes its loss cost per vehicle to rise

## Explanation

Look at the points before trusting the number. Fleets 1 to 5 have loss costs between 3.8 and 4.4 with no trend: their own correlation is

$$
r_{1\text{–}5} = 0.199
$$

and their least squares slope is 0.03 per vehicle. Fleet 6 sits far beyond them in $x$ (20 vehicles against 1 to 5) and far above them in $y$. With only six points, that one point makes the cloud look like a line, so $r = 0.979$ describes "one point far from five" rather than a steady trend. The answer is **C**.

**Why not the others**

- **A** — there are no data between 5 and 20 vehicles, and within 1 to 5 there is no trend. "Steadily across the range" is exactly what the data cannot show.
- **B** — fleet 6 is a **high-leverage** point, not a large-residual one. Because it pulls the line through itself, its residual from the six-point fit is small (about 0.15, smaller than fleet 1's 0.55). It should be investigated because it controls the fit, not deleted because it is far from the line.
- **D** — $r^2$ is one summary for the whole data set. It says nothing about the fit within any part of the range, and among fleets 1 to 5 the line explains almost nothing.
- **E** — correlation measures linear association, not causation; and here even the association rests on a single fleet.
