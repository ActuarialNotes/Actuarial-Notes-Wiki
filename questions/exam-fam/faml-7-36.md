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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:792765211cc3525a5aece9373988195b5c508dc5292c8958c2e63f15a2fb03cc
  sources: []
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
