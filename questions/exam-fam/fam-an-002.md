---
id: "fam-an-002"
exam: "Exam FAM"
topic: "Delta Hedging"
learning_objective: "Option Pricing Fundamentals"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Delta+Hedging
  - Concepts/Black-Scholes+Model
  - Concepts/European+Option
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d137ea8f75dac4244f4f66822c80ec92cf0956db1d525092dd9dcaac1d3d0318
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fam-an-002.md
---

A market-maker writes 500 six-month European put options on a stock that pays no dividends. You are given:

i) The current stock price is 60.

ii) The strike price is 65.

iii) The continuously compounded risk-free interest rate is 4%.

iv) The volatility of the stock is 25%.

The market-maker delta-hedges the written puts using the stock, under the Black-Scholes framework.

Determine the stock transaction the market-maker makes to delta-hedge the position, to the nearest whole share.

- A) Buy 200 shares
- B) Sell 200 shares
- C) Buy 300 shares
- D) Sell 300 shares
- E) Sell 333 shares

## Explanation

$$\begin{align*}
d_1 &= \frac{\ln(60/65) + (0.04 + 0.5 \times 0.25^2)(0.5)}{0.25\sqrt{0.5}} \\
&= -0.2513 \\
d_2 &= d_1 - 0.25\sqrt{0.5} \\
&= -0.4280
\end{align*}$$

The delta of one put on a non-dividend-paying stock is

$$\Delta_P = -N(-d_1) = -N(0.2513) = -0.5992$$

The market-maker is *short* the puts, so the position's delta is $-500 \times (-0.5992) = +299.6$. To bring the position's delta to zero, it holds $-299.6$ shares: it **sells (shorts) 300 shares**. The answer is **D**.

A written put gains when the stock rises, so the hedge must be a position that loses when the stock rises: a short stock position.

**Why not the others**

- **A** uses the call delta, $N(d_1) = 0.4008$, and buys, which is the hedge for 500 *written calls*.
- **B** sells, but with the call delta $N(d_1)$ in place of $N(-d_1)$.
- **C** has the right size but the wrong sign: it hedges a *long* put position (or quotes $\Delta_P$ as $+N(-d_1)$), doubling the exposure instead of removing it.
- **E** uses $N(-d_2) = 0.6657$, the risk-neutral probability that the put is exercised, which appears in the put's price, not in its delta.
