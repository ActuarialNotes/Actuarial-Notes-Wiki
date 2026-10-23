---
id: "faml-6-16"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Endowment+Insurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:43091a00cacbed8569078e5c13275946591241489ba35ad1e0fb417b0ac29a74
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.16, p.62, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.16, p.42, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-16.md
---

For a fully discrete 20-year endowment insurance of 100,000 on (30), you are given:

(i) $d = 0.05$

(ii) Expenses, payable at the beginning of each year, are:

| | First Year: Percent of Premium | First Year: Per Policy | Renewal Years: Percent of Premium | Renewal Years: Per Policy |
|---|---|---|---|---|
| Taxes | 4% | 0 | 4% | 0 |
| Sales Commission | 35% | 0 | 2% | 0 |
| Policy Maintenance | 0% | 250 | 0% | 50 |

(iii) The net premium is 2143

Calculate the gross premium using the equivalence principle.

[Question 10 on the Spring 2014 exam]

- A) 2410
- B) 2530
- C) 2800
- D) 3130
- E) 3280

## Explanation

$$\begin{align*}
P_{30:\overline{20}|} = \frac{1}{\ddot{a}_{30:\overline{20}|}} - d \Rightarrow \frac{2{,}143}{100{,}000} + 0.05 &= \frac{1}{\ddot{a}_{30:\overline{20}|}} \\
\Rightarrow \ddot{a}_{30:\overline{20}|} &= 14
\end{align*}$$

$$\begin{align*}
A_{30:\overline{20}|} &= 1 - d\,\ddot{a}_{30:\overline{20}|} \\
&= 1 - 0.05(14) \\
&= 0.3
\end{align*}$$

$$\begin{align*}
G\ddot{a}_{30:\overline{20}|} &= 100{,}000A_{30:\overline{20}|} + (200 + 50\ddot{a}_{30:\overline{20}|}) + (0.33G + 0.06G\,\ddot{a}_{30:\overline{20}|}) \\
14G &= 100{,}000(0.3) + [200 + 50(14)] + (0.33G + 0.84G) \\
12.83G &= 30{,}900 \\
G &= 2408
\end{align*}$$

The answer is **A**.
