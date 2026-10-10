---
id: "discia-an-603"
exam: "Exam DISC-IA"
topic: "BPP Additional Coverages and Coverage Extensions"
learning_objective: "8. Commercial Property Insurance Part 1"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/BPP+Additional+Coverages+and+Coverage+Extensions
  - Concepts/BPP+Limits+of+Insurance+and+Deductible
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:155e51845a509e27d14ff1711de88954a26c9ccf20be9224076f21e0600593df
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §A.4.a(3)–(4): P=99,000, B=min(25,000, 21,000, 60,000)=21,000, +25,000=46,000; distractors 21,000/25,000/50,000 reproduced, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-603.md
---
A building is insured under the BPP for \$120,000 with a \$1,000 deductible, and there is no coinsurance penalty. A fire causes \$100,000 of direct damage, and removing the debris costs \$60,000. How much does the insurer pay for debris removal?

- A) \$21,000
- B) \$25,000
- C) \$46,000
- D) \$50,000

## Explanation

The loss payment is $P = 100{,}000 - 1{,}000 = 99{,}000$. Debris removal within the limit is capped at 25% of the deductible plus the loss payment, and the two together cannot exceed the limit:

$$
\begin{align*}
B &= \min(0.25 \times 100{,}000,\ 120{,}000 - 99{,}000,\ 60{,}000) \\
&= \min(25{,}000,\ 21{,}000,\ 60{,}000) \\
&= 21{,}000
\end{align*}
$$

The debris expense exceeds both caps, so the additional amount of up to \$25,000 per location applies:

$$
\text{Debris} = \min(60{,}000,\ 21{,}000 + 25{,}000) = 46{,}000
$$

The answer is **C**; the insured bears \$14,000 of the debris expense.

**Why not the others**

- **A** — \$21,000 is only the amount within the limit; it forgets the additional \$25,000 that applies when the limit or the 25% cap binds.
- **B** — \$25,000 is the 25% cap alone (or the additional amount alone), ignoring that the two layers add.
- **D** — \$50,000 adds the full 25% cap to the additional amount, ignoring that the loss payment plus the basic debris amount cannot exceed the \$120,000 limit.
