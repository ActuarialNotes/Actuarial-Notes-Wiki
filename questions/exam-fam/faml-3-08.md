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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:089fb81afeddcfea75dde2a372cb77397611f01db3d993164f7f0e148a6fe6d0
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.8, p.19 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.8, p.13 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table, p.21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
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
