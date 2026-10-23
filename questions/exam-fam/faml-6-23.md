---
id: "faml-6-23"
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
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:46fadfc24d4c5eb2a808ccd4c9aa3257138003e178ae428d6be55ec2d46bc86e
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.23, p.67, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.23, p.45, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-23.md
---

For fully discrete 30-payment whole life insurance policies on $(x)$, you are given:

(i) The following expenses payable at the beginning of the year:

|  | 1st Year | Years 2 – 15 | Years 16 – 30 | Years 31 and after |
|---|---|---|---|---|
| Per policy | 60 | 30 | 30 | 30 |
| Percent of premium | 80% | 20% | 10% | 0% |

(ii) $\ddot{a}_{x} = 15.3926$

(iii) $\ddot{a}_{x:\overline{15}|} = 10.1329$

(iv) $\ddot{a}_{x:\overline{30}|} = 14.0145$

(v) Annual gross premiums are calculated using the equivalence principle

(vi) The annual gross premium is expressed as $kF + h$, where $F$ is the death benefit and $k$ and $h$ are constants for all $F$

Calculate $h$.

[Question 11 on the Fall 2014 exam]

- A) 30.3
- B) 35.1
- C) 39.9
- D) 44.7
- E) 49.5

## Explanation

$$\begin{align*}
G\ddot{a}_{x:\overline{30}|} &= \text{APV}\left[\text{gross premium}\right] \\
&= \text{APV}\left[\text{Benefits + expenses}\right] \\
&= FA_{x} + \left(30 + 30\ddot{a}_{x}\right) + G\left(0.6 + 0.10\ddot{a}_{x:\overline{30}|} + 0.10\ddot{a}_{x:\overline{15}|}\right)
\end{align*}$$

$$\begin{align*}
G &= \frac{FA_{x} + 30 + 30\ddot{a}_{x}}{\ddot{a}_{x:\overline{30}|} - 0.6 - 0.1\ddot{a}_{x:\overline{30}|} - 0.1\ddot{a}_{x:\overline{15}|}} \\
&= \frac{FA_{x} + 30 + 30(15.3926)}{14.0145 - 0.6 - 0.1(14.0145) - 0.1(10.1329)} \\
&= \frac{FA_{x} + 491.78}{10.9998} \\
&= \frac{FA_{x}}{10.9998} + \frac{491.78}{10.9998} \\
&= \frac{FA_{x}}{10.9998} + 44.71
\end{align*}$$

$$\Rightarrow h = 44.71$$

The answer is **D**.
