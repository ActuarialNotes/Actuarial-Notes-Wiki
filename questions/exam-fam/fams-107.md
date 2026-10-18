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
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:141b59fb79c9a46d27c6dcd449e0f4bfb65aab4176d4e7d63c85bf4c1bef0b6c
  sources: []
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
