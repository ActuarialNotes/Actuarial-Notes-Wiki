---
id: "discda-an-226"
exam: "Exam DISC-DA"
topic: "Data Segmentation"
learning_objective: "Basic Data Analysis"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Segmentation
  - Concepts/Clustering
answer: "A"
points: 1
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
