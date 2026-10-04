---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:a0bf9bcaa91d646340ea3e1e3b42237b6df07ab4dda4dc009c3b8678c93cb4bc
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 standard errors, t-statistic (3.14), p-values and CIs, Table 3.1, printed pp.66-68 (PDF pp.76-78); §3.3.1 baseline level, printed p.86; §4.3.2 z-statistic, Table 4.1, printed p.136 (PDF p.146), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.1 Wald t-test: t with n-p df when sigma² estimated, normal when known, PDF pp.9-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.1 information matrix X'WX/phi and large-sample normality of the MLE, PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 exp(beta_j) multiplies the mean under the log link, PDF p.5, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS PCPA Exam & Project Content Outline v.8 (effective Sept 2026, updated 9.9.2026), Domain A task 4 p.4 and 'Performance Evaluation Criteria' p.6, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf"
  open_findings: 1
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
| **p-value** | $P(\lvert Z \rvert \geq \lvert z\text{-value}\rvert)$; significance of the predictor |
| **95% CI** | $\hat{\beta} \pm 1.96 \cdot \text{SE}(\hat{\beta})$ |

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
