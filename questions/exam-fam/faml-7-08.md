---
id: "faml-7-08"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Recursion
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:461155b25c4b71d442a16d696a100030163e0fcbd167ad3b68606d8f50b96203
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.8, p.100, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.8, p.68, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-08.md
---

For a fully discrete whole life insurance of 1000 on a select life [70], you are given:

(i) Ultimate mortality follows the Standard Ultimate Life Table

(ii) During the three-year select period, $q_{[x]+k} = (0.7 + 0.1k)\,q_{x+k}, \ k = 0, 1, 2$

(iii) $i = 0.05$

(iv) The net premium for this insurance is 35.168

Calculate $_{1}V$, the net premium policy value at the end of year 1 for this insurance.

[A modified version of Question 6 on the Fall 2013 exam]

- A) 25.25
- B) 27.30
- C) 29.85
- D) 31.60
- E) 33.35

## Explanation

The simplest solution is recursive:

${}_{0}V = 0$ since the policy values are net premium policy values.

$$\begin{align*}
q_{[70]} &= (0.7)(0.010413) \\
&= 0.007289
\end{align*}$$

$$\begin{align*}
{}_{1}V &= \frac{(0 + 35.168)(1.05) - (1000)(0.007289)}{1 - 0.007289} \\
&= 29.86
\end{align*}$$

Prospectively,

$$\begin{align*}
q_{[70]+1} &= (0.8)(0.011670) \\
&= 0.009336 \\
q_{[70]+2} &= (0.9)(0.013081) \\
&= 0.011773
\end{align*}$$

$$\begin{align*}
A_{[70]+1} &= (0.009336)v + (1 - 0.009336)(0.011773)v^{2} + (1 - 0.009336)(1 - 0.011773)(0.47580)v^{2} \\
&= 0.44197
\end{align*}$$

$$\begin{align*}
\ddot{a}_{[70]+1} &= \left(1 - A_{[70]+1}\right)/d \\
&= (1 - 0.44197)/(0.05/1.05) \\
&= 11.7186
\end{align*}$$

$$\begin{align*}
{}_{1}V &= (1000)(0.44197) - (11.7186)(35.168) \\
&= 29.85
\end{align*}$$

The answer is **C**.
