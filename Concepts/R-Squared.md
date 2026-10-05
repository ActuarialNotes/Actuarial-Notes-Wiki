---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd9c88089c9e50f634a8f35c2620cc65669f00d843ffb60de25ba8ac021e2865
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.3 R² = 1 - RSS/TSS (3.17), between 0 and 1 (for the least squares fit of a model with an intercept), printed p.70 (PDF p.80); §3.2.2 R² always increases as variables are added, printed pp.79-80 (PDF pp.89-90); §6.1.3 adjusted R² (6.4), printed pp.234-235 (PDF pp.242-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 10 §10.3 adjusted R² = 1 - ((n-1)/(n-p))(SSE/SSTO), p = parameters incl. intercept, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 pseudo-R² as the proportion of deviance explained relative to the null model, PDF p.50, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136: p.78 (PDF p.3) with no constant the cross-product term is generally nonzero, so the usual decomposition fails, and if the fit is poor enough sum(Y - Yhat)^2 > sum(Y - ybar)^2 and equation (4) gives 'an implausibly negative (and thus uninterpretable) coefficient of determination'; R^2 about the origin is strictly non-negative and equals or exceeds equation (4); p.79 (PDF p.4) Excel applies (4) regardless of an intercept and can give negative R^2, SPSS's no-intercept R Square 'CANNOT be compared to R Square for models which include an intercept'. Copy read: third-party repost of the publisher PDF, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5 — https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf"
    - "Paul, D. & Li, Y., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: through the origin the ANOVA decomposition is SSTO = sum Y_i^2 with n d.f., SSR with 1 d.f. (not the usual sum (Y - Ybar)^2), sha256:a85654900da2e113630a696e041d0a5f67b8b9d97f70a56a2cbe2dbae8ce0fde (HTML as fetched; the page embeds per-request tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/R-Squared.md
---

**R-Squared** ($R^2$), also called the **coefficient of determination**, measures the proportion of total variance in the response variable $Y$ that is explained by the model.

> $$R^2 = 1 - \frac{\text{SS}_\text{Res}}{\text{SS}_\text{Tot}}$$

> $$= 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

- For a least-squares fit that includes an intercept, $R^2 \in [0, 1]$; a value of 1 means the model explains all variability; 0 means it explains none. Fitted without an intercept ([[Regression Through the Origin]]), the formula above can be negative
- $R^2$ **always increases** (or stays the same) when predictors are added, even if they are irrelevant
- **Adjusted $R^2$** corrects for this by penalizing for the number of predictors $p$:
$$R^2_{\text{adj}} = 1 - \frac{\text{SS}_\text{Res}/(n-p-1)}{\text{SS}_\text{Tot}/(n-1)}$$
- In [[Generalized Linear Model]]s, the analogue is the **pseudo-$R^2$** based on [[Deviance]]: $R^2_D = 1 - D/D_0$ where $D_0$ is the null deviance
- $R^2$ measures in-sample fit only and does not directly assess predictive performance on new data

![[Media/Figures/R-Squared.svg|340]]

> [!example]- Computing R-Squared for a Linear Regression {Example}
> A simple regression of claim severity on vehicle age gives $\text{SS}_\text{Tot} = 10{,}000$ and $\text{SS}_\text{Res} = 3{,}500$. Calculate $R^2$.
>
> > [!answer]-
> > $$R^2 = 1 - \frac{3{,}500}{10{,}000} = 1 - 0.35 = 0.65$$
> > Vehicle age explains 65% of the variance in claim severity.

> [!example]- Adjusted R-Squared Penalizing for Additional Predictors {Example}
> With $n = 50$ observations, $R^2 = 0.65$ for a model with $p = 5$ predictors. Compute $R^2_{\text{adj}}$.
>
> > [!answer]-
> > $$R^2_{\text{adj}} = 1 - \frac{(1-0.65)(50-1)}{50-5-1} = 1 - \frac{0.35 \times 49}{44} = 1 - \frac{17.15}{44} = 1 - 0.390 = 0.610$$
