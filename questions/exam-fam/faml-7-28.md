---
id: "faml-7-28"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e4fa19731bb1c0e977a405bf93e2b39eff3726a3ed180d1dfbe221b2a636fb8d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-28.md
---

For a special fully discrete whole life insurance of 1,000 on (45), you are given:

(i) The net premiums for year *k* are:

$$\begin{cases} P, & k = 1, 2, \ldots, 20 \\ P + W, & k = 21, 22, \ldots \end{cases}$$

(ii) Mortality follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) $_{20}V$, the net premium policy value at the end of the 20th year, is 0

Calculate *W*.

[A modified version of Question 15 on the Fall 2017 exam]

- A) 12
- B) 16
- C) 20
- D) 24
- E) 28

## Explanation

$${}_{20}V = 0 \Longrightarrow 1000A_{65} = (P + W) \times \ddot{a}_{65}$$

At issue, present value of benefits must equal present value of premium, so:

$$1000A_{45} = P\ddot{a}_{45} + W\;{}_{20}E_{45} \times \ddot{a}_{65}$$

From the first equation,

$$354.77 = (P + W)(13.5498) \Rightarrow P + W = 26.182674 \Rightarrow P = 26.182674 - W$$

From the second,

$$\begin{align*}
151.61 &= 17.8162P + W(0.35994)(13.5498) \\
151.61 &= 17.8162(26.182674 - W) + W(0.35994)(13.5498)
\end{align*}$$

$$\Rightarrow W = 24.33447$$

The answer is **D**.
