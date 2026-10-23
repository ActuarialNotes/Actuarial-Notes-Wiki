---
id: "faml-2-08"
exam: "Exam FAM"
topic: "Survival Model"
learning_objective: "Mortality Models"
difficulty: medium
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
  content_hash: sha256:c7deb7712383ddd5b2c6efc5f8c57890c41764358a2bb9704063f8f2b4a46258
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.8, p.9 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.8, p.7 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-08.md
---

In a population initially consisting of 75% females and 25% males, you are given:

(i) For a female, the force of mortality is constant and equals $\mu$

(ii) For a male, the force of mortality is constant and equals $1.5\mu$

(iii) At the end of 20 years, the population is expected to consist of 85% females and 15% males

Calculate the probability that a female survives one year.

[Question 3 on the Fall 2016 exam]

- A) 0.89
- B) 0.92
- C) 0.94
- D) 0.96
- E) 0.99

## Explanation

The 20-year female survival probability $= e^{-20\mu}$

The 20-year male survival probability $= e^{-30\mu}$

We want 1-year female survival $= e^{-\mu}$

Suppose that there were $M$ males and $3M$ females initially. After 20 years, there are expected to be $Me^{-30\mu}$ and $3Me^{-20\mu}$ survivors, respectively. At that time we have:

$$\frac{3Me^{-20\mu}}{Me^{-30\mu}} = \frac{85}{15} \Rightarrow e^{10\mu} = \frac{85}{45} = \frac{17}{9}$$

$$\begin{align*}
\Rightarrow e^{-\mu} &= \left(\frac{9}{17}\right)^{1/10} \\
&= 0.938
\end{align*}$$

The answer is **C**.
