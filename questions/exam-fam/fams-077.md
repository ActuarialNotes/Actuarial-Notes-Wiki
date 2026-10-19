---
id: "fams-077"
exam: "Exam FAM"
topic: "Put-Call Parity"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Put-Call+Parity
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c15fba39f90cd4ea3e407987262f2ce2579fc4c3d901b92463c9aa8acc9b5d93
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-077.md
---

You are given:

i) The current price to buy one share of XYZ stock is 500.

ii) The stock does not pay dividends.

iii) The continuously compounded risk-free interest rate is 6%.

iv) A European call option on one share of XYZ stock with a strike price of $K$ that expires in one year costs 66.59.

v) A European put option on one share of XYZ stock with a strike price of $K$ that expires in one year costs 18.64.

Using put-call parity, calculate the strike price, $K$.

- A) 449
- B) 452
- C) 480
- D) 559
- E) 582

## Explanation

$$66.59 - 18.64 = 500 - K\cdot\exp(-0.06)$$

and so

$$\begin{align*}
K &= (500 - 66.59 + 18.64)/\exp(-0.06) \\
&= 480.
\end{align*}$$

The answer is **C**.
