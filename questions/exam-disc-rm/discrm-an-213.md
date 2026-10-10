---
id: "discrm-an-213"
exam: "Exam DISC-RM"
topic: "COPE"
learning_objective: "9. Underwriting Commercial Property Coverage"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/COPE
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8bac9da51351d7f1001b3105a48d86fd6cdac717e5f5f0a09aa4594736e6412e
  sources:
    - "Verisk ISO Mitigation, 'Scores and PPC Ratings', entry, sha256:4dc8a5df7de6acd02ca0a768ef688ded26c994b46ac7d7baf0922fdab747a9d4 — https://www.isomitigation.com/ppc/program-works/scores-and-ppc-ratings/"
    - "Verisk ISO Mitigation, 'Split Classifications', entry, sha256:97d23bc95c64d3e50a71e9e0162445f52ccb7f4642ca677bb14f7bab50b155d9 — https://www.isomitigation.com/ppc/program-works/split-classifications/"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-213.md
---

A town meets ISO's minimum criteria for a Public Protection Classification and scores 57.20 points under the Fire Suppression Rating Schedule. Its classification is split for properties far from water. What class applies to a store 3 road miles from the nearest fire station and 1,800 feet from the nearest creditable water supply?

- A) Class 5
- B) Class 5X or 5Y
- C) Class 6
- D) Class 10

## Explanation

A score of 50.00 to 59.99 gives Class 5:

$$
\begin{align*}
\text{PPC} &= 10 - \lfloor 57.20/10 \rfloor \\
&= 10 - 5 \\
&= 5
\end{align*}
$$

The town is graded 5/5X or 5/5Y. The store is within 5 road miles of a station but more than 1,000 feet from creditable water, so the second part of the split applies. The answer is **B**.

**Why not the others**

- **A** — Class 5 applies to properties within 5 road miles of a station **and** within 1,000 feet of water.
- **C** — Rounds the score the wrong way. Every score from 50.00 to 59.99 is Class 5, not Class 6.
- **D** — Class 10 generally applies to properties more than 5 road miles from a station, and this store is 3 miles away.
