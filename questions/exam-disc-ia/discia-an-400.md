---
id: "discia-an-400"
exam: "Exam DISC-IA"
topic: "PAP Liability Coverage"
learning_objective: "4. Personal Auto Policy"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/PAP+Liability+Coverage
  - Concepts/Personal+Auto+Policy
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f297deece60c9467f280063cfc14c9e7ac74d11acdf09f28cfdd761ca9809465
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part A Limit Of Liability A, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-400.md
---
A named insured's personal auto policy has liability limits of 100/300/50. She causes an accident that injures three people in the other car, whose bodily injury damages are \$150,000, \$120,000 and \$60,000. How much does Part A pay for bodily injury?

- A) \$260,000
- B) \$280,000
- C) \$300,000
- D) \$330,000

## Explanation

Under split limits each person's damages are first capped at the each person limit, and the capped amounts are then capped at the each accident limit:

$$
\begin{align*}
\text{BI} &= \min\big(100{,}000 + 100{,}000 + 60{,}000,\ 300{,}000\big) \\
&= 260{,}000
\end{align*}
$$

The answer is **A**.

**Why not the others**

- **B** caps only the first person's damages at \$100,000 and forgets that the second person's \$120,000 is also over the each person limit.
- **C** compares the total damages of \$330,000 with the each accident limit without applying the each person limit first.
- **D** pays the damages in full, ignoring both limits.
