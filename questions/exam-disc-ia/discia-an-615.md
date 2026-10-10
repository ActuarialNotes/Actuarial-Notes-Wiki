---
id: "discia-an-615"
exam: "Exam DISC-IA"
topic: "BPP Limits of Insurance and Deductible"
learning_objective: "8. Commercial Property Insurance Part 1"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/BPP+Limits+of+Insurance+and+Deductible
  - Concepts/BPP+Loss+Conditions+and+Additional+Conditions
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:be70c2e4ae5b70f78970b5d16648d807c57bd9aa523805d32dfd6cb8e2dc13cb
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §D, §F.1: R=0.625, 0.625×2,400=1,500 ≤ 1,500 → 0; distractors 562.50/900/2,400 reproduced, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-615.md
---
A building worth \$400,000 at the time of loss is insured for \$200,000 under the BPP with an 80% coinsurance percentage and a \$1,500 deductible. A vandal causes \$2,400 of damage. How much does the insurer pay?

- A) \$0
- B) \$562.50
- C) \$900
- D) \$2,400

## Explanation

The deductible clause first reduces the loss as the coinsurance condition requires, then compares the adjusted loss with the deductible:

$$
\begin{align*}
R &= \frac{200{,}000}{0.80 \times 400{,}000} \\
&= 0.625 \\
L^{*} &= 0.625 \times 2{,}400 \\
&= 1{,}500
\end{align*}
$$

If the adjusted loss is less than or equal to the deductible, the insurer pays nothing. Here it equals the deductible, so the answer is **A**.

**Why not the others**

- **B** — Subtracts the deductible first and then applies the coinsurance ratio: $R \times 900 = 562.50$. The form applies the ratio to the loss before the deductible.
- **C** — Ignores the coinsurance penalty and pays the loss less the deductible.
- **D** — Ignores both the coinsurance penalty and the deductible.
