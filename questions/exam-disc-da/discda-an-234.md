---
id: "discda-an-234"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/Clustering
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a19bd09bc5e05391c7a0221c56b87072bd4d0c76b5572af7f3268d88d29eabbc
  sources:
    - "SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html"
    - "SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html"
    - "R cluster::daisy help page, Arguments and Details (Gower), sha256:9ae15cbff8e5e321e7b12d3662dc4c219be38e1aa5d7c9b2fc158aed259e7763 — https://stat.ethz.ch/R-manual/R-devel/library/cluster/html/daisy.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-234.md
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
