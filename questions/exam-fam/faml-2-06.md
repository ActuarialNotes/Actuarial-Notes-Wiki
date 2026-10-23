---
id: "faml-2-06"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Hazard+Rate
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:752a6e25d5222d7d9c8a1349f41bb12a5e4fb5055f4e87d01553c6a8959bee26
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.6, p.8 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.6, p.6 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-06.md
---

You are given the survival function:

$$S_{0}(x) = \left(1 - \frac{x}{60}\right)^{\frac{1}{3}}, \quad 0 \le x \le 60.$$

Calculate $1000\mu_{35}$.

[Question 2 on the Spring 2016 exam]

- A) 5.6
- B) 6.7
- C) 13.3
- D) 16.7
- E) 20.1

## Explanation

$$\begin{align*}
\mu_{x} &= -\frac{d}{dx}\ln S_{0}(x) \\
&= -\frac{1}{3}\frac{d}{dx}\ln\left(1 - \frac{x}{60}\right) \\
&= \frac{1}{180}\left(1 - \frac{x}{60}\right)^{-1} \\
&= \frac{1}{3(60 - x)}
\end{align*}$$

Therefore,

$$\begin{align*}
1000\mu_{35} &= (1000)\frac{1}{3(25)} \\
&= \frac{1000}{75} \\
&= 13.3
\end{align*}$$

The answer is **C**.
