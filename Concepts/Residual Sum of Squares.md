---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:61fd94183d8272d7158efe92951e2df0bee2d354afb960a685aa68bafa37f86b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 RSS (3.3) and least squares minimizes RSS, printed p.62 (PDF p.72); §3.2.2 TSS and RSS in the F-statistic (3.23) printed p.76 (PDF p.86), RSE with n-p-1 (3.25) printed p.80 (PDF p.90); §8.1.1 regression-tree RSS (8.1), recursive binary splitting (8.2)-(8.3), printed pp.330-331 (PDF pp.338-339), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SSR, SSE, SSTO, df add up, MSR, MSE, F* = MSR/MSE, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Residual Sum of Squares.md
---

![[Media/Figures/Residual_Sum_of_Squares.svg|340]]

The **Residual Sum of Squares** (RSS) is the sum of the squared [[Residual|residuals]] of a fitted model, the variation in the response that the model leaves unexplained. For $n$ observations it is

> $$\text{RSS} = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

- $y_i$ is the observed response and $\hat{y}_i$ is its [[Fitted Values|fitted value]].

The RSS is also called the sum of squared errors (SSE). As a sum of squares it is never negative. [[Ordinary Least Squares|Least squares]] chooses the coefficients that minimize it, so adding a predictor to a model can never increase the RSS.

> [!example]- Observed claim severities are 200, 210 and 270, and a model's fitted values are 180, 220 and 260. What is the RSS? {Example}
> - The residuals are $200 - 180 = 20$, $210 - 220 = -10$ and $270 - 260 = 10$.
> - The RSS is $20^2 + (-10)^2 + 10^2 = 600$.

## Total sum of squares

The total sum of squares measures the variation of the response about its mean:

> $$\text{TSS} = \sum_{i=1}^{n} (y_i - \bar{y})^2$$

- $\bar{y}$ is the sample mean of the responses.

The TSS depends only on the responses, so it does not change with the predictors in the model. A model with only an intercept has every fitted value equal to $\bar{y}$, so its RSS equals the TSS. For a least squares fit with an intercept, the total variation splits into the part the regression explains and the residual part:

> $$\sum_{i=1}^{n} (y_i - \bar{y})^2 = \sum_{i=1}^{n} (\hat{y}_i - \bar{y})^2 + \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$$

The regression sum of squares is therefore $\text{TSS} - \text{RSS}$, and [[R-Squared|$R^2$]] $= 1 - \text{RSS}/\text{TSS}$ is the share of the TSS the regression explains. The [[ANOVA|ANOVA table]] lays out this split.

> [!example]- A least squares line fitted to the points $(1, 2)$, $(2, 3)$ and $(3, 5)$ has fitted values 1.8333, 3.3333 and 4.8333. What are the TSS, the RSS and the regression sum of squares? {Example}
> - The mean response is $\bar{y} = 10/3 = 3.3333$.
> - $\text{TSS} = 1.3333^2 + 0.3333^2 + 1.6667^2 = 4.6667$.
> - The residuals are $0.1667$, $-0.3333$ and $0.1667$, so $\text{RSS} = 0.1667$.
> - The regression sum of squares is $\text{TSS} - \text{RSS} = 4.5$, which equals $\sum (\hat{y}_i - \bar{y})^2 = 1.5^2 + 0 + 1.5^2$.

## Residual standard error

For a linear regression with an intercept and $p$ predictors, the estimate of the error variance $\sigma^2$ is

> $$\hat\sigma^2 = \frac{\text{RSS}}{n - p - 1}$$

- $n - p - 1$ is the residual degrees of freedom: $n$ minus the number of estimated coefficients.

The residual standard error is $\hat\sigma = \sqrt{\text{RSS}/(n - p - 1)}$, the estimate of the error standard deviation $\sigma$ that regression software prints.

> [!example]- Software reports "Residual standard error: 4.74 on 493 degrees of freedom". What are $\hat\sigma^2$ and the RSS? {Example}
> - Squaring the residual standard error gives $\hat\sigma^2 = 4.74^2 = 22.47$.
> - Multiplying by the residual degrees of freedom gives $\text{RSS} = 22.47 \times 493 = 11{,}077$.

## Residual sum of squares of a regression tree

A [[Regression Tree|regression tree]] divides the predictor space into regions $R_1, \ldots, R_J$ and predicts the mean response of the region an observation falls in. Its RSS is

> $$\text{RSS} = \sum_{j=1}^{J} \sum_{i \in R_j} (y_i - \bar{y}_{R_j})^2$$

- $\bar{y}_{R_j}$ is the mean response of the training observations in region $R_j$.

Recursive binary splitting grows the tree one split at a time. At each step it compares the splits of the form $x_k < s$ against $x_k \ge s$ over every predictor $x_k$ and cutpoint $s$, and makes the one with the lowest RSS.

> [!example]- A split puts responses 5, 7 and 6 in one region and 15, 14 and 16 in the other. What is the RSS of the split? {Example}
> - The first region's mean is 6, so its RSS is $1 + 1 + 0 = 2$.
> - The second region's mean is 15, so its RSS is $0 + 1 + 1 = 2$.
> - The RSS of the split is $2 + 2 = 4$. The split is chosen if no other predictor and cutpoint gives less.
