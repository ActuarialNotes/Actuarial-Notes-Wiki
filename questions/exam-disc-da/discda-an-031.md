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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d34fb1a1bacbe235385f8e084b3ee8fc9d13d915e4fbf40fe8366be9f5980512
  sources: []
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
