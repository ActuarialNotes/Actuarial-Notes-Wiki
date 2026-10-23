---
id: "faml-4-19"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Mortality
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4135450b00f75c1975928a51a737f04e2f1d45a19261192cb43f9bf3b5c329d8
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.19, p.39 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.19, p.26 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-19.md
---

(80) purchases a whole life insurance policy of 100,000.

You are given:

(i) The policy is priced with a select period of one year

(ii) The select mortality rate equals 80% of the mortality rate from the Standard Ultimate Life Table

(iii) Ultimate mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the actuarial present value of the death benefits for this insurance

[A modified version of Question 5 on the Fall 2017 exam]

- A) 58,950
- B) 59,050
- C) 59,150
- D) 59,250
- E) 59,350

## Explanation

Superscript SULT refers to values from the SULT. Values without superscripts refer to this select life.

$$\begin{align*}
q_{80} &= 0.8q^{SULT}_{80} \\
&= 0.0261264 \\
\Rightarrow p_{80} &= 0.9738736
\end{align*}$$

$$\begin{align*}
A_{80} &= vq_{80} + vp_{80}A^{SULT}_{81} \\
&= (1.05)^{-1}(0.0261264) + (1.05)^{-1}(0.9738736)(0.60984) \\
&= 0.59051 \\
100{,}000A_{80} &= 59{,}051
\end{align*}$$

The answer is **B**.
