---
id: "discrm-an-041"
exam: "Exam DISC-RM"
topic: "Insurer Goals and Constraints"
learning_objective: "6. Overview of Insurance Operations"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurer+Goals+and+Constraints
  - Concepts/Capital+and+Surplus
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:a8d2085284f5c7be7e7f195d0303ae2de1b144a12dbdda530154f7b390fe6ab0
  sources:
    - "IRMI Glossary, 'Kenney ratio', sha256:29601c36922c9186f07f0fc8e5af26ab649858629e0be5e67c2485d666080cc0 — https://www.irmi.com/term/insurance-definitions/kenney-ratio"
    - "IRMI Glossary, 'capacity', sha256:3415704b5ee0c824b7783afa78c17c89f84b733510356e74abb572b9a7cd9e6b — https://www.irmi.com/term/insurance-definitions/capacity"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-041.md
---

An insurer writes both property and liability insurance. It has \$50,000,000 of policyholders' surplus and \$135,000,000 of gross written premium, and it holds itself to the Kenney ratio. How much more gross written premium can it write before it exceeds that ratio?

- A) None, since it is already above the ratio
- B) \$5,000,000
- C) \$15,000,000
- D) \$150,000,000

## Explanation

The Kenney ratio is a rule of thumb for gross written premium to policyholders' surplus: 2 to 1 for an insurer writing only property insurance, and 3 to 1 for one that also writes liability. This insurer writes liability, so its ceiling is 3 times surplus.

$$
\begin{align*}
\text{Ceiling} &= 3 \times 50{,}000{,}000 \\
&= 150{,}000{,}000 \\
\text{Room left} &= 150{,}000{,}000 - 135{,}000{,}000 \\
&= 15{,}000{,}000
\end{align*}
$$

The answer is **C**. To grow further it would need more surplus, since capacity is set by financial strength, or reinsurance, which adds capacity.

**Why not the others**

- **A** applies the 2 to 1 property-only ratio, giving a ceiling of \$100,000,000. That ratio is for an insurer that writes strictly property insurance, and this one also writes liability.
- **B** is the surplus left over, \$50,000,000 less the \$45,000,000 that its current premium needs at 3 to 1. That is room measured in surplus, not in premium. Each dollar of spare surplus supports three dollars of premium.
- **D** is the whole ceiling, not the room left under it. The insurer already writes \$135,000,000 of it.
