---
id: "discrm-an-031"
exam: "Exam DISC-RM"
topic: "Organizational Resilience"
learning_objective: "3. Managing Business Continuity Risk"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Organizational+Resilience
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a8e91496962bdb47098dbf777107392ff4d9125a0e9e9d2a481aaf933fc3f25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-031.md
---

A distributor normally earns gross profit of \$40,000 a day. After a cyber attack, its output falls at once to 50% of normal and then recovers in a straight line to 100% over 20 days. What gross profit does it lose over those 20 days?

- A) \$200,000
- B) \$400,000
- C) \$600,000
- D) \$800,000

## Explanation

The lost performance is the area of the resilience triangle between normal output and actual output, in days of normal profit:

$$
\begin{align*}
\text{RL} &= \tfrac{1}{2} \times 20 \times (1 - 0.5) \\
&= 5 \text{ days} \\
\text{Lost profit} &= 5 \times 40{,}000 \\
&= \mathbf{200{,}000}
\end{align*}
$$

The answer is **A**.

**Why not the others**

- **B** — \$400,000 treats the 50% drop as lasting all 20 days, ignoring the recovery.
- **C** — \$600,000 is the profit the distributor *earns* over the 20 days, an average of 75% of normal.
- **D** — \$800,000 is a full 20 days of normal profit, as if output fell to zero.
