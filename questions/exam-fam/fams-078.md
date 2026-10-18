---
id: "fams-078"
exam: "Exam FAM"
topic: "Put-Call Parity"
learning_objective: "Option Pricing Fundamentals"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Put-Call+Parity
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:695a467ceb06c7040a1e53f4f89b286503a93f207ca0f680faad569e97bec2a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-078.md
---

The current price of a non-dividend paying stock is 40 and the continuously compounded risk-free interest rate is 8%. You are given that the price of a 35-strike call option is 3.35 higher than the price of a 40-strike call option, where both options expire in 3 months.

Calculate the amount by which the price of an otherwise equivalent 40-strike put option exceeds the price of an otherwise equivalent 35-strike put option.

- A) 1.55
- B) 1.65
- C) 1.75
- D) 3.25
- E) 3.35

## Explanation

Let $C$ be the price for the 40-strike call option. Then, $C + 3.35$ is the price for the 35-strike call option. Similarly, let $P$ be the price for the 40-strike put option. Then, $P - x$ is the price for the 35-strike put option, where $x$ is the desired quantity. Using put-call parity, the equations for the 35-strike and 40-strike options are, respectively,

$$\begin{align*}
(C + 3.35) + 35e^{-0.02} - 40 &= P - x \\
C + 40e^{-0.02} - 40 &= P.
\end{align*}$$

Subtracting the first equation from the second,

$$\begin{align*}
5e^{-0.02} - 3.35 &= x \\
x &= 1.55.
\end{align*}$$

The answer is **A**.
