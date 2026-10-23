---
id: "faml-6-32"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
  - Concepts/Fractional+Age+Assumption
  - Concepts/Life+Annuity
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b114120a0dc7c3473048c81a55c81a7df51504bada40ccc478496e2c290443b6
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.32, p.75, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.32, p.50, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-32.md
---

For a whole life insurance of 100,000 on $(x)$, you are given:

(i) Death benefits are payable at the moment of death

(ii) Deaths are uniformly distributed over each year of age

(iii) Premiums are payable monthly

(iv) $i = 0.05$

(v) $\ddot{a}_{x} = 9.19$

Calculate the monthly net premium.

[Question 11 on the Fall 2015 exam]

- A) 530
- B) 540
- C) 550
- D) 560
- E) 570

## Explanation

Assuming UDD

Let $P$ = monthly net premium

$$\begin{align*}
\text{EPV(premiums)} &= 12P\ddot{a}^{(12)}_{x} \\
&\cong 12P\left[\alpha(12)\,\dot{a}_{x}\text{ (as printed)} - \beta(12)\right] \\
&= 12P\left[1.00020(9.19) - 0.46651\right] \\
&= 104.7039P
\end{align*}$$

$$\begin{align*}
\text{EPV(benefits)} &= 100{,}000\,\bar{A}_{x} \\
&= 100{,}000\,\frac{i}{\delta}A_{x} \\
&= 100{,}000\,\frac{i}{\delta}\left(1 - d\ddot{a}_{x}\right) \\
&= 100{,}000\,\frac{0.05}{\ln(1.05)}\left(1 - \frac{0.05}{1.05}(9.19)\right) \\
&= 57{,}632.62
\end{align*}$$

$$\begin{align*}
P &= \frac{57{,}632.62}{104.7039} \\
&= 550.43
\end{align*}$$

The answer is **C**.
