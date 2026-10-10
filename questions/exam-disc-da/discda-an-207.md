---
id: "discda-an-207"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
  - Concepts/K-Nearest+Neighbors
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:30869ed36ec1c7607e68312d6ac7abff8ca304ff83a91de2bb4144484b9a7674
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §4.7.6 PDF p.193, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-207.md
---

A nearest-neighbor model for auto physical damage describes each policy by driver age (years) and vehicle value (dollars). A new policy has driver age 40 and vehicle value \$30,000. Three training records are:

| Record | Driver age | Vehicle value |
| :--- | ---: | ---: |
| R1 | 42 | 40,000 |
| R2 | 60 | 31,000 |
| R3 | 35 | 36,000 |

In the training data, driver age has a standard deviation of 10 years and vehicle value \$8,000. Which record is the nearest neighbor by Euclidean distance, on raw values and on standardized values?

- A) R2 on both raw and standardized values
- B) R2 on raw values and R1 on standardized values
- C) R2 on raw values and R3 on standardized values
- D) R3 on both raw and standardized values

## Explanation

**Raw values.** Vehicle value differences are in thousands of dollars and swamp age:

$$
\begin{align*}
d(R1) &= \sqrt{2^2 + 10{,}000^2} \\
&= 10{,}000.0 \\
d(R2) &= \sqrt{20^2 + 1{,}000^2} \\
&= 1{,}000.2 \\
d(R3) &= \sqrt{5^2 + 6{,}000^2} \\
&= 6{,}000.0
\end{align*}
$$

R2 is nearest, although its driver is 20 years older.

**Standardized values.** Divide each difference by its standard deviation:

$$
\begin{align*}
d(R1) &= \sqrt{0.2^2 + 1.25^2} \\
&= 1.266 \\
d(R2) &= \sqrt{2.0^2 + 0.125^2} \\
&= 2.004 \\
d(R3) &= \sqrt{0.5^2 + 0.75^2} \\
&= 0.901
\end{align*}
$$

R3 is nearest. The answer is **C**.

**Why not the others**

- **A** — keeps the raw-value answer after standardizing, as if scaling did not matter. Standardizing gives age equal weight and moves R2 from nearest to farthest.
- **B** — R1 is the second-nearest after standardizing; its vehicle value differs by 1.25 standard deviations, more than R3's 0.75.
- **D** — on raw values R3 is 6,000 away against R2's 1,000; the raw ranking is driven by vehicle value alone.
