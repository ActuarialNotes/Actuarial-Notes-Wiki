---
id: "faml-3-08"
exam: "Exam FAM"
topic: "Normal Approximation"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Normal+Approximation
  - Concepts/Life+Table
  - Concepts/Binomial+Distribution
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:089fb81afeddcfea75dde2a372cb77397611f01db3d993164f7f0e148a6fe6d0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-08.md
---

A club is established with 2000 members, 1000 of exact age 35 and 1000 of exact age 45.

You are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) Future lifetimes are independent

(iii) $N$ is the random variable for the number of members still alive 40 years after the club is established

Using the normal approximation, without the continuity correction, calculate the smallest $n$ such that $\Pr(N \ge n) \le 0.05$.

[A modified version of Question 1 on the Spring 2015 exam]

- A) 1500
- B) 1505
- C) 1510
- D) 1515
- E) 1520

## Explanation

$$\begin{align*}
E(N) &= 1000\left({}_{40}p_{35} + {}_{40}p_{45}\right) \\
&= 1000\left(\frac{85{,}203.5}{99{,}556.7} + \frac{61{,}184.9}{99{,}033.9}\right) \\
&= 1473.65
\end{align*}$$

$$\begin{align*}
Var(N) &= 1000\;{}_{40}p_{35}\left(1 - {}_{40}p_{35}\right) + 1000\;{}_{40}p_{45}\left(1 - {}_{40}p_{45}\right) \\
&= 359.50
\end{align*}$$

Since

$$\begin{align*}
1473.65 + 1.645\sqrt{359.50} &= 1504.84
\end{align*}$$

$N = 1505$

The answer is **B**.
