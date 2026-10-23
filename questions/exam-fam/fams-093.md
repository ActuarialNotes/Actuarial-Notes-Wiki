---
id: "fams-093"
exam: "Exam FAM"
topic: "Expected Loss Method"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Expected+Loss+Method
  - Concepts/Loss+Reserving
  - Concepts/Unpaid+Claims
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:059d7f655f0b197b92b597978214739a6d8285f6534ce5506b99ecc430b89705
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q93, p.75, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q93, p.36, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-093.md
---

You are given the following information on losses paid for each of AY1 through AY4:

| | | | Incremental Loss Payments through Development Year | | | |
|---|---|---|---|---|---|---|
| Accident Year | Earned Premium | Expected Loss Ratio | 0 | 1 | 2 | 3 |
| AY1 | 35,500 | 0.71 | 10,500 | 7,500 | 4,800 | 1,340 |
| AY2 | 31,200 | 0.73 | 13,050 | 5,025 | 1,400 | |
| AY3 | $X$ | 0.75 | 12,500 | 7,250 | | |
| AY4 | $X + 5{,}000$ | 0.75 | 18,400 | | | |

The estimated loss reserve using the expected loss ratio method is 43,412.

Calculate $X$.

- A) 48,964
- B) 49,674
- C) 51,875
- D) 52,174
- E) 54,785

## Explanation

| Accident Year | Expected Ultimate Loss | Cumulative Paid-to-date | Reserve |
|---|---|---|---|
| AY1 | $35{,}500 \times 0.71 = 25{,}205$ | 24,140 | 1065 |
| AY2 | $31{,}200 \times 0.73 = 22{,}776$ | 19,475 | 3301 |
| AY3 | $0.75X$ | 19,750 | $0.75X - 19{,}750$ |
| AY4 | $0.75(X + 5000)$ | 18,400 | $0.75(X + 5000) - 18{,}400$ |

$$\begin{align*}
43{,}412 &= 1065 + 3301 + 0.75X - 19{,}750 + 0.75(X + 5000) - 18{,}400 \\
\Rightarrow X &= 48{,}964
\end{align*}$$

The answer is **A**.
