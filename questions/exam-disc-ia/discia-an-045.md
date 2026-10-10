---
id: "discia-an-045"
exam: "Exam DISC-IA"
topic: "Property Insurance Limits and Deductibles"
learning_objective: "3. Common Policy Concepts"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Property+Insurance+Limits+and+Deductibles
  - Concepts/Deductible
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:72b2f1b868b36f76041967e1587a96bf9b82c9ea53742f0f00c84ff39a6932a1
  sources:
    - "IRMI Insurance Glossary, 'aggregate deductible' (fetched 2026-10-10), sha256:c4f3577bed73877f73ac0a44887f24e297649abb4e379b3052bc0c30ebf0dd36 — https://www.irmi.com/term/insurance-definitions/aggregate-deductible"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-045.md
---

A business's property policy has a \$10,000 per-occurrence deductible and a \$25,000 annual aggregate deductible. During the year it has four covered losses, in this order: \$8,000, \$15,000, \$30,000 and \$12,000. How much of the \$65,000 of losses does the business retain in total?

- A) \$10,000
- B) \$25,000
- C) \$38,000
- D) \$40,000

## Explanation

The business keeps up to \$10,000 of each loss until its deductibles for the year reach the \$25,000 aggregate.

$$
\begin{align*}
\text{Loss 1} &= \min(8{,}000,\ 10{,}000) \\
&= 8{,}000 \\
\text{Loss 2} &= \min(15{,}000,\ 10{,}000) \\
&= 10{,}000 \\
\text{Loss 3} &= \min(10{,}000,\ 25{,}000 - 18{,}000) \\
&= 7{,}000 \\
\text{Loss 4} &= \min(10{,}000,\ 25{,}000 - 25{,}000) \\
&= 0
\end{align*}
$$

The total retained is \$25,000, and the insurer pays \$40,000. The answer is **B**.

**Why not the others**

- **A** — \$10,000 applies one deductible to the year.
- **C** — \$38,000 applies the per-occurrence deductible to every loss and ignores the aggregate cap.
- **D** — \$40,000 is what the insurer pays, not what the business retains.
