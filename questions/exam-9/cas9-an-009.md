---
id: "cas9-an-009"
exam: "Exam 9"
topic: "Prepayment Risk"
learning_objective: "Financial Risk Management (FRM)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Prepayment+Risk
  - Concepts/Credit+Risk
  - Concepts/Interest+Rate+Risk
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3fd74cc6eed4ceab8d55bf78b631d7ccd00ff274cb9fbd2da550d89ba2bfaae2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-009.md
---

An insurer's investment portfolio holds a mortgage pass-through security. At the start of month 10 of the pool's life, the remaining pool balance is \$50,000,000 and the scheduled principal for the month is \$150,000. Prepayments are assumed to follow 150% of the PSA benchmark, under which 100% PSA is a conditional prepayment rate (CPR) of 0.2% per month of age, rising to 6% at month 30 and level thereafter.

Calculate the prepayment the insurer should expect from the pool in month 10.

- A) \$83,855
- B) \$124,625
- C) \$126,372
- D) \$390,247
- E) \$1,495,500

## Explanation

At month 10, 100% PSA is a CPR of 10 × 0.2% = 2%, so 150% PSA is a CPR of 3%. The CPR is an annual rate; the single monthly mortality (SMM) is the monthly rate that compounds to it:

$$
\text{SMM} = 1 - (1 - 0.03)^{1/12} = 0.0025350
$$

Prepayment applies to the balance remaining after scheduled principal:

$$
\text{Prepayment} = 0.0025350 \times (50{,}000{,}000 - 150{,}000) = \mathbf{\$126{,}372}
$$

The answer is **C**. If rates fall and refinancing accelerates, this figure rises and principal comes back just when it can only be reinvested at lower yields — the risk the insurer is short.

**Why not the others**

- **A** — \$83,855 uses 100% PSA (CPR 2%) and forgets the 150% multiple.
- **B** — \$124,625 divides the CPR by 12 instead of converting it with compounding.
- **D** — \$390,247 uses the seasoned rate, a CPR of 1.5 × 6% = 9%, though the pool is only in month 10 of the 30-month ramp.
- **E** — \$1,495,500 applies the annual CPR to a single month's balance.
