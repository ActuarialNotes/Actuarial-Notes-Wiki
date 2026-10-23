---
id: "faml-2-09"
exam: "Exam FAM"
topic: "Parametric Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Parametric+Survival+Model
  - Concepts/Binomial+Distribution
  - Concepts/Variance
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:87e4a91e44ffe36c3eca4d6cb601f60ee0e527d682a0bc7d9a48fb01e5836022
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.9, p.10 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.9, p.7 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-09.md
---

You are given that mortality follows Makeham's Law with the following parameters:

i) $A = 0.004$

ii) $B = 0.00003$

iii) $c = 1.1$

Let $L_{15}$ be the random variable representing the number of lives alive at the end of 15 years if there are 10,000 lives age 50 at time 0.

Calculate $Var[L_{15}]$.

[Question on October 2022 FAM-L Exam]

- A) 1,317
- B) 1,328
- C) 1,339
- D) 1,350
- E) 1,361

## Explanation

The distribution is binomial with 10,000 trials.

$$Var[L_{15}] = npq = 10{,}000\left({}_{15}p_{50}\right)\left({}_{15}q_{50}\right)$$

$$\begin{align*}
{}_{15}p_{50} &= e^{\left[-A(15) - \frac{B}{\ln C} \times c^{50}\left(c^{15} - 1\right)\right]} \\
&= 0.837445
\end{align*}$$

$$\begin{align*}
{}_{15}q_{50} &= 1 - {}_{15}p_{50} \\
&= 0.162555
\end{align*}$$

$$\begin{align*}
Var[L_{15}] &= 10{,}000(0.837445)(0.162555) \\
&= 1361.3
\end{align*}$$

The answer is **E**.
