---
id: "pa-an-013"
exam: "Exam PA"
topic: "Univariate Plot"
learning_objective: "Data Exploration and Visualization"
difficulty: medium
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Univariate+Plot
  - Concepts/Histogram
  - Concepts/QQ+Plot
points: 4
---

Before fitting frequency and severity models, an actuary plots each variable on its own. Match each check to the univariate plot best suited to it. An option may be used more than once or not at all.

## Part a (1 point)
Claim severity is positive and right-skewed. Check whether its distribution has a second mode.

- A) Histogram
- B) Box plot
- C) Bar chart with one bar per value
- D) Bar chart of exposure by level
- E) QQ plot

### Answer
A

### Explanation
A histogram shows the shape of a continuous distribution, including skewness and a second mode (often clearer on the log scale for a skewed severity). A box plot (**B**) shows only the median, quartiles and outliers, so two modes are invisible in it.

## Part b (1 point)
Claims per policy in the year, which is 0 for 94% of policies. Check the share of zeros and the shape of the tail.

- A) Histogram
- B) Box plot
- C) Bar chart with one bar per value
- D) Bar chart of exposure by level
- E) QQ plot

### Answer
C

### Explanation
A claim count is a discrete count, so a bar chart with one bar per value shows how often each count occurs. A histogram (**A**) of a count that is mostly zero shows one tall bar, and bins that do not line up with the integers leave gaps.

## Part c (1 point)
Vehicle make, with 45 levels. Find the makes with too little data to estimate a reliable effect.

- A) Histogram
- B) Box plot
- C) Bar chart with one bar per value
- D) Bar chart of exposure by level
- E) QQ plot

### Answer
D

### Explanation
Vehicle make is categorical, and a bar chart of exposure by level is its univariate plot. A level with little exposure will have an imprecisely estimated coefficient. A bar chart of claim counts per value (**C**) is for a numeric count, and it would not show how much exposure stands behind each make.

## Part d (1 point)
The logarithm of claim severity. Check whether it is close to normal before a lognormal severity is assumed.

- A) Histogram
- B) Box plot
- C) Bar chart with one bar per value
- D) Bar chart of exposure by level
- E) QQ plot

### Answer
E

### Explanation
A QQ plot shows whether a continuous variable follows an assumed distribution: the points lie near a straight line when it does. A histogram (**A**) shows the shape but makes it hard to judge departures from a particular distribution, especially in the tails.
