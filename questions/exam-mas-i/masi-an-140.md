---
id: "masi-an-140"
exam: "Exam MAS-I"
topic: "Correlation"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Correlation
  - Concepts/Scatter+Plot
  - Concepts/Outlier
  - Concepts/R-Squared
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4ac2f810ed62c778261afae69039fdbf77c7518a94bab1159987d84cff5f9287
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-140.md
---

For six commercial auto fleets, an analyst records the number of vehicles $x$ and the loss cost per vehicle $y$ (in hundreds):

| Fleet | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Vehicles $x$ | 1 | 2 | 3 | 4 | 5 | 20 |
| Loss cost $y$ | 4.1 | 3.8 | 4.4 | 3.9 | 4.2 | 9.0 |

The sample correlation of the six pairs is $r = 0.979$.

Which conclusion is best supported?

- A) Loss cost rises steadily with fleet size across the whole range of the data
- B) Fleet 6 has a large residual from the fitted line and should be removed as an outlier
- C) The high $r$ rests on fleet 6 alone; among the other five fleets, loss cost barely moves
- D) Since $r^2 = 0.96$, fleet size explains 96% of the variation in loss cost at every fleet size
- E) Since $r$ is near 1, adding vehicles to a fleet causes its loss cost per vehicle to rise

## Explanation

Look at the points before trusting the number. Fleets 1 to 5 have loss costs between 3.8 and 4.4 with no trend: their own correlation is

$$
r_{1\text{–}5} = 0.199
$$

and their least squares slope is 0.03 per vehicle. Fleet 6 sits far beyond them in $x$ (20 vehicles against 1 to 5) and far above them in $y$. With only six points, that one point makes the cloud look like a line, so $r = 0.979$ describes "one point far from five" rather than a steady trend. The answer is **C**.

**Why not the others**

- **A** — there are no data between 5 and 20 vehicles, and within 1 to 5 there is no trend. "Steadily across the range" is exactly what the data cannot show.
- **B** — fleet 6 is a **high-leverage** point, not a large-residual one. Because it pulls the line through itself, its residual from the six-point fit is small (about 0.15, smaller than fleet 1's 0.55). It should be investigated because it controls the fit, not deleted because it is far from the line.
- **D** — $r^2$ is one summary for the whole data set. It says nothing about the fit within any part of the range, and among fleets 1 to 5 the line explains almost nothing.
- **E** — correlation measures linear association, not causation; and here even the association rests on a single fleet.
