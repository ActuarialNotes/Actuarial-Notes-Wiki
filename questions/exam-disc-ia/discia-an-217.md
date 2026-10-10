---
id: "discia-an-217"
exam: "Exam DISC-IA"
topic: "Cyber Insurance"
learning_objective: "Specialty Coverages Part 2"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Cyber+Insurance
answer: "B"
points: 1
---

A ransomware attack shuts down an online retailer's systems for 20 hours. Its lost net income plus continuing expenses run at \$10,000 an hour, and it spends \$15,000 of extra expense restoring operations. Its cyber policy's network business interruption coverage has an 8-hour waiting period, a \$100,000 sublimit and the event's \$25,000 retention applies to it. How much does the business interruption coverage pay?

- A) \$95,000
- B) \$100,000
- C) \$110,000
- D) \$190,000

## Explanation

Income loss is paid only for the hours after the waiting period, then the retention comes off and the sublimit caps the result:

$$
\begin{align*}
\text{BI} &= 10{,}000\,(20 - 8) + 15{,}000 \\
&= 135{,}000 \\
\text{Paid} &= \min(135{,}000 - 25{,}000,\ 100{,}000) \\
&= \mathbf{100{,}000}
\end{align*}
$$

- **A** leaves out the extra expense, $\text{Paid} = 10{,}000(12) - 25{,}000$.
- **C** forgets the sublimit, which caps business interruption well below the aggregate limit.
- **D** pays for the full 20-hour outage, ignoring the waiting period, and also ignores the sublimit.
