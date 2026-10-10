---
id: "discrm-an-246"
exam: "Exam DISC-RM"
topic: "Claims Handling Process"
learning_objective: "13. The Claims Function"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Claims+Handling+Process
  - Concepts/Deductible
  - Concepts/Coverage+Analysis
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d66c4b37d57cfca15d6f0fbf0ab33b102120bb0e18d780880270a9ab558a6df
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), A.2.a property not covered (money), D. Deductible, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-246.md
---

A covered fire causes \$62,000 of damage to a business's personal property, valued as the policy requires. The policy's business personal property limit is \$50,000 and its deductible is \$2,500. The insured is not underinsured under the coinsurance condition. How much does the insurer pay?

- A) \$47,500
- B) \$50,000
- C) \$52,500
- D) \$59,500

## Explanation

The deductible comes off the loss, and the limit caps what remains:

$$
\begin{align*}
\text{Payment} &= \min\big(62{,}000 - 2{,}500,\ 50{,}000\big) \\
&= \min(59{,}500,\ 50{,}000) \\
&= 50{,}000
\end{align*}
$$

The answer is **B**. The insured bears \$12,000.

**Why not the others**

- **A** — Subtracts the deductible from the limit instead of from the loss.
- **C** — Treats the limit as sitting above the deductible, as an excess layer would: $\min(62{,}000,\ 50{,}000 + 2{,}500)$.
- **D** — Forgets that the limit caps the payment.
