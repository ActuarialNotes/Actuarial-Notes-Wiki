---
id: "faml-3-11"
exam: "Exam FAM"
topic: "Fractional Age Assumption"
learning_objective: "Mortality Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed286c083ef33127025fdde3e08f2f9ace7e1944eb98deac9327a3dd53d5c493
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q3.11, p.20 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q3.11, p.15 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-3-11.md
---

For the country of Bienna, you are given:

(i) Bienna publishes mortality rates in biennial form, that is, mortality rates are of the form: $_{2}q_{2x}$, for $x = 0, 1, 2, \ldots$

(ii) Deaths are assumed to be uniformly distributed between ages $2x$ and $2x + 2$, for $x = 0, 1, 2, \ldots$

(iii) $_{2}q_{50} = 0.02$

(iv) $_{2}q_{52} = 0.04$

Calculate the probability that (50) dies during the next 2.5 years.

[Question 1 on the Fall 2016 exam]

- A) 0.02
- B) 0.03
- C) 0.04
- D) 0.05
- E) 0.06

## Explanation

$$\begin{align*}
{}_{2.5}q_{50} &= {}_{2}q_{50} + {}_{2}p_{50}\;{}_{0.5}q_{52} \\
&= 0.02 + (0.98)\left(\frac{0.5}{2}\right)(0.04) \\
&= 0.0298
\end{align*}$$

The answer is **B**.
