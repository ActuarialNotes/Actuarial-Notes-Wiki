---
id: "discia-an-210"
exam: "Exam DISC-IA"
topic: "Umbrella Liability Insurance"
learning_objective: "12. Specialty Coverages Part 1"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Umbrella+Liability+Insurance
  - Concepts/Excess+Insurance
  - Concepts/Commercial+General+Liability
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3fa7ec4506dc326841c0c5ab453bf83674f8f43b34f7ee440a7a6ba5b5abd1cc
  sources:
    - "Great American, Excess/Umbrella Liability policy GAI 6002 (Ed. 06/97), §II.E (reduced or exhausted underlying limits: pay in excess of the reduced limits, or drop down) and §II.G (retained limit = underlying limits, or the SIR only for an occurrence not covered by the underlying policies), pp.1-2, sha256:efc3de501e88dd7f3652d04ca7397c126a5349583cb9c26e55c7e260c235d97c — https://www.greatamericaninsurancegroup.com/docs/default-source/excess-liability/gai6002_06-97.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-210.md
---

A manufacturer's CGL policy has a \$1,000,000 each occurrence limit and a \$2,000,000 general aggregate, and earlier claims this policy year have reduced the remaining aggregate to \$400,000. Its umbrella has a \$5,000,000 limit, a \$25,000 self-insured retention and drops down over reduced or exhausted aggregates. A covered bodily injury claim now settles for \$1,500,000. How much does the umbrella pay?

- A) \$475,000
- B) \$500,000
- C) \$1,075,000
- D) \$1,100,000

## Explanation

The CGL can pay only what is left of its aggregate, \$400,000. The umbrella drops down and attaches at the reduced amount:

$$
\begin{align*}
A &= \min(1{,}000{,}000,\ 400{,}000) \\
&= 400{,}000 \\
\text{Paid} &= \min(1{,}500{,}000 - 400{,}000,\ 5{,}000{,}000) \\
&= \mathbf{1{,}100{,}000}
\end{align*}
$$

- **A** attaches at the occurrence limit and also takes off the retention. The retention applies only to claims the underlying policies don't cover.
- **B** attaches at the \$1,000,000 occurrence limit, ignoring the reduced aggregate and leaving \$600,000 on the insured.
- **C** drops down correctly but subtracts the self-insured retention, which does not apply to a claim the CGL covers.
