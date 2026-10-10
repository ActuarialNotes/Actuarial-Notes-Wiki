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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:790910f612fc8ca7fc78f1908a2397570faddebd16f5ecc05f8d138e5376d5d5
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 Scatter Plot: Y vs X; linear or non-linear relationship, variation in Y changing with X, outliers, sha256:e5847cce6c0469fb68a2ad3ad38688f0753b680a308e09cf4c798f23b6bf57ac — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "Siegrist, Random, 'Sample Correlation and Regression', sample covariance s(x,y) with divisor n - 1 and sample correlation r = s(x,y)/(s(x)s(y)), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
