---
id: "faml-6-29"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Annuity
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f1e69f3bbcff66308d62bd02322182b3079dca86c026c57975cf006246b74e1b
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 7-10 (August 18, 2026), Q6.29, p.73, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 7-10 (August 18, 2026), Q6.29, p.49, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-29.md
---

(35) purchases a fully discrete whole life insurance policy of 100,000.

You are given:

(i) The annual gross premium, calculated using the equivalence principle, is 1770

(ii) The expenses in policy year 1 are 50% of premium and 200 per policy

(iii) The expenses in policy years 2 and later are 10% of premium and 50 per policy

(iv) All expenses are incurred at the beginning of the policy year

(v) $i = 0.035$

Calculate $\ddot{a}_{35}$.

[Question 7 on the Fall 2015 exam]

- A) 20.0
- B) 20.5
- C) 21.0
- D) 21.5
- E) 22.0

## Explanation

Per equivalence Principle:

$$\begin{align*}
G\ddot{a}_{35} &= 100{,}000A_{35} + 0.4G + 150 + 0.1G\ddot{a}_{35} + 50\ddot{a}_{35} \\
1770\ddot{a}_{35} &= 100{,}000\left(1 - d\ddot{a}_{35}\right) + 0.4(1770) + 150 + 0.1(1770)\ddot{a}_{35} + 50\ddot{a}_{35} \\
1770\ddot{a}_{35} &= 100{,}000 + 708 + 150 + \ddot{a}_{35}\left(177 + 50 - 100{,}000\left(\frac{0.035}{1.035}\right)\right)
\end{align*}$$

Solving for $\ddot{a}_{35}$, we have

$$\begin{align*}
\ddot{a} &= \frac{100{,}858}{1770 + 3154.64} \\
&= \frac{100{,}858}{4924.64} \\
&= 20.48
\end{align*}$$

The answer is **B**.
