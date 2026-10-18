---
id: "fams-046"
exam: "Exam FAM"
topic: "Mixture Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Mixture+Distribution
  - Concepts/Pareto+Distribution
  - Concepts/Probability
  - Concepts/Severity
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8827f7c659a165138c13a568b40399c7e3d4141e3039a6e1e115fd969f79ccd0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-046.md
---

The distribution of a loss, $X$, is a two-point mixture:

(i) With probability 0.8, $X$ has a Pareto distribution with $\alpha = 2$ and $\theta = 100$.

(ii) With probability 0.2, $X$ has a Pareto distribution with with $\alpha = 4$ and $\theta = 3000$.

Calculate $P(X \le 200)$.

- A) 0.76
- B) 0.79
- C) 0.82
- D) 0.85
- E) 0.88

## Explanation

$$\begin{align*}
F(200) &= 0.8\left[1 - \left(\frac{100}{200 + 100}\right)^2\right] + 0.2\left[1 - \left(\frac{3000}{3000 + 200}\right)^4\right] \\
&= 0.7566
\end{align*}$$

The answer is **A**.
