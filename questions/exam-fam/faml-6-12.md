---
id: "faml-6-12"
exam: "Exam FAM"
topic: "Future Loss Random Variable"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Future+Loss+Random+Variable
  - Concepts/Variance
  - Concepts/Expenses
  - Concepts/Whole+Life+Insurance
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:24b108ee11a5787a7277ff70b0ab38710192f0613a8db76da2d83e25f3b1b456
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.12, p.59, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.12, p.40, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-12.md
---

For a fully discrete whole life insurance of 1000 on $(x)$, you are given:

(i) The following expenses are incurred at the beginning of each year:

| | Year 1 | Years 2+ |
|---|---|---|
| Percent of premium | 75% | 10% |
| Maintenance expenses | 10 | 2 |

(ii) An additional expense of 20 is paid when the death benefit is paid

(iii) The gross premium is determined using the equivalence principle

(iv) $i = 0.06$

(v) $\ddot{a}_{x} = 12.0$

(vi) ${}^{2}A_{x} = 0.14$

Calculate the variance of the loss at issue random variable.

[Question 18 on the Fall 2013 exam]

- A) 14,600
- B) 33,100
- C) 51,700
- D) 70,300
- E) 88,900

## Explanation

1,020 in the solution is the 1,000 death benefit plus the 20 death benefit claim expense.

$$\begin{align*}
A_{x} &= 1 - d\ddot{a}_{x} \\
&= 1 - d(12.0) \\
&= 0.320755
\end{align*}$$

$$G\ddot{a}_{x} = 1{,}020A_{x} + 0.65G + 0.10G\ddot{a}_{x} + 8 + 2\ddot{a}_{x}$$

$$\begin{align*}
G &= \frac{1{,}020A_{x} + 8 + 2\ddot{a}_{x}}{\ddot{a}_{x} - 0.65 - 0.10\ddot{a}_{x}} \\
&= \frac{1{,}020(0.320755) + 8 + 2(12.0)}{12.0 - 0.65 - 0.10(12.0)} \\
&= 35.38622
\end{align*}$$

Let $Z = v^{K_{x}+1}$ denote the present value random variable for a whole life insurance of 1 on $(x)$.

Let $Y = \ddot{a}_{\overline{K_{x}+1}|}$ denote the present value random variable for a life annuity-due of 1 on $(x)$.

$$\begin{align*}
L &= 1{,}020Z + 0.65G + 0.10GY + 8 + 2Y - GY \\
&= 1{,}020Z + (2 - 0.9G)Y + 0.65G + 8 \\
&= 1{,}020v^{K_{x}+1} + (2 - 0.9G)\frac{1 - v^{K_{x}+1}}{d} + 0.65G + 8 \\
&= \left(1{,}020 + \frac{0.9G - 2}{d}\right)v^{K_{x}+1} + \frac{2 - 0.9G}{d} + 0.65G + 8
\end{align*}$$

$$\begin{align*}
Var(L) &= \left[{}^{2}A_{x} - (A_{x})^{2}\right]\left(1{,}020 + \frac{0.9G - 2}{d}\right)^{2} \\
&= (0.14 - 0.320755^{2})\left(1{,}020 + \frac{0.9(35.38622) - 2}{d}\right)^{2} \\
&= 0.037116(2{,}394{,}161) \\
&= 88{,}861
\end{align*}$$

The answer is **E**.
