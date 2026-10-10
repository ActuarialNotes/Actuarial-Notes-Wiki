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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:464196b529ed9cc17fb44cc49862a625e12bcd5193c52eca77f67c6fd636d24f
  sources: []
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
