---
id: "faml-7-40"
exam: "Exam FAM"
topic: "Modified Net Premium Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Modified+Net+Premium+Policy+Value
  - Concepts/Whole+Life+Insurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a2cd7fbb18eb150517ecb37b06575fb0b2d4cad54649d77af541e68226d1461
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.40, p.125, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.40, p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-40.md
---

For a fully discrete whole life insurance of 1000 on (60), you are given:

i) Reserves are determined using a modified net premium reserve method

ii) The modified reserve at the end of year 2 is 0

iii) Valuation premiums in years 3 and later are level

iv) Mortality follows the Standard Ultimate Life Table

v) $i = 0.05$

Calculate the modified net premium reserve at the end of year 5.

[Question on October 2022 FAM-L Exam]

- A) 58
- B) 69
- C) 79
- D) 90
- E) 99

## Explanation

The policy value at duration 2 is

$${}_{2}V^{\text{mod}} = 1000A_{62} - (P^{\text{mod}})(\ddot{a}_{62}) = 0$$

$$\begin{align*}
P^{\text{mod}} &= 1000A_{62}/\ddot{a}_{62} \\
&= 1000(0.31495)/14.3861 \\
&= 21.89
\end{align*}$$

$$\begin{align*}
{}_{5}V^{\text{mod}} &= 1000A_{65} - (P^{\text{mod}})(\ddot{a}_{65}) \\
&= 1000(0.35477) - 21.89(13.5498) \\
&= 58
\end{align*}$$

The answer is **A**.
