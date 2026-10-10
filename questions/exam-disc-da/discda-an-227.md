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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a726be6d7c1768b31f5343b3383998b2de8efecff195a8fafb34666f9f29a21f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.2 PDF p.536 (Fig. 12.16), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
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
