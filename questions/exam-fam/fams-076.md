---
id: "fams-076"
exam: "Exam FAM"
topic: "Loss Trend"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Trend
  - Concepts/Exponential+Trend
  - Concepts/Trend
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:726c2843fd8ed303cb06a88ae62d42b79c3b4a9742e5cd67bb89db41386380e1
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q76, p.61, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q76, p.31, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-076.md
---

Company XYZ sells homeowners insurance policies. You are given:

i) The loss costs by accident year are:

| Accident Year | Loss Cost |
|---|---|
| AY1 | 1300 |
| AY2 | 1150 |
| AY3 | 1550 |
| AY4 | 1800 |

ii) The slope of the straight line fitted to the natural log of the loss costs is 0.1275.

iii) AY4 experience is weighted 80% and AY3 experience is weighted 20% for rate development.

New rates take effect November 1, CY5 for one-year policies and will be in effect for one year.

Calculate the expected loss cost for these new rates.

- A) 2124
- B) 2217
- C) 2264
- D) 2381
- E) 2413

## Explanation

Policies sold from November 1, CY5 to November 1, CY6 will be in effect through November 1, CY7 and thus have an average accident date of November 1, CY6. For losses in AY4 the projection is 2.333 years and the projected cost is

$$\begin{align*}
&1800e^{0.1275(2.333)} \\
&= 2423.58.
\end{align*}$$

For losses in AY3 the projection is 3.333 years and the projected cost is

$$\begin{align*}
&1550e^{0.1275(3.333)} \\
&= 2370.76.
\end{align*}$$

The projected loss cost is the weighted average,

$$\begin{align*}
&(0.8)(2423.58) + (0.2)(2370.76) \\
&= 2413.02 \\
&= 2413.
\end{align*}$$

The answer is **E**.
