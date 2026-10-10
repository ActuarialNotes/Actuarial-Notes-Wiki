---
id: "masi-an-129"
exam: "Exam MAS-I"
topic: "Exploratory Data Analysis"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multi-part
bloom: understand
wiki_link:
  - Concepts/Exploratory+Data+Analysis
  - Concepts/Histogram
  - Concepts/Box+Plot
  - Concepts/Scatter+Plot
  - Concepts/Correlation
  - Concepts/Univariate+Plot
  - Concepts/Categorical+Predictor
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:beefb3146dd9b0d8f768ce7ef89e1bcbf7006d6186f209b7d139c56250f1660f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-129.md
---

Before fitting a severity GLM to a personal auto data set, an actuary plans one exploratory display for each task below. Match each task to the display that answers it most directly. An option may be used more than once or not at all.

## Part a (1 point)
Insured value (continuous): see whether claim severity changes with it in a straight-line way or along a curve.

- A) Histogram of the log of the variable
- B) Bar chart of exposure by level
- C) Scatter plot against the response
- D) Side-by-side box plots of the response by level
- E) Correlation matrix

### Answer
C

### Explanation
Relating two continuous variables is a scatter plot's job: its form (straight or curved), direction and spread are read straight off it. A histogram (**A**) shows one variable alone, and a correlation (**E**) summarises only the *linear* part of a relationship, so it can miss a curve.

## Part b (1 point)
Territory (40 levels): find levels with too little data to support their own coefficient.

- A) Histogram of the log of the variable
- B) Bar chart of exposure by level
- C) Scatter plot against the response
- D) Side-by-side box plots of the response by level
- E) Correlation matrix

### Answer
B

### Explanation
The question is about the variable itself, one level at a time: how much exposure each level has. A bar chart of exposure by level is the univariate plot of a categorical variable and shows thin levels at a glance. Box plots of the response (**D**) show how the response differs by level, not how much data stands behind each box.

## Part c (1 point)
Five continuous predictors: screen for pairs that move together closely enough to cause trouble in the fit.

- A) Histogram of the log of the variable
- B) Bar chart of exposure by level
- C) Scatter plot against the response
- D) Side-by-side box plots of the response by level
- E) Correlation matrix

### Answer
E

### Explanation
A correlation matrix gives every pair's correlation in one table, the standard screen for pairs of strongly linearly related predictors. It looks only at pairs, so collinearity among three or more predictors needs another check, but it answers this task.

## Part d (1 point)
Claim severity (positive, heavily right-skewed): see the shape of its distribution clearly.

- A) Histogram of the log of the variable
- B) Bar chart of exposure by level
- C) Scatter plot against the response
- D) Side-by-side box plots of the response by level
- E) Correlation matrix

### Answer
A

### Explanation
Shape is a histogram's job; on the raw scale a heavily skewed variable is one tall bar and a long, nearly empty tail, so taking logs first spreads the bulk of the data out. A box plot (**D**) shows quartiles and outliers but cannot show the shape between them, such as a second mode.

## Part e (1 point)
Vehicle class (6 levels): see whether claim severity differs by class.

- A) Histogram of the log of the variable
- B) Bar chart of exposure by level
- C) Scatter plot against the response
- D) Side-by-side box plots of the response by level
- E) Correlation matrix

### Answer
D

### Explanation
Comparing one continuous response across the levels of a categorical variable is what side-by-side box plots are for: one box per class shows each class's median, spread and outliers on the same scale. A bar chart of exposure (**B**) says how much data each class has, not whether severity differs.
