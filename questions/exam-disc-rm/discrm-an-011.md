---
id: "discrm-an-011"
exam: "Exam DISC-RM"
topic: "Risk Treatment"
learning_objective: "Risk Treat Fundamentals"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Risk+Treatment
  - Concepts/Risk+Transfer
answer: "C"
points: 1
---

A distributor insures its warehouse with a \$100,000 deductible and a \$5,000,000 limit that applies above the deductible. A fire causes a \$6,500,000 loss. How much of the loss does the distributor retain?

- A) \$100,000
- B) \$1,400,000
- C) \$1,500,000
- D) \$1,600,000

## Explanation

The distributor retains the deductible at the bottom and whatever exceeds the top of the insured layer, which ends at \$5,100,000:

$$
\begin{align*}
S_{\text{ret}} &= \min(6{,}500{,}000,\ 100{,}000) + \max(6{,}500{,}000 - 5{,}100{,}000,\ 0) \\
&= 100{,}000 + 1{,}400{,}000 \\
&= \mathbf{1{,}500{,}000}
\end{align*}
$$

The insurer pays the full \$5,000,000 limit. The answer is **C**.

**Why not the others**

- **A** — \$100,000 is only the deductible; it forgets that the loss exceeds the limit, so the excess is retained too.
- **B** — \$1,400,000 is only the amount above the limit; it leaves out the deductible.
- **D** — \$1,600,000 treats the limit as starting at zero rather than above the deductible, so it counts \$100,000 of the insured layer as retained.
