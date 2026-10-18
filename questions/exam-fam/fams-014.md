---
id: "fams-014"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Pareto+Distribution
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:025f4f1db2c76c1e5899d56e3a74587d64eb3d944457bf60061364010ca9f811
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-014.md
---

A health plan implements an incentive to physicians to control hospitalization under which the physicians will be paid a bonus $B$ equal to $c$ times the amount by which total hospital claims are under 400 $(0 \le c \le 1)$.

The effect the incentive plan will have on underlying hospital claims is modeled by assuming that the new total hospital claims will follow a Pareto distribution with $\alpha = 2$ and $\theta = 300$.

$E(B) = 100$

Calculate $c$.

- A) 0.44
- B) 0.48
- C) 0.52
- D) 0.56
- E) 0.60

## Explanation

$$B = \begin{cases} c(400 - x) & x < 400 \\ 0 & x \ge 400 \end{cases}$$

$$\begin{align*}
100 = E(B) &= c400 - cE(X \wedge 400) \\
&= c400 - c300\left(1 - \frac{300}{300+400}\right) \\
&= c\left(400 - 300\frac{4}{7}\right) \\
c &= \frac{100}{228.6} \\
&= 0.44
\end{align*}$$

The answer is **A**.
