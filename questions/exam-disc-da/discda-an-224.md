---
id: "discda-an-224"
exam: "Exam DISC-DA"
topic: "Classification Tree"
learning_objective: "8. Basic Data Analysis"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Classification+Tree
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b0f68fa8fda31110c78289fbce420f17eccb7c1c6e0acc5e81b87811d28b7230
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-224.md
---

A classification tree for renewal lapse, fitted to 700 policies, has three leaves:

- **Rate increase of 10% or less:** 500 policies, 50 lapsed.
- **Rate increase over 10% and tenure under 3 years:** 40 policies, 26 lapsed.
- **Rate increase over 10% and tenure of 3 years or more:** 160 policies, 48 lapsed.

A policy facing a 15% rate increase has a tenure of 2 years. What class does the tree predict, and what is its estimated probability of lapse?

- A) Renew, with a lapse probability of 0.30
- B) Renew, with a lapse probability of 0.18
- C) Lapse, with a lapse probability of 0.65
- D) Lapse, with a lapse probability of 0.37

## Explanation

Follow the policy down the tree: a 15% increase is over 10%, and a tenure of 2 years is under 3, so it lands in the second leaf. A classification tree predicts the most common class in the leaf, and the leaf's class share estimates the probability:

$$
\begin{align*}
\hat{p}_{\text{lapse}} &= \frac{26}{40} \\
&= 0.65
\end{align*}
$$

Since 0.65 exceeds one half, the prediction is **lapse**. The answer is **C**.

**Why not the others**

- **A** — 0.30 is the lapse share of the long-tenure leaf, $\tfrac{48}{160}$; the policy took the wrong branch at tenure.
- **B** — 0.18 is the overall lapse rate, $\tfrac{124}{700}$, which ignores the tree.
- **D** — 0.37 stops one split early, at the node for increases over 10%, $\tfrac{26 + 48}{200}$; and at 0.37 that node would predict renew, not lapse.
