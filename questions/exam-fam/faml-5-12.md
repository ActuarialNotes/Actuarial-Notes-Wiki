---
id: "faml-5-12"
exam: "Exam FAM"
topic: "Deferred Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Deferred+Annuity
  - Concepts/Annuity+Due
  - Concepts/Life+Annuity
  - Concepts/Life+Table
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:87792391912018a294a7f5f5f3deb32cd317b09fbab6bfaa2bde9ee9b8cbffe3
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.12, p.48 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.12, p.32 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-12.md
---

For a life annuity-due issued to (55), you are given:

i) The annuity pays an annual benefit of $X$ through age 64

ii) Beginning at age 65, the annuity pays 75% of $X$

iii) The present value of this annuity is 250,000

iv) Mortality follows the Standard Ultimate Life Table

v) $i = 0.05$

Calculate $X$.

[Question on October 2022 FAM-L Exam]

- A) 17,400
- B) 17,500
- C) 17,600
- D) 17,700
- E) 17,800

## Explanation

Any of these ways of viewing the benefit structure would be fine; all give the same answer:

(i) A temporary life annuity-due of $X$ plus a deferred life annuity-due of $0.75X$.

(ii) A whole life annuity-due of $0.75X$ plus a temporary deferred (as printed) life annuity-due of $0.25X$

(iii) A whole life annuity-due of $X$ minus a deferred life annuity-due of $0.25X$

This solution views it the first way.

$$\begin{align*}
X\ddot{a}_{55:\overline{10}|} + 0.75X\ddot{a}_{65} \cdot {}_{10}E_{55} &= 8.0192X + (0.75X)(0.59342)(13.5498) \\
&= 14.05X \\
&= 250{,}000 \\
\Rightarrow X &= 17{,}794
\end{align*}$$

The answer is **E**.
