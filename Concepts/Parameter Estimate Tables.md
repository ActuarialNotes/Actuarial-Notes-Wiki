---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:03fd2a9a9194302320045c8f93bbedda7964d6939a558a901a4287c27af7a893
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 standard errors, t-statistic (3.14) with n-2 df, footnote 3 on the 97.5% t quantile, printed pp.66-67 (PDF pp.76-77); §4.3.2 z-statistic, Table 4.1, printed p.136 (PDF p.146); §4.6.2 Table 4.11 Poisson regression z-statistic, printed p.168 (PDF p.178), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.1 Wald t-test: t with n-p df when sigma² estimated, normal when known, CI with t_(1-alpha/2, n-p), PDF pp.9-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.1 information matrix X'WX/phi and large-sample normality of the MLE (B.10), PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3.1-2.3.3 standard error, p-value, confidence interval in GLM output, printed pp.8-10 (PDF pp.18-20), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parameter Estimate Tables.md
---

**Parameter Estimate Tables** (also called **coefficient tables** or **output tables**) are standard output from statistical software when fitting regression or [[Generalized Linear Model]]s. They summarize the estimated model coefficients, their uncertainty, and hypothesis test results.

**Typical columns in a parameter estimate table:**

| Column | Description |
| :--- | :--- |
| **Parameter** | Predictor name or level |
| **Estimate** ($\hat{\beta}$) | Maximum likelihood estimate of the coefficient |
| **Std. Error** | Estimated standard deviation of $\hat{\beta}$ |
| **z-value** or **t-value** | $\hat{\beta} / \text{SE}(\hat{\beta})$; test statistic for $H_0: \beta = 0$ |
| **p-value** | Significance of the predictor: $P(\lvert T_{n-p-1} \rvert \geq \lvert t\text{-value}\rvert)$ for a t-value, $P(\lvert Z \rvert \geq \lvert z\text{-value}\rvert)$ for a z-value |
| **95% CI** | $\hat{\beta} \pm t_{0.025,\, n-p-1} \cdot \text{SE}(\hat{\beta})$ for a t-value, $\hat{\beta} \pm 1.96 \cdot \text{SE}(\hat{\beta})$ for a z-value |

- **Which distribution applies**: a [[Linear Regression|linear regression]] table reports **t-values** — $\sigma^2$ is estimated from the residuals, so under Normal errors $\hat\beta_j/\text{SE}(\hat\beta_j)$ follows a $t$ distribution with $n-p-1$ degrees of freedom ($p$ predictors plus an intercept). A GLM table such as Poisson or logistic regression reports **z-values**: Wald statistics referred to the standard Normal, because the maximum likelihood estimate is approximately Normal in large samples. The two agree as the degrees of freedom grow — the two-sided 5% critical value is $2.09$ at 20 df and $1.98$ at 100 df, against $1.96$ — but with few residual df the $t$ multiplier is much larger ($3.18$ at 3 df)
- A small p-value (e.g., $< 0.05$) indicates the predictor is statistically significant
- For a log-[[Link Function]] model (Poisson or Gamma GLM), $e^{\hat{\beta}}$ is the **multiplicative factor** on the mean per unit increase in the predictor
- The **reference level** of a categorical predictor is absorbed into the intercept; other levels are interpreted relative to it
- Standard errors from GLMs are based on the **Fisher information matrix**

![[Media/Figures/Parameter_Estimate_Tables.svg|340]]

> [!example]- Interpreting GLM Output {Example}
> A Poisson GLM output shows: Intercept $\hat{\beta}_0 = -1.8$ (SE = 0.2) and Territory B $\hat{\beta}_1 = 0.45$ (SE = 0.15, p = 0.003). The reference is Territory A. Interpret the territory coefficient.
>
> > [!answer]-
> > The p-value of 0.003 < 0.05 indicates that Territory B is significantly different from Territory A. With a log link, the expected claim count in Territory B is $e^{0.45} \approx 1.57$ times that in Territory A — i.e., approximately **57% more claims** in Territory B, all else equal.
