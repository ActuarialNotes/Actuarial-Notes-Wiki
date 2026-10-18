---
id: "fams-020"
exam: "Exam FAM"
topic: "Stop-Loss Reinsurance"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Stop-Loss+Reinsurance
  - Concepts/Aggregate+Loss+Model
  - Concepts/Geometric+Distribution
  - Concepts/Limited+Expected+Value
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eaeac91f0c6fb8cdb231bc92283a0b2323a51712e3090dccb0d5fc36b8c46b8b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-020.md
---

Prescription drug losses, $S$, are modeled assuming the number of claims has a geometric distribution with mean 4, and the amount of each prescription is 40.

Calculate $E[(S - 100)_+]$.

- A) 60
- B) 82
- C) 92
- D) 114
- E) 146

## Explanation

Let $N$ = number of prescriptions then

| $n$ | $f_N(n)$ |
|---|---|
| 0 | 0.2000 |
| 1 | 0.1600 |
| 2 | 0.1280 |
| 3 | 0.1024 |

$$\begin{align*}
E[(S-100)_+] &= E[S] - E[S \wedge 100] \\
E[S] &= 40(4) \\
&= 160 \\
E[S \wedge 100] &= 0(0.2) + 40(0.16) + 80(0.128) + 100(1 - 0.2 - 0.16 - 0.128) \\
&= 67.84 \\
E[(S-100)_+] &= 160 - 67.84 \\
&= 92.16
\end{align*}$$

The answer is **C**.
