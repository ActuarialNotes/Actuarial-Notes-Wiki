---
id: "cas9-an-006"
exam: "Exam 9"
topic: "Insurance Profitability"
learning_objective: "Risk and Return"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurance+Profitability
  - Concepts/Insurance+Leverage
  - Concepts/Insurance+Margin
  - Concepts/Return+on+Capital
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:535ff4fe8f7c386ed3419fcc3f33f9ba27309fbab45b53f54af695cfb51faa88
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-006.md
---

A book of business has premium of 100, expected loss of 94 and allocated capital of 50, in a one-period model with no expenses, taxes or investment income. Management's target return on capital is 15%. Premium and expected loss cannot change.

Using the decomposition of return into margin ratio and leverage, calculate the premium-to-capital leverage the book would need to earn the target return.

- A) 0.40
- B) 0.71
- C) 2.00
- D) 2.35
- E) 2.50

## Explanation

Return on capital decomposes as

$$
\frac{M}{Q} = \frac{M}{P} \times \frac{P}{Q}
$$

The margin is $M = 100 - 94 = 6$, a margin ratio of 6%. Today the leverage is $P/Q = 100/50 = 2.0$ and the return is $\iota = 6\% \times 2.0 = 12\%$, short of target. With the margin ratio fixed, the leverage that earns 15% is

$$
\frac{P}{Q} = \frac{0.15}{0.06} = \mathbf{2.50}
$$

that is, capital of $Q = 100 / 2.5 = 40$. The answer is **E**.

Whether running the book at 2.5 times leverage is acceptable is a separate question: 40 of capital absorbs less adverse deviation than 50, so the higher return is bought with more risk of exhausting capital.

**Why not the others**

- **A** — 0.40 is capital to premium, $Q/P$ — the reciprocal of leverage.
- **B** — 0.71 is premium to *assets*, $P/(P + Q) = 100/140$, not premium to capital.
- **C** — 2.00 is the current leverage, which earns only 12%.
- **D** — 2.35 is expected loss to capital, $L/Q = 94/40$, using losses rather than premium as the volume measure.
