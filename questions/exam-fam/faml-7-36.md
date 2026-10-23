---
id: "faml-7-36"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Expenses
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:792765211cc3525a5aece9373988195b5c508dc5292c8958c2e63f15a2fb03cc
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.36, p.123, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.36, p.81, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-36.md
---

You are checking gross premium policy values for a fully discrete whole life insurance of 1000 on (50).

$_{k}V$ denotes the gross premium policy value at the end of year *k*, *k* = 0,1,2,... .

The valuation assumptions were intended to include:

i) There are commissions and maintenance expenses payable at the beginning of the year

ii) There are no other expenses

iii) $q_{58} = 0.002736$

iv) $i = 0.05$

You discover that all intended assumptions were used correctly, except that calculations were based on $q_{58} = 0.003736$.

The calculated results included $_{8}V = 86.74$ and $_{9}V = 100$.

Calculate $_{8}V$ using the intended value of $q_{58}$.

[Question on October 2022 FAM-L Exam]

- A) 85.79
- B) 85.88
- C) 85.97
- D) 86.06
- E) 86.15

## Explanation

There is no change to ${}_{9}V$ because there were no errors after time 9.

An equation for ${}_{8}V^{orig}$ is

$${}_{8}V^{orig} + P - e = 1000(0.003736)/1.05 + 100(0.996264)/1.05$$

An equation for ${}_{8}V^{now}$ is

$${}_{8}V^{now} + P - e = 1000(0.002736)/1.05 + 100(0.997264)/1.05$$

By subtraction,

$$\begin{align*}
{}_{8}V^{now} - {}_{8}V^{orig} &= 1000(-0.001)/1.05 + 100(0.001)/1.05 \\
&= -0.86
\end{align*}$$

$$\begin{align*}
{}_{8}V^{now} &= 86.74 - 0.86 \\
&= 85.88 \text{ (B)}
\end{align*}$$

In those equations, $P - e$, which cancels, represents the gross premium less all expenses. You could think of $P$ as the gross premium less commissions, and $e$ as the flat expenses. However you think of representing them, they cancel.

The answer is **B**.
