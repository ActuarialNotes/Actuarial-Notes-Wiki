---
id: "discrm-an-033"
exam: "Exam DISC-RM"
topic: "Business Continuity Management"
learning_objective: "Business Continuity Management"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Business+Continuity+Management
answer: "C"
points: 1
---

Losing a firm's claims payment activity would cost \$50,000 a day for the first 3 days, then \$150,000 a day as complaints and regulatory pressure build. The firm can tolerate a total impact of \$450,000. What is the maximum tolerable period of disruption for the activity?

- A) 3 days
- B) 4 days
- C) 5 days
- D) 9 days

## Explanation

Accumulate the impact until it reaches the tolerance:

$$
\begin{align*}
I(3) &= 3 \times 50{,}000 \\
&= 150{,}000 \\
\text{Remaining} &= 450{,}000 - 150{,}000 \\
&= 300{,}000 \\
\text{Extra days} &= 300{,}000 / 150{,}000 \\
&= 2 \\
\text{MTPD} &= 3 + 2 \\
&= \mathbf{5} \text{ days}
\end{align*}
$$

The answer is **C**. The recovery time objective must then be set inside 5 days.

**Why not the others**

- **A** — 3 days is only where the cost rate rises; the cumulative impact is \$150,000 there, well within tolerance.
- **B** — 4 days gives an impact of \$300,000, still within tolerance.
- **D** — 9 days divides the tolerance by the first-days rate, ignoring that the cost rises after day 3.
