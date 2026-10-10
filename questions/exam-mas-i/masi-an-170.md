---
id: "masi-an-170"
exam: "Exam MAS-I"
topic: "Student's t-Distribution"
learning_objective: "Extended Linear Models"
difficulty: hard
type: free-entry
bloom: analyze
wiki_link:
  - Concepts/Student's+t-Distribution
  - Concepts/Linear+Regression
  - Concepts/Hypothesis+Testing
  - Concepts/p-Value
answer: "CBAD"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9a30302f8cbe11a63798da77f1849e3622a88584feb668a90f9b8645d0b799a0
  sources:
    - "Siegrist, Random, 'Special Properties of Normal Samples', n W^2/sigma^2 ~ chi-square(n); (n-1)S^2/sigma^2 ~ chi-square(n-1), independent of the sample mean; T = (M - mu)/(S/sqrt n) ~ t(n-1); F = (U/j)/(V/k); chi-square(k) mean k, variance 2k, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-170.md
---

Four analysts each test whether a regression coefficient $\beta$ is zero, using the t-statistic $\hat\beta/\text{SE}(\hat\beta)$:

- (A) A simple linear regression on 7 territories gives $t = 2.7$; the alternative is $\beta \ne 0$.
- (B) A regression with an intercept and 3 predictors on 64 policies gives $t = 2.45$; the alternative is $\beta \ne 0$.
- (C) A regression with an intercept and 3 predictors on 64 policies gives $t = 2.45$; the alternative is $\beta > 0$.
- (D) A simple linear regression on 7 territories gives $t = 2.1$; the alternative is $\beta \ne 0$.

Rows of the t table (two-sided tail areas):

| $df$ | 0.20 | 0.10 | 0.05 | 0.02 | 0.01 |
| :--- | ---: | ---: | ---: | ---: | ---: |
| 5 | 1.476 | 2.015 | 2.571 | 3.365 | 4.032 |
| 60 | 1.296 | 1.671 | 2.000 | 2.390 | 2.660 |

Order the four tests by p-value, from smallest to largest. Enter the letters with no spaces, e.g. ABCD.

## Explanation

**Degrees of freedom.** A regression with $p$ predictors and an intercept leaves $n - p - 1$ residual degrees of freedom:

$$
\begin{align*}
\text{7 territories, 1 predictor} &: 7 - 2 = 5 \\
\text{64 policies, 3 predictors} &: 64 - 4 = 60
\end{align*}
$$

**Bounding each p-value.** The table's areas are two-sided; a one-sided p-value is half the two-sided one.

| Test | $df$ | $t$ | Between | Two-sided p | p-value |
| :--- | ---: | ---: | :--- | :--- | :--- |
| (A) | 5 | 2.70 | 2.571 and 3.365 | 0.02 to 0.05 | 0.02 to 0.05 |
| (B) | 60 | 2.45 | 2.390 and 2.660 | 0.01 to 0.02 | 0.01 to 0.02 |
| (C) | 60 | 2.45 | 2.390 and 2.660 | 0.01 to 0.02 | 0.005 to 0.01 (one-sided) |
| (D) | 5 | 2.10 | 2.015 and 2.571 | 0.05 to 0.10 | 0.05 to 0.10 |

The intervals do not overlap, so the order is **C, B, A, D** (software gives 0.009, 0.017, 0.043 and 0.090). Test (A) has the largest t-statistic but only 5 degrees of freedom, and the heavy tails of $t(5)$ give it a larger p-value than (B).

**Common wrong entries**

- **ACBD** — ignores the degrees of freedom and treats every statistic as standard normal, so the largest $t$ (A) looks most significant.
- **BCAD** — doubles the one-sided p-value of (C) instead of halving it, placing it after (B).
