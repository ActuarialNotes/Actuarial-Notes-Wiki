---
id: "faml-7-11"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Loss+Random+Variable
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:16238661884c132fa518b17def4e4e988e2ca24c913f9f4a866bd2f7200cfa6d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-11.md
---

For a fully discrete whole life insurance of 10,000 on (45), you are given:

(i) $i = 0.05$

(ii) $_{0}L$ denotes the loss at issue random variable based on the net premium

(iii) If $K_{45} = 10$, then $_{0}L = 4450$

(iv) $\ddot{a}_{55} = 13.4205$

Calculate $_{10}V$, the net premium policy value at the end of year 10 for this insurance.

[A modified version of Question 17 on the Fall 2013 exam]

- A) 1010
- B) 1460
- C) 1820
- D) 2140
- E) 2300

## Explanation

$$\begin{align*}
L &= 10{,}000v^{K_{45}+1} - P\ddot{a}_{\overline{K_{45}+1}|} \\
&= 10{,}000v^{11} - P\ddot{a}_{\overline{11}|}
\end{align*}$$

$$\begin{align*}
4450 &= 10{,}000(0.58468) - 8.7217P \\
P &= (5{,}846.8 - 4{,}450)/8.7217 \\
&= 160.15
\end{align*}$$

$$\begin{align*}
A_{55} &= 1 - d\ddot{a}_{55} \\
&= 1 - (0.05/1.05)(13.4205) \\
&= 0.36093
\end{align*}$$

$$\begin{align*}
{}_{10}V &= 10{,}000A_{55} - P\ddot{a}_{55} \\
&= (10{,}000)(0.36093) - (160.15)(13.4205) \\
&= 1{,}460
\end{align*}$$

The answer is **B**.
