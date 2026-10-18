---
id: "fams-108"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Binomial+Option+Pricing+Model
  - Concepts/Risk-Neutral+Valuation
  - Concepts/European+Option
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab9002eaf96b4022b6847926b5d68eb4e1bb2618146af820d6fa46896a756cde
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-108.md
---

A put option has strike price 70 and matures in one year. You are given:

(i) The current price of the underlying stock is 75.

(ii) The stock price in one year will be either 100 or 60.

(iii) The true probability of an upward price movement is 40%.

(iv) The continuously compounded risk-free interest rate is 3%.

Calculate the price of the option.

- A) 5.51
- B) 5.82
- C) 6.53
- D) 7.92
- E) 8.27

## Explanation

$$\begin{align*}
q &= \frac{100 - 75e^{0.03}}{100 - 60} \\
&= 0.568
\end{align*}$$

$$\begin{align*}
P_u &= \max(0, 70 - 100) \\
&= 0 \\
P_d &= \max(0, 70 - 60) \\
&= 10
\end{align*}$$

$$\begin{align*}
\text{Price} &= e^{-0.03}(10)(0.568) \\
&= 5.51
\end{align*}$$

The answer is **A**.
