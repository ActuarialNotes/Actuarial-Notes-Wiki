---
id: "faml-6-48"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7cd5bed43feb6040482f144180883a559832258dd813526e351a8ab315e3da0
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.48, p.87, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.48, p.59, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-48.md
---

For a special fully discrete 5-year deferred 3-year term insurance of 100,000 on ($x$) you are given:

(i) There are two premium payments, each equal to $P$. The first is paid at the beginning of the first year and the second is paid at the end of the 5-year deferral period

(ii) The following probabilities: (as printed)

(iii) $_{5}p_{x} = 0.95$

(iv) $q_{x+5} = 0.02, \quad q_{x+6} = 0.03, \quad q_{x+7} = 0.04$

(v) $i = 0.06$

Calculate $P$ using the equivalence principle.

[Question 9 on the Fall 2017 exam]

- A) 3195
- B) 3345
- C) 3495
- D) 3645
- E) 3895

## Explanation

Actuarial present value of insured benefits:

$$\begin{align*}
&100{,}000\left[\frac{0.95 \times 0.02}{1.06^{6}} + \frac{0.95 \times 0.98 \times 0.03}{1.06^{7}} + \frac{0.95 \times 0.98 \times 0.97 \times 0.04}{1.06^{8}}\right] \\
&= 5{,}463.32
\end{align*}$$

$$\begin{align*}
P\left(1 + \frac{0.95}{1.06^{5}}\right) &= 5{,}463.32 \\
\Rightarrow P &= 3{,}195.12
\end{align*}$$

The answer is **A**.
