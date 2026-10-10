---
id: "masi-an-132"
exam: "Exam MAS-I"
topic: "Box Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Box+Plot
  - Concepts/Categorical+Predictor
  - Concepts/Exploratory+Data+Analysis
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e51d90bb473efbb5fd54f48a6ef95cd6b6d667112e8f24e8b002c777bd982002
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-132.md
---

Before modeling homeowners claim severity, an actuary draws side-by-side box plots by construction type. The boxes and whiskers (in thousands) are:

| Construction | Claims | Lower whisker | $Q_1$ | Median | $Q_3$ | Upper whisker | Outliers |
|---|---|---|---|---|---|---|---|
| Frame | 4,000 | 0.4 | 2.0 | 3.0 | 4.4 | 8.0 | 11.0, 15.0 |
| Masonry | 3,500 | 0.5 | 2.1 | 3.2 | 4.6 | 8.2 | 12.0 |
| Fire-resistive | 60 | 0.3 | 1.0 | 1.5 | 2.2 | 4.0 | 6.5 |

Which conclusion is best supported by the plots?

- A) Construction type can be dropped, since the three boxes overlap one another
- B) Frame needs a level of its own, since its outliers are the most severe claims
- C) Frame and masonry could share a level; fire-resistive looks lower but rests on few claims
- D) Fire-resistive is the most right-skewed class, since its whiskers are the shortest
- E) The classes differ only in spread, so construction belongs in the dispersion, not the mean

## Explanation

Compare the boxes, which hold the middle half of each class's claims:

- Frame (2.0 to 4.4, median 3.0) and masonry (2.1 to 4.6, median 3.2) are almost the same box. The data give no reason to charge them differently, so one shared level saves a parameter.
- Fire-resistive's box (1.0 to 2.2, median 1.5) sits mostly below the other two, and its median is half theirs: a real-looking difference in location.
- But fire-resistive has only 60 claims against thousands for the others, so its coefficient will be estimated imprecisely; the difference should be confirmed (standard error, or credibility) before it is priced at full value.

The answer is **C**.

**Why not the others**

- **A** — some overlap of boxes is not evidence of no difference; fire-resistive's median lies below the other boxes entirely. Overlap is a reason to *group* the two similar classes, not to drop the variable.
- **B** — outliers are individual large claims, a handful out of 4,000. Frame's median and box are slightly *below* masonry's; one or two extreme claims say little about the class's typical severity.
- **D** — short whiskers reflect a small scale (fire-resistive claims are smaller overall), not skewness. Skew shows as asymmetry *within* a class: here every class has a longer upper whisker than lower one.
- **E** — the medians differ (1.5 against about 3), so the classes differ in location, not only spread. In fact the spread grows with the median, as it would for a gamma response.
