---
id: "discrm-an-254"
exam: "Exam DISC-RM"
topic: "Excess of Loss"
learning_objective: "Understanding Reinsurance"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Excess+of+Loss
  - Concepts/Types+of+Reinsurance
answer: "A"
points: 1
---

An insurer buys a per-risk excess of loss treaty of \$800,000 excess of \$200,000. In one year it has three losses, on three different risks, of \$150,000, \$600,000 and \$1,500,000. How much does the reinsurer pay in total?

- A) \$1,200,000
- B) \$1,650,000
- C) \$1,700,000
- D) \$2,250,000

## Explanation

Each loss is ceded above the \$200,000 retention, up to the \$800,000 limit:

$$
\begin{align*}
Y_1 &= \min(\max(150{,}000 - 200{,}000,\ 0),\ 800{,}000) \\
&= 0 \\
Y_2 &= \min(600{,}000 - 200{,}000,\ 800{,}000) \\
&= 400{,}000 \\
Y_3 &= \min(1{,}500{,}000 - 200{,}000,\ 800{,}000) \\
&= 800{,}000
\end{align*}
$$

The total is \$1,200,000. The answer is **A**. Unlike a surplus share, the excess treaty pays nothing on the small loss.

**Why not the others**

- **B** — Drops the floor at zero, letting the small loss count as $-50{,}000$, and drops the limit.
- **C** — Applies the retention but not the limit to the largest loss.
- **D** — Cedes every loss in full.
