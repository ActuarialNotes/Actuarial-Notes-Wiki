---
id: "discda-an-208"
exam: "Exam DISC-DA"
topic: "Similarity and Distance Measures"
learning_objective: "7. Understanding Fundamental Modeling Concepts"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Similarity+and+Distance+Measures
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ed912ad448065b24402b48abb07152a9fa702edc9cf48dc7f379ae6d5a2d6abf
  sources:
    - "SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-208.md
---

Two claim records are compared on three standardized features. Their differences on the three features are 1.2, -0.5 and 0.9. What are the Euclidean and Manhattan distances between them?

- A) Euclidean 1.58 and Manhattan 1.58
- B) Euclidean 1.58 and Manhattan 2.60
- C) Euclidean 2.50 and Manhattan 2.60
- D) Euclidean 1.58 and Manhattan 1.60

## Explanation

Euclidean distance is the square root of the sum of squared differences; Manhattan distance is the sum of absolute differences.

$$
\begin{align*}
d_{\text{Euc}} &= \sqrt{1.2^2 + 0.5^2 + 0.9^2} \\
&= \sqrt{2.50} \\
&= 1.58 \\
d_{\text{Man}} &= 1.2 + 0.5 + 0.9 \\
&= 2.60
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — gives the Euclidean value for both, as if the two measures were the same. Manhattan does not square or take a root.
- **C** — 2.50 is the sum of squares before the square root is taken.
- **D** — 1.60 adds the signed differences, 1.2 - 0.5 + 0.9. A distance uses absolute values, so a negative difference still adds to it.
