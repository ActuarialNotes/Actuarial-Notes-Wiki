---
id: "discia-an-404"
exam: "Exam DISC-IA"
topic: "Uninsured Motorists Coverage"
learning_objective: "4. Personal Auto Policy"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Uninsured+Motorists+Coverage
  - Concepts/Personal+Auto+Policy
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:96c7c6444d16ec7c53cb1ccfd8195ad5b1815fb13f526a18d4dd6099650b3a08
  sources:
    - "ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part C Insured B.2 and Other Insurance 1–2, pp.6–7, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-404.md
---
A named insured is a passenger in a friend's car when an uninsured driver runs a red light and crashes into it. Her bodily injury damages are \$80,000. The friend's PAP has uninsured motorists limits of 25/50 on that car, and her own PAP has uninsured motorists limits of 100/300. How much does her own policy pay?

- A) \$25,000
- B) \$55,000
- C) \$75,000
- D) \$80,000

## Explanation

She is an insured under the friend's Part C (a person occupying his covered auto) and under her own (the named insured). For a vehicle she does not own, her Part C is **excess** over the primary coverage, and her total recovery can't exceed the highest single applicable limit, \$100,000:

$$
\begin{align*}
\text{Friend's policy} &= \min(80{,}000,\ 25{,}000) \\
&= 25{,}000 \\
\text{Her policy} &= 80{,}000 - 25{,}000 \\
&= 55{,}000
\end{align*}
$$

The total, \$80,000, is within \$100,000. The answer is **B**.

**Why not the others**

- **A** stops at the friend's limit, as if her own coverage didn't apply in another person's car.
- **C** pays her own limit less the primary limit, \$100,000 minus \$25,000, rather than her damages less what the primary paid.
- **D** makes her own policy primary for a car she doesn't own.
