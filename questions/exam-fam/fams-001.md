---
id: "fams-001"
exam: "Exam FAM"
topic: "Limited Fluctuation Credibility"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Fluctuation+Credibility
  - Concepts/Full+Credibility+Standard
  - Concepts/Pareto+Distribution
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4a3285b12f8dae5e71e1abdad8fdb29b53dc095db1606e024a5237493f3a889c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-001.md
---

You are given:

(i) The number of claims has a Poisson distribution.

(ii) Claim sizes have a Pareto distribution with parameters $\theta = 0.5$ and $\alpha = 6$

(iii) The number of claims and claim sizes are independent.

(iv) The observed average total payment should be within 2% of the expected average total payment 90% of the time.

Calculate the expected number of claims needed for full credibility.

- A) Less than 7,000
- B) At least 7,000, but less than 10,000
- C) At least 10,000, but less than 13,000
- D) At least 13,000, but less than 16,000
- E) At least 16,000

## Explanation

The standard for full credibility is

$$\left(\frac{1.645}{0.02}\right)^2\left(1+\frac{Var(X)}{E(X)^2}\right)$$

where $X$ is the claim size variable.

For the Pareto variable,

$$\begin{align*}
E(X) &= 0.5/5 \\
&= 0.1 \\
Var(X) &= \frac{2(0.5)^2}{5(4)} - (0.1)^2 \\
&= 0.015
\end{align*}$$

Then the standard is

$$\begin{align*}
n &= \left(\frac{1.645}{0.02}\right)^2\left(1+\frac{0.015}{0.1^2}\right) \\
&= 16{,}913 \text{ claims.}
\end{align*}$$

The answer is **E**.
