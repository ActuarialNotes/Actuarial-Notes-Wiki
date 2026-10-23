---
id: "faml-6-52"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:fcc535136b9e39d7e2df3463303da2d327a6637b0b744fc28dafdca4dc63fc37
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.52, p.91, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.52, p.61, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-52.md
---

For a fully discrete 10-payment whole life insurance of $H$ on (45), you are given:

(i) Expenses payable at the beginning of each year are as follows:

| Expense Type | First Year | Years 2-10 | Years 11+ |
|---|---|---|---|
| Per policy | 100 | 20 | 10 |
| % of Premium | 105% | 5% | 0% |

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) The gross annual premium, calculated using the equivalence principle, is of the form $G = gH + f$, where $g$ is the premium rate per 1 of insurance and $f$ is the per policy fee

Calculate $f$.

[A modified version of Question 11 on the Spring 2017 exam]

- A) 42.00
- B) 44.20
- C) 46.40
- D) 48.60
- E) 50.80

## Explanation

$$G\ddot{a}_{45:\overline{10}|} = HA_{45} + G + 0.05G\ddot{a}_{45:\overline{10}|} + 80 + 10\ddot{a}_{45} + 10\ddot{a}_{45:\overline{10}|}$$

$$\begin{align*}
G &= \frac{HA_{45} + 80 + 10\left(\ddot{a}_{45} + \ddot{a}_{45:\overline{10}|}\right)}{0.95\ddot{a}_{45:\overline{10}|} - 1} \\
G &= \frac{HA_{45} + 80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1} \\
G &= \frac{A_{45}}{(0.95 \times 8.0751) - 1}H + \frac{80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1}
\end{align*}$$

$$g = \frac{A_{45}}{(0.95 \times 8.0751) - 1}$$

$$\begin{align*}
f &= \frac{80 + 10(17.8162 + 8.0751)}{(0.95 \times 8.0751) - 1} \\
&= 50.80
\end{align*}$$

The answer is **E**.
