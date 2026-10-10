---
id: "masi-an-064"
exam: "Exam MAS-I"
topic: "Cramér-Rao Lower Bound"
learning_objective: "Statistics"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Cramér-Rao+Lower+Bound
  - Concepts/Mean+Square+Error
  - Concepts/Bias
  - Concepts/Unbiasedness
  - Concepts/Exponential+Distribution
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:794c104a8a82ab938639c9b3d0bc0ddde1d63e89b5dca49b93e339bf0bd991bd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-064.md
---

Claim sizes are exponential with unknown mean $\theta$. From a sample of $n = 10$ claims, an actuary considers three estimators of $\theta$:

| Estimator | Definition | Bias | Variance |
| :--- | :--- | :---: | :---: |
| $T_1$ | $\bar{X}$ | 0 | $\theta^2/10$ |
| $T_2$ | $\sum X_i / 11$ | $-\theta/11$ | $\tfrac{10}{121}\theta^2$ |
| $T_3$ | $n \cdot \min(X_1, \ldots, X_{10})$ | 0 | $\theta^2$ |

The actuary will use whichever estimator has the smallest mean square error. A colleague points out that the variance of $T_2$ is below the Cramér–Rao lower bound for this model.

Which choice, with its justification, is correct?

- A) $T_1$ — it attains the Cramér–Rao bound, so no estimator can have a smaller MSE
- B) $T_1$ — a variance below the bound shows that $T_2$'s figures are in error
- C) $T_2$ — it has the smallest variance, and a smaller variance means a smaller MSE
- D) $T_2$ — the bound limits unbiased estimators only, and $T_2$ has the smallest MSE
- E) $T_3$ — it is unbiased, and an estimator must be unbiased before its MSE counts

## Explanation

For the exponential with mean $\theta$, $I(\theta) = 1/\theta^2$, so the bound for an **unbiased** estimator is $\theta^2/n = \theta^2/10$. $T_1$ attains it, and $T_2$'s variance, $\text{Var}(T_2) = 10\theta^2/121 \approx 0.0826\,\theta^2$, is below it — which is no contradiction, because $T_2$ is biased.

The criterion is mean square error, $\text{MSE} = \text{Var} + \text{Bias}^2$:

$$
\begin{align*}
\text{MSE}(T_1) &= \frac{\theta^2}{10} \\
&= 0.1000\,\theta^2 \\
\text{MSE}(T_2) &= \frac{10\theta^2}{121} + \frac{\theta^2}{121} \\
&= \frac{\theta^2}{11} \\
&= 0.0909\,\theta^2 \\
\text{MSE}(T_3) &= \theta^2
\end{align*}
$$

$T_2$ has the smallest MSE, and the reason it may go below the bound is that the bound restricts only unbiased estimators. The answer is **D**.

**Why not the others**

- **A** — the bound limits the *variance of unbiased estimators*; it says nothing about the MSE of a biased one, and $T_2$ beats $T_1$ on MSE.
- **B** — the same misreading turned into an accusation: a biased estimator's variance can legitimately fall below the bound, and $T_2$'s figures are correct ($\text{Var}(\sum X_i) = 10\theta^2$, divided by 121).
- **C** — picks the right estimator for a wrong reason. MSE adds the squared bias, so a smaller variance does not in general mean a smaller MSE; here it does only because the bias is small.
- **E** — invents a requirement: MSE compares biased and unbiased estimators on one scale, and $T_3$, though unbiased, has ten times $T_1$'s variance because it uses only the sample minimum.
