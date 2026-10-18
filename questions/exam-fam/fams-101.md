---
id: "fams-101"
exam: "Exam FAM"
topic: "Put-Call Parity"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Put-Call+Parity
  - Concepts/Black-Scholes+Model
  - Concepts/European+Option
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c1405f173ef99744fb693b78888c756cf3ee3c6e939949d0deb9f5d783173f5f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-101.md
---

You are given:

(i) The Black-Scholes-Merton framework applies.

(ii) The prices of some 6-month European options on non-dividend paying Stock Y are:

| Strike Price | Price of Call Option | Price of Put Option |
|---|---|---|
| 525 | 55.92 | $x$ |
| 550 | 45.46 | 64.57 |

The continuously compounded risk-free rate is 3.25%.

Calculate $x$.

- A) 50.03
- B) 50.43
- C) 50.83
- D) 51.03
- E) 51.23

## Explanation

Using put-call parity and the 550-strike options, we have:

$$\begin{align*}
45.46 - 64.57 &= S_0 - 550e^{(-0.0325)(0.5)} \\
\Rightarrow S_0 &= 522.0247
\end{align*}$$

Using the current stock price and put-call parity with the 525-strike options:

$$\begin{align*}
55.92 - x &= 522.0247 - 525e^{(-0.0325)(0.5)} \\
\Rightarrow x &= 50.43
\end{align*}$$

The answer is **B**.
