---
id: "fams-064"
exam: "Exam FAM"
topic: "Deductible"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Deductible
  - Concepts/Grouped+Data
  - Concepts/Loss+Elimination+Ratio
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a14c72268baf5cb1a6537e919375a0d0fe51bcd22a009c3a6db666a9cbd52942
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q64, p.52, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q64, p.28, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-064.md
---

You are given the following loss data:

| Size of Loss | Number of Claims | Ground-Up Total Losses |
|---|---|---|
| 0 – 99 | 1100 | 58,500 |
| 100 – 249 | 400 | 70,000 |
| 250 – 499 | 300 | 120,000 |
| 500 – 999 | 200 | 150,000 |
| > 999 | 100 | 200,000 |
| **Total** | **2100** | **598,500** |

Calculate the percentage reduction in loss costs by moving from a 100 deductible to a 250 deductible.

- A) 25%
- B) 27%
- C) 29%
- D) 31%
- E) 33%

## Explanation

With no deductible, the loss cost is proportional to 598,500.

With a 100 deductible it is proportional (in the same proportion) to

$$\begin{align*}
&598{,}500 - 58{,}500 - 1000(100) \\
&= 440{,}000.
\end{align*}$$

With a 250 deductible it is

$$\begin{align*}
&598{,}500 - 58{,}500 - 70{,}000 - 600(250) \\
&= 320{,}000.
\end{align*}$$

The reduction is $120{,}000/440{,}000 = 0.273 = 27\%$.

The answer is **B**.
