---
id: "faml-7-19"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a851d72417a6d855a4510c803c6345b491689fece8c56cdf2df7d45da93388c0
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.19, p.108, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.19, p.74, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-19.md
---

For a fully discrete whole life insurance of 100,000 on (40) you are given:

(i) Expenses incurred at the beginning of the first year are 300 plus 50% of the first year premium

(ii) Renewal expenses, incurred at the beginning of the year, are 10% of each of the renewal premiums

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

(v) Gross premiums are calculated using the equivalence principle

Calculate the gross premium policy value for this insurance immediately after the second premium and associated renewal expenses are paid.

[A modified version of Question 18 on the Spring 2015 exam]

- A) 200
- B) 340
- C) 560
- D) 720
- E) 1060

## Explanation

Let $G$ be the annual gross premium.

Using the equivalence principle,

$$0.90G\,\ddot{a}_{40} - 0.40G = 100{,}000A_{40} + 300$$

So

$$\begin{align*}
G &= \frac{100{,}000(0.12106) + 300}{0.90(18.4578) - 0.40} \\
&= 765.2347
\end{align*}$$

The gross premium policy value after the first year and immediately after the second premium and associated expenses are paid is

$$\begin{align*}
&100{,}000A_{41} - 0.90G\left(\ddot{a}_{41} - 1\right) \\
&= 12{,}665 - 0.90(765.2347)(17.3403) \\
&= 723
\end{align*}$$

The answer is **D**.
