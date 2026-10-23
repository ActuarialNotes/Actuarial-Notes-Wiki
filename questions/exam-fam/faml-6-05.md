---
id: "faml-6-05"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:bd8fb77bd51510ffcd6ac1731e4a1b1ef531a75a5f9184cff580d4b123468abd
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.5, p.52, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.5, p.36, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-05.md
---

For a fully discrete whole life insurance of 1000 on (30), you are given:

(i) Mortality follows the Standard Ultimate Life Table

(ii) $i = 0.05$

(iii) The premium is the net premium

Calculate the first year for which the expected present value at issue of that year's premium is less than the expected present value at issue of that year's benefit.

[A modified version of Question 1 on the Spring 2013 exam]

- A) 21
- B) 25
- C) 29
- D) 33
- E) 37

## Explanation

Let $k$ be the policy year, so that the mortality rate during that year is $q_{30+k-1}$. The objective is to determine the smallest value of $k$ such that

$$\begin{align*}
v^{k-1}\left({}_{k-1}p_{30}\right)(1000P_{30}) &< v^{k}\left({}_{k-1}p_{30}\right)q_{30+k-1}(1000) \\
P_{30} &< vq_{30+k-1} \\
\frac{0.07698}{19.3834} &< \frac{q_{29+k}}{1.05} \\
q_{29+k} &> 0.00417 \\
29 + k > 61 &\Rightarrow k > 32
\end{align*}$$

Therefore, the smallest value that meets the condition is 33.

The answer is **D**.
