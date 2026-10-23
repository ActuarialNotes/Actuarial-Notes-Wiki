---
id: "faml-4-14"
exam: "Exam FAM"
topic: "Normal Approximation"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Normal+Approximation
  - Concepts/Pure+Endowment
  - Concepts/Life+Table
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:96da45763e9fab5948719e25ef5b544dd9794ba425813ae6fc4c78c5baf70832
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.14, p.35 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.14, p.24 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-14.md
---

A fund is established for the benefit of 400 workers all age 60 with independent future lifetimes. When they reach age 85, the fund will be dissolved and distributed to the survivors.

The fund will earn interest at a rate of 5% per year.

The initial fund balance, $F$, is determined so that the probability that the fund will pay at least 5000 to each survivor is 86%, using the normal approximation.

Mortality follows the Standard Ultimate Life Table.

Calculate $F$.

[A modified version of Question 3 on the Spring 2016 exam]

- A) 350,000
- B) 360,000
- C) 370,000
- D) 380,000
- E) 390,000

## Explanation

Out of 400 lives initially, we expect

$$\begin{align*}
400\,{}_{25}p_{60} &= 400\,\frac{l_{85}}{l_{60}} \\
&= 400\left(\frac{61{,}184.9}{96{,}634.1}\right) \\
&= 253.26 \text{ survivors}
\end{align*}$$

The standard deviation of the number of survivors is

$$\begin{align*}
\sqrt{400\,{}_{25}p_{60}\left(1 - {}_{25}p_{60}\right)} &= 9.639
\end{align*}$$

To ensure 86% funding, using the normal distribution table, we plan for

$$\begin{align*}
253.26 + 1.08(9.639) &= 263.67
\end{align*}$$

The initial fund must therefore be

$$\begin{align*}
F &= (264)(5000)\left(\frac{1}{1.05}\right)^{25} \\
&= 389{,}800.
\end{align*}$$

The answer is **E**.
