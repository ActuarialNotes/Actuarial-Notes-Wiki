---
id: "masii-an-027"
exam: "Exam MAS-II"
topic: "Gini Index"
learning_objective: "Statistical Learning"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Gini+Index
  - Concepts/Node+Impurity
  - Concepts/Decision+Tree
answer: "CDBA"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dca8887ce7107c2bfcc53d5183cb2f7f10508ce277bb0b334ac258655b3803d6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-027.md
---

A classification tree is being grown to flag fraudulent auto claims. The root node holds 200 claims, 60 of them fraudulent. Four candidate splits of the root are under consideration. Rank them by the decrease in Gini index they achieve, from the **largest** decrease to the smallest. Enter the letters with no spaces, e.g. ABCD.

- (A) Left node: 30 claims, none fraudulent. Right node: 170 claims, 60 fraudulent.
- (B) Left node: 100 claims, 45 fraudulent. Right node: 100 claims, 15 fraudulent.
- (C) Left node: 80 claims, 50 fraudulent. Right node: 120 claims, 10 fraudulent.
- (D) Left node: 120 claims, 55 fraudulent. Right node: 80 claims, 5 fraudulent.

## Explanation

For two classes a node's Gini index is $G = 2\hat p(1-\hat p)$, where $\hat p$ is the share of fraudulent claims in the node. The root has $\hat p = 60/200 = 0.30$:

$$
G_{\text{root}} = 2(0.30)(0.70) = 0.42
$$

A split is scored by the Gini of its two children, **each weighted by its share of the parent's claims**:

$$
\Delta G = G_{\text{root}} - \frac{n_L}{n}G_L - \frac{n_R}{n}G_R
$$

| Split | $G_L$ | $G_R$ | Weighted child Gini | $\Delta G$ |
|---|---|---|---|---|
| (A) | 0.0000 | 0.4567 | 0.15(0) + 0.85(0.4567) = 0.3882 | 0.0318 |
| (B) | 0.4950 | 0.2550 | 0.5(0.4950) + 0.5(0.2550) = 0.3750 | 0.0450 |
| (C) | 0.4688 | 0.1528 | 0.4(0.4688) + 0.6(0.1528) = 0.2792 | 0.1408 |
| (D) | 0.4965 | 0.1172 | 0.6(0.4965) + 0.4(0.1172) = 0.3448 | 0.0752 |

From largest decrease to smallest, the order is C, D, B, A. The answer is **CDBA**.

Split (C) wins because it makes a large node much purer: its right node holds 60% of the claims at only 8.3% fraud. Split (A)'s pure left node holds only 15% of the claims, and it leaves the other 85% almost as mixed as the root ($\hat p = 0.353$ against 0.30).

**Common wrong entries**

- **ADCB** averages the two children's Gini indices without weighting them by size. That gives decreases of 0.1916, 0.1131, 0.1092 and 0.0450 for A, D, C and B. It rewards split (A) for a tiny pure node, which is exactly the effect the size weights prevent. Ranking the splits by their purest child alone gives the same wrong order.
- **ABDC** is the right calculation ranked the wrong way round, from the smallest decrease to the largest.
- Ranking by classification error rate cannot complete the order. It puts (C) first, with a decrease of 0.10, because (C)'s left node is the only child whose majority is fraudulent. Every other child still predicts "legitimate", so splits A, B and D all leave 60 claims misclassified and tie at a decrease of zero. This is why trees are grown with the Gini index or entropy, which register a purer node even when its majority class doesn't change.
