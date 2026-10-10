---
id: "discrm-an-231"
exam: "Exam DISC-RM"
topic: "Excess Insurance"
learning_objective: "11. Underwriting Other Types of Coverage"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Excess+Insurance
  - Concepts/Umbrella+Liability+Insurance
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c63cd78d1278fcec9b8907a646ef6f415693860047f5ba3fca4566685bbb50c6
  sources:
    - "IRMI Glossary, 'excess liability policy', entry, sha256:8400c1a7acec64412e464cfeb44e9a19b1bd14cbc14a81d33caaee9f680e2d38 — https://www.irmi.com/term/insurance-definitions/excess-liability-policy"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-231.md
---

An insured has a \$1,000,000 primary liability policy and a \$4,000,000 excess of \$1,000,000 excess liability policy. A single occurrence settles for \$6,500,000. How much does the excess policy pay?

- A) \$1,500,000
- B) \$4,000,000
- C) \$5,500,000
- D) \$6,500,000

## Explanation

The excess policy pays the part of the loss above its attachment point, up to its limit:

$$
\begin{align*}
Y &= \min\big(\max(6{,}500{,}000 - 1{,}000{,}000,\ 0),\ 4{,}000{,}000\big) \\
&= \min(5{,}500{,}000,\ 4{,}000{,}000) \\
&= 4{,}000{,}000
\end{align*}
$$

The primary pays \$1,000,000, the excess \$4,000,000, and the insured retains \$1,500,000. The answer is **B**.

**Why not the others**

- **A** — Is the amount above both layers, which the insured bears.
- **C** — Forgets the excess limit.
- **D** — Treats the excess policy as if it paid from the first dollar.
