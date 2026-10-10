---
id: "discda-an-227"
exam: "Exam DISC-DA"
topic: "Clustering"
learning_objective: "8. Basic Data Analysis"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Clustering
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/K-Means+Clustering
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a726be6d7c1768b31f5343b3383998b2de8efecff195a8fafb34666f9f29a21f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-227.md
---

An analyst clusters small commercial policies on two features: annual payroll, ranging from \$50,000 to \$5,000,000, and number of locations, ranging from 1 to 6. The features are not standardized, and Euclidean distance is used. What is the most likely result?

- A) The clusters will mainly separate policies by number of locations
- B) Both features will influence the clusters about equally
- C) The clusters will mainly separate policies by annual payroll
- D) Euclidean distance cannot be computed when features are in different units

## Explanation

A distance on raw features is dominated by the feature with the largest spread in its own units. Payroll differences run into the millions of dollars, while location counts differ by at most 5, so payroll will drive the distances and therefore the clusters. James et al. recommend considering scaling features to standard deviation one, especially when they are measured in different units, so that each has comparable influence. The answer is **C**.

**Why not the others**

- **A** — reverses the effect. Location differences are tiny next to payroll differences in dollars.
- **B** — equal influence is what standardizing would achieve, not raw features.
- **D** — the distance can be computed on any numbers; the problem is that the result depends on the units, not that it is undefined.
