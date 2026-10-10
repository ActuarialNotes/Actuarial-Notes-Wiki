---
id: "discia-an-827"
exam: "Exam DISC-IA"
topic: "CGL Endorsements"
learning_objective: "11. Commercial General Liability Insurance Part 2"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/CGL+Endorsements
  - Concepts/CGL+Limits+of+Insurance
  - Concepts/Commercial+General+Liability
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c0b1785b494e69daa45f35aaaeca7f42c63d8d10779aea74fe8bcd37a3342b1e
  sources:
    - "ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A, B, C, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-827.md
---
A builder's CGL has a \$1,000,000 each occurrence limit and a \$2,000,000 general aggregate, with CG 25 03 05 09 (Designated Construction Project(s) General Aggregate Limit) scheduling Project P. Early in the year a visitor at the builder's own office recovers \$200,000. Then ongoing operations at Project P cause three occurrences, in this order, of \$800,000, \$900,000 and \$700,000. How much is paid on the third Project P occurrence?

- A) \$0
- B) \$100,000
- C) \$300,000
- D) \$700,000

## Explanation

Under CG 25 03, Project P has its own aggregate equal to the general aggregate. Payments attributable only to ongoing operations at Project P reduce only that aggregate; the office claim reduces the general aggregate, not Project P's.

$$
\begin{align*}
G_P &= 2{,}000{,}000 - 800{,}000 - 900{,}000 \\
&= 300{,}000 \\
\text{Paid}_3 &= \min(700{,}000,\ 1{,}000{,}000,\ 300{,}000) \\
&= 300{,}000
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** treats Project P's aggregate as exhausted; under CG 25 03 it still has \$300,000 left, because the office claim reduces only the general aggregate.
- **B** is the result without the endorsement: one \$2,000,000 general aggregate shared by all four claims.
- **D** ignores the aggregate altogether.
