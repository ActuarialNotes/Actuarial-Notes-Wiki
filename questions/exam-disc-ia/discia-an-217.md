---
id: "discia-an-217"
exam: "Exam DISC-IA"
topic: "Cyber Insurance"
learning_objective: "13. Specialty Coverages Part 2"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Cyber+Insurance
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a8a998e6fbb02e87a2cabe7508a155eb0a36d86ef28f9430cc6e726c4a4ba8ad
  sources:
    - "Beazley Breach Response policy (Certain Underwriters at Lloyd's, US, NAPA program copy), Declarations pp.1-2 (aggregate limit with regulatory sublimit; breach response services limits; retentions), Insuring Agreements A-E pp.5-7 (privacy & security liability claims-made, breach response services, regulatory, website media, PCI), Exclusion T war p.14, First Party Computer Security endorsement p.37 (cyber extortion, data protection, business interruption; 12-hour waiting period; electrical/telecom infrastructure exclusion), sha256:f37a11b2fd6e195a777b8487c8d2bdc7c044b8c33e50092b9c71d6bf88598acb — https://www.napa-benefits.org/assets/pdf/policy/cyber/cyber-1m.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-217.md
---

A ransomware attack shuts down an online retailer's systems for 20 hours. Its lost net income plus continuing expenses run at \$10,000 an hour, and it spends \$15,000 of extra expense restoring operations. Its cyber policy's network business interruption coverage has an 8-hour waiting period, a \$100,000 sublimit and the event's \$25,000 retention applies to it. How much does the business interruption coverage pay?

- A) \$95,000
- B) \$100,000
- C) \$110,000
- D) \$190,000

## Explanation

Income loss is paid only for the hours after the waiting period, then the retention comes off and the sublimit caps the result:

$$
\begin{align*}
\text{BI} &= 10{,}000\,(20 - 8) + 15{,}000 \\
&= 135{,}000 \\
\text{Paid} &= \min(135{,}000 - 25{,}000,\ 100{,}000) \\
&= \mathbf{100{,}000}
\end{align*}
$$

- **A** leaves out the extra expense, $\text{Paid} = 10{,}000(12) - 25{,}000$.
- **C** forgets the sublimit, which caps business interruption well below the aggregate limit.
- **D** pays for the full 20-hour outage, ignoring the waiting period, and also ignores the sublimit.
