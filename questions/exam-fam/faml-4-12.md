---
id: "faml-4-12"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Term+Life+Insurance
  - Concepts/Covariance
  - Concepts/Variance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:59cc7de4db283962261389f4f5597c84c30dfa118a9baa2e05a1e0da9281ad13
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.12, p.33 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.12, p.23 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-12.md
---

For three fully discrete insurance products on the same $(x)$, you are given:

(i) $Z_{1}$ is the present value random variable for a 20-year term insurance of 50

(ii) $Z_{2}$ is the present value random variable for a 20-year deferred whole life insurance of 100

(iii) $Z_{3}$ is the present value random variable for a whole life insurance of 100.

(iv) $E[Z_{1}] = 1.65$ and $E[Z_{2}] = 10.75$

(v) $Var(Z_{1}) = 46.75$ and $Var(Z_{2}) = 50.78$

Calculate $Var(Z_{3})$.

[Question 4 on the Fall 2015 exam]

- A) 62
- B) 109
- C) 167
- D) 202
- E) 238

## Explanation

$Z_{3} = 2Z_{1} + Z_{2}$ so that

$$\begin{align*}
\text{Var}(Z_{3}) &= 4\text{Var}(Z_{1}) + \text{Var}(Z_{2}) + 4Cov(Z_{1}, Z_{2})
\end{align*}$$

where

$$\begin{align*}
Cov(Z_{1}, Z_{2}) &= \underbrace{E[Z_{1}Z_{2}]}_{=0} - E[Z_{1}]E[Z_{2}] \\
&= -(1.65)(10.75)
\end{align*}$$

$$\begin{align*}
\text{Var}(Z_{3}) &= 4(46.75) + 50.78 - 4(1.65)(10.75) \\
&= 166.83
\end{align*}$$

The answer is **C**.
