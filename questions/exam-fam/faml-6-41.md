---
id: "faml-6-41"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Term+Life+Insurance
  - Concepts/Insurance+Premium
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c621adecdff8225948221676e682bafa25b905bba9242efb7627abacd8c2b21
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.41, p.81, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.41, p.55, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-41.md
---

For a special fully discrete 2-year term insurance on $(x)$, you are given:

(i) $q_{x} = 0.01$

(ii) $q_{x+1} = 0.02$

(iii) $i = 0.05$

(iv) The death benefit in the first year is 100,000

(v) Both the benefits and premiums increase by 1% in the second year

Calculate the annual net premium in the first year.

[Question 9 on the Fall 2016 exam]

- A) 1410
- B) 1417
- C) 1424
- D) 1431
- E) 1438

## Explanation

Let $P$ be the net premium for year 1.

Then:

$$\begin{align*}
P + 1.01Pvp_{x} &= 100{,}000vq_{x} + (1.01)(100{,}000)v^{2}p_{x}q_{x+1} \\
P\left[1 + \frac{1.01}{1.05}0.99\right] &= 100{,}000\left(\frac{0.01}{1.05} + \frac{(1.01)(0.99)(0.02)}{(1.05)^{2}}\right) \\
\Rightarrow P &= 1416.93
\end{align*}$$

The answer is **B**.
