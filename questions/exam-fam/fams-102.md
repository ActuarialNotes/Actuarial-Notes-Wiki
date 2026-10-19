---
id: "fams-102"
exam: "Exam FAM"
topic: "Risk Measure"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Risk+Measure
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:95aa2046b7550216765278fffaf09f1b14c182c1b5e4aa30d7daeb252de2f781
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-102.md
---

You are given:

(i) For any random variable $X$, the risk measure is $\rho(X) = \mu_X + k\sigma_X$.

(ii) The variables $Y$ and $Z$ are defined as follows:

| $y$ | $P(Y = y)$ |
|---|---|
| 0 | 0.2 |
| 1 | 0.8 |

and $Z$ is constant with $Z = 1$.

Calculate the largest value of $k$ such that $\rho$ has the monotonicity property with respect to $Y$ and $Z$.

- A) 0.50
- B) 0.75
- C) 1.00
- D) 1.25
- E) 1.50

## Explanation

The monotonicity property states that if $Y \le Z$ for all possible outcomes, then $\rho(Y) \le \rho(Z)$.

From the variable definitions, we have $\mu_Y = 0.8$, $\sigma_Y^2 = 0.8 - 0.8^2 = 0.16$, $\mu_Z = 1$, and $\sigma_Z^2 = 0$.

Monotonicity requires $0.8 + 0.4k \le 1$. Therefore, $k \le 0.5$.

The answer is **A**.
