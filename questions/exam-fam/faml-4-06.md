---
id: "faml-4-06"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Mortality
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4b8e8ecc54ede04dcf9553065826de85767e9c1e331de56a8d0eba4abac20e53
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.6, p.29 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.6, p.20 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-06.md
---

For a 3-year term insurance of 1000 on (70), you are given:

(i) $q^{SULT}_{70+k}$ is the mortality rate from the Standard Ultimate Life Table, for $k = 0, 1, 2$

(ii) $q_{70+k}$ is the mortality rate used to price this insurance, for $k = 0, 1, 2$

(iii) $q_{70+k} = (0.95)^{k}\,q^{SULT}_{70+k}$, for $k = 0, 1, 2$

(iv) $i = 0.05$

Calculate the single net premium.

[A modified version of Question 13 on the Fall 2013 exam]

- A) 29.05
- B) 29.85
- C) 30.65
- D) 31.45
- E) 32.25

## Explanation

| Time | Age | $q^{SULT}_{x}$ | Improvement factor | $q_{x}$ |
|---|---|---|---|---|
| 0 | 70 | 0.010413 | 100.00% | 0.010413 |
| 1 | 71 | 0.011670 | 95.00% | 0.011087 |
| 2 | 72 | 0.013081 | 90.25% | 0.011806 |

$$\begin{align*}
v &= 1/1.05 \\
&= 0.952381
\end{align*}$$

$$\begin{align*}
EPV &= 1{,}000[0.010413v + 0.989587(0.011087)v^{2} + 0.989587(0.988913)(0.011806)v^{3}] \\
&= 29.85
\end{align*}$$

The answer is **B**.
