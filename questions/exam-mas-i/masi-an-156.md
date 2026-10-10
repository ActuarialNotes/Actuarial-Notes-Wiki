---
id: "masi-an-156"
exam: "Exam MAS-I"
topic: "Quasi-Likelihood"
learning_objective: "Extended Linear Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Quasi-Likelihood
  - Concepts/Dispersion+Parameter
  - Concepts/Deviance
  - Concepts/F-Distribution
answer: "3.15"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:464196b529ed9cc17fb44cc49862a625e12bcd5193c52eca77f67c6fd636d24f
  sources:
    - "Roback & Legler, Beyond Multiple Linear Regression, Ch.4 Poisson Regression (bookdown), §4.9 overdispersion: phi-hat = sum of squared Pearson residuals / (n - p); SE_Q = sqrt(phi-hat) SE; t tests; drop-in-deviance F = (drop in deviance / difference in df) / phi-hat, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.1.3 and §6.2.1, PDF pp.74-75 (deviance comparisons need identical data, missing values dropped by software; nested models and F = (D_S - D_B)/(# added parameters x phi-hat_B)), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "R documentation, stats::summary.glm, Details: dispersion taken as 1 for binomial and Poisson, otherwise residual chi-squared statistic / residual df; column labelled t ratio if dispersion is estimated, z ratio if known, two-tailed p-values from Student t or Normal, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-156.md
---

A quasi-Poisson claim-frequency model is being extended with a vehicle-use variable that has 4 levels. The fits are:

| Model | Residual deviance | Residual df | Pearson $X^2$ |
| :--- | ---: | ---: | ---: |
| Without vehicle use | 1,962.4 | 803 | 1,905 |
| With vehicle use | 1,940.2 | 800 | 1,880 |

The dispersion parameter is estimated as Pearson's $X^2$ divided by the residual degrees of freedom of the larger model.

Calculate the F statistic for testing whether vehicle use belongs in the model. Give your answer to two decimal places.

## Explanation

Estimate the dispersion from the larger model:

$$
\begin{align*}
\hat\phi &= \frac{X^2}{n - p} \\
&= \frac{1{,}880}{800} \\
&= 2.35
\end{align*}
$$

Under quasi-likelihood the drop in deviance per degree of freedom is divided by $\hat\phi$:

$$
\begin{align*}
F &= \frac{(D_0 - D_1)/(df_0 - df_1)}{\hat\phi} \\
&= \frac{(1{,}962.4 - 1{,}940.2)/(803 - 800)}{2.35} \\
&= \frac{22.2/3}{2.35} \\
&= \mathbf{3.15}
\end{align*}
$$

This is compared with $F_{3,\,800}$, whose 95th percentile is about 2.62, so vehicle use is significant even after allowing for overdispersion.

**Common wrong entries**

- **7.40** — divides the drop by its 3 degrees of freedom but not by $\hat\phi$, ignoring the overdispersion.
- **9.45** — divides by $\hat\phi$ but not by the 3 degrees of freedom; 22.2/2.35 is a scaled chi-square statistic, not an F statistic.
- **4.83** — divides by $\sqrt{\hat\phi}$ instead of $\hat\phi$; the square root belongs to standard errors, not to deviances.
- **3.05** — estimates $\phi$ by deviance over degrees of freedom (1,940.2/800 = 2.425) instead of the Pearson statistic the question specifies.
