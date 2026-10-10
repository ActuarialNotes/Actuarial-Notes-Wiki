---
id: "discda-an-226"
exam: "Exam DISC-DA"
topic: "Data Segmentation"
learning_objective: "8. Basic Data Analysis"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Segmentation
  - Concepts/Clustering
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9481a76a11a9e5c6164e3599f6c33a94fd774243c6e0560a8abf315fbd9d513d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.3 PDF p.537, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 statistical criteria PDF p.167, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-226.md
---

A homeowners analyst runs K-means clustering on policy characteristics (dwelling age, square footage, construction, distance to coast and protection class), with no loss data, and gets five well-separated clusters. She proposes using the five clusters as new rating segments. What should be done before the clusters are used as segments?

- A) Test whether the clusters differ in loss experience and are credible and stable
- B) Nothing further, since K-means found five clearly separated clusters
- C) Rerun K-means with more clusters until every cluster has the same loss ratio
- D) Replace the clusters with alphabetical groupings of the protection classes

## Explanation

Clustering always returns clusters, whether or not the data contain real subgroups, and these clusters were formed without any loss data. A rating segment has to group risks with similar expected costs, differ from other segments, and be large and stable enough to be credible. So the clusters must be tested against loss experience, checked for credibility, and checked on other data or periods before use. The answer is **A**.

**Why not the others**

- **B** — clear separation in the features says nothing about whether the clusters differ in expected cost; clustering finds structure in $\mathbf{X}$ only.
- **C** — tuning the number of clusters to equalize loss ratios is not what clustering does, and segments are meant to *differ* in expected cost.
- **D** — an arbitrary grouping has no basis in either the features or the losses.
