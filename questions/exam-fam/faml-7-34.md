---
id: "faml-7-34"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8d750bfb8fb2fde99584bb5b90939dddda484e101dc414654a0a61de2b707ba0
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.34, p.122, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.34, p.81, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-34.md
---

An insurer issues a 30-year term insurance policy on (40). You are given:

i) Net premiums of 750 are payable quarterly

ii) The death benefit, payable at the end of the quarter of death, is 1,000,000

iii) $_{t}V$ denotes the net premium policy value at time *t*, $t \ge 0$

iv) $_{10.5}V = 10{,}000$

v) $q_{50} = 0.01$

vi) Mortality is uniformly distributed over each year of age

vii) $i = 0.05$

Calculate $_{10.75}V$.

[Question on October 2022 FAM-L Exam]

- A) 8,360
- B) 8,370
- C) 8,380
- D) 8,390
- E) 8,400

## Explanation

$$\left({}_{10.5}V + P\right)(1+i)^{0.25} = 1{,}000{,}000 \times {}_{0.25}q_{50.5} + {}_{0.25}p_{50.5} \times {}_{50.75}V\text{ (as printed)}$$

$$(10{,}000 + 750)(1 + 0.05)^{0.25} = 1{,}000{,}000 \times \left(1 - \frac{(1 - 0.75 \times 0.01)}{(1 - 0.5 \times 0.01)}\right) + \left(\frac{(1 - 0.75 \times 0.01)}{(1 - 0.5 \times 0.01)}\right) \times {}_{50.75}V\text{ (as printed)}$$

$${}_{50.75}V\text{ (as printed)} = 8{,}390$$

The answer is **D**.
