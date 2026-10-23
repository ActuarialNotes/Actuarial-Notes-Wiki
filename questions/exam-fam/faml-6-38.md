---
id: "faml-6-38"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Endowment+Insurance
  - Concepts/Fractional+Age+Assumption
  - Concepts/Pure+Endowment
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:1c891ad4dd6242d73271aec6ae66267f571c7113e758b69d372f62f343d5efe6
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.38, p.79, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.38, p.53, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-38.md
---

For an $n$-year endowment insurance of 1000 on $(x)$, you are given:

(i) Death benefits are payable at the moment of death

(ii) Premiums are payable annually at the beginning of each year

(iii) Deaths are uniformly distributed over each year of age

(iv) $i = 0.05$

(v) $_{n}E_{x} = 0.172$

(vi) $\bar{A}_{x:\overline{n}|} = 0.192$

Calculate the annual net premium for this insurance.

[Question 10 on the Spring 2016 exam]

- A) 10.1
- B) 11.3
- C) 12.5
- D) 13.7
- E) 14.9

## Explanation

Let $P$ be the annual net premium

$$P = \frac{1000\bar{A}_{x:\overline{n}|}}{\ddot{a}_{x:\overline{n}|}} = \frac{1000(0.192)}{\ddot{a}_{x:\overline{n}|}}$$

where

$$\begin{align*}
\ddot{a}_{x:\overline{n}|} &= \frac{1 - A_{x:\overline{n}|}}{d} \\
&= \frac{(1.05)}{(0.05)}\left(1 - A^{1}_{x:\overline{n}|} - A_{x:\overline{n}|}^{\ \ 1}\right)
\end{align*}$$

$$A_{x:\overline{n}|}\text{ (as printed)} = \frac{i}{\delta}\left(A^{1}_{x:\overline{n}|}\right) + {}_{n}E_{x}$$

$$\begin{align*}
\Rightarrow 0.192 &= \frac{0.05}{0.04879}\left(A^{1}_{x:\overline{n}|}\right) + 0.172 \\
\Rightarrow A^{1}_{x:\overline{n}|} &= 0.019516
\end{align*}$$

$$\begin{align*}
\Rightarrow \ddot{a}_{x:\overline{n}|} &= \frac{1.05}{0.05}(1 - 0.019516 - 0.172) \\
&= 16.978
\end{align*}$$

Therefore, we have

$$\begin{align*}
P &= \frac{1000(0.192)}{16.978} \\
&= 11.31
\end{align*}$$

The answer is **B**.
