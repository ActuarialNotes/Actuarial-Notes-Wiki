---
id: "discda-an-021"
exam: "Exam DISC-DA"
topic: "Data Mart"
learning_objective: "3. Preparing Data for Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Mart
  - Concepts/Data+Documentation
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af7a428febcc2c376c1b7990cdb1e7d9c5686eb3fd851808abd0e92f68ee39dd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-021.md
---

Underwriting's data mart, loaded directly from the policy administration system, reports \$48.0 million of premium for a region in 2025. The claims department's data mart, loaded from the enterprise data warehouse, reports \$45.6 million for the same region and year. What best explains why the two marts disagree?

- A) A claims mart cannot hold premium, so its figure is the one in error
- B) The underwriting mart is independent and applies its own extraction and definitions
- C) A mart built as a star schema always reports smaller totals than its source
- D) The claims mart holds a finer grain, so it reports less premium in total

## Explanation

A **dependent** data mart is loaded from the enterprise warehouse and inherits its single set of definitions. An **independent** mart is built straight from the operational systems and applies its own extraction and definitions, so two marts can report different numbers for the same quantity. Here the underwriting mart is independent; for example, it may report written premium where the warehouse-fed mart reports earned. The answer is **B**.

**Why not the others**

- **A** — a claims mart can carry premium, for loss ratios, and nothing in the stem says which figure is wrong.
- **C** — a star schema is a way of arranging facts and dimensions; it does not shrink totals.
- **D** — summing a finer grain gives the same total as a coarser one over the same data; grain limits detail, not totals.
