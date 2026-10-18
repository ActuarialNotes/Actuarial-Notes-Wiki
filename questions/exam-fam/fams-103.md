---
id: "fams-103"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Binomial+Option+Pricing+Model
  - Concepts/Risk-Neutral+Valuation
  - Concepts/European+Option
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9c26b037fa5e9d6fe1972a6046efd9f0c2d5da92a01f09f25f0d9416a9671aec
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-103.md
---

The price movements of a non-dividend paying stock are modeled by a binomial tree with one-year periods.

You are given:

(i) The current price of the stock is 100.

(ii) $u = 1.24$

(iii) The risk-neutral probability of an up move is 0.406.

(iv) The continuously compounded risk-free interest rate is 2%.

The price of a 2-year $K$-strike European put option on the stock is 25.05.

Calculate $K$.

- A) 123.50
- B) 124.00
- C) 124.50
- D) 125.00
- E) 125.50

## Explanation

You are given $p^* = 0.406$ and $u = 124/100 = 1.24$ and $r = .02$.

Therefore

$$\begin{align*}
p^* &= (e^r - d)/(u - d) \\
\Rightarrow d &= (e^r - up^*)/(1 - p^*) \\
&= 0.87
\end{align*}$$

$$\begin{align*}
S_{uu} &= 153.76 \\
S_{ud} &= 107.88 \\
S_{dd} &= 75.69 \\
P &= 25.05
\end{align*}$$

$$C = e^{-2r}\left[Max(S_{uu} - K, 0)(p^*)^2 + 2Max(S_{ud} - K, 0)p^*(1 - p^*) + Max(S_{dd} - K, 0)(1 - p^*)^2\right]$$

$$P = e^{-2r}\left[Max(K - S_{uu}, 0)(p^*)^2 + 2Max(K - S_{ud}, 0)p^*(1 - p^*) + Max(K - S_{dd}, 0)(1 - p^*)^2\right]$$

$$K = 125.50$$

The answer is **E**.
