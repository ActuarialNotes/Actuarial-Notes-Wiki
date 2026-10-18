---
id: "fams-100"
exam: "Exam FAM"
topic: "Binomial Option Pricing Model"
learning_objective: "Option Pricing Fundamentals"
difficulty: medium
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
  content_hash: sha256:f48f091e79d4e4958507ffb9e896508eb8dfa3a22b105fc6812577a448ede650
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-100.md
---

A non-dividend paying stock has a current price of $S$. The continuously compounded risk-free interest rate is 2.75%.

The price of the stock over a six-month period follows a binomial model with $u = 1.2903$ and $d = 0.7966$. A six-month European put option on the stock with a strike price of $(S - 4.50)$ has a price of 2.482.

Calculate $S$.

- A) 44.22
- B) 45.72
- C) 46.97
- D) 49.11
- E) 50.24

## Explanation

The risk-neutral probability of an increase is:

$$\begin{align*}
1 - q &= \frac{e^{(0.0275)(0.5)} - d}{u - d} \\
&= 0.44003
\end{align*}$$

Then:

$$\begin{align*}
2.482 &= e^{(-0.0275)(0.5)}\left((1 - q) \times 0 + q \times (S - 4.5 - 0.7966S)\right) \\
\Rightarrow S &= 44.22
\end{align*}$$

The answer is **A**.
