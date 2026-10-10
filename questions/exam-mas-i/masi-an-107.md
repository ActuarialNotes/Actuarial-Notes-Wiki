---
id: "masi-an-107"
exam: "Exam MAS-I"
topic: "Regression Through the Origin"
learning_objective: "Extended Linear Models"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Regression+Through+the+Origin
  - Concepts/Ordinary+Least+Squares
  - Concepts/Linear+Regression
answer: "0.6867"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:1af285fd30d80fbdca0aba158fa297030d26e0221a5b616afae608d5835f788a
  sources:
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Regression Through the Origin', PDF p.1, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "R documentation, stats::summary.lm, Value r.squared: R^2 = 1 - sum R_i^2 / sum (y_i - y*)^2, y* the mean of y_i if there is an intercept and zero otherwise, sha256:52be4406a547f6a905ee71eb8737033c90e339e8ff7147af116cb4b2d6376c2c — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.lm.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-107.md
---

A reinsurer believes that each cedant's incurred losses are proportional to its earned premium, and fits the model $y_i = \beta x_i + \varepsilon_i$ with no intercept. Earned premium $x$ and incurred losses $y$ (both in millions) for four cedants are:

| Cedant | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Premium $x$ | 2 | 4 | 6 | 8 |
| Losses $y$ | 1.0 | 3.2 | 3.8 | 5.6 |

Calculate the least-squares estimate of $\beta$. Give your answer to four decimal places.

## Explanation

Minimising $\sum (y_i - \beta x_i)^2$ over $\beta$ gives

$$
\hat\beta = \frac{\sum x_i y_i}{\sum x_i^2}
$$

$$
\begin{aligned}
\sum x_i y_i &= 2(1.0) + 4(3.2) + 6(3.8) + 8(5.6) \\
&= 82.4 \\
\sum x_i^2 &= 4 + 16 + 36 + 64 \\
&= 120 \\
\hat\beta &= \frac{82.4}{120} \\
&= 0.68667
\end{aligned}
$$

The estimate is **0.6867** — the fitted loss ratio.

**Common wrong entries**

- **0.7200** — the slope of the ordinary regression *with* an intercept ($S_{xy}/S_{xx}$, about the means); the fitted intercept there is $-0.20$, a different model.
- **0.6800** — the ratio of totals, $\sum y_i / \sum x_i = 13.6/20$. That is the weighted least-squares estimate when the variance is proportional to $x$, not the ordinary least-squares slope through the origin.
- **0.6583** — the average of the four individual loss ratios $y_i/x_i$, which weights a small cedant's ratio as heavily as a large one's.
