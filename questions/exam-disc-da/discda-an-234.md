---
id: "discda-an-234"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/Clustering
answer: "A"
points: 1
---

An analyst describes small business policies by 40 yes/no indicators, one for each optional endorsement; any one policy carries only two or three endorsements. She wants to cluster policies whose endorsement choices are alike. Why is the Jaccard dissimilarity a better choice here than simple matching (the share of the 40 indicators on which two policies disagree)?

- A) Jaccard leaves out the endorsements that neither of the two policies carries
- B) Jaccard gives more weight to the endorsements with the highest premiums on each policy
- C) Jaccard standardizes each indicator to mean zero and standard deviation one first
- D) Jaccard treats the indicators as numeric, so differences can be squared and summed

## Explanation

For **asymmetric** binary features, where having a feature is informative but lacking it is not, joint absences should not make two records look alike. Simple matching counts every indicator, so two policies with completely different endorsements still agree on the 35 or so they both lack and look very similar. The Jaccard dissimilarity counts disagreements only among the features present in at least one of the two records, $\frac{c_{10} + c_{01}}{c_{11} + c_{10} + c_{01}}$, so joint absences drop out. The answer is **A**.

**Why not the others**

- **B** — Jaccard uses only presence and absence; it has no notion of premium or of weighting by amount.
- **C** — standardizing applies to numeric features before a distance such as Euclidean; it is not part of Jaccard.
- **D** — squaring and summing differences is Euclidean distance on 0/1 codes, which, like simple matching, counts joint absences as agreement.
