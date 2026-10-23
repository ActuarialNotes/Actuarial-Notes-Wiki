---
id: "faml-6-20"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:4fb8d1632b3ecd106e9a5975364323c75a0005c9f7f339a8c3d8e64304b5330a
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.20, p.65, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.20, p.44, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-20.md
---

For a special fully discrete 3-year term insurance on (75), you are given:

(i) The death benefit during the first two years is the sum of the net premiums paid without interest

(ii) The death benefit in the third year is 10,000

(iii)

| $x$ | $p_{x}$ |
|---|---|
| 75 | 0.90 |
| 76 | 0.88 |
| 77 | 0.85 |

(iv) $i = 0.04$

Calculate the annual net premium.

[Question 8 on the Fall 2014 exam]

- A) 449
- B) 459
- C) 469
- D) 479
- E) 489

## Explanation

EPV(premiums) = EPV(benefits)

$$\begin{align*}
P\left(1 + v p_{x} + v^{2}\,{}_{2}p_{x}\right) &= P\left(v q_{x} + 2v^{2} p_{x} q_{x+1}\right) + 10000\left(v^{3}\,{}_{2}p_{x} q_{x+2}\right) \\
P\left(1 + \frac{0.9}{1.04} + \frac{0.9 \times 0.88}{1.04^{2}}\right) &= P\left(\frac{0.1}{1.04} + \frac{2 \times 0.9 \times 0.12}{1.04^{2}}\right) + 10000\left(\frac{0.9 \times 0.88 \times 0.15}{1.04^{3}}\right) \\
2.5976P &= 0.29588P + 1056.13 \\
P &= 459
\end{align*}$$

The answer is **B**.
