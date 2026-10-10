---
id: "discda-an-031"
exam: "Exam DISC-DA"
topic: "Types of Plots"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Types+of+Plots
  - Concepts/Box+Plot
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d34fb1a1bacbe235385f8e084b3ee8fc9d13d915e4fbf40fe8366be9f5980512
  sources:
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.1 'Data visualization', §1.5.1 side-by-side box plots for a numerical and a categorical variable, sha256:871721caf69ea711517d9a4f0f627806da4200f6f7fd0068aa89530943339ad4 — https://r4ds.hadley.nz/data-visualize.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.10 'Exploratory data analysis', §10.5.1 boxplots compact for comparison, sha256:ab13c323616810e786eb9f6298ed5d4b9bc50d1cebfb753d2725f91684553432 — https://r4ds.hadley.nz/EDA.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-031.md
---

An analyst wants to compare the distribution of claim severity across six vehicle classes in one compact view. Which plot fits?

- A) A bar chart of the number of claims in each vehicle class
- B) A single histogram of severity for all classes combined
- C) Side-by-side box plots of severity, one for each vehicle class
- D) A line chart of severity in order of claim number

## Explanation

Comparing a numerical variable (severity) across the levels of a categorical one (vehicle class) is what side-by-side box plots do: each box shows a class's median, quartiles and outliers, and six of them fit compactly on one plot. The answer is **C**.

**Why not the others**

- **A** — a bar chart counts claims per class and says nothing about their severity.
- **B** — one histogram pools the classes, hiding the differences the analyst wants to see.
- **D** — claim number is an arbitrary order, so a line chart along it shows no meaningful sequence and does not separate the classes.
