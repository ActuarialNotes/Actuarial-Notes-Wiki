---
id: "discda-an-026"
exam: "Exam DISC-DA"
topic: "Exploratory Data Analysis"
learning_objective: "Analyzing Data With Visualizations"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Exploratory+Data+Analysis
  - Concepts/Exploratory+Data+Visualization
answer: "C"
points: 1
---

An analyst receives a new commercial property claims file for a severity study, with paid amount, cause of loss, construction class and state. Which first step fits exploratory data analysis?

- A) Fit a gamma GLM with every field and read its coefficients
- B) Build a polished chart of average severity by state for management
- C) Plot each variable's distribution and check its values against expectations
- D) Remove all claims more than three standard deviations above the mean

## Explanation

EDA starts by asking what variation occurs within each variable: its typical values, rare values and unusual values. Plotting each distribution (a histogram of paid amount, bar charts of the categorical fields) and checking whether the values meet expectations also checks the data's quality before anything is built on it. The answer is **C**.

**Why not the others**

- **A** — a model is fitted after exploration has shown the data's shape and problems; fitting first assumes what EDA is meant to check.
- **B** — a polished chart for management is a presentation graphic for findings already made.
- **D** — a fixed removal rule deletes extreme values before anyone has looked at them, so genuine large claims would be lost along with any errors.
