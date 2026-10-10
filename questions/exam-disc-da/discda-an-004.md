---
id: "discda-an-004"
exam: "Exam DISC-DA"
topic: "Data Types"
learning_objective: "1. Planning an Insurer Data Modeling Project"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Data+Types
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c8292ba49fde9c2cb25ccc773efb7ced7cd1bde27fb35fcacc0732a1a062d305
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 Levels of Measurement (nominal: few operations make sense even if numbers are used; ordinal: only order meaningful), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 cylinders stored numeric but treated as qualitative via as.factor, PDF p.61; §3.3.1 dummy variables for qualitative predictors, PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-004.md
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
