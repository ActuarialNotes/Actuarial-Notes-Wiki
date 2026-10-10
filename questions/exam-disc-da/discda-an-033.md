---
id: "discda-an-033"
exam: "Exam DISC-DA"
topic: "Types of Plots"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Types+of+Plots
  - Concepts/Exploratory+Data+Analysis
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c5d6beac6e0507796709c08643d0522a0e6fbe95b3e4f7db9d4bf264b7a5c136
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.25 Run-Sequence Plot: y(i) vs i; shifts in location and scale; outliers, sha256:3de6be786eb2ab529c8fa7c5e2c9c70501478bfdbf2cd7c735673b179f0b0e26 — https://www.itl.nist.gov/div898/handbook/eda/section3/runseqpl.htm"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-033.md
---

An insurer replaced its claims system in July 2024. An analyst wants to see whether the number of claims reported each month shifted after the change. Which plot answers this most directly?

- A) A histogram of the monthly reported claim counts
- B) A line chart of reported claim counts by month, in time order
- C) A box plot of the monthly reported claim counts
- D) A scatter plot of each month's claim count against its average severity

## Explanation

The question is whether the level changed at a point in time, so the plot must keep the months in order. A line chart of the counts in time order (a run-sequence plot) shows shifts in level or in variation, and outliers, at the moments they happen. The answer is **B**.

**Why not the others**

- **A** — a histogram pools the months into bins of counts, discarding when each month occurred; a shift might show only as two humps with no dates attached.
- **C** — a box plot of all months summarizes their spread but also discards time order.
- **D** — a scatter against severity shows how count and severity relate, not whether either moved after July 2024.
