---
id: "masi-an-138"
exam: "Exam MAS-I"
topic: "Scatter Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Scatter+Plot
  - Concepts/Heteroscedasticity
  - Concepts/Model+Structure
  - Concepts/Categorical+Predictor
  - Concepts/Outlier
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7df5d30bc1f72626aa57a52895f11ff4ca662b82fd75ee16e079ebeef44bc37c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-138.md
---

Five scatter plots each show a response against a continuous predictor $x$ before any model is fitted. Match each description to what it most directly indicates for the model. An option may be used more than once or not at all.

## Part a (1 point)
The points are centred along a rising straight line, tightly packed at low $x$ and spreading into a wide band at high $x$, like a wedge.

- A) Needs a transformation or non-linear term
- B) Variance grows with the mean
- C) High-leverage point to investigate
- D) Little or no association
- E) A categorical variable is missing

### Answer
B

### Explanation
The centre of the cloud follows a straight line, so the *mean* is linear in $x$; what changes is the *spread*, which widens as the mean rises. That is non-constant variance increasing with the mean, the pattern a gamma GLM (variance proportional to $\mu^2$) handles and ordinary least squares does not. **A** would need the centre itself to bend.

## Part b (1 point)
The points form a narrow band that rises steeply at low $x$ and flattens out at high $x$.

- A) Needs a transformation or non-linear term
- B) Variance grows with the mean
- C) High-leverage point to investigate
- D) Little or no association
- E) A categorical variable is missing

### Answer
A

### Explanation
The band is narrow (constant spread) but its centre bends: the response's relationship with $x$ is curved, not linear. A transformation such as $\ln x$, a polynomial, or banding $x$ would capture the shape; a single linear term would over-predict at one end and under-predict in the middle. **B** concerns the spread, which is not changing here.

## Part c (1 point)
Two parallel bands of points each rise with $x$, one sitting well above the other, with few points between them.

- A) Needs a transformation or non-linear term
- B) Variance grows with the mean
- C) High-leverage point to investigate
- D) Little or no association
- E) A categorical variable is missing

### Answer
E

### Explanation
Two separate, parallel bands mean two groups of observations with the same slope but different levels — for example two vehicle types or two territories mixed in one plot. Adding the grouping variable as a categorical predictor shifts the intercept for one group. **A** treats it as a curve, but neither band bends.

## Part d (1 point)
The points form a round, shapeless cloud, with no trend in either the centre or the spread across $x$.

- A) Needs a transformation or non-linear term
- B) Variance grows with the mean
- C) High-leverage point to investigate
- D) Little or no association
- E) A categorical variable is missing

### Answer
D

### Explanation
Neither the location nor the spread of the response changes with $x$, so the plot shows no association of any shape. (A correlation near zero alone could hide a curve; here the plot itself shows there is none.)

## Part e (1 point)
The points follow a straight rising line closely, except one point whose $x$ is far beyond all the others; it sits well below where the line through the rest would reach.

- A) Needs a transformation or non-linear term
- B) Variance grows with the mean
- C) High-leverage point to investigate
- D) Little or no association
- E) A categorical variable is missing

### Answer
C

### Explanation
A point far out in $x$ has high leverage: on its own it can pull the fitted line toward itself, so the slope fitted with it may differ a lot from the slope the rest of the data support. It should be checked (data error? a different kind of risk?) before it is left to drive the fit. It is the combination of an extreme $x$ and a departure from the trend that makes it influential.
