---
id: "cas8-an-005"
exam: "Exam 8"
topic: "Vehicle Make and Model"
learning_objective: "Classification Ratemaking"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Vehicle+Make+and+Model
  - Concepts/High+Dimensional+Variables
  - Concepts/Credibility
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:272ba065697a7addc1442e931decb31421bdb2c8e20d5adf0edae91793592545
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-8/cas8-an-005.md
---

An insurer models collision claim frequency, and vehicle make and model has thousands of levels. Following Chalk et al., the modeler uses a single-feature penalized regression with a Gaussian distribution and identity link. The predicted frequency for a level is shrunk from the level's own mean toward the overall mean, with the regularization parameter $\lambda$ chosen by cross-validation.

- Overall mean frequency: 0.050 claims per vehicle-year.
- One make and model: 200 vehicle-years, mean frequency 0.080.
- Selected $\lambda = 600$.

Calculate the predicted claim frequency for this make and model.

- A) Less than 0.055
- B) At least 0.055, but less than 0.059
- C) At least 0.059, but less than 0.065
- D) At least 0.065, but less than 0.075
- E) At least 0.075

## Explanation

Chalk et al. (Section 6.2) show that, for one high-cardinality feature in a Gaussian identity-link penalized regression, the coefficient for level $k$ is the level's deviation from the overall mean, shrunk by $\lambda / n_k + 1$:

$$
\begin{align*}
\beta_k &= \frac{\bar{y}_k - \bar{y}}{\lambda / n_k + 1} \\
&= \frac{0.080 - 0.050}{600/200 + 1} \\
&= \frac{0.030}{4} \\
&= 0.0075
\end{align*}
$$

The prediction adds it to the overall mean:

$$
\begin{align*}
\hat{y}_k &= 0.050 + 0.0075 \\
&= \mathbf{0.0575}
\end{align*}
$$

The weight on the level's own mean is $Z = 1/(\lambda/n_k + 1) = n_k/(n_k + \lambda) = 0.25$, a credibility weight. The answer is **B**.

**Why not the others**

- **A** (0.0075) reports the coefficient alone and forgets to add back the overall mean.
- **C** (0.060) divides the deviation by $\lambda / n_k = 3$ and drops the $+1$.
- **D** (0.0725) puts the weight $\lambda/(n_k + \lambda) = 0.75$ on the level's own mean, swapping it with the complement.
- **E** (0.080) uses the level's raw mean with no shrinkage. Chalk et al. warn that encoding software often does exactly this unless a credibility adjustment is added.
