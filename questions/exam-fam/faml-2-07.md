---
id: "faml-2-07"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Survival+Model
  - Concepts/Future+Lifetime+Random+Variable
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f417ee8b6f88dfacb4bd23e9a03e3e49745cebbe52b0c02bd914051a2197ad02
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.7, p.9 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.7, p.7 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-07.md
---

You are given the following survival function of a newborn:

$$S_{0}(x) = \begin{cases} 1 - \dfrac{x}{250}, & 0 \le x < 40 \\[2ex] 1 - \left(\dfrac{x}{100}\right)^{2}, & 40 \le x \le 100 \end{cases}$$

Calculate the probability that (30) dies within the next 20 years.

[Question 2 on the Fall 2016 exam]

- A) 0.13
- B) 0.15
- C) 0.17
- D) 0.19
- E) 0.21

## Explanation

$$\begin{align*}
{}_{20}q_{30} &= \frac{S_{0}(30) - S_{0}(50)}{S_{0}(30)} \\
&= \frac{\left(1 - \frac{30}{250}\right) - \left(1 - \left[\frac{50}{100}\right]^{2}\right)}{1 - \frac{30}{250}} \\
&= \frac{\frac{220}{250} - \frac{3}{4}}{\frac{220}{250}} \\
&= \frac{440 - 375}{440} \\
&= \frac{65}{440} \\
&= \frac{13}{88} \\
&= 0.1477
\end{align*}$$

The answer is **B**.
