---
id: "masi-an-124"
exam: "Exam MAS-I"
topic: "QQ Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/QQ+Plot
  - Concepts/Deviance+Residual
  - Concepts/Model+Fit
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4a26797854b926b600cc4f793fc85d3ebca0c0d341b09dd5375d5b2ba2facd32
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-124.md
---

Five severity GLMs are each checked with a QQ plot of their deviance residuals. In every plot the **sample** quantiles are on the vertical axis, the theoretical quantiles on the horizontal axis, and a straight reference line is drawn. Match each description to the conclusion it supports. An option may be used more than once or not at all.

## Part a (1 point)
The lowest points fall below the reference line, the highest points rise above it, and the middle follows the line.

- A) Residuals consistent with the assumed distribution
- B) Heavier tails than assumed at both ends
- C) Lighter tails than assumed at both ends
- D) Right tail heavier than assumed (more right-skewed)
- E) Left tail heavier than assumed (more left-skewed)

### Answer
B

### Explanation
At the low end the sample quantiles are *more negative* than the theoretical ones, and at the high end *more positive*: the residuals are spread further out in both directions than the assumed distribution allows, so both tails are heavier. **C** reverses the reading, and **D**/**E** each describe only one end.

## Part b (1 point)
The lowest points lie on the reference line; the highest points rise well above it.

- A) Residuals consistent with the assumed distribution
- B) Heavier tails than assumed at both ends
- C) Lighter tails than assumed at both ends
- D) Right tail heavier than assumed (more right-skewed)
- E) Left tail heavier than assumed (more left-skewed)

### Answer
D

### Explanation
Only the upper end departs, and upward: the largest residuals are larger than the model expects. The claims are more right-skewed than the assumed distribution captures (for a gamma model, an inverse Gaussian is the natural next try). **B** would need the lower end to bend down as well.

## Part c (1 point)
The points follow the reference line closely from end to end, with small random wiggles.

- A) Residuals consistent with the assumed distribution
- B) Heavier tails than assumed at both ends
- C) Lighter tails than assumed at both ends
- D) Right tail heavier than assumed (more right-skewed)
- E) Left tail heavier than assumed (more left-skewed)

### Answer
A

### Explanation
Sample and theoretical quantiles agree throughout, which is what a QQ plot of deviance residuals from a correctly specified continuous model should look like. Small wiggles are sampling noise, not a systematic departure.

## Part d (1 point)
The highest points lie on the reference line; the lowest points fall well below it.

- A) Residuals consistent with the assumed distribution
- B) Heavier tails than assumed at both ends
- C) Lighter tails than assumed at both ends
- D) Right tail heavier than assumed (more right-skewed)
- E) Left tail heavier than assumed (more left-skewed)

### Answer
E

### Explanation
Only the lower end departs: the smallest residuals are more negative than the model expects, so the left tail is heavier than assumed. Reading "below the line" as "lighter" (**C**) forgets that, at the lower end, below the line means *further* from the centre.

## Part e (1 point)
The lowest points sit above the reference line, the highest points sit below it, and the middle follows the line.

- A) Residuals consistent with the assumed distribution
- B) Heavier tails than assumed at both ends
- C) Lighter tails than assumed at both ends
- D) Right tail heavier than assumed (more right-skewed)
- E) Left tail heavier than assumed (more left-skewed)

### Answer
C

### Explanation
Both ends are pulled toward the centre: the extreme residuals are less extreme than the assumed distribution predicts, so both tails are lighter (shorter). This is the mirror image of part a, and the two are told apart only by the *direction* of the departure at each end — both can bend the middle into an S-like shape.
