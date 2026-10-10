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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:beefb3146dd9b0d8f768ce7ef89e1bcbf7006d6186f209b7d139c56250f1660f
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 Scatter Plot: Y vs X; linear or non-linear relationship, variation in Y changing with X, outliers, sha256:e5847cce6c0469fb68a2ad3ad38688f0753b680a308e09cf4c798f23b6bf57ac — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.14 Histogram: shape of the distribution; relative histogram normalized as a density, sha256:8505d865ba5c787e3179e903ad98276d05386fab18449eb3b554d12b271b58d5 — https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.7 Box Plot: location and variation changes between groups of data, sha256:a1986bcca8825c7e7755b3e309fbfe62b7f12017e6402a6c22b71f65d3b3516a — https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.9 Correlation Among Predictors, PDF p.37 (the GLM sorts out each variable's unique effect from correlated variables; two-way correlation tables before modeling), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
