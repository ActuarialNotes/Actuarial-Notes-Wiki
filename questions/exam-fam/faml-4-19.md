---
id: "faml-4-19"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Mortality
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4135450b00f75c1975928a51a737f04e2f1d45a19261192cb43f9bf3b5c329d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-19.md
---

(80) purchases a whole life insurance policy of 100,000.

You are given:

(i) The policy is priced with a select period of one year

(ii) The select mortality rate equals 80% of the mortality rate from the Standard Ultimate Life Table

(iii) Ultimate mortality follows the Standard Ultimate Life Table

(iv) $i = 0.05$

Calculate the actuarial present value of the death benefits for this insurance

[A modified version of Question 5 on the Fall 2017 exam]

- A) 58,950
- B) 59,050
- C) 59,150
- D) 59,250
- E) 59,350

## Explanation

Superscript SULT refers to values from the SULT. Values without superscripts refer to this select life.

$$\begin{align*}
q_{80} &= 0.8q^{SULT}_{80} \\
&= 0.0261264 \\
\Rightarrow p_{80} &= 0.9738736
\end{align*}$$

$$\begin{align*}
A_{80} &= vq_{80} + vp_{80}A^{SULT}_{81} \\
&= (1.05)^{-1}(0.0261264) + (1.05)^{-1}(0.9738736)(0.60984) \\
&= 0.59051 \\
100{,}000A_{80} &= 59{,}051
\end{align*}$$

The answer is **B**.
