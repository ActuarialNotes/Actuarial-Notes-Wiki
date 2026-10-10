---
id: "discia-an-819"
exam: "Exam DISC-IA"
topic: "CGL Limits of Insurance"
learning_objective: "11. Commercial General Liability Insurance Part 2"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/CGL+Limits+of+Insurance
  - Concepts/CGL+Coverage+B
  - Concepts/Products+and+Completed+Operations+Liability
  - Concepts/Commercial+General+Liability
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0cfdc715752c4f10c939cd7e0ce33858942a58afa5891341ede0b1107bb7707d
  sources:
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form (ISO 2012, 16 pp.), Section III paras 2-5 (pp.10-11), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-819.md
---
A CGL policy has these limits: each occurrence \$1,000,000; general aggregate \$2,000,000; products-completed operations aggregate \$1,000,000; personal and advertising injury \$1,000,000. In one policy year, in this order, the insured incurs: two separate products claims of \$700,000 and \$600,000; a premises bodily injury claim of \$1,200,000; a libel claim by one person of \$400,000; and a second premises bodily injury claim of \$900,000. How much does the insurer pay on the last claim?

- A) \$0
- B) \$300,000
- C) \$600,000
- D) \$900,000

## Explanation

Products claims reduce only the products-completed operations aggregate; premises claims and Coverage B claims reduce the general aggregate.

$$
\begin{align*}
\text{Products} &= 700{,}000 + \min(600{,}000,\ 300{,}000) \\
&= 1{,}000{,}000 \\
G_1 &= 2{,}000{,}000 - \min(1{,}200{,}000,\ 1{,}000{,}000) \\
&= 1{,}000{,}000 \\
G_2 &= 1{,}000{,}000 - 400{,}000 \\
&= 600{,}000 \\
\text{Paid}_{\text{last}} &= \min(900{,}000,\ 1{,}000{,}000,\ 600{,}000) \\
&= 600{,}000
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** charges the products claims to the general aggregate, which exhausts it before the last claim.
- **B** lets the \$300,000 of the second products claim that the products aggregate couldn't pay spill into the general aggregate. The aggregates don't feed each other.
- **D** ignores the general aggregate altogether.
