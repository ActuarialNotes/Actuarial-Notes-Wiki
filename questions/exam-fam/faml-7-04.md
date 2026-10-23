---
id: "faml-7-04"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Expenses
  - Concepts/Equivalence+Principle
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d847d3d5a938b0640194d90fca162669bb451ac936824a4f39c671fcc182e0d4
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.4, p.96, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.4, p.66, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-04.md
---

For a special fully discrete whole life insurance on (40), you are given:

(i) The death benefit is 1000 during the first 11 years and 5000 thereafter

(ii) Expenses, payable at the beginning of the year, are 100 in year 1 and 10 in years 2 and later

(iii) $\pi$ is the level annual premium, determined using the equivalence principle

(iv) $G = 1.02 \times \pi$ is the level annual gross premium

(v) Mortality follows the Standard Ultimate Life Table

(vi) $i = 0.05$

(vii) $_{11}E_{40} = 0.57949$

Calculate the gross premium policy value at the end of year 1 for this insurance.

[A modified version of Question 18 on the Fall 2012 exam]

- A) –82
- B) –74
- C) –66
- D) –58
- E) –50

## Explanation

$$\begin{align*}
\text{EPV of benefits at issue} &= 1000A_{40} + 4\,{}_{11}E_{40}(1000A_{51}) \\
&= 121.06 + (4)(0.57949)(197.80) \\
&= 579.55
\end{align*}$$

$$\begin{align*}
\text{EPV of expenses at issue} &= 100 + 10(\ddot{a}_{40} - 1) \\
&= 100 + 10(17.4578) \\
&= 274.58
\end{align*}$$

$$\begin{align*}
\pi &= (579.55 + 274.58)/\ddot{a}_{40} \\
&= 854.13/18.4578 \\
&= 46.27
\end{align*}$$

$$\begin{align*}
G &= 1.02\pi \\
&= 47.20
\end{align*}$$

$$\begin{align*}
\text{EPV of benefits at time 1} &= 1000A_{41} + 4\,{}_{10}E_{41} \times 1000A_{51} \\
&= 126.65 + (4)(0.60879)(197.80) \\
&= 608.32
\end{align*}$$

$$\begin{align*}
\text{EPV of expenses at time 1} &= 10(\ddot{a}_{41}) \\
&= 10(18.3403) \\
&= 183.40
\end{align*}$$

$$\begin{align*}
\text{Gross Prem Policy Value} &= 608.32 + 183.40 - G\ddot{a}_{41} \\
&= 791.72 - 47.20(18.3403) \\
&= -73.94
\end{align*}$$

The answer is **B**.
