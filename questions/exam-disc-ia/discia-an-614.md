---
id: "discia-an-614"
exam: "Exam DISC-IA"
topic: "BPP Limits of Insurance and Deductible"
learning_objective: "8. Commercial Property Insurance Part 1"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/BPP+Limits+of+Insurance+and+Deductible
  - Concepts/Building+and+Personal+Property+Coverage+Form
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d3817f5fd8bd45f6a3f7b154d236f9d8db9741227b594ec5a4861f3d24b0883
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §D and its Example 1 logic: 199,900+300,000=499,900; distractors 499,400 (deductible also off Building 2's limit payment), 499,500, 500,000 reproduced, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-614.md
---
A fire damages two buildings insured under one BPP with separate limits of \$200,000 on Building 1 and \$300,000 on Building 2, and a \$500 deductible. There is no coinsurance penalty. The loss is \$200,400 to Building 1 and \$320,000 to Building 2. What is the total amount payable?

- A) \$499,400
- B) \$499,500
- C) \$499,900
- D) \$500,000

## Explanation

The losses are not combined to apply the deductible, but the deductible is applied only once per occurrence. Building 1's loss is less than its limit plus the deductible, so the deductible reduces its payment:

$$
\begin{align*}
\text{Paid}_1 &= \min(200{,}400 - 500,\ 200{,}000) \\
&= 199{,}900 \\
\text{Paid}_2 &= \min(320{,}000,\ 300{,}000) \\
&= 300{,}000
\end{align*}
$$

The total is **\$499,900**, so the answer is **C**.

**Why not the others**

- **A** — Subtracts the deductible from each building, but it applies only once per occurrence.
- **B** — Subtracts the deductible from the combined limits, but the deductible comes off a loss, not a limit.
- **D** — Ignores the deductible, which still reduces Building 1's payment because that loss is less than its limit plus the deductible.
