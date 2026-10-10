---
id: "masi-an-137"
exam: "Exam MAS-I"
topic: "Scatter Plot"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Scatter+Plot
  - Concepts/Correlation
  - Concepts/Model+Structure
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:790910f612fc8ca7fc78f1908a2397570faddebd16f5ecc05f8d138e5376d5d5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-137.md
---

A scatter plot of average collision severity against vehicle age (0 to 14 years) shows a tight, symmetric arch: severity climbs over the first six years, peaks around year 7, and then falls steadily, returning by age 14 to about the level it started from. The sample correlation between severity and vehicle age is $r = 0.05$.

What do the plot and the correlation together indicate?

- A) Severity depends strongly on vehicle age, but along a curve that the correlation does not measure
- B) Severity is nearly unrelated to vehicle age, so vehicle age can be left out of the severity model
- C) Severity rises slightly with vehicle age, so a small positive linear coefficient captures the effect
- D) Severity and vehicle age are independent, since a correlation near zero rules out any relationship
- E) The correlation must be in error, since a pattern this tight forces $|r|$ to be close to 1

## Explanation

The correlation coefficient measures only the strength of the **linear** association. A rise followed by a fall of similar size has almost no overall linear trend — the upward and downward halves cancel — so $r$ is near zero even though the plot shows severity determined closely by vehicle age. The relationship is strong and curved, so vehicle age belongs in the model with a non-linear form: bands, a quadratic, or a spline. The answer is **A**.

**Why not the others**

- **B** — treats $r \approx 0$ as "no relationship". The plot shows a strong one; dropping the variable on the strength of $r$ alone is the classic misreading.
- **C** — a positive $r$ of 0.05 summarises the cancelling halves of an arch; any straight line fitted to it would miss both the rise and the fall.
- **D** — zero correlation does not imply independence. Here severity is close to a function of vehicle age, the opposite of independence.
- **E** — tightness around a *curve* does not make $|r|$ large; $|r|$ is close to 1 only when the points lie close to a *straight line*.
