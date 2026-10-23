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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:025f4f1db2c76c1e5899d56e3a74587d64eb3d944457bf60061364010ca9f811
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q14, p.12, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q14, p.7, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
