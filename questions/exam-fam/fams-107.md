---
id: "fams-107"
exam: "Exam FAM"
topic: "Overall Rate Level Indication"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Overall+Rate+Level+Indication
  - Concepts/Loss+Ratio+Method
  - Concepts/Trend
  - Concepts/Variable+Expenses
  - Concepts/Ratemaking
  - Concepts/Profit+and+Contingency+Provision
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:914cd68b960840c054eb4977d80072c1bcacb83d87831e4259151cc89d284a18
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q107, p.89, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q107, p.42-43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-107.md
---

You are given the following information to calculate a new average rate, which will be in effect for one year:

(i) The current average rate is 300, which includes an allowance for the following variable expenses:

| | |
|---|---|
| Commissions | 10% |
| General Expenses | 12% |
| Taxes | 2% |
| Profit and Contingencies | 5% |
| TOTAL | 29% |

(ii) The indicated rate change uses two years of data, weighted as shown:

| Accident Year | Earned Premium at Current Rates | Ultimate Loss and ALAE | Weight |
|---|---|---|---|
| AY1 | 300,000 | 190,000 | 0.4 |
| AY2 | 330,000 | 230,000 | 0.6 |

(iii) Annual effective loss trend: 5%

(iv) Effective date of the new rate (one-year policies): October 1, CY3

(v) New legislation, also effective October 1, CY3, mandates that commissions be a fixed rate of 30 per exposure, which gets loaded for general expenses, taxes, and profit and contingencies.

Calculate the new average rate that combines the indicated rate change and new mandated commission level.

- A) 313
- B) 316
- C) 320
- D) 323
- E) 327

## Explanation

Midpoint of experience period is July 1 of each AY, and midpoint of effective period is October 1, CY4 (e.g., 2.25 years for AY2).

| Accident Year | EP at Current Rates | Ult. Loss & ALAE | Trend Factor | Trended Ult Loss & ALAE | Loss & ALAE Ratio | Weight |
|---|---|---|---|---|---|---|
| AY1 | 300,000 | 190,000 | $1.05^{3.25} = 1.17183$ | 222,648 | 0.74216 | 0.4 |
| AY2 | 330,000 | 230,000 | $1.05^{2.25} = 1.11603$ | 256,687 | 0.77784 | 0.6 |

$$\begin{align*}
\text{Weighted Ratio} &= 0.74216 \times 0.4 + 0.77784 \times 0.6 \\
&= 0.76357
\end{align*}$$

$$\begin{align*}
\text{The new variable expenses + profit (excludes commission)} &= 0.12 + 0.02 + 0.05 \\
&= 0.19
\end{align*}$$

New commission provision (as a fixed expense ratio to premium) $= 30/300$

$$\begin{align*}
\text{Indicated Rate Change Factor} &= \frac{0.76357 + \dfrac{30}{300}}{1 - 0.19} \\
&= 1.066136
\end{align*}$$

$$\begin{align*}
\text{New Rate} &= 300(1.066136) \\
&= 319.84
\end{align*}$$

The answer is **C**.
