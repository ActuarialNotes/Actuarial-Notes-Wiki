---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ca41c8928c94554e7d147e613340e640fe07455385180cafa1126157706d7f1
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3), §3.1.3 RSE (3.15)-(3.17) and R², §3.2.2 RSE (3.25) with n-p-1, printed pp.61-80 (PDF pp.71-90); §8.1.1 regression-tree RSS (8.1)-(8.3), printed pp.330-331 (PDF pp.338-339), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.3-2.6 SSE, SSR = sum(yhat - ybar)², SSTO = SSR + SSE, ANOVA table, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Residual Sum of Squares.md
---

The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the total unexplained variability in a regression model — the sum of squared differences between observed and fitted values.

> $$\text{RSS} = \sum_{i=1}^n (y_i - \hat{y}_i)^2$$

> $$= \sum_{i=1}^n e_i^2$$

> $$\hat{y}_i = \hat{\beta}_0 + \hat{\beta}_1 x_{i1} + \cdots + \hat{\beta}_p x_{ip}$$

- Ordinary least squares (OLS) estimation **minimizes RSS** with respect to $\boldsymbol{\beta}$
- RSS is the numerator of the **residual variance** estimate: $\hat{\sigma}^2 = \text{RSS}/(n-p-1)$
- For [[Decision Tree]] regression, RSS is the split criterion: splits are chosen to minimize the total RSS across all resulting regions
- **Decomposition**: $\text{SS}_{\text{Tot}} = \text{SS}_{\text{Reg}} + \text{RSS}$, where $\text{SS}_{\text{Tot}} = \sum(y_i - \bar{y})^2$ and $\text{SS}_{\text{Reg}} = \sum(\hat{y}_i - \bar{y})^2$
- [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$

![[Media/Figures/Residual_Sum_of_Squares.svg|340]]

> [!example]- RSS for a Simple Linear Regression {Example}
> Fitted values from a regression of claim severity ($y$) on vehicle age ($x$) are $\hat{y} = (180, 220, 260)$ and observed values are $y = (200, 210, 270)$. Compute the RSS.
>
> > [!answer]-
> > $$\text{RSS} = (200-180)^2 + (210-220)^2 + (270-260)^2 = 400 + 100 + 100 = 600$$

> [!example]- RSS as a Decision Tree Split Criterion {Example}
> A regression tree considers splitting 6 observations into two groups. Group L: $y = (5, 7, 6)$ and Group R: $y = (15, 14, 16)$. Compute the total RSS for this split.
>
> > [!answer]-
> > $\bar{y}_L = 6$; RSS$_L = (5-6)^2+(7-6)^2+(6-6)^2 = 1+1+0 = 2$.
> > $\bar{y}_R = 15$; RSS$_R = (15-15)^2+(14-15)^2+(16-15)^2 = 0+1+1 = 2$.
> > Total RSS $= 2 + 2 = 4$. A split is accepted if no other partition gives a lower total RSS.
