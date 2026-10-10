---
id: "discda-an-004"
exam: "Exam DISC-DA"
topic: "Data Types"
learning_objective: "Planning an Insurer Data Modeling Project"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Data+Types
answer: "C"
points: 1
---

A commercial auto file stores each vehicle's class as a four-digit integer taken from a class table, such as 2111, 3141 and 7398. A modeler plans to enter `class_code` in a GLM as a single numeric predictor. How should the field be classified?

- A) As continuous numeric, so one slope across the code values is appropriate
- B) As ordinal, so its levels can be coded in numeric order with equal steps
- C) As nominal categorical, so it enters as a set of levels rather than a slope
- D) As a discrete count, so it should be modelled with a count distribution

## Explanation

A class code is a **label**: the number identifies a class in a table, and the order and spacing of the codes mean nothing about risk. Storage type is not statistical type, so the field is **nominal categorical** and must be declared as such (a factor in R, a category in pandas), entering the model as one indicator per level. The answer is **C**.

**Why not the others**

- **A** — one slope would assume that class 7398 differs from class 2111 by 5,287 equal steps, a trend imposed by whoever numbered the classes.
- **B** — an ordinal variable has levels with a meaningful order, such as credit tiers. Code numbers have none, and even an ordinal variable's steps need not be equal.
- **D** — a count is a number of events, such as claims. A code counts nothing.
