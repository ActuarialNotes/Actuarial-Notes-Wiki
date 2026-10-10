---
id: "masi-an-133"
exam: "Exam MAS-I"
topic: "Univariate Plot"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Univariate+Plot
  - Concepts/Data+Types
  - Concepts/Box+Plot
  - Concepts/Histogram
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4afced5fe526f315e8a0e20a57e745a8851da4b8ceda4508c2392596eb58c893
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-133.md
---

A data set of 80,000 auto policies records each policy's number of claims in the year. The variable takes only the values 0 to 5, and 88% of policies have no claim. Before fitting a frequency model, the actuary wants one univariate display of this variable that shows how often each value occurs.

Which display serves that purpose best?

- A) A histogram with 20 equal-width bins over the interval from 0 to 5
- B) A box plot, with outliers flagged at 1.5 times the IQR beyond the box
- C) A normal QQ plot of the claim counts against standard normal quantiles
- D) A scatter plot of each policy's claim count against its policy number
- E) A bar chart of the number of policies with 0, 1, 2, 3, 4 and 5 claims

## Explanation

Claim count is a **discrete** variable with six possible values. Its distribution is fully described by how many policies take each value, and a bar chart with one bar per value shows exactly that: the share of zeros, how fast the counts fall off, and whether the tail is longer than a Poisson would give. The answer is **E**.

**Why not the others**

- **A** — bins of width 0.25 split the line between integers, so most bins are empty and the picture depends on where the bin edges fall relative to the integers. A display for a discrete variable should have one bar per value.
- **B** — with 88% zeros, $Q_1$, the median and $Q_3$ are all 0. The box collapses to a line at zero, the IQR is 0, and every policy with a claim is flagged as an "outlier" — the plot hides the very counts the actuary wants.
- **C** — a QQ plot compares a distribution with a reference one. Against the normal, six repeated values give flat steps, which only confirms that counts are not normal and says nothing readable about how often each value occurs.
- **D** — policy number is an arbitrary label, so this plot shows nothing about the distribution; at 80,000 points it is also a solid band.
