---
id: "discda-an-026"
exam: "Exam DISC-DA"
topic: "Exploratory Data Analysis"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Exploratory+Data+Analysis
  - Concepts/Exploratory+Data+Visualization
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:91e2a830f02a2865a648559ad8dab2b8bc10177b511b33bea338b48ff7192ee0
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.1 EDA cycle; data quality checked even with set questions; §10.2 variation within variables; §10.3.2 outliers, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.11 Communication, §11.1 exploratory vs communication plots, sha256:0756a2408a456cd5dc71f64d18a17f636dd57cfea2a817568f38689421eab088 — https://r4ds.hadley.nz/communication.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-026.md
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
