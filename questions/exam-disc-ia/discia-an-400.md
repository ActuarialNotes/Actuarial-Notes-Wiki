---
id: "discia-an-400"
exam: "Exam DISC-IA"
topic: "PAP Liability Coverage"
learning_objective: "4. Personal Auto Policy"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/PAP+Liability+Coverage
  - Concepts/Personal+Auto+Policy
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f297deece60c9467f280063cfc14c9e7ac74d11acdf09f28cfdd761ca9809465
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-400.md
---
A named insured's personal auto policy has liability limits of 100/300/50. She causes an accident that injures three people in the other car, whose bodily injury damages are \$150,000, \$120,000 and \$60,000. How much does Part A pay for bodily injury?

- A) \$260,000
- B) \$280,000
- C) \$300,000
- D) \$330,000

## Explanation

Under split limits each person's damages are first capped at the each person limit, and the capped amounts are then capped at the each accident limit:

$$
\begin{align*}
\text{BI} &= \min\big(100{,}000 + 100{,}000 + 60{,}000,\ 300{,}000\big) \\
&= 260{,}000
\end{align*}
$$

The answer is **A**.

**Why not the others**

- **B** caps only the first person's damages at \$100,000 and forgets that the second person's \$120,000 is also over the each person limit.
- **C** compares the total damages of \$330,000 with the each accident limit without applying the each person limit first.
- **D** pays the damages in full, ignoring both limits.
