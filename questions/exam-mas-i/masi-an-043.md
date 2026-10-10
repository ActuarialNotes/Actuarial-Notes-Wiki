---
id: "masi-an-043"
exam: "Exam MAS-I"
topic: "Convergence in Probability"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Convergence+in+Probability
  - Concepts/Consistency
  - Concepts/Bias
  - Concepts/Order+Statistics
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6b9042672075738875ce5bc5541200f85a42532e97cee3fef76e974d55c0ed46
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-043.md
---

Losses are uniformly distributed on $(0, \theta)$, and the largest of $n$ observed losses, $X_{(n)}$, is used to estimate $\theta$. Its expected value is $n\theta/(n+1)$, below $\theta$ for every $n$.

True or false: because $X_{(n)}$ is biased for every sample size, it does not converge in probability to $\theta$, so it is not a consistent estimator of $\theta$.

- A) True
- B) False

## Explanation

The statement is **false**, so the answer is **B**. Consistency asks whether the *probability* of missing $\theta$ by more than any tolerance $\varepsilon$ goes to 0, not whether the estimator is right on average at each $n$.

$X_{(n)}$ is never above $\theta$, so it misses by more than $\varepsilon$ only if all $n$ losses fall below $\theta - \varepsilon$:

$$
P\big(|X_{(n)} - \theta| > \varepsilon\big) = \left(1 - \frac{\varepsilon}{\theta}\right)^{n} \longrightarrow 0 \quad \text{as } n \to \infty
$$

for every $\varepsilon > 0$, so $X_{(n)} \xrightarrow{p} \theta$ and the sample maximum *is* consistent. Its bias, $-\theta/(n+1)$, shrinks to 0 along the way.

Bias and consistency are separate properties, and neither implies the other: a biased estimator can be consistent (this one), and an unbiased one can fail to be — the first observation alone, scaled to be unbiased, never concentrates around $\theta$ however large the sample. Answering **A** treats "biased" as if it meant "wrong in the limit".
