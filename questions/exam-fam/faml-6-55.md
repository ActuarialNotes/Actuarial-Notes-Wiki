---
id: "faml-6-55"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Term+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:cf9182f32cb6c77697d756cc9b3c959f3480515280c0733d7b1fe68159d47c05
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.55, p.93, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.55, p.62, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (undated; file 2024-10-exam-fam-tables.pdf), Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-55.md
---

An insurer issues a special 20 payment insurance policy on (45) with the following benefits:

- A death benefit of 1000, payable at the end of year of death, provided death occurs before age 65; and
- An annuity benefit that pays 2500 at the start of each year, starting at age 65

You are given:

i) Level annual premiums of $P$ are paid at the beginning of each year

ii) Premiums are calculated based on the equivalence principle

iii) Mortality follows the Standard Ultimate Life Table

iv) $i = 0.05$

Calculate $P$.

[Question on October 2022 FAM-L Exam]

- A) 872
- B) 896
- C) 920
- D) 944
- E) 968

## Explanation

$$\begin{align*}
\text{EPV(benefits)} &= 1000 \times A^{1}_{45:\overline{20}|} + 2500 \times {}_{20|}\ddot{a}_{45} \\
&= 1000(0.15161 - 0.35994 \times 0.35477) + 2500 \times 0.35994 \times 13.5498 \\
&= 12{,}216.7
\end{align*}$$

$$\begin{align*}
\text{EPV(premiums)} &= P \times (17.8161\text{ (as printed)} - 0.35994 \times 13.5498) \\
&= P \times 12.9391
\end{align*}$$

$$\begin{align*}
P &= \frac{12216.7}{12.9391} \\
&= 944.17
\end{align*}$$

The answer is **D**.
