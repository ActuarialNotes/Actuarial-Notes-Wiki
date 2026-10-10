---
id: "discda-an-027"
exam: "Exam DISC-DA"
topic: "Exploratory Data Analysis"
learning_objective: "5. Analyzing Data With Visualizations"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Exploratory+Data+Analysis
  - Concepts/Box+Plot
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:adc5083074b77ba64dd32f8fc581033bf8706e5a4cffdde86dc9449ec1431acb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-027.md
---

Exploring a personal auto severity file, an analyst sees in side-by-side box plots that one state's median severity is twice that of the others. Which follow-up best fits exploratory data analysis?

- A) Check the state's claim count and whether another variable, such as coverage mix, explains it
- B) Conclude at once that the state needs a severity relativity of 2.0 in the rating plan
- C) Drop the state from the data as an outlier, so that it cannot distort the model
- D) Replace the box plots with a pie chart showing the claim count in each state

## Explanation

A pattern found in exploration raises questions before it supports a conclusion: could it be chance (a state with few claims), how strong is it, and could another variable explain it (a state writing mostly high-limit or comprehensive business), or does it hold within subgroups? Checking the count and a likely third variable is the next step. The answer is **A**.

**Why not the others**

- **B** — a pattern in a plot is a hypothesis, not a relativity; it may come from coverage mix or a handful of claims.
- **C** — a whole state is not an outlier, and dropping it discards the very difference to be explained.
- **D** — a pie chart of counts shows how many claims each state has, not how severity is distributed, and answers neither question.
