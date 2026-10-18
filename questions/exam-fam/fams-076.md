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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:726c2843fd8ed303cb06a88ae62d42b79c3b4a9742e5cd67bb89db41386380e1
  sources: []
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
