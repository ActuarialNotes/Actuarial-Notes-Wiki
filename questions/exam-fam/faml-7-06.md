---
id: "faml-7-06"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:479fe5eba568dabd72f6f7488452e176290ebcf533b50830c3350ab6c6917c92
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.6, p.98, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.6, p.67-68, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-06.md
---

For a fully discrete whole life insurance policy of 2000 on (45), you are given:

(i) The gross premium is calculated using the equivalence principle

(ii) Expenses, payable at the beginning of the year, are:

|  | % of Premium | Per 1000 | Per Policy |
|---|---|---|---|
| First year | 25% | 1.5 | 30 |
| Renewal years | 5% | 0.5 | 10 |

(iii) Mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the expense policy value at the end of policy year 10.

[A modified version of Question 16 on the Spring 2013 exam]

- A) –2
- B) –8
- C) –12
- D) –21
- E) –25

## Explanation

Gross premium $= G$

$$G\ddot{a}_{45} = 2000A_{45} + \underbrace{\left(1\left(\frac{2000}{1000}\right) + 20\right)}_{22} + \underbrace{\left(0.5\left(\frac{2000}{1000}\right) + 10\right)}_{11}\ddot{a}_{45} + 0.20G + 0.05G\ddot{a}_{45}$$

$$\left(0.95\ddot{a}_{45} - 0.20\right)G = 2000A_{45} + 22 + 11\ddot{a}_{45}$$

$$\begin{align*}
G &= \frac{2000A_{45} + 22 + 11\ddot{a}_{45}}{0.95\ddot{a}_{45} - 0.20} \\
&= \frac{2000(0.15161) + 22 + 11(17.8162)}{0.95(17.8162) - 0.20} \\
&= 31.16
\end{align*}$$

There are two ways to proceed. The first is to calculate the gross premium policy value (with equivalence principle gross premium and original assumptions, both of which do apply here) and the net premium policy value and take the difference.

The net premium is

$$\begin{align*}
\frac{2000A_{45}}{\ddot{a}_{45}} &= \frac{2000(0.15161)}{17.8162} \\
&= 17.02
\end{align*}$$

The net premium policy value is

$$\begin{align*}
2000A_{55} - 17.02\ddot{a}_{55} &= 2000(0.23524) - 17.02(16.0599) \\
&= 197.14
\end{align*}$$

The gross premium policy value is

$$\begin{align*}
&2000A_{55} + [0.05(31.16) + 0.5(2000/1000) + 10]\ddot{a}_{55} - 31.16\ddot{a}_{55} \\
&= 2000(0.23524) + (12.56 - 31.16)(16.0599) \\
&= 171.77
\end{align*}$$

Expense policy value is $171.77 - 197.14 = -25$

The second is to calculate the expense policy value directly based on the pattern of expenses. The first step is to determine the expense premium.

The present value of expenses is

$$\begin{align*}
&[0.05G + 0.5(2000/1000) + 10]\ddot{a}_{45} + 0.20G + 1.0(2000/1000) + 20 \\
&= 12.558(17.8162) + 28.232 \\
&= 251.97
\end{align*}$$

The expense premium is $251.97/17.8162 = 14.14$

The expense policy value is the expected present value of future expenses less future expense premiums, that is,

$$\begin{align*}
[0.05G + 0.5(2000/1000) + 10]\ddot{a}_{55} - 14.14\ddot{a}_{55} &= -1.582(16.0599) \\
&= -25
\end{align*}$$

There is a shortcut with the second approach based on recognizing that expenses that are level throughout create no expense policy value (the level expense premium equals the actual expenses). Therefore, the expense policy value in this case is created entirely from the extra first year expenses. They occur only at issue, so the expected present value is $0.20(31.16) + 1.0(2000/1000) + 20 = 28.232$. The expense premium for those expenses is then $28.232/17.8162 = 1.585$ and the expense policy value is the present value of future non-level expenses (0) less the present value of those future expense premiums, which is $1.585(16.0599) = 25$ for a reserve of $-25$.

The answer is **E**.
