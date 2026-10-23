---
id: "faml-5-11"
exam: "Exam FAM"
topic: "Life Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Life+Annuity
  - Concepts/Variance+and+Standard+Deviation
  - Concepts/Annuity+Due
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:c9e83271b99b0af99745fa38898fef29b12f5276f6705fb043c48a57951f1c72
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.11, p.47 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.11, p.32 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-11.md
---

For a 3-year temporary life annuity due, you are given:

i) The life annuity pays 10 at the beginning of each year

ii) $v = 0.93$

iii) $p_{x} = 0.95$, $p_{x+1} = 0.9$, $p_{x+2} = 0.8$

Calculate the standard deviation of the present value random variable for this annuity.

[Question on October 2022 FAM-L Exam]

- A) 4.4
- B) 4.5
- C) 4.6
- D) 4.7
- E) 4.8

## Explanation

| Discounted Payment | Probability |
|---|---|
| 10 | (1-0.95) = 0.05 |
| $10 + 10v = 19.3$ | (0.95)(1-0.9) = 0.095 |
| $10 + 10v + 10v^{2} = 27.949$ | (0.95)(0.9) = 0.855 |

$$Var(X) = E(X^{2}) - [E(X)]^{2}$$

$$\begin{align*}
E(X) &= 10(1-0.95) + [10+10v](0.95)(1-0.9) + [10+10v+10v^{2}](0.95)(0.9) \\
&= 26.23
\end{align*}$$

$$\begin{align*}
E(X^{2}) &= 10^{2}(1-0.95) + [10+10v]^{2}(0.95)(1-0.9) + [10+10v+10v^{2}]^{2}(0.95)(0.9) \\
&= 708.27
\end{align*}$$

$$\begin{align*}
Var(X) &= 708.27 - (26.23)^{2} \\
&= 20.26
\end{align*}$$

$$\begin{align*}
\text{Standard Deviation} &= (20.26)^{1/2} \\
&= 4.5
\end{align*}$$

It's not significantly less work, but since everyone receives the first 10, you could use the formula $Var(X - \text{constant}) = Var(X)$, and work with the three payment amounts as 0, $10v$, $10v + 10v^{2}$, and you would get the same answer.

The answer is **B**.
