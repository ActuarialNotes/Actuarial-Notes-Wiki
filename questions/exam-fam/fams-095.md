---
id: "fams-095"
exam: "Exam FAM"
topic: "Trend"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Trend
  - Concepts/Loss+Trend
  - Concepts/Loss+Cost
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b122121b83bf7edcedfac3b8e9fa79bcb2a41d51c2cc3e9be64b0cd4f6adb208
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q95, p.77, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q95, p.37, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-095.md
---

You use the following information to calculate projected loss costs:

(i) Based on historical experience, the slope of the straight line fitted to the natural log of the loss cost is 0.182.

(ii) The loss cost per unit exposure for the two most recent experience periods is:

| Accident Year | Loss Cost per Unit Exposure |
|---|---|
| AY3 | 400 |
| AY4 | 450 |

(iii) The current experience period is weighted 90% and the prior experience period is weighted 10%.

New rates for one-year policies take effect May 1, CY5 and are in effect for one year.

Calculate the projected loss cost for these new rates.

- A) 527
- B) 577
- C) 615
- D) 632
- E) 666

## Explanation

The midpoint of AY3 is July 1, AY3, the midpoint of AY4 is July 1, AY4, and May 1, AY6 is the midpoint of the effective period.

AY3 lost cost (as printed) projected to May 1, AY6 is

$$\begin{align*}
&400\exp(0.182 \times 2.8333) \\
&= 669.90
\end{align*}$$

AY4 lost cost (as printed) projected to May 1, AY6 is

$$\begin{align*}
&450\exp(0.182 \times 1.8333) \\
&= 628.23
\end{align*}$$

$$\begin{align*}
\text{Projected loss cost} &= (0.9)(628.23) + (0.1)(669.90) \\
&= 632.40
\end{align*}$$

The answer is **D**.
